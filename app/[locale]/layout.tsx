import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { locales, type Locale, content } from "@/content/site";
import { buildLocalBusinessJsonLd, buildMetadata } from "@/lib/seo";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import JsonLd from "@/components/JsonLd";

type LocaleLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: Locale }>;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!locales.includes(locale)) {
    return {};
  }
  return buildMetadata(locale, `/${locale}`);
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;
  if (!locales.includes(locale)) {
    notFound();
  }
  const localized = content[locale];

  return (
    <div className="flex min-h-screen flex-col">
      <JsonLd data={buildLocalBusinessJsonLd(locale)} />
      <SiteHeader locale={locale} />
      <main className="flex-1 bg-zinc-50 dark:bg-black">
        <div className="mx-auto w-full max-w-6xl px-6 py-12">
          <div className="mb-6 text-xs uppercase tracking-[0.2em] text-zinc-400">
            {localized.languageLabel}
          </div>
          {children}
        </div>
      </main>
      <SiteFooter locale={locale} />
    </div>
  );
}
