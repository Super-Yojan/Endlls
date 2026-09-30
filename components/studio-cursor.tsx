"use client";

import { useEffect, useRef } from "react";

export function StudioCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor || typeof window.matchMedia !== "function") return;

    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!finePointer.matches || reduceMotion.matches) return;

    document.body.classList.add("has-studio-cursor");
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let currentX = x;
    let currentY = y;
    let scale = 1;
    let targetScale = 1;
    let frame = 0;

    const onMove = (event: PointerEvent) => {
      x = event.clientX;
      y = event.clientY;
      cursor.dataset.visible = "true";
    };

    const onOver = (event: PointerEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      targetScale = target.closest("a, button") ? 2.5 : 1;
    };

    const tick = () => {
      currentX += (x - currentX) * 0.18;
      currentY += (y - currentY) * 0.18;
      scale += (targetScale - scale) * 0.18;
      cursor.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%) scale(${scale})`;
      frame = window.requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerover", onOver);
    frame = window.requestAnimationFrame(tick);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      document.body.classList.remove("has-studio-cursor");
    };
  }, []);

  return <div ref={cursorRef} className="studio-cursor" aria-hidden="true" />;
}
