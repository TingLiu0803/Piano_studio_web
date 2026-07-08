"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { type Locale, content, locales, siteConfig } from "@/content/site";
import { landingPageSlugs } from "@/content/landing-pages";
import Logo from "@/components/ui/Logo";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";

type SiteHeaderProps = {
  locale: Locale;
};

const navLinkClass =
  "rounded-md px-1 py-1.5 text-[15px] font-bold text-[color:var(--foreground)] transition-colors hover:text-[color:var(--mnb-ink)]";

export default function SiteHeader({ locale }: SiteHeaderProps) {
  const localized = content[locale];
  const otherLocale = locales.find((item) => item !== locale) ?? locale;
  // Switch to the SAME page in the other locale (slugs are shared across
  // locales — only the leading /en|/zh segment differs), not back to home.
  const pathname = usePathname();
  const switchLocaleHref = pathname
    ? pathname.replace(/^\/[^/]+/, `/${otherLocale}`)
    : `/${otherLocale}`;
  const [isOpen, setIsOpen] = useState(false);
  const [lessonsOpen, setLessonsOpen] = useState(false);
  const lessonsRef = useRef<HTMLDivElement>(null);

  const lessonLabels = localized.seo.breadcrumbLabels;

  useEffect(() => {
    if (!lessonsOpen) return;
    const handle = (e: MouseEvent) => {
      if (lessonsRef.current && !lessonsRef.current.contains(e.target as Node)) {
        setLessonsOpen(false);
      }
    };
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, [lessonsOpen]);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[color:var(--border)] bg-[color:var(--surface)]">
      <div className="mx-auto flex w-full max-w-[var(--content-max)] items-center justify-between gap-4 px-6 py-3.5">
        <Link href={`/${locale}`} aria-label={siteConfig.studioName}>
          <Logo size="md" name={siteConfig.studioName} />
        </Link>

        <nav className="hidden items-center gap-4 lg:flex">
          <Link href={`/${locale}`} className={navLinkClass}>
            {localized.nav.home}
          </Link>

          <div className="relative" ref={lessonsRef}>
            <button
              type="button"
              className={`inline-flex items-center gap-1 ${navLinkClass}`}
              aria-expanded={lessonsOpen}
              aria-haspopup="true"
              onClick={() => setLessonsOpen((v) => !v)}
            >
              {localized.nav.lessonsMenu}
              <Icon name="expand_more" size={18} style={{ opacity: 0.7 }} />
            </button>
            {lessonsOpen ? (
              <div
                role="menu"
                className="absolute left-0 top-full z-50 mt-2 min-w-[min(100vw-3rem,15rem)] rounded-[var(--radius-md)] border border-[color:var(--border)] bg-[color:var(--surface)] p-1.5 shadow-[var(--shadow-overlay)]"
              >
                {landingPageSlugs.map((slug) => (
                  <Link
                    key={slug}
                    role="menuitem"
                    href={`/${locale}/${slug}`}
                    className="block rounded-[var(--radius-sm)] px-3 py-2.5 text-sm font-semibold text-[color:var(--text-body,var(--foreground))] transition-colors hover:bg-[color:var(--surface-soft)]"
                    onClick={() => setLessonsOpen(false)}
                  >
                    {lessonLabels?.[slug] ?? slug}
                  </Link>
                ))}
                <Link
                  href={`/${locale}#lesson-options`}
                  className="mt-1 block border-t border-[color:var(--border)] px-3 pb-1 pt-2.5 text-[11px] font-bold uppercase tracking-[0.12em] text-[color:var(--muted-foreground)] transition-colors hover:text-[color:var(--mnb-ink)]"
                  onClick={() => setLessonsOpen(false)}
                >
                  {localized.hero.browseAllLessonTypes}
                </Link>
              </div>
            ) : null}
          </div>

          <Link href={`/${locale}/about`} className={navLinkClass}>
            {localized.nav.about}
          </Link>
          <Link href={`/${locale}/journal`} className={navLinkClass}>
            {localized.nav.journal}
          </Link>
          <Link href={`/${locale}/contact`} className={navLinkClass}>
            {localized.nav.contact}
          </Link>
          <a
            href="https://www.musicnbrain.com/"
            target="_blank"
            rel="noreferrer"
            className={`inline-flex items-center gap-1 ${navLinkClass}`}
            style={{ color: "var(--mnb-logo-green-deep)" }}
          >
            <Icon name="open_in_new" size={17} />
            {localized.nav.musicnbrain}
          </a>

          <Link
            href={switchLocaleHref}
            aria-label={localized.labels.switchLanguage}
            className="inline-flex items-center gap-1.5 rounded-[var(--radius-pill)] border border-[color:var(--border-strong)] px-3 py-1.5 text-[13px] font-bold text-[color:var(--foreground)] transition-colors hover:bg-[color:var(--surface-soft)]"
          >
            <Icon name="translate" size={16} />
            {content[otherLocale].languageLabel}
          </Link>

          <Button href={`/${locale}/trial`} size="sm" variant="primary">
            {localized.nav.trial}
          </Button>
        </nav>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-[var(--radius-sm)] border border-[color:var(--border)] p-2 text-[color:var(--foreground)] lg:hidden"
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          aria-label="Menu"
          onClick={() => setIsOpen((current) => !current)}
        >
          <Icon name={isOpen ? "close" : "menu"} size={22} />
        </button>
      </div>

      <div
        id="mobile-menu"
        className={`border-t border-[color:var(--border)] bg-[color:var(--surface)] lg:hidden ${isOpen ? "block" : "hidden"}`}
      >
        <div className="mx-auto flex w-full max-w-[var(--content-max)] flex-col gap-4 px-6 py-5 text-[15px] font-bold">
          <Link href={`/${locale}`} onClick={() => setIsOpen(false)}>
            {localized.nav.home}
          </Link>
          <div className="flex flex-col gap-2">
            <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-[color:var(--muted-foreground)]">
              {localized.nav.lessonsMenu}
            </span>
            <div className="flex flex-col gap-2 border-l-2 border-[color:var(--accent)] pl-3">
              {landingPageSlugs.map((slug) => (
                <Link
                  key={slug}
                  href={`/${locale}/${slug}`}
                  className="font-semibold text-[color:var(--foreground)]"
                  onClick={() => setIsOpen(false)}
                >
                  {lessonLabels?.[slug] ?? slug}
                </Link>
              ))}
              <Link
                href={`/${locale}#lesson-options`}
                className="text-sm font-bold text-[color:var(--mnb-ink)]"
                onClick={() => setIsOpen(false)}
              >
                {localized.hero.browseAllLessonTypes}
              </Link>
            </div>
          </div>
          <Link href={`/${locale}/about`} onClick={() => setIsOpen(false)}>
            {localized.nav.about}
          </Link>
          <Link href={`/${locale}/journal`} onClick={() => setIsOpen(false)}>
            {localized.nav.journal}
          </Link>
          <Link href={`/${locale}/contact`} onClick={() => setIsOpen(false)}>
            {localized.nav.contact}
          </Link>
          <a
            href="https://www.musicnbrain.com/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5"
            style={{ color: "var(--mnb-logo-green-deep)" }}
            onClick={() => setIsOpen(false)}
          >
            <Icon name="open_in_new" size={17} />
            {localized.nav.musicnbrain}
          </a>
          <div className="flex items-center justify-between gap-3 pt-1">
            <Button href={`/${locale}/trial`} size="sm" variant="primary">
              {localized.nav.trial}
            </Button>
            <Link
              href={switchLocaleHref}
              aria-label={localized.labels.switchLanguage}
              className="inline-flex items-center gap-1.5 rounded-[var(--radius-pill)] border border-[color:var(--border-strong)] px-3 py-1.5 text-[13px] font-bold"
              onClick={() => setIsOpen(false)}
            >
              <Icon name="translate" size={16} />
              {content[otherLocale].languageLabel}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
