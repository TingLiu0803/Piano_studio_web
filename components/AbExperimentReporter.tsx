"use client";

import { useEffect } from "react";
import { sendGaEvent } from "@/lib/analytics-events";

const STORAGE_KEY = "ga_reported_ab_sticky_v1";

type AbExperimentReporterProps = {
  variant: "treatment" | "control";
};

/** One GA4 event per browser session so you can segment by assigned variant. */
export default function AbExperimentReporter({ variant }: AbExperimentReporterProps) {
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      if (sessionStorage.getItem(STORAGE_KEY)) return;
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {
      return;
    }
    sendGaEvent("experiment_assign", {
      experiment_id: "sticky_trial_cta_v1",
      variant,
    });
  }, [variant]);

  return null;
}
