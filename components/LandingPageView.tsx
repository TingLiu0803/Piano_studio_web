import Link from "next/link";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";
import JsonLd from "@/components/JsonLd";
import QuickAnswer from "@/components/QuickAnswer";
import AuthorByline from "@/components/AuthorByline";
import FactsAtAGlance from "@/components/FactsAtAGlance";
import Band from "@/components/ui/Band";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Icon from "@/components/ui/Icon";
import SectionHeading from "@/components/ui/SectionHeading";
import { content, type Locale } from "@/content/site";
import { landingPages, type LandingPageSlug } from "@/content/landing-pages";
import { buildSpeakableJsonLd } from "@/lib/seo";

type LandingPageViewProps = {
  locale: Locale;
  slug: LandingPageSlug;
};

export default function LandingPageView({ locale, slug }: LandingPageViewProps) {
  const data = landingPages[locale][slug];
  const localized = content[locale];
  const path = `/${locale}/${slug}`;

  const lessonEyebrow = locale === "en" ? "Lesson options" : "课程类型";
  const backToLessonsLabel = locale === "en" ? "All lessons" : "全部课程";
  const backToHomeLabel = locale === "en" ? "Back to homepage" : "返回主页";
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

      {/* Hero */}
      <Band tone="white" py="lg">
        <Link
          href={`/${locale}#lesson-options`}
          className="inline-flex items-center gap-1.5 text-sm font-bold text-[color:var(--text-muted)] transition-colors hover:text-[color:var(--mnb-ink)]"
        >
          <Icon name="arrow_back" size={18} />
          {backToLessonsLabel}
        </Link>
        <div className="mt-4">
          <Badge tone="neutral" icon="music_note">{lessonEyebrow}</Badge>
        </div>
        <h1 className="mt-4 max-w-[22ch] text-[2.25rem] font-black leading-[1.06] tracking-[-0.01em] text-[color:var(--mnb-ink)] md:text-[3rem]">
          {data.h1}
        </h1>
        <div className="mt-3">
          <AuthorByline locale={locale} />
        </div>
        <p className="mt-4 max-w-[70ch] text-[length:var(--text-body-lg)] leading-relaxed text-[color:var(--text-muted)]">
          {data.intro}
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button
            href={`/${locale}/trial`}
            variant="primary"
            size="lg"
            icon="calendar_month"
            data-ga-event="trial_cta_click"
            data-ga-placement="landing_intro"
          >
            {localized.hero.primaryCta}
          </Button>
          <Button
            href={`/${locale}`}
            variant="secondary"
            size="lg"
            data-ga-event="back_to_home_click"
            data-ga-placement="landing_intro"
          >
            {backToHomeLabel}
          </Button>
        </div>
      </Band>

      {/* Quick answer + facts */}
      <Band tone="white" py="none">
        <div className="flex flex-col gap-8 pb-12">
          <QuickAnswer label={quickAnswerLabel} text={data.quickAnswer} />
          <FactsAtAGlance title={factsTitle} eyebrow={factsEyebrow} facts={data.facts} />
        </div>
      </Band>

      {/* Detail sections */}
      <Band tone="soft" divider py="lg">
        <div className="flex flex-col gap-10">
          {data.sections.map((section) => (
            <div key={section.heading} className="grid items-start gap-8 md:grid-cols-[0.9fr_1.1fr]">
              <h2 className="text-[length:var(--text-h2)] font-bold leading-[var(--leading-heading)] text-[color:var(--foreground)]">
                {section.heading}
              </h2>
              <div>
                <p className="text-base leading-relaxed text-[color:var(--text-body,var(--foreground))]">
                  {section.body}
                </p>
                {section.bullets?.length ? (
                  <ul className="mt-4 flex flex-col gap-2.5">
                    {section.bullets.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-[15px] leading-relaxed text-[color:var(--text-body,var(--foreground))]">
                        <Icon name="music_note" size={18} style={{ color: "var(--accent)", flexShrink: 0, marginTop: "2px" }} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </Band>

      {/* Neighborhoods */}
      {data.neighborhoods ? (
        <Band tone="white" py="lg">
          <SectionHeading
            eyebrow={locale === "en" ? "Areas served" : "服务范围"}
            title={data.neighborhoods.heading || neighborhoodsDefault}
            subtitle={data.neighborhoods.body}
          />
          {data.neighborhoods.bullets?.length ? (
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {data.neighborhoods.bullets.map((item) => (
                <div key={item} className="flex items-start gap-2 rounded-[var(--radius-md)] border border-[color:var(--border)] px-4 py-3.5 text-sm leading-relaxed text-[color:var(--text-body,var(--foreground))]">
                  <Icon name="location_on" size={18} style={{ color: "var(--text-muted)", flexShrink: 0, marginTop: "1px" }} />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          ) : null}
        </Band>
      ) : null}

      {/* Common objections */}
      {data.commonObjections?.length ? (
        <Band tone="soft" divider py="lg" id="common-questions" aria-labelledby="common-questions-heading">
          <SectionHeading
            id="common-questions-heading"
            eyebrow={locale === "en" ? "Before you book" : "预约前"}
            title={commonObjectionsTitle}
          />
          <div className="mt-7 flex flex-col gap-4">
            {data.commonObjections.map((item, idx) => {
              const anchor = `objection-${idx + 1}`;
              return (
                <article
                  key={item.question}
                  id={anchor}
                  className="scroll-mt-28 rounded-[var(--radius-md)] border border-[color:var(--border)] bg-[color:var(--surface)] p-5"
                >
                  <h3 className="flex items-start gap-2.5 text-[17px] font-bold text-[color:var(--foreground)]">
                    <Icon name="help" size={20} style={{ color: "var(--text-muted)", flexShrink: 0, marginTop: "1px" }} />
                    <a href={`#${anchor}`} className="underline-offset-4 hover:underline" aria-label={`Permalink to: ${item.question}`}>
                      {item.question}
                    </a>
                  </h3>
                  <p className="mt-2.5 pl-[30px] text-[15px] leading-relaxed text-[color:var(--text-body,var(--foreground))]">
                    {item.answer}
                  </p>
                </article>
              );
            })}
          </div>
        </Band>
      ) : null}

      {/* Next step + related */}
      <Band tone="white" py="lg">
        {data.nextStep ? (
          <p className="max-w-[62ch] text-[length:var(--text-body-lg)] leading-relaxed text-[color:var(--text-body,var(--foreground))]">
            {data.nextStep}
          </p>
        ) : null}
        <div className="mt-6 flex flex-wrap gap-3">
          <Button
            href={`/${locale}/trial`}
            variant="primary"
            size="lg"
            icon="calendar_month"
            data-ga-event="trial_cta_click"
            data-ga-placement="landing_next_step"
          >
            {localized.hero.primaryCta}
          </Button>
        </div>

        {data.relatedLinks?.length ? (
          <div className="mt-12">
            <SectionHeading as="h2" eyebrow={locale === "en" ? "Related" : "相关"} title={relatedTitle} />
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {data.relatedLinks.map((link) => (
                <Card
                  key={link.href}
                  href={`/${locale}${link.href}`}
                  interactive
                  padding="md"
                  data-ga-event="related_link_click"
                  data-ga-href={link.href}
                  data-ga-placement={`landing_${slug}`}
                >
                  <span className="inline-flex items-center justify-between gap-2 text-[15px] font-bold text-[color:var(--foreground)]">
                    {link.label}
                    <Icon name="arrow_forward" size={16} style={{ color: "var(--mnb-ink)" }} />
                  </span>
                </Card>
              ))}
            </div>
          </div>
        ) : null}

        <p className="mt-10 text-center text-xs leading-relaxed text-[color:var(--text-muted)]">
          <a
            href="https://www.musicnbrain.com/"
            target="_blank"
            rel="noreferrer"
            className="font-bold text-[color:var(--link)] underline-offset-4 hover:text-[color:var(--link-hover)] hover:underline"
          >
            {localized.nav.musicnbrain}
          </a>
          <span className="mx-1">·</span>
          {localized.sections.landingPartnerFooter}
        </p>
      </Band>

      {/* Trial band (dark) */}
      <Band tone="inverse" py="sm">
        <div className="grid items-center gap-8 md:grid-cols-[1.2fr_0.8fr]">
          <div>
            <h2 className="text-[2rem] font-black">{localized.trial.title}</h2>
            <p className="mt-3 max-w-[48ch] text-base opacity-85">{localized.trial.description}</p>
          </div>
          <div className="flex flex-col items-start gap-2.5">
            <Button
              href={`/${locale}/trial`}
              variant="secondary"
              size="lg"
              icon="calendar_month"
              data-ga-event="trial_cta_click"
              data-ga-placement="landing_footer"
            >
              {localized.hero.primaryCta}
            </Button>
            <p className="text-xs opacity-75">{localized.hero.ctaNote}</p>
          </div>
        </div>
      </Band>
    </>
  );
}
