"use client";

import Image from "next/image";
import Link from "next/link";
import { useLenis } from "lenis/react";
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll } from "motion/react";
import { useEffect, useState } from "react";
import { DUR, EASE_SIGNATURE } from "@/lib/motion";
import { nav } from "@/content/site";

/**
 * Transparent over the hero, solid once you leave it.
 *
 * The state flips on a threshold rather than tracking scroll continuously —
 * two changes over the life of the page, not one per frame.
 */
export function Navbar() {
  const reduced = useReducedMotion();
  const { scrollY } = useScroll();
  const [solid, setSolid] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const lenis = useLenis();

  useMotionValueEvent(scrollY, "change", (y) => {
    const next = y > 80;
    setSolid((cur) => (cur === next ? cur : next));
  });

  // Lenis owns the scroll, so `overflow: hidden` on body will not hold it.
  // Stopping the instance is what actually locks the page behind the menu.
  useEffect(() => {
    if (!lenis) return;
    if (menuOpen) lenis.stop();
    else lenis.start();
    return () => lenis.start();
  }, [menuOpen, lenis]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <>
      <header
        className={`ease-signature fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
          solid || menuOpen
            ? "border-b border-on-plate/10 bg-plate/95"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="mx-auto flex w-full max-w-[88rem] items-center gap-6 px-5 py-4 sm:px-8">
          <Link href="/" className="flex shrink-0 items-center gap-3">
            <Image src={nav.brand.mark} alt="" width={32} height={32} className="size-8" priority />
            <span className="t-action text-on-plate">{nav.brand.name}</span>
          </Link>

          <nav aria-label="Primary" className="ml-auto hidden lg:block">
            <ul className="flex items-center gap-8">
              {nav.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="group relative inline-block text-on-plate/75 transition-colors duration-150 hover:text-on-plate">
                    <span className="t-action">{link.label}</span>
                    <span
                      aria-hidden
                      className="ease-signature absolute -bottom-1.5 left-0 h-px w-full origin-left scale-x-0 bg-plate-olive transition-transform duration-300 group-hover:scale-x-100"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <Link
            href={nav.cta.href}
            className="btn-field ml-auto hidden items-center gap-3 px-5 py-3 lg:ml-8 lg:inline-flex"
          >
            <span aria-hidden className="size-1.5 shrink-0 rounded-full bg-current" />
            <span className="t-action">{nav.cta.label}</span>
          </Link>

          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="ml-auto flex size-11 items-center justify-center lg:hidden"
          >
            <span aria-hidden className="relative block h-3.5 w-6">
              <span
                className={`ease-signature absolute left-0 block h-0.5 w-full bg-on-plate transition-all duration-300 ${
                  menuOpen ? "top-[6px] rotate-45" : "top-0"
                }`}
              />
              <span
                className={`ease-signature absolute left-0 block h-0.5 w-full bg-on-plate transition-all duration-300 ${
                  menuOpen ? "top-[6px] -rotate-45" : "top-3"
                }`}
              />
            </span>
          </button>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-40 flex flex-col justify-center bg-plate px-5 pt-24 pb-10 lg:hidden"
            initial={reduced ? { opacity: 0 } : { opacity: 0, clipPath: "inset(0% 0% 100% 0%)" }}
            animate={reduced ? { opacity: 1 } : { opacity: 1, clipPath: "inset(0% 0% 0% 0%)" }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, clipPath: "inset(0% 0% 100% 0%)" }}
            transition={{ duration: DUR.standard, ease: EASE_SIGNATURE }}
          >
            <nav aria-label="Primary">
              <ul className="flex flex-col gap-6">
                {nav.links.map((link, i) => (
                  <motion.li
                    key={link.href}
                    initial={reduced ? { opacity: 0 } : { opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: DUR.standard,
                      ease: EASE_SIGNATURE,
                      delay: 0.06 + i * 0.05,
                    }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className="t-subject block text-on-plate"
                    >
                      {link.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </nav>

            <Link
              href={nav.cta.href}
              onClick={() => setMenuOpen(false)}
              className="btn-field mt-12 inline-flex w-fit items-center gap-3 px-6 py-4"
            >
              <span aria-hidden className="size-1.5 shrink-0 rounded-full bg-current" />
              <span className="t-action">{nav.cta.label}</span>
              <span aria-hidden className="btn-tail h-px shrink-0 bg-current" />
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
