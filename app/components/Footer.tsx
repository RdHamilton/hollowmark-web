"use client";

// Footer → Colophon
// Editorial print-shop style — masthead-like brand block, link columns set
// as classified-ad lists, colophon attribution at the bottom. No SaaS chrome.
// Design: Cormorant Garamond display, JetBrains Mono labels, sapphire palette.
// Follows ui_kits/vaultmtg-web/Footer.jsx — Compendium editorial aesthetic.

const COLUMNS = [
  {
    label: "Legal",
    items: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
    ],
  },
  {
    label: "Community",
    items: [
      { label: "Discord", href: "https://discord.gg/XwVsV892b4" },
      { label: "Reddit", href: "https://reddit.com/r/vaultmtg" },
    ],
  },
  {
    label: "Support",
    items: [
      { label: "Help & Docs", href: "/docs" },
      { label: "Contact", href: "mailto:hello@vaultmtg.app" },
    ],
  },
];

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer
      style={{
        borderTop: "1px solid var(--color-surface-border-subtle)",
        background: "var(--color-surface-footer)",
        padding: "72px 24px 32px",
      }}
    >
      <div style={{ margin: "0 auto", maxWidth: 1200 }}>

        {/* Colophon header */}
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 11,
              letterSpacing: "0.32em",
              textTransform: "uppercase" as const,
              color: "rgba(74,144,217,0.5)",
              marginBottom: 14,
            }}
          >
            § Colophon
          </div>
          <span
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontStyle: "italic",
              fontWeight: 500,
              fontSize: 28,
              letterSpacing: "0.01em",
              color: "var(--color-vault-sapphire)",
            }}
          >
            VaultMTG
          </span>
          <p
            style={{
              margin: "12px auto 0",
              maxWidth: 480,
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontStyle: "italic",
              fontSize: 16,
              color: "rgba(241,245,249,0.6)",
              lineHeight: 1.5,
              textWrap: "balance" as unknown as undefined,
            }}
          >
            Your edge. Every draft. Every match. The MTG Arena companion for
            serious players — set, composed, and printed at vaultmtg.app.
          </p>
        </div>

        {/* Three-flower divider */}
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <span
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontStyle: "italic",
              fontSize: 18,
              color: "rgba(74,144,217,0.35)",
              letterSpacing: "0.5em",
            }}
          >
            ❦ ❦ ❦
          </span>
        </div>

        {/* Link columns — classified-ad style */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: 32,
            maxWidth: 720,
            margin: "0 auto 56px",
          }}
        >
          {COLUMNS.map((col) => (
            <div key={col.label} style={{ textAlign: "center" }}>
              <h3
                style={{
                  margin: "0 0 14px",
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 10,
                  fontWeight: 600,
                  letterSpacing: "0.24em",
                  textTransform: "uppercase" as const,
                  color: "rgba(74,144,217,0.5)",
                }}
              >
                {col.label}
              </h3>
              <ul
                style={{
                  listStyle: "none",
                  margin: 0,
                  padding: 0,
                  display: "flex",
                  flexDirection: "column" as const,
                  gap: 8,
                }}
              >
                {col.items.map(({ label, href }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target={href.startsWith("http") ? "_blank" : undefined}
                      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                      style={{
                        fontFamily: "'Cormorant Garamond', Georgia, serif",
                        fontStyle: "italic",
                        fontSize: 16,
                        color: "rgba(241,245,249,0.7)",
                        textDecoration: "none",
                        transition: "color 150ms ease",
                      }}
                      onMouseEnter={(e) =>
                        ((e.currentTarget as HTMLAnchorElement).style.color =
                          "var(--color-vault-sapphire)")
                      }
                      onMouseLeave={(e) =>
                        ((e.currentTarget as HTMLAnchorElement).style.color =
                          "rgba(241,245,249,0.7)")
                      }
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom rule — printed-book attribution */}
        <div
          style={{
            paddingTop: 32,
            borderTop: "1px solid rgba(241,245,249,0.08)",
            display: "flex",
            flexWrap: "wrap",
            gap: 16,
            alignItems: "center",
            justifyContent: "space-between",
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 10,
            letterSpacing: "0.24em",
            textTransform: "uppercase" as const,
            color: "rgba(241,245,249,0.35)",
          }}
        >
          <span>&copy; {year} VaultMTG · All rights reserved</span>
          <span>Set in Cormorant Garamond, Inter, JetBrains Mono</span>
          <span>Vol. I · No. 1 · 2026</span>
        </div>

        {/* Disclaimer */}
        <p
          style={{
            margin: "24px auto 0",
            maxWidth: 720,
            textAlign: "center",
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontStyle: "italic",
            fontSize: 13,
            color: "rgba(241,245,249,0.35)",
            lineHeight: 1.5,
            textWrap: "pretty" as unknown as undefined,
          }}
        >
          VaultMTG is not affiliated with, endorsed by, or produced by Wizards
          of the Coast or Hasbro. Magic: The Gathering and all related marks
          are trademarks of their respective owners.
        </p>
      </div>
    </footer>
  );
}
