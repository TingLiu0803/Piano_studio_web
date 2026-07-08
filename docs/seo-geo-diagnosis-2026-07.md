# SEO + GEO Diagnosis & Action Plan — sanjosepianolesson.com

**Date:** 2026-07-08
**Data sources:** Google Search Console (28d: 2026-06-09 → 07-06; 7d: 2026-06-30 → 07-06), GA4 traffic acquisition (30d: 2026-06-08 → 07-07; 7d: 2026-07-01 → 07-07), competitive web research, full codebase audit (branch `seo-geo`).

**Purpose of this document:** a grounded diagnosis plus a prioritized backlog that future agents can execute against this codebase. Every code-facing task lists the files involved.

> ⚠️ **MANDATORY for any agent implementing tasks from this doc:** read and obey
> `.claude/skills/piano-studio-geo-guardrails/SKILL.md` before and after any change.
> Key invariants: all metadata via `lib/seo.ts` `buildMetadata()`; one keyword-bearing H1 per page;
> en+zh parity for every string and route; `contentVersion` in `content/site.ts` bumped only on real
> copy changes; new routes added to `app/sitemap.ts` route specs; llms.txt stays auto-generated;
> NAP single-sourced from `siteConfig`; body copy server-rendered and never collapsed.

---

## 1. Where the site stands (data diagnosis)

### 1.1 Topline numbers

| Metric | GSC 28d | GSC 7d | Trend |
|---|---|---|---|
| Clicks | 7 | 1 | down |
| Impressions | 429 | 202 | up ~2× run-rate |
| CTR | 1.63% | 0.50% | down |
| Avg position (impr-weighted) | ~37.8 | ~46.3 | deeper |

| GA4 channel (30d) | Sessions | Engagement rate | Avg engagement time | Key event rate |
|---|---|---|---|---|
| Organic Search | 56 | 98.2% | 17.6s | 96.4% |
| Direct | 39 | 100% | 59.8s | 100% |
| **AI Assistant** | 2 (+1 in last 7d) | 100% | **137s** | 100% |
| Unassigned | 2 | 50% | 82s | 100% |

**Reading the trend correctly:** impressions doubled in the last week because Google started testing the site on many more queries — but at positions 40–55, where nobody clicks. This is the normal "visibility expanding before rank consolidates" phase, not a regression. Meanwhile GA4 organic (56 sessions/30d) is ~8× GSC clicks (7), so most organic traffic arrives via Bing/DuckDuckGo/Maps rather than Google web results.

### 1.2 What is genuinely working

- **AI Assistant referrals are the highest-quality channel on the site** — 137s avg engagement (8× organic search), 100% key-event rate. The GEO stack (llms.txt, JSON-LD entity graph, answer-first blocks, AI-crawler-friendly robots) is producing real, measurable visits. Protect it.
- **/zh pages rank dramatically better than /en**: every /zh page sits at position ≤12; `/zh/about` is at position 9.6 with 25% CTR. Bilingual content is the site's strongest moat — competitors have nothing comparable.
- **Mobile is the real picture**: position ~14, CTR 8.8% on mobile vs position ~41 on desktop (desktop impressions are heavily polluted by rank-checker/deep-SERP noise). Real humans see the site much higher than the blended average suggests.
- **Dedicated intent pages rank when Google picks them**: `/en/adult-piano-lessons` pos 5.3, `/en/about` pos 3.7, `/en/kids-piano-lessons` pos 6.0. One-off tests at pos 1–6 for "piano studio near me", "piano lessons adults", "in person piano lessons".
- Engagement rate is 98–100% on every channel — the site converts attention well once people land.

### 1.3 What is weak

1. **Core money queries rank pages 4–6**: "piano lessons san jose" pos 41.6 (26 impr), "san jose piano lessons" 43.9, "private piano lessons for adults" 52.7 (33 impr — the single biggest impression query, zero clicks).
2. **Query–page cannibalization**: the homepage (271 impr, pos 34) and `/en/contact` (109 impr, pos 35) absorb most impressions for commercial queries, while the purpose-built `/en/piano-teacher-san-jose` (107 impr, pos 42, 0 clicks) and `/en/piano-lessons-san-jose` (2 impr) split the rest. Google isn't sure which page is the canonical answer for the San Jose cluster.
3. **Zero branded queries** in GSC. The studio has no searchable brand footprint yet; all brand-aware demand shows up as Direct (39 sessions, best engagement after AI).
4. **/zh gets only 5% of impressions** despite superior rankings — Chinese-language demand capture is far below potential (Taiwan: 14.3% CTR at pos 4).
5. **Content gaps with proven demand**: "piano lessons for beginners sunnyvale" (23 impr), "piano lessons cupertino" (12), "piano lessons santa clara" (11), "sunnyvale piano lessons" (9) — ~55 impr/28d landing on the homepage at pos 44–55 with **no dedicated pages** (and `/piano-teacher-sunnyvale` currently 301s away to the San Jose page).
6. **Striking-distance adult cluster not yet capitalized**: "private piano lessons" 11.5, "private piano classes" 13.7, "piano lessons for adults" 18.4, "piano lessons for adults near me" 19.7, "piano lessons near me" 30.0.

---

## 2. What the best piano-studio sites do (research summary)

Benchmarks worth copying (full competitor set: Opus 1 Music Studio, Piano Power Chicago, Piano with Norbert London, San Jose School of Music, Merriam Music, Hoffman Academy):

- **Catchment-area location pages, not doorway pages** (Opus 1): each location/city block names the surrounding towns it serves in useful prose. Piano Power goes further: ~40 neighborhood pages, each with a **testimonial from a parent in that specific neighborhood** — the anti-spam ingredient.
- **Transparent pricing wins twice** (Piano Power: $98/45-min public; SJ School of Music: "$47/30-min" in FAQ; Piano with Norbert: full market tier table). AI engines strongly prefer sources with concrete prices; parents self-qualify.
- **The "pricing guide" content format is the highest-citation format in the niche**: Norbert's "How Much Do Piano Lessons Cost? (London 2026)" lays out market tiers by teacher type with real ranges, then positions his own pricing inside the framework. Directly transplantable to San Jose.
- **Quotable specificity gets cited**: "48–51 lessons per year", "since 2006", "trusted by 1,000 families", "Dr. …, 33 years, Master's in Piano Pedagogy". Numbers + credentials stated plainly.
- **Answer-first informational content wins AI Overviews** (Hoffman: "best age is 6–8, but…" in the first paragraph). The local variants of these queries are uncontested.
- **The local #1 (San Jose School of Music) still has lorem-ipsum placeholder text on its homepage** — it ranks on longevity + GBP + reviews, not site quality. This site's technical stack is already ahead; the gap is entity presence, reviews, and content volume.

### 2026 evidence on ranking factors (for prioritization)

- Local pack weighting: **GBP ~32% > on-page ~19% > reviews ~16% > links ~15%** > behavioral ~8% > citations ~7% (hygiene only).
- GEO retrieval is two separate systems: *"recommend a teacher in San Jose"* → engines cite **entity signals** (GBP/Maps, Yelp, homepage, review text); *"how much do lessons cost / best age"* → engines cite **topical content** (guides, pricing pages). Both stacks needed.
- **ChatGPT search runs on Bing** (scans ~top 20–30 Bing organic results) and leans on Google Maps cards, Yelp, BBB for local recs. Perplexity rewards freshness + YouTube (16% of citations) + Reddit (6.6%). Google AI Overviews: 76% of citations come from the existing top-10 — win normal rankings first.
- Princeton GEO study measured lifts: citing authoritative sources **+115%**, statistics **+30–41%**, quotations **+28%**.
- **llms.txt: keep it (zero cost, already auto-generated), but treat as zero-weight** — 2026 studies (500M+ bot-visit audit, SE Ranking 300k domains, Google statements) show no citation correlation. AI crawlers read rendered HTML. Never divert effort to it at the expense of HTML structure.

---

## 3. Prioritized action plan

Ordered by (impact × confidence) / effort, given the data above. P0 = do first.

### P0 — Off-site entity work (no code, highest leverage; owner tasks)

These are not codebase tasks, but they gate everything else (GBP ≈ 32% of local pack; Bing gates ChatGPT):

1. **Bing Places + Bing Webmaster Tools**: claim profile, verify site, submit sitemap, confirm key pages indexed. Single fastest GEO payoff (feeds ChatGPT + Copilot). Also **Apple Business Connect** (feeds Siri/Apple Maps; nearly all competitors skip it).
2. **Google Business Profile maximization**: primary category Piano Instructor/Music School, all services listed (private / kids / adult / online piano lessons, theory, Certificate of Merit prep), bilingual English/Mandarin stated in description, monthly posts, fresh photos, seeded Q&A.
3. **Review velocity system**: target 3–4 new Google reviews/month (benchmark: 20+ to compete, 50+ at 4.6★ to dominate). Coach parents to mention specifics — "piano lessons", their city (Cupertino/San Jose/Sunnyvale), "bilingual", "Certificate of Merit" — review text feeds both local relevance and AI answer language. Respond to every review within 7 days. Diversify: Yelp (heavily cited by AI for local), Facebook, Nextdoor.
4. **NAP consistency sweep**: identical name/address/phone (Cupertino address per `siteConfig`) across GBP, Bing, Apple, Yelp, Facebook, BBB, Nextdoor + data aggregators. Conflicting data actively suppresses AI citations.
5. **Earned mentions**: MTAC/CAPMT listings, r/SanJose + Bay Area parent forums (authentic participation), local Chinese-community media/directories (moat reinforcement).

### P1 — Codebase: fix cannibalization + capture striking-distance queries

6. **Consolidate the San Jose cluster.**
   - Decide the canonical page for "piano lessons/teacher san jose" (~90 impr/28d splitting across homepage, `/en/contact`, `/en/piano-teacher-san-jose`, `/en/piano-lessons-san-jose`). Recommended: `piano-lessons-san-jose` as primary (lesson intent) with `piano-teacher-san-jose` clearly differentiated toward "choosing/vetting a teacher" intent.
   - Strengthen internal links: homepage hero/nav/footer should link to the landing pages with keyword-bearing anchor text; landing pages cross-link via `relatedLinks` in `content/landing-pages.ts`.
   - **Fix `/en/contact` leakage**: it earns 109 impressions at pos 35 for commercial queries. Retitle it to pure navigational intent ("Contact Eric Liu Piano Studio") via `content/*.ts` seo.pages.contact and add a prominent link to the relevant landing pages, so commercial queries route to service pages.
   - Files: `content/landing-pages.ts`, `content/site.ts` (seo defaults/pages), `components/LandingPageView.tsx` (only if link slots needed), homepage content.
7. **Strengthen the adult cluster (closest to page 1).** `/en/adult-piano-lessons` already ranks 5.3 when shown. Add the exact striking-distance phrasings naturally into H2s/intro/FAQ copy ("private piano lessons", "private piano classes", "piano lessons for adults near me") in `content/landing-pages.ts` + `content/faqs.ts`, both locales; add internal links from home + other landing pages with those anchors. Bump `contentVersion`.
8. **New landing pages for proven-demand cities: Sunnyvale, Cupertino, Santa Clara.** ~55 impr/28d with zero dedicated pages; Cupertino is also the studio's actual NAP city (easy credibility). Follow the existing pattern exactly: new entries in `content/landing-pages.ts` (en+zh), route directories under `app/[locale]/<slug>/page.tsx` mirroring an existing landing page, slugs added to sitemap route specs, QuickAnswer/FactsAtAGlance/AuthorByline/FAQ+Breadcrumb+Speakable JSON-LD like the other 5. Each page needs genuine local detail (drive times, landmarks, ideally a testimonial from a family in that city) — **do not template-spam**; that's what separates Piano Power from doorway pages. Note: `/piano-teacher-sunnyvale` currently 301s to the San Jose page in `next.config.ts` — remove/adjust that redirect if a Sunnyvale page ships (needs user sign-off per guardrails).

### P2 — Codebase: enable the content engine

9. **Enable the journal.** 6 finished bilingual articles with Article/HowTo/Speakable schema already exist in `content/articles.ts` but routes 404 (`JOURNAL_ENABLED = false` in `app/[locale]/journal/`). This is shipped-but-dark inventory covering exactly the formats that win AI citations (first-lesson guide, choose-a-teacher, online-vs-in-person, digital-vs-acoustic). Flip the flag, add journal routes to `app/sitemap.ts` and `lib/llms.ts` `canonicalPages()`, add nav/footer links, verify both locales render, bump `contentVersion`.
10. **Write the San Jose pricing guide (highest-value new content).** "How much do piano lessons cost in San Jose? (2026)" as a journal article or landing page, en+zh: market tiers by teacher type with real dollar ranges (Bay Area private: ~$60–120/hr; national avg ~$47/30-min), total cost of ownership (books, CM fees, tuning), then position the studio's actual rates inside the framework (the Norbert model). Note the current `lesson-cost` FAQ deflects on price — publishing real numbers is the single strongest citation magnet in this niche. Refresh quarterly; keep "2026" in the title, update annually.
11. **Additional answer-first guides (in citation-value order):** best age to start piano (local variant), Certificate of Merit explainer (South Bay parent gold; cite the studio's own student results), teacher-vs-app comparison (Simply Piano/Hoffman vs a live local teacher). Each: question-phrased H2s, answer in first 1–3 sentences, statistics with sources (+30–41% citation lift), named author with credentials via `AuthorByline`.
12. **Close the /zh gap.** All new landing pages and guides ship en+zh simultaneously (guardrail anyway). Also fix the known `practice-frequency` FAQ drift (rich EN answer vs generic ZH) in `content/faqs.ts`, and state explicitly on EN pages that lessons are offered in Mandarin and English — AI engines answer "Chinese-speaking piano teacher San Jose" from exactly such sentences.

### P3 — Codebase: schema/asset hygiene (small fixes, real signal)

13. **Replace placeholder images**: `ogDefault`, `studio`, `teacher` and all 6 VideoObject thumbnails currently point to `/og-default.jpg` (`content/site.ts` `images`). Real teacher/studio photos strengthen OG cards, LocalBusiness/Person image, and the AuthorByline authority signal. Descriptive alts with natural entity words.
14. **Fix review-count inconsistency**: 4 on-page testimonials but `reviews.totalCount: 3` and only 3 Review nodes in JSON-LD (`content/site.ts`, `lib/seo.ts`). Align counts with verified Google review reality.
15. **Populate `sameAs`**: `socialLinks: []` and Bilibili-only `ownerProfiles` in `content/site.ts`. After P0 profiles exist (GBP, Yelp, Bing, Facebook, MTAC), wire them into the Organization/Person `sameAs` arrays — this is the entity-triangulation layer AI systems cross-check.
16. **Home speakable mismatch**: `buildSpeakableJsonLd` targets `.quick-answer` but home renders no `QuickAnswer`. Either add a QuickAnswer block to home (content task, en+zh) or scope the speakable selector per page.
17. **Include `commonObjections` in FAQ schema**: landing pages render visible `#objection-*` Q&A blocks that are absent from `buildFaqJsonLd()` output — free FAQPage coverage sitting on the table (`lib/seo.ts`, `components/LandingPageView.tsx` data flow).
18. **Remove/repair the `SearchAction`** in WebSite schema (`lib/seo.ts`) — points to a search endpoint that doesn't exist; minor accuracy issue.
19. **zh font loading**: Chinese pages rely on CSS-fallback "Noto Sans SC" without `next/font` — potential FOUT/CLS on the site's best-ranking pages. Consider a subsetted `next/font` load.
20. **Dedicated `/reviews` page** (en+zh) aggregating testimonials with city mentions — quotations lift AI visibility ~28% and it gives review-intent queries a landing spot. New route ⇒ sitemap + llms + breadcrumbs per guardrails.

### Ongoing / measurement

- Quarterly: fresh-session prompts to ChatGPT/Perplexity/Google AI Mode — "best piano teacher in San Jose", "piano lessons San Jose cost", "bilingual Chinese piano teacher San Jose" — record who gets cited, steer content accordingly.
- Watch GSC for: the impression surge consolidating into better positions (expected over 4–8 weeks), whether Google shifts impressions from homepage/contact to the landing pages after P1, and first appearance of branded queries.
- Watch GA4 "AI Assistant" channel — currently 3 sessions but perfect engagement; it should grow with P0 items 1–4.

---

## 4. Task → file map (quick reference for implementing agents)

| Task | Primary files | Guardrail notes |
|---|---|---|
| San Jose cluster consolidation (#6) | `content/landing-pages.ts`, `content/site.ts` | Copy change ⇒ bump `contentVersion`; keep one H1; keep anchors stable |
| Adult cluster copy (#7) | `content/landing-pages.ts`, `content/faqs.ts` | en+zh parity; FAQ edits flow into llms.txt automatically |
| City landing pages (#8) | `content/landing-pages.ts`, `app/[locale]/<slug>/page.tsx`, `app/sitemap.ts`, redirect in `next.config.ts` | New route ⇒ sitemap spec + both locales + full JSON-LD set; redirect removal needs sign-off |
| Enable journal (#9) | `app/[locale]/journal/*`, `app/sitemap.ts`, `lib/llms.ts`, nav in `content/site.ts` | New indexable routes ⇒ sitemap + llms; verify Article JSON-LD both locales |
| Pricing guide + guides (#10, #11) | `content/articles.ts` (or new landing entry), same route plumbing as #9 | Answer-first, stats with sources, AuthorByline, en+zh |
| zh FAQ parity (#12) | `content/faqs.ts` | Both locales in same commit |
| Images (#13) | `content/site.ts` `images`, `public/` | Descriptive alts, no keyword stuffing |
| Review count (#14) | `content/site.ts` `reviews`, testimonials | Must match verifiable Google reviews |
| sameAs (#15) | `content/site.ts` `socialLinks`/`ownerProfiles`, `lib/seo.ts` | NAP identical everywhere |
| Speakable/FAQ-schema/SearchAction (#16–18) | `lib/seo.ts`, `components/LandingPageView.tsx`, home page content | Schema must match visible content |
| zh font (#19) | `app/[locale]/layout.tsx` | Pure perf; zero copy diff |
| /reviews page (#20) | new route + `content/*` + `app/sitemap.ts` + `lib/llms.ts` | Full new-route checklist |

**Post-change checklist (from guardrails, always):** `git diff` content files reviewed; `npm run build` passes; view-source shows H1/intro/FAQ in initial HTML for both locales; exactly one `<h1>`; JSON-LD parses; `curl localhost:3000/llms.txt` reflects page set; sitemap includes new routes; no accidental noindex.
