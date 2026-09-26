import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { getProjectBySlug } from "@/lib/projects";
import type { ProjectMeta } from "@/types/project";
import { WorkFilter } from "./work-filter";

const projects: ProjectMeta[] = [
  {
    title: "Aster House",
    slug: "aster-house",
    year: 2026,
    client: "Aster House",
    services: ["Brand identity", "Art direction"],
    summary: "A quiet identity.",
    cover: "/aster.png",
    coverAlt: "Aster",
    featured: true,
    order: 1,
    gallery: [],
    credits: [],
    color: null,
  },
  {
    title: "Nocturne Radio",
    slug: "nocturne-radio",
    year: 2025,
    client: "Nocturne",
    services: ["Campaign", "Art direction"],
    summary: "A listening campaign.",
    cover: "/nocturne.png",
    coverAlt: "Nocturne",
    featured: true,
    order: 2,
    gallery: [],
    credits: [],
    color: null,
  },
];

describe("work filter", () => {
  it("renders_each_category_once", () => {
    render(<WorkFilter projects={projects} />);

    expect(screen.getAllByRole("button", { name: "Art direction" })).toHaveLength(1);
    expect(screen.getByRole("button", { name: "Brand identity" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Campaign" })).toBeInTheDocument();
  });

  it("filters_with_keyboard_and_all_restores_every_project", () => {
    render(<WorkFilter projects={projects} />);
    const campaign = screen.getByRole("button", { name: "Campaign" });

    campaign.focus();
    fireEvent.keyDown(campaign, { key: "Enter", code: "Enter" });
    expect(screen.queryByRole("heading", { name: "Aster House" })).not.toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Nocturne Radio" })).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "All" }));
    expect(screen.getByRole("heading", { name: "Aster House" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Nocturne Radio" })).toBeInTheDocument();
  });

  it("maps_an_unknown_route_slug_to_null", () => {
    expect(getProjectBySlug("missing-project")).toBeNull();
  });
});
