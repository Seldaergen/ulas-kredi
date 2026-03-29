import type { Post } from "../posts";

export const limitDusurmeKrediNotuEtkileri: Post = 

  {
    slug: "limit-dusurme-notu-etkiler-mi",
    title: "Limit Düşürme Kredi Notunu Etkiler mi?",
    excerpt:
      "Limit düşürmenin kredi notuna etkisi, kullanım oranı ve mevcut borç seviyesine göre değişir. Doğru ve yanlış senaryolar burada.",
    category: "Bilgilendirme",
    topicId: "kredi-limiti",
    readingTime: "3 dk",
    date: "2026-01-02",
    icon: "info",
    content: [
      {
        type: "p",
        text: "Kredi kartı veya kredi limitini düşürmek tek başına iyi ya da kötü değildir. Asıl belirleyici olan, limit düşürüldüğünde borcun bu limite oranla nasıl göründüğüdür.",
      },

      { type: "h2", text: "Kullanım Oranı Gerçeği" },

      {
        type: "p",
        text: "Toplam limit düşürüldüğünde, borç aynı kalıyorsa kullanım oranı yükselir. Bu da bankalar açısından risk sinyali olarak algılanabilir. Yani kontrol amacıyla yapılan bir hamle, yanlış zamanda notu olumsuz etkileyebilir.",
      },

      {
        type: "h2",
        text: "Ne Zaman Mantıklıdır?",
      },

      {
        type: "ul",
        items: [
          "Borç seviyesi düşükse",
          "Kullanım oranı zaten %30–40 bandındaysa",
          "Harcamayı kontrol altına almak amaçlanıyorsa",
        ],
      },

      {
        type: "callout",
        title: "İpucu",
        text: "Amaç finansal kontrol ise önce borcu azalt, kullanım oranını düşür; sonra limit düzenlemesi yap. Tersi durumda kredi notu zarar görebilir.",
      },
    ],
  }