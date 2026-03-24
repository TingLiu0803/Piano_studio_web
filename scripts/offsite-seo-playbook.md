# Off-site SEO playbook (GBP, reviews, citations, ads)

Use this alongside on-site changes in the repo. KPIs align with the studio SEO plan: local pack visibility, organic impressions, and trial bookings.

## Weekly (15–30 minutes)

- **Google Business Profile**: Post an update (lesson tip, student win, performance clip), add or refresh photos, answer new Q&A.
- **Reviews**: Ask 1–2 happy students/parents for a Google review; mention specifics (adult beginner, bilingual, San Jose) when appropriate.
- **NAP check**: Studio name, phone, and address/service area match [content/site.ts](../content/site.ts) and the website footer everywhere you are listed.

## Monthly

- **Search Console**: Review top queries and pages; note queries with impressions but low CTR (tweak titles/descriptions on those URLs).
- **GBP insights**: Track calls, website taps, direction requests, and booking actions from the profile.
- **Citations**: Add or fix one high-quality directory (Yelp, Thumbtack, local chamber) with consistent NAP.

## Optional paid bridge

- Run **Google Ads** (Search or Local campaigns) to high-intent terms (e.g. piano lessons San Jose, adult piano lessons) pointing to dedicated landing URLs:
  - `/en/piano-lessons-san-jose`
  - `/en/adult-piano-lessons`
  - (add UTM parameters in the ad console for reporting)
- Start small, measure cost per trial booking, then scale what converts.

## Local pack measurement

- Check rankings from **multiple locations** (grid around your service area), not a single desktop search—distance affects the map pack.

## Environment

- Set `NEXT_PUBLIC_GOOGLE_BUSINESS_URL` to your canonical Maps/Business Profile URL in production (see [env.example](../env.example)).
