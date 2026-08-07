"use client";

import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";

/**
 * reducedMotion="user" covers transform-driven animation site-wide.
 *
 * It does NOT reach scroll-linked transforms, autoplaying loops, or the
 * reticle — those branch on useReducedMotion individually.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
