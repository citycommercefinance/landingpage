# City Commerce Finance — Website

Marketing site for **City Commerce Finance LLC** (Dubai). Built with **Next.js (App Router) + TypeScript**.

Currently shipped: the homepage with the frosted-glass navigation bar and the scroll-driven "door" hero that reveals the six service cards, plus placeholder downstream sections (Services, About, Certifications, Projects, Blogs, Contact) and SEO metadata + JSON-LD.

---

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000

To check the production build:

```bash
npm run build
npm run start
```

---

## Deploy

### Push to GitHub

```bash
git init
git add .
git commit -m "City Commerce Finance — nav + door hero"
git branch -M main
git remote add origin https://github.com/<your-username>/city-commerce-finance.git
git push -u origin main
```

### Deploy on Vercel (recommended, free)

1. Go to https://vercel.com and sign in with GitHub.
2. **Add New… → Project**, import the `city-commerce-finance` repo.
3. Framework preset auto-detects **Next.js** — keep all defaults.
4. Click **Deploy**. You'll get a live `*.vercel.app` URL in ~1 minute.

Every `git push` to `main` auto-deploys.

---

## Project structure

```
app/
  layout.tsx              Root layout — fonts (Inter + Playfair), SEO metadata, theme colour
  page.tsx                Homepage — header, hero, downstream sections, JSON-LD
  globals.css             Design tokens + all nav/hero/section styles
  icon.svg                Favicon (navy app-icon tile)
  components/
    SiteHeader.tsx        Frosted nav bar + mobile drawer (client component)
    DoorHero.tsx          Scroll-scrub door hero + service-card carousel (client component)
```

---

## To finish before / after launch

- **Domain & metadata** — update `SITE_URL` in `app/layout.tsx` and the `url` in `app/page.tsx` (JSON-LD) to the live domain. Add the real NAP (name, address, phone) to the JSON-LD.
- **Service photos** — the code points at `/public/services/*.png`. Add the six image files there (see `public/services/README.md` for exact filenames + download links). Optionally switch to `next/image` later for automatic optimization.
- **Fonts** — Inter + Playfair are loaded via a Google Fonts `<link>`. For best Core Web Vitals, migrate to `next/font` (self-hosted).
- **Real content** — fill in the placeholder Services / About / Certifications / Projects / Blogs / Contact sections, and wire the Contact CTA to a form or mailto.
- **Analytics & sitemap** — add analytics and a `sitemap.ts` / `robots.ts` for SEO.

---

Built as part of the City Commerce Finance SEO/AEO project.
