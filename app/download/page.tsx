import type { Metadata } from "next";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";
import {
  ogImage,
  SITE_BASE,
  TWITTER_CARD,
  OG_IMAGE_URL,
} from "@/lib/og-metadata";

const DOWNLOAD_TITLE = "Download Hollowmark — Your edge. Every draft. Every match.";
const DOWNLOAD_DESCRIPTION =
  "Download the Hollowmark companion app for MTG Arena. Get real-time draft ratings, deck analysis, and full match history — available for Mac and Windows.";

export const metadata: Metadata = {
  title: DOWNLOAD_TITLE,
  description: DOWNLOAD_DESCRIPTION,
  openGraph: {
    title: DOWNLOAD_TITLE,
    description: DOWNLOAD_DESCRIPTION,
    url: `${SITE_BASE.url}/download`,
    siteName: SITE_BASE.siteName,
    type: "website",
    images: [ogImage],
  },
  twitter: {
    card: TWITTER_CARD,
    title: DOWNLOAD_TITLE,
    description: DOWNLOAD_DESCRIPTION,
    images: [OG_IMAGE_URL],
  },
};

export default function DownloadPage() {
  return (
    <>
      <Nav />
      <main className="flex min-h-screen flex-col items-center justify-center px-6 pt-24 pb-16">
        {/* Ambient glow */}
        <div
          className="pointer-events-none fixed inset-0 -z-10"
          aria-hidden="true"
        >
          <div className="absolute left-1/2 top-1/3 h-[600px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#4A90D9]/5 blur-3xl" />
        </div>

        {/* Hero section */}
        <div className="mx-auto max-w-3xl text-center">
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#2A3347] bg-[#161C26] px-4 py-1.5">
            <span className="h-2 w-2 rounded-full bg-[#22C55E]" aria-hidden="true" />
            <span className="text-xs font-medium text-[#94A3B8]">
              Free during beta
            </span>
          </div>

          {/* App name */}
          <h1
            className="mb-4 text-4xl font-extrabold leading-tight tracking-tight text-[#F1F5F9] sm:text-5xl lg:text-6xl"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontStyle: "italic" }}
          >
            Download{" "}
            <span className="text-[#4A90D9]">Hollowmark</span>
          </h1>

          {/* Value prop */}
          <p className="mb-12 text-lg leading-relaxed text-[#94A3B8]">
            The MTG Arena companion built for serious players. Install the daemon
            to unlock real-time draft ratings, deck analysis,
            collection sync, and full match history — all running quietly in
            the background while you play.
          </p>

          {/* Download buttons */}
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            {/* Mac download */}
            {/* TODO: Replace href with actual macOS installer URL once artifact is hosted */}
            <a
              href="#"
              aria-label="Download Hollowmark for Mac"
              className="inline-flex w-full items-center justify-center gap-3 rounded-lg bg-[#4A90D9] px-8 py-4 text-base font-semibold text-[#0D1117] shadow-lg transition-colors hover:bg-[#7CB5F0] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2C6BAA] sm:w-auto"
            >
              <ArrowDownTrayIcon className="h-5 w-5 shrink-0" aria-hidden="true" />
              <span className="flex flex-col text-left leading-tight">
                <span className="text-xs font-medium opacity-75">Download for</span>
                <span>macOS</span>
              </span>
            </a>

            {/* Windows download */}
            {/* TODO: Replace href with actual Windows installer URL once artifact is hosted */}
            <a
              href="#"
              aria-label="Download Hollowmark for Windows"
              className="inline-flex w-full items-center justify-center gap-3 rounded-lg border border-[#2A3347] bg-[#161C26] px-8 py-4 text-base font-medium text-[#F1F5F9] transition-colors hover:border-[#4A90D9]/50 hover:text-[#4A90D9] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2C6BAA] sm:w-auto"
            >
              <ArrowDownTrayIcon className="h-5 w-5 shrink-0" aria-hidden="true" />
              <span className="flex flex-col text-left leading-tight">
                <span className="text-xs font-medium opacity-75">Download for</span>
                <span>Windows</span>
              </span>
            </a>
          </div>

          {/* Requirements note */}
          <p className="mt-6 text-sm text-[#4E6080]">
            Requires MTG Arena on desktop. macOS 12+ or Windows 10+.
          </p>
        </div>

        {/* Feature highlights */}
        <div className="mx-auto mt-20 max-w-4xl w-full">
          <h2
            className="mb-8 text-center text-xl font-semibold text-[#94A3B8]"
            style={{ fontFamily: "var(--font-sora, Sora, sans-serif)" }}
          >
            What you get
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((f) => (
              <div
                key={f.title}
                className="rounded-lg border border-[#2A3347] bg-[#161C26] p-6"
              >
                <div className="mb-3 text-2xl" aria-hidden="true">
                  {f.icon}
                </div>
                <h3 className="mb-1 text-sm font-semibold text-[#F1F5F9]">
                  {f.title}
                </h3>
                <p className="text-sm leading-relaxed text-[#94A3B8]">
                  {f.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

const FEATURES = [
  {
    icon: "⚡",
    title: "Real-time draft ratings",
    description:
      "Live pick suggestions powered by 17Lands data — right as you draft.",
  },
  {
    icon: "📊",
    title: "Full match history",
    description:
      "Every game tracked automatically. Review outcomes, opponents, and deck performance.",
  },
  {
    icon: "🗂️",
    title: "Collection sync",
    description:
      "Your card inventory always up to date — know what you own at a glance.",
  },
  {
    icon: "🔍",
    title: "Deck analysis",
    description:
      "Curve, archetype fit, and format-specific strengths — at a glance.",
  },
  {
    icon: "🏆",
    title: "Rank progression",
    description:
      "Track your climb across formats. Spot trends before they cost you games.",
  },
  {
    icon: "🖥️",
    title: "Background daemon",
    description:
      "Runs quietly alongside MTG Arena — no overlay clutter, no performance hit.",
  },
];
