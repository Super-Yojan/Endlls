import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import HomePage from "@/app/page";
import { SiteHeader } from "./site-header";

describe("shared site shell", () => {
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
    render(<SiteHeader />);
    const button = screen.getByRole("button", { name: "Open menu" });

    expect(button).toHaveAttribute("aria-expanded", "false");
    fireEvent.click(button);
    expect(screen.getByRole("button", { name: "Close menu" })).toHaveAttribute(
      "aria-expanded",
      "true",
    );
  });

  it("renders_the_tagline_and_featured_projects_in_source_order", () => {
    render(<HomePage />);

    expect(screen.getByRole("heading", { name: "Creativity Never Ends" })).toBeInTheDocument();
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
