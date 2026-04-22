"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

type StickyTrialCtaProps = {
  locale: string;
  ctaLabel: string;
  /** Treatment shows the bar on mobile; control hides it (A/B). */
  experimentTreatment: boolean;
};

export default function StickyTrialCta({
  locale,
  ctaLabel,
  experimentTreatment,
}: StickyTrialCtaProps) {
  const pathname = usePathname();
  const [dismissed, setDismissed] = useState(false);

  if (!experimentTreatment || dismissed) return null;
  if (!pathname) return null;
  if (pathname.includes("/trial") || pathname.includes("/contact")) return null;

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-50 border-t border-[color:var(--border)] bg-[color:var(--surface)]/95 px-4 py-3 shadow-[0_-8px_30px_rgba(0,0,0,0.12)] backdrop-blur-md md:hidden"
      style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
    >
      <div className="mx-auto flex max-w-6xl items-stretch gap-2 sm:gap-3">
        <Link
          href={`/${locale}/trial`}
          data-ga-event="trial_cta_click"
          data-ga-placement="sticky_bar"
          className="flex min-h-12 min-w-0 flex-1 items-center justify-center rounded-full bg-[color:var(--primary)] px-3 py-2.5 text-center text-sm font-semibold leading-tight text-[color:var(--primary-foreground)] transition hover:bg-[color:var(--primary-hover)]"
        >
          {ctaLabel}
        </Link>
        <button
          type="button"
          onClick={() => setDismissed(true)}
          className="flex h-11 w-11 shrink-0 items-center justify-center self-center rounded-full border border-[color:var(--border)] text-lg text-[color:var(--muted-foreground)] transition hover:border-[color:var(--foreground)] hover:text-[color:var(--foreground)]"
          aria-label="Dismiss booking bar"
        >
          ×
        </button>
      </div>
    </div>
  );
}
