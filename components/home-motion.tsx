"use client";

import { useEffect } from "react";

// Drives the home page: the nav takes the colour of the screen under it, each screen
// arrives tilted and straightens as it lands, headings span the full width, and the
// email can be copied.
export function HomeMotion() {
  useEffect(() => {
    const page = document.querySelector<HTMLElement>(".fa");
    if (!page) return;
    const reduce =
      typeof window.matchMedia !== "function" || window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const screens = Array.from(page.querySelectorAll<HTMLElement>(".screen"));
    const links = Array.from(page.querySelectorAll<HTMLAnchorElement>("header nav a"));
    const fits = Array.from(page.querySelectorAll<HTMLElement>(".fit"));
    screens.forEach((s, i) => (s.style.zIndex = String(i + 1)));

    const frame = () => {
      const vh = window.innerHeight;
      let cur = screens[0];
      screens.forEach((s, i) => {
        const top = s.getBoundingClientRect().top;
        if (top <= 61) cur = s;
        if (!reduce && i > 0) {
          const p = Math.max(0, Math.min(1, top / vh));
          s.style.transform = p > 0 ? `rotate(${(-5 * p).toFixed(2)}deg)` : "none";
        }
        if (top < vh * 0.7) s.classList.add("in");
      });
      if (cur?.dataset.c) page.style.setProperty("--bg", cur.dataset.c);
      links.forEach((a) => a.classList.toggle("on", a.dataset.s === cur?.id));
    };

    const fit = () => {
      fits.forEach((h) => {
        const cs = getComputedStyle(h);
        const avail = h.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
        h.style.fontSize = "100px";
        const range = document.createRange();
        range.selectNodeContents(h);
        const width = range.getBoundingClientRect().width;
        if (width > 0) h.style.fontSize = `${Math.floor(((100 * avail) / width) * 0.995)}px`;
      });
    };

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        frame();
      });
    };
    const onResize = () => {
      fit();
      frame();
    };

    fit();
    frame();
    document.fonts?.ready.then(onResize);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    const copy = page.querySelector<HTMLButtonElement>("#copy");
    const msg = page.querySelector<HTMLElement>("#copy-msg");
    const email = page.querySelector<HTMLElement>("#email");
    let timer = 0;
    const onCopy = () => {
      if (!msg || !email) return;
      const done = () => {
        msg.textContent = "Copied";
        window.clearTimeout(timer);
        timer = window.setTimeout(() => (msg.textContent = ""), 1800);
      };
      const fallback = () => {
        const range = document.createRange();
        range.selectNodeContents(email);
        const selection = getSelection();
        selection?.removeAllRanges();
        selection?.addRange(range);
        msg.textContent = "Selected, press copy";
      };
      try {
        navigator.clipboard.writeText(email.textContent ?? "").then(done, fallback);
      } catch {
        fallback();
      }
    };
    copy?.addEventListener("click", onCopy);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      copy?.removeEventListener("click", onCopy);
      window.clearTimeout(timer);
    };
  }, []);

  return null;
}
