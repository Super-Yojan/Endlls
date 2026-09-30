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
    thumbnail: "/images/universes/pkp-web.png",
    summary:
      "The public web for PKP, set in editorial type and built to stay fast on uncertain connections.",
    coverAlt: "Ivory and copper abstract plate for PKP Web",
    year: 2026,
    services: ["Digital", "Engineering"],
    order: 10,
  },
  {
    title: "PKP Field",
    slug: "pkp-field",
    thumbnail: "/images/universes/pkp-field.png",
    summary:
      "Field software for PKP crews — checklists, maps, and notes that keep working away from the desk.",
    coverAlt: "Sand and persimmon abstract plate for PKP Field",
    year: 2026,
    services: ["Field systems", "Engineering"],
    order: 11,
  },
  {
    title: "Glid",
    slug: "glid",
    thumbnail: "/images/universes/glid.png",
    summary: "A glide vehicle and the software that keeps its path quiet, efficient, and deliberate.",
    coverAlt: "Gold arc abstract plate for Glid",
    year: 2025,
    services: ["Flight", "Autonomy"],
    order: 12,
  },
  {
    title: "Blimp Autonomy",
    slug: "blimp-autonomy",
    thumbnail: "/images/universes/blimp-autonomy.png",
    summary: "Navigation and station-keeping for an airship that has time to think.",
    coverAlt: "Soft copper ring abstract plate for Blimp Autonomy",
    year: 2025,
    services: ["Flight", "Autonomy"],
    order: 13,
  },
  {
    title: "Drone Delivery",
    slug: "drone-delivery",
    thumbnail: "/images/universes/drone-delivery.png",
    summary: "Last-mile flight logistics, from pad assignment to a careful handoff on the ground.",
    coverAlt: "Persimmon diagonal abstract plate for Drone Delivery",
    year: 2026,
    services: ["Flight", "Logistics"],
    order: 14,
  },
  {
    title: "Freedom CTF",
    slug: "freedom-ctf",
    thumbnail: "/images/universes/freedom-ctf.png",
    summary:
      "A security competition and training ground for breaking a system carefully and writing it back stronger.",
    coverAlt: "Ink and gold abstract plate for Freedom CTF",
    year: 2024,
    services: ["Security", "Engineering"],
    order: 15,
  },
  {
    title: "Silicon / MIPS",
    slug: "silicon-mips",
    thumbnail: "/images/universes/silicon-mips.png",
    summary:
      "Processor study and MIPS systems work — silicon, instruction sets, and the machines that teach them.",
    coverAlt: "Geometric copper grid abstract plate for Silicon and MIPS",
    year: 2024,
    services: ["Silicon", "Engineering"],
    order: 16,
  },
  {
    title: "Motor Dynamics",
    slug: "motor-dynamics",
    thumbnail: "/images/universes/motor-dynamics.png",
    summary: "Motors, drives, and the control loops that turn a command into smooth motion.",
    coverAlt: "Concentric copper rings abstract plate for Motor Dynamics",
    year: 2025,
    services: ["Motion", "Engineering"],
    order: 17,
  },
  {
    title: "Avionics",
    slug: "avionics",
    thumbnail: "/images/universes/avionics.png",
    summary: "Shared flight computers for the air fleet, small enough to trust and plain enough to debug.",
    coverAlt: "Ivory field with a gold horizon for Avionics",
    year: 2025,
    services: ["Flight", "Silicon"],
    order: 18,
  },
  {
    title: "Ground Control",
    slug: "ground-control",
    thumbnail: "/images/universes/ground-control.png",
    summary: "The operator console for live missions — maps, links, and a calm place to decide.",
    coverAlt: "Dark ink console abstract plate for Ground Control",
    year: 2026,
    services: ["Flight", "Digital"],
    order: 19,
  },
  {
    title: "Perception",
    slug: "perception",
    thumbnail: "/images/universes/perception.png",
    summary: "Vision and sensing for craft that have to recognize a landing, a wire, or a person.",
    coverAlt: "Persimmon aperture abstract plate for Perception",
    year: 2025,
    services: ["Autonomy", "Engineering"],
    order: 20,
  },
  {
    title: "Radio Mesh",
    slug: "radio-mesh",
    thumbnail: "/images/universes/radio-mesh.png",
    summary: "Field radios that keep a crew connected when the wider network thins out.",
    coverAlt: "Network of gold points abstract plate for Radio Mesh",
    year: 2024,
    services: ["Field systems", "Engineering"],
    order: 21,
  },
  {
    title: "Power Systems",
    slug: "power-systems",
    thumbnail: "/images/universes/power-systems.png",
    summary: "Storage, distribution, and the quiet accounting of energy across vehicles and pads.",
    coverAlt: "Copper bar abstract plate for Power Systems",
    year: 2025,
    services: ["Motion", "Engineering"],
    order: 22,
  },
  {
    title: "Mission Planner",
    slug: "mission-planner",
    thumbnail: "/images/universes/mission-planner.png",
    summary: "Routes shaped by wind, range, and the places a vehicle is not allowed to go.",
    coverAlt: "Arcing gold route abstract plate for Mission Planner",
    year: 2026,
    services: ["Flight", "Autonomy"],
    order: 23,
  },
  {
    title: "Endlls Atlas",
    slug: "endlls-atlas",
    thumbnail: "/images/universes/endlls-atlas.png",
    summary: "A living map of the studio multiverse — every universe, and how the work connects.",
    coverAlt: "Layered sand and ink map abstract plate for Endlls Atlas",
    year: 2026,
    services: ["Digital", "Creative direction"],
    order: 24,
  },
];

export function heroParallaxProducts() {
  return universeProducts.map((universe) => ({
    title: universe.title,
    link: `/work/${universe.slug}`,
    thumbnail: universe.thumbnail,
  }));
}
