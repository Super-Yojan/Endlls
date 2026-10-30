import type { Metadata } from "next";

export const siteUrl = "https://endlls.com";
export const siteName = "Endlls Studio";

// Page metadata with matching Open Graph and Twitter tags, so shared links get a preview.
export function pageMeta({
  title,
  description,
  path,
  image = "/og.jpg",
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
}): Metadata {
  const fullTitle = title.includes(siteName) ? title : `${title} — ${siteName}`;
  return {
    title: { absolute: fullTitle },
    description,
    alternates: { canonical: path },
    openGraph: { type: "website", siteName, url: path, title: fullTitle, description, images: [image] },
    twitter: { card: "summary_large_image", title: fullTitle, description, images: [image] },
  };
}
