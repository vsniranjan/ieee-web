import Link from "next/link";
import { GalleryMarquee } from "@/components/gallery/GalleryMarquee";
import { GalleryReel } from "@/components/gallery/GalleryReel";
import { Timeline } from "@/components/home/Timeline";
import { MaskedLine } from "@/components/motion/MaskedLine";
import { Reveal } from "@/components/motion/Reveal";
import { close } from "@/content/home";

/**
 * Where the page turns from IEEE at large to this branch specifically. The
 * heading is the hinge — everything above it is the organisation, everything
 * below is Kothamangalam.
 *
 * The reel deliberately sits OUTSIDE the width-constrained container so it
 * bleeds full width. It clips its own overflow, so it adds no page-level
 * horizontal scroll.
 */
export function Close() {
  return (
    <section className="relative">
      <div className="mx-auto w-full max-w-[88rem] px-5 pt-24 sm:px-8 sm:pt-32">
        <h2 className="t-title flex flex-wrap items-baseline gap-x-[0.28em] text-on-plate">
          <MaskedLine className="block">{close.heading.lead}</MaskedLine>
          <MaskedLine className="word-outline block" delay={0.08}>
            {close.heading.tail}
          </MaskedLine>
        </h2>

        <div className="mt-12 sm:mt-16">
          <Reveal>
            <Timeline />
          </Reveal>
        </div>

        {/* Routes onward sit with the branch material they belong to, above the
            gallery — the reel is the section's closing note, not a divider. */}
        <Reveal className="mt-16 flex flex-wrap gap-x-8 gap-y-4 sm:mt-20">
          {close.links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group inline-flex items-center gap-2 text-plate-olive"
            >
              <span className="t-action">{link.label}</span>
              <span
                aria-hidden
                className="ease-signature h-px w-5 bg-current transition-all duration-300 group-hover:w-9"
              />
            </Link>
          ))}
        </Reveal>
      </div>

      {/* Heading stays inside the container; the reel sits outside it so it can
          bleed full width. */}
      <div className="mx-auto mt-20 w-full max-w-[88rem] px-5 pb-10 sm:mt-24 sm:px-8 sm:pb-12">
        <h2 className="t-title flex flex-wrap items-baseline gap-x-[0.28em] text-on-plate">
          <MaskedLine className="block">{close.reelHeading.lead}</MaskedLine>
          <MaskedLine className="word-outline block" delay={0.08}>
            {close.reelHeading.tail}
          </MaskedLine>
        </h2>
      </div>

      <GalleryReel />
      <GalleryMarquee />

      <div className="pb-20 sm:pb-28" />
    </section>
  );
}
