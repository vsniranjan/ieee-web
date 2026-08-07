"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import { useRef, type ReactNode } from "react";
import { DUR, EASE_SIGNATURE } from "@/lib/motion";

type Props = {
  children: ReactNode;
  /** Applied to the moving inner element, where the type styles belong. */
  className?: string;
  delay?: number;
  /** Hero rows fire on load; everything below fires when scrolled into view. */
  on?: "load" | "view";
  /** Extra transform to compose with the rise, e.g. the headline's scaleY. */
  scaleY?: number;
};

/**
 * A line of type that rises out from behind a clipping edge.
 *
 * The outer element is the mask and never moves; the inner one carries the
 * type and the transform. Splitting those two jobs is the whole trick — a
 * single element cannot both clip and travel.
 *
 * The observer watches the MASK, not the line. `whileInView` on the inner
 * element deadlocks: it starts translated fully outside the mask's
 * `overflow: hidden`, so its visible rectangle is empty, so IntersectionObserver
 * never reports it as intersecting, so it never animates in and stays hidden
 * forever. Observing the unclipped parent is what breaks that cycle.
 *
 * `splitText` is a Motion+ API and not in the installed package, so lines are
 * passed in already split rather than derived at runtime.
 *
 * Reduced motion drops to a crossfade in place: no travel, nothing clipped.
 */
export function MaskedLine({
  children,
  className,
  delay = 0,
  on = "view",
  scaleY = 1,
}: Props) {
  const reduced = useReducedMotion();
  const mask = useRef<HTMLSpanElement>(null);
  const inView = useInView(mask, { once: true, margin: "0px 0px -12% 0px" });

  const hidden = reduced ? { opacity: 0 } : { opacity: 0, y: "108%", scaleY };
  const shown = reduced ? { opacity: 1 } : { opacity: 1, y: "0%", scaleY };

  const show = on === "load" || inView;

  // The mask is inflated on three sides, with matching negative margins so
  // layout is untouched.
  //
  // Why it needs so much: scaleY is anchored bottom-left, so glyphs grow upward
  // well past the line box, and -webkit-text-stroke adds half its width outside
  // the glyph outline on top of that. Padding is deliberately generous rather
  // than computed — the exact overshoot depends on Anton's metrics times the
  // stretch times the stroke, and being a few hundredths short clips the caps.
  //
  // The bottom edge stays flush. The rise enters from below, so any padding
  // there would leave the line visible before it animates.
  return (
    <span
      ref={mask}
      className="-mx-[0.08em] -mt-[0.4em] block overflow-hidden px-[0.08em] pt-[0.4em]"
    >
      <motion.span
        data-reveal
        className={className}
        initial={hidden}
        animate={show ? shown : hidden}
        transition={{ duration: DUR.slow, ease: EASE_SIGNATURE, delay }}
      >
        {children}
      </motion.span>
    </span>
  );
}
