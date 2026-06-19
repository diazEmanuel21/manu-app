export const metadata = {
  title: "Contact",
  description: "Professional contact options for technical or business conversations.",
};

export default function ContactPage() {
  return (
    <main className="mx-auto min-h-screen w-full max-w-4xl px-6 py-16 sm:px-8 lg:px-10">
      <div className="space-y-4">
        <p className="text-sm uppercase tracking-[0.35em] text-muted">Contact</p>
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          Clear ways to start a technical conversation.
        </h1>
        <p className="max-w-3xl text-lg leading-8 text-muted">
          This section will later connect Resend, analytics and CRM workflows. For now it
          establishes the intent and the entry point.
        </p>
      </div>

      <section className="mt-12 rounded-[1.75rem] border border-border bg-surface p-6">
        <p className="text-sm uppercase tracking-[0.3em] text-muted">Primary channel</p>
        <a className="mt-3 block text-2xl font-semibold text-foreground" href="mailto:hello@mdvportfolio.dev">
          hello@mdvportfolio.dev
        </a>
      </section>
    </main>
  );
}
