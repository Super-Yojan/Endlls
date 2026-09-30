import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { getAllProjects, getProjectBySlug } from "./projects";
import { heroParallaxProducts, universeProducts } from "./universes";

const designSlugs = ["pkp-web", "glid", "pkp-brand"] as const;

const retiredSlugs = [
  "freedom-ctf",
  "silicon-mips",
  "endlls-atlas",
  "pkp-field",
  "blimp-autonomy",
  "drone-delivery",
  "motor-dynamics",
  "avionics",
  "ground-control",
  "perception",
  "radio-mesh",
  "power-systems",
  "mission-planner",
  "aster-house",
  "kinfield-editions",
  "nocturne-radio",
  "common-ground",
] as const;

describe("endlls universes", () => {
  it("publishes_only_design_studies_for_the_homepage", () => {
    expect(universeProducts.map((universe) => universe.slug)).toEqual([...designSlugs]);
    expect(getAllProjects().map((project) => project.slug)).toEqual([...designSlugs]);
    expect(heroParallaxProducts().map((product) => product.category)).not.toContain("Knowledge");
    expect(heroParallaxProducts().every((product) => !("kind" in product))).toBe(true);
  });

  it("links_each_study_to_a_real_work_route_and_local_plate", () => {
    for (const universe of universeProducts) {
      const project = getProjectBySlug(universe.slug);
      expect(project?.title).toBe(universe.title);
      expect(project?.cover).toBe(universe.thumbnail);
      expect(project?.services.some((service) => /flight|silicon|security/i.test(service))).toBe(false);
      expect(fs.existsSync(path.join(process.cwd(), "public", universe.thumbnail))).toBe(true);
      expect(heroParallaxProducts().find((product) => product.title === universe.title)).toMatchObject({
        link: `/work/${universe.slug}`,
        thumbnail: universe.thumbnail,
        category: universe.services[0],
      });
    }

    for (const slug of retiredSlugs) {
      expect(getProjectBySlug(slug)).toBeNull();
    }
  });

  it("credits_glid_as_a_paused_endlls_studios_build", () => {
    const glid = universeProducts.find((universe) => universe.slug === "glid");
    const project = getProjectBySlug("glid");
    const images = [
      "/images/projects/glid/cover.webp",
      "/images/projects/glid/app-home.webp",
      "/images/projects/glid/app-matches.webp",
      "/images/projects/glid/app-explore.webp",
      "/images/projects/glid/app-event.webp",
      "/images/projects/glid/mockup-home.webp",
      "/images/projects/glid/mockup-screen1.webp",
      "/images/projects/glid/website-home.webp",
      "/images/projects/glid/website-hero.webp",
      "/images/projects/glid/flyer-tennis.webp",
      "/images/projects/glid/og-image.webp",
    ];
    const videos = [
      "/videos/projects/glid/glid-intro-v4.mp4",
      "/videos/projects/glid/glid-intro-reels.mp4",
      "/videos/projects/glid/glid-court-availability.mp4",
      "/videos/projects/glid/glid-messaging.mp4",
    ];

    expect(glid).toMatchObject({
      year: 2026,
      thumbnail: "/images/projects/glid/cover.webp",
      services: ["Product engineering", "Digital experience", "Brand identity", "Campaign"],
      summary: project?.summary,
    });
    expect(project?.summary).toMatch(/Endlls Studios built Glid from the ground up/);
    expect(project?.summary).not.toMatch(/sailplane|quiet vehicle|identity only/i);
    expect(project?.credits).toEqual([
      "Product & engineering — Endlls Studios",
      "App design — Endlls Studios",
      "Website — Endlls Studios",
      "Marketing, social & posters — Endlls Studios",
    ]);
    expect(project?.cover).toBe("/images/projects/glid/cover.webp");
    expect(project?.coverAlt).toMatch(/Find Your Next Game/);
    expect(project?.contentHtml).toMatch(/currently paused/);
    expect(project?.contentHtml).toMatch(/no launch metrics/);
    expect(project?.contentHtml).toMatch(/no view counts/);
    expect(project?.contentHtml).not.toMatch(/Enlist Studios/);
    expect(project?.contentHtml).not.toMatch(/home-matches-explore|hero-join/);
    expect(project?.gallery).toEqual(images.slice(1));
    const html = project?.contentHtml ?? "";
    const videoPositions = videos.map((video) => html.indexOf(video));
    expect(videoPositions.every((position) => position >= 0)).toBe(true);
    expect(videoPositions).toEqual([...videoPositions].sort((a, b) => a - b));
    expect(html).toMatch(/<video controls playsinline preload="metadata" src="\/videos\/projects\/glid\/glid-intro-v4\.mp4"><\/video>/);
    for (const image of images) {
      expect(fs.existsSync(path.join(process.cwd(), "public", image)), image).toBe(true);
    }
    for (const video of videos) {
      expect(fs.existsSync(path.join(process.cwd(), "public", video)), video).toBe(true);
    }
    expect(fs.existsSync(path.join(process.cwd(), "public/images/projects/glid/home-matches-explore.webp"))).toBe(false);
    expect(fs.existsSync(path.join(process.cwd(), "public/images/projects/glid/hero-join.webp"))).toBe(false);
  });

  it("shows_the_real_pkp_posters_and_dtfest_frames", () => {
    const project = getProjectBySlug("pkp-web");
    const images = [
      "/images/projects/pkp-web/cover.webp",
      "/images/projects/pkp-web/home.webp",
      "/images/projects/pkp-web/events.webp",
      "/images/projects/pkp/dtfest-hero.webp",
      "/images/projects/pkp/candlelight.jpg",
      "/images/projects/pkp/instagram-candlelight.jpg",
      "/images/projects/pkp/blood-drive-2026.jpg",
      "/images/projects/pkp/know-your-rights.jpg",
      "/images/projects/pkp/september-13-event.jpg",
      "/images/projects/pkp/at-a-glance.jpg",
      "/images/projects/pkp/photo-event.jpg",
      "/images/projects/pkp/dtfest-gallery-01.webp",
      "/images/projects/pkp/dtfest-gallery-06.webp",
    ];

    expect(project?.cover).toBe("/images/projects/pkp/dtfest-hero.webp");
    expect(project?.gallery).toEqual([
      "/images/projects/pkp-web/cover.webp",
      "/images/projects/pkp-web/home.webp",
      "/images/projects/pkp-web/events.webp",
      "/images/projects/pkp/candlelight.jpg",
      "/images/projects/pkp/instagram-candlelight.jpg",
      "/images/projects/pkp/blood-drive-2026.jpg",
      "/images/projects/pkp/know-your-rights.jpg",
      "/images/projects/pkp/september-13-event.jpg",
      "/images/projects/pkp/at-a-glance.jpg",
      "/images/projects/pkp/photo-event.jpg",
      "/images/projects/pkp/dtfest-hero.webp",
      "/images/projects/pkp/dtfest-gallery-01.webp",
      "/images/projects/pkp/dtfest-gallery-06.webp",
    ]);
    for (const image of images) {
      expect(fs.existsSync(path.join(process.cwd(), "public", image)), image).toBe(true);
    }
  });
});
