import { type Locale, content } from "@/content/site";
import { getFaqItems, kidsLandingFaqIds } from "@/content/faqs";
import LandingPageView from "@/components/LandingPageView";
import PracticeGameInvite from "@/components/PracticeGameInvite";
import FaqSection from "@/components/FaqSection";
import JsonLd from "@/components/JsonLd";
import { buildFaqJsonLd, buildMetadata } from "@/lib/seo";
import { landingPages } from "@/content/landing-pages";

const SLUG = "kids-piano-lessons" as const;

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

export default async function KidsPianoLessonsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const typedLocale = locale as Locale;
  const faqItems = getFaqItems(typedLocale, kidsLandingFaqIds);
  const commonObjections = landingPages[typedLocale][SLUG].commonObjections;

  return (
    <>
      {/* Single FAQPage covering both the FAQ section and the visible
          common-objections blocks (#objection-*). */}
      <JsonLd data={buildFaqJsonLd(typedLocale, kidsLandingFaqIds, commonObjections)} />
      <LandingPageView locale={typedLocale} slug={SLUG} />
      <PracticeGameInvite locale={typedLocale} placement="kids_landing" />
      <FaqSection
        banded
        title={
          typedLocale === "en"
            ? "Kids piano lessons FAQ"
            : "儿童钢琴课常见问题"
        }
        intro={
          typedLocale === "en"
            ? "Common questions from parents before booking a trial lesson."
            : "家长在预约试听前最常问的问题。"
        }
        items={faqItems}
      />
    </>
  );
}
