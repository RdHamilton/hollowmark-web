/**
 * Canonical OG/social meta values — vault-mtg-tickets#317.
 *
 * Single source of truth for OpenGraph and Twitter card metadata shared across
 * layout.tsx and page-level overrides. Kept as a pure module (no React / Next
 * imports) so it can be imported safely in Vitest unit tests without needing
 * component stubs or framework mocks.
 */

/** Absolute URL to the canonical branded OG image (1200×630 PNG). */
export const OG_IMAGE_URL = "https://vaultmtg.app/og-image.png" as const;

export const OG_IMAGE_WIDTH = 1200 as const;
export const OG_IMAGE_HEIGHT = 630 as const;

/** Shared OG image descriptor for use in Next.js Metadata `openGraph.images`. */
export const ogImage = {
  url: OG_IMAGE_URL,
  width: OG_IMAGE_WIDTH,
  height: OG_IMAGE_HEIGHT,
  alt: "VaultMTG — Your edge. Every draft. Every match.",
} as const;

/** Twitter card type used across all pages. */
export const TWITTER_CARD = "summary_large_image" as const;

/** Root site metadata values. */
export const SITE_BASE = {
  title: "VaultMTG — Your edge. Every draft. Every match.",
  description:
    "VaultMTG is the MTG Arena companion app for serious players. Real-time draft ratings, deck analysis, collection sync, and match history — all in one place.",
  url: "https://vaultmtg.app",
  siteName: "VaultMTG",
  ogDescription:
    "Real-time draft ratings, deck analysis, collection sync, and match history for MTG Arena.",
} as const;
