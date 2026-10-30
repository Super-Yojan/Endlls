import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { Anton } from "next/font/google";
import { HomeMotion } from "@/components/home-motion";
import "./home.css";

const anton = Anton({ weight: "400", subsets: ["latin"], variable: "--font-anton", display: "swap" });

export const metadata: Metadata = {
  title: { absolute: "Endlls Studio — Culture and systems, one studio" },
  description:
    "We make small brands feel premium. Brand, film, events, websites and apps, from one team.",
};

// The tied wordmark: the ring is split into a back and a front arc so it loops around the double L.
function Wordmark({ ring }: { ring: string }) {
  const stroke = { fill: "none", stroke: ring, strokeWidth: 2.4, strokeLinecap: "round" } as const;
  return (
    <svg viewBox="0 0 150 42" aria-hidden="true">
      <g transform="rotate(-20 64 26)" {...stroke}>
        <path d="M48.4 26 A15.6 4.2 0 0 1 79.6 26" />
      </g>
      <text
        x="0"
        y="36"
        style={{ fontFamily: "var(--font-cabinet), Helvetica Neue, Arial, sans-serif" }}
        fontWeight="800"
        fontSize="36"
        letterSpacing="-1"
        fill="#fff"
      >
        endlls
      </text>
      <g transform="rotate(-20 64 26)" {...stroke}>
        <path d="M79.6 26 A15.6 4.2 0 0 1 48.4 26" />
      </g>
    </svg>
  );
}

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

const services = [
  { half: "Culture", title: "Brand and marketing", detail: "Identity, campaigns, social" },
  { half: "Culture", title: "Film, music and events", detail: "Launch films, sound, stage" },
  { half: "Systems", title: "Websites and apps", detail: "Web and mobile, built to grow" },
  { half: "Systems", title: "Hardware and robotics", detail: "Electronics, CAD, fabrication" },
];

const audiences = [
  { name: "Startups", color: "#8f998b", text: "A brand, a site and a launch film that make a new company look established." },
  { name: "Creators", color: "#c4773c", text: "Channel identity, thumbnails, intros and merch for YouTube and beyond." },
  { name: "Clubs", color: "#c49890", text: "Event branding, posters and sign-up pages for college clubs and societies." },
  { name: "Small business", color: "#7f85b6", text: "A refresh that lets a local business compete with bigger names." },
];

const steps = [
  ["1. Talk", "Tell us what you are launching, who it is for and your budget."],
  ["2. Plan", "You get a clear scope and a fixed price before anything starts."],
  ["3. Make", "We share real work every week, so there are no surprises."],
  ["4. Launch", "We ship it and hand you every file, account and line of code."],
];

export default function HomePage() {
  return (
    <div className={`fa ${anton.variable}`}>
      <header id="hdr">
        <a className="mark" href="#top" aria-label="Endlls home">
          <Wordmark ring="#000" />
          <span className="dim">
            Culture and systems.
            <br />
            One studio.
          </span>
        </a>
        <nav aria-label="Primary">
          <a href="#work" data-s="work">Work</a>
          <a href="#services" data-s="services">Services</a>
          <a href="#how" data-s="how">Process</a>
          <a className="keep" href="#talk" data-s="talk">Contact</a>
        </nav>
      </header>

      <a className="btn float" href="#talk">
        <span className="ic" aria-hidden="true">→</span>
        <span>Start a project</span>
      </a>

      <main id="top">
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

        <section className="screen svc" id="services" data-c="#7f85b6" aria-labelledby="svc-title">
          <h2 id="svc-title" className="big fit">What we do</h2>
          <div className="grid">
            <div className="col">
              <p className="lead">
                Two halves, one studio. Culture is how people see and feel your brand. Systems are the things your customers use.
              </p>
              <p className="dim" style={{ fontSize: 16, maxWidth: "36ch" }}>
                Most projects use both: a festival needs a brand and a ticketing site, and an app needs a launch film.
              </p>
            </div>
            <div className="col">
              <div className="tiles">
                <svg className="splash" viewBox="0 0 200 200" preserveAspectRatio="none" aria-hidden="true">
                  <path d="M40 170 C 0 120, 20 30, 100 22 C 170 16, 200 80, 180 140 C 160 190, 90 196, 52 176" fill="none" stroke="#c4773c" strokeWidth="22" strokeLinecap="round" />
                </svg>
                {services.map((service, i) => (
                  <div className={service.half === "Systems" ? "tile sys" : "tile"} key={service.title}>
                    <span className="n">{i + 1}</span>
                    <div>
                      <span className="half"><i />{service.half}</span>
                      <b>{service.title}</b>
                      <small>{service.detail}</small>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="screen who" id="who" data-c="#ffffff" aria-labelledby="who-title">
          <div className="grid">
            <div className="col">
              <div className="pin">
                <h2 id="who-title" className="lead">Who we work with</h2>
                <p style={{ fontSize: 16, color: "#555", maxWidth: "30ch" }}>
                  Teams without an in-house designer or developer who want to look bigger than they are.
                </p>
              </div>
            </div>
            <div className="col">
              {audiences.map((audience) => (
                <div className="aud" style={{ "--a": audience.color } as CSSProperties} key={audience.name}>
                  <h3 className="big">{audience.name}</h3>
                  <p>{audience.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="screen how" id="how" data-c="#8f998b" aria-labelledby="how-title">
          <h2 id="how-title" className="big fit">How it works</h2>
          <div className="steps">
            {steps.map(([title, text]) => (
              <div className="r" key={title}>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="screen talk" id="talk" data-c="#c4773c" aria-labelledby="talk-title">
          <h2 id="talk-title" className="big fit">Let&apos;s talk</h2>
          <div className="grid">
            <div className="col">
              <p className="lead">
                Send a few lines about your project. We reply within two working days <span aria-hidden="true">↘</span>
              </p>
            </div>
            <div className="col">
              <a className="mail" id="email" href="mailto:hello@endlls.studio">hello@endlls.studio</a>
              <button className="copy" type="button" id="copy">Copy email</button>
              <span id="copy-msg" className="s13 dim" aria-live="polite" />
            </div>
          </div>
          <footer>
            <div>
              2026 © Endlls Studio
              <br />
              hello@endlls.studio
              <div className="soc">
                <a href="#" aria-label="Instagram">IG</a>
                <a href="#" aria-label="YouTube">YT</a>
                <a href="#" aria-label="LinkedIn">IN</a>
                <a href="#" aria-label="TikTok">TT</a>
              </div>
            </div>
            <ul>
              <li><a href="#work">Work</a></li>
              <li><a href="#services">Services</a></li>
              <li><a href="#how">Process</a></li>
              <li><a href="/work">Case studies</a></li>
              <li><a href="/contact">Contact form</a></li>
            </ul>
            <div className="cr dim">
              Made endlessly
              <br />
              by Endlls
            </div>
          </footer>
        </section>
      </main>
      <HomeMotion />
    </div>
  );
}
