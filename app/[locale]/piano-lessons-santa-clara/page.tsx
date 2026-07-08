import { type Locale, content } from "@/content/site";
import { getFaqItems, pianoLessonsSantaClaraFaqIds } from "@/content/faqs";
import LandingPageView from "@/components/LandingPageView";
import FaqSection from "@/components/FaqSection";
import JsonLd from "@/components/JsonLd";
import { buildFaqJsonLd, buildMetadata } from "@/lib/seo";
import { landingPages } from "@/content/landing-pages";

const SLUG = "piano-lessons-santa-clara" as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const typed = locale as Locale;
  const seo = landingPages[typed][SLUG].seo;
  return buildMetadata(typed, `/${typed}/${SLUG}`, undefined, {
    title: seo.title,
    description: seo.description,
    keywords: content[typed].seo.keywords,
  });
}

export default async function PianoLessonsSantaClaraPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const typedLocale = locale as Locale;
  const faqItems = getFaqItems(typedLocale, pianoLessonsSantaClaraFaqIds);
  const commonObjections = landingPages[typedLocale][SLUG].commonObjections;

  return (
    <>
      {/* Single FAQPage covering both the FAQ section and the visible
          common-objections blocks (#objection-*). */}
      <JsonLd data={buildFaqJsonLd(typedLocale, pianoLessonsSantaClaraFaqIds, commonObjections)} />
      <LandingPageView locale={typedLocale} slug={SLUG} />
      <FaqSection
        banded
        title={
          typedLocale === "en"
            ? "Piano lessons in Santa Clara — FAQ"
            : "圣克拉拉钢琴课常见问题"
        }
        intro={
          typedLocale === "en"
            ? "Quick answers about online vs in-person formats, areas served, and the free trial."
            : "关于线上与线下形式、服务区域与免费试听的直接回答。"
        }
        items={faqItems}
      />
    </>
  );
}
