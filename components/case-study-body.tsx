import type { Project } from "@/types/project";
import { CaseStudyCarousel } from "@/components/case-study-carousel";

const carouselMarker = /<p>\s*\{\{carousel\}\}\s*<\/p>/;

function galleryAlt(src: string) {
  const name = src.split("/").pop()?.replace(/\.[a-z0-9]+$/i, "").replace(/-/g, " ") ?? "project image";
  return name.charAt(0).toUpperCase() + name.slice(1);
}

function splitAtCarousel(html: string) {
  const match = carouselMarker.exec(html);
  if (!match) return null;
  return {
    before: html.slice(0, match.index),
    after: html.slice(match.index + match[0].length),
  };
}

export function CaseStudyBody({ project }: { project: Project }) {
  const slides = project.carousel ?? [];
  const split = slides.length > 0 ? splitAtCarousel(project.contentHtml) : null;
  const carouselSources = new Set(slides.map((slide) => slide.src));
  const gallery = project.gallery.filter(
    (image) => !project.contentHtml.includes(image) && !carouselSources.has(image),
  );
  const copy = project.contentHtml.replace(carouselMarker, "");

  const galleryNode =
    gallery.length > 0 ? (
      <div className="case-study-gallery">
        {gallery.map((image) => (
          <div className="case-gallery-image" key={image}>
            <img src={image} alt={galleryAlt(image)} />
          </div>
        ))}
      </div>
    ) : null;

  const carousel =
    slides.length > 0 ? (
      <CaseStudyCarousel slides={slides} label={`${project.title} films and stills`} />
    ) : null;

  if (split && carousel) {
    return (
      <div className="case-study-sequence">
        <div className="case-study-copy" dangerouslySetInnerHTML={{ __html: split.before }} />
        {carousel}
        <div className="case-study-copy" dangerouslySetInnerHTML={{ __html: split.after }} />
        {galleryNode}
      </div>
    );
  }

  return (
    <>
      <div className="case-study-copy" dangerouslySetInnerHTML={{ __html: copy }} />
      {carousel}
      {galleryNode}
    </>
  );
}
