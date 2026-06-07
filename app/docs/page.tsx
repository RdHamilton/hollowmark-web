// Help & Documentation page — § 07
// Canonical FAQ / support page at https://vaultmtg.app/docs
// Content mirrors the pinned #help FAQ in Discord (gate5-support-foundation.md §2C).
// Design: Cormorant Garamond italic display, JetBrains Mono markers,
// sapphire palette — follows ui_kits/vaultmtg-web/ Compendium editorial aesthetic.
// Static export (output: "export") — no dynamic server features.

import type { Metadata } from "next";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { ogImage, SITE_BASE, TWITTER_CARD, OG_IMAGE_URL } from "@/lib/og-metadata";

const DOCS_TITLE = "Help & Documentation — Hollowmark";
const DOCS_DESCRIPTION =
  "Installation guide, pairing walkthrough, troubleshooting, and FAQ for the Hollowmark MTG Arena companion app.";

export const metadata: Metadata = {
  title: DOCS_TITLE,
  description: DOCS_DESCRIPTION,
  openGraph: {
    title: DOCS_TITLE,
    description: DOCS_DESCRIPTION,
    url: `${SITE_BASE.url}/docs`,
    siteName: SITE_BASE.siteName,
    type: "website",
    images: [ogImage],
  },
  twitter: {
    card: TWITTER_CARD,
    title: DOCS_TITLE,
    description: DOCS_DESCRIPTION,
    images: [OG_IMAGE_URL],
  },
};

// ---------------------------------------------------------------------------
// FAQ data — mirrors Faye's pinned #help message (gate5-support-foundation.md §2C)
// ---------------------------------------------------------------------------

const FAQ_ITEMS: Array<{ q: string; a: string }> = [
  {
    q: "How do I install Hollowmark?",
    a: "Download the installer for your platform (macOS or Windows) from the download page. Run the installer and follow the on-screen prompts. The app installs a small background daemon and a menu-bar or system-tray icon. MTG Arena must be installed before you pair.",
  },
  {
    q: "How do I pair Hollowmark with MTG Arena?",
    a: "Open Hollowmark and click \"Pair with Arena\" in the setup screen. Sign in with your Clerk account when prompted. Then launch MTG Arena — the daemon will detect the game and complete pairing automatically. The tray icon turns sapphire when pairing succeeds.",
  },
  {
    q: "My collection is not syncing. What do I do?",
    a: "Make sure MTG Arena is running and that you have completed a game or opened your collection in Arena after launching Hollowmark. The sync runs after each Arena session. If data still does not appear after 10 minutes, try signing out of Hollowmark and signing back in.",
  },
  {
    q: "How do I report a bug?",
    a: "The fastest path is the in-app bug report button (Help menu → Report a Bug). It attaches diagnostic logs automatically. For Discord users: post in #bugs with your OS, Hollowmark version, and the steps that caused the problem. Each bug report gets a GitHub issue filed and you will be notified with the issue link.",
  },
  {
    q: "Does Hollowmark work on Windows?",
    a: "Yes. Hollowmark supports macOS (Apple Silicon and Intel) and Windows (x64). The Windows build is unsigned during the current closed beta — Windows Defender or SmartScreen may show a warning. Click \"More info → Run anyway\" to proceed. Signing is in progress and will ship before public launch.",
  },
  {
    q: "Can I use Hollowmark on multiple devices?",
    a: "Your account and collection data are tied to your Clerk account and sync across devices. Each device needs the Hollowmark daemon installed and paired. Your collection history, match history, and draft ratings are available on every signed-in device.",
  },
  {
    q: "How do I uninstall Hollowmark?",
    a: "On macOS: drag Hollowmark.app from Applications to Trash, then remove the login item in System Settings → General → Login Items. On Windows: use Add or Remove Programs and uninstall \"Hollowmark\". Uninstalling does not delete your account data; sign in again on a new device to restore it.",
  },
];

const TOPICS: Array<{ id: string; marker: string; heading: string; body: string }> = [
  {
    id: "install",
    marker: "§ 07.I",
    heading: "Installation",
    body: "Download the Hollowmark installer for your platform from the download page. macOS and Windows (x64) are supported. The installer places a small background daemon and a tray icon on your system. MTG Arena must already be installed — Hollowmark reads Arena data locally and never contacts Wizards servers directly.",
  },
  {
    id: "pairing",
    marker: "§ 07.II",
    heading: "Pairing with MTG Arena",
    body: "After installing, open Hollowmark and follow the pairing wizard. Sign in with your account, then launch MTG Arena. The daemon detects the running game automatically. A successful pairing turns the tray icon sapphire. Pairing is per-device — if you install on a second machine, run the wizard again.",
  },
  {
    id: "troubleshoot",
    marker: "§ 07.III",
    heading: "Troubleshooting",
    body: "If Hollowmark is not reading data: (1) confirm MTG Arena is running in the foreground — not minimised to tray; (2) check that the Hollowmark daemon is running (tray icon present); (3) complete at least one game or collection browse in Arena after launch; (4) sign out and back in if the issue persists. For crashes or data-loss bugs, use the in-app bug report (Help → Report a Bug) which attaches logs automatically.",
  },
  {
    id: "data-sync",
    marker: "§ 07.IV",
    heading: "Collection & Match Data",
    body: "Hollowmark syncs your MTG Arena collection, match history, and draft history after each Arena session. Data is tied to your account and available on every signed-in device. Collection sync requires at least one Arena session after initial pairing. Match history includes all game modes tracked by the daemon. Historical data from before installation is not recoverable.",
  },
  {
    id: "uninstall",
    marker: "§ 07.V",
    heading: "Uninstalling",
    body: "On macOS: drag Hollowmark.app to Trash and remove the login item in System Settings → General → Login Items. On Windows: use Add or Remove Programs and uninstall \"Hollowmark\". Your account data is preserved in the cloud — sign in on any new device to restore your history.",
  },
];

// ---------------------------------------------------------------------------
// Sub-components (co-located, page-level only — not shared)
// ---------------------------------------------------------------------------

function TopicSection({
  id,
  marker,
  heading,
  body,
}: {
  id: string;
  marker: string;
  heading: string;
  body: string;
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      style={{
        padding: "40px 0",
        borderBottom: "1px solid var(--color-surface-border-subtle)",
      }}
    >
      <div
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 11,
          letterSpacing: "0.28em",
          textTransform: "uppercase",
          color: "rgba(74,144,217,0.65)",
          marginBottom: 14,
        }}
      >
        {marker}
      </div>
      <h2
        id={`${id}-heading`}
        style={{
          margin: "0 0 16px",
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontStyle: "italic",
          fontWeight: 500,
          fontSize: "clamp(26px, 3vw, 36px)",
          lineHeight: 1.1,
          letterSpacing: "-0.01em",
          color: "var(--color-text-primary)",
        }}
      >
        {heading}
      </h2>
      <p
        style={{
          margin: 0,
          maxWidth: 680,
          fontFamily: "'Inter', sans-serif",
          fontSize: 16,
          lineHeight: 1.7,
          color: "rgba(241,245,249,0.72)",
        }}
      >
        {body}
      </p>
    </section>
  );
}

function FaqItem({ q, a, index }: { q: string; a: string; index: number }) {
  return (
    <div
      style={{
        padding: "28px 0",
        borderBottom: "1px solid var(--color-surface-border-subtle)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: 16,
          marginBottom: 12,
        }}
      >
        <span
          aria-hidden="true"
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 10,
            letterSpacing: "0.2em",
            color: "rgba(74,144,217,0.55)",
            flexShrink: 0,
            paddingTop: 4,
          }}
        >
          {String(index + 1).padStart(2, "0")}
        </span>
        <h3
          style={{
            margin: 0,
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontStyle: "italic",
            fontWeight: 600,
            fontSize: "clamp(18px, 2vw, 22px)",
            lineHeight: 1.25,
            color: "var(--color-text-primary)",
          }}
        >
          {q}
        </h3>
      </div>
      <p
        style={{
          margin: "0 0 0 38px",
          fontFamily: "'Inter', sans-serif",
          fontSize: 15,
          lineHeight: 1.7,
          color: "rgba(241,245,249,0.68)",
        }}
      >
        {a}
      </p>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function DocsPage() {
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
        id="docs"
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
            § 07 · Help
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
            Help &{" "}
            <span
              style={{
                color: "var(--color-vault-sapphire)",
                textShadow: "0 0 24px rgba(74,144,217,0.35)",
              }}
            >
              Documentation.
            </span>
          </h1>

          {/* Deck copy */}
          <p
            style={{
              margin: "0 0 56px",
              maxWidth: 640,
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontStyle: "italic",
              fontSize: 20,
              lineHeight: 1.5,
              color: "rgba(241,245,249,0.72)",
            }}
          >
            Getting started, pairing with Arena, troubleshooting, and answers
            to common questions — everything you need to get Hollowmark running.
          </p>

          {/* Bug-report callout — in-app path is primary */}
          <div
            role="note"
            aria-label="How to report a bug"
            style={{
              marginBottom: 64,
              padding: "16px 24px",
              borderRadius: 4,
              border: "1px solid rgba(74,144,217,0.25)",
              background: "rgba(74,144,217,0.05)",
              display: "flex",
              alignItems: "flex-start",
              gap: 16,
              flexWrap: "wrap",
            }}
          >
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 11,
                letterSpacing: "0.24em",
                textTransform: "uppercase",
                color: "rgba(74,144,217,0.7)",
                flexShrink: 0,
                paddingTop: 2,
              }}
            >
              Bug Reports
            </span>
            <span
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontStyle: "italic",
                fontSize: 16,
                lineHeight: 1.5,
                color: "rgba(241,245,249,0.65)",
              }}
            >
              The fastest path is{" "}
              <strong
                style={{
                  color: "rgba(241,245,249,0.88)",
                  fontStyle: "normal",
                }}
              >
                Help → Report a Bug
              </strong>{" "}
              inside the app — it attaches diagnostic logs automatically.
              Discord #bugs is the secondary path for issues you cannot
              reproduce consistently.
            </span>
          </div>

          {/* Topic sections */}
          <div>
            {TOPICS.map((t) => (
              <TopicSection key={t.id} {...t} />
            ))}
          </div>

          {/* Three-flower ornamental break */}
          <div
            aria-hidden="true"
            style={{ textAlign: "center", margin: "72px 0 56px" }}
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

          {/* FAQ section */}
          <section aria-labelledby="faq-heading">
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
              § 07.VI · FAQ
            </div>
            <h2
              id="faq-heading"
              style={{
                margin: "0 0 8px",
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontStyle: "italic",
                fontWeight: 500,
                fontSize: "clamp(32px, 4vw, 52px)",
                lineHeight: 1.0,
                letterSpacing: "-0.015em",
                color: "var(--color-text-primary)",
              }}
            >
              Frequently asked questions.
            </h2>
            <p
              style={{
                margin: "0 0 40px",
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontStyle: "italic",
                fontSize: 18,
                color: "rgba(241,245,249,0.6)",
              }}
            >
              Common questions from the Discord #help channel.
            </p>

            <div>
              {FAQ_ITEMS.map((item, i) => (
                <FaqItem key={i} {...item} index={i} />
              ))}
            </div>
          </section>

          {/* Discord support CTA */}
          <div
            style={{
              marginTop: 72,
              textAlign: "center",
              padding: "48px 24px",
              borderRadius: 4,
              border: "1px solid var(--color-surface-border-subtle)",
              background: "var(--color-surface-raised)",
            }}
          >
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 11,
                letterSpacing: "0.28em",
                textTransform: "uppercase",
                color: "rgba(74,144,217,0.6)",
                marginBottom: 16,
              }}
            >
              Still need help?
            </div>
            <p
              style={{
                margin: "0 0 28px",
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontStyle: "italic",
                fontSize: 20,
                lineHeight: 1.45,
                color: "rgba(241,245,249,0.75)",
                maxWidth: 480,
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              Join the Discord server and post in{" "}
              <strong style={{ color: "var(--color-vault-sapphire)", fontStyle: "normal" }}>
                #help
              </strong>
              . The team monitors it daily during the beta window.
            </p>
            <a
              href="https://discord.gg/XwVsV892b4"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                padding: "12px 28px",
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontStyle: "italic",
                fontSize: 17,
                fontWeight: 600,
                color: "var(--color-surface-sunken)",
                background:
                  "linear-gradient(180deg, var(--color-primary-400) 0%, var(--color-primary-500) 100%)",
                border: "1px solid rgba(124,181,240,0.5)",
                borderRadius: 4,
                textDecoration: "none",
                letterSpacing: "0.01em",
                boxShadow:
                  "0 0 0 1px rgba(74,144,217,0.3), 0 8px 24px rgba(74,144,217,0.2), inset 0 1px 0 rgba(255,255,255,0.4)",
              }}
            >
              Join the Discord →
            </a>
          </div>

        </div>
      </main>

      <Footer />
    </>
  );
}
