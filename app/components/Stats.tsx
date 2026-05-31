// Statistics § 03 + Voices § 04 — editorial ledger + flavor-text testimonials.
//
// Two halves:
//   1. Numbers as editorial marginalia — JetBrains Mono values, Cormorant
//      Garamond italic labels and notes.  Not SaaS stat pills.
//   2. Testimonials as Magic card flavor-text — blockquotes with corner notches,
//      ornamental three-flower break, and a JetBrains Mono attribution slug.
//
// Replaces the prior amber-accented stat grid entirely (#315 PR4).
//
// Token aliases used throughout — resolves to globals.css custom properties,
// not raw hex.  Per #344/#346 token-alias sweep direction.
//   --color-vault-sapphire  →  #4A90D9
//   --color-text-primary    →  #F1F5F9
//   --color-surface-sunken  →  #0A0E16
//   --color-vault-mtg-*     →  MTG color identity pips

// ─── MTG color identity — matches tokens in globals.css ──────────────────────

const VAULT_MTG_BLACK  = "#9B7FC2";
const VAULT_MTG_BLUE   = "var(--color-vault-sapphire)";   // #4A90D9
const VAULT_MTG_GREEN  = "#3A9E5F";

// ─── Data ────────────────────────────────────────────────────────────────────

type NumberEntry = {
  value: string;
  label: string;
  note: string;
};

type Voice = {
  quote: string;
  author: string;
  role: string;
  /** CSS color — raw hex or a CSS var() reference. */
  color: string;
};

const NUMBERS: NumberEntry[] = [
  { value: "30,000+", label: "cards rated",        note: "across all current and recent sets" },
  { value: "500K+",   label: "drafts tracked",     note: "and growing every week" },
  { value: "2.4s",    label: "average pick saved",  note: "per draft decision" },
  { value: "+8%",     label: "win-rate lift",       note: "reported after thirty drafts" },
];

const VOICES: Voice[] = [
  {
    quote: "I went from hovering around 55% to consistently 65%+ within two weeks. The draft ratings are simply that good.",
    author: "Sable_Raven",
    role: "Mythic rank · limited specialist",
    color: VAULT_MTG_BLACK,
  },
  {
    quote: "An overlay that doesn't feel like homework. The data is there when I need it and out of the way when I don't.",
    author: "DraftKingMTG",
    role: "Top 100 limited player",
    color: VAULT_MTG_BLUE,
  },
  {
    quote: "Collection sync is the killer feature. I can see exactly which picks upgrade my collection as I draft.",
    author: "Aetherborn_7",
    role: "Set collector · competitive drafter",
    color: VAULT_MTG_GREEN,
  },
];

// ─── Voice card — flavor-text blockquote ─────────────────────────────────────

function VoiceCard({ quote, author, role, color }: Voice) {
  // Corner notch descriptors — four absolute spans at each corner.
  const CORNERS: React.CSSProperties[] = [
    { top: -1, left:  -1, borderTop:    `1.5px solid ${color}99`, borderLeft:   `1.5px solid ${color}99` },
    { top: -1, right: -1, borderTop:    `1.5px solid ${color}99`, borderRight:  `1.5px solid ${color}99` },
    { bottom: -1, left:  -1, borderBottom: `1.5px solid ${color}99`, borderLeft:  `1.5px solid ${color}99` },
    { bottom: -1, right: -1, borderBottom: `1.5px solid ${color}99`, borderRight: `1.5px solid ${color}99` },
  ];

  return (
    <blockquote
      style={{
        position: "relative",
        margin: 0,
        padding: "32px 28px 24px",
        background: `${color}08`,
        borderLeft:  `3px double ${color}99`,
        borderRight: "1px solid rgba(241,245,249,0.06)",
      }}
    >
      {/* Corner notches — purely decorative */}
      {CORNERS.map((style, i) => (
        <span
          key={i}
          aria-hidden="true"
          style={{
            position: "absolute",
            width: 10,
            height: 10,
            ...style,
          }}
        />
      ))}

      {/* Quote text — Cormorant Garamond italic */}
      <p
        style={{
          margin: "0 0 20px",
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontStyle: "italic",
          fontSize: 18,
          lineHeight: 1.5,
          color: "var(--color-text-primary)",
        }}
      >
        &ldquo;{quote}&rdquo;
      </p>

      {/* Attribution slug — card-creator credit style */}
      <footer
        style={{
          borderTop: "1px solid rgba(241,245,249,0.1)",
          paddingTop: 14,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <span
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontStyle: "italic",
            fontWeight: 600,
            fontSize: 16,
            color,
          }}
        >
          {author}
        </span>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
          <span
            aria-hidden="true"
            style={{ width: 10, height: 10, borderRadius: "50%", background: color, flexShrink: 0 }}
          />
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 10,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "var(--color-text-muted)",
            }}
          >
            {role}
          </span>
        </span>
      </footer>
    </blockquote>
  );
}

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
            The ledger, kept honest.
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
          style={{ textAlign: "center", margin: "80px 0 56px" }}
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

        {/* ── § 04 Voices — testimonials as flavor text ───────────────── */}
        <div style={{ textAlign: "center", marginBottom: 48 }}>
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
            § 04 · Voices from the community
          </div>

          {/* Display heading — Cormorant Garamond italic */}
          <h2
            style={{
              margin: 0,
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontStyle: "italic",
              fontWeight: 500,
              fontSize: "clamp(32px, 4vw, 48px)",
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              color: "var(--color-text-primary)",
            }}
          >
            Players who already have the edge.
          </h2>
        </div>

        {/* Voice cards grid */}
        <div
          className="voices-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 24,
          }}
        >
          {VOICES.map((v) => (
            <VoiceCard key={v.author} {...v} />
          ))}
        </div>
      </div>

      {/* Responsive: collapse stats ledger to 2 cols on medium viewports */}
      <style>{`
        @media (max-width: 640px) {
          .stats-ledger { grid-template-columns: repeat(2, 1fr) !important; gap: 32px !important; }
          .voices-grid  { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
