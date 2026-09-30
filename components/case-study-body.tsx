import type { Project } from "@/types/project";

function galleryAlt(src: string) {
  const name = src.split("/").pop()?.replace(/\.[a-z0-9]+$/i, "").replace(/-/g, " ") ?? "project image";
  return name.charAt(0).toUpperCase() + name.slice(1);
}

export function CaseStudyBody({ project }: { project: Project }) {
  return (
    <>
      <div className="case-study-copy" dangerouslySetInnerHTML={{ __html: project.contentHtml }} />
      {project.gallery.some((image) => !project.contentHtml.includes(image)) ? (
        <div className="case-study-gallery">
          {project.gallery
            .filter((image) => !project.contentHtml.includes(image))
            .map((image) => (
              <div className="case-gallery-image" key={image}>
                <img src={image} alt={galleryAlt(image)} />
              </div>
            ))}
        </div>
      ) : null}
    </>
  );
}
