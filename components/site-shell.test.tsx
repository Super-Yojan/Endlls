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

  it("renders_the_tagline_and_universe_parallax", () => {
    render(<HomePage />);

    expect(screen.getByRole("heading", { name: "Creativity Never Ends" })).toBeInTheDocument();
    expect(screen.getByText(/engineering multiverse/i)).toBeInTheDocument();
    const showcase = screen.getByRole("region", { name: "Endlls universes" });
    const universes = [
      ["PKP Web", "/work/pkp-web"],
      ["PKP Field", "/work/pkp-field"],
      ["Glid", "/work/glid"],
      ["Blimp Autonomy", "/work/blimp-autonomy"],
      ["Drone Delivery", "/work/drone-delivery"],
      ["Freedom CTF", "/work/freedom-ctf"],
      ["Silicon / MIPS", "/work/silicon-mips"],
      ["Motor Dynamics", "/work/motor-dynamics"],
      ["Avionics", "/work/avionics"],
      ["Ground Control", "/work/ground-control"],
      ["Perception", "/work/perception"],
      ["Radio Mesh", "/work/radio-mesh"],
      ["Power Systems", "/work/power-systems"],
      ["Mission Planner", "/work/mission-planner"],
      ["Endlls Atlas", "/work/endlls-atlas"],
    ] as const;

    expect(within(showcase).getAllByRole("link", { name: /Universe/ })).toHaveLength(15);
    for (const [title, href] of universes) {
      expect(within(showcase).getByRole("link", { name: new RegExp(title) })).toHaveAttribute(
        "href",
        href,
      );
    }
  });
});
