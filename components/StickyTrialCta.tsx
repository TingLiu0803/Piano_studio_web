"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";

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
      <div className="mx-auto flex max-w-[var(--content-max)] items-stretch gap-2 sm:gap-3">
        <div className="min-w-0 flex-1">
          <Button
            href={`/${locale}/trial`}
            variant="primary"
            fullWidth
            icon="calendar_month"
            data-ga-event="trial_cta_click"
            data-ga-placement="sticky_bar"
          >
            {ctaLabel}
          </Button>
        </div>
        <button
          type="button"
          onClick={() => setDismissed(true)}
          className="flex h-11 w-11 shrink-0 items-center justify-center self-center rounded-[var(--radius-sm)] border border-[color:var(--border)] text-[color:var(--muted-foreground)] transition-colors hover:border-[color:var(--foreground)] hover:text-[color:var(--foreground)]"
          aria-label="Dismiss booking bar"
        >
          <Icon name="close" size={20} />
        </button>
      </div>
    </div>
  );
}
