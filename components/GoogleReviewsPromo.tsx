import { content, siteConfig, type Locale } from "@/content/site";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";

function StarRow({ rating, size = 24 }: { rating: number; size?: number }) {
  const full = Math.min(5, Math.max(0, Math.round(rating)));
  return (
    <div className="flex gap-0.5" role="img" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Icon
          key={i}
          name="star"
          size={size}
          filled={i < full}
          style={{ color: i < full ? "#b8922e" : "var(--border-strong)" }}
        />
      ))}
    </div>
  );
}

type GoogleReviewsPromoProps = {
  locale: Locale;
  variant: "featured" | "strip" | "card";
  /** Narrow columns (e.g. contact sidebar): stack stars and CTA vertically */
  stacked?: boolean;
};

export default function GoogleReviewsPromo({
  locale,
  variant,
  stacked = false,
}: GoogleReviewsPromoProps) {
  const url = siteConfig.googleBusinessProfileUrl;
  if (!url) return null;

  const copy = content[locale].googleReviews;
  const { averageRating } = siteConfig.reviews;
  const eyebrowClass =
    "text-[length:var(--text-label)] font-bold uppercase tracking-[var(--tracking-label)] text-[color:var(--text-muted)]";

  if (variant === "strip") {
    return (
      <div className="rounded-[var(--radius-md)] border border-[color:var(--border)] bg-[color:var(--surface-soft)] px-4 py-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
            <StarRow rating={averageRating} size={24} />
            <div>
              <p className={eyebrowClass}>{copy.eyebrow}</p>
              <p className="text-base font-bold text-[color:var(--foreground)]">{copy.headline}</p>
            </div>
          </div>
          <Button href={url} newTab variant="primary">
            {copy.cta}
          </Button>
        </div>
      </div>
    );
  }

  if (variant === "card") {
    return (
      <div
        className={`rounded-[var(--radius-md)] border border-[color:var(--border)] bg-[color:var(--surface-soft)] p-5 ${
          stacked ? "flex flex-col gap-4" : "flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
        }`}
      >
        <div className="flex flex-col gap-3">
          <StarRow rating={averageRating} size={22} />
          <div>
            <p className={eyebrowClass}>{copy.eyebrow}</p>
            <p className="mt-1 font-bold text-[color:var(--foreground)]">{copy.headline}</p>
          </div>
        </div>
        <Button href={url} newTab variant="primary" fullWidth={stacked}>
          {copy.cta}
        </Button>
      </div>
    );
  }

  return (
    <section
      className="overflow-hidden rounded-[var(--radius-lg)] border border-[color:var(--border)] bg-[color:var(--surface-soft)] px-6 py-8 md:px-10 md:py-10"
      aria-labelledby="google-reviews-heading"
    >
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
        <div className="max-w-xl space-y-3">
          <StarRow rating={averageRating} size={28} />
          <p className={eyebrowClass}>{copy.eyebrow}</p>
          <h2
            id="google-reviews-heading"
            className="text-[length:var(--text-h2)] font-bold tracking-tight text-[color:var(--foreground)]"
          >
            {copy.headline}
          </h2>
          <p className="text-[15px] leading-relaxed text-[color:var(--text-muted)]">{copy.body}</p>
        </div>
        <div className="flex shrink-0 flex-col items-stretch gap-3">
          <Button href={url} newTab variant="primary" size="lg" icon="star">
            {copy.cta}
          </Button>
          <p className="flex items-center gap-1.5 text-center text-xs text-[color:var(--text-muted)] lg:text-left">
            <Icon name="open_in_new" size={14} />
            {copy.opensInNewTab}
          </p>
        </div>
      </div>
    </section>
  );
}
