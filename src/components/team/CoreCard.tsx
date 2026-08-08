"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { DUR, EASE_SIGNATURE } from "@/lib/motion";
import { formatPhone } from "@/content/team";
import type { Member } from "@/content/team";

/**
 * One office bearer, held in a plate.
 *
 * Photograph beside the name rather than above it, at thumbnail size: a
 * portrait stacked over a caption is the avatar tile every team page ships,
 * and at full card width it also gave five faces more scale than the page
 * heading. Sideways, the card is a record — which is what a roster entry is.
 *
 * The frame keeps its drafting hatch, so the photograph still develops upward
 * into an already-plotted rectangle rather than fading in from nothing.
 */

const pad = (n: number) => String(n).padStart(2, "0");

export function CoreCard({ member, index }: { member: Member; index: number }) {
  const reduced = useReducedMotion();
  const { photo } = member;

  // Capped so the fifth card is not still arriving after the first has been
  // read. Stagger budget stays under 0.5s.
  const delay = Math.min(index, 4) * 0.07;

  return (
    <motion.figure
      data-reveal
      className="plate-card flex items-start gap-4 p-4 sm:gap-5 sm:p-5"
      initial={reduced ? { opacity: 0 } : { opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: DUR.standard, ease: EASE_SIGNATURE, delay }}
    >
      <div className="portrait-frame w-20 shrink-0 sm:w-24">
        {photo ? (
          <motion.div
            data-reveal
            className="absolute inset-0"
            initial={reduced ? { opacity: 0 } : { clipPath: "inset(100% 0% 0% 0%)" }}
            whileInView={reduced ? { opacity: 1 } : { clipPath: "inset(0% 0% 0% 0%)" }}
            viewport={{ once: true, margin: "0px 0px -12% 0px" }}
            transition={{ duration: DUR.slow, ease: EASE_SIGNATURE, delay: delay + 0.1 }}
          >
            <Image
              src={photo.src}
              width={photo.width}
              height={photo.height}
              alt={`${member.name}, ${member.role}`}
              // Overshoots the 5–6rem slot on purpose: a 3x phone asking for a
              // 96px box lands on the 256w candidate and upscales it. Quoting
              // the slot at 2x pushes the browser onto 384w instead.
              sizes="(min-width: 640px) 12rem, 10rem"
              quality={90}
            />
          </motion.div>
        ) : null}
      </div>

      <figcaption className="min-w-0 flex-1">
        <span aria-hidden className="t-label block text-plate-olive">
          {pad(index + 1)}
        </span>
        <span className="t-label mt-1 block">{member.role}</span>
        <span className="t-item mt-1 block text-on-plate">{member.name}</span>

        {/* No rule above these, unlike the ExeCom plates: the photograph
            already divides this card, and a second horizontal line inside a
            caption column this narrow reads as clutter. */}
        {member.email ? (
          <a
            href={`mailto:${member.email}`}
            aria-label={`Email ${member.name}`}
            className="ease-signature t-label mt-2 block break-all text-on-plate/50 transition-colors duration-150 hover:text-plate-olive"
          >
            {member.email}
          </a>
        ) : null}

        {member.phone ? (
          <a
            href={`tel:${member.phone}`}
            aria-label={`Call ${member.name}`}
            className="ease-signature t-label mt-1 block text-on-plate/50 tabular-nums transition-colors duration-150 hover:text-plate-olive"
          >
            {formatPhone(member.phone)}
          </a>
        ) : null}
      </figcaption>
    </motion.figure>
  );
}
