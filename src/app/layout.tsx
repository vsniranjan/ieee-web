import type { Metadata } from "next";
import { Anton, Archivo } from "next/font/google";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { Footer } from "@/components/chrome/Footer";
import { Navbar } from "@/components/chrome/Navbar";
import { PageTerrain } from "@/components/chrome/PageTerrain";
import { Reticle } from "@/components/chrome/Reticle";
import { SmoothScroll } from "@/components/chrome/SmoothScroll";
import { ThemeScript } from "@/components/chrome/ThemeScript";
import "./globals.css";

/**
 * One family, two axes. Archivo carries display and body through weight and
 * width contrast, which beats a timid display+body pair.
 */
const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
});

/**
 * Anton: the single display face. Ultra-condensed, one weight, poster-cut —
 * distinctive enough on its letterforms alone that the hero composition can
 * stay plain. Latin subset, ~9KB.
 */
const anton = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-anton",
  display: "swap",
});

const fontVars = [archivo.variable, anton.variable].join(" ");

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
          <Reticle />
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
