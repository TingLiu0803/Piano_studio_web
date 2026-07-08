import type { MetadataRoute } from "next";
import { getBaseUrl } from "@/lib/seo";
import { locales, contentVersion } from "@/content/site";
import { landingPageSlugs } from "@/content/landing-pages";
import { articleSlugs } from "@/content/articles";

/**
 * Static, stable lastModified per route family. Avoids `new Date()` per build
 * (which Google de-weights as noise) — bump `contentVersion` in
 * `content/site.ts` when copy genuinely changes.
 */
const lastModified = new Date(contentVersion);

type RouteSpec = {
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
};

const coreRoutes: RouteSpec[] = [
  { path: "", changeFrequency: "weekly", priority: 1.0 },
  { path: "/trial", changeFrequency: "monthly", priority: 0.9 },
  { path: "/about", changeFrequency: "monthly", priority: 0.8 },
  { path: "/contact", changeFrequency: "yearly", priority: 0.6 },
];

const landingRoutes: RouteSpec[] = landingPageSlugs.map((slug) => ({
  path: `/${slug}`,
  changeFrequency: "monthly",
  priority: 0.9,
}));

const journalRoutes: RouteSpec[] = [
  { path: "/journal", changeFrequency: "weekly", priority: 0.7 },
  ...articleSlugs.map(
    (slug): RouteSpec => ({
      path: `/journal/${slug}`,
      changeFrequency: "monthly",
      priority: 0.6,
    }),
  ),
];

const allRoutes: RouteSpec[] = [
  ...coreRoutes,
  ...landingRoutes,
  ...journalRoutes,
];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getBaseUrl();
  return locales.flatMap((locale) =>
    allRoutes.map((route) => ({
      url: `${baseUrl}/${locale}${route.path}`,
      lastModified,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
      alternates: {
        languages: {
          en: `${baseUrl}/en${route.path}`,
          zh: `${baseUrl}/zh${route.path}`,
          "x-default": `${baseUrl}/en${route.path}`,
        },
      },
    })),
  );
}
