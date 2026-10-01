"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

export function StudyBand({
  className,
  labelledBy,
  children,
}: {
  className: string;
  labelledBy?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setShown(true);
        observer.disconnect();
      },
      { threshold: 0.12 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className={`${className} study-reveal${shown ? " is-in" : ""}`}
      aria-labelledby={labelledBy}
    >
      {children}
    </section>
  );
}
