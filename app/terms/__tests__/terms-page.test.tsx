/**
 * Component tests for /terms page — hollowmark-tickets#880.
 *
 * Validates that:
 *  1. The page mounts without error.
 *  2. All required legal sections are present by heading text.
 *  3. The WotC disclaimer renders.
 *  4. The effective date is displayed.
 *  5. Key contact emails render.
 *  6. Cross-links to /privacy and footer are present.
 *
 * Running: npm run test
 */

import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import TermsPage, { EFFECTIVE_DATE } from "../page";

afterEach(cleanup);

describe("/terms page — hollowmark-tickets#880", () => {
  // ── Mount ──────────────────────────────────────────────────────────────────

  it("renders without throwing", () => {
    expect(() => render(<TermsPage />)).not.toThrow();
  });

  it("renders an h1 containing 'Terms of Service'", () => {
    render(<TermsPage />);
    const h1 = screen.getByRole("heading", { level: 1 });
    expect(h1.textContent).toMatch(/Terms of.*Service/i);
  });

  // ── Effective date ─────────────────────────────────────────────────────────

  it("renders the effective date string", () => {
    render(<TermsPage />);
    const matches = screen.getAllByText(new RegExp(EFFECTIVE_DATE, "i"));
    expect(matches.length).toBeGreaterThanOrEqual(1);
  });

  // ── WotC disclaimer ────────────────────────────────────────────────────────

  it("renders the WotC disclaimer section heading", () => {
    render(<TermsPage />);
    expect(
      screen.getByText(/Disclaimer — Unofficial Third-Party Tool/i),
    ).toBeTruthy();
  });

  it("renders the WotC 'NOT affiliated' language", () => {
    render(<TermsPage />);
    const matches = screen.getAllByText(/NOT affiliated with.*Wizards of the Coast/i);
    expect(matches.length).toBeGreaterThanOrEqual(1);
  });

  // ── Required section headings ──────────────────────────────────────────────

  it("renders '1. Agreement to Terms' heading", () => {
    render(<TermsPage />);
    expect(screen.getByText(/1\. Agreement to Terms/i)).toBeTruthy();
  });

  it("renders '2. Service Description' heading", () => {
    render(<TermsPage />);
    expect(screen.getByText(/2\. Service Description/i)).toBeTruthy();
  });

  it("renders '3. User Accounts and Registration' heading", () => {
    render(<TermsPage />);
    expect(screen.getByText(/3\. User Accounts and Registration/i)).toBeTruthy();
  });

  it("renders '5. Acceptable Use' heading", () => {
    render(<TermsPage />);
    expect(screen.getByText(/5\. Acceptable Use/i)).toBeTruthy();
  });

  it("renders '7. Disclaimer of Warranties' heading", () => {
    render(<TermsPage />);
    expect(screen.getByText(/7\. Disclaimer of Warranties/i)).toBeTruthy();
  });

  it("renders '8. Limitation of Liability' heading", () => {
    render(<TermsPage />);
    expect(screen.getByText(/8\. Limitation of Liability/i)).toBeTruthy();
  });

  it("renders '12. Dispute Resolution' heading", () => {
    render(<TermsPage />);
    expect(screen.getByText(/12\. Dispute Resolution/i)).toBeTruthy();
  });

  it("renders '14. Beta-Tester Confidentiality' heading", () => {
    render(<TermsPage />);
    expect(screen.getByText(/14\. Beta-Tester Confidentiality/i)).toBeTruthy();
  });

  it("renders '18. Contact' heading", () => {
    render(<TermsPage />);
    expect(screen.getByText(/18\. Contact/i)).toBeTruthy();
  });

  // ── Arbitration / class-action waiver (legally required display) ───────────

  it("renders 'binding individual arbitration' language", () => {
    render(<TermsPage />);
    const matches = screen.getAllByText(/binding individual arbitration/i);
    expect(matches.length).toBeGreaterThanOrEqual(1);
  });

  it("renders 'American Arbitration Association' reference", () => {
    render(<TermsPage />);
    expect(screen.getByText(/American Arbitration Association/i)).toBeTruthy();
  });

  it("renders 'Atlanta, Georgia' as arbitration seat", () => {
    render(<TermsPage />);
    expect(screen.getByText(/Atlanta, Georgia/i)).toBeTruthy();
  });

  it("renders the class-action waiver language", () => {
    render(<TermsPage />);
    expect(screen.getByText(/CLASS MEMBER IN ANY PURPORTED CLASS/i)).toBeTruthy();
  });

  it("renders the 30-day opt-out language for arbitration", () => {
    render(<TermsPage />);
    const thirtyDays = screen.getAllByText(/30 days/i);
    expect(thirtyDays.length).toBeGreaterThanOrEqual(1);
    const legal = screen.getAllByText(/legal@vaultmtg\.app/i);
    expect(legal.length).toBeGreaterThanOrEqual(1);
  });

  // ── Governing law ──────────────────────────────────────────────────────────

  it("renders 'State of Georgia, USA' governing law", () => {
    render(<TermsPage />);
    expect(screen.getByText(/State of Georgia, USA/i)).toBeTruthy();
  });

  // ── Contact emails ─────────────────────────────────────────────────────────

  it("renders support@vaultmtg.app contact link", () => {
    render(<TermsPage />);
    const links = screen.getAllByRole("link");
    const support = links.find((l) => l.getAttribute("href") === "mailto:support@vaultmtg.app");
    expect(support).toBeTruthy();
  });

  it("renders legal@vaultmtg.app contact link", () => {
    render(<TermsPage />);
    const links = screen.getAllByRole("link");
    const legal = links.find((l) => l.getAttribute("href") === "mailto:legal@vaultmtg.app");
    expect(legal).toBeTruthy();
  });

  it("renders privacy@vaultmtg.app contact link", () => {
    render(<TermsPage />);
    const links = screen.getAllByRole("link");
    const privacy = links.find((l) => l.getAttribute("href") === "mailto:privacy@vaultmtg.app");
    expect(privacy).toBeTruthy();
  });

  // ── Cross-link to Privacy Policy ───────────────────────────────────────────

  it("renders a link to /privacy from the Privacy section", () => {
    render(<TermsPage />);
    const links = screen.getAllByRole("link");
    const privacyLink = links.find((l) => l.getAttribute("href") === "/privacy");
    expect(privacyLink).toBeTruthy();
  });

  // ── Ray Hamilton Engineering entity name ──────────────────────────────────

  it("renders 'Ray Hamilton Engineering, LLC' as the contracting entity", () => {
    render(<TermsPage />);
    const matches = screen.getAllByText(/Ray Hamilton Engineering, LLC/i);
    expect(matches.length).toBeGreaterThanOrEqual(1);
  });

  // ── Service description beta language ─────────────────────────────────────

  it("renders the closed beta status disclosure", () => {
    render(<TermsPage />);
    const matches = screen.getAllByText(/closed beta/i);
    expect(matches.length).toBeGreaterThanOrEqual(1);
  });

  // ── AS-IS warranty disclaimer ──────────────────────────────────────────────

  it("renders AS-IS warranty disclaimer language", () => {
    const { container } = render(<TermsPage />);
    expect(container.textContent).toMatch(/AS-IS.*AS AVAILABLE/i);
  });

  // ── Footer present ─────────────────────────────────────────────────────────

  it("renders the footer", () => {
    const { container } = render(<TermsPage />);
    expect(container.querySelector("footer")).toBeTruthy();
  });

  // ── Nav present ────────────────────────────────────────────────────────────

  it("renders the nav (header)", () => {
    const { container } = render(<TermsPage />);
    expect(container.querySelector("header")).toBeTruthy();
  });

  // ── Section markers (JetBrains Mono eyebrows) ─────────────────────────────

  it("renders § Legal · Terms of Service eyebrow marker", () => {
    render(<TermsPage />);
    expect(screen.getByText(/§ Legal · Terms of Service/i)).toBeTruthy();
  });

  it("renders ornamental three-flower break ❦ ❦ ❦", () => {
    render(<TermsPage />);
    const { container } = render(<TermsPage />);
    expect(container.textContent).toContain("❦ ❦ ❦");
  });
});

// ── Metadata constants ────────────────────────────────────────────────────────

import { metadata } from "../page";
import { SITE_BASE } from "../../../lib/og-metadata";

describe("/terms page metadata — hollowmark-tickets#880", () => {
  it("title includes 'Terms of Service'", () => {
    expect(String(metadata.title)).toMatch(/Terms of Service/i);
  });

  it("openGraph url is SITE_BASE.url + /terms", () => {
    const og = metadata.openGraph as { url?: string };
    expect(og?.url).toBe(`${SITE_BASE.url}/terms`);
  });

  it("openGraph siteName is Hollowmark", () => {
    const og = metadata.openGraph as { siteName?: string };
    expect(og?.siteName).toBe("Hollowmark");
  });
});
