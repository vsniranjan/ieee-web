"use client";

import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  useVelocity,
} from "motion/react";
import { useEffect, useState } from "react";
import { DUR, EASE_SIGNATURE } from "@/lib/motion";

/**
 * Surveyor's reticle.
 *
 * `usePointerPosition` and `Cursor` are Motion+ only and not in motion@13, so
 * this is hand-rolled from useMotionValue / useSpring / useVelocity.
 *
 * Everything runs through MotionValues, so pointer movement never triggers a
 * React render. Per-pointermove setState is the classic jank source here.
 *
 * Desktop gets the reticle and its trail. Touch gets the same glyph as a tap
 * ripple, so the visual language carries across rather than being a
 * desktop-only feature on a mobile-first site.
 */
export function Reticle() {
  const reduced = useReducedMotion();
  const [fine, setFine] = useState<boolean | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    const sync = () => setFine(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  if (reduced || fine === null) return null;
  return fine ? <PointerReticle /> : <TapRipples />;
}

function PointerReticle() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const [visible, setVisible] = useState(false);

  // Three followers at loosening springs. A trail, not a particle emitter.
  const lead = { x: useSpring(x, { stiffness: 900, damping: 45, mass: 0.4 }), y: useSpring(y, { stiffness: 900, damping: 45, mass: 0.4 }) };
  const mid = { x: useSpring(x, { stiffness: 260, damping: 30, mass: 0.7 }), y: useSpring(y, { stiffness: 260, damping: 30, mass: 0.7 }) };
  const tail = { x: useSpring(x, { stiffness: 130, damping: 26, mass: 0.9 }), y: useSpring(y, { stiffness: 130, damping: 26, mass: 0.9 }) };

  // Velocity drives a slight swell, so fast movement reads as momentum.
  const vx = useVelocity(lead.x);
  const vy = useVelocity(lead.y);
  const speed = useTransform(() => Math.hypot(vx.get(), vy.get()));
  const swell = useTransform(speed, [0, 2600], [1, 1.5], { clamp: true });
  const tailFade = useTransform(speed, [0, 900], [0, 0.5], { clamp: true });

  useEffect(() => {
    function move(e: PointerEvent) {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
    }
    function leave() {
      setVisible(false);
    }
    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerleave", leave);
    return () => {
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", leave);
    };
  }, [x, y]);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[60] hidden md:block"
      style={{ opacity: visible ? 1 : 0, transition: "opacity 200ms" }}
    >
      <motion.div className="absolute top-0 left-0" style={{ x: tail.x, y: tail.y, opacity: tailFade }}>
        <span className="-mt-[13px] -ml-[13px] block size-[26px] rounded-full border border-primary/45" />
      </motion.div>

      <motion.div className="absolute top-0 left-0" style={{ x: mid.x, y: mid.y }}>
        <span className="-mt-[9px] -ml-[9px] block size-[18px] rounded-full border border-primary/60" />
      </motion.div>

      <motion.div className="absolute top-0 left-0" style={{ x: lead.x, y: lead.y, scale: swell }}>
        <span className="-mt-[3px] -ml-[3px] block size-[6px] rounded-full bg-primary" />
        <span className="absolute top-1/2 left-1/2 h-px w-4 -translate-x-1/2 -translate-y-1/2 bg-primary/50" />
        <span className="absolute top-1/2 left-1/2 h-4 w-px -translate-x-1/2 -translate-y-1/2 bg-primary/50" />
      </motion.div>
    </div>
  );
}

type Ripple = { id: number; x: number; y: number };

function TapRipples() {
  const [ripples, setRipples] = useState<Ripple[]>([]);

  useEffect(() => {
    let id = 0;
    function tap(e: PointerEvent) {
      const r = { id: id++, x: e.clientX, y: e.clientY };
      setRipples((prev) => [...prev, r]);
      window.setTimeout(() => {
        setRipples((prev) => prev.filter((p) => p.id !== r.id));
      }, 600);
    }
    window.addEventListener("pointerdown", tap, { passive: true });
    return () => window.removeEventListener("pointerdown", tap);
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[60]">
      <AnimatePresence>
        {ripples.map((r) => (
          <motion.span
            key={r.id}
            className="absolute block size-[18px] rounded-full border border-primary"
            style={{ left: r.x - 9, top: r.y - 9 }}
            initial={{ scale: 0.4, opacity: 0.7 }}
            animate={{ scale: 2.6, opacity: 0 }}
            transition={{ duration: DUR.slow, ease: EASE_SIGNATURE }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
