export const dynamic = "force-static";

export default function QaSoon() {
  return (
    <main className="container mx-auto px-4 py-16">
      <h1 className="text-2xl font-semibold">Soru–Cevap yakında</h1>
      <p className="mt-3 text-neutral-600 max-w-2xl">
        Daha güvenli ve hızlı bir deneyim için bu bölümü yeniden hazırlıyoruz.
        Şimdilik Kredi Rehberi içeriklerine göz atabilirsin.
      </p>

      <div className="mt-6">
        <a
          href="/rehber"
          className="inline-flex items-center rounded-lg px-4 py-2 border"
        >
          Kredi Rehberi’ne git →
        </a>
      </div>
    </main>
  );
}
