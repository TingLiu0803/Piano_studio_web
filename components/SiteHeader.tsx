import Link from "next/link";
import { type Locale, content, locales, siteConfig } from "@/content/site";

type SiteHeaderProps = {
  locale: Locale;
};

export default function SiteHeader({ locale }: SiteHeaderProps) {
  const localized = content[locale];
  const otherLocales = locales.filter((item) => item !== locale);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[color:var(--border)] bg-[color:var(--surface)] backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
        <Link href={`/${locale}`} className="text-lg font-semibold">
          {siteConfig.studioName}
        </Link>
        <nav className="flex items-center gap-4 text-sm font-medium">
          <Link href={`/${locale}`}>{localized.nav.home}</Link>
          <Link href={`/${locale}/about`}>{localized.nav.about}</Link>
          <Link href={`/${locale}/contact`}>{localized.nav.contact}</Link>
          <Link
            href={`/${locale}/trial`}
            className="hidden rounded-full bg-[color:var(--primary)] px-4 py-2 text-xs font-semibold text-[color:var(--primary-foreground)] transition hover:bg-[color:var(--primary-hover)] sm:inline-flex"
          >
            {localized.nav.trial}
          </Link>
          {otherLocales.map((item) => (
            <Link
              key={item}
              href={`/${item}`}
              className="rounded-full border border-[color:var(--border)] px-3 py-1 text-xs"
            >
              {content[item].languageLabel}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
