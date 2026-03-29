import type { Post } from "../posts";

export const krediLimitiNedirNasilBelirlenir: Post = {
  slug: "kredi-limiti-nedir-nasil-belirlenir",
  title: "Kredi Limiti Nedir, Nasıl Belirlenir? (Bankaların Gerçek Mantığı)",
  excerpt:
    "Kredi limiti rastgele verilmez. Gelir, borç, ödeme davranışı ve risk algısı birlikte değerlendirilir.",

  category: "Limit",
  topicId: "kredi-limiti",
  readingTime: "5 dk",
  date: "2026-01-02",
  icon: "limit",

  intro:
    "Kısa cevap: Kredi limiti, bankanın sana verebileceği maksimum borç değil; güvenli şekilde taşıyabileceğini düşündüğü borç miktarıdır. Bu nedenle sadece gelir değil, davranışsal veriler de belirleyicidir.",

  criticalPoints: [
    "Limit gelirle değil, riskle belirlenir",
    "Borç/gelir dengesi en kritik faktördür",
    "Ödeme alışkanlığı limiti doğrudan etkiler",
    "Kredi notunun trendi de değerlendirilir",
  ],

  highlight:
    "Kredi limiti bir rakam değil, bankanın sana duyduğu güvenin ölçüsüdür.",

  content: [
    {
      type: "h2",
      text: "Kredi limiti nedir?",
    },
    {
      type: "p",
      text:
        "Kredi limiti; bankanın sana ne kadar borç verebileceğini değil, ne kadar borcu güvenli şekilde taşıyabileceğini düşündüğü tutarı ifade eder.",
    },
    {
      type: "p",
      text:
        "Bu nedenle limit, sadece gelirle değil; davranış ve risk analizine göre belirlenir.",
    },

    {
      type: "h2",
      text: "Bankalar kredi limitini nasıl belirler?",
    },
    {
      type: "p",
      text:
        "Kredi limiti tek bir kritere göre değil, birden fazla sinyalin birlikte değerlendirilmesiyle belirlenir:",
    },
    {
      type: "ul",
      items: [
        "Belgelendirilebilir aylık gelir",
        "Mevcut kredi ve kart borçları",
        "Ödeme geçmişi (gecikme var mı?)",
        "Kredi notu ve son dönem trendi",
      ],
    },

    {
      type: "h2",
      text: "Gelir tek başına yeterli mi?",
    },
    {
      type: "p",
      text:
        "Hayır. Yüksek gelir tek başına yüksek limit anlamına gelmez.",
    },
    {
      type: "p",
      text:
        "Eğer mevcut borçlar yüksekse veya ödeme düzeni zayıfsa, banka limiti sınırlı tutar.",
    },
    {
      type: "callout",
      title: "Kritik gerçek",
      text:
        "Bankalar gelire değil, gelirin ne kadarının borca gittiğine bakar.",
    },

    {
      type: "h2",
      text: "Kredi limiti neden zamanla değişir?",
    },
    {
      type: "p",
      text:
        "Kredi limiti sabit değildir. Davranış değiştikçe limit de değişir.",
    },
    {
      type: "ul",
      items: [
        "Düzenli ödeme → limit artabilir",
        "Düşük kullanım oranı → güven artar",
        "Gelir güncellemesi → limit yükselir",
        "Yoğun başvuru ve borç → limit baskılanır",
      ],
    },

    {
      type: "h2",
      text: "Limit artışını tetikleyen güçlü sinyaller",
    },
    {
      type: "ul",
      items: [
        "Kartın %30–40 bandında kullanılması",
        "Gecikmesiz ödeme alışkanlığı",
        "Gelirin güncel ve belgelenmiş olması",
        "Yeni başvuruların kontrollü yapılması",
      ],
    },

    {
      type: "h2",
      text: "Limit neden düşük kalır?",
    },
    {
      type: "p",
      text:
        "Limit düşüklüğü çoğu zaman riskten değil, yeterli güven sinyali oluşmamasından kaynaklanır.",
    },

    {
      type: "h2",
      text: "En sık yapılan hata",
    },
    {
      type: "p",
      text:
        "Limit artırmak için üst üste başvuru yapmak, bankanın risk algısını artırır ve limiti baskılar.",
    },

    {
      type: "h2",
      text: "Mini kontrol listesi",
    },
    {
      type: "ul",
      items: [
        "Gelirim güncel mi?",
        "Borç/gelir oranım dengeli mi?",
        "Kart kullanımım kontrollü mü?",
        "Son dönemde çok başvuru yaptım mı?",
      ],
    },

    {
      type: "callout",
      title: "Sonuç",
      text:
        "Kredi limiti bir talep değil, bankanın güven sonucudur. Bu güven; düzenli ödeme, dengeli kullanım ve doğru finansal davranışlarla oluşur.",
    },
  ],
};