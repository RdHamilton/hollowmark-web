import { ArrowDownIcon } from "@heroicons/react/24/outline";

export default function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-20 text-center">
      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        aria-hidden="true"
      >
        <div className="absolute left-1/2 top-1/3 h-[600px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#F5A623]/5 blur-3xl" />
      </div>

      {/* Badge */}
      <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#2A3347] bg-[#161C26] px-4 py-1.5">
        <span className="h-2 w-2 rounded-full bg-[#22C55E]" aria-hidden="true" />
        <span className="text-xs font-medium text-[#94A3B8]">
          Early Access — Free during beta
        </span>
      </div>

      {/* Headline */}
      <h1
        className="mb-6 max-w-4xl text-5xl font-extrabold leading-tight tracking-tight text-[#F1F5F9] sm:text-6xl lg:text-7xl"
        style={{ fontFamily: "var(--font-sora, Sora, sans-serif)" }}
      >
        Your edge.{" "}
        <span className="text-[#F5A623]">Every draft.</span>
        <br />
        Every match.
      </h1>

      {/* Subheadline */}
      <p className="mb-10 max-w-2xl text-lg leading-relaxed text-[#94A3B8]">
        VaultMTG is the MTG Arena companion built for serious players. Real-time
        draft ratings, intelligent deck analysis, collection sync, and full
        match history — all in one seamless overlay.
      </p>

      {/* CTAs */}
      <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
        <a
          href="#cta"
          className="inline-flex items-center rounded-lg bg-[#F5A623] px-6 py-3 text-base font-semibold text-[#0D1117] shadow-lg transition-colors hover:bg-[#F7BA58] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C8841A]"
        >
          Get Early Access
        </a>
        <a
          href="#features"
          className="inline-flex items-center gap-2 rounded-lg border border-[#2A3347] bg-[#161C26] px-6 py-3 text-base font-medium text-[#F1F5F9] transition-colors hover:border-[#F5A623]/50 hover:text-[#F5A623]"
        >
          See the features
          <ArrowDownIcon className="h-4 w-4" aria-hidden="true" />
        </a>
      </div>

      {/* Stat pills */}
      <div className="mt-16 flex flex-wrap justify-center gap-6">
        {[
          { label: "Cards rated", value: "30,000+" },
          { label: "Drafts tracked", value: "500K+" },
          { label: "Avg win-rate lift", value: "+8%" },
        ].map((stat) => (
          <div
            key={stat.label}
            className="flex flex-col items-center rounded-lg border border-[#2A3347] bg-[#161C26] px-6 py-4"
          >
            <span
              className="text-2xl font-bold text-[#F5A623]"
              style={{ fontFamily: "var(--font-jetbrains-mono, JetBrains Mono, monospace)" }}
            >
              {stat.value}
            </span>
            <span className="mt-1 text-xs text-[#94A3B8]">{stat.label}</span>
          </div>
        ))}
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-8 flex flex-col items-center gap-2 text-[#4E6080]">
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <ArrowDownIcon className="h-4 w-4 animate-bounce" aria-hidden="true" />
      </div>
    </section>
  );
}
