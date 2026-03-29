import type { Post } from "../posts";

export const borcGelirOraniKacOlmali: Post = {
  slug: "borc-gelir-orani-kac-olmali",
  title: "Borç/Gelir Oranı Kaç Olmalı? (Kredi İçin İdeal Seviye)",
  excerpt:
    "Kredi almanın en kritik göstergelerinden biri borç/gelir oranıdır. Bankalar, aylık taksit yükünün gelire oranına bakarak risk kararını verir.",

  category: "Bilgilendirme",
  topicId: "borc-kapatma",
  readingTime: "5 dk",
  date: "2026-01-03",
  coverImage: "/content/borc-gelir-orani.jpg",
  icon: "info",
  views: 0,

  intro:
    "Kısa cevap: Borç/gelir oranı genelde %30–50 aralığında olmalıdır. Bu oran yükseldikçe kredi alma ihtimali düşer, düştükçe onay alma ihtimali artar.",

  criticalPoints: [
    "Borç/gelir oranı kredi kararının en kritik göstergelerinden biridir",
    "%30 altı güçlü, %50 üstü riskli kabul edilir",
    "Oran yükseldikçe kredi kapasitesi düşer",
    "Borç sadeleştirme oranı hızla iyileştirebilir",
  ],

  highlight:
    "Gelirin değil, taşıyabildiğin borç belirleyicidir.",

  content: [
    {
      type: "h2",
      text: "Borç/gelir oranı nedir?",
    },
    {
      type: "p",
      text:
        "Borç/gelir oranı, aylık kredi ve kart taksitlerinin toplamının aylık gelire oranıdır. Bankalar bu oranı kullanarak bir kişinin yeni borç yükünü taşıyıp taşıyamayacağını ölçer.",
    },

    {
      type: "h2",
      text: "İdeal borç/gelir oranı kaç olmalı?",
    },
    {
      type: "p",
      text:
        "Bankalar kesin bir sınır paylaşmaz, ancak pratikte bazı aralıklar vardır:",
    },
    {
      type: "ul",
      items: [
        "%0 – %30 → Güçlü profil (yüksek onay ihtimali)",
        "%30 – %50 → Orta risk (kontrollü onay)",
        "%50 üzeri → Yüksek risk (red ihtimali artar)",
      ],
    },
    {
      type: "callout",
      title: "Kritik eşik",
      text:
        "Oran %50’ye yaklaştıkça sistem yeni krediye karşı daha temkinli davranır.",
    },

    {
      type: "h2",
      text: "Neden bu kadar önemli?",
    },
    {
      type: "p",
      text:
        "Bankalar için en önemli soru şudur: Bu kişi yeni taksiti ödeyebilir mi? Borç/gelir oranı bu sorunun en net cevabıdır.",
    },
    {
      type: "p",
      text:
        "Gelirin yüksek olması tek başına yeterli değildir. Eğer mevcut borçlar zaten gelirin büyük kısmını kullanıyorsa, yeni kredi almak zorlaşır.",
    },

    {
      type: "h2",
      text: "Oran yüksekse ne olur?",
    },
    {
      type: "ul",
      items: [
        "Kredi tutarı düşürülebilir",
        "Vade uzatılarak taksit küçültülmeye çalışılır",
        "Ek teminat istenebilir",
        "Başvuru doğrudan reddedilebilir",
      ],
    },

    {
      type: "h2",
      text: "Borç/gelir oranı nasıl düşürülür?",
    },
    {
      type: "p",
      text:
        "Oranı iyileştirmenin en etkili yolu mevcut borç yükünü azaltmaktır.",
    },
    {
      type: "ul",
      items: [
        "Küçük borçları kapatıp taksit sayısını azalt",
        "Kredi kartı borçlarını düşür",
        "Gereksiz kredi ürünlerini kapat",
        "Borçları tek kredide birleştir (sadeleştirme)",
      ],
    },

    {
      type: "h2",
      text: "En sık yapılan hata",
    },
    {
      type: "p",
      text:
        "Borç/gelir oranını hesaplamadan yeni kredi başvurusu yapmak en yaygın hatadır. Bu durum çoğu zaman gereksiz red ile sonuçlanır.",
    },

    {
      type: "h2",
      text: "Mini kontrol listesi",
    },
    {
      type: "ul",
      items: [
        "Aylık toplam taksitlerim gelirimle uyumlu mu?",
        "Oranım %50’nin altında mı?",
        "Yeni kredi bu oranı ne kadar artıracak?",
        "Önce borç azaltmam gerekiyor mu?",
      ],
    },

    {
      type: "callout",
      title: "Sonuç",
      text:
        "Borç/gelir oranı, kredi kararının en temel göstergesidir. Oran ne kadar düşükse sistem seni o kadar güvenli görür. Kredi almadan önce bu oranı kontrol etmek, sürecin sonucunu doğrudan etkiler.",
    },
  ],
};