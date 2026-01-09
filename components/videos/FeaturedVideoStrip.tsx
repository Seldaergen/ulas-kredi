"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { Play, ExternalLink } from "lucide-react";
import type { VideoItem } from "@/lib/videos/types";
import { youtubeThumbUrl, youtubeWatchUrl } from "@/lib/videos/source";

export default function FeaturedVideoStrip({
  videos,
  youtubeChannelUrl,
}: {
  videos: VideoItem[];
  youtubeChannelUrl: string;
}) {
  const list = Array.isArray(videos) ? videos.filter(Boolean).slice(0, 12) : [];

  // “Haber” hissi: mümkünse Shorts ağırlıklı, yoksa ilk video
  const featuredPool = useMemo(() => {
    const shorts = list.filter((v) => v.isShort);
    return shorts.length ? shorts : list;
  }, [list]);

  const [activeId, setActiveId] = useState<string>(featuredPool[0]?.id ?? list[0]?.id ?? "");

  const active = useMemo(() => {
    return list.find((v) => v.id === activeId) ?? featuredPool[0] ?? list[0] ?? null;
  }, [activeId, list, featuredPool]);

  const embedSrc = useMemo(() => {
    if (!active?.id) return "";
    return `https://www.youtube-nocookie.com/embed/${active.id}?autoplay=1&mute=1&playsinline=1&rel=0&modestbranding=1`;
  }, [active?.id]);

  const nextList = useMemo(() => {
    const pool = featuredPool.length ? featuredPool : list;
    return pool.filter((v) => v.id !== activeId).slice(0, 5);
  }, [featuredPool, list, activeId]);

  if (!list.length) return null;

  const watchHref = active?.href ?? (active?.id ? youtubeWatchUrl(active.id) : youtubeChannelUrl);

  return (
    <section className="mx-auto w-full max-w-6xl px-4 pt-8 md:pt-10">
      <div className="rounded-3xl border bg-white/70 p-5 shadow-sm backdrop-blur md:p-6">
        <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-medium text-slate-600">
              Kredi Notu • Limit • Yapılandırma • Başvuru Stratejisi
            </p>
            <h1 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 md:text-3xl">
              Videolar
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-600 md:text-base">
              Güncel anlatımlar: üstte seçili videoyu site içinde izle, sağdan sıradakilere geç.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <a
              href={youtubeChannelUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 text-sm font-semibold text-white shadow-sm hover:bg-slate-800"
            >
              YouTube ↗ <ExternalLink className="h-4 w-4" />
            </a>
            <Link
              href="/iletisim"
              className="inline-flex h-10 items-center justify-center rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-900 shadow-sm hover:shadow-md"
            >
              Ücretsiz ön analiz
            </Link>
          </div>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-12 lg:gap-8">
          {/* PLAYER */}
          <div className="lg:col-span-7">
            <div className="overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm">
              <div className="flex items-center justify-between gap-3 border-b border-slate-100 bg-white px-4 py-3">
                <div className="min-w-0">
                  <div className="text-[12px] font-semibold text-slate-900">Şimdi izleniyor</div>
                  <div className="mt-0.5 line-clamp-1 text-[12px] text-slate-600">
                    {active?.title}
                  </div>
                </div>

                <a
                  href={watchHref}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-[12px] font-semibold text-slate-900 shadow-sm hover:shadow-md"
                >
                  YouTube’da aç <ExternalLink className="h-4 w-4" />
                </a>
              </div>

              <div className="relative aspect-video bg-black">
                {active?.id ? (
                  <iframe
                    src={embedSrc}
                    title={active.title}
                    className="h-full w-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    referrerPolicy="strict-origin-when-cross-origin"
                  />
                ) : null}
              </div>

              <div className="p-4">
                <div className="mb-2 inline-flex items-center rounded-full border bg-white px-2 py-1 text-[11px] text-slate-700">
                  {active?.tag ?? "Genel"}
                  {active?.isShort ? (
                    <span className="ml-2 rounded-full bg-slate-900 px-2 py-0.5 text-[10px] text-white">
                      SHORT
                    </span>
                  ) : null}
                </div>

                <div className="text-sm font-semibold text-slate-900">{active?.title}</div>
                {active?.publishedAt ? (
                  <div className="mt-2 text-xs text-slate-500">{active.publishedAt}</div>
                ) : null}
              </div>
            </div>
          </div>

          {/* NEXT LIST */}
          <div className="lg:col-span-5">
            <div className="rounded-3xl border border-slate-100 bg-white/70 p-4 shadow-sm backdrop-blur">
              <div className="flex items-end justify-between gap-3">
                <div>
                  <div className="text-base font-semibold text-slate-900">Sıradaki videolar</div>
                  <div className="mt-1 text-sm text-slate-600">Tıkla → üstte açılır</div>
                </div>
                <div className="rounded-full border border-slate-200 bg-white px-3 py-1 text-[11px] font-semibold text-slate-700">
                  Güncel
                </div>
              </div>

              <div className="mt-4 grid gap-3">
                {nextList.map((v) => {
                  const thumb = v.thumb ?? youtubeThumbUrl(v.id);
                  return (
                    <button
                      key={v.id}
                      type="button"
                      onClick={() => setActiveId(v.id)}
                      className="group flex w-full items-center gap-3 rounded-2xl border border-slate-100 bg-white p-3 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                      aria-label={`${v.title} videosunu aç`}
                    >
                      <div className="relative h-16 w-28 overflow-hidden rounded-xl bg-slate-900">
                        <Image
                          src={thumb}
                          alt={v.title}
                          fill
                          className="object-cover transition duration-300 group-hover:scale-[1.04]"
                          sizes="112px"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-black/35 via-black/0 to-black/0" />
                        <div className="absolute bottom-2 left-2 inline-flex items-center gap-1 rounded-md bg-white/90 px-2 py-1 text-[11px] font-semibold text-slate-900">
                          <Play className="h-3.5 w-3.5" /> Aç
                        </div>
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="mb-1 inline-flex w-fit rounded-full bg-slate-50 px-2 py-0.5 text-[10px] font-semibold text-slate-700">
                          {v.tag}
                        </div>
                        <div className="line-clamp-2 text-[13px] font-semibold text-slate-900">
                          {v.title}
                        </div>
                        {v.publishedAt ? (
                          <div className="mt-1 text-[11px] text-slate-500">{v.publishedAt}</div>
                        ) : null}
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <Link
                  href="#liste"
                  className="inline-flex h-11 items-center justify-center rounded-xl bg-slate-900 px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
                >
                  Video listesi
                </Link>
                <a
                  href={youtubeChannelUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-11 items-center justify-center rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-900 shadow-sm transition hover:shadow-md"
                >
                  YouTube ↗
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
