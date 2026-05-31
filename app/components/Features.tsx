// Features → "The Compendium" — § 02
// Five editorial chapters, one per MTG color philosophy, each mapped to a
// real product feature. Alternating-side layout with OrbDisplay, FlavorBox
// pull-quote, mono chapter eyebrow, and a per-chapter stat.
//
// Display: Cormorant Garamond italic (marketing-site identity, per ui_kit).
// Eyebrows / stats: JetBrains Mono.
// Body: Inter (var(--font-body)).
// Accent: var(--color-vault-sapphire) / #4A90D9.
//
// Replaces the prior 2×2 SaaS feature grid entirely (#315 PR3).

// ─── Chapter data ────────────────────────────────────────────────────────────

type Chapter = {
  num: string;
  color: string;
  name: string;
  virtue: string;
  title: string;
  body: string;
  flavor: string;
  stat: { value: string; label: string };
};

const CHAPTERS: Chapter[] = [
  {
    num: "I",
    color: "#E8E0C8",
    name: "White (W)",
    virtue: "Order",
    title: "A library that updates itself",
    body: "Thirty thousand cards, rated and re-rated as new data arrives. Standard, Historic, Alchemy, Explorer — the full compendium, indexed, searchable, current. Your collection automatically reconciled against what's been played.",
    flavor:
      "What was unknown becomes known, and what was known becomes ordered.",
    stat: { value: "30,000+", label: "cards rated" },
  },
  {
    num: "II",
    color: "var(--color-vault-sapphire)",
    name: "Blue (U)",
    virtue: "Insight",
    title: "Knowing what comes next",
    body: "Live tier ratings, win-rate data, and synergy scores for every card in your pack — the moment it appears. The pick you would have made in twenty seconds becomes the pick you make in two.",
    flavor:
      "The draft is decided before the timer starts. Be the one who decided.",
    stat: { value: "+8%", label: "win-rate lift" },
  },
  {
    num: "III",
    color: "#9B7FC2",
    name: "Black (B)",
    virtue: "Ambition",
    title: "The cost of every choice",
    body: "Every match logged, every loss accounted for. Opponent archetype, your deck's mana curve, the turn the game turned. Patterns surface that you would never see across a single session — only across hundreds.",
    flavor: "A ledger is a kind of weapon, in the right hands.",
    stat: { value: "500K+", label: "drafts tracked" },
  },
  {
    num: "IV",
    color: "#C94E3A",
    name: "Red (R)",
    virtue: "Instinct",
    title: "Decisions in seconds",
    body: "When the pack appears and the timer drops, the data is already there — sorted by rating, color-coded by your current pairs, with the recommended pick highlighted. No tab-switching, no second-guessing.",
    flavor: "Hesitation is its own decision. So is speed.",
    stat: { value: "2.4s", label: "saved per pick" },
  },
  {
    num: "V",
    color: "#3A9E5F",
    name: "Green (G)",
    virtue: "Growth",
    title: "The arc of every player",
    body: "Win rate over time. Best-performing decks. Format-by-format breakdown. Not just where you are — where you came from, and what's moving. The chart that lets you know whether last week's slump was a slump or a signal.",
    flavor:
      "Growth is invisible at any one moment. Then suddenly, only growth.",
    stat: { value: "847", label: "active players" },
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

/** Mana-orb radial sphere with an ambient halo behind it. */
function OrbDisplay({ color }: { color: string }) {
  // Build a stable id fragment from the color (strip non-alphanumeric).
  const idFrag = color.replace(/[^a-zA-Z0-9]/g, "");
  return (
    <div
      style={{
        position: "relative",
        width: 240,
        height: 240,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Outer ambient halo */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: -40,
          background: `radial-gradient(circle, ${color}33 0%, ${color}00 65%)`,
          filter: "blur(12px)",
          pointerEvents: "none",
        }}
      />
      {/* SVG orb */}
      <svg
        viewBox="0 0 200 200"
        width={200}
        height={200}
        aria-hidden="true"
        style={{ position: "relative" }}
      >
        <defs>
          <radialGradient
            id={`orb-grad-${idFrag}`}
            cx="35%"
            cy="30%"
            r="70%"
          >
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
            <stop offset="45%" stopColor={color} />
            <stop offset="100%" stopColor="#000000" stopOpacity="0.4" />
          </radialGradient>
        </defs>
        <circle
          cx="100"
          cy="100"
          r="85"
          fill={`url(#orb-grad-${idFrag})`}
        />
        <circle
          cx="100"
          cy="100"
          r="85"
          fill="none"
          stroke={color}
          strokeOpacity="0.5"
          strokeWidth="1"
        />
        {/* Specular highlight */}
        <ellipse
          cx="78"
          cy="76"
          rx="22"
          ry="11"
          fill="rgba(255,255,255,0.5)"
        />
      </svg>
    </div>
  );
}

/** Pull-quote card styled like Magic card flavor text. */
function FlavorBox({ color, text }: { color: string; text: string }) {
  // Corner notch descriptors
  const corners: {
    style: React.CSSProperties;
  }[] = [
    {
      style: {
        position: "absolute",
        top: -1,
        left: -1,
        width: 8,
        height: 8,
        borderTop: `1.5px solid ${color}99`,
        borderLeft: `1.5px solid ${color}99`,
      },
    },
    {
      style: {
        position: "absolute",
        top: -1,
        right: -1,
        width: 8,
        height: 8,
        borderTop: `1.5px solid ${color}99`,
        borderRight: `1.5px solid ${color}99`,
      },
    },
    {
      style: {
        position: "absolute",
        bottom: -1,
        left: -1,
        width: 8,
        height: 8,
        borderBottom: `1.5px solid ${color}99`,
        borderLeft: `1.5px solid ${color}99`,
      },
    },
    {
      style: {
        position: "absolute",
        bottom: -1,
        right: -1,
        width: 8,
        height: 8,
        borderBottom: `1.5px solid ${color}99`,
        borderRight: `1.5px solid ${color}99`,
      },
    },
  ];

  return (
    <blockquote
      style={{
        position: "relative",
        margin: 0,
        padding: "20px 28px",
        background: `${color}0A`,
        borderLeft: `3px double ${color}99`,
        borderRight: `1px solid rgba(241,245,249,0.08)`,
        maxWidth: 480,
      }}
    >
      {corners.map((c, i) => (
        <span key={i} aria-hidden="true" style={c.style} />
      ))}
      <p
        style={{
          margin: 0,
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontStyle: "italic",
          fontSize: 17,
          lineHeight: 1.4,
          color,
        }}
      >
        — {text}
      </p>
    </blockquote>
  );
}

/** One editorial chapter (alternating L/R layout). */
function ChapterArticle({
  num,
  color,
  name,
  virtue,
  title,
  body,
  flavor,
  stat,
  reverse,
}: Chapter & { reverse: boolean }) {
  return (
    <article
      className="chapter-grid"
      style={{
        display: "grid",
        gridTemplateColumns: reverse ? "1fr 1.2fr" : "1.2fr 1fr",
        gap: 64,
        alignItems: "center",
      }}
    >
      {/* Body column */}
      <div style={{ order: reverse ? 2 : 1 }}>
        {/* Chapter eyebrow — JetBrains Mono */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 11,
            letterSpacing: "0.32em",
            textTransform: "uppercase",
            color,
            marginBottom: 14,
          }}
        >
          <span>Chapter {num}</span>
          <span
            aria-hidden="true"
            style={{
              flex: 1,
              height: 1,
              background: `${color}60`,
              maxWidth: 60,
            }}
          />
          <span>
            {name} · {virtue}
          </span>
        </div>

        {/* Chapter heading — Cormorant Garamond italic */}
        <h3
          style={{
            margin: "0 0 24px",
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontStyle: "italic",
            fontWeight: 500,
            fontSize: "clamp(28px, 3.5vw, 44px)",
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            color: "var(--color-text-primary)",
          }}
        >
          {title}
        </h3>

        {/* Body copy — Cormorant Garamond (editorial voice) */}
        <p
          style={{
            margin: "0 0 28px",
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: 19,
            lineHeight: 1.55,
            color: "rgba(241,245,249,0.78)",
            maxWidth: 560,
          }}
        >
          {body}
        </p>

        {/* Flavor-text pull quote */}
        <FlavorBox color={color} text={flavor} />
      </div>

      {/* Orb + stat column */}
      <div
        style={{
          order: reverse ? 1 : 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <OrbDisplay color={color} />
        <div style={{ marginTop: 28, textAlign: "center" }}>
          {/* Stat value — JetBrains Mono, per-color */}
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 44,
              fontWeight: 500,
              letterSpacing: "-0.03em",
              color,
              fontFeatureSettings: "'tnum' 1, 'lnum' 1",
              lineHeight: 1,
            }}
          >
            {stat.value}
          </div>
          {/* Stat label — Cormorant Garamond italic */}
          <div
            style={{
              marginTop: 8,
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontStyle: "italic",
              fontSize: 17,
              color: "rgba(241,245,249,0.55)",
              letterSpacing: "0.04em",
            }}
          >
            {stat.label}
          </div>
        </div>
      </div>

      {/* Responsive: collapse to single column at narrow viewport */}
      <style>{`
        @media (max-width: 880px) {
          .chapter-grid { grid-template-columns: 1fr !important; }
          .chapter-grid > * { order: unset !important; }
        }
      `}</style>
    </article>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

export default function Features() {
  return (
    <section
      id="compendium"
      style={{
        padding: "96px 24px",
        background: "var(--color-surface-sunken)",
        borderTop: `1px solid var(--color-surface-border-subtle)`,
      }}
    >
      <div style={{ margin: "0 auto", maxWidth: 1200 }}>
        {/* Section masthead */}
        <div style={{ textAlign: "center", marginBottom: 80 }}>
          {/* § marker — JetBrains Mono eyebrow */}
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
            § 02 · The Compendium
          </div>

          {/* Display heading — Cormorant Garamond italic */}
          <h2
            style={{
              margin: 0,
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontStyle: "italic",
              fontWeight: 500,
              fontSize: "clamp(40px, 5vw, 64px)",
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              color: "var(--color-text-primary)",
            }}
          >
            Five colors, five virtues, five
            <br />
            <span style={{ color: "var(--color-vault-sapphire)" }}>
              parts of the same study.
            </span>
          </h2>

          {/* Deck — Cormorant Garamond italic subhead */}
          <p
            style={{
              margin: "24px auto 0",
              maxWidth: 600,
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: 18,
              fontStyle: "italic",
              lineHeight: 1.5,
              color: "rgba(241,245,249,0.65)",
            }}
          >
            The companion is built around the philosophy of the game itself.
            Each chapter does the work of one color&rsquo;s discipline.
          </p>
        </div>

        {/* Chapters list */}
        <div style={{ display: "flex", flexDirection: "column", gap: 96 }}>
          {CHAPTERS.map((chapter, i) => (
            <ChapterArticle key={chapter.num} {...chapter} reverse={i % 2 === 1} />
          ))}
        </div>
      </div>
    </section>
  );
}
