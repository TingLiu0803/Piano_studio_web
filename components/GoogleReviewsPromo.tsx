import { content, siteConfig, type Locale } from "@/content/site";

function StarRow({
  rating,
  size = "md",
}: {
  rating: number;
  size?: "sm" | "md" | "lg";
}) {
  const full = Math.min(5, Math.max(0, Math.round(rating)));
  const sizeClass =
    size === "lg" ? "text-3xl leading-none" : size === "md" ? "text-2xl leading-none" : "text-lg leading-none";

  return (
    <div
      className={`flex gap-0.5 ${sizeClass}`}
      role="img"
      aria-label={`${rating} out of 5 stars`}
    >
      {Array.from({ length: 5 }, (_, i) => (
        <span
          key={i}
          className={
            i < full
              ? "text-[#b8922e] drop-shadow-[0_1px_0_rgba(0,0,0,0.08)]"
              : "text-[color:var(--border)]"
          }
          aria-hidden
        >
          ★
        </span>
      ))}
    </div>
  );
}

const ctaButtonClass =
  "inline-flex shrink-0 items-center justify-center rounded-full bg-[color:var(--primary)] px-5 py-2.5 text-base font-semibold text-[color:var(--primary-foreground)] shadow-sm transition hover:bg-[color:var(--primary-hover)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--primary)]";

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
  const { averageRating, totalCount } = siteConfig.reviews;
  const ratingSummary = copy.ratingSummary
    .replace("{rating}", averageRating.toFixed(1))
    .replace("{count}", String(totalCount));

  if (variant === "strip") {
    return (
      <div className="rounded-2xl border border-[color:var(--accent)] bg-gradient-to-br from-[color:var(--surface-muted)] to-[color:var(--surface)] px-4 py-4 shadow-sm ring-1 ring-[color:var(--accent)]/30">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
            <StarRow rating={averageRating} size="md" />
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[color:var(--tag-foreground)]">
                {copy.eyebrow}
              </p>
              <p className="text-base font-semibold text-[color:var(--foreground)]">
                {copy.headline}
              </p>
              <p className="text-sm text-[color:var(--muted-foreground)]">
               
              </p>
            </div>
          </div>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className={ctaButtonClass}
          >
            {copy.cta}
          </a>
        </div>
      </div>
    );
  }

  if (variant === "card") {
    const inner = (
      <>
        <div className="flex flex-col gap-3">
          <StarRow rating={averageRating} size={stacked ? "md" : "sm"} />
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[color:var(--tag-foreground)]">
              {copy.eyebrow}
            </p>
            <p className="mt-1 font-semibold text-[color:var(--foreground)]">
              {copy.headline}
            </p>
            <p className="mt-0.5 text-sm text-[color:var(--muted-foreground)]">

            </p>
          </div>
        </div>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className={`${ctaButtonClass} ${stacked ? "w-full" : ""}`}
        >
          {copy.cta}
        </a>
      </>
    );

    return (
      <div
        className={`rounded-2xl border border-[color:var(--accent)]/50 bg-[color:var(--surface-muted)] p-4 shadow-sm ${
          stacked
            ? "flex flex-col gap-4"
            : "flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
        }`}
      >
        {inner}
      </div>
    );
  }

  return (
    <section
      className="relative overflow-hidden rounded-3xl border-2 border-[color:var(--accent)] bg-gradient-to-br from-[color:var(--surface)] via-[color:var(--surface-muted)] to-[color:var(--tag)] px-6 py-8 shadow-md md:px-10 md:py-10"
      aria-labelledby="google-reviews-heading"
    >
      <div
        className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-[color:var(--accent)]/20 blur-2xl"
        aria-hidden
      />
      <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
        <div className="max-w-xl space-y-3">
          <StarRow rating={averageRating} size="lg" />
          <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[color:var(--tag-foreground)]">
            {copy.eyebrow}
          </p>
          <h2
            id="google-reviews-heading"
            className="text-2xl font-semibold tracking-tight text-[color:var(--foreground)] md:text-3xl"
          >
            {copy.headline}
          </h2>
          <p className="text-lg font-semibold text-[color:var(--foreground)]">
          </p>
          <p className="text-sm leading-relaxed text-[color:var(--muted-foreground)]">
            {copy.body}
          </p>
        </div>
        <div className="flex shrink-0 flex-col items-stretch gap-3 sm:flex-row sm:items-center lg:flex-col lg:items-stretch">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className={`${ctaButtonClass} px-8 py-3 text-base`}
          >
            {copy.cta}
          </a>
          <p className="text-center text-xs text-[color:var(--muted-foreground)] lg:text-left">
            {copy.opensInNewTab}
          </p>
        </div>
      </div>
    </section>
  );
}
