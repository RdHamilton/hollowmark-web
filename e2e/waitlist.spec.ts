/**
 * E2E tests for the waitlist signup form (#417).
 *
 * The BFF endpoint (POST /api/v1/waitlist) does not exist yet — it is being
 * built as a coupled ticket. These tests intercept the cross-origin fetch so
 * they run standalone without the BFF.
 *
 * When the BFF is live, the final staging verification run against
 * api.vaultmtg.app exercises the real endpoint (no mocking).
 */

import { test, expect } from "@playwright/test";

const WAITLIST_URL = "**/api/v1/waitlist";

test.describe("Waitlist form (#417)", () => {
  // ── Happy path ─────────────────────────────────────────────────────────────

  test("submits email and shows success state with position", async ({ page }) => {
    await page.route(WAITLIST_URL, (route) => {
      route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ position: 42 }),
      });
    });

    await page.goto("/#begin");
    const input = page.locator("#email-begin");
    await expect(input).toBeVisible();

    await input.fill("test@example.com");
    await page.getByRole("button", { name: /Begin the draft/i }).click();

    // Success state appears
    const status = page.getByRole("status");
    await expect(status).toBeVisible();
    await expect(status).toContainText("on the list");
    await expect(status).toContainText("#42");

    // Form is removed
    await expect(page.getByRole("button", { name: /Begin the draft/i })).not.toBeVisible();
  });

  test("shows loading label on the button while fetch is in-flight", async ({ page }) => {
    // Delay the response so the in-flight state is observable
    await page.route(WAITLIST_URL, async (route) => {
      await new Promise((resolve) => setTimeout(resolve, 300));
      route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ position: 7 }),
      });
    });

    await page.goto("/#begin");
    await page.locator("#email-begin").fill("loading@example.com");
    await page.getByRole("button", { name: /Begin the draft/i }).click();

    // Button should show loading text while the request is pending
    await expect(page.getByRole("button", { name: /Joining/i })).toBeVisible();

    // Then success
    await expect(page.getByRole("status")).toContainText("on the list");
  });

  // ── Error paths ────────────────────────────────────────────────────────────

  test("shows error message when the BFF returns a 400", async ({ page }) => {
    await page.route(WAITLIST_URL, (route) => {
      route.fulfill({
        status: 400,
        contentType: "application/json",
        body: JSON.stringify({ error: "Invalid email address." }),
      });
    });

    await page.goto("/#begin");
    await page.locator("#email-begin").fill("bad@example.com");
    await page.getByRole("button", { name: /Begin the draft/i }).click();

    await expect(page.getByRole("alert")).toContainText("Invalid email");
    // Form still visible — user can retry
    await expect(page.getByRole("button", { name: /Begin the draft/i })).toBeVisible();
  });

  test("shows error message when email is already registered (409)", async ({ page }) => {
    await page.route(WAITLIST_URL, (route) => {
      route.fulfill({
        status: 409,
        contentType: "application/json",
        body: JSON.stringify({ error: "This email is already registered." }),
      });
    });

    await page.goto("/#begin");
    await page.locator("#email-begin").fill("duplicate@example.com");
    await page.getByRole("button", { name: /Begin the draft/i }).click();

    await expect(page.getByRole("alert")).toContainText("already registered");
  });

  test("shows error message on network failure", async ({ page }) => {
    await page.route(WAITLIST_URL, (route) => {
      route.abort("failed");
    });

    await page.goto("/#begin");
    await page.locator("#email-begin").fill("test@example.com");
    await page.getByRole("button", { name: /Begin the draft/i }).click();

    await expect(page.getByRole("alert")).toContainText("Network error");
  });

  // ── Client-side validation ─────────────────────────────────────────────────

  test("shows validation error for an invalid email without calling the BFF", async ({ page }) => {
    let apiCalled = false;
    await page.route(WAITLIST_URL, (route) => {
      apiCalled = true;
      route.continue();
    });

    await page.goto("/#begin");
    await page.locator("#email-begin").fill("not-an-email");
    await page.getByRole("button", { name: /Begin the draft/i }).click();

    await expect(page.getByRole("alert")).toContainText("valid email");
    expect(apiCalled).toBe(false);
  });

  // ── Position display ───────────────────────────────────────────────────────

  test("displays the server-returned position (not a client-computed value)", async ({ page }) => {
    // The BFF is authoritative — test with a non-trivial position value
    await page.route(WAITLIST_URL, (route) => {
      route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ position: 2048 }),
      });
    });

    await page.goto("/#begin");
    await page.locator("#email-begin").fill("ranked@example.com");
    await page.getByRole("button", { name: /Begin the draft/i }).click();

    await expect(page.getByRole("status")).toContainText("#2048");
  });
});
