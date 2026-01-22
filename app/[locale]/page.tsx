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
    <div className="flex flex-col gap-20">
      <section className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
        <div className="flex flex-col gap-6">
          <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--tag-foreground)]">
            <span className="rounded-full bg-[color:var(--tag)] px-3 py-1 text-[11px]">
              {siteConfig.city} · {siteConfig.lessonFormats.join(" / ")}
            </span>
            <span className="text-[color:var(--muted-foreground)]">
              {siteConfig.pricingNote}
            </span>
          </div>
          <h1 className="text-4xl font-semibold leading-tight text-[color:var(--foreground)] md:text-5xl">
            {localized.hero.title}
          </h1>
          <p className="text-lg text-[color:var(--muted-foreground)]">
            {localized.hero.subtitle}
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href={`/${locale}/trial`}
              className="rounded-full bg-[color:var(--primary)] px-6 py-3 text-sm font-semibold text-[color:var(--primary-foreground)] transition hover:bg-[color:var(--primary-hover)]"
            >
              {localized.hero.primaryCta}
            </Link>
            <a
              href="#bilibili-videos"
              className="rounded-full border border-[color:var(--border)] px-6 py-3 text-sm font-semibold transition hover:border-[color:var(--foreground)]"
            >
              {localized.hero.secondaryCta}
            </a>
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
        </div>
        <div className="rounded-3xl border border-[color:var(--border)] bg-[color:var(--surface)] p-6 shadow-xl">
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
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        {localized.highlights.map((item) => (
          <div
            key={item.title}
            className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] p-6 text-sm shadow-sm"
          >
            <h3 className="text-base font-semibold">{item.title}</h3>
            <p className="mt-2 text-[color:var(--muted-foreground)]">
              {item.description}
            </p>
          </div>
        ))}
      </section>

      <section className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-3xl border border-[color:var(--border)] bg-[color:var(--surface)] p-6 shadow-sm">
          <h2 className="text-2xl font-semibold">
            {localized.sections.aboutTitle}
          </h2>
          <div className="mt-4 space-y-4 text-sm text-[color:var(--muted-foreground)]">
            {localized.about.body.split("\n\n").map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <Link
            href={`/${locale}/about`}
            className="mt-5 inline-flex text-sm font-semibold text-[color:var(--link)] transition hover:text-[color:var(--link-hover)]"
          >
            {localized.sections.aboutCta}
          </Link>
        </div>
        <div className="space-y-6">
          <div className="rounded-3xl border border-[color:var(--border)] bg-[color:var(--surface)] p-6 shadow-sm">
            <h3 className="text-xl font-semibold">
              {localized.sections.approachTitle}
            </h3>
            <ul className="mt-4 space-y-2 text-sm text-[color:var(--muted-foreground)]">
              {localized.services.items.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-1 h-2 w-2 rounded-full bg-[color:var(--accent)]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl border border-[color:var(--accent)] bg-[color:var(--tag)] px-6 py-5 text-sm text-[color:var(--accent-foreground)]">
            <div className="font-semibold">{localized.trial.title}</div>
            <p className="mt-2 text-[color:var(--accent-foreground)]">
              {localized.trial.description}
            </p>
            <Link
              href={`/${locale}/trial`}
              className="mt-4 inline-flex rounded-full bg-[color:var(--primary)] px-5 py-2 text-xs font-semibold text-[color:var(--primary-foreground)]"
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
              className="rounded-full bg-[color:var(--surface-inverse-foreground)] px-6 py-3 text-sm font-semibold text-[color:var(--surface-inverse)]"
            >
              {localized.hero.primaryCta}
            </Link>
            <p className="text-xs opacity-75">{localized.hero.ctaNote}</p>
          </div>
        </div>
      </section>
    </div>
  );
}
