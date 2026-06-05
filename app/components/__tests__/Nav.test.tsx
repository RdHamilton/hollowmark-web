/**
 * Component tests for Nav — Compendium editorial rewrite (#315 PR2) +
 * PR5 follow-ups (#344, #345, #346).
 *
 * PR5 changes:
 *  - CTA label updated to "Begin" (from "Begin the draft") — #begin href retained
 *  - focus-visible ring restored (WCAG 2.4.7) via nav-cta-focus class — #345
 *  - raw sapphire hex replaced with CSS token aliases — #344/#346
 *
 * Running: npm run test
 */

import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import Nav from "../Nav";

afterEach(cleanup);

describe("Nav — Compendium editorial structure (PR2)", () => {
  it("renders the VaultMTG mark icon (aria-hidden)", () => {
    const { container } = render(<Nav />);
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
    // The colour is now expressed as a CSS token, not a hex literal
    expect(logotype!.getAttribute("style")).toContain("var(--color-vault-sapphire)");
  });

  it("links the home logo anchor to the top of the page", () => {
    render(<Nav />);
    const home = screen.getByLabelText("VaultMTG home");
    expect(home.getAttribute("href")).toBe("#");
  });

  it("renders the four chapter-style nav links", () => {
    render(<Nav />);
    expect(screen.getByText("The Compendium")).toBeTruthy();
    expect(screen.getByText("Statistics")).toBeTruthy();
    expect(screen.getByText("Roadmap")).toBeTruthy();
    expect(screen.getAllByText("Begin").length).toBeGreaterThan(0);
  });

  it("renders the section number eyebrows in the desktop nav", () => {
    const { container } = render(<Nav />);
    const sections = Array.from(container.querySelectorAll("span")).filter(
      (el) => /^§\d{2}$/.test(el.textContent ?? ""),
    );
    expect(sections.length).toBeGreaterThanOrEqual(4);
  });

  it("renders the Roadmap nav link pointing to /roadmap", () => {
    const { container } = render(<Nav />);
    const roadmapLink = Array.from(container.querySelectorAll("a")).find(
      (el) => el.getAttribute("href") === "/roadmap",
    );
    expect(roadmapLink).toBeTruthy();
    expect(roadmapLink!.textContent).toBe("Roadmap");
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

describe("Nav CTA — 'Begin' label update (#315 PR5)", () => {
  it("renders the CTA with label 'Begin' (not 'Begin the draft')", () => {
    render(<Nav />);
    // "Begin" appears at least once in the desktop CTA
    const begins = screen.getAllByText("Begin");
    expect(begins.length).toBeGreaterThanOrEqual(1);
    // 'Begin the draft' (old label) must not appear
    expect(screen.queryByText("Begin the draft")).toBeNull();
  });

  it("CTA anchors point to #begin", () => {
    const { container } = render(<Nav />);
    const ctaAnchors = container.querySelectorAll("a[href='#begin']");
    // Desktop CTA is always rendered
    expect(ctaAnchors.length).toBeGreaterThanOrEqual(1);
  });

  it("does not render any anchor pointing to legacy #cta href", () => {
    const { container } = render(<Nav />);
    expect(container.querySelector("a[href='#cta']")).toBeNull();
  });
});

describe("Nav focus ring — WCAG 2.4.7 (#345)", () => {
  it("applies nav-cta-focus class to the CTA anchors (desktop + mobile)", () => {
    const { container } = render(<Nav />);
    // All #begin anchors that carry a background gradient are the CTA buttons
    // (the plain nav-link anchor for §04 "Begin" has no background style).
    const allBeginAnchors = container.querySelectorAll("a[href='#begin']");
    expect(allBeginAnchors.length).toBeGreaterThanOrEqual(1);
    // At least one of the #begin anchors must carry nav-cta-focus
    const ctaAnchors = Array.from(allBeginAnchors).filter((a) => {
      const style = a.getAttribute("style") ?? "";
      return style.includes("gradient");
    });
    expect(ctaAnchors.length).toBeGreaterThanOrEqual(1);
    ctaAnchors.forEach((a) => {
      const cls = a.getAttribute("class") ?? "";
      expect(cls).toContain("nav-cta-focus");
    });
  });

  it("injects a :focus-visible CSS rule for nav-cta-focus", () => {
    const { container } = render(<Nav />);
    const style = container.querySelector("style");
    expect(style?.textContent).toContain("nav-cta-focus:focus-visible");
    expect(style?.textContent).toContain("outline");
    // Must reference the dark-sapphire token for the ring colour
    expect(style?.textContent).toContain("--color-primary-600");
  });

  it("does not drop focus indication via outline:none on the CTA", () => {
    const { container } = render(<Nav />);
    // CTA anchors (those with a gradient background) must not suppress focus ring
    const allBeginAnchors = container.querySelectorAll("a[href='#begin']");
    const ctaAnchors = Array.from(allBeginAnchors).filter((a) =>
      (a.getAttribute("style") ?? "").includes("gradient"),
    );
    expect(ctaAnchors.length).toBeGreaterThanOrEqual(1);
    ctaAnchors.forEach((a) => {
      expect(a.getAttribute("style") ?? "").not.toContain("outline: none");
      expect(a.getAttribute("style") ?? "").not.toContain("outline:none");
    });
  });
});

describe("Nav token-alias sweep (#344/#346)", () => {
  it("does not use raw #4A90D9 as a direct color style value", () => {
    const { container } = render(<Nav />);
    expect(container.innerHTML).not.toMatch(/color:\s*#4A90D9/i);
  });

  it("does not use raw #7CB5F0 as a direct color style value", () => {
    const { container } = render(<Nav />);
    expect(container.innerHTML).not.toMatch(/color:\s*#7CB5F0/i);
  });

  it("does not use raw #0A0E16 as a direct color style value", () => {
    const { container } = render(<Nav />);
    expect(container.innerHTML).not.toMatch(/color:\s*#0A0E16/i);
  });

  it("uses var(--color-vault-sapphire) for the wordmark logotype", () => {
    const { container } = render(<Nav />);
    const logotype = Array.from(container.querySelectorAll("span")).find(
      (el) => el.textContent === "VaultMTG",
    );
    expect(logotype?.getAttribute("style")).toContain("var(--color-vault-sapphire)");
  });

  it("uses var(--color-surface-border-subtle) for header border", () => {
    const { container } = render(<Nav />);
    const header = container.querySelector("header");
    expect(header?.getAttribute("style")).toContain("var(--color-surface-border-subtle)");
  });

  it("uses var(--color-primary-400) and var(--color-primary-500) in CTA gradient", () => {
    const { container } = render(<Nav />);
    const allBeginAnchors = container.querySelectorAll("a[href='#begin']");
    const ctaAnchors = Array.from(allBeginAnchors).filter((a) =>
      (a.getAttribute("style") ?? "").includes("gradient"),
    );
    expect(ctaAnchors.length).toBeGreaterThanOrEqual(1);
    ctaAnchors.forEach((a) => {
      const style = a.getAttribute("style") ?? "";
      expect(style).toContain("var(--color-primary-400)");
      expect(style).toContain("var(--color-primary-500)");
    });
  });
});
