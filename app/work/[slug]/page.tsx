import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CaseStudyBody } from "@/components/case-study-body";
import { InquiryCta } from "@/components/inquiry-cta";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getAllProjects, getProjectBySlug } from "@/lib/projects";

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
        <main className="case-study">
          <header className="case-study-header">
            <p className="eyebrow">Case study</p>
            <h1>{project.title}</h1>
            <p className="case-study-summary">{project.summary}</p>
            <dl className="case-study-details">
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
          </header>
          <div className="case-study-hero">
            <Image
              src={project.cover}
              alt={project.coverAlt}
              fill
              priority
              sizes="100vw"
            />
          </div>
          <CaseStudyBody project={project} />
          {project.credits.length > 0 ? (
            <section className="credits" aria-labelledby="credits-heading">
              <h2 id="credits-heading">Credits</h2>
              <ul>
                {project.credits.map((credit) => (
                  <li key={credit}>{credit}</li>
                ))}
              </ul>
            </section>
          ) : null}
          <nav className="project-pagination" aria-label="More projects">
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
      </div>
      <InquiryCta />
      <SiteFooter />
    </>
  );
}
