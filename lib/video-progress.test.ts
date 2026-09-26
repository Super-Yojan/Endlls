import { describe, expect, it } from "vitest";
import { clampProgress, isCtaProgress, progressToTime } from "./video-progress";

describe("scroll film progress", () => {
  it("clamps_progress_to_the_unit_interval", () => {
    expect(clampProgress(-0.2)).toBe(0);
    expect(clampProgress(0.5)).toBe(0.5);
    expect(clampProgress(1.3)).toBe(1);
  });

  it("maps_start_midpoint_and_end_to_video_time", () => {
    expect(progressToTime(0, 5.04)).toBe(0);
    expect(progressToTime(0.5, 5.04)).toBe(2.52);
    expect(progressToTime(1, 5.04)).toBe(5.04);
  });

  it("rejects_non_finite_or_non_positive_duration", () => {
    expect(progressToTime(0.5, Number.NaN)).toBeNull();
    expect(progressToTime(0.5, Number.POSITIVE_INFINITY)).toBeNull();
    expect(progressToTime(0.5, 0)).toBeNull();
    expect(progressToTime(0.5, -1)).toBeNull();
  });

  it("reveals_ctas_at_ninety_percent_after_clamping", () => {
    expect(isCtaProgress(0.899)).toBe(false);
    expect(isCtaProgress(0.9)).toBe(true);
    expect(isCtaProgress(1.3)).toBe(true);
    expect(isCtaProgress(-0.2)).toBe(false);
  });
});
