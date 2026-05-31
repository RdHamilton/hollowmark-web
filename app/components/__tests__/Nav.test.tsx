/**
 * Component tests for Nav — Compendium editorial rewrite (#315 PR2).
 *
 * Running: npm run test
 */

import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import Nav from "../Nav";

afterEach(cleanup);

describe("Nav — Compendium editorial rewrite (PR2)", () => {
  it("renders the VaultMTG mark icon (aria-hidden)", () => {
    const { container } = render(<Nav />);
    // The mark SVG is in an <img> with alt=""
    const marks = container.querySelectorAll('img[alt=""]');
    expect(marks.length).toBeGreaterThan(0);
    const mark = marks[0] as HTMLImageElement;
    expect(mark.getAttribute("src")).toContain("logo-vaultmtg-mark.svg");
  });

  it("renders the serif italic VaultMTG wordmark logotype", () => {
    const { container } = render(<Nav />);
    const logotype = Array.from(container.querySelectorAll("span")).find(
      (el) => el.textContent === "VaultMTG",
    );
    expect(logotype).toBeTruthy();
    expect(logotype!.style.fontStyle).toBe("italic");
    // jsdom normalises hex to rgb()
    expect(logotype!.style.color).toMatch(/rgb\(74,\s*144,\s*217\)|#4A90D9/);
  });

  it("links the home logo anchor to the top of the page", () => {
    render(<Nav />);
    const home = screen.getByLabelText("VaultMTG home");
    expect(home.getAttribute("href")).toBe("#");
  });

  it("renders the three chapter-style nav links", () => {
    render(<Nav />);
    expect(screen.getByText("The Compendium")).toBeTruthy();
    expect(screen.getByText("Statistics")).toBeTruthy();
    expect(screen.getAllByText("Begin").length).toBeGreaterThan(0);
  });

  it("renders the section number eyebrows in the desktop nav", () => {
    const { container } = render(<Nav />);
    const sections = Array.from(container.querySelectorAll("span")).filter(
      (el) => /^§\d{2}$/.test(el.textContent ?? ""),
    );
    // §02, §03, §04 — may appear twice (desktop + mobile drawer) but at least 3
    expect(sections.length).toBeGreaterThanOrEqual(3);
  });

  it("renders the 'Begin the draft' CTA pointing to #begin", () => {
    render(<Nav />);
    const ctas = screen.getAllByText("Begin the draft");
    expect(ctas.length).toBeGreaterThan(0);
    // At least one CTA should link to #begin
    const ctaLinks = ctas.map((el) => el.closest("a"));
    expect(
      ctaLinks.some((a) => a?.getAttribute("href") === "#begin"),
    ).toBe(true);
  });

  it("does not retain amber accent colours in markup", () => {
    const { container } = render(<Nav />);
    expect(container.innerHTML).not.toContain("F5A623");
    expect(container.innerHTML).not.toContain("F7BA58");
    expect(container.innerHTML).not.toContain("C8841A");
  });

  it("does not render the legacy 'Get Early Access' CTA text", () => {
    const { container } = render(<Nav />);
    expect(container.textContent).not.toContain("Get Early Access");
  });

  it("renders the hamburger button for mobile", () => {
    render(<Nav />);
    const btn = screen.getByRole("button");
    expect(btn).toBeTruthy();
    expect(btn.getAttribute("aria-label")).toContain("menu");
  });
});
