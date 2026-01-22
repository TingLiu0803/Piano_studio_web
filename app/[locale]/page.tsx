import Link from "next/link";
import { type Locale, content, siteConfig } from "@/content/site";
import BilibiliGallery from "@/components/BilibiliGallery";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  return buildMetadata(locale, `/${locale}`);
}

export default async function LocaleHome({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const localized = content[locale];

  return (
    <div className="flex flex-col gap-16">
      <section className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
        <div className="flex flex-col gap-6">
          <h1 className="text-4xl font-semibold leading-tight md:text-5xl">
            {localized.hero.title}
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-300">
            {localized.hero.subtitle}
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href={`/${locale}/trial`}
              className="rounded-full bg-zinc-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-zinc-800"
            >
              {localized.hero.primaryCta}
            </Link>
            <a
              href="#bilibili-videos"
              className="rounded-full border border-zinc-300 px-6 py-3 text-sm font-semibold transition hover:border-zinc-900 dark:border-zinc-700 dark:hover:border-white"
            >
              {localized.hero.secondaryCta}
            </a>
          </div>
          <div className="flex flex-wrap gap-4 text-sm text-zinc-500">
            <span>{siteConfig.serviceArea}</span>
            <span>{siteConfig.lessonFormats.join(" · ")}</span>
            <span>{siteConfig.pricingNote}</span>
          </div>
        </div>
        <div className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <h2 className="text-lg font-semibold">
            {localized.trial.title}
          </h2>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
            {localized.trial.description}
          </p>
          <Link
            href={`/${locale}/trial`}
            className="mt-6 inline-flex rounded-full bg-emerald-500 px-5 py-2 text-xs font-semibold text-white"
          >
            {localized.hero.primaryCta}
          </Link>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        {localized.highlights.map((item) => (
          <div
            key={item.title}
            className="rounded-2xl border border-zinc-200 bg-white p-6 text-sm shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
          >
            <h3 className="text-base font-semibold">{item.title}</h3>
            <p className="mt-2 text-zinc-600 dark:text-zinc-300">
              {item.description}
            </p>
          </div>
        ))}
      </section>

      <section id="bilibili-videos" className="flex flex-col gap-6">
        <div>
          <h2 className="text-2xl font-semibold">
            {localized.sections.performancesTitle}
          </h2>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
            {localized.sections.performancesDescription}
          </p>
        </div>
        <BilibiliGallery />
      </section>
      <section className="rounded-3xl border border-zinc-200 bg-white px-6 py-10 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <h2 className="text-2xl font-semibold">
          {localized.sections.testimonialsTitle}
        </h2>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {localized.testimonials.map((item) => (
            <blockquote
              key={item.name}
              className="rounded-2xl border border-zinc-200 bg-zinc-50 p-5 text-sm text-zinc-700 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-300"
            >
              <p>“{item.quote}”</p>
              <footer className="mt-3 font-semibold text-zinc-900 dark:text-white">
                {item.name}
              </footer>
            </blockquote>
          ))}
        </div>
      </section>
    </div>
  );
}
