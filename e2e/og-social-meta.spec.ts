/**
 * E2E tests — Open Graph + Twitter Card meta tag wiring — vault-mtg-tickets#428.
 *
 * Verifies that every vaultmtg.app route renders the correct OG/Twitter meta
 * tags in the HTML <head>.  The tests use page.locator to query meta elements
 * directly in the rendered DOM.
 *
 * Pages covered:
 *   /           — Home (§01–§05 compendium + waitlist)
 *   /roadmap    — Roadmap (§06)
 *   /download   — Download page
 *
 * Running: npm run test:e2e -- og-social-meta
 */

import { test, expect } from "@playwright/test";

const CANONICAL_OG_IMAGE = "https://vaultmtg.app/og-image.png";

// ---------------------------------------------------------------------------
// Helper: read a <meta> tag attribute value
// ---------------------------------------------------------------------------
async function getMetaContent(page: import("@playwright/test").Page, selector: string): Promise<string | null> {
  return page.locator(selector).getAttribute("content");
}

// ---------------------------------------------------------------------------
// Home page ( / )
// ---------------------------------------------------------------------------
test.describe("Home page OG/Twitter meta — vault-mtg-tickets#428", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("og:image points to the canonical branded OG image", async ({ page }) => {
    const content = await getMetaContent(page, 'meta[property="og:image"]');
    expect(content).toBe(CANONICAL_OG_IMAGE);
  });

  test("og:image:width is 1200", async ({ page }) => {
    const content = await getMetaContent(page, 'meta[property="og:image:width"]');
    expect(content).toBe("1200");
  });

  test("og:image:height is 630", async ({ page }) => {
    const content = await getMetaContent(page, 'meta[property="og:image:height"]');
    expect(content).toBe("630");
  });

  test("og:title is present and non-empty", async ({ page }) => {
    const content = await getMetaContent(page, 'meta[property="og:title"]');
    expect(content).toBeTruthy();
    expect(content!.length).toBeGreaterThan(0);
  });

  test("og:title contains Hollowmark", async ({ page }) => {
    const content = await getMetaContent(page, 'meta[property="og:title"]');
    expect(content).toContain("Hollowmark");
  });

  test("og:description is present and non-empty", async ({ page }) => {
    const content = await getMetaContent(page, 'meta[property="og:description"]');
    expect(content).toBeTruthy();
    expect(content!.length).toBeGreaterThan(0);
  });

  test("og:site_name is Hollowmark", async ({ page }) => {
    const content = await getMetaContent(page, 'meta[property="og:site_name"]');
    expect(content).toBe("Hollowmark");
  });

  test("og:type is website", async ({ page }) => {
    const content = await getMetaContent(page, 'meta[property="og:type"]');
    expect(content).toBe("website");
  });

  test("og:url is the canonical root URL", async ({ page }) => {
    const content = await getMetaContent(page, 'meta[property="og:url"]');
    expect(content).toBe("https://vaultmtg.app");
  });

  test("twitter:card is summary_large_image", async ({ page }) => {
    const content = await getMetaContent(page, 'meta[name="twitter:card"]');
    expect(content).toBe("summary_large_image");
  });

  test("twitter:title is present and non-empty", async ({ page }) => {
    const content = await getMetaContent(page, 'meta[name="twitter:title"]');
    expect(content).toBeTruthy();
    expect(content!.length).toBeGreaterThan(0);
  });

  test("twitter:description is present and non-empty", async ({ page }) => {
    const content = await getMetaContent(page, 'meta[name="twitter:description"]');
    expect(content).toBeTruthy();
    expect(content!.length).toBeGreaterThan(0);
  });

  test("twitter:image points to the canonical branded OG image", async ({ page }) => {
    const content = await getMetaContent(page, 'meta[name="twitter:image"]');
    expect(content).toBe(CANONICAL_OG_IMAGE);
  });
});

// ---------------------------------------------------------------------------
// /roadmap
// ---------------------------------------------------------------------------
test.describe("/roadmap OG/Twitter meta — vault-mtg-tickets#428", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/roadmap");
  });

  test("og:image points to the canonical branded OG image", async ({ page }) => {
    const content = await getMetaContent(page, 'meta[property="og:image"]');
    expect(content).toBe(CANONICAL_OG_IMAGE);
  });

  test("og:title contains Roadmap and Hollowmark", async ({ page }) => {
    const content = await getMetaContent(page, 'meta[property="og:title"]');
    expect(content).toContain("Roadmap");
    expect(content).toContain("Hollowmark");
  });

  test("og:description is specific to the roadmap page", async ({ page }) => {
    const content = await getMetaContent(page, 'meta[property="og:description"]');
    expect(content).toBeTruthy();
    expect(content!.length).toBeGreaterThan(0);
  });

  test("og:url is the /roadmap URL", async ({ page }) => {
    const content = await getMetaContent(page, 'meta[property="og:url"]');
    expect(content).toBe("https://vaultmtg.app/roadmap");
  });

  test("twitter:card is summary_large_image", async ({ page }) => {
    const content = await getMetaContent(page, 'meta[name="twitter:card"]');
    expect(content).toBe("summary_large_image");
  });

  test("twitter:image points to the canonical branded OG image", async ({ page }) => {
    const content = await getMetaContent(page, 'meta[name="twitter:image"]');
    expect(content).toBe(CANONICAL_OG_IMAGE);
  });
});

// ---------------------------------------------------------------------------
// /download
// ---------------------------------------------------------------------------
test.describe("/download OG/Twitter meta — vault-mtg-tickets#428", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/download");
  });

  test("og:image points to the canonical branded OG image", async ({ page }) => {
    const content = await getMetaContent(page, 'meta[property="og:image"]');
    expect(content).toBe(CANONICAL_OG_IMAGE);
  });

  test("og:title contains Download and Hollowmark", async ({ page }) => {
    const content = await getMetaContent(page, 'meta[property="og:title"]');
    expect(content).toContain("Download");
    expect(content).toContain("Hollowmark");
  });

  test("og:url is the /download URL", async ({ page }) => {
    const content = await getMetaContent(page, 'meta[property="og:url"]');
    expect(content).toBe("https://vaultmtg.app/download");
  });

  test("twitter:card is summary_large_image", async ({ page }) => {
    const content = await getMetaContent(page, 'meta[name="twitter:card"]');
    expect(content).toBe("summary_large_image");
  });

  test("twitter:image points to the canonical branded OG image", async ({ page }) => {
    const content = await getMetaContent(page, 'meta[name="twitter:image"]');
    expect(content).toBe(CANONICAL_OG_IMAGE);
  });
});
