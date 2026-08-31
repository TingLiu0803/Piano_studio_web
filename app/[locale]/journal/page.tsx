import { notFound } from "next/navigation";
import { type Locale } from "@/content/site";
import { getAllArticles } from "@/content/articles";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";
import AuthorByline from "@/components/AuthorByline";
import Band from "@/components/ui/Band";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
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
      <Band tone="white" py="lg">
        <Badge tone="neutral" icon="music_note">
          {typed === "en" ? "Journal" : "学琴笔记"}
        </Badge>
        <h1 className="mt-4 text-[2.25rem] font-black leading-[1.06] tracking-[-0.01em] text-[color:var(--mnb-ink)] md:text-[2.75rem]">
          {sectionTitle}
        </h1>
        <div className="mt-3">
          <AuthorByline locale={typed} />
        </div>
        <p className="mt-4 max-w-[70ch] text-[length:var(--text-body-lg)] leading-relaxed text-[color:var(--text-muted)]">
          {intro}
        </p>

        <ul className="mt-10 grid min-w-0 gap-5 md:grid-cols-2">
          {articles.map((article) => (
            <li key={article.slug} className="min-w-0">
              <Card
                href={`/${typed}/journal/${article.slug}`}
                interactive
                padding="lg"
                className="h-full min-w-0"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.75rem",
                  width: "100%",
                  height: "100%",
                  minWidth: 0,
                }}
                data-ga-event="journal_card_click"
                data-ga-slug={article.slug}
              >
                <span className="text-[length:var(--text-label)] font-bold uppercase tracking-[var(--tracking-label)] text-[color:var(--tag-foreground)]">
                  {article.category}
                </span>
                <h2 className="min-w-0 break-words text-[length:var(--text-h3)] font-bold leading-[var(--leading-heading)] text-[color:var(--foreground)]">
                  {article.title}
                </h2>
                <p className="min-w-0 break-words text-[15px] leading-relaxed text-[color:var(--text-muted)]">
                  {article.quickAnswer}
                </p>
                <p className="mt-auto text-xs text-[color:var(--text-muted)]">
                  <time dateTime={article.dateModified}>
                    {formatter.format(new Date(article.dateModified))}
                  </time>{" "}
                  ·{" "}
                  {typed === "en"
                    ? `${article.readingTimeMinutes} min read`
                    : `阅读约 ${article.readingTimeMinutes} 分钟`}
                </p>
              </Card>
            </li>
          ))}
        </ul>
      </Band>
    </>
  );
}
