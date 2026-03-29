import type { Post } from "../posts";

export const konutKredisiBasvuruSuresi: Post = {
  slug: "konut-kredisi-basvuru-sureci",
  title: "Konut Kredisi Başvuru Süreci (Adım Adım Gerçek Rehber)",
  excerpt:
    "Konut kredisi süreci; ön analiz, ekspertiz, kredi onayı ve tapu aşamalarından oluşur. Doğru hazırlık süreci hızlandırır.",

  category: "Başvuru Süreci",
  topicId: "kredi-basvurusu",
  readingTime: "7 dk",
  date: "2026-01-03",
  coverImage: "/content/konut-kredisi-sureci.jpg",
  icon: "flow",
  views: 0,

  intro:
    "Kısa cevap: Konut kredisi süreci genelde 3–10 gün sürer. Ancak bu süre; evrak hazırlığı, ekspertiz ve banka yoğunluğuna göre değişir. Sürecin en kritik kısmı doğru hazırlıktır.",

  criticalPoints: [
    "Konut kredisi hem kişi hem ev üzerinden değerlendirilir",
    "Ekspertiz sonucu kredi tutarını belirler",
    "Peşinat oranı sürecin temelidir",
    "Eksik evrak süreci ciddi şekilde uzatır",
  ],

  highlight:
    "Konut kredisi sürecini hızlandıran şey banka değil, senin hazırlığındır.",

  content: [
    {
      type: "h2",
      text: "Konut kredisi neden farklıdır?",
    },
    {
      type: "p",
      text:
        "Konut kredisi, diğer kredilerden farklı olarak teminatlıdır. Banka sadece seni değil, satın alınacak evi de değerlendirir.",
    },
    {
      type: "p",
      text:
        "Bu nedenle süreç hem finansal hem de teknik incelemeler içerir.",
    },

    {
      type: "h2",
      text: "Adım 1: Ön analiz (en kritik aşama)",
    },
    {
      type: "p",
      text:
        "Başvuru öncesi gelir, borç ve peşinat durumu netleştirilmelidir.",
    },
    {
      type: "ul",
      items: [
        "Gelir / borç oranı uygun mu?",
        "Peşinat hazır mı?",
        "Kredi kapasitesi yeterli mi?",
      ],
    },

    {
      type: "h2",
      text: "Adım 2: Evrak hazırlığı",
    },
    {
      type: "ul",
      items: [
        "Kimlik",
        "Gelir belgesi",
        "Tapu bilgileri",
        "Satışa konu evin detayları",
      ],
    },
    {
      type: "p",
      text:
        "Evrak eksikliği sürecin en çok uzamasına neden olan faktördür.",
    },

    {
      type: "h2",
      text: "Adım 3: Ekspertiz süreci",
    },
    {
      type: "p",
      text:
        "Banka, satın alınacak evin değerini belirlemek için ekspertiz gönderir.",
    },
    {
      type: "p",
      text:
        "Kredi tutarı genellikle ekspertiz değerinin %70–80’i kadar olur.",
    },
    {
      type: "callout",
      title: "Kritik nokta",
      text:
        "Ekspertiz değeri düşük gelirse, kredi tutarı da düşer.",
    },

    {
      type: "h2",
      text: "Adım 4: Kredi onayı",
    },
    {
      type: "p",
      text:
        "Ekspertiz ve finansal değerlendirme tamamlandıktan sonra banka kredi kararını verir.",
    },
    {
      type: "p",
      text:
        "Bu aşamada gelir, kredi notu ve mevcut borçlar birlikte değerlendirilir.",
    },

    {
      type: "h2",
      text: "Adım 5: Tapu ve ödeme",
    },
    {
      type: "p",
      text:
        "Kredi onaylandıktan sonra tapu işlemleri yapılır ve banka satıcıya ödemeyi gerçekleştirir.",
    },

    {
      type: "h2",
      text: "Süre ne kadar sürer?",
    },
    {
      type: "ul",
      items: [
        "Ön analiz → 1 gün",
        "Ekspertiz → 1–3 gün",
        "Onay → 1–3 gün",
        "Toplam → 3–10 gün",
      ],
    },

    {
      type: "h2",
      text: "Süreci hızlandırmak için ne yapmalısın?",
    },
    {
      type: "ul",
      items: [
        "Evrakları baştan eksiksiz hazırla",
        "Peşinatı netleştir",
        "Ekspertiz sürecini geciktirme",
        "Tek bankayla ilerle",
      ],
    },

    {
      type: "h2",
      text: "En sık yapılan hata",
    },
    {
      type: "p",
      text:
        "Evi seçmeden kredi başvurusu yapmak veya ekspertiz sürecini hesaba katmamak en yaygın hatalardandır.",
    },

    {
      type: "h2",
      text: "Mini kontrol listesi",
    },
    {
      type: "ul",
      items: [
        "Peşinatım hazır mı?",
        "Gelir belgelerim tam mı?",
        "Ekspertiz sürecini biliyor muyum?",
        "Kredi kapasitem yeterli mi?",
      ],
    },

    {
      type: "callout",
      title: "Sonuç",
      text:
        "Konut kredisi süreci karmaşık görünebilir ama doğru hazırlıkla oldukça hızlı ilerler. Sürecin en önemli kısmı başvuru öncesi yapılan doğru planlamadır.",
    },
  ],
};