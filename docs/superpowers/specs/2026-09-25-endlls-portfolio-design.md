# Endlls Studio Portfolio Website — Design Specification

## Purpose

Create a premium portfolio website for Endlls Studio that showcases creative work and converts prospective clients into qualified inquiries. The experience should express the brand promise “Creativity Never Ends” through confident typography, disciplined composition, and restrained motion.

## Brand Direction

- Use the supplied Endlls logo as the primary brand mark.
- Use Goldman for display headings and prominent brand statements.
- Use Graphik for supporting copy, navigation, labels, and the tagline.
- Use “Creativity Never Ends” everywhere the public-facing tagline appears.
- Favor a black, warm ivory, stone, and muted gray palette informed by the supplied brand board.
- Treat the brand board as visual reference, not as page content or implementation instructions.

## Experience Principles

1. Work leads. Visitors should encounter strong project imagery and concise outcomes before a long studio biography.
2. Editorial, not ornamental. Large type, whitespace, rules, and measured asymmetry create the visual character.
3. Motion supports hierarchy. Transitions should be subtle, quick, and respectful of reduced-motion preferences.
4. Every major page ends with a clear invitation to start a project.
5. Content stays maintainable without a database or external CMS.

## Information Architecture

### Home

- Compact navigation with logo and links to Work, About, and Contact.
- Large opening statement featuring “Creativity Never Ends.”
- Selected-work section containing several featured projects.
- Studio capabilities presented as branding, digital, campaigns, and creative direction.
- Short studio positioning statement and process preview.
- Strong inquiry call to action and branded footer.

### Work

- Project index generated from Markdown frontmatter.
- Lightweight category filters that work with keyboard and touch input.
- Each project card displays an image, title, category, and year.

### Project Case Study

- Hero image and concise project summary.
- Metadata for client, year, disciplines, and project role.
- Modular narrative sections supporting headings, prose, pull quotes, full-width images, and paired images.
- Previous/next project navigation.
- Inquiry call to action.

### About

- Studio philosophy and concise origin story.
- Capabilities and approach.
- Three-step process: discover, shape, deliver.
- Inquiry call to action.

### Contact

- Focused inquiry form for name, email, company, project type, budget range, and project description.
- Direct email alternative.
- Clear success and validation states. The first version may submit through a mailto-based fallback unless a form service is configured later.

## Content Model

Projects live in `content/projects/` as Markdown or MDX files. A project should be publishable by duplicating one example file and replacing its fields.

Required frontmatter:

```yaml
title: Project title
slug: project-title
year: 2026
client: Fictional client
services:
  - Brand Strategy
  - Digital Design
summary: A concise one- or two-sentence project description.
cover: /images/projects/project-title/cover.webp
featured: true
order: 1
```

The Markdown body contains the case-study narrative. Optional structured fields may define gallery images, image captions, project color, and credits. Missing optional fields must degrade cleanly without broken placeholders.

The initial site includes several polished fictional projects. Their fictional status will be documented for the site owner but not presented as deceptive client claims; placeholder client names and copy will be clearly replaceable in source.

## Visual System

- Warm ivory background with near-black typography.
- Goldman drives large display moments and selected section titles.
- Graphik carries readable text and interface labels. If a licensed Graphik webfont is unavailable, the implementation will use a metrically compatible sans-serif fallback while keeping the font stack ready for licensed files.
- Strong type scale, thin divider rules, and generous margins create the editorial rhythm.
- Project imagery uses a consistent photographic/art-direction treatment and fixed aspect-ratio containers to prevent layout movement.
- Avoid generic card grids, excessive rounded containers, gradients, and decorative effects that weaken the brand.

## Interaction and Accessibility

- Responsive from small mobile screens through wide desktop layouts.
- Semantic landmarks and heading order.
- Visible keyboard focus, labeled controls, sufficient contrast, and generous touch targets.
- Project filters remain usable without pointer input.
- Images include meaningful alternative text and reserved dimensions.
- Motion is disabled or simplified when `prefers-reduced-motion` is enabled.

## Technical Architecture

- A static, component-based website suitable for inexpensive hosting.
- Markdown/MDX content is parsed at build time; no production database is required.
- Reusable components cover navigation, project cards, case-study sections, calls to action, and footer.
- Project routes and index data are generated from the content directory.
- Site metadata includes a project-specific title, description, and favicon derived from the supplied mark.
- No authentication, commerce, CMS account, or persistent application state is included in this first version.

## Asset Handling

- Preserve the supplied logo as the source of truth and create web-appropriate copies inside the project.
- Use a small curated set of cohesive placeholder visuals for the fictional portfolio projects.
- Store project assets in predictable folders matching each project slug.
- Include an editing guide explaining how to replace project copy, cover images, and case-study media.

## Validation

- Production build completes successfully.
- All routes render without missing content or assets.
- Navigation, filters, project links, and contact validation work with keyboard and touch input.
- Layout is checked at representative mobile, tablet, and desktop widths.
- Automated checks cover content parsing and required project metadata where practical.
- A visual inspection confirms typography, contrast, image cropping, responsive hierarchy, and reduced-motion behavior.

## Out of Scope

- Admin CMS, accounts, authentication, payments, multilingual content, blog publishing, analytics dashboards, and live CRM integration.
- A deployed production domain or external form service unless separately requested.
