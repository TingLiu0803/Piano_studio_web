"use client";

import { useState } from "react";
import Link from "next/link";
import { type Locale, content, locales, siteConfig } from "@/content/site";

type SiteHeaderProps = {
  locale: Locale;
};

export default function SiteHeader({ locale }: SiteHeaderProps) {
  const localized = content[locale];
  const otherLocales = locales.filter((item) => item !== locale);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[color:var(--border)] bg-[color:var(--surface)] backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
        <Link href={`/${locale}`} className="text-lg font-semibold">
          {siteConfig.studioName}
        </Link>
        <nav className="hidden items-center gap-4 text-sm font-medium sm:flex">
          <Link href={`/${locale}`}>{localized.nav.home}</Link>
          <Link href={`/${locale}/about`}>{localized.nav.about}</Link>
          <Link href={`/${locale}/contact`}>{localized.nav.contact}</Link>
          <Link
            href={`/${locale}/trial`}
            className="rounded-full bg-[color:var(--primary)] px-4 py-2 text-xs font-semibold text-[color:var(--primary-foreground)] transition hover:bg-[color:var(--primary-hover)]"
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
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-full border border-[color:var(--border)] px-3 py-2 text-xs font-semibold sm:hidden"
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          onClick={() => setIsOpen((current) => !current)}
        >
          {isOpen ? "Close" : "Menu"}
        </button>
      </div>
      <div
        id="mobile-menu"
        className={`border-t border-[color:var(--border)] bg-[color:var(--surface)] sm:hidden ${isOpen ? "block" : "hidden"}`}
      >
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-6 py-4 text-sm font-medium">
          <Link href={`/${locale}`} onClick={() => setIsOpen(false)}>
            {localized.nav.home}
          </Link>
          <Link href={`/${locale}/about`} onClick={() => setIsOpen(false)}>
            {localized.nav.about}
          </Link>
          <Link href={`/${locale}/contact`} onClick={() => setIsOpen(false)}>
            {localized.nav.contact}
          </Link>
          <Link
            href={`/${locale}/trial`}
            className="inline-flex items-center justify-center rounded-full bg-[color:var(--primary)] px-4 py-2 text-xs font-semibold text-[color:var(--primary-foreground)] transition hover:bg-[color:var(--primary-hover)]"
            onClick={() => setIsOpen(false)}
          >
            {localized.nav.trial}
          </Link>
          <div className="flex flex-wrap gap-2">
            {otherLocales.map((item) => (
              <Link
                key={item}
                href={`/${item}`}
                className="rounded-full border border-[color:var(--border)] px-3 py-1 text-xs"
                onClick={() => setIsOpen(false)}
              >
                {content[item].languageLabel}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
