/**
 * Component tests for Hero — Compendium editorial rewrite (#315 PR2).
 *
 * Running: npm run test
 */

import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import Hero from "../Hero";

afterEach(cleanup);

describe("Hero — Compendium editorial rewrite (PR2)", () => {
  it("renders the section with id='compendium'", () => {
    const { container } = render(<Hero />);
    const section = container.querySelector("section#compendium");
    expect(section).toBeTruthy();
  });

  it("renders the EARLY ACCESS eyebrow text", () => {
    render(<Hero />);
    const eyebrow = screen.getByText(/EARLY ACCESS · CHAPTER ONE/i);
    expect(eyebrow).toBeTruthy();
  });

  it("renders the main headline words", () => {
    render(<Hero />);
    const h1 = screen.getByRole("heading", { level: 1 });
    expect(h1.textContent).toContain("Your edge.");
    expect(h1.textContent).toContain("Every draft.");
    expect(h1.textContent).toContain("Every match.");
  });

  it("renders the serif italic h1 in Cormorant Garamond", () => {
    render(<Hero />);
    const h1 = screen.getByRole("heading", { level: 1 });
    expect(h1.style.fontFamily).toContain("Cormorant Garamond");
    expect(h1.style.fontStyle).toBe("italic");
  });

  it("renders the 'Begin the draft' primary CTA linking to #begin", () => {
    render(<Hero />);
    const cta = screen.getByText(/Begin the draft/);
    const link = cta.closest("a");
    expect(link?.getAttribute("href")).toBe("#begin");
  });

  it("renders the 'Read the compendium' secondary CTA linking to #compendium", () => {
    render(<Hero />);
    const cta = screen.getByText(/Read the compendium/);
    const link = cta.closest("a");
    expect(link?.getAttribute("href")).toBe("#compendium");
  });

  it("renders the bottom rail flavour text", () => {
    render(<Hero />);
    expect(screen.getByText(/Blue \(U\) · Knowledge · Analysis · Foresight/i)).toBeTruthy();
  });

  it("renders the ManaWheel SVG", () => {
    const { container } = render(<Hero />);
    const svg = container.querySelector("svg");
    expect(svg).toBeTruthy();
    // The wheel has aria-hidden since it is purely decorative
    expect(svg?.getAttribute("aria-hidden")).toBe("true");
  });

  it("does not retain amber accent colours in markup", () => {
    const { container } = render(<Hero />);
    expect(container.innerHTML).not.toContain("F5A623");
    expect(container.innerHTML).not.toContain("F7BA58");
  });

  it("does not render the old badge element", () => {
    render(<Hero />);
    // Old hero had 'Early Access — Free during beta' in a badge pill
    expect(
      screen.queryByText("Early Access — Free during beta"),
    ).toBeNull();
  });
});
