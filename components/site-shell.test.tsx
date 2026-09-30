import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import HomePage from "@/app/page";
import { SiteHeader } from "./site-header";

describe("shared site shell", () => {
  it("pairs_the_compact_symbol_with_the_studio_name", () => {
    render(<SiteHeader />);

    const brand = screen.getByRole("link", { name: "Endlls Studio home" });
    expect(within(brand).getByText("endlls")).toBeInTheDocument();
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

  it("renders_the_editorial_universe_homepage", () => {
    render(<HomePage />);

    expect(screen.getByRole("heading", { name: "Creativity Never Ends" })).toBeInTheDocument();
    expect(screen.getByText(/design studio/i)).toBeInTheDocument();
    expect(screen.queryByText("Knowledge")).not.toBeInTheDocument();
    expect(screen.queryByText("Freedom CTF")).not.toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Enter" })).toHaveAttribute("href", "#selected-universes");
    const showcase = screen.getByRole("region", { name: "Selected universes" });
    const studies = [
      ["PKP Tender Hearts — Creative Engagement", "/work/pkp-web"],
      ["Glid", "/work/glid"],
      ["Aster House", "/work/aster-house"],
      ["Kinfield Editions", "/work/kinfield-editions"],
      ["Nocturne Radio", "/work/nocturne-radio"],
      ["Common Ground", "/work/common-ground"],
    ] as const;

    expect(within(showcase).getAllByRole("link")).toHaveLength(studies.length);
    for (const [title, href] of studies) {
      expect(within(showcase).getByRole("link", { name: new RegExp(title) })).toHaveAttribute(
        "href",
        href,
      );
    }
  });
});
