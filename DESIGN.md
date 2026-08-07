# Design law — IEEE MACE SB

Binding on every page. If something here conflicts with a generic best practice, this wins.

## The one rule

**Nothing renders in a default.** Every piece of text has an assigned role from the scale below.
There is no such thing as "just a paragraph" or "just a label" — if a string appears on screen and
you cannot name its role, it is not finished.

The hero is the reference. Anton, stretched, uppercase, solid paired with outline. Everything else
on the site is a quieter member of that same family, never a different family.

## Typeface assignment

| | |
|---|---|
| **Anton** | Everything that is not a running paragraph. Headings, item names, labels, place names, numbers, CTAs, nav. |
| **Archivo** | Running paragraphs only. Nothing else. |

**Why Archivo survives at all.** Anton is a poster face — ultra-condensed, single weight, no
lowercase rhythm at text size. A 45-word paragraph set in it is unreadable, and shipping unreadable
body copy to make a typographic point fails the brief harder than a second family does. Archivo is
therefore restricted, not permitted: the moment a string is shorter than a sentence, it is Anton.

No third family. Ever. No monospace — mono on a non-technical brand reads as costume.

## The scale

Every text element uses one of these. Defined once in `globals.css`, never inlined.

| Role | Class | Face | Treatment |
|---|---|---|---|
| Display | inline in `Hero.tsx` | Anton | `scaleY(1.34)`, clamp to 5.5rem, solid row + outline row |
| Title | `.t-title` | Anton | uppercase, `scaleY(1.24)`, section headings |
| Clause | `.t-clause` | Anton | uppercase, `scaleY(1.2)`, display scale — a statement that is the only thing on screen |
| Subject | `.t-subject` | Anton | uppercase, `scaleY(1.18)`, item and card names |
| Label | `.t-label` | Anton | uppercase, small, tracked, bronze — places, categories, meta |
| Action | `.t-action` | Anton | uppercase, tracked, `scaleY(1.14)` — buttons and links |
| Lede | `.t-lede` | Archivo | the one-line summary under a subject |
| Body | `.t-body` | Archivo | running paragraphs, measure capped 68ch |

`scaleY` is the signature. It is what makes the type read as belonging to this site rather than to
Anton generally. Every Anton role carries it, at decreasing strength as the role gets smaller.

**Applying `scaleY` costs layout height.** A transform does not change the box, so every stretched
role raises its own `line-height` to compensate. Change one, change the other.

**Never put `scaleY` in a class on an element Motion animates.** Motion writes `transform` inline
for entrances and inline beats the class, silently wiping the stretch. Either put the scale on a
child element, or pass it through Motion's own `initial`/`animate`.

## The solid / outline pair

The hero pairs a solid row against an outline row. That pairing is the site's signature device,
not a hero-only trick. Section titles repeat it: the first phrase solid, the second outlined.

Outline is `.word-outline` — `-webkit-text-stroke` in `em`, so the stroke scales with the type and
never thins to a hairline on a phone. It has a solid-fill fallback under `@supports not`, because
transparent fill with no stroke support renders as nothing at all.

Use it at display, clause and title size only. Outlined type is genuinely low-contrast; below title
size it stops being readable outdoors.

The pair does not only split a title. On the self-rewriting sentence it splits the sentence itself:
the stem `IEEE IS` outlined, the clause solid. Same device, applied to grammar rather than to a
heading — which is also how the stem avoids becoming the banned eyebrow.

## Colour roles for type

| Token | Use |
|---|---|
| `--on-plate` | Titles, subjects, ledes. The default for anything that must be read. |
| `--on-plate` at 70% | Body paragraphs, and only body paragraphs. |
| `--plate-olive` | Outline strokes, interactive affordances, the contour system. |
| `--plate-bronze` | Labels, places, categories. The one warm accent. |

Never grey. Never a neutral tint that is not one of these.

## Banned

- Any text element with no role from the scale.
- Archivo on anything shorter than a sentence.
- A third typeface, or monospace anywhere.
- Default browser weights and sizes — `font-bold`, `text-lg` and friends carry no meaning here.
- Tiny uppercase tracked eyebrows above every section. `.t-label` is for data attached to an item
  (a place, a category), never a kicker sitting above a heading.
- Sentence-case titles. Titles and subjects are uppercase; that is the voice.
- Outlined text below title size.
