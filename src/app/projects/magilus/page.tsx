export const metadata = {
  title: "Magilus",
  description: "Commercial and operational management platform case study.",
};

export default function MagilusPage() {
  return (
    <main className="mx-auto min-h-screen w-full max-w-4xl px-6 py-16 sm:px-8 lg:px-10">
      <div className="space-y-4">
        <p className="text-sm uppercase tracking-[0.35em] text-muted">Projects / Magilus</p>
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          Quote, sale, production and dispatch in a single operational flow.
        </h1>
        <p className="max-w-3xl text-lg leading-8 text-muted">
          This page will model the domain, workflows, and architectural decisions behind
          the commercial and operations pipeline.
        </p>
      </div>
    </main>
  );
}

