---
name: piano-studio-geo-guardrails
description: SEO/GEO invariants that must never break on sanjosepianolesson.com (Piano_studio_web repo). MUST be consulted before and after ANY change that touches pages, components, content/*.ts, metadata, headings, routes, redirects, sitemap, robots, llms.txt, or JSON-LD — including "pure UI" redesigns, since those routinely break heading structure, hide content, or fork breadcrumb data. The site earns real Google rankings and AI-search citations from this infrastructure; treat it as production-critical. Use together with piano-studio-design-system for visual work.
---

# GEO/SEO Guardrails

This site's search and AI-citation performance comes from deliberate infrastructure.
Your job: make any change WITHOUT producing a diff in the signals below. When a task
genuinely requires changing one of them, stop and confirm with the user first, stating
which invariant is affected and why.

## Invariant inventory (what exists and where)

| Signal | Implementation | Rule |
|---|---|---|
| Per-page metadata + hreflang | `lib/seo.ts` `buildMetadata()` (en/zh/x-default alternates, canonical) | Every page route calls it. Never hand-roll `<meta>`/canonical. |
| H1 | One per page, keyword-bearing, from `content/*.ts` | Exactly one H1; copy changes are content tasks, never styling side-effects |
| Heading hierarchy | H1→H2→H3, no skips | Re-skins must keep levels; don't demote H2s to styled divs |
| Structured data | `JsonLd`, `BreadcrumbJsonLd`, FAQ schema via `lib/seo.ts` builders, speakable | Keep on every page that has them today; new landing pages get the same set |
| llms.txt / llms-full.txt | `app/llms.txt/route.ts` + `lib/llms.ts`, auto-generated from `content/*` | Never create a static public/llms.txt; content edits flow through content/*.ts so these stay in sync |
| Sitemap | `app/sitemap.ts`, stable `lastModified` from `contentVersion` | New indexable route ⇒ add to route specs. Bump `contentVersion` in `content/site.ts` ONLY when copy genuinely changes — never `new Date()` |
| robots | `app/robots.ts` | AI crawlers must stay allowed |
| Answer-first blocks | `QuickAnswer`, `FactsAtAGlance`, intro paragraphs that answer the query in the first ~200 words | Restyle freely; never remove, truncate, or collapse |
| Author authority | `AuthorByline` (+ about page lineage) | Keep on landing pages; adding a real photo strengthens it |
| Visible-content rule | Server-rendered, extractable text | Body copy must be visible in initial HTML: no `<details>`, no client-only rendering, no truncation behind "read more" JS |
| Anchors | `#lesson-options`, `#bilibili-videos`, `#faq-*`, `#objection-*` | Inbound/internal links rely on them; keep ids stable |
| Locale parity | every string in `content/*.ts` has en + zh; routes exist under both `/en` and `/zh` | A page or string shipped in one locale only breaks hreflang pairs |
| NAP consistency | name / address / phone / email identical across footer, contact page, JSON-LD, llms.txt | One source in `content/site.ts` (`siteConfig`); never hardcode a second copy |

## Known approved exception

Removing the `<details>`/"Read more" collapse in `LandingPageView.SectionContent` is
REQUIRED, not a violation: it exposes already-indexed copy, improving extractability.
The copy itself must not change in the same commit.

## Pre-merge checklist (run after every task touching pages/content)

1. `git diff` on `content/landing-pages.ts`, `content/faqs.ts`, `content/site.ts`:
   - styling task ⇒ zero copy diffs (token/field additions for new UI strings are fine,
     must include both locales);
   - content task ⇒ diffs reviewed against the H1/QuickAnswer/FAQ rules above, and
     `contentVersion` bumped.
2. `npm run build` succeeds; then for a changed page in BOTH locales:
   - view-source (initial HTML) contains the H1, intro paragraph, and FAQ text;
   - exactly one `<h1>`;
   - `application/ld+json` blocks parse and match page type (breadcrumb path = visible
     breadcrumb path).
3. `curl localhost:3000/llms.txt` still reflects the page set; sitemap includes any new
   route; no route was renamed (renames need a 301 in `middleware.ts` + user sign-off).
4. No new `robots`/`noindex` surprises in `buildMetadata` overrides.
5. Images: every `next/image` has descriptive alt containing natural entity words
   (teacher name / "San Jose piano studio") — no keyword stuffing, no empty alts on
   meaningful photos.

## When the user asks for something that conflicts

Example: "remove that FAQ section, it's ugly". Don't silently comply or silently refuse.
Explain the signal at stake (FAQ schema feeds AI citations and SERP features), offer the
compliant alternative (restyle it per the design system; keep markup), and proceed per
their decision.
