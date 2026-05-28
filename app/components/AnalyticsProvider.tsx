"use client";

/**
 * AnalyticsProvider — client component that:
 * 1. Captures UTM params to localStorage on first render (captureUTMs is idempotent).
 * 2. Initialises PostHog inside useEffect — never at module import time, which
 *    would break static export builds.
 *
 * Ray-approved constraints (vault-mtg#1616):
 * - posthog.init() is called inside useEffect, NOT at module level.
 * - NEXT_PUBLIC_POSTHOG_KEY is the only coupling point — never hardcode the key.
 * - No PII stored in localStorage; UTM fields and referrer origin only.
 */

import { useEffect } from "react";
import { captureUTMs, readUTMs } from "@/lib/utm";

export default function AnalyticsProvider() {
  useEffect(() => {
    // Step 1: Capture UTMs. Idempotent — no-ops if already captured within 30 days.
    captureUTMs();

    // Step 2: Initialize PostHog, then fire waitlist_page_view with UTM context.
    const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
    if (!key) return;

    import("posthog-js").then(({ default: posthog }) => {
      posthog.init(key, {
        api_host: "https://us.i.posthog.com",
        person_profiles: "identified_only",
        capture_pageview: false, // We fire our own event below.
      });

      const utms = readUTMs();
      posthog.capture("waitlist_page_view", {
        utm_source: utms?.utm_source ?? null,
        utm_medium: utms?.utm_medium ?? null,
        utm_campaign: utms?.utm_campaign ?? null,
        utm_content: utms?.utm_content ?? null,
        utm_term: utms?.utm_term ?? null,
        referrer: utms?.referrer ?? null,
        landing_url: utms?.landing_url ?? null,
      });
    });
  }, []);

  return null;
}
