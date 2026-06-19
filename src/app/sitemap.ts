import type { MetadataRoute } from "next";

import { siteConfig } from "@/shared/site";
import { projectShowcases } from "@/shared/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    {
      url: siteConfig.url,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1,
    },
    ...siteConfig.routes.map((route) => {
      const changeFrequency =
        route.href === "/blog" ? ("weekly" as const) : ("monthly" as const);

      return {
        url: `${siteConfig.url}${route.href}`,
        lastModified: now,
        changeFrequency,
        priority: route.href === "/contact" ? 0.6 : 0.8,
      };
    }),
    ...projectShowcases.map((project) => ({
      url: `${siteConfig.url}${project.href}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: project.href === "/projects/address-routing" ? 0.75 : 0.7,
    })),
  ];
}
