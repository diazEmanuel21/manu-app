import type {
  DeliveryPriority,
  OptimizedRoute,
  RouteInput,
  RouteStop,
  RoutingOrigin,
} from "@/domain/address-routing/types";

const GRID_MIN = 8;
const GRID_MAX = 92;
const KM_SCALE = 0.62;

const ZONE_ORDER = [
  "Urgente",
  "Norte",
  "Occidente",
  "Centro",
  "Oriente",
  "Sur",
  "Industrial",
  "Residencial",
  "Sin zona",
];

const PRIORITY_LABELS: Record<DeliveryPriority, string> = {
  3: "Alta",
  2: "Media",
  1: "Baja",
  0: "Normal",
};

type ParsedStop = {
  id: string;
  address: string;
  normalizedAddress: string;
  zone: string;
  priority: DeliveryPriority;
  confidence: number;
  x: number;
  y: number;
};

type CoordinatePoint = {
  x: number;
  y: number;
};

export const defaultOrigin: RoutingOrigin = {
  label: "Operacion Central",
  x: 14,
  y: 18,
};

export function optimizeDeliveryRoute(
  input: RouteInput[],
  origin: RoutingOrigin = defaultOrigin,
): OptimizedRoute {
  const parsed = input
    .map((item, index) => buildStop(item.address, index))
    .filter((item) => item.address.length > 0);

  if (parsed.length === 0) {
    return {
      origin,
      stops: [],
      summary: {
        totalStops: 0,
        totalDistanceKm: 0,
        estimatedMinutes: 0,
        clusters: 0,
        highPriorityStops: 0,
        routeScore: 0,
        firstStop: "",
        lastStop: "",
      },
      polyline: [{ x: origin.x, y: origin.y }],
    };
  }

  const ordered = orderStops(parsed, origin);

  let current: CoordinatePoint = origin;
  let cumulativeDistanceKm = 0;

  const stops: RouteStop[] = ordered.map((stop, sequence) => {
    const distance = euclideanDistance(current, stop);
    const distanceKm = round(distance * KM_SCALE);
    cumulativeDistanceKm += distanceKm;

    const estimatedMinutes = Math.max(
      4,
      Math.round(distanceKm * 4.1 + 6 + stop.priority * 3),
    );

    const reason = buildReason(stop, sequence, distanceKm);

    const routeStop: RouteStop = {
      id: stop.id,
      address: stop.address,
      normalizedAddress: stop.normalizedAddress,
      zone: stop.zone,
      priority: stop.priority,
      confidence: stop.confidence,
      x: stop.x,
      y: stop.y,
      distanceFromPreviousKm: distanceKm,
      cumulativeDistanceKm,
      estimatedMinutes,
      reason,
      sequence: sequence + 1,
    };

    current = stop;
    return routeStop;
  });

  const totalDistanceKm = round(cumulativeDistanceKm);
  const estimatedMinutes = stops.reduce((sum, stop) => sum + stop.estimatedMinutes, 0);
  const highPriorityStops = stops.filter((stop) => stop.priority >= 2).length;
  const clusters = new Set(stops.map((stop) => stop.zone)).size;
  const routeScore = Math.max(
    0,
    Math.round(
      100 -
        (totalDistanceKm * 1.6 +
          estimatedMinutes * 0.25 -
          highPriorityStops * 4 -
          clusters * 1.5),
    ),
  );

  return {
    origin,
    stops,
    summary: {
      totalStops: stops.length,
      totalDistanceKm,
      estimatedMinutes,
      clusters,
      highPriorityStops,
      routeScore,
      firstStop: stops[0]?.address ?? "",
      lastStop: stops[stops.length - 1]?.address ?? "",
    },
    polyline: [
      { x: origin.x, y: origin.y },
      ...stops.map((stop) => ({ x: stop.x, y: stop.y })),
    ],
  };
}

function buildStop(address: string, index: number): ParsedStop {
  const normalizedAddress = normalizeAddress(address);
  const tokens = normalizedAddress.toLowerCase();
  const numbers = extractNumbers(normalizedAddress);
  const hash = hashString(normalizedAddress);
  const zone = detectZone(tokens);
  const priority = detectPriority(tokens);
  const confidence = numbers.length > 0 ? 0.88 : 0.64;

  const baseA = numbers[0] ?? (hash % 70) + 10;
  const baseB = numbers[1] ?? ((hash >> 8) % 70) + 10;
  const zoneBias = getZoneBias(zone);

  const x = clamp(baseA * 0.76 + baseB * 0.28 + zoneBias.x, GRID_MIN, GRID_MAX);
  const y = clamp(baseB * 0.66 + baseA * 0.24 + zoneBias.y, GRID_MIN, GRID_MAX);

  return {
    id: `${hash.toString(36)}-${index}`,
    address: normalizedAddress,
    normalizedAddress,
    zone,
    priority,
    confidence,
    x,
    y,
  };
}

function orderStops(stops: ParsedStop[], origin: RoutingOrigin) {
  const buckets = new Map<string, ParsedStop[]>();

  for (const stop of stops) {
    const bucketKey = stop.priority >= 2 ? "Urgente" : stop.zone;
    const bucket = buckets.get(bucketKey) ?? [];
    bucket.push(stop);
    buckets.set(bucketKey, bucket);
  }

  const ordered: ParsedStop[] = [];
  let current: CoordinatePoint = origin;

  for (const bucketName of ZONE_ORDER) {
    const bucket = buckets.get(bucketName);
    if (!bucket?.length) {
      continue;
    }

    const remaining = [...bucket];
    while (remaining.length > 0) {
      const nextIndex = nearestIndex(current, remaining);
      const [next] = remaining.splice(nextIndex, 1);
      ordered.push(next);
      current = next;
    }
  }

  return ordered;
}

function nearestIndex(current: CoordinatePoint, candidates: ParsedStop[]) {
  let bestIndex = 0;
  let bestScore = Number.POSITIVE_INFINITY;

  candidates.forEach((candidate, index) => {
    const distance = euclideanDistance(current, candidate);
    const priorityBonus = candidate.priority * 2.4;
    const score = distance - priorityBonus;

    if (score < bestScore) {
      bestScore = score;
      bestIndex = index;
    }
  });

  return bestIndex;
}

function buildReason(stop: ParsedStop, sequence: number, distanceKm: number) {
  const priorityText = PRIORITY_LABELS[stop.priority];
  const distanceText = `${distanceKm.toFixed(1)} km`;

  if (sequence === 0) {
    return `Primera parada por prioridad ${priorityText} y cercania al punto de partida (${distanceText}).`;
  }

  if (stop.priority >= 2) {
    return `Se adelanta por prioridad ${priorityText}; queda a ${distanceText} de la parada previa.`;
  }

  return `Agrupada por zona ${stop.zone.toLowerCase()} y proximidad operacional (${distanceText}).`;
}

function normalizeAddress(value: string) {
  return value.replace(/\s+/g, " ").trim();
}

function extractNumbers(value: string) {
  const matches = value.match(/\d+/g) ?? [];
  return matches.map((number) => Number(number)).filter(Number.isFinite);
}

function detectZone(value: string) {
  if (/\burgente\b|\bpriority\b|\bexpress\b/.test(value)) return "Urgente";
  if (/\bnorte\b/.test(value)) return "Norte";
  if (/\boccidente\b|\boeste\b/.test(value)) return "Occidente";
  if (/\bcentro\b/.test(value)) return "Centro";
  if (/\boriente\b/.test(value)) return "Oriente";
  if (/\bsur\b/.test(value)) return "Sur";
  if (/\bindustrial\b/.test(value)) return "Industrial";
  if (/\bresidencial\b/.test(value)) return "Residencial";
  return "Sin zona";
}

function detectPriority(value: string): DeliveryPriority {
  if (/\burgente\b|\bvip\b|\bprioridad alta\b/.test(value)) return 3;
  if (/\boficina\b|\bbodega\b|\bempresa\b|\brecoger\b/.test(value)) return 2;
  if (/\breagendar\b|\bsegundo intento\b|\bprioridad media\b/.test(value)) return 1;
  return 0;
}

function getZoneBias(zone: string) {
  switch (zone) {
    case "Urgente":
      return { x: 0, y: -10 };
    case "Norte":
      return { x: 3, y: -12 };
    case "Occidente":
      return { x: -11, y: 2 };
    case "Centro":
      return { x: 0, y: 0 };
    case "Oriente":
      return { x: 12, y: 2 };
    case "Sur":
      return { x: 2, y: 12 };
    case "Industrial":
      return { x: 9, y: 8 };
    case "Residencial":
      return { x: -5, y: 6 };
    default:
      return { x: 0, y: 0 };
  }
}

function euclideanDistance(a: CoordinatePoint, b: CoordinatePoint) {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function round(value: number) {
  return Math.round(value * 10) / 10;
}

function hashString(value: string) {
  let hash = 0;
  for (let index = 0; index < value.length; index += 1) {
    hash = (hash * 31 + value.charCodeAt(index)) >>> 0;
  }
  return hash;
}
