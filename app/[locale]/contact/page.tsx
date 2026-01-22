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
      <section className="rounded-3xl border border-[color:var(--border)] bg-[color:var(--surface)] p-8 shadow-sm">
        <h1 className="text-3xl font-semibold">{localized.contact.title}</h1>
        <p className="mt-3 text-sm text-[color:var(--muted-foreground)]">
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

      <aside className="rounded-3xl border border-[color:var(--border)] bg-[color:var(--surface)] p-8 shadow-sm">
        <h2 className="text-xl font-semibold">Studio details</h2>
        <div className="mt-4 space-y-3 text-sm text-[color:var(--muted-foreground)]">
          <p>{siteConfig.addressLine}</p>
          <p>{siteConfig.serviceArea}</p>
          <p>{siteConfig.email}</p>
          <p>{siteConfig.phone}</p>
        </div>
      </aside>
    </div>
  );
}
