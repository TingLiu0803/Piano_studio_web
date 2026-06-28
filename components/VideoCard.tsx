"use client";

import { useState } from "react";
import Icon from "@/components/ui/Icon";

type VideoCardProps = {
  title: string;
  description: string;
  embedUrl: string;
  watchUrl: string;
  loadLabel: string;
  openLabel: string;
  /** Short "Composer · Piece" caption shown in compact mode. */
  caption?: string;
  /** Compact grid card: bare player + single caption line (no description/link). */
  compact?: boolean;
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
  caption,
  compact = false,
}: VideoCardProps) {
  const [loaded, setLoaded] = useState(false);

  // A full VideoObject (uploadDate, thumbnailUrl, duration, publisher, …) is
  // emitted once via JSON-LD in `lib/seo.ts` → `buildVideoNodes`, so no
  // microdata is duplicated here.
  const player = (
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
          className="flex h-full w-full items-center justify-center bg-[color:var(--surface-muted)] text-sm font-bold text-[color:var(--foreground)] transition hover:opacity-90"
          aria-label={`${loadLabel}: ${title}`}
        >
          <span className="inline-flex items-center gap-2 rounded border border-[color:var(--accent)] bg-[color:var(--surface)] px-4 py-2 text-[color:var(--foreground)] shadow-sm">
            <span aria-hidden className="inline-block h-0 w-0 border-y-[6px] border-l-[10px] border-y-transparent border-l-[color:var(--accent)]" />
            {loadLabel}
          </span>
        </button>
      )}
    </div>
  );

  if (compact) {
    // Player loads directly (no click-to-load step); `loading="lazy"` keeps
    // off-screen embeds from costing anything until they're scrolled near.
    return (
      <div>
        <div className="aspect-video w-full overflow-hidden rounded-[var(--radius-md)] border border-[color:var(--border)] bg-black">
          <iframe
            src={embedUrl}
            title={title}
            className="h-full w-full"
            loading="lazy"
            allowFullScreen
          />
        </div>
        <div className="mt-3 flex items-center gap-2">
          <Icon name="music_note" size={18} style={{ color: "var(--text-muted)" }} />
          <span className="text-sm font-bold text-[color:var(--foreground)]">
            {caption ?? title}
          </span>
        </div>
      </div>
    );
  }

  return (
    <article className="overflow-hidden rounded-md border border-[color:var(--border)] bg-[color:var(--surface)] shadow-sm">
      {player}
      <div className="px-4 py-3 text-sm">
        <p className="font-medium text-[color:var(--foreground)]">{title}</p>
        <p className="mt-1 text-xs leading-relaxed text-[color:var(--muted-foreground)]">
          {description}
        </p>
        <a
          href={watchUrl}
          target="_blank"
          rel="noreferrer"
          className="mt-2 inline-flex text-xs font-bold text-[color:var(--link)] underline-offset-4 hover:underline"
        >
          {openLabel}
        </a>
      </div>
    </article>
  );
}
