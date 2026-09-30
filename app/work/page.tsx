import type { Metadata } from "next";
import { InquiryCta } from "@/components/inquiry-cta";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getAllProjects } from "@/lib/projects";
import { WorkFilter } from "./work-filter";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Identity, digital, and campaign work from Endlls Studio.",
};

export default function WorkPage() {
  const projects = getAllProjects();

  return (
    <>
      <div className="page-frame">
        <SiteHeader />
        <main className="work-page">
          <header className="page-intro work-intro">
            <p className="eyebrow">Portfolio</p>
            <h1>Work without limits.</h1>
            <p>
              Identity, digital, and campaign work from the studio.
            </p>
          </header>
          <WorkFilter projects={projects} />
        </main>
      </div>
      <InquiryCta />
      <SiteFooter />
    </>
  );
}
