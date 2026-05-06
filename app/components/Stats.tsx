const stats = [
  {
    value: "30,000+",
    label: "Cards rated",
    detail: "Across all current and recent sets",
  },
  {
    value: "500K+",
    label: "Drafts tracked",
    detail: "And growing every week",
  },
  {
    value: "2.4s",
    label: "Avg pick time saved",
    detail: "Per card pick on average",
  },
  {
    value: "+8%",
    label: "Win-rate lift",
    detail: "Reported by active users after 30 drafts",
  },
];

const testimonials = [
  {
    quote:
      "I went from hovering around 55% win rate to consistently 65%+ within two weeks. The draft ratings are just that good.",
    author: "Sable_Raven",
    detail: "Mythic rank, limited specialist",
  },
  {
    quote:
      "Finally, an overlay that doesn't feel like homework. The data is there when I need it and out of the way when I don't.",
    author: "DraftKingMTG",
    detail: "Top 100 limited player",
  },
  {
    quote:
      "Collection sync is the killer feature for me. I can see exactly which picks upgrade my collection as I draft. Huge.",
    author: "Aetherborn_7",
    detail: "Set collector + competitive drafter",
  },
];

export default function Stats() {
  return (
    <section
      id="stats"
      className="border-y border-[#2A3347] bg-[#161C26] py-24 px-6"
    >
      <div className="mx-auto max-w-6xl">
        {/* Stats grid */}
        <div className="mb-20 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p
                className="mb-1 text-4xl font-bold text-[#F5A623] sm:text-5xl"
                style={{
                  fontFamily:
                    "var(--font-jetbrains-mono, JetBrains Mono, monospace)",
                }}
              >
                {stat.value}
              </p>
              <p
                className="text-lg font-semibold text-[#F1F5F9]"
                style={{ fontFamily: "var(--font-sora, Sora, sans-serif)" }}
              >
                {stat.label}
              </p>
              <p className="mt-1 text-sm text-[#94A3B8]">{stat.detail}</p>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="mb-16 border-t border-[#2A3347]" />

        {/* Testimonials */}
        <div className="mb-10 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#F5A623]">
            From the community
          </p>
          <h2
            className="text-3xl font-bold text-[#F1F5F9] sm:text-4xl"
            style={{ fontFamily: "var(--font-sora, Sora, sans-serif)" }}
          >
            Players who already have the edge
          </h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-3">
          {testimonials.map((t) => (
            <blockquote
              key={t.author}
              className="rounded-xl border border-[#2A3347] bg-[#0D1117] p-6"
            >
              <p className="mb-4 text-[#94A3B8] leading-relaxed">
                &ldquo;{t.quote}&rdquo;
              </p>
              <footer>
                <span className="block font-semibold text-[#F5A623]">
                  {t.author}
                </span>
                <span className="text-sm text-[#4E6080]">{t.detail}</span>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
