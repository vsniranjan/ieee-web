"use client";

import Link from "next/link";
import { Counter } from "@/components/home/Counter";
import { MaskedLine } from "@/components/motion/MaskedLine";
import { Reveal } from "@/components/motion/Reveal";
import { whyJoin } from "@/content/home";

/**
 * The figure at display scale, counting up on scroll-in.
 *
 * No contour layer of its own — PageTerrain already runs behind everything, and
 * a second set of lines local to this section just competed with the numerals.
 *
 * Deliberately not the hero-metric template — big number, small label,
 * supporting stats in a row. The figure is the section's whole subject here,
 * not a tile in a dashboard of them.
 */
export function WhyJoin() {
  return (
    <section className="relative">
      <div className="mx-auto w-full max-w-[88rem] px-5 pt-10 pb-20 sm:px-8 sm:pt-14 sm:pb-28">
        {/* One line. Flex lays the two masks side by side — they keep their
            own `block` display, which flex items ignore for layout anyway. */}
        <h2 className="t-title flex flex-wrap items-baseline gap-x-[0.28em] text-on-plate">
          <MaskedLine className="block">{whyJoin.heading.lead}</MaskedLine>
          <MaskedLine className="word-outline block" delay={0.08}>
            {whyJoin.heading.tail}
          </MaskedLine>
        </h2>

        <div className="relative mt-14 sm:mt-20">
          <Reveal>
            {/* The figure is the section's whole subject, so it takes the most
                aggressive vw ramp on the page — a phone should not see it at
                roughly the size of a heading. */}
            <p className="text-[clamp(3.5rem,16vw,7.5rem)] leading-none font-semibold tracking-[-0.04em] tabular-nums text-on-plate">
              <Counter to={whyJoin.stat.value} suffix={whyJoin.stat.suffix} />
            </p>
            <p className="t-label mt-3">
              {whyJoin.stat.label} &middot; {whyJoin.stat.sub}
            </p>
          </Reveal>
        </div>

        {/* One bounded panel rather than three lines loose on the terrain.
            Static — no icons, no expansion — so it reads as a different object
            from the field-work rows rather than the same device twice. */}
        <div className="panel mt-14 sm:mt-20">
          <ul className="grid gap-9 p-6 sm:gap-8 sm:p-9 lg:grid-cols-3 lg:gap-10">
            {whyJoin.benefits.map((benefit, i) => (
              <Reveal as="li" key={benefit.keyword} delay={i * 0.06}>
                <span
                  aria-hidden
                  className="block h-0.5 w-9 bg-plate-bronze"
                />
                <span className="t-subject mt-4 block text-on-plate">
                  {benefit.keyword}
                </span>
                <span className="t-body mt-2 block">{benefit.detail}</span>
              </Reveal>
            ))}
          </ul>
        </div>

        <Reveal className="mt-12">
          <Link
            href={whyJoin.cta.href}
            className="btn-field inline-flex items-center gap-3 px-6 py-4 sm:gap-4 sm:px-7"
          >
            <span aria-hidden className="size-1.5 shrink-0 rounded-full bg-current" />
            <span className="t-action">{whyJoin.cta.label}</span>
            <span aria-hidden className="btn-tail h-px shrink-0 bg-current" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
