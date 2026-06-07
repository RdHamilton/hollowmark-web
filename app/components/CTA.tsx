// CTA → "Begin" — § 05
// Atmospheric serif-italic call-to-action. Single email input + submit
// button with validation, loading state, success state (with position),
// and platform pills.
// Design: Cormorant Garamond display, JetBrains Mono eyebrow, sapphire palette.
// Follows ui_kits/vaultmtg-web/CTA.jsx — Compendium editorial aesthetic. (#1002 rebrand)

"use client";

import { useState } from "react";
import { submitWaitlist } from "../../lib/waitlistApi";

export default function CTA() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [position, setPosition] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!ok) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
    setLoading(true);
    const result = await submitWaitlist(email);
    setLoading(false);
    if (result.ok) {
      setPosition(result.position);
      setSubmitted(true);
    } else {
      setError(result.error);
    }
  }

  return (
    <section
      id="begin"
      style={{
        position: "relative",
        overflow: "hidden",
        padding: "144px 24px",
        background: "linear-gradient(180deg, var(--color-surface-sunken) 0%, #050810 100%)",
        borderTop: "1px solid var(--color-surface-border-subtle)",
      }}
    >
      {/* Ambient sapphire glow centered */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          width: 800,
          height: 600,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(74,144,217,0.12) 0%, rgba(74,144,217,0) 70%)",
          filter: "blur(80px)",
          pointerEvents: "none",
        }}
      />
      {/* Dust noise */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence baseFrequency='0.9' numOctaves='2'/><feColorMatrix values='0 0 0 0 0.5  0 0 0 0 0.7  0 0 0 0 0.95  0 0 0 0.05 0'/></filter><rect width='200' height='200' filter='url(%23n)'/></svg>\")",
          mixBlendMode: "screen",
          opacity: 0.3,
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 1,
          margin: "0 auto",
          maxWidth: 720,
          textAlign: "center",
        }}
      >
        {/* § eyebrow — JetBrains Mono */}
        <div
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 11,
            letterSpacing: "0.32em",
            textTransform: "uppercase" as const,
            color: "rgba(74,144,217,0.7)",
            marginBottom: 14,
          }}
        >
          § 05 · Begin
        </div>

        {/* Display heading — Cormorant Garamond italic */}
        <h2
          style={{
            margin: "0 0 28px",
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontStyle: "italic",
            fontWeight: 500,
            fontSize: "clamp(40px, 5vw, 64px)",
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
            color: "var(--color-text-primary)",
            textShadow: "0 2px 12px rgba(0,0,0,0.6)",
            textWrap: "balance" as unknown as undefined,
          }}
        >
          Ready to draft{" "}
          <span
            style={{
              color: "var(--color-vault-sapphire)",
              textShadow: "0 0 24px rgba(74,144,217,0.4)",
            }}
          >
            smarter?
          </span>
        </h2>

        {/* Deck copy — Cormorant Garamond italic */}
        <p
          style={{
            margin: "0 0 48px",
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontStyle: "italic",
            fontSize: 20,
            lineHeight: 1.5,
            color: "rgba(241,245,249,0.75)",
            textWrap: "pretty" as unknown as undefined,
          }}
        >
          Join the waitlist and receive early access when Hollowmark launches.
          Free during beta — no credit card, no obligation.
        </p>

        {submitted ? (
          <div
            role="status"
            style={{
              display: "inline-flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 10,
              padding: "18px 28px",
              borderRadius: 4,
              border: "1px solid rgba(74,144,217,0.4)",
              background: "rgba(74,144,217,0.10)",
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontStyle: "italic",
              fontSize: 18,
              color: "var(--color-primary-400)",
              boxShadow:
                "0 0 0 1px rgba(74,144,217,0.2), 0 8px 32px rgba(74,144,217,0.15)",
            }}
          >
            <span>✓&nbsp;&nbsp;You&rsquo;re on the list. We&rsquo;ll be in touch when the doors open.</span>
            {position !== null && (
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontStyle: "normal",
                  fontSize: 13,
                  letterSpacing: "0.08em",
                  color: "rgba(74,144,217,0.85)",
                }}
              >
                #{position} in line
              </span>
            )}
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            noValidate
            aria-label="Begin the draft waitlist signup"
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 12,
              justifyContent: "center",
            }}
          >
            <label htmlFor="email-begin" style={{ position: "absolute", left: -9999 }}>
              Email address
            </label>
            <input
              id="email-begin"
              type="email"
              autoComplete="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError("");
              }}
              required
              aria-describedby={error ? "begin-email-error" : undefined}
              style={{
                width: 280,
                height: 56,
                padding: "0 20px",
                borderRadius: 4,
                border: `1px solid ${error ? "var(--color-danger)" : "rgba(241,245,249,0.2)"}`,
                background: "rgba(13,17,23,0.6)",
                backdropFilter: "blur(4px)",
                color: "var(--color-text-primary)",
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontStyle: "italic",
                fontSize: 18,
                outline: "none",
              }}
              onFocus={(e) => {
                if (!error) {
                  e.target.style.borderColor = "var(--color-primary-500)";
                  e.target.style.boxShadow = "0 0 0 2px rgba(74,144,217,0.20)";
                }
              }}
              onBlur={(e) => {
                e.target.style.borderColor = error
                  ? "var(--color-danger)"
                  : "rgba(241,245,249,0.2)";
                e.target.style.boxShadow = "none";
              }}
            />
            <button
              type="submit"
              disabled={loading}
              aria-disabled={loading}
              style={{
                height: 56,
                padding: "0 32px",
                borderRadius: 4,
                border: 0,
                background: "linear-gradient(180deg, var(--color-primary-400) 0%, var(--color-primary-500) 100%)",
                color: "var(--color-surface-sunken)",
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontStyle: "italic",
                fontSize: 18,
                fontWeight: 600,
                cursor: loading ? "not-allowed" : "pointer",
                opacity: loading ? 0.7 : 1,
                boxShadow:
                  "0 0 0 1px rgba(74,144,217,0.4), 0 8px 24px rgba(74,144,217,0.3), inset 0 1px 0 rgba(255,255,255,0.4)",
                whiteSpace: "nowrap",
              }}
            >
              {loading ? "Joining…" : "Begin the draft →"}
            </button>
          </form>
        )}

        {error && (
          <p
            id="begin-email-error"
            role="alert"
            style={{
              marginTop: 16,
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontStyle: "italic",
              color: "var(--color-danger)",
            }}
          >
            {error}
          </p>
        )}

        {!submitted && (
          <p
            style={{
              marginTop: 20,
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontStyle: "italic",
              fontSize: 14,
              color: "rgba(241,245,249,0.4)",
            }}
          >
            No spam. Unsubscribe at any time.
          </p>
        )}

        {/* Platform pills */}
        <div
          style={{
            marginTop: 56,
            display: "flex",
            flexWrap: "wrap",
            gap: 12,
            justifyContent: "center",
          }}
        >
          {["macOS", "Windows"].map((p) => (
            <span
              key={p}
              style={{
                padding: "8px 18px",
                borderRadius: 9999,
                border: "1px solid rgba(241,245,249,0.15)",
                background: "rgba(255,255,255,0.02)",
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 11,
                letterSpacing: "0.16em",
                textTransform: "uppercase" as const,
                color: "rgba(241,245,249,0.55)",
              }}
            >
              {p}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
