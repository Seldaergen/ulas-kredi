import type { Post } from "../posts";

export const aktifKullandigimUrunYokNeYapmaliyim: Post = {
  slug: "aktif-kullandigim-urun-yok-ne-yapmaliyim",
  title: "Hiç Banka Ürünü Yoksa Kredi Puanı Nasıl Oluşur? (En Doğru Başlangıç Yolu)",
  excerpt:
    "Hiç kredi kartı veya kredi geçmişi olmayanlar için en güvenli başlangıç: teminatlı kartla iz oluştur, düzenli kullanım ile sistemde güven kazan.",

  category: "Bilgilendirme",
  topicId: "genel",
  readingTime: "6 dk",
  date: "2026-01-03",
  coverImage: "/content/aktif-urun-yok.jpg",
  icon: "info",
  views: 0,

  intro:
    "Kısa cevap: Banka sistemi seni tanımıyorsa puan oluşmaz. Önce küçük ve güvenli bir ürünle finansal iz bırakman gerekir. Puan, kullanımın sonucudur; başlangıç noktası değil.",

  criticalPoints: [
    "Hiç ürün yoksa kredi puanı oluşmaz",
    "Teminatlı kredi kartı en güvenli başlangıçtır",
    "Düzenli ödeme, puanın temelini oluşturur",
    "Direkt kredi başvurusu çoğu zaman red ile sonuçlanır",
  ],

  highlight:
    "Banka seni görmeden puan vermez; önce iz bırakman gerekir.",

  content: [
    {
      type: "h2",
      text: "Kredi puanı neden oluşmaz?",
    },
    {
      type: "p",
      text:
        "Kredi puanı, geçmiş finansal davranışlara göre hesaplanır. Eğer aktif kullandığın bir kredi kartı, kredi veya benzeri bir ürün yoksa sistem seni değerlendirecek veri bulamaz. Bu durumda puan ya oluşmaz ya da çok düşük seviyede kalır.",
    },
    {
      type: "p",
      text:
        "Bu yüzden birçok kişi ‘hiç borcum yok ama kredi alamıyorum’ der. Aslında sorun borç değil, veri eksikliğidir.",
    },

    {
      type: "h2",
      text: "İlk adım: Bankaya kendini tanıtmak",
    },
    {
      type: "p",
      text:
        "Bankalar risk yönetimiyle çalışır. Seni tanımayan bir sistem, doğal olarak temkinli davranır. Bu yüzden ilk hedef kredi almak değil, sisteme kontrollü şekilde giriş yapmaktır.",
    },
    {
      type: "ul",
      items: [
        "Daha önce sorun yaşamadığın bir bankayı tercih et",
        "Uzun süredir kullandığın hesap varsa oradan başla",
        "Amaç: onay almak değil, sistemde görünür olmak",
      ],
    },

    {
      type: "h2",
      text: "En güvenli başlangıç: Teminatlı (blokeli) kredi kartı",
    },
    {
      type: "p",
      text:
        "Hiç finansal geçmişi olmayan biri için en doğru başlangıç teminatlı kredi kartıdır. Bu kartta yatırdığın para kadar limit tanımlanır. Banka için risk yoktur, bu yüzden onay alma ihtimali yüksektir.",
    },
    {
      type: "p",
      text:
        "Bu kart sayesinde sistem seni tanımaya başlar ve ilk kredi puanı sinyalleri oluşur.",
    },
    {
      type: "callout",
      title: "Neden bu yöntem?",
      text:
        "Teminatlı kart, hem onay alınabilirliği yüksek hem de risk üretmeden kredi geçmişi oluşturmanı sağlar.",
    },

    {
      type: "h2",
      text: "Kartı nasıl kullanmalısın?",
    },
    {
      type: "p",
      text:
        "Kartı almak yeterli değildir. Asıl önemli olan nasıl kullandığındır. Banka sistemi davranışa bakar.",
    },
    {
      type: "ul",
      items: [
        "Limitin tamamını değil küçük bir kısmını kullan",
        "Her ay düzenli harcama yap ve tamamını öde",
        "Asgari ödeme alışkanlık hâline gelmemeli",
        "Tek bir gecikme bile süreci geriye atabilir",
      ],
    },

    {
      type: "h2",
      text: "Puan oluştuktan sonra ne yapılmalı?",
    },
    {
      type: "p",
      text:
        "2–3 ay düzenli kullanım sonrası sistem seni tanımaya başlar. Bu aşamadan sonra küçük tutarlı kredilerle puanı güçlendirmek mümkündür.",
    },
    {
      type: "ul",
      items: [
        "Düşük tutarlı ve kısa vadeli krediler tercih et",
        "Ödemeleri aksatmadan tamamla",
        "Amaç kredi almak değil, güven oluşturmaktır",
      ],
    },

    {
      type: "h2",
      text: "En sık yapılan hata",
    },
    {
      type: "p",
      text:
        "Hiç aktif ürün yokken doğrudan kredi başvurusu yapmak en yaygın hatadır. Sistem seni tanımadığı için bu başvurular genellikle olumsuz sonuçlanır ve gereksiz başvuru izi oluşur.",
    },

    {
      type: "h2",
      text: "Mini kontrol listesi",
    },
    {
      type: "ul",
      items: [
        "Sistemde aktif bir ürünüm var mı?",
        "Kartımı düzenli ve düşük oranla kullanıyor muyum?",
        "Ödemeleri eksiksiz yapıyor muyum?",
        "Gereksiz başvuru yapmadan ilerliyor muyum?",
      ],
    },

    {
      type: "callout",
      title: "Sonuç",
      text:
        "Kredi puanı sıfırdan oluşturulabilir ama sabır ve disiplin ister. En doğru yol: teminatlı kartla başla, düzenli kullan, ödeme alışkanlığı oluştur ve sistemi adım adım büyüt.",
    },
  ],
};