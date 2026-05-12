# Chris Martindale Portfolio

Production-ready personal portfolio built with Next.js App Router, TypeScript, Tailwind CSS, Clerk, Supabase, and Vercel.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Create a Clerk app, disable public sign-ups, and copy keys into `.env.local`.
3. Create a Supabase project and copy URL, publishable key, and service role key into `.env.local`.
4. Add env vars from `.env.example`.
5. Run `supabase/schema.sql` in the Supabase SQL editor.
6. Start development:
   ```bash
   npm run dev
   ```
7. Push to GitHub.
8. Import the repo into Vercel and add the same env vars.

## Routes

- `/` homepage
- `/projects`
- `/projects/[slug]`
- `/about`
- `/contact`
- `/resume`
- `/admin` authenticated editor

## Notes

- `/admin` is protected by Clerk middleware in `src/proxy.ts`.
- Public reads use the Supabase publishable key and RLS select policies.
- Admin writes use `SUPABASE_SERVICE_ROLE_KEY` only on the server.
- Do not commit real secrets.
