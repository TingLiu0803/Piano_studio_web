import { siteConfig, type Locale } from "@/content/site";
import VideoCard from "@/components/VideoCard";

type BilibiliGalleryProps = {
  locale?: Locale;
};

export default function BilibiliGallery({ locale = "en" }: BilibiliGalleryProps) {
  const loadLabel = locale === "en" ? "Play video" : "播放视频";
  const openLabel = locale === "en" ? "Open on Bilibili" : "在哔哩哔哩查看";

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {siteConfig.bilibiliVideos.map((video) => (
        <VideoCard
          key={video.bvid}
          title={video.title}
          description={video.description}
          embedUrl={video.embedUrl}
          watchUrl={video.watchUrl}
          loadLabel={loadLabel}
          openLabel={openLabel}
          caption={(video as { caption?: string }).caption}
          compact
        />
      ))}
    </div>
  );
}
