import { type Locale, content, siteConfig } from "@/content/site";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  return buildMetadata(locale, `/${locale}/trial`);
}

export default async function TrialPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const localized = content[locale];

  return (
    <div className="flex flex-col gap-8">
      <section className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <h1 className="text-3xl font-semibold">{localized.trial.title}</h1>
        <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-300">
          {localized.trial.description}
        </p>
      </section>

      <section className="overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <div className="p-6 text-sm text-zinc-600 dark:text-zinc-300">
          Booking is powered by Cal.com. Choose a time that works for you.
        </div>
        <div className="aspect-[4/3] w-full">
          <iframe
            src={siteConfig.bookingUrl}
            title="Trial booking"
            className="h-full w-full"
            loading="lazy"
          />
        </div>
      </section>
    </div>
  );
}
