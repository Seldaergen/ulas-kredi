// lib/content/posts.ts
import type { TopicId } from "@/lib/topics/topics";

export type PostCategory =
  | "Kredi Notu"
  | "Başvuru Süreci"
  | "Limit"
  | "Yasal / Risk"
  | "Bilgilendirme";

// ✅ Tek kaynak: icon union burada
export type PostIcon = "score" | "limit" | "flow" | "risk" | "info";

export type Post = {
  slug: string;
  title: string;
  excerpt: string;

  // ✅ UI kategorisi (liste/filtre)
  category: PostCategory;

  // ✅ V2 omurga (Video ↔ Rehber ↔ QA bağlantısı)
  topicId: TopicId;

  readingTime: string;
  date: string; // YYYY-MM-DD

  // ✅ görsel varsa kullan, yoksa fallback (ikon+gradient)
  coverImage?: string;

  // ✅ görsel yoksa veya ekstra vurgu istiyorsan
  icon?: PostIcon;

  // ✅ “okuma” göstermek istiyorsan
  views?: number;

  content: Array<
    | { type: "h2"; text: string }
    | { type: "p"; text: string }
    | { type: "ul"; items: string[] }
    | { type: "callout"; title: string; text: string }
  >;
};

export const POSTS: Post[] = [
  {
    slug: "kredi-notu-900-altinda-ne-yapmali",
    title: "Kredi Notu 900 Altındaysa Ne Yapmalısın?",
    excerpt:
      "Notu toparlamak için panik değil plan gerekir: gecikmeyi durdur, kullanım oranını dengede tut, başvuruyu disipline et ve 6–8 haftalık doğru davranış sinyali üret.",
    category: "Kredi Notu",
    topicId: "kredi-notu",
    readingTime: "7 dk",
    date: "2026-01-03",
    coverImage: "/content/credit-score-900.jpg",
    icon: "score",
    views: 12840,
    content: [
      { type: "h2", text: "900 altı ne anlama gelir?" },
      {
        type: "p",
        text: "Kredi notu 900 altına indiğinde bankaların gözünde “risk sinyali” güçlenir. Bu, her başvurunun otomatik reddedileceği anlamına gelmez; ama aceleyle yapılan başvurular ve yanlış hamleler durumu daha da zorlaştırabilir. Bu aşamada hedef “hemen kredi çıkarmak” değil, önce dosyayı güçlendirip ihtimali artırmaktır.",
      },

      { type: "h2", text: "Önce durum tespiti: hasarı durdur" },
      {
        type: "p",
        text: "En sık üç sebep: gecikme, yüksek limit kullanımı ve kısa sürede çok başvuru. Plan yapmadan önce hangi sinyalin notu aşağı çektiğini bulmak gerekir. Çünkü yanlış problemi çözmeye çalışmak zaman kaybettirir.",
      },
      {
        type: "ul",
        items: [
          "Son 90 günde gecikme var mı? (1 gün bile olsa düzen sinyali bozulur)",
          "Kart limitleri sürekli yüksek kullanımda mı? (tavana yakın kullanım risk sinyali üretir)",
          "Son 30 günde kaç bankaya başvuru yapıldı? (çoklu başvuru “acil nakit” algısı yaratabilir)",
          "Toplam taksit/gelir dengesi sürdürülebilir mi?",
          "Gelir ve meslek bilgisi bankalarda güncel mi?",
        ],
      },
      {
        type: "callout",
        title: "Kritik kural",
        text: "Önce gecikmeyi bitir, sonra kullanım oranını düşür, en son başvur. Sıra ters olursa genelde daha fazla red ve daha düşük skor görülür.",
      },

      {
        type: "h2",
        text: "1) Gecikme varsa önce onu sıfırla (en yüksek etki)",
      },
      {
        type: "p",
        text: "Küçük bir gecikme bile sistemde “düzensizlik” işareti bırakabilir. Önce gecikmeyi kapatmak veya yapılandırma ile gecikme riskini durdurmak gerekir. Banka, düzenli ödeme sinyalini tekrar görmeden rahatlamaz.",
      },
      {
        type: "ul",
        items: [
          "Gecikmeyi tamamen kapat (mümkünse aynı gün değil, planlı şekilde)",
          "Ödeyemiyorsan yapılandırma seçeneğini değerlendir (ama toplam maliyeti mutlaka gör)",
          "Minimum ödeme ile aylarca gitmek yerine, sürdürülebilir bir plan kur",
        ],
      },

      { type: "h2", text: "2) Limit kullanımını %30–40 bandına çek" },
      {
        type: "p",
        text: "Kart limitlerinin sürekli yüksek kullanılması, bankalar için risk göstergesidir. Aynı gelirle daha az borç kullandığını göstermek, notun toparlanmasında güçlü bir sinyal üretir. Burada hedef ‘kartı kapatmak’ değil, kontrollü kullanım göstermektir.",
      },
      {
        type: "ul",
        items: [
          "Toplam kart borcunu mümkünse kademeli azalt",
          "Bir kartı tavana dayayıp diğerini boş bırakma; dağılımı dengeli tut",
          "Ek taksit/erteleme gibi borcu büyüten alışkanlıklardan kaçın",
        ],
      },

      { type: "h2", text: "3) Başvuruyu durdur: 30 gün sakinleşme dönemi" },
      {
        type: "p",
        text: "Kredi notu düşükken üst üste başvuru yapmak genelde “acil nakit ihtiyacı” gibi okunur. Bu da iç skor tarafında negatif etki yaratabilir. En sağlıklı yaklaşım: dosyayı güçlendirip, sonra tek bankayla planlı denemek.",
      },
      {
        type: "callout",
        title: "En büyük hata",
        text: "Panikle aynı gün 4–5 bankaya başvurmak. Red ihtimalini büyütür, ayrıca başvuru izi artınca risk algısı yükselir.",
      },

      {
        type: "h2",
        text: "4) Otomatik ödeme talimatı ve düzen sinyalleri ekle",
      },
      {
        type: "p",
        text: "Bankalar düzenli ödeme davranışını sever. Otomatik ödeme talimatı gibi küçük ama düzenli sinyaller, profilin toparlandığına dair olumlu işaretler üretir. Burada amaç “gösteriş” değil, düzeni kalıcı hale getirmektir.",
      },
      {
        type: "ul",
        items: [
          "Fatura/abonelik gibi düzenli ödemeler için otomatik ödeme talimatı ver",
          "Ödemeleri son güne bırakma; mümkünse birkaç gün önce tamamla",
          "Aynı ay içinde düzensiz hareketlerden kaçın (ör. sürekli nakit avans)",
        ],
      },

      { type: "h2", text: "5) Gelir bilgini bankalarda güncelle" },
      {
        type: "p",
        text: "Gelir/meslek bilgisi güncel değilse banka dosyayı olduğundan zayıf görebilir. Gelir artışı, iş değişikliği veya ek gelir varsa bunu bankaya doğru belgelerle güncellemek limit ve ürün uygunluğunu olumlu etkileyebilir.",
      },
      {
        type: "ul",
        items: [
          "Maaş bordrosu / SGK / hesap hareketleri gibi kanıtlayıcı belgeleri hazır tut",
          "Gelir artışı olduysa bankaya yansıt",
          "Kayıtlı meslek bilgisi yanlışsa düzelt",
        ],
      },

      { type: "h2", text: "6) Kart sayısını artırma, yeni borç üretme" },
      {
        type: "p",
        text: "Not düşükken yeni kart almak veya yeni limit eklemek çoğu zaman daha fazla risk sinyali üretir. Bu dönemde hedef daha çok ürün almak değil, mevcut düzeni stabilize etmektir. Önce kontrol, sonra genişleme.",
      },
      {
        type: "ul",
        items: [
          "Yeni kart başvurusu yapma (özellikle kısa dönem içinde)",
          "Mevcut kartları düzenli kapama davranışı göster",
          "Kısa vadeli “nefes aldıran” çözümler borcu büyütüyorsa uzak dur",
        ],
      },

      { type: "h2", text: "7) 6–8 haftalık toparlanma planı (gerçekçi tempo)" },
      {
        type: "p",
        text: "Skor bir günde mucize şekilde yükselmez; davranış sinyalleriyle toparlanır. İlk pozitif sinyal genelde birkaç hafta içinde başlar. Kalıcı etki için 6–8 hafta istikrar görmek çok daha sağlıklıdır.",
      },
      {
        type: "ul",
        items: [
          "Hafta 1–2: gecikmeyi bitir + kullanım oranını düşürmeye başla",
          "Hafta 3–4: başvuru yok, düzenli ödeme davranışı kur",
          "Hafta 5–6: gelir güncellemesi ve dosya hazırlığı",
          "Hafta 7–8: tek bankayla, doğru ürünle planlı deneme",
        ],
      },

      { type: "h2", text: "Başvuru yapacaksan: en güvenli strateji" },
      {
        type: "p",
        text: "Dosya toparlanmadan rastgele kredi denemek yerine, tek bankayla doğru ürün seçimi ve doğru zamanlama daha mantıklıdır. Amaç garanti vermek değil, ihtimali artırmaktır.",
      },
      {
        type: "ul",
        items: [
          "Ön analiz yap: taksit/gelir oranı sürdürülebilir mi?",
          "Eksik evrak varsa tamamla (gelir doğrulama, hesap hareketi vb.)",
          "Tek bankayla başla → sonucu gör → sonra gerekiyorsa genişlet",
        ],
      },

      { type: "h2", text: "Kendin hızlı kontrol listesi" },
      {
        type: "ul",
        items: [
          "Gecikmem tamamen bitti mi?",
          "Kart kullanımım %30–40 bandına yaklaştı mı?",
          "Son 30 günde yeni başvuru yapmadım mı?",
          "Gelir bilgim bankalarda güncel mi?",
          "Taksit/gelir oranım sürdürülebilir mi?",
        ],
      },

      {
        type: "callout",
        title: "Özet",
        text: "900 altı dönemde en doğru sıra: gecikmeyi bitir → kullanım oranını düşür → başvuruyu disipline et → 6–8 hafta istikrar → tek bankayla planlı deneme. Panik başvurusu genelde işleri zorlaştırır.",
      },
    ],
  },

  {
  slug: "kara-listeden-cikilir-mi",
  title: "Kara Listeden Çıkılır mı? En Çok Sorulan 9 Soru",
  excerpt:
    "‘Kara liste’ gerçekte nedir, borç kapatınca neden hâlâ red gelir ve bankalar toparlanma sinyalini nasıl okur? Gerçekçi yol haritası.",
  category: "Yasal / Risk",
  topicId: "kirmizi-kalem",
  readingTime: "8 dk",
  date: "2026-01-03",
  coverImage: "/content/blacklist.jpg",
  icon: "risk",
  views: 9720,
  content: [
    {
      type: "h2",
      text: "Önce kavramı netleştirelim: “Kara liste” nedir?",
    },
    {
      type: "p",
      text: "Halk arasında ‘kara liste’ denince tek bir resmi liste varmış gibi düşünülür. Pratikte ise bankalar tek bir etikete bakmaz. Geçmiş gecikmeler, yasal takip kayıtları, kapatılmış borçların izi, başvuru davranışı ve her bankanın kendi iç risk skoru birlikte değerlendirilir. Yani mesele bir isimden çok, bankanın gözünde oluşan risk profilidir.",
    },

    {
      type: "h2",
      text: "Kara listede gibi görünmene en sık sebep olan durumlar",
    },
    {
      type: "ul",
      items: [
        "Kredi veya kredi kartında uzun süreli gecikmeler (özellikle 90 gün ve üzeri)",
        "Yasal takip süreci (icra, avukatlık dosyası, takibe intikal)",
        "Borcu kapattıktan kısa süre sonra yeniden gecikme yaşanması",
        "Kısa sürede çok sayıda kredi başvurusu (red üstüne red)",
        "Kart limitlerinin sürekli tavanda kullanılması ve sadece asgari ödeme alışkanlığı",
        "Gelir bilgisinin bankalarda güncel olmaması veya borç/gelir dengesinin zayıf görünmesi",
      ],
    },

    {
      type: "h2",
      text: "Borcu kapattım — peki neden hâlâ reddediliyorum?",
    },
    {
      type: "p",
      text: "Çünkü bankalar sadece ‘borç kapandı mı?’ sorusuna bakmaz. Borç kapandıktan sonra oluşan yeni davranış sinyallerini izler. Borç kapanır kapanmaz tekrar başvuru yapmak, limitleri zorlamak veya düzensiz ödeme devam ediyorsa bankanın gözünde riskin sürdüğü düşünülür.",
    },
    {
      type: "callout",
      title: "Gerçekçi çerçeve",
      text: "Borç kapatmak şarttır ama tek başına yeterli olmayabilir. Bankanın görmek istediği şey: gecikmesiz dönem + dengeli kullanım + planlı başvuru.",
    },

    {
      type: "h2",
      text: "Bankalar ‘toparlandı’ sinyalini nereden alır?",
    },
    {
      type: "ul",
      items: [
        "Son 3–6 ayda hiç gecikme olmaması",
        "Kart limit kullanım oranının düşmesi (sürekli tavana dayanmaması)",
        "Başvuru sayısının azalması (özellikle aynı ay içinde çoklu başvuru olmaması)",
        "Gelir bilgisinin güncel ve belgelenebilir olması",
        "Borç/gelir oranının sürdürülebilir görünmesi",
        "Daha düşük riskli ürünlerle (küçük limit, küçük tutar) güvenin yeniden kurulması",
      ],
    },

    {
      type: "h2",
      text: "Ne kadar sürede ‘çıkılmış gibi’ olunur?",
    },
    {
      type: "p",
      text: "Tek bir gün veya tek bir işlemle ‘çıktım’ demek doğru olmaz. Genelde ilk olumlu sinyal 6–8 hafta içinde görülür. 3–6 ayda profil belirgin şekilde toparlanır. 6–12 ay düzenli davranışla bankaların gözünde risk ciddi biçimde azalır. Ancak bu süre; gecikmenin ağırlığına, yasal takip olup olmadığına ve son dönemdeki davranışlara göre değişir.",
    },
    {
      type: "callout",
      title: "En kritik detay",
      text: "Yasal takip yaşandıysa toparlanma daha uzun sürebilir. Süreci hızlandıran tek şey: yeni olumsuz kayıt üretmemek ve davranışı istikrarlı tutmaktır.",
    },

    {
      type: "h2",
      text: "En çok sorulan 9 soru — net cevaplarla",
    },
    {
      type: "ul",
      items: [
        "“Kara liste kaç yılda silinir?” → Tek bir süre yok; kayıt türüne göre değişir, bankalar geçmişi bir süre görmeye devam edebilir.",
        "“Borç kapatınca hemen kredi çıkar mı?” → Bazen evet ama çoğu zaman hayır; davranış sinyalleri güçlenmelidir.",
        "“Yapılandırma kötü mü?” → Tek başına kötü değildir; gecikmeyi durdurup düzen kuruyorsa olumlu olabilir.",
        "“Kefil veya teminat işe yarar mı?” → Bazı senaryolarda riski dengeler ama her bankada geçerli değildir.",
        "“Limitimi düşürmeli miyim?” → Borç aynıysa toplam limiti düşürmek kullanım oranını artırabilir; dikkatli karar gerekir.",
        "“Kart kapatmak iyi mi?” → Bazen geçmiş/aktivite sinyalini zayıflatır; profil özelinde değerlendirilmelidir.",
        "“Sık başvuru ne kadar zarar verir?” → Aynı ay içinde çoklu başvuru risk sinyali üretir.",
        "“Gelir güncellemesi fark eder mi?” → Evet; özellikle limit ve ürün uygunluğunu etkiler.",
        "“Hangi bankaya başvurayım?” → ‘En kolay banka’ yok; doğru ürün + doğru zaman + doğru dosya vardır.",
      ],
    },

    {
      type: "h2",
      text: "Adım adım toparlanma planı (en güvenli yöntem)",
    },
    {
      type: "ul",
      items: [
        "1) Gecikme varsa tamamen bitir: gecikmeyi sıfırla veya yapılandırmayı düzene sok",
        "2) 30 gün kuralı: aynı ay içinde yeni başvuru yapma, sistemi sakinleştir",
        "3) Kart kullanımını dengele: mümkünse tavana dayanma, düzenli kapama sinyali üret",
        "4) Gelir bilgisini güncelle: bankalarda eksik/yanlış bilgi dosyayı zayıf gösterir",
        "5) Tek banka stratejisi: 1 bankayla başla → sonucu gör → sonra planlı genişlet",
        "6) Küçük ürünle güven inşa et: düşük limit / küçük tutar / kısa vade ile başla",
      ],
    },

    {
      type: "callout",
      title: "En büyük hata",
      text: "Panikle aynı gün 4–5 bankaya başvurmak. Hem red ihtimalini büyütür hem de risk sinyalini artırır.",
    },

    {
      type: "h2",
      text: "Kendin hızlı kontrol et: ‘Benim dosyam neden zayıf?’",
    },
    {
      type: "ul",
      items: [
        "Son 90 günde gecikme var mı?",
        "Kartlar sürekli yüksek kullanımda mı?",
        "Aynı ay içinde birden fazla başvuru var mı?",
        "Gelir bilgim bankalarda güncel mi?",
        "Aylık taksit toplamı gelire göre ağır mı?",
      ],
    },

    {
      type: "h2",
      text: "Ne zaman danışmanlık gerçekten işe yarar?",
    },
    {
      type: "p",
      text: "Üst üste red alındığında, hangi sinyalin sorun çıkardığını tek başına görmek zorlaşır. Bu noktada amaç mucize vaat etmek değil; doğru ürün seçimi, doğru zamanlama ve dosyayı güçlendiren küçük ama etkili hamlelerle ihtimali artırmaktır.",
    },

    {
      type: "callout",
      title: "Özet",
      text: "‘Kara listeden çıkmak’ tek seferlik bir olay değil; bankanın gördüğü sinyalleri planlı ve istikrarlı biçimde iyileştirme sürecidir. Doğru sıra: gecikmeyi bitir → davranışı sabitle → tek bankayla planlı ilerle.",
    },
  ],
},

  {
  slug: "2025-en-hizli-basvuru-akisi",
  title: "2025’te En Hızlı Sonuç Veren Başvuru Akışı",
  excerpt:
    "Hızlı onay için sihirli banka yok; doğru sıra var. Ön analiz, evrak disiplini ve tek bankayla planlı başvuru ile süreci kısalt.",
  category: "Başvuru Süreci",
  topicId: "kredi-basvurusu",
  readingTime: "6 dk",
  date: "2026-01-03",
  coverImage: "/content/fast-approval.jpg",
  icon: "flow",
  views: 11450,
  content: [
    {
      type: "h2",
      text: "‘Hızlı onay’ gerçekten ne demek?",
    },
    {
      type: "p",
      text: "2025’te ‘hızlı sonuç’ genellikle ön değerlendirme süresinin kısa olması anlamına gelir. Kesin onay ise evrak doğrulaması, gelir teyidi ve bankanın iç skor kontrollerinden sonra verilir. Yani hız; doğru dosya + doğru sıra ile mümkündür.",
    },

    {
      type: "h2",
      text: "Hızlı sonuç için doğru sıralama (altın kural)",
    },
    {
      type: "ul",
      items: [
        "Ön analiz: gelir, mevcut borçlar ve aylık taksit yükünü netleştir",
        "Evrak hazırlığı: başvuru öncesi tüm belgeleri tamamla",
        "Tek bankayla başla: sonucu gör → sonra gerekirse planlı genişlet",
      ],
    },
    {
      type: "callout",
      title: "Neden sıra bu?",
      text: "Sıra bozulursa genelde hız artmaz; tam tersine red ve ek inceleme ihtimali yükselir.",
    },

    {
      type: "h2",
      text: "1) Ön analiz: başvuruya girmeden önce kendini kontrol et",
    },
    {
      type: "p",
      text: "Başvurudan önce basit bir ön analiz yapmak, gereksiz redleri ve zaman kaybını önler. Bankalar başvuruda senin adına bu analizi zaten yapar; amaç, zayıf noktayı önceden görmektir.",
    },
    {
      type: "ul",
      items: [
        "Aylık toplam taksit/gelir oranı sürdürülebilir mi?",
        "Son 30–60 günde gecikme var mı?",
        "Kredi kartı kullanım oranları yüksek mi?",
        "Aynı ay içinde başka başvuru yapıldı mı?",
      ],
    },

    {
      type: "h2",
      text: "2) Evrak hazırlığı: hızın %50’si burada kazanılır",
    },
    {
      type: "p",
      text: "Birçok başvuru yavaşlar çünkü evrak eksiktir veya doğrulama gecikir. Evrak baştan tam olursa banka dosyayı bekletmez.",
    },
    {
      type: "ul",
      items: [
        "Kimlik bilgileri (geçerli ve güncel)",
        "Gelir belgesi (maaş bordrosu, SGK dökümü, hesap hareketleri)",
        "Serbest çalışanlar için vergi levhası veya gelir akışı kanıtı",
        "Varsa ek gelir belgeleri",
      ],
    },
    {
      type: "callout",
      title: "Pratik ipucu",
      text: "Evrakı başvurudan sonra yüklemek yerine, başvuru anında hazır bulundurmak süreci ciddi hızlandırır.",
    },

    {
      type: "h2",
      text: "3) Doğru ürün seçimi: hız yanlış üründe kaybolur",
    },
    {
      type: "p",
      text: "Aynı bankada bile her ürün aynı hızda değerlendirilmez. Profiline uymayan ürüne başvurmak ek kontrol ve gecikme yaratır.",
    },
    {
      type: "ul",
      items: [
        "Gelir seviyene uygun tutar/vade seç",
        "Yeni müşteri ürünleri ile mevcut müşteri ürünlerini karıştırma",
        "Kart borcu varken yüksek tutarlı kredi denemekten kaçın",
      ],
    },

    {
      type: "h2",
      text: "4) Tek bankayla başla → sonucu gör → sonra genişlet",
    },
    {
      type: "p",
      text: "Hızlı sonuç almak isterken yapılan en büyük hata, aynı anda birçok bankaya başvurmaktır. Bu hem başvuru izini artırır hem de bankaların risk algısını yükseltebilir.",
    },
    {
      type: "ul",
      items: [
        "Önce en uygun gördüğün bankayla başla",
        "Sonucu bekle (onay / ek evrak / red)",
        "Gerekirse ikinci bankaya planlı şekilde geç",
      ],
    },
    {
      type: "callout",
      title: "Altın kural",
      text: "1 banka → 1 sonuç → 1 karar. Aynı gün çoklu başvuru genelde hızı değil, reddi artırır.",
    },

    {
      type: "h2",
      text: "2025’te süreci yavaşlatan 3 kritik hata",
    },
    {
      type: "ul",
      items: [
        "Eksik veya sonradan tamamlanan evrak",
        "Aynı gün içinde çoklu kredi başvurusu",
        "Profil ile uyumsuz ürün seçimi",
      ],
    },

    {
      type: "h2",
      text: "Hızlı sonuç için mini kontrol listesi",
    },
    {
      type: "ul",
      items: [
        "Evraklarım hazır mı?",
        "Son 30 günde başka başvuru yaptım mı?",
        "Seçtiğim ürün gelir ve borç durumuma uygun mu?",
        "Tek bankayla mı başlıyorum?",
      ],
    },

    {
      type: "callout",
      title: "Özet",
      text: "2025’te hızlı sonuç almak için ‘en kolay banka’yı aramak yerine, doğru sırayı uygula: ön analiz → evrak disiplini → doğru ürün → tek bankayla planlı başvuru.",
    },
  ],
},

  {
  slug: "kredi-limiti-dusukse-ne-yapmali",
  title: "Kredi Limitin Düşükse Ne Yapmalısın?",
  excerpt:
    "Düşük limit bir ceza değil, temkin sinyalidir. Gelir güncellemesi, kullanım oranı ve doğru zamanlama ile limit artırma ihtimalini yükseltmek mümkün.",
  category: "Limit",
  topicId: "kredi-limiti",
  readingTime: "6 dk",
  date: "2026-01-03",
  coverImage: "/content/limit.jpg",
  icon: "limit",
  views: 8030,
  content: [
    {
      type: "h2",
      text: "Kredi limiti neden düşük kalır?",
    },
    {
      type: "p",
      text: "Düşük limit genellikle bankanın seni ‘riskli’ görmesinden değil, yeterli güven sinyalini henüz almamasından kaynaklanır. Bankalar limit verirken sadece kredi notuna değil; gelir, kullanım alışkanlığı ve ödeme düzenine birlikte bakar.",
    },
    {
      type: "ul",
      items: [
        "Gelir bilgisinin bankalarda güncel olmaması",
        "Yeni müşteri olunması veya banka ile kısa geçmiş",
        "Kredi kartı limitlerinin sürekli yüksek kullanımda olması",
        "Geçmişte yaşanan gecikmeler veya düzensiz ödeme",
        "Borç/gelir oranının yüksek görünmesi",
      ],
    },

    {
      type: "h2",
      text: "Düşük limit ne anlama gelir?",
    },
    {
      type: "p",
      text: "Düşük limit bir ‘ret’ değildir; banka seni tanımaya devam etmek istediğini gösterir. Bu aşamada doğru davranışlar sergilenirse limit zamanla artırılabilir. Yanlış hamleler ise süreci uzatır.",
    },
    {
      type: "callout",
      title: "Önemli nokta",
      text: "Limit düşükken yapılan hatalar (sık başvuru, tavana dayalı kullanım) bankanın temkinini artırabilir.",
    },

    {
      type: "h2",
      text: "1) Gelir bilgisini mutlaka güncelle",
    },
    {
      type: "p",
      text: "Bankalar limiti büyük ölçüde gelire göre belirler. Gelir artışı olduysa veya bankadaki kayıtlar güncel değilse dosya olduğundan zayıf görünür. Basit bir gelir güncellemesi bile limit ihtimalini ciddi şekilde etkileyebilir.",
    },
    {
      type: "ul",
      items: [
        "Maaş bordrosu veya SGK hizmet dökümü",
        "Hesap hareketleri (düzenli gelir girişi)",
        "Serbest çalışanlar için vergi levhası veya fatura kayıtları",
      ],
    },

    {
      type: "h2",
      text: "2) Kullanım oranını düşür (en güçlü sinyallerden biri)",
    },
    {
      type: "p",
      text: "Toplam kart limitinin büyük kısmını sürekli kullanmak bankaya risk sinyali verir. Amaç kartı kapatmak değil, kontrollü kullandığını göstermektir.",
    },
    {
      type: "ul",
      items: [
        "Kart limitlerini mümkünse %30–40 bandında kullan",
        "Bir kartı tavana dayayıp diğerini boş bırakma",
        "Asgari ödeme alışkanlığından çıkmaya çalış",
      ],
    },

    {
      type: "h2",
      text: "3) Ödeme düzenini istikrarlı hale getir",
    },
    {
      type: "p",
      text: "Limit artışı için bankanın görmek istediği en net şey: gecikmesiz ve düzenli ödeme davranışı. Kısa süreli de olsa istikrar güçlü sinyal üretir.",
    },
    {
      type: "ul",
      items: [
        "Ödemeleri son güne bırakmamak",
        "Mümkünse otomatik ödeme talimatı vermek",
        "Aynı ay içinde düzensiz nakit avans kullanmamak",
      ],
    },

    {
      type: "h2",
      text: "4) Limit artışını doğru zamanda talep et",
    },
    {
      type: "p",
      text: "Limit artışını hemen istemek çoğu zaman işe yaramaz. Önce davranış sinyallerini güçlendirmek gerekir. Genelde 1–2 ay gecikmesiz ve dengeli kullanım sonrası talep daha sağlıklıdır.",
    },
    {
      type: "ul",
      items: [
        "Gelir güncellemesinden sonra",
        "Kullanım oranı düşmüşken",
        "Son dönemde yeni kredi başvurusu yokken",
      ],
    },
    {
      type: "callout",
      title: "Zamanlama kuralı",
      text: "Önce dosyayı güçlendir → sonra limit iste. Tersi genelde retle sonuçlanır.",
    },

    {
      type: "h2",
      text: "En sık yapılan hatalar",
    },
    {
      type: "ul",
      items: [
        "Limit düşükken kartı sürekli tavana dayamak",
        "Üst üste limit artış talebi göndermek",
        "Aynı dönemde yeni kredi/kart başvuruları yapmak",
        "Gelir güncellemesi yapmadan artış beklemek",
      ],
    },

    {
      type: "h2",
      text: "Kendin hızlı kontrol listesi",
    },
    {
      type: "ul",
      items: [
        "Gelir bilgilerim bankada güncel mi?",
        "Kart kullanım oranım %40’ın altında mı?",
        "Son 30–60 günde gecikmem var mı?",
        "Son dönemde başka kredi/kart başvurusu yaptım mı?",
      ],
    },

    {
      type: "callout",
      title: "Özet",
      text: "Kredi limitinin düşük olması kalıcı bir durum değildir. Doğru sıra: gelir güncelle → kullanım oranını düşür → ödeme düzenini sabitle → doğru zamanda limit artışı talep et.",
    },
  ],
},

  {
    slug: "e-devlet-kredi-notu-dogru-mu",
    title: "E-Devlet Kredi Notu Doğru mu? (Gerçekler)",
    excerpt:
      "Kaynak farkları, güncellenme süreleri ve bankaların hangi sinyalleri daha çok önemsediği.",
    category: "Bilgilendirme",
    topicId: "kredi-notu",
    readingTime: "3 dk",
    date: "2025-12-15",
    coverImage: "/content/edevlet.jpg",
    icon: "info",
    views: 6210,
    content: [
      { type: "h2", text: "Kaynaklar neden farklı görünebilir?" },
      {
        type: "p",
        text: "Farklı sistemlerin güncellenme süreleri ve gösterdiği alt metrikler değişebilir.",
      },
      {
        type: "callout",
        title: "Özet",
        text: "Tek bir sayıya takılma; davranış sinyallerini düzeltmek daha etkili.",
      },
    ],
  },

  // -------------------------------
  // TOP 50 (iskelet) — 2026-01-02
  // Tek kaynak: POSTS
  // -------------------------------
 {
  slug: "kredi-notu-nedir-nasil-ogrenilir",
  title: "Kredi Notu Nedir, Nasıl Öğrenilir?",
  excerpt:
    "Kredi notu neyi ölçer, bankalar bu skoru nasıl okur ve kredi notunu nereden güvenle öğrenebilirsin? Temelden, sade ve net anlatım.",
  category: "Kredi Notu",
  topicId: "kredi-notu",
  readingTime: "6 dk",
  date: "2026-01-03",
  coverImage: "/content/kredi-notu-nedir-nasil-ogrenilir.jpg",
  icon: "score",
  views: 0,
  content: [
    {
      type: "h2",
      text: "Kredi notu nedir?",
    },
    {
      type: "p",
      text: "Kredi notu, bankalarla olan finansal geçmişinin tek bir sayı ile özetlenmiş hâlidir. Ödeme düzenin, kredi kartı kullanımın, borçların ve başvuru alışkanlıkların bu skorun oluşmasında birlikte rol oynar.",
    },

    {
      type: "h2",
      text: "Kredi notu neyi gösterir?",
    },
    {
      type: "p",
      text: "Kredi notu, ‘bugün borç alabilir misin?’ sorusundan çok ‘borcunu nasıl yönettiğini’ gösterir. Bankalar bu skoru, risk seviyeni hızlıca anlamak için kullanır.",
    },
    {
      type: "ul",
      items: [
        "Ödemeleri zamanında yapıp yapmadığını",
        "Kredi ve kart limitlerini nasıl kullandığını",
        "Borçlanma alışkanlığının dengeli olup olmadığını",
        "Başvurularını planlı mı, panikle mi yaptığını",
      ],
    },

    {
      type: "h2",
      text: "Bankalar kredi notunu nasıl okur?",
    },
    {
      type: "p",
      text: "Bankalar kredi notunu tek başına değil; trendiyle birlikte değerlendirir. Aynı nota sahip iki kişi, farklı davranışlar sergilediği için farklı sonuçlar alabilir.",
    },
    {
      type: "ul",
      items: [
        "Skor artıyorsa → olumlu sinyal",
        "Skor sabitse → nötr sinyal",
        "Skor düşüyorsa → risk sinyali",
      ],
    },
    {
      type: "callout",
      title: "Önemli detay",
      text: "Bankalar için ‘kaç puan’ olduğundan çok, ‘son aylarda ne yönde gittiği’ daha belirleyicidir.",
    },

    {
      type: "h2",
      text: "Kredi notu hangi davranışlardan etkilenir?",
    },
    {
      type: "ul",
      items: [
        "Kredi ve kredi kartı ödemelerinin zamanında yapılması",
        "Kart limitlerinin ne kadarının kullanıldığı",
        "Gecikme yaşanıp yaşanmadığı",
        "Kısa sürede yapılan çoklu kredi başvuruları",
        "Borç/gelir dengesinin sürdürülebilirliği",
      ],
    },

    {
      type: "h2",
      text: "Kredi notu nasıl ve nereden öğrenilir?",
    },
    {
      type: "p",
      text: "Kredi notu, bankaların ve finansal kuruluşların kullandığı resmi sistemler üzerinden öğrenilir. En yaygın yöntemler; bankaların mobil uygulamaları ve kredi notu sorgulama servisleridir.",
    },
    {
      type: "ul",
      items: [
        "Banka mobil uygulamaları (müşterisi olduğun bankalar)",
        "Kredi notu sorgulama servisleri",
        "Bazı internet bankacılığı platformları",
      ],
    },
    {
      type: "callout",
      title: "Pratik bilgi",
      text: "Notunu çok sık sorgulamak skoru düşürmez; asıl önemli olan ödeme ve kullanım davranışlarıdır.",
    },

    {
      type: "h2",
      text: "Kredi notu ne sıklıkla değişir?",
    },
    {
      type: "p",
      text: "Kredi notu genellikle aylık olarak güncellenir. Ödeme alışkanlıklarındaki değişimler kısa sürede yansıyabilir; ancak kalıcı iyileşme için istikrarlı davranış gerekir.",
    },

    {
      type: "h2",
      text: "Kredi notunu doğru yorumlamak için kendine sor",
    },
    {
      type: "ul",
      items: [
        "Son 1–3 ayda notum artıyor mu, düşüyor mu?",
        "Kart limitlerimi dengeli kullanıyor muyum?",
        "Son dönemde gecikme yaşadım mı?",
        "Aynı ay içinde birden fazla başvuru yaptım mı?",
        "Gelirim bankalarda güncel mi?",
      ],
    },

    {
      type: "h2",
      text: "Kredi notu neden zamanla daha önemli hâle gelir?",
    },
    {
      type: "p",
      text: "Finansal geçmiş uzadıkça kredi notu daha anlamlı hâle gelir. Düzenli ödeme ve planlı kullanım, zaman içinde bankaların sana olan güvenini artırır.",
    },

    {
      type: "callout",
      title: "Özet",
      text: "Kredi notu; ödeme düzeni, borç yönetimi ve başvuru alışkanlıklarının bir sonucudur. Tek başına bir sayı değil, davranışlarının bankalar tarafından okunma biçimidir.",
    },
  ],
},

  {
  slug: "kredi-notu-neden-duser",
  title: "Kredi Notu Neden Düşer?",
  excerpt:
    "Kredi notunu aşağı çeken davranışlar tek tek değil, birlikte etki eder. Gecikme, kullanım oranı ve başvuru sıklığı bankaların en hassas baktığı sinyallerdir.",
  category: "Kredi Notu",
  topicId: "kredi-notu",
  readingTime: "6 dk",
  date: "2026-01-03",
  coverImage: "/content/kredi-notu-neden-duser.jpg",
  icon: "score",
  views: 0,
  content: [
    {
      type: "h2",
      text: "Kredi notu neden düşer?",
    },
    {
      type: "p",
      text: "Kredi notu genellikle tek bir hatadan değil, davranışların birikimli etkisinden düşer. Bankalar; ödeme düzenini, borç kullanım şeklini ve başvuru alışkanlıklarını birlikte değerlendirir.",
    },

    {
      type: "h2",
      text: "1) Gecikmeli ödeme (en güçlü olumsuz sinyal)",
    },
    {
      type: "p",
      text: "Ödemelerin gecikmesi kredi notunu en hızlı düşüren faktördür. Özellikle 30 gün ve üzeri gecikmeler bankalar için ciddi risk göstergesidir.",
    },
    {
      type: "ul",
      items: [
        "Kredi veya kart borcunun son ödeme tarihinden sonra ödenmesi",
        "Asgari ödemenin dahi geciktirilmesi",
        "Gecikmenin birden fazla ay tekrar etmesi",
      ],
    },
    {
      type: "callout",
      title: "Kritik bilgi",
      text: "Gecikme kısa sürse bile sistemde iz bırakır; düzenli davranışla zamanla etkisi azalır.",
    },

    {
      type: "h2",
      text: "2) Kredi kartı limitlerinin yüksek kullanımı",
    },
    {
      type: "p",
      text: "Kart limitlerinin büyük bölümünü sürekli kullanmak, bankalar tarafından ‘nakit sıkışıklığı’ sinyali olarak algılanabilir. Bu durum kredi notunu aşağı çekebilir.",
    },
    {
      type: "ul",
      items: [
        "Toplam limitin %70–80’inin sürekli dolu olması",
        "Bir kartı tavana dayayıp diğerlerini boş bırakmak",
        "Ay içinde sık sık nakit avans kullanmak",
      ],
    },

    {
      type: "h2",
      text: "3) Sık ve plansız kredi başvuruları",
    },
    {
      type: "p",
      text: "Kısa süre içinde yapılan çok sayıda kredi veya kart başvurusu, bankaların risk algısını artırır. Her başvuru, dosyada ‘acil nakit ihtiyacı’ izlenimi oluşturabilir.",
    },
    {
      type: "ul",
      items: [
        "Aynı ay içinde birden fazla bankaya başvurmak",
        "Red aldıktan hemen sonra başka bankaya geçmek",
        "Profil ile uyumsuz ürünlere başvurmak",
      ],
    },
    {
      type: "callout",
      title: "Yaygın hata",
      text: "‘Biri olmazsa diğeri olur’ düşüncesi, kredi notunu daha da düşürebilir.",
    },

    {
      type: "h2",
      text: "4) Borç/gelir dengesinin bozulması",
    },
    {
      type: "p",
      text: "Aylık taksitlerin gelire göre yüksek görünmesi, kredi notu üzerinde baskı oluşturur. Bankalar, borcun sürdürülebilir olup olmadığına bakar.",
    },
    {
      type: "ul",
      items: [
        "Gelire kıyasla yüksek taksit yükü",
        "Gelir bilgisinin bankalarda güncel olmaması",
        "Yeni borç eklenmesine rağmen gelirin sabit kalması",
      ],
    },

    {
      type: "h2",
      text: "Kredi notu düştüğünde yapılan yanlış hamleler",
    },
    {
      type: "ul",
      items: [
        "Panikle çok sayıda bankaya başvurmak",
        "Limitleri daha fazla zorlamak",
        "Gecikme varken yeni kredi denemek",
        "Gelir güncellemesi yapmadan çözüm beklemek",
      ],
    },

    {
      type: "h2",
      text: "Kredi notu düştüyse toparlama sırası ne olmalı?",
    },
    {
      type: "ul",
      items: [
        "1) Gecikme varsa önce tamamen bitir",
        "2) Kart kullanım oranlarını düşür",
        "3) Başvuruları durdur ve sistemi sakinleştir",
        "4) Gelir bilgisini bankalarda güncelle",
        "5) Bir süre düzenli ve istikrarlı davranışı koru",
      ],
    },
    {
      type: "callout",
      title: "Hızlı öneri",
      text: "Önce gecikmeyi sıfırla → sonra kullanım oranını düşür → en son planlı başvuru yap.",
    },

    {
      type: "h2",
      text: "Kendin hızlı kontrol et",
    },
    {
      type: "ul",
      items: [
        "Son 30–60 günde gecikmem oldu mu?",
        "Kartlarım sürekli yüksek kullanımda mı?",
        "Aynı ay içinde birden fazla başvuru yaptım mı?",
        "Aylık taksitlerim gelire göre ağır mı?",
      ],
    },

    {
      type: "callout",
      title: "Özet",
      text: "Kredi notu genellikle tek bir sebepten değil; gecikme, kullanım oranı ve başvuru davranışlarının birleşiminden düşer. Doğru sırayla ilerlemek, toparlanmayı hızlandırır.",
    },
  ],
},

 {
  slug: "kredi-notu-nasil-yukseltilir-14-gun",
  title: "Kredi Notu Nasıl Yükseltilir? (14 Günlük Net Plan)",
  excerpt:
    "Kredi notu düşmüş olanlar için önce hasarı durdurmaya, ardından notu kademeli olarak toparlamaya yönelik 14 günlük uygulanabilir yol haritası.",
  category: "Kredi Notu",
  topicId: "kredi-notu",
  readingTime: "5 dk",
  date: "2026-01-02",
  icon: "score",
  content: [
    {
      type: "p",
      text: "Kredi notu kısa sürede mucizevi şekilde yükselmez. Ancak doğru adımlarla, özellikle ilk 14 gün içinde hasarın büyümesi durdurulabilir ve toparlanma süreci başlatılabilir. Aşağıdaki plan, bankaların değerlendirme mantığına göre hazırlanmıştır.",
    },

    { type: "h2", text: "1️⃣ Önce Hasarı Durdur (İlk 3–5 Gün)" },

    {
      type: "ul",
      items: [
        "Gecikmede olan kredi veya kredi kartı borçlarını mümkünse kapat, değilse yapılandır",
        "Kredi kartı limit kullanım oranını %30–40 bandına düşür",
        "Yeni kredi ve kredi kartı başvurularını tamamen durdur",
      ],
    },

    {
      type: "callout",
      title: "Önemli Uyarı",
      text: "Kredi notu panikle yapılan yeni başvurularla değil, düzenli ve kontrollü finansal davranışla toparlanır. Arka arkaya yapılan başvurular bankalar nezdinde risk sinyali oluşturur.",
    },

    { type: "h2", text: "2️⃣ Dengeli Ödeme Davranışı Oluştur (6–10. Gün)" },

    {
      type: "ul",
      items: [
        "Tüm aktif borçlarda en az asgari tutarların zamanında ödendiğinden emin ol",
        "Otomatik ödeme talimatlarını kontrol et ve aksayanları düzelt",
        "Hesap hareketlerini sadeleştir, gereksiz para giriş-çıkışlarını azalt",
      ],
    },

    {
      type: "callout",
      title: "Neden Önemli?",
      text: "Bankalar sadece borcun varlığına değil, ödeme düzenine bakar. Düzenli ödeme davranışı, kredi notu algoritmalarında pozitif sinyal üretir.",
    },

    { type: "h2", text: "3️⃣ Sabır ve İstikrar (11–14. Gün)" },

    {
      type: "ul",
      items: [
        "Yeni borç almadan mevcut düzeni koru",
        "Limit artırımı veya yeni ürün tekliflerini bu aşamada kabul etme",
        "Kredi notunu günlük değil, haftalık-periyodik kontrol et",
      ],
    },

    {
      type: "callout",
      title: "Gerçekçi Beklenti",
      text: "14 gün sonunda kredi notu her zaman ciddi bir artış göstermeyebilir; ancak düşüş durur ve toparlanma süreci başlar. Asıl fark 1–3 ay içinde netleşir.",
    },

    {
      type: "p",
      text: "Eğer kredi notun çok düşükse veya daha önce ciddi gecikmeler yaşandıysa, bireysel denemeler yerine profesyonel bir planlama ile ilerlemek çok daha sağlıklı sonuç verir.",
    },
  ],
},
//////////////////////////////////////////



 {
  slug: "kredi-notu-kac-olmali",
  title: "Kredi Notu Kaç Olmalı?",
  excerpt:
    "Kredi notunda tek bir ‘ideal sayı’ yok. Bankalar skorun kendisinden çok, seviyesini ve son aylardaki yönünü (trendini) birlikte değerlendirir.",
  category: "Kredi Notu",
  topicId: "kredi-notu",
  readingTime: "6 dk",
  date: "2026-01-03",
  coverImage: "/content/kredi-notu-kac-olmali.jpg",
  icon: "score",
  views: 0,
  content: [
    {
      type: "h2",
      text: "Kredi notu neden tek başına yeterli değil?",
    },
    {
      type: "p",
      text: "Kredi notu, bankalar için önemli bir referanstır ancak tek başına karar verdirici değildir. Aynı kredi notuna sahip iki kişinin başvuru sonucu farklı olabilir. Bunun nedeni; bankaların skoru, borç/gelir dengesi, ödeme alışkanlığı ve başvuru davranışıyla birlikte okumasıdır.",
    },

    {
      type: "h2",
      text: "Genel kredi notu aralıkları ne ifade eder?",
    },
    {
      type: "ul",
      items: [
        "0–699 → Çok riskli profil: gecikme veya yasal takip ihtimali yüksektir",
        "700–899 → Riskli / toparlanma aşaması: sınırlı ürünler mümkündür",
        "900–1099 → Orta seviye: bazı ürünlerde onay ihtimali başlar",
        "1100–1299 → İyi: kredi ve kart ürünlerinde seçenek artar",
        "1300 ve üzeri → Çok iyi: bankaların en rahat çalıştığı profil",
      ],
    },
    {
      type: "callout",
      title: "Yanlış beklenti",
      text: "‘Notum 1200, kesin kredi çıkar’ düşüncesi doğru değildir. Skor iyi olsa bile diğer sinyaller zayıfsa sonuç olumsuz olabilir.",
    },

    {
      type: "h2",
      text: "Bankalar skorun ‘yönüne’ (trendine) neden bakar?",
    },
    {
      type: "p",
      text: "Bankalar için skorun son aylarda artıyor mu, sabit mi, düşüyor mu olduğu çok kritiktir. Artış trendi, riskin azaldığını gösterir; düşüş trendi ise mevcut riskin devam ettiğine işaret eder.",
    },
    {
      type: "ul",
      items: [
        "850’den 950’ye çıkan skor → olumlu sinyal",
        "1150’de sabit kalan skor → nötr sinyal",
        "1250’den 1150’ye düşen skor → dikkat edilmesi gereken sinyal",
      ],
    },

    {
      type: "h2",
      text: "Aynı kredi notunda olup farklı sonuç alanlar neden var?",
    },
    {
      type: "p",
      text: "Çünkü bankalar her başvuruda kendi iç skorlamasını yapar. Bu skorlamada kredi notuna ek olarak; mevcut borçlar, kart limitleri, ödeme davranışı ve gelir bilgisi birlikte değerlendirilir.",
    },
    {
      type: "ul",
      items: [
        "Kart limitlerinin sürekli yüksek kullanımda olması",
        "Son aylarda yaşanan küçük gecikmeler",
        "Aynı dönemde çok sayıda kredi başvurusu",
        "Gelir bilgisinin güncel olmaması",
      ],
    },

    {
      type: "h2",
      text: "Kredi notu düşükse ama yükseliyorsa ne olur?",
    },
    {
      type: "p",
      text: "Düşük seviyede olsa bile yükseliş trendi olan kredi notu, bankalar için olumlu bir sinyaldir. Özellikle son 1–3 ayda düzenli ödeme ve dengeli kullanım varsa, bazı ürünlerde onay ihtimali doğabilir.",
    },
    {
      type: "callout",
      title: "Gerçekçi bakış",
      text: "Bankalar ‘nereden geldiğine’ ve ‘nereye gittiğine’ bakar. Başlangıç noktası kadar yön de önemlidir.",
    },

    {
      type: "h2",
      text: "Kredi notunu yorumlarken kendine sor",
    },
    {
      type: "ul",
      items: [
        "Son 3 ayda skor artıyor mu, düşüyor mu?",
        "Kart kullanım oranım dengeli mi?",
        "Son dönemde gecikme yaşadım mı?",
        "Aynı ay içinde birden fazla başvuru yaptım mı?",
        "Gelirim bankalarda güncel mi?",
      ],
    },

    {
      type: "h2",
      text: "Peki ‘ideal’ kredi notu var mı?",
    },
    {
      type: "p",
      text: "Tek bir ideal sayı yoktur. Çoğu bankada 1100–1200 bandı, doğru davranışlarla birlikte değerlendirildiğinde yeterli kabul edilir. Daha yüksek skorlar seçenekleri artırır ama tek başına garanti vermez.",
    },

    {
      type: "callout",
      title: "Özet",
      text: "Kredi notunda önemli olan sadece ‘kaç’ olduğu değil; seviyesi, son aylardaki yönü ve bu skorun hangi davranışlarla oluştuğudur. Artan ve istikrarlı bir profil, bankalar için en güçlü sinyaldir.",
    },
  ],
},
/////////////////////////////////////

  {
  slug: "findeks-kredi-notu-nedir",
  title: "Findeks Kredi Notu Nedir?",
  excerpt:
    "Findeks kredi notu neyi gösterir, bankaların kendi iç skorlarıyla ilişkisi nedir ve bu skor nasıl doğru yorumlanmalıdır?",
  category: "Bilgilendirme",
  topicId: "kredi-notu",
  readingTime: "6 dk",
  date: "2026-01-03",
  coverImage: "/content/findeks-kredi-notu-nedir.jpg",
  icon: "info",
  views: 0,
  content: [
    {
      type: "h2",
      text: "Findeks kredi notu nedir?",
    },
    {
      type: "p",
      text: "Findeks kredi notu, bireylerin bankalarla olan kredi ve ödeme geçmişinin sayısal bir özetidir. Ödeme düzeni, kredi kartı kullanımı, borç durumu ve başvuru davranışları bu skorun oluşmasında birlikte rol oynar.",
    },

    {
      type: "h2",
      text: "Findeks ne işe yarar?",
    },
    {
      type: "p",
      text: "Findeks, kredi geçmişini görünür kılar. Bankalar başvurularda bu skoru referans olarak kullanır; ancak karar sadece Findeks skoruna bakılarak verilmez.",
    },
    {
      type: "ul",
      items: [
        "Kredi geçmişinin genel fotoğrafını sunar",
        "Risk seviyesini hızlıca anlamaya yardımcı olur",
        "Başvuru öncesi kendini kontrol etmeni sağlar",
      ],
    },

    {
      type: "h2",
      text: "Findeks skoru ile bankaların iç skoru aynı mı?",
    },
    {
      type: "p",
      text: "Hayır, birebir aynı değildir. Findeks skoru herkes için ortak bir referansken; bankalar kendi iç skorlarını, kendi risk politikalarına göre ayrıca hesaplar.",
    },
    {
      type: "ul",
      items: [
        "Findeks → genel ve ortak skor",
        "Banka iç skoru → bankaya özel değerlendirme",
        "Aynı Findeks skoruyla farklı bankalardan farklı sonuçlar alınabilir",
      ],
    },
    {
      type: "callout",
      title: "Kritik gerçek",
      text: "Findeks skoru iyi olsa bile, bankanın iç skorunda olumsuz bir sinyal varsa başvuru reddedilebilir.",
    },

    {
      type: "h2",
      text: "Bankalar Findeks skorunu nasıl kullanır?",
    },
    {
      type: "p",
      text: "Findeks skoru bankalar için bir başlangıç noktasıdır. Asıl karar; bu skorun son aylardaki yönü ve başvuru sahibinin mevcut finansal durumu ile birlikte verilir.",
    },
    {
      type: "ul",
      items: [
        "Skor artıyorsa → olumlu sinyal",
        "Skor sabitse → nötr sinyal",
        "Skor düşüyorsa → dikkat edilmesi gereken durum",
      ],
    },

    {
      type: "h2",
      text: "Findeks kredi notu kaç olmalı?",
    },
    {
      type: "p",
      text: "Tek bir ‘ideal’ Findeks skoru yoktur. Çoğu bankada orta–iyi seviyeler, doğru davranışlarla birlikte değerlendirildiğinde yeterli kabul edilebilir.",
    },
    {
      type: "ul",
      items: [
        "Düşük skor → riskli profil",
        "Orta seviye skor → sınırlı ama mümkün ürünler",
        "Yüksek skor → daha fazla seçenek",
      ],
    },

    {
      type: "h2",
      text: "Findeks skoru neden beklenenden düşük olabilir?",
    },
    {
      type: "ul",
      items: [
        "Geçmişte yaşanan gecikmeler",
        "Kredi kartı limitlerinin sürekli yüksek kullanımı",
        "Sık ve plansız kredi başvuruları",
        "Borç/gelir dengesinin bozulması",
      ],
    },

    {
      type: "h2",
      text: "Findeks skorunu yükseltmek için ne yapılmalı?",
    },
    {
      type: "p",
      text: "Skoru kalıcı olarak yükseltmenin yolu, kısa vadeli hamlelerden değil; düzenli ve planlı davranıştan geçer.",
    },
    {
      type: "ul",
      items: [
        "Ödemeleri zamanında yapmak",
        "Kart kullanım oranını dengede tutmak",
        "Başvuruları planlı ve aralıklı yapmak",
        "Borç/gelir dengesini korumak",
      ],
    },
    {
      type: "callout",
      title: "Not",
      text: "Skoru tek başına kovalamak yerine, davranış sinyallerini düzeltmek uzun vadede daha güçlü etki yaratır.",
    },

    {
      type: "h2",
      text: "Findeks skorunu doğru yorumlamak için kendine sor",
    },
    {
      type: "ul",
      items: [
        "Son 1–3 ayda skor artıyor mu?",
        "Kart limitlerini nasıl kullanıyorum?",
        "Son dönemde gecikme yaşadım mı?",
        "Aynı ay içinde birden fazla başvuru yaptım mı?",
      ],
    },

    {
      type: "callout",
      title: "Özet",
      text: "Findeks kredi notu, bankalar için güçlü bir referanstır ama tek başına karar verdirmez. Asıl belirleyici olan; bu skorun son aylardaki yönü ve finansal davranışlarının tutarlılığıdır.",
    },
  ],
},
//////////////////////////////////////////////
  {
  slug: "kredi-notu-ne-kadar-surede-toparlanir",
  title: "Kredi Notu Ne Kadar Sürede Toparlanır? (Gerçekçi Zaman Çizelgesi)",
  excerpt:
    "Kredi notunun toparlanma süresi; gecikmenin türü, limit kullanım oranı ve başvuru disiplinine göre değişir. İşte bankaların baktığı gerçek zaman çerçevesi.",
  category: "Kredi Notu",
  topicId: "kredi-notu",
  readingTime: "4 dk",
  date: "2026-01-02",
  icon: "score",
  content: [
    {
      type: "p",
      text: "Kredi notu düşen birçok kişi aynı soruyu sorar: “Ne kadar sürede düzelir?” Bu sorunun tek bir cevabı yoktur. Çünkü bankalar kredi notunu hesaplarken davranış geçmişine ve son dönemdeki finansal disipline birlikte bakar.",
    },

    { type: "h2", text: "Kredi Notu Toparlanma Süresini Belirleyen 3 Ana Faktör" },

    {
      type: "ul",
      items: [
        "Yaşanan gecikmenin tipi ve süresi (1–30 gün mü, daha uzun mu?)",
        "Kredi kartı ve kredi limitlerinin ne kadarının kullanıldığı",
        "Son dönemde yapılan kredi ve kredi kartı başvuru sayısı",
      ],
    },

    {
      type: "h2",
      text: "Ortalama Toparlanma Süreleri (Genel Çerçeve)",
    },

    {
      type: "ul",
      items: [
        "Hafif gecikmeler ve yüksek limit kullanımı: 1–2 ay",
        "Birden fazla gecikme ve düzensiz ödeme geçmişi: 3–6 ay",
        "Uzun süreli gecikmeler ve yoğun başvuru geçmişi: 6 ay ve üzeri",
      ],
    },

    {
      type: "callout",
      title: "İpucu",
      text: "İlk 3–6 hafta içinde ödeme ve başvuru davranışındaki düzelme bankalara pozitif sinyal verir. Ancak kredi notunun kalıcı şekilde yükselmesi için bu disiplinin devam etmesi gerekir.",
    },

    {
      type: "h2",
      text: "Neden Bazı Kişilerde Daha Uzun Sürer?",
    },

    {
      type: "ul",
      items: [
        "Gecikmeler kapatılmadan sadece yeni kredi arayışına girilmesi",
        "Limitlerin sürekli yüksek seviyede kullanılması",
        "Kısa sürede çok sayıda başvuru yapılması",
      ],
    },

    {
      type: "p",
      text: "Kredi notu toparlanma sürecinde yapılan en büyük hata, sonucu hızlandırmak için yeni kredi veya kart başvurusu yapmaktır. Bu durum çoğu zaman süreci uzatır.",
    },

    {
      type: "callout",
      title: "Gerçekçi Beklenti",
      text: "Kredi notu bir günde ya da birkaç haftada tamamen düzelmez. Ancak doğru adımlarla düşüş durdurulur ve bankaların tekrar güvenmeye başlayacağı bir zemin oluşturulur.",
    },
  ],
}
,
//////////////////////////////////////////////////
 {
  slug: "kredi-notu-sorgulama-sikligi-zararli-mi",
  title: "Kredi Notu Sorgulama Sıklığı Zararlı mı?",
  excerpt:
    "Kredi notu sorgulamak ile kredi başvurusu aynı şey değildir. Zararlı olan sorgulama değil, plansız ve sık başvurudur.",
  category: "Bilgilendirme",
  topicId: "kredi-notu",
  readingTime: "6 dk",
  date: "2026-01-03",
  coverImage: "/content/kredi-notu-sorgulama-sikligi-zararli-mi.jpg",
  icon: "info",
  views: 0,
  content: [
    {
      type: "h2",
      text: "Kredi notu sorgulamak ne anlama gelir?",
    },
    {
      type: "p",
      text: "Kredi notu sorgulamak; kredi geçmişini ve mevcut skorunu görüntülemektir. Bu işlem, finansal durumunu kontrol etmek amacıyla yapılır ve tek başına kredi notunu düşürmez.",
    },

    {
      type: "h2",
      text: "Sorgulama ile kredi başvurusu arasındaki fark",
    },
    {
      type: "p",
      text: "En sık karıştırılan konu budur. Kredi notu sorgulaması ile kredi başvurusu sistemde farklı şekilde görünür ve bankalar bu iki işlemi ayrı ayrı değerlendirir.",
    },
    {
      type: "ul",
      items: [
        "Sorgulama → Bilgi amaçlıdır, risk sinyali üretmez",
        "Başvuru → Kredi talebidir, bankaların risk değerlendirmesine girer",
        "Başvuru sayısı → Bankalar tarafından ‘başvuru izi’ olarak görülür",
      ],
    },
    {
      type: "callout",
      title: "Net ayrım",
      text: "Notu görmek zarar vermez; kredi istemek sistemde iz bırakır.",
    },

    {
      type: "h2",
      text: "Bankalar ‘başvuru izini’ nasıl görür?",
    },
    {
      type: "p",
      text: "Bankalar, kısa süre içinde yapılan kredi ve kart başvurularını birlikte değerlendirir. Aynı ay içinde çok sayıda başvuru yapılması, ‘acil nakit ihtiyacı’ sinyali olarak algılanabilir.",
    },
    {
      type: "ul",
      items: [
        "Aynı ay içinde çoklu kredi başvuruları",
        "Red alındıktan hemen sonra yapılan yeni başvurular",
        "Profil ile uyumsuz ürün denemeleri",
      ],
    },

    {
      type: "h2",
      text: "Kredi notu sorgulama sıklığı gerçekten zararlı mı?",
    },
    {
      type: "p",
      text: "Hayır. Kredi notunu düzenli aralıklarla kontrol etmek kredi notunu düşürmez. Aksine, finansal durumu takip etmeyi sağlar. Zararlı olan; sorgulama değil, sorgulama sonrası plansız başvurudur.",
    },
    {
      type: "callout",
      title: "Yaygın yanlış inanış",
      text: "‘Notuma baktım, düştü’ düşüncesi çoğu zaman aynı dönemde yapılan başvurularla karıştırılır.",
    },

    {
      type: "h2",
      text: "Ne sıklıkla kontrol etmek mantıklıdır?",
    },
    {
      type: "p",
      text: "Kredi notu genellikle aylık güncellendiği için, çok sık bakmak yerine belirli aralıklarla kontrol etmek yeterlidir.",
    },
    {
      type: "ul",
      items: [
        "Ayda 1 kez → genel takip için yeterli",
        "Ödeme sonrası → etkisini görmek için mantıklı",
        "Başvuru öncesi → durum analizi için faydalı",
      ],
    },

    {
      type: "h2",
      text: "Başvuru yapmadan önce doğru sıra ne olmalı?",
    },
    {
      type: "ul",
      items: [
        "Ön analiz yap: gelir, borç ve kullanım oranlarını kontrol et",
        "Kredi notunu görüntüle ve trendi değerlendir",
        "Uygun ürünü seç",
        "Tek bankayla başla → sonucu gör → sonra gerekirse genişlet",
      ],
    },
    {
      type: "callout",
      title: "Altın kural",
      text: "Notu takip etmek serbesttir; başvuruyu planlamak şarttır.",
    },

    {
      type: "h2",
      text: "Kendin hızlı kontrol et",
    },
    {
      type: "ul",
      items: [
        "Son 30 günde kaç kredi başvurusu yaptım?",
        "Red aldıktan sonra hemen yeni başvuru yaptım mı?",
        "Başvurduğum ürün gelir ve profilime uygun muydu?",
      ],
    },

    {
      type: "callout",
      title: "Özet",
      text: "Kredi notu sorgulama sıklığı zararlı değildir. Risk yaratan şey; kısa sürede çok sayıda kredi başvurusu yapmak ve bunu plansız şekilde tekrarlamaktır.",
    },
  ],
},
////////////////////////////////////////////

  // --- Limit / kredi limiti ---
 {
  slug: "kredi-limiti-nedir-nasil-belirlenir",
  title: "Kredi Limiti Nedir, Nasıl Belirlenir? (Bankaların Gerçek Mantığı)",
  excerpt:
    "Kredi limiti bankalar tarafından rastgele verilmez. Gelir, mevcut borçlar, ödeme düzeni ve kredi notu trendine göre hesaplanır. İşte limitin nasıl belirlendiği.",
  category: "Limit",
  topicId: "kredi-limiti",
  readingTime: "4 dk",
  date: "2026-01-02",
  icon: "limit",
  content: [
    {
      type: "p",
      text: "Kredi limiti; bankanın size ‘ne kadar borç verebileceğini’ değil, ‘ne kadar borcu güvenli şekilde taşıyabileceğinizi’ düşündüğü tutarı ifade eder. Bu nedenle limit belirlenirken sadece gelir değil, davranışsal veriler de dikkate alınır.",
    },

    { type: "h2", text: "Kredi Limiti Belirlenirken Bankalar Neye Bakar?" },

    {
      type: "ul",
      items: [
        "Belgelendirilebilir aylık gelir",
        "Mevcut kredi ve kredi kartı borçları",
        "Ödeme geçmişinin düzenli olup olmadığı",
        "Kredi notunun mevcut seviyesi ve son dönem trendi",
      ],
    },

    {
      type: "h2",
      text: "Gelir Tek Başına Yeterli mi?",
    },

    {
      type: "p",
      text: "Hayır. Yüksek gelir tek başına yüksek limit anlamına gelmez. Eğer mevcut borçlar gelire oranla yüksekse veya geçmişte düzensiz ödemeler varsa, banka limiti sınırlı tutar.",
    },

    {
      type: "h2",
      text: "Limit Neden Zamanla Artar ya da Azalır?",
    },

    {
      type: "ul",
      items: [
        "Limitin uzun süre düşük oranlarda kullanılması",
        "Borçların düzenli ve zamanında ödenmesi",
        "Gelirin resmi olarak güncellenmesi",
        "Yeni başvuruların kontrollü yapılması",
      ],
    },

    {
      type: "callout",
      title: "İpucu",
      text: "Gelir bilgisinin güncel olması ve kredi kartı limitinin %30–40 bandında kullanılması, bankalar açısından en güçlü limit artış sinyallerinden biridir.",
    },

    {
      type: "h2",
      text: "Sık Yapılan Hata",
    },

    {
      type: "p",
      text: "Birçok kişi limit artırmak için arka arkaya başvuru yapar. Oysa bu durum bankaların risk algısını artırır ve limiti desteklemek yerine baskılar.",
    },

    {
      type: "callout",
      title: "Gerçekçi Çerçeve",
      text: "Kredi limiti bir talep değil, bankanın güven sonucudur. Güven davranışla oluşur; başvuruyla değil.",
    },
  ],
},
/////////////////////////

 {
  slug: "limit-artirma-talebi-ne-zaman-yapilir",
  title: "Limit Artırma Talebi Ne Zaman Yapılır?",
  excerpt:
    "Limit artırımı için ‘istemek’ yetmez; doğru zamanlama ve doğru sinyaller gerekir. Bankaların baktığı işaretler ve yanlış zamanlama örnekleri.",
  category: "Limit",
  topicId: "kredi-limiti",
  readingTime: "6 dk",
  date: "2026-01-03",
  coverImage: "/content/limit-artirma-talebi-ne-zaman-yapilir.jpg",
  icon: "limit",
  views: 0,
  content: [
    {
      type: "h2",
      text: "Limit artırımı neden zamanlamaya bağlıdır?",
    },
    {
      type: "p",
      text: "Limit artırımı, bankanın sana olan güvenini artırmasıyla ilgilidir. Bankalar bu kararı verirken sadece mevcut kredi notuna değil; son dönemdeki davranışlara, gelir durumuna ve kullanım alışkanlığına birlikte bakar. Doğru zamanda yapılan talep olumlu sonuçlanabilirken, yanlış zamanda yapılan talep süreci uzatabilir.",
    },

    {
      type: "h2",
      text: "Limit artırımı için en doğru zamanlar",
    },
    {
      type: "ul",
      items: [
        "Gelir bilgisini bankada güncelledikten sonra",
        "En az 1–2 ay gecikmesiz ödeme geçmişi oluştuğunda",
        "Kredi kartı kullanım oranı düşmüşken (tercihen %30–40 bandı)",
        "Son dönemde yeni kredi veya kart başvurusu yokken",
      ],
    },
    {
      type: "callout",
      title: "Altın kural",
      text: "Önce dosyayı güçlendir, sonra limit iste.",
    },

    {
      type: "h2",
      text: "Bankalar limit artışı talebinde neye bakar?",
    },
    {
      type: "p",
      text: "Bankalar limit artışı taleplerini otomatik ve manuel kontrollerle değerlendirir. Bu değerlendirmede birkaç temel sinyal öne çıkar.",
    },
    {
      type: "ul",
      items: [
        "Son aylardaki ödeme düzeni (gecikme var mı?)",
        "Kredi kartı ve kredi borçlarının genel durumu",
        "Mevcut limitlerin nasıl kullanıldığı",
        "Gelir/borç dengesi",
        "Son dönemdeki başvuru sayısı",
      ],
    },

    {
      type: "h2",
      text: "Yanlış zamanlama örnekleri",
    },
    {
      type: "p",
      text: "Limit artırımı çoğu zaman yanlış anda istendiği için reddedilir. Bu reddin nedeni genellikle limit ihtiyacı değil, zamanlama hatasıdır.",
    },
    {
      type: "ul",
      items: [
        "Gecikme varken limit artırımı istemek",
        "Gelir bilgisi güncel değilken talep oluşturmak",
        "Kart limiti zaten tavandayken artış beklemek",
        "Aynı dönemde kredi başvuruları yaparken limit talep etmek",
      ],
    },
    {
      type: "callout",
      title: "Dikkat",
      text: "Sık talep ve sık başvuru, bankanın gözünde ‘risk sinyali’ üretebilir.",
    },

    {
      type: "h2",
      text: "Limit artışı talebini ne sıklıkla yapmak mantıklıdır?",
    },
    {
      type: "p",
      text: "Limit artışı taleplerini kısa aralıklarla tekrarlamak genellikle işe yaramaz. Bankalar davranış değişimini görmek ister; bu da zamana yayılır.",
    },
    {
      type: "ul",
      items: [
        "Reddedildiyse hemen tekrar denememek",
        "En az 1–2 ay davranışı sabitlemek",
        "Bu sürede kullanım oranını ve ödeme düzenini korumak",
      ],
    },

    {
      type: "h2",
      text: "Limit artışı öncesi kendin hızlı kontrol et",
    },
    {
      type: "ul",
      items: [
        "Gelir bilgim bankada güncel mi?",
        "Son 30–60 günde gecikmem oldu mu?",
        "Kart limitlerimi dengeli kullanıyor muyum?",
        "Son dönemde başka kredi veya kart başvurusu yaptım mı?",
      ],
    },

    {
      type: "h2",
      text: "Limit artışı reddedilirse ne yapmalı?",
    },
    {
      type: "p",
      text: "Red, kalıcı bir durum değildir. Genellikle bankanın ‘henüz erken’ demesidir. Bu durumda yapılması gereken; dosyayı güçlendirmeye devam etmek ve aynı hataları tekrarlamamaktır.",
    },
    {
      type: "ul",
      items: [
        "Gecikme varsa tamamen bitirmek",
        "Kullanım oranını düşürmek",
        "Gelir bilgisini belgelemek",
        "Bir süre yeni talep ve başvurulardan kaçınmak",
      ],
    },

    {
      type: "callout",
      title: "Özet",
      text: "Limit artırımı doğru zamanda istendiğinde anlamlı sonuç verir. Doğru sıra: gelir güncelle → gecikmesiz dönem oluştur → kullanım oranını düşür → sonra limit artışı talep et.",
    },
  ],
},
/////////////
 {
  slug: "kredi-karti-limiti-nasil-artirilir",
  title: "Kredi Kartı Limiti Nasıl Artırılır? (Bankaların Dikkat Ettiği Sinyaller)",
  excerpt:
    "Kredi kartı limiti artışı, sadece talep etmekle olmaz. Bankaların dikkate aldığı güçlü sinyaller ve kaçınılması gereken hatalar bu rehberde.",
  category: "Limit",
  topicId: "kredi-limiti",
  readingTime: "4 dk",
  date: "2026-01-02",
  icon: "limit",
  content: [
    {
      type: "p",
      text: "Kredi kartı limiti artırımı, bankanın size olan güveninin artmasıyla gerçekleşir. Bu güven; ödeme alışkanlığı, kullanım oranı ve gelir–borç dengesi gibi veriler üzerinden ölçülür.",
    },

    { type: "h2", text: "Kredi Kartı Limiti Artışında Güçlü Sinyaller" },

    {
      type: "ul",
      items: [
        "Kredi kartı borçlarının düzenli ve gecikmesiz ödenmesi",
        "Limit kullanım oranının %30–40 seviyelerinde tutulması",
        "Gelir bilgisinin banka nezdinde güncel olması",
        "Toplam borcun gelire oranla dengeli görünmesi",
      ],
    },

    {
      type: "h2",
      text: "Limit Artışı Neden Reddedilir?",
    },

    {
      type: "ul",
      items: [
        "Kart limitinin uzun süre %80–100 oranında kullanılması",
        "Son dönemde sık yapılan kredi veya kart başvuruları",
        "Gelir bilgisinin eski veya belgesiz olması",
        "Mevcut borç yükünün yüksek görünmesi",
      ],
    },

    {
      type: "callout",
      title: "Öneri",
      text: "Limit artırımı talebinden önce kullanım oranını düşürmek ve birkaç ay düzenli ödeme davranışı göstermek, talebin kabul edilme ihtimalini ciddi şekilde artırır.",
    },

    {
      type: "h2",
      text: "Ne Zaman Talep Etmek Daha Sağlıklı?",
    },

    {
      type: "p",
      text: "Kredi kartı limiti artışı için en uygun zaman; borçların kontrollü olduğu, yeni başvuruların yapılmadığı ve gelir bilgisinin güncel olduğu dönemdir. Bankalar bu tabloyu düşük risk olarak değerlendirir.",
    },

    {
      type: "callout",
      title: "Gerçekçi Çerçeve",
      text: "Limit artışı bir hak değil, bankanın risk algısının sonucudur. Önce davranış düzelir, sonra limit artar.",
    },
  ],
}
,
//////////////////////////////////

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
,
////////////////////////
  {
  slug: "limit-kullanimi-yuzde-kac-olmali",
  title: "Limit Kullanımı %Kaç Olmalı?",
  excerpt:
    "Kredi notu ve bankaların iç skorları için ideal limit kullanım oranı nedir, hangi oranlar riskli görülür?",
  category: "Limit",
  topicId: "kredi-limiti",
  readingTime: "3 dk",
  date: "2026-01-02",
  icon: "limit",
  content: [
    {
      type: "p",
      text: "Limit kullanım oranı, bankaların risk değerlendirmesinde en hızlı sinyal veren göstergelerden biridir. Aynı gelire sahip iki kişiden biri düşük, diğeri yüksek kullanım oranına sahipse banka algısı tamamen değişir.",
    },

    { type: "h2", text: "Pratik ve Güvenli Hedef" },

    {
      type: "ul",
      items: [
        "%30–40 bandı genelde en sağlıklı aralık olarak kabul edilir",
        "Limitin sürekli %80–100 kullanılması risk sinyali oluşturur",
        "Düzenli ödeme + düşük kullanım oranı güçlü bir güven göstergesidir",
      ],
    },

    {
      type: "h2",
      text: "Neden Tavan Kullanım Risklidir?",
    },

    {
      type: "p",
      text: "Limitin sürekli tavana yakın kullanılması, bankalar tarafından ‘nakit akışı baskı altında’ şeklinde yorumlanır. Ödemeler zamanında yapılsa bile bu tablo iç skoru zayıflatabilir.",
    },

    {
      type: "callout",
      title: "Not",
      text: "Sadece oranı düşürmek yeterli değildir. Düzenli ödeme yoksa, düşük kullanım oranı tek başına kredi notunu kurtarmaz.",
    },
  ],
}
,
/////////////////////////////
 {
  slug: "limit-artisi-reddedilirse-ne-yapmali",
  title: "Limit Artışı Reddedilirse Ne Yapmalı?",
  excerpt:
    "Limit artışı reddedildikten sonra yapılması gereken doğru adımlar ve yeniden başvuru için ideal zamanlama.",
  category: "Limit",
  topicId: "kredi-limiti",
  readingTime: "4 dk",
  date: "2026-01-02",
  icon: "limit",
  content: [
    {
      type: "p",
      text: "Limit artışı reddi çoğu zaman kişisel bir karar değil, bankanın risk değerlendirmesinin sonucudur. Bu nedenle tekrar denemeden önce tabloyu iyileştirmek gerekir.",
    },

    { type: "h2", text: "Ret Sonrası İzlenecek 3 Net Adım" },

    {
      type: "ul",
      items: [
        "Banka nezdindeki gelir bilgisini güncelle",
        "Kredi kartı ve kredi limit kullanım oranını düşür",
        "1–2 ay boyunca düzenli ödeme davranışı sergile",
      ],
    },

    {
      type: "h2",
      text: "Yapılmaması Gereken Hata",
    },

    {
      type: "p",
      text: "Aynı gün veya kısa aralıklarla tekrar tekrar limit artışı denemek, bankaların iç skorunda olumsuz etki yaratır ve süreci uzatır.",
    },

    {
      type: "callout",
      title: "Öneri",
      text: "Ret sonrası acele etme. Önce sinyalleri güçlendir, sonra planlı şekilde tekrar talep et.",
    },
  ],
}
,

  // --- Başvuru süreci ---
  {
  slug: "bankalar-kredi-verirken-neye-bakar",
  title: "Bankalar Kredi Verirken Neye Bakar?",
  excerpt:
    "Bankaların kredi kararında baktığı temel sinyaller: gelir/borç oranı, ödeme geçmişi, limit kullanımı ve başvuru davranışı.",
  category: "Bilgilendirme",
  topicId: "kredi-basvurusu",
  readingTime: "6 dk",
  date: "2026-01-03",
  coverImage: "/content/bankalar-kredi-verirken-neye-bakar.jpg",
  icon: "info",
  views: 0,
  content: [
    {
      type: "h2",
      text: "Kredi kararı tek bir kritere göre verilmez",
    },
    {
      type: "p",
      text: "Bankalar kredi verirken tek bir sayıya ya da belgeye bakmaz. Karar; birden fazla sinyalin birlikte değerlendirilmesiyle oluşur. Aynı kredi notuna sahip iki kişinin farklı sonuç almasının nedeni de budur.",
    },

    {
      type: "h2",
      text: "Bankaların baktığı en kritik 5 sinyal",
    },
    {
      type: "ul",
      items: [
        "Gelir / borç oranı (taksit yükü gelire uygun mu?)",
        "Ödeme geçmişi (gecikme var mı, ne sıklıkta?)",
        "Kredi kartı limit kullanım oranı",
        "Son dönemdeki kredi başvuru sıklığı",
        "Gelir istikrarı (düzenli ve belgelenebilir mi?)",
      ],
    },

    {
      type: "h2",
      text: "1) Gelir / borç oranı neden bu kadar önemli?",
    },
    {
      type: "p",
      text: "Bankalar için en temel soru şudur: Bu kişi mevcut borçlarına ek olarak yeni taksiti sürdürebilir mi? Gelire göre yüksek taksit yükü, kredi notu iyi olsa bile riski artırır.",
    },

    {
      type: "h2",
      text: "2) Gecikme geçmişi bankalara ne söyler?",
    },
    {
      type: "p",
      text: "Gecikme, bankalar için en güçlü olumsuz sinyaldir. Özellikle son aylarda yaşanan gecikmeler, dosyanın zayıflamasına neden olur.",
    },

    {
      type: "h2",
      text: "3) Limit kullanımı neden izlenir?",
    },
    {
      type: "p",
      text: "Kart limitlerinin sürekli yüksek kullanılması, nakit akışının zorlandığı izlenimi yaratabilir. Dengeli kullanım ise kontrol sinyali üretir.",
    },

    {
      type: "h2",
      text: "4) Başvuru sıklığı neden risk sinyali üretir?",
    },
    {
      type: "p",
      text: "Kısa sürede yapılan çok sayıda başvuru, bankalar tarafından ‘acil nakit ihtiyacı’ olarak algılanabilir ve dosyayı baskılar.",
    },

    {
      type: "h2",
      text: "5) Gelir istikrarı neden önemlidir?",
    },
    {
      type: "p",
      text: "Sabit ve belgelenebilir gelir, bankanın riski daha rahat yönetmesini sağlar. Gelir dalgalıysa veya belgelenemiyorsa değerlendirme zorlaşır.",
    },

    {
      type: "callout",
      title: "İpucu",
      text: "Ön analiz yap → tek bankayla başla → sonucu gör → sonra planlı genişlet.",
    },
  ],
},

 {
  slug: "kredi-basvurusu-neden-reddedilir",
  title: "Kredi Başvurusu Neden Reddedilir?",
  excerpt:
    "Kredi başvurularında en sık görülen red sebepleri ve gerçekten düzeltilebilir noktalar.",
  category: "Başvuru Süreci",
  topicId: "kredi-basvurusu",
  readingTime: "6 dk",
  date: "2026-01-03",
  coverImage: "/content/kredi-basvurusu-neden-reddedilir.jpg",
  icon: "flow",
  views: 0,
  content: [
    {
      type: "h2",
      text: "Red kararı ne anlama gelir?",
    },
    {
      type: "p",
      text: "Bir kredi başvurusunun reddedilmesi, sistemin seni tamamen dışladığı anlamına gelmez. Çoğu red, dosyanın o an için yeterince güçlü olmadığına işaret eder.",
    },

    {
      type: "h2",
      text: "En sık kredi reddi sebepleri",
    },
    {
      type: "ul",
      items: [
        "Gelire göre yüksek borç ve taksit yükü",
        "Gecikme veya olumsuz kayıtlar",
        "Kısa sürede yapılan çoklu başvurular",
        "Eksik veya doğrulanamayan evrak",
        "Profil ile uyumsuz ürün seçimi",
      ],
    },

    {
      type: "h2",
      text: "Red sonrası yapılan en büyük hata",
    },
    {
      type: "p",
      text: "Red alındıktan hemen sonra başka bankalara başvurmak, dosyayı daha da zayıflatabilir. Sistem bu davranışı riskli olarak algılar.",
    },

    {
      type: "h2",
      text: "Red aldıysan ne yapmalısın?",
    },
    {
      type: "ul",
      items: [
        "Başvuruları durdur ve sistemi sakinleştir",
        "Gecikme varsa tamamen bitir",
        "Kullanım oranlarını düşür",
        "Gelir bilgisini güncelle",
      ],
    },

    {
      type: "callout",
      title: "Hızlı çözüm",
      text: "Önce dosyayı güçlendir → sonra başvuruyu sadeleştir.",
    },
  ],
},

{
  slug: "kredi-basvurusu-kac-gunde-sonuclanir",
  title: "Kredi Başvurusu Kaç Günde Sonuçlanır?",
  excerpt:
    "Kredi başvurularının online ve şube kanallarında sonuçlanma süresini etkileyen faktörler.",
  category: "Başvuru Süreci",
  topicId: "kredi-basvurusu",
  readingTime: "5 dk",
  date: "2026-01-03",
  coverImage: "/content/kredi-basvurusu-kac-gunde-sonuclanir.jpg",
  icon: "flow",
  views: 0,
  content: [
    {
      type: "h2",
      text: "Kredi başvuruları ne kadar sürede sonuçlanır?",
    },
    {
      type: "p",
      text: "Bazı başvurular dakikalar içinde sonuçlanırken, bazıları birkaç gün sürebilir. Süre; başvuru kanalı, evrak durumu ve gelir doğrulamasına bağlıdır.",
    },

    {
      type: "h2",
      text: "Süreyi uzatan en yaygın faktörler",
    },
    {
      type: "ul",
      items: [
        "Eksik veya sonradan yüklenen evraklar",
        "Gelir doğrulamasının gecikmesi",
        "Aynı gün içinde yapılan çoklu başvurular",
        "Profil ile uyumsuz ürün seçimi",
      ],
    },

    {
      type: "h2",
      text: "Süreci hızlandırmak için ne yapılabilir?",
    },
    {
      type: "ul",
      items: [
        "Evrakı başvuru öncesinde hazırla",
        "Tek kanal ve tek bankayla ilerle",
        "Profiline uygun ürün seç",
      ],
    },

    {
      type: "callout",
      title: "İpucu",
      text: "Evrakı tamamla, tek kanaldan ilerle: hız kazanırsın.",
    },
  ],
},
{
  slug: "ayni-anda-kac-bankaya-basvuru-yapilmali",
  title: "Aynı Anda Kaç Bankaya Başvuru Yapılmalı?",
  excerpt:
    "Çoklu kredi başvurularının riskleri ve en güvenli başvuru sırası.",
  category: "Başvuru Süreci",
  topicId: "kredi-basvurusu",
  readingTime: "6 dk",
  date: "2026-01-03",
  coverImage: "/content/ayni-anda-kac-bankaya-basvuru-yapilmali.jpg",
  icon: "flow",
  views: 0,
  content: [
    {
      type: "h2",
      text: "Neden aynı anda çok başvuru risklidir?",
    },
    {
      type: "p",
      text: "Kısa sürede yapılan çok sayıda kredi başvurusu, bankalara ‘acil nakit ihtiyacı’ sinyali verir. Bu durum kredi notunu ve başvuru sonucunu olumsuz etkileyebilir.",
    },

    {
      type: "h2",
      text: "Bankalar çoklu başvuruyu nasıl görür?",
    },
    {
      type: "ul",
      items: [
        "Riskli davranış olarak işaretleyebilir",
        "Dosyayı daha sıkı incelemeye alabilir",
        "Red ihtimalini artırabilir",
      ],
    },

    {
      type: "h2",
      text: "En güvenli başvuru sırası",
    },
    {
      type: "ul",
      items: [
        "1 bankayla başla",
        "Sonucu gör (onay / red / ek evrak)",
        "Gerekirse planlı şekilde ikinci bankaya geç",
      ],
    },

    {
      type: "callout",
      title: "Standart yaklaşım",
      text: "1 → sonuç → karar → sonra genişlet. Aynı gün çoklu başvuru çoğu zaman zarar verir.",
    },
  ],
},

///////////////////////////////////////////////


 {
  slug: "online-kredi-basvurusu-nasil-yapilir",
  title: "Online Kredi Başvurusu Nasıl Yapılır?",
  excerpt:
    "Online kredi başvurularında doğru ürün seçimi, evrak disiplini ve ret riskini azaltan pratik adımlar.",
  category: "Başvuru Süreci",
  topicId: "kredi-basvurusu",
  readingTime: "6 dk",
  date: "2026-01-03",
  coverImage: "/content/online-kredi-basvurusu.jpg",
  icon: "flow",
  views: 0,
  content: [
    {
      type: "h2",
      text: "Online kredi başvurusu gerçekten avantajlı mı?",
    },
    {
      type: "p",
      text: "Online kredi başvuruları hız ve pratiklik sağlar; ancak yanlış yapıldığında red riskini de artırabilir. Başarılı bir online başvurunun anahtarı, bankaya doğru sinyalleri doğru sırayla vermektir.",
    },

    {
      type: "h2",
      text: "Online başvuru için ideal akış",
    },
    {
      type: "ul",
      items: [
        "Ön analiz: gelir, borç ve taksit yükünü netleştir",
        "Profiline uygun ürünü seç",
        "Tek bankayla başvur",
        "Evrakı eksiksiz ve doğru şekilde yükle",
      ],
    },

    {
      type: "h2",
      text: "1) Ön analiz neden şart?",
    },
    {
      type: "p",
      text: "Online başvurular hızlı olduğu için çoğu kişi ön analiz yapmadan başvurur. Oysa bankalar, gelir/borç oranı ve son dönem davranışlarına çok hızlı bakar. Ön analiz, gereksiz redleri önler.",
    },

    {
      type: "h2",
      text: "2) Doğru ürün seçimi online başvuruda kritik",
    },
    {
      type: "p",
      text: "Aynı bankanın farklı kredi ürünleri farklı kriterlerle değerlendirilir. Gelirine veya borç durumuna uymayan ürün seçimi, otomatik redle sonuçlanabilir.",
    },

    {
      type: "h2",
      text: "3) Evrak yükleme aşamasında yapılan hatalar",
    },
    {
      type: "ul",
      items: [
        "Eksik veya okunaksız belge yüklemek",
        "Güncel olmayan gelir belgesi kullanmak",
        "İstenen evrağı sonradan yüklemek",
      ],
    },

    {
      type: "callout",
      title: "Not",
      text: "Aynı gün çoklu online başvuru yapmak, bankalar tarafından risk sinyali olarak algılanabilir.",
    },
  ],
},
////////////////////////////

{
  slug: "aninda-kredi-onay-gercek-mi",
  title: "‘Anında Kredi Onayı’ Gerçek mi?",
  excerpt:
    "Ön onay ile kesin onay arasındaki fark ve ‘anında’ söyleminin pratikte ne anlama geldiği.",
  category: "Bilgilendirme",
  topicId: "kredi-basvurusu",
  readingTime: "4 dk",
  date: "2026-01-03",
  coverImage: "/content/aninda-kredi-onayi.jpg",
  icon: "info",
  views: 0,
  content: [
    {
      type: "h2",
      text: "‘Anında onay’ neyi ifade eder?",
    },
    {
      type: "p",
      text: "Reklamlarda görülen ‘anında kredi onayı’ ifadesi çoğu zaman ön değerlendirme anlamına gelir. Bu aşamada sistem, temel kriterleri hızlıca kontrol eder.",
    },

    {
      type: "h2",
      text: "Ön onay ile kesin onay arasındaki fark",
    },
    {
      type: "ul",
      items: [
        "Ön onay: otomatik sistem değerlendirmesi",
        "Kesin onay: evrak, gelir doğrulaması ve iç skor kontrolü",
      ],
    },

    {
      type: "h2",
      text: "Neden ön onay alıp sonra red gelebilir?",
    },
    {
      type: "p",
      text: "Ön onaydan sonra gelir doğrulaması, borç detayları veya iç skor değerlendirmesi farklı sonuç verebilir. Bu nedenle ön onay, kesin onay garantisi değildir.",
    },

    {
      type: "callout",
      title: "Özet",
      text: "Gerçek hız: doğru dosya + doğru ürün + eksiksiz evrak.",
    },
  ],
},

////////////////////////////////////////////

{
  slug: "kredi-basvurusu-icin-gerekli-evraklar",
  title: "Kredi Başvurusu İçin Gerekli Evraklar",
  excerpt:
    "Kredi başvurusunda süreci hızlandıran temel evraklar ve en sık yapılan eksikler.",
  category: "Başvuru Süreci",
  topicId: "kredi-basvurusu",
  readingTime: "4 dk",
  date: "2026-01-03",
  coverImage: "/content/kredi-basvurusu-evraklar.jpg",
  icon: "flow",
  views: 0,
  content: [
    {
      type: "h2",
      text: "Evraklar neden bu kadar önemli?",
    },
    {
      type: "p",
      text: "Kredi başvurularında gecikmenin en büyük nedeni eksik veya doğrulanamayan evraktır. Evrak tamlığı, onay süresini ciddi şekilde kısaltır.",
    },

    {
      type: "h2",
      text: "Temel evraklar",
    },
    {
      type: "ul",
      items: [
        "Geçerli kimlik belgesi",
        "Gelir belgesi veya hesap dökümü",
        "İkamet belgesi",
        "Varsa ek gelir belgeleri",
      ],
    },

    {
      type: "h2",
      text: "En sık yapılan evrak hataları",
    },
    {
      type: "ul",
      items: [
        "Güncel olmayan belge sunmak",
        "Eksik sayfa yüklemek",
        "Geliri net göstermeyen dokümanlar kullanmak",
      ],
    },

    {
      type: "callout",
      title: "İpucu",
      text: "Evrak baştan eksiksiz hazırlanırsa süreç hem hızlanır hem red riski azalır.",
    },
  ],
},


///////

{
  slug: "konut-kredisi-basvuru-sureci",
  title: "Konut Kredisi Başvuru Süreci (Adım Adım)",
  excerpt:
    "Ekspertiz, evrak, peşinat ve bankanın değerlendirme mantığıyla konut kredisi süreci.",
  category: "Başvuru Süreci",
  topicId: "kredi-basvurusu",
  readingTime: "7 dk",
  date: "2026-01-03",
  coverImage: "/content/konut-kredisi-sureci.jpg",
  icon: "flow",
  views: 0,
  content: [
    {
      type: "h2",
      text: "Konut kredisi neden farklı değerlendirilir?",
    },
    {
      type: "p",
      text: "Konut kredisi, uzun vadeli ve teminatlı bir üründür. Bu nedenle banka hem kişiyi hem de satın alınacak gayrimenkulü değerlendirir.",
    },

    {
      type: "h2",
      text: "Konut kredisi başvuru adımları",
    },
    {
      type: "ul",
      items: [
        "Ön analiz (gelir, borç, peşinat)",
        "Evrak hazırlığı",
        "Ekspertiz süreci",
        "Kredi onayı",
        "Tapu ve ödeme işlemleri",
      ],
    },

    {
      type: "h2",
      text: "Ekspertiz süreci neden önemlidir?",
    },
    {
      type: "p",
      text: "Banka, konutun değerini ekspertiz raporuyla belirler. Kredi tutarı bu değerin belirli bir oranı üzerinden hesaplanır.",
    },

    {
      type: "h2",
      text: "Süreci hızlandırmak için neler yapılabilir?",
    },
    {
      type: "ul",
      items: [
        "Evrakı baştan eksiksiz hazırlamak",
        "Peşinatı netleştirmek",
        "Ekspertiz randevusunu geciktirmemek",
      ],
    },

    {
      type: "callout",
      title: "Not",
      text: "Konut kredilerinde dosya hazırlığı, sürenin en belirleyici faktörüdür.",
    },
  ],
},


////////////////////






  // --- Gelir belgesi ---
 {
  slug: "gelir-belgesi-nedir-hangi-belgeler-gecerli",
  title: "Gelir Belgesi Nedir? Hangi Belgeler Geçerli?",
  excerpt:
    "Bankaların gelir ispatı olarak kabul ettiği belgeler nelerdir? Maaş bordrosu, SGK, vergi levhası ve hesap hareketlerinin sade özeti.",
  category: "Bilgilendirme",
  topicId: "gelir-belgesi",
  readingTime: "4 dk",
  date: "2026-01-02",
  icon: "info",
  content: [
    {
      type: "p",
      text: "Gelir belgesi, bankaların kredi veya kart başvurularında ödeme gücünü ölçmek için kullandığı temel veridir. Amaç sadece gelir tutarını görmek değil, bu gelirin düzenli ve sürdürülebilir olup olmadığını anlamaktır.",
    },

    { type: "h2", text: "Geliri Nasıl Gösterirsin?" },

    {
      type: "ul",
      items: [
        "Maaş bordrosu (ücretli çalışanlar için)",
        "SGK hizmet dökümü",
        "Vergi levhası (esnaf ve serbest çalışanlar için)",
        "Banka hesap hareketleri (destekleyici belge olarak)",
      ],
    },

    {
      type: "p",
      text: "Hangi belgenin kabul edileceği; başvurulan ürün, banka politikası ve dosyanın genel görünümüne göre değişebilir.",
    },

    {
      type: "callout",
      title: "İpucu",
      text: "Gelir belgesinde en güçlü sinyal; tutarlılık, süreklilik ve belgeler arası uyumdur.",
    },
  ],
}
,
///////////


{
  slug: "serbest-calisan-gelir-belgesi-nasil-hazirlar",
  title: "Serbest Çalışan Gelir Belgesi Nasıl Hazırlanır?",
  excerpt:
    "Freelancer ve esnaflar için gelir ispatı: hesap hareketleri, vergi kayıtları ve banka bakış açısı.",
  category: "Başvuru Süreci",
  topicId: "gelir-belgesi",
  readingTime: "5 dk",
  date: "2026-01-02",
  icon: "flow",
  content: [
    {
      type: "p",
      text: "Serbest çalışanlar için gelir belgesi, tek bir evraktan oluşmaz. Bankalar bu grupta gelir tutarından çok, düzenlilik ve sürdürülebilirliğe odaklanır.",
    },

    { type: "h2", text: "Dosyayı Güçlendiren Şeyler" },

    {
      type: "ul",
      items: [
        "Düzenli ve açıklanabilir banka hesap hareketleri",
        "Vergi levhası ve beyanların tutarlılığı",
        "Borçların gelire oranla dengeli olması",
      ],
    },

    {
      type: "p",
      text: "Gelir dalgalı olsa bile, uzun vadede istikrarlı bir akış göstermek bankalar açısından olumlu değerlendirilir.",
    },

    {
      type: "callout",
      title: "İpucu",
      text: "Başvuru öncesi ön analiz yaparak, profilinle uyumlu ürünle ilerlemek süreci kolaylaştırır.",
    },
  ],
},
///////////////////////////////////////////////////////

{
  slug: "kira-geliri-gelir-belgesi-olur-mu",
  title: "Kira Geliri Gelir Belgesi Olur mu?",
  excerpt:
    "Kira gelirinin bankalar tarafından nasıl değerlendirildiği ve ispatta dikkat edilen noktalar.",
  category: "Bilgilendirme",
  topicId: "gelir-belgesi",
  readingTime: "3 dk",
  date: "2026-01-02",
  icon: "info",
  content: [
    {
      type: "p",
      text: "Kira geliri, bazı bankalar tarafından destekleyici gelir olarak kabul edilebilir. Ancak bu kabul, gelirin düzenli ve belgelenebilir olmasına bağlıdır.",
    },

    { type: "h2", text: "İspat ve Süreklilik" },

    {
      type: "p",
      text: "Düzenli banka girişleri, kira sözleşmesi ve tutarlı tutarlar, kira gelirinin değerlendirilmesinde önemli rol oynar. Her bankanın bu konuda iç kuralı farklı olabilir.",
    },

    {
      type: "callout",
      title: "Not",
      text: "Amaç kesin kabul değil; dosyayı güçlendirecek ek gelir unsuru oluşturmaktır.",
    },
  ],
},

////////////////////////////

{
  slug: "gelir-guncellemesi-nasil-yapilir",
  title: "Gelir Güncellemesi Nasıl Yapılır?",
  excerpt:
    "Bankalarda gelir bilgisini güncellemenin kredi notu, limit ve başvuru sürecine etkisi.",
  category: "Bilgilendirme",
  topicId: "gelir-belgesi",
  readingTime: "3 dk",
  date: "2026-01-02",
  icon: "info",
  content: [
    {
      type: "p",
      text: "Gelir artışı olmasına rağmen bankadaki gelir bilgisinin güncel olmaması, başvuruların zayıf görünmesine neden olabilir.",
    },

    { type: "h2", text: "Neden Önemli?" },

    {
      type: "ul",
      items: [
        "Kredi ve kart limitleri artış potansiyeli kazanır",
        "Dosya bankalar nezdinde daha güçlü görünür",
        "Başvuru ve değerlendirme süreci hızlanabilir",
      ],
    },

    {
      type: "p",
      text: "Gelir güncellemesi genellikle şube, mobil uygulama veya internet bankacılığı üzerinden yapılabilir.",
    },

    {
      type: "callout",
      title: "İpucu",
      text: "Gelirinde artış olduysa veya belge yapın değiştiyse, mutlaka bankalar nezdinde güncelleme yap.",
    },
  ],
},

//////////////////////////////////

  // --- Borç / borç kapatma ---
  {
  slug: "borc-kapatma-kredisi-nedir",
  title: "Borç Kapatma Kredisi Nedir?",
  excerpt:
    "Dağınık borçları tek taksite indirme yaklaşımı: artıları, eksileri ve karar vermeden önce bilinmesi gerekenler.",
  category: "Yasal / Risk",
  topicId: "borc-kapatma",
  readingTime: "6 dk",
  date: "2026-01-03",
  coverImage: "/content/borc-kapatma-kredisi.jpg",
  icon: "risk",
  views: 0,
  content: [
    {
      type: "h2",
      text: "Borç kapatma kredisi ne işe yarar?",
    },
    {
      type: "p",
      text: "Borç kapatma kredisi, birden fazla kredi veya kredi kartı borcunu tek bir kredi altında toplamak için kullanılır. Amaç; taksitleri sadeleştirmek, gecikme riskini azaltmak ve borcu daha yönetilebilir hâle getirmektir.",
    },

    {
      type: "h2",
      text: "Ne sağlar?",
    },
    {
      type: "ul",
      items: [
        "Birden fazla taksit yerine tek taksit",
        "Gecikme ve unutma riskinin azalması",
        "Nakit akışının daha net görünmesi",
        "Psikolojik rahatlama ve kontrol hissi",
      ],
    },

    {
      type: "h2",
      text: "Avantajları kadar riskleri de var mı?",
    },
    {
      type: "p",
      text: "Borç kapatma kredisi taksiti düşürebilir; ancak vade uzarsa toplam geri ödeme artabilir. Bu yüzden sadece aylık taksite bakarak karar vermek yanıltıcı olabilir.",
    },

    {
      type: "callout",
      title: "Dikkat",
      text: "Borç kapatma kararı verirken mutlaka toplam geri ödeme tutarını net gör.",
    },
  ],
},
///////////////////////////////////////////////////


{
  slug: "borc-transferi-kredisi-mantiklimi",
  title: "Borç Transferi Kredisi Mantıklı mı?",
  excerpt:
    "Başka bankadaki borcu taşımanın hangi durumlarda avantajlı olduğu ve ne zaman risk oluşturduğu.",
  category: "Yasal / Risk",
  topicId: "borc-kapatma",
  readingTime: "6 dk",
  date: "2026-01-03",
  coverImage: "/content/borc-transferi.jpg",
  icon: "risk",
  views: 0,
  content: [
    {
      type: "h2",
      text: "Borç transferi kredisi nedir?",
    },
    {
      type: "p",
      text: "Borç transferi kredisi, başka bankalardaki borçların tek bir bankaya taşınarak kapatılmasıdır. Genellikle daha düşük faiz veya daha uzun vade avantajı sunulabilir.",
    },

    {
      type: "h2",
      text: "Mantıklı olduğu durumlar",
    },
    {
      type: "ul",
      items: [
        "Mevcut borçlarda faiz yükü çok yüksekse",
        "Birden fazla bankada dağınık borç varsa",
        "Daha düzenli bir ödeme planına ihtiyaç duyuluyorsa",
      ],
    },

    {
      type: "h2",
      text: "Ne zaman riskli olabilir?",
    },
    {
      type: "p",
      text: "Vade uzadığında toplam maliyet ciddi şekilde artabilir. Ayrıca transfer sonrası yeni borç üretme alışkanlığı devam ederse sorun büyüyebilir.",
    },

    {
      type: "callout",
      title: "Öneri",
      text: "Faize değil; toplam maliyet ve vade etkisine bakarak karar ver.",
    },
  ],
},

////////////////////////////////////////7

{
  slug: "kredi-karti-borcu-kapatma-plani",
  title: "Kredi Kartı Borcu Kapatma Planı",
  excerpt:
    "Kredi kartı borcunu kontrol altına almak için bütçe, taksit ve yapılandırma seçenekleriyle adım adım plan.",
  category: "Yasal / Risk",
  topicId: "borc-kapatma",
  readingTime: "6 dk",
  date: "2026-01-03",
  coverImage: "/content/kredi-karti-borc-kapatma.jpg",
  icon: "risk",
  views: 0,
  content: [
    {
      type: "h2",
      text: "Kart borcu neden hızlı büyür?",
    },
    {
      type: "p",
      text: "Asgari ödeme alışkanlığı, yüksek faiz ve sürekli kullanım kart borcunu hızla büyütür. Sorun genelde borcun kendisinden çok kontrolün kaybolmasıdır.",
    },

    {
      type: "h2",
      text: "3 adımda borcu kontrol altına al",
    },
    {
      type: "ul",
      items: [
        "Bütçe fotoğrafı çıkar: toplam borç ve aylık ödeme kapasitesini gör",
        "Gecikmeyi durdur: asgari değil, planlı ödeme hedefle",
        "Borcu sadeleştir: tek plan / tek taksit yaklaşımı kur",
      ],
    },

    {
      type: "h2",
      text: "Yapılandırma veya kapatma ne zaman düşünülmeli?",
    },
    {
      type: "p",
      text: "Taksitler geliri aşmaya başladıysa veya gecikme riski oluştuysa, yapılandırma veya kapatma seçenekleri değerlendirilmelidir.",
    },

    {
      type: "callout",
      title: "Not",
      text: "Amaç hızlı çözüm değil; sürdürülebilir ödeme düzeni kurmaktır.",
    },
  ],
},
/////////////////////////////////////////////////


{
  slug: "borc-gelir-orani-kac-olmali",
  title: "Borç/Gelir Oranı Kaç Olmalı?",
  excerpt:
    "Borç/gelir oranının bankalar için neden kritik olduğu ve pratik hedef aralıklar.",
  category: "Bilgilendirme",
  topicId: "borc-kapatma",
  readingTime: "4 dk",
  date: "2026-01-03",
  coverImage: "/content/borc-gelir-orani.jpg",
  icon: "info",
  views: 0,
  content: [
    {
      type: "h2",
      text: "Borç/gelir oranı neyi gösterir?",
    },
    {
      type: "p",
      text: "Borç/gelir oranı, aylık taksitlerin aylık gelire oranını ifade eder. Bankalar bu oranla kişinin ödeme kapasitesini ölçer.",
    },

    {
      type: "h2",
      text: "Neden kritik?",
    },
    {
      type: "p",
      text: "Oran yükseldikçe bankanın risk algısı artar. Gelir sabitken borcun artması, yeni kredi ihtimalini düşürür.",
    },

    {
      type: "h2",
      text: "Pratik yaklaşım",
    },
    {
      type: "ul",
      items: [
        "Daha düşük oran = daha rahat onay",
        "Yüksek oran = ek inceleme veya red",
        "Borç sadeleştirme oranı düşürebilir",
      ],
    },

    {
      type: "callout",
      title: "İpucu",
      text: "Önce borcu sadeleştirip oranı düşürmek, yeni başvuruları kolaylaştırır.",
    },
  ],
},
/////////////////////////////////////////////


{
  slug: "borc-kapatma-mi-yapilandirma-mi",
  title: "Borç Kapatma mı, Yapılandırma mı?",
  excerpt:
    "Borç kapatma ve yapılandırma arasındaki farklar: taksit, vade ve toplam maliyet açısından karşılaştırma.",
  category: "Yasal / Risk",
  topicId: "borc-kapatma",
  readingTime: "5 dk",
  date: "2026-01-03",
  coverImage: "/content/borc-kapatma-yapilandirma.jpg",
  icon: "risk",
  views: 0,
  content: [
    {
      type: "h2",
      text: "İki yöntem arasındaki temel fark",
    },
    {
      type: "p",
      text: "Borç kapatma, mevcut borçları yeni bir krediyle kapatıp tek plan oluşturur. Yapılandırma ise mevcut borcun vadesini uzatarak taksiti düşürmeyi hedefler.",
    },

    {
      type: "h2",
      text: "Kısa karşılaştırma",
    },
    {
      type: "ul",
      items: [
        "Kapatma: borcu sadeleştirir ve kontrol sağlar",
        "Yapılandırma: aylık taksiti düşürebilir",
        "Her iki yöntemde de toplam maliyet artabilir",
      ],
    },

    {
      type: "h2",
      text: "Hangi durumda hangisi mantıklı?",
    },
    {
      type: "p",
      text: "Aylık yük ağırlaştıysa yapılandırma nefes aldırabilir. Borç dağınıksa ve kontrol kaybolduysa kapatma daha net çözüm sunar.",
    },

    {
      type: "callout",
      title: "Özet",
      text: "Amaç nefes almaksa yapılandırma; kontrol ve tek plan istiyorsan kapatma daha uygundur.",
    },
  ],
},
////////////////////////////////////////////////7





  // --- Yapılandırma ---
  {
  slug: "kredi-yapilandirma-nedir",
  title: "Kredi Yapılandırma Nedir?",
  excerpt:
    "Kredi yapılandırma; mevcut borcu daha yönetilebilir taksitlere yayma sürecidir. Vade, taksit ve toplam maliyet ilişkisi bu rehberde sade şekilde anlatılır.",
  category: "Yasal / Risk",
  topicId: "yapilandirma",
  readingTime: "5 dk",
  date: "2026-01-02",
  icon: "risk",
  content: [
    {
      type: "p",
      text: "Kredi yapılandırma, mevcut kredi veya kart borcunun vadesinin uzatılması ya da ödeme planının değiştirilmesidir. Amaç, aylık taksit yükünü azaltarak borcun sürdürülebilir hâle gelmesini sağlamaktır.",
    },

    { type: "h2", text: "Yapılandırma Ne Sağlar?" },

    {
      type: "ul",
      items: [
        "Aylık taksit tutarı düşebilir",
        "Gecikme ve yasal takip riski azalır",
        "Toplam geri ödeme tutarı artabilir",
      ],
    },

    {
      type: "p",
      text: "Yapılandırma, borcu ucuzlatmaktan çok, ödeme dengesini yeniden kurmayı hedefler. Bu nedenle toplam maliyetin artması sık görülen bir durumdur.",
    },

    {
      type: "callout",
      title: "Denge",
      text: "Amaç ‘nefes almak’ ise yapılandırma mantıklıdır; ancak her zaman daha ucuza borçlanmak anlamına gelmez.",
    },
  ],
},

/////////////////////////////////////7

{
  slug: "kredi-yapilandirma-ne-zaman-mantik",
  title: "Kredi Yapılandırma Ne Zaman Mantıklı?",
  excerpt:
    "Taksit yükü arttığında, gecikme riski yükseldiğinde ve sürdürülebilir bir ödeme planına ihtiyaç duyulduğunda yapılandırma devreye girer.",
  category: "Yasal / Risk",
  topicId: "yapilandirma",
  readingTime: "4 dk",
  date: "2026-01-02",
  icon: "risk",
  content: [
    {
      type: "p",
      text: "Her borç için yapılandırma doğru bir çözüm değildir. Yapılandırmanın mantıklı olup olmadığı, mevcut ödeme gücü ve risk seviyesine göre değerlendirilmelidir.",
    },

    { type: "h2", text: "Mantıklı Olan Senaryolar" },

    {
      type: "ul",
      items: [
        "Aylık taksitlerin gelire oranı yükseldiyse",
        "Gecikme yaşanma riski oluştuysa",
        "Nakit akışı geçici olarak bozulduysa",
      ],
    },

    {
      type: "p",
      text: "Bu durumlarda yapılandırma, yasal sürece düşmeden önce kontrolü yeniden kazanmak için bir araç olabilir.",
    },

    {
      type: "callout",
      title: "Not",
      text: "Karar vermeden önce yeni vade, taksit ve toplam geri ödeme tutarını mutlaka netleştir.",
    },
  ],
},


////////////////////////////////////////////


{
  slug: "yapilandirma-kredi-notunu-etkiler-mi",
  title: "Yapılandırma Kredi Notunu Etkiler mi?",
  excerpt:
    "Kredi yapılandırmanın banka risk algısına etkisi ve doğru yönetildiğinde olumsuz etkinin nasıl azaltılabileceği.",
  category: "Bilgilendirme",
  topicId: "yapilandirma",
  readingTime: "4 dk",
  date: "2026-01-02",
  icon: "info",
  content: [
    {
      type: "p",
      text: "Kredi yapılandırma tek başına ‘iyi’ ya da ‘kötü’ olarak değerlendirilmez. Bankalar için asıl önemli olan, yapılandırma sonrası ödeme davranışıdır.",
    },

    { type: "h2", text: "Bankalar Yapılandırmaya Nasıl Bakar?" },

    {
      type: "p",
      text: "Yapılandırma; gecikmeyi durduruyor ve düzenli ödeme sağlıyorsa, risk algısını zamanla dengeleyebilir. Ancak yapılandırmaya rağmen ödeme aksarsa, olumsuz etki artar.",
    },

    {
      type: "callout",
      title: "Öneri",
      text: "Amaç; gecikmesiz düzenli ödeme ve uzun vadede sürdürülebilir bir taksit planı oluşturmaktır.",
    },
  ],
},

{
  slug: "kredi-karti-yapilandirma-nasil-olur",
  title: "Kredi Kartı Yapılandırma Nasıl Olur?",
  excerpt:
    "Kredi kartı borcunun taksitlendirilmesi, ödeme planı oluşturma süreci ve sık yapılan hatalar.",
  category: "Yasal / Risk",
  topicId: "yapilandirma",
  readingTime: "4 dk",
  date: "2026-01-02",
  icon: "risk",
  content: [
    {
      type: "p",
      text: "Kredi kartı yapılandırması, biriken kart borcunun belirli bir vadeye bölünerek taksitli hâle getirilmesidir. Amaç, gecikmeleri durdurmak ve borcu kontrol altına almaktır.",
    },

    { type: "h2", text: "Dikkat Edilmesi Gereken 3 Kritik Nokta" },

    {
      type: "ul",
      items: [
        "Gecikmeyi ve faizi büyümeden durdurmak",
        "Gerçekçi ve ödenebilir bir plan kurmak",
        "Yeni borç üretme alışkanlığını sonlandırmak",
      ],
    },

    {
      type: "p",
      text: "Yapılandırma sonrası kart kullanımına devam edilmesi, borcun yeniden büyümesine neden olabilir.",
    },

    {
      type: "callout",
      title: "Not",
      text: "Yapılandırma planı bozulursa, toplam maliyet daha da artabilir.",
    },
  ],
},


//////////////////////////////

{
  slug: "yapilandirma-oncesi-ne-hazirlanmali",
  title: "Yapılandırma Öncesi Ne Hazırlanmalı?",
  excerpt:
    "Yapılandırma kararı almadan önce bütçe, borç listesi ve ödeme kapasitesinin netleştirilmesi.",
  category: "Bilgilendirme",
  topicId: "yapilandirma",
  readingTime: "3 dk",
  date: "2026-01-02",
  icon: "info",
  content: [
    {
      type: "p",
      text: "Yapılandırma kararı almadan önce, mevcut finansal tabloyu net görmek gerekir. Aksi hâlde yeni plan da kısa sürede bozulabilir.",
    },

    { type: "h2", text: "Hazırlık Listesi" },

    {
      type: "ul",
      items: [
        "Aylık net gelir ve gider tablosu",
        "Tüm kredi ve kart borçlarının listesi",
        "Uzun vadede sürdürülebilecek minimum taksit tutarı",
      ],
    },

    {
      type: "callout",
      title: "İpucu",
      text: "Net bir bütçe olmadan yapılandırma kararına girme; önce tabloyu gör.",
    },
  ],
},


/////////////////////////////////////




  // --- Kredi kartı ---
  {
  slug: "kredi-karti-asgari-odeme-nedir",
  title: "Kredi Kartı Asgari Ödeme Nedir?",
  excerpt:
    "Asgari ödemenin ne anlama geldiği, kısa vadede rahatlatıp uzun vadede nasıl maliyet yarattığı.",
  category: "Bilgilendirme",
  topicId: "kredi-karti",
  readingTime: "4 dk",
  date: "2026-01-03",
  coverImage: "/content/kredi-karti-asgari-odeme.jpg",
  icon: "info",
  views: 0,
  content: [
    {
      type: "h2",
      text: "Asgari ödeme ne demektir?",
    },
    {
      type: "p",
      text: "Asgari ödeme, kredi kartı borcunun o ay için bankanın zorunlu tuttuğu en düşük ödeme tutarıdır. Ödendiğinde gecikmeye düşülmez; ancak borcun büyük kısmı faize kalır.",
    },

    {
      type: "h2",
      text: "Asgari ödeme ile yaşamak ne anlama gelir?",
    },
    {
      type: "p",
      text: "Sürekli asgari ödeme yapmak kısa vadede nefes aldırır ama borcun azalmasını engeller. Faiz işlediği için borç zamanla büyüyebilir.",
    },

    {
      type: "h2",
      text: "Uzun vadede ne olur?",
    },
    {
      type: "ul",
      items: [
        "Toplam geri ödeme artar",
        "Borç daha uzun sürede kapanır",
        "Yeni harcamalarla borç kontrolden çıkabilir",
      ],
    },

    {
      type: "callout",
      title: "Öneri",
      text: "Asgari ödeme son çare olmalı. Mümkünse planlı ve düzenli kapama hedeflenmeli.",
    },
  ],
},

////////////////////////////////////////


{
  slug: "kredi-karti-borcu-odenmezse-ne-olur",
  title: "Kredi Kartı Borcu Ödenmezse Ne Olur?",
  excerpt:
    "Kredi kartı borcu ödenmediğinde yaşanan gecikme faizi, uyarılar ve yasal riskler.",
  category: "Yasal / Risk",
  topicId: "kredi-karti",
  readingTime: "6 dk",
  date: "2026-01-03",
  coverImage: "/content/kredi-karti-borc-odenmezse.jpg",
  icon: "risk",
  views: 0,
  content: [
    {
      type: "h2",
      text: "İlk aşamada ne olur?",
    },
    {
      type: "p",
      text: "Borç ödenmezse gecikme faizi işlemeye başlar. Banka SMS, e-posta veya telefonla uyarı yapar.",
    },

    {
      type: "h2",
      text: "Süre uzadıkça risk büyür",
    },
    {
      type: "ul",
      items: [
        "Gecikme faizi ve ek ücretler artar",
        "Kart kullanıma kapatılabilir",
        "Kredi notu olumsuz etkilenir",
      ],
    },

    {
      type: "h2",
      text: "Daha ileri aşamada ne olur?",
    },
    {
      type: "p",
      text: "Uzun süre ödeme yapılmazsa yasal takip süreci başlayabilir. Bu durum hem kredi notunu hem de bankalar nezdindeki risk algısını ciddi şekilde bozar.",
    },

    {
      type: "callout",
      title: "Hızlı çözüm",
      text: "Erken aksiyon almak her zaman daha ucuzdur. Gecikme büyümeden plan yapılmalıdır.",
    },
  ],
},

/////////////////////////////////////////


{
  slug: "kredi-karti-borcu-varken-kredi-cekilir-mi",
  title: "Kredi Kartı Borcu Varken Kredi Çekilir mi?",
  excerpt:
    "Kredi kartı borcu varken kredi başvurusunda bankaların baktığı kriterler ve ihtimali artıran düzenlemeler.",
  category: "Yasal / Risk",
  topicId: "kredi-karti",
  readingTime: "5 dk",
  date: "2026-01-03",
  coverImage: "/content/kredi-karti-borcu-varken-kredi.jpg",
  icon: "risk",
  views: 0,
  content: [
    {
      type: "h2",
      text: "Mümkün mü?",
    },
    {
      type: "p",
      text: "Kredi kartı borcu varken kredi çekmek mümkündür; ancak onay ihtimali tamamen borcun seviyesi ve ödeme düzenine bağlıdır.",
    },

    {
      type: "h2",
      text: "Bankalar hangi metriklere bakar?",
    },
    {
      type: "ul",
      items: [
        "Toplam taksit/gelir oranı",
        "Kart borçlarının gelire oranı",
        "Gecikme olup olmadığı",
        "Limit kullanım düzeyi",
      ],
    },

    {
      type: "h2",
      text: "İhtimali artırmak için ne yapılabilir?",
    },
    {
      type: "p",
      text: "Kart borcunu sadeleştirmek, kullanım oranını düşürmek ve doğru ürünle başvurmak onay ihtimalini yükseltebilir.",
    },

    {
      type: "callout",
      title: "Öneri",
      text: "Ön analiz yapmadan ve borcu düzenlemeden başvuru yapmak genelde reddi hızlandırır.",
    },
  ],
},


///////////////////////////////////////////


{
  slug: "kredi-karti-kullanim-orani-notu-etkiler-mi",
  title: "Kredi Kartı Kullanım Oranı Kredi Notunu Etkiler mi?",
  excerpt:
    "Kredi kartı kullanım oranının kredi notuna etkisi ve pratik hedef aralıklar.",
  category: "Bilgilendirme",
  topicId: "kredi-karti",
  readingTime: "4 dk",
  date: "2026-01-03",
  coverImage: "/content/kredi-karti-kullanim-orani.jpg",
  icon: "info",
  views: 0,
  content: [
    {
      type: "h2",
      text: "Kullanım oranı ne demek?",
    },
    {
      type: "p",
      text: "Kullanım oranı, kredi kartı limitinin ne kadarının aktif olarak kullanıldığını gösterir. Bu oran bankalar için önemli bir risk sinyalidir.",
    },

    {
      type: "h2",
      text: "Neden önemli?",
    },
    {
      type: "ul",
      items: [
        "Sürekli tavan kullanım riskli görünür",
        "Düşük kullanım + düzenli ödeme pozitif sinyaldir",
        "%30–40 bandı genelde daha sağlıklı kabul edilir",
      ],
    },

    {
      type: "h2",
      text: "Ne zaman daha çok zarar verir?",
    },
    {
      type: "p",
      text: "Yüksek kullanım oranı gecikmeyle birleşirse kredi notu çok daha hızlı düşebilir.",
    },

    {
      type: "callout",
      title: "Not",
      text: "Gecikme varsa önce onu düzelt; sonra kullanım oranını düşür.",
    },
  ],
},

/////////////////////////////////////////






  // --- Banka ---
  {
  slug: "banka-ic-skor-nedir",
  title: "Banka İç Skoru Nedir?",
  excerpt:
    "Bankaların kendi risk skorları nasıl oluşur, kredi notundan farkı nedir ve neden başvurularda belirleyicidir?",
  category: "Bilgilendirme",
  topicId: "banka",
  readingTime: "4 dk",
  date: "2026-01-02",
  icon: "info",
  content: [
    {
      type: "p",
      text: "Birçok kişi kredi notunun her şey olduğunu düşünür. Oysa bankalar, kredi notuna ek olarak kendi iç risk skorlarını kullanır. Bu skor; bankanın sizi kendi perspektifinden nasıl gördüğünü gösterir.",
    },

    { type: "h2", text: "İç Skor ile Kredi Notu Arasındaki Fark" },

    {
      type: "p",
      text: "Kredi notu tüm bankalar için ortak bir özet veridir. Banka iç skoru ise; ürün bazlı, dönemsel ve bankanın risk iştahına göre değişen daha detaylı sinyaller içerir.",
    },

    {
      type: "h2",
      text: "İç Skoru Etkileyen Başlıca Faktörler",
    },

    {
      type: "ul",
      items: [
        "Bankayla olan geçmiş ilişki ve ürün kullanımı",
        "Hesap hareketleri ve nakit akışı",
        "Başvurduğun ürünün risk seviyesi",
        "Son dönemdeki başvuru ve kullanım davranışı",
      ],
    },

    {
      type: "callout",
      title: "İpucu",
      text: "Doğru ürün, doğru zamanlama ve tutarlı davranış; banka iç skorunda kredi notundan bile daha hızlı fark yaratabilir.",
    },
  ],
},

//////////////////////////////////////////

{
  slug: "en-kolay-kredi-veren-banka-var-mi",
  title: "‘En Kolay Kredi Veren Banka’ Var mı?",
  excerpt:
    "Tek bir ‘kolay kredi veren banka’ algısının gerçeği: dosya kalitesi, ürün uyumu ve dönemsel risk iştahı.",
  category: "Bilgilendirme",
  topicId: "banka",
  readingTime: "4 dk",
  date: "2026-01-02",
  icon: "info",
  content: [
    {
      type: "p",
      text: "İnternette sıkça ‘en kolay kredi veren banka’ araması yapılır. Ancak gerçekte tek bir kolay banka yoktur. Aynı kişi bir bankadan onay alırken, başka bir bankadan ret alabilir.",
    },

    { type: "h2", text: "Gerçek Cevap" },

    {
      type: "p",
      text: "Kredi onayı; kişinin profili, başvurulan ürün ve bankanın o dönemdeki risk iştahının birleşimidir. Bu üçlü değiştiğinde sonuç da değişir.",
    },

    {
      type: "h2",
      text: "Neye Göre ‘Kolay’ Algısı Oluşur?",
    },

    {
      type: "ul",
      items: [
        "Dosyanın bankanın hedeflediği profile uyması",
        "Başvurulan ürünün risk seviyesinin düşük olması",
        "Bankanın o dönemde kredi verme iştahının yüksek olması",
      ],
    },

    {
      type: "callout",
      title: "Öneri",
      text: "Önce ön analiz yap, profilinle uyumlu tek bankayla başla ve sonucu gör. Çoklu denemeler süreci zorlaştırabilir.",
    },
  ],
},
////////////////////////////////////

{
  slug: "banka-degerlendirme-sureci-nasil-isler",
  title: "Banka Değerlendirme Süreci Nasıl İşler?",
  excerpt:
    "Bir kredi başvurusu bankanın içinde hangi adımlardan geçer? Başvurudan onaya kadar yapılan kontrollerin sade anlatımı.",
  category: "Bilgilendirme",
  topicId: "banka",
  readingTime: "4 dk",
  date: "2026-01-02",
  icon: "info",
  content: [
    {
      type: "p",
      text: "Kredi başvurusu yapıldığında süreç tek bir tuşla bitmez. Banka içinde otomatik ve manuel kontrollerden oluşan bir değerlendirme zinciri çalışır.",
    },

    { type: "h2", text: "Banka İçinde Neler Olur?" },

    {
      type: "ul",
      items: [
        "Kimlik ve gelir bilgilerinin doğrulanması",
        "Mevcut borçlar ve risk kayıtlarının kontrolü",
        "Başvurulan ürün için uygunluk değerlendirmesi",
        "Otomatik sistem veya manuel son karar",
      ],
    },

    {
      type: "h2",
      text: "Neden Aynı Gün Ret ya da Onay Gelir?",
    },

    {
      type: "p",
      text: "Bazı başvurular tamamen otomatik sistemlerden geçer. Dosya net değilse veya risk sınırındaysa, manuel incelemeye düşebilir ve süreç uzayabilir.",
    },

    {
      type: "callout",
      title: "İpucu",
      text: "Evrakların tam, gelir ve borç bilgilerinin tutarlı olması değerlendirme sürecini ciddi şekilde hızlandırır.",
    },
  ],
},

////////////////////////////////////7






  // --- Genel ---
  {
  slug: "kredi-faizi-nedir-nasil-hesaplanir",
  title: "Kredi Faizi Nedir, Nasıl Hesaplanır?",
  excerpt:
    "Kredi faizinin ne olduğu, vade–taksit–toplam geri ödeme ilişkisi ve doğru karar vermenin temel mantığı.",
  category: "Bilgilendirme",
  topicId: "genel",
  readingTime: "4 dk",
  date: "2026-01-02",
  icon: "info",
  content: [
    {
      type: "p",
      text: "Kredi faizi, bankanın size verdiği paranın kullanım bedelidir. Ancak kredi maliyetini belirleyen tek unsur faiz oranı değildir. Vade süresi ve ek kalemler toplam geri ödemeyi doğrudan etkiler.",
    },

    { type: "h2", text: "Temel Mantık" },

    {
      type: "p",
      text: "Vade uzadıkça aylık taksit düşebilir; ancak toplam geri ödeme çoğu zaman artar. Bu nedenle karar verirken sadece aylık taksite değil, toplam maliyete bakmak gerekir.",
    },

    {
      type: "callout",
      title: "Öneri",
      text: "Faiz oranına bakarken dosya masrafı, sigorta ve ek maliyetleri mutlaka hesaba kat.",
    },
  ],
},
//////////////////////////////////////


{
  slug: "kredi-maliyeti-toplam-geri-odeme-nasil-bakilir",
  title: "Kredi Maliyeti: Toplam Geri Ödeme Nasıl Okunur?",
  excerpt:
    "Faiz oranı kadar masraf, komisyon ve sigorta kalemlerini de dikkate alarak kredi maliyetini doğru okuma rehberi.",
  category: "Bilgilendirme",
  topicId: "genel",
  readingTime: "6 dk",
  date: "2026-01-02",
  icon: "info",
  content: [
    {
      type: "p",
      text: "Bir kredinin gerçek maliyeti, sadece faiz oranına bakılarak anlaşılmaz. Bankanın sunduğu aylık taksit, kulağa makul gelse bile toplam geri ödeme tutarı incelenmeden verilen kararlar uzun vadede daha pahalıya mal olabilir.",
    },

    {
      type: "h2",
      text: "Sadece faiz oranına bakmak neden yanıltıcı?",
    },
    {
      type: "p",
      text: "Faiz oranı, kredinin sadece bir parçasıdır. Bankalar aynı faiz oranıyla farklı masraf ve sigorta kalemleri ekleyebilir. Bu da iki kredinin aylık taksiti benzer olsa bile toplam geri ödeme tutarının ciddi şekilde farklılaşmasına yol açar.",
    },

    {
      type: "h2",
      text: "Toplam geri ödemeyi etkileyen kalemler",
    },
    {
      type: "ul",
      items: [
        "Dosya masrafı ve kredi tahsis ücretleri",
        "Hayat sigortası ve krediye bağlı diğer sigortalar",
        "Hesap işletim veya komisyon benzeri ek ücretler",
        "Vade süresi ve taksit sayısı",
      ],
    },

    {
      type: "h2",
      text: "Aylık taksit mi, toplam tutar mı daha önemli?",
    },
    {
      type: "p",
      text: "Aylık taksit bütçeye uygun olabilir, ancak asıl bakılması gereken rakam toplam geri ödemedir. Daha uzun vadeli bir kredi, aylık taksiti düşürürken toplamda çok daha fazla faiz ödemenize neden olabilir.",
    },

    {
      type: "h2",
      text: "Erken kapama ve ara ödeme şartları neden önemli?",
    },
    {
      type: "p",
      text: "Bazı kredilerde erken kapama veya ara ödeme durumunda ek masraflar uygulanabilir. Kredi sözleşmesinde bu şartlar açıkça yer alır ve ileride kredi kapatma planı olanlar için maliyeti doğrudan etkiler.",
    },

    {
      type: "h2",
      text: "Doğru karşılaştırma nasıl yapılır?",
    },
    {
      type: "ul",
      items: [
        "Aynı vade ve tutar üzerinden karşılaştırma yap",
        "Toplam geri ödeme rakamını mutlaka sor",
        "Sigortaların zorunlu mu isteğe bağlı mı olduğunu öğren",
        "Erken kapama koşullarını sözleşmeden kontrol et",
      ],
    },

    {
      type: "h2",
      text: "En sık yapılan hata",
    },
    {
      type: "p",
      text: "Sadece düşük faiz oranına odaklanıp toplam geri ödeme tutarını incelemeden kredi kullanmak. Bu durum, fark edilmeden daha pahalı bir krediye yönelmeye neden olabilir.",
    },

    {
      type: "callout",
      title: "Özet",
      text: "En düşük faiz oranı her zaman en ucuz kredi değildir. Gerçek maliyet, tüm masraflar eklendiğinde ortaya çıkan toplam geri ödeme tutarıdır.",
    },
  ],
},



///////////////////////////////////////////

{
  slug: "kredi-erken-kapama-cezasi-var-mi",
  title: "Kredi Erken Kapama Cezası Var mı?",
  excerpt:
    "Krediyi erken kapatırken sözleşmede hangi kalemlere bakılmalı, hangi masraflar çıkabilir?",
  category: "Bilgilendirme",
  topicId: "genel",
  readingTime: "3 dk",
  date: "2026-01-02",
  icon: "info",
  content: [
    {
      type: "p",
      text: "Krediyi vadesinden önce kapatmak her zaman cezasız olmayabilir. Bu durum, kredi türüne ve sözleşme şartlarına göre değişir.",
    },

    { type: "h2", text: "Erken Kapamada Ne Kontrol Edilmeli?" },

    {
      type: "ul",
      items: [
        "Sözleşmede erken kapama/ödeme şartları",
        "Kalan masraf veya komisyon tutarları",
        "Sigorta primlerinin iade edilip edilmediği",
      ],
    },

    {
      type: "callout",
      title: "Not",
      text: "Erken kapama şartları bankaya ve ürüne göre değişebilir; mutlaka sözleşme üzerinden kontrol et.",
    },
  ],
},

///////////////////////////////////////////


{
  slug: "kredi-hesaplama-nasil-yapilir",
  title: "Kredi Hesaplama Nasıl Yapılır?",
  excerpt:
    "Aylık taksit, vade ve toplam geri ödeme ilişkisini pratik şekilde anlamak için temel hesaplama rehberi.",
  category: "Bilgilendirme",
  topicId: "genel",
  readingTime: "4 dk",
  date: "2026-01-02",
  icon: "info",
  content: [
    {
      type: "p",
      text: "Kredi hesaplama yaparken çoğu kişi sadece aylık taksite odaklanır. Oysa sağlıklı karar için vade ve toplam geri ödeme birlikte değerlendirilmelidir.",
    },

    { type: "h2", text: "Hesaplama Mantığı" },

    {
      type: "p",
      text: "Vade uzadıkça aylık taksit düşer, ancak toplam maliyet artabilir. Aynı vadede bile masraflar değiştiğinde toplam geri ödeme farklılaşır.",
    },

    {
      type: "callout",
      title: "İpucu",
      text: "Karşılaştırma yaparken her zaman aynı vade ve aynı tutar üzerinden toplam geri ödemeyi kıyasla.",
    },
  ],
},

/////////////////////////////


{
  slug: "kredi-basvurusunda-en-sik-3-hata",
  title: "Kredi Başvurusunda En Sık 3 Hata",
  excerpt:
    "Kredi başvurularında en çok yapılan ve onay ihtimalini düşüren üç temel hata.",
  category: "Başvuru Süreci",
  topicId: "genel",
  readingTime: "3 dk",
  date: "2026-01-02",
  icon: "flow",
  content: [
    {
      type: "p",
      text: "Birçok kredi başvurusu, aslında küçük ama kritik hatalar nedeniyle olumsuz sonuçlanır.",
    },

    { type: "h2", text: "En Sık Yapılan 3 Kritik Hata" },

    {
      type: "ul",
      items: [
        "Eksik veya tutarsız evrak sunulması",
        "Aynı gün içinde birden fazla bankaya başvuru yapılması",
        "Profil ile uyumsuz ürün seçilmesi",
      ],
    },

    {
      type: "callout",
      title: "Öneri",
      text: "Ön analiz yap → doğru ürünü seç → tek bankayla başla. Bu yaklaşım onay ihtimalini artırır.",
    },
  ],
},

//////////////////////////////////////////7



{
  slug: "kirmizi-kalem-nedir-kara-liste-gercegi",
  title: "Kırmızı Kalem Nedir? ‘Kara Liste’ Gerçeği",
  excerpt:
    "Halk arasındaki ‘kara liste’ söylemi, bankaların gerçek risk yaklaşımı ve doğru toparlanma yolu.",
  category: "Yasal / Risk",
  topicId: "kirmizi-kalem",
  readingTime: "6 dk",
  date: "2026-01-03",
  coverImage: "/content/kirmizi-kalem-nedir.jpg",
  icon: "risk",
  views: 0,
  content: [
    {
      type: "h2",
      text: "Önce kavramı netleştirelim",
    },
    {
      type: "p",
      text: "Halk arasında ‘kara liste’ denince tek bir merkezi liste varmış gibi düşünülür. Gerçekte bankalar tek bir listeye değil; ödeme geçmişi, gecikmeler, yasal takipler ve son dönemdeki davranış sinyallerine birlikte bakar.",
    },

    {
      type: "h2",
      text: "Kırmızı kalem ne anlama gelir?",
    },
    {
      type: "p",
      text: "‘Kırmızı kalem’, bankanın seni geçici veya kalıcı olarak yüksek riskli görmesi anlamına gelir. Bu bir etiket değil; risk profilidir. Davranış değişirse profil de değişebilir.",
    },

    {
      type: "h2",
      text: "Bankalar hangi durumlarda ‘kırmızı kalem’ uygular?",
    },
    {
      type: "ul",
      items: [
        "90 gün ve üzeri gecikmeler",
        "Yasal takip / icra süreçleri",
        "Borç kapandıktan sonra tekrar gecikme",
        "Kısa sürede çok sayıda kredi başvurusu",
        "Limitlerin sürekli tavanda kullanılması",
      ],
    },

    {
      type: "h2",
      text: "Borcu kapattım, neden hâlâ zor?",
    },
    {
      type: "p",
      text: "Çünkü bankalar sadece borcun kapanmasına değil, kapanıştan sonraki davranışa bakar. Borç kapandıktan hemen sonra başvuru yapmak veya limiti tekrar zorlamak ‘risk devam ediyor’ sinyali üretebilir.",
    },

    {
      type: "h2",
      text: "Gerçekçi toparlanma süresi",
    },
    {
      type: "p",
      text: "Kırmızı kalemden çıkış tek günde olmaz. İlk olumlu sinyaller genelde 6–8 hafta içinde başlar. 3–6 ay düzenli davranışla risk algısı azalır; 6–12 ayda profil belirgin şekilde toparlanabilir.",
    },

    {
      type: "h2",
      text: "Doğru yol haritası",
    },
    {
      type: "ul",
      items: [
        "Önce gecikmeyi tamamen bitir",
        "Yeni olumsuz kayıt üretme",
        "Limit kullanımını düşür",
        "Başvuruları zamana yay",
        "Tek bankayla planlı ilerle",
      ],
    },

    {
      type: "callout",
      title: "Not",
      text: "Bu süreçte vaat değil; doğru planlama ve sabır işe yarar.",
    },
  ],
},

/////////////////////////////////////////


{
  slug: "sicili-bozuk-olan-kredi-alabilir-mi",
  title: "Sicili Bozuk Olan Kredi Alabilir mi?",
  excerpt:
    "Olumsuz sicil durumunda bankaların baktığı sinyaller ve ihtimali artıran gerçekçi adımlar.",
  category: "Yasal / Risk",
  topicId: "kirmizi-kalem",
  readingTime: "7 dk",
  date: "2026-01-03",
  coverImage: "/content/sicili-bozuk-olan-kredi.jpg",
  icon: "risk",
  views: 0,
  content: [
    {
      type: "h2",
      text: "Kısa cevap: Evet, ama her durumda değil",
    },
    {
      type: "p",
      text: "Sicili bozuk olan herkes kredi alamaz diye bir kural yoktur. Ancak onay ihtimali; sicilin ağırlığına, ne kadar zaman geçtiğine ve son dönemdeki davranışlara bağlıdır.",
    },

    {
      type: "h2",
      text: "Bankalar sicili bozuk bir dosyada neye bakar?",
    },
    {
      type: "ul",
      items: [
        "Gecikme veya yasal takip hâlâ devam ediyor mu?",
        "Borçlar kapandıktan sonra yeni gecikme var mı?",
        "Son 3–6 ayda ödeme düzeni nasıl?",
        "Borç/gelir oranı sürdürülebilir mi?",
        "Başvuru davranışı sakin mi, panik mi?",
      ],
    },

    {
      type: "h2",
      text: "İhtimali artıran doğru adımlar",
    },
    {
      type: "ul",
      items: [
        "Tüm gecikmeleri tamamen temizlemek",
        "Gelir bilgisini bankalarda güncellemek",
        "Kart ve kredi kullanımını dengelemek",
        "Başvuruları tek bankayla ve planlı yapmak",
        "Küçük ürünlerle güveni yeniden inşa etmek",
      ],
    },

    {
      type: "h2",
      text: "En sık yapılan hata",
    },
    {
      type: "p",
      text: "‘Bir yerden çıkar’ düşüncesiyle aynı anda birçok bankaya başvurmak. Bu davranış, zaten zayıf olan profili daha da baskılayabilir.",
    },

    {
      type: "h2",
      text: "Ne zaman başvurmak daha mantıklı?",
    },
    {
      type: "p",
      text: "Genelde borç kapandıktan sonra en az 2–3 ay gecikmesiz dönem geçmesi, kullanım oranlarının düşmesi ve gelir bilgilerinin güncel olması başvuru için daha sağlıklı bir zemin oluşturur.",
    },

    {
      type: "callout",
      title: "Özet",
      text: "Önce hasarı durdur, sonra dosyayı güçlendir, en son başvur. Ters sıra genelde reddi hızlandırır.",
    },
  ],
},

///////////////////////////////////////////

 {
  slug: "icralari-yeni-kapattim-ne-zaman-kredi-alabilirim",
  title: "İcraları Yeni Kapattım, Ne Zaman Kredi Alabilirim?",
  excerpt:
    "İcra kapandıktan sonra bankaların uyguladığı bekleme süreleri ve doğru ürünlerle yeniden krediye ulaşma süreci.",
  category: "Yasal / Risk",
  topicId: "kirmizi-kalem",
  readingTime: "7 dk",
  date: "2026-01-03",
  coverImage: "/content/icralari-yeni-kapattim-kredi.jpg",
  icon: "risk",
  views: 0,
  content: [
    {
      type: "h2",
      text: "Kısa cevap: Hemen değil, ama doğru adımlarla mümkün",
    },
    {
      type: "p",
      text: "İcra veya yasal takip yeni kapatıldıysa bankalar ilk etapta kredi kullandırmaz. Dosya kapanmış olsa bile sistem, bir süre davranış izlemek ister. Bu nedenle ‘kapattım, hemen kredi çıkar mı?’ beklentisi çoğu zaman gerçekçi değildir.",
    },

    {
      type: "h2",
      text: "İlk 6 ay neden kritik?",
    },
    {
      type: "p",
      text: "İcra kapandıktan sonraki ilk 6 ay, bankalar açısından bir izleme dönemidir. Bu süreçte genellikle ihtiyaç kredisi, taksitli nakit veya yeni limitli ürünler verilmez. Bankalar, borcun kapatıldıktan sonra ödeme düzeninin gerçekten oturup oturmadığını görmek ister.",
    },

    {
      type: "h2",
      text: "Bu dönemde ne yapılmalı?",
    },
    {
      type: "ul",
      items: [
        "Yeni bir gecikmeye kesinlikle düşmemek",
        "Varsa mevcut kartları düşük kullanım oranıyla düzenli ödemek",
        "Gelir bilgisini bankalarda güncel tutmak",
        "Gereksiz ve deneme amaçlı kredi başvurularından kaçınmak",
      ],
    },

    {
      type: "h2",
      text: "6. aydan sonra ilk adım: Teminatlı ürünler",
    },
    {
      type: "p",
      text: "Yaklaşık 6 ay gecikmesiz bir dönemden sonra, birçok dosyada teminatlı veya blokeli kredi kartı ile yeniden puan oluşturmak mümkün olur. Bu kartlarda amaç harcama yapmak değil, ödeme disiplinini sisteme yeniden göstermektir.",
    },

    {
      type: "h2",
      text: "6–12 ay arası ne değişir?",
    },
    {
      type: "p",
      text: "Teminatlı kartların düzenli kullanılması, borç/limit oranının dengede tutulması ve gelir-gider dengesinin korunması halinde, 6–12 ay sonunda bazı bankalarda düşük veya orta limitli ürünlere geçiş ihtimali oluşabilir. Ancak bu süreç her dosyada aynı hızda ilerlemez.",
    },

    {
      type: "h2",
      text: "En sık yapılan hata",
    },
    {
      type: "p",
      text: "İcra kapandıktan hemen sonra ‘şansımı deneyeyim’ diyerek aynı anda birçok bankaya başvurmak. Bu davranış, toparlanma sürecini hızlandırmak yerine çoğu zaman uzatır.",
    },

    {
      type: "callout",
      title: "Özet",
      text: "İcra kapandıktan sonra önce sabır, sonra doğru ürün, en son kredi. İlk 6 ay sessizlik, 6–12 ay kontrollü ilerleme en sağlıklı yoldur.",
    },
  ],
},

///////////////////////////////////
{
  slug: "puanım-dusuk-kredi-cekmek-istiyorum",
  title: "Puanım Düşük, Kredi Çekmek İstiyorum",
  excerpt:
    "Kredi notu aralıklarına göre bankaların yaklaşımı ve hangi puanda ne kadar kredi ihtimali olduğu.",
  category: "Yasal / Risk",
  topicId: "kirmizi-kalem",
  readingTime: "6 dk",
  date: "2026-01-03",
  coverImage: "/content/puanim-dusuk-kredi.jpg",
  icon: "risk",
  views: 0,
  content: [
    {
      type: "h2",
      text: "Kısa cevap: Puan tek başına yeterli değil",
    },
    {
      type: "p",
      text: "Kredi notu düşük olan birçok kişi kredi çekmenin imkânsız olduğunu düşünür. Oysa bankalar sadece puana değil, puanın hangi aralıkta olduğuna ve bu puanın nasıl oluştuğuna bakar. Aynı ‘düşük’ görünen puan, iki farklı dosyada tamamen farklı sonuçlar doğurabilir.",
    },

    {
      type: "h2",
      text: "Kredi notu aralıkları ne anlama gelir?",
    },
    {
      type: "ul",
      items: [
        "1300 altı: Düşük risk – kredi ihtimali oldukça sınırlı",
        "1300–1500 arası: Orta risk – düşük tutarlı ürünler mümkün olabilir",
        "1500–1900 arası: Görece güçlü profil – limitler ve seçenekler artar",
      ],
    },

    {
      type: "h2",
      text: "Bankalar bu puanlara nasıl yaklaşır?",
    },
    {
      type: "p",
      text: "Bankalar kredi limitlerini büyük ölçüde kredi notu aralığına göre belirler. Ancak gelir durumu, mevcut borçlar ve son dönem ödeme davranışı bu limitleri yukarı veya aşağı çekebilir. Yani puan bir kapı açar, ama içerideki tabloyu davranışlar belirler.",
    },

    {
      type: "h2",
      text: "Puan düşükse neden reddediliyor?",
    },
    {
      type: "p",
      text: "Düşük puan genellikle geçmiş gecikmeler, yüksek borç/limit oranı veya düzensiz ödeme alışkanlıklarından kaynaklanır. Banka açısından bu durum, yeni bir kredinin geri dönüş riskinin yüksek olduğu anlamına gelir.",
    },

    {
      type: "h2",
      text: "İhtimali artırmak için ne yapılabilir?",
    },
    {
      type: "ul",
      items: [
        "Mevcut kart ve kredilerde gecikmesiz ödeme düzeni oluşturmak",
        "Kredi kartı kullanım oranını düşürmek",
        "Gelir bilgisini bankalarda güncellemek",
        "Kredi başvurularını sınırlı ve planlı yapmak",
      ],
    },

    {
      type: "h2",
      text: "En sık yapılan hata",
    },
    {
      type: "p",
      text: "Puan düşükken aynı anda birçok bankaya başvurmak. Bu davranış puanı daha da baskılar ve toparlanma süresini uzatır.",
    },

    {
      type: "callout",
      title: "Özet",
      text: "Kredi notu düşükse önce puanı hangi aralıkta olduğunla doğru okumak gerekir. Puan yükseldikçe limit ve ürün seçenekleri de kademeli olarak artar.",
    },
  ],
},
//////////////////////////////////

{
  slug: "kredi-puanimi-nasil-yukseltirim",
  title: "Kredi Puanımı Nasıl Yükseltirim?",
  excerpt:
    "Kredi notunu gerçekten etkileyen davranışlar ve puanı baskılayan yaygın hatalar.",
  category: "Bilgilendirme",
  topicId: "genel",
  readingTime: "6 dk",
  date: "2026-01-03",
  coverImage: "/content/kredi-puanimi-nasil-yukseltirim.jpg",
  icon: "info",
  views: 0,
  content: [
    {
      type: "h2",
      text: "Kısa cevap: Düzenli ve ölçülü davranış",
    },
    {
      type: "p",
      text: "Kredi puanı tek bir hamleyle yükselmez. Bankalar puanı, zaman içinde oluşan ödeme düzenine ve kullanım alışkanlıklarına göre hesaplar. Bu nedenle küçük ama doğru davranışlar, puanı kalıcı şekilde yukarı taşır.",
    },

    {
      type: "h2",
      text: "Kart kullanım oranı neden önemli?",
    },
    {
      type: "p",
      text: "Kredi kartı limitlerinin tamamına yakınını kullanmak, ödeme yapılsa bile riskli algılanır. Genel kural, kart limitlerinin yüzde 30’unu geçmeyecek şekilde kullanım yapmaktır. Bu oran, bankalar için ‘kontrollü kullanım’ sinyali verir.",
    },

    {
      type: "h2",
      text: "Ek hesap puanı nasıl etkiler?",
    },
    {
      type: "p",
      text: "Ek hesap (kredili mevduat hesabı) sürekli kullanıldığında, nakit ihtiyacının kalıcı olduğu izlenimi yaratabilir. Bu da kredi puanını baskılayabilir. Eğer kullanılıyorsa, mümkün olan en kısa sürede kapatılması ve alışkanlık hâline getirilmemesi önemlidir.",
    },

    {
      type: "h2",
      text: "Ödeme günü hassasiyeti",
    },
    {
      type: "p",
      text: "Tüm kredi ve kart ödemeleri tam gününde yapılmalıdır. Ne gecikmeli ne de sürekli çok erken ödemeler, sistem açısından ideal değildir. Bankalar düzeni ve tutarlılığı görmek ister.",
    },

    {
      type: "h2",
      text: "Puanı yükselten temel alışkanlıklar",
    },
    {
      type: "ul",
      items: [
        "Kart limitlerinin yüzde 30’unu aşmamak",
        "Ek hesap kullanımından kaçınmak veya hızlı kapatmak",
        "Tüm ödemeleri tam gününde ve eksiksiz yapmak",
        "Gereksiz kredi başvurularından uzak durmak",
      ],
    },

    {
      type: "h2",
      text: "En sık yapılan hata",
    },
    {
      type: "p",
      text: "Puan yükselsin diye kısa sürede çok fazla işlem yapmak. Oysa kredi notu aceleyi değil, sürekliliği ödüllendirir.",
    },

    {
      type: "callout",
      title: "Özet",
      text: "Kredi puanı hızla değil, doğru alışkanlıklarla yükselir. Ölçülü kullanım, temiz ödeme ve sabır en güçlü üçlüdür.",
    },
  ],
},
///////////////////////////////

////////////////////////////////

{
  slug: "aktif-kullandigim-urun-yok-ne-yapmaliyim",
  title: "Aktif Kullandığım Bir Banka Ürünüm Yok, Ne Yapmalıyım?",
  excerpt:
    "Hiç aktif kart veya kredi yokken kredi puanı oluşturmanın en doğru ve risksiz yolu.",
  category: "Bilgilendirme",
  topicId: "genel",
  readingTime: "6 dk",
  date: "2026-01-03",
  coverImage: "/content/aktif-urun-yok.jpg",
  icon: "info",
  views: 0,
  content: [
    {
      type: "h2",
      text: "Kısa cevap: Önce ürün, sonra puan",
    },
    {
      type: "p",
      text: "Aktif kullanılan bir banka ürünü yoksa kredi puanı da oluşmaz. Bankalar, puanı hesaplayabilmek için kart, kredi veya benzeri bir finansal hareket görmek ister. Bu nedenle ‘ürünüm yok ama puanım neden yükselmiyor?’ sorusu oldukça yaygındır.",
    },

    {
      type: "h2",
      text: "İlk adım: Doğru bankadan başlamak",
    },
    {
      type: "p",
      text: "Geçmişte sorun yaşanmamış, yasal takip veya uzun gecikme bulunmayan bir bankadan başlamak en sağlıklı yoldur. Bu tür bankalar, dosyaya daha olumlu yaklaşabilir ve ilk ürünü vermeye daha açıktır.",
    },

    {
      type: "h2",
      text: "Teminatlı (blokeli) kredi kartı neden önerilir?",
    },
    {
      type: "p",
      text: "Teminatlı veya blokeli kredi kartları, yatırılan tutar kadar limit tanımlanan ürünlerdir. Banka için risk düşüktür; kullanıcı için ise puan oluşturmanın en güvenli yoludur. Bu kartın 2–3 ay boyunca düzenli ve ölçülü kullanılması, sistemde ilk pozitif sinyalleri oluşturur.",
    },

    {
      type: "h2",
      text: "Kart kullanımı nasıl olmalı?",
    },
    {
      type: "ul",
      items: [
        "Limitin tamamı değil, küçük bir kısmı kullanılmalı",
        "Her ay düzenli harcama yapılıp tamamı ödenmeli",
        "Asgari ödeme alışkanlık hâline getirilmemeli",
        "Gecikmeye kesinlikle düşülmemeli",
      ],
    },

    {
      type: "h2",
      text: "Puan oluştuktan sonra ikinci adım",
    },
    {
      type: "p",
      text: "İlk puan oluştuktan sonra, düzenli ödemesi olan küçük tutarlı alışveriş kredileriyle kredi notu daha hızlı yükseltilebilir. Burada önemli olan tutar değil, ödeme disiplinidir.",
    },

    {
      type: "h2",
      text: "En sık yapılan hata",
    },
    {
      type: "p",
      text: "Hiç aktif ürün yokken doğrudan kredi başvurusu yapmak. Sistem puan göremediği için bu başvurular genellikle olumsuz sonuçlanır.",
    },

    {
      type: "callout",
      title: "Özet",
      text: "Ürün yoksa puan da yok. Önce teminatlı kartla iz bırak, sonra küçük ve düzenli ürünlerle puanı büyüt.",
    },
  ],
},
//////////////////////

{
  slug: "yeni-kredi-cektim-yine-kredi-cekebilir-miyim",
  title: "Yeni Kredi Çektim, Tekrar Kredi Çekebilir miyim?",
  excerpt:
    "Yeni çekilen bir krediden sonra bankaların neden bekleme süresi istediği ve doğru zamanlama.",
  category: "Bilgilendirme",
  topicId: "genel",
  readingTime: "6 dk",
  date: "2026-01-03",
  coverImage: "/content/yeni-kredi-tekrar.jpg",
  icon: "info",
  views: 0,
  content: [
    {
      type: "h2",
      text: "Kısa cevap: Hemen değil",
    },
    {
      type: "p",
      text: "Yeni bir kredi çekildikten hemen sonra tekrar kredi başvurusu yapmak çoğu zaman olumsuz sonuçlanır. Bankalar, ilk kredinin ödeme davranışını görmeden ikinci bir borç yükünü onaylamak istemez.",
    },

    {
      type: "h2",
      text: "Bankalar neden bekler?",
    },
    {
      type: "p",
      text: "Yeni kredi, banka açısından henüz ‘kanıtlanmamış’ bir risktir. Bu nedenle bankalar, en az birkaç taksitin düzenli ödenmesini bekleyerek ödeme alışkanlığını görmek ister.",
    },

    {
      type: "h2",
      text: "Kaç taksit sonra tekrar kredi mümkün olur?",
    },
    {
      type: "p",
      text: "Genel uygulamada, yeni çekilen krediden sonra en az 2–3 taksitin gününde ve eksiksiz ödenmiş olması gerekir. Bu ödemeler, dosyada pozitif bir sinyal oluşturur.",
    },

    {
      type: "h2",
      text: "Bu süreçte nelere dikkat edilmeli?",
    },
    {
      type: "ul",
      items: [
        "Taksitlerin tam gününde ödenmesi",
        "Yeni borç veya gecikme oluşturmamak",
        "Kart ve ek hesap kullanımını kontrol altında tutmak",
        "Gereksiz kredi başvurularından kaçınmak",
      ],
    },

    {
      type: "h2",
      text: "Neden erken başvuru zararlı olabilir?",
    },
    {
      type: "p",
      text: "Kredi çekilir çekilmez yapılan başvurular, gelir/borç dengesinin zorlandığı izlenimi yaratabilir. Bu durum, sadece yeni başvuruyu değil, ilerideki kredi ihtimalini de etkileyebilir.",
    },

    {
      type: "callout",
      title: "Özet",
      text: "Yeni kredi çekildiyse önce ödeme disiplini gösterilmeli. 2–3 düzenli taksit, ikinci kredi için en güçlü referanstır.",
    },
  ],
},




];

export function getPost(slug: string) {
  return POSTS.find((p) => p.slug === slug) ?? null;
}

export function getPostsByTopic(topicId: TopicId) {
  return POSTS.filter((p) => p.topicId === topicId);
}

export function getCategories() {
  return Array.from(new Set(POSTS.map((p) => p.category)));
}
