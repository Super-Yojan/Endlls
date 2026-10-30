import type { CSSProperties, ReactNode } from "react";
import { SiteMotion } from "@/components/site-motion";
import { studioEmail } from "@/lib/contact";
import { audiences, services, steps } from "@/lib/site-content";

// The tied wordmark: the ring is split into a back and a front arc so it loops around the double L.
export function Wordmark({ ring }: { ring: string }) {
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

type Section = "work" | "services" | "about" | "contact";

// On the home page the nav scrolls to its screens; everywhere else it links to the pages.
function navLinks(home: boolean) {
  return [
    { id: "work", label: "Work", href: home ? "#work" : "/work/" },
    { id: "services", label: "Services", href: home ? "#services" : "/#services" },
    { id: "about", label: "About", href: "/about/" },
    { id: "contact", label: "Contact", href: home ? "#talk" : "/contact/", keep: true },
  ];
}

function SiteHeader({ home, current }: { home: boolean; current?: Section }) {
  return (
    <header id="hdr">
      <a className="mark" href={home ? "#top" : "/"} aria-label="Endlls home">
        <Wordmark ring="#000" />
        <span className="dim">
          Culture and systems.
          <br />
          One studio.
        </span>
      </a>
      <button className="menu-btn" type="button" aria-expanded="false" aria-controls="primary-nav">
        Menu
      </button>
      <nav aria-label="Primary" id="primary-nav">
        {navLinks(home).map((link) => (
          <a
            key={link.id}
            href={link.href}
            data-s={home ? (link.id === "contact" ? "talk" : link.id) : undefined}
            className={[link.keep ? "keep" : "", link.id === current ? "on" : ""].join(" ").trim() || undefined}
            aria-current={link.id === current ? "page" : undefined}
          >
            {link.label}
          </a>
        ))}
      </nav>
    </header>
  );
}

function SiteFooter({ home }: { home: boolean }) {
  return (
    <footer>
      <div>
        2026 © Endlls Studio
        <br />
        {studioEmail}
      </div>
      <ul>
        <li><a href="/work/">Work</a></li>
        <li><a href={home ? "#services" : "/#services"}>Services</a></li>
        <li><a href={home ? "#how" : "/#how"}>Process</a></li>
        <li><a href="/about/">About</a></li>
        <li><a href="/contact/">Contact form</a></li>
      </ul>
      <div className="cr dim">
        Made endlessly
        <br />
        by Endlls
      </div>
    </footer>
  );
}

function EmailBlock() {
  return (
    <div className="grid">
      <div className="col">
        <p className="lead">
          Send a few lines about your project. We reply within two working days <span aria-hidden="true">↘</span>
        </p>
      </div>
      <div className="col">
        <a className="mail" id="email" href={`mailto:${studioEmail}`}>{studioEmail}</a>
        <button className="copy" type="button" id="copy">Copy email</button>
        <span id="copy-msg" className="s13 dim" aria-live="polite" />
      </div>
    </div>
  );
}

// Every page: shared header, the floating call to action, and a closing copper
// "Let's talk" screen that carries the footer. `talk` replaces that screen's body.
export function SitePage({
  home = false,
  current,
  talk,
  children,
}: {
  home?: boolean;
  current?: Section;
  talk?: ReactNode;
  children?: ReactNode;
}) {
  // On the contact page the closing screen is the page itself, so its heading is the h1.
  const TalkHeading = current === "contact" ? "h1" : "h2";
  return (
    <div className="fa">
      <SiteHeader home={home} current={current} />
      {current === "contact" ? null : (
        <a className="btn float" href={home ? "#talk" : "/contact/"}>
          <span className="ic" aria-hidden="true">→</span>
          <span>Start a project</span>
        </a>
      )}
      <main id="top">
        {children}
        <section className="screen talk" id="talk" data-c="#c4773c" aria-labelledby="talk-title">
          <TalkHeading id="talk-title" className="big fit">Let&apos;s talk</TalkHeading>
          {talk ?? <EmailBlock />}
          <SiteFooter home={home} />
        </section>
      </main>
      <SiteMotion />
    </div>
  );
}

export function ServicesScreen({ id = "services", title = "What we do" }: { id?: string; title?: string }) {
  return (
    <section className="screen svc" id={id} data-c="#7f85b6" aria-labelledby={`${id}-title`}>
      <h2 id={`${id}-title`} className="big fit">{title}</h2>
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
            <a className="tile ask" href="/contact/">
              <span className="n" aria-hidden="true">→</span>
              <div>
                <b>Not sure what you need?</b>
                <small>Tell us the goal and we will scope it</small>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export function AudienceScreen() {
  return (
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
  );
}

export function ProcessScreen() {
  return (
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
  );
}
