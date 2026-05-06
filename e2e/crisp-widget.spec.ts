import { test, expect } from "@playwright/test";

const waitForCrisp = (page: import("@playwright/test").Page) =>
  page.waitForFunction(
    () =>
      typeof (window as unknown as Record<string, unknown>).CRISP_WEBSITE_ID ===
      "string",
    { timeout: 10_000 }
  );

test.describe("Crisp chat widget", () => {
  test("widget script is injected into the page", async ({ page }) => {
    await page.goto("/");
    await waitForCrisp(page);

    const crispScriptPresent = await page.evaluate(() => {
      return (
        typeof (window as unknown as Record<string, unknown>).CRISP_WEBSITE_ID ===
        "string"
      );
    });

    expect(crispScriptPresent).toBe(true);
  });

  test("CRISP_WEBSITE_ID matches expected value", async ({ page }) => {
    await page.goto("/");
    await waitForCrisp(page);

    const websiteId = await page.evaluate(() => {
      return (window as unknown as Record<string, unknown>)
        .CRISP_WEBSITE_ID as string;
    });

    expect(websiteId).toBe("47bd78ac-6489-4923-9c7b-66021a36bf83");
  });

  test("widget script present on download page", async ({ page }) => {
    await page.goto("/download");
    await waitForCrisp(page);

    const crispScriptPresent = await page.evaluate(() => {
      return (
        typeof (window as unknown as Record<string, unknown>).CRISP_WEBSITE_ID ===
        "string"
      );
    });

    expect(crispScriptPresent).toBe(true);
  });

  test("crisp globals initialised (CRISP_WEBSITE_ID set and $crisp exists)", async ({
    page,
  }) => {
    await page.goto("/");
    await waitForCrisp(page);

    const crispInitialized = await page.evaluate(() => {
      const w = window as unknown as Record<string, unknown>;
      return (
        typeof w.CRISP_WEBSITE_ID === "string" && w.$crisp !== undefined
      );
    });

    expect(crispInitialized).toBe(true);
  });
});
