"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import type { ReactNode, RefObject } from "react";

type Props = {
  children: ReactNode;
  /**
   * Pixels of travel across the whole scroll range. Positive drifts down
   * (slower than the page), negative drifts up.
   */
  distance: number;
  /** Element whose scroll progress drives this. Usually the band wrapper. */
  track: RefObject<HTMLElement | null>;
  className?: string;
};

/**
 * One parallax layer. Transform only — never animate layout properties.
 *
 * MotionConfig's reducedMotion="user" does not reach scroll-linked transforms,
 * so this branches on useReducedMotion explicitly and holds still.
 */
export function Parallax({ children, distance, track, className }: Props) {
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: track,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, distance]);

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div className={className} style={{ y, willChange: "transform" }}>
      {children}
    </motion.div>
  );
}
