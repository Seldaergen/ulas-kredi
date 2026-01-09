"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import { ArrowRight, Sparkles, BookOpen, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { POSTS } from "@/lib/content/posts";

const FALLBACK_IMG = "/content/placeholder.jpg";

function safeText(x: unknown) {
  return typeof x === "string" ? x : "";
}

function safeDate(x: unknown) {
  const s = safeText(x);
  // YYYY-MM-DD bekleniyor, değilse boş
  return /^\d{4}-\d{2}-\d{2}$/.test(s) ? s : "";
}

function fmtDateTR(iso: string) {
  try {
    const d = new Date(`${iso}T00:00:00`);
    return d.toLocaleDateString("tr-TR", { day: "2-digit", month: "short", year: "numeric" });
  } catch {
    return "";
  }
}

function toHref(slug: string) {
  return `/rehber/${slug}`;
}

function pickTopPosts() {
  const all = Array.isArray(POSTS) ? POSTS : [];
  // sadece rehber route’una gidecek şekilde: her post rehber içeriği kabul
  // (istersen category/topic ile de filtreleriz)
  const normalized = all
    .map((p: any) => ({
      slug: safeText(p?.slug),
      title: safeText(p?.title),
      excerpt: safeText(p?.excerpt),
      category: safeText(p?.category),
      readingTime: safeText(p?.readingTime) || "—",
      date: safeDate(p?.date),
      coverImage: safeText(p?.coverImage),
    }))
    .filter((p) => p.slug && p.title);

  // yeni → eski sıralama
  normalized.sort((a, b) => (b.date || "").localeCompare(a.date || ""));

  // ilk 6
  return normalized.slice(0, 6);
}

function MobileRow({
  item,
  highlight,
}: {
  item: {
    slug: string;
    title: string;
    excerpt: string;
    category: string;
    readingTime: string;
    date: string;
    coverImage: string;
  };
  highlight?: boolean;
}) {
  return (
    <Link
      href={toHref(item.slug)}
      className={cn(
        "group flex gap-3 rounded-xl border bg-white p-3 transition hover:shadow-md",
        highlight ? "border-sky-200 bg-sky-50/60" : "border-slate-200"
      )}
    >
      <div className="relative h-19.5 w-23 flex-none overflow-hidden rounded-lg">
        <Image
          src={item.coverImage || FALLBACK_IMG}
          alt={item.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
          sizes="96px"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/25 via-black/0 to-black/0" />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-1 text-[11px] font-semibold text-primary ring-1 ring-primary/20">
            <BookOpen className="h-3.5 w-3.5" />
            {item.category || "Rehber"}
          </span>

          {item.date ? (
            <span className="text-[11px] font-medium text-slate-500">{fmtDateTR(item.date)}</span>
          ) : null}

          <span className="ml-auto inline-flex items-center gap-1 text-[11px] font-medium text-slate-500">
            <Clock className="h-3.5 w-3.5" />
            {item.readingTime}
          </span>
        </div>

        <h3 className="mt-2 line-clamp-2 text-[15px] font-semibold leading-snug text-slate-900">
          {item.title}
        </h3>

        <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-slate-600">{item.excerpt}</p>
      </div>
    </Link>
  );
}

function DesktopCard({
  item,
  isNew,
}: {
  item: {
    slug: string;
    title: string;
    excerpt: string;
    category: string;
    readingTime: string;
    date: string;
    coverImage: string;
  };
  isNew?: boolean;
}) {
  return (
    <Link
      href={toHref(item.slug)}
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all",
        "hover:-translate-y-0.5 hover:shadow-xl"
      )}
    >
      <div className="relative aspect-video w-full overflow-hidden">
        <Image
          src={item.coverImage || FALLBACK_IMG}
          alt={item.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          sizes="(max-width: 1024px) 100vw, 33vw"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/40 via-black/10 to-black/0" />

        <div className="absolute left-4 top-4 flex items-center gap-2">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/85 px-3 py-1 text-xs font-semibold text-slate-900 backdrop-blur">
            <BookOpen className="h-4 w-4" />
            {item.category || "Rehber"}
          </span>

          {isNew ? (
            <span className="inline-flex items-center gap-1 rounded-full bg-primary/15 px-3 py-1 text-xs font-semibold text-primary">
              <Sparkles className="h-3.5 w-3.5" />
              Yeni
            </span>
          ) : null}
        </div>

        <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-white/90">
          <span className="truncate">{item.date ? fmtDateTR(item.date) : "—"}</span>
          <span className="inline-flex items-center gap-1 opacity-90">
            Oku <ArrowRight className="h-3.5 w-3.5" />
          </span>
        </div>
      </div>

      <div className="p-5">
        <h3 className="line-clamp-2 text-base font-semibold leading-snug text-slate-900">{item.title}</h3>
        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-slate-600">{item.excerpt}</p>

        <div className="mt-4 flex items-center justify-between">
          <span className="text-xs text-slate-500">Ulaş Kredi • Rehber</span>
          <span className="text-xs font-semibold text-slate-800 transition group-hover:text-slate-950">
            Devamını oku →
          </span>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="absolute -inset-24 bg-[radial-gradient(circle_at_30%_20%,rgba(56,189,248,0.18),transparent_55%)]" />
        <div className="absolute -inset-24 bg-[radial-gradient(circle_at_70%_80%,rgba(99,102,241,0.10),transparent_55%)]" />
      </div>
    </Link>
  );
}

export default function FeaturedContent() {
  const items = useMemo(() => pickTopPosts(), []);

  return (
    <section className="relative mx-auto max-w-7xl px-4 py-12 sm:py-16">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-2 sm:mb-8">
        <p className="text-xs font-semibold tracking-wide text-primary/90">REHBER</p>

        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Rehber Öne Çıkanlar
            </h2>
            <div className="mt-3 h-0.5 w-12 rounded bg-slate-300" />
            <p className="mt-3 max-w-2xl text-sm text-slate-600">
              Kredi notu, limit, başvuru süreci ve yasal risklerle ilgili en çok okunan rehberler.
            </p>
          </div>

          <Link
            href="/rehber"
            className="hidden items-center gap-2 rounded-full border bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm transition hover:shadow-md sm:inline-flex"
          >
            Tüm rehberler <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      {/* Empty state */}
      {items.length === 0 ? (
        <div className="rounded-2xl border border-slate-200 bg-white/80 p-6 text-center backdrop-blur shadow-sm">
          <p className="text-sm font-semibold text-slate-900">Henüz rehber içerik bulunamadı.</p>
          <p className="mt-2 text-sm text-slate-600">POSTS listesini kontrol edelim.</p>
        </div>
      ) : (
        <>
          {/* Mobile list */}
          <div className="sm:hidden">
            {items.map((item, i) => (
              <div key={item.slug}>
                <MobileRow item={item} highlight={i < 2} />
                {i !== items.length - 1 && <div className="mx-2 h-px bg-slate-200/70" />}
              </div>
            ))}
          </div>

          {/* Desktop grid */}
          <div className="hidden gap-6 sm:grid sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item, idx) => (
              <DesktopCard key={item.slug} item={item} isNew={idx < 2} />
            ))}
          </div>
        </>
      )}

      {/* CTA band */}
      <div className="mt-8 flex flex-col items-start justify-between gap-3 rounded-2xl border bg-white/80 p-5 shadow-sm backdrop-blur sm:flex-row sm:items-center">
        <div>
          <p className="text-sm font-semibold text-slate-900">Ücretsiz Ön Analiz Al</p>
          <p className="mt-1 text-sm text-slate-600">
            Rehberleri okudun ama hâlâ kararsız mısın? Durumuna özel yol haritasını çıkaralım.
          </p>
        </div>

        <div className="flex w-full gap-3 sm:w-auto">
          <Link
            href="/iletisim"
            className="inline-flex w-full items-center justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition hover:opacity-95 sm:w-auto"
          >
            İletişime geç
          </Link>
          <a
            href="https://wa.me/905416061356"
            target="_blank"
            rel="noreferrer"
            className="inline-flex w-full items-center justify-center rounded-full border bg-white px-5 py-2.5 text-sm font-semibold text-slate-900 shadow-sm transition hover:shadow-md sm:w-auto"
          >
            WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
