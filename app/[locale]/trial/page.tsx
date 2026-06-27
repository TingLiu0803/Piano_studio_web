import Link from "next/link";
import { type Locale, content, siteConfig } from "@/content/site";
import ContactForm from "@/components/ContactForm";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";
import Band from "@/components/ui/Band";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Icon from "@/components/ui/Icon";
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
    <>
      <BreadcrumbJsonLd locale={typedLocale} path={`/${typedLocale}/trial`} />

      {/* Hero / booking */}
      <Band tone="white" py="lg">
        <div className="max-w-[760px]">
          <Badge tone="neutral" icon="calendar_month">{localized.nav.trial}</Badge>
          <h1 className="mt-4 text-[2.25rem] font-black tracking-[-0.01em] text-[color:var(--mnb-ink)] md:text-[2.75rem]">
            {localized.trial.title}
          </h1>
          <p className="mt-3 text-[length:var(--text-body-lg)] leading-relaxed text-[color:var(--text-muted)]">
            {localized.trial.description}
          </p>
          <p className="mt-3 text-sm text-[color:var(--text-muted)]">
            Booking is powered by {siteConfig.bookingProvider}. If you need help, you can{" "}
            <Link href={`/${typedLocale}/contact`} className="font-bold text-[color:var(--link)] underline underline-offset-4">
              send a message
            </Link>
            .
          </p>
          <div className="mt-6">
            {bookingUrl ? (
              <>
                <p className="text-[color:var(--text-muted)]">
                  Click below to open the booking page in a new tab and reserve your trial time.
                </p>
                <div className="mt-5">
                  <Button
                    href={bookingUrl}
                    newTab
                    variant="primary"
                    size="lg"
                    icon="calendar_month"
                    data-ga-event="trial_booking_click"
                    data-ga-placement="trial_calendar"
                  >
                    Book a trial lesson
                  </Button>
                </div>
              </>
            ) : (
              <p className="text-[color:var(--text-muted)]">
                The booking calendar is not available yet. Please{" "}
                <Link href={`/${typedLocale}/contact`} className="font-bold text-[color:var(--link)] underline underline-offset-4">
                  send a message
                </Link>{" "}
                to request a trial time.
              </p>
            )}
          </div>
          <p className="mt-4 text-sm text-[color:var(--text-muted)]">{localized.hero.ctaNote}</p>
        </div>
      </Band>

      {/* Request a time + contact details */}
      <Band tone="soft" divider py="lg">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <Card padding="lg">
            <h2 className="text-[length:var(--text-h3)] font-bold text-[color:var(--foreground)]">
              {localized.trial.requestTitle}
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-[color:var(--text-muted)]">
              {localized.trial.requestDescription}
            </p>
            <div className="mt-6">
              <ContactForm
                locale={typedLocale}
                submitLabel={localized.trial.requestCta}
                successMessage={localized.contact.successMessage}
              />
            </div>
          </Card>

          <Card padding="lg" style={{ background: "var(--surface)" }}>
            <h2 className="text-[length:var(--text-h4)] font-bold text-[color:var(--foreground)]">
              {localized.contact.title}
            </h2>
            <ul className="mt-4 flex flex-col gap-3 text-[15px] text-[color:var(--text-body,var(--foreground))]">
              <li className="flex items-start gap-2.5">
                <Icon name="location_on" size={18} style={{ color: "var(--text-muted)", flexShrink: 0, marginTop: "2px" }} />
                <span>{siteConfig.addressLine}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Icon name="public" size={18} style={{ color: "var(--text-muted)", flexShrink: 0, marginTop: "2px" }} />
                <span>{siteConfig.serviceArea}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Icon name="mail" size={18} style={{ color: "var(--text-muted)", flexShrink: 0, marginTop: "2px" }} />
                <span>{siteConfig.email}</span>
              </li>
            </ul>
          </Card>
        </div>
      </Band>
    </>
  );
}
