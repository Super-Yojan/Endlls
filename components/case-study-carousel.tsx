"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import type { CaseStudySlide } from "@/types/project";

function isVideo(src: string) {
  return src.toLowerCase().endsWith(".mp4");
}

export function CaseStudyCarousel({
  slides,
  label = "Project media",
}: {
  slides: CaseStudySlide[];
  label?: string;
}) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const programmatic = useRef(false);
  const scrollToken = useRef(0);
  const active = slides[index] ?? slides[0];

  useEffect(() => {
    const root = scrollerRef.current;
    if (!root) return;
    root.querySelectorAll("video").forEach((video, videoIndex) => {
      if (videoIndex === index) return;
      try {
        video.pause();
      } catch {
        // jsdom does not implement media playback.
      }
    });
  }, [index]);

  function syncFromScroll() {
    const scroller = scrollerRef.current;
    if (!scroller || scroller.clientWidth === 0 || programmatic.current) return;
    const next = Math.min(
      slides.length - 1,
      Math.max(0, Math.round(scroller.scrollLeft / scroller.clientWidth)),
    );
    setIndex((current) => (current === next ? current : next));
  }

  function go(next: number) {
    const scroller = scrollerRef.current;
    const clamped = Math.min(slides.length - 1, Math.max(0, next));
    setIndex(clamped);
    if (!scroller) return;
    const reduced =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const token = ++scrollToken.current;
    programmatic.current = true;
    try {
      scroller.scrollTo?.({
        left: clamped * scroller.clientWidth,
        behavior: reduced ? "auto" : "smooth",
      });
    } catch {
      programmatic.current = false;
      return;
    }
    window.setTimeout(() => {
      if (scrollToken.current === token) programmatic.current = false;
    }, reduced ? 0 : 500);
  }

  function onKeyDown(event: KeyboardEvent<HTMLElement>) {
    if (event.target !== event.currentTarget) return;
    if (event.key === "ArrowRight") {
      event.preventDefault();
      go(index + 1);
    }
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      go(index - 1);
    }
  }

  if (!active) return null;

  return (
    <section
      className="case-carousel"
      aria-roledescription="carousel"
      aria-label={label}
      tabIndex={0}
      onKeyDown={onKeyDown}
    >
      <div
        className="case-carousel-scroller"
        ref={scrollerRef}
        onScroll={syncFromScroll}
      >
        {slides.map((slide, slideIndex) => (
          <div
            className="case-carousel-slide"
            key={slide.src}
            aria-roledescription="slide"
            aria-label={`${slideIndex + 1} of ${slides.length}`}
            aria-hidden={slideIndex !== index}
          >
            {isVideo(slide.src) ? (
              <video
                controls
                playsInline
                preload="metadata"
                src={slide.src}
                aria-label={slide.alt}
              />
            ) : (
              <img src={slide.src} alt={slide.alt} />
            )}
          </div>
        ))}
      </div>
      <div className="case-carousel-controls">
        <button type="button" onClick={() => go(index - 1)} disabled={index === 0}>
          Previous
        </button>
        <p className="case-carousel-caption" aria-live="polite">
          <span>{active.alt}</span>
          <span>
            {index + 1} / {slides.length}
          </span>
        </p>
        <button
          type="button"
          onClick={() => go(index + 1)}
          disabled={index === slides.length - 1}
        >
          Next
        </button>
      </div>
      <div className="case-carousel-dots">
        {slides.map((slide, slideIndex) => (
          <button
            key={slide.src}
            type="button"
            aria-label={`Show ${slide.alt}`}
            aria-current={slideIndex === index ? "true" : undefined}
            onClick={() => go(slideIndex)}
          />
        ))}
      </div>
    </section>
  );
}
