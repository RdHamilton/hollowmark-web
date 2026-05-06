import {
  ChartBarIcon,
  SparklesIcon,
  CircleStackIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";

const features = [
  {
    icon: SparklesIcon,
    title: "Real-Time Draft Ratings",
    description:
      "Instant A-F tier ratings and win-rate data for every card in your pack — updated live from millions of drafts. Know your pick before the timer runs out.",
    highlight: "A-F tier ratings updated live",
    accentColor: "#F5A623",
  },
  {
    icon: ChartBarIcon,
    title: "Intelligent Deck Builder",
    description:
      "Get archetype suggestions, mana curve analysis, and color-pair synergy scores as you build. The deck builder learns from your collection and draft history.",
    highlight: "Mana curve + synergy analysis",
    accentColor: "#38BDF8",
  },
  {
    icon: CircleStackIcon,
    title: "Collection Sync",
    description:
      "Your collection auto-syncs from MTG Arena. Filter draft ratings by cards you own, spot upgrade opportunities, and track set completion across formats.",
    highlight: "Live sync from MTGA client",
    accentColor: "#22C55E",
  },
  {
    icon: ClockIcon,
    title: "Full Match History",
    description:
      "Every game logged automatically — opponent deck archetype, duration, outcome, game-by-game breakdown. Identify patterns in your wins and losses.",
    highlight: "Every game logged automatically",
    accentColor: "#EAB308",
  },
];

export default function Features() {
  return (
    <section id="features" className="py-24 px-6">
      <div className="mx-auto max-w-6xl">
        {/* Section header */}
        <div className="mb-16 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#F5A623]">
            Features
          </p>
          <h2
            className="text-4xl font-bold text-[#F1F5F9] sm:text-5xl"
            style={{ fontFamily: "var(--font-sora, Sora, sans-serif)" }}
          >
            Everything you need to win more
          </h2>
          <p className="mt-4 max-w-xl mx-auto text-[#94A3B8]">
            Built for MTG Arena players who take their game seriously. No noise
            — just the data that matters.
          </p>
        </div>

        {/* Feature grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <article
                key={feature.title}
                className="group relative rounded-xl border border-[#2A3347] bg-[#161C26] p-8 transition-colors hover:border-[#F5A623]/30 hover:bg-[#1E2636]"
              >
                {/* Icon */}
                <div
                  className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-lg border border-[#2A3347]"
                  style={{ backgroundColor: `${feature.accentColor}15` }}
                >
                  <Icon
                    className="h-6 w-6"
                    style={{ color: feature.accentColor }}
                    aria-hidden="true"
                  />
                </div>

                {/* Content */}
                <h3
                  className="mb-3 text-xl font-semibold text-[#F1F5F9]"
                  style={{ fontFamily: "var(--font-sora, Sora, sans-serif)" }}
                >
                  {feature.title}
                </h3>
                <p className="text-[#94A3B8] leading-relaxed">
                  {feature.description}
                </p>

                {/* Highlight pill */}
                <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-[#2A3347] bg-[#0D1117] px-3 py-1">
                  <span
                    className="h-1.5 w-1.5 rounded-full"
                    style={{ backgroundColor: feature.accentColor }}
                    aria-hidden="true"
                  />
                  <span
                    className="text-xs"
                    style={{
                      color: feature.accentColor,
                      fontFamily:
                        "var(--font-jetbrains-mono, JetBrains Mono, monospace)",
                    }}
                  >
                    {feature.highlight}
                  </span>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
