/**
 * GA4 helpers for measuring UX changes (baseline vs after).
 * Register as custom events in GA4 if you want dedicated reports.
 *
 * Events emitted from the site:
 * - trial_cta_click (placement: hero_primary | sticky_bar | mid_page_band | …)
 * - lesson_hub_card_click (slug)
 * - lesson_hub_nav_click
 * - contact_submit, contact_cta_click
 * - trial_booking_click (external calendar)
 * - experiment_assign (experiment_id, variant)
 * - about_bio_click
 */
export type GaEventParams = Record<string, string | number | undefined>;

type GtagFn = (...args: unknown[]) => void;

function getGtag(): GtagFn | undefined {
  if (typeof window === "undefined") return undefined;
  return (window as unknown as { gtag?: GtagFn }).gtag;
}

/** GA4 custom events — register names in GA4 as custom definitions if you want reports. */
export function sendGaEvent(action: string, params?: GaEventParams) {
  const gtag = getGtag();
  if (!gtag) return;
  gtag("event", action, params ?? {});
}
