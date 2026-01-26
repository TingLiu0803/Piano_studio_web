import Link from "next/link";
import { type Locale, content, siteConfig } from "@/content/site";
import ContactForm from "@/components/ContactForm";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return buildMetadata(locale as Locale, `/${locale}/trial`, "trial");
}

export default async function TrialPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const typedLocale = locale as Locale;
  const localized = content[typedLocale];
  const rawBookingUrl = siteConfig.bookingUrl?.trim();
  const hasBookingUrl =
    Boolean(rawBookingUrl) && !rawBookingUrl.includes("replace-this");
  const bookingUrl = hasBookingUrl ? rawBookingUrl : null;

  return (
    <div className="flex flex-col gap-8">
      <section className="rounded-3xl border border-[color:var(--border)] bg-[color:var(--surface)] p-8 shadow-sm">
        <h1 className="text-3xl font-semibold">{localized.trial.title}</h1>
        <p className="mt-3 text-sm text-[color:var(--muted-foreground)]">
          {localized.trial.description}
        </p>
        <p className="mt-3 text-sm text-[color:var(--muted-foreground)]">
          Booking is powered by {siteConfig.bookingProvider}. If you need help,
          you can <Link href={`/${typedLocale}/contact`}>send a message</Link>.
        </p>
        <div className="text-sm text-[color:var(--background)]">
          {bookingUrl ? (
            <>
              <p>
                Click below to open the booking page in a new tab and reserve
                your trial time.
              </p>
              <div className="mt-6">
                <a
                  href={bookingUrl}
                  className="inline-flex items-center justify-center rounded-full bg-[color:var(--primary)] px-6 py-3 text-sm font-semibold shadow-sm transition hover:opacity-90"
                  target="_blank"
                  rel="noreferrer"
                >
                  Book a trial lesson
                </a>
              </div>
            </>
          ) : (
            <p>
              The booking calendar is not available yet. Please{" "}
              <Link href={`/${typedLocale}/contact`}>send a message</Link> to request
              a trial time.
            </p>
          )}
        </div>
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
              locale={typedLocale}
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
          </div>
        </aside>
      </section>
    </div>
  );
}
