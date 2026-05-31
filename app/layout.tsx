import type { Metadata } from "next";
import { Cormorant_Garamond, Inter, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import AnalyticsProvider from "./components/AnalyticsProvider";
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
        <AnalyticsProvider />
        {children}
        <Script
          id="crisp-widget"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.$crisp = [];
              window.CRISP_WEBSITE_ID = "47bd78ac-6489-4923-9c7b-66021a36bf83";
              (function () {
                var d = document;
                var s = d.createElement("script");
                s.src = "https://client.crisp.chat/l.js";
                s.async = 1;
                d.getElementsByTagName("head")[0].appendChild(s);
              })();
            `,
          }}
        />
      </body>
    </html>
  );
}
