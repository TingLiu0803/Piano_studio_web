import Link from "next/link";
import { type Locale, content, siteConfig } from "@/content/site";
import { landingPageSlugs } from "@/content/landing-pages";
import Logo from "@/components/ui/Logo";
import Icon from "@/components/ui/Icon";

type SiteFooterProps = {
  locale: Locale;
};

const labelClass =
  "text-[11px] font-bold uppercase tracking-[0.12em] text-[color:var(--accent-on-dark)]";

export default function SiteFooter({ locale }: SiteFooterProps) {
  const localized = content[locale];
  const labels = localized.seo.breadcrumbLabels;

  // Dark near-black anchor band (MusicNBrain family). Accents use the brighter
  // marigold; NAP comes from siteConfig only; trust signals are surfaced.
  return (
    <footer className="bg-[color:var(--surface-inverse)] text-[color:var(--surface-inverse-foreground)]">
      <div className="mx-auto grid w-full max-w-[var(--content-max)] gap-8 px-6 py-12 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Logo surface="dark" size="md" name={siteConfig.studioName} />
          <p className="mt-3.5 max-w-sm text-sm leading-relaxed text-white/70">
            {localized.seo.description}
          </p>
          <div className="mt-4 flex gap-3 text-white/80">
            <a href={`mailto:${siteConfig.email}`} aria-label="Email the studio">
              <Icon name="mail" size={22} />
            </a>
            <a href={siteConfig.ownerProfiles[0]} target="_blank" rel="noreferrer" aria-label="Performances on Bilibili">
              <Icon name="smart_display" size={22} />
            </a>
          </div>
        </div>

        <div>
          <div className={labelClass}>{localized.footer.lessonPages}</div>
          <ul className="mt-3 flex flex-col gap-2 text-sm text-white/80">
            {landingPageSlugs.map((slug) => (
              <li key={slug}>
                <Link
                  href={`/${locale}/${slug}`}
                  className="underline-offset-4 transition-colors hover:text-[color:var(--accent-on-dark)] hover:underline"
                >
                  {labels?.[slug] ?? slug}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className={labelClass}>{localized.nav.contact}</div>
          <ul className="mt-3 flex flex-col gap-2 text-sm text-white/80">
            <li>
              <a href={`mailto:${siteConfig.email}`} className="underline-offset-4 hover:underline">
                {siteConfig.email}
              </a>
            </li>
            <li>
              <a href={`tel:${siteConfig.phoneE164}`} className="underline-offset-4 hover:underline">
                {siteConfig.phone}
              </a>
            </li>
            <li>{siteConfig.addressLine}</li>
          </ul>
        </div>
      </div>

      <div className="mx-auto w-full max-w-[var(--content-max)] px-6 pb-8">
        <div className="flex flex-col gap-3 border-t border-white/10 pt-5 text-xs text-white/55 sm:flex-row sm:items-center sm:justify-between">
          <span className="inline-flex items-center gap-2">
            <Icon name="verified" size={18} style={{ color: "var(--accent-on-dark)" }} />
            {localized.sections.landingPartnerFooter}
          </span>
          <span className="text-white/45">
            © {new Date().getFullYear()} {siteConfig.studioName}. All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  );
}
