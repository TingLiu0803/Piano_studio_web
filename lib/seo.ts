import type { Metadata } from "next";
import { siteConfig, type Locale, content } from "@/content/site";

const DEFAULT_SITE_URL = "https://www.levypianostudio.com";

export function getBaseUrl() {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL;
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return DEFAULT_SITE_URL;
}

export function buildMetadata(locale: Locale, path: string): Metadata {
  const baseUrl = getBaseUrl();
  const localized = content[locale];
  const url = new URL(path, baseUrl);
  const alternates = {
    canonical: url.toString(),
    languages: {
      en: new URL(path.replace(`/${locale}`, "/en"), baseUrl).toString(),
      zh: new URL(path.replace(`/${locale}`, "/zh"), baseUrl).toString(),
    },
  };

  return {
    metadataBase: new URL(baseUrl),
    title: localized.seo.title,
    description: localized.seo.description,
    keywords: localized.seo.keywords,
    alternates,
    openGraph: {
      type: "website",
      locale: locale === "en" ? "en_US" : "zh_CN",
      url: url.toString(),
      title: localized.seo.title,
      description: localized.seo.description,
      siteName: siteConfig.studioName,
    },
    twitter: {
      card: "summary_large_image",
      title: localized.seo.title,
      description: localized.seo.description,
    },
    other: {
      "content-language": locale,
    },
  };
}

export function buildLocalBusinessJsonLd(locale: Locale) {
  const localized = content[locale];
  return {
    "@context": "https://schema.org",
    "@type": "MusicSchool",
    name: siteConfig.studioName,
    description: localized.seo.description,
    areaServed: siteConfig.serviceArea,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.addressLine,
      addressLocality: siteConfig.city,
      addressRegion: siteConfig.region,
      addressCountry: siteConfig.country,
    },
    telephone: siteConfig.phone,
    email: siteConfig.email,
    url: getBaseUrl(),
  };
}
