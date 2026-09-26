"use client";

import Link from "next/link";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  COPY_WINDOWS,
  FRAME_COUNT,
  canvasBufferSize,
  coverRect,
  frameIndex,
  frameSrc,
  preloadFrames,
  rangeOpacity,
  revealOpacity,
} from "@/lib/frame-sequence";
import { isCtaProgress } from "@/lib/video-progress";

gsap.registerPlugin(ScrollTrigger);

const finalFrame = frameSrc(FRAME_COUNT - 1);

function subscribeReducedMotion(onChange: () => void) {
  const media = window.matchMedia("(prefers-reduced-motion: reduce)");
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
}

function reducedMotionSnapshot() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function setLayer(node: HTMLElement | null, opacity: number) {
  if (!node) return;
  const visible = opacity > 0.02;
  node.style.opacity = String(opacity);
  node.style.visibility = visible ? "visible" : "hidden";
  node.setAttribute("aria-hidden", visible ? "false" : "true");
}

export function ScrollFilmHero() {
  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    reducedMotionSnapshot,
    () => false,
  );
  const rootRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scrimRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLElement>(null);
  const featureOneRef = useRef<HTMLElement>(null);
  const featureTwoRef = useRef<HTMLElement>(null);
  const actionsRef = useRef<HTMLElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [status, setStatus] = useState<"loading" | "ready" | "fallback">("loading");
  const [loadPercent, setLoadPercent] = useState(0);

  const fallback = reducedMotion || status === "fallback";
  const ready = status === "ready" && !reducedMotion;

  useEffect(() => {
    if (reducedMotion) return;
    let cancelled = false;
    let lastPercent = -1;

    preloadFrames(FRAME_COUNT, (loaded, total) => {
      if (cancelled) return;
      const percent = Math.round((loaded / total) * 100);
      if (percent === lastPercent) return;
      lastPercent = percent;
      setLoadPercent(percent);
    })
      .then((images) => {
        if (cancelled) return;
        imagesRef.current = images;
        setStatus("ready");
      })
      .catch(() => {
        if (!cancelled) setStatus("fallback");
      });

    return () => {
      cancelled = true;
    };
  }, [reducedMotion]);

  useEffect(() => {
    if (!ready) return;
    const root = rootRef.current;
    const stage = stageRef.current;
    const canvas = canvasRef.current;
    const actions = actionsRef.current;
    if (!root || !stage || !canvas || !actions) return;

    const context2d = canvas.getContext("2d");
    if (!context2d) {
      setStatus("fallback");
      return;
    }

    const images = imagesRef.current;
    const sequence = { frame: 0 };
    let frameId: number | null = null;
    let latestProgress = 0;
    let trigger: ScrollTrigger | null = null;
    let placedWidth = 0;
    let placedHeight = 0;

    const placeCopy = () => {
      const bounds = canvas.getBoundingClientRect();
      const sample = images[0];
      if (!sample || (bounds.width === placedWidth && bounds.height === placedHeight)) return;
      const portrait = bounds.height > bounds.width * 1.15;
      const rect = coverRect(
        bounds.width,
        bounds.height,
        sample.naturalWidth,
        sample.naturalHeight,
        "contain",
        portrait ? "start" : "center",
      );
      if (!rect) return;
      if (portrait) rect.y = Math.min(72, bounds.height * 0.05);
      placedWidth = bounds.width;
      placedHeight = bounds.height;

      const pad = Math.max(16, Math.min(rect.width, rect.height) * 0.06);
      const copyWidth = Math.max(140, rect.width - pad * 2);
      const compact = rect.height < 460;
      if (headlineRef.current) {
        headlineRef.current.style.top = `${rect.y + pad}px`;
        headlineRef.current.style.left = `${rect.x + pad}px`;
        headlineRef.current.style.right = "auto";
        headlineRef.current.style.maxWidth = `${copyWidth}px`;
        const heading = headlineRef.current.querySelector("h1");
        if (heading) heading.style.fontSize = compact ? `${Math.max(34, rect.height * 0.2)}px` : "";
      }
      const featureBottom = bounds.height - (rect.y + rect.height) + pad;
      for (const node of [featureOneRef.current, featureTwoRef.current]) {
        if (!node) continue;
        node.style.top = "auto";
        node.style.bottom = `${featureBottom}px`;
        node.style.left = `${rect.x + pad}px`;
        node.style.right = "auto";
        node.style.maxWidth = `${copyWidth}px`;
        const heading = node.querySelector("h2");
        if (heading) heading.style.fontSize = compact ? `${Math.max(26, rect.height * 0.14)}px` : "";
      }
      actions.style.margin = "0";
      if (portrait) {
        actions.style.left = `${rect.x + pad}px`;
        actions.style.width = `${Math.max(0, rect.width - pad * 2)}px`;
        actions.style.bottom = "auto";
        actions.style.top = `${rect.y + rect.height + pad}px`;
      } else {
        actions.style.left = `${rect.x}px`;
        actions.style.width = `${rect.width}px`;
        actions.style.top = "auto";
        actions.style.bottom = `${featureBottom}px`;
      }
      if (scrimRef.current) {
        scrimRef.current.style.top = `${rect.y + rect.height * 0.42}px`;
        scrimRef.current.style.right = "auto";
        scrimRef.current.style.bottom = "auto";
        scrimRef.current.style.left = `${rect.x}px`;
        scrimRef.current.style.width = `${rect.width}px`;
        scrimRef.current.style.height = `${rect.height * 0.58}px`;
      }
    };

    const paint = () => {
      const image = images[sequence.frame];
      if (!image) return;
      const bounds = canvas.getBoundingClientRect();
      const buffer = canvasBufferSize(bounds.width, bounds.height, window.devicePixelRatio || 1);
      const portrait = bounds.width > 0 && bounds.height > bounds.width * 1.15;
      const draw = buffer
        ? coverRect(
            buffer.width,
            buffer.height,
            image.naturalWidth,
            image.naturalHeight,
            "contain",
            portrait ? "start" : "center",
          )
        : null;
      if (portrait && draw && buffer) {
        draw.y = Math.min(72, bounds.height * 0.05) * (buffer.height / bounds.height);
      }
      if (!buffer || !draw) return;

      if (canvas.width !== buffer.width || canvas.height !== buffer.height) {
        canvas.width = buffer.width;
        canvas.height = buffer.height;
      }

      context2d.imageSmoothingEnabled = true;
      context2d.imageSmoothingQuality = "high";
      context2d.fillStyle = "#0d0d0d";
      context2d.fillRect(0, 0, buffer.width, buffer.height);
      context2d.drawImage(image, draw.x, draw.y, draw.width, draw.height);
      placeCopy();
    };

    const applyPresentation = (progress: number) => {
      setLayer(headlineRef.current, rangeOpacity(progress, COPY_WINDOWS.headline.start, COPY_WINDOWS.headline.end));
      setLayer(
        featureOneRef.current,
        rangeOpacity(progress, COPY_WINDOWS.featureOne.start, COPY_WINDOWS.featureOne.end),
      );
      setLayer(
        featureTwoRef.current,
        rangeOpacity(progress, COPY_WINDOWS.featureTwo.start, COPY_WINDOWS.featureTwo.end),
      );

      const reveal = revealOpacity(progress);
      const revealed = isCtaProgress(progress);
      actions.style.opacity = String(reveal);
      actions.style.transform = `translateY(${(1 - reveal) * 24}px)`;
      actions.style.visibility = revealed ? "visible" : "hidden";
      actions.style.pointerEvents = revealed ? "auto" : "none";

      if (scrimRef.current) {
        const featureStrength = Math.max(
          rangeOpacity(progress, COPY_WINDOWS.featureOne.start, COPY_WINDOWS.featureOne.end),
          rangeOpacity(progress, COPY_WINDOWS.featureTwo.start, COPY_WINDOWS.featureTwo.end),
          reveal,
        );
        scrimRef.current.style.opacity = String(featureStrength);
      }
    };

    const schedule = (progress: number) => {
      latestProgress = progress;
      sequence.frame = frameIndex(progress, FRAME_COUNT);
      if (frameId !== null) return;
      frameId = requestAnimationFrame(() => {
        frameId = null;
        paint();
        applyPresentation(latestProgress);
      });
    };

    sequence.frame = 0;
    paint();
    applyPresentation(0);

    const gsapContext = gsap.context(() => {
      trigger = ScrollTrigger.create({
        trigger: stage,
        start: "top top",
        end: "+=300%",
        pin: true,
        scrub: 0.15,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => schedule(self.progress),
      });
    }, root);

    const onResize = () => {
      paint();
      ScrollTrigger.refresh();
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      if (frameId !== null) cancelAnimationFrame(frameId);
      trigger?.kill();
      gsapContext.revert();
    };
  }, [ready]);

  return (
    <main
      ref={rootRef}
      className={`scroll-film${fallback ? " scroll-film--fallback" : ""}${ready ? " scroll-film--ready" : ""}`}
    >
      <section ref={stageRef} className="scroll-film__stage" aria-label="Endlls Studio introduction">
        <canvas ref={canvasRef} className="scroll-film__canvas" aria-hidden="true" />
        <img className="scroll-film__fallback-image" src={finalFrame} alt="" />
        <div ref={scrimRef} className="scroll-film__scrim" aria-hidden="true" />
        <p className="scroll-film__summary">
          Endlls Studio. Creativity never ends. An independent creative studio shaping identities,
          digital experiences, and campaigns.
        </p>
        <article
          ref={headlineRef}
          className="scroll-film__copy scroll-film__copy--headline"
          data-overlay="headline"
          aria-hidden="true"
        >
          <p className="scroll-film__kicker">Endlls Studio</p>
          <h1>Look closer.</h1>
        </article>
        <article
          ref={featureOneRef}
          className="scroll-film__copy scroll-film__copy--feature"
          data-overlay="feature-1"
          aria-hidden="true"
        >
          <p className="scroll-film__kicker">01</p>
          <h2>Brand</h2>
          <p className="scroll-film__detail">Identity, voice, and a system with range.</p>
        </article>
        <article
          ref={featureTwoRef}
          className="scroll-film__copy scroll-film__copy--feature"
          data-overlay="feature-2"
          aria-hidden="true"
        >
          <p className="scroll-film__kicker">02</p>
          <h2>Digital</h2>
          <p className="scroll-film__detail">Experiences and campaigns made to travel.</p>
        </article>
        <nav ref={actionsRef} className="scroll-film__actions" aria-label="Explore Endlls Studio">
          <Link href="/work">See Work</Link>
          <Link href="/contact">Start a Project</Link>
        </nav>
        {fallback ? null : ready ? null : (
          <div className="scroll-film__loader" role="status" aria-live="polite">
            <p className="scroll-film__loader-mark">Endlls</p>
            <div className="scroll-film__loader-track" aria-hidden="true">
              <span style={{ width: `${loadPercent}%` }} />
            </div>
            <p className="scroll-film__loader-percent">{loadPercent}%</p>
          </div>
        )}
      </section>
      <noscript>
        <style>{`.scroll-film__loader{display:none!important}.scroll-film__fallback-image{visibility:visible;opacity:1}.scroll-film__actions{visibility:visible!important;opacity:1!important;transform:none!important;pointer-events:auto!important}`}</style>
      </noscript>
    </main>
  );
}
