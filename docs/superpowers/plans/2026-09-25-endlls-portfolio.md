# Endlls Studio Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a polished, responsive Endlls Studio portfolio that uses Markdown project files and turns visitors toward a client inquiry.

**Architecture:** Create a statically exported Next.js site whose App Router pages read typed Markdown content at build time. Shared layout and project components keep the visual system consistent, while project frontmatter and Markdown bodies remain the only content-editing surface.

**Tech Stack:** Next.js, TypeScript, React, CSS Modules/global CSS, gray-matter, remark/remark-html, Vitest, Testing Library

**Spec:** `docs/superpowers/specs/2026-09-25-endlls-portfolio-design.md`

## Global Constraints

- Use the supplied Endlls logo as the primary brand mark.
- Use Goldman for display headings and Graphik for supporting copy; use a documented sans-serif fallback until licensed Graphik webfont files are supplied.
- Use the public tagline “Creativity Never Ends.”
- Use a warm ivory, near-black, stone, and muted-gray palette with editorial spacing and restrained motion.
- Generate project pages from files in `content/projects/`; require no database, account, or external CMS.
- Support keyboard, touch, reduced-motion preferences, meaningful image alt text, and mobile-through-desktop layouts.
- Keep placeholder projects clearly replaceable and document that they are fictional source content.
- Do not add authentication, commerce, analytics dashboards, multilingual content, or live CRM integration.

## Review Focus

- A malformed project missing required frontmatter must fail the content validation with a field-specific error.
- An optional project field or gallery image list may be absent without breaking a case-study page.
- An unknown project slug must render the framework's not-found page rather than a blank or crashing view.
- Work filters must expose and select every rendered project using keyboard input.
- Contact fields must show accessible validation feedback and must not construct an inquiry link until required values are valid.

---

### Task 1: Static foundation and Markdown content pipeline

**Files:**
- Create: `package.json`
- Create: `next.config.ts`
- Create: `tsconfig.json`
- Create: `vitest.config.ts`
- Create: `app/layout.tsx`
- Create: `app/globals.css`
- Create: `app/icon.svg`
- Create: `lib/projects.ts`
- Create: `lib/projects.test.ts`
- Create: `types/project.ts`
- Create: `content/projects/*.md`
- Create: `public/brand/logo.png`
- Create: `public/images/projects/**`

**Interfaces:**
- Consumes: the approved design specification, supplied logo PNG, and generated placeholder project imagery.
- Produces: `ProjectMeta`, `Project`, `getAllProjects(): ProjectMeta[]`, and `getProjectBySlug(slug: string): Project | null`.

- [ ] **Step 1: Write failing content-pipeline tests**

Add tests named `sorts_projects_by_order`, `rejects_missing_required_frontmatter`, `allows_missing_optional_fields`, and `returns_null_for_unknown_slug`; assert exact ordering, field-specific validation errors, optional defaults, and null lookup behavior.

- [ ] **Step 2: Run the content tests and verify they fail**

Run: `npm test -- lib/projects.test.ts --run`
Expected: FAIL because the project loader and fixtures are not implemented.

- [ ] **Step 3: Implement the app foundation and typed Markdown loader**

Implement the declared interfaces in `lib/projects.ts`, parse files from `content/projects`, validate required fields, and create four replaceable fictional projects with coherent generated imagery. Configure static export, metadata, global tokens, local Goldman loading or approved webfont loading, the Graphik-ready fallback stack, and a logo-derived favicon.

- [ ] **Step 4: Run the content tests and production build**

Run: `npm test -- lib/projects.test.ts --run && npm run build`
Expected: all content tests pass and Next.js writes a static export successfully.

- [ ] **Step 5: Commit**

```bash
git add package.json package-lock.json next.config.ts tsconfig.json vitest.config.ts app lib types content public
git commit -m "feat: establish portfolio content foundation"
```

### Task 2: Shared editorial shell and homepage

**Files:**
- Create: `components/site-header.tsx`
- Create: `components/site-footer.tsx`
- Create: `components/project-card.tsx`
- Create: `components/inquiry-cta.tsx`
- Create: `components/site-shell.test.tsx`
- Create: `app/page.tsx`
- Modify: `app/globals.css`

**Interfaces:**
- Consumes: `ProjectMeta` and `getAllProjects()` from Task 1.
- Produces: `SiteHeader`, `SiteFooter`, `ProjectCard`, and `InquiryCta` components used by every route.

- [ ] **Step 1: Write failing shell and homepage tests**

Assert that the navigation names Work, About, and Contact; the page contains the exact tagline “Creativity Never Ends”; featured projects use their source order and alt text; and the menu button has an accessible name and toggled state.

- [ ] **Step 2: Run the component tests and verify they fail**

Run: `npm test -- components/site-shell.test.tsx --run`
Expected: FAIL because the shared components do not exist.

- [ ] **Step 3: Implement the shared shell and complete homepage**

Build the logo navigation, typographic hero, selected-work composition, capability list, process preview, inquiry CTA, and footer. Use semantic landmarks, responsive editorial layouts, image dimensions, visible focus styles, and reduced-motion-safe reveal treatments.

- [ ] **Step 4: Run tests and build**

Run: `npm test -- components/site-shell.test.tsx --run && npm run build`
Expected: tests pass and the home route is included in the static export.

- [ ] **Step 5: Commit**

```bash
git add app components
git commit -m "feat: build editorial homepage"
```

### Task 3: Work index and Markdown case-study routes

**Files:**
- Create: `app/work/page.tsx`
- Create: `app/work/work-filter.tsx`
- Create: `app/work/work-filter.test.tsx`
- Create: `app/work/[slug]/page.tsx`
- Create: `components/case-study-body.tsx`
- Modify: `app/globals.css`

**Interfaces:**
- Consumes: project loader interfaces and `ProjectCard` from Tasks 1–2.
- Produces: statically generated `/work/[slug]` pages and `WorkFilter({ projects }: { projects: ProjectMeta[] })`.

- [ ] **Step 1: Write failing filter and route-behavior tests**

Test that every category appears once, keyboard selection filters the visible project titles, selecting All restores them, and the not-found lookup path maps to null.

- [ ] **Step 2: Run the work tests and verify they fail**

Run: `npm test -- app/work/work-filter.test.tsx --run`
Expected: FAIL because the filter and work pages are not implemented.

- [ ] **Step 3: Implement the work index and project templates**

Generate filter categories from project services, render the responsive index, produce static params for every slug, call `notFound()` for unknown slugs, render Markdown content safely, support absent galleries, and add previous/next project links plus the inquiry CTA.

- [ ] **Step 4: Run work tests and build**

Run: `npm test -- app/work/work-filter.test.tsx --run && npm run build`
Expected: tests pass and every Markdown project emits a static HTML route.

- [ ] **Step 5: Commit**

```bash
git add app/work components/case-study-body.tsx app/globals.css
git commit -m "feat: add work index and case studies"
```

### Task 4: About, contact journey, and owner documentation

**Files:**
- Create: `app/about/page.tsx`
- Create: `app/contact/page.tsx`
- Create: `components/contact-form.tsx`
- Create: `components/contact-form.test.tsx`
- Create: `README.md`
- Create: `docs/content-guide.md`
- Modify: `app/globals.css`

**Interfaces:**
- Consumes: shared shell and inquiry CTA from Task 2.
- Produces: `ContactForm`, its accessible validation behavior, and the project-editing workflow for the owner.

- [ ] **Step 1: Write failing contact-form tests**

Test empty required fields, invalid email, keyboard submission, field-associated error text, and successful construction of the encoded inquiry email only after all required values are valid.

- [ ] **Step 2: Run the contact tests and verify they fail**

Run: `npm test -- components/contact-form.test.tsx --run`
Expected: FAIL because `ContactForm` does not exist.

- [ ] **Step 3: Implement About and Contact pages**

Add the studio philosophy, capabilities, three-step process, direct email path, and client-side validated inquiry form. Keep the language concise and consistent with the portfolio positioning.

- [ ] **Step 4: Document project replacement and local operation**

Document every frontmatter field, image folder convention, fictional-content notice, Graphik licensing/fallback behavior, local commands, and static-hosting output path.

- [ ] **Step 5: Run the complete automated verification**

Run: `npm test -- --run && npm run build`
Expected: all tests pass and all routes export without warnings or missing assets.

- [ ] **Step 6: Commit**

```bash
git add app/about app/contact components/contact-form.tsx components/contact-form.test.tsx README.md docs/content-guide.md app/globals.css
git commit -m "feat: complete studio inquiry experience"
```

### Task 5: Responsive and visual verification

**Files:**
- Modify: only files implicated by verified defects

**Interfaces:**
- Consumes: the complete static site from Tasks 1–4.
- Produces: a visually verified, production-ready local build.

- [ ] **Step 1: Serve the production export**

Run: `npx serve out`
Expected: the exported site responds locally without runtime errors.

- [ ] **Step 2: Inspect representative routes and viewports**

Inspect Home, Work, one case study, About, and Contact at approximately 390 px, 768 px, and 1440 px widths. Verify image loading/crops, menu behavior, heading hierarchy, content overflow, focus visibility, and footer/CTA placement.

- [ ] **Step 3: Verify accessibility preferences and input paths**

Navigate the site by keyboard, run the contact validation paths, check project filters, and emulate reduced motion. Fix only demonstrated defects and add a regression test when behavior changed.

- [ ] **Step 4: Re-run final verification**

Run: `npm test -- --run && npm run build`
Expected: all tests pass and the final export completes successfully.

- [ ] **Step 5: Commit verified fixes if any**

```bash
git add -A
git commit -m "fix: polish responsive portfolio experience"
```
