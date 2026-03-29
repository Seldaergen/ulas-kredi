// app/rehber/[slug]/page.tsx
import Link from "next/link";
import { notFound } from "next/navigation";
import Script from "next/script";

import { POSTS, getPost, type Post } from "@/lib/content/posts";
import { getTopicById, type TopicId } from "@/lib/topics/topics";
import { getVideos } from "@/lib/videos/server";
import RelatedVideosByTopic from "@/components/videos/RelatedVideosByTopic";

import CoverImageClient from "@/components/rehber/CoverImageClient";

function getSiteUrl() {
  const env = process.env.SITE_URL?.trim();
  if (env) return env.replace(/\/+$/, "");
  return "http://localhost:3000";
}

function absoluteUrl(path: string) {
  const base = getSiteUrl();
  if (!path) return base;
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  return `${base}${path.startsWith("/") ? "" : "/"}${path}`;
}

function coverImagePath(post: Post) {
  const p = post.coverImage?.trim();
  if (p) return p.startsWith("/") ? p : `/${p}`;
  return `/content/${post.slug}.jpg`;
}

function fmtDateTR(iso: string) {
  try {
    const d = new Date(`${iso}T00:00:00`);
    return d.toLocaleDateString("tr-TR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return iso;
  }
}

function fmtIso(iso: string) {
  return iso;
}

function videosHrefByTopic(topicId: TopicId) {
  return `/videolar?topic=${encodeURIComponent(topicId)}`;
}
function qaHrefByTopic(topicId: TopicId) {
  return `/soru-cevap?topic=${encodeURIComponent(topicId)}`;
}
function rehberHrefByTopic(topicId: TopicId) {
  return `/rehber?topic=${encodeURIComponent(topicId)}`;
}

function RenderContent({ post }: { post: Post }) {
  const blocks = Array.isArray(post.content) ? post.content : [];

  if (blocks.length === 0) {
    return <p className="text-slate-600">Bu içerik yakında eklenecek.</p>;
  }

  return (
    <>
      {blocks.map((b, idx) => {
        if (b.type === "h2") {
          return (
            <h2 key={idx} className="mt-8 text-slate-900">
              {b.text}
            </h2>
          );
        }

        if (b.type === "p") {
          return (
            <p key={idx} className="text-slate-700">
              {b.text}
            </p>
          );
        }

        if (b.type === "ul") {
          return (
            <ul key={idx} className="text-slate-700">
              {b.items.map((it, i) => (
                <li key={i}>{it}</li>
              ))}
            </ul>
          );
        }

        if (b.type === "callout") {
          return (
            <div
              key={idx}
              className="my-6 rounded-2xl border bg-slate-50 p-4"
            >
              <div className="text-sm font-bold text-slate-900">
                {b.title}
              </div>
              <div className="text-sm text-slate-700">{b.text}</div>
            </div>
          );
        }

        return null;
      })}
    </>
  );
}

function buildJsonLd(post: Post) {
  const site = getSiteUrl();
  const url = absoluteUrl(`/rehber/${post.slug}`);
  const image = absoluteUrl(coverImagePath(post));

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: [image],
    datePublished: post.date,
    author: {
      "@type": "Organization",
      name: "Ulaş Kredi Danışmanlık",
    },
  };
}

export default async function RehberDetayPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const post = getPost(slug);
  if (!post) notFound();

  const topic = getTopicById(post.topicId);
  const related = POSTS.filter(
    (p) => p.slug !== post.slug && p.topicId === post.topicId
  ).slice(0, 4);

  const videos = await getVideos();

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <Script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildJsonLd(post)),
        }}
      />

      {/* HEADER */}
      <h1 className="text-3xl font-extrabold">{post.title}</h1>
      <p className="mt-3 text-slate-600">{post.excerpt}</p>

      {/* 🔥 INTRO */}
      {post.intro && (
        <div className="mt-6 rounded-xl border bg-slate-50 p-4 text-sm">
          {post.intro}
        </div>
      )}

      {/* COVER */}
      <div className="mt-6 h-64 w-full overflow-hidden rounded-2xl">
  <CoverImageClient
    slug={post.slug}
    coverImage={post.coverImage}
    topicId={post.topicId}
    alt={`${post.title} - Ulaş Kredi Rehberi`}
    className="h-full"
    priority
  />
</div>

      {/* CTA */}
      <div className="mt-6 rounded-xl border p-4">
        <p className="font-semibold">
          Durumuna özel analiz ister misin?
        </p>
        <Link href="/iletisim" className="mt-2 inline-block text-blue-600">
          İletişime geç →
        </Link>
      </div>

      {/* 🔥 CRITICAL POINTS */}
      {post.criticalPoints?.length && (
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {post.criticalPoints.map((item, i) => (
            <div key={i} className="rounded-xl border p-3 text-sm font-semibold">
              {item}
            </div>
          ))}
        </div>
      )}

      {/* CONTENT */}
      <article className="prose mt-8">
        <RenderContent post={post} />
      </article>

      {/* 🔥 HIGHLIGHT */}
      {post.highlight && (
        <div className="mt-8 rounded-xl bg-black p-4 text-center text-white">
          {post.highlight}
        </div>
      )}

      {/* RELATED */}
      {related.length > 0 && (
        <div className="mt-10">
          <h3 className="font-bold">İlgili içerikler</h3>
          {related.map((p) => (
            <Link key={p.slug} href={`/rehber/${p.slug}`}>
              {p.title}
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}