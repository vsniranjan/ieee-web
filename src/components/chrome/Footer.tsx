"use client";

import Image from "next/image";
import Link from "next/link";
import { useLenis } from "lenis/react";
import { Ticker } from "@/components/chrome/Ticker";
import { footer, nav } from "@/content/site";

/**
 * Mobile is the primary target, so the phone layout is the one that had to be
 * right: the link columns sit two-up rather than stacking, back-to-top folds
 * into the bottom bar instead of taking its own block, and Pages splits into
 * two columns of its own so five links cost two rows and not five.
 *
 * `lg:contents` dissolves the wrapper that groups those columns on small
 * screens, so at desktop they become direct children of the 12-column grid
 * again. One DOM, two arrangements, no duplicated markup.
 */
export function Footer() {
  const lenis = useLenis();
  // Derived, never stored — a hardcoded year is wrong every January.
  const year = new Date().getFullYear();

  function toTop() {
    // Lenis owns the scroll, so window.scrollTo would fight it. Fall back for
    // the reduced-motion case, where Lenis is never instantiated.
    if (lenis) lenis.scrollTo(0);
    else window.scrollTo({ top: 0 });
  }

  return (
    <footer className="relative mt-10">
      <Ticker />

      {/* `isolate` gives the footer its own stacking context, so the watermark
          sits behind the footer's content without falling behind PageTerrain,
          which is at -z-10 on the page. */}
      <div className="relative isolate overflow-hidden">
        {/* Wide screens only. At phone width it spanned the whole footer and
            read as noise behind the links rather than as a mark. */}
        <p
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-1/2 z-0 hidden -translate-y-1/2 text-center text-[12vw] leading-[0.8] font-semibold tracking-[-0.04em] text-on-plate/[0.06] select-none sm:block"
        >
          {footer.wordmark}
        </p>

        <div className="relative z-10 mx-auto w-full max-w-[88rem] px-5 pt-12 pb-8 sm:px-8 sm:pt-20 sm:pb-10">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-5">
              {/* The same lockup as the navbar, one size up because the footer
                  is not fighting a nav row for the line. Nothing is set beside
                  it: the artwork already reads IEEE MACE / STUDENT BRANCH, and
                  the wordmark-plus-tagline pair that used to sit here said
                  those exact words a second time. */}
              <Link href="/" className="inline-flex">
                <Image
                  src={nav.brand.full}
                  alt={nav.brand.name}
                  width={2449}
                  height={1000}
                  className="h-16 w-auto sm:h-20"
                />
              </Link>
            </div>

            {/* Three columns at every width below lg, so the three headings sit
                on one row instead of stacking. Three links each keeps them even. */}
            <div className="grid grid-cols-3 gap-x-4 sm:gap-x-6 lg:contents">
              {footer.columns.map((column) => (
                <nav key={column.title} aria-label={column.title} className="lg:col-span-2">
                  <h2 className="t-label">{column.title}</h2>
                  <ul className="mt-4 flex flex-col gap-2.5">
                    {column.links.map((link) => (
                      <li key={`${column.title}-${link.label}`}>
                        <Link
                          href={link.href}
                          className="group inline-flex items-center gap-2 text-on-plate/75 transition-colors duration-150 hover:text-on-plate"
                        >
                          <span className="t-action">{link.label}</span>
                          <span
                            aria-hidden
                            className="ease-signature h-px w-0 bg-plate-olive transition-all duration-300 group-hover:w-4"
                          />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              ))}
            </div>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-on-plate/10 pt-6 sm:mt-14">
            <p className="t-label">
              &copy; {year} {footer.rightsHolder}. All rights reserved.
            </p>
            <p className="t-label">{footer.credit}</p>

            {/* Folded into the bottom bar rather than occupying its own block —
                on a phone that block was pure height for one control. */}
            <button
              type="button"
              onClick={toTop}
              className="ease-signature group ml-auto inline-flex items-center gap-2 text-plate-olive transition-colors duration-150 hover:text-on-plate"
            >
              <span className="t-label !text-current">Top</span>
              <span
                aria-hidden
                className="ease-signature block h-px w-6 bg-current transition-all duration-300 group-hover:w-10"
              />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
