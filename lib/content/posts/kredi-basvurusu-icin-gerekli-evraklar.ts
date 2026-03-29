import type { Post } from "../posts";

export const krediBasvurusuIcinGerekliEvraklar: Post = {
  slug: "kredi-basvurusu-icin-gerekli-evraklar",
  title: "Kredi Başvurusu İçin Gerekli Evraklar (Eksiksiz Liste)",
  excerpt:
    "Kredi başvurusunda istenen evraklar çalışma durumuna göre değişir. Eksiksiz ve doğru evrak, onay sürecini hızlandırır.",

  category: "Başvuru Süreci",
  topicId: "kredi-basvurusu",
  readingTime: "5 dk",
  date: "2026-01-03",
  coverImage: "/content/kredi-basvurusu-evraklar.jpg",
  icon: "flow",
  views: 0,

  intro:
    "Kısa cevap: Kredi başvurusu için kimlik ve gelir belgesi şarttır. Ancak çalışma durumuna göre ek belgeler istenir. Eksik veya hatalı evrak, başvurunun gecikmesine veya reddedilmesine neden olabilir.",

  criticalPoints: [
    "Evrak eksikliği sürecin en büyük gecikme nedenidir",
    "Gelir belgesi başvurunun temelidir",
    "Her meslek grubunda istenen evrak farklıdır",
    "Evrak ile sistem verisi uyumlu olmalıdır",
  ],

  highlight:
    "Kredi sürecini hızlandıran şey banka değil, doğru hazırlanmış evraktır.",

  content: [
    {
      type: "h2",
      text: "Evraklar neden bu kadar önemli?",
    },
    {
      type: "p",
      text:
        "Bankalar kredi verirken sadece beyana değil, doğrulanabilir belgelere bakar. Evraklar, başvurunun en kritik doğrulama adımıdır.",
    },
    {
      type: "p",
      text:
        "Eksik veya hatalı evrak, süreci uzatır ve başvurunun zayıf görünmesine neden olabilir.",
    },

    {
      type: "h2",
      text: "Tüm başvurular için temel evraklar",
    },
    {
      type: "ul",
      items: [
        "Geçerli kimlik belgesi",
        "Gelir belgesi",
        "İkamet belgesi (gerekirse)",
      ],
    },

    {
      type: "h2",
      text: "Ücretli çalışanlar için gerekli evraklar",
    },
    {
      type: "ul",
      items: [
        "Son 3 aya ait maaş bordrosu",
        "SGK hizmet dökümü",
        "İş yerinden alınan yazı (gerekirse)",
      ],
    },

    {
      type: "h2",
      text: "Esnaf ve serbest çalışanlar için evraklar",
    },
    {
      type: "ul",
      items: [
        "Vergi levhası",
        "Son dönem gelir belgeleri",
        "Banka hesap hareketleri",
      ],
    },

    {
      type: "h2",
      text: "Ek gelirler için belgeler",
    },
    {
      type: "ul",
      items: [
        "Kira kontratı",
        "Banka hesap girişleri",
        "Ek gelir kanıtları",
      ],
    },

    {
      type: "h2",
      text: "Evraklar nasıl hazırlanmalı?",
    },
    {
      type: "p",
      text:
        "Evrakların sadece var olması değil, doğru şekilde hazırlanması gerekir.",
    },
    {
      type: "ul",
      items: [
        "Belgeler güncel olmalı",
        "Tüm sayfalar eksiksiz yüklenmeli",
        "Gelir net ve anlaşılır olmalı",
        "Belgeler sistemle uyumlu olmalı",
      ],
    },
    {
      type: "callout",
      title: "Kritik nokta",
      text:
        "Eksik değil, eksiksiz ve net evrak süreci hızlandırır.",
    },

    {
      type: "h2",
      text: "En sık yapılan hatalar",
    },
    {
      type: "ul",
      items: [
        "Eski tarihli belge sunmak",
        "Eksik sayfa yüklemek",
        "Geliri net göstermeyen dokümanlar kullanmak",
        "Yanlış veya uyumsuz bilgi vermek",
      ],
    },

    {
      type: "h2",
      text: "Mini kontrol listesi",
    },
    {
      type: "ul",
      items: [
        "Evraklarım güncel mi?",
        "Gelirim net görünüyor mu?",
        "Tüm sayfalar eksiksiz mi?",
        "Belgeler sistemle uyumlu mu?",
      ],
    },

    {
      type: "callout",
      title: "Sonuç",
      text:
        "Kredi başvurusunda evraklar sürecin temelidir. Doğru ve eksiksiz hazırlanan evrak, onay sürecini hızlandırır ve başarı ihtimalini artırır.",
    },
  ],
};