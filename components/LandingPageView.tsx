import Link from "next/link";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";
import JsonLd from "@/components/JsonLd";
import QuickAnswer from "@/components/QuickAnswer";
import AuthorByline from "@/components/AuthorByline";
import FactsAtAGlance from "@/components/FactsAtAGlance";
import { content, type Locale } from "@/content/site";
import {
  landingPages,
  type LandingPageSlug,
  type LandingSection,
} from "@/content/landing-pages";
import { buildSpeakableJsonLd } from "@/lib/seo";

type LandingPageViewProps = {
  locale: Locale;
  slug: LandingPageSlug;
};

function SectionContent({ section }: { section: LandingSection }) {
  const hasBullets = Boolean(section.bullets?.length);

  return (
    <>
      {hasBullets ? (
        <ul className="mt-3 list-disc space-y-2 pl-5 text-base text-[color:var(--muted-foreground)]">
          {section.bullets!.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      ) : null}
      <p className="mt-3 text-base leading-relaxed text-[color:var(--muted-foreground)]">
        {section.body}
      </p>
    </>
  );
}

export default function LandingPageView({ locale, slug }: LandingPageViewProps) {
  const data = landingPages[locale][slug];
  const localized = content[locale];
  const path = `/${locale}/${slug}`;

  const quickAnswerLabel = locale === "en" ? "Quick answer" : "速答";
  const factsTitle = locale === "en" ? "Facts at a glance" : "一眼速览";
  const factsEyebrow = locale === "en" ? "Studio facts" : "工作室信息";
  const neighborhoodsDefault = locale === "en" ? "Neighborhoods and service area" : "服务区域";
  const commonObjectionsTitle = locale === "en" ? "Common questions" : "常见问题";
  const relatedTitle = locale === "en" ? "Continue reading" : "延伸阅读";

  return (
    <>
      <BreadcrumbJsonLd locale={locale} path={path} />
      <JsonLd data={buildSpeakableJsonLd(locale, path)} />
      <div className="flex flex-col gap-12">
        <section className="rounded-3xl border border-[color:var(--border)] bg-[color:var(--surface)] p-8 shadow-lg">
          <h1 className="text-3xl font-semibold leading-tight text-[color:var(--foreground)] md:text-4xl">
            {data.h1}
          </h1>
          <div className="mt-3">
            <AuthorByline locale={locale} />
          </div>
          <p className="mt-4 text-base leading-relaxed text-[color:var(--muted-foreground)]">
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

        <QuickAnswer label={quickAnswerLabel} text={data.quickAnswer} />

        <FactsAtAGlance
          title={factsTitle}
          eyebrow={factsEyebrow}
          facts={data.facts}
        />

        {data.sections.map((section) => (
          <section
            key={section.heading}
            className="rounded-3xl border border-[color:var(--border)] bg-[color:var(--surface)] p-8 shadow-sm"
          >
            <h2 className="text-xl font-semibold text-[color:var(--foreground)]">
              {section.heading}
            </h2>
            <SectionContent section={section} />
          </section>
        ))}

        {data.neighborhoods ? (
          <section className="rounded-3xl border border-[color:var(--border)] bg-[color:var(--surface)] p-8 shadow-sm">
            <h2 className="text-xl font-semibold text-[color:var(--foreground)]">
              {data.neighborhoods.heading || neighborhoodsDefault}
            </h2>
            <p className="mt-3 text-base leading-relaxed text-[color:var(--muted-foreground)]">
              {data.neighborhoods.body}
            </p>
            {data.neighborhoods.bullets?.length ? (
              <ul className="mt-3 list-disc space-y-1 pl-5 text-base text-[color:var(--muted-foreground)]">
                {data.neighborhoods.bullets.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            ) : null}
          </section>
        ) : null}

        {data.commonObjections?.length ? (
          <section
            id="common-questions"
            aria-labelledby="common-questions-heading"
            className="scroll-mt-28 rounded-3xl border border-[color:var(--border)] bg-[color:var(--surface)] p-8 shadow-sm"
          >
            <h2
              id="common-questions-heading"
              className="text-xl font-semibold text-[color:var(--foreground)]"
            >
              {commonObjectionsTitle}
            </h2>
            <div className="mt-4 space-y-4">
              {data.commonObjections.map((item, idx) => {
                const anchor = `objection-${idx + 1}`;
                return (
                  <article
                    key={item.question}
                    id={anchor}
                    className="scroll-mt-28 rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface-muted)] p-5"
                  >
                    <h3 className="text-base font-semibold text-[color:var(--foreground)]">
                      <a
                        href={`#${anchor}`}
                        className="hover:underline underline-offset-4"
                        aria-label={`Permalink to: ${item.question}`}
                      >
                        {item.question}
                      </a>
                    </h3>
                    <p className="mt-2 text-base leading-relaxed text-[color:var(--muted-foreground)]">
                      {item.answer}
                    </p>
                  </article>
                );
              })}
            </div>
          </section>
        ) : null}

        {data.nextStep ? (
          <section className="rounded-3xl border border-[color:var(--accent)] bg-[color:var(--accent)] px-6 py-6 text-[color:var(--accent-foreground)] shadow-md">
            <p className="text-base leading-relaxed">{data.nextStep}</p>
            <Link
              href={`/${locale}/trial`}
              data-ga-event="trial_cta_click"
              data-ga-placement="landing_next_step"
              className="mt-4 inline-flex min-h-10 items-center justify-center rounded-full bg-[color:var(--primary)] px-5 py-2.5 text-sm font-semibold text-[color:var(--primary-foreground)] transition hover:bg-[color:var(--primary-hover)]"
            >
              {localized.hero.primaryCta}
            </Link>
          </section>
        ) : null}

        {data.relatedLinks?.length ? (
          <section className="rounded-3xl border border-[color:var(--border)] bg-[color:var(--surface-muted)] p-8 shadow-sm">
            <h2 className="text-base font-semibold text-[color:var(--foreground)]">
              {relatedTitle}
            </h2>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {data.relatedLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={`/${locale}${link.href}`}
                    data-ga-event="related_link_click"
                    data-ga-href={link.href}
                    data-ga-placement={`landing_${slug}`}
                    className="text-sm font-medium text-[color:var(--link)] underline-offset-4 hover:underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

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
              <p className="mt-2 text-base opacity-90">
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
