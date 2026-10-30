import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import HomePage from "@/app/page";
import { SiteHeader } from "./site-header";

vi.mock("next/font/google", () => ({ Anton: () => ({ variable: "font-anton" }) }));
// The motion layer measures layout, which jsdom cannot do.
vi.mock("@/components/home-motion", () => ({ HomeMotion: () => null }));

describe("shared site shell", () => {
  it("pairs_the_compact_symbol_with_the_studio_name", () => {
    render(<SiteHeader />);

    const brand = screen.getByRole("link", { name: "Endlls Studio home" });
    expect(within(brand).getByRole("img", { name: "Endlls" })).toHaveAttribute(
      "src",
      "/brand/logo.svg",
    );
    expect(within(brand).queryByText("endlls")).not.toBeInTheDocument();
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

  it("renders_the_studio_homepage", () => {
    render(<HomePage />);

    expect(screen.getByRole("heading", { level: 1, name: "Endlls" })).toBeInTheDocument();
    const navigation = screen.getByRole("navigation", { name: "Primary" });
    for (const [name, href] of [
      ["Work", "#work"],
      ["Services", "#services"],
      ["Process", "#how"],
      ["Contact", "#talk"],
    ]) {
      expect(within(navigation).getByRole("link", { name })).toHaveAttribute("href", href);
    }
    expect(screen.getByRole("link", { name: "Glid" })).toHaveAttribute("href", "/work/glid");
    expect(screen.getByRole("link", { name: "Tender Hearts" })).toHaveAttribute("href", "/work/pkp-web");
    expect(screen.getByRole("link", { name: "hello@endlls.studio" })).toHaveAttribute(
      "href",
      "mailto:hello@endlls.studio",
    );
  });
});
