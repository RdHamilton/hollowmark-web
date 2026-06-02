// Statistics § 03 + Voices § 04 — editorial ledger + pre-launch framing.
//
// Pre-launch state (until beta August 2026):
//   § 03 — four honest ledger entries (no inflated stats).
//   § 04 — suppressed; no fabricated testimonials are shown.
//          Restore with real player quotes post-beta (vault-mtg-tickets#115).
//
// Token aliases used throughout — resolves to globals.css custom properties,
// not raw hex.  Per #344/#346 token-alias sweep direction.
//   --color-vault-sapphire  →  #4A90D9
//   --color-text-primary    →  #F1F5F9
//   --color-surface-sunken  →  #0A0E16

// ─── Data ────────────────────────────────────────────────────────────────────

type NumberEntry = {
  value: string;
  label: string;
  note: string;
};

// Honest pre-launch figures only.  No inflated draft counts, win-rate lifts,
// or pick-time savings that cannot be cited to a merged PR with real data.
const NUMBERS: NumberEntry[] = [
  { value: "30,000+", label: "cards rated",  note: "across all current and recent sets" },
  { value: "Aug 2026", label: "beta launch", note: "be among the first in" },
  { value: "Free",     label: "during beta", note: "no credit card required" },
  { value: "2",        label: "platforms",   note: "macOS and Windows" },
];

// ─── Section ──────────────────────────────────────────────────────────────────

export default function Stats() {
  return (
    <section
      id="statistics"
      style={{
        position: "relative",
        padding: "96px 24px",
        background: "var(--color-surface-sunken)",
        borderTop:    "1px solid var(--color-surface-border-subtle)",
        borderBottom: "1px solid var(--color-surface-border-subtle)",
      }}
    >
      <div style={{ margin: "0 auto", maxWidth: 1200 }}>

        {/* ── § 03 Statistics — editorial number ledger ──────────────── */}
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          {/* Section eyebrow — JetBrains Mono */}
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 11,
              letterSpacing: "0.32em",
              textTransform: "uppercase",
              color: "rgba(74,144,217,0.7)",
              marginBottom: 14,
            }}
          >
            § 03 · Statistics
          </div>

          {/* Display heading — Cormorant Garamond italic */}
          <h2
            style={{
              margin: 0,
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontStyle: "italic",
              fontWeight: 500,
              fontSize: "clamp(36px, 4.5vw, 56px)",
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              color: "var(--color-text-primary)",
            }}
          >
            Built before launch. Honest about it.
          </h2>
        </div>

        {/* Numbers in marginalia style */}
        <div
          className="stats-ledger"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 56,
            maxWidth: 1000,
            margin: "0 auto",
          }}
        >
          {NUMBERS.map((n) => (
            <div key={n.label} style={{ textAlign: "center" }}>
              {/* Numeric value — JetBrains Mono, sapphire */}
              <div
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 48,
                  fontWeight: 500,
                  letterSpacing: "-0.03em",
                  color: "var(--color-vault-sapphire)",
                  lineHeight: 1,
                  fontFeatureSettings: "'tnum' 1, 'lnum' 1",
                }}
              >
                {n.value}
              </div>
              {/* Label — Cormorant Garamond italic */}
              <div
                style={{
                  marginTop: 12,
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontStyle: "italic",
                  fontSize: 20,
                  color: "var(--color-text-primary)",
                }}
              >
                {n.label}
              </div>
              {/* Note — Cormorant Garamond, muted */}
              <div
                style={{
                  marginTop: 6,
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: 14,
                  lineHeight: 1.4,
                  color: "var(--color-text-muted)",
                }}
              >
                {n.note}
              </div>
            </div>
          ))}
        </div>

        {/* Three-flower ornamental break */}
        <div
          aria-hidden="true"
          style={{ textAlign: "center", margin: "80px 0 0" }}
        >
          <span
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontStyle: "italic",
              fontSize: 22,
              color: "rgba(74,144,217,0.5)",
              letterSpacing: "0.5em",
            }}
          >
            ❦ ❦ ❦
          </span>
        </div>

        {/* ── § 04 Voices — suppressed pre-launch ────────────────────────
            Restore with real player quotes from beta testers.
            Ticket: vault-mtg-tickets#115.
            VoiceCard component lives in git history (commit before this PR). */}

      </div>

      {/* Responsive: collapse stats ledger to 2 cols on narrow viewports */}
      <style>{`
        @media (max-width: 640px) {
          .stats-ledger { grid-template-columns: repeat(2, 1fr) !important; gap: 32px !important; }
        }
      `}</style>
    </section>
  );
}
