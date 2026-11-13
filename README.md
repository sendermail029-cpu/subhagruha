# Subhagruha Website (Next.js 15 + Tailwind CSS)

## Run locally
```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start   # production
```

## Where to change things
| What | File |
|---|---|
| Phone numbers, WhatsApp, email, offices, social links, domain | `lib/site.ts` |
| Projects, RERA / T.L.P numbers, amenities, photos, SEO titles | `lib/projects.ts` |
| Brand colours (from logo) | `tailwind.config.ts` → `colors.brand` |
| Logo | `public/logo.png` |
| Site-wide SEO (title, description, OG) | `app/layout.tsx` |

## SEO included
- Unique title, description, keywords, canonical URL and Open Graph/Twitter tags on every page
- Static pre-rendered project pages (`/projects/[slug]`) for fast loading
- JSON-LD structured data: Organization/RealEstateAgent, WebSite, 3 office locations, FAQPage, Place (each project with RERA numbers as identifiers), BreadcrumbList, ItemList
- `sitemap.xml`, `robots.txt`, `manifest.webmanifest` generated automatically
- next/image (AVIF/WebP, lazy loading), self-hosted fonts, semantic HTML, descriptive alt text

## Before going live
1. Set the final domain in `lib/site.ts` (`url`).
2. Add your Google Search Console code in `app/layout.tsx` (`verification`) and submit `/sitemap.xml`.
3. Copy project images from subhagruha.com into `public/images/` and update the URLs in `lib/projects.ts`, then remove the `subhagruha.com` entry in `next.config.mjs`.
4. Lead forms currently send the enquiry to WhatsApp. If you also want them stored or emailed, connect an API route or your CRM.
