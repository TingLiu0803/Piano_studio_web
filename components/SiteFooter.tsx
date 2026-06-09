import Link from "next/link";
import { type Locale, content, siteConfig } from "@/content/site";
import { landingPageSlugs } from "@/content/landing-pages";
import PianoKeyboardMark from "@/components/PianoKeyboardMark";

type SiteFooterProps = {
  locale: Locale;
};

export default function SiteFooter({ locale }: SiteFooterProps) {
  const localized = content[locale];
  const labels = localized.seo.breadcrumbLabels;

  return (
    <footer className="border-t border-[color:var(--border)] bg-[color:var(--surface)]">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-8 text-sm text-[color:var(--muted-foreground)]">
        <div className="flex flex-col gap-2">
          <span className="inline-flex items-center gap-2 font-semibold text-[color:var(--foreground)]">
            <PianoKeyboardMark className="h-5 w-5 shrink-0" />
            <span>{siteConfig.studioName}</span>
          </span>
          <span>{siteConfig.serviceArea}</span>
          <span>{siteConfig.addressLine}</span>
        </div>
        <div>
          <div className="text-xs font-semibold uppercase tracking-wide text-[color:var(--foreground)]">
            {localized.footer.lessonPages}
          </div>
          <ul className="mt-2 flex flex-col gap-1 sm:flex-row sm:flex-wrap sm:gap-x-4 sm:gap-y-1">
            {landingPageSlugs.map((slug) => (
              <li key={slug}>
                <Link
                  href={`/${locale}/${slug}`}
                  className="text-[color:var(--link)] underline-offset-4 transition hover:text-[color:var(--link-hover)] hover:underline"
                >
                  {labels?.[slug] ?? slug}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-wrap gap-4">
          <span>{siteConfig.email}</span>
          <span>{siteConfig.phone}</span>
          <a
            href="https://www.musicnbrain.com/"
            target="_blank"
            rel="noreferrer"
            className="font-semibold text-[color:var(--link)] underline-offset-4 transition hover:text-[color:var(--link-hover)] hover:underline"
          >
            MusicNBrain partnership
          </a>
        </div>
        <p className="max-w-3xl text-xs leading-relaxed">
          {localized.seo.description}
        </p>
        <span className="text-xs">
          © {new Date().getFullYear()} {siteConfig.studioName}. All rights
          reserved.
        </span>
      </div>
    </footer>
  );
}
