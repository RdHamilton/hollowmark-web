/**
 * GA4 analytics E2E spec — rewritten for consent-gated loading (#877).
 *
 * Prior behaviour (DEFECT): asserted gtag was always present unconditionally.
 * Correct behaviour: GA4 scripts are absent before consent and present after
 * the user grants consent via the ConsentBanner.
 *
 * The "Features copy accuracy" tests (#692) are preserved unchanged.
 */

import { test, expect } from "@playwright/test";

const GA4_MEASUREMENT_ID = "G-Y4YSVZF8ZD";

// Helper — wait for gtag to become available on the window.
const waitForGtag = (page: import("@playwright/test").Page) =>
  page.waitForFunction(
    () =>
      typeof (window as unknown as Record<string, unknown>).gtag === "function",
    { timeout: 10_000 },
  );

// Helper — grant consent by clicking Accept on the banner.
async function grantConsent(page: import("@playwright/test").Page) {
  const acceptBtn = page.getByRole("button", { name: /accept/i });
  await acceptBtn.waitFor({ state: "visible", timeout: 5_000 });
  await acceptBtn.click();
}

// Helper — decline consent by clicking Decline on the banner.
async function declineConsent(page: import("@playwright/test").Page) {
  const declineBtn = page.getByRole("button", { name: /decline/i });
  await declineBtn.waitFor({ state: "visible", timeout: 5_000 });
  await declineBtn.click();
}

test.describe("GA4 consent-gated analytics (#877)", () => {
  test.beforeEach(async ({ context }) => {
    // Start each test with no consent cookie so the banner is shown.
    await context.clearCookies();
  });

  test("GA4 loader script is NOT present before consent is given", async ({
    page,
  }) => {
    await page.goto("/");

    // The banner should be visible.
    await expect(
      page.getByRole("dialog", { name: /cookie consent/i }),
    ).toBeVisible();

    // The GA4 gtag/js loader should not be attached.
    const loaderScript = page.locator(`script[src*="${GA4_MEASUREMENT_ID}"]`);
    await expect(loaderScript).not.toBeAttached();
  });

  test("gtag is NOT available on window before consent is given", async ({
    page,
  }) => {
    await page.goto("/");

    // Give React a moment to hydrate before checking window.
    await page.waitForTimeout(500);

    const gtagExists = await page.evaluate(() => {
      const win = window as unknown as Record<string, unknown>;
      // gtag may be a stub pushed by Consent Mode default — we check that it
      // is NOT a fully initialised analytics-collecting function.
      // If GA4 has not loaded, window.google_tag_manager will be absent.
      return typeof win.google_tag_manager !== "undefined";
    });

    expect(gtagExists).toBe(false);
  });

  test("GA4 loader script IS present after user grants consent", async ({
    page,
  }) => {
    await page.goto("/");
    await grantConsent(page);

    // After granting consent, GA4Scripts renders the loader.
    const loaderScript = page.locator(`script[src*="${GA4_MEASUREMENT_ID}"]`);
    await expect(loaderScript).toBeAttached({ timeout: 10_000 });
  });

  test("gtag function is initialised on the window after consent grant", async ({
    page,
  }) => {
    await page.goto("/");
    await grantConsent(page);
    await waitForGtag(page);

    const gtagExists = await page.evaluate(
      () =>
        typeof (window as unknown as Record<string, unknown>).gtag ===
        "function",
    );
    expect(gtagExists).toBe(true);
  });

  test("dataLayer array is initialised after consent grant", async ({
    page,
  }) => {
    await page.goto("/");
    await grantConsent(page);
    await waitForGtag(page);

    const dataLayerExists = await page.evaluate(() =>
      Array.isArray(
        (window as unknown as Record<string, unknown>).dataLayer,
      ),
    );
    expect(dataLayerExists).toBe(true);
  });

  test("GA4 loader script is NOT present after consent decline", async ({
    page,
  }) => {
    await page.goto("/");
    await declineConsent(page);

    // Decline → ConsentBanner never renders GA4Scripts.
    await page.waitForTimeout(500);
    const loaderScript = page.locator(`script[src*="${GA4_MEASUREMENT_ID}"]`);
    await expect(loaderScript).not.toBeAttached();
  });

  test("consent cookie persists across navigation (site-wide layout)", async ({
    page,
  }) => {
    // Grant on home, then navigate to /download — GA4 should still be present.
    await page.goto("/");
    await grantConsent(page);

    await page.goto("/download");

    const loaderScript = page.locator(`script[src*="${GA4_MEASUREMENT_ID}"]`);
    await expect(loaderScript).toBeAttached({ timeout: 10_000 });
  });
});

test.describe("Features copy accuracy (#692)", () => {
  test("Chapter II body does not contain 'synergy scores'", async ({
    page,
  }) => {
    await page.goto("/");
    const compendium = page.locator("#compendium");
    await expect(compendium).toBeVisible();
    const html = await compendium.innerHTML();
    expect(html).not.toContain("synergy scores");
  });

  test("Chapter II body contains 'pick rankings' (GIHWR-based)", async ({
    page,
  }) => {
    await page.goto("/");
    await expect(
      page.locator("#compendium").getByText(/pick rankings/),
    ).toBeVisible();
  });

  test("Chapter III body does not contain 'Opponent archetype' (unshipped claim)", async ({
    page,
  }) => {
    await page.goto("/");
    const compendium = page.locator("#compendium");
    await expect(compendium).toBeVisible();
    const html = await compendium.innerHTML();
    expect(html).not.toContain("Opponent archetype");
  });

  test("Chapter III body contains accurate match-history copy", async ({
    page,
  }) => {
    await page.goto("/");
    await expect(
      page
        .locator("#compendium")
        .getByText(/Your deck's mana curve, the turn the game turned/),
    ).toBeVisible();
  });
});
