"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { DUR, EASE_SIGNATURE } from "@/lib/motion";

type Props = {
  children: ReactNode;
  /** Seconds. Keep total stagger across a group under 0.5s. */
  delay?: number;
  className?: string;
  as?: "div" | "section" | "li" | "p";
};

/**
 * Scroll-in reveal. Fires once.
 *
 * Reduced motion collapses this to a crossfade rather than removing it —
 * "reduce" means less motion, not no feedback.
 *
 * The `data-reveal` hook lets the <noscript> rule in layout.tsx force these
 * visible, so a JS failure never ships a blank page.
 */
export function Reveal({ children, delay = 0, className, as = "div" }: Props) {
  const reduced = useReducedMotion();
  const Tag = motion[as];

  return (
    <Tag
      data-reveal
      className={className}
      initial={reduced ? { opacity: 0 } : { opacity: 0, y: 16 }}
      whileInView={reduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: DUR.standard, ease: EASE_SIGNATURE, delay }}
    >
      {children}
    </Tag>
  );
}
