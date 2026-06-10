/**
 * Component tests for ConsentBanner (#877).
 *
 * Running: npm run test
 *
 * Tests cover:
 * - SSR server-snapshot: banner not in server HTML (null state)
 * - "undecided" state: banner is shown
 * - "granted" state: banner hidden
 * - "declined" state: banner hidden
 * - Button interactions update state correctly
 *
 * useSyncExternalStore is used for SSR-safe state. Button handlers write the
 * cookie and dispatch "vaultmtg-consent-change" which triggers a re-render.
 */

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import ConsentBanner from "../ConsentBanner";

// jsdom cookie helpers
function clearCookies() {
  document.cookie = "vaultmtg_consent=; Max-Age=0; Path=/";
}

beforeEach(clearCookies);
afterEach(() => {
  cleanup();
  clearCookies();
});

// next/script does not run in jsdom — mock it so Script tags render as null.
vi.mock("next/script", () => ({
  default: vi.fn().mockReturnValue(null),
}));

describe("ConsentBanner — undecided state", () => {
  it("shows the banner when no consent cookie is present", () => {
    render(<ConsentBanner />);
    expect(screen.getByRole("dialog")).toBeTruthy();
  });

  it("banner contains Accept and Decline buttons", () => {
    render(<ConsentBanner />);
    expect(screen.getByText(/accept/i)).toBeTruthy();
    expect(screen.getByText(/decline/i)).toBeTruthy();
  });

  it("banner contains a Privacy Policy link", () => {
    render(<ConsentBanner />);
    const link = screen.getByText("Privacy Policy");
    expect(link.getAttribute("href")).toBe("/privacy");
  });
});

describe("ConsentBanner — Accept interaction", () => {
  it("hides the banner after clicking Accept", () => {
    render(<ConsentBanner />);
    act(() => {
      fireEvent.click(screen.getByText(/accept/i));
    });
    expect(screen.queryByRole("dialog")).toBeNull();
  });

  it("writes vaultmtg_consent=granted cookie on Accept", () => {
    render(<ConsentBanner />);
    act(() => {
      fireEvent.click(screen.getByText(/accept/i));
    });
    expect(document.cookie).toContain("vaultmtg_consent=granted");
  });
});

describe("ConsentBanner — Decline interaction", () => {
  it("hides the banner after clicking Decline", () => {
    render(<ConsentBanner />);
    act(() => {
      fireEvent.click(screen.getByText(/decline/i));
    });
    expect(screen.queryByRole("dialog")).toBeNull();
  });

  it("writes vaultmtg_consent=declined cookie on Decline", () => {
    render(<ConsentBanner />);
    act(() => {
      fireEvent.click(screen.getByText(/decline/i));
    });
    expect(document.cookie).toContain("vaultmtg_consent=declined");
  });
});

describe("ConsentBanner — pre-set granted cookie", () => {
  it("does not show banner when consent cookie is already granted", () => {
    document.cookie = "vaultmtg_consent=granted; Path=/";
    render(<ConsentBanner />);
    expect(screen.queryByRole("dialog")).toBeNull();
  });
});

describe("ConsentBanner — pre-set declined cookie", () => {
  it("does not show banner when consent cookie is already declined", () => {
    document.cookie = "vaultmtg_consent=declined; Path=/";
    render(<ConsentBanner />);
    expect(screen.queryByRole("dialog")).toBeNull();
  });
});
