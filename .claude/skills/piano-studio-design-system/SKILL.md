---
name: piano-studio-design-system
description: The authoritative "Ivory & Felt" design language for sanjosepianolesson.com (Piano_studio_web repo, Next.js 16 + Tailwind 4). MUST be used for ANY work that touches this site's UI, styling, layout, components, pages, or visual content — including creating new pages, editing existing pages, tweaking globals.css, adding components, adjusting copy placement, or "making something look better". Trigger even for small visual changes like button colors or spacing, and even if the user doesn't mention "design". If the task also edits SEO-relevant content or metadata, additionally consult the piano-studio-geo-guardrails skill.
---

# Piano Studio Design System — "Ivory & Felt"

You are maintaining the visual identity of Eric Liu Piano Studio (sanjosepianolesson.com),
a solo classical piano teacher site under the MusicNBrain NPO. The brand voice:
**engineer-turned-pianist** — piano materials (ivory, ebony, brass, red key felt) rendered
with engineering discipline (strict grid, restrained decoration, visible hierarchy).

## Three non-negotiable principles

1. **Every page is a front door.** Most visitors land on SEO subpages
   (/en/adult-piano-lessons, /en/contact, ...) directly from search, never seeing the
   homepage. Every page below the header must render the **Orientation Band**:
   brand lockup ("Eric Liu Piano Studio · San Jose, CA"), a *visible* breadcrumb nav,
   and the Octave Strip with the current page's key filled in `--felt`.
2. **Trust before conversion.** Above the fold, order is: who this is (photo/identity)
   → why trust them (Google stars, years, students, video link) → then the CTA.
   Never lead with a bare form or a wall of keyword headings.
3. **Nothing collapsed, nothing hidden.** Body copy is always visible. Never use
   `<details>`/accordion for primary content (FAQ accordions with FAQ JSON-LD intact are
   the only exception, and prefer open-by-default). Never use `text-sm` (14px) for body
   copy — body text is 16px minimum.

## Tokens (full table + CSS in references/tokens.md — read it before editing globals.css)

Quick reference:

| Token | Value | Use |
|---|---|---|
| `--ivory` bg | `#FAF7F0` | page background (replaces gray #f3f4f6) |
| `--ebony` fg | `#211D1A` | text |
| `--brass` primary | `#B8860B` (hover `#9A7009`) | primary CTA, key links |
| `--felt` accent | `#A4243B` | eyebrows, badges, active octave key. **< 5% of any viewport** |
| `--surface` | `#FFFFFF` | cards, with 1px `--line` border, 16px radius, no shadow |
| `--line` | `#E5DFD3` | borders/dividers |
| `--muted` | `#6B6257` | secondary text |
| tints | `--felt-tint #F7E9EC`, `--brass-tint #F5EDDC` | badge/highlight backgrounds |

Typography: **Fraunces** (next/font, Google) for display/H1/H2; **Geist** (already
installed) for body/UI. zh locale falls back to Noto Serif SC / Noto Sans SC.
Scale: 12.8 / 16 / 20 / 25 / 31 / 39 / 49 px. Body 16px/1.7.

Shape: cards 16px radius (NOT rounded-3xl), buttons pill (rounded-full), 48px tall.
Shadows: none on cards; only floating elements (sticky CTA, dropdowns) get
`0 4px 16px rgb(33 29 26 / 0.08)`.
Spacing: 8px grid; section gap 96px desktop / 64px mobile; content max-w-6xl,
prose column max-w-[42rem].

## The signature: Octave Strip

A ~10px-tall wireframe strip of one piano octave (7 white + 5 black keys), stroked in
`--line`, extending the existing `PianoKeyboardMark` component. Used in EXACTLY three
places (do not add more): (1) inside the Orientation Band under the breadcrumb, with the
current page's key filled `--felt`; (2) homepage hero, between H1 and subtitle;
(3) top border of the footer. This is the site's only "flourish" — keep everything
else quiet.

## Hard prohibitions

- No radial-gradient background blobs (delete the existing ones in `globals.css` body).
- No school-bus yellow `#f4c62c` / mint `#5ec2a9` — fully replaced by brass/felt.
- No stock photos and no AI-generated imagery of people. Only real photos of the actual
  teacher/studio via `next/image` with descriptive alt text. If real photos are not yet
  in `public/`, build the layout with a clearly-labeled placeholder component and tell
  the user which photo (P1–P4, see design doc §3) is needed — do not ship a text-only hero.
- No new fonts beyond Fraunces/Geist/Noto fallbacks; no new color tokens without
  updating references/tokens.md first.
- Never show minors' faces or full names in any imagery or testimonial.

## Page recipes

Read `references/page-templates.md` before building or restructuring any page. It contains
the wireframes and section-by-section specs for: Orientation Band, SEO landing pages
(the 5 lesson-options pages via `LandingPageView`), the Contact "mini-homepage", and the
homepage. Key invariant when re-skinning landing pages: **H1/H2 copy, QuickAnswer,
FactsAtAGlance, FAQ content and all JSON-LD must produce a zero diff** — you are changing
containers, not content.

## Component conventions

- All copy lives in `content/*.ts` (site.ts, landing-pages.ts, faqs.ts) — never hardcode
  user-facing strings in components; always add both `en` and `zh` variants.
- Style with Tailwind utilities referencing CSS variables
  (`bg-[color:var(--surface)]` pattern already used in the codebase) — do not introduce
  CSS modules or styled-components.
- Server components by default; `"use client"` only where interaction requires it
  (the existing header/form pattern).
- Buttons: primary = brass bg / ivory text / pill / hover darkens without movement;
  secondary = transparent / ebony text / 1px line border / pill.
- Forms: 48px inputs, 1px `--line` border, 2px brass focus ring, felt-colored error text,
  no layout shift on error.
- Focus visible always (2px brass ring); wrap all motion in
  `@media (prefers-reduced-motion: no-preference)`; max three motion moments site-wide
  (hero fade-in 200ms, card hover border→brass, sticky CTA slide-in).

## Self-check before finishing any UI task

1. Screenshot test: would a stranger, in 3 seconds on this page alone, know
   who / where / what / how to start?
2. Above the fold: human element + third-party proof + one CTA?
3. Zero `<details>` around body copy; zero `text-sm` body copy; zero gradient blobs?
4. Felt red under 5% of the viewport?
5. Run the geo-guardrails checklist if anything near content/metadata was touched.
6. `npm run lint` passes; check both `/en` and `/zh` locales render.
