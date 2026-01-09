// components/videos/VideosClient.tsx
"use client";

import { useMemo, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Search,
  Play,
  X,
  ExternalLink,
  SlidersHorizontal,
  Tags,
} from "lucide-react";

import type { VideoItem, VideoTag } from "@/lib/videos/types";
import { youtubeThumbUrl, youtubeWatchUrl } from "@/lib/videos/source";

import type { TopicId } from "@/lib/topics/topics";
import { TOPICS, getTopicById } from "@/lib/topics/topics";
import { topicIdFromTag } from "@/lib/videos/topic-map";

function uniq<T>(arr: T[]) {
  return Array.from(new Set(arr));
}

function safeLower(s: unknown) {
  return String(s ?? "").toLocaleLowerCase("tr-TR");
}

function isTopicId(v: string | null): v is TopicId {
  if (!v) return false;
  return TOPICS.some((t) => t.id === v);
}

// ✅ Tag listesi sadece “Gelişmiş” açılınca kullanılacak
function buildTags(videos: VideoItem[]): VideoTag[] {
  const raw = (videos || [])
    .map((v) => (v?.tag || "").trim())
    .filter(Boolean) as VideoTag[];

  const unique = uniq(raw);
  const withoutGenel = unique.filter((t) => t !== "Genel");
  const sorted = withoutGenel.sort((a, b) => String(a).localeCompare(String(b), "tr"));
  return (["Genel", ...sorted] as VideoTag[]).slice(0, 18);
}

export default function VideosClient({ initialVideos }: { initialVideos: VideoItem[] }) {
  const router = useRouter();
  const sp = useSearchParams();

  const videos = Array.isArray(initialVideos) ? initialVideos : [];

  // URL paramları
  const urlTopic = sp.get("topic");
  const urlQ = sp.get("q") ?? "";
  const urlShorts = sp.get("shorts") === "1";

  // Sade filtre state
  const [q, setQ] = useState(urlQ);
  const [topic, setTopic] = useState<TopicId | null>(isTopicId(urlTopic) ? urlTopic : null);
  const [onlyShorts, setOnlyShorts] = useState<boolean>(urlShorts);

  // Gelişmiş (opsiyonel)
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const [activeTag, setActiveTag] = useState<VideoTag>("Genel");

  // Modal
  const [openId, setOpenId] = useState<string | null>(null);
  const openVideo = useMemo(() => videos.find((v) => v.id === openId) ?? null, [videos, openId]);

  const TAGS = useMemo(() => buildTags(videos), [videos]);

  useEffect(() => {
    setTopic(isTopicId(urlTopic) ? urlTopic : null);
  }, [urlTopic]);

  useEffect(() => setQ(urlQ), [urlQ]);
  useEffect(() => setOnlyShorts(urlShorts), [urlShorts]);

  function setParam(key: string, value?: string) {
    const params = new URLSearchParams(sp.toString());
    if (!value) params.delete(key);
    else params.set(key, value);
    const qs = params.toString();
    router.replace(qs ? `?${qs}` : `?`);
  }

  function resetFilters() {
    setQ("");
    setTopic(null);
    setOnlyShorts(false);
    setAdvancedOpen(false);
    setActiveTag("Genel");
    router.replace(`?`);
  }

  const filtered = useMemo(() => {
    const query = q.trim().toLocaleLowerCase("tr-TR");

    return videos.filter((v) => {
      // shorts
      if (onlyShorts && !v.isShort) return false;

      // topic
      if (topic) {
        const vt = (v.topicId ?? topicIdFromTag(v.tag)) as TopicId;
        if (vt !== topic) return false;
      }

      // advanced tag
      if (advancedOpen && activeTag !== "Genel" && v.tag !== activeTag) return false;

      // search
      if (!query) return true;
      return safeLower(v.title).includes(query) || safeLower(v.tag).includes(query);
    });
  }, [videos, q, topic, onlyShorts, advancedOpen, activeTag]);

  const activeTopicObj = topic ? getTopicById(topic) : null;

  const embedSrc = useMemo(() => {
    if (!openVideo?.id) return "";
    return `https://www.youtube-nocookie.com/embed/${openVideo.id}?autoplay=1&mute=1&playsinline=1&rel=0&modestbranding=1`;
  }, [openVideo?.id]);

  // ✅ Hero’da “vitrin”: ilk 6 video
  const showcase = useMemo(() => filtered.slice(0, 6), [filtered]);

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-8 md:py-10">
      {/* ✅ TEK HERO (Kısa) */}
      <div className="relative overflow-hidden rounded-3xl border bg-white/75 p-6 shadow-sm backdrop-blur md:p-8">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-sky-400/10 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
        </div>

        <div className="relative">
          <div className="text-xs font-semibold tracking-wide text-slate-500">
            VİDEOLAR
          </div>

          <div className="mt-1 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div className="min-w-0">
              <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 md:text-3xl">
                Kredi Videoları
              </h1>
              <p className="mt-1 max-w-2xl text-sm text-slate-600">
                Kısa, net ve pratik anlatım. İstersen sitede izle, istersen YouTube’da aç.
              </p>

              {activeTopicObj ? (
                <p className="mt-2 text-sm text-slate-600">
                  Seçili konu: <b>{activeTopicObj.title}</b> — {activeTopicObj.summary}
                </p>
              ) : null}
            </div>

            <div className="flex flex-wrap gap-2">
              <Link
                href="/iletisim"
                className="inline-flex h-11 items-center justify-center rounded-2xl bg-slate-900 px-5 text-sm font-semibold text-white hover:bg-slate-800"
              >
                Ücretsiz ön analiz
              </Link>

              <button
                type="button"
                onClick={() => setAdvancedOpen((s) => !s)}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-900 hover:shadow-sm"
              >
                <SlidersHorizontal className="h-4 w-4" />
                Filtreler
              </button>

              <button
                type="button"
                onClick={resetFilters}
                className="inline-flex h-11 items-center justify-center rounded-2xl border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-900 hover:shadow-sm"
              >
                Temizle
              </button>
            </div>
          </div>

          {/* ✅ Minimal filtre satırı (her zaman) */}
          <div className="mt-5 flex flex-col gap-3 md:flex-row md:items-center">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
              <input
                value={q}
                onChange={(e) => {
                  const val = e.target.value;
                  setQ(val);
                  setParam("q", val.trim() ? val : "");
                }}
                placeholder="Video ara (ör: kredi notu, limit, başvuru...)"
                className="h-11 w-full rounded-2xl border border-slate-200 bg-white pl-10 pr-3 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-slate-200"
              />
            </div>

            <select
              value={topic ?? ""}
              onChange={(e) => {
                const v = e.target.value || "";
                const next = isTopicId(v) ? (v as TopicId) : null;
                setTopic(next);
                setParam("topic", next ?? "");
              }}
              className="h-11 w-full rounded-2xl border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-900 shadow-sm outline-none focus:ring-2 focus:ring-slate-200 md:w-[260px]"
            >
              <option value="">Tüm Konular</option>
              {TOPICS.filter((t) => t.id !== "genel").map((t) => (
                <option key={t.id} value={t.id}>
                  {t.title}
                </option>
              ))}
            </select>

            <button
              type="button"
              onClick={() => {
                const next = !onlyShorts;
                setOnlyShorts(next);
                setParam("shorts", next ? "1" : "");
              }}
              className={`inline-flex h-11 w-full items-center justify-center rounded-2xl px-4 text-sm font-semibold shadow-sm md:w-40 ${
                onlyShorts
                  ? "bg-slate-900 text-white"
                  : "border border-slate-200 bg-white text-slate-900 hover:shadow-md"
              }`}
            >
              Shorts
            </button>
          </div>

          {/* ✅ Advanced panel (kapalı -> yer kaplamaz) */}
          {advancedOpen && (
            <div className="mt-4 rounded-2xl border border-slate-200 bg-white/70 p-4">
              <div className="flex items-center gap-2 text-xs font-semibold tracking-wide text-slate-600">
                <Tags className="h-4 w-4" />
                ETİKETLER (opsiyonel)
              </div>

              <div className="mt-3 flex flex-wrap gap-2">
                {TAGS.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setActiveTag(t)}
                    className={`inline-flex h-9 items-center justify-center rounded-full px-4 text-xs font-semibold shadow-sm ${
                      activeTag === t
                        ? "bg-slate-900 text-white"
                        : "border border-slate-200 bg-white text-slate-900 hover:shadow-md"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>

              <div className="mt-3 text-xs text-slate-500">
                Not: Etiket filtresi sadece “Filtreler” açıkken devrede. Kapattığında liste daha geniş görünür.
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ✅ Vitrin (ana sayfa gibi): ilk 6 video */}
      <div className="mt-6">
        <div className="mb-3 flex items-end justify-between gap-3">
          <div>
            <div className="text-xs font-semibold tracking-wide text-slate-500">VİTRİN</div>
            <h2 className="mt-1 text-lg font-extrabold text-slate-900">
              Öne çıkan videolar
            </h2>
          </div>
          <a
            href="https://www.youtube.com/@danismanerdiergen/shorts"
            target="_blank"
            rel="noreferrer"
            className="text-sm font-semibold text-slate-900 underline underline-offset-4"
          >
            YouTube’da tümünü aç →
          </a>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {showcase.map((v) => {
            const thumb = v.thumb ?? youtubeThumbUrl(v.id);
            return (
              <button
                key={`showcase-${v.id}`}
                type="button"
                onClick={() => setOpenId(v.id)}
                className="group overflow-hidden rounded-2xl border bg-white/70 text-left shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:shadow-lg"
              >
                <div className="relative aspect-video w-full overflow-hidden">
                  <Image
                    src={thumb}
                    alt={v.title}
                    fill
                    className="object-cover transition duration-300 group-hover:scale-[1.04]"
                    sizes="(max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/35 via-black/0 to-black/0" />
                  <div className="absolute bottom-3 left-3 inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-900 shadow">
                    <Play className="h-3.5 w-3.5" />
                    İzle
                  </div>
                </div>
                <div className="p-4">
                  <div className="mb-2 inline-flex items-center rounded-full border bg-white px-2 py-1 text-[11px] text-slate-700">
                    {v.tag}
                    {v.isShort ? (
                      <span className="ml-2 rounded-full bg-slate-900 px-2 py-0.5 text-[10px] text-white">
                        SHORT
                      </span>
                    ) : null}
                  </div>
                  <div className="line-clamp-2 text-sm font-semibold text-slate-900">
                    {v.title}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ✅ Arşiv listesi (hero ile çakışmasın diye sade) */}
      <div className="mt-8">
        <div className="mb-3 flex items-end justify-between gap-3">
          <div>
            <div className="text-xs font-semibold tracking-wide text-slate-500">ARŞİV</div>
            <h2 className="mt-1 text-lg font-extrabold text-slate-900">
              Tüm videolar ({filtered.length})
            </h2>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((v) => {
            const watchHref = v.href ?? youtubeWatchUrl(v.id);
            const thumb = v.thumb ?? youtubeThumbUrl(v.id);

            return (
              <article
                key={v.id}
                className="group overflow-hidden rounded-2xl border bg-white/70 shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:shadow-lg"
              >
                <div className="relative aspect-video w-full overflow-hidden">
                  <Image
                    src={thumb}
                    alt={v.title}
                    fill
                    className="object-cover transition duration-300 group-hover:scale-[1.04]"
                    sizes="(max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/35 via-black/0 to-black/0" />

                  <button
                    type="button"
                    onClick={() => setOpenId(v.id)}
                    className="absolute inset-0 flex items-center justify-center opacity-0 transition duration-300 group-hover:opacity-100"
                    aria-label="Site içinde izle"
                  >
                    <div className="inline-flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-sm font-semibold text-slate-900 shadow">
                      <Play className="h-4 w-4" />
                      İzle
                    </div>
                  </button>
                </div>

                <div className="p-4">
                  <div className="mb-2 inline-flex items-center rounded-full border bg-white px-2 py-1 text-[11px] text-slate-700">
                    {v.tag}
                    {v.isShort ? (
                      <span className="ml-2 rounded-full bg-slate-900 px-2 py-0.5 text-[10px] text-white">
                        SHORT
                      </span>
                    ) : null}
                  </div>

                  <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-slate-900">
                    {v.title}
                  </h3>

                  <div className="mt-4 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setOpenId(v.id)}
                      className="inline-flex h-10 flex-1 items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 text-sm font-semibold text-white shadow-sm hover:bg-slate-800"
                    >
                      <Play className="h-4 w-4" />
                      Sitede izle
                    </button>

                    <a
                      href={watchHref}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-900 shadow-sm hover:shadow-md"
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

        {filtered.length === 0 && (
          <div className="mt-8 rounded-2xl border bg-white/70 p-6 text-sm text-slate-600">
            <div className="font-semibold text-slate-900">Sonuç bulunamadı</div>
            <p className="mt-1">Aramayı kısalt veya filtreleri temizle.</p>
            <div className="mt-4 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={resetFilters}
                className="inline-flex h-11 items-center justify-center rounded-xl bg-slate-900 px-5 text-sm font-semibold text-white shadow-sm hover:bg-slate-800"
              >
                Filtreleri temizle
              </button>
              <Link
                href="/iletisim"
                className="inline-flex h-11 items-center justify-center rounded-xl border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-900 shadow-sm hover:shadow-md"
              >
                Ücretsiz ön analiz
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Modal player */}
      {openVideo && (
        <div
          className="fixed inset-0 z-80 flex items-center justify-center bg-black/55 p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Video oynatıcı"
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
                className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-900 hover:shadow-sm"
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
              <div className="inline-flex items-center rounded-full border bg-white px-2 py-1 text-[11px] text-slate-700">
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
                className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 text-sm font-semibold text-white shadow-sm hover:bg-slate-800"
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
