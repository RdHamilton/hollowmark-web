import { test, expect } from "@playwright/test";

const GA4_MEASUREMENT_ID = "G-Y4YSVZF8ZD";

const waitForGtag = (page: import("@playwright/test").Page) =>
  page.waitForFunction(
    () => typeof (window as unknown as Record<string, unknown>).gtag === "function",
    { timeout: 10_000 }
  );

test.describe("GA4 analytics wiring (#419)", () => {
  test("gtag loader script tag is present in the DOM", async ({ page }) => {
    await page.goto("/");

    const loaderScript = page.locator(
      `script[src*="${GA4_MEASUREMENT_ID}"]`,
    );
    await expect(loaderScript).toBeAttached();
  });

  test("gtag function is initialised on the window", async ({ page }) => {
    await page.goto("/");
    await waitForGtag(page);

    const gtagExists = await page.evaluate(() => {
      return typeof (window as unknown as Record<string, unknown>).gtag === "function";
    });

    expect(gtagExists).toBe(true);
  });

  test("dataLayer array is initialised", async ({ page }) => {
    await page.goto("/");
    await waitForGtag(page);

    const dataLayerExists = await page.evaluate(() => {
      return Array.isArray(
        (window as unknown as Record<string, unknown>).dataLayer,
      );
    });

    expect(dataLayerExists).toBe(true);
  });

  test("GA4 script present on download page too (site-wide layout)", async ({
    page,
  }) => {
    await page.goto("/download");

    const loaderScript = page.locator(
      `script[src*="${GA4_MEASUREMENT_ID}"]`,
    );
    await expect(loaderScript).toBeAttached();
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
