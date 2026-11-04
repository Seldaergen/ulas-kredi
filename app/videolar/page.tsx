import { Suspense } from "react";
import { ConversionPanel } from "@/components/inner-page";
import { pageMetadata } from "@/lib/seo";
import { getVideos } from "@/lib/videos/server";
import VideosClient from "@/components/videos/VideosClient";

export const dynamic = "force-dynamic";
export const metadata = pageMetadata("Videolar", "Kredi sürecine ilişkin video arşivi ve ilgili rehberler. Kredi değerlendirmesi ilgili finans kuruluşuna aittir.", "/videolar");

export default async function VideosPage() {
  const videos = await getVideos();
  return <main>
    <Suspense fallback={<h1>Videolar</h1>}><VideosClient initialVideos={videos} /></Suspense>
    <div className="ef-wrap"><ConversionPanel title="Videodaki konuyu birlikte değerlendirelim." description="Anlatılanların sizin durumunuzdaki karşılığını konuşmak için danışmanlık başvurunuzu bırakın." /></div>
  </main>;
}
