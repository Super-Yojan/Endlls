import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import {
  getAllProjects,
  getProjectBySlug,
  readProjectsFromDirectory,
} from "./projects";

const temporaryDirectories: string[] = [];

function projectDirectory(files: Record<string, string>) {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), "endlls-projects-"));
  temporaryDirectories.push(directory);
  for (const [name, source] of Object.entries(files)) {
    fs.writeFileSync(path.join(directory, name), source);
  }
  return directory;
}

afterEach(() => {
  for (const directory of temporaryDirectories.splice(0)) {
    fs.rmSync(directory, { recursive: true, force: true });
  }
});

const validProject = ({
  title = "Aster House",
  slug = "aster-house",
  order = 1,
}: {
  title?: string;
  slug?: string;
  order?: number;
} = {}) => `---
title: ${title}
slug: ${slug}
year: 2026
client: Aster House
services:
  - Brand identity
summary: A quiet identity for an architectural retreat.
cover: /images/projects/aster-house/cover.png
coverAlt: Warm ivory project stationery
featured: true
order: ${order}
---

## A quieter kind of place

Project narrative.
`;

describe("project content pipeline", () => {
  it("sorts_projects_by_order", () => {
    const directory = projectDirectory({
      "second.md": validProject({ title: "Second", slug: "second", order: 2 }),
      "first.md": validProject({ title: "First", slug: "first", order: 1 }),
    });

    expect(readProjectsFromDirectory(directory).map((project) => project.slug)).toEqual([
      "first",
      "second",
    ]);
  });

  it("rejects_missing_required_frontmatter", () => {
    const directory = projectDirectory({
      "broken.md": validProject({ title: "" }),
    });

    expect(() => readProjectsFromDirectory(directory)).toThrow(
      "broken.md: required field 'title'",
    );
  });

  it("allows_missing_optional_fields", () => {
    const directory = projectDirectory({
      "minimal.md": `---
title: Minimal
slug: minimal
year: 2026
client: Studio
services:
  - Direction
summary: Minimal metadata.
cover: /minimal.png
featured: false
order: 3
---
Body.
`,
    });

    expect(readProjectsFromDirectory(directory)[0]).toMatchObject({
      gallery: [],
      credits: [],
      color: null,
    });
  });

  it("returns_null_for_unknown_slug", () => {
    expect(getProjectBySlug("not-a-real-project")).toBeNull();
    expect(getAllProjects().every((project) => project.slug !== "not-a-real-project")).toBe(true);
  });
});
