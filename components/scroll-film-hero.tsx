"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { isCtaProgress, progressToTime } from "@/lib/video-progress";

gsap.registerPlugin(ScrollTrigger);

export function ScrollFilmHero() {
  const rootRef = useRef<HTMLElement>(null);
  const runwayRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const veilRef = useRef<HTMLDivElement>(null);
  const actionsRef = useRef<HTMLElement>(null);
  const [fallback, setFallback] = useState(false);

  useEffect(() => {
    const root = rootRef.current;
    const runway = runwayRef.current;
    const stage = stageRef.current;
    const video = videoRef.current;
    const veil = veilRef.current;
    const actions = actionsRef.current;
    if (!root || !runway || !stage || !video || !veil || !actions) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setFallback(true);
      return;
    }

    let frameId: number | null = null;
    let queuedTime: number | null = null;
    let trigger: ScrollTrigger | null = null;
    let context: gsap.Context | null = null;

    const showFallback = () => setFallback(true);

    const updatePresentation = (progress: number) => {
      const revealProgress = Math.max(0, Math.min(1, (progress - 0.9) / 0.1));
      const revealed = isCtaProgress(progress);
      veil.style.opacity = String(revealProgress * 0.58);
      actions.style.opacity = String(revealProgress);
      actions.style.transform = `translateY(${(1 - revealProgress) * 24}px)`;
      actions.style.visibility = revealed ? "visible" : "hidden";
      actions.style.pointerEvents = revealed ? "auto" : "none";
    };

    const scheduleSeek = (progress: number) => {
      queuedTime = progressToTime(progress, video.duration);
      if (queuedTime === null) {
        showFallback();
        return;
      }
      if (frameId !== null) return;

      frameId = requestAnimationFrame(() => {
        frameId = null;
        if (queuedTime !== null) video.currentTime = queuedTime;
      });
    };

    const initialize = () => {
      if (progressToTime(0, video.duration) === null) {
        showFallback();
        return;
      }

      context = gsap.context(() => {
        trigger = ScrollTrigger.create({
          trigger: runway,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.15,
          pin: stage,
          pinSpacing: false,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            scheduleSeek(self.progress);
            updatePresentation(self.progress);
          },
        });
      }, root);
    };

    video.addEventListener("error", showFallback);
    if (video.readyState >= 1) initialize();
    else video.addEventListener("loadedmetadata", initialize, { once: true });

    return () => {
      video.removeEventListener("loadedmetadata", initialize);
      video.removeEventListener("error", showFallback);
      if (frameId !== null) cancelAnimationFrame(frameId);
      trigger?.kill();
      context?.revert();
    };
  }, []);

  return (
    <main ref={rootRef} className={`scroll-film${fallback ? " scroll-film--fallback" : ""}`}>
      <div ref={runwayRef} className="scroll-film__runway">
        <section
          ref={stageRef}
          className="scroll-film__stage"
          aria-label="Endlls Studio introduction"
        >
          <video
            ref={videoRef}
            className="scroll-film__video"
            poster="/video/endlls-scroll-film-poster.jpg"
            preload="metadata"
            muted
            playsInline
          >
            <source src="/video/endlls-scroll-film.mp4" type="video/mp4" />
          </video>
          <Image
            className="scroll-film__fallback-image"
            src="/video/endlls-scroll-film-final.jpg"
            alt=""
            fill
            sizes="100vw"
            aria-hidden="true"
          />
          <div ref={veilRef} className="scroll-film__veil" aria-hidden="true" />
          <nav
            ref={actionsRef}
            className="scroll-film__actions"
            aria-label="Explore Endlls Studio"
          >
            <Link href="/work">See Work</Link>
            <Link href="/contact">Start a Project</Link>
          </nav>
        </section>
      </div>
    </main>
  );
}
