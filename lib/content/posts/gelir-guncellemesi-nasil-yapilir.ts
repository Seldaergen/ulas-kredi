import type { Post } from "../posts";

export const gelirGuncellemesiNasilYapilir: Post = {
  slug: "gelir-guncellemesi-nasil-yapilir",
  title: "Gelir Güncellemesi Nasıl Yapılır? (Krediye Etkisi Nedir?)",
  excerpt:
    "Bankadaki gelir bilgisi güncel değilse kredi başvurusu zayıf görünür. Gelir güncellemesi, limit ve onay ihtimalini doğrudan etkileyebilir.",

  category: "Bilgilendirme",
  topicId: "gelir-belgesi",
  readingTime: "4 dk",
  date: "2026-01-02",
  icon: "info",

  intro:
    "Kısa cevap: Gelirin arttıysa ama bankada eski görünüyorsa, sistem seni daha düşük kapasitede değerlendirir. Bu yüzden başvuru öncesi gelir güncellemesi yapmak kritik önemdedir.",

  criticalPoints: [
    "Güncel olmayan gelir, başvuruyu zayıf gösterir",
    "Gelir güncellemesi kredi limitini artırabilir",
    "Başvuru öncesi yapılması en doğru zamandır",
    "Belge ile sistem verisi uyumlu olmalıdır",
  ],

  highlight:
    "Bankanın gördüğü gelir, senin kazandığın değil kaydettiğin gelirdir.",

  content: [
    {
      type: "h2",
      text: "Gelir güncellemesi nedir?",
    },
    {
      type: "p",
      text:
        "Gelir güncellemesi, bankanın sisteminde kayıtlı olan gelir bilgisinin güncel hâle getirilmesidir.",
    },
    {
      type: "p",
      text:
        "Eğer maaşın arttıysa, iş değiştirdiysen veya ek gelir elde etmeye başladıysan bu bilgiyi bankaya iletmen gerekir.",
    },

    {
      type: "h2",
      text: "Neden bu kadar önemli?",
    },
    {
      type: "p",
      text:
        "Bankalar kredi verirken sistemde görünen geliri baz alır. Gerçek kazancın değil, kayıtlı olan gelir üzerinden değerlendirme yapılır.",
    },
    {
      type: "ul",
      items: [
        "Kredi limitleri artabilir",
        "Kart limitleri yükseltilebilir",
        "Başvuru sonucu daha olumlu olabilir",
        "Değerlendirme süresi kısalabilir",
      ],
    },
    {
      type: "callout",
      title: "Kritik gerçek",
      text:
        "Gelirin artmış olabilir ama sistemde görünmüyorsa, banka için değişen hiçbir şey yoktur.",
    },

    {
      type: "h2",
      text: "Gelir güncellemesi nasıl yapılır?",
    },
    {
      type: "p",
      text:
        "Gelir güncellemesi farklı kanallar üzerinden yapılabilir:",
    },
    {
      type: "ul",
      items: [
        "Mobil bankacılık üzerinden belge yükleme",
        "İnternet bankacılığı ile güncelleme",
        "Şubeye giderek manuel güncelleme",
      ],
    },

    {
      type: "h2",
      text: "Hangi belgeler gerekir?",
    },
    {
      type: "ul",
      items: [
        "Maaş bordrosu",
        "SGK hizmet dökümü",
        "Vergi levhası (esnaf için)",
        "Hesap hareketleri (destekleyici)",
      ],
    },

    {
      type: "h2",
      text: "Ne zaman yapılmalı?",
    },
    {
      type: "ul",
      items: [
        "Maaş artışı sonrası",
        "Yeni işe girildiğinde",
        "Ek gelir oluştuğunda",
        "Kredi başvurusu öncesinde",
      ],
    },

    {
      type: "h2",
      text: "En sık yapılan hata",
    },
    {
      type: "p",
      text:
        "Gelir arttığı hâlde bankaya bildirmemek en yaygın hatadır. Bu durum başvurunun gereksiz şekilde düşük kapasiteyle değerlendirilmesine neden olur.",
    },

    {
      type: "h2",
      text: "Mini kontrol listesi",
    },
    {
      type: "ul",
      items: [
        "Bankadaki gelir bilgim güncel mi?",
        "Son maaş artışımı sisteme yansıttım mı?",
        "Başvuru öncesi güncelleme yaptım mı?",
        "Belgelerim sistemle uyumlu mu?",
      ],
    },

    {
      type: "callout",
      title: "Sonuç",
      text:
        "Gelir güncellemesi küçük bir işlem gibi görünse de kredi sürecini doğrudan etkiler. Başvuru öncesi yapılacak doğru bir güncelleme, onay ihtimalini ciddi şekilde artırabilir.",
    },
  ],
};