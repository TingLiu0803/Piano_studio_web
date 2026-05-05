import { type Locale, content } from "@/content/site";
import { adultLandingFaqIds, getFaqItems } from "@/content/faqs";
import LandingPageView from "@/components/LandingPageView";
import FaqSection from "@/components/FaqSection";
import JsonLd from "@/components/JsonLd";
import { buildFaqJsonLd, buildMetadata } from "@/lib/seo";
import { landingPages } from "@/content/landing-pages";

const SLUG = "adult-piano-lessons" as const;

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

export default async function AdultPianoLessonsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const typedLocale = locale as Locale;
  const faqItems = getFaqItems(typedLocale, adultLandingFaqIds);

  return (
    <>
      <JsonLd data={buildFaqJsonLd(typedLocale, adultLandingFaqIds)} />
      <LandingPageView locale={typedLocale} slug={SLUG} />
      <FaqSection
        title={
          typedLocale === "en"
            ? "Adult piano lessons FAQ"
            : "成人钢琴课常见问题"
        }
        intro={
          typedLocale === "en"
            ? "Quick answers to help you decide if private lessons are a good fit."
            : "用几个直接回答，帮你判断一对一课程是否适合。"
        }
        items={faqItems}
      />
    </>
  );
}
