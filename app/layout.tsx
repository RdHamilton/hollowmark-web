import type { Metadata } from "next";
import { Cormorant_Garamond, Inter, JetBrains_Mono } from "next/font/google";
import AnalyticsProvider from "./components/AnalyticsProvider";
import ConsentBanner, { ConsentModeDefaultBlock } from "./components/ConsentBanner";
import {
  ogImage,
  SITE_BASE,
  TWITTER_CARD,
  OG_IMAGE_URL,
} from "@/lib/og-metadata";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: SITE_BASE.title,
  description: SITE_BASE.description,
  openGraph: {
    title: SITE_BASE.title,
    description: SITE_BASE.ogDescription,
    url: SITE_BASE.url,
    siteName: SITE_BASE.siteName,
    type: "website",
    images: [ogImage],
  },
  twitter: {
    card: TWITTER_CARD,
    title: SITE_BASE.title,
    description: SITE_BASE.ogDescription,
    images: [OG_IMAGE_URL],
  },
  manifest: "/site.webmanifest",
  themeColor: "#0D1117",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#0D1117] text-[#F1F5F9]">
        {/*
          Consent Mode v2 default-block: strategy="beforeInteractive" is
          injected into the initial server HTML before any Next.js code runs,
          denying analytics_storage/ad_storage for all visitors before any
          GA4 loader fires. Must be inside <body> per Next.js 16 App Router.
        */}
        <ConsentModeDefaultBlock />
        <AnalyticsProvider />
        {children}
        <ConsentBanner />
      </body>
    </html>
  );
}
