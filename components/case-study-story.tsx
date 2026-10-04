import Image from "next/image";
import type { ReactNode } from "react";
import { StudyBand } from "@/components/study-reveal";
import {
  groupByAspect,
  parseCaseStudy,
  studyOrientation,
  toStudyImage,
  type StudyImage,
  type StudyImageGroup,
  type StudySection,
  type StudyVideo,
} from "@/lib/case-study";

function StudyPicture({
  image,
  sizes,
}: {
  image: StudyImage;
  sizes: string;
}) {
  if (image.width > 0 && image.height > 0) {
    return (
      <Image src={image.src} alt={image.alt} width={image.width} height={image.height} sizes={sizes} />
    );
  }
  return <img src={image.src} alt={image.alt} />;
}

function ImageGroupView({ group }: { group: StudyImageGroup }) {
  const orientation = studyOrientation(group.ratio);
  const count = group.images.length;
  const carousel =
    (orientation === "landscape" && count >= 2) || (orientation === "portrait" && count >= 4);

  if (carousel) {
    return (
      <div className={`study-carousel study-carousel--${orientation}`} tabIndex={0} role="region" aria-label="Project images">
        {group.images.map((image) => (
          <figure key={image.src}>
            <StudyPicture image={image} sizes={orientation === "landscape" ? "80vw" : "40vw"} />
          </figure>
        ))}
      </div>
    );
  }

  if (count >= 2) {
    return (
      <div className={`study-row study-row--${orientation}`}>
        {group.images.map((image) => (
          <figure key={image.src}>
            <StudyPicture image={image} sizes="(max-width: 720px) 42vw, 240px" />
          </figure>
        ))}
      </div>
    );
  }

  const image = group.images[0];
  if (!image) return null;
  return (
    <figure className={`study-figure study-figure--${orientation}`}>
      <StudyPicture image={image} sizes={orientation === "landscape" ? "100vw" : "(max-width: 720px) 80vw, 360px"} />
    </figure>
  );
}

function VideoViews({ videos }: { videos: StudyVideo[] }) {
  const nodes: ReactNode[] = [];
  let narrow: StudyVideo[] = [];
  let key = 0;

  const flushNarrow = () => {
    if (narrow.length === 0) return;
    if (narrow.length === 1) {
      nodes.push(
        <div
          className="study-player study-player--portrait"
          key={`video-${key}`}
          dangerouslySetInnerHTML={{ __html: narrow[0].html }}
        />,
      );
    } else {
      nodes.push(
        <div className="study-carousel study-carousel--portrait" key={`video-${key}`} tabIndex={0} role="region" aria-label="Portrait films">
          {narrow.map((video) => (
            <div
              className="study-player study-player--portrait"
              key={video.html}
              dangerouslySetInnerHTML={{ __html: video.html }}
            />
          ))}
        </div>,
      );
    }
    key += 1;
    narrow = [];
  };

  for (const video of videos) {
    if (video.wide) {
      flushNarrow();
      nodes.push(
        <div
          className="study-player study-player--wide"
          key={`video-${key}`}
          dangerouslySetInnerHTML={{ __html: video.html }}
        />,
      );
      key += 1;
    } else {
      narrow.push(video);
    }
  }
  flushNarrow();
  return nodes;
}

function displayTitle(section: StudySection) {
  if (section.quote) return section.quote;
  return section.title;
}

function SectionView({ section, tone }: { section: StudySection; tone: "cream" | "bone" }) {
  const title = displayTitle(section);
  const eyebrow = section.ink && section.title && section.title !== section.quote ? section.title : null;
  const className = section.ink ? "study-band study-band--ink" : `study-band study-band--${tone}`;

  const hasCopy = Boolean(eyebrow || title || section.bodyHtml);

  return (
    <StudyBand className={className} labelledBy={title ? section.id : undefined}>
      {hasCopy ? (
        <div className="study-band-inner">
          {eyebrow ? <p className="study-eyebrow">{eyebrow}</p> : null}
          {title ? <h2 id={section.id}>{title}</h2> : null}
          {section.bodyHtml ? (
            <div className="study-copy" dangerouslySetInnerHTML={{ __html: section.bodyHtml }} />
          ) : null}
        </div>
      ) : null}
      {section.imageGroups.map((group) => (
        <ImageGroupView key={group.images.map((image) => image.src).join("|")} group={group} />
      ))}
      <VideoViews videos={section.videos} />
    </StudyBand>
  );
}

export function CaseStudyStory({ html, gallery = [] }: { html: string; gallery?: string[] }) {
  const sections = parseCaseStudy(html);
  const extras = gallery.filter((src) => !html.includes(src));
  if (extras.length > 0) {
    sections.push({
      id: "gallery",
      title: null,
      ink: false,
      quote: null,
      bodyHtml: "",
      imageGroups: groupByAspect(
        extras.map((src) => {
          const name = src.split("/").pop()?.replace(/\.[a-z0-9]+$/i, "").replace(/[-_]/g, " ") ?? "Project image";
          return toStudyImage(src, name.charAt(0).toUpperCase() + name.slice(1));
        }),
      ),
      videos: [],
    });
  }
  let toneIndex = 0;

  return (
    <>
      {sections.map((section) => {
        const tone = toneIndex % 2 === 0 ? "cream" : "bone";
        if (!section.ink) toneIndex += 1;
        return <SectionView key={section.id} section={section} tone={tone} />;
      })}
    </>
  );
}
