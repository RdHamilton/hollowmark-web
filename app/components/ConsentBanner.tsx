"use client";

/**
 * ConsentBanner — GDPR/CCPA cookie-consent banner with Google Consent Mode v2.
 *
 * Architecture (Ray-approved plan, #877):
 * - Renders on ALL visitors (ADR-057: all-visitors at pre-beta, no geo-detection).
 * - State machine: null (SSR) → undecided / granted / declined (client).
 * - useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot) provides
 *   SSR/hydration safety without triggering the react-hooks/set-state-in-effect
 *   lint rule. getServerSnapshot always returns null so SSR HTML has no banner;
 *   getSnapshot reads the real cookie; subscribe re-reads on storage/cookie events.
 * - GA4 <Script> blocks are rendered ONLY when consentState === "granted".
 * - The Consent Mode v2 default-block script uses strategy="beforeInteractive"
 *   (placed in layout.tsx via ConsentModeDefaultBlock) so it fires before any
 *   GA4 loader and denies analytics_storage/ad_storage for all visitors before
 *   explicit consent.
 * - Cookie: vaultmtg_consent (first-party, 365 days, SameSite=Lax; see lib/consent.ts).
 */

import { useSyncExternalStore } from "react";
import Script from "next/script";
import {
  readConsentCookie,
  writeConsentCookie,
  type ConsentState,
} from "@/lib/consent";

const GA4_MEASUREMENT_ID = "G-Y4YSVZF8ZD";

// useSyncExternalStore subscribe function — listens for the custom
// "vaultmtg-consent-change" event dispatched by the button handlers.
// This lets useSyncExternalStore know the snapshot has changed and triggers
// a re-render to hide the banner / show GA4 scripts.
function subscribeConsent(callback: () => void): () => void {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("vaultmtg-consent-change", callback);
  return () => window.removeEventListener("vaultmtg-consent-change", callback);
}

function getConsentSnapshot(): ConsentState {
  return readConsentCookie();
}

function getConsentServerSnapshot(): ConsentState {
  // Always return null on the server — the banner must not be in the server HTML
  // to prevent hydration mismatch.
  return null;
}

/**
 * ConsentModeDefaultBlock — exported for placement in app/layout.tsx.
 *
 * strategy="beforeInteractive" injects this snippet into the server-rendered
 * HTML before any Next.js module loads. It sets Consent Mode v2 defaults to
 * denied for all visitors, so GA4 does not collect data until explicit consent.
 */
export function ConsentModeDefaultBlock() {
  return (
    <Script
      id="ga4-consent-mode-default"
      strategy="beforeInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('consent', 'default', {
            analytics_storage: 'denied',
            ad_storage: 'denied',
            ad_user_data: 'denied',
            ad_personalization: 'denied',
            wait_for_update: 500
          });
        `,
      }}
    />
  );
}

// GA4 loader + init scripts — rendered only when consent is "granted".
export function GA4Scripts() {
  return (
    <>
      <Script
        id="ga4-gtag-loader"
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA4_MEASUREMENT_ID}`}
      />
      <Script
        id="ga4-gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA4_MEASUREMENT_ID}');
            gtag('consent', 'update', {
              analytics_storage: 'granted',
              ad_storage: 'denied',
              ad_user_data: 'denied',
              ad_personalization: 'denied'
            });
          `,
        }}
      />
    </>
  );
}

export default function ConsentBanner() {
  // useSyncExternalStore: null on server (no banner in SSR HTML),
  // real cookie value on client — no hydration mismatch, no setState-in-effect.
  const consentState = useSyncExternalStore(
    subscribeConsent,
    getConsentSnapshot,
    getConsentServerSnapshot,
  );

  function handleGrant() {
    writeConsentCookie("granted");
    // Force a re-render by triggering a React state transition.
    // useSyncExternalStore will re-read the cookie on the next render.
    window.dispatchEvent(new Event("vaultmtg-consent-change"));
  }

  function handleDecline() {
    writeConsentCookie("declined");
    window.dispatchEvent(new Event("vaultmtg-consent-change"));
  }

  return (
    <>
      {/* GA4 scripts — rendered only after explicit consent */}
      {consentState === "granted" && <GA4Scripts />}

      {/* Banner — rendered only while consent is undecided */}
      {consentState === "undecided" && (
        <div
          role="dialog"
          aria-modal="false"
          aria-label="Cookie consent"
          style={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 9999,
            background:
              "var(--color-surface-footer, #0D1117)",
            borderTop:
              "1px solid var(--color-surface-border-subtle, rgba(241,245,249,0.1))",
            padding: "20px 24px",
            display: "flex",
            flexWrap: "wrap",
            gap: 16,
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <p
            style={{
              margin: 0,
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontStyle: "italic",
              fontSize: 15,
              color: "rgba(241,245,249,0.8)",
              lineHeight: 1.5,
              maxWidth: 680,
            }}
          >
            We use cookies to understand how visitors use VaultMTG and to improve
            your experience. Necessary cookies are always active. Analytics and
            marketing cookies are optional.{" "}
            <a
              href="/privacy"
              style={{
                color: "var(--color-vault-sapphire, #4A90D9)",
                textDecoration: "underline",
              }}
            >
              Privacy Policy
            </a>
          </p>

          <div
            style={{
              display: "flex",
              gap: 12,
              flexShrink: 0,
              flexWrap: "wrap",
            }}
          >
            <button
              onClick={handleDecline}
              aria-label="Decline optional cookies"
              style={{
                padding: "8px 20px",
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 11,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                background: "transparent",
                border: "1px solid rgba(241,245,249,0.25)",
                color: "rgba(241,245,249,0.7)",
                borderRadius: 3,
                cursor: "pointer",
              }}
            >
              Decline
            </button>
            <button
              onClick={handleGrant}
              aria-label="Accept all cookies"
              style={{
                padding: "8px 20px",
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 11,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                background: "var(--color-vault-sapphire, #4A90D9)",
                border:
                  "1px solid var(--color-vault-sapphire, #4A90D9)",
                color: "#fff",
                borderRadius: 3,
                cursor: "pointer",
              }}
            >
              Accept
            </button>
          </div>
        </div>
      )}
    </>
  );
}
