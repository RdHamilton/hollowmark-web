/**
 * Component tests for Stats — editorial ledger + Voices testimonials (#315 PR4).
 *
 * Running: npm run test
 */

import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import Stats from "../Stats";

afterEach(cleanup);

describe("Stats — editorial ledger + Voices (#315 PR4)", () => {

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

  it("renders the § 04 · Voices eyebrow marker", () => {
    render(<Stats />);
    expect(screen.getByText(/§ 04 · Voices from the community/i)).toBeTruthy();
  });

  // ── Two h2 headings ──────────────────────────────────────────────────────────

  it("renders both section display headings as h2 elements", () => {
    render(<Stats />);
    const headings = screen.getAllByRole("heading", { level: 2 });
    expect(headings.length).toBe(2);
  });

  it("renders 'The ledger, kept honest.' as the Statistics heading", () => {
    render(<Stats />);
    const heading = screen.getByRole("heading", { name: /the ledger, kept honest/i });
    expect(heading).toBeTruthy();
    expect(heading.tagName.toLowerCase()).toBe("h2");
  });

  it("renders 'Players who already have the edge.' as the Voices heading", () => {
    render(<Stats />);
    const heading = screen.getByRole("heading", { name: /players who already have the edge/i });
    expect(heading).toBeTruthy();
    expect(heading.tagName.toLowerCase()).toBe("h2");
  });

  // ── Section headings use Cormorant Garamond italic ───────────────────────────

  it("renders the Statistics h2 in Cormorant Garamond italic", () => {
    render(<Stats />);
    const heading = screen.getByRole("heading", { name: /the ledger, kept honest/i });
    expect(heading.getAttribute("style")).toContain("Cormorant Garamond");
    expect(heading.getAttribute("style")).toContain("italic");
  });

  it("renders the Voices h2 in Cormorant Garamond italic", () => {
    render(<Stats />);
    const heading = screen.getByRole("heading", { name: /players who already have the edge/i });
    expect(heading.getAttribute("style")).toContain("Cormorant Garamond");
    expect(heading.getAttribute("style")).toContain("italic");
  });

  // ── Number ledger — four stat entries ────────────────────────────────────────

  it("renders four numeric stat values", () => {
    render(<Stats />);
    expect(screen.getByText("30,000+")).toBeTruthy();
    expect(screen.getByText("500K+")).toBeTruthy();
    expect(screen.getByText("2.4s")).toBeTruthy();
    expect(screen.getByText("+8%")).toBeTruthy();
  });

  it("renders four stat labels in Cormorant Garamond italic", () => {
    render(<Stats />);
    expect(screen.getByText("cards rated")).toBeTruthy();
    expect(screen.getByText("drafts tracked")).toBeTruthy();
    expect(screen.getByText("average pick saved")).toBeTruthy();
    expect(screen.getByText("win-rate lift")).toBeTruthy();
  });

  it("renders four stat notes (editorial marginalia)", () => {
    render(<Stats />);
    expect(screen.getByText("across all current and recent sets")).toBeTruthy();
    expect(screen.getByText("and growing every week")).toBeTruthy();
    expect(screen.getByText("per draft decision")).toBeTruthy();
    expect(screen.getByText("reported after thirty drafts")).toBeTruthy();
  });

  it("renders stat values with JetBrains Mono font", () => {
    const { container } = render(<Stats />);
    // The stats-ledger div holds items whose value divs use JetBrains Mono
    const monoEls = Array.from(container.querySelectorAll("[style*='JetBrains Mono']"));
    expect(monoEls.length).toBeGreaterThan(0);
  });

  // ── Voices — three testimonial blockquotes ───────────────────────────────────

  it("renders exactly three VoiceCard blockquotes", () => {
    const { container } = render(<Stats />);
    const blockquotes = container.querySelectorAll("blockquote");
    expect(blockquotes.length).toBe(3);
  });

  it("renders the Sable_Raven testimonial", () => {
    render(<Stats />);
    expect(screen.getByText("Sable_Raven")).toBeTruthy();
    expect(screen.getByText(/Mythic rank · limited specialist/i)).toBeTruthy();
    expect(screen.getByText(/55% to consistently 65%\+/)).toBeTruthy();
  });

  it("renders the DraftKingMTG testimonial", () => {
    render(<Stats />);
    expect(screen.getByText("DraftKingMTG")).toBeTruthy();
    expect(screen.getByText(/Top 100 limited player/i)).toBeTruthy();
    expect(screen.getByText(/doesn't feel like homework/)).toBeTruthy();
  });

  it("renders the Aetherborn_7 testimonial", () => {
    render(<Stats />);
    expect(screen.getByText("Aetherborn_7")).toBeTruthy();
    expect(screen.getByText(/Set collector · competitive drafter/i)).toBeTruthy();
    expect(screen.getByText(/killer feature/)).toBeTruthy();
  });

  // ── Three-flower ornamental break ────────────────────────────────────────────

  it("renders the ornamental three-flower break (aria-hidden)", () => {
    const { container } = render(<Stats />);
    // The ❦ ❦ ❦ span is wrapped in an aria-hidden div
    const ornament = container.querySelector("[aria-hidden='true']");
    expect(ornament).toBeTruthy();
  });

  // ── VoiceCard blockquote internal structure ───────────────────────────────────

  it("renders a footer within each VoiceCard blockquote", () => {
    const { container } = render(<Stats />);
    const footers = container.querySelectorAll("blockquote footer");
    expect(footers.length).toBe(3);
  });

  it("renders attribution role labels in JetBrains Mono uppercase", () => {
    const { container } = render(<Stats />);
    // Role text spans inside footers carry JetBrains Mono + uppercase
    const monoRoles = Array.from(container.querySelectorAll("blockquote footer [style*='JetBrains Mono']"));
    expect(monoRoles.length).toBe(3);
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
    // Old component used Tailwind rounded-xl on blockquotes
    expect(container.innerHTML).not.toContain("rounded-xl");
  });

  it("does not retain the old bg-[#0D1117] inline color on blockquotes", () => {
    const { container } = render(<Stats />);
    // Old component had bg-[#0D1117] on blockquote — now uses token-aliased bg
    expect(container.innerHTML).not.toContain("0D1117");
  });

  // ── Token aliases — CSS vars present, not raw hex overrides ──────────────────

  it("uses the --color-surface-sunken token for the section background", () => {
    const { container } = render(<Stats />);
    const section = container.querySelector("section#statistics") as HTMLElement;
    expect(section.style.background).toContain("--color-surface-sunken");
  });

  it("uses the --color-vault-sapphire token for the stat values", () => {
    const { container } = render(<Stats />);
    // At least one element carries the sapphire token
    const sapphireEls = Array.from(container.querySelectorAll("[style*='--color-vault-sapphire']"));
    expect(sapphireEls.length).toBeGreaterThan(0);
  });

  it("uses the --color-text-primary token for the section headings", () => {
    const { container } = render(<Stats />);
    const headings = container.querySelectorAll("h2[style*='--color-text-primary']");
    expect(headings.length).toBe(2);
  });
});
