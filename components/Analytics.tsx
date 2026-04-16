import Script from "next/script";

const DEFAULT_GA_ID = "G-ZEWCS29HG3";
/** Google Ads account tag from Ads → Data manager (fixes “Your website needs a Google tag”). */
const DEFAULT_GOOGLE_ADS_ID = "AW-737007274";

/**
 * Loads GA4 (G-…) and, when configured, the Google Ads tag (AW-…) in one gtag.js bundle.
 * Override with `NEXT_PUBLIC_GOOGLE_ADS_ID` or set it to a single space to skip Ads.
 */
export default function Analytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_ID ?? DEFAULT_GA_ID;
  const adsFromEnv = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;
  const adsTagId =
    adsFromEnv !== undefined && adsFromEnv.trim() === ""
      ? undefined
      : (adsFromEnv ?? DEFAULT_GOOGLE_ADS_ID).trim();
  const gtagLoaderId = gaId || adsTagId;
  if (!gtagLoaderId) return null;

  const adsConfigLine = adsTagId
    ? `gtag('config', '${adsTagId}');`
    : "";

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gtagLoaderId}`}
        strategy="afterInteractive"
      />
      <Script id="ga-ads-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          ${gaId ? `gtag('config', '${gaId}', { anonymize_ip: true });` : ""}
          ${adsConfigLine}
        `}
      </Script>
    </>
  );
}
