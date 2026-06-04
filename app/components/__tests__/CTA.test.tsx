/**
 * Component tests for CTA — "Begin" Compendium editorial rewrite (#315 PR5).
 * Updated for #417: live waitlist form with BFF POST + position counter.
 *
 * Running: npm run test
 */

import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen, fireEvent, waitFor, act } from "@testing-library/react";
import CTA from "../CTA";
import * as waitlistApi from "../../../lib/waitlistApi";

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

// ── Helpers ────────────────────────────────────────────────────────────────────

function renderCTA() {
  return render(<CTA />);
}

function getEmailInput() {
  return screen.getByLabelText("Email address") as HTMLInputElement;
}

function getSubmitButton() {
  return screen.getByRole("button", { name: /Begin the draft/i });
}

// ── Section structure ──────────────────────────────────────────────────────────

describe("CTA — Begin section (#315 PR5)", () => {
  it("renders the #begin section anchor (not #cta)", () => {
    const { container } = renderCTA();
    const section = container.querySelector("#begin");
    expect(section).toBeTruthy();
    expect(section?.tagName.toLowerCase()).toBe("section");
    expect(container.querySelector("#cta")).toBeNull();
  });

  it("renders the § 05 · Begin eyebrow marker", () => {
    renderCTA();
    expect(screen.getByText(/§ 05 · Begin/i)).toBeTruthy();
  });

  it("renders the 'Ready to draft smarter?' display heading", () => {
    renderCTA();
    const h2 = screen.getByRole("heading", { level: 2 });
    expect(h2.textContent).toContain("Ready to draft");
    expect(h2.textContent).toContain("smarter?");
  });

  it("renders the CTA deck copy", () => {
    renderCTA();
    expect(screen.getByText(/Join the waitlist/i)).toBeTruthy();
  });

  // ── Form and interactions ────────────────────────────────────────────────────

  it("renders the email input with id email-begin", () => {
    renderCTA();
    const input = getEmailInput();
    expect(input).toBeTruthy();
    expect(input.id).toBe("email-begin");
    expect(input.type).toBe("email");
  });

  it("renders the submit button with 'Begin the draft' text", () => {
    renderCTA();
    const btn = getSubmitButton();
    expect(btn).toBeTruthy();
    expect(btn.getAttribute("type")).toBe("submit");
  });

  it("shows validation error for an invalid email without calling the API", async () => {
    const spy = vi.spyOn(waitlistApi, "submitWaitlist");
    renderCTA();
    fireEvent.change(getEmailInput(), { target: { value: "not-an-email" } });
    fireEvent.click(getSubmitButton());
    expect(screen.getByRole("alert").textContent).toContain("valid email");
    expect(spy).not.toHaveBeenCalled();
  });

  // ── Loading state ──────────────────────────────────────────────────────────

  it("shows loading state on the button while the API call is in-flight", async () => {
    // Never resolves during this test — we just assert the in-flight label
    vi.spyOn(waitlistApi, "submitWaitlist").mockReturnValue(new Promise(() => {}));
    renderCTA();
    fireEvent.change(getEmailInput(), { target: { value: "test@example.com" } });
    fireEvent.click(getSubmitButton());
    // Button text changes to "Joining…" while loading
    expect(screen.getByRole("button").textContent).toContain("Joining");
    expect((screen.getByRole("button") as HTMLButtonElement).disabled).toBe(true);
  });

  // ── Success state ──────────────────────────────────────────────────────────

  it("shows success state with position after valid submission", async () => {
    vi.spyOn(waitlistApi, "submitWaitlist").mockResolvedValue({ ok: true, position: 42 });
    renderCTA();
    fireEvent.change(getEmailInput(), { target: { value: "test@example.com" } });
    await act(async () => {
      fireEvent.click(getSubmitButton());
    });
    await waitFor(() => {
      const status = screen.getByRole("status");
      expect(status.textContent).toContain("on the list");
      expect(status.textContent).toContain("#42");
    });
    // Form is removed after submission
    expect(screen.queryByRole("button")).toBeNull();
  });

  it("calls submitWaitlist with the typed email", async () => {
    const spy = vi
      .spyOn(waitlistApi, "submitWaitlist")
      .mockResolvedValue({ ok: true, position: 1 });
    renderCTA();
    fireEvent.change(getEmailInput(), { target: { value: "hello@example.com" } });
    await act(async () => {
      fireEvent.click(getSubmitButton());
    });
    await waitFor(() => expect(spy).toHaveBeenCalledWith("hello@example.com"));
  });

  it("shows the position returned by the BFF (not a client-computed value)", async () => {
    // Ensure position is displayed exactly as returned — server is authoritative
    vi.spyOn(waitlistApi, "submitWaitlist").mockResolvedValue({ ok: true, position: 137 });
    renderCTA();
    fireEvent.change(getEmailInput(), { target: { value: "a@b.com" } });
    await act(async () => {
      fireEvent.click(getSubmitButton());
    });
    await waitFor(() => {
      expect(screen.getByRole("status").textContent).toContain("#137");
    });
  });

  // ── Error states ───────────────────────────────────────────────────────────

  it("shows an error message on API failure", async () => {
    vi.spyOn(waitlistApi, "submitWaitlist").mockResolvedValue({
      ok: false,
      error: "Something went wrong. Please try again.",
    });
    renderCTA();
    fireEvent.change(getEmailInput(), { target: { value: "test@example.com" } });
    await act(async () => {
      fireEvent.click(getSubmitButton());
    });
    await waitFor(() => {
      expect(screen.getByRole("alert").textContent).toContain("Please try again");
    });
    // Form remains visible — user can retry
    expect(screen.queryByRole("button", { name: /Begin the draft/i })).toBeTruthy();
  });

  it("shows an error message on duplicate email (409)", async () => {
    vi.spyOn(waitlistApi, "submitWaitlist").mockResolvedValue({
      ok: false,
      error: "This email is already registered.",
    });
    renderCTA();
    fireEvent.change(getEmailInput(), { target: { value: "duplicate@example.com" } });
    await act(async () => {
      fireEvent.click(getSubmitButton());
    });
    await waitFor(() => {
      expect(screen.getByRole("alert").textContent).toContain("already registered");
    });
  });

  it("shows a network error message when fetch throws", async () => {
    vi.spyOn(waitlistApi, "submitWaitlist").mockResolvedValue({
      ok: false,
      error: "Network error. Please try again.",
    });
    renderCTA();
    fireEvent.change(getEmailInput(), { target: { value: "test@example.com" } });
    await act(async () => {
      fireEvent.click(getSubmitButton());
    });
    await waitFor(() => {
      expect(screen.getByRole("alert").textContent).toContain("Network error");
    });
  });

  it("re-enables the button after an API error (user can retry)", async () => {
    vi.spyOn(waitlistApi, "submitWaitlist").mockResolvedValue({
      ok: false,
      error: "Something went wrong. Please try again.",
    });
    renderCTA();
    fireEvent.change(getEmailInput(), { target: { value: "test@example.com" } });
    await act(async () => {
      fireEvent.click(getSubmitButton());
    });
    await waitFor(() => {
      const btn = screen.getByRole("button", { name: /Begin the draft/i }) as HTMLButtonElement;
      expect(btn.disabled).toBe(false);
    });
  });

  // ── Platform pills ──────────────────────────────────────────────────────────

  it("renders macOS and Windows platform pills", () => {
    renderCTA();
    expect(screen.getByText("macOS")).toBeTruthy();
    expect(screen.getByText("Windows")).toBeTruthy();
  });

  // ── Typography & brand compliance ──────────────────────────────────────────

  it("does not retain the amber accent (#F5A623) in markup", () => {
    const { container } = renderCTA();
    expect(container.innerHTML).not.toContain("F5A623");
    expect(container.innerHTML).not.toContain("F7BA58");
    expect(container.innerHTML).not.toContain("C8841A");
  });

  it("does not use raw sapphire hex #4A90D9 as a literal color value in style props", () => {
    const { container } = renderCTA();
    const html = container.innerHTML;
    expect(html).not.toMatch(/color:\s*#4A90D9/i);
    expect(html).not.toMatch(/color:\s*#7CB5F0/i);
  });

  it("uses Cormorant Garamond for the h2 display heading", () => {
    const { container } = renderCTA();
    const h2 = container.querySelector("h2");
    expect(h2?.getAttribute("style")).toContain("Cormorant Garamond");
  });

  it("uses JetBrains Mono for the eyebrow", () => {
    const { container } = renderCTA();
    const monoEls = container.querySelectorAll("[style*='JetBrains Mono']");
    expect(monoEls.length).toBeGreaterThan(0);
  });

  // ── textWrap (#347) ──────────────────────────────────────────────────────────

  it("applies textWrap:balance to the h2 display heading", () => {
    const { container } = renderCTA();
    const h2 = container.querySelector("h2");
    expect(h2?.getAttribute("style")).toContain("balance");
  });

  it("applies textWrap:pretty to the deck copy paragraph", () => {
    renderCTA();
    const deck = screen.getByText(/Join the waitlist/i);
    expect(deck.getAttribute("style")).toContain("pretty");
  });
});
