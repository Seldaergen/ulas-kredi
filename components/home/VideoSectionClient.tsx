"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useMemo, useRef, useState, useCallback } from "react";

type ShortVideo = {
  id: string;
  title: string;
  url: string;
  thumbnail: string;
  tag: string;
  publishedAt?: string;
};

export default function VideoSectionClient({
  videos,
  youtubeShortsUrl,
  secondsPerVideo = 10,
}: {
  videos: ShortVideo[];
  youtubeShortsUrl: string;
  secondsPerVideo?: number;
}) {
  const safeVideos = Array.isArray(videos) ? videos.filter(Boolean) : [];
  const playlist = safeVideos.slice(0, 12);

  // vitrin: ilk 5
  const featured = playlist.slice(0, Math.min(5, playlist.length));
  const nextList = playlist.slice(featured.length, featured.length + 3);

  const per = Math.max(6, Math.min(20, secondsPerVideo)); // güvenli aralık
  const hasVideos = playlist.length > 0;

  const [mode, setMode] = useState<"player" | "vitrin">("vitrin");
  const [paused, setPaused] = useState(false);

  // vitrin index
  const [activeIndex, setActiveIndex] = useState(0);

  // aktif video id (player)
  const [activeId, setActiveId] = useState<string>(
    featured[0]?.id ?? playlist[0]?.id ?? ""
  );

  // progress (0..1)
  const [progress, setProgress] = useState(0);

  // raf timer
  const rafRef = useRef<number | null>(null);
  const startedAtRef = useRef<number>(0);
  const pausedAtRef = useRef<number>(0);

  // swipe
  const touchStartX = useRef<number | null>(null);
  const touchLastX = useRef<number | null>(null);

  const activeVideo = useMemo(() => {
    if (!hasVideos) return null;

    // player’da id bazlı, vitrin’de index bazlı
    if (mode === "player") {
      return playlist.find((v) => v.id === activeId) ?? playlist[0];
    }
    return featured[activeIndex] ?? featured[0] ?? playlist[0];
  }, [hasVideos, mode, playlist, activeId, featured, activeIndex]);

  const embedSrc = useMemo(() => {
    if (!activeVideo?.id) return "";
    return `https://www.youtube-nocookie.com/embed/${activeVideo.id}?autoplay=1&mute=1&playsinline=1&rel=0&modestbranding=1`;
  }, [activeVideo?.id]);

  const stopRaf = useCallback(() => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  }, []);

  const resetProgress = useCallback(() => {
    setProgress(0);
    startedAtRef.current = performance.now();
    pausedAtRef.current = 0;
  }, []);

  const nextFeatured = useCallback(() => {
    if (!featured.length) return;
    setActiveIndex((i) => (i + 1) % featured.length);
  }, [featured.length]);

  const prevFeatured = useCallback(() => {
    if (!featured.length) return;
    setActiveIndex((i) => (i - 1 + featured.length) % featured.length);
  }, [featured.length]);

  // vitrin index değişince activeId senkron (vitrin modunda)
  useEffect(() => {
    if (mode !== "vitrin") return;
    const v = featured[activeIndex];
    if (v?.id) setActiveId(v.id);
  }, [activeIndex, featured, mode]);

  // progress loop (vitrin modunda + paused değilken)
  const tick = useCallback(
    (now: number) => {
      if (mode !== "vitrin" || paused || !featured.length) return;

      const start = startedAtRef.current || now;
      const elapsed = now - start;
      const ratio = Math.min(1, elapsed / (per * 1000));
      setProgress(ratio);

      if (ratio >= 1) {
        resetProgress();
        nextFeatured();
      }

      rafRef.current = requestAnimationFrame(tick);
    },
    [mode, paused, featured.length, per, nextFeatured, resetProgress]
  );

  useEffect(() => {
    stopRaf();

    // player’da otomatik/progress yok
    if (mode === "player") {
      setProgress(0);
      return;
    }

    // vitrin: başlat
    resetProgress();
    if (!paused && featured.length) {
      rafRef.current = requestAnimationFrame(tick);
    }

    return () => stopRaf();
  }, [mode, paused, featured.length, tick, resetProgress, stopRaf]);

  const enterPlayer = useCallback(
    (id: string) => {
      setActiveId(id);
      setMode("player");
      setProgress(0);
      stopRaf();
    },
    [stopRaf]
  );

  const backToVitrin = useCallback(() => {
    setMode("vitrin");
    // activeId featured içindeyse index oturt
    const idx = featured.findIndex((v) => v.id === activeId);
    setActiveIndex(idx >= 0 ? idx : 0);
    setPaused(false);
  }, [activeId, featured]);

  const goPrev = useCallback(() => {
    if (!playlist.length) return;
    const idx = Math.max(0, playlist.findIndex((v) => v.id === activeId));
    const prev = (idx - 1 + playlist.length) % playlist.length;
    setActiveId(playlist[prev].id);
  }, [playlist, activeId]);

  const goNext = useCallback(() => {
    if (!playlist.length) return;
    const idx = Math.max(0, playlist.findIndex((v) => v.id === activeId));
    const next = (idx + 1) % playlist.length;
    setActiveId(playlist[next].id);
  }, [playlist, activeId]);

  // swipe handlers
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0]?.clientX ?? null;
    touchLastX.current = touchStartX.current;
  };
  const onTouchMove = (e: React.TouchEvent) => {
    touchLastX.current = e.touches[0]?.clientX ?? null;
  };
  const onTouchEnd = () => {
    const s = touchStartX.current;
    const l = touchLastX.current;
    touchStartX.current = null;
    touchLastX.current = null;
    if (s == null || l == null) return;

    const dx = l - s;
    const threshold = 40;
    if (Math.abs(dx) < threshold) return;

    if (mode !== "vitrin") return;
    if (dx > 0) prevFeatured();
    else nextFeatured();
    resetProgress();
  };

  if (!hasVideos) {
    return (
      <section className="relative w-full overflow-hidden bg-white py-12 md:py-16">
        <div className="mx-auto w-full max-w-6xl px-4">
          <div className="rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-sm backdrop-blur">
            <div className="text-base font-semibold text-slate-900">Videolar yüklenemedi</div>
            <p className="mt-2 text-sm text-slate-600">
              Şu anda YouTube verilerine erişilemiyor. Biraz sonra tekrar deneyin veya kanal üzerinden izleyin.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <a
                href={youtubeShortsUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-11 items-center justify-center rounded-xl bg-slate-900 px-5 text-sm font-semibold text-white shadow-sm hover:bg-slate-800"
              >
                YouTube Shorts ↗
              </a>
              <Link
                href="/iletisim"
                className="inline-flex h-11 items-center justify-center rounded-xl border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-900 shadow-sm hover:shadow-md"
              >
                Ücretsiz ön analiz
              </Link>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const vitrinVideo = featured[activeIndex] ?? playlist[0];

  return (
    <section className="relative w-full overflow-hidden bg-white py-12 md:py-16">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 right-4 h-60 w-60 rounded-full bg-cyan-50 blur-3xl" />
        <div className="absolute -bottom-24 left-8 h-60 w-60 rounded-full bg-sky-50 blur-3xl" />
      </div>

      <div className="relative mx-auto w-full max-w-6xl px-4">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900 md:text-[1.7rem]">
              YouTube{" "}
              <span className="bg-linear-to-r from-cyan-500 to-sky-500 bg-clip-text text-transparent">
                Shorts
              </span>
            </h2>
            <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-slate-600">
              Kısa videoları <span className="font-medium text-slate-900">site içinde</span> izleyin.
              Vitrin daha yavaş akar, her video ~{per} sn.
            </p>

            <div className="mt-3 flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/90 px-3 py-1 text-[11px] font-semibold text-slate-700 backdrop-blur">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                Swipe + progress + vitrin akışı
              </span>

              <button
                type="button"
                onClick={() => setPaused((p) => !p)}
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/90 px-3 py-1 text-[11px] font-semibold text-slate-900 shadow-sm backdrop-blur hover:shadow-md"
                aria-pressed={paused}
              >
                {paused ? "▶️ Devam" : "⏸️ Duraklat"}
              </button>

              {mode === "player" ? (
                <button
                  type="button"
                  onClick={backToVitrin}
                  className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/90 px-3 py-1 text-[11px] font-semibold text-slate-900 shadow-sm backdrop-blur hover:shadow-md"
                >
                  Vitrine dön →
                </button>
              ) : null}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/videolar"
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/90 px-4 py-2 text-[12px] font-semibold text-slate-900 shadow-sm backdrop-blur hover:shadow-md"
            >
              Sitede tüm videolar <span className="text-[14px]">→</span>
            </Link>

            <a
              href={youtubeShortsUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-[12px] font-semibold text-white shadow-md shadow-slate-900/40 hover:bg-slate-800"
            >
              YouTube&apos;da aç <span className="text-[14px]">↗</span>
            </a>
          </div>
        </div>

        {/* Layout */}
        <div className="grid gap-6 lg:grid-cols-12 lg:gap-8">
          {/* FEATURED */}
          <div className="lg:col-span-7">
            <div
              className="relative overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm"
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
            >
              {/* Top switch */}
              <div className="flex items-center justify-between gap-3 border-b border-slate-100 bg-white px-4 py-3">
                <div className="min-w-0">
                  <div className="text-[12px] font-semibold text-slate-900">
                    {mode === "player" ? "İzleme" : "Vitrin"}
                  </div>
                  <div className="mt-0.5 line-clamp-1 text-[12px] text-slate-600">
                    {activeVideo?.title}
                  </div>
                </div>

                <div className="inline-flex rounded-full border border-slate-200 bg-white p-1">
                  <button
                    type="button"
                    onClick={() => setMode("vitrin")}
                    className={`rounded-full px-3 py-1 text-[12px] font-semibold transition ${
                      mode === "vitrin"
                        ? "bg-slate-900 text-white"
                        : "text-slate-700 hover:text-slate-900"
                    }`}
                  >
                    Vitrin
                  </button>
                  <button
                    type="button"
                    onClick={() => setMode("player")}
                    className={`rounded-full px-3 py-1 text-[12px] font-semibold transition ${
                      mode === "player"
                        ? "bg-slate-900 text-white"
                        : "text-slate-700 hover:text-slate-900"
                    }`}
                  >
                    İzle
                  </button>
                </div>
              </div>

              {/* Body */}
              <div className="relative aspect-16/10">
                {mode === "player" && activeVideo?.id ? (
                  <div className="absolute inset-0">
                    <iframe
                      src={embedSrc}
                      title={activeVideo.title}
                      className="h-full w-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      referrerPolicy="strict-origin-when-cross-origin"
                    />
                    <div className="pointer-events-none absolute inset-0 ring-1 ring-cyan-400/20" />
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => enterPlayer(vitrinVideo.id)}
                    className="group absolute inset-0 text-left"
                    aria-label="Videoyu site içinde izle"
                  >
                    <Image
                      src={vitrinVideo.thumbnail}
                      alt={vitrinVideo.title}
                      fill
                      priority
                      className="object-cover transition duration-500 group-hover:scale-[1.02]"
                      sizes="(max-width: 1024px) 100vw, 60vw"
                    />

                    <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(56,189,248,0.20),transparent_60%)]" />

                    <div className="absolute left-4 top-4 flex items-center gap-2">
                      <div className="rounded-full bg-white/15 px-3 py-1 text-[11px] font-semibold text-white backdrop-blur">
                        Shorts
                      </div>
                      <div className="rounded-full bg-white/15 px-3 py-1 text-[11px] font-semibold text-white backdrop-blur">
                        {vitrinVideo.tag}
                      </div>
                    </div>

                    <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                      <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-white/90 text-slate-900 shadow-xl shadow-black/40 transition group-hover:scale-105">
                        <span className="ml-0.5 inline-block border-y-8 border-l-14 border-y-transparent border-l-slate-900" />
                      </span>
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <div className="max-w-xl text-balance text-[15px] font-semibold leading-snug text-white line-clamp-2">
                        {vitrinVideo.title}
                      </div>
                      <div className="mt-2 text-[11px] font-medium text-white/85">
                        Site içinde izlemek için tıkla →
                      </div>
                    </div>

                    {/* Progress bar (gerçek zamanlı) */}
                    <div className="pointer-events-none absolute bottom-0 left-0 right-0">
                      <div className="h-1 w-full bg-white/10">
                        <div
                          className="h-1 origin-left bg-white/70"
                          style={{ transform: `scaleX(${progress})` }}
                        />
                      </div>
                    </div>
                  </button>
                )}
              </div>

              {/* Bottom controls */}
              <div className="flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 bg-white px-4 py-3">
                <div className="text-[12px] text-slate-600">
                  {mode === "player" ? (
                    <>
                      •{" "}
                      <button
                        type="button"
                        className="font-semibold text-cyan-700 hover:underline"
                        onClick={backToVitrin}
                      >
                        vitrine dön
                      </button>
                    </>
                  ) : (
                    <> • </>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    className="h-9 rounded-xl border border-slate-200 bg-white px-3 text-[12px] font-semibold text-slate-900 shadow-sm hover:shadow-md"
                    onClick={() => {
                      if (mode === "player") goPrev();
                      else {
                        prevFeatured();
                        resetProgress();
                      }
                    }}
                  >
                    ← Önceki
                  </button>
                  <button
                    type="button"
                    className="h-9 rounded-xl bg-slate-900 px-3 text-[12px] font-semibold text-white shadow-sm hover:bg-slate-800"
                    onClick={() => {
                      if (mode === "player") goNext();
                      else {
                        nextFeatured();
                        resetProgress();
                      }
                    }}
                  >
                    Sonraki →
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* NEXT */}
          <div className="lg:col-span-5">
            <div className="rounded-3xl border border-slate-100 bg-white/70 p-4 shadow-sm backdrop-blur">
              <div className="flex items-end justify-between gap-3">
                <div>
                  <div className="text-base font-semibold text-slate-900">Sıradaki videolar</div>
                  <div className="mt-1 text-sm text-slate-600">Tıklayınca site içi player açılır</div>
                </div>
                <div className="rounded-full border border-slate-200 bg-white px-3 py-1 text-[11px] font-semibold text-slate-700">
                  Güncel
                </div>
              </div>

              <div className="mt-4 grid gap-3">
                {(nextList.length ? nextList : playlist.slice(0, 3)).map((v) => (
                  <button
                    key={v.id}
                    type="button"
                    onClick={() => enterPlayer(v.id)}
                    className="group flex w-full items-center gap-3 rounded-2xl border border-slate-100 bg-white p-3 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                    aria-label={`${v.title} videosunu izle`}
                  >
                    <div className="relative h-16 w-12 overflow-hidden rounded-xl bg-slate-900">
                      <Image
                        src={v.thumbnail}
                        alt={v.title}
                        fill
                        className="object-cover transition duration-300 group-hover:scale-[1.04]"
                        sizes="48px"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-black/40 via-black/0 to-black/0" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="mb-1 inline-flex w-fit rounded-full bg-slate-50 px-2 py-0.5 text-[10px] font-semibold text-slate-700">
                        {v.tag}
                      </div>
                      <div className="line-clamp-2 text-[13px] font-semibold text-slate-900">
                        {v.title}
                      </div>
                      <div className="mt-1 text-[11px] font-medium text-cyan-700">Sitede izle →</div>
                    </div>
                  </button>
                ))}
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <Link
                  href="/videolar"
                  className="inline-flex h-11 items-center justify-center rounded-xl bg-slate-900 px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
                >
                  Tüm videolar
                </Link>
                <a
                  href={youtubeShortsUrl}
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

        {/* Lead CTA */}
        <div className="mt-10 overflow-hidden rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-sm backdrop-blur">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h3 className="text-lg font-semibold text-slate-900">
                Videodaki durum sizde de varsa, ücretsiz ön analiz yapalım
              </h3>
              <p className="mt-1 text-sm text-slate-600">
                Kredi notu/limit profiline göre en doğru başvuru stratejisini çıkaralım.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/iletisim"
                className="inline-flex h-11 items-center justify-center rounded-xl bg-slate-900 px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
              >
                Ücretsiz ön analiz al →
              </Link>
              <Link
                href="/soru-cevap"
                className="inline-flex h-11 items-center justify-center rounded-xl border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-900 shadow-sm transition hover:shadow-md"
              >
                Soru-Cevap
              </Link>
            </div>
          </div>
        </div>

        {/* reduced motion */}
        <style>{`
          @media (prefers-reduced-motion: reduce) {
            * { scroll-behavior: auto !important; }
          }
        `}</style>
      </div>
    </section>
  );
}
