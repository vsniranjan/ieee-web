"use client";

import { animate, motion, useInView, useMotionValue, useReducedMotion, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { EASE_SIGNATURE } from "@/lib/motion";

/**
 * A levelling staff for the branch's own history.
 *
 * Ticks per year from the charter to now, a marker that travels the scale, and
 * a figure above it counting up in step. Everything is driven by one progress
 * MotionValue so the number and the marker can never disagree.
 *
 * Reads as instrumentation rather than as more terrain: strokes are 2-3x the
 * weight of the background contours, ticks are ranked major/minor, and the
 * travelled portion is olive against an unlit remainder. The contours are
 * hairlines — this has to look measured, not drawn.
 *
 * The marker moves by transform on a measured pixel width, not by animating
 * `left`, which would relayout every frame.
 */

const CHARTER = 1988;

export function Timeline() {
  const reduced = useReducedMotion();
  const wrap = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const inView = useInView(wrap, { once: true, amount: 0.6 });
  const [trackWidth, setTrackWidth] = useState(0);
  // Same reason as Counter: a MotionValue starts at 0, so the server HTML would
  // otherwise read "0 years, and counting" for anyone without JS.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // Derived, not hardcoded. CONTENT.md's "38 years" was baked in and went
  // stale every November.
  const now = new Date().getFullYear();
  const years = now - CHARTER;

  const progress = useMotionValue(reduced ? 1 : 0);
  const markerX = useTransform(() => progress.get() * trackWidth);
  const count = useTransform(() => String(Math.round(progress.get() * years)));

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => setTrackWidth(entry.contentRect.width));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (!inView || reduced) return;
    // Slow on purpose — it is a span of years, not a loading bar.
    const controls = animate(progress, 1, { duration: 3.2, ease: EASE_SIGNATURE });
    return () => controls.stop();
  }, [inView, reduced, progress]);

  const ticks = Array.from({ length: years + 1 }, (_, i) => i);

  return (
    <div ref={wrap}>
      <p className="flex items-baseline gap-3">
        {mounted ? (
          <motion.span
            aria-hidden
            className="text-[clamp(3rem,9vw,5.5rem)] leading-none font-semibold tracking-[-0.04em] tabular-nums text-on-plate"
          >
            {count}
          </motion.span>
        ) : (
          <span
            aria-hidden
            className="text-[clamp(3rem,9vw,5.5rem)] leading-none font-semibold tracking-[-0.04em] tabular-nums text-on-plate"
          >
            {years}
          </span>
        )}
        <span className="t-label">years, and counting</span>
        <span className="sr-only">{years} years, and counting</span>
      </p>

      <div ref={track} className="relative mt-8 h-16 w-full">
        {/* Baseline. Heavier than any contour so the two never read as kin. */}
        <span aria-hidden className="absolute inset-x-0 top-8 h-0.5 bg-on-plate/15" />
        <motion.span
          aria-hidden
          className="absolute inset-x-0 top-8 h-0.5 origin-left bg-plate-olive"
          style={{ scaleX: progress }}
        />

        {/* One tick per year. Every fifth is taller and heavier — a scale you
            could actually read a value off, not decoration. */}
        <div aria-hidden className="absolute inset-x-0 top-8 flex justify-between">
          {ticks.map((i) => {
            const major = i % 5 === 0;
            return (
              <span
                key={i}
                className={`block w-0.5 ${
                  major ? "h-5 bg-on-plate/45" : "h-2.5 bg-on-plate/20"
                }`}
              />
            );
          })}
        </div>

        {/* Travelling marker. */}
        <motion.div
          aria-hidden
          className="absolute top-0 left-0 flex flex-col items-center"
          style={{ x: markerX }}
        >
          <span className="-ml-px block size-2.5 rounded-full bg-plate-bronze" />
          <span className="-ml-px mt-1 block h-12 w-0.5 bg-plate-bronze" />
        </motion.div>

        <div aria-hidden className="absolute inset-x-0 top-16 mt-2 flex justify-between">
          <span className="t-label">{CHARTER}</span>
          <span className="t-label">{now}</span>
        </div>
      </div>
    </div>
  );
}
