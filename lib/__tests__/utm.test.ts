/**
 * Tests for lib/utm.ts — all 7 cases required by vault-mtg#1616.
 *
 * Running: npm run test
 */

import { beforeEach, describe, expect, it, vi } from "vitest";
import { captureUTMs, clearUTMs, readUTMs } from "../utm";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function setHref(url: string): void {
  // jsdom allows assigning window.location.href in tests.
  Object.defineProperty(window, "location", {
    value: new URL(url),
    writable: true,
    configurable: true,
  });
}

function setReferrer(referrer: string): void {
  Object.defineProperty(document, "referrer", {
    value: referrer,
    writable: true,
    configurable: true,
  });
}

// ---------------------------------------------------------------------------
// Setup
// ---------------------------------------------------------------------------

beforeEach(() => {
  localStorage.clear();
  setReferrer("");
  setHref("https://vaultmtg.app/");
});

// ---------------------------------------------------------------------------
// Test 1 — First-touch capture (URL params)
// ---------------------------------------------------------------------------

describe("captureUTMs — first-touch capture", () => {
  it("writes utm_source, utm_medium, utm_campaign, landing_url, and captured_at to localStorage", () => {
    setHref(
      "https://vaultmtg.app/?utm_source=twitter&utm_medium=social&utm_campaign=beta-launch"
    );

    captureUTMs();

    const raw = localStorage.getItem("vault_utms");
    expect(raw).not.toBeNull();

    const stored = JSON.parse(raw!);
    expect(stored.utm_source).toBe("twitter");
    expect(stored.utm_medium).toBe("social");
    expect(stored.utm_campaign).toBe("beta-launch");
    expect(stored.landing_url).toBe("https://vaultmtg.app/");
    expect(stored.captured_at).toBeTruthy();
    expect(new Date(stored.captured_at).getTime()).not.toBeNaN();
  });
});

// ---------------------------------------------------------------------------
// Test 2 — Referrer fallback (origin-only, try/catch guarded)
// ---------------------------------------------------------------------------

describe("captureUTMs — referrer capture", () => {
  it("stores referrer as origin-only when a valid referrer is present", () => {
    setHref(
      "https://vaultmtg.app/?utm_source=google&utm_medium=cpc&utm_campaign=search"
    );
    setReferrer("https://www.google.com/search?q=mtg+arena+companion");

    captureUTMs();

    const stored = JSON.parse(localStorage.getItem("vault_utms")!);
    expect(stored.referrer).toBe("https://www.google.com");
  });

  it("stores null for referrer when referrer is an empty string (try/catch path)", () => {
    setHref(
      "https://vaultmtg.app/?utm_source=email&utm_medium=newsletter&utm_campaign=may-launch"
    );
    setReferrer("");

    captureUTMs();

    const stored = JSON.parse(localStorage.getItem("vault_utms")!);
    expect(stored.referrer).toBeNull();
  });

  it("stores null for referrer when referrer URL is malformed (try/catch path)", () => {
    setHref(
      "https://vaultmtg.app/?utm_source=reddit&utm_medium=social&utm_campaign=beta"
    );
    setReferrer("not-a-valid-url");

    captureUTMs();

    const stored = JSON.parse(localStorage.getItem("vault_utms")!);
    expect(stored.referrer).toBeNull();
  });
});

// ---------------------------------------------------------------------------
// Test 3 — 30-day TTL expiry (mock Date.now)
// ---------------------------------------------------------------------------

describe("captureUTMs — 30-day TTL expiry", () => {
  it("overwrites expired entry when called after the 30-day window", () => {
    // Capture initial UTMs.
    setHref(
      "https://vaultmtg.app/?utm_source=twitter&utm_medium=social&utm_campaign=early"
    );
    captureUTMs();

    const firstCapture = JSON.parse(localStorage.getItem("vault_utms")!);
    expect(firstCapture.utm_campaign).toBe("early");

    // Advance time by 31 days.
    const originalDateNow = Date.now;
    const thirtyOneDaysMs = 31 * 24 * 60 * 60 * 1000;
    vi.spyOn(Date, "now").mockReturnValue(
      originalDateNow() + thirtyOneDaysMs
    );

    // readUTMs should return null and clear the expired entry.
    expect(readUTMs()).toBeNull();

    // A new capture should now succeed.
    setHref(
      "https://vaultmtg.app/?utm_source=instagram&utm_medium=social&utm_campaign=late"
    );
    captureUTMs();

    const secondCapture = JSON.parse(localStorage.getItem("vault_utms")!);
    expect(secondCapture.utm_campaign).toBe("late");

    vi.restoreAllMocks();
  });
});

// ---------------------------------------------------------------------------
// Test 4 — First-touch wins (do not overwrite within window)
// ---------------------------------------------------------------------------

describe("captureUTMs — first-touch wins", () => {
  it("does not overwrite an existing, non-expired entry", () => {
    setHref(
      "https://vaultmtg.app/?utm_source=twitter&utm_medium=social&utm_campaign=first"
    );
    captureUTMs();

    const firstCapture = JSON.parse(localStorage.getItem("vault_utms")!);
    expect(firstCapture.utm_campaign).toBe("first");

    // Simulate a second visit with different params.
    setHref(
      "https://vaultmtg.app/?utm_source=google&utm_medium=cpc&utm_campaign=second"
    );
    captureUTMs();

    const afterSecondCapture = JSON.parse(localStorage.getItem("vault_utms")!);
    expect(afterSecondCapture.utm_campaign).toBe("first");
  });
});

// ---------------------------------------------------------------------------
// Test 5 — SSR safety (window undefined)
// ---------------------------------------------------------------------------

describe("captureUTMs / readUTMs — SSR safety", () => {
  it("no-ops without throwing when window is undefined", () => {
    // Temporarily hide window to simulate SSR.
    const originalWindow = global.window;
    // @ts-expect-error deliberately removing window for SSR simulation
    delete global.window;

    expect(() => captureUTMs()).not.toThrow();
    expect(readUTMs()).toBeNull();
    expect(() => clearUTMs()).not.toThrow();

    global.window = originalWindow;
  });
});

// ---------------------------------------------------------------------------
// Test 6 — readUTMs returns null when expired
// ---------------------------------------------------------------------------

describe("readUTMs — returns null when expired", () => {
  it("clears the entry and returns null after 30-day TTL", () => {
    setHref(
      "https://vaultmtg.app/?utm_source=email&utm_medium=newsletter&utm_campaign=launch"
    );
    captureUTMs();

    const originalDateNow = Date.now;
    const thirtyOneDaysMs = 31 * 24 * 60 * 60 * 1000;
    vi.spyOn(Date, "now").mockReturnValue(
      originalDateNow() + thirtyOneDaysMs
    );

    const result = readUTMs();
    expect(result).toBeNull();
    // Confirm the entry was cleared.
    expect(localStorage.getItem("vault_utms")).toBeNull();

    vi.restoreAllMocks();
  });
});

// ---------------------------------------------------------------------------
// Test 7 — readUTMs returns null on parse error
// ---------------------------------------------------------------------------

describe("readUTMs — returns null on parse error", () => {
  it("clears corrupted localStorage value and returns null", () => {
    localStorage.setItem("vault_utms", "{ this is not valid json }");

    const result = readUTMs();
    expect(result).toBeNull();
    // Corrupted entry should be cleared.
    expect(localStorage.getItem("vault_utms")).toBeNull();
  });
});
