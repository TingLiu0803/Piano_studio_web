# Page Templates — section-by-section specs

Wireframes + implementation notes per page type. Copy/H1/FAQ/JSON-LD are NEVER altered
when applying these — re-skin containers only (verify with piano-studio-geo-guardrails).

---

## 1. Orientation Band (component: `OrientationBand.tsx`) — used on EVERY non-home page

Sits directly below `<SiteHeader>`, above the H1. ~56px tall desktop, two lines mobile.

```
┌──────────────────────────────────────────────────────────────┐
│ [PianoKeyboardMark 20px] Eric Liu Piano Studio · San Jose, CA │  ← 12.8px, --muted
│ Home › Lesson options › Adult piano lessons                   │  ← visible breadcrumb
│ ═[OctaveStrip: current page's key filled --felt]═════════════ │  ← 10px tall
└──────────────────────────────────────────────────────────────┘
```

Implementation:
- New server component taking `locale` and `path`; derive crumbs from the SAME data
  source `BreadcrumbJsonLd` uses (refactor that mapping into `lib/breadcrumbs.ts` and
  feed both — one source, two renderings).
- Markup: `<nav aria-label="Breadcrumb"><ol>` with `aria-current="page"` on the last item.
  Non-current crumbs are links (`--link`, underline on hover).
- OctaveStrip: extend `PianoKeyboardMark` into a horizontal 12-key SVG strip,
  `stroke: var(--border)`, current key `fill: var(--felt)`. Map: key 1 = home,
  keys 2–6 = the five landing slugs in `landingPageSlugs` order, key 7 = about,
  key 8 = contact, key 9 = trial. Hidden from AT: `aria-hidden="true"` (decorative;
  the breadcrumb carries the semantics).

## 2. SEO landing page (LandingPageView.tsx re-skin; 5 lesson-options pages)

```
[SiteHeader]
[OrientationBand]
┌ Hero card: bg --surface, 1px --border, 16px radius, 4px left border --highlight ┐
│ eyebrow: "ADULT LESSONS · SAN JOSE & ONLINE"  (12.8px caps, --felt)             │
│ H1 (Fraunces 39/49, copy UNCHANGED from content/landing-pages.ts)               │
│ [P1 avatar 40px round] AuthorByline (existing component + photo prop)           │
│ Lead/intro paragraph — 20px, fully visible                                      │
│ [Book a free trial] (brass pill)   [Watch performances ↗] (secondary pill)      │
└─────────────────────────────────────────────────────────────────────────────────┘
[QuickAnswer — keep component; restyle: bg --highlight, 1px --border, NO collapse]
[Photo P3 full-width 3:2, next/image, rounded-2xl, caption 12.8px --muted]
[FactsAtAGlance — keep; restyle as 2-col definition grid on --surface]
For each LandingSection:
  H2 (Fraunces 31) + bullets (16px) + body paragraph ALWAYS VISIBLE
  → delete the `useDetails` branch in SectionContent entirely
  After every 2nd section, insert one ProofInterlude (alternate):
    a) one testimonial blockquote (felt-tint bg, 16px, attributed)
    b) one VideoCard from the existing Bilibili set
[Neighborhoods section — keep, render as tag pills (--tag bg)]
[Common questions — keep markup + ids (anchor links #objection-N must keep working)]
[CTA band: bg --felt-tint, centered, brass pill CTA]
["Continue reading" + explicit link: "See the full studio overview →" → /{locale}]
[SiteFooter — OctaveStrip as its top border]
```

## 3. Contact page = mini-homepage

```
[SiteHeader][OrientationBand]
┌ grid lg:grid-cols-[1fr_1fr] gap-10 ─────────────────────────────────────────────┐
│ LEFT                                      │ RIGHT                               │
│ H1 "Contact the studio" (unchanged)       │ Form card (existing ContactForm,    │
│ [P1 photo 96px round]                     │  restyled inputs per tokens.md)     │
│ "You'll be talking to Eric — piano        │                                     │
│  teacher in San Jose. Most inquiries      │                                     │
│  get a same-day reply."                   │                                     │
│ TrustRow: ★★★★★ Google · 8+ yrs · 60+     │                                     │
│  students  (badges, felt-tint)            │                                     │
└─────────────────────────────────────────────────────────────────────────────────┘
[NewHerePathways: 3 cards — "Watch performances" (→ /{locale}#bilibili-videos),
 "Meet the teacher" (→ about, with P1 thumb), "Browse lesson types" (→ /{locale}#lesson-options)]
[StudioDetails card: NAP block — exact same name/address/phone as footer & JSON-LD.
 Email must be the domain address once mailbox exists (hello@sanjosepianolesson.com);
 keep gmail only until then, flag it to the user.]
[SiteFooter]
```

Trust copy for the left column goes into `content/site.ts` under `contact`
(add `introPhotoAlt`, `intro`, `trustBadges` fields, en + zh).

## 4. Homepage adjustments (structure stays hub-and-spoke)

1. Hero → 2 columns: text left, P2 studio photo right (`next/image`, priority,
   rounded-2xl, 1px border). OctaveStrip between H1 and subtitle.
2. Move the stats row (8+ years / 60+ students / ★★★★★ / 1:1 only) INSIDE the hero,
   directly under the CTAs, as quiet badges.
3. "Choose your lesson type" cards: add small P3 crops (or consistent line-icon set if
   photos are pending) — never leave them as text-only links.
4. Delete the radial-gradient blobs; reduce "Book a free trial" repetition from 4 blocks
   to 2 (hero + pre-footer). The sticky CTA covers mid-scroll intent.

## 5. Placeholder protocol (until real photos land)

Use `<PhotoPlaceholder slot="P1" ratio="1:1" />` — bg --surface-muted, 1px dashed
--border, centered camera glyph + the slot label. Always remind the user at the end of
the task which P-slots are still placeholders. Never substitute stock or AI images.

## 6. Definition of done for any template work

- /en and /zh both render; all `content/*.ts` strings have both locales.
- Anchors that exist today keep working: `#lesson-options`, `#bilibili-videos`,
  `#faq-*`, `#objection-*`.
- `git diff` over `content/landing-pages.ts`, `content/faqs.ts` shows no copy changes
  (styling-only tasks).
- Lighthouse: SEO 100, a11y ≥ 95; LCP element is the hero (text or properly-sized image).
- Mobile 380px wide: orientation band wraps to 2 lines, no horizontal scroll.
