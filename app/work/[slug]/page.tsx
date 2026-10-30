import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { CaseStudyStory } from "@/components/case-study-story";
import { SitePage } from "@/components/site-chrome";
import { publicImageSize } from "@/lib/image-size";
import { studyOrientation } from "@/lib/case-study";
import { getAllProjects, getProjectBySlug } from "@/lib/projects";
import type { Project } from "@/types/project";

export function generateStaticParams() {
  return getAllProjects().map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: "Project not found" };
  return { title: project.title, description: project.summary };
}

function creditParts(credit: string) {
  const parts = credit.split(/\s+[—–-]\s+/);
  if (parts.length < 2) return { role: credit, name: "" };
  return { role: parts[0], name: parts.slice(1).join(" — ") };
}

function HeroMedia({ project }: { project: Project }) {
  const size = publicImageSize(project.cover);
  const ratio = size && size.height > 0 ? size.width / size.height : 1.5;
  const landscape = studyOrientation(ratio) === "landscape";

  if (landscape && size) {
    return (
      <figure className="study-hero-media" style={{ aspectRatio: `${size.width} / ${size.height}` }}>
        <Image src={project.cover} alt={project.coverAlt} fill priority sizes="100vw" />
      </figure>
    );
  }

  if (size) {
    return (
      <figure className="study-hero-product">
        <Image
          src={project.cover}
          alt={project.coverAlt}
          width={size.width}
          height={size.height}
          priority
          sizes="(max-width: 720px) 80vw, 380px"
        />
      </figure>
    );
  }

  return (
    <figure className="study-hero-media">
      <Image src={project.cover} alt={project.coverAlt} fill priority sizes="100vw" />
    </figure>
  );
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const projects = getAllProjects();
  const index = projects.findIndex((entry) => entry.slug === project.slug);
  const previous = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];

  // Each study opens on its own screen colour.
  const opening = ["#8f998b", "#c49890", "#7f85b6"][index % 3];

  return (
    <SitePage current="work">
      <section className="screen study-head" id="study" data-c={opening} style={{ "--c": opening } as CSSProperties} aria-labelledby="study-title">
        <p className="s13 dim study-kicker">Case study · {project.year}</p>
        <h1 id="study-title" className="big wrap">{project.title}</h1>
        <div className="grid">
          <div className="col">
            <p className="lead">{project.summary}</p>
          </div>
          <div className="col">
            <dl className="study-facts">
              <div>
                <dt>Client</dt>
                <dd>{project.client}</dd>
              </div>
              <div>
                <dt>Services</dt>
                <dd>{project.services.join(", ")}</dd>
              </div>
              <div>
                <dt>Year</dt>
                <dd>{project.year}</dd>
              </div>
            </dl>
          </div>
        </div>
        <HeroMedia project={project} />
      </section>
      <CaseStudyStory html={project.contentHtml} gallery={project.gallery} />
      <section className="screen study-end" id="more" data-c="#ffffff" aria-label="Credits and more projects">
        {project.credits.length > 0 ? (
          <div className="grid">
            <div className="col">
              <h2 className="lead" id="credits-heading">Credits</h2>
            </div>
            <div className="col">
              <dl className="study-facts" aria-labelledby="credits-heading">
                {project.credits.map((credit) => {
                  const parts = creditParts(credit);
                  return (
                    <div key={credit}>
                      <dt>{parts.role}</dt>
                      {parts.name ? <dd>{parts.name}</dd> : null}
                    </div>
                  );
                })}
              </dl>
            </div>
          </div>
        ) : null}
        <nav className="pager" aria-label="More projects">
          <a href={`/work/${previous.slug}/`}>
            <span className="s13">Previous</span>
            <b className="big">{previous.title}</b>
          </a>
          <a href={`/work/${next.slug}/`}>
            <span className="s13">Next</span>
            <b className="big">{next.title}</b>
          </a>
        </nav>
      </section>
    </SitePage>
  );
}
