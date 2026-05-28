/**
 * UTM capture utilities for waitlist attribution.
 *
 * Ray-approved decisions (vault-mtg#1616):
 * - Key: vault_utms
 * - Storage: localStorage with 30-day TTL
 * - First-touch wins: captured UTMs are not overwritten within the 30-day window
 * - Fields persisted to localStorage + BFF: utm_source, utm_medium, utm_campaign, referrer
 * - Fields captured to PostHog only: utm_content, utm_term
 * - landing_url: origin + pathname only (no query string / hash)
 * - referrer: origin only via new URL(document.referrer).origin (try/catch guarded)
 * - All localStorage access guarded by typeof window !== 'undefined'
 * - No PII stored
 */

const STORAGE_KEY = "vault_utms";
const TTL_MS = 30 * 24 * 60 * 60 * 1000; // 30 days

export interface StoredUTMs {
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  referrer: string | null;
  landing_url: string;
  captured_at: string; // ISO 8601
}

function isExpired(capturedAt: string): boolean {
  const captured = new Date(capturedAt).getTime();
  return Date.now() - captured > TTL_MS;
}

/**
 * Reads UTM params from the current URL and document.referrer, then writes
 * them to localStorage under vault_utms. Idempotent within the 30-day TTL
 * window — will not overwrite an existing, non-expired entry.
 *
 * Safe to call on every page load; no-ops in SSR (window undefined).
 */
export function captureUTMs(): void {
  if (typeof window === "undefined") return;

  const existing = readUTMs();
  if (existing !== null) {
    // First-touch wins: still within TTL window, do not overwrite.
    return;
  }

  const params = new URLSearchParams(window.location.search);

  const utmSource = params.get("utm_source");
  const utmMedium = params.get("utm_medium");
  const utmCampaign = params.get("utm_campaign");

  // No UTM params and no referrer — nothing to capture.
  if (!utmSource && !utmMedium && !utmCampaign) {
    return;
  }

  let referrerOrigin: string | null = null;
  if (document.referrer) {
    try {
      referrerOrigin = new URL(document.referrer).origin;
    } catch {
      // Malformed or empty referrer — skip referrer storage.
    }
  }

  const entry: StoredUTMs = {
    utm_source: utmSource,
    utm_medium: utmMedium,
    utm_campaign: utmCampaign,
    referrer: referrerOrigin,
    landing_url: window.location.origin + window.location.pathname,
    captured_at: new Date().toISOString(),
  };

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entry));
  } catch {
    // localStorage unavailable (private browsing quota, etc.) — silently skip.
  }
}

/**
 * Reads the stored UTMs from localStorage.
 * Returns null if:
 * - window is undefined (SSR)
 * - no entry exists
 * - the entry is expired (>30 days) — also clears the expired entry
 * - the stored value cannot be parsed as JSON
 */
export function readUTMs(): StoredUTMs | null {
  if (typeof window === "undefined") return null;

  let raw: string | null;
  try {
    raw = localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }

  if (raw === null) return null;

  let parsed: StoredUTMs;
  try {
    parsed = JSON.parse(raw) as StoredUTMs;
  } catch {
    // Corrupted value — clear it.
    clearUTMs();
    return null;
  }

  if (!parsed.captured_at || isExpired(parsed.captured_at)) {
    clearUTMs();
    return null;
  }

  return parsed;
}

/**
 * Removes the vault_utms entry from localStorage.
 * Called by CTA.tsx (vault-mtg#1615) after the waitlist form submits.
 * Safe to call in SSR — no-ops if window is undefined.
 */
export function clearUTMs(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // localStorage unavailable — silently skip.
  }
}
