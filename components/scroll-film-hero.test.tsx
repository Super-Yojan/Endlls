import { act, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import HomePage from "@/app/page";

const animationMocks = vi.hoisted(() => ({
  cancelAnimationFrame: vi.fn(),
  contextRevert: vi.fn(),
  create: vi.fn(),
  kill: vi.fn(),
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
  ScrollTrigger: { create: animationMocks.create },
}));

const originalReadyState = Object.getOwnPropertyDescriptor(
  HTMLMediaElement.prototype,
  "readyState",
);
const originalDuration = Object.getOwnPropertyDescriptor(HTMLMediaElement.prototype, "duration");
const originalCurrentTime = Object.getOwnPropertyDescriptor(
  HTMLMediaElement.prototype,
  "currentTime",
);

function setMediaState(readyState: number, duration: number, setCurrentTime = vi.fn()) {
  Object.defineProperty(HTMLMediaElement.prototype, "readyState", {
    configurable: true,
    get: () => readyState,
  });
  Object.defineProperty(HTMLMediaElement.prototype, "duration", {
    configurable: true,
    get: () => duration,
  });
  Object.defineProperty(HTMLMediaElement.prototype, "currentTime", {
    configurable: true,
    get: () => 0,
    set: setCurrentTime,
  });
  return setCurrentTime;
}

describe("V2 cinematic homepage", () => {
  beforeEach(() => {
    animationMocks.create.mockReset();
    animationMocks.kill.mockReset();
    animationMocks.contextRevert.mockReset();
    animationMocks.requestAnimationFrame.mockClear();
    animationMocks.cancelAnimationFrame.mockClear();
    animationMocks.create.mockReturnValue({ kill: animationMocks.kill });
    vi.stubGlobal("requestAnimationFrame", animationMocks.requestAnimationFrame);
    vi.stubGlobal("cancelAnimationFrame", animationMocks.cancelAnimationFrame);
    vi.stubGlobal(
      "matchMedia",
      vi.fn(() => ({ matches: false, addEventListener: vi.fn(), removeEventListener: vi.fn() })),
    );
    setMediaState(1, 5.04);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    if (originalReadyState) {
      Object.defineProperty(HTMLMediaElement.prototype, "readyState", originalReadyState);
    }
    if (originalDuration) {
      Object.defineProperty(HTMLMediaElement.prototype, "duration", originalDuration);
    }
    if (originalCurrentTime) {
      Object.defineProperty(HTMLMediaElement.prototype, "currentTime", originalCurrentTime);
    }
  });

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

  it("exposes_actions_without_creating_a_trigger_for_reduced_motion", () => {
    vi.stubGlobal(
      "matchMedia",
      vi.fn(() => ({ matches: true, addEventListener: vi.fn(), removeEventListener: vi.fn() })),
    );

    const { container } = render(<HomePage />);

    expect(container.querySelector(".scroll-film")).toHaveClass("scroll-film--fallback");
    expect(animationMocks.create).not.toHaveBeenCalled();
  });

  it("initializes_from_already_available_finite_metadata", () => {
    render(<HomePage />);

    expect(animationMocks.create).toHaveBeenCalledTimes(1);
    expect(animationMocks.create).toHaveBeenCalledWith(
      expect.objectContaining({
        start: "top top",
        end: "bottom bottom",
        scrub: 0.15,
        invalidateOnRefresh: true,
      }),
    );
    expect(animationMocks.create.mock.calls[0][0]).not.toHaveProperty("pin");
    expect(animationMocks.create.mock.calls[0][0]).not.toHaveProperty("pinSpacing");
  });

  it("falls_back_when_video_duration_is_invalid", () => {
    const setCurrentTime = setMediaState(1, Number.NaN);

    const { container } = render(<HomePage />);

    expect(container.querySelector(".scroll-film")).toHaveClass("scroll-film--fallback");
    expect(animationMocks.create).not.toHaveBeenCalled();
    expect(setCurrentTime).not.toHaveBeenCalled();
  });

  it("cleans_up_trigger_listeners_and_pending_frame_on_unmount", () => {
    setMediaState(0, 5.04);
    const addEventListener = vi.spyOn(HTMLMediaElement.prototype, "addEventListener");
    const removeEventListener = vi.spyOn(HTMLMediaElement.prototype, "removeEventListener");
    const { container, unmount } = render(<HomePage />);
    const video = container.querySelector("video") as HTMLVideoElement;

    Object.defineProperty(video, "readyState", { configurable: true, get: () => 1 });
    act(() => video.dispatchEvent(new Event("loadedmetadata")));
    const triggerConfig = animationMocks.create.mock.calls[0][0];
    act(() => triggerConfig.onUpdate({ progress: 0.5 }));
    unmount();

    expect(animationMocks.kill).toHaveBeenCalledTimes(1);
    expect(animationMocks.contextRevert).toHaveBeenCalledTimes(1);
    expect(removeEventListener).toHaveBeenCalledWith("loadedmetadata", expect.any(Function));
    expect(removeEventListener).toHaveBeenCalledWith("error", expect.any(Function));
    expect(animationMocks.cancelAnimationFrame).toHaveBeenCalledWith(42);
    expect(addEventListener).toHaveBeenCalledWith("loadedmetadata", expect.any(Function), {
      once: true,
    });

    addEventListener.mockRestore();
    removeEventListener.mockRestore();
  });
});
