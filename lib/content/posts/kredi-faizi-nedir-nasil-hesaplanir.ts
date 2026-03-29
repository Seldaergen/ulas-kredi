import type { Post } from "../posts";

export const krediFaiziNedirNasilHesaplanir: Post = {
  slug: "kredi-faizi-nedir-nasil-hesaplanir",
  title: "Kredi Faizi Nedir? Nasıl Hesaplanır? (Gerçek Mantık)",
  excerpt:
    "Kredi faizi sadece oran değildir. Vade, taksit ve toplam geri ödeme birlikte değerlendirilmelidir.",

  category: "Bilgilendirme",
  topicId: "genel",
  readingTime: "5 dk",
  date: "2026-01-02",
  icon: "info",

  intro:
    "Kısa cevap: Kredi faizi, bankanın verdiği paranın kullanım bedelidir. Ancak gerçek maliyet; faiz oranı, vade ve ek masrafların birlikte değerlendirilmesiyle ortaya çıkar.",

  criticalPoints: [
    "Faiz oranı tek başına yeterli değildir",
    "Vade uzadıkça toplam ödeme artar",
    "Aylık taksit düşük olabilir ama maliyet yüksek olabilir",
    "Toplam geri ödeme en doğru göstergedir",
  ],

  highlight:
    "Ucuz kredi, düşük taksit değil; düşük toplam maliyettir.",

  content: [
    {
      type: "h2",
      text: "Kredi faizi nedir?",
    },
    {
      type: "p",
      text:
        "Kredi faizi, bankanın size verdiği paranın karşılığında aldığı bedeldir.",
    },
    {
      type: "p",
      text:
        "Ancak kredi maliyetini belirleyen tek unsur faiz oranı değildir.",
    },

    {
      type: "h2",
      text: "Kredi maliyetini belirleyen 3 ana faktör",
    },
    {
      type: "ul",
      items: [
        "Faiz oranı",
        "Vade süresi",
        "Ek masraflar (sigorta, dosya masrafı)",
      ],
    },

    {
      type: "h2",
      text: "Faiz nasıl hesaplanır?",
    },
    {
      type: "p",
      text:
        "Kredi faizi genellikle aylık oran üzerinden hesaplanır ve her taksitte ana para + faiz birlikte ödenir.",
    },

    {
      type: "h2",
      text: "Basit örnek",
    },
    {
      type: "p",
      text:
        "100.000 TL kredi, %2 faiz ve 12 ay vade ile alındığında aylık taksit ve toplam geri ödeme hesaplanır.",
    },
    {
      type: "p",
      text:
        "Vade uzadıkça aylık taksit düşer ama toplam ödenen faiz artar.",
    },

    {
      type: "h2",
      text: "Neden sadece faize bakmak yanıltıcıdır?",
    },
    {
      type: "p",
      text:
        "Düşük faizli ama uzun vadeli kredi, yüksek faizli kısa vadeli krediden daha pahalı olabilir.",
    },
    {
      type: "callout",
      title: "Kritik gerçek",
      text:
        "Faiz oranı düşük diye kredi ucuz olmaz.",
    },

    {
      type: "h2",
      text: "Vade neden bu kadar önemli?",
    },
    {
      type: "p",
      text:
        "Vade uzadıkça faiz daha uzun süre işler. Bu da toplam geri ödemenin artmasına neden olur.",
    },

    {
      type: "h2",
      text: "Doğru karar nasıl verilir?",
    },
    {
      type: "ul",
      items: [
        "Aylık taksite değil toplam geri ödemeye bak",
        "Vadeyi ihtiyacına göre seç",
        "Ek masrafları mutlaka hesaba kat",
      ],
    },

    {
      type: "h2",
      text: "En sık yapılan hata",
    },
    {
      type: "p",
      text:
        "Sadece aylık taksite bakarak kredi seçmek en yaygın hatadır.",
    },

    {
      type: "h2",
      text: "Mini kontrol listesi",
    },
    {
      type: "ul",
      items: [
        "Toplam geri ödeme ne kadar?",
        "Vade bana uygun mu?",
        "Ek masrafları hesapladım mı?",
      ],
    },

    {
      type: "callout",
      title: "Sonuç",
      text:
        "Kredi faizi tek başına karar kriteri değildir. Doğru karar, toplam maliyet ve vade birlikte değerlendirilerek verilir.",
    },
  ],
};