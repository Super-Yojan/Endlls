import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import type { Project, ProjectMeta } from "@/types/project";

function attribute(source: string, name: string) {
  const match = new RegExp(`\\b${name}\\s*=\\s*(?:"([^"]*)"|'([^']*)')`, "i").exec(source);
  return (match?.[1] ?? match?.[2] ?? "").trim();
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function safeVideoSrc(src: string) {
  return /^\/videos\/[a-z0-9][a-z0-9/_-]*\.mp4$/.test(src);
}

function renderCaseStudyVideo(attrs: string) {
  const src = attribute(attrs, "src");
  if (!safeVideoSrc(src)) return "";

  const wide = attribute(attrs, "class").split(/\s+/).includes("case-motion-wide");
  const caption = attribute(attrs, "title").trim().slice(0, 140);
  const figureClass = wide ? "case-motion case-motion-wide" : "case-motion";
  const captionHtml = caption ? `<figcaption>${escapeHtml(caption)}</figcaption>` : "";

  return `<figure class="${figureClass}"><video controls playsinline preload="metadata" src="${src}"></video>${captionHtml}</figure>`;
}

function readVideoTag(content: string, start: number) {
  let quote = "";
  for (let index = start + "<video".length; index < content.length; index += 1) {
    const char = content[index];
    if (quote) {
      if (char === quote) quote = "";
      continue;
    }
    if (char === '"' || char === "'") {
      quote = char;
      continue;
    }
    if (char !== ">") continue;

    const selfClosing = content[index - 1] === "/";
    const attrs = content.slice(start + "<video".length, selfClosing ? index - 1 : index);
    let end = index + 1;
    if (!selfClosing) {
      const closing = /^\s*<\/video>/i.exec(content.slice(end));
      if (closing) end += closing[0].length;
    }
    return { attrs, end };
  }
  return null;
}

// remark-html's sanitizer drops raw <video>. Rebuild an allowlisted player from local mp4 sources.
function markdownToHtml(content: string) {
  const videos: string[] = [];
  let withTokens = "";
  let cursor = 0;
  const opener = /<video\b/gi;
  for (let match = opener.exec(content); match; match = opener.exec(content)) {
    const tag = readVideoTag(content, match.index);
    if (!tag) break;
    withTokens += content.slice(cursor, match.index);
    const player = renderCaseStudyVideo(tag.attrs);
    if (player) {
      const token = `ENDLLSVIDEO${videos.length}TOKEN`;
      videos.push(player);
      withTokens += `\n\n${token}\n\n`;
    }
    cursor = tag.end;
    opener.lastIndex = tag.end;
  }
  withTokens += content.slice(cursor);

  let rendered = String(remark().use(html).processSync(withTokens));
  for (const [index, player] of videos.entries()) {
    rendered = rendered.replace(`<p>ENDLLSVIDEO${index}TOKEN</p>`, player);
  }
  return rendered;
}

const projectDirectory = path.join(process.cwd(), "content/projects");
const requiredStringFields = [
  "title",
  "slug",
  "client",
  "summary",
  "cover",
  "coverAlt",
] as const;

function requiredString(
  data: Record<string, unknown>,
  field: (typeof requiredStringFields)[number],
  filename: string,
) {
  if (typeof data[field] !== "string" || !data[field].trim()) {
    throw new Error(`${filename}: required field '${field}'`);
  }
  return data[field].trim();
}

function requiredNumber(data: Record<string, unknown>, field: "year" | "order", filename: string) {
  if (typeof data[field] !== "number" || !Number.isFinite(data[field])) {
    throw new Error(`${filename}: required field '${field}'`);
  }
  return data[field];
}

function requiredBoolean(data: Record<string, unknown>, field: "featured", filename: string) {
  if (typeof data[field] !== "boolean") {
    throw new Error(`${filename}: required field '${field}'`);
  }
  return data[field];
}

function stringArray(
  data: Record<string, unknown>,
  field: "services" | "gallery" | "credits",
  filename: string,
  required = false,
) {
  const value = data[field];
  if (value === undefined && !required) return [];
  if (!Array.isArray(value) || value.some((item) => typeof item !== "string")) {
    throw new Error(`${filename}: required field '${field}'`);
  }
  if (required && value.length === 0) {
    throw new Error(`${filename}: required field '${field}'`);
  }
  return value as string[];
}

function parseProject(filename: string, source: string): Project {
  const { data, content } = matter(source);
  const record = data as Record<string, unknown>;

  return {
    title: requiredString(record, "title", filename),
    slug: requiredString(record, "slug", filename),
    year: requiredNumber(record, "year", filename),
    client: requiredString(record, "client", filename),
    services: stringArray(record, "services", filename, true),
    summary: requiredString(record, "summary", filename),
    cover: requiredString(record, "cover", filename),
    coverAlt:
      typeof record.coverAlt === "string" && record.coverAlt.trim()
        ? record.coverAlt.trim()
        : `${requiredString(record, "title", filename)} project cover`,
    featured: requiredBoolean(record, "featured", filename),
    order: requiredNumber(record, "order", filename),
    gallery: stringArray(record, "gallery", filename),
    credits: stringArray(record, "credits", filename),
    color: typeof record.color === "string" && record.color.trim() ? record.color : null,
    contentHtml: markdownToHtml(content),
  };
}

export function readProjectsFromDirectory(directory: string): Project[] {
  if (!fs.existsSync(directory)) return [];

  return fs
    .readdirSync(directory)
    .filter((filename) => filename.endsWith(".md"))
    .map((filename) =>
      parseProject(filename, fs.readFileSync(path.join(directory, filename), "utf8")),
    )
    .sort((a, b) => a.order - b.order);
}

export function getAllProjects(): ProjectMeta[] {
  return readProjectsFromDirectory(projectDirectory).map(({ contentHtml: _content, ...meta }) => meta);
}

export function getProjectBySlug(slug: string): Project | null {
  return readProjectsFromDirectory(projectDirectory).find((project) => project.slug === slug) ?? null;
}
