# `/events` — build spec

Supersedes the `/about` spec, which is built. `PLAN.md` is stale on almost every locked decision
(no GSAP, light + dark, five nav links, a `/gallery` route — all false now). This file is authority
for this page.

## The problem this page has that the others didn't

Home's field-work band already carries **Light the Lives**, **Connect the Lives** and **Fauna
Flash** using CONTENT.md's exact `full` paragraphs. A third of `/events` is already published,
word for word, one route away.

**Resolved: repeat them, rewritten.** Both pages stay self-contained; the three shared entries get
new prose here so a reader who scrolled home and then clicked Events is not served the same three
paragraphs twice. Home is not touched.

The cost is real and worth stating: three stories now exist in two versions and can drift. If they
ever disagree on a fact, `/events` is canonical.

## Decisions

| | |
|---|---|
| Entries | **Eight.** `Enhance their Lives` dropped — it has not happened yet. |
| Layout | **Numbered dossier, alternating** sides. Nothing collapses. |
| Copy | **~45 words each**, lightly edited. ~330 words total. |
| Posters | **Stay on home.** The reel is 2026 sessions; this page is the annual flagships. |
| Images | **None.** Type, numbering and the terrain carry it. |
| Duration counts | **Ship as written** — "seven years", "five years". |
| Naming | CONTENT.md's forms. Ticker corrected to match. |

**Why the dossier.** Home uses expanding pills for three, `/team` collapsible strata for
seventeen, `/about` an open two-column register for ten. A fourth device is needed or the site
starts repeating itself. Eight substantial paragraphs also need room a two-column register cannot
give them.

**Why no images.** Only one of the eight (Connect the Lives) has a poster in the existing set. One
image among eight reads as an accident. The layout takes images later without changing.

**On the duration counts — flagged once, then dropped.** "Seven years" and "five years" are
hardcoded and wrong within a year unless someone edits them. This is the same failure that
produced the `38 years` bug on home, which was fixed by deriving from 1988. Shipping as
instructed; a code comment will say so, so whoever finds it stale knows it was a choice.

## Naming — canonical, everywhere

Confirmed: **Hack-a-addict** and **Fauna Flash**. The rest take CONTENT.md's forms.

```
>.hack()_;  ·  SPARC  ·  STEM Initiative  ·  Hack-Her
Hack-a-addict  ·  Light the Lives  ·  Connect the Lives  ·  Fauna Flash
```

The ticker in `src/content/site.ts` needs two fixes:

- **Fauna Flash is missing** — add it.
- **`STEM OUTREACH` should be `STEM INITIATIVE`** — a third spelling nobody flagged. `School
  Outreach` is the event's category tag, not its name.

`HACK-A-ADDICT` in the ticker is already correct and stays.

## The eight entries

`name` · `tag` · body. Bodies are drafts; lengths are load-bearing.

**01 · >.hack()_; — Flagship Hackathon**
> The branch's flagship, seven years running. Each edition gives college students a platform to
> turn an idea into something that works by the end of it, and every year the crop of entries has
> been larger than the last.

**02 · SPARC — Speaker Series**
> Five years of speakers brought in for first-years. People who have built careers across very
> different fields, talking about how they got there — personal growth, career planning, and what
> the next four years can be made to hold.

**03 · STEM Initiative — School Outreach**
> Workshops, demonstrations and hands-on sessions taking STEM into schools — IoT and embedded
> systems, mechatronics, software development, cybersecurity and data analytics. Reaches close to
> 500 students across five schools each year.

**04 · Hack-Her — Women in Tech**
> A 24-hour ideation and implementation challenge open only to women, answering how few of them
> the field keeps. Technical work is the frame; what it actually builds is confidence, leadership,
> a network, and the habit of learning from peers.

**05 · Hack-a-addict — Social Impact Hackathon**
> Run with the Lions Club on drug abuse and its effects. Participants worked up technically
> feasible, socially relevant ideas for prevention, awareness and rehabilitation, and came away
> understanding what substance abuse actually does to the people around it.

**06 · Light the Lives — Humanitarian Project** *(rewritten vs home)*
> Kuttampuzha Grama Panchayat had no dependable power. Volunteers cleared it with the local
> authorities, then moved into the locality for a week and built two solar systems there. The
> panchayat has had a reliable supply since.

**07 · Connect the Lives — Humanitarian Project** *(rewritten vs home)*
> The tribal colony at Uriyampetty came to the branch after Light the Lives: their children could
> not reliably get to school. A survey settled what was needed, and a communication module went
> into the local school for online classes. A resident was trained to run it, and a year later it
> is still running.

**08 · Fauna Flash — Humanitarian Technology** *(rewritten vs home)*
> An early warning system for the forest fringe, built under Madhav K. Anil. It picks up elephant
> movement and alerts the settlements nearby while there is still time to act, so encounters that
> used to be dangerous mostly stop happening.

Cut outright: the `Annual Calendar` eyebrow, the `Major Events & Initiatives` heading, the
standfirst, and the ninth entry.

## Composition

```
WHAT WE / RUN                    .t-title, solid + outline via MaskedLine
                                 "What we run" is home's own link label

01 ────────────────────────────────────────────────────
   FLAGSHIP HACKATHON                       .t-label bronze
   >.HACK()_;                                .t-subject
   The branch's flagship, seven years…      .t-body, 68ch

──────────────────────────────────────────────────── 02
                              SPEAKER SERIES
                                       SPARC
       Five years of speakers brought in for…

03 ────────────────────────────────────────────────────
   …
```

Odd entries anchor left, even entries right, the rule running to the opposite edge with the number
at its far end. **Alternation is `sm+` only** — at 390px there is no room for a right-anchored
variant, and ragged-left body copy is hard to read. On a phone every entry anchors left.

Type roles, all existing: number `.t-label` olive (the poster reel's index device), tag `.t-label`
bronze, name `.t-subject` (sized against a full-width row, which is what a band is), body
`.t-body`. **No new CSS expected.**

## Motion

One new piece, everything else reused.

| Element | Device |
|---|---|
| Heading | `MaskedLine` solid + outline, 0.08s apart |
| Section | `SectionReveal` |
| Entry | **New** — enters from its own side: odd `x: -24`, even `x: +24`, plus fade. Makes the alternation legible as movement rather than only as layout. |
| Rule | Draws out from the number on `scaleX`, `transform-origin` matching the entry's side |

The directional entry is why `EventDossier.tsx` is a client component; `Reveal` only translates on
`y`. Reduced motion drops `x` and the rule draw, keeping the crossfade. Stagger capped at
`Math.min(i, 6) * 0.05`.

## Files

```
src/content/events.ts                    new — the eight entries
src/app/events/page.tsx                  new — server component, metadata
src/components/events/EventDossier.tsx   new — client, directional entry + rule draw
src/content/site.ts                      edit — ticker: add FAUNA FLASH, STEM OUTREACH → INITIATIVE
```

Reused unchanged: `MaskedLine`, `SectionReveal`, `.t-title`, `.t-subject`, `.t-label`, `.t-body`,
`.word-outline`, and the constants in `src/lib/motion.ts`.

## Edge cases and failure modes

1. **`>.hack()_;` through Anton uppercase.** The name is punctuation-heavy and every `.t-subject`
   is `text-transform: uppercase`. Needs looking at on screen — if the glyphs collide, the fix is
   the name's own tracking, not abandoning the role.
2. **Long names in a right-anchored band.** `Hack-a-addict` and `Connect the Lives` are the worst
   cases and both are short. No wrap risk.
3. **The rule draw and `overflow-x`.** A rule running to the viewport edge inside a `max-w-[88rem]`
   container must not push horizontal scroll. `html` is already `overflow-x: clip`, but the rule
   should be contained rather than relying on that.
4. **No-JS.** Every animated element carries `data-reveal`, so `layout.tsx`'s `<noscript>` reset
   forces the page visible — including the `x` offset and any `scaleX` on the rule.
5. **`prefers-reduced-motion`.** No `x`, no rule draw, crossfade only.
6. **Ticker edit touches every page.** The ticker sits above the footer sitewide, so the string
   change must be checked on home as well as here.

## Verification

1. `npm run build` clean, `/events` returns 200.
2. 390px: every entry anchors left, no horizontal scroll, no rule escaping the gutter.
3. `sm+`: alternation reads, and each entry enters from the side it sits on.
4. JS disabled: all eight entries readable, nothing offset or clipped.
5. `prefers-reduced-motion`: nothing translates.
6. `>.hack()_;` rendered uppercase in Anton — eyeball it specifically.
7. Ticker on home and on `/events`: `FAUNA FLASH` present, `STEM INITIATIVE` not `STEM OUTREACH`.
8. Click through from home's "What we run" link.
9. Read home's three field-work paragraphs and `/events` entries 06–08 back to back — they must not
   read as the same text.

## Open, not decided here

- **Closing action.** `/about` has the same gap: both pages end on their last block with nothing
  onward. Proposal for both — close with the `.btn-field` → `Join IEEE`, the one action that works
  from any page. Not shipping unasked.
- **`CONTENT.md` is now a liability.** After this route lands it is stale on the site's shape, the
  roster, the contact details, the gallery route, three event names and both member figures.
  Regenerate from `src/content/*` or delete it.
- Once `/events` ships, all four routes exist and task #10 — the verification pass never done, on
  a real phone — is the only thing left before this is showable.
