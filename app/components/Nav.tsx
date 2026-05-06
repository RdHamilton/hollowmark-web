"use client";

import { useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "Stats", href: "#stats" },
  { label: "Download", href: "/download" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-[#2A3347] bg-[#0D1117]/90 backdrop-blur-sm">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 group">
          <span
            className="text-xl font-bold text-[#F5A623] tracking-tight"
            style={{ fontFamily: "var(--font-sora, Sora, sans-serif)" }}
          >
            VaultMTG
          </span>
        </a>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm font-medium text-[#94A3B8] transition-colors hover:text-[#F5A623]"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a
          href="#cta"
          className="hidden md:inline-flex items-center rounded-lg bg-[#F5A623] px-4 py-2 text-sm font-semibold text-[#0D1117] transition-colors hover:bg-[#F7BA58] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C8841A]"
        >
          Get Early Access
        </a>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-[#94A3B8] hover:text-[#F1F5F9] transition-colors"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? (
            <XMarkIcon className="h-6 w-6" />
          ) : (
            <Bars3Icon className="h-6 w-6" />
          )}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-[#2A3347] bg-[#161C26] px-6 py-4">
          <ul className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="block text-sm font-medium text-[#94A3B8] transition-colors hover:text-[#F5A623]"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#cta"
                className="inline-flex items-center rounded-lg bg-[#F5A623] px-4 py-2 text-sm font-semibold text-[#0D1117] hover:bg-[#F7BA58]"
                onClick={() => setOpen(false)}
              >
                Get Early Access
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
