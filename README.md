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
  layout.tsx                  Root layout — fonts (Inter + Playfair), SEO metadata, theme colour
  page.tsx                    Homepage — hero, services overview, sections, footer, JSON-LD
  globals.css                 Design tokens + all styles
  icon.svg                    Favicon (navy app-icon tile)
  lib/
    services.ts               Single source of truth for all services (copy, FAQs, slugs)
  services/
    page.tsx                  /services index — flagship grid + full range + ItemList schema
    [slug]/page.tsx           Dynamic per-service page (Service + FAQPage schema, generateStaticParams)
  components/
    SiteHeader.tsx            Frosted nav bar + mobile drawer (client)
    DoorHero.tsx              Scroll-scrub door hero + card carousel (client)
    ServicesOverview.tsx      Homepage services section
    Footer.tsx                Site footer (navy, NAP, quick links)
public/
  services/                   Service photos go here (see public/services/README.md)
```

**Services architecture:** all services live in `app/lib/services.ts`. The 6 flagship services
have full copy + FAQs; the other 16 use a concise template. Every service is prerendered as a
static page at `/services/<slug>`. To add full copy to an additional service, just fill in its
`sections` and `faqs` in that one file.

---

## To finish before / after launch

- **Domain & metadata** — update `SITE_URL` in `app/layout.tsx` and the `url` in `app/page.tsx` (JSON-LD) to the live domain. Add the real NAP (name, address, phone) to the JSON-LD.
- **Service photos** — the code points at `/public/services/*.png`. Add the six image files there (see `public/services/README.md` for exact filenames + download links). Optionally switch to `next/image` later for automatic optimization.
- **Fonts** — Inter + Playfair are loaded via a Google Fonts `<link>`. For best Core Web Vitals, migrate to `next/font` (self-hosted).
- **Real content** — fill in the placeholder Services / About / Certifications / Projects / Blogs / Contact sections, and wire the Contact CTA to a form or mailto.
- **Analytics & sitemap** — add analytics and a `sitemap.ts` / `robots.ts` for SEO.

---

Built as part of the City Commerce Finance SEO/AEO project.
