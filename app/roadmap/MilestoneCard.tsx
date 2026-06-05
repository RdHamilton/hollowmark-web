"use client";

// MilestoneCard — client component for interactive hover on GitHub link.
// Extracted from the Server Component page so metadata export stays valid.
// Design: Cormorant Garamond italic, JetBrains Mono markers, sapphire palette.
// Follows ui_kits/vaultmtg-web/ Compendium editorial aesthetic.

import type { Milestone } from "./milestones";

export function MilestoneCard({ milestone: ms }: { milestone: Milestone }) {
  const isCurrent = ms.status === "current";

  return (
    <article
      aria-label={`${ms.version} — ${ms.codename}`}
      style={{
        padding: "32px 36px",
        borderRadius: 4,
        border: `1px solid ${isCurrent ? "rgba(74,144,217,0.35)" : "rgba(241,245,249,0.1)"}`,
        background: isCurrent
          ? "rgba(74,144,217,0.04)"
          : "rgba(255,255,255,0.01)",
        position: "relative",
      }}
    >
      {/* Status row */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          marginBottom: 20,
        }}
      >
        <span
          aria-hidden="true"
          style={{
            display: "inline-block",
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: isCurrent
              ? "var(--color-vault-sapphire)"
              : "rgba(241,245,249,0.25)",
            boxShadow: isCurrent
              ? "0 0 0 2px rgba(74,144,217,0.3), 0 0 8px rgba(74,144,217,0.6)"
              : "none",
            flexShrink: 0,
          }}
        />
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 10,
            letterSpacing: "0.24em",
            textTransform: "uppercase" as const,
            color: isCurrent ? "rgba(74,144,217,0.8)" : "rgba(241,245,249,0.3)",
          }}
        >
          {ms.statusLabel}
        </span>
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 10,
            letterSpacing: "0.16em",
            color: "rgba(241,245,249,0.25)",
          }}
        >
          {ms.target}
        </span>
      </div>

      {/* Version marker */}
      <div style={{ marginBottom: 8 }}>
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 12,
            letterSpacing: "0.12em",
            color: isCurrent
              ? "var(--color-vault-sapphire)"
              : "rgba(241,245,249,0.35)",
          }}
        >
          {ms.version}
        </span>
      </div>

      {/* Codename heading */}
      <h2
        style={{
          margin: "0 0 14px",
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontStyle: "italic",
          fontWeight: 500,
          fontSize: "clamp(24px, 3vw, 34px)",
          lineHeight: 1.1,
          letterSpacing: "-0.01em",
          color: isCurrent
            ? "var(--color-text-primary)"
            : "rgba(241,245,249,0.65)",
        }}
      >
        {ms.codename}
      </h2>

      {/* Summary */}
      <p
        style={{
          margin: "0 0 28px",
          maxWidth: 660,
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontStyle: "italic",
          fontSize: 17,
          lineHeight: 1.55,
          color: "rgba(241,245,249,0.65)",
        }}
      >
        {ms.summary}
      </p>

      {/* Item list */}
      <ul
        style={{
          listStyle: "none",
          margin: 0,
          padding: 0,
          display: "flex",
          flexDirection: "column",
          gap: 10,
        }}
      >
        {ms.items.map((item) => (
          <li
            key={item.label}
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: 10,
            }}
          >
            <span
              aria-hidden="true"
              style={{
                flexShrink: 0,
                width: 4,
                height: 4,
                borderRadius: "50%",
                background: isCurrent
                  ? "rgba(74,144,217,0.7)"
                  : "rgba(241,245,249,0.2)",
                marginTop: 6,
              }}
            />
            <span
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: 16,
                lineHeight: 1.4,
                color: "rgba(241,245,249,0.75)",
              }}
            >
              {item.label}
              {item.note && (
                <span
                  style={{
                    marginLeft: 8,
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 10,
                    letterSpacing: "0.12em",
                    color: "rgba(241,245,249,0.3)",
                  }}
                >
                  — {item.note}
                </span>
              )}
            </span>
          </li>
        ))}
      </ul>

      {/* GitHub milestone link (current milestone only) */}
      {ms.githubMilestoneUrl && (
        <div style={{ marginTop: 28 }}>
          <a
            href={ms.githubMilestoneUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 10,
              letterSpacing: "0.16em",
              textTransform: "uppercase" as const,
              color: "rgba(74,144,217,0.6)",
              textDecoration: "none",
              borderBottom: "1px solid rgba(74,144,217,0.25)",
              paddingBottom: 1,
              transition: "color 150ms ease, border-color 150ms ease",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.color = "var(--color-vault-sapphire)";
              el.style.borderBottomColor = "rgba(74,144,217,0.5)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.color = "rgba(74,144,217,0.6)";
              el.style.borderBottomColor = "rgba(74,144,217,0.25)";
            }}
          >
            View milestone on GitHub →
          </a>
        </div>
      )}
    </article>
  );
}
