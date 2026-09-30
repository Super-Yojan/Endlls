# Endlls Studio

A statically exported portfolio for Endlls Studio. Projects and case studies are managed as Markdown files, so routine updates do not require a CMS.

## Local development

```bash
npm install
npm run dev
```

Open the local address printed by Next.js. Run the test suite with `npm test -- --run`.

## Production build

```bash
npm run build
```

The deployable static site is written to `out/`.

## Content

See [docs/content-guide.md](docs/content-guide.md) for instructions on creating and updating projects.

## Fonts

Goldman is included locally through `@fontsource/goldman`. Graphik is a commercial typeface and is not bundled; the stylesheet is ready to prefer licensed Graphik webfont files when they are added, with Helvetica Neue, Inter, and Arial as safe fallbacks.
