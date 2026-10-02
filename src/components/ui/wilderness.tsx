"use client";

import Image from "next/image";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface ParallaxHeroProps {
  src?: string;
  className?: string;
}

/**
 * One source photo split into two softly masked depth planes: the room and the
 * complete foreground group. The original pixels stay untouched while pointer
 * or scroll drift separates the planes; reduced motion restores the exact still.
 */
export function ParallaxHero({
  src = "/hero/ieee-team.webp",
  className,
}: ParallaxHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion() ?? false;
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const spring = { stiffness: 90, damping: 26, mass: 0.7 };
  const pointerX = useSpring(rawX, spring);
  const pointerY = useSpring(rawY, spring);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const backgroundX = useTransform(pointerX, [-0.5, 0.5], [-6, 6]);
  const backgroundY = useTransform(
    () => pointerY.get() * 4 + scrollYProgress.get() * 12,
  );
  const groupX = useTransform(pointerX, [-0.5, 0.5], [-16, 16]);
  const groupY = useTransform(
    () => pointerY.get() * 9 + scrollYProgress.get() * 26,
  );

  useEffect(() => {
    function reset() {
      rawX.set(0);
      rawY.set(0);
    }

    if (reduced) {
      reset();
      return;
    }

    function move(event: globalThis.PointerEvent) {
      if (event.pointerType === "touch") return;
      rawX.set(event.clientX / window.innerWidth - 0.5);
      rawY.set(event.clientY / window.innerHeight - 0.5);
    }

    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerleave", reset);

    return () => {
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", reset);
    };
  }, [rawX, rawY, reduced]);

  return (
    <div
      ref={containerRef}
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
    >
      <div className="absolute inset-0 [mask-image:linear-gradient(to_bottom,black_0%,black_84%,transparent_100%)]">
        <motion.div
          data-parallax-image="background"
          className="absolute -inset-[6%]"
          style={
            reduced
              ? undefined
              : { x: backgroundX, y: backgroundY, willChange: "transform" }
          }
        >
          <Image
            src={src}
            alt=""
            fill
            quality={90}
            loading="eager"
            sizes="100vw"
            className="object-cover object-center"
          />
        </motion.div>

        <motion.div
          data-parallax-image="group"
          className="absolute -inset-[6%] [mask-image:linear-gradient(to_bottom,transparent_0%,transparent_43%,black_56%,black_100%)]"
          style={
            reduced
              ? undefined
              : { x: groupX, y: groupY, willChange: "transform" }
          }
        >
          <Image
            src={src}
            alt=""
            fill
            quality={90}
            sizes="100vw"
            className="object-cover object-center"
          />
        </motion.div>

        <div className="absolute inset-0 bg-plate/45" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, color-mix(in oklch, var(--plate) 88%, transparent) 0%, color-mix(in oklch, var(--plate) 58%, transparent) 52%, color-mix(in oklch, var(--plate) 20%, transparent) 100%)",
          }}
        />
      </div>
    </div>
  );
}

export function ParallaxHeroDemo() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-plate">
      <ParallaxHero />
    </div>
  );
}
