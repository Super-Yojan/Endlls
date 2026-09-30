---
title: PKP Website Overhaul
slug: pkp-website
year: 2026
client: PKP Tender Hearts Foundation
services:
  - Digital experience
  - Brand strategy
summary: A custom React rebuild for a Nepalese-American community foundation—preserving every indexed URL while expanding events, giving, volunteering, and editorial surfaces.
cover: /images/projects/pkp-website/cover.webp
coverAlt: PKP Tender Hearts Foundation website homepage on a dark magenta and maroon brand field
featured: true
order: 1
color: "#f43adb"
credits:
  - Digital experience — Endlls Studio
  - Brand strategy — Endlls Studio
gallery:
  - /images/projects/pkp-website/home.webp
  - /images/projects/pkp-website/events.webp
---

## Continuity for a community foundation

PKP Tender Hearts Foundation serves Nepalese-American communities through cultural preservation, education, and innovation—across Nepal and the diaspora. Their previous presence lived on Squarespace and Square. The brief was to move to a custom stack without breaking what search engines and members already knew.

## A rebuild that keeps every path

We rebuilt the site on React 19, Vite, and Firebase Hosting, Firestore, and Functions. All 31 previously indexed flat URLs were preserved. Public pages ship as prerendered static HTML for SEO. Staging runs at thfva-org.web.app; domain cutover to thfva.org has not completed, so Squarespace remains live on the production domain.

> Move forward without losing the trail behind you.

## Surfaces that serve the mission

The experience spans Home, Projects, Events with registration, Donate, Volunteer, Team, Vision, Community Resources, News, a Nepal flood appeal, and a lazy-loaded `/admin` built with Radix Themes. Seed content includes 25 projects, 11 team members, and 2 events. Event registrations write to Firestore with check-in support and xlsx export.

## Brand carried into the product

The visual system pulls magenta and maroon from the foundation logo (`#f43adb` / `#490004`), set in Satoshi with JetBrains Mono for code-adjacent UI. Face-aware photo cropping keeps community photography readable at every crop.
