import type { Metadata } from "next";
import { EventDossier } from "@/components/events/EventDossier";
import { GalleryMarquee } from "@/components/gallery/GalleryMarquee";
import { GalleryReel } from "@/components/gallery/GalleryReel";
import { MaskedLine } from "@/components/motion/MaskedLine";
import { Reveal } from "@/components/motion/Reveal";
import { SectionReveal } from "@/components/motion/SectionReveal";
import { eventsPage } from "@/content/events";

export const metadata: Metadata = {
  title: "Events — IEEE MACE SB",
  description:
    "The flagship events and initiatives run by the IEEE Student Branch at Mar Athanasius College of Engineering — hackathons, a speaker series, school outreach, and humanitarian projects.",
};

/**
 * Intro and key numbers, the filterable flagship grid, then the poster reel
 * and a join prompt to close.
 *
 * The three humanitarian entries are rewritten against home's field-work band
 * rather than repeated; see the note at the top of `content/events.ts`.
 *
 * Top padding clears the fixed navbar, which the home page gets for free from
 * a full-height hero. The reel sits outside the width-constrained container so
 * it bleeds full width, as it does on home.
 */
export default function EventsPage() {
  const { cta } = eventsPage;

  return (
    <main className="pb-24 sm:pb-32">
      <div className="mx-auto w-full max-w-[88rem] px-5 pt-32 sm:px-8 sm:pt-40">
        <SectionReveal on="load">
          <div className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-8">
            <div className="lg:col-span-7">
              <p className="t-label">{eventsPage.eyebrow}</p>
              <h1 className="t-title mt-4 flex flex-wrap items-baseline gap-x-[0.28em] text-on-plate">
                <MaskedLine className="block" on="load">
                  {eventsPage.heading.lead}
                </MaskedLine>
                <MaskedLine className="word-outline block" on="load" delay={0.08}>
                  {eventsPage.heading.tail}
                </MaskedLine>
              </h1>
            </div>
            <p className="t-lede max-w-xl text-on-plate/75 lg:col-span-5 lg:justify-self-end">
              {eventsPage.lede}
            </p>
          </div>

          <dl className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-on-plate/10 bg-on-plate/10 sm:mt-16 lg:grid-cols-4">
            {eventsPage.stats.map((stat) => (
              <div key={stat.label} className="flex flex-col-reverse gap-1 bg-plate/90 p-5 sm:p-7">
                <dt className="text-sm text-on-plate/60">{stat.label}</dt>
                <dd className="text-[clamp(2rem,5vw,2.75rem)] leading-none font-semibold tracking-[-0.04em] text-on-plate tabular-nums">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </SectionReveal>

        <section aria-label="Flagship programmes" className="mt-16 sm:mt-24">
          <EventDossier />
        </section>
      </div>

      <section aria-labelledby="calendar-heading" className="mt-24 sm:mt-32">
        <div className="mx-auto w-full max-w-[88rem] px-5 pb-10 sm:px-8 sm:pb-12">
          <h2
            id="calendar-heading"
            className="t-title flex flex-wrap items-baseline gap-x-[0.28em] text-on-plate"
          >
            <MaskedLine className="block">{eventsPage.reelHeading.lead}</MaskedLine>
            <MaskedLine className="word-outline block" delay={0.08}>
              {eventsPage.reelHeading.tail}
            </MaskedLine>
          </h2>
          <Reveal as="p" className="t-body mt-4">
            {eventsPage.reelLede}
          </Reveal>
        </div>
        <GalleryReel />
        <GalleryMarquee />
      </section>

      <div className="mx-auto mt-24 w-full max-w-[88rem] px-5 sm:mt-32 sm:px-8">
        <Reveal className="event-card event-card--featured">
          <div className="relative flex flex-col gap-8 p-7 sm:p-10 lg:flex-row lg:items-center lg:justify-between lg:p-14">
            <div className="max-w-2xl">
              <h2 className="text-[clamp(1.75rem,4vw,2.5rem)] leading-[1.1] font-semibold tracking-[-0.03em] text-on-plate">
                {cta.heading}
              </h2>
              <p className="t-lede mt-3 text-on-plate/70">{cta.body}</p>
            </div>
            <a
              href={cta.href}
              className="btn-field inline-flex shrink-0 items-center gap-3 self-start px-6 py-4 lg:self-auto"
            >
              <span aria-hidden className="size-1.5 shrink-0 rounded-full bg-current" />
              <span className="t-action">{cta.label}</span>
              <span aria-hidden className="btn-tail h-px shrink-0 bg-current" />
            </a>
          </div>
        </Reveal>
      </div>
    </main>
  );
}
