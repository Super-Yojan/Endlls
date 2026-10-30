import { render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import AboutPage from "@/app/about/page";
import ContactPage from "@/app/contact/page";
import HomePage from "@/app/page";

// The motion layer measures layout, which jsdom cannot do.
vi.mock("@/components/site-motion", () => ({ SiteMotion: () => null }));

describe("shared site shell", () => {
  it("renders_the_studio_homepage", () => {
    render(<HomePage />);

    expect(screen.getByRole("heading", { level: 1, name: "Endlls" })).toBeInTheDocument();
    const navigation = screen.getByRole("navigation", { name: "Primary" });
    for (const [name, href] of [
      ["Work", "#work"],
      ["Services", "#services"],
      ["About", "/about/"],
      ["Contact", "#talk"],
    ]) {
      expect(within(navigation).getByRole("link", { name })).toHaveAttribute("href", href);
    }
    expect(screen.getByRole("link", { name: "Glid" })).toHaveAttribute("href", "/work/glid");
    expect(screen.getByRole("link", { name: "Tender Hearts" })).toHaveAttribute("href", "/work/pkp-web");
    expect(screen.getByRole("link", { name: "yojan@endlls.com" })).toHaveAttribute(
      "href",
      "mailto:yojan@endlls.com",
    );
  });

  it("links_inner_pages_back_to_the_site_and_marks_the_current_page", () => {
    render(<AboutPage />);

    const navigation = screen.getByRole("navigation", { name: "Primary" });
    expect(within(navigation).getByRole("link", { name: "Work" })).toHaveAttribute("href", "/work/");
    expect(within(navigation).getByRole("link", { name: "Services" })).toHaveAttribute("href", "/#services");
    expect(within(navigation).getByRole("link", { name: "About" })).toHaveAttribute("aria-current", "page");
    expect(screen.getByRole("link", { name: "Endlls home" })).toHaveAttribute("href", "/");
    expect(screen.getByRole("link", { name: /Start a project/ })).toHaveAttribute("href", "/contact/");
  });

  it("makes_the_contact_page_one_screen_with_the_form", () => {
    render(<ContactPage />);

    expect(screen.getByRole("heading", { level: 1, name: "Let's talk" })).toBeInTheDocument();
    expect(screen.getByRole("form", { name: "Project inquiry" })).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /Start a project/ })).not.toBeInTheDocument();
  });
});
