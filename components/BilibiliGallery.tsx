import { siteConfig } from "@/content/site";

export default function BilibiliGallery() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {siteConfig.bilibiliVideos.map((video) => (
        <div
          key={video.title}
          className="overflow-hidden rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] shadow-sm"
        >
          <div className="aspect-video w-full">
            <iframe
              src={video.embedUrl}
              title={video.title}
              className="h-full w-full"
              loading="lazy"
              allowFullScreen
            />
          </div>
          <div className="px-4 py-3 text-sm font-medium">{video.title}</div>
        </div>
      ))}
    </div>
  );
}
