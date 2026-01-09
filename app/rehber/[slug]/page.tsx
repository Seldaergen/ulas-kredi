// app/rehber/[slug]/page.tsx
import Link from "next/link";
import { notFound } from "next/navigation";
import Script from "next/script";

import { POSTS, getPost, type Post } from "@/lib/content/posts";
import { getTopicById, type TopicId } from "@/lib/topics/topics";
import { getVideos } from "@/lib/videos/server";
import RelatedVideosByTopic from "@/components/videos/RelatedVideosByTopic";

// ✅ Cover: sayfada görünen görsel (UI)
import CoverImageClient from "@/components/rehber/CoverImageClient";

/**
 * ✅ SEO: Site URL
 * - Prod: env’den gelsin
 * - Local: http://localhost:3000
 *
 * .env.local örneği:
 * SITE_URL=https://ulas-kredi.com
 */
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

/**
 * ✅ SEO: Rehber kapak görseli
 * - öncelik: post.coverImage
 * - fallback: /content/{slug}.jpg
 */
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
  // YYYY-MM-DD → YYYY-MM-DDT00:00:00+03:00 gibi bir forma çevirmeye çalışmayalım;
  // Google için ISO string yeterli. (hata riski düşer)
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

/**
 * ✅ MDX yerine: Post.content bloklarını render eden stabil renderer
 */
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
            <h2 key={`h2-${idx}`} className="mt-8 scroll-mt-24 text-slate-900">
              {b.text}
            </h2>
          );
        }

        if (b.type === "p") {
          return (
            <p key={`p-${idx}`} className="text-slate-700">
              {b.text}
            </p>
          );
        }

        if (b.type === "ul") {
          return (
            <ul key={`ul-${idx}`} className="text-slate-700">
              {b.items.map((it, i) => (
                <li key={`li-${idx}-${i}`}>{it}</li>
              ))}
            </ul>
          );
        }

        if (b.type === "callout") {
          return (
            <div
              key={`co-${idx}`}
              className="not-prose my-6 rounded-2xl border border-slate-200 bg-slate-50 p-4"
            >
              <div className="text-sm font-extrabold text-slate-900">{b.title}</div>
              <div className="mt-1 text-sm leading-6 text-slate-700">{b.text}</div>
            </div>
          );
        }

        return null;
      })}
    </>
  );
}

/**
 * ✅ SEO: JSON-LD (Article + BreadcrumbList)
 * İçeriğe dokunmadan her rehber için otomatik sinyal üretir.
 */
function buildJsonLd(post: Post) {
  const site = getSiteUrl();
  const url = absoluteUrl(`/rehber/${post.slug}`);
  const image = absoluteUrl(coverImagePath(post));

  // Çok uzun excerpt olmasın (Google/preview için daha temiz)
  const description = (post.excerpt || "").trim().slice(0, 200);

  const published = post.date ? fmtIso(post.date) : undefined;

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Ana Sayfa",
        item: site,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Kredi Rehberi",
        item: absoluteUrl("/rehber"),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: url,
      },
    ],
  };

  const article = {
    "@context": "https://schema.org",
    "@type": "Article",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    headline: post.title,
    description,
    image: [image],
    datePublished: published,
    dateModified: published,
    author: {
      // Kişisel isim vermek zorunda değilsin; YMYL’de “Organization” güvenli bir default.
      "@type": "Organization",
      name: "Ulaş Kredi Danışmanlık",
      url: site,
    },
    publisher: {
      "@type": "Organization",
      name: "Ulaş Kredi Danışmanlık",
      url: site,
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl("/logo.png"),
      },
    },
  };

  return { breadcrumb, article };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const post = getPost(slug);
  if (!post) return {};

  const topic = getTopicById(post.topicId);

  const url = absoluteUrl(`/rehber/${post.slug}`);
  const image = absoluteUrl(coverImagePath(post));

  const title = `${post.title} | Kredi Rehberi`;
  const description = (post.excerpt || "").trim().slice(0, 200);

  return {
    title,
    description,

    // ✅ Canonical (kopya sayfa / param riskini azaltır)
    alternates: {
      canonical: url,
    },

    // ✅ OpenGraph / Twitter → paylaşım görseli + Google preview için çok faydalı
    openGraph: {
      type: "article",
      url,
      title,
      description,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      locale: "tr_TR",
      siteName: "Ulaş Kredi Danışmanlık",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },

    // İstersen buraya “robots” ekleyebiliriz ama genelde global ayar daha doğru.
    // robots: { index: true, follow: true },
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

  const related = POSTS.filter((p) => p.slug !== post.slug && p.topicId === post.topicId).slice(0, 4);
  const videos = await getVideos();

  const jsonLd = buildJsonLd(post);

  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-10 md:py-14">
      {/* ✅ JSON-LD: Google için makine-okur sinyaller */}
      <Script
        id="rehber-jsonld-article"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd.article) }}
      />
      <Script
        id="rehber-jsonld-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd.breadcrumb) }}
      />

      {/* Breadcrumb */}
      <nav className="mb-4 text-xs text-slate-500">
        <Link href="/" className="hover:underline">
          Ana Sayfa
        </Link>
        <span className="mx-2">/</span>
        <Link href="/rehber" className="hover:underline">
          Kredi Rehberi
        </Link>
        <span className="mx-2">/</span>
        {topic ? (
          <>
            <Link href={rehberHrefByTopic(post.topicId)} className="hover:underline">
              {topic.title}
            </Link>
            <span className="mx-2">/</span>
          </>
        ) : null}
        <span className="text-slate-700">{post.category}</span>
      </nav>

      {/* Header */}
      <header className="mb-6">
        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
          <span className="rounded-full border border-slate-200 bg-white px-2.5 py-1 font-semibold text-slate-900">
            {post.category}
          </span>

          {topic ? (
            <Link
              href={rehberHrefByTopic(post.topicId)}
              title={topic.summary}
              className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 font-semibold text-slate-700 hover:shadow-sm"
            >
              {topic.title}
            </Link>
          ) : null}

          <span>{post.readingTime}</span>
          <span>•</span>
          <span>{fmtDateTR(post.date)}</span>

          {typeof post.views === "number" ? (
            <>
              <span>•</span>
              <span>{post.views.toLocaleString("tr-TR")} okuma</span>
            </>
          ) : null}
        </div>

        <h1 className="mt-3 text-balance text-3xl font-extrabold leading-tight tracking-tight text-slate-900 md:text-4xl">
          {post.title}
        </h1>

        <p className="mt-3 text-[15px] leading-7 text-slate-700">{post.excerpt}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          <Link
            href={videosHrefByTopic(post.topicId)}
            className="inline-flex h-10 items-center justify-center rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-900 shadow-sm hover:shadow-md"
          >
            İlgili videolar →
          </Link>
          <Link
            href={qaHrefByTopic(post.topicId)}
            className="inline-flex h-10 items-center justify-center rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-900 shadow-sm hover:shadow-md"
          >
            İlgili soru–cevap →
          </Link>
        </div>
      </header>

      {/* ✅ Cover (UI) */}
      <div className="relative mb-6 h-56 w-full overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 md:h-72">
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
      <div className="mb-8 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="text-sm font-extrabold text-slate-900">Durumuna özel hızlı yol haritası ister misin?</div>
        <p className="mt-1 text-sm text-slate-600">
          Kredi notu / limit / başvuru süreci için ücretsiz ön değerlendirme al.
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          <Link
            href="/iletisim"
            className="inline-flex items-center justify-center rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white"
          >
            İletişime geç
          </Link>
          <a
            href="https://wa.me/905416061356"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-900"
          >
            WhatsApp
          </a>
        </div>
      </div>

      {/* ✅ Content */}
      <article className="prose prose-slate max-w-none prose-h2:mt-8 prose-h2:font-extrabold prose-p:text-[15px] prose-p:leading-7">
        <RenderContent post={post} />
      </article>

      {/* Videolar */}
      <section className="mt-10">
        <div className="flex items-end justify-between gap-3">
          <div>
            <h3 className="text-lg font-extrabold text-slate-900">Bu konudaki videolar</h3>
            <p className="mt-1 text-sm text-slate-600">Aynı konuyu video ile de izlemek istersen:</p>
          </div>
          <Link href={videosHrefByTopic(post.topicId)} className="text-sm font-semibold text-slate-900 hover:underline">
            Tümünü gör →
          </Link>
        </div>

        <div className="mt-4">
          <RelatedVideosByTopic videos={videos} topicId={post.topicId} limit={6} />
        </div>
      </section>

      {/* Related rehberler */}
      {related.length > 0 ? (
        <section className="mt-10">
          <div className="flex items-end justify-between gap-3">
            <div>
              <h3 className="text-lg font-extrabold text-slate-900">İlgili rehberler</h3>
              {topic ? <p className="mt-1 text-sm text-slate-600">Aynı konu altında devam edebileceğin içerikler.</p> : null}
            </div>

            <Link href={rehberHrefByTopic(post.topicId)} className="text-sm font-semibold text-slate-900 hover:underline">
              Bu konudaki tüm rehberler →
            </Link>
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {related.map((p) => (
              <Link
                key={p.slug}
                href={`/rehber/${p.slug}`}
                className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="relative h-32 w-full bg-slate-100">
                  <CoverImageClient
                    slug={p.slug}
                    coverImage={p.coverImage}
                    topicId={p.topicId}
                    alt={`${p.title} - Ulaş Kredi Rehberi`}
                    className="h-full"
                  />
                </div>
                <div className="p-4">
                  <div className="text-xs text-slate-500">{p.readingTime}</div>
                  <div className="mt-1 line-clamp-2 text-sm font-extrabold text-slate-900">{p.title}</div>
                  <div className="mt-2 text-xs font-semibold text-slate-900">
                    Oku <span className="transition group-hover:translate-x-0.5">→</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      ) : null}
    </main>
  );
}
