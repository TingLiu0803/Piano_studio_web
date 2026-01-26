import type { Metadata } from "next";
import { siteConfig, type Locale, content } from "@/content/site";

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

export function buildMetadata(
  locale: Locale,
  path: string,
  pageType?: "trial" | "about" | "contact"
): Metadata {
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

  // Use page-specific SEO if available, otherwise use default
  const pageSeo =
    pageType && localized.seo.pages?.[pageType]
      ? localized.seo.pages[pageType]
      : null;
  const title = pageSeo?.title ?? localized.seo.title;
  const description = pageSeo?.description ?? localized.seo.description;

  return {
    metadataBase: new URL(baseUrl),
    title,
    description,
    keywords: localized.seo.keywords,
    alternates,
    openGraph: {
      type: "website",
      locale: locale === "en" ? "en_US" : "zh_CN",
      url: url.toString(),
      title,
      description,
      siteName: siteConfig.studioName,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
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
  const sameAs =
    siteConfig.socialLinks.length > 0 ? siteConfig.socialLinks : undefined;
  const baseUrl = getBaseUrl();
  const aboutSnippet = localized.about.body.split("\n")[0];
  const geo = siteConfig.geo
    ? {
        "@type": "GeoCoordinates",
        latitude: siteConfig.geo.latitude,
        longitude: siteConfig.geo.longitude,
      }
    : undefined;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "MusicSchool",
        "@id": `${baseUrl}/#music-school`,
        name: siteConfig.studioName,
        description: localized.seo.description,
        areaServed,
        serviceArea: siteConfig.serviceArea,
        serviceType: [
          "Piano lessons",
          "Online piano lessons",
          "Piano lessons for beginners",
          "Piano lessons for adult beginners",
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
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "5",
          reviewCount: "3",
          bestRating: "5",
          worstRating: "1",
        },
        offers: {
          "@type": "Offer",
          name: "Free trial piano lesson",
          price: "0",
          priceCurrency: "USD",
          url: `${baseUrl}/en/trial`,
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
        jobTitle: "Piano Teacher",
        description: aboutSnippet,
        url: baseUrl,
        worksFor: {
          "@id": `${baseUrl}/#music-school`,
        },
        sameAs,
      },
    ],
  };
}

export function buildFaqJsonLd(locale: Locale) {
  const localized = content[locale];
  const baseUrl = getBaseUrl();

  const faqs = [
    {
      question:
        locale === "en"
          ? "Do you offer free trial piano lessons?"
          : "你们提供免费试听钢琴课吗？",
      answer:
        locale === "en"
          ? "Yes! We offer completely free trial piano lessons for all beginners and adult beginners. Book your free trial lesson today - no credit card required."
          : "是的！我们为所有初学者和成人初学者提供完全免费的试听钢琴课。立即预约您的免费试听课 - 无需信用卡。",
    },
    {
      question:
        locale === "en"
          ? "Do you teach piano lessons for adult beginners?"
          : "你们教成人初学者钢琴课吗？",
      answer:
        locale === "en"
          ? "Absolutely! I specialize in teaching adult beginners. I started seriously learning piano after age 25 and reached conservatory-level advanced playing as an adult, so I understand the unique challenges adult learners face."
          : "当然！我专门教授成人初学者。我在25岁后才开始认真学钢琴，并在成年后达到了音乐学院水平的高级演奏，所以我了解成人学习者面临的独特挑战。",
    },
    {
      question:
        locale === "en"
          ? "What areas do you serve for piano lessons?"
          : "你们在哪些地区提供钢琴课？",
      answer:
        locale === "en"
          ? "I offer piano lessons in San Jose, South Bay, and throughout the SF Bay Area including Sunnyvale, Santa Clara, Cupertino, Mountain View, Palo Alto, Los Gatos, Saratoga, Campbell, and Milpitas. I also offer online piano lessons."
          : "我在圣何塞、南湾和整个旧金山湾区提供钢琴课，包括森尼维尔、圣克拉拉、库比蒂诺、山景城、帕洛阿尔托、洛斯加托斯、萨拉托加、坎贝尔和米尔皮塔斯。我还提供在线钢琴课。",
    },
    {
      question:
        locale === "en"
          ? "How much do piano lessons cost?"
          : "钢琴课的费用是多少？",
      answer:
        locale === "en"
          ? "We offer affordable piano lessons with competitive rates. Contact us for specific pricing information. We also offer a free trial lesson so you can experience our teaching before committing."
          : "我们提供价格实惠的钢琴课，价格具有竞争力。请联系我们了解具体价格信息。我们还提供免费试听课，这样您可以在承诺之前体验我们的教学。",
    },
    {
      question:
        locale === "en"
          ? "Do you offer online piano lessons?"
          : "你们提供在线钢琴课吗？",
      answer:
        locale === "en"
          ? "Yes, I offer both in-person piano lessons in San Jose and the South Bay area, as well as online piano lessons. Online lessons are perfect for busy adults or those who prefer learning from home."
          : "是的，我在圣何塞和南湾地区提供线下钢琴课，也提供在线钢琴课。在线课程非常适合忙碌的成年人或喜欢在家学习的人。",
    },
    {
      question:
        locale === "en"
          ? "What makes you the best piano teacher in San Jose?"
          : "是什么让您成为圣何塞最好的钢琴老师？",
      answer:
        locale === "en"
          ? "I'm a conservatory-level advanced pianist who achieved this level as an adult (started seriously after age 25). With 8+ years of teaching experience, 60+ students personally coached, and training under renowned Bay Area concert pianists, I specialize in helping adults overcome childhood regret and finally play piano for real. I offer affordable rates and focus on technique, musicality, and personalized instruction."
          : "我是一名音乐学院水平的高级钢琴家，在成年后达到了这个水平（25岁后才开始认真学）。拥有8年以上的教学经验，亲自指导过60多名学生，并接受过湾区著名音乐会钢琴家的培训，我专门帮助成年人克服童年遗憾，最终真正学会弹钢琴。我提供实惠的价格，专注于技巧、音乐性和个性化教学。",
    },
    {
      question:
        locale === "en"
          ? "Do you teach piano lessons for beginners?"
          : "你们教初学者钢琴课吗？",
      answer:
        locale === "en"
          ? "Yes! I teach piano lessons for all skill levels including complete beginners. Whether you're a child starting at age 5+ or an adult beginner, I provide personalized one-on-one instruction tailored to your goals and learning style."
          : "是的！我教授所有技能水平的钢琴课，包括完全初学者。无论您是5岁以上的孩子还是成人初学者，我都会根据您的目标和学习风格提供个性化的一对一指导。",
    },
  ];

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
    const pageLabel =
      pageName === "trial"
        ? localized.nav.trial
        : pageName === "about"
          ? localized.nav.about
          : pageName === "contact"
            ? localized.nav.contact
            : pageName;

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
