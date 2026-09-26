import type { Metadata } from "next";
import { InquiryCta } from "@/components/inquiry-cta";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getAllProjects } from "@/lib/projects";
import { WorkFilter } from "./work-filter";

export const metadata: Metadata = {
  title: "Work",
  description: "Selected identity, digital, campaign, and creative direction work by Endlls Studio.",
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
              Brand identities, digital experiences, and campaigns made for ideas with somewhere
              meaningful to go.
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
