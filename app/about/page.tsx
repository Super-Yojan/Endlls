import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { AudienceScreen, ProcessScreen, ServicesScreen, SitePage } from "@/components/site-chrome";

export const metadata: Metadata = {
  title: "About",
  description: "Endlls is one studio for culture and systems: brand, film and events, and the websites, apps and hardware behind them.",
};

export default function AboutPage() {
  return (
    <SitePage current="about">
      <section className="screen page-head" id="about" data-c="#c49890" style={{ "--c": "#c49890" } as CSSProperties} aria-labelledby="about-title">
        <h1 id="about-title" className="big fit">About Endlls</h1>
        <div className="grid">
          <div className="col">
            <p className="lead">
              A small studio for ambitious ideas. We make brands, films and events, and we build the websites, apps and
              hardware behind them <span aria-hidden="true">↘</span>
            </p>
          </div>
          <div className="col">
            <p className="lead">
              The name is <span className="wipe">endless</span>, spelled our way.
            </p>
            <p className="dim" style={{ fontSize: 18, maxWidth: "40ch" }}>
              Creativity is not a finish line. It is a way of looking closer, asking better questions and finding
              possibility where others stop.
            </p>
          </div>
        </div>
      </section>
      <ServicesScreen id="halves" title="Two halves" />
      <AudienceScreen />
      <ProcessScreen />
    </SitePage>
  );
}
