import Image from "next/image";
import Link from "next/link";
import type { ProjectMeta } from "@/types/project";

export function ProjectCard({ project, index }: { project: ProjectMeta; index: number }) {
  return (
    <article className="project-card">
      <Link href={`/work/${project.slug}`} className="project-image-link">
        <div className="project-image-frame">
          <Image
            src={project.cover}
            alt={project.coverAlt}
            fill
            sizes="(max-width: 720px) 100vw, (max-width: 1100px) 50vw, 40vw"
          />
        </div>
      </Link>
      <div className="project-meta-line">
        <span>{String(index + 1).padStart(2, "0")}</span>
        <span aria-hidden="true" className="project-rule" />
        <span>{project.year}</span>
      </div>
      <h3>
        <Link href={`/work/${project.slug}`}>{project.title}</Link>
      </h3>
      <p>{project.services.join(" · ")}</p>
    </article>
  );
}
