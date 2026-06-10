/**
 * E2E tests for ConsentBanner — GDPR/CCPA cookie consent (#877).
 *
 * Covers:
 * - Banner shown to visitors with no consent cookie
 * - Banner hidden when consent cookie already exists
 * - Accept flow: banner dismisses, vaultmtg_consent=granted written
 * - Decline flow: banner dismisses, vaultmtg_consent=declined written
 * - Cookie persists on reload (no re-prompt)
 * - CCPA "Do Not Sell" link present in Footer
 */

import { test, expect } from "@playwright/test";

test.describe("ConsentBanner — initial display (#877)", () => {
  test.beforeEach(async ({ context }) => {
    await context.clearCookies();
  });

  test("banner is visible for a first-time visitor (no consent cookie)", async ({
    page,
  }) => {
    await page.goto("/");
    await expect(
      page.getByRole("dialog", { name: /cookie consent/i }),
    ).toBeVisible();
  });

  test("banner contains Privacy Policy link", async ({ page }) => {
    await page.goto("/");
    const privacyLink = page
      .getByRole("dialog", { name: /cookie consent/i })
      .getByRole("link", { name: /privacy policy/i });
    await expect(privacyLink).toBeVisible();
    await expect(privacyLink).toHaveAttribute("href", "/privacy");
  });

  test("banner has Accept and Decline buttons", async ({ page }) => {
    await page.goto("/");
    const dialog = page.getByRole("dialog", { name: /cookie consent/i });
    await expect(dialog.getByRole("button", { name: /accept/i })).toBeVisible();
    await expect(
      dialog.getByRole("button", { name: /decline/i }),
    ).toBeVisible();
  });
});

test.describe("ConsentBanner — Accept flow (#877)", () => {
  test.beforeEach(async ({ context }) => {
    await context.clearCookies();
  });

  test("clicking Accept dismisses the banner", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: /accept/i }).click();
    await expect(
      page.getByRole("dialog", { name: /cookie consent/i }),
    ).not.toBeVisible();
  });

  test("clicking Accept writes vaultmtg_consent=granted cookie", async ({
    page,
    context,
  }) => {
    await page.goto("/");
    await page.getByRole("button", { name: /accept/i }).click();

    const cookies = await context.cookies();
    const consent = cookies.find((c) => c.name === "vaultmtg_consent");
    expect(consent).toBeDefined();
    expect(consent?.value).toBe("granted");
  });

  test("no banner on reload after accepting", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: /accept/i }).click();
    await page.reload();

    await expect(
      page.getByRole("dialog", { name: /cookie consent/i }),
    ).not.toBeVisible();
  });
});

test.describe("ConsentBanner — Decline flow (#877)", () => {
  test.beforeEach(async ({ context }) => {
    await context.clearCookies();
  });

  test("clicking Decline dismisses the banner", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: /decline/i }).click();
    await expect(
      page.getByRole("dialog", { name: /cookie consent/i }),
    ).not.toBeVisible();
  });

  test("clicking Decline writes vaultmtg_consent=declined cookie", async ({
    page,
    context,
  }) => {
    await page.goto("/");
    await page.getByRole("button", { name: /decline/i }).click();

    const cookies = await context.cookies();
    const consent = cookies.find((c) => c.name === "vaultmtg_consent");
    expect(consent).toBeDefined();
    expect(consent?.value).toBe("declined");
  });

  test("no banner on reload after declining", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: /decline/i }).click();
    await page.reload();

    await expect(
      page.getByRole("dialog", { name: /cookie consent/i }),
    ).not.toBeVisible();
  });
});

test.describe("ConsentBanner — already-consented visitor (#877)", () => {
  test("no banner when consent cookie is pre-set to granted", async ({
    page,
    context,
  }) => {
    await context.addCookies([
      {
        name: "vaultmtg_consent",
        value: "granted",
        domain: "localhost",
        path: "/",
      },
    ]);
    await page.goto("/");
    await expect(
      page.getByRole("dialog", { name: /cookie consent/i }),
    ).not.toBeVisible();
  });

  test("no banner when consent cookie is pre-set to declined", async ({
    page,
    context,
  }) => {
    await context.addCookies([
      {
        name: "vaultmtg_consent",
        value: "declined",
        domain: "localhost",
        path: "/",
      },
    ]);
    await page.goto("/");
    await expect(
      page.getByRole("dialog", { name: /cookie consent/i }),
    ).not.toBeVisible();
  });
});

test.describe("Footer CCPA link (#877)", () => {
  test("Legal column contains Do Not Sell or Share My Personal Information link", async ({
    page,
  }) => {
    await page.goto("/");
    const ccpaLink = page.getByRole("link", {
      name: /do not sell or share my personal information/i,
    });
    await expect(ccpaLink).toBeVisible();
    await expect(ccpaLink).toHaveAttribute("href", "/privacy#ccpa");
  });
});
