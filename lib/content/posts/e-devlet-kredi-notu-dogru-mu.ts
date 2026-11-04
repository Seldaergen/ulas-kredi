import type { Post } from "../posts";

export const eDevletKrediNotuDogruMu: Post = {
  slug: "e-devlet-kredi-notu-dogru-mu",
  title: "E-Devlet Kredi Notu Doğru mu? (Bankalar Aynı Skoru mu Görür?)",
  excerpt:
    "e-Devlet üzerinden alınan TBB Risk Merkezi Raporu ile Findeks Kredi Notu aynı ürün değildir. Raporu bir kredi onayı veya kredi notu gibi yorumlamayın.",

  category: "Bilgilendirme",
  topicId: "kredi-notu",
  readingTime: "4 dk",
  date: "2025-12-15",
  coverImage: "/content/edevlet.jpg",
  icon: "info",
  views: 0,

  intro:
    "Kısa cevap: e-Devlet, TBB Risk Merkezi Raporu başvuru hizmeti sunar. Bu rapor Findeks Kredi Notu değildir. İki hizmetin kapsamını ayırmak gerekir.",

  criticalPoints: [
    "TBB Risk Merkezi Raporu, Findeks Kredi Notu değildir",
    "Bankalar ek olarak kendi iç skorlarını kullanır",
    "Güncellenme süresi farklı olabilir",
    "Aynı notla farklı sonuçlar alınabilir",
  ],

  highlight:
    "Risk raporu, kredi notu ve kredi onayı farklı kavramlardır.",

  content: [
    {
      type: "h2",
      text: "E-Devlet’te görülen kredi notu doğru mu?",
    },
    {
      type: "p",
      text:
        "e-Devlet’teki TBB hizmeti bir Risk Merkezi Raporu başvurusudur. Bu rapor, Findeks’in sunduğu kredi notuyla karıştırılmamalıdır.",
    },
    {
      type: "p",
      text:
        "Rapordaki borç veya limit tutarları bir kredi puanı değildir. Alanları raporun kendi açıklamalarıyla birlikte okuyun.",
    },

    {
      type: "h2",
      text: "Neden farklı sonuçlar alabiliyorsun?",
    },
    {
      type: "p",
      text:
        "Birçok kişi kredi notu yüksek olmasına rağmen kredi alamadığında şaşırır. Bunun nedeni bankaların sadece bu skora bakmamasıdır.",
    },
    {
      type: "ul",
      items: [
        "Banka iç skoru farklı olabilir",
        "Güncel borç durumu değişmiş olabilir",
        "Son başvuru hareketleri etkili olabilir",
        "Gelir ve risk değerlendirmesi farklı sonuç verebilir",
      ],
    },

    {
      type: "h2",
      text: "Güncellenme farkı neden önemlidir?",
    },
    {
      type: "p",
      text:
        "Raporların kapsamı ve veri bildirim tarihleri farklı olabilir. Risk Merkezi Raporu ile Findeks Kredi Notu’nu aynı skorun farklı tarihteki kopyaları gibi karşılaştırmayın; rapordaki tarihleri ve açıklamaları kontrol edin.",
    },

    {
      type: "h2",
      text: "Bankalar sadece kredi notuna mı bakar?",
    },
    {
      type: "p",
      text:
        "Hayır. Kredi notu sadece başlangıçtır. Bankalar ayrıca şu verileri de değerlendirir:",
    },
    {
      type: "ul",
      items: [
        "Gelir ve borç dengesi",
        "Ödeme geçmişi",
        "Kredi kartı kullanım alışkanlıkları",
        "Başvuru davranışı",
        "Banka iç skoru",
      ],
    },
    {
      type: "callout",
      title: "Kritik gerçek",
      text:
        "İyi kredi notu tek başına kredi almak için yeterli değildir.",
    },

    {
      type: "h2",
      text: "En sık yapılan yanlış",
    },
    {
      type: "p",
      text:
        "Sadece kredi notuna bakarak kredi çıkacağını düşünmek en yaygın hatadır. Bu yaklaşım, gereksiz başvurular ve redlerle sonuçlanabilir.",
    },

    {
      type: "h2",
      text: "Mini kontrol listesi",
    },
    {
      type: "ul",
      items: [
        "Kredi notum dışında profilim güçlü mü?",
        "Güncel borç durumum uygun mu?",
        "Son dönemde çok başvuru yaptım mı?",
        "Bankanın beni nasıl gördüğünü düşünüyor muyum?",
      ],
    },

    {
      type: "callout",
      title: "Sonuç",
      text:
        "TBB Risk Merkezi Raporu ile Findeks Kredi Notu farklı hizmetlerdir. Her ikisi de bankanın kredi onayı yerine geçmez. Yanlış veya eksik kayıt için raporu düzenleyen kurumun itiraz kanalını kullanın.",
    },
  ],
};
