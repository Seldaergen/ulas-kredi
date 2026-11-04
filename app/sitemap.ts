import type { MetadataRoute } from "next";
import { PUBLISHED_POSTS } from "@/lib/content/posts";
import { publication } from "@/lib/content/publication";
import { absoluteUrl, INDEXABLE_PAGES } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...INDEXABLE_PAGES.map(path => ({ url: absoluteUrl(path) })),
    ...PUBLISHED_POSTS.map(post => ({ url: absoluteUrl(`/rehber/${post.slug}`), lastModified: publication(post).modified })),
  ];
}
