import { act, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import HomePage from "@/app/page";

const animationMocks = vi.hoisted(() => ({
  cancelAnimationFrame: vi.fn(),
  contextRevert: vi.fn(),
  create: vi.fn(),
  kill: vi.fn(),
  refresh: vi.fn(),
  registerPlugin: vi.fn(),
  requestAnimationFrame: vi.fn(() => 42),
}));

vi.mock("gsap", () => ({
  default: {
    context: (setup: () => void) => {
      setup();
      return { revert: animationMocks.contextRevert };
    },
    registerPlugin: animationMocks.registerPlugin,
  },
}));

vi.mock("gsap/ScrollTrigger", () => ({
  ScrollTrigger: {
    create: animationMocks.create,
    refresh: animationMocks.refresh,
  },
}));

class ImmediateImage {
  onload: (() => void) | null = null;
  onerror: (() => void) | null = null;
  naturalWidth = 1920;
  naturalHeight = 1082;
  decoding = "auto";
  set src(_value: string) {
    queueMicrotask(() => this.onload?.());
  }
}

describe("V2 cinematic homepage", () => {
  beforeEach(() => {
    animationMocks.create.mockReset();
    animationMocks.kill.mockReset();
    animationMocks.refresh.mockReset();
    animationMocks.contextRevert.mockReset();
    animationMocks.requestAnimationFrame.mockClear();
    animationMocks.cancelAnimationFrame.mockClear();
    animationMocks.create.mockReturnValue({ kill: animationMocks.kill });
    vi.stubGlobal("requestAnimationFrame", animationMocks.requestAnimationFrame);
    vi.stubGlobal("cancelAnimationFrame", animationMocks.cancelAnimationFrame);
    vi.stubGlobal("Image", ImmediateImage);
    vi.stubGlobal(
      "matchMedia",
      vi.fn(() => ({ matches: false, addEventListener: vi.fn(), removeEventListener: vi.fn() })),
    );
    vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockReturnValue({
      drawImage: vi.fn(),
      imageSmoothingEnabled: true,
      imageSmoothingQuality: "high",
    } as unknown as CanvasRenderingContext2D);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it("renders_the_canvas_sequence_copy_and_final_actions", async () => {
    const { container } = render(<HomePage />);

    expect(container.querySelector("canvas")).toBeInTheDocument();
    expect(container.querySelector("video")).not.toBeInTheDocument();
    expect(container.querySelector(".scroll-film__fallback-image")).toHaveAttribute(
      "src",
      "/frames/frame_0217.jpg",
    );
    expect(screen.getByRole("heading", { name: "Look closer.", hidden: true })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Brand", hidden: true })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Digital", hidden: true })).toBeInTheDocument();
    expect(screen.getByRole("status")).toHaveTextContent("0%");
    expect(screen.getByRole("link", { name: "See Work" })).toHaveAttribute("href", "/work");
    expect(screen.getByRole("link", { name: "Start a Project" })).toHaveAttribute(
      "href",
      "/contact",
    );
    expect(screen.queryByRole("banner")).not.toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "Selected Work" })).not.toBeInTheDocument();
    expect(screen.queryByRole("contentinfo")).not.toBeInTheDocument();

    await waitFor(() => expect(animationMocks.create).toHaveBeenCalledTimes(1));
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
  });

  it("exposes_actions_without_creating_a_trigger_for_reduced_motion", () => {
    vi.stubGlobal(
      "matchMedia",
      vi.fn(() => ({ matches: true, addEventListener: vi.fn(), removeEventListener: vi.fn() })),
    );

    const { container } = render(<HomePage />);

    expect(container.querySelector(".scroll-film")).toHaveClass("scroll-film--fallback");
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
    expect(animationMocks.create).not.toHaveBeenCalled();
  });

  it("pins_the_stage_for_three_extra_viewports_after_preload", async () => {
    render(<HomePage />);

    await waitFor(() => expect(animationMocks.create).toHaveBeenCalledTimes(1));
    expect(animationMocks.create).toHaveBeenCalledWith(
      expect.objectContaining({
        start: "top top",
        end: "+=300%",
        pin: true,
        scrub: 0.15,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      }),
    );
  });

  it("falls_back_when_canvas_context_is_unavailable", async () => {
    vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockReturnValue(null);

    const { container } = render(<HomePage />);

    await waitFor(() =>
      expect(container.querySelector(".scroll-film")).toHaveClass("scroll-film--fallback"),
    );
    expect(animationMocks.create).not.toHaveBeenCalled();
  });

  it("cleans_up_trigger_listeners_and_pending_frame_on_unmount", async () => {
    const { unmount } = render(<HomePage />);

    await waitFor(() => expect(animationMocks.create).toHaveBeenCalledTimes(1));
    const triggerConfig = animationMocks.create.mock.calls[0][0];
    act(() => triggerConfig.onUpdate({ progress: 0.5 }));
    unmount();

    expect(animationMocks.kill).toHaveBeenCalledTimes(1);
    expect(animationMocks.contextRevert).toHaveBeenCalledTimes(1);
    expect(animationMocks.cancelAnimationFrame).toHaveBeenCalledWith(42);
  });
});
