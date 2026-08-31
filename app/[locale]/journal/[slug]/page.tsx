import { notFound } from "next/navigation";
import Link from "next/link";
import { type Locale, locales, content } from "@/content/site";
import {
  type ArticleSlug,
  articleSlugs,
  getArticle,
} from "@/content/articles";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";
import JsonLd from "@/components/JsonLd";
import QuickAnswer from "@/components/QuickAnswer";
import AuthorByline from "@/components/AuthorByline";
import Band from "@/components/ui/Band";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Icon from "@/components/ui/Icon";
import SectionHeading from "@/components/ui/SectionHeading";
import {
  buildArticleJsonLd,
  buildHowToJsonLd,
  buildMetadata,
  buildSpeakableJsonLd,
} from "@/lib/seo";

// Kill switch — see `app/[locale]/journal/page.tsx` for the full checklist.
// Setting this to `false` makes every article URL 404.
const JOURNAL_ENABLED = true;

export function generateStaticParams() {
  if (!JOURNAL_ENABLED) return [];
  return locales.flatMap((locale) =>
    articleSlugs.map((slug) => ({ locale, slug })),
  );
}

type Params = { params: Promise<{ locale: string; slug: string }> };

function isValidSlug(slug: string): slug is ArticleSlug {
  return (articleSlugs as readonly string[]).includes(slug);
}

export async function generateMetadata({ params }: Params) {
  const { locale, slug } = await params;
  if (!isValidSlug(slug) || !locales.includes(locale as Locale)) {
    return {};
  }
  const article = getArticle(locale as Locale, slug);
  return buildMetadata(locale as Locale, `/${locale}/journal/${slug}`, undefined, {
    title: `${article.title} | Eric Liu Piano Studio`,
    description: article.description,
  });
}

export default async function JournalArticlePage({ params }: Params) {
  if (!JOURNAL_ENABLED) notFound();
  const { locale, slug } = await params;
  if (!locales.includes(locale as Locale) || !isValidSlug(slug)) {
    notFound();
  }
  const typed = locale as Locale;
  const article = getArticle(typed, slug);
  const localized = content[typed];
  const path = `/${typed}/journal/${slug}`;
  const quickAnswerLabel = typed === "en" ? "Quick answer" : "速答";
  const howToTitle =
    typed === "en" ? "Step by step" : "分步指南";
  const relatedTitle =
    typed === "en" ? "Continue reading" : "延伸阅读";
  const backLabel =
    typed === "en" ? "All journal articles" : "全部学琴笔记";
  const howToData = buildHowToJsonLd(typed, article);

  return (
    <>
      <BreadcrumbJsonLd locale={typed} path={path} />
      <JsonLd data={buildArticleJsonLd(typed, article)} />
      <JsonLd data={buildSpeakableJsonLd(typed, path)} />
      {howToData ? <JsonLd data={howToData} /> : null}

      <article>
        <Band tone="white" py="lg">
          <Link
            href={`/${typed}/journal`}
            className="inline-flex items-center gap-1.5 text-sm font-bold text-[color:var(--text-muted)] transition-colors hover:text-[color:var(--mnb-ink)]"
          >
            <Icon name="arrow_back" size={18} />
            {backLabel}
          </Link>
          <div className="mt-4">
            <Badge tone="neutral" icon="music_note">{article.category}</Badge>
          </div>
          <h1 className="mt-4 max-w-full text-[2.25rem] font-black leading-[1.06] tracking-[-0.01em] text-[color:var(--mnb-ink)] md:max-w-[22ch] md:text-[3rem]">
            {article.title}
          </h1>
          <div className="mt-3">
            <AuthorByline
              locale={typed}
              publishedAt={article.datePublished}
              updatedAt={article.dateModified}
            />
          </div>
          <p className="mt-4 max-w-[70ch] break-words text-[length:var(--text-body-lg)] leading-relaxed text-[color:var(--text-muted)]">
            {article.intro}
          </p>
          <div className="mt-8">
            <QuickAnswer label={quickAnswerLabel} text={article.quickAnswer} />
          </div>
        </Band>

        <Band tone="soft" divider py="lg">
          <div className="flex min-w-0 flex-col gap-10">
            {article.sections.map((section) => (
              <section
                key={section.heading}
                className="grid min-w-0 items-start gap-8 md:grid-cols-[0.9fr_1.1fr]"
              >
                <h2 className="text-[length:var(--text-h2)] font-bold leading-[var(--leading-heading)] text-[color:var(--foreground)]">
                  {section.heading}
                </h2>
                <div className="min-w-0">
                  <p className="text-base leading-relaxed text-[color:var(--text-body,var(--foreground))]">
                    {section.body}
                  </p>
                  {section.bullets?.length ? (
                    <ul className="mt-4 flex flex-col gap-2.5">
                      {section.bullets.map((bullet) => (
                        <li
                          key={bullet}
                          className="flex items-start gap-2.5 text-[15px] leading-relaxed text-[color:var(--text-body,var(--foreground))]"
                        >
                          <Icon
                            name="music_note"
                            size={18}
                            style={{ color: "var(--accent)", flexShrink: 0, marginTop: "2px" }}
                          />
                          <span className="min-w-0">{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              </section>
            ))}
          </div>
        </Band>

        {article.howTo ? (
          <Band tone="white" py="lg">
            <Card padding="lg" style={{ background: "var(--surface-soft)", minWidth: 0 }}>
              <p className="text-[length:var(--text-label)] font-bold uppercase tracking-[var(--tracking-label)] text-[color:var(--tag-foreground)]">
                {howToTitle}
              </p>
              <h2 className="mt-2 text-[length:var(--text-h2)] font-bold leading-[var(--leading-heading)]">
                {article.howTo.name}
              </h2>
              <p className="mt-2 text-base leading-relaxed text-[color:var(--text-body,var(--foreground))]">
                {article.howTo.description}
              </p>
              <ol className="mt-4 list-decimal space-y-3 pl-5 text-base leading-relaxed text-[color:var(--text-body,var(--foreground))]">
                {article.howTo.steps.map((step) => (
                  <li key={step.name} className="min-w-0">
                    <p className="font-bold">{step.name}</p>
                    <p className="mt-1">{step.text}</p>
                  </li>
                ))}
              </ol>
            </Card>
          </Band>
        ) : null}

        {article.related?.length ? (
          <Band tone="white" py={article.howTo ? "none" : "lg"}>
            <div className={article.howTo ? "pb-16" : ""}>
              <SectionHeading
                as="h2"
                eyebrow={typed === "en" ? "Related" : "相关"}
                title={relatedTitle}
              />
              <ul className="mt-5 grid min-w-0 gap-4 sm:grid-cols-2">
                {article.related.map((link) => (
                  <li key={link.slug} className="min-w-0">
                    <Card
                      href={`/${typed}/journal/${link.slug}`}
                      interactive
                      padding="md"
                      className="min-w-0"
                      style={{ minWidth: 0 }}
                      data-ga-event="article_related_click"
                      data-ga-slug={link.slug}
                    >
                      <span className="flex w-full min-w-0 items-start justify-between gap-2 text-[15px] font-bold text-[color:var(--foreground)]">
                        <span className="min-w-0 break-words">{link.label}</span>
                        <Icon name="arrow_forward" size={16} style={{ color: "var(--mnb-ink)", flexShrink: 0 }} />
                      </span>
                    </Card>
                  </li>
                ))}
              </ul>
            </div>
          </Band>
        ) : null}

        <Band tone="inverse" py="sm">
          <div className="grid min-w-0 items-center gap-8 md:grid-cols-[1.2fr_0.8fr]">
            <div className="min-w-0">
              <h2 className="text-[2rem] font-black">
                {typed === "en" ? "Try a free lesson" : "免费试听"}
              </h2>
              <p className="mt-3 max-w-[48ch] text-base opacity-85">
                {typed === "en"
                  ? "Book a free trial lesson with the studio — no credit card required."
                  : "预约一节免费试听，无需信用卡。"}
              </p>
            </div>
            <div className="flex min-w-0 flex-col items-start gap-2.5">
              <Button
                href={`/${typed}/trial`}
                variant="secondary"
                size="lg"
                icon="calendar_month"
                data-ga-event="trial_cta_click"
                data-ga-placement="article_footer"
              >
                {typed === "en" ? "Book a free trial lesson" : "预约免费试听"}
              </Button>
              <p className="text-xs opacity-75">{localized.hero.ctaNote}</p>
            </div>
          </div>
        </Band>
      </article>
    </>
  );
}
