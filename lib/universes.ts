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
    thumbnail: "/images/projects/pkp-web/cover.webp",
    summary: "The public site for PKP Tender Hearts — events, community, and a way to take part.",
    coverAlt: "PKP Tender Hearts homepage with an International Wellness Day feature and a donate link",
    year: 2026,
    services: ["Digital", "Art direction"],
    order: 1,
  },
  {
    title: "Glid",
    slug: "glid",
    thumbnail: "/images/projects/glid/cover.webp",
    summary: "A product for finding a game nearby — matches, explore, and a way to join.",
    coverAlt: "Glid screen for browsing nearby events, with competitive and casual play",
    year: 2025,
    services: ["Digital", "Art direction"],
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
