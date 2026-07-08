import { type Locale, content } from "@/content/site";
import { getFaqItems, pianoLessonsSunnyvaleFaqIds } from "@/content/faqs";
import LandingPageView from "@/components/LandingPageView";
import FaqSection from "@/components/FaqSection";
import JsonLd from "@/components/JsonLd";
import { buildFaqJsonLd, buildMetadata } from "@/lib/seo";
import { landingPages } from "@/content/landing-pages";

const SLUG = "piano-lessons-sunnyvale" as const;

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

export default async function PianoLessonsSunnyvalePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const typedLocale = locale as Locale;
  const faqItems = getFaqItems(typedLocale, pianoLessonsSunnyvaleFaqIds);
  const commonObjections = landingPages[typedLocale][SLUG].commonObjections;

  return (
    <>
      {/* Single FAQPage covering both the FAQ section and the visible
          common-objections blocks (#objection-*). */}
      <JsonLd data={buildFaqJsonLd(typedLocale, pianoLessonsSunnyvaleFaqIds, commonObjections)} />
      <LandingPageView locale={typedLocale} slug={SLUG} />
      <FaqSection
        banded
        title={
          typedLocale === "en"
            ? "Piano lessons in Sunnyvale — FAQ"
            : "森尼维尔钢琴课常见问题"
        }
        intro={
          typedLocale === "en"
            ? "Quick answers for Sunnyvale beginners and families about the trial, equipment, and areas served."
            : "关于试听、设备与服务区域，给森尼维尔初学者和家庭的直接回答。"
        }
        items={faqItems}
      />
    </>
  );
}
