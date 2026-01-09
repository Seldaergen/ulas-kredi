// components/home/VideoSection.tsx
import VideoSectionClient from "./VideoSectionClient";

type ShortVideo = {
  id: string;
  title: string;
  url: string;
  thumbnail: string;
  tag: string;
  publishedAt?: string;
};

const YT_SHORTS_URL = "https://www.youtube.com/@danismanerdiergen/shorts";

// YouTube ISO 8601 duration: PT#H#M#S
function parseIsoDurationToSeconds(iso: string): number {
  const m = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!m) return 999999;
  const h = m[1] ? parseInt(m[1], 10) : 0;
  const min = m[2] ? parseInt(m[2], 10) : 0;
  const s = m[3] ? parseInt(m[3], 10) : 0;
  return h * 3600 + min * 60 + s;
}

function pickBestThumb(snippet: any): string {
  const t = snippet?.thumbnails;
  return (
    t?.maxres?.url ||
    t?.standard?.url ||
    t?.high?.url ||
    t?.medium?.url ||
    t?.default?.url ||
    ""
  );
}

// “etiket” üretimi: başlıktaki ilk anlamlı 2-3 kelime
function makeTagFromTitle(title: string): string {
  const cleaned = (title || "")
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();

  const words = cleaned.split(" ").filter(Boolean);

  const pick = words.slice(0, Math.min(3, words.length)).join(" ");
  return (pick || "Kredi Rehberi") + "…";
}

async function fetchShorts(): Promise<ShortVideo[] | null> {
  const apiKey = process.env.YOUTUBE_API_KEY;
  const channelId = process.env.YOUTUBE_CHANNEL_ID;

  // ✅ ENV yoksa: ana sayfada bu bloğu göstermeyelim (güvenli)
  if (!apiKey || !channelId) {
    console.warn(
      "[VideoSection] YOUTUBE_API_KEY veya YOUTUBE_CHANNEL_ID yok. VideoSection render edilmeyecek."
    );
    return null;
  }

  try {
    // 1) En yeni videoId’leri çek
    const searchParams = new URLSearchParams({
      part: "snippet",
      channelId,
      maxResults: "25",
      order: "date",
      type: "video",
      key: apiKey,
    });

    const searchRes = await fetch(
      `https://www.googleapis.com/youtube/v3/search?${searchParams.toString()}`,
      { next: { revalidate: 300 } } // 5 dk
    );

    if (!searchRes.ok) {
      console.error(
        "[VideoSection] search error:",
        searchRes.status,
        searchRes.statusText
      );
      return [];
    }

    const searchData = await searchRes.json();

    const ids: string[] =
      (searchData?.items ?? [])
        .map((it: any) => it?.id?.videoId)
        .filter(Boolean) || [];

    if (ids.length === 0) return [];

    // 2) Detaylar (duration + thumbnails)
    const videosParams = new URLSearchParams({
      part: "contentDetails,snippet",
      id: ids.join(","),
      key: apiKey,
    });

    const videosRes = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?${videosParams.toString()}`,
      { next: { revalidate: 300 } }
    );

    if (!videosRes.ok) {
      console.error(
        "[VideoSection] videos error:",
        videosRes.status,
        videosRes.statusText
      );
      return [];
    }

    const videosData = await videosRes.json();
    const items: any[] = videosData?.items ?? [];

    const shorts = items
      .map((v) => {
        const videoId = String(v?.id || "");
        const title = (v?.snippet?.title as string) || "";
        const publishedAt = v?.snippet?.publishedAt as string | undefined;

        const thumbnail = pickBestThumb(v?.snippet);
        const isoDur = (v?.contentDetails?.duration as string) || "PT999M";
        const seconds = parseIsoDurationToSeconds(isoDur);

        return {
          id: videoId,
          title,
          url: `https://www.youtube.com/shorts/${videoId}`,
          thumbnail,
          tag: makeTagFromTitle(title),
          publishedAt,
          _seconds: seconds,
        };
      })
      // ✅ Shorts mantığı: süre <= 60sn
      .filter((x) => x.id && x._seconds <= 60 && x.thumbnail)
      .slice(0, 12)
      .map(({ _seconds, ...rest }) => rest);

    return shorts;
  } catch (err) {
    console.error("[VideoSection] fetchShorts exception:", err);
    return [];
  }
}

export default async function VideoSection() {
  const videos = await fetchShorts();

  // ✅ ENV yoksa (null): hiç render etmeyelim
  if (videos === null) return null;

  // ✅ ÖNEMLİ: Anchor hedefi burada!
  return (
    <section id="videolar" className="scroll-mt-24">
      <VideoSectionClient
        videos={videos}
        youtubeShortsUrl={YT_SHORTS_URL}
        secondsPerVideo={10}
      />
    </section>
  );
}
