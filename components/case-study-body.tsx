import Image from "next/image";
import type { Project } from "@/types/project";

export function CaseStudyBody({ project }: { project: Project }) {
  return (
    <>
      <div className="case-study-copy" dangerouslySetInnerHTML={{ __html: project.contentHtml }} />
      {project.gallery.length > 0 ? (
        <div className="case-study-gallery">
          {project.gallery.map((image, index) => (
            <div className="case-gallery-image" key={image}>
              <Image
                src={image}
                alt={`${project.title} case-study image ${index + 1}`}
                fill
                sizes="100vw"
              />
            </div>
          ))}
        </div>
      ) : null}
    </>
  );
}
