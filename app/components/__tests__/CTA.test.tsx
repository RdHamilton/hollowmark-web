/**
 * Component tests for CTA — "Begin" Compendium editorial rewrite (#315 PR5).
 *
 * Running: npm run test
 */

import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render, screen, fireEvent } from "@testing-library/react";
import CTA from "../CTA";

afterEach(cleanup);

describe("CTA — Begin section (#315 PR5)", () => {
  // ── Section structure ──────────────────────────────────────────────────────

  it("renders the #begin section anchor (not #cta)", () => {
    const { container } = render(<CTA />);
    const section = container.querySelector("#begin");
    expect(section).toBeTruthy();
    expect(section?.tagName.toLowerCase()).toBe("section");
    // Old amber-era id must be gone
    expect(container.querySelector("#cta")).toBeNull();
  });

  it("renders the § 05 · Begin eyebrow marker", () => {
    render(<CTA />);
    expect(screen.getByText(/§ 05 · Begin/i)).toBeTruthy();
  });

  it("renders the 'Ready to draft smarter?' display heading", () => {
    render(<CTA />);
    const h2 = screen.getByRole("heading", { level: 2 });
    expect(h2.textContent).toContain("Ready to draft");
    expect(h2.textContent).toContain("smarter?");
  });

  it("renders the CTA deck copy", () => {
    render(<CTA />);
    expect(screen.getByText(/Join the waitlist/i)).toBeTruthy();
  });

  // ── Form and interactions ──────────────────────────────────────────────────

  it("renders the email input with id email-begin", () => {
    render(<CTA />);
    const input = screen.getByLabelText("Email address");
    expect(input).toBeTruthy();
    expect((input as HTMLInputElement).id).toBe("email-begin");
    expect((input as HTMLInputElement).type).toBe("email");
  });

  it("renders the submit button with 'Begin the draft' text", () => {
    render(<CTA />);
    const btn = screen.getByRole("button", { name: /Begin the draft/i });
    expect(btn).toBeTruthy();
    expect(btn.getAttribute("type")).toBe("submit");
  });

  it("shows validation error for an invalid email", () => {
    render(<CTA />);
    const input = screen.getByLabelText("Email address") as HTMLInputElement;
    const btn = screen.getByRole("button", { name: /Begin the draft/i });
    fireEvent.change(input, { target: { value: "not-an-email" } });
    fireEvent.click(btn);
    expect(screen.getByRole("alert").textContent).toContain("valid email");
  });

  it("shows success state after valid submission", () => {
    render(<CTA />);
    const input = screen.getByLabelText("Email address") as HTMLInputElement;
    const btn = screen.getByRole("button", { name: /Begin the draft/i });
    fireEvent.change(input, { target: { value: "test@example.com" } });
    fireEvent.click(btn);
    const status = screen.getByRole("status");
    expect(status.textContent).toContain("on the list");
    // Form is removed after submission
    expect(screen.queryByRole("button")).toBeNull();
  });

  // ── Platform pills ──────────────────────────────────────────────────────────

  it("renders macOS and Windows platform pills", () => {
    render(<CTA />);
    expect(screen.getByText("macOS")).toBeTruthy();
    expect(screen.getByText("Windows")).toBeTruthy();
  });

  // ── Typography & brand compliance ──────────────────────────────────────────

  it("does not retain the amber accent (#F5A623) in markup", () => {
    const { container } = render(<CTA />);
    expect(container.innerHTML).not.toContain("F5A623");
    expect(container.innerHTML).not.toContain("F7BA58");
    expect(container.innerHTML).not.toContain("C8841A");
  });

  it("does not use raw sapphire hex #4A90D9 as a literal color value in style props", () => {
    const { container } = render(<CTA />);
    // Token aliases (var(--color-...)) must be used instead of bare hex for
    // the primary sapphire and related palette entries (#344/#346).
    // Exception: rgba() with the same colour-channel values embedded in glow
    // backgrounds is allowed as there is no alias for those alpha variants.
    const html = container.innerHTML;
    // Direct color:#4A90D9 usage should not appear; tokens cover it
    expect(html).not.toMatch(/color:\s*#4A90D9/i);
    expect(html).not.toMatch(/color:\s*#7CB5F0/i);
  });

  it("uses Cormorant Garamond for the h2 display heading", () => {
    const { container } = render(<CTA />);
    const h2 = container.querySelector("h2");
    expect(h2?.getAttribute("style")).toContain("Cormorant Garamond");
  });

  it("uses JetBrains Mono for the eyebrow", () => {
    const { container } = render(<CTA />);
    // The eyebrow div carries JetBrains Mono
    const monoEls = container.querySelectorAll("[style*='JetBrains Mono']");
    expect(monoEls.length).toBeGreaterThan(0);
  });

  // ── textWrap (#347) ────────────────────────────────────────────────────────

  it("applies textWrap:balance to the h2 display heading", () => {
    const { container } = render(<CTA />);
    const h2 = container.querySelector("h2");
    // jsdom renders textWrap as a CSS prop but we assert on the style attribute string
    expect(h2?.getAttribute("style")).toContain("balance");
  });

  it("applies textWrap:pretty to the deck copy paragraph", () => {
    render(<CTA />);
    const deck = screen.getByText(/Join the waitlist/i);
    expect(deck.getAttribute("style")).toContain("pretty");
  });
});
