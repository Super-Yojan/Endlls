# Endlls V2 Scroll Film Design

## Goal

Replace the current homepage with a cinematic, fullscreen landing experience that uses the supplied five-second mountain film as the entire visual canvas. Vertical scroll position controls video playback in both directions. The only interface revealed during the sequence is a pair of conversion actions at the end: **See Work** and **Start a Project**.

The existing `/work`, `/about`, `/contact`, and case-study routes remain unchanged. This redesign applies only to `/`.

## Design Direction

Reading this as a creative-studio landing page for prospective clients, with an immersive cinematic language and almost no interface chrome.

- Design variance: 8/10
- Motion intensity: 9/10
- Visual density: 1/10
- Theme: full-bleed video with a restrained dark end-state veil
- Shape system: sharp editorial edges; no cards or decorative containers
- Typography: existing Goldman and Graphik brand system, used only for the final actions

## Source Asset

Input:

`/Users/yojan/Downloads/text_rising_between_mountains_51724_Kling_30_.mp4`

Observed properties:

- Duration: 5.04 seconds
- Dimensions: 1916 × 1080
- Frame rate: 24 fps
- Video codec: H.264
- Audio codec: AAC
- Source bitrate: approximately 17.7 Mbps
- Source size: approximately 11.1 MB

The source will remain untouched. A web-specific derivative will be created under `public/video/`.

## Homepage Experience

### Scroll Structure

The homepage consists of a single scroll scene:

- A scroll runway of approximately `500dvh` provides enough physical distance for precise scrubbing.
- A `100dvh × 100vw` stage remains pinned to the viewport while the runway scrolls.
- The video fills the stage using `object-fit: cover` and is centered.
- There is no navigation, headline, narrative card, footer, progress meter, or scroll instruction on the homepage.
- The page ends with the video still pinned on its final frame and the two actions visible.

### Video Scrubbing

GSAP ScrollTrigger will own the scroll lifecycle. The interactive code lives in a dedicated client component so the rest of the Next.js page stays server-rendered.

After video metadata is available:

1. Read the exact video duration.
2. Normalize ScrollTrigger progress to the range `0...1`.
3. Map progress to video time using `progress × duration`.
4. Seek toward the mapped time on animation frames, allowing forward and reverse scroll.
5. Clamp all values to prevent invalid seeks.

The video stays muted and uses `playsInline`. It does not autoplay during desktop scrubbing.

### Final CTA State

During the final 10% of scroll progress:

- A subtle dark veil fades over the video to guarantee contrast.
- A compact CTA group fades and rises into view.
- **See Work** links to `/work`.
- **Start a Project** links to `/contact`.
- Button labels remain on one line and meet WCAG AA contrast.
- The final video frame remains visible behind the actions.

Scrolling upward reverses both the CTA transition and the video.

## Loading and Performance

The source video will be transcoded to a delivery asset with:

- H.264 video
- Removed audio track
- YUV 4:2:0 pixel format
- Fast-start metadata (`moov` atom first)
- A substantially reduced bitrate appropriate for a fullscreen 1080p web background
- The original aspect ratio and frame rate preserved unless testing shows a smaller mobile derivative is necessary

A poster image extracted from the opening frame reserves the visual state while metadata loads. The video uses `preload="metadata"` initially. Loading state uses the poster rather than a spinner.

The implementation must avoid React state updates on every scroll tick. Scroll progress and video seeking remain imperative inside the isolated client component.

## Responsive Behavior

### Desktop and Capable Mobile Browsers

- Use the same bidirectional scroll-scrub interaction.
- Use `100dvh` rather than `100vh` to avoid mobile browser chrome jumps.
- Preserve cover cropping and keep the cinematic center of interest visible across common aspect ratios.

### Reduced Motion and Constrained Playback

When `prefers-reduced-motion: reduce` is active, or when media seeking cannot initialize:

- Do not create the long scrub runway.
- Show a stable poster or final-frame image at `100dvh`.
- Show both actions immediately.
- Preserve full keyboard access and visible focus styles.

If JavaScript fails, the poster and accessible links remain present in the server-rendered markup.

## Component Boundaries

### `app/page.tsx`

The server page becomes a minimal shell that renders the cinematic homepage component and its two route destinations.

### `components/scroll-film-hero.tsx`

A client-only leaf responsible for:

- Video and poster rendering
- GSAP and ScrollTrigger setup
- Metadata readiness
- Progress-to-time seeking
- CTA progress state
- Cleanup on unmount
- Reduced-motion and initialization fallback behavior

### `lib/video-progress.ts`

Pure helpers for clamping progress and mapping normalized scroll progress to playback time. Keeping this logic separate makes the core behavior deterministic and unit-testable.

### Styling

The project will retain its current CSS architecture rather than introducing Tailwind solely for one page. V2-specific classes will be isolated in the existing global stylesheet with a small, documented layer order:

1. Poster/video
2. End-state veil
3. CTA actions

## Accessibility

- The decorative video is muted and marked appropriately so it does not compete with assistive technology.
- CTA links use descriptive visible labels and preserve existing routes.
- Focus indicators remain clearly visible over the darkened final frame.
- Reduced-motion users receive a static, immediately actionable experience.
- No scroll hijacking prevents normal keyboard, touch, or browser scrolling.

## Error Handling

- If metadata cannot load, keep the poster visible and expose the CTAs.
- If seeking throws or returns a non-finite duration, stop attempting to scrub and use the fallback state.
- Cleanup removes ScrollTrigger instances and animation-frame work to avoid stale behavior during Fast Refresh or route changes.

## Testing

Automated tests will cover:

- Progress values below 0 and above 1 are clamped.
- `0`, midpoint, and `1` map to the correct video times.
- The homepage renders one video, the poster fallback, and both final actions.
- CTA destinations remain `/work` and `/contact`.
- Reduced-motion mode exposes the actions without requiring scroll.

Manual browser verification will cover:

- Smooth forward and backward scrubbing.
- CTA reveal only during the final 10%.
- Final frame and buttons remain visible at the bottom of the page.
- Mobile portrait and desktop landscape cropping.
- Keyboard focus and contrast.
- No runtime errors after navigation or Fast Refresh.
- No unexpected audio playback.

Performance verification will include production build output, asset size inspection, and a Lighthouse pass when the local environment supports it.

## Success Criteria

- The homepage initially shows only fullscreen video content.
- Vertical scroll deterministically controls the full video timeline in both directions.
- The video remains pinned and fills the dynamic viewport throughout the sequence.
- Only **See Work** and **Start a Project** appear at the end.
- The final frame remains behind the CTA state.
- Existing portfolio and contact routes continue to work.
- Mobile and reduced-motion fallbacks remain usable without scroll-linked playback.
- The optimized asset loads materially faster than the supplied source.
