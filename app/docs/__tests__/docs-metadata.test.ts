/**
 * Unit tests for /docs page metadata — vault-mtg-tickets#406.
 *
 * Validates that:
 *  1. The shared OG metadata constants are compatible with the /docs page pattern.
 *  2. The canonical og-image URL is reused (following the #428 cross-page
 *     consistency rule — all pages share a single og-image asset).
 *
 * These tests follow the same pattern as app/__tests__/metadata.test.ts.
 * They are pure constant tests — no React rendering or Next.js imports required.
 *
 * Running: npm run test
 */

import { describe, expect, it } from "vitest";
import {
  OG_IMAGE_URL,
  ogImage,
  SITE_BASE,
  TWITTER_CARD,
} from "../../../lib/og-metadata";

const EXPECTED_DOCS_URL = `${SITE_BASE.url}/docs`;

describe("/docs page OG metadata compatibility — vault-mtg-tickets#406", () => {
  it("SITE_BASE.url is the base for the /docs canonical URL", () => {
    expect(EXPECTED_DOCS_URL).toBe("https://vaultmtg.app/docs");
  });

  it("OG_IMAGE_URL is reused on /docs (cross-page consistency, #428)", () => {
    expect(OG_IMAGE_URL).toBe("https://vaultmtg.app/og-image.png");
  });

  it("ogImage.url matches OG_IMAGE_URL (used in /docs openGraph.images)", () => {
    expect(ogImage.url).toBe(OG_IMAGE_URL);
  });

  it("ogImage dimensions are the standard 1200x630", () => {
    expect(ogImage.width).toBe(1200);
    expect(ogImage.height).toBe(630);
  });

  it("TWITTER_CARD is summary_large_image (consistent with all pages)", () => {
    expect(TWITTER_CARD).toBe("summary_large_image");
  });

  it("SITE_BASE.siteName is VaultMTG (used in /docs openGraph.siteName)", () => {
    expect(SITE_BASE.siteName).toBe("VaultMTG");
  });

  it("SITE_BASE.url does not end with a slash (canonical URL safety)", () => {
    expect(SITE_BASE.url.endsWith("/")).toBe(false);
  });

  it("/docs URL is derived from SITE_BASE.url plus /docs path", () => {
    expect(EXPECTED_DOCS_URL).toMatch(/^https:\/\/vaultmtg\.app\/docs$/);
  });
});
