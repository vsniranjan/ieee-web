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
        <h2 className="t-title text-on-plate">
          <MaskedLine className="block">{whyJoin.heading.lead}</MaskedLine>
          <MaskedLine className="word-outline block" delay={0.08}>
            {whyJoin.heading.tail}
          </MaskedLine>
        </h2>

        <div className="relative mt-14 sm:mt-20">
          <Reveal>
            <p className="font-[family-name:var(--font-anton)] text-[clamp(3rem,15vw,10rem)] leading-[0.95] tracking-[-0.02em] text-on-plate">
              <Counter to={whyJoin.stat.value} suffix={whyJoin.stat.suffix} />
            </p>
            <p className="t-label mt-3">
              {whyJoin.stat.label} &middot; {whyJoin.stat.sub}
            </p>
          </Reveal>
        </div>

        <ul className="mt-14 flex max-w-3xl flex-col gap-5 sm:mt-20 sm:gap-6">
          {whyJoin.benefits.map((benefit, i) => (
            <Reveal as="li" key={benefit} delay={i * 0.06}>
              <span className="flex items-start gap-4">
                <span aria-hidden className="mt-[0.6em] size-1.5 shrink-0 rounded-full bg-plate-bronze" />
                <span className="t-lede text-on-plate">{benefit}</span>
              </span>
            </Reveal>
          ))}
        </ul>

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
