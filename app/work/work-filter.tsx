"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
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
      <div className="filters" aria-label="Filter projects">
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
      {visible.map((project) => (
        <div className="proj" key={project.slug}>
          <div>
            <h3>
              <a href={`/work/${project.slug}/`}>{project.title}</a>
            </h3>
            <span className="s13 dim">
              {project.services.join(" · ")} · {project.year}
            </span>
          </div>
          <div>
            <a className="row" href={`/work/${project.slug}/`} tabIndex={-1} aria-hidden="true">
              <Image src={project.cover} alt="" width={440} height={440} sizes="220px" />
              <p>{project.summary}</p>
            </a>
          </div>
        </div>
      ))}
    </>
  );
}
