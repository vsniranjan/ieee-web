import Link from "next/link";
import { Timeline } from "@/components/home/Timeline";
import { Reveal } from "@/components/motion/Reveal";
import { close } from "@/content/home";

/**
 * Somewhere to land. The branch's span since the charter, drawn as a scale,
 * then the routes onward.
 */
export function Close() {
  return (
    <section className="relative">
      <div className="mx-auto w-full max-w-[88rem] px-5 py-24 sm:px-8 sm:py-32">
        <Reveal>
          <Timeline />
        </Reveal>

        <Reveal className="mt-20 flex flex-wrap gap-x-8 gap-y-4" delay={0.08}>
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
    </section>
  );
}
