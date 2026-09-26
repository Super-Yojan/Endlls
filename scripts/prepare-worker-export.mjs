import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import { mkdir, rename } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const videoDir = path.join(root, "public/video");
const holdDir = path.join(root, ".media-hold");
const heldVideo = path.join(holdDir, "video");

async function restoreVideo() {
  if (existsSync(heldVideo) && !existsSync(videoDir)) {
    await rename(heldVideo, videoDir);
  }
}

if (existsSync(heldVideo)) {
  throw new Error("public/video is already parked in .media-hold. Move it back before building.");
}

let moved = false;
if (existsSync(videoDir)) {
  await mkdir(holdDir, { recursive: true });
  await rename(videoDir, heldVideo);
  moved = true;
}

for (const signal of ["SIGINT", "SIGTERM"]) {
  process.on(signal, async () => {
    await restoreVideo();
    process.exit(signal === "SIGINT" ? 130 : 143);
  });
}

const nextBin = path.join(root, "node_modules/next/dist/bin/next");
const build = spawn(process.execPath, [nextBin, "build"], {
  cwd: root,
  stdio: "inherit",
});

const exitCode = await new Promise((resolve) => {
  build.on("exit", (code) => resolve(code ?? 1));
});

if (moved) await restoreVideo();

if (exitCode !== 0) {
  process.exit(exitCode);
}
