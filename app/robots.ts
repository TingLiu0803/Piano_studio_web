import { getBaseUrl } from "@/lib/seo";

export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${getBaseUrl()}/sitemap.xml`,
  };
}
