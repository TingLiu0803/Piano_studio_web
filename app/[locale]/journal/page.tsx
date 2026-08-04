import { notFound } from "next/navigation";
import Link from "next/link";
import { type Locale } from "@/content/site";
import { getAllArticles } from "@/content/articles";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";
import AuthorByline from "@/components/AuthorByline";
import { buildMetadata } from "@/lib/seo";

// Kill switch for the journal section. When set to `false`, the list page and
// every article URL 404, and the section must also be removed from
// `app/sitemap.ts`, `lib/llms.ts` canonicalPages(), and the nav link in
// `components/SiteHeader.tsx` (all currently wired for enabled = true).
const JOURNAL_ENABLED = true;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const typed = locale as Locale;
  const title =
    typed === "en"
      ? "Piano studio journal — adult learning, practice strategy, choosing a teacher"
      : "学琴笔记 — 成人学习、练习策略、如何选老师";
  const description =
    typed === "en"
      ? "Long-form guides on adult piano learning, choosing a teacher in the South Bay, online vs in-person lessons, practice strategy, and instrument choice. Written by Cupertino piano teacher Eric Liu."
      : "由圣何塞钢琴老师 Eric Liu 撰写：成人学钢琴时间线、南湾如何选老师、线上 vs 线下、练习策略与乐器选择等长文。";
  return buildMetadata(typed, `/${typed}/journal`, undefined, {
    title,
    description,
  });
}

export default async function JournalListPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  if (!JOURNAL_ENABLED) notFound();
  const { locale } = await params;
  const typed = locale as Locale;
  const articles = getAllArticles(typed);
  const sectionTitle =
    typed === "en" ? "Studio journal" : "学琴笔记";
  const intro =
    typed === "en"
      ? "Long-form guides written from the studio. Each article is answer-first and dated so you can cite or revisit it."
      : "来自工作室的长文。每篇都先给答案、明确标注更新日期，方便引用与回顾。";

  const formatter = new Intl.DateTimeFormat(
    typed === "zh" ? "zh-CN" : "en-US",
    { year: "numeric", month: "short", day: "numeric" },
  );

  return (
    <>
      <BreadcrumbJsonLd locale={typed} path={`/${typed}/journal`} />
      <div className="flex flex-col gap-10">
        <header className="rounded-lg border border-[color:var(--border)] bg-[color:var(--surface)] p-8 shadow-sm">
          <h1 className="text-3xl font-black tracking-[-0.01em] text-[color:var(--foreground)] md:text-4xl">
            {sectionTitle}
          </h1>
          <div className="mt-2">
            <AuthorByline locale={typed} />
          </div>
          <p className="mt-4 text-sm leading-relaxed text-[color:var(--muted-foreground)]">
            {intro}
          </p>
        </header>

        <ul className="grid gap-6 md:grid-cols-2">
          {articles.map((article) => (
            <li key={article.slug}>
              <Link
                href={`/${typed}/journal/${article.slug}`}
                data-ga-event="journal_card_click"
                data-ga-slug={article.slug}
                className="flex h-full flex-col gap-3 rounded-lg border border-[color:var(--border)] bg-[color:var(--surface)] p-6 shadow-sm transition hover:border-[color:var(--foreground)] hover:shadow-md"
              >
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[color:var(--tag-foreground)]">
                  {article.category}
                </span>
                <h2 className="text-lg font-bold text-[color:var(--foreground)]">
                  {article.title}
                </h2>
                <p className="text-sm leading-relaxed text-[color:var(--muted-foreground)]">
                  {article.quickAnswer}
                </p>
                <p className="text-xs text-[color:var(--muted-foreground)]">
                  <time dateTime={article.dateModified}>
                    {formatter.format(new Date(article.dateModified))}
                  </time>{" "}
                  ·{" "}
                  {typed === "en"
                    ? `${article.readingTimeMinutes} min read`
                    : `阅读约 ${article.readingTimeMinutes} 分钟`}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
