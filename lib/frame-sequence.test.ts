import { describe, expect, it } from "vitest";
import {
  FRAME_COUNT,
  canvasBufferSize,
  coverRect,
  frameIndex,
  frameSrc,
  rangeOpacity,
  revealOpacity,
} from "./frame-sequence";

describe("scroll film frames", () => {
  it("builds_padded_frame_paths_inside_the_sequence", () => {
    expect(frameSrc(0)).toBe("/frames/frame_0001.jpg");
    expect(frameSrc(FRAME_COUNT - 1)).toBe("/frames/frame_0217.jpg");
    expect(frameSrc(-4)).toBe("/frames/frame_0001.jpg");
    expect(frameSrc(500)).toBe("/frames/frame_0217.jpg");
  });

  it("maps_clamped_progress_onto_the_last_frame_index", () => {
    expect(frameIndex(-0.2)).toBe(0);
    expect(frameIndex(0)).toBe(0);
    expect(frameIndex(1)).toBe(FRAME_COUNT - 1);
    expect(frameIndex(1.4)).toBe(FRAME_COUNT - 1);
    expect(frameIndex(0.5, 5)).toBe(2);
    expect(frameIndex(0.5, 0)).toBe(0);
  });

  it("fades_copy_in_and_out_across_a_progress_window", () => {
    expect(rangeOpacity(0.09, 0.1, 0.3)).toBe(0);
    expect(rangeOpacity(0.1, 0.1, 0.3)).toBe(0);
    expect(rangeOpacity(0.1225, 0.1, 0.3)).toBeCloseTo(0.5);
    expect(rangeOpacity(0.2, 0.1, 0.3)).toBe(1);
    expect(rangeOpacity(0.2775, 0.1, 0.3)).toBeCloseTo(0.5);
    expect(rangeOpacity(0.3, 0.1, 0.3)).toBe(0);
  });

  it("reveals_the_closing_actions_after_ninety_percent", () => {
    expect(revealOpacity(0.9)).toBe(0);
    expect(revealOpacity(0.95)).toBeCloseTo(0.5);
    expect(revealOpacity(1)).toBe(1);
    expect(revealOpacity(1.2)).toBe(1);
  });

  it("covers_the_canvas_without_distorting_the_frame", () => {
    expect(coverRect(1000, 500, 2000, 1000)).toEqual({ x: 0, y: 0, width: 1000, height: 500 });
    expect(coverRect(1000, 1000, 2000, 1000)).toEqual({ x: -500, y: 0, width: 2000, height: 1000 });
    expect(coverRect(1000, 1000, 2000, 1000, "contain")).toEqual({
      x: 0,
      y: 250,
      width: 1000,
      height: 500,
    });
    expect(coverRect(1000, 1000, 2000, 1000, "contain", "start")).toEqual({
      x: 0,
      y: 0,
      width: 1000,
      height: 500,
    });
    expect(coverRect(0, 100, 200, 100)).toBeNull();
  });

  it("sizes_the_canvas_buffer_from_device_pixel_ratio", () => {
    expect(canvasBufferSize(800, 400, 2)).toEqual({ width: 1600, height: 800 });
    expect(canvasBufferSize(800, 400, 0)).toEqual({ width: 800, height: 400 });
    expect(canvasBufferSize(0, 400, 2)).toBeNull();
  });
});
