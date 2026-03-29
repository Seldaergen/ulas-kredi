import type { Post } from "../posts";

export const yapilandirmaOncesiNeHazirlanmali: Post = 
{
    slug: "yapilandirma-oncesi-ne-hazirlanmali",
    title: "Yapılandırma Öncesi Ne Hazırlanmalı?",
    excerpt:
      "Yapılandırma kararı almadan önce bütçe, borç listesi ve ödeme kapasitesinin netleştirilmesi.",
    category: "Bilgilendirme",
    topicId: "yapilandirma",
    readingTime: "3 dk",
    date: "2026-01-02",
    icon: "info",
    content: [
      {
        type: "p",
        text: "Yapılandırma kararı almadan önce, mevcut finansal tabloyu net görmek gerekir. Aksi hâlde yeni plan da kısa sürede bozulabilir.",
      },

      { type: "h2", text: "Hazırlık Listesi" },

      {
        type: "ul",
        items: [
          "Aylık net gelir ve gider tablosu",
          "Tüm kredi ve kart borçlarının listesi",
          "Uzun vadede sürdürülebilecek minimum taksit tutarı",
        ],
      },

      {
        type: "callout",
        title: "İpucu",
        text: "Net bir bütçe olmadan yapılandırma kararına girme; önce tabloyu gör.",
      },
    ],
  }