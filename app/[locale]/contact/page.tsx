import { type Locale, content, siteConfig } from "@/content/site";
import ContactForm from "@/components/ContactForm";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";
import GoogleReviewsPromo from "@/components/GoogleReviewsPromo";
import Band from "@/components/ui/Band";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Icon, { type IconName } from "@/components/ui/Icon";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return buildMetadata(locale as Locale, `/${locale}/contact`, "contact");
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const typedLocale = locale as Locale;
  const localized = content[typedLocale];
  const detailsTitle = typedLocale === "en" ? "Studio details" : "工作室信息";

  const details: Array<[IconName, string]> = [
    ["location_on", siteConfig.addressLine],
    ["public", siteConfig.serviceArea],
    ["mail", siteConfig.email],
    ["calendar_month", siteConfig.phone],
  ];

  return (
    <>
      <BreadcrumbJsonLd locale={typedLocale} path={`/${typedLocale}/contact`} />
      <Band tone="white" py="lg">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <Card padding="lg">
            <Badge tone="neutral" icon="mail">{localized.nav.contact}</Badge>
            <h1 className="mt-4 text-[2.25rem] font-black tracking-[-0.01em] text-[color:var(--mnb-ink)] md:text-[2.5rem]">
              {localized.contact.title}
            </h1>
            <p className="mt-3 text-base leading-relaxed text-[color:var(--text-muted)]">
              {localized.contact.description}
            </p>
            <div className="mt-6">
              <ContactForm
                locale={typedLocale}
                submitLabel={localized.contact.submitLabel}
                successMessage={localized.contact.successMessage}
              />
            </div>
          </Card>

          <div className="flex flex-col gap-5">
            <GoogleReviewsPromo locale={typedLocale} variant="card" stacked />
            <Card padding="lg" style={{ background: "var(--surface-soft)" }}>
              <h2 className="text-[length:var(--text-h4)] font-bold text-[color:var(--foreground)]">{detailsTitle}</h2>
              <ul className="mt-4 flex flex-col gap-3 text-[15px] text-[color:var(--text-body,var(--foreground))]">
                {details.map(([icon, value]) => (
                  <li key={value} className="flex items-start gap-2.5">
                    <Icon name={icon} size={18} style={{ color: "var(--text-muted)", flexShrink: 0, marginTop: "2px" }} />
                    <span>{value}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </div>
      </Band>
    </>
  );
}
