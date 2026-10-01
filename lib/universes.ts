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
    title: "PKP Tender Hearts — Creative Engagement",
    slug: "pkp-web",
    thumbnail: "/images/projects/pkp/dtfest-hero.webp",
    summary:
      "Endlls as creative lead across a full PKP engagement—website rebuild, brand guidelines, flyers and posters, social video, and a documentary now entering production—while keeping the foundation’s public trail intact.",
    coverAlt: "DTFest hero on the PKP site, a wide photograph of a crowded celebration in a decorated hall",
    year: 2026,
    services: ["Brand identity", "Digital experience", "Campaign", "Film & motion"],
    order: 1,
  },
  {
    title: "Glid",
    slug: "glid",
    thumbnail: "/images/projects/glid/intro-v4-hero.webp",
    summary:
      "Endlls Studios built Glid from the ground up — session-first sports matchmaking that leads with place, time, and skill before messaging.",
    coverAlt: "Close-up of hands holding an orange basketball against a blue sky, a landscape still from the Glid intro film",
    year: 2026,
    services: ["Product engineering", "Digital experience", "Brand identity", "Campaign"],
    order: 2,
  },
  {
    title: "PKP Brand",
    slug: "pkp-brand",
    thumbnail: "/images/projects/pkp-brand/cover.webp",
    summary: "Campaign art for PKP Tender Hearts, including a community vigil and a blood drive.",
    coverAlt: "PKP campaign art for a Nepal flash flood vigil beside a blood drive call to action",
    year: 2026,
    services: ["Campaign", "Art direction"],
    order: 3,
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
