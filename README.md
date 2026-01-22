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
- Booking link (Google Calendar appointment schedule)
- Bilingual copy for each page

## Environment Variables

Create `.env.local`:

```
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_BOOKING_URL=https://calendar.google.com/calendar/appointments/schedules/your-schedule-id
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USER=your-gmail-address@gmail.com
SMTP_PASS=your-app-password
CONTACT_TO_EMAIL=mr.tingliu@gmail.com
CONTACT_FROM_EMAIL=your-gmail-address@gmail.com
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
