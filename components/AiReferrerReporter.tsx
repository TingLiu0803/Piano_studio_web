"use client";

import { useEffect } from "react";
import { detectAiReferrer, sendGaEvent } from "@/lib/analytics-events";

const SESSION_KEY = "ai_referrer_logged";

/**
 * Fires a GA4 `ai_referrer_visit` event once per browser session when the
 * inbound referrer matches a known AI search engine. Use the GA4 "Reports >
 * Engagement > Events" view (or set a custom dimension) to track AI-search
 * driven traffic and trial conversions originating from AI answers.
 */
export default function AiReferrerReporter() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      if (window.sessionStorage.getItem(SESSION_KEY)) return;
    } catch {
      // sessionStorage may be unavailable (private mode); fall through and
      // still emit the event — duplicates per session are acceptable.
    }
    const referrer = document.referrer;
    const source = detectAiReferrer(referrer);
    if (!source) return;
    sendGaEvent("ai_referrer_visit", {
      ai_source: source,
      referrer,
      landing_path: window.location.pathname,
    });
    try {
      window.sessionStorage.setItem(SESSION_KEY, "1");
    } catch {
      // ignore
    }
  }, []);

  return null;
}
