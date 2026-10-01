import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { publicImageSize, readImageSize } from "./image-size";

describe("image sizes", () => {
  it("reads_webp_jpeg_and_png_dimensions", () => {
    const webp = publicImageSize("/images/projects/glid/og-image.webp");
    const jpeg = publicImageSize("/images/projects/pkp/candlelight.jpg");
    expect(webp).toEqual({ width: 1200, height: 630 });
    expect(jpeg).toEqual({ width: 1280, height: 1600 });

    const png = Buffer.from(
      "89504e470d0a1a0a0000000d4948445200000010000000200806000000",
      "hex",
    );
    expect(readImageSize(png)).toEqual({ width: 16, height: 32 });
  });

  it("rejects_paths_outside_public", () => {
    expect(publicImageSize("../package.json")).toBeNull();
    expect(publicImageSize("/images/projects/glid/missing.webp")).toBeNull();
    expect(fs.existsSync(path.join(process.cwd(), "public/images/projects/glid/intro-v4-hero.webp"))).toBe(
      true,
    );
  });
});
