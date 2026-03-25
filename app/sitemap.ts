import { getBaseUrl } from "@/lib/seo";
import { locales } from "@/content/site";
import { landingPageSlugs } from "@/content/landing-pages";

export default function sitemap() {
  const baseUrl = getBaseUrl();
  const landingRoutes = landingPageSlugs.map((slug) => `/${slug}`);
  const routes = ["", "/about", "/trial", "/contact", ...landingRoutes];

  return locales.flatMap((locale) =>
    routes.map((route) => ({
      url: `${baseUrl}/${locale}${route}`,
      lastModified: new Date(),
    }))
  );
}
