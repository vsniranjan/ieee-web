"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { useEffect } from "react";
import { Strata } from "@/components/chrome/Strata";

/**
 * The page's terrain: one fixed backdrop behind every band.
 *
 * Being fixed is what makes the parallax read as a single landscape the page
 * scrolls across, rather than an effect that restarts in each section. It also
 * means one pointer listener for the whole document instead of one per band.
 *
 * Depth follows the pointer. Scroll adds a smaller second axis so touch
 * devices, which have no pointer at all, still get the effect — that matters
 * here because mobile is the primary target.
 */

/** Overscan. Must exceed the largest travel on either axis or, once a plane
 *  translates, its own edge slides into frame and you see the line ends. */
const OVERSCAN = "absolute -top-[34%] -right-[34%] -bottom-[34%] -left-[34%]";

export function PageTerrain() {
  const reduced = useReducedMotion();

  const px = useMotionValue(0);
  const py = useMotionValue(0);

  const spring = { stiffness: 90, damping: 26, mass: 0.7 };
  const sx = useSpring(px, spring);
  const sy = useSpring(py, spring);

  const { scrollY, scrollYProgress } = useScroll();

  /**
   * The terrain is strongest in the hero, where it IS the design, then eases
   * back to texture for the bands below. Long and shallow on purpose: a short,
   * steep fade reads as a seam, which is the thing we are trying not to have.
   */
  const fade = useTransform(scrollY, [0, 900], [1, 0.55], { clamp: true });

  const farX = useTransform(sx, [-0.5, 0.5], [14, -14]);
  const farY = useTransform(sy, [-0.5, 0.5], [8, -8]);
  const midX = useTransform(sx, [-0.5, 0.5], [42, -42]);
  const midY = useTransform(sy, [-0.5, 0.5], [24, -24]);
  const nearX = useTransform(sx, [-0.5, 0.5], [90, -90]);
  const nearY = useTransform(sy, [-0.5, 0.5], [52, -52]);

  // Modest drift across the whole document. The planes are fixed, so the page
  // scrolling past them already supplies most of the depth; this is seasoning.
  const farScroll = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const midScroll = useTransform(scrollYProgress, [0, 1], [0, 130]);
  const nearScroll = useTransform(scrollYProgress, [0, 1], [0, 210]);

  // Pointer and scroll are two axes of the same drift. Summed here — calling
  // hooks inside JSX would break the rules of hooks.
  const farYAll = useTransform(() => farY.get() + farScroll.get());
  const midYAll = useTransform(() => midY.get() + midScroll.get());
  const nearYAll = useTransform(() => nearY.get() + nearScroll.get());

  useEffect(() => {
    if (reduced) return;

    function move(e: PointerEvent) {
      px.set(e.clientX / window.innerWidth - 0.5);
      py.set(e.clientY / window.innerHeight - 0.5);
    }
    function reset() {
      px.set(0);
      py.set(0);
    }

    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerleave", reset);
    return () => {
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", reset);
    };
  }, [px, py, reduced]);

  const still = { x: 0, y: 0 };

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0" style={{ background: "var(--terrain-wash)" }} />

      <motion.div
        className="absolute inset-0"
        style={reduced ? { opacity: 0.62 } : { opacity: fade }}
      >
      <div className="absolute inset-0 text-primary/16">
        <motion.div
          className={OVERSCAN}
          style={reduced ? still : { x: farX, y: farYAll, willChange: "transform" }}
        >
          <Strata
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

      <div className="absolute inset-0 text-primary/26">
        <motion.div
          className={OVERSCAN}
          style={reduced ? still : { x: midX, y: midYAll, willChange: "transform" }}
        >
          <Strata
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

      <div className="absolute inset-0 text-on-plate/9">
        <motion.div
          className={OVERSCAN}
          style={reduced ? still : { x: nearX, y: nearYAll, willChange: "transform" }}
        >
          <Strata
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
      </motion.div>
    </div>
  );
}
