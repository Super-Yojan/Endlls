import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import HomePage from "@/app/page";
import { SiteHeader } from "./site-header";

describe("shared site shell", () => {
  it("pairs_the_compact_symbol_with_the_studio_name", () => {
    render(<SiteHeader />);

    const brand = screen.getByRole("link", { name: "Endlls Studio home" });
    expect(within(brand).getByText("ENDLLS")).toBeInTheDocument();
  });

  it("exposes_the_primary_navigation", () => {
    render(<SiteHeader />);

    const navigation = screen.getByRole("navigation", { name: "Primary" });
    expect(within(navigation).getByRole("link", { name: "Work" })).toHaveAttribute(
      "href",
      "/work",
    );
    expect(within(navigation).getByRole("link", { name: "About" })).toHaveAttribute(
      "href",
      "/about",
    );
    expect(within(navigation).getByRole("link", { name: "Contact" })).toHaveAttribute(
      "href",
      "/contact",
    );
  });

  it("opens_and_closes_the_mobile_navigation", () => {
    const { container } = render(<SiteHeader />);
    const button = screen.getByRole("button", { name: "Open menu" });
    const closedNavigation = container.querySelector("#mobile-navigation");

    expect(button).toHaveAttribute("aria-expanded", "false");
    expect(closedNavigation).toHaveAttribute("hidden");
    fireEvent.click(button);
    const closeButton = screen.getByRole("button", { name: "Close menu" });
    expect(closeButton).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByRole("navigation", { name: "Mobile navigation" })).not.toHaveAttribute(
      "hidden",
    );
    expect(
      screen.getByRole("navigation", { name: "Mobile navigation" }).getElementsByTagName("a")[0],
    ).toHaveFocus();

    fireEvent.keyDown(screen.getByRole("navigation", { name: "Mobile navigation" }), {
      key: "Escape",
    });
    expect(closeButton).toHaveFocus();
    expect(container.querySelector("#mobile-navigation")).toHaveAttribute("hidden");
  });

  it("renders_the_tagline_and_featured_projects_in_source_order", () => {
    render(<HomePage />);

    const heroHeading = screen.getByRole("heading", { name: "Creativity Never Ends" });
    expect(heroHeading).toBeInTheDocument();
    const hero = heroHeading.closest("section");
    expect(hero?.querySelectorAll("img")).toHaveLength(1);
    expect(within(hero as HTMLElement).getByAltText("Misty mountain panorama at dawn")).toBeInTheDocument();
    const work = screen.getByLabelText("Selected work");
    const projectHeadings = within(work).getAllByRole("heading", { level: 3 });
    expect(projectHeadings.map((heading) => heading.textContent)).toEqual([
      "Aster House",
      "Kinfield Editions",
      "Nocturne Radio",
    ]);
    expect(
      within(work).getByAltText("Warm ivory stationery for the fictional Aster House identity"),
    ).toBeInTheDocument();
  });
});
