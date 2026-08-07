"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import { useRef, useState, type ReactNode } from "react";
import { DUR, EASE_SIGNATURE } from "@/lib/motion";

type Props = {
  children: ReactNode;
  /** Above-the-fold sections fire on load; everything else on scroll-in. */
  on?: "load" | "view";
  delay?: number;
};

/**
 * Settles a whole section into place rather than letting it simply be there.
 *
 * Starts slightly oversized and eases down to true scale while fading in, so
 * the section arrives as one object. Its inner choreography then plays on top.
 *
 * The scale is small on purpose. Anything past a few percent stops reading as
 * arrival and starts reading as a zoom effect, and it magnifies the blur that
 * transformed text picks up mid-animation.
 *
 * Reduced motion drops the scale and crossfades — a whole page zooming is
 * exactly the kind of large-area movement that triggers motion sensitivity.
 */
export function SectionReveal({ children, on = "view", delay = 0 }: Props) {
  const reduced = useReducedMotion();
  const [settled, setSettled] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  // `amount` rather than a margin: fire once a real slice of the section is
  // visible, not the instant its top edge clips the viewport.
  const inView = useInView(ref, { once: true, amount: 0.15 });

  const hidden = reduced ? { opacity: 0 } : { opacity: 0, scale: 1.055 };
  const shown = reduced ? { opacity: 1 } : { opacity: 1, scale: 1 };

  return (
    <motion.div
      ref={ref}
      data-reveal
      initial={hidden}
      animate={on === "load" || inView ? shown : hidden}
      transition={{ duration: DUR.slow, ease: EASE_SIGNATURE, delay }}
      onAnimationComplete={() => setSettled(true)}
      // Dropped once settled. A permanent will-change on a section-sized
      // element holds a compositing layer for the whole page for the rest of
      // the session, which costs memory and buys nothing after the animation.
      style={settled ? undefined : { willChange: "transform, opacity" }}
    >
      {children}
    </motion.div>
  );
}
