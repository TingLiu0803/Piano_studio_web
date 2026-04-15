import Link from "next/link";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";
import { content, type Locale } from "@/content/site";
import {
  landingPages,
  type LandingPageSlug,
} from "@/content/landing-pages";

type LandingPageViewProps = {
  locale: Locale;
  slug: LandingPageSlug;
};

export default function LandingPageView({ locale, slug }: LandingPageViewProps) {
  const data = landingPages[locale][slug];
  const localized = content[locale];
  const path = `/${locale}/${slug}`;

  return (
    <>
      <BreadcrumbJsonLd locale={locale} path={path} />
      <div className="flex flex-col gap-12">
        <section className="rounded-3xl border border-[color:var(--border)] bg-[color:var(--surface)] p-8 shadow-lg">
          <h1 className="text-3xl font-semibold leading-tight text-[color:var(--foreground)] md:text-4xl">
            {data.h1}
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-[color:var(--muted-foreground)]">
            {data.intro}
          </p>
          <a
            href="https://www.musicnbrain.com/"
            target="_blank"
            rel="noreferrer"
            className="mt-5 inline-flex rounded-full border border-[color:var(--accent)] bg-[color:var(--tag)] px-4 py-2 text-xs font-semibold text-[color:var(--accent-foreground)]"
          >
            Partnered with MusicNBrain
          </a>
        </section>

        {data.sections.map((section) => (
          <section
            key={section.heading}
            className="rounded-3xl border border-[color:var(--border)] bg-[color:var(--surface)] p-8 shadow-sm"
          >
            <h2 className="text-xl font-semibold text-[color:var(--foreground)]">
              {section.heading}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-[color:var(--muted-foreground)]">
              {section.body}
            </p>
          </section>
        ))}

        <section className="rounded-3xl bg-[color:var(--surface-inverse)] px-6 py-10 text-[color:var(--surface-inverse-foreground)] shadow-xl">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-xl font-semibold">{localized.trial.title}</h2>
              <p className="mt-2 text-sm opacity-90">
                {localized.trial.description}
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href={`/${locale}/trial`}
                className="inline-flex rounded-full bg-[color:var(--primary)] px-6 py-3 text-sm font-semibold text-[color:var(--primary-foreground)] transition hover:bg-[color:var(--primary-hover)]"
              >
                {localized.hero.primaryCta}
              </Link>
              <Link
                href={`/${locale}/contact`}
                className="inline-flex rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-[color:var(--surface-inverse-foreground)] transition hover:border-white/60"
              >
                {localized.nav.contact}
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
