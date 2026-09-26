# Endlls V2 Scroll Film Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the Endlls homepage with a fullscreen, bidirectional scroll-scrubbed mountain film that reveals only **See Work** and **Start a Project** at the end.

**Architecture:** Keep `app/page.tsx` server-rendered and isolate all media and scroll behavior in one client leaf. GSAP ScrollTrigger pins a `100dvh` stage inside a `500dvh` runway, while pure helpers map normalized progress to video time. Optimized video and poster derivatives provide fast loading and static fallbacks without changing existing portfolio routes.

**Tech Stack:** Next.js 15, React 19, TypeScript, GSAP ScrollTrigger, native CSS, Vitest, Testing Library, FFmpeg

**Spec:** `docs/superpowers/specs/2026-09-25-endlls-v2-scroll-film-design.md`

## Global Constraints

- Redesign only `/`; preserve `/work`, `/about`, `/contact`, and `/work/[slug]` behavior and URLs.
- The homepage shows only the fullscreen video until the two final actions appear.
- Scroll down advances playback and scroll up reverses playback.
- Use `100dvh`, not `100vh`, for the pinned visual stage.
- Use a `500dvh` scroll runway and begin the CTA reveal at 90% progress.
- **See Work** links to `/work`; **Start a Project** links to `/contact`.
- Preserve the existing Goldman and Graphik brand typography.
- Do not update React state continuously from scroll progress.
- Honor `prefers-reduced-motion: reduce` with a static final frame and immediately visible CTAs.
- Preserve keyboard focus, WCAG AA button contrast, and one-line CTA labels.
- The supplied source video remains untouched; only project-local derivatives may be modified.
- Visible homepage copy must contain no em-dash or en-dash characters.

## Review Focus

- Video duration is `NaN`, zero, or unavailable: use the static final-frame fallback and expose both links.
- Scroll progress is less than 0 or greater than 1: clamp before computing playback time or CTA state.
- Video metadata fires before effect setup: initialize immediately when `readyState >= 1` rather than waiting forever.
- Component remounts during Fast Refresh or navigation: remove every ScrollTrigger, GSAP context, media listener, and animation-frame callback.
- Reduced-motion preference is active: create no scrub timeline or long runway and make both links immediately usable.

---

## File Structure

- Create `lib/video-progress.ts` for pure clamping, time mapping, and CTA-threshold helpers.
- Create `lib/video-progress.test.ts` for deterministic edge-case coverage.
- Create `components/scroll-film-hero.tsx` for the isolated client interaction and fallback state.
- Create `components/scroll-film-hero.test.tsx` for server-visible content and fallback behavior.
- Modify `app/page.tsx` to render only the V2 cinematic component.
- Modify `app/globals.css` with V2 stage, runway, video, veil, CTA, responsive, focus, and reduced-motion styles.
- Modify `package.json` and `package-lock.json` to add `gsap`.
- Create `public/video/endlls-scroll-film.mp4` as the silent fast-start delivery video.
- Create `public/video/endlls-scroll-film-poster.jpg` from the opening frame.
- Create `public/video/endlls-scroll-film-final.jpg` from the final frame.

### Task 1: Deterministic Progress Mapping

**Files:**
- Create: `lib/video-progress.ts`
- Create: `lib/video-progress.test.ts`

**Interfaces:**
- Consumes: normalized scroll progress and finite video duration.
- Produces: `clampProgress(progress: number): number`, `progressToTime(progress: number, duration: number): number | null`, and `isCtaProgress(progress: number, threshold?: number): boolean`.

- [ ] **Step 1: Write the failing helper tests**

Add tests named:

- `clamps_progress_to_the_unit_interval`
- `maps_start_midpoint_and_end_to_video_time`
- `rejects_non_finite_or_non_positive_duration`
- `reveals_ctas_at_ninety_percent_after_clamping`

Assert literal results: `-0.2 → 0`, `1.3 → 1`, `0.5` of `5.04 → 2.52`, invalid durations return `null`, and CTA progress becomes true at `0.9` but not `0.899`.

- [ ] **Step 2: Run the tests and verify RED**

Run: `npm test -- --run lib/video-progress.test.ts`

Expected: FAIL because `lib/video-progress` does not exist.

- [ ] **Step 3: Implement the pure helpers**

Create the three exact exported signatures. `progressToTime` must call `clampProgress`, reject non-finite or non-positive duration, and return a finite value. `isCtaProgress` defaults its threshold to `0.9` and compares against clamped progress.

- [ ] **Step 4: Run the tests and verify GREEN**

Run: `npm test -- --run lib/video-progress.test.ts`

Expected: 4 tests PASS.

- [ ] **Step 5: Commit**

```bash
git add lib/video-progress.ts lib/video-progress.test.ts
git commit -m "feat: add scroll film progress mapping"
```

### Task 2: Web Delivery Media

**Files:**
- Create: `public/video/endlls-scroll-film.mp4`
- Create: `public/video/endlls-scroll-film-poster.jpg`
- Create: `public/video/endlls-scroll-film-final.jpg`

**Interfaces:**
- Consumes: `/Users/yojan/Downloads/text_rising_between_mountains_51724_Kling_30_.mp4`.
- Produces: stable public URLs `/video/endlls-scroll-film.mp4`, `/video/endlls-scroll-film-poster.jpg`, and `/video/endlls-scroll-film-final.jpg`.

- [ ] **Step 1: Record the source media baseline**

Run:

```bash
ffprobe -v error -show_entries format=duration,size,bit_rate:stream=codec_name,codec_type,width,height,r_frame_rate,pix_fmt -of json /Users/yojan/Downloads/text_rising_between_mountains_51724_Kling_30_.mp4
```

Expected: approximately `5.04s`, `1916x1080`, `24fps`, H.264 video, AAC audio, and `11.1MB`.

- [ ] **Step 2: Create the optimized silent fast-start MP4**

Create `public/video/`, then transcode with H.264, CRF 24, slow preset, YUV 4:2:0, 24 fps, no audio, and `+faststart`. Preserve the source dimensions.

- [ ] **Step 3: Extract opening and final posters**

Extract one high-quality JPEG from time `0` and one from `-0.08s` relative to the end. Preserve source dimensions and use descriptive stable filenames.

- [ ] **Step 4: Validate the derivatives**

Run `ffprobe` against the delivery MP4 and `file` against all three assets.

Expected: one H.264 video stream, no audio stream, 24 fps, finite duration, browser-safe pixel format, both JPEGs at source dimensions, and MP4 size materially below `11.1MB`.

- [ ] **Step 5: Commit**

```bash
git add public/video/endlls-scroll-film.mp4 public/video/endlls-scroll-film-poster.jpg public/video/endlls-scroll-film-final.jpg
git commit -m "feat: add optimized scroll film media"
```

### Task 3: Cinematic Homepage Contract

**Files:**
- Create: `components/scroll-film-hero.test.tsx`
- Create: `components/scroll-film-hero.tsx`
- Modify: `app/page.tsx`
- Modify: `package.json`
- Modify: `package-lock.json`

**Interfaces:**
- Consumes: media URLs from Task 2 and helpers from Task 1.
- Produces: `ScrollFilmHero(): JSX.Element`, the only homepage content rendered by `HomePage()`.

- [ ] **Step 1: Install the required animation dependency**

Run: `npm install gsap`

Expected: `gsap` appears under `dependencies` and the lockfile updates.

- [ ] **Step 2: Write the failing component contract tests**

Render `HomePage` and assert:

- Exactly one `<video>` exists.
- Its `poster` is `/video/endlls-scroll-film-poster.jpg`.
- It is muted and has `playsInline`.
- It contains an MP4 source at `/video/endlls-scroll-film.mp4`.
- **See Work** links to `/work`.
- **Start a Project** links to `/contact`.
- The previous header, selected-work heading, and homepage footer are absent.

Mock only browser capabilities unavailable in jsdom (`matchMedia`, media readiness, and GSAP lifecycle); assertions must remain against the real rendered component.

- [ ] **Step 3: Run the component test and verify RED**

Run: `npm test -- --run components/scroll-film-hero.test.tsx`

Expected: FAIL because the V2 component does not exist and the old homepage content remains.

- [ ] **Step 4: Implement the minimal server-visible component structure**

Create a client component with:

- Root class `scroll-film`
- Scroll runway class `scroll-film__runway`
- Pinned stage class `scroll-film__stage`
- Poster-backed muted `playsInline` video
- Dark veil class `scroll-film__veil`
- CTA group class `scroll-film__actions`
- Exact link labels and destinations
- A discrete fallback class that can make the actions immediately visible

Replace `app/page.tsx` with a server component that renders only `<ScrollFilmHero />`.

- [ ] **Step 5: Run the component test and verify GREEN**

Run: `npm test -- --run components/scroll-film-hero.test.tsx`

Expected: all component contract tests PASS.

- [ ] **Step 6: Run the full suite**

Run: `npm test -- --run`

Expected: existing route, content, filter, contact, and new V2 tests PASS. Update only the prior homepage assertion that is intentionally superseded by the approved V2 design.

- [ ] **Step 7: Commit**

```bash
git add package.json package-lock.json app/page.tsx components/scroll-film-hero.tsx components/scroll-film-hero.test.tsx components/site-shell.test.tsx
git commit -m "feat: establish cinematic V2 homepage"
```

### Task 4: ScrollTrigger Playback and Fallback Lifecycle

**Files:**
- Modify: `components/scroll-film-hero.tsx`
- Modify: `components/scroll-film-hero.test.tsx`

**Interfaces:**
- Consumes: `progressToTime()` and `isCtaProgress()` from Task 1.
- Produces: bidirectional scroll-linked seeking, end-state CTA transition, clean teardown, and static fallback activation.

- [ ] **Step 1: Add failing lifecycle tests**

Cover these cases with specific browser-capability fakes:

- Reduced motion creates no ScrollTrigger and exposes the actions.
- Finite metadata initializes the trigger even when `readyState >= 1` before mount.
- Invalid duration activates fallback rather than assigning `currentTime`.
- Unmount kills the trigger, removes metadata/error listeners, and cancels pending animation-frame work.

- [ ] **Step 2: Run the lifecycle tests and verify RED**

Run: `npm test -- --run components/scroll-film-hero.test.tsx`

Expected: FAIL on the new lifecycle assertions.

- [ ] **Step 3: Register ScrollTrigger inside the client leaf**

Import `gsap`, `ScrollTrigger`, and Task 1 helpers. Register the plugin once in the client module. In the component effect, use `gsap.context()` and create one trigger with:

- `trigger`: runway ref
- `start`: `top top`
- `end`: `bottom bottom`
- `scrub`: a small smoothing value between `0.1` and `0.2`
- `pin`: stage ref
- `pinSpacing`: `false`, because the runway already provides the scroll distance
- `invalidateOnRefresh`: `true`

Update `video.currentTime` through one scheduled animation-frame write per progress update. Drive veil and actions through the same progress threshold without continuous React state.

- [ ] **Step 4: Add readiness, failure, and reduced-motion branches**

Initialize immediately for `readyState >= 1`; otherwise listen once for `loadedmetadata`. Listen for media errors, validate duration before seeking, and activate the static final-frame fallback when initialization cannot succeed. Reduced motion skips GSAP entirely.

- [ ] **Step 5: Implement complete cleanup**

On unmount, cancel the pending animation frame, remove media listeners, kill the created trigger/timeline, and revert the GSAP context.

- [ ] **Step 6: Run the lifecycle and full test suites**

Run:

```bash
npm test -- --run components/scroll-film-hero.test.tsx
npm test -- --run
```

Expected: all tests PASS with no jsdom warnings or unhandled exceptions.

- [ ] **Step 7: Commit**

```bash
git add components/scroll-film-hero.tsx components/scroll-film-hero.test.tsx
git commit -m "feat: scrub hero film with scroll progress"
```

### Task 5: Fullscreen Visual System

**Files:**
- Modify: `app/globals.css`
- Modify: `components/scroll-film-hero.tsx`

**Interfaces:**
- Consumes: the class contract from Task 3 and fallback state from Task 4.
- Produces: a responsive `500dvh` runway, `100dvh` pinned stage, full-bleed cover video, final veil, and accessible action styling.

- [ ] **Step 1: Capture a failing browser baseline**

Run the dev server and inspect `/` at desktop landscape and mobile portrait sizes.

Expected before styling: the video is not a stable fullscreen pinned canvas and the final action state lacks the approved composition.

- [ ] **Step 2: Implement the layer and viewport CSS**

Add isolated V2 styles:

- Runway height `500dvh`
- Stage height and min-height `100dvh`, width `100vw`, overflow hidden
- Video and fallback image absolute inset `0`, width and height `100%`, `object-fit: cover`, centered focal point
- Veil absolute inset `0`, starting transparent, with a restrained near-black fill
- Actions above the veil, centered near the lower third, hidden through `visibility`, `opacity`, and pointer-event rules until the end state
- One filled light action and one high-contrast bordered action, both sharp-edged and one line
- Visible focus states and touch targets at least 44px high

- [ ] **Step 3: Add explicit mobile and fallback rules**

At widths below `768px`, stack actions only if both labels remain comfortably readable; otherwise keep a compact two-column group. For reduced motion and component fallback classes, collapse the runway to `100dvh`, show the final poster, and expose the actions immediately.

- [ ] **Step 4: Inspect desktop, mobile, and reduced-motion states**

Verify that the initial viewport contains only video, the video covers without letterboxing, the CTAs do not appear early, final actions fit without wrapping, and reduced motion is immediately actionable.

- [ ] **Step 5: Commit**

```bash
git add app/globals.css components/scroll-film-hero.tsx
git commit -m "feat: style fullscreen scroll film experience"
```

### Task 6: Production Verification and Performance Review

**Files:**
- Modify only files required by demonstrated defects.
- Test modified behavior in the nearest existing `*.test.ts` or `*.test.tsx` file before each fix.

**Interfaces:**
- Consumes: the complete V2 experience from Tasks 1-5.
- Produces: a verified production build with documented browser behavior and no demonstrated regressions.

- [ ] **Step 1: Run static verification**

Run:

```bash
npm test -- --run
npm run build
git diff --check
```

Expected: zero failed tests, successful static export, and no whitespace errors.

- [ ] **Step 2: Start a fresh production preview**

Serve the exported `out/` directory on an available local port. Do not run the production build while a Next.js development server is active because both write `.next` and can invalidate the development manifest.

- [ ] **Step 3: Verify scroll behavior in the browser**

At desktop size, verify initial, midpoint, final, and reverse-scroll states. Confirm the final CTA links reach `/work` and `/contact`, and that returning to `/` recreates one clean trigger.

- [ ] **Step 4: Verify responsive and accessibility behavior**

At mobile portrait size and with reduced motion enabled, verify cover crop, dynamic viewport stability, static fallback, immediate CTA access, keyboard focus, and one-line labels.

- [ ] **Step 5: Inspect performance evidence**

Confirm optimized MP4 size and stream metadata with `ffprobe`. Run Lighthouse when available and record LCP, CLS, and interaction observations; fix only demonstrated bottlenecks within this feature's scope.

- [ ] **Step 6: Request whole-branch review**

Review the branch against the spec, with emphasis on cleanup, fallback behavior, scroll reversibility, and existing route preservation. Resolve findings with one failing regression test per behavioral defect.

- [ ] **Step 7: Commit verified fixes, if any**

Run `git status --short`, stage only the files changed to resolve Step 6 findings, and commit them with message `fix: polish V2 scroll film experience`.

If no defects are found, do not create an empty commit.
