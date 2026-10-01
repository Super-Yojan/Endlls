import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CaseStudyStory } from "@/components/case-study-story";
import { InquiryCta } from "@/components/inquiry-cta";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
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

  return (
    <>
      <div className="page-frame">
        <SiteHeader />
      </div>
      <main className="case-study">
        <header className="study-hero">
          <p className="study-eyebrow">Endlls Studios · Case study</p>
          <h1>{project.title}</h1>
          <p className="study-lede">{project.summary}</p>
        </header>
        <HeroMedia project={project} />
        <dl className="study-meta">
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
        <CaseStudyStory html={project.contentHtml} gallery={project.gallery} />
        {project.credits.length > 0 ? (
          <section className="study-credits" aria-labelledby="credits-heading">
            <p className="study-eyebrow" id="credits-heading">
              Credits
            </p>
            <dl>
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
          </section>
        ) : null}
        <nav className="study-pager" aria-label="More projects">
          <Link href={`/work/${previous.slug}`}>
            <span>Previous</span>
            {previous.title}
          </Link>
          <Link href={`/work/${next.slug}`}>
            <span>Next</span>
            {next.title}
          </Link>
        </nav>
      </main>
      <InquiryCta />
      <SiteFooter />
    </>
  );
}
