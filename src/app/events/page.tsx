import type { Metadata } from "next";
import { EventDossier } from "@/components/events/EventDossier";
import { MaskedLine } from "@/components/motion/MaskedLine";
import { SectionReveal } from "@/components/motion/SectionReveal";
import { eventsPage } from "@/content/events";

export const metadata: Metadata = {
  title: "Events — IEEE MACE SB",
  description:
    "The flagship events and initiatives run by the IEEE Student Branch at Mar Athanasius College of Engineering — hackathons, a speaker series, school outreach, and humanitarian projects.",
};

/**
 * Eight entries and nothing else. No eyebrow, no standfirst — CONTENT.md's
 * `Annual Calendar` kicker and its `Discover the flagship activities…`
 * introduction both said less than the first entry does.
 *
 * The three humanitarian entries are rewritten against home's field-work band
 * rather than repeated; see the note at the top of `content/events.ts`.
 *
 * Top padding clears the fixed navbar, which the home page gets for free from
 * a full-height hero.
 */
export default function EventsPage() {
  return (
    <main className="mx-auto w-full max-w-[88rem] px-5 pt-32 pb-24 sm:px-8 sm:pt-40 sm:pb-32">
      <SectionReveal on="load">
        <h1 className="t-title flex flex-wrap items-baseline gap-x-[0.28em] text-on-plate">
          <MaskedLine className="block">{eventsPage.heading.lead}</MaskedLine>
          <MaskedLine className="word-outline block" delay={0.08}>
            {eventsPage.heading.tail}
          </MaskedLine>
        </h1>
      </SectionReveal>

      <SectionReveal>
        <EventDossier />
      </SectionReveal>
    </main>
  );
}
