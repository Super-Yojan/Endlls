import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { AudienceScreen, ProcessScreen, ServicesScreen, SitePage, Wordmark } from "@/components/site-chrome";

export const metadata: Metadata = {
  title: { absolute: "Endlls Studio — Culture and systems, one studio" },
  description:
    "We make small brands feel premium. Brand, film, events, websites and apps, from one team.",
};

// Cards on the ring that orbits the hero heading.
const orbitCards = [
  { name: "DTFest", kind: "Culture · Event", href: "#work", image: "/images/projects/pkp/dtfest-hero.webp" },
  { name: "Glid", kind: "Systems · App", href: "/work/glid", image: "/images/projects/glid/app-home.webp" },
  { name: "Tender Hearts", kind: "Culture · Campaign", href: "/work/pkp-web", image: "/images/projects/pkp-brand/cover.webp" },
  { name: "Glid website", kind: "Systems · Web", href: "/work/glid", image: "/images/projects/glid/website-home.webp" },
  { name: "DTFest recap", kind: "Culture · Film", href: "#work", image: "/images/projects/pkp/dtfest-gallery-01.webp" },
  { name: "PKP site", kind: "Systems · Web", href: "/work/pkp-web", image: "/images/projects/pkp-web/home.webp" },
  { name: "Glid launch", kind: "Culture · Print", href: "/work/glid", image: "/images/projects/glid/flyer-tennis.webp" },
  { name: "Candlelight", kind: "Culture · Event", href: "#work", image: "/images/projects/pkp/candlelight-card.webp" },
];

const projects = [
  {
    name: "DTFest",
    kind: "Culture · Event",
    image: "/images/projects/pkp/dtfest-hero.webp",
    alt: "Performers on stage at DTFest",
    summary: "Festival identity, stage visuals and the recap film.",
  },
  {
    name: "Glid",
    kind: "Systems · App",
    href: "/work/glid",
    image: "/images/projects/glid/app-home.webp",
    alt: "Glid app home screen",
    summary: "Design and build of an app for booking courts and finding a game.",
  },
  {
    name: "Tender Hearts",
    kind: "Culture · Campaign",
    href: "/work/pkp-web",
    image: "/images/projects/pkp-brand/cover.webp",
    alt: "PKP blood drive campaign poster",
    summary: "A blood drive campaign for PKP: posters, social posts and a sign-up page.",
  },
];

export default function HomePage() {
  return (
    <SitePage home>
      <section className="screen opener" id="hero" data-c="#c4773c" aria-labelledby="hero-title">
        <div className="scene">
          <h1 id="hero-title" className="big fit">Endlls</h1>
          <div className="orbit" aria-hidden="true">
            <div className="spin">
              <div className="band" />
              {orbitCards.map((card, i) => (
                <div className="card" style={{ "--i": i } as CSSProperties} key={card.name}>
                  <a className="front" href={card.href} tabIndex={-1}>
                    <b>{card.name}</b>
                    <small>
                      {card.kind}
                      <i>See it</i>
                    </small>
                    <img src={card.image} alt="" />
                  </a>
                  <div className="back">
                    <Wordmark ring="#c4773c" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <p className="lead">
          Feel premium.
          <br />
          Brand, film, events, websites and apps, from one team <span aria-hidden="true">↘</span>
        </p>
      </section>

      <section className="screen intro" id="intro" data-c="#8f998b" aria-labelledby="intro-title">
        <div className="grid">
          <div className="col">
            <div className="vid">
              <svg className="loop" viewBox="0 0 200 160" preserveAspectRatio="none" aria-hidden="true">
                <path d="M30 118 C 4 92, 18 40, 70 22 C 120 4, 182 18, 192 58 C 200 96, 160 136, 104 146 C 58 154, 22 140, 16 112 C 12 92, 30 70, 52 58" fill="none" stroke="#c4773c" strokeWidth="13" strokeLinecap="round" transform="rotate(-20 100 80)" />
              </svg>
              <img src="/images/projects/glid/intro-v4-hero.webp" alt="Glid app on a phone at a tennis court, built by Endlls" />
              <span className="cap">
                Glid,
                <br />
                built by Endlls
              </span>
            </div>
          </div>
          <div className="col">
            <h2 id="intro-title" className="big">
              Culture and systems
              <svg className="spark" viewBox="0 0 20 20" aria-hidden="true">
                <path d="M10 0 C11 7 13 9 20 10 C13 11 11 13 10 20 C9 13 7 11 0 10 C7 9 9 7 10 0Z" fill="none" stroke="#fff" strokeWidth="1.3" />
              </svg>
            </h2>
            <div className="hr" />
            <ul className="dash">
              <li>Brand, film, music and events.</li>
              <li>Websites, apps and hardware.</li>
              <li>Sized for startups, creators and clubs.</li>
            </ul>
            <p className="lead">
              <span className="wipe">One team</span> for all of it, so nothing gets lost between agencies.
            </p>
          </div>
        </div>
      </section>

      <section className="screen work" id="work" data-c="#c49890" aria-labelledby="work-title">
        <h2 id="work-title" className="big fit">The work</h2>
        {projects.map((project) => (
          <div className="proj" key={project.name}>
            <div>
              <h3>{project.href ? <a href={project.href}>{project.name}</a> : project.name}</h3>
              <span className="s13 dim">{project.kind}</span>
            </div>
            <div>
              <div className="row">
                <img src={project.image} alt={project.alt} />
                <p>{project.summary}</p>
              </div>
            </div>
          </div>
        ))}
      </section>

      <ServicesScreen />
      <AudienceScreen />
      <ProcessScreen />
    </SitePage>
  );
}
