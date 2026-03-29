import type { Post } from "../posts";

export const krediHesaplamaNasilYapilir: Post = {
  slug: "kredi-hesaplama-nasil-yapilir",
  title: "Kredi Hesaplama Nasıl Yapılır? (Gerçek Mantık)",
  excerpt:
    "Kredi hesaplama sadece taksit bulmak değildir. Vade, faiz ve toplam geri ödeme birlikte değerlendirilmelidir.",

  category: "Bilgilendirme",
  topicId: "genel",
  readingTime: "5 dk",
  date: "2026-01-02",
  icon: "info",

  intro:
    "Kısa cevap: Kredi hesaplama; kredi tutarı, faiz oranı ve vade süresine göre aylık taksit ve toplam geri ödemenin belirlenmesidir. Ancak doğru karar için sadece taksite değil, toplam maliyete bakılmalıdır.",

  criticalPoints: [
    "Aylık taksit tek başına yeterli değildir",
    "Vade uzadıkça toplam maliyet artar",
    "Faiz + masraflar birlikte değerlendirilmelidir",
    "Toplam geri ödeme en önemli göstergedir",
  ],

  highlight:
    "Doğru kredi, düşük taksitli değil; düşük maliyetli kredidir.",

  content: [
    {
      type: "h2",
      text: "Kredi hesaplama nedir?",
    },
    {
      type: "p",
      text:
        "Kredi hesaplama, çekilecek tutar için aylık taksit ve toplam geri ödeme tutarını belirleme işlemidir.",
    },

    {
      type: "h2",
      text: "Hesaplamayı etkileyen 3 temel faktör",
    },
    {
      type: "ul",
      items: [
        "Kredi tutarı",
        "Faiz oranı",
        "Vade süresi",
      ],
    },

    {
      type: "h2",
      text: "Basit örnek",
    },
    {
      type: "p",
      text:
        "100.000 TL kredi, %2 faiz ve 12 ay vade ile alındığında aylık taksit hesaplanır ve toplam geri ödeme ortaya çıkar.",
    },
    {
      type: "p",
      text:
        "Aynı kredi 24 ay vadeye uzatıldığında aylık taksit düşer, ancak toplam geri ödeme artar.",
    },

    {
      type: "h2",
      text: "Neden sadece taksite bakmak yanlıştır?",
    },
    {
      type: "p",
      text:
        "Düşük taksitli kredi, çoğu zaman daha uzun vadeli olduğu için daha pahalıdır.",
    },
    {
      type: "callout",
      title: "Kritik gerçek",
      text:
        "Aylık taksit düşük olabilir ama toplam ödeme yüksek olabilir.",
    },

    {
      type: "h2",
      text: "Doğru karşılaştırma nasıl yapılır?",
    },
    {
      type: "ul",
      items: [
        "Aynı tutar üzerinden karşılaştır",
        "Aynı vadeyi baz al",
        "Toplam geri ödemeyi kıyasla",
      ],
    },

    {
      type: "h2",
      text: "Ek maliyetleri unutma",
    },
    {
      type: "p",
      text:
        "Sigorta, dosya masrafı ve diğer ücretler toplam maliyeti artırabilir.",
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
        "Kredi hesaplama, doğru kararın temelidir. Aylık taksite değil, toplam maliyete odaklanarak en doğru krediyi seçebilirsin.",
    },
  ],
};