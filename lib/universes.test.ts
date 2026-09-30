import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { getProjectBySlug } from "./projects";
import { heroParallaxProducts, universeProducts } from "./universes";

const designSlugs = [
  "pkp-web",
  "glid",
  "aster-house",
  "kinfield-editions",
  "nocturne-radio",
  "common-ground",
] as const;

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
] as const;

describe("endlls universes", () => {
  it("publishes_only_design_studies_for_the_homepage", () => {
    expect(universeProducts.map((universe) => universe.slug)).toEqual([...designSlugs]);
    expect(heroParallaxProducts().map((product) => product.category)).not.toContain("Knowledge");
    expect(heroParallaxProducts().every((product) => !("kind" in product))).toBe(true);
  });

  it("links_each_study_to_a_real_work_route_and_local_plate", () => {
    for (const universe of universeProducts) {
      const project = getProjectBySlug(universe.slug);
      expect(project?.title).toBe(universe.title);
      expect(project?.cover).toBe(universe.thumbnail);
      expect(project?.services.some((service) => /engineering|flight|silicon|security/i.test(service))).toBe(
        false,
      );
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

  it("shows_the_real_pkp_posters_and_dtfest_frames", () => {
    const project = getProjectBySlug("pkp-web");
    const images = [
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
