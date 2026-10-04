import { publicImageSize } from "@/lib/image-size";

export type StudyOrientation = "landscape" | "portrait" | "square";

export type StudyImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
  ratio: number;
};

export type StudyVideo = {
  html: string;
  wide: boolean;
};

export type StudyImageGroup = {
  ratio: number;
  images: StudyImage[];
};

export type StudySection = {
  id: string;
  title: string | null;
  ink: boolean;
  quote: string | null;
  bodyHtml: string;
  imageGroups: StudyImageGroup[];
  videos: StudyVideo[];
};

const blockTags = new Set(["h2", "h3", "p", "blockquote", "ul", "ol", "figure"]);

export function studyOrientation(ratio: number): StudyOrientation {
  if (ratio >= 1.15) return "landscape";
  if (ratio <= 0.92) return "portrait";
  return "square";
}

export function aspectsMatch(a: number, b: number) {
  if (!Number.isFinite(a) || !Number.isFinite(b) || a <= 0 || b <= 0) return false;
  if (studyOrientation(a) !== studyOrientation(b)) return false;
  return Math.abs(a - b) / Math.max(a, b) < 0.04;
}

export function groupByAspect(images: StudyImage[]): StudyImageGroup[] {
  const groups: StudyImageGroup[] = [];
  for (const image of images) {
    const last = groups.at(-1);
    if (last && aspectsMatch(last.ratio, image.ratio)) {
      last.images.push(image);
    } else {
      groups.push({ ratio: image.ratio, images: [image] });
    }
  }
  return groups;
}

function attribute(source: string, name: string) {
  const match = new RegExp(`\\b${name}\\s*=\\s*(?:"([^"]*)"|'([^']*)')`, "i").exec(source);
  return (match?.[1] ?? match?.[2] ?? "").trim();
}

function decodeText(value: string) {
  return value
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\s+/g, " ")
    .trim();
}

function slugify(value: string) {
  const slug = value
    .toLowerCase()
    .replace(/&amp;/g, " ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  return slug || "section";
}

function readElement(html: string, start: number) {
  const open = /^<([a-z0-9]+)\b[^>]*>/i.exec(html.slice(start));
  if (!open) return null;
  const tag = open[1].toLowerCase();
  const openTag = open[0];
  if (openTag.endsWith("/>")) {
    return { tag, html: openTag, end: start + openTag.length };
  }
  let depth = 1;
  let index = start + openTag.length;
  const openPattern = new RegExp(`<${tag}\\b[^>]*>`, "gi");
  const closePattern = new RegExp(`</${tag}\\s*>`, "gi");
  while (depth > 0 && index < html.length) {
    openPattern.lastIndex = index;
    closePattern.lastIndex = index;
    const nextOpen = openPattern.exec(html);
    const nextClose = closePattern.exec(html);
    if (!nextClose) return null;
    if (nextOpen && nextOpen.index < nextClose.index) {
      depth += 1;
      index = nextOpen.index + nextOpen[0].length;
    } else {
      depth -= 1;
      index = nextClose.index + nextClose[0].length;
    }
  }
  return { tag, html: html.slice(start, index), end: index };
}

type Block =
  | { kind: "h2"; text: string }
  | { kind: "body"; html: string }
  | { kind: "quote"; text: string }
  | { kind: "image"; src: string; alt: string }
  | { kind: "video"; html: string; wide: boolean };

function paragraphImage(html: string) {
  const image = /<img\b[^>]*>/i.exec(html);
  if (!image) return null;
  const leftover = html
    .replace(image[0], "")
    .replace(/<\/?p[^>]*>/gi, "")
    .replace(/<br\s*\/?>/gi, "")
    .trim();
  if (leftover) return null;
  const src = attribute(image[0], "src");
  if (!src.startsWith("/")) return null;
  return { src, alt: attribute(image[0], "alt") };
}

function parseBlocks(html: string): Block[] {
  const blocks: Block[] = [];
  let index = 0;
  while (index < html.length) {
    const next = html.slice(index).search(/<[a-z]/i);
    if (next === -1) break;
    index += next;
    const element = readElement(html, index);
    if (!element) break;
    index = element.end;
    if (!blockTags.has(element.tag)) continue;

    if (element.tag === "h2" || element.tag === "h3") {
      const text = decodeText(element.html);
      if (text) blocks.push({ kind: "h2", text });
      continue;
    }

    if (element.tag === "blockquote") {
      const text = decodeText(element.html);
      if (text) blocks.push({ kind: "quote", text });
      continue;
    }

    if (element.tag === "figure") {
      blocks.push({
        kind: "video",
        html: element.html,
        wide: /\bcase-motion-wide\b/.test(element.html),
      });
      continue;
    }

    if (element.tag === "p") {
      const image = paragraphImage(element.html);
      if (image) {
        blocks.push({ kind: "image", ...image });
        continue;
      }
    }

    blocks.push({ kind: "body", html: element.html });
  }
  return blocks;
}

export function toStudyImage(src: string, alt: string): StudyImage {
  const size = publicImageSize(src);
  const width = size?.width ?? 0;
  const height = size?.height ?? 0;
  return {
    src,
    alt,
    width,
    height,
    ratio: width > 0 && height > 0 ? width / height : 0,
  };
}

type Draft = {
  title: string | null;
  ink: boolean;
  quote: string | null;
  body: string[];
  images: StudyImage[];
  videos: StudyVideo[];
};

function emptyDraft(title: string | null): Draft {
  return { title, ink: false, quote: null, body: [], images: [], videos: [] };
}

function draftHasContent(draft: Draft) {
  return Boolean(draft.title || draft.quote || draft.body.length || draft.images.length || draft.videos.length);
}

export function parseCaseStudy(html: string): StudySection[] {
  const sections: StudySection[] = [];
  const usedIds = new Set<string>();
  let draft = emptyDraft(null);

  const commit = () => {
    if (!draftHasContent(draft)) {
      draft = emptyDraft(null);
      return;
    }
    const label = draft.quote || draft.title || "section";
    let id = slugify(label);
    if (usedIds.has(id)) {
      let count = 2;
      while (usedIds.has(`${id}-${count}`)) count += 1;
      id = `${id}-${count}`;
    }
    usedIds.add(id);
    sections.push({
      id,
      title: draft.title,
      ink: draft.ink,
      quote: draft.quote,
      bodyHtml: draft.body.join("\n"),
      imageGroups: groupByAspect(draft.images),
      videos: draft.videos,
    });
    draft = emptyDraft(null);
  };

  for (const block of parseBlocks(html)) {
    if (block.kind === "h2") {
      commit();
      draft = emptyDraft(block.text);
      continue;
    }
    if (block.kind === "quote") {
      const foldTitle =
        draft.title &&
        !draft.quote &&
        draft.body.length === 0 &&
        draft.images.length === 0 &&
        draft.videos.length === 0
          ? draft.title
          : null;
      if (!foldTitle) commit();
      draft = emptyDraft(foldTitle);
      draft.ink = true;
      draft.quote = block.text;
      continue;
    }
    if (block.kind === "body") draft.body.push(block.html);
    if (block.kind === "image") draft.images.push(toStudyImage(block.src, block.alt));
    if (block.kind === "video") draft.videos.push({ html: block.html, wide: block.wide });
  }
  commit();
  return sections;
}
