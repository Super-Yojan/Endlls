# Endlls Portfolio Content Guide

The first-version projects are fictional placeholders. Replace their names, claims, copy, credits, and images before presenting them as real client work.

## Add or replace a project

1. Duplicate a file in `content/projects/`.
2. Rename it to match the new slug, for example `north-star.md`.
3. Create `public/images/projects/north-star/` and add the cover image there.
4. Replace every frontmatter field and the Markdown narrative.
5. Run `npm test -- --run` and `npm run build`.

## Frontmatter fields

| Field | Required | Purpose |
| --- | --- | --- |
| `title` | Yes | Public project title. |
| `slug` | Yes | URL-safe value used in `/work/<slug>/`. Keep it unique. |
| `year` | Yes | Four-digit project year. |
| `client` | Yes | Client or organization name. |
| `services` | Yes | YAML list used for metadata and Work filters. |
| `summary` | Yes | One- or two-sentence project overview. |
| `cover` | Yes | Root-relative image path under `public/`. |
| `coverAlt` | Recommended | Concise description of the cover image. Defaults to the project title when omitted. |
| `featured` | Yes | `true` includes the project on the homepage. |
| `order` | Yes | Lower numbers appear first. Keep values unique. |
| `gallery` | No | YAML list of additional root-relative image paths. |
| `credits` | No | YAML list shown near the end of the case study. |
| `color` | No | Project reference color stored for future presentation use. |

## Case-study writing

Everything below the closing `---` is Markdown. Use level-two headings (`##`) for one idea per band, short paragraphs, and a single block quote (`>`) for the inverted statement. Avoid level-one headings because the page already uses the project title as its primary heading.

The case-study template is a scroll story: huge title, one sentence, a full-bleed hero when the cover is landscape, a quiet client / services / year strip, then alternating cream and bone bands. A block quote becomes the one ink panel. Images in a band are grouped only when their aspect ratios match. Portrait phones stay with portrait phones. Landscape stills stay with landscape stills. Mixed pairs are stacked instead.

A local `<video src="/videos/...mp4">` is rendered as a player. Add `class="case-motion-wide"` only when the file itself is landscape.

## Images

- Store each project's files in `public/images/projects/<slug>/`.
- Use descriptive filenames such as `cover.webp`, `packaging.webp`, or `website-home.webp`.
- Prefer optimized WebP, AVIF, or high-quality JPEG files. Keep the original source files elsewhere.
- Write meaningful `coverAlt` text that describes what is visible rather than repeating the project name.
- Gallery images inherit a simple project-and-position description in this version.

## Graphik

Graphik requires a commercial webfont license and is not committed to this repository. When licensed `.woff2` files are available, add them under `public/fonts/`, declare them with `@font-face` in `app/globals.css`, and keep `Graphik` first in the `--body` font stack. Until then, the site uses a compatible system sans-serif fallback.

## Static hosting

`npm run build` writes the final site to `out/`. Upload that directory to any static host or connect the repository to a service that supports Next.js static exports.
