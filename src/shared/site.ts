export const siteConfig = {
  name: "MDV Portfolio",
  description:
    "Portfolio of software ecosystems with a focus on SaaS, AI, architecture and product.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  navigation: [
    { href: "/projects", label: "Projects" },
    { href: "/architecture", label: "Architecture" },
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Contact" },
  ],
  routes: [
    {
      href: "/projects",
      title: "Projects",
      description: "Case studies with architecture, impact and decisions.",
    },
    {
      href: "/architecture",
      title: "Architecture",
      description: "Modeling, patterns, context and technical trade-offs.",
    },
    {
      href: "/blog",
      title: "Blog",
      description: "Technical articles on SaaS, DDD and applied AI.",
    },
    {
      href: "/contact",
      title: "Contact",
      description: "Direct channels for technical or business conversations.",
    },
  ],
  pillars: [
    {
      title: "Product thinking",
      description:
        "Design interfaces that tell a story and convert intent into navigation.",
    },
    {
      title: "Architecture first",
      description:
        "Modular structures with clear boundaries between domain, application and presentation.",
    },
    {
      title: "AI with context",
      description:
        "AI applied to workflows, automation and agents with traceable decisions.",
    },
    {
      title: "Production mindset",
      description:
        "SEO, performance, accessibility and observability as requirements, not ornaments.",
    },
  ],
  highlights: [
    "SaaS multi-tenant",
    "DDD",
    "Workflow engines",
    "AI agents",
    "Operations",
  ],
} as const;

