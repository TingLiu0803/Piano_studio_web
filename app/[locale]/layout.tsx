import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { headers } from "next/headers";
import { locales, type Locale, content } from "@/content/site";
import {
  buildLocalBusinessJsonLd,
  buildMetadata,
} from "@/lib/seo";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import JsonLd from "@/components/JsonLd";
import GaClickCapture from "@/components/GaClickCapture";
import StickyTrialCta from "@/components/StickyTrialCta";
import AbExperimentReporter from "@/components/AbExperimentReporter";
import AiReferrerReporter from "@/components/AiReferrerReporter";

type LocaleLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) {
    return {};
  }
  return buildMetadata(locale as Locale, `/${locale}`);
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) {
    notFound();
  }
  const typedLocale = locale as Locale;
  const localized = content[typedLocale];
  const headerList = await headers();
  const stickyVariantRaw = headerList.get("x-ab-sticky-cta");
  const stickyVariant: "treatment" | "control" =
    stickyVariantRaw === "control" ? "control" : "treatment";
  const stickyTreatment = stickyVariant === "treatment";

  return (
    <div className="flex min-h-screen flex-col">
      <JsonLd data={buildLocalBusinessJsonLd(typedLocale)} />
      <GaClickCapture />
      <AbExperimentReporter variant={stickyVariant} />
      <AiReferrerReporter />
      <SiteHeader locale={typedLocale} />
      <main
        className={`flex-1 bg-[color:var(--background)]${stickyTreatment ? " pb-24 md:pb-0" : ""}`}
      >
        <div className="mx-auto w-full max-w-6xl px-6 py-12 sm:py-16">
          <div className="mb-6 flex justify-end">
            <span className="rounded-full border border-[color:var(--border)] bg-[color:var(--surface)] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-[color:var(--muted-foreground)]">
              {localized.languageLabel}
            </span>
          </div>
          {children}
        </div>
      </main>
      <SiteFooter locale={typedLocale} />
      <StickyTrialCta
        locale={typedLocale}
        ctaLabel={localized.hero.primaryCta}
        experimentTreatment={stickyTreatment}
      />
    </div>
  );
}
