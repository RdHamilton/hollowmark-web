/**
 * Component tests for Features — Compendium editorial rewrite (#315 PR3).
 *
 * Running: npm run test
 */

import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import Features from "../Features";

afterEach(cleanup);

describe("Features — Compendium chapters (#315 PR3)", () => {
  // ── Section structure ──────────────────────────────────────────────────────

  it("renders the #compendium section anchor", () => {
    const { container } = render(<Features />);
    const section = container.querySelector("#compendium");
    expect(section).toBeTruthy();
    expect(section?.tagName.toLowerCase()).toBe("section");
  });

  it("renders the § 02 · The Compendium eyebrow marker", () => {
    render(<Features />);
    expect(screen.getByText(/§ 02 · The Compendium/i)).toBeTruthy();
  });

  it("renders the section display heading", () => {
    render(<Features />);
    // The heading is split across two lines in JSX — look for the h2
    const heading = screen.getByRole("heading", { level: 2 });
    expect(heading.textContent).toContain("Five colors, five virtues, five");
    expect(heading.textContent).toContain("parts of the same study.");
  });

  // ── Chapter count ──────────────────────────────────────────────────────────

  it("renders exactly five chapter articles (one per MTG color)", () => {
    const { container } = render(<Features />);
    const articles = container.querySelectorAll("article");
    expect(articles.length).toBe(5);
  });

  it("renders five chapter h3 headings", () => {
    render(<Features />);
    const headings = screen.getAllByRole("heading", { level: 3 });
    expect(headings.length).toBe(5);
  });

  // ── Chapter content ────────────────────────────────────────────────────────

  it("renders Chapter I — White (W) · Order", () => {
    render(<Features />);
    // Use getAllByText for roman numerals — "Chapter I" is a substring of "Chapter II/III/IV"
    const chapterIs = screen.getAllByText(/^Chapter I$/);
    expect(chapterIs.length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText(/White \(W\) · Order/)).toBeTruthy();
    expect(
      screen.getByRole("heading", { name: /a library that updates itself/i }),
    ).toBeTruthy();
  });

  it("renders Chapter II — Blue (U) · Insight", () => {
    render(<Features />);
    expect(screen.getByText(/^Chapter II$/)).toBeTruthy();
    expect(screen.getByText(/Blue \(U\) · Insight/)).toBeTruthy();
    expect(
      screen.getByRole("heading", { name: /knowing what comes next/i }),
    ).toBeTruthy();
  });

  it("renders Chapter III — Black (B) · Ambition", () => {
    render(<Features />);
    expect(screen.getByText(/^Chapter III$/)).toBeTruthy();
    expect(screen.getByText(/Black \(B\) · Ambition/)).toBeTruthy();
    expect(
      screen.getByRole("heading", { name: /the cost of every choice/i }),
    ).toBeTruthy();
  });

  it("renders Chapter IV — Red (R) · Instinct", () => {
    render(<Features />);
    expect(screen.getByText(/^Chapter IV$/)).toBeTruthy();
    expect(screen.getByText(/Red \(R\) · Instinct/)).toBeTruthy();
    expect(
      screen.getByRole("heading", { name: /decisions in seconds/i }),
    ).toBeTruthy();
  });

  it("renders Chapter V — Green (G) · Growth", () => {
    render(<Features />);
    expect(screen.getByText(/^Chapter V$/)).toBeTruthy();
    expect(screen.getByText(/Green \(G\) · Growth/)).toBeTruthy();
    expect(
      screen.getByRole("heading", { name: /the arc of every player/i }),
    ).toBeTruthy();
  });

  // ── Per-chapter stat values ────────────────────────────────────────────────

  it("renders the 30,000+ cards-rated stat for Chapter I", () => {
    render(<Features />);
    expect(screen.getByText("30,000+")).toBeTruthy();
    expect(screen.getByText("cards rated")).toBeTruthy();
  });

  it("renders the +8% win-rate lift stat for Chapter II", () => {
    render(<Features />);
    expect(screen.getByText("+8%")).toBeTruthy();
    expect(screen.getByText("win-rate lift")).toBeTruthy();
  });

  it("renders the 500K+ drafts tracked stat for Chapter III", () => {
    render(<Features />);
    expect(screen.getByText("500K+")).toBeTruthy();
    expect(screen.getByText("drafts tracked")).toBeTruthy();
  });

  it("renders the 2.4s saved-per-pick stat for Chapter IV", () => {
    render(<Features />);
    expect(screen.getByText("2.4s")).toBeTruthy();
    expect(screen.getByText("saved per pick")).toBeTruthy();
  });

  it("renders the 847 active players stat for Chapter V", () => {
    render(<Features />);
    expect(screen.getByText("847")).toBeTruthy();
    expect(screen.getByText("active players")).toBeTruthy();
  });

  // ── Flavor-text blockquotes ────────────────────────────────────────────────

  it("renders five flavor-text blockquotes", () => {
    const { container } = render(<Features />);
    const quotes = container.querySelectorAll("blockquote");
    expect(quotes.length).toBe(5);
  });

  it("includes the White chapter flavor text", () => {
    render(<Features />);
    expect(
      screen.getByText(/What was unknown becomes known/),
    ).toBeTruthy();
  });

  it("includes the Blue chapter flavor text", () => {
    render(<Features />);
    expect(
      screen.getByText(/The draft is decided before the timer starts/),
    ).toBeTruthy();
  });

  // ── Typography & brand hygiene ─────────────────────────────────────────────

  it("does not retain the amber accent (#F5A623) anywhere in markup", () => {
    const { container } = render(<Features />);
    expect(container.innerHTML).not.toContain("F5A623");
  });

  it("does not retain Sora font references", () => {
    const { container } = render(<Features />);
    expect(container.innerHTML.toLowerCase()).not.toContain("sora");
  });

  it("does not retain the old 2×2 SaaS grid class names", () => {
    const { container } = render(<Features />);
    // The old component used `sm:grid-cols-2 lg:grid-cols-2`
    expect(container.innerHTML).not.toContain("grid-cols-2");
  });

  it("uses Cormorant Garamond for chapter headings", () => {
    const { container } = render(<Features />);
    // h3 elements should carry the editorial font inline
    const h3s = container.querySelectorAll("h3");
    expect(h3s.length).toBeGreaterThan(0);
    h3s.forEach((h) => {
      expect(h.getAttribute("style")).toContain("Cormorant Garamond");
    });
  });

  it("uses JetBrains Mono for the § 02 eyebrow", () => {
    const { container } = render(<Features />);
    const eyebrow = container.querySelector("[style*='JetBrains Mono']");
    expect(eyebrow).toBeTruthy();
  });

  // ── Orbs ──────────────────────────────────────────────────────────────────

  it("renders five SVG orbs (one per chapter)", () => {
    const { container } = render(<Features />);
    const svgs = container.querySelectorAll("svg");
    // 5 orb SVGs, one per chapter
    expect(svgs.length).toBe(5);
  });
});
