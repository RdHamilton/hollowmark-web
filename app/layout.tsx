import type { Metadata } from "next";
import { Sora, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
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
  title: "VaultMTG — Your edge. Every draft. Every match.",
  description:
    "VaultMTG is the MTG Arena companion app for serious players. Real-time draft ratings, deck analysis, collection sync, and match history — all in one place.",
  openGraph: {
    title: "VaultMTG — Your edge. Every draft. Every match.",
    description:
      "Real-time draft ratings, deck analysis, collection sync, and match history for MTG Arena.",
    url: "https://vaultmtg.app",
    siteName: "VaultMTG",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${sora.variable} ${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#0D1117] text-[#F1F5F9]">
        {children}
      </body>
    </html>
  );
}
