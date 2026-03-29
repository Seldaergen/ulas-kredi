import type { Post } from "../posts";

export const bankaIcSkorNedir: Post = {
  slug: "banka-ic-skor-nedir",
  title: "Banka İç Skoru Nedir? (Kredi Notundan Daha Önemli Olabilir mi?)",
  excerpt:
    "Kredi notu tek başına yeterli değildir. Bankalar kendi iç skorlarını kullanır ve çoğu zaman kararları bu skor belirler.",

  category: "Bilgilendirme",
  topicId: "banka",
  readingTime: "5 dk",
  date: "2026-01-02",
  icon: "info",

  intro:
    "Kısa cevap: Kredi notu herkes için aynıdır, ama banka iç skoru her bankada farklıdır. Ve çoğu zaman kredi kararını belirleyen şey bu iç skordur.",

  criticalPoints: [
    "Kredi notu ortak, iç skor bankaya özeldir",
    "Aynı kişi farklı bankalarda farklı sonuç alabilir",
    "İç skor davranışa göre hızlı değişebilir",
    "Doğru banka seçimi sonucu tamamen değiştirebilir",
  ],

  highlight:
    "Kredi notu seni sisteme sokar, iç skor ise sonucu belirler.",

  content: [
    {
      type: "h2",
      text: "Banka iç skoru nedir?",
    },
    {
      type: "p",
      text:
        "Banka iç skoru, bankanın seni kendi verilerine göre değerlendirdiği özel bir risk puanıdır. Bu skor, dışarıdan görülen kredi notuna ek olarak bankanın kendi algoritmasıyla oluşturulur.",
    },
    {
      type: "p",
      text:
        "Yani aynı kredi notuna sahip iki kişi, aynı bankada bile farklı sonuçlar alabilir. Çünkü banka yalnızca genel veriye değil, kendi içindeki davranışlara da bakar.",
    },

    {
      type: "h2",
      text: "Kredi notu ile iç skor arasındaki fark",
    },
    {
      type: "p",
      text:
        "Kredi notu tüm bankalar için ortak bir göstergedir. Ancak iç skor her bankada farklı hesaplanır.",
    },
    {
      type: "ul",
      items: [
        "Kredi notu → tüm bankalar için ortak veri",
        "İç skor → bankaya özel değerlendirme",
        "Kredi notu → geçmiş davranışı özetler",
        "İç skor → güncel ve detaylı risk analizidir",
      ],
    },
    {
      type: "callout",
      title: "Kritik fark",
      text:
        "İyi kredi notuna sahip olsan bile, iç skor düşükse kredi alamayabilirsin.",
    },

    {
      type: "h2",
      text: "İç skoru neler etkiler?",
    },
    {
      type: "p",
      text:
        "Bankalar iç skoru oluştururken yalnızca geçmişe değil, senin bankayla olan ilişkine de bakar.",
    },
    {
      type: "ul",
      items: [
        "Bankadaki hesap hareketleri ve nakit akışı",
        "Kredi kartı ve ürün kullanım alışkanlıkları",
        "Ödeme düzeni ve gecikme davranışı",
        "Son dönemdeki başvuru yoğunluğu",
        "Bankayla çalışma süresi",
      ],
    },

    {
      type: "h2",
      text: "Neden aynı kişi farklı bankalarda farklı sonuç alır?",
    },
    {
      type: "p",
      text:
        "Bu durumun nedeni iç skordur. Bir bankada aktif müşteri olan biri, o bankada daha güçlü görünürken başka bir bankada daha zayıf değerlendirilebilir.",
    },
    {
      type: "p",
      text:
        "Yani problem çoğu zaman kredi notu değil, yanlış bankaya başvurmaktır.",
    },

    {
      type: "h2",
      text: "Gerçek hayattan basit örnek",
    },
    {
      type: "p",
      text:
        "Aynı kredi notuna sahip iki kişiden biri uzun süredir aynı bankada aktif işlem yapıyorsa, o bankada daha yüksek limit alabilir. Diğer kişi ise aynı notla farklı bir bankada daha düşük limitle karşılaşabilir veya red alabilir.",
    },

    {
      type: "h2",
      text: "İç skoru nasıl güçlendirebilirsin?",
    },
    {
      type: "p",
      text:
        "İç skor dışarıdan direkt görülmez ama doğru davranışlarla güçlendirilebilir.",
    },
    {
      type: "ul",
      items: [
        "Hesaplarını aktif ve düzenli kullan",
        "Ödemelerini eksiksiz yap",
        "Gereksiz başvurulardan kaçın",
        "Aynı bankayla istikrarlı ilişki kur",
      ],
    },

    {
      type: "h2",
      text: "En büyük hata",
    },
    {
      type: "p",
      text:
        "Sadece kredi notuna bakarak her bankada aynı sonucu alacağını düşünmek en büyük hatadır. Bu yaklaşım çoğu zaman gereksiz redlere yol açar.",
    },

    {
      type: "h2",
      text: "Mini kontrol listesi",
    },
    {
      type: "ul",
      items: [
        "Başvurduğum bankayla ilişkim var mı?",
        "O bankada aktif işlem yapıyor muyum?",
        "Davranışlarım iç skoru destekliyor mu?",
        "Doğru bankayı seçtiğimden emin miyim?",
      ],
    },

    {
      type: "callout",
      title: "Sonuç",
      text:
        "Kredi notu önemli ama tek başına yeterli değildir. Banka iç skoru, başvurunun kaderini belirleyebilir. Bu yüzden doğru bankayı seçmek, doğru kredi ürününü seçmek kadar kritiktir.",
    },
  ],
};