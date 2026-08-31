import type { Metadata } from "next";
import {
  siteConfig,
  type Locale,
  content,
  contentVersion,
} from "@/content/site";
import { getFaqItems, type FaqId } from "@/content/faqs";
import type { Article } from "@/content/articles";

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

function absoluteUrl(path: string): string {
  return new URL(path, getBaseUrl()).toString();
}

export type MetadataOverrides = {
  title: string;
  description: string;
  keywords?: string;
  /** Optional override for social/OG image (absolute or root-relative URL). */
  image?: string;
};

/**
 * Build per-locale path -> URL map for `alternates.languages` plus `x-default`
 * (which Google's hreflang validator recommends for bilingual/multilingual
 * sites). Always points `x-default` at the English path.
 */
function buildLanguageAlternates(locale: Locale, path: string) {
  const baseUrl = getBaseUrl();
  const enPath = locale === "en" ? path : path.replace(`/${locale}`, "/en");
  const zhPath = locale === "zh" ? path : path.replace(`/${locale}`, "/zh");

  return {
    en: new URL(enPath, baseUrl).toString(),
    zh: new URL(zhPath, baseUrl).toString(),
    "x-default": new URL(enPath, baseUrl).toString(),
  };
}

export function buildMetadata(
  locale: Locale,
  path: string,
  pageType?: "trial" | "about" | "contact",
  overrides?: MetadataOverrides
): Metadata {
  const baseUrl = getBaseUrl();
  const socialImage = absoluteUrl(overrides?.image ?? siteConfig.images.ogDefault);
  const localized = content[locale];
  const url = new URL(path, baseUrl);
  const alternates = {
    canonical: url.toString(),
    languages: buildLanguageAlternates(locale, path),
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
          width: 1200,
          height: 630,
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
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-snippet": -1,
        "max-image-preview": "large",
        "max-video-preview": -1,
      },
    },
    other: {
      "content-language": locale,
    },
  };
}

/**
 * Build the studio's primary entity graph: WebSite + MusicSchool/LocalBusiness +
 * Person + Service nodes. Emitted on the locale root layout so it appears on
 * every page (Google + LLM crawlers de-duplicate by @id).
 */
export function buildLocalBusinessJsonLd(locale: Locale) {
  const localized = content[locale];
  const baseUrl = getBaseUrl();
  const areaServed = siteConfig.serviceAreas.map((area) => ({
    "@type": "Place",
    name: area,
  }));
  const sameAsStudio = [
    ...(siteConfig.googleBusinessProfileUrl
      ? [siteConfig.googleBusinessProfileUrl]
      : []),
    ...siteConfig.socialLinks,
  ].filter(Boolean);
  const sameAsTeacher = [...siteConfig.ownerProfiles].filter(Boolean);
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
        bestRating: "5",
        worstRating: "1",
      }
    : undefined;

  const alternateName =
    locale === "en"
      ? [
          "Eric Liu Piano Studio Cupertino",
          "Cupertino piano lessons",
          "Private piano lessons Cupertino",
        ]
      : ["Eric Liu 库比蒂诺钢琴工作室", "库比蒂诺钢琴课", "库比蒂诺私人钢琴课"];
  const slogan =
    locale === "en"
      ? "Private 1:1 piano lessons at a Cupertino studio serving the South Bay"
      : "库比蒂诺工作室一对一钢琴私教，服务南湾通勤学员";
  const teacherJobTitle =
    locale === "en" ? "Cupertino piano teacher" : "库比蒂诺钢琴老师";

  const dayMap: Record<string, string> = {
    Monday: "Mo",
    Tuesday: "Tu",
    Wednesday: "We",
    Thursday: "Th",
    Friday: "Fr",
    Saturday: "Sa",
    Sunday: "Su",
  };

  const openingHoursSpecification = siteConfig.openingHours.map((slot) => ({
    "@type": "OpeningHoursSpecification",
    dayOfWeek: slot.days,
    opens: slot.opens,
    closes: slot.closes,
  }));

  const openingHours = siteConfig.openingHours.map(
    (slot) =>
      `${slot.days.map((day) => dayMap[day] ?? day.slice(0, 2)).join(",")} ${slot.opens}-${slot.closes}`,
  );

  const reviewNodes = siteConfig.reviews.totalCount > 0 ? buildReviewNodes(locale, baseUrl) : [];

  const courseNodes = buildCourseNodes(locale, baseUrl);
  const serviceNodes = buildServiceNodes(locale, baseUrl);
  const videoNodes = buildVideoNodes(baseUrl);

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${baseUrl}/#website`,
        url: baseUrl,
        name: siteConfig.studioName,
        inLanguage: locale === "en" ? "en-US" : "zh-CN",
        publisher: { "@id": `${baseUrl}/#music-school` },
      },
      {
        "@type": "Organization",
        "@id": `${baseUrl}/#organization`,
        name: siteConfig.studioName,
        url: baseUrl,
        logo: {
          "@type": "ImageObject",
          url: absoluteUrl(siteConfig.images.logo),
        },
        sameAs: sameAsStudio.length > 0 ? sameAsStudio : undefined,
      },
      {
        "@type": ["MusicSchool", "LocalBusiness"],
        "@id": `${baseUrl}/#music-school`,
        name: siteConfig.studioName,
        alternateName,
        slogan,
        description: localized.seo.description,
        image: [absoluteUrl(siteConfig.images.studio)],
        logo: absoluteUrl(siteConfig.images.logo),
        areaServed,
        serviceArea: siteConfig.serviceArea,
        knowsAbout: [
          locale === "en"
            ? "Private piano lessons in Cupertino"
            : "库比蒂诺私人钢琴课",
          locale === "en"
            ? "Adult beginner piano instruction"
            : "成人初学者钢琴教学",
          locale === "en"
            ? "Classical piano technique"
            : "古典钢琴技巧",
          locale === "en"
            ? "Piano performance coaching"
            : "钢琴演奏指导",
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
          streetAddress: siteConfig.streetAddress ?? siteConfig.addressLine,
          addressLocality: siteConfig.city,
          addressRegion: siteConfig.region,
          postalCode: siteConfig.postalCode,
          addressCountry: siteConfig.country,
        },
        geo,
        telephone: siteConfig.phoneE164,
        email: siteConfig.email,
        url: baseUrl,
        availableLanguage: ["en", "zh"],
        priceRange: siteConfig.priceRangeToken,
        openingHours,
        openingHoursSpecification,
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "Customer Service",
          telephone: siteConfig.phoneE164,
          email: siteConfig.email,
          availableLanguage: ["English", "Chinese"],
          areaServed: siteConfig.country,
        },
        aggregateRating,
        review: reviewNodes.length > 0 ? reviewNodes : undefined,
        offers: {
          "@type": "Offer",
          name: locale === "en" ? "Free trial piano lesson" : "免费试听钢琴课",
          price: "0",
          priceCurrency: "USD",
          url: `${baseUrl}/${locale}/trial`,
          availability: "https://schema.org/InStock",
          description:
            locale === "en"
              ? "Free trial piano lesson for beginners and adult beginners."
              : "面向初学者与成人初学者的免费试听钢琴课。",
        },
        makesOffer: courseNodes.map((course) => ({
          "@type": "Offer",
          itemOffered: { "@id": course["@id"] },
        })),
        sameAs: sameAsStudio.length > 0 ? sameAsStudio : undefined,
        memberOf: { "@id": `${baseUrl}/#musicnbrain` },
        founder: { "@id": `${baseUrl}/#teacher` },
        employee: { "@id": `${baseUrl}/#teacher` },
        dateModified: contentVersion,
      },
      {
        "@type": "Organization",
        "@id": `${baseUrl}/#musicnbrain`,
        name: siteConfig.entityLinks.musicnbrain.name,
        url: siteConfig.entityLinks.musicnbrain.url,
        description:
          locale === "en"
            ? "Nonprofit supporting youth piano performance and community programs; Eric Liu serves on the board."
            : "支持青少年钢琴演出与社区音乐项目的非营利机构；Eric Liu 担任理事。",
      },
      {
        "@type": "Person",
        "@id": `${baseUrl}/#teacher`,
        name: siteConfig.ownerName,
        givenName: siteConfig.ownerName.split(" ")[0],
        familyName: siteConfig.ownerName.split(" ").slice(1).join(" "),
        jobTitle: teacherJobTitle,
        description: aboutSnippet,
        image: absoluteUrl(siteConfig.images.teacher),
        url: `${baseUrl}/${locale}/about`,
        availableLanguage: ["en", "zh"],
        knowsLanguage: ["en", "zh"],
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
          locale === "en"
            ? "Practice strategy for adult learners"
            : "成人练琴策略",
        ],
        alumniOf: [
          {
            "@type": "EducationalOrganization",
            name: siteConfig.entityLinks.sfcm.name,
            url: siteConfig.entityLinks.sfcm.url,
          },
          {
            "@type": "EducationalOrganization",
            name: siteConfig.entityLinks.stanford.name,
            url: siteConfig.entityLinks.stanford.url,
          },
        ],
        colleague: [
          {
            "@type": "Person",
            name: siteConfig.entityLinks.mentorErna.name,
            affiliation: siteConfig.entityLinks.mentorErna.affiliation,
          },
          {
            "@type": "Person",
            name: siteConfig.entityLinks.mentorFrank.name,
            affiliation: siteConfig.entityLinks.mentorFrank.affiliation,
          },
        ],
        hasOccupation: {
          "@type": "Occupation",
          name: teacherJobTitle,
          occupationLocation: {
            "@type": "City",
            name: siteConfig.city,
          },
          skills: [
            "Piano performance",
            "Adult piano pedagogy",
            "Classical piano technique",
          ],
        },
        worksFor: { "@id": `${baseUrl}/#music-school` },
        memberOf: { "@id": `${baseUrl}/#musicnbrain` },
        sameAs: sameAsTeacher.length > 0 ? sameAsTeacher : undefined,
        dateModified: contentVersion,
      },
      ...serviceNodes,
      ...courseNodes,
      ...videoNodes,
    ],
  };
}

/**
 * Per-lesson `Service` nodes attached to MusicSchool via @id reference.
 * Eligible for Google's Service rich result and gives LLMs explicit, named
 * services to cite.
 */
function buildServiceNodes(locale: Locale, baseUrl: string) {
  const services =
    locale === "en"
      ? [
          {
            id: "private-piano-adults",
            name: "Private piano lessons for adults",
            slug: "adult-piano-lessons",
            description:
              "Private 1:1 piano lessons in San Jose and the South Bay for adult beginners, restarters, and advancing adult hobbyists.",
          },
          {
            id: "private-piano-kids",
            name: "Private piano lessons for kids (ages 5+)",
            slug: "kids-piano-lessons",
            description:
              "Private 1:1 piano lessons in San Jose for children and teens ages 5+, with calm structured weekly assignments.",
          },
          {
            id: "online-piano",
            name: "Online private piano lessons",
            slug: "online-piano-lessons",
            description:
              "Live online private 1:1 piano lessons for adults and kids, with the same weekly structure and accountability as in-person lessons.",
          },
          {
            id: "san-jose-piano-teacher",
            name: "Cupertino piano teacher serving San Jose & South Bay",
            slug: "piano-teacher-san-jose",
            description:
              "Private piano teacher based in Cupertino; students travel from San Jose and the South Bay. Classical training, structured practice, in-person or online.",
          },
        ]
      : [
          {
            id: "private-piano-adults",
            name: "圣何塞成人钢琴私教",
            slug: "adult-piano-lessons",
            description:
              "面向成人初学者、重拾者与进阶爱好者的圣何塞与南湾一对一钢琴私教。",
          },
          {
            id: "private-piano-kids",
            name: "圣何塞儿童钢琴课（5 岁以上）",
            slug: "kids-piano-lessons",
            description:
              "面向 5 岁以上儿童与青少年的圣何塞一对一钢琴课，注重健康手型与每周清晰作业。",
          },
          {
            id: "online-piano",
            name: "线上钢琴私教课",
            slug: "online-piano-lessons",
            description: "面向成人与儿童的线上一对一钢琴课，结构与线下一致。",
          },
          {
            id: "san-jose-piano-teacher",
            name: "圣何塞钢琴老师（私教）",
            slug: "piano-teacher-san-jose",
            description:
              "圣何塞与南湾私人钢琴老师：古典训练、系统化练习方法，线下或线上。",
          },
        ];

  return services.map((svc) => ({
    "@type": "Service",
    "@id": `${baseUrl}/#service-${svc.id}`,
    name: svc.name,
    description: svc.description,
    serviceType: "Piano lessons",
    provider: { "@id": `${baseUrl}/#music-school` },
    areaServed: siteConfig.serviceAreas.map((area) => ({
      "@type": "Place",
      name: area,
    })),
    url: `${baseUrl}/${locale}/${svc.slug}`,
    availableLanguage: ["en", "zh"],
  }));
}

/** Course nodes per lesson type (eligible for Google Courses rich result). */
function buildCourseNodes(locale: Locale, baseUrl: string) {
  const courses =
    locale === "en"
      ? [
          {
            id: "course-adult",
            slug: "adult-piano-lessons",
            name: "Private piano lessons for adults",
            description:
              "Structured weekly 1:1 piano lessons for adult beginners and restarters in San Jose and the South Bay.",
          },
          {
            id: "course-kids",
            slug: "kids-piano-lessons",
            name: "Private piano lessons for kids (ages 5+)",
            description:
              "Weekly 1:1 piano lessons for children and teens ages 5+, with healthy technique and clear weekly assignments.",
          },
          {
            id: "course-online",
            slug: "online-piano-lessons",
            name: "Online private piano lessons",
            description:
              "Live online weekly 1:1 piano lessons for adults and motivated kids, taught by a Cupertino-based teacher.",
          },
        ]
      : [
          {
            id: "course-adult",
            slug: "adult-piano-lessons",
            name: "成人钢琴私教课程",
            description: "面向圣何塞与南湾成人初学者与重拾者的每周一对一钢琴课。",
          },
          {
            id: "course-kids",
            slug: "kids-piano-lessons",
            name: "儿童钢琴私教课程（5 岁以上）",
            description: "面向 5 岁以上儿童与青少年的每周一对一钢琴课程。",
          },
          {
            id: "course-online",
            slug: "online-piano-lessons",
            name: "线上钢琴私教课程",
            description: "由圣何塞老师授课的线上每周一对一钢琴课，面向成人与儿童。",
          },
        ];

  return courses.map((course) => ({
    "@type": "Course",
    "@id": `${baseUrl}/#${course.id}`,
    name: course.name,
    description: course.description,
    provider: { "@id": `${baseUrl}/#music-school` },
    url: `${baseUrl}/${locale}/${course.slug}`,
    inLanguage: [locale === "en" ? "en-US" : "zh-CN"],
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: course.slug === "online-piano-lessons" ? "Online" : "Mixed",
      courseWorkload: "PT1H",
      inLanguage: locale === "en" ? "en-US" : "zh-CN",
      offers: {
        "@type": "Offer",
        category: "Tuition",
        availability: "https://schema.org/InStock",
        url: `${baseUrl}/${locale}/contact`,
      },
    },
  }));
}

/**
 * Individual Review nodes derived from on-page testimonials.
 *
 * NOTE: `itemReviewed` is intentionally omitted. These Review nodes are nested
 * inside the parent `LocalBusiness.review` array, so the reviewed entity is
 * implied by the parent. Including `itemReviewed` here creates a circular
 * reference that Google Search Console flags as a structured-data warning
 * ("A nested object can't contain the 'itemReviewed' field"). Same reason for
 * omitting `publisher` — the parent context already provides it.
 */
function buildReviewNodes(locale: Locale, baseUrl: string) {
  const localized = content[locale];
  return localized.testimonials.map((t, idx) => ({
    "@type": "Review",
    "@id": `${baseUrl}/#review-${idx + 1}`,
    author: { "@type": "Person", name: t.name },
    reviewBody: t.quote,
    reviewRating: {
      "@type": "Rating",
      ratingValue: "5",
      bestRating: "5",
      worstRating: "1",
    },
  }));
}

/** VideoObject nodes for the studio's performance videos. */
function buildVideoNodes(baseUrl: string) {
  return siteConfig.bilibiliVideos.map((video) => ({
    "@type": "VideoObject",
    "@id": `${baseUrl}/#video-${video.bvid}`,
    name: video.title,
    description: video.description,
    thumbnailUrl: absoluteUrl(video.thumbnailUrl),
    uploadDate: video.uploadDate,
    duration: video.duration,
    embedUrl: video.embedUrl,
    contentUrl: video.watchUrl,
    publisher: { "@id": `${baseUrl}/#music-school` },
    inLanguage: "en",
  }));
}

/** A visible question/answer pair (e.g. a landing page's `commonObjections`). */
export type FaqQuestionAnswer = { question: string; answer: string };

/**
 * Single FAQPage node per page. `extraItems` lets pages fold additional
 * visible Q&A blocks (e.g. landing-page `commonObjections`) into the same
 * FAQPage entity instead of emitting a second one. Items are de-duplicated by
 * exact question text so overlapping curated FAQs never produce duplicate
 * Question entities.
 */
export function buildFaqJsonLd(
  locale: Locale,
  ids?: FaqId[],
  extraItems?: FaqQuestionAnswer[],
) {
  const faqs: FaqQuestionAnswer[] = [
    ...getFaqItems(locale, ids),
    ...(extraItems ?? []),
  ];
  const seen = new Set<string>();
  const uniqueFaqs = faqs.filter((faq) => {
    if (seen.has(faq.question)) return false;
    seen.add(faq.question);
    return true;
  });

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: uniqueFaqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

/**
 * Breadcrumb JSON-LD with multi-segment support. Used by home, landing pages,
 * about/trial/contact, and the journal section (3 levels).
 */
export function buildBreadcrumbJsonLd(locale: Locale, path: string) {
  const baseUrl = getBaseUrl();
  const localized = content[locale];
  const pathSegments = path.split("/").filter(Boolean);
  const breadcrumbs: { "@type": string; position: number; name: string; item: string }[] = [
    {
      "@type": "ListItem",
      position: 1,
      name: locale === "en" ? "Home" : "首页",
      item: `${baseUrl}/${locale}`,
    },
  ];

  const breadcrumbLabels = localized.seo.breadcrumbLabels;
  const labelForSegment = (segment: string): string => {
    if (segment === "trial") return localized.nav.trial;
    if (segment === "about") return localized.nav.about;
    if (segment === "contact") return localized.nav.contact;
    if (segment === "journal") return locale === "en" ? "Journal" : "学琴笔记";
    if (segment === "practice-games") return localized.nav.practiceGames;
    if (breadcrumbLabels && segment in breadcrumbLabels) {
      return breadcrumbLabels[segment as keyof typeof breadcrumbLabels];
    }
    return segment.replace(/-/g, " ");
  };

  let cumulative = `/${locale}`;
  for (let i = 1; i < pathSegments.length; i += 1) {
    const segment = pathSegments[i];
    cumulative = `${cumulative}/${segment}`;
    breadcrumbs.push({
      "@type": "ListItem",
      position: i + 1,
      name: labelForSegment(segment),
      item: `${baseUrl}${cumulative}`,
    });
  }

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs,
  };
}

/**
 * Speakable schema enabling Google Assistant and AI extraction to surface the
 * marked CSS selectors as the page's primary spoken answer.
 *
 * `selectors` must only reference elements the page actually renders: pages
 * with a `QuickAnswer` block keep the default `[".quick-answer", "h1"]`;
 * pages without one (e.g. the homepage) should pass `["h1"]`.
 */
export function buildSpeakableJsonLd(
  locale: Locale,
  path: string,
  selectors: string[] = [".quick-answer", "h1"],
) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${absoluteUrl(path)}#speakable`,
    url: absoluteUrl(path),
    inLanguage: locale === "en" ? "en-US" : "zh-CN",
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: selectors,
    },
  };
}

/**
 * Article JSON-LD with linked Person author. Combine with `buildHowToJsonLd`
 * when the article includes a how-to section.
 */
export function buildArticleJsonLd(locale: Locale, article: Article) {
  const baseUrl = getBaseUrl();
  const url = `${baseUrl}/${locale}/journal/${article.slug}`;
  const images = article.figures?.length
    ? article.figures.map((figure) => absoluteUrl(figure.src))
    : [absoluteUrl(siteConfig.images.ogDefault)];
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${url}#article`,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    headline: article.title,
    description: article.description,
    inLanguage: locale === "en" ? "en-US" : "zh-CN",
    datePublished: article.datePublished,
    dateModified: article.dateModified,
    author: { "@id": `${baseUrl}/#teacher` },
    publisher: { "@id": `${baseUrl}/#music-school` },
    image: images,
    articleSection: article.category,
    keywords: article.keywords ?? [
      "piano lessons",
      "san jose",
      "adult piano",
      "private lessons",
      article.category,
    ],
  };
}

export function buildHowToJsonLd(locale: Locale, article: Article) {
  if (!article.howTo) return null;
  const baseUrl = getBaseUrl();
  const url = `${baseUrl}/${locale}/journal/${article.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "@id": `${url}#howto`,
    name: article.howTo.name,
    description: article.howTo.description,
    totalTime: article.howTo.totalTimeIso,
    step: article.howTo.steps.map((step, idx) => ({
      "@type": "HowToStep",
      position: idx + 1,
      name: step.name,
      text: step.text,
    })),
    inLanguage: locale === "en" ? "en-US" : "zh-CN",
  };
}
