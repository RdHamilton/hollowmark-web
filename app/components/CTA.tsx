"use client";

import { useState } from "react";
import { CheckCircleIcon } from "@heroicons/react/24/solid";

export default function CTA() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    // Static export — no server action available. In production this would
    // POST to an API endpoint. For now we show the success state.
    setSubmitted(true);
    setError("");
  }

  return (
    <section
      id="cta"
      className="relative overflow-hidden py-32 px-6"
    >
      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        aria-hidden="true"
      >
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#F5A623]/8 blur-3xl" />
      </div>

      <div className="mx-auto max-w-2xl text-center">
        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#F5A623]">
          Early Access
        </p>
        <h2
          className="mb-6 text-4xl font-bold text-[#F1F5F9] sm:text-5xl"
          style={{ fontFamily: "var(--font-sora, Sora, sans-serif)" }}
        >
          Ready to draft smarter?
        </h2>
        <p className="mb-10 text-lg text-[#94A3B8]">
          Join the waitlist and get early access when VaultMTG launches. Free
          during beta — no credit card required.
        </p>

        {submitted ? (
          <div className="flex items-center justify-center gap-3 rounded-xl border border-[#22C55E]/30 bg-[#22C55E]/10 px-6 py-4 text-[#22C55E]">
            <CheckCircleIcon className="h-6 w-6 shrink-0" aria-hidden="true" />
            <span className="font-medium">
              You&rsquo;re on the list. We&rsquo;ll be in touch soon.
            </span>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center"
            aria-label="Early access waitlist signup"
            noValidate
          >
            <label htmlFor="email-cta" className="sr-only">
              Email address
            </label>
            <input
              id="email-cta"
              type="email"
              autoComplete="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError("");
              }}
              required
              aria-describedby={error ? "email-error" : undefined}
              className="w-full max-w-xs rounded-lg border border-[#2A3347] bg-[#161C26] px-4 py-3 text-[#F1F5F9] placeholder-[#4E6080] outline-none transition-colors focus:border-[#F5A623] focus:ring-1 focus:ring-[#F5A623] sm:max-w-sm"
            />
            <button
              type="submit"
              className="w-full rounded-lg bg-[#F5A623] px-6 py-3 font-semibold text-[#0D1117] transition-colors hover:bg-[#F7BA58] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C8841A] sm:w-auto"
            >
              Get Early Access
            </button>
          </form>
        )}

        {error && (
          <p id="email-error" role="alert" className="mt-3 text-sm text-[#EF4444]">
            {error}
          </p>
        )}

        {!submitted && (
          <p className="mt-4 text-sm text-[#4E6080]">
            No spam. Unsubscribe any time.
          </p>
        )}

        {/* Platform pills */}
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          {["macOS", "Windows"].map((platform) => (
            <span
              key={platform}
              className="rounded-full border border-[#2A3347] bg-[#161C26] px-4 py-1.5 text-xs font-medium text-[#94A3B8]"
            >
              {platform}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
