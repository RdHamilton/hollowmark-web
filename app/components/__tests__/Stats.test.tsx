/**
 * Component tests for Stats — editorial ledger + pre-launch framing.
 *
 * Testimonials (Voices § 04) are suppressed pre-launch; no fabricated quotes
 * are shown. Honest stat entries replace inflated pre-launch figures.
 * Restore Voices with real player quotes post-beta (vault-mtg-tickets#115).
 *
 * Running: npm run test
 */

import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import Stats from "../Stats";

afterEach(cleanup);

describe("Stats — editorial ledger + pre-launch framing", () => {

  // ── Section structure ────────────────────────────────────────────────────────

  it("renders the #statistics section anchor", () => {
    const { container } = render(<Stats />);
    const section = container.querySelector("section#statistics");
    expect(section).toBeTruthy();
  });

  it("renders the § 03 · Statistics eyebrow marker", () => {
    render(<Stats />);
    expect(screen.getByText(/§ 03 · Statistics/i)).toBeTruthy();
  });

  // ── One h2 heading (Voices suppressed pre-launch) ────────────────────────────

  it("renders exactly one section display heading (Voices suppressed pre-launch)", () => {
    render(<Stats />);
    const headings = screen.getAllByRole("heading", { level: 2 });
    expect(headings.length).toBe(1);
  });

  it("renders 'Built before launch. Honest about it.' as the Statistics heading", () => {
    render(<Stats />);
    const heading = screen.getByRole("heading", { name: /built before launch\. honest about it\./i });
    expect(heading).toBeTruthy();
    expect(heading.tagName.toLowerCase()).toBe("h2");
  });

  // ── Section heading uses Cormorant Garamond italic ───────────────────────────

  it("renders the Statistics h2 in Cormorant Garamond italic", () => {
    render(<Stats />);
    const heading = screen.getByRole("heading", { name: /built before launch\. honest about it\./i });
    expect(heading.getAttribute("style")).toContain("Cormorant Garamond");
    expect(heading.getAttribute("style")).toContain("italic");
  });

  // ── Number ledger — four honest pre-launch entries ───────────────────────────

  it("renders four numeric stat values", () => {
    render(<Stats />);
    expect(screen.getByText("30,000+")).toBeTruthy();
    expect(screen.getByText("Aug 2026")).toBeTruthy();
    expect(screen.getByText("Free")).toBeTruthy();
    expect(screen.getByText("2")).toBeTruthy();
  });

  it("renders four stat labels", () => {
    render(<Stats />);
    expect(screen.getByText("cards rated")).toBeTruthy();
    expect(screen.getByText("beta launch")).toBeTruthy();
    expect(screen.getByText("during beta")).toBeTruthy();
    expect(screen.getByText("platforms")).toBeTruthy();
  });

  it("renders four stat notes (editorial marginalia)", () => {
    render(<Stats />);
    expect(screen.getByText("across all current and recent sets")).toBeTruthy();
    expect(screen.getByText("be among the first in")).toBeTruthy();
    expect(screen.getByText("no credit card required")).toBeTruthy();
    expect(screen.getByText("macOS and Windows")).toBeTruthy();
  });

  it("renders stat values with JetBrains Mono font", () => {
    const { container } = render(<Stats />);
    const monoEls = Array.from(container.querySelectorAll("[style*='JetBrains Mono']"));
    expect(monoEls.length).toBeGreaterThan(0);
  });

  // ── Voices — suppressed pre-launch; no fabricated testimonials ───────────────

  it("does not render any testimonial blockquotes pre-launch", () => {
    const { container } = render(<Stats />);
    const blockquotes = container.querySelectorAll("blockquote");
    expect(blockquotes.length).toBe(0);
  });

  it("does not render the fabricated Sable_Raven username", () => {
    const { container } = render(<Stats />);
    expect(container.innerHTML).not.toContain("Sable_Raven");
  });

  it("does not render the fabricated DraftKingMTG username", () => {
    const { container } = render(<Stats />);
    expect(container.innerHTML).not.toContain("DraftKingMTG");
  });

  it("does not render the fabricated Aetherborn_7 username", () => {
    const { container } = render(<Stats />);
    expect(container.innerHTML).not.toContain("Aetherborn_7");
  });

  it("does not render the inflated 500K+ drafts tracked claim", () => {
    const { container } = render(<Stats />);
    expect(container.innerHTML).not.toContain("500K+");
  });

  it("does not render the inflated +8% win-rate lift claim", () => {
    const { container } = render(<Stats />);
    expect(container.innerHTML).not.toContain("+8%");
  });

  it("does not render the inflated 2.4s pick-time claim", () => {
    const { container } = render(<Stats />);
    expect(container.innerHTML).not.toContain("2.4s");
  });

  // ── Three-flower ornamental break ────────────────────────────────────────────

  it("renders the ornamental three-flower break (aria-hidden)", () => {
    const { container } = render(<Stats />);
    const ornament = container.querySelector("[aria-hidden='true']");
    expect(ornament).toBeTruthy();
  });

  // ── Brand hygiene ────────────────────────────────────────────────────────────

  it("does not retain the amber accent (#F5A623) anywhere in markup", () => {
    const { container } = render(<Stats />);
    expect(container.innerHTML).not.toContain("F5A623");
  });

  it("does not retain Sora font references", () => {
    const { container } = render(<Stats />);
    expect(container.innerHTML.toLowerCase()).not.toContain("sora");
  });

  it("does not retain the legacy rounded-xl testimonial class", () => {
    const { container } = render(<Stats />);
    expect(container.innerHTML).not.toContain("rounded-xl");
  });

  // ── Token aliases — CSS vars present, not raw hex overrides ──────────────────

  it("uses the --color-surface-sunken token for the section background", () => {
    const { container } = render(<Stats />);
    const section = container.querySelector("section#statistics") as HTMLElement;
    expect(section.style.background).toContain("--color-surface-sunken");
  });

  it("uses the --color-vault-sapphire token for the stat values", () => {
    const { container } = render(<Stats />);
    const sapphireEls = Array.from(container.querySelectorAll("[style*='--color-vault-sapphire']"));
    expect(sapphireEls.length).toBeGreaterThan(0);
  });

  it("uses the --color-text-primary token for the section heading", () => {
    const { container } = render(<Stats />);
    const headings = container.querySelectorAll("h2[style*='--color-text-primary']");
    expect(headings.length).toBe(1);
  });
});
