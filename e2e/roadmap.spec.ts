/**
 * E2E tests for the /roadmap page — vault-mtg-tickets#426 + #427.
 *
 * Covers:
 *  - Page loads and shows the correct heading (#426)
 *  - Beta target callout is present (#426)
 *  - Both milestones (v0.3.8 current + v0.3.9 next) render (#426)
 *  - Brand styling: Roadmap nav link present (#427)
 *  - Nav Roadmap link navigates to /roadmap (#427)
 *
 * Running: npm run test:e2e
 */

import { test, expect } from "@playwright/test";

test.describe("/roadmap page — vault-mtg-tickets#426", () => {
  test("loads and shows the page heading", async ({ page }) => {
    await page.goto("/roadmap");
    const h1 = page.getByRole("heading", { level: 1 });
    await expect(h1).toBeVisible();
    await expect(h1).toContainText("built");
  });

  test("page title is set correctly", async ({ page }) => {
    await page.goto("/roadmap");
    await expect(page).toHaveTitle(/Roadmap.*VaultMTG/i);
  });

  test("renders the § 06 · Roadmap eyebrow marker", async ({ page }) => {
    await page.goto("/roadmap");
    await expect(page.getByText(/§ 06 · Roadmap/i)).toBeVisible();
  });

  test("renders the beta target callout with August 18, 2026", async ({ page }) => {
    await page.goto("/roadmap");
    await expect(page.getByText(/August 18, 2026/i)).toBeVisible();
  });

  test("renders the 'Closed Beta Target' label", async ({ page }) => {
    await page.goto("/roadmap");
    await expect(page.getByText(/Closed Beta Target/i)).toBeVisible();
  });

  test("renders the current milestone v0.3.8 card", async ({ page }) => {
    await page.goto("/roadmap");
    await expect(page.getByText("v0.3.8")).toBeVisible();
  });

  test("renders the v0.3.8 codename heading as h2", async ({ page }) => {
    await page.goto("/roadmap");
    await expect(
      page.getByRole("heading", { level: 2, name: /Wildcard Advisor v1/i }),
    ).toBeVisible();
  });

  test("renders 'In Progress' status for v0.3.8", async ({ page }) => {
    await page.goto("/roadmap");
    await expect(page.getByText("In Progress")).toBeVisible();
  });

  test("renders the next milestone v0.3.9 card", async ({ page }) => {
    await page.goto("/roadmap");
    await expect(page.getByText("v0.3.9")).toBeVisible();
  });

  test("renders the v0.3.9 codename heading as h2", async ({ page }) => {
    await page.goto("/roadmap");
    await expect(
      page.getByRole("heading", { level: 2, name: /Wildcard Cluster/i }),
    ).toBeVisible();
  });

  test("renders 'Planned' status for v0.3.9", async ({ page }) => {
    await page.goto("/roadmap");
    await expect(page.getByText("Planned")).toBeVisible();
  });

  test("renders the GitHub milestone link for v0.3.8", async ({ page }) => {
    await page.goto("/roadmap");
    const link = page.getByRole("link", { name: /View milestone on GitHub/i });
    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute("href", /github\.com/);
    await expect(link).toHaveAttribute("target", "_blank");
  });

  test("renders the 'Join the waitlist' CTA link", async ({ page }) => {
    await page.goto("/roadmap");
    const cta = page.getByRole("link", { name: /Join the waitlist/i });
    await expect(cta).toBeVisible();
    await expect(cta).toHaveAttribute("href", "/#begin");
  });

  test("renders the ornamental three-flower break", async ({ page }) => {
    await page.goto("/roadmap");
    await expect(page.getByText(/❦ ❦ ❦/)).toBeVisible();
  });

  test("Nav and Footer are present", async ({ page }) => {
    await page.goto("/roadmap");
    await expect(page.locator("header")).toBeVisible();
    await expect(page.locator("footer")).toBeVisible();
  });
});

test.describe("Nav Roadmap link — vault-mtg-tickets#427", () => {
  test("home page nav contains a Roadmap link", async ({ page }) => {
    await page.goto("/");
    const roadmapLink = page.locator("header").getByRole("link", { name: "Roadmap" }).first();
    await expect(roadmapLink).toBeVisible();
    await expect(roadmapLink).toHaveAttribute("href", "/roadmap");
  });

  test("clicking Roadmap nav link navigates to /roadmap", async ({ page }) => {
    await page.goto("/");
    const roadmapLink = page.locator("header").getByRole("link", { name: "Roadmap" }).first();
    await roadmapLink.click();
    await expect(page).toHaveURL(/\/roadmap/);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });
});

test.describe("Brand styling — vault-mtg-tickets#427 home page audit", () => {
  test("home page hero section renders with sapphire accent in headline", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    // Check the sapphire-coloured span ("Every draft.") is rendered
    await expect(page.getByText("Every draft.")).toBeVisible();
  });

  test("home page Stats section renders with § 03 · Statistics eyebrow", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByText(/§ 03 · Statistics/i)).toBeVisible();
  });

  test("Stats section shows honest pre-launch figures", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByText("30,000+")).toBeVisible();
    await expect(page.getByText("Aug 2026")).toBeVisible();
    await expect(page.getByText("Free")).toBeVisible();
  });

  test("CTA section § 05 · Begin is present with waitlist form", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByText(/§ 05 · Begin/i)).toBeVisible();
    const emailInput = page.getByLabel("Email address");
    await expect(emailInput).toBeVisible();
  });

  test("home page does not render amber (#F5A623) accent in page source", async ({ page }) => {
    await page.goto("/");
    const content = await page.content();
    // Amber accent must not appear in rendered HTML
    expect(content).not.toContain("F5A623");
  });

  test("home page does not render Sora font references", async ({ page }) => {
    await page.goto("/");
    const content = await page.content();
    // The marketing site should not use the SPA-only Sora font
    expect(content.toLowerCase()).not.toContain("sora");
  });
});
