import { type Locale, content } from "@/content/site";
import { getFaqItems, pianoTeacherSanJoseFaqIds } from "@/content/faqs";
import LandingPageView from "@/components/LandingPageView";
import FaqSection from "@/components/FaqSection";
import JsonLd from "@/components/JsonLd";
import { buildFaqJsonLd, buildMetadata } from "@/lib/seo";
import { landingPages } from "@/content/landing-pages";

const SLUG = "piano-teacher-san-jose" as const;

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

export default async function PianoTeacherSanJosePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const typedLocale = locale as Locale;
  const faqItems = getFaqItems(typedLocale, pianoTeacherSanJoseFaqIds);

  return (
    <>
      <JsonLd data={buildFaqJsonLd(typedLocale, pianoTeacherSanJoseFaqIds)} />
      <LandingPageView locale={typedLocale} slug={SLUG} />
      <FaqSection
        title={
          typedLocale === "en"
            ? "Piano teacher San Jose — FAQ"
            : "圣何塞钢琴老师 — 常见问题"
        }
        intro={
          typedLocale === "en"
            ? "What to expect from a private piano teacher in San Jose and how to evaluate fit."
            : "私人钢琴老师的工作方式与如何判断是否合适。"
        }
        items={faqItems}
      />
    </>
  );
}
