/**
 * GA4 helpers for measuring UX changes (baseline vs after).
 * Register as custom events in GA4 if you want dedicated reports.
 *
 * Events emitted from the site:
 * - primary_cta_click / trial_cta_click (placement / cta_location)
 * - contact_form_start | contact_form_submit_success | contact_form_submit_error
 * - contact_submit, generate_lead (legacy aliases on success)
 * - trial_booking_click (external calendar)
 * - email_click | phone_click | directions_click
 * - lesson_hub_card_click (slug)
 * - experiment_assign (experiment_id, variant)
 * - about_bio_click
 * - ai_referrer_visit (referrer, source)
 *
 * Prefer params: page_path, page_type, cta_location, language.
 * Do not send PII (name, email, phone, message body).
 */

/**
 * Hostname suffix -> canonical source label for the `ai_referrer_visit`
 * event. Keep this list updated as new AI search engines launch.
 */
export const AI_REFERRER_SOURCES: Record<string, string> = {
  "chat.openai.com": "chatgpt",
  "chatgpt.com": "chatgpt",
  "perplexity.ai": "perplexity",
  "www.perplexity.ai": "perplexity",
  "copilot.microsoft.com": "copilot",
  "bing.com/chat": "copilot",
  "gemini.google.com": "gemini",
  "bard.google.com": "gemini",
  "you.com": "you",
  "claude.ai": "claude",
  "phind.com": "phind",
  "kagi.com": "kagi",
};

export function detectAiReferrer(referrer: string): string | null {
  if (!referrer) return null;
  try {
    const url = new URL(referrer);
    const host = url.hostname.toLowerCase();
    for (const [needle, label] of Object.entries(AI_REFERRER_SOURCES)) {
      if (host === needle || host.endsWith(`.${needle.split("/")[0]}`)) {
        return label;
      }
      if (needle.includes("/") && referrer.toLowerCase().includes(needle)) {
        return label;
      }
    }
    return null;
  } catch {
    return null;
  }
}

export type GaEventParams = Record<string, string | number | undefined>;

type GtagFn = (...args: unknown[]) => void;
type QueuedGaEvent = { action: string; params?: GaEventParams };
type AnalyticsWindow = Window & {
  gtag?: GtagFn;
  __pendingGaEvents?: QueuedGaEvent[];
};

function getAnalyticsWindow(): AnalyticsWindow | undefined {
  if (typeof window === "undefined") return undefined;
  return window as AnalyticsWindow;
}

/** GA4 custom events — register names in GA4 as custom definitions if you want reports. */
export function sendGaEvent(action: string, params?: GaEventParams) {
  const analyticsWindow = getAnalyticsWindow();
  if (!analyticsWindow) return;

  if (analyticsWindow.gtag) {
    analyticsWindow.gtag("event", action, params ?? {});
    return;
  }

  const queue = analyticsWindow.__pendingGaEvents ?? [];
  queue.push({ action, params });
  analyticsWindow.__pendingGaEvents = queue;
}
