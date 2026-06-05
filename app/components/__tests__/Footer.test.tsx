/**
 * Component tests for Footer — Colophon editorial rewrite (#315 PR5).
 *
 * Running: npm run test
 */

import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import Footer from "../Footer";

afterEach(cleanup);

describe("Footer — Colophon (#315 PR5)", () => {
  // ── Colophon header ────────────────────────────────────────────────────────

  it("renders the § Colophon eyebrow", () => {
    render(<Footer />);
    expect(screen.getByText(/§ Colophon/i)).toBeTruthy();
  });

  it("renders the VaultMTG brand name in the colophon header", () => {
    render(<Footer />);
    // "VaultMTG" appears as the serif italic brand display (not a logo image)
    const brand = screen.getByText("VaultMTG");
    expect(brand).toBeTruthy();
    expect(brand.getAttribute("style")).toContain("Cormorant Garamond");
  });

  it("renders the three-flower (❦ ❦ ❦) divider", () => {
    render(<Footer />);
    expect(screen.getByText(/❦ ❦ ❦/)).toBeTruthy();
  });

  // ── Link columns ───────────────────────────────────────────────────────────

  it("renders the Legal column header", () => {
    render(<Footer />);
    const legal = screen.getByText("Legal");
    expect(legal.tagName.toLowerCase()).toBe("h3");
  });

  it("renders the Community column header", () => {
    render(<Footer />);
    expect(screen.getByText("Community")).toBeTruthy();
  });

  it("renders the Support column header", () => {
    render(<Footer />);
    expect(screen.getByText("Support")).toBeTruthy();
  });

  it("renders the Privacy Policy link", () => {
    render(<Footer />);
    const link = screen.getByText("Privacy Policy");
    expect(link.getAttribute("href")).toBe("/privacy");
  });

  it("renders the Terms of Service link", () => {
    render(<Footer />);
    const link = screen.getByText("Terms of Service");
    expect(link.getAttribute("href")).toBe("/terms");
  });

  it("uses the live Discord invite URL (not the design-kit placeholder)", () => {
    render(<Footer />);
    const discord = screen.getByText("Discord");
    expect(discord.getAttribute("href")).toBe("https://discord.gg/XwVsV892b4");
    expect(discord.getAttribute("href")).not.toContain("discord.gg/vaultmtg");
  });

  it("renders the Reddit community link", () => {
    render(<Footer />);
    const reddit = screen.getByText("Reddit");
    expect(reddit.getAttribute("href")).toBe("https://reddit.com/r/vaultmtg");
  });

  it("renders external links with rel=noopener noreferrer", () => {
    render(<Footer />);
    const discord = screen.getByText("Discord");
    expect(discord.getAttribute("rel")).toBe("noopener noreferrer");
    expect(discord.getAttribute("target")).toBe("_blank");
  });

  it("renders the Help & Docs link pointing to /docs", () => {
    render(<Footer />);
    const helpDocs = screen.getByText("Help & Docs");
    expect(helpDocs.getAttribute("href")).toBe("/docs");
  });

  it("renders the Contact link as a mailto", () => {
    render(<Footer />);
    const contact = screen.getByText("Contact");
    expect(contact.getAttribute("href")).toBe("mailto:hello@vaultmtg.app");
  });

  // ── Bottom rule / attribution ──────────────────────────────────────────────

  it("renders the colophon typography attribution line", () => {
    render(<Footer />);
    expect(
      screen.getByText(/Set in Cormorant Garamond, Inter, JetBrains Mono/i),
    ).toBeTruthy();
  });

  it("renders the Vol. I · No. 1 edition marker", () => {
    render(<Footer />);
    expect(screen.getByText(/Vol\. I · No\. 1/i)).toBeTruthy();
  });

  it("renders the copyright year", () => {
    render(<Footer />);
    const year = new Date().getFullYear().toString();
    const matches = screen.getAllByText(new RegExp(year));
    expect(matches.length).toBeGreaterThanOrEqual(1);
  });

  it("renders the Wizards of the Coast disclaimer", () => {
    render(<Footer />);
    expect(screen.getByText(/Wizards of the Coast/i)).toBeTruthy();
  });

  // ── Brand hygiene ──────────────────────────────────────────────────────────

  it("does not retain the amber accent (#F5A623) anywhere in markup", () => {
    const { container } = render(<Footer />);
    expect(container.innerHTML).not.toContain("F5A623");
  });

  it("does not render the wordmark <img> / Image (replaced by serif brand text)", () => {
    render(<Footer />);
    // The new Colophon footer replaces the Image with a serif-italic span —
    // there should be no <img> with alt="VaultMTG".
    const logo = screen.queryByAltText("VaultMTG");
    expect(logo).toBeNull();
  });

  it("does not use raw sapphire hex #4A90D9 as a direct color style value", () => {
    const { container } = render(<Footer />);
    expect(container.innerHTML).not.toMatch(/color:\s*#4A90D9/i);
  });

  // ── textWrap (#347) ────────────────────────────────────────────────────────

  it("applies textWrap:balance to the colophon description paragraph", () => {
    render(<Footer />);
    const desc = screen.getByText(/Your edge\. Every draft\./i);
    expect(desc.getAttribute("style")).toContain("balance");
  });

  it("applies textWrap:pretty to the disclaimer paragraph", () => {
    render(<Footer />);
    const disclaimer = screen.getByText(/Wizards of the Coast/i);
    expect(disclaimer.getAttribute("style")).toContain("pretty");
  });
});
