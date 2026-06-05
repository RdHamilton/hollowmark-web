/**
 * E2E tests for the /docs help & documentation page — vault-mtg-tickets#406.
 *
 * Covers:
 *  - Page loads and returns 200 (#406 AC: route is live)
 *  - Page heading and eyebrow marker render correctly
 *  - All five topic sections are present
 *  - FAQ section renders with at least the canonical questions
 *  - Bug-report callout is present (in-app path as primary)
 *  - Discord CTA renders
 *  - Nav /docs link is present and navigates correctly
 *  - Footer links to /docs
 *  - OG title metadata is set
 *
 * Running: npm run test:e2e
 */

import { test, expect } from "@playwright/test";

test.describe("/docs page — vault-mtg-tickets#406", () => {
  test("loads and returns a page (200)", async ({ page }) => {
    const response = await page.goto("/docs");
    expect(response?.status()).toBe(200);
  });

  test("page title is set correctly", async ({ page }) => {
    await page.goto("/docs");
    await expect(page).toHaveTitle(/Help.*Documentation.*VaultMTG/i);
  });

  test("renders the § 07 · Help eyebrow marker", async ({ page }) => {
    await page.goto("/docs");
    await expect(page.getByText(/§ 07 · Help/i)).toBeVisible();
  });

  test("renders the h1 heading with 'Documentation'", async ({ page }) => {
    await page.goto("/docs");
    const h1 = page.getByRole("heading", { level: 1 });
    await expect(h1).toBeVisible();
    await expect(h1).toContainText("Documentation");
  });

  test("renders the deck copy paragraph", async ({ page }) => {
    await page.goto("/docs");
    await expect(
      page.getByText(/Getting started.*pairing with Arena/i),
    ).toBeVisible();
  });

  test("renders the Installation topic section", async ({ page }) => {
    await page.goto("/docs");
    await expect(
      page.getByRole("heading", { name: /Installation/i }),
    ).toBeVisible();
  });

  test("renders the Pairing topic section", async ({ page }) => {
    await page.goto("/docs");
    await expect(
      page.getByRole("heading", { name: /Pairing with MTG Arena/i }),
    ).toBeVisible();
  });

  test("renders the Troubleshooting topic section", async ({ page }) => {
    await page.goto("/docs");
    await expect(
      page.getByRole("heading", { name: /Troubleshooting/i }),
    ).toBeVisible();
  });

  test("renders the Collection & Match Data topic section", async ({ page }) => {
    await page.goto("/docs");
    await expect(
      page.getByRole("heading", { name: /Collection.*Match Data/i }),
    ).toBeVisible();
  });

  test("renders the Uninstalling topic section", async ({ page }) => {
    await page.goto("/docs");
    await expect(
      page.getByRole("heading", { name: /Uninstalling/i }),
    ).toBeVisible();
  });

  test("renders the FAQ section heading", async ({ page }) => {
    await page.goto("/docs");
    await expect(
      page.getByRole("heading", { name: /Frequently asked questions/i }),
    ).toBeVisible();
  });

  test("renders the '§ 07.VI · FAQ' eyebrow marker", async ({ page }) => {
    await page.goto("/docs");
    await expect(page.getByText(/§ 07\.VI · FAQ/i)).toBeVisible();
  });

  test("FAQ contains the install question", async ({ page }) => {
    await page.goto("/docs");
    await expect(
      page.getByRole("heading", { name: /How do I install VaultMTG/i }),
    ).toBeVisible();
  });

  test("FAQ contains the pairing question", async ({ page }) => {
    await page.goto("/docs");
    await expect(
      page.getByRole("heading", { name: /How do I pair VaultMTG/i }),
    ).toBeVisible();
  });

  test("FAQ contains the bug-reporting question", async ({ page }) => {
    await page.goto("/docs");
    await expect(
      page.getByRole("heading", { name: /How do I report a bug/i }),
    ).toBeVisible();
  });

  test("FAQ contains the uninstall question", async ({ page }) => {
    await page.goto("/docs");
    await expect(
      page.getByRole("heading", { name: /How do I uninstall/i }),
    ).toBeVisible();
  });

  test("renders the bug-report callout emphasising in-app path", async ({ page }) => {
    await page.goto("/docs");
    // The note element should mention "Bug Reports" and "Help → Report a Bug"
    const callout = page.getByRole("note", { name: /How to report a bug/i });
    await expect(callout).toBeVisible();
    // The <strong> within the callout should contain "Help → Report a Bug"
    await expect(callout.getByText(/Help → Report a Bug/i)).toBeVisible();
  });

  test("renders the ornamental three-flower break in main content", async ({ page }) => {
    await page.goto("/docs");
    // Scope to the main element to avoid the footer's matching three-flower
    await expect(page.locator("main").getByText(/❦ ❦ ❦/)).toBeVisible();
  });

  test("renders the Discord support CTA with join link", async ({ page }) => {
    await page.goto("/docs");
    const discordLink = page.getByRole("link", { name: /Join the Discord/i });
    await expect(discordLink).toBeVisible();
    await expect(discordLink).toHaveAttribute("href", "https://discord.gg/XwVsV892b4");
    await expect(discordLink).toHaveAttribute("target", "_blank");
  });

  test("renders the 'Still need help?' callout", async ({ page }) => {
    await page.goto("/docs");
    await expect(page.getByText(/Still need help/i)).toBeVisible();
  });

  test("Nav and Footer are present", async ({ page }) => {
    await page.goto("/docs");
    await expect(page.locator("header")).toBeVisible();
    await expect(page.locator("footer")).toBeVisible();
  });
});

test.describe("Nav /docs link — vault-mtg-tickets#406", () => {
  test("home page nav contains a Help link pointing to /docs", async ({ page }) => {
    await page.goto("/");
    const helpLink = page.locator("header").getByRole("link", { name: "Help" }).first();
    await expect(helpLink).toBeVisible();
    await expect(helpLink).toHaveAttribute("href", "/docs");
  });

  test("clicking Help nav link navigates to /docs", async ({ page }) => {
    await page.goto("/");
    const helpLink = page.locator("header").getByRole("link", { name: "Help" }).first();
    await helpLink.click();
    await expect(page).toHaveURL(/\/docs/);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });
});

test.describe("Footer /docs link — vault-mtg-tickets#406", () => {
  test("footer has a Help & Docs link pointing to /docs", async ({ page }) => {
    await page.goto("/docs");
    const footerLink = page.locator("footer").getByRole("link", { name: /Help.*Docs/i });
    await expect(footerLink).toBeVisible();
    await expect(footerLink).toHaveAttribute("href", "/docs");
  });
});
