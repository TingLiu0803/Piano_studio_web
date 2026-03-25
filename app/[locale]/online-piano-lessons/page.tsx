import { type Locale, content } from "@/content/site";
import LandingPageView from "@/components/LandingPageView";
import { buildMetadata } from "@/lib/seo";
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
  return (
    <LandingPageView locale={locale as Locale} slug={SLUG} />
  );
}
