"use client";

import { motion, useReducedMotion } from "motion/react";
import { DUR, EASE_SIGNATURE } from "@/lib/motion";
import { events } from "@/content/events";
import type { EventEntry } from "@/content/events";

/**
 * The eight flagships as a numbered dossier.
 *
 * A fourth device on purpose. Home uses expanding pills for three, `/team`
 * collapsible strata for seventeen, `/about` an open two-column register for
 * ten — a fifth page reusing one of those starts to read as a template. Eight
 * substantial paragraphs also need room a two-column register cannot give.
 *
 * Odd entries anchor left, even entries right, and each enters from the side
 * it sits on, so the alternation is legible as movement and not only as
 * layout. The rule draws out from the number in the same direction.
 *
 * ALTERNATION IS `sm+` ONLY. At 390px there is no room for a right-anchored
 * variant, and ragged-left body copy is hard to read, so every entry anchors
 * left on a phone.
 */

const pad = (n: number) => String(n).padStart(2, "0");

function Entry({ event, index }: { event: EventEntry; index: number }) {
  const reduced = useReducedMotion();
  // 1-based: entry 01 is odd and anchors left.
  const right = index % 2 === 1;

  // Capped so the eighth entry is not still arriving after the first has been
  // read. Stagger budget stays under 0.5s.
  const delay = Math.min(index, 6) * 0.05;

  const hidden = reduced ? { opacity: 0 } : { opacity: 0, x: right ? 24 : -24 };
  const shown = reduced ? { opacity: 1 } : { opacity: 1, x: 0 };

  return (
    <motion.li
      data-reveal
      className="py-10 sm:py-14"
      initial={hidden}
      whileInView={shown}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: DUR.slow, ease: EASE_SIGNATURE, delay }}
    >
      {/* Number and rule. The rule draws away from the number, so it reads as
          being pulled out of it rather than fading in as a whole. */}
      <div className={`flex items-center gap-5 ${right ? "sm:flex-row-reverse" : ""}`}>
        <span aria-hidden className="t-label shrink-0 text-plate-olive">
          {pad(index + 1)}
        </span>
        <motion.span
          aria-hidden
          data-reveal
          // On a phone the number is always on the left, so the rule always
          // draws rightward. Only at `sm+`, where the row reverses, does a
          // right-anchored entry draw the other way.
          className={`h-px flex-1 bg-on-plate/15 origin-left ${right ? "sm:origin-right" : ""}`}
          initial={reduced ? { opacity: 0 } : { scaleX: 0 }}
          whileInView={reduced ? { opacity: 1 } : { scaleX: 1 }}
          viewport={{ once: true, margin: "0px 0px -12% 0px" }}
          transition={{ duration: DUR.slow, ease: EASE_SIGNATURE, delay: delay + 0.08 }}
        />
      </div>

      {/* Tag and name take the alignment; the paragraph does not. Right-aligned
          prose leaves a ragged left edge, and over five lines of 68ch that is a
          real cost to pay for a layout effect. Pushing the measure to the right
          edge carries the alternation just as well and stays readable. */}
      <p className={`t-label mt-6 ${right ? "sm:text-right" : ""}`}>{event.tag}</p>
      <h3 className={`t-subject mt-1 text-on-plate ${right ? "sm:text-right" : ""}`}>
        {event.name}
      </h3>
      <p className={`t-body mt-4 ${right ? "sm:ml-auto" : ""}`}>{event.body}</p>
    </motion.li>
  );
}

export function EventDossier() {
  return (
    <ul className="mt-8 sm:mt-12">
      {events.map((event, i) => (
        <Entry key={event.id} event={event} index={i} />
      ))}
    </ul>
  );
}
