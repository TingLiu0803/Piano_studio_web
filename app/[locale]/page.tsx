import Link from "next/link";
import Image from "next/image";
import { type Locale, content, siteConfig } from "@/content/site";
import { getFaqItems, homeFaqIds } from "@/content/faqs";
import { landingPageSlugs } from "@/content/landing-pages";
import BilibiliGallery from "@/components/BilibiliGallery";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";
import GoogleReviewsPromo from "@/components/GoogleReviewsPromo";
import FaqSection from "@/components/FaqSection";
import JsonLd from "@/components/JsonLd";
import Band from "@/components/ui/Band";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Icon, { type IconName } from "@/components/ui/Icon";
import SectionHeading from "@/components/ui/SectionHeading";
import StepBlock from "@/components/ui/StepBlock";
import OctaveStrip from "@/components/ui/OctaveStrip";
import {
  buildFaqJsonLd,
  buildMetadata,
  buildSpeakableJsonLd,
} from "@/lib/seo";

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
  const typedLocale = locale as Locale;
  const localized = content[typedLocale];
  const faqItems = getFaqItems(typedLocale, homeFaqIds);
  const performersMore = typedLocale === "en" ? "More performances" : "更多演出";

  return (
    <>
      <BreadcrumbJsonLd locale={locale as Locale} path={`/${locale}`} />
      <JsonLd data={buildFaqJsonLd(typedLocale, homeFaqIds)} />
      {/* Home has no QuickAnswer block, so speakable targets only the H1. */}
      <JsonLd data={buildSpeakableJsonLd(typedLocale, `/${locale}`, ["h1"])} />

      {/* Hero */}
      <Band tone="white" py="lg">
        <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <Badge tone="neutral" icon="verified">
              {localized.labels.city} · {localized.labels.formatsSlash}
            </Badge>
            <h1 className="mt-5 text-[2.75rem] font-black leading-[1.04] tracking-[-0.01em] text-[color:var(--mnb-ink)] md:text-[3.75rem]">
              {localized.hero.title}
            </h1>
            <p className="mt-5 max-w-[48ch] text-lg leading-relaxed text-[color:var(--text-muted)]">
              {localized.hero.subtitle}
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button
                href={`/${locale}/trial`}
                variant="primary"
                size="lg"
                icon="calendar_month"
                data-ga-event="trial_cta_click"
                data-ga-placement="hero_primary"
              >
                {localized.hero.primaryCta}
              </Button>
              <Button href="#bilibili-videos" variant="secondary" size="lg" icon="smart_display">
                {localized.hero.secondaryCta}
              </Button>
            </div>
            <p className="mt-3.5 text-sm text-[color:var(--text-muted)]">
              {localized.hero.ctaNote}
            </p>
            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {localized.hero.stats.map((item) => (
                <div
                  key={item.label}
                  className="rounded-[var(--radius-md)] border border-[color:var(--border)] bg-[color:var(--surface)] px-3.5 py-3"
                >
                  <div className="text-xl font-black text-[color:var(--mnb-ink)]">
                    {item.value}
                  </div>
                  <div className="text-xs text-[color:var(--text-muted)]">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Card padding="md">
            <div className="aspect-video overflow-hidden rounded-[var(--radius-md)] border border-[color:var(--border)] bg-black">
              <iframe
                src={localized.hero.video.embedUrl}
                title={localized.hero.video.title}
                className="h-full w-full"
                loading="eager"
                allowFullScreen
              />
            </div>
            <p className="mt-3.5 px-1 text-sm text-[color:var(--text-muted)]">
              {localized.hero.video.caption}
            </p>
          </Card>
        </div>
      </Band>

      {/* How it works */}
      <Band tone="soft" divider py="md">
        <OctaveStrip tone="ink" height={22} style={{ marginBottom: "2rem", opacity: 0.8 }} />
        <SectionHeading
          align="center"
          eyebrow={localized.howItWorks.eyebrow}
          title={localized.howItWorks.title}
          subtitle={localized.howItWorks.subtitle}
        />
        <div className="mt-11 grid gap-8 md:grid-cols-3">
          {localized.howItWorks.steps.map((step) => (
            <StepBlock key={step.label} icon={step.icon as IconName} step={step.label} title={step.title}>
              {step.body}
            </StepBlock>
          ))}
        </div>
      </Band>

      {/* Performances */}
      <Band tone="white" py="lg" id="bilibili-videos" style={{ scrollMarginTop: "80px" }}>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading
            eyebrow={typedLocale === "en" ? "Performances" : "演出"}
            title={localized.sections.performancesTitle}
            subtitle={localized.sections.performancesDescription}
          />
          <Button
            href="https://space.bilibili.com/5349076"
            newTab
            variant="tertiary"
            icon="smart_display"
            iconPosition="right"
          >
            {performersMore}
          </Button>
        </div>
        <div className="mt-9">
          <BilibiliGallery locale={typedLocale} />
        </div>
      </Band>

      {/* Meet your teacher */}
      <Band tone="soft" divider py="none" container={false}>
        <div className="mx-auto grid w-full max-w-[var(--content-max)] items-center gap-12 px-6 md:grid-cols-[0.95fr_1.05fr]">
          <div className="py-10">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[var(--radius-lg)] shadow-[var(--shadow-card)]">
              <Image
                src="/piano-hands.jpg"
                alt={`Hands on the piano keys at ${siteConfig.studioName}, San Jose`}
                fill
                sizes="(max-width: 768px) 100vw, 45vw"
                className="object-cover"
              />
            </div>
          </div>
          <div className="py-2 md:py-14">
            <SectionHeading
              eyebrow={localized.meetTeacher.eyebrow}
              title={localized.meetTeacher.title}
              subtitle={localized.meetTeacher.subtitle}
            />
            <ul className="mt-6 flex flex-col gap-3">
              {localized.about.summaryBullets.map((line) => (
                <li key={line} className="flex items-start gap-2.5 text-base leading-relaxed text-[color:var(--text-body,var(--foreground))]">
                  <Icon name="check_circle" size={20} style={{ color: "var(--mnb-logo-green-deep)", flexShrink: 0, marginTop: "2px" }} />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
            <div className="mt-7">
              <Button
                href={`/${locale}/about`}
                variant="outline"
                icon="arrow_forward"
                iconPosition="right"
                data-ga-event="about_bio_click"
                data-ga-placement="home_meet_teacher"
              >
                {localized.meetTeacher.cta}
              </Button>
            </div>
          </div>
        </div>
      </Band>

      {/* Lesson hub */}
      <Band tone="white" py="lg" id="lesson-options" style={{ scrollMarginTop: "80px" }}>
        <SectionHeading
          align="center"
          eyebrow={typedLocale === "en" ? "Lesson types" : "课程类型"}
          title={localized.sections.lessonHubTitle}
          subtitle={localized.sections.lessonHubDescription}
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {landingPageSlugs.map((slug) => (
            <Card
              key={slug}
              href={`/${locale}/${slug}`}
              interactive
              padding="md"
              data-ga-event="lesson_hub_card_click"
              data-ga-slug={slug}
              data-ga-placement="home_lesson_hub"
            >
              <div className="flex min-h-[84px] flex-col justify-between gap-3.5">
                <span className="text-[17px] font-bold text-[color:var(--foreground)]">
                  {localized.seo.breadcrumbLabels?.[slug] ?? slug}
                </span>
                <span className="inline-flex items-center gap-1.5 text-[13px] font-bold text-[color:var(--mnb-ink)]">
                  {localized.sections.lessonHubCardCta}
                  <Icon name="arrow_forward" size={16} />
                </span>
              </div>
            </Card>
          ))}
        </div>
      </Band>

      {/* Reviews */}
      <Band tone="soft" divider py="lg">
        <GoogleReviewsPromo locale={locale as Locale} variant="featured" />
      </Band>

      {/* Partnership */}
      <Band tone="white" py="lg">
        <div className="grid items-center gap-10 md:grid-cols-[1.1fr_0.9fr]">
          <div>
            <SectionHeading
              eyebrow={typedLocale === "en" ? "Nonprofit family" : "公益大家庭"}
              title={localized.sections.partnershipTitle}
              subtitle={localized.sections.partnershipDescription}
            />
            <h3 className="mt-5 text-xl font-bold text-[color:var(--foreground)]">
              {localized.sections.partnershipBoardMemberTitle}
            </h3>
            <p className="mt-2 max-w-[60ch] text-base leading-relaxed text-[color:var(--text-muted)]">
              {localized.sections.partnershipBoardMemberBody}
            </p>
            <div className="mt-6">
              <Button href="https://www.musicnbrain.com/" newTab variant="primary" icon="open_in_new">
                {localized.sections.partnershipCta}
              </Button>
            </div>
          </div>
          <Card padding="lg" style={{ background: "var(--surface-soft)" }}>
            <Image
              src="/musicnbrain-logo.png"
              alt="MusicNBrain nonprofit logo"
              width={160}
              height={52}
              className="h-[52px] w-auto"
            />
            <p className="mt-4 text-[15px] leading-relaxed text-[color:var(--text-body,var(--foreground))]">
              {localized.sections.landingPartnerFooter}
            </p>
            <div className="mt-4 inline-flex items-center gap-2 text-[13px] font-bold text-[color:var(--text-muted)]">
              <Icon name="verified" size={18} style={{ color: "var(--mnb-logo-green-deep)" }} />
              501(c)(3) · EIN 82-3827644
            </div>
          </Card>
        </div>
      </Band>

      {/* FAQ */}
      <Band tone="soft" divider py="lg">
        <FaqSection
          collapsible
          title={
            typedLocale === "en"
              ? "Frequently asked questions from adult beginners"
              : "成人初学者常见问题"
          }
          intro={
            typedLocale === "en"
              ? "Direct answers to the questions students ask before booking a trial lesson."
              : "在预约试听前，学生最常问的几个问题。"
          }
          items={faqItems}
        />
        <p className="mx-auto mt-6 max-w-[820px] text-center text-[15px] text-[color:var(--text-muted)]">
          {typedLocale === "en" ? "Still have a question? " : "还有疑问？"}
          <Link
            href={`/${locale}/contact`}
            className="font-bold text-[color:var(--mnb-ink)] underline underline-offset-[3px]"
          >
            {localized.nav.contact}
          </Link>
        </p>
      </Band>

      {/* Testimonials */}
      <Band tone="white" py="lg">
        <SectionHeading
          eyebrow={typedLocale === "en" ? "Reviews" : "评价"}
          title={localized.sections.testimonialsTitle}
        />
        <div className="mt-9 grid gap-5 md:grid-cols-2">
          {localized.testimonials.map((item) => (
            <Card key={item.name} padding="lg" style={{ background: "var(--surface-soft)" }}>
              <Icon name="format_quote" size={28} style={{ color: "var(--accent)" }} />
              <p className="mt-2 text-base leading-relaxed text-[color:var(--text-body,var(--foreground))]">
                {item.quote}
              </p>
              <div className="mt-4 text-[15px] font-bold text-[color:var(--foreground)]">
                {item.name}
              </div>
            </Card>
          ))}
        </div>
      </Band>

      {/* Trial band (dark) */}
      <Band tone="inverse" py="sm">
        <div className="grid items-center gap-8 md:grid-cols-[1.2fr_0.8fr]">
          <div>
            <h2 className="text-[2rem] font-black">{localized.trial.title}</h2>
            <p className="mt-3 max-w-[48ch] text-base opacity-85">
              {localized.trial.description}
            </p>
          </div>
          <div className="flex flex-col items-start gap-2.5">
            <Button
              href={`/${locale}/trial`}
              variant="secondary"
              size="lg"
              icon="calendar_month"
              data-ga-event="trial_cta_click"
              data-ga-placement="home_footer"
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
