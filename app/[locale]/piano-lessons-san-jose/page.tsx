import { type Locale, content } from "@/content/site";
import { getFaqItems, pianoLessonsSanJoseFaqIds } from "@/content/faqs";
import LandingPageView from "@/components/LandingPageView";
import FaqSection from "@/components/FaqSection";
import JsonLd from "@/components/JsonLd";
import { buildFaqJsonLd, buildMetadata } from "@/lib/seo";
import { landingPages } from "@/content/landing-pages";

const SLUG = "piano-lessons-san-jose" as const;

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

export default async function PianoLessonsSanJosePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const typedLocale = locale as Locale;
  const faqItems = getFaqItems(typedLocale, pianoLessonsSanJoseFaqIds);
  const commonObjections = landingPages[typedLocale][SLUG].commonObjections;

  return (
    <>
      {/* Single FAQPage covering both the FAQ section and the visible
          common-objections blocks (#objection-*). */}
      <JsonLd data={buildFaqJsonLd(typedLocale, pianoLessonsSanJoseFaqIds, commonObjections)} />
      <LandingPageView locale={typedLocale} slug={SLUG} />
      <FaqSection
        banded
        title={
          typedLocale === "en"
            ? "Piano lessons in San Jose — FAQ"
            : "圣何塞钢琴课常见问题"
        }
        intro={
          typedLocale === "en"
            ? "Quick answers about service areas, pricing, and booking your first trial."
            : "关于服务区域、价格与试听预约的常见问题解答。"
        }
        items={faqItems}
      />
    </>
  );
}
