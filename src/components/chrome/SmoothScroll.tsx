"use client";

import { ReactLenis } from "lenis/react";
import { useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

/**
 * Inertial scrolling — the page eases toward where you sent it rather than
 * snapping there.
 *
 * Two deliberate limits:
 *
 * `syncTouch` stays off, so touch devices keep native momentum. iOS already
 * has excellent physics and intercepting them makes a phone feel broken, not
 * smooth. Mobile is the primary target here, so it gets the native behaviour.
 *
 * Reduced motion bypasses Lenis entirely. Smoothed scrolling is motion the
 * user did not ask for and is a common trigger for motion sensitivity.
 *
 * Lenis 1.x drives the real window scroll rather than transforming a wrapper,
 * so `window.scrollY` stays truthful and Motion's `useScroll` — which the
 * terrain parallax depends on — keeps working untouched.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion();

  if (reduced) return <>{children}</>;

  return (
    <ReactLenis
      root
      options={{
        // Perceptual weight. Higher lerp = tighter; this is noticeably eased
        // without drifting into the sluggishness that makes people complain.
        lerp: 0.11,
        wheelMultiplier: 1,
        smoothWheel: true,
        syncTouch: false,
        overscroll: false,
      }}
    >
      {children}
    </ReactLenis>
  );
}
