import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import HomePage from "@/app/page";

describe("V2 cinematic homepage", () => {
  it("renders_only_the_scroll_film_and_final_actions", () => {
    const { container } = render(<HomePage />);

    const videos = container.querySelectorAll("video");
    expect(videos).toHaveLength(1);
    expect(videos[0]).toHaveAttribute("poster", "/video/endlls-scroll-film-poster.jpg");
    expect(videos[0].muted).toBe(true);
    expect(videos[0]).toHaveAttribute("playsinline");
    expect(videos[0].querySelector('source[type="video/mp4"]')).toHaveAttribute(
      "src",
      "/video/endlls-scroll-film.mp4",
    );

    expect(screen.getByRole("link", { name: "See Work" })).toHaveAttribute("href", "/work");
    expect(screen.getByRole("link", { name: "Start a Project" })).toHaveAttribute(
      "href",
      "/contact",
    );
    expect(screen.queryByRole("banner")).not.toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "Selected Work" })).not.toBeInTheDocument();
    expect(screen.queryByRole("contentinfo")).not.toBeInTheDocument();
  });
});
