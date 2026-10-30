import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { pageMeta } from "@/lib/meta";
import { AudienceScreen, ProcessScreen, ServicesScreen, SitePage, Wordmark } from "@/components/site-chrome";

export const metadata: Metadata = pageMeta({
  title: "Endlls Studio — We make small brands feel premium",
  description:
    "Brand, film, events and websites for startups and small businesses, from one studio.",
  path: "/",
});

// Cards on the ring that orbits the hero heading: one real piece each, never a repeat.
const orbitCards = [
  { name: "Candlelight vigil", kind: "Culture · Campaign", href: "/work/pkp-web/", image: "/images/home/candlelight.webp" },
  { name: "Glid app", kind: "Systems · App", href: "/work/glid/", image: "/images/home/glid-app.webp" },
  { name: "Blood drive", kind: "Culture · Campaign", href: "/work/pkp-web/", image: "/images/home/blood-drive.webp" },
  { name: "Glid films", kind: "Culture · Film", href: "/work/glid/", image: "/images/home/glid-film.webp" },
  { name: "Know Your Rights", kind: "Culture · Print", href: "/work/pkp-web/", image: "/images/home/know-your-rights.webp" },
  { name: "PKP website", kind: "Systems · Web", href: "/work/pkp-web/", image: "/images/home/pkp-site.webp" },
  { name: "Glid poster", kind: "Culture · Print", href: "/work/glid/", image: "/images/home/glid-poster.webp" },
  { name: "DTFest pages", kind: "Systems · Web", href: "/work/pkp-web/", image: "/images/home/dtfest.webp" },
];

// Delivered work first, then what is still on its way.
const projects = [
  {
    name: "Tender Hearts campaigns",
    kind: "Culture · Campaign · 2026",
    href: "/work/pkp-web/",
    image: "/images/home/campaign.webp",
    alt: "PKP campaign art for a Nepal flood vigil beside a blood drive call to action",
    summary: "Posters and social for a foundation's vigil, blood drive and Know Your Rights workshop, plus the brand system behind them.",
  },
  {
    name: "Tender Hearts website",
    kind: "Systems · Web · 2026",
    status: "Launching soon",
    href: "/work/pkp-web/",
    image: "/images/home/pkp-site.webp",
    alt: "PKP Tender Hearts homepage",
    summary: "A new site with events, sign-ups, donations and an admin the foundation runs itself.",
  },
  {
    name: "Glid",
    kind: "Systems · App · 2026",
    status: "Paused",
    href: "/work/glid/",
    image: "/images/home/glid-app.webp",
    alt: "Glid app home screen",
    summary: "An app for finding a game near you, designed and built end to end, with its films and launch kit.",
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
                    <img src={card.image} alt="" width={440} height={550} loading={i === 0 ? "eager" : "lazy"} decoding="async" />
                  </a>
                  <div className="back">
                    <Wordmark ring="#c4773c" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="pitch">
          <p className="lead">
            We make small brands feel premium.
            <span className="dim"> Brand, film, events and websites for startups and small businesses, from one team.</span>
          </p>
          <a className="btn" href="#talk">
            <span className="ic" aria-hidden="true">→</span>
            <span>Start a project</span>
          </a>
        </div>
      </section>

      <section className="screen intro" id="intro" data-c="#8f998b" aria-labelledby="intro-title">
        <div className="grid">
          <div className="col">
            <div className="vid">
              <svg className="loop" viewBox="0 0 200 160" preserveAspectRatio="none" aria-hidden="true">
                <path d="M30 118 C 4 92, 18 40, 70 22 C 120 4, 182 18, 192 58 C 200 96, 160 136, 104 146 C 58 154, 22 140, 16 112 C 12 92, 30 70, 52 58" fill="none" stroke="#c4773c" strokeWidth="13" strokeLinecap="round" transform="rotate(-20 100 80)" />
              </svg>
              <img src="/images/home/intro.webp" alt="Glid app on a phone at a tennis court, built by Endlls" width={900} height={507} loading="lazy" decoding="async" />
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
              <li>Websites and apps.</li>
              <li>Sized for startups and small businesses, with starter packages for creators and clubs.</li>
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
              <h3><a href={project.href}>{project.name}</a></h3>
              <span className="s13 dim">{project.kind}</span>
              {project.status ? <span className="tag">{project.status}</span> : null}
            </div>
            <div>
              <div className="row">
                <img src={project.image} alt={project.alt} loading="lazy" decoding="async" />
                <p>{project.summary}</p>
              </div>
            </div>
          </div>
        ))}
      </section>

      <ProcessScreen />
      <ServicesScreen />
      <AudienceScreen />
    </SitePage>
  );
}
