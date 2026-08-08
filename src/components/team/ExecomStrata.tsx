"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { DUR, EASE_SIGNATURE } from "@/lib/motion";
import { execom, formatPhone } from "@/content/team";
import type { ExecomGroup } from "@/content/team";

/**
 * Thirty-one committee members in seventeen bands, stacked like contour
 * strata — hairline-ruled rows, no box around the band itself. A card holding
 * cards is always wrong, and these are rows.
 *
 * Bands open INDEPENDENTLY, unlike the field-work rows on the home page. With
 * three tiles, one-at-a-time keeps the band compact; with seventeen, it makes
 * the roster impossible to read across, because comparing two societies would
 * mean closing one to see the other.
 *
 * The panels use the shared `.disclosure` rule, which only collapses under
 * `.js`. A JavaScript failure therefore ships all seventeen bands open and
 * every one of the 31 names readable — which is the whole point of a roster.
 *
 * Portraits sit inside the closed bands, so sixteen of the seventeen never
 * request an image until someone opens them. `next/image` is lazy by default
 * and the collapsed panel has no layout box, which is what keeps a roster of
 * 31 faces off the initial load.
 */

function Band({ group, index }: { group: ExecomGroup; index: number }) {
  const reduced = useReducedMotion();
  const [open, setOpen] = useState(group.defaultOpen ?? false);
  const panelId = `${group.id}-panel`;

  const plateIn = (i: number) =>
    reduced
      ? {}
      : {
          initial: false as const,
          animate: open ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 },
          transition: {
            duration: DUR.standard,
            ease: EASE_SIGNATURE,
            delay: open ? 0.06 + i * 0.05 : 0,
          },
        };

  return (
    // Capped so seventeen rows do not stagger for two seconds. Everything past
    // the sixth arrives on the same beat.
    <Reveal as="li" delay={Math.min(index, 6) * 0.05} className="border-t border-on-plate/12">
      <h3>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls={panelId}
          className="group flex w-full items-center gap-4 py-5 text-left sm:gap-6 sm:py-6"
        >
          <span className="ease-signature t-subject min-w-0 flex-1 text-on-plate transition-colors duration-150 group-hover:text-plate-olive">
            {group.title}
          </span>

          <span className="t-label shrink-0 tabular-nums">{group.members.length}</span>

          <span
            aria-hidden
            className={`ease-signature shrink-0 text-plate-olive transition-transform duration-300 ${
              open ? "rotate-45" : ""
            }`}
          >
            <svg
              viewBox="0 0 24 24"
              className="size-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
            >
              <path d="M12 5v14M5 12h14" strokeLinecap="round" />
            </svg>
          </span>
        </button>
      </h3>

      <div id={panelId} data-open={open} className="disclosure">
        <div>
          <ul className="grid gap-3 pb-6 sm:grid-cols-2 sm:gap-4 sm:pb-8 lg:grid-cols-3">
            {group.members.map((member, i) => (
              <motion.li
                key={member.name}
                data-reveal
                className="plate-card flex flex-col p-4 sm:p-5"
                {...plateIn(i)}
              >
                {/* Portrait beside the name, at the same reading order as the
                    core cards but a size down — these run three to a row and a
                    core-sized thumbnail would turn the band into a face grid.

                    The frame is drawn whether or not a photograph exists for
                    it. Seven of the 31 have not sent one, and dropping the
                    frame on those would hang their text off a different left
                    edge from the plate beside it; the empty hatch reads as a
                    plate reserved, which is what it is. */}
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="portrait-frame w-16 shrink-0 sm:w-20">
                    {member.photo ? (
                      <Image
                        src={member.photo.src}
                        width={member.photo.width}
                        height={member.photo.height}
                        alt={`${member.name}, ${member.role}`}
                        // Quoted at 2x the 4–5rem slot, as on the core cards, so
                        // a dense screen lands on 256w instead of upscaling the
                        // 128w candidate.
                        sizes="(min-width: 640px) 10rem, 8rem"
                        quality={90}
                      />
                    ) : null}
                  </div>

                  <div className="min-w-0 flex-1">
                    {/* Plotted marker, as on the field rows and the poster indices. */}
                    <span aria-hidden className="block size-1.5 rounded-full bg-plate-olive" />
                    <span className="t-label mt-3 block">{member.role}</span>
                    <span className="t-item mt-1 block text-on-plate">{member.name}</span>
                    {member.klass ? (
                      <span className="t-label mt-2 block text-on-plate/45">{member.klass}</span>
                    ) : null}
                  </div>
                </div>

                {/* Ruled off from the identity above it, so the card reads as a
                    record with a footer rather than five stacked labels. The
                    rule is pushed down by `mt-auto`: grid items stretch to the
                    tallest card in the row, and without it a two-line role
                    would leave its neighbour's contact block floating. */}
                {member.email || member.phone ? (
                  <span className="mt-auto block border-t border-on-plate/12 pt-3">
                    {member.email ? (
                      <a
                        href={`mailto:${member.email}`}
                        aria-label={`Email ${member.name}`}
                        className="ease-signature t-label block break-all text-on-plate/50 transition-colors duration-150 hover:text-plate-olive"
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
                  </span>
                ) : null}
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </Reveal>
  );
}

export function ExecomStrata() {
  return (
    <ul className="mt-10 border-b border-on-plate/12 sm:mt-14">
      {execom.map((group, i) => (
        <Band key={group.id} group={group} index={i} />
      ))}
    </ul>
  );
}
