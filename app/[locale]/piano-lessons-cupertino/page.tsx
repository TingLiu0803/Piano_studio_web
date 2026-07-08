import { type Locale, content } from "@/content/site";
import { getFaqItems, pianoLessonsCupertinoFaqIds } from "@/content/faqs";
import LandingPageView from "@/components/LandingPageView";
import FaqSection from "@/components/FaqSection";
import JsonLd from "@/components/JsonLd";
import { buildFaqJsonLd, buildMetadata } from "@/lib/seo";
import { landingPages } from "@/content/landing-pages";

const SLUG = "piano-lessons-cupertino" as const;

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

export default async function PianoLessonsCupertinoPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const typedLocale = locale as Locale;
  const faqItems = getFaqItems(typedLocale, pianoLessonsCupertinoFaqIds);
  const commonObjections = landingPages[typedLocale][SLUG].commonObjections;

  return (
    <>
      {/* Single FAQPage covering both the FAQ section and the visible
          common-objections blocks (#objection-*). */}
      <JsonLd data={buildFaqJsonLd(typedLocale, pianoLessonsCupertinoFaqIds, commonObjections)} />
      <LandingPageView locale={typedLocale} slug={SLUG} />
      <FaqSection
        banded
        title={
          typedLocale === "en"
            ? "Piano lessons in Cupertino — FAQ"
            : "库比蒂诺钢琴课常见问题"
        }
        intro={
          typedLocale === "en"
            ? "Quick answers about the Cupertino studio, pricing, and booking a free trial."
            : "关于库比蒂诺工作室、价格与免费试听预约的直接回答。"
        }
        items={faqItems}
      />
    </>
  );
}
