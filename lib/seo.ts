import type { Metadata } from "next";
import { siteConfig, type Locale, content } from "@/content/site";
import { getFaqItems, type FaqId } from "@/content/faqs";

const DEFAULT_SITE_URL = "https://sanjosepianolesson.com";

export function getBaseUrl() {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL;
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return DEFAULT_SITE_URL;
}

export type MetadataOverrides = {
  title: string;
  description: string;
  keywords?: string;
};

export function buildMetadata(
  locale: Locale,
  path: string,
  pageType?: "trial" | "about" | "contact",
  overrides?: MetadataOverrides
): Metadata {
  const baseUrl = getBaseUrl();
  const socialImage = new URL("/icon.svg", baseUrl).toString();
  const localized = content[locale];
  const url = new URL(path, baseUrl);
  const alternates = {
    canonical: url.toString(),
    languages: {
      en: new URL(path.replace(`/${locale}`, "/en"), baseUrl).toString(),
      zh: new URL(path.replace(`/${locale}`, "/zh"), baseUrl).toString(),
    },
  };

  const pageSeo =
    overrides?.title && overrides?.description
      ? { title: overrides.title, description: overrides.description }
      : pageType && localized.seo.pages?.[pageType]
        ? localized.seo.pages[pageType]
        : null;
  const title = pageSeo?.title ?? localized.seo.title;
  const description = pageSeo?.description ?? localized.seo.description;
  const keywords = overrides?.keywords ?? localized.seo.keywords;

  return {
    metadataBase: new URL(baseUrl),
    title,
    description,
    keywords,
    alternates,
    openGraph: {
      type: "website",
      locale: locale === "en" ? "en_US" : "zh_CN",
      url: url.toString(),
      title,
      description,
      siteName: siteConfig.studioName,
      images: [
        {
          url: socialImage,
          alt: `${siteConfig.studioName} - ${siteConfig.city} piano lessons`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [socialImage],
    },
    other: {
      "content-language": locale,
    },
  };
}

export function buildLocalBusinessJsonLd(locale: Locale) {
  const localized = content[locale];
  const areaServed = siteConfig.serviceAreas.map((area) => ({
    "@type": "Place",
    name: area,
  }));
  const sameAsUrls = [
    ...(siteConfig.googleBusinessProfileUrl
      ? [siteConfig.googleBusinessProfileUrl]
      : []),
    ...siteConfig.socialLinks,
  ];
  const sameAs = sameAsUrls.length > 0 ? sameAsUrls : undefined;
  const baseUrl = getBaseUrl();
  const aboutSnippet = localized.about.body.split("\n")[0];
  const geo = siteConfig.geo
    ? {
        "@type": "GeoCoordinates",
        latitude: siteConfig.geo.latitude,
        longitude: siteConfig.geo.longitude,
      }
    : undefined;
  const hasReviews = siteConfig.reviews.totalCount > 0;
  const aggregateRating = hasReviews
    ? {
        "@type": "AggregateRating",
        ratingValue: String(siteConfig.reviews.averageRating),
        reviewCount: siteConfig.reviews.totalCount,
      }
    : undefined;

  const alternateName =
    locale === "en"
      ? [
          "Private piano lessons in San Jose",
          "San Jose piano lessons",
          "San Jose piano teacher",
        ]
      : ["圣何塞私人钢琴课", "圣何塞钢琴课", "圣何塞钢琴老师"];
  const slogan =
    locale === "en"
      ? "Private 1:1 piano lessons in San Jose, Sunnyvale & the South Bay"
      : "圣何塞、森尼维尔与南湾一对一钢琴私教";
  const teacherJobTitle =
    locale === "en" ? "San Jose piano teacher" : "圣何塞钢琴老师";

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["MusicSchool", "LocalBusiness"],
        "@id": `${baseUrl}/#music-school`,
        name: siteConfig.studioName,
        alternateName,
        slogan,
        description: localized.seo.description,
        areaServed,
        serviceArea: siteConfig.serviceArea,
        knowsAbout: [
          locale === "en"
            ? "Private piano lessons in San Jose"
            : "圣何塞私人钢琴课",
          locale === "en"
            ? "Adult beginner piano instruction"
            : "成人初学者钢琴教学",
          locale === "en"
            ? "Classical piano technique"
            : "古典钢琴技巧",
        ],
        serviceType: [
          "Piano lessons",
          "Private piano lessons",
          "In-person piano lessons",
          "Online piano lessons",
          "Piano lessons for beginners",
          "Piano lessons for adult beginners",
          "Private piano lessons for adults",
        ],
        address: {
          "@type": "PostalAddress",
          streetAddress: siteConfig.addressLine,
          addressLocality: siteConfig.city,
          addressRegion: siteConfig.region,
          addressCountry: siteConfig.country,
        },
        geo,
        telephone: siteConfig.phone,
        email: siteConfig.email,
        url: baseUrl,
        availableLanguage: ["English", "Chinese"],
        priceRange: siteConfig.pricingNote,
        aggregateRating,
        offers: {
          "@type": "Offer",
          name: "Free trial piano lesson",
          price: "0",
          priceCurrency: "USD",
          url: `${baseUrl}/${locale}/trial`,
          description: "Free trial piano lesson for beginners and adult beginners",
        },
        sameAs,
        founder: {
          "@id": `${baseUrl}/#teacher`,
        },
      },
      {
        "@type": "Person",
        "@id": `${baseUrl}/#teacher`,
        name: siteConfig.ownerName,
        jobTitle: teacherJobTitle,
        description: aboutSnippet,
        url: baseUrl,
        knowsAbout: [
          locale === "en"
            ? "Adult beginner piano lessons"
            : "成人初学者钢琴课",
          locale === "en"
            ? "Private one-on-one piano coaching"
            : "一对一钢琴私教",
          locale === "en"
            ? "Classical piano technique and repertoire"
            : "古典钢琴技巧与曲目",
        ],
        hasOccupation: {
          "@type": "Occupation",
          name: teacherJobTitle,
          occupationLocation: {
            "@type": "City",
            name: siteConfig.city,
          },
        },
        worksFor: {
          "@id": `${baseUrl}/#music-school`,
        },
        sameAs,
      },
    ],
  };
}

export function buildFaqJsonLd(locale: Locale, ids?: FaqId[]) {
  const faqs = getFaqItems(locale, ids);

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function buildBreadcrumbJsonLd(locale: Locale, path: string) {
  const baseUrl = getBaseUrl();
  const localized = content[locale];
  const pathSegments = path.split("/").filter(Boolean);
  const breadcrumbs = [
    {
      "@type": "ListItem",
      position: 1,
      name: locale === "en" ? "Home" : "首页",
      item: `${baseUrl}/${locale}`,
    },
  ];

  if (pathSegments.length > 1) {
    const pageName = pathSegments[pathSegments.length - 1];
    const breadcrumbLabels = localized.seo.breadcrumbLabels;
    const fromMap =
      breadcrumbLabels && pageName in breadcrumbLabels
        ? breadcrumbLabels[
            pageName as keyof typeof breadcrumbLabels
          ]
        : undefined;
    const pageLabel =
      pageName === "trial"
        ? localized.nav.trial
        : pageName === "about"
          ? localized.nav.about
          : pageName === "contact"
            ? localized.nav.contact
            : fromMap ?? pageName;

    breadcrumbs.push({
      "@type": "ListItem",
      position: 2,
      name: pageLabel,
      item: `${baseUrl}${path}`,
    });
  }

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs,
  };
}
