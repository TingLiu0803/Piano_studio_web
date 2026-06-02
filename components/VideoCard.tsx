"use client";

import { useState } from "react";

type VideoCardProps = {
  title: string;
  description: string;
  embedUrl: string;
  watchUrl: string;
  loadLabel: string;
  openLabel: string;
};

/**
 * Lazy-mount video card. Renders as a low-cost description block until the
 * user clicks Play; only then the Bilibili iframe is inserted. Keeps LCP/INP
 * low and surfaces real text content (title + description) for crawlers and
 * LLMs that cannot resolve Bilibili.
 */
export default function VideoCard({
  title,
  description,
  embedUrl,
  watchUrl,
  loadLabel,
  openLabel,
}: VideoCardProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <article
      itemScope
      itemType="https://schema.org/VideoObject"
      className="overflow-hidden rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] shadow-sm"
    >
      <meta itemProp="name" content={title} />
      <meta itemProp="description" content={description} />
      <meta itemProp="embedUrl" content={embedUrl} />
      <meta itemProp="contentUrl" content={watchUrl} />
      <div className="aspect-video w-full bg-[color:var(--surface-muted)]">
        {loaded ? (
          <iframe
            src={embedUrl}
            title={title}
            className="h-full w-full"
            loading="lazy"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            onClick={() => setLoaded(true)}
            data-ga-event="bilibili_video_play"
            data-ga-title={title}
            className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[color:var(--surface-muted)] to-[color:var(--tag)] text-sm font-semibold text-[color:var(--accent-foreground)] transition hover:opacity-90"
            aria-label={`${loadLabel}: ${title}`}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-[color:var(--accent)] bg-[color:var(--surface)] px-4 py-2 text-[color:var(--foreground)] shadow-sm">
              <span aria-hidden className="inline-block h-0 w-0 border-y-[6px] border-l-[10px] border-y-transparent border-l-[color:var(--accent)]" />
              {loadLabel}
            </span>
          </button>
        )}
      </div>
      <div className="px-4 py-3 text-sm">
        <p className="font-medium text-[color:var(--foreground)]">{title}</p>
        <p className="mt-1 text-xs leading-relaxed text-[color:var(--muted-foreground)]">
          {description}
        </p>
        <a
          href={watchUrl}
          target="_blank"
          rel="noreferrer"
          className="mt-2 inline-flex text-xs font-semibold text-[color:var(--link)] underline-offset-4 hover:underline"
        >
          {openLabel}
        </a>
      </div>
    </article>
  );
}
