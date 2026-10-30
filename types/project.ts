export interface ProjectMeta {
  title: string;
  slug: string;
  year: number;
  client: string;
  services: string[];
  summary: string;
  cover: string;
  coverAlt: string;
  featured: boolean;
  order: number;
  gallery: string[];
  credits: string[];
  color: string | null;
  // A small public tag such as "Paused" or "Launching soon".
  status: string | null;
}

export interface Project extends ProjectMeta {
  contentHtml: string;
}
