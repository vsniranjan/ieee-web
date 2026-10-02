import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { Footer } from "@/components/chrome/Footer";
import { Navbar } from "@/components/chrome/Navbar";
import { PageTerrain } from "@/components/chrome/PageTerrain";
import { SmoothScroll } from "@/components/chrome/SmoothScroll";
import { ThemeScript } from "@/components/chrome/ThemeScript";
import "./globals.css";

/**
 * One family for everything. Headings and body differ by size and weight only.
 */
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const fontVars = inter.variable;

export const metadata: Metadata = {
  title: "IEEE MACE SB",
  description:
    "IEEE Student Branch of Mar Athanasius College of Engineering, Kothamangalam. Bridging the gap between engineering theory and professional impact since 1988.",
  icons: { icon: "/logo.svg" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={fontVars}>
      <head>
        <ThemeScript />
        {/* A JS failure must never ship a blank page. Motion renders its
            `initial` styles server-side, so every property an entrance starts
            from has to be reset here — clip-path included, or the field-work
            pills ship wiped to zero width. */}
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important;clip-path:none!important}`}</style>
        </noscript>
      </head>
      <body>
        <MotionProvider>
          <PageTerrain />
          {/* Navbar and Footer live inside SmoothScroll so useLenis() can reach
              the instance — for the menu's scroll lock and for back-to-top. */}
          <SmoothScroll>
            <Navbar />
            {children}
            <Footer />
          </SmoothScroll>
        </MotionProvider>
      </body>
    </html>
  );
}
