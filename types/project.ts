export interface CaseStudySlide {
  src: string;
  alt: string;
}

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
  carousel?: CaseStudySlide[];
  credits: string[];
  color: string | null;
}

export interface Project extends ProjectMeta {
  contentHtml: string;
}
