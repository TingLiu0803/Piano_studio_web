# Piano Studio Website

SEO-first personal website for a private piano studio. Built with Next.js App
Router and designed for bilingual marketing, lead capture, and performance
videos.

## Getting Started

Install dependencies and run the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Stack

- Next.js 16 (App Router)
- Tailwind CSS v4
- SQLite (local lead capture)
- GA4 support via `NEXT_PUBLIC_GA_ID`

## Configuration

Update content and studio info in `content/site.ts`:

- Business name, city, contact info
- Bilibili embed URLs
- Booking link (Cal.com or Calendly)
- Bilingual copy for each page

## Environment Variables

Create `.env.local`:

```
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

## Lead Capture Database

Leads are stored locally in `data/leads.db` using SQLite via
`better-sqlite3`. For production, consider migrating to a hosted database
(Neon, Supabase, etc.) or an email provider.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Deployment

Recommended hosting: Vercel.

- Configure environment variables in Vercel settings
- Ensure `NEXT_PUBLIC_SITE_URL` matches your production domain
