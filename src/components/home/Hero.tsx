"use client";

import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { MaskedLine } from "@/components/motion/MaskedLine";
import { DUR, EASE_SIGNATURE } from "@/lib/motion";
import { hero } from "@/content/home";

/**
 * Hero: headline and one CTA.
 *
 * The terrain behind it belongs to the page, not to this section — see
 * PageTerrain. All this owns is the type and its entrance.
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
const ROW_MOBILE = `${ROW_BASE} text-[clamp(2.9rem,17vw,5rem)] leading-[1.52]`;

/** Wide: two long rows with room to breathe. */
const ROW_WIDE = `${ROW_BASE} text-[clamp(3rem,10vw,7rem)] leading-[1.74]`;

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
    <MaskedLine
      on="load"
      scaleY={STRETCH}
      // Four rows on mobile still has to land inside the 500ms stagger budget.
      delay={0.06 + index * 0.08}
      className={`${className} ${row.outline ? "word-outline" : "text-on-plate"}`}
    >
      {row.text}
    </MaskedLine>
  );
}

export function Hero() {
  const section = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: section,
    offset: ["start start", "end start"],
  });
  const copyDrift = useTransform(scrollYProgress, [0, 1], [0, 26]);

  return (
    <section
      ref={section}
      className="relative flex min-h-[100svh] flex-col justify-center"
    >
      {/* No background of its own, and no scrim. Anything painted inside this
          box stops at the box, which is exactly what produced a hard cut where
          the hero met the band below. The page is one continuous terrain.

          Vertically centred and inset from the left edge on wide screens, so
          the block sits in the frame rather than along its bottom rail. */}
      <div className="relative w-full px-5 py-16 sm:px-8 sm:py-20 lg:pl-[9vw]">
        <motion.div style={reduced ? undefined : { y: copyDrift }}>
          {/* Visible rows are aria-hidden; the h1 carries the real sentence so
              assistive tech reads prose, not shouted fragments. */}
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
              className="btn-field inline-flex items-center gap-3 px-6 py-4 sm:gap-4 sm:px-7"
            >
              <span aria-hidden className="size-1.5 shrink-0 rounded-full bg-current" />
              <span className="t-action">{hero.cta.label}</span>
              <span aria-hidden className="btn-tail h-px shrink-0 bg-current" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
