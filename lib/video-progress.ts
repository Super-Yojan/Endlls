export function clampProgress(progress: number): number {
  return Math.min(1, Math.max(0, progress));
}

export function progressToTime(progress: number, duration: number): number | null {
  if (!Number.isFinite(duration) || duration <= 0) return null;

  const time = clampProgress(progress) * duration;
  return Number.isFinite(time) ? time : null;
}

export function isCtaProgress(progress: number, threshold = 0.9): boolean {
  return clampProgress(progress) >= threshold;
}
