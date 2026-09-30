export type UniverseProduct = {
  title: string;
  slug: string;
  thumbnail: string;
  summary: string;
  coverAlt: string;
  year: number;
  services: string[];
  order: number;
};

export const universeProducts: UniverseProduct[] = [
  {
    title: "PKP Web",
    slug: "pkp-web",
    thumbnail: "/images/universes/pkp-web.jpg",
    summary: "The public site for PKP, set in editorial type and paced for a careful first read.",
    coverAlt: "Laptop on a sunlit desk showing the PKP Web layout beside printed pages",
    year: 2026,
    services: ["Digital", "Art direction"],
    order: 5,
  },
  {
    title: "Glid",
    slug: "glid",
    thumbnail: "/images/universes/glid.jpg",
    summary:
      "Endlls Studios built Glid from the ground up—codebase, app design, website, marketing, social, and posters—for session-first sports matchmaking that leads with place, time, and skill before messaging.",
    coverAlt: "White sailplane photographed on a pale airfield in early light",
    year: 2026,
    services: ["Product engineering", "Digital experience", "Brand identity", "Campaign"],
    order: 6,
  },
  {
    title: "Aster House",
    slug: "aster-house",
    thumbnail: "/images/projects/aster-house/cover.png",
    summary: "A quiet identity system for a coastal retreat built around light, material, and place.",
    coverAlt: "Warm ivory stationery for the fictional Aster House identity",
    year: 2026,
    services: ["Brand identity", "Art direction"],
    order: 1,
  },
  {
    title: "Kinfield Editions",
    slug: "kinfield-editions",
    thumbnail: "/images/projects/kinfield-editions/cover.png",
    summary:
      "A cinematic publishing platform connecting architecture, objects, and a more deliberate way of living.",
    coverAlt: "Fictional Kinfield Editions black timber retreat in misty mountains",
    year: 2026,
    services: ["Digital experience", "Creative direction"],
    order: 2,
  },
  {
    title: "Nocturne Radio",
    slug: "nocturne-radio",
    thumbnail: "/images/projects/nocturne-radio/cover.png",
    summary: "A nocturnal campaign identity for an independent radio platform devoted to deep listening.",
    coverAlt: "Black vinyl record photographed for the fictional Nocturne Radio campaign",
    year: 2025,
    services: ["Campaign", "Brand strategy"],
    order: 3,
  },
  {
    title: "Common Ground",
    slug: "common-ground",
    thumbnail: "/images/projects/common-ground/cover.png",
    summary: "A cultural campaign turning a city-wide arts program into one connected visual language.",
    coverAlt: "Abstract black paper and ivory textile installation for fictional Common Ground Arts",
    year: 2025,
    services: ["Creative direction", "Campaign"],
    order: 4,
  },
];

export function heroParallaxProducts() {
  return universeProducts.map((universe) => ({
    title: universe.title,
    link: `/work/${universe.slug}`,
    thumbnail: universe.thumbnail,
    category: universe.services[0],
    code: universe.slug.replace(/-/g, "·").toUpperCase(),
    year: universe.year,
    summary: universe.summary,
  }));
}
