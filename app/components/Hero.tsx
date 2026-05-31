import ManaWheel from "./ManaWheel";

// Mana pip data for the bottom rail flavour bar.
const MANA_PIPS = [
  { color: "#E8E0C8", active: false },
  { color: "#4A90D9", active: true  },
  { color: "#9B7FC2", active: false },
  { color: "#C94E3A", active: false },
  { color: "#3A9E5F", active: false },
] as const;

export default function Hero() {
  return (
    <section
      id="compendium"
      style={{
        position: "relative",
        minHeight: "calc(100vh - 84px)",
        overflow: "hidden",
        background:
          "linear-gradient(180deg, #0A0E16 0%, #050810 60%, #000000 100%)",
      }}
    >
      {/* Ambient sapphire glow from behind the mana wheel */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          right: "10%",
          top: "30%",
          width: 800,
          height: 800,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(74,144,217,0.35) 0%, rgba(74,144,217,0.10) 30%, rgba(74,144,217,0) 65%)",
          filter: "blur(8px)",
          pointerEvents: "none",
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          right: "-10%",
          bottom: "-10%",
          width: 600,
          height: 600,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(74,144,217,0.10) 0%, rgba(74,144,217,0) 70%)",
          pointerEvents: "none",
        }}
      />

      {/* Atmospheric dust */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence baseFrequency='0.9' numOctaves='2'/><feColorMatrix values='0 0 0 0 0.96  0 0 0 0 0.65  0 0 0 0 0.14  0 0 0 0.08 0'/></filter><rect width='200' height='200' filter='url(%23n)'/></svg>")`,
          mixBlendMode: "screen",
          opacity: 0.25,
          pointerEvents: "none",
        }}
      />

      {/* Radial vignette */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.45) 75%, rgba(0,0,0,0.85) 100%)",
          pointerEvents: "none",
        }}
      />

      {/* Main two-column layout: copy left / wheel right */}
      <div
        className="hero-grid"
        style={{
          position: "relative",
          zIndex: 1,
          margin: "0 auto",
          maxWidth: 1200,
          padding: "80px 24px 120px",
          display: "grid",
          gridTemplateColumns: "1.1fr 1fr",
          gap: 48,
          alignItems: "center",
        }}
      >
        {/* Left — editorial copy */}
        <div>
          {/* Eyebrow */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 11,
              letterSpacing: "0.32em",
              textTransform: "uppercase",
              color: "rgba(74,144,217,0.85)",
              marginBottom: 28,
            }}
          >
            <span
              style={{
                width: 32,
                height: 1,
                background: "rgba(74,144,217,0.4)",
                display: "inline-block",
                flexShrink: 0,
              }}
            />
            EARLY ACCESS · CHAPTER ONE
          </div>

          {/* Headline — serif italic, full Compendium scale */}
          <h1
            style={{
              margin: 0,
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontStyle: "italic",
              fontWeight: 500,
              fontSize: "clamp(56px, 7vw, 96px)",
              lineHeight: 0.95,
              letterSpacing: "-0.02em",
              color: "#F1F5F9",
              textShadow: "0 2px 12px rgba(0,0,0,0.6)",
            }}
          >
            Your edge.
            <br />
            <span
              style={{
                color: "#4A90D9",
                textShadow:
                  "0 0 24px rgba(74,144,217,0.4), 0 2px 12px rgba(0,0,0,0.6)",
              }}
            >
              Every draft.
            </span>
            <br />
            Every match.
          </h1>

          {/* Subhead — lighter serif italic, restrained */}
          <p
            style={{
              margin: "32px 0 0",
              maxWidth: 480,
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: 20,
              lineHeight: 1.5,
              color: "rgba(241,245,249,0.78)",
              fontStyle: "italic",
            }}
          >
            A companion for the long study — real-time draft ratings, deck
            analysis, and the full history of every match you have ever played.
          </p>

          {/* CTAs */}
          <div
            style={{
              display: "flex",
              gap: 16,
              marginTop: 40,
              flexWrap: "wrap",
            }}
          >
            <a
              href="#begin"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                padding: "14px 28px",
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontStyle: "italic",
                fontSize: 18,
                fontWeight: 600,
                color: "#0A0E16",
                background:
                  "linear-gradient(180deg, #7CB5F0 0%, #4A90D9 100%)",
                border: "1px solid rgba(124,181,240,0.5)",
                borderRadius: 4,
                boxShadow:
                  "0 0 0 1px rgba(74,144,217,0.3), 0 8px 24px rgba(74,144,217,0.25), inset 0 1px 0 rgba(255,255,255,0.4)",
                textDecoration: "none",
                letterSpacing: "0.01em",
                whiteSpace: "nowrap",
              }}
            >
              Begin the draft
              <span style={{ fontSize: 14 }}>→</span>
            </a>
            <a
              href="#compendium"
              style={{
                display: "inline-flex",
                alignItems: "center",
                padding: "14px 28px",
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontStyle: "italic",
                fontSize: 18,
                fontWeight: 500,
                color: "rgba(241,245,249,0.85)",
                background: "transparent",
                border: "1px solid rgba(241,245,249,0.18)",
                borderRadius: 4,
                textDecoration: "none",
                whiteSpace: "nowrap",
              }}
            >
              Read the compendium
            </a>
          </div>
        </div>

        {/* Right — mana wheel */}
        <div
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ManaWheel color="#4A90D9" size="min(560px, 70vh)" />
        </div>
      </div>

      {/* Bottom rail — flavour text + mana pips */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 1,
          borderTop: "1px solid rgba(74,144,217,0.15)",
          background:
            "linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.7) 100%)",
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            padding: "20px 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          {/* Flavour label */}
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 11,
              letterSpacing: "0.24em",
              textTransform: "uppercase",
              color: "rgba(241,245,249,0.45)",
            }}
          >
            Blue (U) · Knowledge · Analysis · Foresight
          </span>

          {/* Mana pips */}
          <div style={{ display: "flex", gap: 8 }}>
            {MANA_PIPS.map((pip, i) => (
              <span
                key={i}
                aria-hidden="true"
                style={{
                  width: 14,
                  height: 14,
                  borderRadius: "50%",
                  background: pip.color,
                  display: "inline-block",
                  boxShadow: pip.active
                    ? `0 0 0 2px rgba(74,144,217,0.5), 0 0 12px ${pip.color}`
                    : `0 0 0 1px rgba(0,0,0,0.5), 0 0 8px ${pip.color}60`,
                  transform: pip.active ? "scale(1.15)" : "scale(1)",
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Responsive: stack columns on narrow viewports */}
      <style>{`
        @media (max-width: 880px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            padding-bottom: 100px !important;
          }
        }
      `}</style>
    </section>
  );
}
