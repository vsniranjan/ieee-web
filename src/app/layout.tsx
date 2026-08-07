import type { Metadata } from "next";
import { Anton, Archivo } from "next/font/google";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { Reticle } from "@/components/chrome/Reticle";
import { ThemeScript } from "@/components/chrome/ThemeScript";
import { ThemeToggle } from "@/components/chrome/ThemeToggle";
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
    <html lang="en" className={fontVars} suppressHydrationWarning>
      <head>
        <ThemeScript />
        {/* A JS failure must never ship a blank page. */}
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </head>
      <body>
        <MotionProvider>
          <ThemeToggle />
          <Reticle />
          {children}
        </MotionProvider>
      </body>
    </html>
  );
}
