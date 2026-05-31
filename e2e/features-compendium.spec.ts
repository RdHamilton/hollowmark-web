import { test, expect } from "@playwright/test";

test.describe("Features — Compendium editorial chapters (#315 PR3)", () => {
  test("renders the #compendium section on the home page", async ({ page }) => {
    await page.goto("/");
    const compendium = page.locator("#compendium");
    await expect(compendium).toBeVisible();
  });

  test("nav § 02 link scrolls to the compendium section", async ({ page }) => {
    await page.goto("/");
    const compendiumLink = page.getByRole("link", { name: "The Compendium" });
    await expect(compendiumLink).toBeVisible();
    await expect(compendiumLink).toHaveAttribute("href", "#compendium");
  });

  test("section shows the § 02 · The Compendium eyebrow", async ({ page }) => {
    await page.goto("/");
    await expect(
      page.locator("#compendium").getByText(/§ 02 · The Compendium/i),
    ).toBeVisible();
  });

  test("all five chapter headings are present", async ({ page }) => {
    await page.goto("/");
    const headings = page.locator("#compendium h3");
    await expect(headings).toHaveCount(5);
  });

  test("renders White chapter — Order", async ({ page }) => {
    await page.goto("/");
    await expect(
      page.locator("#compendium").getByText(/A library that updates itself/),
    ).toBeVisible();
  });

  test("renders Blue chapter — Insight", async ({ page }) => {
    await page.goto("/");
    await expect(
      page.locator("#compendium").getByText(/Knowing what comes next/),
    ).toBeVisible();
  });

  test("renders Black chapter — Ambition", async ({ page }) => {
    await page.goto("/");
    await expect(
      page.locator("#compendium").getByText(/The cost of every choice/),
    ).toBeVisible();
  });

  test("renders Red chapter — Instinct", async ({ page }) => {
    await page.goto("/");
    await expect(
      page.locator("#compendium").getByText(/Decisions in seconds/),
    ).toBeVisible();
  });

  test("renders Green chapter — Growth", async ({ page }) => {
    await page.goto("/");
    await expect(
      page.locator("#compendium").getByText(/The arc of every player/),
    ).toBeVisible();
  });

  test("no amber #F5A623 accent in the compendium section", async ({
    page,
  }) => {
    await page.goto("/");
    const html = await page.locator("#compendium").innerHTML();
    expect(html).not.toContain("F5A623");
  });

  test("renders five blockquote flavor-text elements in the compendium", async ({
    page,
  }) => {
    await page.goto("/");
    const quotes = page.locator("#compendium blockquote");
    await expect(quotes).toHaveCount(5);
  });
});
