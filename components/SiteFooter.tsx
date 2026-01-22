import { type Locale, content, siteConfig } from "@/content/site";

type SiteFooterProps = {
  locale: Locale;
};

export default function SiteFooter({ locale }: SiteFooterProps) {
  const localized = content[locale];

  return (
    <footer className="border-t border-[color:var(--border)] bg-[color:var(--surface)]">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-6 py-8 text-sm text-[color:var(--muted-foreground)]">
        <div className="flex flex-col gap-2">
          <span className="font-semibold text-[color:var(--foreground)]">
            {siteConfig.studioName}
          </span>
          <span>{siteConfig.serviceArea}</span>
          <span>{siteConfig.addressLine}</span>
        </div>
        <div className="flex flex-wrap gap-4">
          <span>{siteConfig.email}</span>
          <span>{siteConfig.phone}</span>
          <span>{localized.seo.description}</span>
        </div>
        <span className="text-xs">
          {new Date().getFullYear()} {siteConfig.studioName}. All rights
          reserved.
        </span>
      </div>
    </footer>
  );
}
