# Design Tokens — "Ivory & Felt" (drop-in for app/globals.css)

This file is the machine-readable token source. If a token isn't here, it doesn't exist.
When adding a token: add it here first, then to `globals.css`, then use it.

## Complete globals.css replacement block

```css
@import "tailwindcss";

:root {
  color-scheme: light;

  /* Piano materials */
  --ivory: #faf7f0;
  --ebony: #211d1a;
  --brass: #b8860b;
  --brass-hover: #9a7009;
  --felt: #a4243b;

  /* Semantic mapping (keep these names — components reference them) */
  --background: var(--ivory);
  --foreground: var(--ebony);
  --surface: #ffffff;
  --surface-muted: #f4efe6;
  --surface-inverse: var(--ebony);
  --surface-inverse-foreground: var(--ivory);
  --border: #e5dfd3;
  --muted-foreground: #6b6257;
  --primary: var(--brass);
  --primary-hover: var(--brass-hover);
  --primary-foreground: #fffdf7;
  --accent: var(--felt);
  --accent-foreground: #fffdf7;
  --link: #8a6508;            /* darker brass: 4.5:1 on ivory for body-size links */
  --link-hover: #6f5106;
  --tag: #f7e9ec;             /* felt-tint */
  --tag-foreground: #7e1c2e;  /* darker felt for small text on tint */
  --highlight: #f5eddc;       /* brass-tint */
  --success: #3e7a5e;
  --error: var(--felt);
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-surface: var(--surface);
  --color-surface-muted: var(--surface-muted);
  --color-surface-inverse: var(--surface-inverse);
  --color-surface-inverse-foreground: var(--surface-inverse-foreground);
  --color-border: var(--border);
  --color-muted-foreground: var(--muted-foreground);
  --color-primary: var(--primary);
  --color-primary-hover: var(--primary-hover);
  --color-primary-foreground: var(--primary-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-link: var(--link);
  --color-link-hover: var(--link-hover);
  --color-tag: var(--tag);
  --color-tag-foreground: var(--tag-foreground);
  --color-highlight: var(--highlight);
  --color-success: var(--success);
  --color-error: var(--error);
  --font-sans: var(--font-geist-sans);
  --font-display: var(--font-fraunces);
  --font-mono: var(--font-geist-mono);
}

body {
  background: var(--background);
  color: var(--foreground);
  font-family: var(--font-geist-sans), "Noto Sans SC", Arial, Helvetica, sans-serif;
  scroll-behavior: smooth;
  /* NOTE: the old radial-gradient blobs are intentionally removed. Do not re-add. */
}

::selection { background: var(--highlight); color: var(--ebony); }
a { color: inherit; text-decoration: none; }
* { box-sizing: border-box; }
```

## Font setup (app/[locale]/layout.tsx or app/layout.tsx)

```ts
import { Fraunces } from "next/font/google";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  axes: ["opsz"],          // optical size axis: elegant large, sturdy small
  display: "swap",
});
// add fraunces.variable to the <html>/<body> className alongside Geist vars
```

zh locale: display headings fall back via
`font-family: var(--font-fraunces), "Noto Serif SC", serif;` — load Noto Serif SC only
in the zh layout branch if bundle size matters.

## Type scale (1.25 ratio)

| Step | px | Usage |
|---|---|---|
| -1 | 12.8 | eyebrows (uppercase, tracking 0.08em, `--felt`), captions |
| 0 | 16 | body (line-height 1.7). Minimum for paragraphs — never `text-sm` for body |
| 1 | 20 | lead paragraphs, card titles |
| 2 | 25 | H3 |
| 3 | 31 | H2 (Fraunces 560) |
| 4 | 39 | H1 mobile / section heroes (Fraunces 600) |
| 5 | 49 | H1 desktop (Fraunces 600, opsz auto) |

## Shape, elevation, spacing

- Radius: cards/images 16px (`rounded-2xl`), buttons & badges pill (`rounded-full`),
  inputs 10px (`rounded-[10px]`).
- Borders: 1px `--border` on every card/input; emphasized card gets a 4px left border
  in `--highlight` background context instead of a shadow.
- Shadow: only `shadow-[0_4px_16px_rgb(33_29_26/0.08)]` on sticky CTA + open dropdown.
- Spacing: 8px grid. Sections `py-24` desktop / `py-16` mobile. Page `max-w-6xl px-6`.
  Prose column `max-w-[42rem]`.

## Contrast pre-checked pairs (WCAG AA)

| Pair | Ratio | OK for |
|---|---|---|
| ebony #211D1A on ivory #FAF7F0 | ~14.9:1 | everything |
| muted #6B6257 on ivory | ~5.5:1 | secondary text |
| link #8A6508 on ivory | ~4.6:1 | body links (underline them) |
| primary-foreground #FFFDF7 on brass #B8860B | ~3.2:1 | large/bold button text (≥16px semibold) only |
| tag-foreground #7E1C2E on felt-tint #F7E9EC | ~7.8:1 | badges |
| felt #A4243B on ivory | ~6.4:1 | eyebrows, icons |

Do not put brass text below 16px semibold on ivory; use `--link` for small links.
