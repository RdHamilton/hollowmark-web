/**
 * Tests for lib/waitlistApi.ts — vault-mtg-tickets#835
 *
 * Ray's test note: the module-level throw fires at bundle-eval time. We use
 * vi.resetModules() + a fresh dynamic import() to re-evaluate the module in a
 * clean context for each test that exercises the throw path — this avoids
 * module-cache hits that would mask the guard.
 *
 * The `/* @vite-ignore *​/` comment suppresses Vite's static import-analysis
 * warning on the dynamic import string used for module-isolation tests.
 *
 * Running: npm run test
 */

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Re-evaluates waitlistApi in a clean module context after patching env. */
async function importWaitlistApi(env: Record<string, string | undefined>) {
  vi.resetModules();

  const originals: Record<string, string | undefined> = {};
  for (const [k, v] of Object.entries(env)) {
    originals[k] = process.env[k];
    if (v === undefined) {
      delete process.env[k];
    } else {
      process.env[k] = v;
    }
  }

  let mod: typeof import("../waitlistApi");
  try {
    // @vite-ignore — dynamic import used intentionally for module-isolation.
    mod = await import(/* @vite-ignore */ "../waitlistApi");
  } finally {
    // Restore env regardless of whether the import throws.
    for (const [k, v] of Object.entries(originals)) {
      if (v === undefined) {
        delete process.env[k];
      } else {
        process.env[k] = v;
      }
    }
  }
  return mod;
}

// ---------------------------------------------------------------------------
// Setup / teardown
// ---------------------------------------------------------------------------

afterEach(() => {
  vi.resetModules();
  vi.restoreAllMocks();
});

// ---------------------------------------------------------------------------
// Test 1 — Correct URL used when NEXT_PUBLIC_BFF_BASE_URL is set
// ---------------------------------------------------------------------------

describe("submitWaitlist — correct BFF URL when env var is set", () => {
  it("calls the BFF URL from NEXT_PUBLIC_BFF_BASE_URL, not a hardcoded fallback", async () => {
    const { submitWaitlist } = await importWaitlistApi({
      NEXT_PUBLIC_BFF_BASE_URL: "https://api.vaultmtg.app",
    });

    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ position: 42 }),
    } as unknown as Response);
    vi.stubGlobal("fetch", mockFetch);

    const result = await submitWaitlist("user@example.com");

    expect(result).toEqual({ ok: true, position: 42 });
    expect(mockFetch).toHaveBeenCalledOnce();
    const [url] = mockFetch.mock.calls[0] as [string, ...unknown[]];
    expect(url).toBe("https://api.vaultmtg.app/api/v1/waitlist");
    // Confirm no hardcoded fallback was used.
    expect(url).not.toContain("localhost");
  });

  it("sets Content-Type: application/json and sends the email in the body", async () => {
    const { submitWaitlist } = await importWaitlistApi({
      NEXT_PUBLIC_BFF_BASE_URL: "https://api.vaultmtg.app",
    });

    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ position: 1 }),
    } as unknown as Response);
    vi.stubGlobal("fetch", mockFetch);

    await submitWaitlist("test@example.com");

    const [, options] = mockFetch.mock.calls[0] as [string, RequestInit];
    expect(options.method).toBe("POST");
    expect((options.headers as Record<string, string>)["Content-Type"]).toBe(
      "application/json"
    );
    expect(JSON.parse(options.body as string)).toEqual({
      email: "test@example.com",
    });
  });
});

// ---------------------------------------------------------------------------
// Test 2 — Throw when NEXT_PUBLIC_BFF_BASE_URL is not set
//
// Ray's requirement: use vi.resetModules() + fresh dynamic import() to
// actually exercise the throw — confirm it is NOT a module-cache hit.
// ---------------------------------------------------------------------------

describe("waitlistApi — throw when NEXT_PUBLIC_BFF_BASE_URL is unset", () => {
  it("throws at module evaluation time when the env var is missing", async () => {
    await expect(
      importWaitlistApi({ NEXT_PUBLIC_BFF_BASE_URL: undefined })
    ).rejects.toThrow("NEXT_PUBLIC_BFF_BASE_URL");
  });

  it("throws even after a prior import with the var set — confirms cache isolation via vi.resetModules()", async () => {
    // First: import successfully with the var set (primes the cache if isolation were absent).
    await importWaitlistApi({
      NEXT_PUBLIC_BFF_BASE_URL: "https://api.vaultmtg.app",
    });

    // Second: reset and import WITHOUT the var — must still throw, not hit the stale cache.
    await expect(
      importWaitlistApi({ NEXT_PUBLIC_BFF_BASE_URL: undefined })
    ).rejects.toThrow("NEXT_PUBLIC_BFF_BASE_URL");
  });
});

// ---------------------------------------------------------------------------
// Test 3 — Error response handling (400 / 409 / network failure)
// ---------------------------------------------------------------------------

describe("submitWaitlist — error response handling", () => {
  beforeEach(() => {
    process.env.NEXT_PUBLIC_BFF_BASE_URL = "https://api.vaultmtg.app";
  });

  it("returns ok:false with server error message on a non-OK response", async () => {
    const { submitWaitlist } = await importWaitlistApi({
      NEXT_PUBLIC_BFF_BASE_URL: "https://api.vaultmtg.app",
    });

    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: false,
        json: async () => ({ error: "Invalid email address." }),
      } as unknown as Response)
    );

    const result = await submitWaitlist("bad");
    expect(result).toEqual({ ok: false, error: "Invalid email address." });
  });

  it("returns ok:false with fallback message when error body is unparseable", async () => {
    const { submitWaitlist } = await importWaitlistApi({
      NEXT_PUBLIC_BFF_BASE_URL: "https://api.vaultmtg.app",
    });

    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: false,
        json: async () => {
          throw new Error("body not JSON");
        },
      } as unknown as Response)
    );

    const result = await submitWaitlist("user@example.com");
    expect(result).toEqual({
      ok: false,
      error: "Something went wrong. Please try again.",
    });
  });

  it("returns ok:false with network error message when fetch throws", async () => {
    const { submitWaitlist } = await importWaitlistApi({
      NEXT_PUBLIC_BFF_BASE_URL: "https://api.vaultmtg.app",
    });

    vi.stubGlobal(
      "fetch",
      vi.fn().mockRejectedValue(new Error("Failed to fetch"))
    );

    const result = await submitWaitlist("user@example.com");
    expect(result).toEqual({
      ok: false,
      error: "Network error. Please try again.",
    });
  });
});
