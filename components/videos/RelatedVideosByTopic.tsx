// components/videos/RelatedVideosByTopic.tsx
"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Play, X, ExternalLink, Film } from "lucide-react";
import type { TopicId } from "@/lib/topics/topics";
import type { VideoItem } from "@/lib/videos/types";
import { youtubeThumbUrl, youtubeWatchUrl } from "@/lib/videos/source";
import { topicIdFromTag } from "@/lib/videos/topic-map";

export default function RelatedVideosByTopic({
  topicId,
  videos,
  title = "Bu konuyu videoyla izle",
  subtitle = "Kısa ve net anlatımlar — site içinde izleyebilir veya YouTube’da açabilirsin.",
  limit = 6,
  compact = false,
}: {
  topicId: TopicId;
  videos: VideoItem[];
  title?: string;
  subtitle?: string;
  limit?: number;
  compact?: boolean;
}) {
  const [openId, setOpenId] = useState<string | null>(null);
  const openVideo = useMemo(
    () => videos.find((v) => v.id === openId) ?? null,
    [videos, openId]
  );

  const related = useMemo(() => {
    const list = (videos || []).filter((v) => {
      const vt = (v.topicId ?? topicIdFromTag(v.tag)) as TopicId;
      return vt === topicId;
    });

    // Shorts önce gelsin + yeni gibi kalsın (publishedAt varsa ona göre de yapılabilir)
    return list.slice(0, limit);
  }, [videos, topicId, limit]);

  const embedSrc = useMemo(() => {
    if (!openVideo?.id) return "";
    return `https://www.youtube-nocookie.com/embed/${openVideo.id}?autoplay=1&mute=1&playsinline=1&rel=0&modestbranding=1`;
  }, [openVideo?.id]);

  if (!related.length) return null;

  return (
    <section
      className={[
        "rounded-3xl border border-slate-200 bg-white/80 shadow-sm backdrop-blur",
        compact ? "p-4" : "p-6",
      ].join(" ")}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wide text-slate-500">
            <Film className="h-4 w-4" />
            VİDEO
          </div>
          <h3 className="mt-1 text-lg font-bold text-slate-900">{title}</h3>
          <p className="mt-1 text-sm text-slate-600">{subtitle}</p>
        </div>

        <Link
          href={`/videolar?topic=${encodeURIComponent(topicId)}`}
          className="hidden sm:inline-flex h-10 items-center justify-center rounded-2xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-900 hover:bg-slate-50"
        >
          Tümü
        </Link>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {related.map((v) => {
          const thumb = v.thumb ?? youtubeThumbUrl(v.id);

          return (
            <article
              key={v.id}
              className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <button
                type="button"
                onClick={() => setOpenId(v.id)}
                className="relative block aspect-video w-full overflow-hidden bg-slate-100 text-left"
                aria-label="Sitede izle"
              >
                <Image
                  src={thumb}
                  alt={v.title}
                  fill
                  className="object-cover transition duration-300 group-hover:scale-[1.03]"
                  sizes="(max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/40 via-black/0" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="inline-flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-sm font-semibold text-slate-900 shadow">
                    <Play className="h-4 w-4" />
                    İzle
                  </div>
                </div>

                {v.isShort ? (
                  <div className="absolute left-2 top-2 rounded-full bg-slate-900 px-2 py-1 text-[10px] font-extrabold text-white">
                    SHORT
                  </div>
                ) : null}
              </button>

              <div className="p-4">
                <div className="mb-2 inline-flex items-center rounded-full border border-slate-200 bg-white px-2 py-1 text-[11px] font-semibold text-slate-700">
                  {v.tag}
                </div>

                <div className="line-clamp-2 text-sm font-semibold text-slate-900">
                  {v.title}
                </div>

                <div className="mt-3 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setOpenId(v.id)}
                    className="inline-flex h-10 flex-1 items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 text-sm font-semibold text-white hover:bg-slate-800"
                  >
                    <Play className="h-4 w-4" />
                    Sitede izle
                  </button>

                  <a
                    href={v.href ?? youtubeWatchUrl(v.id)}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex h-10 items-center justify-center rounded-xl border border-slate-200 bg-white px-3 text-slate-900 hover:bg-slate-50"
                    aria-label="YouTube’da aç"
                    title="YouTube’da aç"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* Modal */}
      {openVideo && (
        <div
          className="fixed inset-0 z-80 flex items-center justify-center bg-black/55 p-4"
          role="dialog"
          aria-modal="true"
          onClick={() => setOpenId(null)}
        >
          <div
            className="w-full max-w-3xl overflow-hidden rounded-2xl border border-white/10 bg-white shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-3 border-b bg-white px-4 py-3">
              <div className="min-w-0">
                <div className="text-[12px] font-semibold text-slate-900">Video</div>
                <div className="mt-0.5 line-clamp-1 text-[12px] text-slate-600">
                  {openVideo.title}
                </div>
              </div>

              <button
                type="button"
                className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-900 hover:bg-slate-50"
                onClick={() => setOpenId(null)}
                aria-label="Kapat"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="relative aspect-video w-full bg-black">
              <iframe
                src={embedSrc}
                title={openVideo.title}
                className="h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
              />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 bg-white px-4 py-3">
              <div className="inline-flex items-center rounded-full border border-slate-200 bg-white px-2 py-1 text-[11px] font-semibold text-slate-700">
                {openVideo.tag}
                {openVideo.isShort ? (
                  <span className="ml-2 rounded-full bg-slate-900 px-2 py-0.5 text-[10px] text-white">
                    SHORT
                  </span>
                ) : null}
              </div>

              <a
                href={openVideo.href ?? youtubeWatchUrl(openVideo.id)}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 text-sm font-semibold text-white hover:bg-slate-800"
              >
                YouTube’da aç <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
