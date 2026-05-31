import { test, expect } from "@playwright/test";

test.describe("Brand foundation (#315 PR1)", () => {
  test("home page renders the VaultMTG wordmark logo in the nav", async ({
    page,
  }) => {
    await page.goto("/");
    const navLogo = page
      .locator("header")
      .getByAltText("VaultMTG")
      .first();
    await expect(navLogo).toBeVisible();
    await expect(navLogo).toHaveAttribute(
      "src",
      /logo-vaultmtg-wordmark-light-paths\.svg/,
    );
  });

  test("footer renders the VaultMTG wordmark logo", async ({ page }) => {
    await page.goto("/");
    const footerLogo = page
      .locator("footer")
      .getByAltText("VaultMTG")
      .first();
    await expect(footerLogo).toBeVisible();
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
});
