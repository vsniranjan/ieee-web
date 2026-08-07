"use client";

import { motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { FieldIcon } from "@/components/home/FieldIcon";
import { MaskedLine } from "@/components/motion/MaskedLine";
import { DUR, EASE_SIGNATURE } from "@/lib/motion";
import { fieldWork } from "@/content/home";
import type { FieldProject } from "@/content/home";

/**
 * The field work band — the argument of the whole page.
 *
 * Three icon-led tiles. Clicking one expands that tile in place across the full
 * row; the other two stay as they are and move down. The thing you clicked is
 * the thing that opens, which is the entire point of a tile you can press.
 *
 * Icon-led rather than text-led: a big name inside a small container reads as
 * cramped, so the glyph carries the tile and the type stays proportionate.
 *
 * Full paragraphs live in the DOM at all times, collapsed by a CSS rule scoped
 * under `.js`. A JS failure leaves every one of them open and readable.
 */

/**
 * Entrance: the icon lands, the row wipes open rightward from it, the label
 * rises behind. A survey station being plotted, then labelled.
 *
 * The wipe is clip-path rather than scaleX — scaling would squash the icon and
 * the type as they travel. No `round` in the inset: the element's own
 * border-radius shapes it, so one set of values covers pill and panel alike.
 *
 * clip-path is cleared once the entrance finishes. Left in place it clips the
 * focus ring, which sits outside the border box at `outline-offset: 3px`.
 */
const TILE_IN = {
  hidden: { opacity: 0, clipPath: "inset(0% 100% 0% 0%)" },
  visible: {
    opacity: 1,
    clipPath: "inset(0% 0% 0% 0%)",
    transition: {
      duration: DUR.slow,
      ease: EASE_SIGNATURE,
      when: "beforeChildren",
      staggerChildren: 0.05,
    },
  },
} as const;

const ICON_IN = {
  hidden: { scale: 0.4, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { duration: DUR.standard, ease: EASE_SIGNATURE } },
} as const;

const LABEL_IN = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: DUR.standard, ease: EASE_SIGNATURE } },
} as const;

/** Reduced motion gets the same choreography flattened to a crossfade. */
const FADE_ONLY = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: DUR.standard } },
} as const;

function Tile({
  project,
  index,
  open,
  onToggle,
}: {
  project: FieldProject;
  index: number;
  open: boolean;
  onToggle: () => void;
}) {
  const reduced = useReducedMotion();
  const [entered, setEntered] = useState(false);
  const panelId = `${project.id}-panel`;

  const enter = (delay: number) =>
    reduced
      ? {}
      : {
          initial: false as const,
          animate: open ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 },
          transition: { duration: DUR.standard, ease: EASE_SIGNATURE, delay: open ? delay : 0 },
        };

  return (
    <motion.li
      className="pill"
      data-open={open}
      data-reveal
      variants={reduced ? FADE_ONLY : TILE_IN}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ delay: index * 0.09 }}
      onAnimationComplete={() => setEntered(true)}
      style={entered ? { clipPath: "none" } : undefined}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={panelId}
        className="flex w-full items-center gap-4 p-5 text-left sm:gap-5 sm:p-6"
      >
        <motion.span
          variants={reduced ? FADE_ONLY : ICON_IN}
          className={`ease-signature grid size-12 shrink-0 place-items-center rounded-full border transition-colors duration-200 sm:size-14 ${
            open
              ? "border-plate-bronze/60 text-plate-bronze"
              : "border-on-plate/15 text-plate-olive"
          }`}
        >
          <span className="size-7 sm:size-8">
            <FieldIcon figure={project.figure} />
          </span>
        </motion.span>

        <motion.span variants={reduced ? FADE_ONLY : LABEL_IN} className="min-w-0 flex-1">
          <span className="t-subject block text-on-plate">{project.name}</span>
          <span className="t-label block">{project.place}</span>
        </motion.span>

        <span
          aria-hidden
          className={`ease-signature shrink-0 text-plate-olive transition-transform duration-300 ${
            open ? "rotate-45" : ""
          }`}
        >
          <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.6">
            <path d="M12 5v14M5 12h14" strokeLinecap="round" />
          </svg>
        </span>
      </button>

      <div id={panelId} data-open={open} className="disclosure">
        <div>
          <div className="px-5 pb-6 sm:px-6 sm:pb-8">
            {/* `data-reveal` so the <noscript> reset reaches these. `enter`
                uses `initial={false}`, which makes Motion render the closed
                state server-side — without the hook, a JS failure ships both
                paragraphs at opacity 0 inside an open disclosure. */}
            <motion.p data-reveal className="t-lede max-w-2xl text-on-plate" {...enter(0.06)}>
              {project.lede}
            </motion.p>
            <motion.p data-reveal className="t-body mt-4" {...enter(0.12)}>
              {project.full}
            </motion.p>
          </div>
        </div>
      </div>
    </motion.li>
  );
}

export function FieldWork() {
  // One at a time. Keeps the band compact and the three reading as a set.
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <section
      className="relative"
      onKeyDown={(e) => {
        if (e.key === "Escape" && openId) setOpenId(null);
      }}
    >
      <div className="mx-auto w-full max-w-[88rem] px-5 pt-20 pb-10 sm:px-8 sm:pt-28 sm:pb-14">
        {/* Repeats the hero's solid-against-outline pairing, and its masked
            line rise. That pairing is the site's signature device. */}
        <h2 className="t-title text-on-plate">
          <MaskedLine className="block">{fieldWork.heading.lead}</MaskedLine>
          <MaskedLine className="word-outline block" delay={0.08}>
            {fieldWork.heading.tail}
          </MaskedLine>
        </h2>

        <ul className="mt-12 flex max-w-4xl flex-col gap-4 sm:mt-16 sm:gap-5">
          {fieldWork.projects.map((p, i) => (
            <Tile
              key={p.id}
              project={p}
              index={i}
              open={openId === p.id}
              onToggle={() => setOpenId((cur) => (cur === p.id ? null : p.id))}
            />
          ))}
        </ul>
      </div>
    </section>
  );
}
