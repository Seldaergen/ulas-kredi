"use client";

import Link from "next/link";
import Image from "next/image";
import { useMemo, useState } from "react";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { POSTS } from "@/lib/content/posts";
import { getTopicById, type TopicId } from "@/lib/topics/topics";

function safeText(x: unknown) {
  return typeof x === "string" ? x : "";
}

function normalize(p: unknown) {
  const s = safeText(p).trim();
  if (!s) return "";
  return s.startsWith("/") ? s : `/${s}`;
}

function topicFallbackCandidates(topicId?: TopicId | null) {
  // ✅ public/content’te sende bulunan örneklerden seçtik
  switch (topicId) {
    case "kredi-notu":
      return ["/content/credit-score-900.jpg", "/content/findeks-kredi-notu-nedir.jpg"];
    case "kredi-limiti":
      return ["/content/banka-ic-skor-nedir.jpg", "/content/fast-approval.jpg"];
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
    case "banka":
      return ["/content/banka-degerlendirme-sureci-nasil-isler.jpg", "/content/bankalar-kredi-verirken-neye-bakar.jpg"];
    default:
      return ["/content/2025-en-hizli-basvuru-akisi.jpg"];
  }
}

function dateValue(iso: unknown) {
  const s = safeText(iso);
  // YYYY-MM-DD bekliyoruz
  const t = Date.parse(`${s}T00:00:00`);
  return Number.isFinite(t) ? t : 0;
}

function buildCandidates(post: any) {
  const slug = safeText(post?.slug);
  const topicId = (post?.topicId || null) as TopicId | null;

  const list: string[] = [];
  const cover = normalize(post?.coverImage);
  if (cover) list.push(cover);

  if (slug) {
    // ✅ Önce jpg dene (sende çoğu jpg)
    list.push(`/content/${slug}.jpg`);
    list.push(`/content/${slug}.png`);
    list.push(`/content/${slug}.jpeg`);
    list.push(`/content/${slug}.webp`);
  }

  list.push(...topicFallbackCandidates(topicId));

  return Array.from(new Set(list.filter(Boolean)));
}

function AutoImage({ post }: { post: any }) {
  const candidates = useMemo(() => buildCandidates(post), [post]);
  const [idx, setIdx] = useState(0);
  const src = candidates[Math.min(idx, candidates.length - 1)];

  return (
    <div className="relative aspect-video w-full overflow-hidden bg-slate-100">
      <Image
        src={src}
        alt={safeText(post?.title) || "Rehber görseli"}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        className="object-cover transition duration-500 group-hover:scale-[1.03]"
        onError={() => setIdx((v) => Math.min(v + 1, candidates.length - 1))}
      />
      <div className="absolute inset-0 bg-linear-to-t from-black/30 via-black/0 to-black/0" />
    </div>
  );
}

export default function TopReads() {
  // ✅ “Yeni yayınlanan 6”
  const items = useMemo(() => {
    const all = Array.isArray(POSTS) ? POSTS : [];
    return [...all]
      .filter((p: any) => p?.slug && p?.title)
      .sort((a: any, b: any) => dateValue(b?.date) - dateValue(a?.date))
      .slice(0, 6);
  }, []);

  if (!items.length) return null;

  return (
    <section className="mt-8">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-[18px] font-extrabold text-slate-900">
            Yeni Eklenenler
          </h2>
          <p className="mt-0.5 text-[12px] font-semibold text-slate-500">
            Son yayınlanan 6 rehber — güncel akış
          </p>
        </div>

        <Link
          href="/rehber"
          className="inline-flex items-center gap-1 text-[12px] font-semibold text-cyan-800 hover:underline"
        >
          Tüm rehberler <ArrowUpRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((post: any) => {
          const topicId = (post?.topicId || null) as TopicId | null;
          const topic = topicId ? getTopicById(topicId) : null;

          return (
            <Link
              key={post.slug}
              href={`/rehber/${post.slug}`}
              className={cn(
                "group overflow-hidden rounded-2xl border border-slate-200 bg-white/90 shadow-sm transition",
                "hover:-translate-y-0.5 hover:border-cyan-300 hover:shadow-md"
              )}
            >
              {/* ✅ Görsel otomatik */}
              <AutoImage post={post} />

              <div className="p-4">
                {/* ✅ Üst satır: badge flow içinde (çakışma yok) */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1 rounded-full bg-cyan-50 px-2 py-0.5 text-[10px] font-extrabold text-cyan-700">
                    <Sparkles className="h-3 w-3" />
                    Yeni
                  </span>

                  {topic ? (
                    <span className="rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5 text-[10px] font-extrabold text-slate-700">
                      {topic.title}
                    </span>
                  ) : null}

                  {post?.readingTime ? (
                    <span className="text-[10px] font-semibold text-slate-400">
                      {post.readingTime}
                    </span>
                  ) : null}
                </div>

                {/* ✅ Metin alanı: min-w-0 + clamp = taşma yok */}
                <div className="mt-2 min-w-0">
                  <div className="line-clamp-2 text-[14px] font-extrabold leading-5 text-slate-900">
                    {post.title}
                  </div>

                  {post?.excerpt ? (
                    <div className="mt-1 line-clamp-2 text-[12px] font-medium text-slate-600">
                      {post.excerpt}
                    </div>
                  ) : null}
                </div>

                <div className="mt-3 inline-flex items-center gap-1 text-[12px] font-extrabold text-slate-900">
                  Oku <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
