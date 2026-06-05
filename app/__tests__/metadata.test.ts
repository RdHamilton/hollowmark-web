/**
 * Unit tests for OG/social meta wiring — vault-mtg-tickets#317 / #428.
 *
 * Verifies that the shared OG metadata constants export the required
 * OpenGraph and Twitter card fields pointing to the canonical og-image
 * asset hosted at https://vaultmtg.app/og-image.png.
 *
 * Running: npm run test
 */

import { describe, expect, it } from "vitest";
import {
  OG_IMAGE_URL,
  OG_IMAGE_WIDTH,
  OG_IMAGE_HEIGHT,
  TWITTER_CARD,
  SITE_BASE,
  ogImage,
} from "../../lib/og-metadata";

const EXPECTED_OG_IMAGE_URL = "https://vaultmtg.app/og-image.png";

// ---------------------------------------------------------------------------
// OG image constants
// ---------------------------------------------------------------------------

describe("OG metadata constants — vault-mtg-tickets#317", () => {
  it("OG_IMAGE_URL points to the canonical og-image.png", () => {
    expect(OG_IMAGE_URL).toBe(EXPECTED_OG_IMAGE_URL);
  });

  it("OG_IMAGE_WIDTH is 1200 (standard OG width)", () => {
    expect(OG_IMAGE_WIDTH).toBe(1200);
  });

  it("OG_IMAGE_HEIGHT is 630 (standard OG height)", () => {
    expect(OG_IMAGE_HEIGHT).toBe(630);
  });

  it("TWITTER_CARD is summary_large_image", () => {
    expect(TWITTER_CARD).toBe("summary_large_image");
  });
});

// ---------------------------------------------------------------------------
// ogImage descriptor
// ---------------------------------------------------------------------------

describe("ogImage descriptor — vault-mtg-tickets#317", () => {
  it("ogImage.url matches OG_IMAGE_URL", () => {
    expect(ogImage.url).toBe(EXPECTED_OG_IMAGE_URL);
  });

  it("ogImage.width is 1200", () => {
    expect(ogImage.width).toBe(1200);
  });

  it("ogImage.height is 630", () => {
    expect(ogImage.height).toBe(630);
  });

  it("ogImage.alt is a non-empty string", () => {
    expect(typeof ogImage.alt).toBe("string");
    expect(ogImage.alt.length).toBeGreaterThan(0);
  });
});

// ---------------------------------------------------------------------------
// SITE_BASE values
// ---------------------------------------------------------------------------

describe("SITE_BASE — vault-mtg-tickets#317", () => {
  it("SITE_BASE.url is https://vaultmtg.app", () => {
    expect(SITE_BASE.url).toBe("https://vaultmtg.app");
  });

  it("SITE_BASE.siteName is VaultMTG", () => {
    expect(SITE_BASE.siteName).toBe("VaultMTG");
  });

  it("SITE_BASE.title is non-empty", () => {
    expect(SITE_BASE.title.length).toBeGreaterThan(0);
  });

  it("SITE_BASE.description is non-empty", () => {
    expect(SITE_BASE.description.length).toBeGreaterThan(0);
  });

  it("SITE_BASE.ogDescription is non-empty", () => {
    expect(SITE_BASE.ogDescription.length).toBeGreaterThan(0);
  });
});

// ---------------------------------------------------------------------------
// Cross-page metadata consistency (#428)
// Verifies that the shared constants produce the right shapes for each page's
// metadata export.  These are pure constant tests — they do not render React.
// ---------------------------------------------------------------------------

describe("Cross-page metadata consistency — vault-mtg-tickets#428", () => {
  it("all pages share the same og:image URL", () => {
    // The single canonical OG image is used site-wide; page-level metadata
    // must never diverge from the design-system asset path.
    expect(OG_IMAGE_URL).toBe("https://vaultmtg.app/og-image.png");
    expect(ogImage.url).toBe(OG_IMAGE_URL);
  });

  it("og:image dimensions match the 1200x630 OG standard", () => {
    expect(ogImage.width).toBe(1200);
    expect(ogImage.height).toBe(630);
  });

  it("TWITTER_CARD produces summary_large_image (shows image in social feeds)", () => {
    // summary_large_image is the required card type for the 1200x630 image to
    // display on X/Twitter rather than being cropped into a small thumbnail.
    expect(TWITTER_CARD).toBe("summary_large_image");
  });

  it("SITE_BASE.url does not have a trailing slash", () => {
    // Canonical URL must not end with a slash — prevents duplicate-content issues.
    expect(SITE_BASE.url.endsWith("/")).toBe(false);
  });

  it("ogImage.alt is a sentence-style description (ends with period or exclamation)", () => {
    const lastChar = ogImage.alt.trim().slice(-1);
    expect([".", "!"]).toContain(lastChar);
  });
});
