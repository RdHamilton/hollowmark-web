import type { Metadata } from "next";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Features from "./components/Features";
import Stats from "./components/Stats";
import CTA from "./components/CTA";
import Footer from "./components/Footer";
import { ogImage, SITE_BASE, TWITTER_CARD, OG_IMAGE_URL } from "@/lib/og-metadata";

export const metadata: Metadata = {
  title: SITE_BASE.title,
  description: SITE_BASE.description,
  alternates: {
    canonical: SITE_BASE.url,
  },
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
};

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Features />
        <Stats />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
