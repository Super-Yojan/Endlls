"use client";

import Link from "next/link";

export function ScrollFilmHero() {
  return (
    <main className="scroll-film">
      <div className="scroll-film__runway">
        <section className="scroll-film__stage" aria-label="Endlls Studio introduction">
          <video
            className="scroll-film__video"
            poster="/video/endlls-scroll-film-poster.jpg"
            preload="metadata"
            muted
            playsInline
          >
            <source src="/video/endlls-scroll-film.mp4" type="video/mp4" />
          </video>
          <div className="scroll-film__veil" aria-hidden="true" />
          <nav className="scroll-film__actions" aria-label="Explore Endlls Studio">
            <Link href="/work">See Work</Link>
            <Link href="/contact">Start a Project</Link>
          </nav>
        </section>
      </div>
    </main>
  );
}
