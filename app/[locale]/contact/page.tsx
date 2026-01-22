import { type Locale, content, siteConfig } from "@/content/site";
import ContactForm from "@/components/ContactForm";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  return buildMetadata(locale, `/${locale}/contact`);
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const localized = content[locale];

  return (
    <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
      <section className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <h1 className="text-3xl font-semibold">{localized.contact.title}</h1>
        <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-300">
          {localized.contact.description}
        </p>
        <div className="mt-6">
          <ContactForm
            locale={locale}
            submitLabel={localized.contact.submitLabel}
            successMessage={localized.contact.successMessage}
          />
        </div>
      </section>

      <aside className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <h2 className="text-xl font-semibold">Studio details</h2>
        <div className="mt-4 space-y-3 text-sm text-zinc-600 dark:text-zinc-300">
          <p>{siteConfig.addressLine}</p>
          <p>{siteConfig.serviceArea}</p>
          <p>{siteConfig.email}</p>
          <p>{siteConfig.phone}</p>
          <p>{siteConfig.timezone}</p>
        </div>
      </aside>
    </div>
  );
}
