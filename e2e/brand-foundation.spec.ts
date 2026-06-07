import { test, expect } from "@playwright/test";

test.describe("Brand foundation — Hollowmark rebrand (#1002)", () => {
  test("home page renders the Hollowmark wordmark in the nav", async ({
    page,
  }) => {
    await page.goto("/");
    // Nav home anchor is aria-labelled "Hollowmark home"
    const navHome = page.locator("header").getByLabel("Hollowmark home");
    await expect(navHome).toBeVisible();
  });

  test("nav mark icon is decorative (aria-hidden, empty alt)", async ({
    page,
  }) => {
    await page.goto("/");
    // The mark SVG is decorative — alt="" confirms aria-hidden intent
    const markImg = page
      .locator("header")
      .locator("img[alt='']")
      .first();
    await expect(markImg).toBeVisible();
    await expect(markImg).toHaveAttribute("src", /logo-vaultmtg-mark\.svg/);
  });

  test("nav renders the Hollowmark logotype span", async ({ page }) => {
    await page.goto("/");
    // The brand wordmark is a serif italic <span>, not an image
    const wordmark = page.locator("header").getByText("Hollowmark");
    await expect(wordmark).toBeVisible();
  });

  test("footer renders Hollowmark brand name in the colophon", async ({
    page,
  }) => {
    await page.goto("/");
    // Footer colophon uses a serif italic span, not a logo image
    const brand = page.locator("footer").getByText("Hollowmark");
    await expect(brand.first()).toBeVisible();
  });

  test("footer Discord link uses the live invite URL", async ({ page }) => {
    await page.goto("/");
    const discord = page.locator("footer").getByRole("link", {
      name: "Discord",
    });
    await expect(discord).toHaveAttribute(
      "href",
      "https://discord.gg/XwVsV892b4",
    );
  });

  test("webmanifest reports Hollowmark as app name", async ({ page }) => {
    const response = await page.goto("/site.webmanifest");
    expect(response?.status()).toBe(200);
    const manifest = await response?.json();
    expect(manifest.name).toBe("Hollowmark");
    expect(manifest.short_name).toBe("Hollowmark");
  });
});
