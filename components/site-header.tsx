"use client";

import Link from "next/link";
import { KeyboardEvent, useEffect, useRef, useState } from "react";

const links = [
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const mobileNavRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (open) mobileNavRef.current?.querySelector<HTMLAnchorElement>("a")?.focus();
  }, [open]);

  useEffect(() => {
    document.body.classList.toggle("menu-open", open);
    return () => document.body.classList.remove("menu-open");
  }, [open]);

  const closeAndRestoreFocus = () => {
    toggleRef.current?.focus();
    setOpen(false);
  };

  const handleMobileKeys = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === "Escape") {
      event.preventDefault();
      closeAndRestoreFocus();
      return;
    }
    if (event.key !== "Tab") return;

    const items = Array.from(event.currentTarget.querySelectorAll<HTMLAnchorElement>("a"));
    const first = items[0];
    const last = items.at(-1);
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last?.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first?.focus();
    }
  };

  return (
    <>
    <header className="studio-header">
      <Link className="studio-wordmark" href="/" aria-label="Endlls Studio home">
        endlls
      </Link>
      <nav className="studio-nav" aria-label="Primary">
        {links.map((link) => (
          <Link key={link.href} href={link.href}>
            {link.label}
          </Link>
        ))}
      </nav>
      <button
        ref={toggleRef}
        className="studio-plus"
        type="button"
        aria-expanded={open}
        aria-controls="mobile-navigation"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((value) => !value)}
      >
        <span />
        <span />
      </button>
    </header>
    <nav
      ref={mobileNavRef}
      id="mobile-navigation"
      className="studio-menu"
      aria-label="Mobile navigation"
      hidden={!open}
      onKeyDown={handleMobileKeys}
    >
      {links.map((link) => (
        <Link key={link.href} href={link.href} onClick={() => setOpen(false)}>
          {link.label}
        </Link>
      ))}
    </nav>
    <Link className="system-pill" href="/contact">
      <span className="system-dot" aria-hidden="true" />
      <span className="system-pill-label">System Online</span>
    </Link>
    </>
  );
}
