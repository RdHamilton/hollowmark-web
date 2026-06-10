/**
 * Component tests for /privacy page — hollowmark-tickets#881.
 *
 * Validates that:
 *  1. The page mounts without error.
 *  2. All required legal sections are present by heading text.
 *  3. The WotC disclaimer renders.
 *  4. The effective date is displayed.
 *  5. GDPR rights sections render.
 *  6. Sub-processor table entries render.
 *  7. Key contact emails render.
 *  8. Cross-links and footer are present.
 *
 * Running: npm run test
 */

import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import PrivacyPage, { EFFECTIVE_DATE } from "../page";

afterEach(cleanup);

describe("/privacy page — hollowmark-tickets#881", () => {
  // ── Mount ──────────────────────────────────────────────────────────────────

  it("renders without throwing", () => {
    expect(() => render(<PrivacyPage />)).not.toThrow();
  });

  it("renders an h1 containing 'Privacy Policy'", () => {
    render(<PrivacyPage />);
    const h1 = screen.getByRole("heading", { level: 1 });
    expect(h1.textContent).toMatch(/Privacy.*Policy/i);
  });

  // ── Effective date ─────────────────────────────────────────────────────────

  it("renders the effective date string", () => {
    render(<PrivacyPage />);
    const matches = screen.getAllByText(new RegExp(EFFECTIVE_DATE, "i"));
    expect(matches.length).toBeGreaterThanOrEqual(1);
  });

  // ── WotC disclaimer ────────────────────────────────────────────────────────

  it("renders the WotC disclaimer section heading", () => {
    render(<PrivacyPage />);
    expect(
      screen.getByText(/Disclaimer — Unofficial Third-Party Tool/i),
    ).toBeTruthy();
  });

  it("renders the WotC 'NOT affiliated' language", () => {
    render(<PrivacyPage />);
    const matches = screen.getAllByText(/NOT affiliated with.*Wizards of the Coast/i);
    expect(matches.length).toBeGreaterThanOrEqual(1);
  });

  // ── Required section headings ──────────────────────────────────────────────

  it("renders '1. Introduction' heading", () => {
    render(<PrivacyPage />);
    expect(screen.getByText(/1\. Introduction/i)).toBeTruthy();
  });

  it("renders '2. Information We Collect' heading", () => {
    render(<PrivacyPage />);
    expect(screen.getByText(/2\. Information We Collect/i)).toBeTruthy();
  });

  it("renders '3. How We Use Your Information' heading", () => {
    render(<PrivacyPage />);
    expect(screen.getByText(/3\. How We Use Your Information/i)).toBeTruthy();
  });

  it("renders '4. Data Retention' heading", () => {
    render(<PrivacyPage />);
    expect(screen.getByText(/4\. Data Retention/i)).toBeTruthy();
  });

  it("renders '5. Data Sharing and Third-Party Sub-Processors' heading", () => {
    render(<PrivacyPage />);
    expect(
      screen.getByText(/5\. Data Sharing and Third-Party Sub-Processors/i),
    ).toBeTruthy();
  });

  it("renders '6. Your Rights and Choices' heading", () => {
    render(<PrivacyPage />);
    expect(screen.getByText(/6\. Your Rights and Choices/i)).toBeTruthy();
  });

  it("renders '7. Security Measures' heading", () => {
    render(<PrivacyPage />);
    expect(screen.getByText(/7\. Security Measures/i)).toBeTruthy();
  });

  it("renders '8. Children's Privacy' heading", () => {
    const { container } = render(<PrivacyPage />);
    expect(container.textContent).toMatch(/8\. Children.s Privacy/i);
  });

  it("renders '9. International Users — GDPR and UK GDPR' heading", () => {
    render(<PrivacyPage />);
    expect(
      screen.getByText(/9\. International Users — GDPR and UK GDPR/i),
    ).toBeTruthy();
  });

  it("renders '10. Contact' heading", () => {
    render(<PrivacyPage />);
    expect(screen.getByText(/10\. Contact/i)).toBeTruthy();
  });

  it("renders '11. Changes to This Policy' heading", () => {
    render(<PrivacyPage />);
    expect(screen.getByText(/11\. Changes to This Policy/i)).toBeTruthy();
  });

  // ── Sub-processors (load-bearing legal content) ────────────────────────────

  it("lists Clerk Identity as a sub-processor", () => {
    render(<PrivacyPage />);
    const matches = screen.getAllByText(/Clerk Identity/i);
    expect(matches.length).toBeGreaterThanOrEqual(1);
  });

  it("lists PostHog as a sub-processor", () => {
    render(<PrivacyPage />);
    const matches = screen.getAllByText(/PostHog/i);
    expect(matches.length).toBeGreaterThanOrEqual(1);
  });

  it("lists Sentry as a sub-processor", () => {
    render(<PrivacyPage />);
    const matches = screen.getAllByText(/Sentry/i);
    expect(matches.length).toBeGreaterThanOrEqual(1);
  });

  it("lists Mailchimp as a sub-processor", () => {
    render(<PrivacyPage />);
    const matches = screen.getAllByText(/Mailchimp/i);
    expect(matches.length).toBeGreaterThanOrEqual(1);
  });

  it("lists Amazon Web Services (AWS) as a sub-processor", () => {
    render(<PrivacyPage />);
    expect(screen.getByText(/Amazon Web Services/i)).toBeTruthy();
  });

  it("lists Google LLC (GA4) as a sub-processor", () => {
    render(<PrivacyPage />);
    const matches = screen.getAllByText(/Google LLC/i);
    expect(matches.length).toBeGreaterThanOrEqual(1);
  });

  // ── GDPR rights (§ 9 + § 6) ───────────────────────────────────────────────

  it("renders GDPR rights reference (Art. 15, 17, 20)", () => {
    render(<PrivacyPage />);
    expect(screen.getByText(/Art\. 15/i)).toBeTruthy();
    expect(screen.getByText(/Art\. 17/i)).toBeTruthy();
    expect(screen.getByText(/Art\. 20/i)).toBeTruthy();
  });

  it("renders 'Data controller' disclosure", () => {
    render(<PrivacyPage />);
    const matches = screen.getAllByText(/Data controller/i);
    expect(matches.length).toBeGreaterThanOrEqual(1);
  });

  it("renders the Right to Lodge a Complaint section", () => {
    render(<PrivacyPage />);
    expect(
      screen.getByText(/6\.8 Right to Lodge a Complaint/i),
    ).toBeTruthy();
  });

  it("renders the Information Commissioner's Office reference", () => {
    const { container } = render(<PrivacyPage />);
    expect(container.textContent).toMatch(/Information Commissioner.s Office/i);
  });

  // ── ML training data de-identification language ────────────────────────────

  it("renders the ML training data de-identification disclosure", () => {
    render(<PrivacyPage />);
    expect(
      screen.getByText(/How ML training data is de-identified/i),
    ).toBeTruthy();
  });

  it("renders GDPR Art 4(1) anonymity basis", () => {
    render(<PrivacyPage />);
    const matches = screen.getAllByText(/GDPR Art\. 4\(1\)/i);
    expect(matches.length).toBeGreaterThanOrEqual(1);
  });

  // ── Children's privacy ─────────────────────────────────────────────────────

  it("renders the 13-year-old minimum age statement", () => {
    render(<PrivacyPage />);
    expect(screen.getByText(/13 years old/i)).toBeTruthy();
  });

  // ── Contact emails ─────────────────────────────────────────────────────────

  it("renders privacy@vaultmtg.app as the primary contact", () => {
    render(<PrivacyPage />);
    const links = screen.getAllByRole("link");
    const privacy = links.find((l) => l.getAttribute("href") === "mailto:privacy@vaultmtg.app");
    expect(privacy).toBeTruthy();
  });

  it("renders support@vaultmtg.app contact link", () => {
    render(<PrivacyPage />);
    const links = screen.getAllByRole("link");
    const support = links.find((l) => l.getAttribute("href") === "mailto:support@vaultmtg.app");
    expect(support).toBeTruthy();
  });

  it("renders legal@vaultmtg.app contact link", () => {
    render(<PrivacyPage />);
    const links = screen.getAllByRole("link");
    const legal = links.find((l) => l.getAttribute("href") === "mailto:legal@vaultmtg.app");
    expect(legal).toBeTruthy();
  });

  // ── Ray Hamilton Engineering entity ───────────────────────────────────────

  it("renders 'Ray Hamilton Engineering, LLC' as the data controller", () => {
    render(<PrivacyPage />);
    const matches = screen.getAllByText(/Ray Hamilton Engineering, LLC/i);
    expect(matches.length).toBeGreaterThanOrEqual(1);
  });

  // ── Data-not-sold statement ────────────────────────────────────────────────

  it("renders the 'do not sell' statement", () => {
    render(<PrivacyPage />);
    expect(
      screen.getByText(/do not sell, rent, or lease your personal information/i),
    ).toBeTruthy();
  });

  // ── Footer and Nav present ─────────────────────────────────────────────────

  it("renders the footer", () => {
    const { container } = render(<PrivacyPage />);
    expect(container.querySelector("footer")).toBeTruthy();
  });

  it("renders the nav (header)", () => {
    const { container } = render(<PrivacyPage />);
    expect(container.querySelector("header")).toBeTruthy();
  });

  // ── Section markers (JetBrains Mono eyebrows) ─────────────────────────────

  it("renders § Legal · Privacy Policy eyebrow marker", () => {
    render(<PrivacyPage />);
    expect(screen.getByText(/§ Legal · Privacy Policy/i)).toBeTruthy();
  });

  it("renders ornamental three-flower break ❦ ❦ ❦", () => {
    const { container } = render(<PrivacyPage />);
    expect(container.textContent).toContain("❦ ❦ ❦");
  });

  // ── Closed beta notice (§ 1) ──────────────────────────────────────────────

  it("renders the Closed Beta Notice", () => {
    render(<PrivacyPage />);
    expect(screen.getByText(/Closed Beta Notice/i)).toBeTruthy();
  });

  // ── Google Analytics opt-out link ─────────────────────────────────────────

  it("renders the Google Analytics opt-out browser add-on link", () => {
    render(<PrivacyPage />);
    const links = screen.getAllByRole("link");
    const gaOptOut = links.find((l) =>
      l.getAttribute("href")?.includes("tools.google.com/dlpage/gaoptout"),
    );
    expect(gaOptOut).toBeTruthy();
  });
});

// ── Metadata constants ────────────────────────────────────────────────────────

import { metadata } from "../page";
import { SITE_BASE } from "../../../lib/og-metadata";

describe("/privacy page metadata — hollowmark-tickets#881", () => {
  it("title includes 'Privacy Policy'", () => {
    expect(String(metadata.title)).toMatch(/Privacy Policy/i);
  });

  it("openGraph url is SITE_BASE.url + /privacy", () => {
    const og = metadata.openGraph as { url?: string };
    expect(og?.url).toBe(`${SITE_BASE.url}/privacy`);
  });

  it("openGraph siteName is Hollowmark", () => {
    const og = metadata.openGraph as { siteName?: string };
    expect(og?.siteName).toBe("Hollowmark");
  });
});
