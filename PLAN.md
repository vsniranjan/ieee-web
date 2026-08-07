# IEEE MACE SB website — build plan

Working document. `CONTENT.md` is the content spec; this file is the build spec.

## Context

The club wants a heavily animated, extremely polished site. `CONTENT.md` holds the final copy and
all data — everything is static, no CMS, no API. The project started empty, so this is a
from-scratch build.

**Scope cut against `CONTENT.md`:** every game, toy and easter egg is dropped. That removes the
reflex test, the signal runner, the fun fact wheel, the Konami/logo-click easter egg and its
toasts, and the desktop spark-collect mini-game. Consequences, since `CONTENT.md` assumes they
exist:

- `/playground` is deleted. It contained nothing but the three toys, so the route has no remaining
  content. **6 routes plus a 404**, not 7.
- Navigation drops to 5 links — About Us, Events, Team, Gallery, Contact — in the navbar, the
  mobile menu and the footer Pages column.
- Home loses its "A Little Detour" section entirely.
- The 404 becomes a plain page: `Error 404` / `Signal Lost` / a rewritten subtext, plus the
  `Back to safety` CTA. The current subtext ends "but since you're here, jump a few obstacles",
  which now refers to a game that no longer exists and must be recut.
- The preloader stays. It is a `00 / 100` counter, not a toy.

Motion now lives entirely in reveals, transitions and micro-interaction rather than in play. That
raises the bar on the reveal and transition vocabulary — there is no interactive play left to
carry the "alive" feeling.

## Decisions locked

| Choice | Value |
|---|---|
| Framework | Next.js 16.3.0 App Router, React 19.2.8, static export |
| Styling | Tailwind v4.3.3, CSS-first config, design tokens as CSS variables |
| Animation | `motion` 13.0.0 only. No GSAP. |
| Theme | Light + dark, user toggle |
| Language | TypeScript 7.0.2, strict |

`framer-motion` is the retired package name. Import `motion/react` in client components,
`motion/react-client` in server components. The two packages must never both be installed.

## Build order

Foundation is a hard dependency — tokens, theme, chrome and reveal primitives are what every page
composes from. After that, one page per pass. Home goes first because it sets the motion
vocabulary the rest inherit.

| # | Pass | Status |
|---|---|---|
| 0 | Foundation | not started |
| 1 | Home `/` | not started |
| 2 | About `/about` | not started |
| 3 | Events `/events` | not started |
| 4 | Team `/team` | not started |
| 5 | Gallery `/gallery` | not started |
| 6 | Contact `/contact` | not started |
| 7 | 404 | not started |

Each page pass owns its own design direction, its section-level motion, and any content
contradictions `CONTENT.md` flags for that page.

---

# Pass 0 — Foundation

Outcome: a navigable 7-route site with working chrome, both themes, all content typed and
available, and the motion vocabulary established. Page interiors are deliberately left as plain
stubs. Building all 7 pages in one sweep produces uniform, templated output; that is exactly what
this site cannot be.

## Architecture

```
src/
  app/
    layout.tsx            root: fonts, ThemeScript, MotionConfig, chrome
    template.tsx          route enter transition
    page.tsx              /
    about|events|team|gallery|contact/page.tsx
    not-found.tsx         404 (static)
    globals.css           @import tailwindcss, @theme tokens, dark variant
  content/
    types.ts              Society, EventItem, CoreMember, RosterEntry, GalleryPoster
    site.ts               metadata, ticker string, nav links, footer columns
    societies.ts          9 entries
    events.ts             9 entries
    team.ts               6 core + 31 roster, grouped
    gallery.ts            22 posters (file manifest generated separately)
  components/
    chrome/               Navbar, MobileMenu, Ticker, Footer, Preloader, ThemeToggle
    motion/               Reveal, StaggerGroup, ThemeScript
  lib/
    motion.ts             shared transition presets
```

Content is split by domain rather than one large module, so each page pass touches one file.

## Steps

### 1. Scaffold

`npx create-next-app@latest` with TypeScript, Tailwind, App Router, `src/` dir. Verify it pins
`next@16.3.0`, `react@19.2.8`, `tailwindcss@4.3.3`. Then `npm i motion`.

Set `output: "export"` in `next.config.ts`. Static export disables the default image optimizer, so
`images.unoptimized` must be true and posters get pre-optimized at build time instead — that
pipeline belongs to the gallery pass.

### 2. Tokens and theming

All tokens live in `globals.css` under Tailwind v4's `@theme`. No hex values in components, ever.

Class-based dark mode needs an explicit custom variant in v4:

```css
@import "tailwindcss";
@custom-variant dark (&:where(.dark, .dark *));

@theme {
  /* colour, type scale, spacing, radius, easing, duration */
}
```

Define the **complete light palette on `:root`**, then redefine only the changed tokens under
`.dark`. A token whose only definition sits inside `.dark` breaks light mode silently.

**Theme flash:** the toggle writes to `localStorage`, but the class must be on `<html>` before
first paint. A small blocking inline script in `layout.tsx` reads storage, falls back to
`prefers-color-scheme`, and sets the class. Without it every hard load flashes the wrong theme —
the single most visible polish bug on a site like this.

### 3. Motion primitives

Wrap the app in `<MotionConfig reducedMotion="user">`. That covers transform-based animation
globally. For effects it cannot reach — parallax, autoplaying loops, the ticker — use the
`useReducedMotion` hook and branch explicitly.

Docs to read before writing any of this, via the connected Motion MCP:
`motion://docs/react/react-motion-config`, `motion://docs/react/react-accessibility`,
`motion://docs/react/react-use-reduced-motion`, `motion://docs/react/react-animate-presence`.

`lib/motion.ts` holds the shared transitions — one entrance spring, one exit, one hover. Every
component references these. Ad-hoc durations scattered across 7 pages are what makes a site feel
loose rather than polished.

Build two reusable wrappers now: `Reveal` (scroll-in, `whileInView` with `once`) and
`StaggerGroup` (variants + `staggerChildren`). Most page work then composes these instead of
reinventing reveals per section.

**Page transitions:** App Router unmounts the old route before `AnimatePresence` can play an exit,
so true cross-page exit animation is not reliably available. Use `template.tsx` for an enter-only
transition, which does work. Do not promise exit transitions between routes.

### 4. Content layer

Port every item from `CONTENT.md` into `src/content/` behind explicit types. Two things affect
structure, not just data:

- **Team** is two shapes, not one — 6 core members (photo, name, role, optional email/phone) and
  31 roster entries (name, role, class) grouped into 7 domain-coordinator buckets and 10 society
  Chair/Secretary pairs. Model the grouping in data so `/team` renders it rather than hardcodes it.
- **Gallery** posters carry a title and a `society · format` tag; the image list itself comes from
  a generated manifest, so keep the descriptive data separate from the file manifest.

Leave `CONTENT.md`'s flagged contradictions (member count, hardcoded "38 years", missing VTS card,
event name drift) **as written** for now. They are page-level calls, resolved in each page's pass.

### 5. Global chrome

- **Navbar** — brand mark + wordmark, 5 links, `Join IEEE` CTA to ieee.org, burger opening the
  same links and CTA on mobile.
- **Ticker** — the single repeating phrase strip above the footer. Duplicate the strip and
  translate on a loop; freeze it under reduced motion.
- **Footer** — giant background wordmark, brand block and blurb, Pages / Useful Links / Connect
  Online columns, dynamic copyright year, WebTeam credit, back-to-top.
- **Preloader** — `00 / 100` counter, no words. Must not block content for repeat visitors.

No easter egg. No keyboard sequence listener, no logo click counter, no toast system.

### 6. Route shells

All 7 routes created with correct per-route `metadata` from each page's "Page description" line in
`CONTENT.md`, plus the site title `IEEE MACE SB`, its description, and `/logo.svg` as favicon.
Page bodies stay stubs.

## Verification

1. `npm run dev` — walk all 7 routes plus a bad URL for the 404. `/playground` must 404.
2. Toggle the theme on every route, then hard-reload each one and confirm **no flash** of the
   wrong theme.
3. DevTools → Rendering → emulate `prefers-reduced-motion: reduce`. Ticker and all reveals must
   settle to static.
4. Grep the tree for `playground`, `konami`, `spark`, `reflex`, `runner` — expect zero hits.
5. Throttle to mobile, check the burger menu and that nothing scrolls horizontally.
6. `npm run build` clean, including `tsc --noEmit`.
7. Lighthouse on `/` in both themes — contrast and CLS are the ones that bite here.

## Open items

- **Typography is unchosen.** `CONTENT.md` specifies no fonts. Scaffold with a neutral `next/font`
  pairing purely to unblock; pick properly in the design pass.
- **Theme toggle placement.** `CONTENT.md`'s navbar spec has no toggle in it. Needs a home —
  navbar end, inside the burger, or footer.
- **Assets missing.** Needs `/logo.svg`, 6 team photos, 22 event posters. The navbar needs the
  logo in pass 0; gallery is fully blocked without the posters.
