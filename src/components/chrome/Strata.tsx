"use client";

/**
 * Procedural topographic strata — the hero's abstract backdrop.
 *
 * Drawn rather than generated as a raster on purpose. Layered parallax needs
 * real transparency between planes; AI images are opaque rectangles and stack
 * as boxes, not depth. This is a few KB, resolution-independent, and reads the
 * theme tokens so it inverts with the theme.
 *
 * Deterministic maths only — no Math.random, or SSR and client would disagree
 * and React would throw a hydration mismatch.
 */

type StrataProps = {
  /** Number of contour lines. */
  count: number;
  /** Vertical span of the band, in viewBox units. */
  from: number;
  to: number;
  /** Wave height. */
  amplitude: number;
  /** Waves across the width. */
  frequency: number;
  /** Offsets the whole band so layers never rhyme. */
  phase: number;
  strokeWidth: number;
  className?: string;
};

const W = 1200;
const H = 800;
const STEP = 24;

function contour(
  baseY: number,
  amplitude: number,
  frequency: number,
  phase: number,
): string {
  let d = "";
  for (let x = 0; x <= W; x += STEP) {
    const t = (x / W) * Math.PI * 2 * frequency + phase;
    // Two summed sines: one long swell, one shorter ripple. A single sine
    // reads as a graphic wave; two read as terrain.
    const y = baseY + Math.sin(t) * amplitude + Math.sin(t * 2.3 + 1.1) * amplitude * 0.28;
    d += `${x === 0 ? "M" : "L"}${x} ${y.toFixed(2)} `;
  }
  return d.trim();
}

export function Strata({
  count,
  from,
  to,
  amplitude,
  frequency,
  phase,
  strokeWidth,
  className,
}: StrataProps) {
  const gap = (to - from) / Math.max(count - 1, 1);

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="none"
      aria-hidden
      focusable="false"
      className={className}
    >
      {Array.from({ length: count }, (_, i) => (
        <path
          key={i}
          d={contour(from + i * gap, amplitude, frequency, phase + i * 0.38)}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
      ))}
    </svg>
  );
}
