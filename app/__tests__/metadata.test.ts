/**
 * Unit tests for OG/social meta wiring — vault-mtg-tickets#317.
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
