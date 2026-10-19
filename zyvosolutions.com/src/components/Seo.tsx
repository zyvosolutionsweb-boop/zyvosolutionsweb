import { useEffect } from "react";
import { absoluteUrl, SITE_NAME } from "@/lib/utils";

interface SeoProps {
  title: string;
  description: string;
  path: string;
  /** Optional override for og:image */
  image?: string;
}

function upsertMeta(attr: "name" | "property", key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

/**
 * Sets page-specific title, meta description, canonical URL and Open Graph
 * metadata. Rendered once at the top of every route-level page.
 */
export function Seo({ title, description, path, image }: SeoProps) {
  useEffect(() => {
    const fullTitle = path === "/" ? title : `${title} | ${SITE_NAME}`;
    const url = absoluteUrl(path);
    const cover = image ?? absoluteUrl("/og.svg");

    document.title = fullTitle;
    upsertMeta("name", "description", description);
    upsertMeta("property", "og:title", fullTitle);
    upsertMeta("property", "og:description", description);
    upsertMeta("property", "og:url", url);
    upsertMeta("property", "og:image", cover);
    upsertMeta("property", "og:type", "website");
    upsertMeta("property", "og:site_name", SITE_NAME);
    upsertMeta("name", "twitter:card", "summary_large_image");
    upsertMeta("name", "twitter:title", fullTitle);
    upsertMeta("name", "twitter:description", description);

    let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = document.createElement("link");
      link.rel = "canonical";
      document.head.appendChild(link);
    }
    link.href = url;
  }, [title, description, path, image]);

  return null;
}
