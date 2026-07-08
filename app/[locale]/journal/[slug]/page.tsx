import { notFound } from "next/navigation";
import Link from "next/link";
import { type Locale, locales } from "@/content/site";
import {
  type ArticleSlug,
  articleSlugs,
  getArticle,
} from "@/content/articles";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";
import JsonLd from "@/components/JsonLd";
import QuickAnswer from "@/components/QuickAnswer";
import AuthorByline from "@/components/AuthorByline";
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
  const path = `/${typed}/journal/${slug}`;
  const quickAnswerLabel = typed === "en" ? "Quick answer" : "速答";
  const howToTitle =
    typed === "en" ? "Step by step" : "分步指南";
  const relatedTitle =
    typed === "en" ? "Continue reading" : "延伸阅读";
  const howToData = buildHowToJsonLd(typed, article);

  return (
    <>
      <BreadcrumbJsonLd locale={typed} path={path} />
      <JsonLd data={buildArticleJsonLd(typed, article)} />
      <JsonLd data={buildSpeakableJsonLd(typed, path)} />
      {howToData ? <JsonLd data={howToData} /> : null}

      <article className="flex flex-col gap-10">
        <header className="rounded-lg border border-[color:var(--border)] bg-[color:var(--surface)] p-8 shadow-sm">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[color:var(--tag-foreground)]">
            {article.category}
          </p>
          <h1 className="mt-2 text-3xl font-black leading-[1.1] tracking-[-0.01em] text-[color:var(--foreground)] md:text-4xl">
            {article.title}
          </h1>
          <div className="mt-3">
            <AuthorByline
              locale={typed}
              publishedAt={article.datePublished}
              updatedAt={article.dateModified}
            />
          </div>
          <p className="mt-4 text-sm leading-relaxed text-[color:var(--muted-foreground)]">
            {article.intro}
          </p>
        </header>

        <QuickAnswer label={quickAnswerLabel} text={article.quickAnswer} />

        {article.sections.map((section) => (
          <section
            key={section.heading}
            className="rounded-lg border border-[color:var(--border)] bg-[color:var(--surface)] p-8 shadow-sm"
          >
            <h2 className="text-xl font-bold text-[color:var(--foreground)]">
              {section.heading}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-[color:var(--muted-foreground)]">
              {section.body}
            </p>
            {section.bullets?.length ? (
              <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-[color:var(--muted-foreground)]">
                {section.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            ) : null}
          </section>
        ))}

        {article.howTo ? (
          <section className="rounded-lg border border-[color:var(--accent)] bg-[color:var(--tag)] p-8 text-[color:var(--foreground)] shadow-sm">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[color:var(--tag-foreground)]">
              {howToTitle}
            </p>
            <h2 className="mt-1 text-xl font-bold">{article.howTo.name}</h2>
            <p className="mt-2 text-sm leading-relaxed">
              {article.howTo.description}
            </p>
            <ol className="mt-4 list-decimal space-y-3 pl-5 text-sm leading-relaxed">
              {article.howTo.steps.map((step) => (
                <li key={step.name}>
                  <p className="font-bold">{step.name}</p>
                  <p className="mt-1">{step.text}</p>
                </li>
              ))}
            </ol>
          </section>
        ) : null}

        {article.related?.length ? (
          <section className="rounded-lg border border-[color:var(--border)] bg-[color:var(--surface-muted)] p-8 shadow-sm">
            <h2 className="text-base font-bold text-[color:var(--foreground)]">
              {relatedTitle}
            </h2>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {article.related.map((link) => (
                <li key={link.slug}>
                  <Link
                    href={`/${typed}/journal/${link.slug}`}
                    data-ga-event="article_related_click"
                    data-ga-slug={link.slug}
                    className="text-sm font-medium text-[color:var(--link)] underline-offset-4 hover:underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        <section className="rounded-lg bg-[color:var(--surface-inverse)] px-6 py-10 text-[color:var(--surface-inverse-foreground)] shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-xl font-bold">
                {typed === "en" ? "Try a free lesson" : "免费试听"}
              </h2>
              <p className="mt-2 text-sm opacity-90">
                {typed === "en"
                  ? "Book a free trial lesson with the studio — no credit card required."
                  : "预约一节免费试听，无需信用卡。"}
              </p>
            </div>
            <Link
              href={`/${typed}/trial`}
              data-ga-event="trial_cta_click"
              data-ga-placement="article_footer"
              className="inline-flex min-h-11 items-center justify-center rounded bg-[color:var(--accent)] px-6 py-3 text-center text-base font-bold leading-snug text-[color:var(--accent-foreground)] transition hover:brightness-95"
            >
              {typed === "en" ? "Book a free trial lesson" : "预约免费试听"}
            </Link>
          </div>
        </section>
      </article>
    </>
  );
}
