import { clampProgress } from "@/lib/video-progress";

export const FRAME_COUNT = 217;

export const COPY_FADE = 0.045;

export const COPY_WINDOWS = {
  headline: { start: 0.1, end: 0.3 },
  featureOne: { start: 0.4, end: 0.6 },
  featureTwo: { start: 0.7, end: 0.9 },
} as const;

export function frameSrc(index: number, frameCount = FRAME_COUNT): string {
  const last = Math.max(0, frameCount - 1);
  const safe = Math.min(last, Math.max(0, Math.round(index)));
  return `/frames/frame_${String(safe + 1).padStart(4, "0")}.jpg`;
}

export function frameIndex(progress: number, frameCount = FRAME_COUNT): number {
  if (!Number.isInteger(frameCount) || frameCount < 1) return 0;
  return Math.min(frameCount - 1, Math.round(clampProgress(progress) * (frameCount - 1)));
}

export function rangeOpacity(progress: number, start: number, end: number, fade = COPY_FADE): number {
  const value = clampProgress(progress);
  if (value <= start || value >= end || end <= start) return 0;
  const distance = Math.max(fade, 0.0001);
  return Math.min(1, (value - start) / distance, (end - value) / distance);
}

export function revealOpacity(progress: number, start = 0.9, fade = 0.1): number {
  const value = clampProgress(progress);
  if (value <= start) return 0;
  if (fade <= 0 || value >= start + fade) return 1;
  return (value - start) / fade;
}

export type CoverRect = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export function coverRect(
  canvasWidth: number,
  canvasHeight: number,
  imageWidth: number,
  imageHeight: number,
  fit: "cover" | "contain" = "cover",
  anchor: "center" | "start" = "center",
): CoverRect | null {
  if (
    canvasWidth <= 0 ||
    canvasHeight <= 0 ||
    imageWidth <= 0 ||
    imageHeight <= 0 ||
    !Number.isFinite(canvasWidth + canvasHeight + imageWidth + imageHeight)
  ) {
    return null;
  }

  const scale =
    fit === "contain"
      ? Math.min(canvasWidth / imageWidth, canvasHeight / imageHeight)
      : Math.max(canvasWidth / imageWidth, canvasHeight / imageHeight);
  const width = imageWidth * scale;
  const height = imageHeight * scale;
  return {
    x: (canvasWidth - width) / 2,
    y: anchor === "start" ? 0 : (canvasHeight - height) / 2,
    width,
    height,
  };
}

export function canvasBufferSize(
  cssWidth: number,
  cssHeight: number,
  devicePixelRatio: number,
): { width: number; height: number } | null {
  if (cssWidth <= 0 || cssHeight <= 0) return null;
  const ratio = Number.isFinite(devicePixelRatio) && devicePixelRatio > 0 ? devicePixelRatio : 1;
  return {
    width: Math.max(1, Math.round(cssWidth * ratio)),
    height: Math.max(1, Math.round(cssHeight * ratio)),
  };
}

export function preloadFrames(
  frameCount: number,
  onProgress: (loaded: number, total: number) => void,
  concurrency = 8,
): Promise<HTMLImageElement[]> {
  const images = new Array<HTMLImageElement>(frameCount);
  let cursor = 0;
  let loaded = 0;

  const loadOne = (index: number) =>
    new Promise<HTMLImageElement>((resolve, reject) => {
      const image = new Image();
      image.decoding = "async";
      image.onload = () => resolve(image);
      image.onerror = () => reject(new Error(`Unable to load ${frameSrc(index, frameCount)}`));
      image.src = frameSrc(index, frameCount);
    });

  async function worker() {
    while (cursor < frameCount) {
      const index = cursor;
      cursor += 1;
      images[index] = await loadOne(index);
      loaded += 1;
      onProgress(loaded, frameCount);
    }
  }

  const workers = Math.max(1, Math.min(concurrency, frameCount));
  return Promise.all(Array.from({ length: workers }, () => worker())).then(() => images);
}
