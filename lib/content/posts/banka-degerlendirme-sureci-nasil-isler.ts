import type { Post } from "../posts";

export const bankaDegerlendirmeSureciNasilIsler: Post = {
  slug: "banka-degerlendirme-sureci-nasil-isler",
  title: "Banka Kredi Başvurusunu Nasıl Değerlendirir? (Adım Adım Süreç)",
  excerpt:
    "Kredi başvurusu tek tuşla sonuçlanmaz. Banka içinde çalışan sistemler; kimlik, gelir, borç ve risk verilerini analiz ederek karar verir.",

  category: "Bilgilendirme",
  topicId: "banka",
  readingTime: "5 dk",
  date: "2026-01-02",
  icon: "info",

  intro:
    "Kısa cevap: Kredi başvurusu yaptığında sistem seni birkaç saniyede analiz eder, ancak kesin karar için birden fazla kontrol çalışır. Süreç; otomatik değerlendirme ve gerekirse manuel inceleme ile tamamlanır.",

  criticalPoints: [
    "Başvurular önce otomatik sistemler tarafından analiz edilir",
    "Gelir, borç ve kredi geçmişi birlikte değerlendirilir",
    "Riskli dosyalar manuel incelemeye düşer",
    "Eksik veya tutarsız bilgi süreci uzatır",
  ],

  highlight:
    "Kredi sonucu saniyeler içinde başlar ama karar, verinin netliğine göre şekillenir.",

  content: [
    {
      type: "h2",
      text: "Kredi başvurusu yaptığında bankada ne olur?",
    },
    {
      type: "p",
      text:
        "Kredi başvurusu yaptığında süreç aslında anında başlar. Bankanın sistemleri senin finansal profilini hızlıca analiz eder. Ancak bu süreç tek bir kontrolden oluşmaz; arka planda birden fazla adım çalışır.",
    },

    {
      type: "h2",
      text: "1) Otomatik sistem değerlendirmesi",
    },
    {
      type: "p",
      text:
        "İlk aşamada başvurun otomatik sistem tarafından analiz edilir. Bu sistem senin temel finansal verilerini kontrol eder.",
    },
    {
      type: "ul",
      items: [
        "Kredi puanı",
        "Mevcut borçlar",
        "Kredi kartı kullanımı",
        "Son başvuru hareketleri",
      ],
    },
    {
      type: "p",
      text:
        "Eğer profil net ve güçlü görünüyorsa, süreç hızlı şekilde ilerleyebilir.",
    },

    {
      type: "h2",
      text: "2) Gelir ve kimlik doğrulama",
    },
    {
      type: "p",
      text:
        "Sistem sadece puana bakmaz. Gelirin doğrulanabilir olması ve başvuru bilgilerinin tutarlı olması gerekir.",
    },
    {
      type: "ul",
      items: [
        "Gelir belgesi veya maaş bilgisi kontrol edilir",
        "Kimlik bilgileri doğrulanır",
        "Başvuru ile sistemdeki veriler karşılaştırılır",
      ],
    },

    {
      type: "h2",
      text: "3) Risk analizi ve ürün uygunluğu",
    },
    {
      type: "p",
      text:
        "Bu aşamada banka, başvurduğun kredi ürününün sana uygun olup olmadığını değerlendirir. Aynı kişi farklı ürünlerde farklı sonuç alabilir.",
    },
    {
      type: "ul",
      items: [
        "Taksit / gelir oranı hesaplanır",
        "Mevcut borç yükü analiz edilir",
        "Seçilen kredi tutarı ve vade değerlendirilir",
      ],
    },

    {
      type: "h2",
      text: "4) Otomatik karar veya manuel inceleme",
    },
    {
      type: "p",
      text:
        "Dosya çok net ise sistem otomatik olarak onay veya red verebilir. Ancak bazı başvurular sınırda kalır ve manuel incelemeye düşer.",
    },
    {
      type: "ul",
      items: [
        "Net dosya → hızlı onay veya red",
        "Sınırda dosya → manuel inceleme",
        "Eksik veri → ek evrak talebi",
      ],
    },
    {
      type: "callout",
      title: "Önemli fark",
      text:
        "Hızlı sonuç genellikle otomatik sistemden gelir. Sürecin uzaması çoğu zaman dosyanın net olmamasından kaynaklanır.",
    },

    {
      type: "h2",
      text: "Neden bazı başvurular anında sonuçlanır?",
    },
    {
      type: "p",
      text:
        "Bazı kullanıcılar saniyeler içinde sonuç alırken, bazıları günlerce bekleyebilir. Bunun nedeni başvurunun ne kadar net olduğudur.",
    },
    {
      type: "ul",
      items: [
        "Temiz ve net profil → hızlı sonuç",
        "Sınırda veya karışık profil → inceleme süreci",
      ],
    },

    {
      type: "h2",
      text: "Süreci hızlandırmak için ne yapılmalı?",
    },
    {
      type: "p",
      text:
        "Kredi değerlendirme sürecini hızlandırmanın yolu sistemi zorlamak değil, dosyayı netleştirmektir.",
    },
    {
      type: "ul",
      items: [
        "Evrakları baştan eksiksiz hazırla",
        "Gelir ve başvuru bilgilerini tutarlı gir",
        "Profiline uygun kredi ürününü seç",
        "Gereksiz başvurulardan kaçın",
      ],
    },

    {
      type: "h2",
      text: "Mini kontrol listesi",
    },
    {
      type: "ul",
      items: [
        "Gelir bilgilerim doğru ve net mi?",
        "Başvurum sistemle uyumlu mu?",
        "Ek inceleme gerektirecek bir durum var mı?",
        "Dosyam banka için anlaşılır mı?",
      ],
    },

    {
      type: "callout",
      title: "Sonuç",
      text:
        "Kredi değerlendirme süreci tek adımlık değildir. Otomatik sistemler hızlı çalışır ama karar, verinin netliğine bağlıdır. Ne kadar net bir dosya sunarsan, o kadar hızlı ve sağlıklı sonuç alırsın.",
    },
  ],
};