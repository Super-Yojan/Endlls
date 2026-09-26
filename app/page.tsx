import Image from "next/image";
import Link from "next/link";
import { InquiryCta } from "@/components/inquiry-cta";
import { ProjectCard } from "@/components/project-card";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getAllProjects } from "@/lib/projects";

export default function HomePage() {
  const featuredProjects = getAllProjects().filter((project) => project.featured);

  return (
    <>
      <div className="page-frame">
        <SiteHeader />
        <main>
          <section className="hero" aria-labelledby="hero-heading">
            <div className="hero-heading-wrap">
              <h1 id="hero-heading">
                Creativity
                <br />
                Never Ends
              </h1>
              <p className="hero-manifesto" aria-hidden="true">
                Ideas
                <br />
                Stories
                <br />
                Impact
                <br />
                Beyond
              </p>
            </div>
            <div className="hero-support">
              <p>
                Independent creative studio shaping identities, digital experiences, and campaigns.
              </p>
              <Link className="text-link" href="/contact">
                Start a project <span aria-hidden="true">↗</span>
              </Link>
            </div>
            <div className="hero-image">
              <Image
                src="/images/hero/mountains.png"
                alt="Misty mountain panorama at dawn"
                fill
                sizes="100vw"
                priority
              />
            </div>
          </section>

          <section className="selected-work" aria-label="Selected work">
            <div className="section-heading-row">
              <div>
                <p className="eyebrow">Our work</p>
                <h2>Selected Work</h2>
              </div>
              <p>Ideas without limits. Real places. Real stories. Endless possibilities.</p>
            </div>
            <div className="project-grid">
              {featuredProjects.map((project, index) => (
                <ProjectCard key={project.slug} project={project} index={index} />
              ))}
            </div>
            <Link className="text-link work-link" href="/work">
              View all work <span aria-hidden="true">↗</span>
            </Link>
          </section>

          <section className="studio-statement">
            <p className="eyebrow light">Endlls Studio</p>
            <div className="statement-grid">
              <h2>A small studio for ambitious ideas.</h2>
              <div>
                <p>
                  We partner with forward-thinking teams to turn good questions into clear,
                  meaningful creative work.
                </p>
                <Link className="text-link text-link-light" href="/about">
                  Meet the studio <span aria-hidden="true">↗</span>
                </Link>
              </div>
            </div>
          </section>

          <section className="capabilities-process">
            <div className="capabilities">
              <p className="eyebrow">What we do</p>
              <ul>
                <li>Brand strategy</li>
                <li>Identity systems</li>
                <li>Digital experiences</li>
                <li>Campaigns</li>
                <li>Creative direction</li>
              </ul>
            </div>
            <div className="process-preview">
              <p className="eyebrow">How we work</p>
              <ol>
                <li>
                  <span>01</span>
                  <h3>Discover</h3>
                  <p>Listen closely, ask better questions, find the essential idea.</p>
                </li>
                <li>
                  <span>02</span>
                  <h3>Shape</h3>
                  <p>Build a clear direction and give the idea a distinctive form.</p>
                </li>
                <li>
                  <span>03</span>
                  <h3>Deliver</h3>
                  <p>Make it real with care, precision, and room to keep growing.</p>
                </li>
              </ol>
            </div>
          </section>
        </main>
      </div>
      <InquiryCta />
      <SiteFooter />
    </>
  );
}
