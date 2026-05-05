import Link from "next/link";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";
import { content, type Locale } from "@/content/site";
import {
  landingPages,
  type LandingPageSlug,
  type LandingSection,
} from "@/content/landing-pages";

type LandingPageViewProps = {
  locale: Locale;
  slug: LandingPageSlug;
};

function SectionContent({
  section,
  readMoreLabel,
}: {
  section: LandingSection;
  readMoreLabel: string;
}) {
  const hasBullets = Boolean(section.bullets?.length);
  const isQuestionHeading = section.heading.includes("?");
  const useDetails = !isQuestionHeading && (hasBullets || section.body.length > 260);

  return (
    <>
      {hasBullets ? (
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-[color:var(--muted-foreground)]">
          {section.bullets!.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      ) : null}
      {useDetails ? (
        <details className="mt-4 rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface-muted)] px-4 py-3">
          <summary className="cursor-pointer text-sm font-semibold text-[color:var(--link)]">
            {readMoreLabel}
          </summary>
          <p className="mt-3 text-sm leading-relaxed text-[color:var(--muted-foreground)]">
            {section.body}
          </p>
        </details>
      ) : (
        <p className="mt-3 text-sm leading-relaxed text-[color:var(--muted-foreground)]">
          {section.body}
        </p>
      )}
    </>
  );
}

export default function LandingPageView({ locale, slug }: LandingPageViewProps) {
  const data = landingPages[locale][slug];
  const localized = content[locale];
  const path = `/${locale}/${slug}`;
  const readMore = localized.sections.readMoreDetails;

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
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href={`/${locale}/trial`}
              data-ga-event="trial_cta_click"
              data-ga-placement="landing_intro"
              className="inline-flex min-h-11 items-center justify-center rounded-full bg-[color:var(--primary)] px-6 py-3 text-center text-sm font-semibold leading-snug text-[color:var(--primary-foreground)] transition hover:bg-[color:var(--primary-hover)]"
            >
              {localized.hero.primaryCta}
            </Link>
            <Link
              href={`/${locale}/contact`}
              data-ga-event="contact_cta_click"
              data-ga-placement="landing_intro"
              className="inline-flex min-h-11 items-center justify-center rounded-full border border-[color:var(--border)] px-6 py-3 text-center text-sm font-semibold leading-snug transition hover:border-[color:var(--foreground)]"
            >
              {localized.nav.contact}
            </Link>
          </div>
        </section>

        {data.sections.map((section) => (
          <section
            key={section.heading}
            className="rounded-3xl border border-[color:var(--border)] bg-[color:var(--surface)] p-8 shadow-sm"
          >
            <h2 className="text-xl font-semibold text-[color:var(--foreground)]">
              {section.heading}
            </h2>
            <SectionContent section={section} readMoreLabel={readMore} />
          </section>
        ))}

        <p className="text-center text-xs leading-relaxed text-[color:var(--muted-foreground)]">
          <a
            href="https://www.musicnbrain.com/"
            target="_blank"
            rel="noreferrer"
            className="font-semibold text-[color:var(--link)] underline-offset-4 hover:text-[color:var(--link-hover)] hover:underline"
          >
            {localized.nav.musicnbrain}
          </a>
          <span className="mx-1">·</span>
          {localized.sections.landingPartnerFooter}
        </p>

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
                data-ga-event="trial_cta_click"
                data-ga-placement="landing_footer"
                className="inline-flex min-h-11 items-center justify-center rounded-full bg-[color:var(--primary)] px-6 py-3 text-center text-sm font-semibold leading-snug text-[color:var(--primary-foreground)] transition hover:bg-[color:var(--primary-hover)]"
              >
                {localized.hero.primaryCta}
              </Link>
              <Link
                href={`/${locale}/contact`}
                data-ga-event="contact_cta_click"
                data-ga-placement="landing_footer"
                className="inline-flex min-h-11 items-center justify-center rounded-full border border-white/30 px-6 py-3 text-center text-sm font-semibold leading-snug text-[color:var(--surface-inverse-foreground)] transition hover:border-white/60"
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
