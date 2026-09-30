import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { getProjectBySlug } from "./projects";
import { heroParallaxProducts, universeProducts } from "./universes";

describe("endlls universes", () => {
  it("publishes_fifteen_universes_for_the_parallax", () => {
    expect(universeProducts).toHaveLength(15);
    expect(heroParallaxProducts()).toHaveLength(15);
    expect(new Set(universeProducts.map((universe) => universe.slug)).size).toBe(15);
  });

  it("links_each_universe_to_a_real_work_route_and_local_plate", () => {
    for (const universe of universeProducts) {
      const project = getProjectBySlug(universe.slug);
      expect(project?.title).toBe(universe.title);
      expect(project?.cover).toBe(universe.thumbnail);
      expect(
        fs.existsSync(path.join(process.cwd(), "public", universe.thumbnail)),
      ).toBe(true);
      expect(heroParallaxProducts().find((product) => product.title === universe.title)).toMatchObject({
        link: `/work/${universe.slug}`,
        thumbnail: universe.thumbnail,
      });
    }
  });
});
