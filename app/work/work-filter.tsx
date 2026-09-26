"use client";

import { useMemo, useState } from "react";
import { ProjectCard } from "@/components/project-card";
import type { ProjectMeta } from "@/types/project";

export function WorkFilter({ projects }: { projects: ProjectMeta[] }) {
  const [active, setActive] = useState("All");
  const categories = useMemo(
    () => ["All", ...Array.from(new Set(projects.flatMap((project) => project.services)))],
    [projects],
  );
  const visible =
    active === "All" ? projects : projects.filter((project) => project.services.includes(active));

  const selectCategory = (category: string) => setActive(category);

  return (
    <>
      <div className="work-filters" aria-label="Filter projects">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            aria-pressed={active === category}
            onClick={() => selectCategory(category)}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                selectCategory(category);
              }
            }}
          >
            {category}
          </button>
        ))}
      </div>
      <div className="work-grid">
        {visible.map((project) => (
          <ProjectCard key={project.slug} project={project} index={projects.indexOf(project)} />
        ))}
      </div>
    </>
  );
}
