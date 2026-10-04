import { describe, expect, it } from "vitest";
import { aspectsMatch, groupByAspect, parseCaseStudy, type StudyImage } from "./case-study";

function image(src: string, width: number, height: number): StudyImage {
  return { src, alt: src, width, height, ratio: width / height };
}

describe("case study aspect groups", () => {
  it("keeps_landscape_frames_together_and_splits_portraits", () => {
    const groups = groupByAspect([
      image("/a.webp", 1080, 608),
      image("/b.webp", 1080, 608),
      image("/c.webp", 1080, 608),
      image("/phone.webp", 554, 1200),
      image("/flyer.webp", 1200, 1553),
    ]);

    expect(groups.map((group) => group.images.map((item) => item.src))).toEqual([
      ["/a.webp", "/b.webp", "/c.webp"],
      ["/phone.webp"],
      ["/flyer.webp"],
    ]);
    expect(aspectsMatch(1200 / 630, 1080 / 608)).toBe(false);
    expect(aspectsMatch(736 / 1600, 554 / 1200)).toBe(true);
  });

  it("turns_a_following_quote_into_one_ink_band", () => {
    const sections = parseCaseStudy(`
      <h2>Status · Project paused</h2>
      <blockquote><p>Place. Time. Skill. Then talk.</p></blockquote>
      <p>The project is currently paused. There are no launch metrics to report.</p>
    `);

    expect(sections).toHaveLength(1);
    expect(sections[0]).toMatchObject({
      ink: true,
      title: "Status · Project paused",
      quote: "Place. Time. Skill. Then talk.",
    });
    expect(sections[0]?.bodyHtml).toMatch(/no launch metrics/);
  });
});
