"use client";

import { motion, useReducedMotion, useTime, useTransform } from "motion/react";
import { ticker } from "@/content/site";

/**
 * The repeating strip above the footer.
 *
 * Two copies of the string translate by up to -50%, so the moment the first
 * copy leaves the second is exactly where it started — a seamless loop with no
 * jump to hide.
 *
 * Driven off `useTime` rather than a keyframe animation: no iteration to
 * restart, and it cannot desync from itself. It also means reduced motion just
 * holds it still instead of inheriting the global `animation-duration: 0.01ms`
 * override, which would make it stutter rather than stop.
 */
const PERIOD_MS = 46000;

export function Ticker() {
  const reduced = useReducedMotion();
  const time = useTime();
  const x = useTransform(() => `${-((time.get() / PERIOD_MS) % 1) * 50}%`);

  return (
    <div
      aria-hidden
      className="overflow-hidden border-y border-on-plate/10 py-4 select-none"
    >
      <motion.div
        className="flex w-max whitespace-nowrap will-change-transform"
        style={reduced ? undefined : { x }}
      >
        {[0, 1].map((copy) => (
          <span key={copy} className="t-label !text-on-plate/45">
            {ticker}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
