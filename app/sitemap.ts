import { getBaseUrl } from "@/lib/seo";
import { locales } from "@/content/site";

export default function sitemap() {
  const baseUrl = getBaseUrl();
  const routes = ["", "/about", "/trial", "/contact"];

  return locales.flatMap((locale) =>
    routes.map((route) => ({
      url: `${baseUrl}/${locale}${route}`,
      lastModified: new Date(),
    }))
  );
}
