import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import type { Project, ProjectMeta } from "@/types/project";

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
    contentHtml: String(remark().use(html).processSync(content)),
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
