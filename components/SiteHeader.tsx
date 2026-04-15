"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { type Locale, content, locales, siteConfig } from "@/content/site";
import { landingPageSlugs } from "@/content/landing-pages";
import PianoKeyboardMark from "@/components/PianoKeyboardMark";

type SiteHeaderProps = {
  locale: Locale;
};

export default function SiteHeader({ locale }: SiteHeaderProps) {
  const localized = content[locale];
  const otherLocales = locales.filter((item) => item !== locale);
  const [isOpen, setIsOpen] = useState(false);
  const [lessonsOpen, setLessonsOpen] = useState(false);
  const lessonsRef = useRef<HTMLDivElement>(null);

  const lessonLabels = localized.seo.breadcrumbLabels;

  useEffect(() => {
    if (!lessonsOpen) return;
    const handle = (e: MouseEvent) => {
      if (
        lessonsRef.current &&
        !lessonsRef.current.contains(e.target as Node)
      ) {
        setLessonsOpen(false);
      }
    };
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, [lessonsOpen]);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[color:var(--border)] bg-[color:var(--surface)] backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
        <Link href={`/${locale}`} className="inline-flex items-center gap-2 text-lg font-semibold">
          <PianoKeyboardMark className="h-6 w-6 shrink-0" />
          <span>{siteConfig.studioName}</span>
        </Link>
        <nav className="hidden items-center gap-1 text-sm font-medium sm:flex">
          <Link href={`/${locale}`} className="rounded-md px-2 py-1">
            {localized.nav.home}
          </Link>
          <div className="relative" ref={lessonsRef}>
            <button
              type="button"
              className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-left transition hover:bg-[color:var(--surface-muted)]"
              aria-expanded={lessonsOpen}
              aria-haspopup="true"
              onClick={() => setLessonsOpen((v) => !v)}
            >
              {localized.nav.lessonsMenu}
              <span aria-hidden className="text-[10px] opacity-70">
                ▾
              </span>
            </button>
            {lessonsOpen ? (
              <div
                className="absolute left-0 top-full z-50 mt-1 min-w-[min(100vw-3rem,17rem)] rounded-xl border border-[color:var(--border)] bg-[color:var(--surface)] py-2 shadow-lg"
                role="menu"
              >
                {landingPageSlugs.map((slug) => (
                  <Link
                    key={slug}
                    role="menuitem"
                    href={`/${locale}/${slug}`}
                    className="block px-4 py-2.5 text-sm text-[color:var(--foreground)] transition hover:bg-[color:var(--surface-muted)]"
                    onClick={() => setLessonsOpen(false)}
                  >
                    {lessonLabels?.[slug] ?? slug}
                  </Link>
                ))}
                <div className="border-t border-[color:var(--border)] px-6 py-2 pt-3 text-[10px] uppercase tracking-wide text-[color:var(--muted-foreground)]">
                  <Link
                    href={`/${locale}#lesson-options`}
                    className="font-semibold text-[color:var(--link)] hover:underline"
                    onClick={() => setLessonsOpen(false)}
                  >
                    {localized.hero.browseAllLessonTypes}
                  </Link>
                </div>
              </div>
            ) : null}
          </div>
          <Link href={`/${locale}/about`} className="rounded-md px-2 py-1">
            {localized.nav.about}
          </Link>
          <Link href={`/${locale}/contact`} className="rounded-md px-2 py-1">
            {localized.nav.contact}
          </Link>
          <a
            href="https://www.musicnbrain.com/"
            target="_blank"
            rel="noreferrer"
            className="rounded-md px-2 py-1 text-[color:var(--link)] transition hover:text-[color:var(--link-hover)]"
          >
            {localized.nav.musicnbrain}
          </a>
          <Link
            href={`/${locale}/trial`}
            className="ml-1 rounded-full bg-[color:var(--primary)] px-4 py-2 text-xs font-semibold text-[color:var(--primary-foreground)] transition hover:bg-[color:var(--primary-hover)]"
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
          <div className="flex flex-col gap-2">
            <span className="text-xs font-semibold uppercase tracking-wide text-[color:var(--muted-foreground)]">
              {localized.nav.lessonsMenu}
            </span>
            <div className="flex flex-col gap-2 border-l-2 border-[color:var(--accent)] pl-3">
              {landingPageSlugs.map((slug) => (
                <Link
                  key={slug}
                  href={`/${locale}/${slug}`}
                  className="text-[color:var(--foreground)]"
                  onClick={() => setIsOpen(false)}
                >
                  {lessonLabels?.[slug] ?? slug}
                </Link>
              ))}
              <Link
                href={`/${locale}#lesson-options`}
                className="text-sm font-semibold text-[color:var(--link)]"
                onClick={() => setIsOpen(false)}
              >
                {localized.hero.browseAllLessonTypes} →
              </Link>
            </div>
          </div>
          <Link href={`/${locale}/about`} onClick={() => setIsOpen(false)}>
            {localized.nav.about}
          </Link>
          <Link href={`/${locale}/contact`} onClick={() => setIsOpen(false)}>
            {localized.nav.contact}
          </Link>
          <a
            href="https://www.musicnbrain.com/"
            target="_blank"
            rel="noreferrer"
            className="text-[color:var(--link)]"
            onClick={() => setIsOpen(false)}
          >
            {localized.nav.musicnbrain}
          </a>
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
