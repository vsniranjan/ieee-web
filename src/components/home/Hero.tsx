"use client";

import Link from "next/link";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { useEffect, useRef } from "react";
import { HeroStrata } from "@/components/home/HeroStrata";
import { DUR, EASE_SIGNATURE } from "@/lib/motion";
import { hero } from "@/content/home";

/**
 * Hero: headline and one CTA over three drifting planes of topographic strata.
 *
 * Depth comes from pointer position; scroll is a smaller second axis so touch
 * devices, which have no pointer, still get the effect.
 *
 * Two details make the type belong to the terrain rather than float on it:
 *
 * 1. Contour lines are INTERRUPTED around the headline by a mask, exactly as a
 *    real topographic map breaks its contours around an elevation label. The
 *    mask sits on a static wrapper, not on the moving layer, so the gap stays
 *    anchored to the text while lines slide through it.
 * 2. Each headline row carries a contour leader line that resumes past the
 *    words and runs off the edge.
 *
 * Every layer is drawn into a container substantially larger than the section.
 * Sized to the section, a translating layer drags its own edge into view and
 * you see the line ends.
 */

/**
 * One display face, Anton — ultra-condensed, single weight, poster-cut.
 * Distinctive on its own letterforms, so the composition can stay plain:
 * two rows, one accent colour, nothing else.
 */
/**
 * Glyphs are stretched taller than Anton draws them via scaleY. That has to go
 * through Motion's transform rather than a CSS class — Motion writes transform
 * inline for the entrance, and inline beats the class, wiping the scale.
 *
 * A transform does not change layout height, so leading is raised to match;
 * otherwise the taller rows eat the gap and collide.
 */
const STRETCH = 1.34;

const ROW_BASE =
  "block origin-bottom-left font-[family-name:var(--font-anton)] tracking-[-0.005em]";

/** Phone: four short rows, so the type can run much larger at a narrow width. */
const ROW_MOBILE = `${ROW_BASE} text-[clamp(2.5rem,15.5vw,4.25rem)] leading-[1.3]`;

/** Wide: two long rows with room to breathe. */
const ROW_WIDE = `${ROW_BASE} text-[clamp(2.6rem,8.5vw,5.5rem)] leading-[1.52]`;

function HeadlineRow({
  row,
  index,
  className,
}: {
  row: { text: string; outline: boolean };
  index: number;
  className: string;
}) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 24, scaleY: STRETCH }}
      animate={{ opacity: 1, y: 0, scaleY: STRETCH }}
      transition={{
        duration: DUR.slow,
        ease: EASE_SIGNATURE,
        // Four rows on mobile still has to land inside the 500ms stagger budget.
        delay: 0.06 + index * 0.08,
      }}
      className={`${className} ${row.outline ? "word-outline" : "text-on-plate"}`}
    >
      {row.text}
    </motion.span>
  );
}

export function Hero() {
  const section = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  const px = useMotionValue(0);
  const py = useMotionValue(0);

  const spring = { stiffness: 90, damping: 26, mass: 0.7 };
  const sx = useSpring(px, spring);
  const sy = useSpring(py, spring);

  const { scrollYProgress } = useScroll({
    target: section,
    offset: ["start start", "end start"],
  });

  const farX = useTransform(sx, [-0.5, 0.5], [14, -14]);
  const farY = useTransform(sy, [-0.5, 0.5], [8, -8]);
  const midX = useTransform(sx, [-0.5, 0.5], [42, -42]);
  const midY = useTransform(sy, [-0.5, 0.5], [24, -24]);
  const nearX = useTransform(sx, [-0.5, 0.5], [90, -90]);
  const nearY = useTransform(sy, [-0.5, 0.5], [52, -52]);

  const farScroll = useTransform(scrollYProgress, [0, 1], [0, 34]);
  const midScroll = useTransform(scrollYProgress, [0, 1], [0, 72]);
  const nearScroll = useTransform(scrollYProgress, [0, 1], [0, 118]);
  const copyScroll = useTransform(scrollYProgress, [0, 1], [0, 26]);

  // Pointer and scroll are two axes of the same drift. Summed once here —
  // calling hooks inside JSX would break the rules of hooks.
  const farYAll = useTransform(() => farY.get() + farScroll.get());
  const midYAll = useTransform(() => midY.get() + midScroll.get());
  const nearYAll = useTransform(() => nearY.get() + nearScroll.get());

  useEffect(() => {
    if (reduced) return;
    const el = section.current;
    if (!el) return;

    function move(e: PointerEvent) {
      const r = el!.getBoundingClientRect();
      px.set((e.clientX - r.left) / r.width - 0.5);
      py.set((e.clientY - r.top) / r.height - 0.5);
    }
    function reset() {
      px.set(0);
      py.set(0);
    }

    el.addEventListener("pointermove", move, { passive: true });
    el.addEventListener("pointerleave", reset);
    return () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", reset);
    };
  }, [px, py, reduced]);

  const still = { x: 0, y: 0 };
  /** Overscan. Must exceed the largest travel on that axis (~208px). */
  const overscan = "absolute -top-[34%] -right-[34%] -bottom-[34%] -left-[34%]";

  return (
    <section
      ref={section}
      className="relative isolate flex min-h-[100svh] flex-col justify-end overflow-hidden bg-plate"
    >
      <div
        aria-hidden
        className="absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(120% 80% at 78% 18%, oklch(0.34 0.06 110) 0%, oklch(0.22 0.03 110) 42%, oklch(0.15 0.018 110) 100%)",
        }}
      />

      {/* The mask lives on the static wrapper so the gap stays with the text. */}
      <div
        aria-hidden
        className="contour-halo absolute inset-0 z-10 text-primary/22"
      >
        <motion.div
          className={overscan}
          style={reduced ? still : { x: farX, y: farYAll, willChange: "transform" }}
        >
          <HeroStrata
            count={22}
            from={90}
            to={760}
            amplitude={26}
            frequency={1.15}
            phase={0}
            strokeWidth={1}
            className="h-full w-full"
          />
        </motion.div>
      </div>

      <div
        aria-hidden
        className="contour-halo absolute inset-0 z-20 text-primary/40"
      >
        <motion.div
          className={overscan}
          style={reduced ? still : { x: midX, y: midYAll, willChange: "transform" }}
        >
          <HeroStrata
            count={11}
            from={260}
            to={880}
            amplitude={52}
            frequency={0.78}
            phase={2.1}
            strokeWidth={1.5}
            className="h-full w-full"
          />
        </motion.div>
      </div>

      <div className="relative z-30 w-full px-5 pb-14 sm:px-8 sm:pb-20 lg:pb-24">
        <motion.div style={reduced ? undefined : { y: copyScroll }}>
          {/* Visible rows are aria-hidden; the h1 carries the real sentence so
              assistive tech reads prose, not two shouted fragments. */}
          <h1 aria-label={hero.headline} className="select-none">
            <span aria-hidden className="block sm:hidden">
              {hero.rowsMobile.map((row, i) => (
                <HeadlineRow key={row.text} row={row} index={i} className={ROW_MOBILE} />
              ))}
            </span>
            <span aria-hidden className="hidden sm:block">
              {hero.rowsWide.map((row, i) => (
                <HeadlineRow key={row.text} row={row} index={i} className={ROW_WIDE} />
              ))}
            </span>
          </h1>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: DUR.standard, ease: EASE_SIGNATURE, delay: 0.42 }}
            className="mt-9 sm:mt-12"
          >
            <Link
              href={hero.cta.href}
              className="ease-signature inline-block rounded-full bg-on-plate px-8 py-3.5 text-[0.9375rem] font-semibold text-plate transition-transform duration-150 hover:-translate-y-0.5"
            >
              {hero.cta.label}
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Nearest plane passes over the type, unmasked and low-alpha, so the
          headline sits inside the terrain without losing contrast. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-40 text-on-plate/14">
        <motion.div
          className={overscan}
          style={reduced ? still : { x: nearX, y: nearYAll, willChange: "transform" }}
        >
          <HeroStrata
            count={5}
            from={430}
            to={960}
            amplitude={96}
            frequency={0.52}
            phase={4.4}
            strokeWidth={2}
            className="h-full w-full"
          />
        </motion.div>
      </div>
    </section>
  );
}
