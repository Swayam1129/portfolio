# Swayam Sagar portfolio

A full-stack portfolio built with Next.js (App Router, TypeScript), PostgreSQL (Neon + Drizzle ORM) and the Claude API.

## Features

- **"Ask about my work" chat:** recruiters ask questions and get answers grounded only in `src/content/profile.ts` (`/api/chat`, Claude API, rate limited, prompt-injection guarded).
- **Contact form:** validated with Zod, spam-protected with a honeypot and rate limit, stored in Postgres, optional email alert via Resend (`/api/contact`).
- **Live GitHub stats:** language breakdown and recently pushed repos from the GitHub REST API, cached hourly.
- **Admin dashboard (`/admin`):** password login with an HMAC-signed, httpOnly session cookie. Read and manage messages, see what visitors asked the chat, and add, edit, hide or reorder projects without redeploying.
- Responsive, light/dark theme, keyboard accessible, respects reduced motion.

Every backend feature is optional: with no environment variables set, the site runs as a static portfolio.

## Edit your content

Everything (intro, experience, projects, skills, links) lives in **`src/content/profile.ts`**. The chat answers only from this file, so keep it accurate.

To add your résumé, put `resume.pdf` in `public/` and set `resume: "/resume.pdf"` in `profile.ts`.

## Run locally

```bash
npm install
cp .env.example .env.local   # fill in what you want to use
npm run dev                  # http://localhost:3000
```

## Deploy (free) on Vercel

1. **Push to GitHub:**
   ```bash
   git init && git add . && git commit -m "Portfolio v2"
   gh repo create portfolio --public --source=. --push
   ```
2. **Import on Vercel:** at vercel.com/new, sign in with GitHub, pick the repo, then Deploy.
3. **Add a database:** go to Vercel project → Storage → Create → **Neon Postgres** (free). This sets `DATABASE_URL` automatically.
4. **Create the tables** from your Mac:
   ```bash
   npx vercel env pull .env.local   # pulls DATABASE_URL down
   npm run db:push                  # creates messages, projects, chat_log
   npm run db:seed                  # optional: copies profile.ts projects into the DB
   ```
5. **Add environment variables:** Vercel → Settings → Environment Variables:
   - `ADMIN_PASSWORD`, plus `ADMIN_SECRET` (run `openssl rand -hex 32`)
   - `ANTHROPIC_API_KEY` from console.anthropic.com. Add a small monthly spend limit there; the chat uses a cheap model and short answers.
   - Optional: `RESEND_API_KEY` + `CONTACT_TO_EMAIL` for email alerts, `GITHUB_TOKEN` for a higher GitHub rate limit
6. **Redeploy** (Deployments → ⋯ → Redeploy).

### Keep `swayam1129.github.io`

GitHub Pages can't run a backend. Either point people to the Vercel URL (or a custom domain), or replace the old Pages repo's `index.html` with a redirect:

```html
<meta http-equiv="refresh" content="0; url=https://YOUR-SITE.vercel.app">
```

## Project structure

```
src/
  app/
    page.tsx              home page
    api/chat/route.ts     AI chat endpoint
    api/contact/route.ts  contact form endpoint
    admin/                dashboard, login, server actions
  components/             AskBox, ContactForm, GitHubActivity
  content/profile.ts      all your content
  db/                     Drizzle schema, client, seed
  lib/                    auth, GitHub API, rate limiting, projects
```
