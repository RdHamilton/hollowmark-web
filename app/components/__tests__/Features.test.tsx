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

  // ── Per-chapter stat values — honest pre-launch figures ──────────────────────

  it("renders the 30,000+ cards-rated stat for Chapter I", () => {
    render(<Features />);
    expect(screen.getByText("30,000+")).toBeTruthy();
    expect(screen.getByText("cards rated")).toBeTruthy();
  });

  it("renders the A–F ratings-per-card stat for Chapter II (no inflated win-rate)", () => {
    render(<Features />);
    expect(screen.getByText("A–F")).toBeTruthy();
    expect(screen.getByText("ratings per card")).toBeTruthy();
  });

  it("renders the All matches-logged stat for Chapter III (no inflated draft count)", () => {
    render(<Features />);
    expect(screen.getByText("All")).toBeTruthy();
    expect(screen.getByText("matches logged")).toBeTruthy();
  });

  it("renders the Live pick-data stat for Chapter IV (no inflated pick-time claim)", () => {
    render(<Features />);
    expect(screen.getByText("Live")).toBeTruthy();
    expect(screen.getByText("pick data")).toBeTruthy();
  });

  it("renders the Beta / August 2026 stat for Chapter V (honest launch framing)", () => {
    render(<Features />);
    expect(screen.getByText("Beta")).toBeTruthy();
    expect(screen.getByText("August 2026")).toBeTruthy();
  });

  it("does not render the inflated +8% win-rate lift claim", () => {
    const { container } = render(<Features />);
    expect(container.innerHTML).not.toContain("+8%");
  });

  it("does not render the inflated 500K+ drafts tracked claim", () => {
    const { container } = render(<Features />);
    expect(container.innerHTML).not.toContain("500K+");
  });

  it("does not render the inflated 2.4s pick-time claim", () => {
    const { container } = render(<Features />);
    expect(container.innerHTML).not.toContain("2.4s");
  });

  it("does not render the fabricated 847 active players figure", () => {
    const { container } = render(<Features />);
    expect(container.innerHTML).not.toContain("847");
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

  // ── textWrap (#347) ────────────────────────────────────────────────────────

  it("applies textWrap:pretty to ChapterArticle body paragraphs", () => {
    const { container } = render(<Features />);
    // All chapter body <p> elements (not blockquote/flavor, not stat labels)
    // sit inside article > div and carry "pretty"
    const articles = container.querySelectorAll("article");
    articles.forEach((article) => {
      // The body copy paragraph is the one with the longest text and "pretty"
      const bodyPs = Array.from(article.querySelectorAll("p")).filter(
        (p) => (p.getAttribute("style") ?? "").includes("pretty"),
      );
      expect(bodyPs.length).toBeGreaterThanOrEqual(1);
    });
  });

  it("applies textWrap:balance to FlavorBox paragraphs", () => {
    const { container } = render(<Features />);
    // Each blockquote contains a <p> with textWrap:balance
    const blockquotes = container.querySelectorAll("blockquote");
    expect(blockquotes.length).toBe(5);
    blockquotes.forEach((bq) => {
      const p = bq.querySelector("p");
      expect(p?.getAttribute("style")).toContain("balance");
    });
  });

  // ── #692 copy-accuracy assertions (Najah-approved 2026-06-04) ─────────────

  it("Chapter II body uses GIHWR pick-rankings language, not 'synergy scores'", () => {
    const { container } = render(<Features />);
    expect(container.innerHTML).not.toContain("synergy scores");
    expect(container.innerHTML).toContain("pick rankings");
    expect(container.innerHTML).toContain("Win-rate data and pick rankings");
  });

  it("Chapter III body does not claim 'Opponent archetype' detection (unshipped)", () => {
    const { container } = render(<Features />);
    expect(container.innerHTML).not.toContain("Opponent archetype");
  });

  it("Chapter III body uses accurate match-history copy (deck mana curve + pattern)", () => {
    render(<Features />);
    // Use regex to match through the apostrophe which innerHTML encodes differently
    expect(
      screen.getByText(/Your deck.s mana curve, the turn the game turned/),
    ).toBeTruthy();
    expect(
      screen.getByText(/the pattern you never saw coming across a single session/),
    ).toBeTruthy();
  });
});
