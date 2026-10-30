"use client";

import { useEffect } from "react";

// Drives every page: the nav takes the colour of the screen under it, each screen
// arrives tilted and straightens as it lands, headings span the full width, and the
// email can be copied. On phones the nav folds behind a menu button.
export function SiteMotion() {
  useEffect(() => {
    const page = document.querySelector<HTMLElement>(".fa");
    if (!page) return;
    const reduce =
      typeof window.matchMedia !== "function" || window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const screens = Array.from(page.querySelectorAll<HTMLElement>(".screen"));
    const links = Array.from(page.querySelectorAll<HTMLAnchorElement>("header nav a[data-s]"));
    const fits = Array.from(page.querySelectorAll<HTMLElement>(".fit"));
    const float = page.querySelector<HTMLElement>(".float");
    const rows = Array.from(page.querySelectorAll<HTMLElement>(".proj, .study-band p, .study-band li"));
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
      // The hero carries its own call to action, so the floating one waits until it scrolls away.
      const opener = page.querySelector<HTMLElement>(".opener");
      // It also steps aside while it would sit on top of project or case study text.
      const box = float?.getBoundingClientRect();
      const onRow = Boolean(
        box && rows.some((row) => {
          const r = row.getBoundingClientRect();
          return r.top < box.bottom && r.bottom > box.top && r.right > box.left;
        }),
      );
      float?.classList.toggle("away", onRow || Boolean(opener && opener.getBoundingClientRect().bottom > vh * 0.35));
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

    // The hero heading also stretches tall, so the name fills most of the first screen.
    const stretch = () => {
      const heading = page.querySelector<HTMLElement>(".opener h1");
      const scene = page.querySelector<HTMLElement>(".opener .scene");
      if (!heading || !scene) return;
      heading.style.setProperty("--sy", "1");
      const target = scene.clientHeight * (window.innerWidth > 760 ? 0.9 : 0.5);
      const height = heading.getBoundingClientRect().height;
      if (height > 0) heading.style.setProperty("--sy", Math.max(1, Math.min(2.4, target / height)).toFixed(3));
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
      stretch();
      frame();
    };

    fit();
    stretch();
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

    const header = page.querySelector<HTMLElement>("header");
    const menu = page.querySelector<HTMLButtonElement>(".menu-btn");
    const setMenu = (open: boolean) => {
      header?.classList.toggle("open", open);
      menu?.setAttribute("aria-expanded", String(open));
      if (menu) menu.textContent = open ? "Close" : "Menu";
    };
    const onMenu = () => setMenu(menu?.getAttribute("aria-expanded") !== "true");
    const onNav = (event: Event) => {
      if ((event.target as HTMLElement).closest("nav a")) setMenu(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && header?.classList.contains("open")) {
        setMenu(false);
        menu?.focus();
      }
    };
    menu?.addEventListener("click", onMenu);
    header?.addEventListener("click", onNav);
    document.addEventListener("keydown", onKey);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      copy?.removeEventListener("click", onCopy);
      menu?.removeEventListener("click", onMenu);
      header?.removeEventListener("click", onNav);
      document.removeEventListener("keydown", onKey);
      window.clearTimeout(timer);
    };
  }, []);

  return null;
}
