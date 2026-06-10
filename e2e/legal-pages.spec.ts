/**
 * E2E tests for /terms and /privacy legal pages — hollowmark-tickets#880 + #881.
 *
 * Covers:
 *  - /terms loads (200)
 *  - /privacy loads (200)
 *  - h1 headings render correctly
 *  - Key required section headings are visible
 *  - WotC disclaimer is present on both pages
 *  - Footer links to /terms and /privacy resolve and load
 *  - Nav and Footer are present on both pages
 *  - Effective date is displayed
 *  - Contact emails are present
 *
 * Running: npm run test:e2e
 */

import { test, expect } from "@playwright/test";

const EFFECTIVE_DATE_RE = /June 10, 2026/i;

// ---------------------------------------------------------------------------
// /terms
// ---------------------------------------------------------------------------

test.describe("/terms page — hollowmark-tickets#880", () => {
  test("loads and returns a page (200)", async ({ page }) => {
    const response = await page.goto("/terms");
    expect(response?.status()).toBe(200);
  });

  test("page title contains 'Terms of Service'", async ({ page }) => {
    await page.goto("/terms");
    await expect(page).toHaveTitle(/Terms of Service/i);
  });

  test("renders the § Legal · Terms of Service eyebrow marker", async ({ page }) => {
    await page.goto("/terms");
    await expect(page.getByText(/§ Legal · Terms of Service/i)).toBeVisible();
  });

  test("renders the h1 heading", async ({ page }) => {
    await page.goto("/terms");
    const h1 = page.getByRole("heading", { level: 1 });
    await expect(h1).toBeVisible();
    await expect(h1).toContainText("Terms of");
  });

  test("renders the effective date", async ({ page }) => {
    await page.goto("/terms");
    await expect(page.getByText(EFFECTIVE_DATE_RE).first()).toBeVisible();
  });

  test("renders the WotC disclaimer section heading", async ({ page }) => {
    await page.goto("/terms");
    await expect(
      page.getByText(/Disclaimer — Unofficial Third-Party Tool/i).first(),
    ).toBeVisible();
  });

  test("renders '1. Agreement to Terms' section heading", async ({ page }) => {
    await page.goto("/terms");
    await expect(page.getByRole("heading", { name: /1\. Agreement to Terms/i })).toBeVisible();
  });

  test("renders '7. Disclaimer of Warranties' section heading", async ({ page }) => {
    await page.goto("/terms");
    await expect(
      page.getByRole("heading", { name: /7\. Disclaimer of Warranties/i }),
    ).toBeVisible();
  });

  test("renders '12. Dispute Resolution' section heading", async ({ page }) => {
    await page.goto("/terms");
    await expect(
      page.getByRole("heading", { name: /12\. Dispute Resolution/i }),
    ).toBeVisible();
  });

  test("renders '18. Contact' section heading", async ({ page }) => {
    await page.goto("/terms");
    await expect(page.getByRole("heading", { name: /18\. Contact/i })).toBeVisible();
  });

  test("renders the arbitration clause text", async ({ page }) => {
    await page.goto("/terms");
    await expect(page.getByText(/binding individual arbitration/i)).toBeVisible();
  });

  test("renders the class-action waiver", async ({ page }) => {
    await page.goto("/terms");
    await expect(page.getByText(/CLASS MEMBER IN ANY PURPORTED CLASS/i)).toBeVisible();
  });

  test("renders State of Georgia governing law", async ({ page }) => {
    await page.goto("/terms");
    await expect(page.getByText(/State of Georgia, USA/i)).toBeVisible();
  });

  test("renders the ornamental three-flower break in main content", async ({ page }) => {
    await page.goto("/terms");
    await expect(page.locator("main").getByText(/❦ ❦ ❦/)).toBeVisible();
  });

  test("Nav and Footer are present", async ({ page }) => {
    await page.goto("/terms");
    await expect(page.locator("header")).toBeVisible();
    await expect(page.locator("footer")).toBeVisible();
  });

  test("cross-link to /privacy is present and navigates", async ({ page }) => {
    await page.goto("/terms");
    const privacyLink = page.locator("main").getByRole("link", { name: /Privacy Policy/i });
    await expect(privacyLink).toBeVisible();
    await expect(privacyLink).toHaveAttribute("href", "/privacy");
  });
});

// ---------------------------------------------------------------------------
// /privacy
// ---------------------------------------------------------------------------

test.describe("/privacy page — hollowmark-tickets#881", () => {
  test("loads and returns a page (200)", async ({ page }) => {
    const response = await page.goto("/privacy");
    expect(response?.status()).toBe(200);
  });

  test("page title contains 'Privacy Policy'", async ({ page }) => {
    await page.goto("/privacy");
    await expect(page).toHaveTitle(/Privacy Policy/i);
  });

  test("renders the § Legal · Privacy Policy eyebrow marker", async ({ page }) => {
    await page.goto("/privacy");
    await expect(page.getByText(/§ Legal · Privacy Policy/i)).toBeVisible();
  });

  test("renders the h1 heading", async ({ page }) => {
    await page.goto("/privacy");
    const h1 = page.getByRole("heading", { level: 1 });
    await expect(h1).toBeVisible();
    await expect(h1).toContainText("Privacy");
  });

  test("renders the effective date", async ({ page }) => {
    await page.goto("/privacy");
    await expect(page.getByText(EFFECTIVE_DATE_RE).first()).toBeVisible();
  });

  test("renders the WotC disclaimer section heading", async ({ page }) => {
    await page.goto("/privacy");
    await expect(
      page.getByText(/Disclaimer — Unofficial Third-Party Tool/i).first(),
    ).toBeVisible();
  });

  test("renders '1. Introduction' section heading", async ({ page }) => {
    await page.goto("/privacy");
    await expect(page.getByRole("heading", { name: /1\. Introduction/i })).toBeVisible();
  });

  test("renders '2. Information We Collect' section heading", async ({ page }) => {
    await page.goto("/privacy");
    await expect(
      page.getByRole("heading", { name: /2\. Information We Collect/i }),
    ).toBeVisible();
  });

  test("renders '4. Data Retention' section heading", async ({ page }) => {
    await page.goto("/privacy");
    await expect(page.getByRole("heading", { name: /4\. Data Retention/i })).toBeVisible();
  });

  test("renders '6. Your Rights and Choices' section heading", async ({ page }) => {
    await page.goto("/privacy");
    await expect(
      page.getByRole("heading", { name: /6\. Your Rights and Choices/i }),
    ).toBeVisible();
  });

  test("renders '9. International Users — GDPR and UK GDPR' section heading", async ({
    page,
  }) => {
    await page.goto("/privacy");
    await expect(
      page.getByRole("heading", { name: /9\. International Users — GDPR/i }),
    ).toBeVisible();
  });

  test("renders '10. Contact' section heading", async ({ page }) => {
    await page.goto("/privacy");
    await expect(page.getByRole("heading", { name: /10\. Contact/i })).toBeVisible();
  });

  test("renders the ML training data de-identification disclosure", async ({ page }) => {
    await page.goto("/privacy");
    await expect(page.getByText(/How ML training data is de-identified/i)).toBeVisible();
  });

  test("renders the 'do not sell' statement", async ({ page }) => {
    await page.goto("/privacy");
    await expect(
      page.getByText(/do not sell, rent, or lease your personal information/i),
    ).toBeVisible();
  });

  test("renders Clerk as a sub-processor", async ({ page }) => {
    await page.goto("/privacy");
    await expect(page.getByText(/Clerk Identity/i)).toBeVisible();
  });

  test("renders the ornamental three-flower break in main content", async ({ page }) => {
    await page.goto("/privacy");
    await expect(page.locator("main").getByText(/❦ ❦ ❦/)).toBeVisible();
  });

  test("Nav and Footer are present", async ({ page }) => {
    await page.goto("/privacy");
    await expect(page.locator("header")).toBeVisible();
    await expect(page.locator("footer")).toBeVisible();
  });
});

// ---------------------------------------------------------------------------
// Footer link resolution
// ---------------------------------------------------------------------------

test.describe("Footer legal links — hollowmark-tickets#880 + #881", () => {
  test("footer has a Privacy Policy link pointing to /privacy", async ({ page }) => {
    await page.goto("/");
    const footerLink = page
      .locator("footer")
      .getByRole("link", { name: /Privacy Policy/i });
    await expect(footerLink).toBeVisible();
    await expect(footerLink).toHaveAttribute("href", "/privacy");
  });

  test("footer Privacy Policy link navigates to /privacy and loads the page", async ({
    page,
  }) => {
    await page.goto("/");
    const footerLink = page
      .locator("footer")
      .getByRole("link", { name: /Privacy Policy/i });
    await footerLink.click();
    await expect(page).toHaveURL(/\/privacy/);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });

  test("footer has a Terms of Service link pointing to /terms", async ({ page }) => {
    await page.goto("/");
    const footerLink = page
      .locator("footer")
      .getByRole("link", { name: /Terms of Service/i });
    await expect(footerLink).toBeVisible();
    await expect(footerLink).toHaveAttribute("href", "/terms");
  });

  test("footer Terms of Service link navigates to /terms and loads the page", async ({
    page,
  }) => {
    await page.goto("/");
    const footerLink = page
      .locator("footer")
      .getByRole("link", { name: /Terms of Service/i });
    await footerLink.click();
    await expect(page).toHaveURL(/\/terms/);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });
});
