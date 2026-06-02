import { type Locale, content } from "@/content/site";
import { getFaqItems, onlineLandingFaqIds } from "@/content/faqs";
import LandingPageView from "@/components/LandingPageView";
import FaqSection from "@/components/FaqSection";
import JsonLd from "@/components/JsonLd";
import { buildFaqJsonLd, buildMetadata } from "@/lib/seo";
import { landingPages } from "@/content/landing-pages";

const SLUG = "online-piano-lessons" as const;

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

export default async function OnlinePianoLessonsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const typedLocale = locale as Locale;
  const faqItems = getFaqItems(typedLocale, onlineLandingFaqIds);

  return (
    <>
      <JsonLd data={buildFaqJsonLd(typedLocale, onlineLandingFaqIds)} />
      <LandingPageView locale={typedLocale} slug={SLUG} />
      <FaqSection
        title={
          typedLocale === "en"
            ? "Online piano lessons FAQ"
            : "线上钢琴课常见问题"
        }
        intro={
          typedLocale === "en"
            ? "Quick answers about online lesson format, equipment, and scheduling."
            : "关于线上课形式、设备与排课的常见问题解答。"
        }
        items={faqItems}
      />
    </>
  );
}
