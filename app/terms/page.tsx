// Terms of Service page — § Legal · ToS
// Ticket #880 — publish finalized Terms of Service on hollowmark.app/terms
// Design: Cormorant Garamond italic display, JetBrains Mono markers,
// sapphire palette — follows ui_kits/vaultmtg-web/ Compendium editorial aesthetic.
// Static export (output: "export") — no dynamic server features.
// Legal text rendered faithfully from terms-of-service-DRAFT.md (FINAL 2026-06-10).
// Effective Date: 2026-06-10

import type { Metadata } from "next";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { ogImage, SITE_BASE, TWITTER_CARD, OG_IMAGE_URL } from "@/lib/og-metadata";

const TOS_TITLE = "Terms of Service — Hollowmark";
const TOS_DESCRIPTION =
  "VaultMTG Terms of Service — the agreement that governs your use of the Hollowmark MTG Arena companion app and all related services.";
export const EFFECTIVE_DATE = "June 10, 2026";

export const metadata: Metadata = {
  title: TOS_TITLE,
  description: TOS_DESCRIPTION,
  openGraph: {
    title: TOS_TITLE,
    description: TOS_DESCRIPTION,
    url: `${SITE_BASE.url}/terms`,
    siteName: SITE_BASE.siteName,
    type: "website",
    images: [ogImage],
  },
  twitter: {
    card: TWITTER_CARD,
    title: TOS_TITLE,
    description: TOS_DESCRIPTION,
    images: [OG_IMAGE_URL],
  },
};

// ---------------------------------------------------------------------------
// Shared style constants — Compendium editorial tokens
// ---------------------------------------------------------------------------

const EYEBROW_STYLE: React.CSSProperties = {
  fontFamily: "'JetBrains Mono', monospace",
  fontSize: 11,
  letterSpacing: "0.28em",
  textTransform: "uppercase",
  color: "rgba(74,144,217,0.65)",
  marginBottom: 14,
};

const H2_STYLE: React.CSSProperties = {
  margin: "0 0 16px",
  fontFamily: "'Cormorant Garamond', Georgia, serif",
  fontStyle: "italic",
  fontWeight: 500,
  fontSize: "clamp(22px, 2.8vw, 32px)",
  lineHeight: 1.1,
  letterSpacing: "-0.01em",
  color: "var(--color-text-primary)",
};

const H3_STYLE: React.CSSProperties = {
  margin: "24px 0 10px",
  fontFamily: "'Cormorant Garamond', Georgia, serif",
  fontStyle: "italic",
  fontWeight: 600,
  fontSize: "clamp(18px, 2vw, 22px)",
  lineHeight: 1.25,
  color: "var(--color-text-primary)",
};

const BODY_STYLE: React.CSSProperties = {
  margin: "0 0 16px",
  fontFamily: "'Inter', sans-serif",
  fontSize: 16,
  lineHeight: 1.75,
  color: "rgba(241,245,249,0.72)",
};

const SECTION_STYLE: React.CSSProperties = {
  padding: "40px 0",
  borderBottom: "1px solid var(--color-surface-border-subtle)",
};

const UL_STYLE: React.CSSProperties = {
  margin: "0 0 16px 0",
  paddingLeft: 24,
  fontFamily: "'Inter', sans-serif",
  fontSize: 16,
  lineHeight: 1.75,
  color: "rgba(241,245,249,0.72)",
};

const CALLOUT_STYLE: React.CSSProperties = {
  margin: "16px 0",
  padding: "16px 20px",
  borderRadius: 4,
  border: "1px solid rgba(74,144,217,0.2)",
  background: "rgba(74,144,217,0.04)",
  fontFamily: "'Inter', sans-serif",
  fontSize: 15,
  lineHeight: 1.7,
  color: "rgba(241,245,249,0.65)",
};

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function SectionMarker({ marker }: { marker: string }) {
  return <div style={EYEBROW_STYLE}>{marker}</div>;
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function TermsPage() {
  return (
    <>
      <Nav />

      {/* Ambient sapphire glow */}
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
          background:
            "radial-gradient(ellipse at 40% 15%, rgba(74,144,217,0.07) 0%, rgba(74,144,217,0) 60%)",
        }}
      />

      <main
        id="terms"
        style={{
          position: "relative",
          zIndex: 1,
          padding: "120px 24px 96px",
          minHeight: "calc(100vh - 84px)",
        }}
      >
        <div style={{ margin: "0 auto", maxWidth: 860 }}>

          {/* Page eyebrow */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 11,
              letterSpacing: "0.32em",
              textTransform: "uppercase",
              color: "rgba(74,144,217,0.75)",
              marginBottom: 24,
            }}
          >
            <span
              aria-hidden="true"
              style={{
                width: 28,
                height: 1,
                background: "rgba(74,144,217,0.4)",
                display: "inline-block",
                flexShrink: 0,
              }}
            />
            § Legal · Terms of Service
          </div>

          {/* Page heading */}
          <h1
            style={{
              margin: "0 0 20px",
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontStyle: "italic",
              fontWeight: 500,
              fontSize: "clamp(42px, 5.5vw, 72px)",
              lineHeight: 1.0,
              letterSpacing: "-0.02em",
              color: "var(--color-text-primary)",
              textShadow: "0 2px 12px rgba(0,0,0,0.5)",
            }}
          >
            Terms of{" "}
            <span
              style={{
                color: "var(--color-vault-sapphire)",
                textShadow: "0 0 24px rgba(74,144,217,0.35)",
              }}
            >
              Service.
            </span>
          </h1>

          {/* Effective date */}
          <p
            style={{
              margin: "0 0 56px",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 12,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "rgba(241,245,249,0.45)",
            }}
          >
            Effective Date: {EFFECTIVE_DATE}
          </p>

          {/* WotC Disclaimer */}
          <section
            id="disclaimer"
            aria-labelledby="disclaimer-heading"
            style={{
              ...SECTION_STYLE,
              background: "rgba(74,144,217,0.04)",
              border: "1px solid rgba(74,144,217,0.18)",
              borderRadius: 4,
              padding: "24px",
              marginBottom: 0,
            }}
          >
            <SectionMarker marker="§ Legal · Disclaimer" />
            <h2
              id="disclaimer-heading"
              style={{ ...H2_STYLE, fontSize: "clamp(18px, 2vw, 22px)" }}
            >
              Disclaimer — Unofficial Third-Party Tool
            </h2>
            <p style={BODY_STYLE}>
              VaultMTG is an independent, unofficial companion tool for Magic: The Gathering Arena
              (MTGA). VaultMTG is NOT affiliated with, endorsed by, or sponsored by Wizards of the
              Coast LLC or Hasbro, Inc. Use of VaultMTG does not affect your relationship with
              Wizards of the Coast or your MTGA account. &ldquo;Magic: The Gathering,&rdquo; &ldquo;Magic: The
              Gathering Arena,&rdquo; and all associated card names, game mechanics, set names, and artwork
              are the intellectual property of Wizards of the Coast LLC.
            </p>
          </section>

          {/* § 1 — Agreement to Terms */}
          <section id="section-1" aria-labelledby="section-1-heading" style={SECTION_STYLE}>
            <SectionMarker marker="§ 1" />
            <h2 id="section-1-heading" style={H2_STYLE}>
              1. Agreement to Terms
            </h2>
            <p style={BODY_STYLE}>
              By accessing and using the VaultMTG Service — including the web application at{" "}
              <code>app.vaultmtg.app</code>, the desktop application, and all related services — you
              agree to be bound by these Terms of Service (&ldquo;Terms&rdquo;). If you do not agree, do not use
              the Service.
            </p>
            <p style={BODY_STYLE}>
              The Service is provided by{" "}
              <strong style={{ color: "rgba(241,245,249,0.9)" }}>
                Ray Hamilton Engineering, LLC
              </strong>
              , a Georgia limited liability company (&ldquo;Ray Hamilton Engineering,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or
              &ldquo;our&rdquo;).
            </p>
            <p style={BODY_STYLE}>
              <strong style={{ color: "rgba(241,245,249,0.9)" }}>Eligibility.</strong> You must be
              at least 13 years old to use this Service. By using VaultMTG, you represent that you
              meet this requirement and have the legal capacity to enter into this agreement.
            </p>
          </section>

          {/* § 2 — Service Description */}
          <section id="section-2" aria-labelledby="section-2-heading" style={SECTION_STYLE}>
            <SectionMarker marker="§ 2" />
            <h2 id="section-2-heading" style={H2_STYLE}>
              2. Service Description
            </h2>
            <p style={BODY_STYLE}>
              VaultMTG is a companion application for Magic: The Gathering Arena that provides:
            </p>
            <ul style={UL_STYLE}>
              <li>Real-time match tracking and historical match analytics</li>
              <li>Draft advisor powered by machine learning</li>
              <li>Deck building, deck management, and deck analytics</li>
              <li>Card collection management and tracking</li>
              <li>Meta-game statistics and trend analysis</li>
              <li>Personalized recommendations (wildcard crafting suggestions, archetype insights)</li>
            </ul>
            <p style={BODY_STYLE}>
              <strong style={{ color: "rgba(241,245,249,0.9)" }}>
                How it works — the desktop application and log files.
              </strong>{" "}
              The Service includes a desktop application that you install on your own computer. The
              desktop application reads MTGA game log files stored locally on your own device (the
              same log files that MTGA generates as you play). The application does not modify the
              MTGA game client, inject code, or interact with MTGA&rsquo;s network traffic. It reads files
              from your MTGA installation directory only.
            </p>
            <p style={BODY_STYLE}>
              <strong style={{ color: "rgba(241,245,249,0.9)" }}>
                Collection import — default and optional modes.
              </strong>{" "}
              Importing your MTGA card collection has two modes:
            </p>
            <ul style={UL_STYLE}>
              <li>
                <strong style={{ color: "rgba(241,245,249,0.85)" }}>
                  Manual import (default).
                </strong>{" "}
                You export or paste collection data on your own and provide it to the Service. This
                is the default behavior and requires no elevated privileges.
              </li>
              <li>
                <strong style={{ color: "rgba(241,245,249,0.85)" }}>
                  Enhanced mode (opt-in).
                </strong>{" "}
                You may opt in to an enhanced collection-import mode that reads collection data
                directly from the MTGA process. Enhanced mode requires a one-time admin
                authorization on your device and operates under a least-privilege model (it does not
                run as root and does not install a persistent privileged service). You will be asked
                to consent to enhanced mode via a plain-language dialog before it is enabled; you
                may revoke it at any time from the application&rsquo;s Settings.
              </li>
            </ul>
            <p style={BODY_STYLE}>
              <strong style={{ color: "rgba(241,245,249,0.9)" }}>Current Beta Status.</strong> The
              Service is in closed beta, available by invitation only. Features, pricing, and
              availability are subject to change without notice during the beta phase. The Service is
              provided &ldquo;as-is&rdquo; and may be modified or discontinued at any time, with or without
              notice.
            </p>
          </section>

          {/* § 3 — User Accounts */}
          <section id="section-3" aria-labelledby="section-3-heading" style={SECTION_STYLE}>
            <SectionMarker marker="§ 3" />
            <h2 id="section-3-heading" style={H2_STYLE}>
              3. User Accounts and Registration
            </h2>
            <h3 style={H3_STYLE}>3.1 Account Creation</h3>
            <p style={BODY_STYLE}>
              To access the Service, you must create an account via email, Google, Apple, or
              Facebook using our authentication provider (Clerk). You are responsible for:
            </p>
            <ul style={UL_STYLE}>
              <li>Maintaining the confidentiality of your account credentials</li>
              <li>Preventing unauthorized access to your account</li>
              <li>Immediately notifying us of any unauthorized account access</li>
            </ul>
            <h3 style={H3_STYLE}>3.2 Account Responsibility</h3>
            <p style={BODY_STYLE}>
              You are solely responsible for all activity that occurs under your account. We are not
              liable for any loss or damage from unauthorized access to your account.
            </p>
            <h3 style={H3_STYLE}>3.3 Account Suspension or Termination</h3>
            <p style={BODY_STYLE}>
              We may suspend or terminate your account if you:
            </p>
            <ul style={UL_STYLE}>
              <li>Violate these Terms</li>
              <li>Engage in fraudulent, abusive, or harmful conduct</li>
              <li>Attempt to interfere with or disrupt the Service</li>
              <li>Violate any applicable law</li>
            </ul>
            <p style={BODY_STYLE}>
              You may request account deletion at any time via the in-app account-deletion control
              where available, or by contacting us at the email in Section 18. See Section 9.
            </p>
          </section>

          {/* § 4 — Desktop Application */}
          <section id="section-4" aria-labelledby="section-4-heading" style={SECTION_STYLE}>
            <SectionMarker marker="§ 4" />
            <h2 id="section-4-heading" style={H2_STYLE}>
              4. The Desktop Application and MTGA Log Access
            </h2>
            <h3 style={H3_STYLE}>4.1 What the Application Does</h3>
            <p style={BODY_STYLE}>The VaultMTG desktop application:</p>
            <ul style={UL_STYLE}>
              <li>
                Reads MTGA log files (<code>Player.log</code> on macOS;{" "}
                <code>output_log.txt</code> on Windows) from your local MTGA installation directory
              </li>
              <li>
                Parses match events, draft events, collection data, and inventory data from those
                logs
              </li>
              <li>
                Transmits the parsed, structured data to VaultMTG servers over an encrypted
                connection (HTTPS/TLS)
              </li>
              <li>Runs as a background service on your device while you play MTGA</li>
            </ul>
            <p style={BODY_STYLE}>The application does NOT:</p>
            <ul style={UL_STYLE}>
              <li>Modify any MTGA files or game data</li>
              <li>Inject code into or intercept network traffic from the MTGA game client</li>
              <li>
                Access files outside your MTGA installation directory in its default mode
              </li>
              <li>Access any files on your device unrelated to MTGA</li>
              <li>Run with elevated/root permissions in its default mode</li>
            </ul>
            <p style={BODY_STYLE}>
              The optional enhanced-mode collection import described in Section 2 requires a
              one-time admin authorization and reads from the MTGA process; it runs under a
              least-privilege model and does not install a persistent privileged service.
            </p>
            <h3 style={H3_STYLE}>4.2 Your Responsibility for Local Machine Security</h3>
            <p style={BODY_STYLE}>
              You are responsible for maintaining the security of your local machine. We are not
              responsible for breaches of your device&rsquo;s security that expose your MTGA log data or
              VaultMTG account credentials.
            </p>
            <h3 style={H3_STYLE}>4.3 MTGA Terms of Service — Your Obligation</h3>
            <p style={BODY_STYLE}>
              Your use of MTGA is governed by your own agreement with Wizards of the Coast and is
              independent of VaultMTG. It is your responsibility to ensure your use of VaultMTG is
              consistent with your MTGA Terms of Service.
            </p>
          </section>

          {/* § 5 — Acceptable Use */}
          <section id="section-5" aria-labelledby="section-5-heading" style={SECTION_STYLE}>
            <SectionMarker marker="§ 5" />
            <h2 id="section-5-heading" style={H2_STYLE}>
              5. Acceptable Use
            </h2>
            <h3 style={H3_STYLE}>5.1 Prohibited Conduct</h3>
            <p style={BODY_STYLE}>You agree NOT to:</p>
            <ul style={UL_STYLE}>
              <li>
                Use the Service to circumvent, disable, or interfere with security features of
                VaultMTG or MTGA
              </li>
              <li>
                Reverse-engineer, decompile, disassemble, or attempt to derive the source code of
                the desktop application or BFF API
              </li>
              <li>
                Use automated scripts, bots, or scrapers against the VaultMTG API or website except
                as explicitly authorized in writing
              </li>
              <li>
                Attempt to gain unauthorized access to VaultMTG systems, accounts, or infrastructure
              </li>
              <li>Transmit malware, viruses, or malicious code</li>
              <li>Harass, abuse, or threaten other users</li>
              <li>Attempt denial-of-service attacks or flood the Service with requests</li>
              <li>Use the Service to collect, harvest, or scrape data about other users</li>
              <li>
                Violate any applicable local, state, national, or international law or regulation
              </li>
            </ul>
            <h3 style={H3_STYLE}>5.2 Enforcement</h3>
            <p style={BODY_STYLE}>We reserve the right to:</p>
            <ul style={UL_STYLE}>
              <li>Investigate suspected violations</li>
              <li>
                Suspend or terminate your account, with or without notice, for violations
              </li>
              <li>Cooperate with law enforcement for suspected illegal activity</li>
              <li>Take technical measures to prevent or stop abuse</li>
            </ul>
          </section>

          {/* § 6 — Intellectual Property */}
          <section id="section-6" aria-labelledby="section-6-heading" style={SECTION_STYLE}>
            <SectionMarker marker="§ 6" />
            <h2 id="section-6-heading" style={H2_STYLE}>
              6. Intellectual Property
            </h2>
            <h3 style={H3_STYLE}>6.1 VaultMTG Intellectual Property</h3>
            <p style={BODY_STYLE}>
              All content, features, and functionality of the Service — including software code, UI
              design, branding, logos, text, and graphics — are owned by Ray Hamilton Engineering,
              LLC or its licensors and are protected by applicable intellectual property law.
            </p>
            <h3 style={H3_STYLE}>6.2 Limited License to You</h3>
            <p style={BODY_STYLE}>
              We grant you a limited, non-exclusive, non-transferable, revocable license to:
            </p>
            <ul style={UL_STYLE}>
              <li>
                Access and use the Service for your personal, non-commercial purposes
              </li>
              <li>
                Install and run the desktop application on your own device for use with your own
                MTGA account
              </li>
              <li>
                View match history, analytics, and recommendations generated by the Service for your
                own account
              </li>
            </ul>
            <p style={BODY_STYLE}>This license does NOT permit you to:</p>
            <ul style={UL_STYLE}>
              <li>Sublicense, sell, or transfer the Service or the desktop application to others</li>
              <li>
                Use the Service for competitive intelligence purposes (benchmarking VaultMTG against
                competing MTGA tools for the purpose of building a competing product)
              </li>
              <li>
                Redistribute the desktop application binary outside of our official download
                channels
              </li>
              <li>
                Use VaultMTG&rsquo;s API endpoints outside the intended use of the VaultMTG application
              </li>
            </ul>
            <h3 style={H3_STYLE}>6.3 Your Data</h3>
            <p style={BODY_STYLE}>
              You retain ownership of your MTGA gameplay data (match history, deck lists, collection
              data) that you submit to the Service. By transmitting your data to VaultMTG, you grant
              us a license to store, process, and display it for the purpose of providing the
              Service to you, and to derive anonymous gameplay records for training and improving our
              machine-learning models. See the Privacy Policy for data retention, deletion, and the
              de-identification approach for ML training data.
            </p>
            <h3 style={H3_STYLE}>6.4 Third-Party Content</h3>
            <p style={BODY_STYLE}>
              The Service may include third-party content used under license (for example, card data
              from Scryfall, set information, card imagery). We do not claim ownership of such
              content. Use of such content is subject to the respective third parties&rsquo; terms.
            </p>
          </section>

          {/* § 7 — Disclaimer of Warranties */}
          <section id="section-7" aria-labelledby="section-7-heading" style={SECTION_STYLE}>
            <SectionMarker marker="§ 7" />
            <h2 id="section-7-heading" style={H2_STYLE}>
              7. Disclaimer of Warranties
            </h2>
            <div style={CALLOUT_STYLE}>
              <p style={{ margin: "0 0 12px", color: "rgba(241,245,249,0.72)" }}>
                THE SERVICE IS PROVIDED &ldquo;AS-IS&rdquo; AND &ldquo;AS AVAILABLE&rdquo; WITHOUT WARRANTY OF ANY KIND,
                EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO:
              </p>
              <ul style={{ ...UL_STYLE, margin: "0 0 12px 0" }}>
                <li>
                  WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR
                  NON-INFRINGEMENT
                </li>
                <li>WARRANTY THAT THE SERVICE WILL BE UNINTERRUPTED, SECURE, OR ERROR-FREE</li>
                <li>WARRANTY THAT DEFECTS WILL BE CORRECTED</li>
                <li>
                  WARRANTY THAT ANALYTICS, RECOMMENDATIONS, OR MATCH DATA ARE ACCURATE OR COMPLETE
                </li>
              </ul>
              <p style={{ margin: "0", color: "rgba(241,245,249,0.72)" }}>
                We specifically disclaim any warranty that:
              </p>
              <ul style={{ ...UL_STYLE, margin: "0" }}>
                <li>
                  The desktop application will capture all MTGA matches or gameplay events (network
                  interruptions, log-format changes by Wizards of the Coast, or unsupported MTGA
                  versions may cause gaps)
                </li>
                <li>
                  Recommendations (draft picks, wildcard suggestions) will improve your MTGA
                  performance
                </li>
                <li>
                  Match history or collection data is a complete record of your MTGA activity
                </li>
              </ul>
            </div>
          </section>

          {/* § 8 — Limitation of Liability */}
          <section id="section-8" aria-labelledby="section-8-heading" style={SECTION_STYLE}>
            <SectionMarker marker="§ 8" />
            <h2 id="section-8-heading" style={H2_STYLE}>
              8. Limitation of Liability
            </h2>
            <h3 style={H3_STYLE}>8.1 Exclusion of Consequential Damages</h3>
            <div style={CALLOUT_STYLE}>
              <p style={{ margin: "0 0 12px", color: "rgba(241,245,249,0.72)" }}>
                TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, RAY HAMILTON ENGINEERING, LLC
                SHALL NOT BE LIABLE FOR:
              </p>
              <ul style={{ ...UL_STYLE, margin: 0 }}>
                <li>INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES</li>
                <li>LOSS OF PROFITS, REVENUE, DATA, GOODWILL, OR BUSINESS OPPORTUNITIES</li>
                <li>DAMAGES ARISING FROM YOUR USE OF, OR INABILITY TO USE, THE SERVICE</li>
                <li>DAMAGES ARISING FROM ANY INTERRUPTION OR CESSATION OF THE SERVICE</li>
                <li>DAMAGES ARISING FROM THIRD-PARTY CONDUCT OR CONTENT</li>
              </ul>
            </div>
            <h3 style={H3_STYLE}>8.2 Liability Cap</h3>
            <div style={CALLOUT_STYLE}>
              <p style={{ margin: 0, color: "rgba(241,245,249,0.72)" }}>
                TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, OUR TOTAL CUMULATIVE LIABILITY
                TO YOU FOR ALL CLAIMS ARISING FROM OR RELATED TO THE SERVICE SHALL NOT EXCEED{" "}
                <strong style={{ color: "rgba(241,245,249,0.9)" }}>U.S. $100</strong> OR THE AMOUNT
                YOU PAID US IN THE 12 MONTHS BEFORE THE CLAIM, WHICHEVER IS GREATER. The Service is
                provided free of charge during the closed beta; this cap will be reviewed if and
                when a paid tier is introduced.
              </p>
            </div>
            <h3 style={H3_STYLE}>8.3 Exceptions</h3>
            <p style={BODY_STYLE}>
              The above limitations do not apply to: (a) liability that cannot be excluded by law;
              (b) liability for death or personal injury caused by our negligence; (c) fraud or
              willful misconduct.
            </p>
          </section>

          {/* § 9 — Termination */}
          <section id="section-9" aria-labelledby="section-9-heading" style={SECTION_STYLE}>
            <SectionMarker marker="§ 9" />
            <h2 id="section-9-heading" style={H2_STYLE}>
              9. Termination
            </h2>
            <h3 style={H3_STYLE}>9.1 Termination by Us</h3>
            <p style={BODY_STYLE}>
              We may terminate or suspend your access to the Service at any time, with or without
              cause or notice, including if:
            </p>
            <ul style={UL_STYLE}>
              <li>You violate these Terms</li>
              <li>Your account has been inactive for 12 months (during beta)</li>
              <li>We discontinue the Service or any material feature</li>
            </ul>
            <h3 style={H3_STYLE}>9.2 Termination by You</h3>
            <p style={BODY_STYLE}>
              You may close your account at any time via the in-app account-deletion control where
              available, or by submitting an account-deletion request to us at the email in Section
              18. We will process the deletion within 30 days, subject to the limited retention
              noted in the Privacy Policy.
            </p>
            <h3 style={H3_STYLE}>9.3 Effect of Termination</h3>
            <p style={BODY_STYLE}>Upon termination:</p>
            <ul style={UL_STYLE}>
              <li>Your right to access the Service immediately ceases</li>
              <li>
                We will process deletion of your personal data per our Privacy Policy and applicable
                law
              </li>
              <li>
                Sections of these Terms that by their nature survive termination (Sections 5, 6, 7,
                8, 10, 11, 12) remain in force
              </li>
            </ul>
          </section>

          {/* § 10 — Privacy */}
          <section id="section-10" aria-labelledby="section-10-heading" style={SECTION_STYLE}>
            <SectionMarker marker="§ 10" />
            <h2 id="section-10-heading" style={H2_STYLE}>
              10. Privacy
            </h2>
            <p style={BODY_STYLE}>
              VaultMTG&rsquo;s handling of your personal information is governed by our{" "}
              <a
                href="/privacy"
                style={{
                  color: "var(--color-vault-sapphire)",
                  textDecoration: "underline",
                  textUnderlineOffset: 3,
                }}
              >
                Privacy Policy
              </a>
              . By using the Service, you acknowledge and agree to the data practices described in
              the Privacy Policy.
            </p>
          </section>

          {/* § 11 — Indemnification */}
          <section id="section-11" aria-labelledby="section-11-heading" style={SECTION_STYLE}>
            <SectionMarker marker="§ 11" />
            <h2 id="section-11-heading" style={H2_STYLE}>
              11. Indemnification
            </h2>
            <p style={BODY_STYLE}>
              You agree to indemnify, defend, and hold harmless Ray Hamilton Engineering, LLC and
              its officers, directors, employees, and agents from and against any claims, damages,
              losses, costs, and expenses (including reasonable attorneys&rsquo; fees) arising from:
            </p>
            <ul style={UL_STYLE}>
              <li>Your use of the Service</li>
              <li>Your violation of these Terms</li>
              <li>Your violation of any applicable law or regulation</li>
              <li>
                Any content you upload, submit, or transmit through the Service
              </li>
              <li>Your infringement of any third-party intellectual property right</li>
            </ul>
          </section>

          {/* § 12 — Dispute Resolution */}
          <section id="section-12" aria-labelledby="section-12-heading" style={SECTION_STYLE}>
            <SectionMarker marker="§ 12" />
            <h2 id="section-12-heading" style={H2_STYLE}>
              12. Dispute Resolution
            </h2>
            <h3 style={H3_STYLE}>12.1 Informal Resolution</h3>
            <p style={BODY_STYLE}>
              Before initiating formal legal proceedings, you agree to contact us at the email in
              Section 18 and attempt in good faith to resolve the dispute informally within 30 days.
            </p>
            <h3 style={H3_STYLE}>12.2 Governing Law</h3>
            <p style={BODY_STYLE}>
              These Terms are governed by the laws of the{" "}
              <strong style={{ color: "rgba(241,245,249,0.9)" }}>State of Georgia, USA</strong>,
              without regard to conflict-of-law principles. The United Nations Convention on
              Contracts for the International Sale of Goods does not apply.
            </p>
            <h3 style={H3_STYLE}>12.3 Binding Individual Arbitration</h3>
            <div style={{ ...CALLOUT_STYLE, borderColor: "rgba(74,144,217,0.3)" }}>
              <p
                style={{
                  margin: "0 0 12px",
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 10,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "rgba(74,144,217,0.7)",
                }}
              >
                Please read this section carefully. It affects your legal rights.
              </p>
              <p style={{ margin: "0 0 12px", color: "rgba(241,245,249,0.72)" }}>
                Any dispute, claim, or controversy arising out of or relating to these Terms or to
                your use of the Service (a &ldquo;Dispute&rdquo;) will be resolved by{" "}
                <strong style={{ color: "rgba(241,245,249,0.9)" }}>
                  binding individual arbitration
                </strong>{" "}
                rather than in court, except as set out in Section 12.5 (Small Claims) and except
                for claims that cannot be arbitrated as a matter of law.
              </p>
              <p style={{ margin: 0, color: "rgba(241,245,249,0.72)" }}>
                The arbitration will be administered by the{" "}
                <strong style={{ color: "rgba(241,245,249,0.9)" }}>
                  American Arbitration Association (AAA)
                </strong>{" "}
                under its Consumer Arbitration Rules then in effect. The arbitration will be
                conducted by a single arbitrator. The seat of arbitration is{" "}
                <strong style={{ color: "rgba(241,245,249,0.9)" }}>Atlanta, Georgia</strong>, and
                proceedings may be conducted in person, by phone, or by video at the arbitrator&rsquo;s
                reasonable discretion. The arbitrator&rsquo;s award is final and binding on the parties
                and may be entered as a judgment in any court of competent jurisdiction. You and Ray
                Hamilton Engineering, LLC each waive any right to a jury trial.
              </p>
            </div>
            <h3 style={H3_STYLE}>12.4 Class-Action Waiver</h3>
            <div style={CALLOUT_STYLE}>
              <p style={{ margin: 0, color: "rgba(241,245,249,0.72)" }}>
                YOU AND RAY HAMILTON ENGINEERING, LLC AGREE THAT EACH MAY BRING CLAIMS AGAINST THE
                OTHER ONLY IN YOUR OR ITS INDIVIDUAL CAPACITY, AND NOT AS A PLAINTIFF OR CLASS
                MEMBER IN ANY PURPORTED CLASS, CONSOLIDATED, OR REPRESENTATIVE PROCEEDING. The
                arbitrator may not consolidate more than one person&rsquo;s claims and may not preside
                over any form of representative or class proceeding. If this class-action waiver is
                found unenforceable as to a particular claim, that claim (and only that claim) shall
                proceed in court, and the remainder of this Section 12 shall remain enforceable.
              </p>
            </div>
            <h3 style={H3_STYLE}>12.5 Small-Claims Carve-Out</h3>
            <p style={BODY_STYLE}>
              Either party may bring an individual claim in a small-claims court of competent
              jurisdiction, instead of arbitration, so long as the claim remains in that forum and
              is brought only on an individual basis.
            </p>
            <h3 style={H3_STYLE}>12.6 Opt-Out</h3>
            <p style={BODY_STYLE}>
              You may opt out of this arbitration agreement and class-action waiver by sending
              written notice within{" "}
              <strong style={{ color: "rgba(241,245,249,0.9)" }}>30 days</strong> of the date you
              first agree to these Terms to{" "}
              <code>legal@vaultmtg.app</code>. The notice must include your full name, the email
              associated with your VaultMTG account, and the statement &ldquo;I opt out of the arbitration
              agreement and class-action waiver.&rdquo; If you opt out, this Section 12 (other than the
              governing-law provision in Section 12.2) does not apply to you.
            </p>
            <h3 style={H3_STYLE}>12.7 Survival</h3>
            <p style={BODY_STYLE}>
              Sections 12.3, 12.4, 12.5, and 12.6 survive termination of these Terms.
            </p>
          </section>

          {/* § 13 — Changes to Terms */}
          <section id="section-13" aria-labelledby="section-13-heading" style={SECTION_STYLE}>
            <SectionMarker marker="§ 13" />
            <h2 id="section-13-heading" style={H2_STYLE}>
              13. Changes to These Terms
            </h2>
            <p style={BODY_STYLE}>
              We may update these Terms at any time. We will notify you of material changes by:
            </p>
            <ul style={UL_STYLE}>
              <li>Updating the &ldquo;Last Updated&rdquo; date below</li>
              <li>Posting a notice on the Service or website</li>
              <li>Sending an email notification for significant changes</li>
            </ul>
            <p style={BODY_STYLE}>
              Your continued use of the Service after any modification constitutes your acceptance of
              the updated Terms.
            </p>
          </section>

          {/* § 14 — Beta-Tester Confidentiality */}
          <section id="section-14" aria-labelledby="section-14-heading" style={SECTION_STYLE}>
            <SectionMarker marker="§ 14" />
            <h2 id="section-14-heading" style={H2_STYLE}>
              14. Beta-Tester Confidentiality
            </h2>
            <p style={BODY_STYLE}>
              Access to the Service during the closed beta may expose you to non-public information
              about VaultMTG, including features under development, performance characteristics, and
              pricing plans. You agree to:
            </p>
            <ul style={UL_STYLE}>
              <li>Keep this information confidential</li>
              <li>Not disclose it to competitors or unauthorized third parties</li>
              <li>
                Not publish or post about non-public features without our prior written consent
              </li>
            </ul>
            <p style={BODY_STYLE}>
              This obligation survives termination of your account for 2 years.
            </p>
          </section>

          {/* § 15 — Third-Party Services */}
          <section id="section-15" aria-labelledby="section-15-heading" style={SECTION_STYLE}>
            <SectionMarker marker="§ 15" />
            <h2 id="section-15-heading" style={H2_STYLE}>
              15. Third-Party Services and Links
            </h2>
            <p style={BODY_STYLE}>
              The Service may reference or link to third-party services (Scryfall card data, MTGA
              official site, and others). We are not responsible for the content, accuracy, or
              privacy practices of third-party sites. Your use of those services is subject to their
              own terms.
            </p>
          </section>

          {/* § 16 — Severability */}
          <section id="section-16" aria-labelledby="section-16-heading" style={SECTION_STYLE}>
            <SectionMarker marker="§ 16" />
            <h2 id="section-16-heading" style={H2_STYLE}>
              16. Severability
            </h2>
            <p style={BODY_STYLE}>
              If any provision of these Terms is found to be invalid or unenforceable, the remaining
              provisions remain in full force. The invalid provision will be modified to the minimum
              extent necessary to be valid and enforceable.
            </p>
          </section>

          {/* § 17 — Entire Agreement */}
          <section id="section-17" aria-labelledby="section-17-heading" style={SECTION_STYLE}>
            <SectionMarker marker="§ 17" />
            <h2 id="section-17-heading" style={H2_STYLE}>
              17. Entire Agreement
            </h2>
            <p style={BODY_STYLE}>
              These Terms, together with the Privacy Policy, constitute the entire agreement between
              you and Ray Hamilton Engineering, LLC regarding the Service. They supersede all prior
              or contemporaneous agreements, understandings, and negotiations.
            </p>
          </section>

          {/* § 18 — Contact */}
          <section id="section-18" aria-labelledby="section-18-heading" style={SECTION_STYLE}>
            <SectionMarker marker="§ 18" />
            <h2 id="section-18-heading" style={H2_STYLE}>
              18. Contact
            </h2>
            <p style={BODY_STYLE}>
              For general support:{" "}
              <a
                href="mailto:support@vaultmtg.app"
                style={{ color: "var(--color-vault-sapphire)" }}
              >
                support@vaultmtg.app
              </a>
              . For legal notices and arbitration opt-out:{" "}
              <a
                href="mailto:legal@vaultmtg.app"
                style={{ color: "var(--color-vault-sapphire)" }}
              >
                legal@vaultmtg.app
              </a>
              . For privacy inquiries and data-subject-rights requests:{" "}
              <a
                href="mailto:privacy@vaultmtg.app"
                style={{ color: "var(--color-vault-sapphire)" }}
              >
                privacy@vaultmtg.app
              </a>
              .
            </p>
            <p style={BODY_STYLE}>Postal address:</p>
            <blockquote
              style={{
                margin: "0 0 16px",
                paddingLeft: 20,
                borderLeft: "2px solid rgba(74,144,217,0.3)",
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontStyle: "italic",
                fontSize: 16,
                color: "rgba(241,245,249,0.6)",
                lineHeight: 1.6,
              }}
            >
              Ray Hamilton Engineering, LLC
              <br />
              [Postal address — to be inserted at publication; Faye supplies the registered address
              used in the Georgia LLC filing]
            </blockquote>
          </section>

          {/* Last Updated */}
          <div
            style={{
              padding: "40px 0 0",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 11,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "rgba(241,245,249,0.35)",
            }}
          >
            Last Updated: {EFFECTIVE_DATE}
          </div>

          {/* Ornamental break */}
          <div
            aria-hidden="true"
            style={{ textAlign: "center", margin: "64px 0 0" }}
          >
            <span
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontStyle: "italic",
                fontSize: 20,
                color: "rgba(74,144,217,0.4)",
                letterSpacing: "0.5em",
              }}
            >
              ❦ ❦ ❦
            </span>
          </div>

        </div>
      </main>

      <Footer />
    </>
  );
}
