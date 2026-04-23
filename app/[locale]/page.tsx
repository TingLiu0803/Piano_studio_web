import Link from "next/link";
import { type Locale, content, siteConfig } from "@/content/site";
import { landingPageSlugs } from "@/content/landing-pages";
import BilibiliGallery from "@/components/BilibiliGallery";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";
import GoogleReviewsPromo from "@/components/GoogleReviewsPromo";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return buildMetadata(locale as Locale, `/${locale}`);
}

export default async function LocaleHome({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const localized = content[locale as Locale];

  return (
    <>
      <BreadcrumbJsonLd locale={locale as Locale} path={`/${locale}`} />
      <div className="flex flex-col gap-20">
        <section className="rounded-[2rem] border border-[color:var(--border)] bg-[color:var(--surface)] p-6 shadow-xl md:p-10">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div className="flex flex-col gap-6">
              <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--tag-foreground)]">
                <span className="rounded-full bg-[color:var(--tag)] px-3 py-1 text-[11px]">
                  {siteConfig.city} · {siteConfig.lessonFormats.join(" / ")}
                </span>
                <span className="text-[color:var(--muted-foreground)]">
                  {siteConfig.pricingNote}
                </span>
              </div>
              <h1 className="text-4xl font-semibold leading-tight text-[color:var(--foreground)] md:text-6xl">
                {localized.hero.title}
              </h1>
              <p className="text-lg text-[color:var(--muted-foreground)]">
                {localized.hero.subtitle}
              </p>
              <div className="flex flex-col gap-2 text-sm font-semibold sm:flex-row sm:flex-wrap sm:gap-x-5">
                <Link
                  href={`/${locale}/piano-lessons-san-jose`}
                  data-ga-event="lesson_hub_nav_click"
                  data-ga-slug="piano-lessons-san-jose"
                  data-ga-placement="hero_keyword_links"
                  className="text-[color:var(--link)] underline-offset-4 transition hover:text-[color:var(--link-hover)] hover:underline"
                >
                  {localized.hero.lessonsPageLink}
                </Link>
                <Link
                  href={`/${locale}/adult-piano-lessons`}
                  data-ga-event="lesson_hub_nav_click"
                  data-ga-slug="adult-piano-lessons"
                  data-ga-placement="hero_keyword_links"
                  className="text-[color:var(--link)] underline-offset-4 transition hover:text-[color:var(--link-hover)] hover:underline"
                >
                  {localized.hero.adultLessonsPageLink}
                </Link>
                <Link
                  href={`/${locale}/piano-teacher-san-jose`}
                  data-ga-event="lesson_hub_nav_click"
                  data-ga-slug="piano-teacher-san-jose"
                  data-ga-placement="hero_keyword_links"
                  className="text-[color:var(--link)] underline-offset-4 transition hover:text-[color:var(--link-hover)] hover:underline"
                >
                  {localized.hero.teacherPageLink}
                </Link>
              </div>
              <div className="flex flex-wrap gap-3 sm:gap-4">
                <Link
                  href={`/${locale}/trial`}
                  data-ga-event="trial_cta_click"
                  data-ga-placement="hero_primary"
                  className="inline-flex min-h-11 items-center justify-center rounded-full bg-[color:var(--primary)] px-5 py-2.5 text-center text-sm font-semibold leading-snug text-[color:var(--primary-foreground)] transition hover:bg-[color:var(--primary-hover)] sm:px-6 sm:py-3"
                >
                  {localized.hero.primaryCta}
                </Link>
                <a
                  href="https://www.musicnbrain.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-11 items-center justify-center rounded-full border border-[color:var(--accent)] bg-[color:var(--surface)] px-5 py-2.5 text-center text-sm font-semibold leading-snug text-[color:var(--accent-foreground)] transition hover:border-[color:var(--link)] sm:px-6 sm:py-3"
                >
                  {localized.sections.partnershipCta}
                </a>
                <a
                  href="#bilibili-videos"
                  className="inline-flex min-h-11 items-center justify-center rounded-full border border-[color:var(--border)] px-5 py-2.5 text-center text-sm font-semibold leading-snug transition hover:border-[color:var(--foreground)] sm:px-6 sm:py-3"
                >
                  {localized.hero.secondaryCta}
                </a>
                <Link
                  href="#lesson-options"
                  data-ga-event="lesson_hub_nav_click"
                  data-ga-placement="hero"
                  className="inline-flex min-h-11 items-center justify-center rounded-full border border-[color:var(--accent)] bg-[color:var(--surface)] px-5 py-2.5 text-center text-sm font-semibold leading-snug text-[color:var(--foreground)] transition hover:border-[color:var(--foreground)] sm:px-6 sm:py-3"
                >
                  {localized.hero.browseAllLessonTypes}
                </Link>
              </div>
              <p className="text-sm text-[color:var(--muted-foreground)]">
                {localized.hero.ctaNote}
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                {localized.hero.stats.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] px-4 py-3 text-sm shadow-sm"
                  >
                    <div className="text-lg font-semibold text-[color:var(--foreground)]">
                      {item.value}
                    </div>
                    <div className="text-xs text-[color:var(--muted-foreground)]">
                      {item.label}
                    </div>
                  </div>
                ))}
              </div>
              <GoogleReviewsPromo locale={locale as Locale} variant="strip" />
            </div>
            <div className="rounded-3xl border border-[color:var(--border)] bg-[color:var(--surface-muted)] p-6 shadow-xl">
              <div className="aspect-video overflow-hidden rounded-2xl border border-[color:var(--border)]">
                <iframe
                  src={localized.hero.video.embedUrl}
                  title={localized.hero.video.title}
                  className="h-full w-full"
                  loading="eager"
                  allowFullScreen
                />
              </div>
              <p className="mt-4 text-sm text-[color:var(--muted-foreground)]">
                {localized.hero.video.caption}
              </p>
            </div>
          </div>
        </section>

        <section className="grid gap-6 md:grid-cols-3">
          {localized.highlights.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] p-6 text-sm shadow-sm"
            >
              <h2 className="text-base font-semibold">{item.title}</h2>
              <p className="mt-2 text-[color:var(--muted-foreground)]">
                {item.description}
              </p>
            </div>
          ))}
        </section>

        <section className="rounded-3xl border border-[color:var(--border)] bg-[color:var(--surface)] px-6 py-8 shadow-sm md:px-8">
          <h2 className="text-2xl font-semibold text-[color:var(--foreground)] md:text-3xl">
            {localized.sections.aboutTitle}
          </h2>
          {(localized.about as { summaryBullets?: string[] }).summaryBullets
            ?.length ? (
            <ul className="mt-4 space-y-2 text-sm text-[color:var(--muted-foreground)]">
              {(localized.about as { summaryBullets: string[] }).summaryBullets.map(
                (line) => (
                  <li key={line} className="flex items-start gap-2">
                    <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[color:var(--accent)]" />
                    <span>{line}</span>
                  </li>
                ),
              )}
            </ul>
          ) : null}
          <Link
            href={`/${locale}/about`}
            data-ga-event="about_bio_click"
            data-ga-placement="home_teaser"
            className="mt-5 inline-flex text-sm font-semibold text-[color:var(--link)] transition hover:text-[color:var(--link-hover)]"
          >
            {localized.sections.aboutCta}
          </Link>
        </section>

        <section
          id="lesson-options"
          className="scroll-mt-28 rounded-3xl border border-[color:var(--border)] bg-[color:var(--surface-muted)] px-6 py-10 shadow-sm"
        >
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-2xl font-semibold text-[color:var(--foreground)] md:text-3xl">
              {localized.sections.lessonHubTitle}
            </h2>
            <p className="mt-3 text-sm text-[color:var(--muted-foreground)]">
              {localized.sections.lessonHubDescription}
            </p>
          </div>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {landingPageSlugs.map((slug) => (
              <li key={slug}>
                <Link
                  href={`/${locale}/${slug}`}
                  data-ga-event="lesson_hub_card_click"
                  data-ga-slug={slug}
                  data-ga-placement="home_lesson_hub"
                  className="flex h-full flex-col justify-between rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] p-5 text-left shadow-sm transition hover:border-[color:var(--foreground)] hover:shadow-md"
                >
                  <span className="font-semibold text-[color:var(--foreground)]">
                    {localized.seo.breadcrumbLabels?.[slug] ?? slug}
                  </span>
                  <span className="mt-3 text-xs font-medium text-[color:var(--link)]">
                    {localized.sections.lessonHubCardCta} →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-3xl border border-[color:var(--accent)] bg-[color:var(--accent)] px-6 py-8 text-[color:var(--accent-foreground)] shadow-lg">
          <div className="mx-auto flex max-w-3xl flex-col items-start gap-4 text-left md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-xl font-semibold md:text-2xl">
                {localized.sections.midPageTrialTitle}
              </h2>
              <p className="mt-2 text-sm opacity-95">
                {localized.trial.description}
              </p>
            </div>
            <Link
              href={`/${locale}/trial`}
              data-ga-event="trial_cta_click"
              data-ga-placement="mid_page_band"
              className="inline-flex min-h-11 w-full shrink-0 items-center justify-center rounded-full bg-[color:var(--primary)] px-5 py-2.5 text-center text-sm font-semibold leading-snug text-[color:var(--primary-foreground)] transition hover:bg-[color:var(--primary-hover)] sm:w-auto sm:px-6 sm:py-3"
            >
              {localized.hero.primaryCta}
            </Link>
          </div>
        </section>

        <section className="rounded-3xl border border-[color:var(--border)] bg-[color:var(--surface)] px-6 py-8 shadow-sm md:px-8">
          <div className="grid gap-6 md:grid-cols-[1.15fr_0.85fr] md:items-center">
            <div>
              <h2 className="text-2xl font-semibold text-[color:var(--foreground)] md:text-3xl">
                {localized.sections.partnershipTitle}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-[color:var(--muted-foreground)]">
                {localized.sections.partnershipDescription}
              </p>
              <h3 className="mt-5 text-lg font-semibold text-[color:var(--foreground)]">
                {localized.sections.partnershipBoardMemberTitle}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[color:var(--muted-foreground)]">
                {localized.sections.partnershipBoardMemberBody}
              </p>
            </div>
            <div className="rounded-2xl border border-[color:var(--accent)] bg-[color:var(--tag)] p-6">
              <p className="text-sm font-semibold text-[color:var(--accent-foreground)]">
                MusicNBrain
              </p>
              <p className="mt-3 text-sm text-[color:var(--muted-foreground)]">
                Events, recitals, workshops, and community impact opportunities
                for young performers.
              </p>
              <a
                href="https://www.musicnbrain.com/"
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex min-h-10 items-center justify-center rounded-full bg-[color:var(--link)] px-5 py-2 text-center text-xs font-semibold text-white transition hover:bg-[color:var(--link-hover)]"
              >
                Open MusicNBrain website
              </a>
            </div>
          </div>
        </section>

        <section className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-3xl border border-[color:var(--border)] bg-[color:var(--surface)] p-6 shadow-sm">
            <h2 className="text-2xl font-semibold">
              {localized.sections.approachTitle}
            </h2>
            <ul className="mt-4 space-y-2 text-sm text-[color:var(--muted-foreground)]">
              {localized.services.items.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-1 h-2 w-2 rounded-full bg-[color:var(--accent)]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-6">
            <div className="rounded-3xl border border-[color:var(--accent)] bg-[color:var(--accent)] px-6 py-5 text-sm text-[color:var(--accent-foreground)]">
              <div className="font-semibold">{localized.trial.title}</div>
              <p className="mt-2 text-[color:var(--accent-foreground)]">
                {localized.trial.description}
              </p>
              <Link
                href={`/${locale}/trial`}
                data-ga-event="trial_cta_click"
                data-ga-placement="home_services_aside"
                className="mt-4 inline-flex min-h-10 w-full items-center justify-center rounded-full bg-[color:var(--primary)] px-4 py-2 text-center text-xs font-semibold leading-snug text-[color:var(--primary-foreground)] transition hover:bg-[color:var(--primary-hover)]"
              >
                {localized.hero.primaryCta}
              </Link>
            </div>
          </div>
        </section>

        <section id="bilibili-videos" className="flex flex-col gap-6">
          <div>
            <h2 className="text-2xl font-semibold">
              {localized.sections.performancesTitle}
            </h2>
            <p className="mt-2 text-sm text-[color:var(--muted-foreground)]">
              {localized.sections.performancesDescription}
            </p>
          </div>
          <BilibiliGallery />
        </section>
        <GoogleReviewsPromo locale={locale as Locale} variant="featured" />
        <section className="rounded-3xl border border-[color:var(--border)] bg-[color:var(--surface)] px-6 py-10 shadow-sm">
          <h2 className="text-2xl font-semibold">
            {localized.sections.testimonialsTitle}
          </h2>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {localized.testimonials.map((item) => (
              <blockquote
                key={item.name}
                className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface-muted)] p-5 text-sm text-[color:var(--muted-foreground)]"
              >
                <p>“{item.quote}”</p>
                <footer className="mt-3 font-semibold text-[color:var(--foreground)]">
                  {item.name}
                </footer>
              </blockquote>
            ))}
          </div>
        </section>

        <section className="rounded-3xl bg-[color:var(--surface-inverse)] px-6 py-10 text-[color:var(--surface-inverse-foreground)] shadow-xl">
          <div className="grid gap-6 md:grid-cols-[1.2fr_0.8fr] md:items-center">
            <div>
              <h2 className="text-2xl font-semibold">{localized.trial.title}</h2>
              <p className="mt-3 text-sm opacity-90">
                {localized.trial.description}
              </p>
            </div>
            <div className="flex flex-col items-start gap-3">
              <Link
                href={`/${locale}/trial`}
                data-ga-event="trial_cta_click"
                data-ga-placement="home_footer"
                className="inline-flex min-h-11 items-center justify-center rounded-full bg-[color:var(--primary)] px-6 py-3 text-center text-sm font-semibold leading-snug text-[color:var(--primary-foreground)] transition hover:bg-[color:var(--primary-hover)]"
              >
                {localized.hero.primaryCta}
              </Link>
              <p className="text-xs opacity-75">{localized.hero.ctaNote}</p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
