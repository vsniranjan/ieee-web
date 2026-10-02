"use client";

import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { MaskedLine } from "@/components/motion/MaskedLine";
import { ParallaxHero } from "@/components/ui/wilderness";
import { DUR, EASE_SIGNATURE } from "@/lib/motion";
import { hero } from "@/content/home";

/**
 * Hero: headline, one CTA, and one photo split into two soft depth planes.
 *
 * The continuous terrain still belongs to the page — see PageTerrain. This
 * section feathers the branch group photo back into that shared ground.
 */

/**
 * Font size lives on the WRAPPER, not on the row.
 *
 * MaskedLine's clipping mask pads itself in `em` to give the stretched glyphs
 * and the outline stroke room above the line box. `em` there resolves against
 * whatever the mask inherits — so with the size set on the row (the mask's
 * child) the mask was computing its padding against 16px and reserving ~6px
 * instead of ~35px. That is why the outline row kept clipping no matter how
 * much the padding went up.
 */
const SIZE_MOBILE = "text-[clamp(2.5rem,12vw,4rem)]";
const SIZE_WIDE = "text-[clamp(3rem,6.5vw,5.5rem)]";

const ROW_BASE = "block font-semibold tracking-[-0.035em]";

/** Phone: four short rows, so the type can run much larger at a narrow width. */
const ROW_MOBILE = `${ROW_BASE} leading-[1.15]`;

/** Wide: two long rows with room to breathe. */
const ROW_WIDE = `${ROW_BASE} leading-[1.12]`;

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
      <ParallaxHero />

      {/* No background or scrim on the copy wrapper. The image plane above is
          masked to transparency, so the page remains one continuous terrain
          instead of ending at a section-coloured rectangle.

          Vertically centred and inset from the left edge on wide screens, so
          the block sits in the frame rather than along its bottom rail. */}
      <div className="relative z-10 w-full px-5 py-16 sm:px-8 sm:py-20 lg:pl-[9vw]">
        <motion.div style={reduced ? undefined : { y: copyDrift }}>
          {/* Visible rows are aria-hidden; the h1 carries the real sentence so
              assistive tech reads prose, not shouted fragments. */}
          <h1 aria-label={hero.headline} className="select-none">
            <span aria-hidden className={`block sm:hidden ${SIZE_MOBILE}`}>
              {hero.rowsMobile.map((row, i) => (
                <HeadlineRow key={row.text} row={row} index={i} className={ROW_MOBILE} />
              ))}
            </span>
            <span aria-hidden className={`hidden sm:block ${SIZE_WIDE}`}>
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
