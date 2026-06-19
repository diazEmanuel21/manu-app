"use client";

import { useMemo, useState, useTransition } from "react";

import { optimizeDeliveryRoute, defaultOrigin } from "@/application/address-routing/optimize-delivery-route";
import type { OptimizedRoute } from "@/domain/address-routing/types";

const sampleAddresses = [
  "Cra 45 # 12-34, Norte",
  "Calle 32 # 8-19, Centro",
  "Av 19 # 95-11, Occidente",
  "Transversal 28 # 44-07, Sur",
  "Carrera 7 # 68-25, Oficina 3",
  "Diagonal 74 # 31-88, Industrial",
];

const highlightTone = {
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

  const inputCount = useMemo(
    () =>
      draft
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean).length,
    [draft],
  );

  const optimize = () => {
    const routes = draft
      .split(/\n/)
      .map((line) => line.trim())
      .filter(Boolean)
      .map((address) => ({ address }));

    startTransition(() => {
      setReport(optimizeDeliveryRoute(routes));
    });
  };

  const loadSample = () => {
    setDraft(sampleAddresses.join("\n"));
    startTransition(() => {
      setReport(optimizeDeliveryRoute(sampleAddresses.map((address) => ({ address }))));
    });
  };

  const clearDraft = () => {
    setDraft("");
    startTransition(() => {
      setReport(optimizeDeliveryRoute([]));
    });
  };

  const routePoints = report.polyline
    .map((point) => `${scale(point.x)},${scale(100 - point.y)}`)
    .join(" ");

  return (
    <main className="mx-auto min-h-screen w-full max-w-7xl px-6 py-10 sm:px-8 lg:px-10">
      <section className="overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(8,13,22,0.92),rgba(10,16,28,0.72))] shadow-[0_30px_120px_rgba(0,0,0,0.35)]">
        <div className="grid gap-6 border-b border-white/10 px-6 py-6 lg:grid-cols-[1.15fr_0.85fr] lg:px-8 lg:py-8">
          <div className="space-y-5">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-xs uppercase tracking-[0.35em] text-cyan-100">
              Delivery intelligence
            </div>
            <div className="space-y-4">
              <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
                Routing for delivery teams that need faster drops and cleaner dispatch order.
              </h1>
              <p className="max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
                Pega direcciones, optimiza el orden automaticamente y entrega una secuencia
                operativa basada en proximidad, prioridad y zonas. This slice is built as a
                product module, not a demo widget.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={optimize}
                className="rounded-full bg-white px-5 py-3 text-sm font-medium text-slate-950 transition hover:-translate-y-0.5 hover:bg-cyan-100"
              >
                Optimize route
              </button>
              <button
                type="button"
                onClick={loadSample}
                className="rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-medium text-white transition hover:border-cyan-400/30 hover:bg-white/10"
              >
                Load sample
              </button>
              <button
                type="button"
                onClick={clearDraft}
                className="rounded-full border border-white/15 bg-transparent px-5 py-3 text-sm font-medium text-slate-300 transition hover:border-white/30 hover:text-white"
              >
                Clear
              </button>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <MetricCard label="Stops" value={report.summary.totalStops.toString()} />
            <MetricCard label="Distance" value={`${report.summary.totalDistanceKm.toFixed(1)} km`} />
            <MetricCard label="ETA" value={`${report.summary.estimatedMinutes} min`} />
            <MetricCard label="Route score" value={`${report.summary.routeScore}/100`} />
          </div>
        </div>

        <div className="grid gap-6 px-6 py-6 lg:grid-cols-[1.02fr_0.98fr] lg:px-8 lg:py-8">
          <section className="space-y-4">
            <div className="rounded-[1.75rem] border border-white/10 bg-slate-950/60 p-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                    Input console
                  </p>
                  <h2 className="mt-2 text-xl font-semibold text-white">
                    Paste one address per line
                  </h2>
                </div>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.25em] text-slate-300">
                  {inputCount} entries
                </span>
              </div>

              <textarea
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                className="mt-4 min-h-[250px] w-full rounded-[1.25rem] border border-white/10 bg-white/5 px-4 py-4 font-mono text-sm leading-7 text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-cyan-400/40 focus:bg-white/[0.07]"
                placeholder="Cra 45 # 12-34, Norte"
              />

              <div className="mt-4 flex flex-wrap gap-2 text-xs text-slate-400">
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
                  Priority words: urgente, vip, oficina, bodega
                </span>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
                  Zone words: norte, sur, oriente, occidente, centro
                </span>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
                  Optimized from {defaultOrigin.label}
                </span>
              </div>
            </div>

            <div className="grid gap-4 xl:grid-cols-[1.08fr_0.92fr]">
              <div className="rounded-[1.75rem] border border-white/10 bg-slate-950/70 p-5">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Route map</p>
                    <h3 className="mt-2 text-lg font-semibold text-white">Operational path</h3>
                  </div>
                  <span className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-[11px] uppercase tracking-[0.25em] text-cyan-100">
                    {isPending ? "Optimizing" : "Ready"}
                  </span>
                </div>

                <div className="mt-5 overflow-hidden rounded-[1.5rem] border border-white/10 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.15),transparent_40%),linear-gradient(180deg,rgba(8,15,26,1),rgba(5,10,18,1))] p-4">
                  <svg viewBox="0 0 100 100" className="h-[300px] w-full">
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
                      Origin
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

              <div className="rounded-[1.75rem] border border-white/10 bg-slate-950/70 p-5">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                      Route intelligence
                    </p>
                    <h3 className="mt-2 text-lg font-semibold text-white">Sequenced stops</h3>
                  </div>
                  <span className="text-xs uppercase tracking-[0.25em] text-slate-400">
                    {report.summary.clusters} clusters
                  </span>
                </div>

                <div className="mt-5 space-y-3">
                  {report.stops.length > 0 ? (
                    report.stops.map((stop) => (
                      <article
                        key={stop.id}
                        className="rounded-[1.25rem] border border-white/10 bg-white/5 p-4"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="rounded-full border border-white/10 bg-black/20 px-2.5 py-1 text-[11px] uppercase tracking-[0.25em] text-slate-300">
                                #{stop.sequence}
                              </span>
                              <span
                                className={`rounded-full border px-2.5 py-1 text-[11px] uppercase tracking-[0.25em] ${highlightTone[stop.priority]}`}
                              >
                                {stop.zone}
                              </span>
                            </div>
                            <p className="mt-3 text-sm font-medium text-white">{stop.address}</p>
                            <p className="mt-1 text-sm leading-6 text-slate-400">{stop.reason}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-semibold text-white">
                              {stop.distanceFromPreviousKm.toFixed(1)} km
                            </p>
                            <p className="mt-1 text-xs uppercase tracking-[0.25em] text-slate-500">
                              {stop.estimatedMinutes} min
                            </p>
                          </div>
                        </div>
                      </article>
                    ))
                  ) : (
                    <div className="rounded-[1.25rem] border border-dashed border-white/15 bg-white/5 p-6 text-sm leading-7 text-slate-400">
                      Add addresses and run the optimizer to generate an ordered delivery route.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>

          <aside className="space-y-4">
            <div className="rounded-[1.75rem] border border-white/10 bg-[linear-gradient(180deg,rgba(12,18,32,0.95),rgba(10,15,25,0.72))] p-5">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Operational KPI</p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
                <InfoCard
                  title="First stop"
                  value={report.summary.firstStop || "No route yet"}
                  description="The route starts with the best balance of priority and proximity."
                />
                <InfoCard
                  title="Last stop"
                  value={report.summary.lastStop || "No route yet"}
                  description="The tail of the route is kept close to the remaining cluster."
                />
                <InfoCard
                  title="Priority stops"
                  value={report.summary.highPriorityStops.toString()}
                  description="Urgent deliveries are promoted ahead of regular drops."
                />
              </div>
            </div>

            <div className="rounded-[1.75rem] border border-white/10 bg-slate-950/60 p-5">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Why this works</p>
              <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-300">
                <li>Coordinates are inferred from the address text and zone hints.</li>
                <li>Priority deliveries are lifted into the first routing bucket.</li>
                <li>Within each bucket, the engine picks the nearest next stop.</li>
                <li>The map and summary stay deterministic, so the UX is easy to trust.</li>
              </ul>
            </div>

            <div className="rounded-[1.75rem] border border-cyan-400/15 bg-cyan-400/8 p-5">
              <p className="text-xs uppercase tracking-[0.3em] text-cyan-100/70">Architecture</p>
              <div className="mt-4 space-y-3 text-sm leading-7 text-slate-200">
                <p>
                  Domain types live under <span className="font-mono text-cyan-100">domain/</span>.
                </p>
                <p>
                  The route optimizer is a pure use case under{" "}
                  <span className="font-mono text-cyan-100">application/</span>.
                </p>
                <p>
                  The page only composes the module through{" "}
                  <span className="font-mono text-cyan-100">presentation/</span>.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}

function MetricCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[1.25rem] border border-white/10 bg-white/5 p-4">
      <p className="text-xs uppercase tracking-[0.3em] text-slate-400">{label}</p>
      <p className="mt-3 text-2xl font-semibold tracking-tight text-white">{value}</p>
    </div>
  );
}

function InfoCard({
  title,
  value,
  description,
}: {
  title: string;
  value: string;
  description: string;
}) {
  return (
    <div className="rounded-[1.25rem] border border-white/10 bg-white/5 p-4">
      <p className="text-xs uppercase tracking-[0.3em] text-slate-400">{title}</p>
      <p className="mt-3 break-words text-sm font-medium text-white">{value}</p>
      <p className="mt-2 text-sm leading-6 text-slate-400">{description}</p>
    </div>
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
