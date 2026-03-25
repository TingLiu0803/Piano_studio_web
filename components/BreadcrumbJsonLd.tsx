import JsonLd from "@/components/JsonLd";
import { buildBreadcrumbJsonLd } from "@/lib/seo";
import type { Locale } from "@/content/site";

type BreadcrumbJsonLdProps = {
  locale: Locale;
  path: string;
};

export default function BreadcrumbJsonLd({ locale, path }: BreadcrumbJsonLdProps) {
  return <JsonLd data={buildBreadcrumbJsonLd(locale, path)} />;
}
