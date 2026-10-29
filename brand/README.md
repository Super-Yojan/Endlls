# Endlls brand and design system

Tokens: `tokens.json` (source) and `tokens.css` (CSS custom properties and type classes). Logos: `logos/` (the `endlls-mark-*` files are the retired ribbon mark). The logo directions that were considered: `concepts/logo-concepts.html`.

Endlls Studio makes the brand, the film, the event and the product behind it, as one team. We work for people starting something: startups, small businesses, YouTube creators and college clubs. Half the studio is culture (events, marketing, film, music). The other half is systems (software, computer engineering, robotics, mechanical). The name says the rest: Endlls is "end less", spelled on purpose so you stop and read it twice.

## The idea: one loop, two halves

Every Endlls project runs on a loop. An idea gets made, shipped, shown to people, and fed back into the next round. The two halves of the studio sit on the two sides of that loop, and the brand shows them as two colours.

| Half | Practices | Colour | Mark in the UI |
| --- | --- | --- | --- |
| Culture | Brand, Events, Marketing, Film, Music | `copper` | round dot |
| Systems | Software, Hardware, Robotics, Mechanical | `indigo` | square dot |

`persimmon` is the moment where the loop meets an audience: a live show, a launch, a premiere. It is the rarest colour in the system.

**Calm ground, bold moments.** Pages are quiet: `paper`, `ink`, lots of space, hairlines. Then one thing per page is loud: a `display-xl` line that runs off the edge, a full-bleed photo, a `sand` invitation block, a copper slab. If two things on a screen are shouting, cut one.

## Who we talk to

- **Startups** need a brand and a product that launch together. Lead with "one team, no hand-offs".
- **Small businesses** need to look as good as they are. Lead with speed and real results.
- **YouTube creators** need intros, thumbnails, sound and merch that feel like them. Lead with film and music.
- **College clubs** need events people show up to. Lead with posters, socials and the night itself.

Talk to all four like smart friends with a deadline. None of them want agency language.

## Voice

Plain, warm, specific. We sound like the person who will actually make the thing.

- Write in first person plural ("we") to the reader ("you"). Never "the client".
- Sentence case for every heading, button and label. Uppercase only inside `label` (mono) style.
- Say what we made, with numbers and units where they exist: frame rates, run times, BPM, headcounts, weeks. The spec is the proof.
- Short sentences. One idea each. No emoji.
- Never: "leverage", "synergy", "cutting-edge", "solutions", "elevate", "unlock", "world-class".
- Write the name as **Endlls** in prose and **Endlls Studio** in full. Never "ENDLLS" in a sentence, never "Endless", never "Endlls Studios".
- The tagline is **Creativity never ends.** The working line is **Make it. Ship it. Do it again.**

| Do | Don't |
| --- | --- |
| We built Glid from the ground up: a sports app that matches players by place, time and skill. | Endlls Studios leveraged cutting-edge technology to deliver an innovative solution. |
| Your club night, start to finish: poster, reel, playlist, door list. | Comprehensive end-to-end event solutions for student organizations. |
| Got an idea? Let's not end it. | Contact us today to elevate your brand! |
| Taking projects for January. | Limited availability, book now! |

Buttons say exactly what happens: "Start a project", "See work", "Book a 20-minute call". Errors say how to fix it: "Add the part after the @, like alex@studio.com."

## Logo

The logo is the **tied wordmark**: "endlls" in lowercase Cabinet Grotesk 800, with a copper orbit ring around the double L. The ring passes behind the l's at the top and in front at the bottom. It has one fixed geometry everywhere: tilted 20 degrees, twice as wide as the pair of l's, centred just below their midpoint. The l's are the real glyphs, the same height as the d. The two l's stay plain so the name reads correctly, and the ring is the "less" in "end less", the loop that keeps going. Files are in `assets/Logos`.

- `endlls-wordmark-ink.svg` on `paper`, `bone` and `sand`. `endlls-wordmark-paper.svg` on `ink`, Night surfaces and dark photography.
- `endlls-wordmark-mono-ink.svg` and `endlls-wordmark-mono-paper.svg` (ring in the letter colour) for one-colour jobs: embroidery, laser etching, stamps and blend-mode headers.
- From 24 to 40px tall, use `endlls-wordmark-small-ink.svg` or `endlls-wordmark-small-paper.svg`, which have a heavier ring. Below 24px, use `endlls-wordmark-micro-ink.svg` or `endlls-wordmark-micro-paper.svg`: the plain wordmark with no ring.
- `endlls-icon-night.svg` is the primary app and avatar icon: paper l's with a copper orbit on an ink tile. `endlls-icon-copper.svg` (ink on a copper tile) is secondary: use it for seasonal or campaign moments, never as the default avatar. `endlls-favicon.svg` has the heaviest ring, for 16 to 32px. The orbit is always wider than the pair, so the icon never reads as a pause button.
- Always set the logo in lowercase. In sentences the name stays "Endlls".
- Clear space on every side: the height of the "e". Minimum width: 72px on screen, 20mm in print. Below that, use the icon.
- The ring is always copper, or matches the letters in mono and on the copper tile. Don't recolour it indigo or persimmon, don't untie it, and don't redraw the letters in another font.
- The old ribbon infinity mark is retired. Keep it out of new work.

## Colour

- `paper` is the page. `bone` lifts cards and fields. `sand` is for the one invitation on the page (`InquiryBanner`).
- Body text is `ink`; secondary text `ink-muted`; years and counters `ink-quiet` (on `paper` only).
- `copper` is the signature. Use it for fills, the mark, and display type 24px and up. For copper text under 24px use `copper-text`. Text on copper is `on-copper`.
- `indigo` is links, the focus ring, selection and anything Systems. It passes as text on every surface in both themes.
- `persimmon` once per screen at most, for something live or time-bound. Small persimmon text uses `persimmon-text`.
- `available` is a status colour only, always next to a word.
- Hairlines are `line`. Borders a person must see (fields, outlined buttons) are `line-strong`.
- Both themes are designed: **Paper** (light, default) and **Night** (dark). The Night ground `#0b0b0b` matches the app icon.

## Type

- **Cabinet Grotesk** (`display` family) for everything big: `display-xl`, `display-l`, `heading-1` to `heading-3`. Set tight: weights 700 to 800, negative tracking.
- **Satoshi** (`body` family) for reading: `lead`, `body`, `small`, `button`.
- **IBM Plex Mono** (`mono` family, from Google Fonts) is the engineering voice: `label` for eyebrows and tags, `spec` for credits and numbers. Always uppercase in `label`.
- One `display-xl` per page. It may crop off the right edge on purpose; nothing else may.
- Keep running text to 68 characters a line, `lead` to 60.
- The site currently maps body text to Cabinet and display to Satoshi. Swap them to match this system.

## Space, shape and layout

- Spacing runs on a 4px base: `space-1` to `space-32`. Section padding is `space-24` on desktop, `space-16` on phones. The page gutter is `clamp(1.25rem, 4.6vw, 4.75rem)`.
- Shapes are either sharp or very round. Photos and video are `radius-none`. Cards and fields are `radius-md`. Big blocks are `radius-lg`. A section that slides over the one before gets `radius-section` on its top corners only. Buttons and tags are `radius-pill`.
- No drop shadows. Separate with hairlines, colour blocks and space. The only shadow is `glow-indigo` on a hovered card.
- Layouts are asymmetric: big type left, quiet detail right. Leave one column empty before you add a box.

## Motion

- One easing everywhere: `cubic-bezier(0.22, 1, 0.36, 1)`. Hovers 350ms, reveals 500 to 700ms.
- One orchestrated moment per page, such as the scroll-scrubbed mountain film on the homepage. Everything else is small: arrows nudge 4px, cards lift 4px.
- The loop is the motion motif: things that wait (loaders, scroll cues) travel around a loop instead of spinning.
- Respect `prefers-reduced-motion`: show the end state, no scrub.

## Imagery

- Real work, real people, real places (`assets/Imagery`). No stock photos, no AI people.
- Culture shots: wide, warm, crowded, practical light. Systems shots: close, in hand or on the bench, the same warm light so both halves feel like one studio.
- Caption images with a `SpecSheet` or a `label` line: what, where, how many, how long.

## Iconography

There is no icon set yet. Use typographic glyphs set in the current text style: → for forward links, + for add or expand, × for close, ● for live (in `persimmon`). The practice dots in `PracticeTag` (round for Culture, square for Systems) are the only custom shapes. If a set is needed later, pick a 1.5px-stroke line set and draw it in `ink`.

## Focus and states

- Every interactive element shows a 2px solid `focus` ring with a 4px offset (2px on fields). It is at least 7:1 on `paper` and `bone` in both themes.
- Primary buttons go from `ink` to `copper` on hover. Outlined buttons darken their border to `ink`. Text links turn `copper-text`.
- Errors use `persimmon-text` for the border and the message, and always say how to fix the problem.
