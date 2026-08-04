"use client";

import { useEffect } from "react";
import { sendGaEvent } from "@/lib/analytics-events";

function readData(el: Element, name: string) {
  return el.getAttribute(name) ?? undefined;
}

/**
 * Delegates clicks on elements with data-ga-event to sendGaEvent.
 * Also auto-tracks mailto / tel / Google Maps-ish outbound links when they
 * lack an explicit data-ga-event (covers footer NAP without duplicating attrs).
 */
export default function GaClickCapture() {
  useEffect(() => {
    const handler = (event: MouseEvent) => {
      const el = (event.target as HTMLElement | null)?.closest("a,button,[data-ga-event]");
      if (!el) return;

      const explicit = readData(el, "data-ga-event");
      if (explicit) {
        const placement = readData(el, "data-ga-placement");
        const slug = readData(el, "data-ga-slug");
        const label = readData(el, "data-ga-label");
        const pageType = readData(el, "data-ga-page-type");
        const params = {
          page_path: window.location.pathname,
          ...(placement ? { placement, cta_location: placement } : {}),
          ...(slug ? { slug } : {}),
          ...(label ? { label } : {}),
          ...(pageType ? { page_type: pageType } : {}),
        };
        sendGaEvent(explicit, params);
        // Funnel alias so measurement-plan primary_cta_click stays populated.
        if (explicit === "trial_cta_click") {
          sendGaEvent("primary_cta_click", params);
        }
        return;
      }

      if (!(el instanceof HTMLAnchorElement) || !el.href) return;
      const href = el.href;
      const path = window.location.pathname;
      if (href.startsWith("mailto:")) {
        sendGaEvent("email_click", { page_path: path });
        return;
      }
      if (href.startsWith("tel:")) {
        sendGaEvent("phone_click", { page_path: path });
        return;
      }
      if (
        /google\.(com|com\/maps)|maps\.app\.goo\.gl|share\.google\//i.test(href)
      ) {
        sendGaEvent("directions_click", {
          page_path: path,
          page_type: "outbound_maps",
        });
      }
    };
    document.addEventListener("click", handler, true);
    return () => document.removeEventListener("click", handler, true);
  }, []);

  return null;
}
