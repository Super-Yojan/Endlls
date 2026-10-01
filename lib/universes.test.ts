import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { aspectsMatch, parseCaseStudy, studyOrientation } from "./case-study";
import { publicImageSize } from "./image-size";
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
      "/images/projects/glid/intro-v4-hero.webp",
      "/images/projects/glid/intro-v4-mid.webp",
      "/images/projects/glid/intro-v4-court.webp",
      "/images/projects/glid/intro-v4-alt.webp",
      "/images/projects/glid/mockup-home.webp",
      "/images/projects/glid/app-home.webp",
      "/images/projects/glid/app-explore.webp",
      "/images/projects/glid/app-event.webp",
      "/images/projects/glid/mockup-screen2.webp",
      "/images/projects/glid/website-home.webp",
      "/images/projects/glid/website-hero.webp",
      "/images/projects/glid/flyer-tennis.webp",
      "/images/projects/glid/og-image.webp",
    ];

    expect(glid).toMatchObject({
      year: 2026,
      thumbnail: "/images/projects/glid/intro-v4-hero.webp",
      services: ["Product engineering", "Digital experience", "Brand identity", "Campaign"],
      summary: project?.summary,
    });
    expect(project?.summary).toMatch(/Endlls Studios built Glid from the ground up/);
    expect(project?.summary).not.toMatch(/sailplane|quiet vehicle|identity only/i);
    expect(project?.cover).toBe("/images/projects/glid/intro-v4-hero.webp");
    expect(project?.credits).toEqual([
      "Product & engineering — Endlls Studios",
      "App design — Endlls Studios",
      "Website — Endlls Studios",
      "Marketing, social & posters — Endlls Studios",
    ]);
    expect(project?.contentHtml).toMatch(/currently paused/);
    expect(project?.contentHtml).toMatch(/no launch metrics/);
    expect(project?.contentHtml).not.toMatch(/Enlist Studios/);
    expect(project?.contentHtml).not.toMatch(/view counts to report[\s\S]*\d[\d,]*\s*(views|plays)/i);
    expect(project?.gallery).toEqual(images.slice(1));

    const cover = publicImageSize(project?.cover ?? "");
    expect(cover && cover.width > cover.height).toBe(true);
    expect(studyOrientation((cover?.width ?? 0) / (cover?.height ?? 1))).toBe("landscape");

    const sections = parseCaseStudy(project?.contentHtml ?? "");
    for (const section of sections) {
      for (const group of section.imageGroups) {
        const ratios = group.images.map((image) => image.ratio);
        expect(ratios.every((ratio) => aspectsMatch(ratio, group.ratio))).toBe(true);
        const orientations = new Set(ratios.map((ratio) => studyOrientation(ratio)));
        expect(orientations.size).toBe(1);
      }
      const hasLandscape = section.videos.some((video) => video.wide);
      const hasPortrait = section.videos.some((video) => !video.wide);
      if (hasLandscape && hasPortrait) {
        const firstPortrait = section.videos.findIndex((video) => !video.wide);
        const landscapeAfterPortrait = section.videos.slice(firstPortrait).some((video) => video.wide);
        expect(landscapeAfterPortrait).toBe(false);
      }
    }

    for (const image of images) {
      expect(fs.existsSync(path.join(process.cwd(), "public", image)), image).toBe(true);
    }
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
