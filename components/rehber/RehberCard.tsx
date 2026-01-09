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
    case "genel":
    default:
      return "/rehber/fallback/genel.jpg";
  }
}

// ✅ Topic bazlı “kapak” (public/content içinde bunları koyacağız)
// Bu sayede slug ile dosya adı uyuşmasa bile rehber boş kalmaz.
function topicCoverCandidates(topicId?: TopicId | null) {
  // Senin mevcut içerik görsellerin içinde “kredi-notu, kredi-limiti…” gibi
  // dosyalar yoksa, buraya sahip olduğun dosya isimlerini yazabiliriz.
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
      return ["/content/findeks-kredi-notu-nedir.jpg", "/content/findeks-kredi-notu-nedir.png"];
    case "banka":
      return ["/content/bankalar-kredi-verirken-neye-bakar.jpg", "/content/banka-degerlendirme-sureci-nasil-isler.jpg"];
    case "genel":
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

    // 1) posts.ts coverImage varsa önce onu dene
    const cover = normalizeToAbsolutePublicPath(post?.coverImage);
    if (cover) list.push(cover);

    // 2) slug tabanlı dene (bazı içeriklerde işe yarar)
    if (slug) {
      list.push(`/content/${slug}.jpg`);
      list.push(`/content/${slug}.jpeg`);
      list.push(`/content/${slug}.png`);
      list.push(`/content/${slug}.webp`);
    }

    // 3) topic bazlı “kapak” (senin mevcut dosya adlarına göre)
    list.push(...topicCoverCandidates(topicId));

    // 4) en son: fallback
    list.push(topicFallbackImage(topicId));

    // uniq + boş temizle
    return Array.from(new Set(list.map((x) => x.trim()).filter(Boolean)));
  }, [post?.coverImage, slug, topicId]);

  const [idx, setIdx] = useState(0);
  const img = candidates[Math.min(idx, candidates.length - 1)];

  return (
    <Link
      href={`/rehber/${post.slug}`}
      className="group overflow-hidden rounded-2xl border bg-white/70 shadow-sm transition hover:bg-white hover:shadow-md"
    >
      <div className="relative aspect-video w-full overflow-hidden bg-slate-100">
        <Image
          src={img}
          alt={title || "Kredi rehberi görseli"}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition duration-500 group-hover:scale-[1.03]"
          onError={() => {
            // sıradaki adayı dene
            setIdx((v) => Math.min(v + 1, candidates.length - 1));
          }}
        />
        {/* ✅ Tailwind güvenli gradient */}
        <div className="absolute inset-0 bg-linear-to-t from-black/30 via-black/0 to-black/0" />
      </div>

      <div className="p-4">
        <div className="text-base font-semibold text-slate-900 group-hover:text-cyan-800">
          {title}
        </div>

        {excerpt ? (
          <div className="mt-1 line-clamp-2 text-sm text-slate-600">{excerpt}</div>
        ) : null}

        <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-slate-500">
          {topic ? (
            <span className="rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5 font-semibold text-slate-700">
              {topic.title}
            </span>
          ) : null}

          {post?.date ? <span>{post.date}</span> : null}
          {post?.readingTime ? (
            <>
              <span>•</span>
              <span>{post.readingTime}</span>
            </>
          ) : null}
        </div>
      </div>
    </Link>
  );
}
