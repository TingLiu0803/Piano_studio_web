import Link from "next/link";
import { type Locale, content, locales, siteConfig } from "@/content/site";

type SiteHeaderProps = {
  locale: Locale;
};

export default function SiteHeader({ locale }: SiteHeaderProps) {
  const localized = content[locale];
  const otherLocales = locales.filter((item) => item !== locale);

  return (
    <header className="w-full border-b border-zinc-200 bg-white/80 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/80">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
        <Link href={`/${locale}`} className="text-lg font-semibold">
          {siteConfig.studioName}
        </Link>
        <nav className="flex items-center gap-6 text-sm font-medium">
          <Link href={`/${locale}`}>{localized.nav.home}</Link>
          <Link href={`/${locale}/about`}>{localized.nav.about}</Link>
          <Link href={`/${locale}/trial`}>{localized.nav.trial}</Link>
          <Link href={`/${locale}/contact`}>{localized.nav.contact}</Link>
          {otherLocales.map((item) => (
            <Link
              key={item}
              href={`/${item}`}
              className="rounded-full border border-zinc-200 px-3 py-1 text-xs dark:border-zinc-700"
            >
              {content[item].languageLabel}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
