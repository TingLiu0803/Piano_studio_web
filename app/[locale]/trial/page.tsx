import Link from "next/link";
import { type Locale, content, siteConfig } from "@/content/site";
import ContactForm from "@/components/ContactForm";
import { buildMetadata } from "@/lib/seo";

function ensureGoogleCalendarEmbedUrl(url: string) {
  try {
    const parsed = new URL(url);
    if (!parsed.searchParams.has("gv")) {
      parsed.searchParams.set("gv", "true");
    }
    return parsed.toString();
  } catch {
    return url;
  }
}

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
  const rawBookingUrl = siteConfig.bookingUrl?.trim();
  const hasBookingUrl =
    Boolean(rawBookingUrl) && !rawBookingUrl.includes("replace-this");
  const bookingUrl = hasBookingUrl
    ? ensureGoogleCalendarEmbedUrl(rawBookingUrl)
    : null;

  return (
    <div className="flex flex-col gap-8">
      <section className="rounded-3xl border border-[color:var(--border)] bg-[color:var(--surface)] p-8 shadow-sm">
        <h1 className="text-3xl font-semibold">{localized.trial.title}</h1>
        <p className="mt-3 text-sm text-[color:var(--muted-foreground)]">
          {localized.trial.description}
        </p>
        <p className="mt-3 text-sm text-[color:var(--muted-foreground)]">
          Booking is powered by {siteConfig.bookingProvider}. If you need help,
          you can <Link href={`/${locale}/contact`}>send a message</Link>.
        </p>
      </section>

      <section className="overflow-hidden rounded-3xl border border-[color:var(--border)] bg-[color:var(--surface)] shadow-sm">
        {bookingUrl ? (
          <div className="aspect-[4/3] w-full">
            <iframe
              src={bookingUrl}
              title="Trial booking"
              className="h-full w-full"
              loading="lazy"
            />
          </div>
        ) : (
          <div className="p-8 text-sm text-[color:var(--muted-foreground)]">
            <p>
              The booking calendar is not available yet. Please{" "}
              <Link href={`/${locale}/contact`}>send a message</Link> to request
              a trial time.
            </p>
          </div>
        )}
        {bookingUrl ? (
          <div className="border-t border-[color:var(--border)] p-4 text-sm text-[color:var(--muted-foreground)]">
            Trouble loading?{" "}
            <a
              href={bookingUrl}
              className="text-[color:var(--foreground)] underline"
              target="_blank"
              rel="noreferrer"
            >
              Open the booking page in a new tab
            </a>
            .
          </div>
        ) : null}
      </section>

      <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-3xl border border-[color:var(--border)] bg-[color:var(--surface)] p-8 shadow-sm">
          <h2 className="text-2xl font-semibold">
            {localized.trial.requestTitle}
          </h2>
          <p className="mt-3 text-sm text-[color:var(--muted-foreground)]">
            {localized.trial.requestDescription}
          </p>
          <div className="mt-6">
            <ContactForm
              locale={locale}
              submitLabel={localized.trial.requestCta}
              successMessage={localized.contact.successMessage}
            />
          </div>
        </div>
        <aside className="rounded-3xl border border-[color:var(--border)] bg-[color:var(--surface)] p-8 text-sm text-[color:var(--muted-foreground)] shadow-sm">
          <h3 className="text-lg font-semibold text-[color:var(--foreground)]">
            {localized.contact.title}
          </h3>
          <div className="mt-4 space-y-3">
            <p>{siteConfig.addressLine}</p>
            <p>{siteConfig.serviceArea}</p>
            <p>{siteConfig.email}</p>
            <p>{siteConfig.phone}</p>
            <p>{siteConfig.timezone}</p>
          </div>
        </aside>
      </section>
    </div>
  );
}
