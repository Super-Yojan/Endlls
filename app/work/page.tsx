import type { Metadata } from "next";
import { pageMeta } from "@/lib/meta";
import { SitePage } from "@/components/site-chrome";
import { getAllProjects } from "@/lib/projects";
import { WorkFilter } from "./work-filter";

export const metadata: Metadata = pageMeta({
  title: "Work",
  description: "Brand, film, event, website and app work from Endlls Studio.",
  path: "/work/",
});

export default function WorkPage() {
  const projects = getAllProjects();

  return (
    <SitePage current="work">
      <section className="screen page-head work" id="work" data-c="#c49890" aria-labelledby="work-title">
        <h1 id="work-title" className="big fit">The work</h1>
        <p className="lead intro-lead">
          Culture and systems projects from the studio. Pick one to see how it was made <span aria-hidden="true">↘</span>
        </p>
        <WorkFilter projects={projects} />
      </section>
    </SitePage>
  );
}
