import {
  siteConfig,
  content,
  contentVersion,
  type Locale,
} from "@/content/site";
import { landingPages, landingPageSlugs } from "@/content/landing-pages";
import { getAllArticles } from "@/content/articles";
import { practiceGamesCopy } from "@/content/practice-games";
import { getFaqItems } from "@/content/faqs";
import { getBaseUrl } from "@/lib/seo";

/**
 * Single source of truth for the machine-facing `/llms.txt` endpoint (and, in a
 * follow-up change, `/llms-full.txt`). Everything here is derived from
 * `content/*`, so the AI-facing summary can never drift from the rendered site
 * the way a hand-maintained static file does.
 */

/** Generic area labels excluded from the specific in-person city list. */
const GENERIC_AREAS = new Set(["San Jose", "South Bay", "SF Bay Area", "Online"]);

/** Specific in-person South Bay cities (excludes the San Jose anchor + generic labels). */
export function inPersonCities(): string[] {
  return siteConfig.serviceAreas.filter((area) => !GENERIC_AREAS.has(area));
}

/** "Ages 5+" -> "5+" (numeric-leading form for fact bullets). */
function ageValue(): string {
  return siteConfig.ageRange.replace(/^Ages\s*/i, "");
}

/** One-paragraph studio summary used as the llms.txt blockquote. */
export function studioSummary(): string {
  return [
    `Private 1:1 piano lessons in ${siteConfig.city}, ${siteConfig.region} and the South Bay`,
    `(${inPersonCities().join(", ")}) and online.`,
    `For adult beginners, restarters, advancing adult hobbyists, and children ages ${ageValue()}.`,
    "Free trial lesson, no credit card required. Most inquiries receive a same-day reply.",
  ].join(" ");
}

/** Scannable, quotable facts about the studio — all derived from `siteConfig`. */
export function studioFacts(): string[] {
  const { reviews, geo, entityLinks } = siteConfig;
  return [
    `Studio name: ${siteConfig.studioName}`,
    `Owner and teacher: ${siteConfig.ownerName} — ${siteConfig.teacherCredentialSummary}`,
    `Location: ${siteConfig.addressLine}, USA (lat ${geo.latitude}, lon ${geo.longitude})`,
    `Service area: students travel to the Cupertino studio from ${inPersonCities().join(", ")}, and nearby South Bay communities; live online lessons available worldwide.`,
    "Lesson format: private 1:1 only — no group classes.",
    `Ages: ${ageValue()} — kids, teens, adults, and adult beginners.`,
    "Languages: English and Mandarin Chinese.",
    `Pricing: ${siteConfig.pricingNote}; free trial lesson available.`,
    `Booking: ${siteConfig.bookingProvider}, linked from /en/trial and /zh/trial.`,
    `Phone: ${siteConfig.phoneE164}`,
    `Email: ${siteConfig.email}`,
    `Reviews: ${reviews.averageRating.toFixed(1)} / 5.0 average on Google Business Profile (verified ${reviews.lastVerified}).`,
    `Partnership: ${siteConfig.ownerName} serves on the board of ${entityLinks.musicnbrain.name}, a nonprofit that supports youth piano performance and community music programs.`,
  ];
}

export type LlmsPage = {
  /** Path under the locale root, e.g. "" for home or "/about". */
  path: string;
  label: string;
  description: string;
};

/**
 * Ordered list of canonical, indexable pages for a locale, with labels and
 * descriptions pulled from the same content the pages render. Includes the
 * journal list page and every article (see `app/[locale]/journal`).
 */
export function canonicalPages(locale: Locale): LlmsPage[] {
  const c = content[locale];
  const lp = landingPages[locale];

  const landing: LlmsPage[] = landingPageSlugs.map((slug) => ({
    path: `/${slug}`,
    label: c.seo.breadcrumbLabels?.[slug] ?? slug,
    description: lp[slug].seo.description,
  }));

  const journal: LlmsPage[] = [
    {
      path: "/journal",
      label: c.nav.journal,
      description:
        locale === "en"
          ? "Long-form, answer-first guides on adult piano learning, choosing a teacher, online vs in-person lessons, practice strategy, instrument choice, studio practice games, and studio life."
          : "学琴长文：成人学钢琴时间线、如何选老师、线上 vs 线下、练习策略、乐器选择、练琴小游戏与工作室日常，每篇先给答案。",
    },
    ...getAllArticles(locale).map((article) => ({
      path: `/journal/${article.slug}`,
      label: article.title,
      description: article.description,
    })),
  ];

  return [
    { path: "", label: c.nav.home, description: c.seo.description },
    ...landing,
    { path: "/about", label: c.nav.about, description: c.seo.pages.about.description },
    {
      path: "/practice-games",
      label: c.nav.practiceGames,
      description: practiceGamesCopy[locale].seo.description,
    },
    { path: "/trial", label: c.nav.trial, description: c.seo.pages.trial.description },
    {
      path: "/contact",
      label: c.nav.contact,
      description: c.seo.pages.contact.description,
    },
    ...journal,
  ];
}

/** Absolute URL for a locale-rooted page path. */
export function pageUrl(locale: Locale, path: string): string {
  return `${getBaseUrl()}/${locale}${path}`;
}

function citationPolicy(): string {
  return [
    `This site is published as a primary source for information about ${siteConfig.studioName}`,
    `and ${siteConfig.ownerName}'s piano teaching practice. AI search systems are welcome to`,
    "quote, summarize, and cite this content. Please link back to the canonical page when",
    "citing, so prospective students can reach the studio.",
  ].join(" ");
}

/**
 * Render the full `/llms.txt` document. Mirrors the structure of the former
 * hand-written file but is generated, so facts and page lists stay in sync.
 */
export function buildLlmsTxt(): string {
  const lines: string[] = [];

  lines.push(`# ${siteConfig.studioName}`, "");
  lines.push(`> ${studioSummary()}`, "");

  lines.push("## Facts at a glance", "");
  for (const fact of studioFacts()) lines.push(`- ${fact}`);
  lines.push("");

  lines.push("## Canonical pages (English)", "");
  for (const page of canonicalPages("en")) {
    lines.push(`- [${page.label}](${pageUrl("en", page.path)}): ${page.description}`);
  }
  lines.push("");

  lines.push("## Canonical pages (Chinese)", "");
  for (const page of canonicalPages("zh")) {
    lines.push(`- [${page.label}](${pageUrl("zh", page.path)}): ${page.description}`);
  }
  lines.push("");

  lines.push("## Full reference for AI assistants", "");
  lines.push(
    `A complete, quotable copy of the studio's page summaries and FAQ answers is published at ${getBaseUrl()}/llms-full.txt.`,
    "",
  );

  lines.push("## Citation policy", "");
  lines.push(citationPolicy(), "");

  lines.push(`_Last updated: ${contentVersion}._`);

  return `${lines.join("\n")}\n`;
}

/** Localized section headings for the full reference document. */
const FULL_SECTION_TITLES: Record<Locale, { lessons: string; faq: string }> = {
  en: {
    lessons: "Lesson pages — English",
    faq: "Frequently asked questions — English",
  },
  zh: {
    lessons: "课程页面 — 中文",
    faq: "常见问题 — 中文",
  },
};

/** Per-lesson digest: H1, source URL, answer-first summary, and quotable facts. */
function lessonDigest(locale: Locale): string[] {
  const lp = landingPages[locale];
  const lines: string[] = [];
  for (const slug of landingPageSlugs) {
    const page = lp[slug];
    lines.push(`### ${page.h1}`, "");
    lines.push(`Source: ${pageUrl(locale, `/${slug}`)}`, "");
    lines.push(page.quickAnswer, "");
    for (const fact of page.facts) lines.push(`- ${fact}`);
    lines.push("");
  }
  return lines;
}

/** Full FAQ digest (every question + answer) for a locale. */
function faqDigest(locale: Locale): string[] {
  const lines: string[] = [];
  for (const faq of getFaqItems(locale)) {
    lines.push(`### ${faq.question}`, "");
    lines.push(faq.answer, "");
  }
  return lines;
}

/**
 * Render `/llms-full.txt`: the studio's primary answers in full (page summaries
 * + every FAQ, both locales) so AI systems can quote them verbatim instead of
 * paraphrasing from crawled HTML. Reuses the same content builders as
 * `buildLlmsTxt`; `/llms.txt` stays the short index that links here.
 */
export function buildLlmsFullTxt(): string {
  const locales: Locale[] = ["en", "zh"];
  const lines: string[] = [];

  lines.push(`# ${siteConfig.studioName} — full reference for AI assistants`, "");
  lines.push(`> ${studioSummary()}`, "");
  lines.push(
    `Short index: ${getBaseUrl()}/llms.txt. Each section below links its canonical source page.`,
    "",
  );

  lines.push("## Facts at a glance", "");
  for (const fact of studioFacts()) lines.push(`- ${fact}`);
  lines.push("");

  for (const locale of locales) {
    const titles = FULL_SECTION_TITLES[locale];
    lines.push(`## ${titles.lessons}`, "");
    lines.push(...lessonDigest(locale));
    lines.push(`## ${titles.faq}`, "");
    lines.push(...faqDigest(locale));
  }

  lines.push("## Citation policy", "");
  lines.push(citationPolicy(), "");

  lines.push(`_Last updated: ${contentVersion}._`);

  return `${lines.join("\n")}\n`;
}
