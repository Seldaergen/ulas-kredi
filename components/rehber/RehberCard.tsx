"use client";

import Link from "next/link";
import Image from "next/image";
import { useMemo, useState } from "react";
import { getTopicById, type TopicId } from "@/lib/topics/topics";

function safeText(x: unknown) {
  return typeof x === "string" ? x : "";
}

function topicFallbackImage(topicId?: TopicId | null) {
  switch (topicId) {
    case "kredi-notu":
      return "/rehber/fallback/kredi-notu.jpg";
    case "kredi-limiti":
      return "/rehber/fallback/kredi-limiti.jpg";
    case "kredi-basvurusu":
      return "/rehber/fallback/kredi-basvurusu.jpg";
    case "yapilandirma":
      return "/rehber/fallback/yapilandirma.jpg";
    case "kirmizi-kalem":
      return "/rehber/fallback/kirmizi-kalem.jpg";
    case "gelir-belgesi":
      return "/rehber/fallback/gelir-belgesi.jpg";
    case "borc-kapatma":
      return "/rehber/fallback/borc-kapatma.jpg";
    case "kredi-karti":
      return "/rehber/fallback/kredi-karti.jpg";
    case "banka":
      return "/rehber/fallback/banka.jpg";
    default:
      return "/rehber/fallback/genel.jpg";
  }
}

function topicCoverCandidates(topicId?: TopicId | null) {
  switch (topicId) {
    case "kredi-notu":
      return ["/content/credit-score-900.jpg", "/content/edevlet.jpg"];
    case "kredi-limiti":
      return ["/content/fast-approval.jpg", "/content/banka-ic-skor-nedir.jpg"];
    case "kredi-basvurusu":
      return ["/content/basvuru-sirasi.jpg", "/content/2025-en-hizli-basvuru-akisi.jpg"];
    case "yapilandirma":
      return ["/content/borc-kapatma-mi-yapilandirma-mi.jpg", "/content/borc-transferi-kredisi-mantiklimi.jpg"];
    case "gelir-belgesi":
      return ["/content/gelir-belgesi-nedir-hangi-belgeler-gecerli.jpg"];
    case "kirmizi-kalem":
      return ["/content/kirmizi-kalem.jpg", "/content/blacklist.jpg"];
    case "borc-kapatma":
      return ["/content/borc-kapatma-kredisi-nedir.jpg", "/content/borc-gelir-orani-kac-olmali.jpg"];
    case "kredi-karti":
      return ["/content/findeks-kredi-notu-nedir.jpg"];
    case "banka":
      return ["/content/bankalar-kredi-verirken-neye-bakar.jpg"];
    default:
      return ["/content/2025-en-hizli-basvuru-akisi.jpg"];
  }
}

function normalizeToAbsolutePublicPath(p: string) {
  const s = safeText(p).trim();
  if (!s) return "";
  return s.startsWith("/") ? s : `/${s}`;
}

export default function RehberCard({ post }: { post: any }) {
  const title = safeText(post?.title);
  const excerpt = safeText(post?.excerpt);
  const slug = safeText(post?.slug);

  const topicId = (post?.topicId || null) as TopicId | null;
  const topic = topicId ? getTopicById(topicId) : null;

  const candidates = useMemo(() => {
    const list: string[] = [];

    const cover = normalizeToAbsolutePublicPath(post?.coverImage);
    if (cover) list.push(cover);

    if (slug) {
      list.push(`/content/${slug}.jpg`);
      list.push(`/content/${slug}.png`);
      list.push(`/content/${slug}.webp`);
    }

    list.push(...topicCoverCandidates(topicId));
    list.push(topicFallbackImage(topicId));

    return Array.from(new Set(list.map((x) => x.trim()).filter(Boolean)));
  }, [post?.coverImage, slug, topicId]);

  const [idx, setIdx] = useState(0);
  const img = candidates[Math.min(idx, candidates.length - 1)];

  return (
    <Link
      href={`/rehber/${slug}`}
      className="group overflow-hidden rounded-2xl border bg-white/70 shadow-sm transition hover:bg-white hover:shadow-md"
    >
      {/* IMAGE */}
      <div className="relative aspect-video w-full overflow-hidden bg-slate-100">
        <Image
          src={img}
          alt={title || "Kredi rehberi görseli"}
          fill
          className="object-cover transition duration-500 group-hover:scale-[1.03]"
          onError={() => setIdx((v) => Math.min(v + 1, candidates.length - 1))}
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/30 to-transparent" />
      </div>

      {/* CONTENT */}
      <div className="p-4">
        {/* TITLE */}
        <div className="text-base font-semibold text-slate-900 group-hover:text-cyan-800">
          {title}
        </div>

        {/* EXCERPT */}
        {excerpt && (
          <div className="mt-1 line-clamp-2 text-sm text-slate-600">
            {excerpt}
          </div>
        )}

        {/* 🔥 INTRO */}
        {post?.intro && (
          <div className="mt-2 line-clamp-2 text-xs text-slate-500">
            {post.intro}
          </div>
        )}

        {/* 🔥 CRITICAL HOOK */}
        {post?.criticalPoints?.[0] && (
          <div className="mt-2 text-xs font-semibold text-cyan-700">
            {post.criticalPoints[0]}
          </div>
        )}

        {/* META */}
        <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-slate-500">
          {topic && (
            <span className="rounded-full border px-2 py-0.5">
              {topic.title}
            </span>
          )}
          {post?.date && <span>{post.date}</span>}
          {post?.readingTime && <span>• {post.readingTime}</span>}
        </div>

        {/* 🔥 CTA */}
        <div className="mt-3 text-xs font-semibold text-cyan-700 group-hover:underline">
          Devamını oku →
        </div>
      </div>
    </Link>
  );
}