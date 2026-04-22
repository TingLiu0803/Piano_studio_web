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
        jobTitle: teacherJobTitle,
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
          ? "I offer in-person piano lessons in San Jose and the South Bay, including Sunnyvale, Santa Clara, Cupertino, Mountain View, Palo Alto, Los Gatos, Saratoga, Campbell, and Milpitas—plus the wider SF Bay Area. Sunnyvale beginners and San Jose families are both common here; if you are comparing local teachers for adults or kids, book a free trial. I also offer online piano lessons."
          : "我在圣何塞与南湾提供线下钢琴课，包括森尼维尔、圣克拉拉、库比蒂诺、山景城、帕洛阿尔托、洛斯加托斯、萨拉托加、坎贝尔、米尔皮塔斯及更广的旧金山湾区。森尼维尔与圣何塞的初学者家庭都很常见；若您在比较家附近的成人或儿童钢琴课，可先预约免费试听。我也提供线上钢琴课。",
    },
    {
      question:
        locale === "en"
          ? "Do you offer private piano lessons for adults?"
          : "你们提供成人钢琴私教吗？",
      answer:
        locale === "en"
          ? "Yes. Private piano lessons for adults are a core part of the studio—beginners, restarters, and advanced hobbyists. Lessons are one-on-one in San Jose / Sunnyvale area or online, with weekly assignments tailored to your schedule."
          : "是的。成人钢琴私教是工作室的核心之一，涵盖初学者、重拾者与进阶爱好者。课程为圣何塞/森尼维尔及周边线上一对一，并按您的时间安排定制每周作业。",
    },
    {
      question:
        locale === "en"
          ? "How much do piano lessons cost in San Jose?"
          : "圣何塞钢琴课大概多少钱？",
      answer:
        locale === "en"
          ? "Rates depend on lesson length, frequency, and whether you study in-person in San Jose / the South Bay or online. Message the studio for current tuition; most inquiries get a same-day reply. A free trial lesson lets you confirm fit before you commit."
          : "费用会依课长、频率以及线下（圣何塞/南湾）或线上而有所不同。欢迎留言询问最新学费，多数咨询可当日回复。也可先预约免费试听，确认是否合适再决定。",
    },
    {
      question:
        locale === "en"
          ? "Is it too late to learn piano as an adult?"
          : "成年人学钢琴会不会太晚？",
      answer:
        locale === "en"
          ? "No. Adults can build real technique and musicianship with consistent practice and clear coaching—I started seriously after 25 and advanced to conservatory-level repertoire. If you are an adult beginner or restarter in San Jose or nearby, a free trial is the fastest way to see whether the pacing and style fit your goals."
          : "不会。只要有稳定练习与清晰指导，成年人同样可以建立扎实技巧与音乐表现——我本人25岁后才开始系统学习并持续进阶。若您是圣何塞或周边的成人初学者/重拾者，建议先预约免费试听，直接感受节奏与风格是否合适。",
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
          ? "How do I choose a piano teacher in the South Bay?"
          : "在南湾如何挑选合适的钢琴老师？",
      answer:
        locale === "en"
          ? "Look for a San Jose / South Bay piano teacher who teaches the way you want to learn: clear weekly assignments, honest technique coaching, and repertoire you care about—not only method-book pages. Check credentials, listen to the teacher play, read reviews, then book a free trial. Fit matters more than hype; you want someone who diagnoses your playing and respects your time."
          : "建议关注：是否有清晰的每周作业、是否诚实面对技巧问题、曲目安排是否贴近您的目标，而不是只赶教材页数。可查看资历与演奏、阅读评价，并务必预约试听。师生是否合拍，往往比宣传口号更重要。",
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
