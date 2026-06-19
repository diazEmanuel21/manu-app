export type DeliveryPriority = 0 | 1 | 2 | 3;

export type RoutingOrigin = {
  label: string;
  x: number;
  y: number;
};

export type RouteInput = {
  address: string;
};

export type RouteStop = {
  id: string;
  address: string;
  normalizedAddress: string;
  zone: string;
  priority: DeliveryPriority;
  confidence: number;
  x: number;
  y: number;
  distanceFromPreviousKm: number;
  cumulativeDistanceKm: number;
  estimatedMinutes: number;
  reason: string;
  sequence: number;
};

export type RouteSummary = {
  totalStops: number;
  totalDistanceKm: number;
  estimatedMinutes: number;
  clusters: number;
  highPriorityStops: number;
  routeScore: number;
  firstStop: string;
  lastStop: string;
};

export type OptimizedRoute = {
  origin: RoutingOrigin;
  stops: RouteStop[];
  summary: RouteSummary;
  polyline: Array<{ x: number; y: number }>;
};
