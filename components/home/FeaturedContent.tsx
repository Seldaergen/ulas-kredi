"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { POSTS } from "@/lib/content/posts";

const FALLBACK_IMG = "/content/placeholder.jpg";

function safeText(x: unknown) {
  return typeof x === "string" ? x : "";
}

function safeDate(x: unknown) {
  const s = safeText(x);
  return /^\d{4}-\d{2}-\d{2}$/.test(s) ? s : "";
}

function fmtDateTR(iso: string) {
  try {
    const d = new Date(`${iso}T00:00:00`);
    return d.toLocaleDateString("tr-TR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  } catch {
    return "";
  }
}

function toHref(slug: string) {
  return `/rehber/${slug}`;
}

function normalizePath(p?: string) {
  const s = safeText(p).trim();
  if (!s) return "";
  return s.startsWith("/") ? s : `/${s}`;
}

function pickTopPosts() {
  const all = Array.isArray(POSTS) ? POSTS : [];

  const normalized = all
    .map((p: any) => ({
      slug: safeText(p?.slug),
      title: safeText(p?.title),
      excerpt: safeText(p?.excerpt),
      intro: safeText(p?.intro),
      critical: p?.criticalPoints?.[0] || "",
      category: safeText(p?.category),
      readingTime: safeText(p?.readingTime) || "—",
      date: safeDate(p?.date),
      coverImage: safeText(p?.coverImage),
    }))
    .filter((p) => p.slug && p.title);

  normalized.sort((a, b) => (b.date || "").localeCompare(a.date || ""));

  return normalized.slice(0, 6);
}

function DesktopCard({ item, isNew }: any) {
  const candidates = useMemo(() => {
    const list: string[] = [];

    const cover = normalizePath(item.coverImage);
    if (cover) list.push(cover);

    if (item.slug) {
      list.push(`/content/${item.slug}.jpg`);
      list.push(`/content/${item.slug}.png`);
      list.push(`/content/${item.slug}.webp`);
      list.push(`/content/${item.slug}.jpeg`);
    }

    list.push(FALLBACK_IMG);

    return Array.from(new Set(list.filter(Boolean)));
  }, [item.coverImage, item.slug]);

  const [imgIndex, setImgIndex] = useState(0);
  const activeImage = candidates[Math.min(imgIndex, candidates.length - 1)];

  return (
    <Link
      href={toHref(item.slug)}
      className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-xl"
    >
      <div className="relative aspect-video w-full overflow-hidden bg-slate-100">
        <Image
          src={activeImage}
          alt={item.title}
          fill
          className="object-cover transition duration-500 group-hover:scale-[1.04]"
          onError={() =>
            setImgIndex((v) => Math.min(v + 1, candidates.length - 1))
          }
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

        <div className="absolute left-4 top-4 flex gap-2">
          <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-semibold">
            {item.category}
          </span>

          {isNew && (
            <span className="rounded-full bg-primary/20 px-3 py-1 text-xs font-semibold text-primary">
              Yeni
            </span>
          )}
        </div>

        <div className="absolute bottom-3 left-4 right-4 flex justify-between text-xs text-white">
          <span>{item.date ? fmtDateTR(item.date) : ""}</span>
          <span>Oku →</span>
        </div>
      </div>

      <div className="p-5">
        <h3 className="line-clamp-2 text-base font-semibold">{item.title}</h3>

        <p className="mt-2 line-clamp-2 text-sm text-slate-600">
          {item.excerpt}
        </p>

        {item.intro && (
          <p className="mt-2 line-clamp-2 text-xs text-slate-500">
            {item.intro}
          </p>
        )}

        {item.critical && (
          <div className="mt-2 text-xs font-semibold text-cyan-700">
            {item.critical}
          </div>
        )}

        <div className="mt-4 flex justify-between text-xs">
          <span>Ulaş Kredi</span>
          <span className="font-semibold">Devamını oku →</span>
        </div>
      </div>
    </Link>
  );
}

export default function FeaturedContent() {
  const items = useMemo(() => pickTopPosts(), []);

  return (
    <section className="mx-auto max-w-7xl px-4 py-12">
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Öne Çıkan Rehberler</h2>
        <p className="text-sm text-slate-600">
          En çok okunan ve en kritik içerikler
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {items.map((item, i) => (
          <DesktopCard key={item.slug} item={item} isNew={i < 2} />
        ))}
      </div>
    </section>
  );
}