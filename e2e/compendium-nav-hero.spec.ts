import { test, expect } from "@playwright/test";

test.describe("Compendium nav + hero (#315 PR2)", () => {
  test("nav renders the VaultMTG serif italic logotype", async ({ page }) => {
    await page.goto("/");
    // The mark SVG and italic wordmark span must appear in the header
    const markImg = page.locator("header img[alt='']").first();
    await expect(markImg).toBeVisible();
    await expect(markImg).toHaveAttribute("src", /logo-vaultmtg-mark\.svg/);
  });

  test("nav renders chapter-style links — The Compendium, Statistics, Begin", async ({
    page,
  }) => {
    await page.goto("/");
    await expect(page.locator("header").getByText("The Compendium")).toBeVisible();
    await expect(page.locator("header").getByText("Statistics")).toBeVisible();
  });

  test("nav CTA reads 'Begin the draft' and links to #begin", async ({
    page,
  }) => {
    await page.goto("/");
    const cta = page.locator("header a[href='#begin']").first();
    await expect(cta).toBeVisible();
    await expect(cta).toContainText("Begin the draft");
  });

  test("hero has id=compendium for nav anchor targeting", async ({ page }) => {
    await page.goto("/");
    const section = page.locator("section#compendium");
    await expect(section).toBeVisible();
  });

  test("hero renders the EARLY ACCESS eyebrow", async ({ page }) => {
    await page.goto("/");
    await expect(
      page.getByText(/EARLY ACCESS · CHAPTER ONE/i),
    ).toBeVisible();
  });

  test("hero renders the main headline", async ({ page }) => {
    await page.goto("/");
    const h1 = page.locator("h1");
    await expect(h1).toContainText("Your edge.");
    await expect(h1).toContainText("Every draft.");
  });

  test("hero renders the ManaWheel SVG", async ({ page }) => {
    await page.goto("/");
    // The wheel is an aria-hidden SVG inside section#compendium
    const wheel = page.locator("section#compendium svg[aria-hidden='true']");
    await expect(wheel).toBeVisible();
  });

  test("hero renders the mana pip flavour rail", async ({ page }) => {
    await page.goto("/");
    await expect(
      page.getByText(/Blue \(U\) · Knowledge · Analysis · Foresight/i),
    ).toBeVisible();
  });

  test("no amber accents remain in the rendered page", async ({ page }) => {
    await page.goto("/");
    const content = await page.content();
    expect(content).not.toContain("F5A623");
    expect(content).not.toContain("F7BA58");
  });
});
