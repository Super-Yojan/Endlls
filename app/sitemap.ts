import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/meta";
import { getAllProjects } from "@/lib/projects";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["/", "/work/", "/about/", "/contact/", ...getAllProjects().map((project) => `/work/${project.slug}/`)];
  return pages.map((path) => ({ url: `${siteUrl}${path}` }));
}
