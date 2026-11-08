// app/rehber/[slug]/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { POSTS, PUBLISHED_POSTS, getPost, type Post } from "@/lib/content/posts";
import { publication } from "@/lib/content/publication";
import { absoluteUrl, SITE_ORIGIN } from "@/lib/seo";
import { getTopicById, type TopicId } from "@/lib/topics/topics";
import { ConversionPanel } from "@/components/inner-page";

import { GuideCover } from "@/components/rehber/GuideCover";

/* -------------------------------------------------------------------------- */
/*                                  HELPERS                                   */
/* -------------------------------------------------------------------------- */

// Static rendering can supply an encoded segment; content slugs stay unchanged.
function getRoutePost(slug: string) {
  const direct = getPost(slug);
  if (direct) return direct;
  try {
    return getPost(decodeURIComponent(slug));
  } catch {
    return null;
  }
}

function getSiteUrl() {
  return SITE_ORIGIN;
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

function videosHrefByTopic(topicId: TopicId) {
  return `/videolar?topic=${encodeURIComponent(topicId)}`;
}

function serviceHrefByTopic() {
  return "/hizmetler#hizmet-listesi";
}

function rehberHrefByTopic(topicId: TopicId) {
  return `/rehber?topic=${encodeURIComponent(topicId)}`;
}

function buildJsonLd(post: Post) {
  const url = absoluteUrl(`/rehber/${post.slug}`);
  const image = absoluteUrl("/electric-finance-og.png");

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    headline: post.title,
    description: post.excerpt,
    image: [image],
    datePublished: post.date,
    dateModified: publication(post).modified,
    citation: publication(post).sources.map(source => source.url),
    inLanguage: "tr-TR",
    articleSection: post.category,
    author: {
      "@type": "Organization",
      name: "Ulaş Kredi Danışmanlık",
      url: getSiteUrl(),
    },
    publisher: {
      "@type": "Organization",
      name: "Ulaş Kredi Danışmanlık",
      url: getSiteUrl(),
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl("/logo.svg"),
      },
    },
  };
}

/* -------------------------------------------------------------------------- */
/*                              RENDER CONTENT                                */
/* -------------------------------------------------------------------------- */

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
            <h2 id={"section-"+idx} key={idx} className="mt-8 text-slate-900">
              {b.text}
            </h2>
          );
        }

        if (b.type === "p") {
          return (
            <p key={idx} className="text-slate-700">
              {b.text}
            </p>
          );
        }

        if (b.type === "ul") {
          return (
            <ul key={idx} className="text-slate-700">
              {b.items.map((it, i) => (
                <li key={i}>{it}</li>
              ))}
            </ul>
          );
        }

        if (b.type === "callout") {
          return (
            <div key={idx} className="my-6 rounded-2xl border bg-slate-50 p-4">
              <div className="text-sm font-bold text-slate-900">{b.title}</div>
              <div className="text-sm text-slate-700">{b.text}</div>
            </div>
          );
        }

        return null;
      })}
    </>
  );
}

/* -------------------------------------------------------------------------- */
/*                        STATIC PARAMS + METADATA                            */
/* -------------------------------------------------------------------------- */

export async function generateStaticParams() {
  return POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getRoutePost(slug);

  if (!post) return {};

  const url = absoluteUrl(`/rehber/${post.slug}`);
  const image = absoluteUrl("/electric-finance-og.png");
  const review = publication(post);
  if (review.status !== "published") return {
    title: `İçerik incelemede: ${post.title}`,
    description: review.reason,
    alternates: { canonical: url },
    robots: { index: false, follow: true },
    openGraph: { title: "İçerik incelemede", description: review.reason ?? "Kaynak kontrolü sürüyor.", url, type: "website", images: [absoluteUrl("/electric-finance-og.png")] },
  };

  return {
    title: post.title,
    description: post.excerpt,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url,
      type: "article",
      publishedTime: post.date,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [image],
    },
  };
}

/* -------------------------------------------------------------------------- */
/*                                   PAGE                                     */
/* -------------------------------------------------------------------------- */

export default async function RehberDetayPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const post = getRoutePost(slug);
  if (!post) notFound();

  const review = publication(post);
  if (review.status !== "published") return <main className="mx-auto max-w-3xl px-4 py-10">
    <h1>{post.title}</h1>
    <h2>İçerik kaynak kontrolünde</h2>
    <p>{review.reason} Doğrulanmamış eski açıklamalar bu sayfada yayımlanmıyor. URL korunmuştur.</p>
    <p><Link href="/rehber">Kaynak kontrolü yapılan rehberleri inceleyin</Link> veya <Link href="/hizmetler">hizmetlerimiz hakkında bilgi alın</Link>.</p>
    <p><Link href="/iletisim#iletisim">Ön değerlendirme için iletişime geçin</Link>. Nihai kredi kararı bankaya aittir.</p>
  </main>;

  const topic = getTopicById(post.topicId);
  const related = PUBLISHED_POSTS.filter(
    (p) => p.slug !== post.slug && p.topicId === post.topicId,
  ).slice(0, 4);

  return (
    <main className="ef-article">
      {/* Structured Data / JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
            __html: JSON.stringify(buildJsonLd(post)).replace(/</g, "\\u003c"),
        }}
      />

      {/* HEADER */}
      <header className="ef-article-header"><nav aria-label="İçerik yolu"><Link href="/rehber">Kredi rehberi</Link><span>/</span><Link href={rehberHrefByTopic(post.topicId)}>{topic?.title ?? "Rehber"}</Link></nav>
        <h1 className="text-3xl font-extrabold">{post.title}</h1>
        <p className="mt-3 text-slate-600">{post.excerpt}</p>

        <div className="mt-4 text-sm text-slate-500">
          <span>{fmtDateTR(post.date)}</span>
          <span> • Kaynak kontrolü: {fmtDateTR(review.sourceCheckedAt!)} • Yayıncı: Ulaş Kredi</span>
          {topic && (
            <>
              <span className="mx-2">•</span>
              <Link
                href={rehberHrefByTopic(post.topicId)}
                className="hover:text-slate-700"
              >
                {topic.label}
              </Link>
            </>
          )}
        </div>
      </header>

      {/* INTRO */}
      {post.intro && (
        <div className="mt-6 rounded-xl border bg-slate-50 p-4 text-sm">
          {post.intro}
        </div>
      )}

      <GuideCover slug={post.slug} label={topic?.title ?? "Kredi rehberi"} priority />
      <nav className="ef-reading-map" aria-label="Bu rehberde"><span className="ef-eyebrow">BU REHBERDE</span>{post.content.map((block,idx)=>block.type==="h2" ? <a key={idx} href={"#section-"+idx}>{block.text}</a> : null)}</nav>
      <Link data-inner-cta className="ef-text-link" href="/iletisim#iletisim">Bu konuyu kendi durumunuzla değerlendirin →</Link>

      {/* CRITICAL POINTS */}
      {post.criticalPoints?.length ? (
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {post.criticalPoints.map((item, i) => (
            <div
              key={i}
              className="rounded-xl border p-3 text-sm font-semibold"
            >
              {item}
            </div>
          ))}
        </div>
      ) : null}

      {/* CONTENT */}
      <article className="prose mt-8 max-w-none">
        <RenderContent post={post} />
      </article>

      <section className="mt-8">
        <h2>Kaynaklar ve kapsam</h2>
        <ul>{review.sources.map(source => <li key={source.url}><a href={source.url} rel="noreferrer" target="_blank">{source.title}</a></li>)}</ul>
        <p>Bu rehber genel bilgilendirmedir; güncel faiz, kesin limit veya onay süresi taahhüt etmez. Bankanın sözleşme öncesi bilgi formunu ve yürürlükteki düzenlemeleri kontrol edin.</p>
        <p>Güncelleme sorumluluğu: {review.updateResponsibility}.</p>
        <Link href="/hizmetler#hizmet-listesi">Danışmanlık kapsamını ve hazırlık adımlarını inceleyin</Link>
      </section>

      <p className="mt-4"><Link className="ef-text-link" href="/#hesaplama">Kendi varsayımlarınızla taksit ve bütçe hesabı yapın →</Link></p>
      <ConversionPanel title="Bilgiyi bir sonraki adıma dönüştürün." description="Sorularınızı danışmanla görüşün. Kredi kararı ilgili bankanın değerlendirmesine bağlıdır." />
      {/* HIGHLIGHT */}
      {post.highlight && (
        <div className="mt-8 rounded-xl bg-black p-4 text-center text-white">
          {post.highlight}
        </div>
      )}

      {/* TOPIC LINKS */}
      {topic && (
        <section className="mt-10 rounded-2xl border bg-slate-50 p-5">
          <h2 className="text-lg font-bold text-slate-900">
            Bu konuyla ilgili diğer kaynaklar
          </h2>
          <div className="mt-4 flex flex-wrap gap-3 text-sm">
            <Link
              href={rehberHrefByTopic(post.topicId)}
              className="rounded-full border px-4 py-2 hover:bg-white"
            >
              Rehber içerikleri
            </Link>
            <Link
              href={videosHrefByTopic(post.topicId)}
              className="rounded-full border px-4 py-2 hover:bg-white"
            >
              Videolar
            </Link>
            <Link
              href={serviceHrefByTopic()}
              className="rounded-full border px-4 py-2 hover:bg-white"
            >
              Danışmanlık hizmetleri
            </Link>
          </div>
        </section>
      )}

      {/* RELATED */}
      {related.length > 0 && (
        <section className="mt-10">
          <h3 className="font-bold">İlgili içerikler</h3>
          <div className="mt-4 grid gap-3">
            {related.map((p) => (
              <Link
                key={p.slug}
                href={`/rehber/${p.slug}`}
                className="rounded-xl border p-4 hover:bg-slate-50"
              >
                <div className="font-semibold text-slate-900">{p.title}</div>
                {p.excerpt && (
                  <div className="mt-1 text-sm text-slate-600">{p.excerpt}</div>
                )}
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
