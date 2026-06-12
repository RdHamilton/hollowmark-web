// Privacy Policy page — § Legal · Privacy
// Ticket #881 — publish finalized Privacy Policy on hollowmark.app/privacy
// Design: Cormorant Garamond italic display, JetBrains Mono markers,
// sapphire palette — follows ui_kits/vaultmtg-web/ Compendium editorial aesthetic.
// Static export (output: "export") — no dynamic server features.
// Legal text rendered faithfully from privacy-policy-DRAFT.md (FINAL 2026-06-10).
// Effective Date: 2026-06-10

import type { Metadata } from "next";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { ogImage, SITE_BASE, TWITTER_CARD, OG_IMAGE_URL } from "@/lib/og-metadata";

const PRIVACY_TITLE = "Privacy Policy — Hollowmark";
const PRIVACY_DESCRIPTION =
  "VaultMTG Privacy Policy — how Ray Hamilton Engineering, LLC collects, uses, and protects your information when you use the Hollowmark MTG Arena companion app.";
export const EFFECTIVE_DATE = "June 10, 2026";

export const metadata: Metadata = {
  title: PRIVACY_TITLE,
  description: PRIVACY_DESCRIPTION,
  openGraph: {
    title: PRIVACY_TITLE,
    description: PRIVACY_DESCRIPTION,
    url: `${SITE_BASE.url}/privacy`,
    siteName: SITE_BASE.siteName,
    type: "website",
    images: [ogImage],
  },
  twitter: {
    card: TWITTER_CARD,
    title: PRIVACY_TITLE,
    description: PRIVACY_DESCRIPTION,
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

// Table styles
const TABLE_STYLE: React.CSSProperties = {
  width: "100%",
  borderCollapse: "collapse",
  margin: "0 0 24px",
  fontFamily: "'Inter', sans-serif",
  fontSize: 14,
  lineHeight: 1.6,
};

const TH_STYLE: React.CSSProperties = {
  padding: "10px 14px",
  background: "rgba(74,144,217,0.08)",
  border: "1px solid rgba(74,144,217,0.15)",
  textAlign: "left",
  fontFamily: "'JetBrains Mono', monospace",
  fontSize: 10,
  letterSpacing: "0.18em",
  textTransform: "uppercase",
  color: "rgba(74,144,217,0.8)",
  fontWeight: 500,
};

const TD_STYLE: React.CSSProperties = {
  padding: "10px 14px",
  border: "1px solid rgba(241,245,249,0.08)",
  color: "rgba(241,245,249,0.68)",
  verticalAlign: "top",
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

export default function PrivacyPage() {
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
        id="privacy"
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
            § Legal · Privacy Policy
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
            Privacy{" "}
            <span
              style={{
                color: "var(--color-vault-sapphire)",
                textShadow: "0 0 24px rgba(74,144,217,0.35)",
              }}
            >
              Policy.
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
              Coast LLC or Hasbro, Inc. &ldquo;Magic: The Gathering,&rdquo; &ldquo;Magic: The Gathering Arena,&rdquo; and
              all associated card names, game mechanics, set names, and artwork are the intellectual
              property of Wizards of the Coast LLC.
            </p>
            <p style={{ ...BODY_STYLE, margin: 0 }}>
              VaultMTG reads MTGA game log files stored on your local device to provide analytics.
              The VaultMTG desktop application does not modify the MTGA game client, inject code, or
              interact with MTGA&rsquo;s network traffic.
            </p>
          </section>

          {/* § 1 — Introduction */}
          <section id="section-1" aria-labelledby="section-1-heading" style={SECTION_STYLE}>
            <SectionMarker marker="§ 1" />
            <h2 id="section-1-heading" style={H2_STYLE}>
              1. Introduction
            </h2>
            <p style={BODY_STYLE}>
              VaultMTG (&ldquo;we,&rdquo; &ldquo;us,&rdquo; &ldquo;our,&rdquo; or &ldquo;Company&rdquo;) is a service operated by{" "}
              <strong style={{ color: "rgba(241,245,249,0.9)" }}>
                Ray Hamilton Engineering, LLC
              </strong>
              , a Georgia limited liability company. We operate the VaultMTG platform: a desktop
              companion application, a web-based analytics application, and a marketing website for
              Magic: The Gathering Arena (MTGA) players.
            </p>
            <p style={BODY_STYLE}>
              This Privacy Policy explains how we collect, use, disclose, and safeguard your
              information when you use:
            </p>
            <ul style={UL_STYLE}>
              <li>
                The VaultMTG web application at <code>app.vaultmtg.app</code>
              </li>
              <li>
                The VaultMTG marketing/waitlist site at <code>vaultmtg.app</code>
              </li>
              <li>
                The VaultMTG desktop application (available for macOS and Windows)
              </li>
              <li>All related services (collectively, the &ldquo;Service&rdquo;)</li>
            </ul>
            <p style={BODY_STYLE}>
              <strong style={{ color: "rgba(241,245,249,0.9)" }}>Closed Beta Notice.</strong> The
              Service is currently in closed beta and is available by invitation only to a limited
              group of testers, including testers located in the European Economic Area and the
              United Kingdom. The data-subject rights described in Section 9 apply to all beta users
              in those regions from the start of the beta.
            </p>
            <p style={BODY_STYLE}>
              Please read this Privacy Policy carefully. If you do not agree with our practices, do
              not use the Service.
            </p>
          </section>

          {/* § 2 — Information We Collect */}
          <section id="section-2" aria-labelledby="section-2-heading" style={SECTION_STYLE}>
            <SectionMarker marker="§ 2" />
            <h2 id="section-2-heading" style={H2_STYLE}>
              2. Information We Collect
            </h2>

            <h3 style={H3_STYLE}>2.1 Account and Authentication Data (Clerk)</h3>
            <p style={BODY_STYLE}>When you sign up or sign in, we collect:</p>
            <ul style={UL_STYLE}>
              <li>
                <strong style={{ color: "rgba(241,245,249,0.85)" }}>Email address</strong> — used
                as your primary account identifier.
              </li>
              <li>
                <strong style={{ color: "rgba(241,245,249,0.85)" }}>Name</strong> (optional) — if
                provided during sign-up.
              </li>
              <li>
                <strong style={{ color: "rgba(241,245,249,0.85)" }}>Authentication method</strong>{" "}
                — email/password, Google, Apple, or Facebook (via Clerk OAuth flows).
              </li>
              <li>
                <strong style={{ color: "rgba(241,245,249,0.85)" }}>Opaque Clerk user ID</strong>{" "}
                — a non-reversible identifier assigned by our authentication provider; used
                internally as <code>account_id</code>; never stored in plain form in analytics
                systems (see Section 2.5).
              </li>
              <li>
                <strong style={{ color: "rgba(241,245,249,0.85)" }}>
                  Session tokens and login event timestamps
                </strong>{" "}
                — managed by Clerk; stored in Clerk&rsquo;s infrastructure.
              </li>
            </ul>
            <p style={BODY_STYLE}>
              This data is collected via Clerk Identity Platform. We do not roll custom JWT logic.
            </p>

            <h3 style={H3_STYLE}>2.2 MTGA Gameplay Data (Desktop Application — User&rsquo;s Own Data)</h3>
            <p style={BODY_STYLE}>
              The VaultMTG desktop application reads MTGA log files stored on your local device.
              These are the same log files that MTGA writes as you play — we do not access any files
              outside your MTGA installation directory, and we do not modify any game files.
            </p>
            <p style={BODY_STYLE}>
              The application parses and transmits the following to our servers:
            </p>
            <p style={{ ...BODY_STYLE, marginBottom: 8 }}>
              <strong style={{ color: "rgba(241,245,249,0.85)" }}>Match data:</strong>
            </p>
            <ul style={UL_STYLE}>
              <li>Match results (win/loss/draw) per game and per match</li>
              <li>Deck composition used in each match (card IDs and quantities)</li>
              <li>
                Game decisions and play-by-play at a structural level (card plays, turns, actions —
                as recorded in MTGA&rsquo;s GRE message log)
              </li>
              <li>Opponent deck archetype information (as visible in your own MTGA log)</li>
              <li>Event/format information (e.g., Standard, Draft, Premier Draft)</li>
            </ul>
            <p style={{ ...BODY_STYLE, marginBottom: 8 }}>
              <strong style={{ color: "rgba(241,245,249,0.85)" }}>Draft data:</strong>
            </p>
            <ul style={UL_STYLE}>
              <li>Draft event ID and event name</li>
              <li>Cards offered in each draft pack (as logged by MTGA)</li>
              <li>Cards you selected (picks)</li>
              <li>Deck built from the draft</li>
            </ul>
            <p style={{ ...BODY_STYLE, marginBottom: 8 }}>
              <strong style={{ color: "rgba(241,245,249,0.85)" }}>
                Collection and inventory data:
              </strong>
            </p>
            <ul style={UL_STYLE}>
              <li>
                Your MTGA card collection (card IDs and quantities, derived from{" "}
                <code>GetPlayerCardsResp</code> log events)
              </li>
              <li>Wildcard counts (Common, Uncommon, Rare, Mythic)</li>
              <li>Gold and gem balances</li>
              <li>Booster pack inventory</li>
              <li>
                Player rank (Constructed and Limited: class, level, percentile)
              </li>
              <li>Player screen name and MTGA client ID (as recorded in the log)</li>
              <li>Daily and weekly win progress</li>
            </ul>
            <p style={BODY_STYLE}>
              This log data belongs to you and reflects your own MTGA gameplay. We transmit it from
              your device to our servers for storage and to power the Service&rsquo;s analytics,
              recommendations, and history features. We do not sell this data. We do not share it
              with any party other than the sub-processors listed in Section 5.
            </p>
            <p style={{ ...BODY_STYLE, marginBottom: 8 }}>
              <strong style={{ color: "rgba(241,245,249,0.85)" }}>
                Device and application metadata:
              </strong>
            </p>
            <ul style={UL_STYLE}>
              <li>
                Device identifier (UUID): a stable per-installation identifier derived from device
                characteristics. Used to associate events across sessions and to support multi-device
                pairing. The device ID is not a hardware serial number.
              </li>
              <li>Operating system type (macOS/Windows) and version</li>
              <li>Application version (semver)</li>
              <li>
                Pairing event timestamp and status (whether your installation successfully connected
                to your account)
              </li>
            </ul>

            <h3 style={H3_STYLE}>2.3 Waitlist Signup (Marketing Site)</h3>
            <p style={BODY_STYLE}>
              If you submit your email address on the <code>vaultmtg.app</code> waitlist form, we
              collect:
            </p>
            <ul style={UL_STYLE}>
              <li>
                <strong style={{ color: "rgba(241,245,249,0.85)" }}>Email address</strong> — stored
                in our database and added to our Mailchimp mailing-list audience.
              </li>
              <li>
                <strong style={{ color: "rgba(241,245,249,0.85)" }}>UTM attribution fields</strong>{" "}
                — <code>utm_source</code>, <code>utm_medium</code>, <code>utm_campaign</code> (where
                present in the URL) to understand which marketing channels drove your signup.
              </li>
              <li>
                <strong style={{ color: "rgba(241,245,249,0.85)" }}>Referrer URL</strong> (where
                present).
              </li>
            </ul>
            <p style={BODY_STYLE}>
              This data is collected via a public <code>POST /api/v1/waitlist</code> endpoint (no
              authentication required). The email is used only to notify you about VaultMTG
              availability and updates. We will not send marketing or promotional emails unrelated to
              VaultMTG without your explicit opt-in.
            </p>

            <h3 style={H3_STYLE}>2.4 Error and Observability Data (Sentry)</h3>
            <p style={BODY_STYLE}>
              The BFF server and the React web application send error and exception data to Sentry,
              including:
            </p>
            <ul style={UL_STYLE}>
              <li>Error messages and stack traces</li>
              <li>
                Request URL paths (no query strings or request bodies are included in Sentry
                payloads)
              </li>
              <li>Browser/OS/runtime metadata</li>
              <li>Application release version</li>
            </ul>
            <p style={BODY_STYLE}>
              Sentry events are used solely for diagnosing and resolving bugs. We do not
              intentionally include personally identifiable information in Sentry payloads, but stack
              traces may incidentally include data visible at the error boundary. Sentry data is
              retained for 30 days by default.
            </p>

            <h3 style={H3_STYLE}>2.5 Product Analytics (PostHog)</h3>
            <p style={BODY_STYLE}>
              We use PostHog for product telemetry on both the desktop SPA (
              <code>app.vaultmtg.app</code>) and the marketing site (<code>vaultmtg.app</code>).
            </p>
            <p style={{ ...BODY_STYLE, marginBottom: 8 }}>
              <strong style={{ color: "rgba(241,245,249,0.85)" }}>PII protections in place:</strong>
            </p>
            <ul style={UL_STYLE}>
              <li>
                The BFF uses SHA-256 (hex, first 16 characters) to hash the Clerk{" "}
                <code>account_id</code> before sending it as a PostHog <code>distinct_id</code>. Raw
                Clerk user IDs are never sent to PostHog.
              </li>
              <li>
                When the SPA identifies a user in PostHog, the email address is SHA-256 hashed (hex,
                first 16 characters) before being stored as the <code>hashed_email</code> person
                property. The raw email address is never sent to PostHog.
              </li>
              <li>PostHog autocapture is disabled. We fire only typed, named events from our taxonomy.</li>
              <li>
                Session recording is disabled by default. It may be enabled in a future release only
                after explicit user opt-in with appropriate disclosure.
              </li>
            </ul>
            <p style={{ ...BODY_STYLE, marginBottom: 8 }}>
              <strong style={{ color: "rgba(241,245,249,0.85)" }}>
                Events collected on the SPA (<code>app.vaultmtg.app</code>):
              </strong>
            </p>
            <div style={{ overflowX: "auto", marginBottom: 16 }}>
              <table style={TABLE_STYLE}>
                <thead>
                  <tr>
                    <th style={TH_STYLE}>Event</th>
                    <th style={TH_STYLE}>Purpose</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["app_session_started", "Session initialization and service performance timing"],
                    [
                      "app_user_identified",
                      "Records authentication method (email/Google/etc.) on sign-in",
                    ],
                    ["app_user_signed_out", "Session end"],
                    [
                      "page_viewed",
                      "Feature navigation (page name only, no URL query params)",
                    ],
                    [
                      "funnel_*",
                      "Activation funnel steps: signup, application download, application pairing, first game, first data load",
                    ],
                    [
                      "feature_*",
                      "Feature adoption signals: match history, draft advisor, deck builder, collection, meta",
                    ],
                    [
                      "error_*",
                      "Client-side error signals (connection failure, auth failure, data load failure)",
                    ],
                    [
                      "wildcard_recommendation_clicked",
                      "Engagement with ML recommendation features",
                    ],
                  ].map(([event, purpose]) => (
                    <tr key={event}>
                      <td style={TD_STYLE}>
                        <code style={{ fontSize: 13 }}>{event}</code>
                      </td>
                      <td style={TD_STYLE}>{purpose}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p style={{ ...BODY_STYLE, marginBottom: 8 }}>
              <strong style={{ color: "rgba(241,245,249,0.85)" }}>
                Events collected on the marketing site (<code>vaultmtg.app</code>):
              </strong>
            </p>
            <div style={{ overflowX: "auto", marginBottom: 16 }}>
              <table style={TABLE_STYLE}>
                <thead>
                  <tr>
                    <th style={TH_STYLE}>Event</th>
                    <th style={TH_STYLE}>Purpose</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={TD_STYLE}>
                      <code style={{ fontSize: 13 }}>funnel_landing_page_viewed</code>
                    </td>
                    <td style={TD_STYLE}>
                      Fired on page load with UTM context and referrer
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p style={{ ...BODY_STYLE, marginBottom: 8 }}>
              <strong style={{ color: "rgba(241,245,249,0.85)" }}>
                Server-side events emitted by the BFF:
              </strong>
            </p>
            <div style={{ overflowX: "auto", marginBottom: 16 }}>
              <table style={TABLE_STYLE}>
                <thead>
                  <tr>
                    <th style={TH_STYLE}>Event</th>
                    <th style={TH_STYLE}>Purpose</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={TD_STYLE}>
                      <code style={{ fontSize: 13 }}>funnel_daemon_paired</code>
                    </td>
                    <td style={TD_STYLE}>
                      Emitted after a successful application registration; uses hashed{" "}
                      <code>account_id</code> as <code>distinct_id</code>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 style={H3_STYLE}>2.6 Marketing Site Analytics (Google Analytics 4)</h3>
            <p style={BODY_STYLE}>
              The VaultMTG marketing site (<code>vaultmtg.app</code>) includes Google Analytics 4
              (GA4, measurement ID <code>G-Y4YSVZF8ZD</code>). GA4 collects:
            </p>
            <ul style={UL_STYLE}>
              <li>Page views and session data</li>
              <li>Traffic source and attribution (UTM parameters, referrer)</li>
              <li>
                Approximate geographic location (country/region, derived from IP; IP itself is not
                retained by GA4 under default settings)
              </li>
              <li>Device and browser metadata</li>
            </ul>
            <p style={BODY_STYLE}>
              GA4 data is processed by Google LLC under its standard terms. For users in the
              European Economic Area, United Kingdom, and Switzerland, GA4 is loaded only after
              consent via our cookie-consent banner (see Section 6.6). You can also opt out via the
              Google Analytics opt-out browser add-on.
            </p>

            <h3 style={H3_STYLE}>2.7 Customer Support</h3>
            <p style={BODY_STYLE}>
              We do not run a third-party support chat widget on the marketing site. To request
              support, contact us at the address in Section 10.
            </p>
          </section>

          {/* § 3 — How We Use Your Information */}
          <section id="section-3" aria-labelledby="section-3-heading" style={SECTION_STYLE}>
            <SectionMarker marker="§ 3" />
            <h2 id="section-3-heading" style={H2_STYLE}>
              3. How We Use Your Information
            </h2>

            <h3 style={H3_STYLE}>3.1 Core Service Delivery</h3>
            <ul style={UL_STYLE}>
              <li>Authenticate users and maintain secure sessions (Clerk)</li>
              <li>
                Receive, parse, and store MTGA match, draft, collection, and inventory data
                transmitted by the desktop application
              </li>
              <li>
                Display match history, analytics, deck statistics, collection, and personalized
                recommendations
              </li>
              <li>Maintain your deck lists and user preferences</li>
            </ul>

            <h3 style={H3_STYLE}>3.2 Service Improvement and Machine-Learning Models</h3>
            <ul style={UL_STYLE}>
              <li>Understand feature adoption and user engagement (PostHog)</li>
              <li>Identify and resolve bugs and stability issues (Sentry)</li>
              <li>Measure activation and retention metrics</li>
              <li>
                <strong style={{ color: "rgba(241,245,249,0.85)" }}>
                  Train and improve machine-learning recommendation models
                </strong>{" "}
                (draft advisor, wildcard crafting suggestions, archetype insights) from de-identified
                gameplay events.
              </li>
            </ul>
            <p style={BODY_STYLE}>
              <strong style={{ color: "rgba(241,245,249,0.85)" }}>
                How ML training data is de-identified.
              </strong>{" "}
              At the moment your data enters the ML training store, all identifiers that link a
              record back to you are stripped at the boundary: your Clerk user ID, our internal
              account identifier, your email, your device identifier, your IP address, and
              fine-grained timestamps are not written to the ML training store. The resulting records
              — match outcomes, per-turn action sequences, draft picks and pick numbers, and
              life-total arcs — are held in a dedicated store with no account linkage and no per-row
              identifier whose preimage we retain. We do not keep a mapping or hash that could
              re-link these records to you. On this basis we treat the ML training data as anonymous
              information (it is not personal data within the meaning of GDPR Art. 4(1) / Recital 26
              or analogous UK GDPR provisions, because we do not retain the means to re-identify
              it). See Section 4 for what this means for retention, and Section 6.3 for what this
              means when you delete your account.
            </p>

            <h3 style={H3_STYLE}>3.3 Marketing and Waitlist Communications</h3>
            <ul style={UL_STYLE}>
              <li>
                Notify waitlist registrants about VaultMTG availability, beta access, and relevant
                updates (Mailchimp)
              </li>
              <li>
                We do not send unsolicited promotional emails. Marketing communications beyond
                waitlist status updates require explicit opt-in.
              </li>
            </ul>

            <h3 style={H3_STYLE}>3.4 Security and Legal</h3>
            <ul style={UL_STYLE}>
              <li>Detect and prevent fraud, abuse, and unauthorized access</li>
              <li>Enforce the Terms of Service</li>
              <li>Comply with applicable laws and regulations</li>
            </ul>

            <h3 style={H3_STYLE}>3.5 Legal Bases for Processing (GDPR / UK GDPR)</h3>
            <p style={BODY_STYLE}>
              Where GDPR or UK GDPR applies, we rely on the following legal bases:
            </p>
            <div style={{ overflowX: "auto", marginBottom: 16 }}>
              <table style={TABLE_STYLE}>
                <thead>
                  <tr>
                    <th style={TH_STYLE}>Processing</th>
                    <th style={TH_STYLE}>Legal basis</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    [
                      "Account creation, authentication, and core Service delivery (Sections 2.1, 2.2)",
                      "Performance of a contract (Art. 6(1)(b)) — providing the Service you signed up for",
                    ],
                    [
                      "Product analytics (PostHog), marketing-site analytics (GA4), error monitoring (Sentry)",
                      "Consent (Art. 6(1)(a)) for non-strictly-necessary analytics on the marketing site; legitimate interests (Art. 6(1)(f)) for product analytics in the authenticated application — improving the Service we provide to authenticated users",
                    ],
                    [
                      "Waitlist email and updates",
                      "Consent (Art. 6(1)(a)) — collected at waitlist signup",
                    ],
                    [
                      "ML model training on de-identified data",
                      "Not applicable — anonymous information is outside GDPR scope. The transient processing that produces the anonymous records is grounded in legitimate interests (Art. 6(1)(f)) — building and improving a recommendation product for our users",
                    ],
                    [
                      "Fraud, abuse, security, ToS enforcement",
                      "Legitimate interests (Art. 6(1)(f)) — protecting the Service and our users",
                    ],
                    [
                      "Compliance with legal obligations (records, regulatory requests)",
                      "Legal obligation (Art. 6(1)(c))",
                    ],
                  ].map(([processing, basis]) => (
                    <tr key={processing}>
                      <td style={TD_STYLE}>{processing}</td>
                      <td style={TD_STYLE}>{basis}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p style={BODY_STYLE}>
              Legitimate Interests Assessments (LIAs) supporting the (f) bases above are maintained
              internally by VaultMTG and are available to supervisory authorities on request.
            </p>
          </section>

          {/* § 4 — Data Retention */}
          <section id="section-4" aria-labelledby="section-4-heading" style={SECTION_STYLE}>
            <SectionMarker marker="§ 4" />
            <h2 id="section-4-heading" style={H2_STYLE}>
              4. Data Retention
            </h2>
            <div style={{ overflowX: "auto" }}>
              <table style={TABLE_STYLE}>
                <thead>
                  <tr>
                    <th style={TH_STYLE}>Data Type</th>
                    <th style={TH_STYLE}>Retention Period</th>
                    <th style={TH_STYLE}>Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    [
                      "Account profile (email, name, auth data)",
                      "Duration of account",
                      "Deleted within 30 days of account deletion request",
                    ],
                    [
                      "MTGA match history and aggregated stats (tied to your account)",
                      "Duration of account",
                      "Deleted within 30 days of account deletion request. While your account is active, match history is retained as a core feature; you may delete specific records on request.",
                    ],
                    [
                      "MTGA collection, inventory, deck data",
                      "Duration of account",
                      "Refreshed on each sync; old snapshots replaced. Deleted within 30 days of account deletion request.",
                    ],
                    [
                      "Raw MTGA log data (unparsed)",
                      "Not retained",
                      "The application parses logs locally; only extracted structured events are transmitted to the server. No raw log files are stored.",
                    ],
                    [
                      "Application device identifier",
                      "Duration of device pairing",
                      "Deleted when the device pairing is revoked or the account is deleted",
                    ],
                    [
                      "Waitlist email and signup data",
                      "Until you unsubscribe, request removal, or the waitlist program ends",
                      "Stored in our database and in Mailchimp",
                    ],
                    [
                      "PostHog analytics events (hashed identifiers only)",
                      "Per PostHog plan (typically 12 months at ingestion; event-level data may be summarized thereafter)",
                      "Subject to PostHog's own data retention settings",
                    ],
                    [
                      "Sentry error events",
                      "30 days (Sentry default)",
                      "Auto-deleted; not exported elsewhere",
                    ],
                    [
                      "Server-side request logs (CloudWatch)",
                      "7 days",
                      "AWS CloudWatch Logs retention policy",
                    ],
                    [
                      "ML training data (de-identified gameplay events)",
                      "Retained indefinitely as anonymous information.",
                      "See Section 3.2 for the de-identification approach. This data has no account linkage and is not deleted on account deletion (see Section 6.3).",
                    ],
                  ].map(([type, period, notes]) => (
                    <tr key={type}>
                      <td style={TD_STYLE}>{type}</td>
                      <td style={TD_STYLE}>{period}</td>
                      <td style={TD_STYLE}>{notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* § 5 — Data Sharing */}
          <section id="section-5" aria-labelledby="section-5-heading" style={SECTION_STYLE}>
            <SectionMarker marker="§ 5" />
            <h2 id="section-5-heading" style={H2_STYLE}>
              5. Data Sharing and Third-Party Sub-Processors
            </h2>
            <p style={BODY_STYLE}>
              We do not sell, rent, or lease your personal information to third parties.
            </p>
            <p style={BODY_STYLE}>
              We share data with the following sub-processors to operate the Service:
            </p>
            <div style={{ overflowX: "auto", marginBottom: 16 }}>
              <table style={TABLE_STYLE}>
                <thead>
                  <tr>
                    <th style={TH_STYLE}>Sub-Processor</th>
                    <th style={TH_STYLE}>Data Shared</th>
                    <th style={TH_STYLE}>Purpose</th>
                    <th style={TH_STYLE}>Location</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    [
                      "Clerk Identity (clerk.com)",
                      "Email, name, OAuth tokens, session data, login event logs",
                      "Authentication and session management",
                      "United States",
                    ],
                    [
                      "PostHog (posthog.com)",
                      "Hashed user ID, hashed email, session/event data, device/browser metadata",
                      "Product analytics and telemetry",
                      "United States",
                    ],
                    [
                      "Sentry (sentry.io)",
                      "Error messages, stack traces, app version, device/browser metadata",
                      "Error tracking and monitoring",
                      "United States",
                    ],
                    [
                      "Mailchimp (mailchimp.com / Intuit Inc.)",
                      "Email address, UTM attribution fields",
                      "Waitlist email communications",
                      "United States",
                    ],
                    [
                      "Amazon Web Services (AWS)",
                      "All data at rest and in transit",
                      "Infrastructure: RDS (PostgreSQL database), EC2 (BFF server), S3 + CloudFront (SPA / static hosting)",
                      "us-east-1 (N. Virginia)",
                    ],
                    [
                      "Google LLC (GA4)",
                      "Page views, session data, UTM attribution, anonymized device/location",
                      "Marketing-site traffic analytics (loaded only after consent for EEA/UK/Swiss visitors)",
                      "United States and other Google-operated regions",
                    ],
                  ].map(([processor, data, purpose, location]) => (
                    <tr key={processor}>
                      <td style={TD_STYLE}>
                        <strong style={{ color: "rgba(241,245,249,0.85)" }}>{processor}</strong>
                      </td>
                      <td style={TD_STYLE}>{data}</td>
                      <td style={TD_STYLE}>{purpose}</td>
                      <td style={TD_STYLE}>{location}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p style={BODY_STYLE}>
              We maintain Data Processing Agreements (DPAs) with each of the sub-processors above
              where required by GDPR Art. 28 or analogous UK GDPR provisions. Where data is
              transferred from the EEA/UK/Switzerland to the United States, transfers are made under
              the EU-US Data Privacy Framework (where the sub-processor is certified) or under
              Standard Contractual Clauses.
            </p>

            <h3 style={H3_STYLE}>5.1 Legal Disclosure</h3>
            <p style={BODY_STYLE}>
              We may disclose your information if required by law, court order, or government
              request (subpoena, regulatory investigation). Where legally permitted, we will notify
              you of such requests.
            </p>

            <h3 style={H3_STYLE}>5.2 Business Transitions</h3>
            <p style={BODY_STYLE}>
              If VaultMTG (or Ray Hamilton Engineering, LLC) is acquired, merged, or undergoes a
              bankruptcy proceeding, your data may be transferred as part of that transaction.
              Affected users will be notified of any material change to this Policy.
            </p>
          </section>

          {/* § 6 — Your Rights and Choices */}
          <section id="section-6" aria-labelledby="section-6-heading" style={SECTION_STYLE}>
            <SectionMarker marker="§ 6" />
            <h2 id="section-6-heading" style={H2_STYLE}>
              6. Your Rights and Choices
            </h2>

            <h3 style={H3_STYLE}>6.1 Access and Portability</h3>
            <p style={BODY_STYLE}>
              You may request a copy of the personal data we hold about you by contacting us at the
              email in Section 10. We will provide the data in a portable, structured,
              machine-readable format within 30 days.
            </p>

            <h3 style={H3_STYLE}>6.2 Correction</h3>
            <p style={BODY_STYLE}>
              You may update your account name and email preferences at any time in the application
              Settings page. Email changes go through Clerk&rsquo;s account-update flow. You may also
              request correction of any inaccurate personal data by contacting us.
            </p>

            <h3 style={H3_STYLE}>6.3 Deletion (Right to Erasure)</h3>
            <p style={BODY_STYLE}>
              You may request deletion of your account and associated personal data by contacting
              us, or by using the in-app account-deletion control where available. We will delete
              your account and personal data within 30 days of a verified request, except where we
              are legally required to retain specific records (for example, narrow tax,
              fraud-prevention, or regulatory records).
            </p>
            <p style={BODY_STYLE}>
              <strong style={{ color: "rgba(241,245,249,0.85)" }}>
                What is and is not deleted on account deletion.
              </strong>{" "}
              When you delete your account, we delete: your account profile (email, name, Clerk
              identifiers), your match history and aggregated statistics tied to your account, your
              collection and inventory snapshots, your deck lists, your device pairing records, and
              your waitlist record (if any). We also delete or sever the hashed identifiers used in
              our analytics systems (PostHog, Sentry) so that prospective analytics events cannot be
              attributed to your former account.
            </p>
            <p style={BODY_STYLE}>
              <strong style={{ color: "rgba(241,245,249,0.85)" }}>
                ML training data is not deleted on account deletion.
              </strong>{" "}
              As described in Section 3.2, gameplay events used for ML training are stripped of all
              identifiers that link a record to you (Clerk user ID, account identifier, email, device
              identifier, IP, fine-grained timestamps) at the boundary of the ML training store, and
              we do not retain a mapping or hash that could re-link those records to you. On that
              basis those records are anonymous information and are not personal data within the
              meaning of GDPR Art. 4(1) / Recital 26. They survive account deletion. If you have a
              specific concern about this, contact us at the email in Section 10 and we will discuss
              it directly.
            </p>

            <h3 style={H3_STYLE}>6.4 Restriction and Objection</h3>
            <p style={BODY_STYLE}>
              Where GDPR or UK GDPR applies, you may request that we restrict processing of your
              personal data, or object to processing that relies on legitimate interests (including
              product analytics). Contact us at the email in Section 10.
            </p>

            <h3 style={H3_STYLE}>6.5 Opt-Out of Analytics</h3>
            <ul style={UL_STYLE}>
              <li>
                You can disable PostHog analytics in the application via the analytics opt-out
                toggle in your account Settings (when available; until then you may contact us to
                request opt-out).
              </li>
              <li>
                You can opt out of Google Analytics on <code>vaultmtg.app</code> via the
                cookie-consent banner (EEA/UK/Swiss visitors — see Section 6.6) or via the{" "}
                <a
                  href="https://tools.google.com/dlpage/gaoptout"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "var(--color-vault-sapphire)" }}
                >
                  Google Analytics opt-out browser add-on
                </a>
                .
              </li>
            </ul>

            <h3 style={H3_STYLE}>6.6 Cookies and Consent</h3>
            <p style={BODY_STYLE}>
              The <code>vaultmtg.app</code> marketing site uses a cookie-consent banner for visitors
              located in the European Economic Area, United Kingdom, and Switzerland.
              Non-strictly-necessary cookies and tags (including GA4) are loaded only after you
              provide consent. You may change your consent at any time via the &ldquo;Cookie Preferences&rdquo;
              control in the site footer.
            </p>
            <p style={BODY_STYLE}>
              The <code>app.vaultmtg.app</code> application uses only strictly-necessary cookies
              (session and authentication state). Product analytics (PostHog) in the authenticated
              application is governed by the analytics opt-out in Section 6.5.
            </p>

            <h3 style={H3_STYLE}>6.7 Waitlist Unsubscribe</h3>
            <p style={BODY_STYLE}>
              You may unsubscribe from waitlist communications at any time by clicking the
              unsubscribe link in any email we send, or by contacting us directly.
            </p>

            <h3 style={H3_STYLE}>6.8 Right to Lodge a Complaint (GDPR / UK GDPR)</h3>
            <p style={BODY_STYLE}>
              If you are in the EEA, UK, or Switzerland and believe our processing of your personal
              data infringes applicable data-protection law, you have the right to lodge a complaint
              with your national data-protection supervisory authority. For UK users, this is the
              Information Commissioner&rsquo;s Office (ico.org.uk). For EEA users, it is the supervisory
              authority in your country of residence.
            </p>
          </section>

          {/* § 7 — Security Measures */}
          <section id="section-7" aria-labelledby="section-7-heading" style={SECTION_STYLE}>
            <SectionMarker marker="§ 7" />
            <h2 id="section-7-heading" style={H2_STYLE}>
              7. Security Measures
            </h2>
            <p style={BODY_STYLE}>
              We implement the following technical and organizational measures to protect your
              information:
            </p>
            <ul style={UL_STYLE}>
              <li>
                <strong style={{ color: "rgba(241,245,249,0.85)" }}>Encryption in transit.</strong>{" "}
                All communication between your device and our servers uses TLS. The BFF API endpoint
                is HTTPS-only.
              </li>
              <li>
                <strong style={{ color: "rgba(241,245,249,0.85)" }}>Encryption at rest.</strong>{" "}
                Sensitive configuration values (API keys, database credentials, secrets) are stored
                in AWS Systems Manager Parameter Store (SSM) using KMS-encrypted SecureString
                parameters. They are never stored in environment variables in source code or source
                control.
              </li>
              <li>
                <strong style={{ color: "rgba(241,245,249,0.85)" }}>Authentication gating.</strong>{" "}
                All routes serving user-specific data on the BFF are protected by{" "}
                <code>ClerkAuthMiddleware</code> (Clerk JWT verification). No user data routes are
                publicly accessible.
              </li>
              <li>
                <strong style={{ color: "rgba(241,245,249,0.85)" }}>
                  Least-privilege database access.
                </strong>{" "}
                The BFF connects to PostgreSQL using a dedicated application role with
                SELECT/INSERT/UPDATE/DELETE scoped only to the tables it requires. It does not run
                with superuser or DDL privileges in production.
              </li>
              <li>
                <strong style={{ color: "rgba(241,245,249,0.85)" }}>
                  PII minimization in analytics.
                </strong>{" "}
                Clerk user IDs and email addresses are SHA-256 hashed before being sent to PostHog.
                Raw PII is never included in PostHog events.
              </li>
              <li>
                <strong style={{ color: "rgba(241,245,249,0.85)" }}>No raw log storage.</strong>{" "}
                The desktop application processes MTGA log files locally on your device and
                transmits only structured, parsed events. Raw log content is not uploaded or stored.
              </li>
              <li>
                <strong style={{ color: "rgba(241,245,249,0.85)" }}>Access control.</strong>{" "}
                Production infrastructure access is restricted to authorized personnel only.
                Database access from the internet is not permitted; the RDS instance is not publicly
                accessible.
              </li>
            </ul>
            <p style={BODY_STYLE}>
              <strong style={{ color: "rgba(241,245,249,0.85)" }}>Limitation.</strong> No method of
              transmission over the internet or method of electronic storage is 100% secure. While
              we apply industry-standard measures, we cannot guarantee absolute security.
            </p>
          </section>

          {/* § 8 — Children's Privacy */}
          <section id="section-8" aria-labelledby="section-8-heading" style={SECTION_STYLE}>
            <SectionMarker marker="§ 8" />
            <h2 id="section-8-heading" style={H2_STYLE}>
              8. Children&rsquo;s Privacy
            </h2>
            <p style={BODY_STYLE}>
              The Service is not directed to children under the age of 13. We do not knowingly
              collect personal information from anyone under 13. If you believe we have
              inadvertently collected data from a child under 13, please contact us and we will
              delete it promptly.
            </p>
            <p style={BODY_STYLE}>
              Users must represent that they are at least 13 years old to register for an account.
              The signup flow includes an age representation as part of accepting the Terms of
              Service.
            </p>
            <p style={BODY_STYLE}>
              Wizards of the Coast independently requires MTGA users to be 13+. Your use of MTGA is
              governed by your own agreement with Wizards of the Coast; that obligation is separate
              from your relationship with us.
            </p>
          </section>

          {/* § 9 — International Users */}
          <section id="section-9" aria-labelledby="section-9-heading" style={SECTION_STYLE}>
            <SectionMarker marker="§ 9" />
            <h2 id="section-9-heading" style={H2_STYLE}>
              9. International Users — GDPR and UK GDPR
            </h2>
            <p style={BODY_STYLE}>
              The closed beta cohort includes users located in the European Economic Area, United
              Kingdom, and Switzerland. If you are in one of those regions, the following apply to
              you in addition to the rights described in Section 6:
            </p>
            <ul style={UL_STYLE}>
              <li>
                <strong style={{ color: "rgba(241,245,249,0.85)" }}>Data controller.</strong> Ray
                Hamilton Engineering, LLC (Georgia, USA) is the data controller for personal data
                processed through the Service.
              </li>
              <li>
                <strong style={{ color: "rgba(241,245,249,0.85)" }}>Legal bases.</strong> Section
                3.5 sets out the legal basis for each category of processing.
              </li>
              <li>
                <strong style={{ color: "rgba(241,245,249,0.85)" }}>Your rights.</strong> Access
                (Art. 15), rectification (Art. 16), erasure (Art. 17), restriction (Art. 18),
                portability (Art. 20), and objection (Art. 21). See Section 6 for how to exercise
                them. We respond within 30 days of a verified request.
              </li>
              <li>
                <strong style={{ color: "rgba(241,245,249,0.85)" }}>
                  International transfers.
                </strong>{" "}
                Personal data is processed in the United States (see Section 5). Transfers from the
                EEA/UK/Switzerland are made under the EU-US Data Privacy Framework (where the
                sub-processor is certified) or under Standard Contractual Clauses.
              </li>
              <li>
                <strong style={{ color: "rgba(241,245,249,0.85)" }}>
                  No automated decision-making with legal effect.
                </strong>{" "}
                We do not use your personal data to make decisions about you that produce legal or
                similarly significant effects within the meaning of GDPR Art. 22. The ML-driven
                recommendations the Service provides (draft picks, wildcard crafting suggestions) are
                advisory and have no legal effect.
              </li>
              <li>
                <strong style={{ color: "rgba(241,245,249,0.85)" }}>Complaints.</strong> See
                Section 6.8.
              </li>
            </ul>
            <p style={BODY_STYLE}>
              We do not have an EU representative under GDPR Art. 27 at this stage of the closed
              beta; this position will be reassessed before general availability based on the volume
              and nature of EU-resident processing.
            </p>
          </section>

          {/* § 10 — Contact */}
          <section id="section-10" aria-labelledby="section-10-heading" style={SECTION_STYLE}>
            <SectionMarker marker="§ 10" />
            <h2 id="section-10-heading" style={H2_STYLE}>
              10. Contact
            </h2>
            <p style={BODY_STYLE}>
              For questions about this Privacy Policy, to submit a data access/deletion/portability/
              restriction/objection request, or to report a privacy concern:
            </p>
            <p style={BODY_STYLE}>
              <strong style={{ color: "rgba(241,245,249,0.9)" }}>Email:</strong>{" "}
              <a
                href="mailto:privacy@vaultmtg.app"
                style={{ color: "var(--color-vault-sapphire)" }}
              >
                privacy@vaultmtg.app
              </a>
            </p>
            <p style={BODY_STYLE}>
              For general support:{" "}
              <a
                href="mailto:support@vaultmtg.app"
                style={{ color: "var(--color-vault-sapphire)" }}
              >
                support@vaultmtg.app
              </a>
              . For legal notices:{" "}
              <a
                href="mailto:legal@vaultmtg.app"
                style={{ color: "var(--color-vault-sapphire)" }}
              >
                legal@vaultmtg.app
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
              6260 Whitetail CT NW
              <br />
              Acworth, GA 30101
            </blockquote>
            <p style={BODY_STYLE}>
              We respond to privacy inquiries within 10 business days of receipt and complete
              verified data-subject-rights requests within 30 days.
            </p>
          </section>

          {/* § 11 — Changes to This Policy */}
          <section id="section-11" aria-labelledby="section-11-heading" style={SECTION_STYLE}>
            <SectionMarker marker="§ 11" />
            <h2 id="section-11-heading" style={H2_STYLE}>
              11. Changes to This Policy
            </h2>
            <p style={BODY_STYLE}>
              We may update this Privacy Policy from time to time. We will notify you of material
              changes by:
            </p>
            <ul style={UL_STYLE}>
              <li>Updating the &ldquo;Last Updated&rdquo; date below</li>
              <li>Posting a notice on the Service</li>
              <li>Sending an email notification for significant changes affecting your rights</li>
            </ul>
            <p style={BODY_STYLE}>
              Your continued use of the Service after any modification constitutes your acceptance of
              the updated Policy.
            </p>
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
