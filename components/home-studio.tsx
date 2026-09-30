"use client";

import type { heroParallaxProducts } from "@/lib/universes";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type StudioProduct = ReturnType<typeof heroParallaxProducts>[number];

const capabilities = [
  {
    title: "Flight",
    body: "Glid, blimps, delivery aircraft, and the avionics that keep a path deliberate.",
    tags: ["Flight", "Autonomy"],
  },
  {
    title: "Field",
    body: "PKP Field and the radio mesh: tools that stay useful when the wider network thins out.",
    tags: ["Field", "Radio"],
  },
  {
    title: "Silicon",
    body: "MIPS study, motors, and power systems — the machines underneath the motion.",
    tags: ["Silicon", "Motion"],
  },
  {
    title: "Knowledge",
    body: "Freedom CTF, processor study, and Endlls Atlas, the map of how the work connects.",
    tags: ["Knowledge", "Security"],
  },
  {
    title: "Interfaces",
    body: "PKP Web and ground control: calm surfaces for reading a live system.",
    tags: ["Digital", "Interface"],
  },
];

export function HomeStudio({ products }: { products: StudioProduct[] }) {
  const [openCapability, setOpenCapability] = useState(0);

  return (
    <main>
      <section className="home-hero" aria-labelledby="hero-heading">
        <div className="hero-mesh" aria-hidden="true">
          <span className="hero-orb hero-orb-indigo" />
          <span className="hero-orb hero-orb-purple" />
        </div>
        <div className="home-hero-copy">
          <p className="hero-kicker">Endlls Creative Studio</p>
          <h1 id="hero-heading" aria-label="Creativity Never Ends">
            <RevealLine text="Creativity" delay={0.05} />
            <RevealLine text="Never Ends" delay={0.28} emphasis="Never" />
          </h1>
          <p className="hero-subhead">
            An engineering multiverse of flight, field systems, silicon, and stories.
          </p>
        </div>
        <div className="hero-wave">
          <div className="enter-wrap">
            <Link className="enter-button" href="#selected-universes">
              Enter
            </Link>
          </div>
        </div>
      </section>

      <section className="universe-marquee" aria-hidden="true">
        <div className="marquee-track">
          <MarqueeRow products={products} />
          <MarqueeRow products={products} />
        </div>
      </section>

      <section className="intro-statement">
        <p>The practice</p>
        <h2>One studio. Many universes. The work stays in conversation.</h2>
        <p>
          Endlls builds flight, field software, silicon, and the interfaces around them. The ideas
          do not stay in separate rooms.
        </p>
      </section>

      <section className="universe-grid" id="selected-universes" aria-label="Selected universes">
        <div className="universe-grid-heading">
          <p>Universes</p>
          <h2>Selected work</h2>
        </div>
        <div className="universe-grid-list">
          {products.map((product) => (
            <article className="universe-card" key={product.link}>
              <Link href={product.link}>
                <div className="universe-card-media">
                  <span className="universe-card-orb" aria-hidden="true" />
                  <Image src={product.thumbnail} alt="" fill sizes="(max-width: 800px) 100vw, 50vw" />
                  <span className="view-pill">
                    View
                    <Arrow />
                  </span>
                </div>
                <div className="universe-card-meta">
                  <h3>{product.title}</h3>
                  <span className="universe-card-category">{product.kind}</span>
                  <span className="universe-card-year">{product.year}</span>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="capabilities" aria-labelledby="capabilities-heading">
        <div className="capabilities-sticky">
          <p>Index</p>
          <h2 id="capabilities-heading">Core Capabilities</h2>
        </div>
        <div className="capability-list">
          {capabilities.map((capability, index) => {
            const open = openCapability === index;
            const panelId = `capability-${index}`;
            return (
              <div className="capability" key={capability.title}>
                <button
                  type="button"
                  aria-expanded={open}
                  aria-controls={panelId}
                  onClick={() => setOpenCapability(open ? -1 : index)}
                >
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <strong>{capability.title}</strong>
                  <i aria-hidden="true">{open ? "–" : "+"}</i>
                </button>
                <div className={open ? "capability-panel open" : "capability-panel"} id={panelId}>
                  <div>
                    <p>{capability.body}</p>
                    <div className="capability-tags">
                      {capability.tags.map((tag) => (
                        <span key={tag}>[{tag}]</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}

function MarqueeRow({ products }: { products: StudioProduct[] }) {
  return (
    <ul>
      {products.map((product, index) => (
        <li key={`${product.link}-${index}`} className={`marquee-card shape-${index % 3}`}>
          <Link href={product.link} tabIndex={-1}>
            <Image src={product.thumbnail} alt="" fill sizes="240px" />
            <span>{product.title}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

function RevealLine({
  text,
  delay,
  emphasis,
}: {
  text: string;
  delay: number;
  emphasis?: string;
}) {
  const emphasisStart = emphasis ? text.indexOf(emphasis) : -1;
  const emphasisEnd = emphasisStart >= 0 && emphasis ? emphasisStart + emphasis.length : -1;

  return (
    <span className="reveal-line">
      {Array.from(text).map((character, index) => {
        const italic = index >= emphasisStart && index < emphasisEnd;
        return (
          <span className={italic ? "reveal-char italic" : "reveal-char"} key={`${character}-${index}`}>
            <span className="reveal-char-inner" style={{ animationDelay: `${delay + index * 0.035}s` }}>
              {character === " " ? "\u00A0" : character}
            </span>
          </span>
        );
      })}
    </span>
  );
}

function Arrow() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true">
      <path d="M4 12 12 4M6 4h6v6" fill="none" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}
