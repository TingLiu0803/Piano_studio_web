# Off-site SEO + GEO playbook (GBP, reviews, citations, AI search, ads)

Use this alongside on-site changes in the repo. KPIs align with the studio
SEO plan: local pack visibility, organic impressions, trial bookings, and
appearance in AI search engines (Google AI Overviews, ChatGPT, Perplexity,
Copilot, Gemini).

## Weekly (15–30 minutes)

- **Google Business Profile**: Post an update (lesson tip, student win,
  performance clip), add or refresh photos, answer new Q&A.
- **Reviews**: Ask 1–2 happy students/parents for a Google review; mention
  specifics (adult beginner, bilingual, San Jose) when appropriate. Update
  [content/site.ts](../content/site.ts) `siteConfig.reviews.totalCount` and
  `lastVerified` after each batch.
- **NAP check**: Studio name, phone, and address/service area match
  [content/site.ts](../content/site.ts) and the website footer everywhere you
  are listed.
- **Reddit / Quora** (rotate): Answer 1 honest question per week in r/piano,
  r/bayarea, or relevant Quora threads about adult piano learning; link a
  specific journal article (not the homepage) when relevant.

## Monthly

- **Search Console**: Review top queries and pages; note queries with
  impressions but low CTR (tweak titles/descriptions on those URLs).
- **GBP insights**: Track calls, website taps, direction requests, and
  booking actions from the profile.
- **Citations**: Add or fix one high-quality directory per month with
  consistent NAP (see "Citation pass" below).
- **AI prompt audit**: Run the prompt set in
  [scripts/geo-prompt-tests.md](geo-prompt-tests.md) against ChatGPT,
  Perplexity, Copilot, and Gemini; log whether the studio is cited.
- **Bump `contentVersion`** in [content/site.ts](../content/site.ts) when
  any meaningful copy or schema change ships; this updates `dateModified`
  across the JSON-LD graph and the sitemap.

## Q1 ramp — first 90 days

### Google Business Profile completion

- [ ] All hours filled (matches [content/site.ts](../content/site.ts)
      `siteConfig.openingHours`)
- [ ] At least 10 photos: studio interior, teacher headshot, recital, lesson
      in progress, performance clips, neighborhood
- [ ] Services listed individually: adult piano lessons, kids piano lessons,
      online piano lessons, exam prep, audition prep
- [ ] Categories: "Piano instructor" (primary) + "Music school" (secondary)
- [ ] Attributes: identifies-as (where applicable), languages, lessons online
- [ ] Q&A section seeded with the top 5 FAQ items already on
      [content/faqs.ts](../content/faqs.ts)
- [ ] Two posts per month minimum (lesson tip, student win, performance)

### Review velocity (target: 1–2 new reviews / month, in 90 days reach 8–10
total)

- [ ] Email template ready to send 24 hours after a trial → first lesson
      conversion
- [ ] One-tap review URL pinned in the email
- [ ] Specific prompts ("share what stood out about adult lessons" or
      "mention bilingual sessions if relevant") so reviews are content-rich
- [ ] Update `siteConfig.reviews.totalCount` + `lastVerified` after each
      review

### Citation pass (one per week, exact NAP)

- [ ] Yelp
- [ ] Thumbtack
- [ ] Bing Places for Business
- [ ] Apple Business Connect
- [ ] Lessons.com
- [ ] TakeLessons
- [ ] LessonFace (online)
- [ ] San Jose Chamber of Commerce
- [ ] Sunnyvale Chamber of Commerce

### Backlink outreach

- [ ] MusicNBrain — board-member page links to studio (already partner)
- [ ] San Francisco Conservatory of Music alumni notes
- [ ] Stanford School of Music alumni network
- [ ] One guest post on a music-education blog
- [ ] Local press: pitch a "lessons in San Jose" feature to a hyper-local
      newsletter (e.g. San Jose Spotlight, The Six Fifty, Cupertino Today)

### Entity reinforcement for GEO

- [ ] **Wikidata stub**: create a Wikidata item for "Eric Liu Piano Studio"
      with `instance of: music school`, `located in: San Jose`,
      `founder: Eric Liu`, `official website: sanjosepianolesson.com`. This
      is the single highest-leverage off-site GEO action because every major
      LLM ingests Wikidata.
- [ ] Update the `siteConfig.ownerProfiles` array in
      [content/site.ts](../content/site.ts) once LinkedIn, Bilibili creator
      URL, and Wikidata QID are public.
- [ ] Add `siteConfig.socialLinks` once Yelp / Thumbtack URLs are claimed.

### AI search exposure

- [ ] Confirm [public/llms.txt](../public/llms.txt) is reachable at
      `https://sanjosepianolesson.com/llms.txt` after deploy.
- [ ] Verify [app/robots.ts](../app/robots.ts) is allowing all expected AI
      crawlers (GPTBot, Google-Extended, PerplexityBot, ClaudeBot,
      OAI-SearchBot, Applebot-Extended) in production.
- [ ] Spot-check schema rendering with Google's Rich Results Test on the
      home, adult landing, and one journal article.

## Local pack measurement

- Check rankings from **multiple locations** (grid around your service
  area), not a single desktop search — distance affects the map pack.
- Use a tool like LocalFalcon or BrightLocal grid scan once per quarter to
  see if local pack visibility expands beyond the immediate San Jose grid
  into Sunnyvale, Santa Clara, Cupertino.

## Optional paid bridge

- Run **Google Ads** (Search or Local campaigns) to high-intent terms
  (e.g. piano lessons San Jose, adult piano lessons) pointing to dedicated
  landing URLs:
  - `/en/piano-lessons-san-jose`
  - `/en/adult-piano-lessons`
  - `/en/online-piano-lessons`
  - (add UTM parameters in the ad console for reporting)
- Start small, measure cost per trial booking, then scale what converts.

## Environment

- Set `NEXT_PUBLIC_GOOGLE_BUSINESS_URL` to your canonical Maps/Business
  Profile URL in production (see [env.example](../env.example)).
- Set `NEXT_PUBLIC_SITE_URL` to the production domain so every absolute URL
  in JSON-LD and `llms.txt` resolves correctly.
