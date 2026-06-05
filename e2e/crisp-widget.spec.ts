/**
 * E2E regression: Crisp chat widget removal (vault-mtg-tickets#860).
 *
 * Crisp was removed to reduce GDPR vendor DPA scope (Ramone, 2026-06-05).
 * These tests confirm the widget is NOT injected anywhere on the site so
 * it cannot accidentally be re-added without CI catching it.
 */

import { test, expect } from "@playwright/test";

test.describe("Crisp chat widget removal (#860)", () => {
  test("CRISP_WEBSITE_ID is NOT set on window (homepage)", async ({ page }) => {
    await page.goto("/");
    // Give scripts a moment to execute — we are asserting absence, not presence
    await page.waitForLoadState("networkidle");

    const crispPresent = await page.evaluate(() => {
      const w = window as unknown as Record<string, unknown>;
      return w.CRISP_WEBSITE_ID !== undefined || w.$crisp !== undefined;
    });

    expect(crispPresent).toBe(false);
  });

  test("No request to client.crisp.chat is made (homepage)", async ({
    page,
  }) => {
    const crispRequests: string[] = [];
    page.on("request", (req) => {
      if (req.url().includes("crisp.chat")) {
        crispRequests.push(req.url());
      }
    });

    await page.goto("/");
    await page.waitForLoadState("networkidle");

    expect(crispRequests).toHaveLength(0);
  });

  test("CRISP_WEBSITE_ID is NOT set on window (download page)", async ({
    page,
  }) => {
    await page.goto("/download");
    await page.waitForLoadState("networkidle");

    const crispPresent = await page.evaluate(() => {
      const w = window as unknown as Record<string, unknown>;
      return w.CRISP_WEBSITE_ID !== undefined || w.$crisp !== undefined;
    });

    expect(crispPresent).toBe(false);
  });
});
