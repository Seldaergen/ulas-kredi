"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { type TopicId } from "@/lib/topics/topics";

function safeText(x: unknown) {
  return typeof x === "string" ? x : "";
}

function normalize(p: unknown) {
  const s = safeText(p).trim();
  if (!s) return "";
  return s.startsWith("/") ? s : `/${s}`;
}

function topicCoverCandidates(topicId?: TopicId | null) {
  // ✅ public/content’te sende olduğunu gördüğümüz dosyaları kullandım.
  // Bu listeyi sonra istersen daha da zenginleştiririz.
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
    case "kredi-karti":
      return ["/content/findeks-kredi-notu-nedir.jpg", "/content/findeks-kredi-notu-nedir.png"];
    case "banka":
      return ["/content/banka-degerlendirme-sureci-nasil-isler.jpg", "/content/bankalar-kredi-verirken-neye-bakar.jpg"];
    default:
      return ["/content/2025-en-hizli-basvuru-akisi.jpg"];
  }
}

export default function CoverImageClient({
  slug,
  coverImage,
  topicId,
  alt,
  className = "",
  priority = false,
}: {
  slug: string;
  coverImage?: string | null;
  topicId?: TopicId | null;
  alt: string;
  className?: string;
  priority?: boolean;
}) {
  const candidates = useMemo(() => {
    const list: string[] = [];

    const c = normalize(coverImage);
    if (c) list.push(c);

    const s = safeText(slug);
    if (s) {
      // ✅ jpg ağırlıklı çalış (sarı 404 azalır)
      list.push(`/content/${s}.jpg`);
      list.push(`/content/${s}.png`);
      list.push(`/content/${s}.jpeg`);
      list.push(`/content/${s}.webp`);
    }

    // ✅ slug yoksa bile topic’den görsel bul
    list.push(...topicCoverCandidates(topicId));

    // ✅ uniq + boşları at
    return Array.from(new Set(list.filter(Boolean)));
  }, [slug, coverImage, topicId]);

  const [idx, setIdx] = useState(0);
  const src = candidates[Math.min(idx, candidates.length - 1)];

  return (
    <div className={`relative w-full overflow-hidden ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes="(max-width: 768px) 100vw, 768px"
        className="object-cover"
        onError={() => setIdx((v) => Math.min(v + 1, candidates.length - 1))}
      />
      <div className="absolute inset-0 bg-linear-to-t from-black/30 via-black/0 to-black/0" />
    </div>
  );
}
