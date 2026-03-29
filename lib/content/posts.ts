// lib/content/posts.ts
import { POSTS_NEW } from "./posts.index";
import type { TopicId } from "@/lib/topics/topics";

export type PostCategory =
  | "Kredi Notu"
  | "Başvuru Süreci"
  | "Limit"
  | "Yasal / Risk"
  | "Bilgilendirme";

// ✅ Tek kaynak: icon union burada
export type PostIcon = "score" | "limit" | "flow" | "risk" | "info";

export type Post = {
  slug: string;
  title: string;
  excerpt: string;

  // ✅ UI kategorisi (liste/filtre)
  category: PostCategory;

  // ✅ V2 omurga (Video ↔ Rehber ↔ QA bağlantısı)
  topicId: TopicId;

  readingTime: string;
  date: string; // YYYY-MM-DD

  // ✅ görsel varsa kullan, yoksa fallback (ikon+gradient)
  coverImage?: string;

  // ✅ görsel yoksa veya ekstra vurgu istiyorsan
  icon?: PostIcon;

  // ✅ “okuma” göstermek istiyorsan
  views?: number;

  // ✅ Faz 3: editoryal alanlar
  intro?: string;
  criticalPoints?: string[];
  highlight?: string;

  content: Array<
    | { type: "h2"; text: string }
    | { type: "p"; text: string }
    | { type: "ul"; items: string[] }
    | { type: "callout"; title: string; text: string }
  >;
};

const POSTS_LEGACY: Post[] = [];

export const POSTS: Post[] = [...POSTS_LEGACY, ...POSTS_NEW];

export function getPost(slug: string) {
  return POSTS.find((p) => p.slug === slug) ?? null;
}

export function getPostsByTopic(topicId: TopicId) {
  return POSTS.filter((p) => p.topicId === topicId);
}

export function getCategories() {
  return Array.from(new Set(POSTS.map((p) => p.category)));
}