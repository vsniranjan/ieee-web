import type { Transition, Variants } from "motion/react";

/**
 * The page's motion constants. Every component references these.
 * Ad-hoc durations scattered across components are what make a site feel loose.
 *
 * Personality: Premium. Decelerate, zero overshoot. No bounce, no elastic.
 */

/** Exponential decelerate. Signature curve for ~80% of animation here. */
export const EASE_SIGNATURE = [0.16, 1, 0.3, 1] as const;

export const DUR = {
  quick: 0.16,
  standard: 0.4,
  slow: 0.64,
} as const;

export const enter: Transition = {
  duration: DUR.standard,
  ease: EASE_SIGNATURE,
};

/** Exits run faster than entrances — users care about what appears. */
export const exit: Transition = {
  duration: DUR.quick * 1.5,
  ease: [0.3, 0, 1, 1],
};

/** 16px rise plus fade. The one entrance pattern. */
export const riseIn: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: enter },
};

/**
 * Stagger budget: 50-100ms per child, total under 500ms.
 * Past that the last item arrives after the user has already read the first.
 */
export const stagger = (staggerChildren = 0.07, delayChildren = 0): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren, delayChildren } },
});

/** Spring for pointer-following chrome. Overdamped — settles, never wobbles. */
export const followSpring = {
  stiffness: 380,
  damping: 34,
  mass: 0.6,
} as const;
