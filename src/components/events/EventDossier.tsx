"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState, type PointerEvent } from "react";
import { EventIcon } from "@/components/events/EventIcon";
import { DUR, EASE_SIGNATURE, exit } from "@/lib/motion";
import { events, eventsPage } from "@/content/events";
import type { EventEntry } from "@/content/events";

/**
 * The eight flagships as a filterable card grid.
 *
 * The flagship hackathon leads as a double-width card in the unfiltered view;
 * once a filter is applied every card is equal, since "featured" stops meaning
 * anything inside a subset.
 *
 * Cards are laid out with Motion's `layout`, so filtering slides the survivors
 * into their new cells instead of snapping. Every paragraph is in the server
 * HTML, so with JavaScript off the full list is simply there.
 */

type FilterId = (typeof eventsPage.filters)[number]["id"];

const pad = (n: number) => String(n).padStart(2, "0");

/** Pointer position as CSS vars, for the card's spotlight. No React render. */
function trackPointer(e: PointerEvent<HTMLElement>) {
  const el = e.currentTarget;
  const r = el.getBoundingClientRect();
  el.style.setProperty("--mx", `${e.clientX - r.left}px`);
  el.style.setProperty("--my", `${e.clientY - r.top}px`);
}

function Card({
  event,
  number,
  index,
  featured,
}: {
  event: EventEntry;
  number: number;
  index: number;
  featured: boolean;
}) {
  const reduced = useReducedMotion();
  const delay = Math.min(index, 6) * 0.05;

  return (
    <motion.li
      layout={!reduced}
      data-reveal
      onPointerMove={trackPointer}
      className={`event-card group ${featured ? "event-card--featured sm:col-span-2" : ""}`}
      initial={reduced ? { opacity: 0 } : { opacity: 0, y: 20 }}
      whileInView={reduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
      exit={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.96, transition: exit }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={{
        duration: DUR.slow,
        ease: EASE_SIGNATURE,
        delay,
        layout: { duration: DUR.standard, ease: EASE_SIGNATURE },
      }}
    >
      {featured && (
        <span
          aria-hidden
          className="pointer-events-none absolute -right-6 -bottom-10 size-64 text-plate-olive/[0.07] sm:size-80"
        >
          <EventIcon name={event.icon} />
        </span>
      )}

      <div className="relative flex h-full flex-col p-6 sm:p-7">
        <div className="flex items-start justify-between gap-4">
          <span className="ease-signature grid size-12 place-items-center rounded-2xl border border-on-plate/12 bg-plate/50 text-plate-olive transition-colors duration-300 group-hover:border-plate-olive/50">
            <EventIcon name={event.icon} className="size-7" />
          </span>
          <span aria-hidden className="text-sm font-medium tabular-nums text-on-plate/35">
            {pad(number)}
          </span>
        </div>

        <p className="t-label mt-8">{event.tag}</p>
        <h3
          className={`mt-1.5 text-on-plate ${
            featured
              ? "text-[clamp(1.75rem,4vw,2.5rem)] leading-[1.1] font-semibold tracking-[-0.03em]"
              : "t-subject"
          }`}
        >
          {event.name}
        </h3>
        <p
          className={
            featured
              ? "t-lede mt-4 max-w-2xl flex-1 text-on-plate/75"
              : "t-body mt-3 flex-1"
          }
        >
          {event.body}
        </p>

        <p className="mt-6 inline-flex items-center gap-2 self-start rounded-full border border-plate-olive/30 bg-plate-olive/10 px-3 py-1.5 text-[0.8125rem] font-medium text-plate-olive">
          <span aria-hidden className="size-1.5 rounded-full bg-current" />
          {event.fact}
        </p>
      </div>
    </motion.li>
  );
}

export function EventDossier() {
  const [filter, setFilter] = useState<FilterId>("all");
  const reduced = useReducedMotion();
  const shown = filter === "all" ? events : events.filter((e) => e.group === filter);

  return (
    <div>
      <div
        role="group"
        aria-label="Filter events"
        className="flex flex-wrap gap-2"
      >
        {eventsPage.filters.map((f) => {
          const active = f.id === filter;
          const count = f.id === "all" ? events.length : events.filter((e) => e.group === f.id).length;
          return (
            <button
              key={f.id}
              type="button"
              aria-pressed={active}
              onClick={() => setFilter(f.id)}
              className={`ease-signature relative isolate inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                active
                  ? "border-transparent text-plate"
                  : "border-on-plate/15 text-on-plate/75 hover:border-on-plate/30 hover:text-on-plate"
              }`}
            >
              {active && (
                <motion.span
                  layoutId={reduced ? undefined : "event-filter"}
                  aria-hidden
                  className="absolute inset-0 -z-10 rounded-full bg-plate-olive"
                  transition={{ duration: DUR.standard, ease: EASE_SIGNATURE }}
                />
              )}
              {f.label}
              <span className={`tabular-nums ${active ? "text-plate/60" : "text-on-plate/40"}`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      <p className="sr-only" aria-live="polite">
        Showing {shown.length} of {events.length} programmes
      </p>

      <ul className="mt-8 grid gap-4 sm:mt-10 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
        <AnimatePresence mode="popLayout" initial={false}>
          {shown.map((event, i) => (
            <Card
              key={event.id}
              event={event}
              number={events.indexOf(event) + 1}
              index={i}
              featured={filter === "all" && i === 0}
            />
          ))}
        </AnimatePresence>
      </ul>
    </div>
  );
}
