"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { DUR, EASE_SIGNATURE } from "@/lib/motion";
import { counsellor } from "@/content/team";

/**
 * The counsellor, set apart above the five students she advises.
 *
 * Held in a `.panel` and laid out wide, where every office bearer below is an
 * unboxed frame in a grid — six identical tiles would read as six equivalent
 * people, and one of them is faculty. The distinction is carried by the
 * composition, not by a new type size: the scale in DESIGN.md is closed.
 */
export function CounsellorPlate() {
  const reduced = useReducedMotion();
  const { photo } = counsellor;

  return (
    <motion.div
      data-reveal
      className="panel flex items-center gap-5 p-5 sm:gap-8 sm:p-7"
      initial={reduced ? { opacity: 0 } : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: DUR.standard, ease: EASE_SIGNATURE }}
    >
      {/* Larger than an office bearer's thumbnail, but nowhere near double —
          the plate is set apart by being wide and alone on its row, not by
          giving one photograph twice the scale of the other five. */}
      <div className="portrait-frame w-28 shrink-0 sm:w-36">
        {photo ? (
          <Image
            src={photo.src}
            width={photo.width}
            height={photo.height}
            alt={`${counsellor.name}, ${counsellor.role}`}
            sizes="(min-width: 640px) 18rem, 14rem"
            quality={90}
            priority
          />
        ) : null}
      </div>

      <div>
        <span className="t-label block">{counsellor.role}</span>
        <span className="t-subject mt-2 block text-on-plate">{counsellor.name}</span>
        {/* Leader line out of the name, as on a plotted marker. Same device as
            the close section's links and the field button's tail. */}
        <span aria-hidden className="mt-5 block h-px w-14 bg-plate-bronze" />
      </div>
    </motion.div>
  );
}
