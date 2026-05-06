import { test, expect } from "@playwright/test";

test.describe("/download page", () => {
  test("loads and shows page heading", async ({ page }) => {
    await page.goto("/download");
    await expect(page.getByRole("heading", { name: /VaultMTG/i, level: 1 })).toBeVisible();
  });

  test("Mac download button is visible", async ({ page }) => {
    await page.goto("/download");
    await expect(page.getByRole("link", { name: /Download VaultMTG for Mac/i })).toBeVisible();
  });

  test("Windows download button is visible", async ({ page }) => {
    await page.goto("/download");
    await expect(page.getByRole("link", { name: /Download VaultMTG for Windows/i })).toBeVisible();
  });

  test("page title is set correctly", async ({ page }) => {
    await page.goto("/download");
    await expect(page).toHaveTitle(/Download VaultMTG/i);
  });

  test("value prop text is present", async ({ page }) => {
    await page.goto("/download");
    await expect(page.getByText(/MTG Arena companion built for serious players/i)).toBeVisible();
  });
});
