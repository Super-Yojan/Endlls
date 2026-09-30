import { fireEvent, render, screen } from "@testing-library/react";
import { beforeAll, describe, expect, it } from "vitest";
import { CaseStudyBody } from "@/components/case-study-body";
import type { Project } from "@/types/project";

const project = {
  title: "Glid",
  slug: "glid",
  year: 2026,
  client: "Glid",
  services: ["Product engineering"],
  summary: "A session-first product.",
  cover: "/images/projects/glid/cover.webp",
  coverAlt: "Phone mockup",
  featured: true,
  order: 2,
  gallery: ["/images/projects/glid/app-home.webp"],
  carousel: [
    { src: "/videos/projects/glid/glid-intro-v4.mp4", alt: "Product intro" },
    { src: "/videos/projects/glid/glid-intro-reels.mp4", alt: "Short reel" },
    { src: "/images/projects/glid/app-home.webp", alt: "Home screen" },
  ],
  credits: [],
  color: null,
  contentHtml:
    "<h2>Social &amp; motion</h2><p>No view counts.</p><p>{{carousel}}</p><h2>Honest status</h2><p>Currently paused.</p>",
} satisfies Project;

beforeAll(() => {
  HTMLMediaElement.prototype.pause = () => {};
});

describe("glid case study carousel", () => {
  it("opens_on_the_intro_and_steps_with_controls_and_keys", () => {
    render(<CaseStudyBody project={project} />);

    const carousel = screen.getByRole("region", { name: "Glid films and stills" });
    expect(screen.getByText("Product intro")).toBeInTheDocument();
    expect(screen.getByText("1 / 3")).toBeInTheDocument();
    expect(screen.getByLabelText("Product intro").tagName).toBe("VIDEO");
    expect(screen.getByLabelText("Product intro")).toHaveAttribute("playsinline");
    expect(screen.getByLabelText("Product intro")).toHaveAttribute("preload", "metadata");
    expect(screen.queryByRole("img", { name: "Home screen" })).not.toBeInTheDocument();
    expect(screen.queryByText("{{carousel}}")).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Previous" })).toBeDisabled();

    fireEvent.click(screen.getByRole("button", { name: "Next" }));
    expect(screen.getByText("Short reel")).toBeInTheDocument();
    expect(screen.getByText("2 / 3")).toBeInTheDocument();

    fireEvent.keyDown(carousel, { key: "ArrowRight" });
    expect(screen.getByRole("img", { name: "Home screen" })).toHaveAttribute(
      "src",
      "/images/projects/glid/app-home.webp",
    );
    expect(screen.getByRole("button", { name: "Next" })).toBeDisabled();

    fireEvent.click(screen.getByRole("button", { name: "Show Product intro" }));
    expect(screen.getByText("Product intro")).toBeInTheDocument();
    expect(screen.getByText("1 / 3")).toBeInTheDocument();
  });
});
