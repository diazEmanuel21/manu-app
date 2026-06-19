"use client";

import { useMemo, useState, useTransition } from "react";

import { defaultOrigin, optimizeDeliveryRoute } from "@/application/address-routing/optimize-delivery-route";
import type { OptimizedRoute } from "@/domain/address-routing/types";

const sampleAddresses = [
  "Cra 45 # 12-34, Norte",
  "Calle 32 # 8-19, Centro",
  "Av 19 # 95-11, Occidente",
  "Transversal 28 # 44-07, Sur",
  "Carrera 7 # 68-25, Oficina 3",
  "Diagonal 74 # 31-88, Industrial",
];

const priorityStyles = {
  0: "border-white/10 bg-white/5 text-white",
  1: "border-cyan-400/30 bg-cyan-400/10 text-cyan-100",
  2: "border-amber-400/30 bg-amber-400/10 text-amber-100",
  3: "border-rose-400/30 bg-rose-400/10 text-rose-100",
} as const;

export function AddressRoutingModule() {
  const [draft, setDraft] = useState(sampleAddresses.join("\n"));
  const [report, setReport] = useState<OptimizedRoute>(() =>
    optimizeDeliveryRoute(sampleAddresses.map((address) => ({ address }))),
  );
  const [isPending, startTransition] = useTransition();

  const count = useMemo(
    () => draft.split("\n").map((line) => line.trim()).filter(Boolean).length,
    [draft],
  );

  const run = () => {
    const routes = draft
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean)
      .map((address) => ({ address }));

    startTransition(() => {
      setReport(optimizeDeliveryRoute(routes));
    });
  };

  const load = () => {
    setDraft(sampleAddresses.join("\n"));
    startTransition(() => {
      setReport(optimizeDeliveryRoute(sampleAddresses.map((address) => ({ address }))));
    });
  };

  const clear = () => {
    setDraft("");
    startTransition(() => {
      setReport(optimizeDeliveryRoute([]));
    });
  };

  const routePoints = report.polyline
    .map((point) => `${scale(point.x)},${scale(100 - point.y)}`)
    .join(" ");

  return (
    <main className="mx-auto min-h-screen w-full max-w-7xl px-4 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
      <section className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-[linear-gradient(180deg,rgba(8,13,22,0.96),rgba(10,16,28,0.82))] shadow-[0_30px_120px_rgba(0,0,0,0.35)]">
        <header className="border-b border-white/10 px-4 py-4 sm:px-6 sm:py-5 lg:px-8">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between gap-3">
              <span className="inline-flex items-center rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-[11px] uppercase tracking-[0.3em] text-cyan-100">
                Route
              </span>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] uppercase tracking-[0.25em] text-slate-300">
                {isPending ? "..." : "Ready"}
              </span>
            </div>

            <div className="space-y-2">
              <h1 className="max-w-3xl text-3xl font-semibold tracking-tight text-balance sm:text-4xl lg:text-5xl">
                Ordena direcciones. Toca optimizar. Sal a entregar.
              </h1>
              <p className="max-w-2xl text-sm leading-6 text-slate-300 sm:text-base">
                Mobile-first, low-friction y sin texto extra.
              </p>
            </div>

            <div className="grid gap-2 sm:grid-cols-3">
              <Stat label="Stops" value={report.summary.totalStops.toString()} />
              <Stat label="Km" value={report.summary.totalDistanceKm.toFixed(1)} />
              <Stat label="Min" value={report.summary.estimatedMinutes.toString()} />
            </div>
          </div>
        </header>

        <div className="grid gap-4 px-4 py-4 sm:px-6 sm:py-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-8">
          <section className="space-y-4">
            <div className="rounded-[1.5rem] border border-white/10 bg-slate-950/60 p-4 sm:p-5">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.28em] text-slate-400">
                    Input
                  </p>
                  <p className="mt-1 text-sm font-medium text-white">Pegue una por linea</p>
                </div>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] uppercase tracking-[0.25em] text-slate-300">
                  {count}
                </span>
              </div>

              <textarea
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                className="mt-4 min-h-[190px] w-full rounded-[1.2rem] border border-white/10 bg-white/5 px-4 py-4 font-mono text-sm leading-6 text-slate-100 outline-none placeholder:text-slate-500 focus:border-cyan-400/40 focus:bg-white/[0.07] sm:min-h-[230px]"
                placeholder="Cra 45 # 12-34, Norte"
              />

              <div className="mt-4 grid grid-cols-3 gap-2">
                <Chip onClick={run} tone="solid">
                  Ordenar
                </Chip>
                <Chip onClick={load} tone="soft">
                  Ejemplo
                </Chip>
                <Chip onClick={clear} tone="ghost">
                  Limpiar
                </Chip>
              </div>
            </div>

            <div className="rounded-[1.5rem] border border-white/10 bg-slate-950/70 p-4 sm:p-5">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.28em] text-slate-400">
                    Mapa
                  </p>
                  <p className="mt-1 text-sm font-medium text-white">Ruta</p>
                </div>
                <span className="text-[11px] uppercase tracking-[0.25em] text-slate-400">
                  {report.summary.routeScore}/100
                </span>
              </div>

              <div className="mt-4 overflow-hidden rounded-[1.25rem] border border-white/10 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.15),transparent_40%),linear-gradient(180deg,rgba(8,15,26,1),rgba(5,10,18,1))] p-3">
                <svg viewBox="0 0 100 100" className="h-[250px] w-full sm:h-[300px]">
                  <defs>
                    <linearGradient id="routeLine" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#67e8f9" />
                      <stop offset="100%" stopColor="#f59e0b" />
                    </linearGradient>
                  </defs>
                  <g opacity="0.35">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <line
                        key={`h-${index}`}
                        x1="0"
                        y1={index * 20}
                        x2="100"
                        y2={index * 20}
                        stroke="rgba(148,163,184,0.2)"
                        strokeWidth="0.4"
                      />
                    ))}
                    {Array.from({ length: 5 }).map((_, index) => (
                      <line
                        key={`v-${index}`}
                        x1={index * 20}
                        y1="0"
                        x2={index * 20}
                        y2="100"
                        stroke="rgba(148,163,184,0.2)"
                        strokeWidth="0.4"
                      />
                    ))}
                  </g>

                  <circle cx={scale(defaultOrigin.x)} cy={scale(100 - defaultOrigin.y)} r="4.5" fill="#f8fafc" />
                  <text
                    x={scale(defaultOrigin.x) + 4}
                    y={scale(100 - defaultOrigin.y) - 5}
                    fill="#e2e8f0"
                    fontSize="4"
                  >
                    O
                  </text>

                  {report.polyline.length > 1 ? (
                    <polyline
                      points={routePoints}
                      fill="none"
                      stroke="url(#routeLine)"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  ) : null}

                  {report.stops.map((stop, index) => (
                    <g key={stop.id}>
                      <circle
                        cx={scale(stop.x)}
                        cy={scale(100 - stop.y)}
                        r={index === 0 ? "4.6" : "4.1"}
                        fill={toneFill(stop.priority)}
                        stroke="rgba(255,255,255,0.9)"
                        strokeWidth="0.7"
                      />
                      <text
                        x={scale(stop.x) + 3.5}
                        y={scale(100 - stop.y) - 3}
                        fill="#e2e8f0"
                        fontSize="3.6"
                      >
                        {index + 1}
                      </text>
                    </g>
                  ))}
                </svg>
              </div>
            </div>
          </section>

          <aside className="space-y-4 lg:sticky lg:top-6 lg:self-start">
            <div className="rounded-[1.5rem] border border-white/10 bg-slate-950/60 p-4 sm:p-5">
              <div className="flex items-center justify-between gap-3">
                <p className="text-[11px] uppercase tracking-[0.28em] text-slate-400">Orden</p>
                <p className="text-[11px] uppercase tracking-[0.25em] text-slate-400">
                  {report.summary.clusters} zonas
                </p>
              </div>

              <div className="mt-4 max-h-[420px] space-y-2 overflow-auto pr-1 lg:max-h-[calc(100vh-320px)]">
                {report.stops.length > 0 ? (
                  report.stops.map((stop) => (
                    <article
                      key={stop.id}
                      className="rounded-[1rem] border border-white/10 bg-white/5 p-3"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="rounded-full border border-white/10 bg-black/20 px-2 py-1 text-[10px] uppercase tracking-[0.25em] text-slate-300">
                              #{stop.sequence}
                            </span>
                            <span
                              className={`rounded-full border px-2 py-1 text-[10px] uppercase tracking-[0.25em] ${priorityStyles[stop.priority]}`}
                            >
                              {stop.zone}
                            </span>
                          </div>
                          <p className="mt-2 truncate text-sm font-medium text-white">
                            {stop.address}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs font-semibold text-white">
                            {stop.distanceFromPreviousKm.toFixed(1)} km
                          </p>
                          <p className="mt-1 text-[10px] uppercase tracking-[0.22em] text-slate-500">
                            {stop.estimatedMinutes}m
                          </p>
                        </div>
                      </div>
                    </article>
                  ))
                ) : (
                  <div className="rounded-[1rem] border border-dashed border-white/15 bg-white/5 p-4 text-sm text-slate-400">
                    Sin datos.
                  </div>
                )}
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
              <MiniStat label="Inicio" value={report.summary.firstStop || "-"} />
              <MiniStat label="Fin" value={report.summary.lastStop || "-"} />
              <MiniStat label="Priority" value={report.summary.highPriorityStops.toString()} />
            </div>
          </aside>
        </div>
      </section>

      <div className="sticky bottom-3 mt-3 grid grid-cols-3 gap-2 rounded-full border border-white/10 bg-slate-950/90 p-2 backdrop-blur-xl sm:hidden">
        <BottomAction onClick={run}>Ordenar</BottomAction>
        <BottomAction onClick={load}>Ejemplo</BottomAction>
        <BottomAction onClick={clear}>Limpiar</BottomAction>
      </div>
    </main>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[1rem] border border-white/10 bg-white/5 px-4 py-3">
      <p className="text-[10px] uppercase tracking-[0.28em] text-slate-400">{label}</p>
      <p className="mt-2 text-xl font-semibold tracking-tight text-white">{value}</p>
    </div>
  );
}

function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[1rem] border border-white/10 bg-white/5 px-4 py-3">
      <p className="text-[10px] uppercase tracking-[0.28em] text-slate-400">{label}</p>
      <p className="mt-2 truncate text-sm font-medium text-white">{value}</p>
    </div>
  );
}

function Chip({
  children,
  onClick,
  tone,
}: {
  children: React.ReactNode;
  onClick: () => void;
  tone: "solid" | "soft" | "ghost";
}) {
  const base =
    "rounded-full px-3 py-3 text-sm font-medium transition active:scale-[0.98] sm:py-2";
  const style =
    tone === "solid"
      ? "bg-white text-slate-950 hover:bg-cyan-100"
      : tone === "soft"
        ? "border border-white/15 bg-white/5 text-white hover:border-cyan-400/30 hover:bg-white/10"
        : "border border-white/10 bg-transparent text-slate-300 hover:border-white/30 hover:text-white";

  return (
    <button type="button" onClick={onClick} className={`${base} ${style}`}>
      {children}
    </button>
  );
}

function BottomAction({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-full px-3 py-2 text-sm font-medium text-white transition active:scale-[0.98]"
    >
      {children}
    </button>
  );
}

function toneFill(priority: number) {
  switch (priority) {
    case 3:
      return "#fb7185";
    case 2:
      return "#f59e0b";
    case 1:
      return "#67e8f9";
    default:
      return "#e2e8f0";
  }
}

function scale(value: number) {
  return Number(value.toFixed(1));
}
