"use client";

import { animate, motion, useInView, useMotionValue, useReducedMotion, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { DUR, EASE_SIGNATURE } from "@/lib/motion";

/**
 * A figure that counts up once, on scroll-in.
 *
 * `AnimateNumber` is a Motion+ component and is not in the installed package,
 * so this is hand-rolled — but not with state. The formatted string is a
 * MotionValue passed straight in as children, which the installed types allow
 * (`children?: ReactNode | MotionValueNumber | MotionValueString`). The text
 * updates every frame with zero React renders.
 *
 * Anton has no tabular figures, so a proportional counter would jitter its own
 * width as digits change — very visible at display size. The settled string is
 * rendered underneath at zero opacity to reserve the exact final width, which
 * works regardless of what the face supports.
 */
export function Counter({
  to,
  suffix = "",
  className,
}: {
  to: number;
  suffix?: string;
  className?: string;
}) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  // Until this flips, the settled figure is what renders. A MotionValue starts
  // at 0, so without it the server HTML — and therefore anyone with JS off —
  // shows "0+" where the real number should be.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const count = useMotionValue(reduced ? to : 0);
  const text = useTransform(() => Math.round(count.get()).toLocaleString("en-US") + suffix);

  useEffect(() => {
    if (!inView || reduced) return;
    const controls = animate(count, to, {
      duration: DUR.slow * 2.6,
      ease: EASE_SIGNATURE,
    });
    return () => controls.stop();
  }, [inView, reduced, count, to]);

  const settled = to.toLocaleString("en-US") + suffix;

  return (
    <span ref={ref} className={`relative inline-block ${className ?? ""}`}>
      {/* Reserves the final width. aria-hidden so it is not read twice. */}
      <span aria-hidden className="invisible">
        {settled}
      </span>
      {mounted ? (
        <motion.span aria-hidden className="absolute inset-0">
          {text}
        </motion.span>
      ) : (
        <span aria-hidden className="absolute inset-0">
          {settled}
        </span>
      )}
      {/* Assistive tech gets the figure, not a stream of intermediate values. */}
      <span className="sr-only">{settled}</span>
    </span>
  );
}
