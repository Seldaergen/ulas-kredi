// lib/content/types.ts
import type { TopicId } from "@/lib/topics/topics";

export type PostCategory =
  | "Kredi Notu"
  | "Başvuru Süreci"
  | "Limit"
  | "Yasal / Risk"
  | "Bilgilendirme";

export type PostIcon = "score" | "limit" | "flow" | "risk" | "info";

export type Author = {
  slug: string;
  name: string;
  role: string;
  image: string;
  bio: string;
};

export type FAQItem = {
  question: string;
  answer: string;
};

export type CriticalPoint = {
  title: string;
  items: string[];
};

export type HighlightQuote = {
  text: string;
};

export type ContentBlock =
  | { type: "h2"; text: string }
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "callout"; title: string; text: string };

export type PostSeo = {
  seoTitle: string;
  metaDescription: string;
  canonical?: string;
  ogImage?: string;
  keywords?: string[];
};

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  category: PostCategory;
  topicId: TopicId;
  readingTime: string;
  date: string;
  updatedAt?: string;
  coverImage?: string;
  icon?: PostIcon;
  views?: number;

  author: Author;
  seo: PostSeo;

  intro?: string;
  criticalBox?: CriticalPoint;
  highlightQuote?: HighlightQuote;
  faq?: FAQItem[];
  relatedSlugs?: string[];

  content: ContentBlock[];
};