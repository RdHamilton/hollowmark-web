// Roadmap page — § 06
// Public milestone view: current milestone (v0.3.8) and next milestone (v0.3.9).
// Data is accurate as of v0.3.8 kickoff (2026-06-04).
// Honest about what is shipped vs. in progress — per Standing Orders (no unshipped
// feature claims without a merged PR).
// Design: Cormorant Garamond italic display, JetBrains Mono markers,
// sapphire palette — follows ui_kits/vaultmtg-web/ Compendium editorial aesthetic.

import type { Metadata } from "next";
import Link from "next/link";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { ogImage, SITE_BASE, TWITTER_CARD, OG_IMAGE_URL } from "@/lib/og-metadata";
import { MilestoneCard } from "./MilestoneCard";
import type { Milestone } from "./milestones";
import { MILESTONES, BETA_TARGET } from "./milestones";

const ROADMAP_TITLE = "Roadmap — Hollowmark";
const ROADMAP_DESCRIPTION =
  "See what Hollowmark is building now and what is coming next on the road to beta launch in December 2026.";

export const metadata: Metadata = {
  title: ROADMAP_TITLE,
  description: ROADMAP_DESCRIPTION,
  openGraph: {
    title: ROADMAP_TITLE,
    description: ROADMAP_DESCRIPTION,
    url: `${SITE_BASE.url}/roadmap`,
    siteName: SITE_BASE.siteName,
    type: "website",
    images: [ogImage],
  },
  twitter: {
    card: TWITTER_CARD,
    title: ROADMAP_TITLE,
    description: ROADMAP_DESCRIPTION,
    images: [OG_IMAGE_URL],
  },
};

export default function RoadmapPage() {
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
            "radial-gradient(ellipse at 60% 20%, rgba(74,144,217,0.07) 0%, rgba(74,144,217,0) 60%)",
        }}
      />

      <main
        id="roadmap"
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
            § 06 · Roadmap
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
            What is being{" "}
            <span
              style={{
                color: "var(--color-vault-sapphire)",
                textShadow: "0 0 24px rgba(74,144,217,0.35)",
              }}
            >
              built.
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
            Current milestone and what comes next on the road to closed beta.
            No futures trading — every item here has a ticket behind it.
          </p>

          {/* Beta target callout */}
          <div
            role="note"
            aria-label={`Closed beta target: ${BETA_TARGET}`}
            style={{
              marginBottom: 64,
              padding: "16px 24px",
              borderRadius: 4,
              border: "1px solid rgba(74,144,217,0.3)",
              background: "rgba(74,144,217,0.06)",
              display: "flex",
              alignItems: "center",
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
              }}
            >
              Closed Beta Target
            </span>
            <span
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontStyle: "italic",
                fontSize: 18,
                fontWeight: 600,
                color: "var(--color-vault-sapphire)",
              }}
            >
              {BETA_TARGET}
            </span>
            <span
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontStyle: "italic",
                fontSize: 15,
                color: "rgba(241,245,249,0.5)",
              }}
            >
              — free, invite-only
            </span>
          </div>

          {/* Milestones */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 48,
            }}
          >
            {(MILESTONES as Milestone[]).map((ms) => (
              <MilestoneCard key={ms.version} milestone={ms} />
            ))}
          </div>

          {/* Three-flower ornamental break */}
          <div
            aria-hidden="true"
            style={{ textAlign: "center", margin: "80px 0 56px" }}
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

          {/* Footer CTA — join the waitlist */}
          <div style={{ textAlign: "center" }}>
            <p
              style={{
                margin: "0 0 24px",
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontStyle: "italic",
                fontSize: 18,
                color: "rgba(241,245,249,0.65)",
              }}
            >
              Want in on beta?
            </p>
            <Link
              href="/#begin"
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
              Join the waitlist →
            </Link>
          </div>

        </div>
      </main>

      <Footer />
    </>
  );
}
