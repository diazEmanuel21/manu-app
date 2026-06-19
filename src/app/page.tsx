import Link from "next/link";

import { projectShowcases } from "@/shared/projects";
import { siteConfig } from "@/shared/site";

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-6 py-6 sm:px-8 lg:px-10">
      <header className="flex items-center justify-between rounded-full border border-border/70 bg-surface/70 px-4 py-3 backdrop-blur-xl">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-muted">
            {siteConfig.name}
          </p>
        </div>
        <nav className="hidden gap-6 text-sm text-muted md:flex">
          {siteConfig.navigation.map((item) => (
            <Link key={item.href} href={item.href} className="transition hover:text-foreground">
              {item.label}
            </Link>
          ))}
        </nav>
      </header>

      <section className="grid flex-1 gap-8 py-16 lg:grid-cols-[1.35fr_0.95fr] lg:items-center lg:py-20">
        <div className="space-y-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 text-sm text-muted backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-accent" />
            Software ecosystems, SaaS, AI and scalable architectures
          </div>

          <div className="space-y-6">
            <h1 className="max-w-3xl text-5xl font-semibold leading-none tracking-tight text-balance sm:text-6xl lg:text-7xl">
              I build software ecosystems.
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-muted sm:text-xl">
              Full Stack Engineer specialized in SaaS, AI and scalable architectures.
              This portfolio is designed as a product experience, not a gallery of screenshots.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/projects"
              className="inline-flex items-center justify-center rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background transition hover:translate-y-[-1px]"
            >
              View projects
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full border border-border bg-surface px-5 py-3 text-sm font-medium text-foreground transition hover:border-accent/50 hover:bg-surface-strong"
            >
              Start a conversation
            </Link>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {siteConfig.pillars.map((pillar) => (
              <article
                key={pillar.title}
                className="rounded-3xl border border-border bg-surface/80 p-5 backdrop-blur-xl"
              >
                <p className="text-sm font-semibold text-foreground">{pillar.title}</p>
                <p className="mt-2 text-sm leading-6 text-muted">{pillar.description}</p>
              </article>
            ))}
          </div>
        </div>

        <aside className="space-y-4 rounded-[2rem] border border-border bg-surface-strong p-5 shadow-2xl shadow-black/20 backdrop-blur-2xl">
          <div className="rounded-[1.5rem] border border-border bg-[linear-gradient(180deg,rgba(76,201,240,0.18),rgba(10,16,28,0.9))] p-5">
            <p className="text-xs uppercase tracking-[0.35em] text-muted">Narrative</p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight">
              From product idea to production system.
            </h2>
            <p className="mt-4 text-sm leading-6 text-muted">
              The site will evolve through clear slices: projects, architecture, blog and contact.
            </p>
          </div>

          <Link
            href={projectShowcases[0].href}
            className="group rounded-[1.5rem] border border-border bg-surface px-5 py-5 transition hover:border-accent/40 hover:bg-surface-strong"
          >
            <p className="text-xs uppercase tracking-[0.35em] text-muted">Featured module</p>
            <h2 className="mt-3 text-xl font-semibold tracking-tight text-foreground">
              {projectShowcases[0].name}
            </h2>
            <p className="mt-3 text-sm leading-6 text-muted">
              {projectShowcases[0].summary}
            </p>
            <p className="mt-5 text-sm font-medium text-accent transition group-hover:translate-x-0.5">
              Explore the routing engine →
            </p>
          </Link>

          <div className="grid gap-3">
            {siteConfig.routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className="group rounded-2xl border border-border bg-surface px-4 py-4 transition hover:border-accent/40 hover:bg-surface-strong"
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-foreground">{route.title}</p>
                    <p className="mt-1 text-sm leading-6 text-muted">{route.description}</p>
                  </div>
                  <span className="text-sm text-accent transition group-hover:translate-x-0.5">
                    ↗
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <div className="flex flex-wrap gap-2 pt-2">
            {siteConfig.highlights.map((item) => (
              <span
                key={item}
                className="rounded-full border border-border bg-black/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-muted"
              >
                {item}
              </span>
            ))}
          </div>
        </aside>
      </section>
    </main>
  );
}
