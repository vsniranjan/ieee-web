"use client";

import { motion, useMotionValueEvent, useReducedMotion, useScroll } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { DUR, EASE_SIGNATURE } from "@/lib/motion";
import { whatIeeeIs } from "@/content/home";

/**
 * One sentence that rewrites itself.
 *
 * `IEEE is` holds still while the clause beneath it swaps on scroll — the
 * animation carries the meaning rather than decorating it. 135 words of
 * boilerplate reduced to three lines, one on screen at a time.
 *
 * Progressive enhancement is doing real work here, not ceremony. The default
 * render — which is also the SSR output, the no-JS output and the
 * reduced-motion output — is three plain sentences stacked. Only after mount,
 * with motion allowed, does the section grow tall, pin, and start swapping.
 * Nothing is ever hidden behind an animation that might not run, and no clause
 * is invisible to a crawler. Phones pin too: sticky holds an element, it never
 * takes over the scroll.
 */
export function WhatIeeeIs() {
  const section = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const [enhanced, setEnhanced] = useState(false);
  const [active, setActive] = useState(0);

  // Pins on every size, phones included. This is not scroll-jacking: sticky
  // never takes control of the scroll, it only holds an element while the page
  // moves under it at exactly the speed the finger asks for.
  useEffect(() => {
    if (reduced) return;
    setEnhanced(true);
  }, [reduced]);

  const { scrollYProgress } = useScroll({
    target: section,
    offset: ["start start", "end end"],
  });

  // Three state changes across the whole section, not one per frame.
  useMotionValueEvent(scrollYProgress, "change", (p) => {
    if (!enhanced) return;
    const n = whatIeeeIs.clauses.length;
    const i = Math.min(n - 1, Math.max(0, Math.floor(p * n * 0.999)));
    setActive((cur) => (cur === i ? cur : i));
  });

  return (
    <section
      ref={section}
      // Height controls how long each clause holds. At 300vh each one sat for a
      // full screen of scrolling with nothing changing, which is what made the
      // section read as a separate world rather than part of the page.
      className={enhanced ? "relative h-[165vh] md:h-[210vh]" : "relative"}
    >
      <div
        className={
          enhanced
            ? // svh, not vh. On mobile `100vh` is the LARGE viewport height, so
              // with the browser chrome showing, a pinned 100vh box is taller
              // than the visible area and its content sits half off-screen.
              "sticky top-0 flex h-[100svh] items-center"
            : "flex items-center py-20 sm:py-28"
        }
      >
        <div className="mx-auto w-full max-w-[88rem] px-5 sm:px-8">
          {/* The stem is part of the sentence, at the sentence's own scale —
              not a tracked label sitting above it. DESIGN.md bans that shape
              outright, and it was also what made the type look marooned.
              Outlined against the solid clause: the site's signature pair. */}
          <p className="t-clause word-outline">{whatIeeeIs.stem}</p>

          {enhanced ? (
            <div className="clause-slot mt-[0.28em]">
              {/* Gap in em, which inside .clause-slot resolves against the
                  clause size, so it scales with the type rather than staying a
                  fixed 1.25rem that is cavernous on desktop and cramped on a
                  phone. */}
              {/* Invisible in-flow copy of the active clause. This is what
                  gives the box its height, so the box is always exactly tall
                  enough for every line of whatever is showing — and the ticks
                  below move with it instead of sitting at a fixed offset. */}
              <p aria-hidden className="t-clause invisible">
                {whatIeeeIs.clauses[active]}
              </p>

              {whatIeeeIs.clauses.map((clause, i) => (
                <span
                  key={clause}
                  // Mask extends past the box vertically so the stretched
                  // glyphs are not clipped; inset-y, not margins, so it does
                  // not disturb the box it is positioned against.
                  className="absolute inset-x-0 -inset-y-[0.3em] flex items-center overflow-hidden"
                >
                  <motion.span
                    className="t-clause block w-full text-on-plate"
                    initial={false}
                    // Past clauses have left upward; future ones wait below.
                    // Reversible by construction — scrolling back reverses it.
                    animate={{
                      y: i === active ? "0%" : i < active ? "-115%" : "115%",
                      opacity: i === active ? 1 : 0,
                    }}
                    transition={{ duration: DUR.slow, ease: EASE_SIGNATURE }}
                  >
                    {clause}
                  </motion.span>
                </span>
              ))}
            </div>
          ) : (
            <div className="mt-[calc(var(--clause-size)*0.28)] flex flex-col gap-[calc(var(--clause-size)*0.45)]">
              {whatIeeeIs.clauses.map((clause) => (
                <p key={clause} className="t-clause text-on-plate">
                  {clause}
                </p>
              ))}
            </div>
          )}

          {enhanced && (
            // `layout` so the ticks glide to their new position as the slot
            // grows or shrinks with the active clause, rather than jumping.
            <motion.div
              layout
              aria-hidden
              // Offset and tick width both derive from the clause size. Fixed
              // rem here left the ticks looking like leftovers beside type that
              // had doubled on a phone.
              className="mt-[calc(var(--clause-size)*0.5)] flex gap-[0.45rem]"
            >
              {whatIeeeIs.clauses.map((clause, i) => (
                <span
                  key={clause}
                  className={`ease-signature h-0.5 w-[calc(var(--clause-size)*0.62)] transition-colors duration-300 ${
                    i === active ? "bg-plate-bronze" : "bg-on-plate/20"
                  }`}
                />
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
