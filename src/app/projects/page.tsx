import Link from "next/link";

import { projectShowcases } from "@/shared/projects";

export const metadata = {
  title: "Projects",
  description: "Case studies focused on architecture, impact and trade-offs.",
};

export default function ProjectsPage() {
  return (
    <main className="mx-auto min-h-screen w-full max-w-6xl px-6 py-16 sm:px-8 lg:px-10">
      <div className="max-w-3xl space-y-4">
        <p className="text-sm uppercase tracking-[0.35em] text-muted">Projects</p>
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          Case studies that explain how systems are built.
        </h1>
        <p className="text-lg leading-8 text-muted">
          The goal is not to show screenshots. The goal is to show architecture, decisions,
          and business impact.
        </p>
      </div>

      <section className="mt-12 grid gap-4 md:grid-cols-2">
        {projectShowcases.map((project) => (
          <Link
            key={project.href}
            href={project.href}
            className="group rounded-[1.75rem] border border-border bg-surface p-6 transition hover:border-accent/40 hover:bg-surface-strong"
          >
            <div className="flex items-start justify-between gap-4">
              <p className="text-xs uppercase tracking-[0.3em] text-muted">Case study</p>
              <span className="rounded-full border border-border bg-black/10 px-3 py-1 text-[11px] uppercase tracking-[0.25em] text-muted">
                {project.tag}
              </span>
            </div>
            <h2 className="mt-4 text-2xl font-semibold">{project.name}</h2>
            <p className="mt-3 max-w-xl text-sm leading-7 text-muted">{project.summary}</p>
            <p className="mt-6 text-sm font-medium text-accent transition group-hover:translate-x-0.5">
              Open project →
            </p>
          </Link>
        ))}
      </section>
    </main>
  );
}
