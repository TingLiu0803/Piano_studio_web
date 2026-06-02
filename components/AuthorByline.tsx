import Link from "next/link";
import { type Locale, siteConfig, contentVersion } from "@/content/site";

type AuthorBylineProps = {
  locale: Locale;
  /** Optional explicit ISO date string ("2026-05-28") for `dateModified`. */
  updatedAt?: string;
  /** Optional ISO date for `datePublished` (articles). */
  publishedAt?: string;
};

/**
 * Author byline rendered on long-form pages (landing pages, journal articles).
 * Provides explicit "By Eric Liu" attribution and a visible last-updated date,
 * which materially helps LLM citation and E-E-A-T signals.
 */
export default function AuthorByline({
  locale,
  updatedAt,
  publishedAt,
}: AuthorBylineProps) {
  const modified = updatedAt ?? contentVersion;
  const formatDate = (iso: string) => {
    try {
      return new Intl.DateTimeFormat(
        locale === "zh" ? "zh-CN" : "en-US",
        { year: "numeric", month: "long", day: "numeric" },
      ).format(new Date(iso));
    } catch {
      return iso;
    }
  };

  const byLabel = locale === "en" ? "By" : "作者";
  const updatedLabel = locale === "en" ? "Updated" : "更新于";
  const publishedLabel = locale === "en" ? "Published" : "发布于";

  return (
    <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[color:var(--muted-foreground)]">
      <span>
        {byLabel}{" "}
        <Link
          href={`/${locale}/about`}
          rel="author"
          className="font-semibold text-[color:var(--link)] underline-offset-4 hover:underline"
        >
          {siteConfig.ownerName}
        </Link>
      </span>
      {publishedAt ? (
        <span aria-label={publishedLabel}>
          <span className="opacity-70">·</span>{" "}
          {publishedLabel}{" "}
          <time dateTime={publishedAt}>{formatDate(publishedAt)}</time>
        </span>
      ) : null}
      <span aria-label={updatedLabel}>
        <span className="opacity-70">·</span>{" "}
        {updatedLabel}{" "}
        <time dateTime={modified}>{formatDate(modified)}</time>
      </span>
    </p>
  );
}
