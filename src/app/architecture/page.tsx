export const metadata = {
  title: "Architecture",
  description: "Clean Architecture, DDD and systems thinking applied to real products.",
};

const topics = [
  "Clean Architecture",
  "DDD",
  "Event-Driven Architecture",
  "Multi-Tenancy",
  "RBAC",
  "Workflow Engines",
  "AI Agents",
];

export default function ArchitecturePage() {
  return (
    <main className="mx-auto min-h-screen w-full max-w-6xl px-6 py-16 sm:px-8 lg:px-10">
      <div className="max-w-3xl space-y-4">
        <p className="text-sm uppercase tracking-[0.35em] text-muted">Architecture</p>
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          Systems thinking made visible.
        </h1>
        <p className="text-lg leading-8 text-muted">
          This section will explain why the portfolio is structured the way it is and how
          its architectural decisions map to production systems.
        </p>
      </div>

      <section className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {topics.map((topic) => (
          <article key={topic} className="rounded-3xl border border-border bg-surface p-5">
            <p className="text-sm font-medium">{topic}</p>
          </article>
        ))}
      </section>
    </main>
  );
}