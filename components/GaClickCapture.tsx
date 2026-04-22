"use client";

import { useEffect } from "react";
import { sendGaEvent } from "@/lib/analytics-events";

function readData(el: Element, name: string) {
  return el.getAttribute(name) ?? undefined;
}

/**
 * Delegates clicks on elements with data-ga-event to sendGaEvent.
 * Use on <body> scope via capture on document from locale layout wrapper.
 */
export default function GaClickCapture() {
  useEffect(() => {
    const handler = (event: MouseEvent) => {
      const target = (event.target as HTMLElement | null)?.closest(
        "[data-ga-event]",
      );
      if (!target) return;
      const name = readData(target, "data-ga-event");
      if (!name) return;
      const placement = readData(target, "data-ga-placement");
      const slug = readData(target, "data-ga-slug");
      const label = readData(target, "data-ga-label");
      sendGaEvent(name, {
        ...(placement ? { placement } : {}),
        ...(slug ? { slug } : {}),
        ...(label ? { label } : {}),
      });
    };
    document.addEventListener("click", handler, true);
    return () => document.removeEventListener("click", handler, true);
  }, []);

  return null;
}
