/**
 * Cookie-consent read/write utilities for VaultMTG marketing site.
 *
 * ADR-057 rationale: first-party cookie (not localStorage) is required for
 * SSR hydration safety and correct cross-subdomain visibility on a Next.js
 * 16 site. localStorage is unavailable at SSR time and cannot be read by
 * server components; a first-party cookie travels in the HTTP request and
 * survives SSR/hydration without a state mismatch.
 *
 * Cookie name: vaultmtg_consent (stays legacy per INVARIANTS I-57)
 * No _v1 suffix at pre-beta — cookie expiry is the re-prompt mechanism.
 *
 * Consent categories (static, per Ray's A.4 ruling):
 *   - necessary   : always required, no opt-out
 *   - analytics   : GA4
 *   - marketing   : ad-network pixels
 *
 * State machine:
 *   null        → initial server render, cookie not yet read (avoid SSR flicker)
 *   "undecided" → client has loaded; no consent cookie found
 *   "granted"   → user accepted analytics + marketing
 *   "declined"  → user declined (only necessary cookies active)
 */

export type ConsentState = null | "undecided" | "granted" | "declined";

const COOKIE_NAME = "vaultmtg_consent";
// 365 days in seconds
const COOKIE_MAX_AGE = 365 * 24 * 60 * 60;

/**
 * Reads the consent cookie. Returns null in SSR (window undefined).
 * Returns "undecided" if cookie is absent.
 * Returns "granted" or "declined" matching the stored value.
 */
export function readConsentCookie(): ConsentState {
  if (typeof document === "undefined") return null;

  const match = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${COOKIE_NAME}=`));

  if (!match) return "undecided";

  const value = match.split("=")[1];
  if (value === "granted" || value === "declined") return value;

  // Unrecognised value — treat as undecided.
  return "undecided";
}

/**
 * Writes the consent cookie with a 1-year expiry, SameSite=Lax, Secure.
 * Safe to call only client-side.
 */
export function writeConsentCookie(value: "granted" | "declined"): void {
  if (typeof document === "undefined") return;

  const secure = location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${COOKIE_NAME}=${value}; Max-Age=${COOKIE_MAX_AGE}; Path=/; SameSite=Lax${secure}`;
}
