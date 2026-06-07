"use client";

import { useState } from "react";
import Image from "next/image";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

// Chapter-style nav — each link maps to a Compendium section or a top-level page.
const NAV_LINKS = [
  { section: "§02", label: "The Compendium", href: "#compendium" },
  { section: "§03", label: "Statistics",     href: "#statistics" },
  { section: "§05", label: "Roadmap",        href: "/roadmap" },
  { section: "§06", label: "Begin",          href: "#begin" },
  { section: "§07", label: "Help",           href: "/docs" },
] as const;

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        borderBottom: "1px solid var(--color-surface-border-subtle)",
        background: "rgba(10,14,22,0.85)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
      }}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        {/* Wordmark — mark icon + serif italic logotype */}
        <a href="#" className="flex items-center gap-3" aria-label="Hollowmark home">
          <Image
            src="/logo-vaultmtg-mark.svg"
            alt=""
            width={30}
            height={30}
            priority
            className="h-[30px] w-auto"
          />
          <span
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontStyle: "italic",
              fontWeight: 600,
              fontSize: 24,
              letterSpacing: "0.01em",
              color: "var(--color-vault-sapphire)",
              textShadow: "0 1px 8px rgba(74,144,217,0.25)",
              lineHeight: 1,
            }}
          >
            Hollowmark
          </span>
        </a>

        {/* Desktop nav — chapter links with mono section numbers */}
        <ul className="hidden md:flex items-center gap-7 list-none m-0 p-0">
          {NAV_LINKS.map(({ section, label, href }) => (
            <li key={href} className="flex items-baseline gap-1.5">
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 10,
                  color: "rgba(74,144,217,0.55)",
                  letterSpacing: "0.16em",
                }}
              >
                {section}
              </span>
              <a
                href={href}
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontStyle: "italic",
                  fontSize: 16,
                  color: "rgba(241,245,249,0.78)",
                  textDecoration: "none",
                  borderBottom: "1px solid transparent",
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
                  el.style.color = "rgba(241,245,249,0.78)";
                  el.style.borderBottomColor = "transparent";
                }}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop CTA — "Begin" — serif italic sapphire button.
            nav-cta-focus class carries the :focus-visible ring (WCAG 2.4.7, #345). */}
        <a
          href="#begin"
          className="hidden md:inline-flex items-center gap-2 nav-cta-focus"
          style={{
            padding: "10px 22px",
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontStyle: "italic",
            fontSize: 16,
            fontWeight: 600,
            color: "var(--color-surface-sunken)",
            background: "linear-gradient(180deg, var(--color-primary-400) 0%, var(--color-primary-500) 100%)",
            border: "1px solid rgba(124,181,240,0.5)",
            borderRadius: 4,
            boxShadow:
              "0 0 0 1px rgba(74,144,217,0.3), 0 4px 12px rgba(74,144,217,0.2), inset 0 1px 0 rgba(255,255,255,0.4)",
            textDecoration: "none",
            letterSpacing: "0.01em",
            whiteSpace: "nowrap",
          }}
        >
          Begin
        </a>

        {/* Mobile hamburger */}
        <button
          className="md:hidden"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          style={{
            background: "none",
            border: 0,
            color: "rgba(241,245,249,0.8)",
            padding: 4,
            cursor: "pointer",
          }}
        >
          {open ? (
            <XMarkIcon className="h-6 w-6" />
          ) : (
            <Bars3Icon className="h-6 w-6" />
          )}
        </button>
      </nav>

      {/* Mobile drawer */}
      {open && (
        <div
          style={{
            borderTop: "1px solid var(--color-surface-border-subtle)",
            background: "rgba(10,14,22,0.95)",
            padding: "16px 24px 20px",
          }}
        >
          <ul className="flex flex-col gap-3.5 list-none m-0 p-0">
            {NAV_LINKS.map(({ section, label, href }) => (
              <li key={href} className="flex items-baseline gap-2">
                <span
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 10,
                    color: "rgba(74,144,217,0.55)",
                    letterSpacing: "0.16em",
                  }}
                >
                  {section}
                </span>
                <a
                  href={href}
                  onClick={() => setOpen(false)}
                  style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    fontStyle: "italic",
                    fontSize: 18,
                    color: "rgba(241,245,249,0.85)",
                    textDecoration: "none",
                  }}
                >
                  {label}
                </a>
              </li>
            ))}
            {/* Mobile CTA — "Begin" — focus ring restored (#345) */}
            <li className="pt-2">
              <a
                href="#begin"
                onClick={() => setOpen(false)}
                className="nav-cta-focus"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  padding: "10px 22px",
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
                }}
              >
                Begin
              </a>
            </li>
          </ul>
        </div>
      )}

      {/* Focus-visible ring for CTA anchors — WCAG 2.4.7 compliance (#345).
          Scoped class avoids the inline-style limitation (no pseudo-selector support). */}
      <style>{`
        .nav-cta-focus:focus-visible {
          outline: 2px solid var(--color-primary-600);
          outline-offset: 2px;
        }
      `}</style>
    </header>
  );
}
