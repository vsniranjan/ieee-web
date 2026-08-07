"use client";

import { motion, useReducedMotion } from "motion/react";
import { DUR, EASE_SIGNATURE } from "@/lib/motion";
import type { FieldProject } from "@/content/home";

/**
 * Survey diagrams — one per field project, in the same drawn language as the
 * terrain. These replace photography: there are no pictures of the actual work,
 * and stock photos of somebody else's solar install would imply they document
 * this branch's, which they would not.
 *
 * Each stroke draws itself in with pathLength. All geometry is written out
 * literally rather than generated, so SSR and the client cannot disagree.
 */

const VB = { w: 400, h: 300 };

/** One stroke, drawn on scroll-in. Reduced motion renders it already complete. */
function Stroke({
  d,
  index,
  dash,
  width = 1.5,
  className,
}: {
  d: string;
  index: number;
  dash?: string;
  width?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();

  return (
    <motion.path
      d={d}
      fill="none"
      stroke="currentColor"
      strokeWidth={width}
      strokeLinecap="round"
      strokeDasharray={dash}
      vectorEffect="non-scaling-stroke"
      className={className}
      initial={reduced ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
      whileInView={{ pathLength: 1, opacity: 1 }}
      viewport={{ once: true, margin: "0px 0px -15% 0px" }}
      transition={{
        duration: reduced ? 0 : DUR.slow,
        ease: EASE_SIGNATURE,
        // Stays inside the 500ms stagger budget at six strokes.
        delay: reduced ? 0 : index * 0.07,
      }}
    />
  );
}

/** The ground line every figure is built on, so the three read as a set. */
const RIDGE =
  "M0 232 C 58 214, 96 246, 150 228 S 244 196, 300 216 S 366 240, 400 224";

function Solar() {
  // Rays fanning from a point above the ridge, plus the two installed systems.
  const rays = [-58, -34, -12, 12, 34, 58].map((deg) => {
    const rad = ((deg - 90) * Math.PI) / 180;
    const cx = 200;
    const cy = 104;
    return `M${cx + Math.cos(rad) * 30} ${cy + Math.sin(rad) * 30} L${cx + Math.cos(rad) * 66} ${cy + Math.sin(rad) * 66}`;
  });

  return (
    <>
      <Stroke d={RIDGE} index={0} width={2} className="text-plate-olive" />
      <Stroke
        d="M200 76 m-30 0 a30 30 0 1 0 60 0 a30 30 0 1 0 -60 0"
        index={1}
        width={2}
        className="text-plate-bronze"
      />
      {rays.map((d, i) => (
        <Stroke key={d} d={d} index={2 + i * 0.35} className="text-plate-bronze" />
      ))}
      <Stroke d="M132 232 l0 -26 l30 -12 l0 26 z" index={4} width={1.75} className="text-on-plate/70" />
      <Stroke d="M258 219 l0 -26 l30 -12 l0 26 z" index={4.4} width={1.75} className="text-on-plate/70" />
    </>
  );
}

function Link() {
  // Two nodes joined over the ridge, signal spreading from the school end.
  return (
    <>
      <Stroke d={RIDGE} index={0} width={2} className="text-plate-olive" />
      <Stroke d="M96 214 C 150 96, 250 96, 304 208" index={1} width={2} className="text-plate-bronze" />
      <Stroke
        d="M96 214 m-9 0 a9 9 0 1 0 18 0 a9 9 0 1 0 -18 0"
        index={2}
        width={2}
        className="text-on-plate"
      />
      <Stroke
        d="M304 208 m-9 0 a9 9 0 1 0 18 0 a9 9 0 1 0 -18 0"
        index={2.4}
        width={2}
        className="text-on-plate"
      />
      {[26, 44, 62].map((r, i) => (
        <Stroke
          key={r}
          d={`M304 208 m-${r} 0 a${r} ${r} 0 0 1 ${r * 2} 0`}
          index={3 + i * 0.4}
          className="text-plate-bronze/70"
        />
      ))}
      <Stroke d="M286 250 l36 0 l-18 -22 z" index={4.6} width={1.75} className="text-on-plate/70" />
    </>
  );
}

function Watch() {
  // A movement track crossing a threshold ring; alert arcs leave the crossing.
  return (
    <>
      <Stroke d={RIDGE} index={0} width={2} className="text-plate-olive" />
      <Stroke
        d="M20 268 C 88 250, 118 194, 176 178 S 268 168, 318 132"
        index={1}
        width={2}
        dash="9 11"
        className="text-on-plate/75"
      />
      <Stroke
        d="M176 178 m-46 0 a46 46 0 1 0 92 0 a46 46 0 1 0 -92 0"
        index={2}
        width={2}
        className="text-plate-bronze"
      />
      <Stroke
        d="M176 178 m-7 0 a7 7 0 1 0 14 0 a7 7 0 1 0 -14 0"
        index={2.6}
        width={2}
        className="text-plate-bronze"
      />
      {[64, 84, 104].map((r, i) => (
        <Stroke
          key={r}
          d={`M176 178 m-${r} 0 a${r} ${r} 0 0 1 ${r * 2} 0`}
          index={3 + i * 0.4}
          className="text-plate-bronze/60"
        />
      ))}
    </>
  );
}

const FIGURES = { solar: Solar, link: Link, watch: Watch } as const;

export function FieldDiagram({ figure }: { figure: FieldProject["figure"] }) {
  const Figure = FIGURES[figure];

  return (
    <svg
      viewBox={`0 0 ${VB.w} ${VB.h}`}
      aria-hidden
      focusable="false"
      className="h-auto w-full"
    >
      <Figure />
    </svg>
  );
}
