export const metadata = {
  title: "Blog",
  description: "MDX-powered technical articles on SaaS, AI and architecture.",
};

const articles = [
  "Building Multi-Tenant SaaS",
  "AI Agent Architectures",
  "DDD in Node.js",
  "Next.js 16 in Production",
  "Scalable Workflow Design",
];

export default function BlogPage() {
  return (
    <main className="mx-auto min-h-screen w-full max-w-6xl px-6 py-16 sm:px-8 lg:px-10">
      <div className="max-w-3xl space-y-4">
        <p className="text-sm uppercase tracking-[0.35em] text-muted">Blog</p>
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          Technical essays that reinforce the architecture narrative.
        </h1>
        <p className="text-lg leading-8 text-muted">
          The blog will be MDX-based, SEO-friendly and aligned with the systems strategy.
        </p>
      </div>

      <section className="mt-12 grid gap-3 sm:grid-cols-2">
        {articles.map((article) => (
          <article key={article} className="rounded-3xl border border-border bg-surface p-5">
            <p className="text-sm font-medium">{article}</p>
          </article>
        ))}
      </section>
    </main>
  );
}

