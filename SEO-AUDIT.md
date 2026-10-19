# Portfolio SEO — single-page implementation

Content reviewed: 19 October 2026. The portfolio intentionally has one indexable landing page. Separate service URLs from the earlier site permanently redirect to relevant sections. Sections and fragments are not separate indexable pages.

## Search intent

The homepage identifies Hanzla Amjad as a GoHighLevel (GHL) expert and automation specialist. Supporting topics are GHL CRM setup, workflows, Make.com/Zapier/n8n integrations, sales funnels, landing pages, AI appointment booking, snapshots, SaaS configuration and A2P support. The page uses these terms naturally where the service or project actually addresses them.

Names are consistent across the visible introduction, biography, title, footer and Person/WebSite/ProfilePage structured data. The existing alternate spelling Hanzala Amjad and supplied social profile URLs help describe the same person. Neither common surnames nor every GHL query can be guaranteed to rank first.

## Changes

- Descriptive homepage title, meta description, H1 and service headings.
- Five service descriptions shared between visible HTML and Service structured data.
- Native, accessible FAQ disclosures with practical answers and links to relevant project evidence and pricing. Answers are in the initial HTML and do not depend on JavaScript. No FAQ rich-result eligibility is claimed.
- Public project names appear alongside actual workflow evidence; no invented outcomes, awards or review totals.
- Person, WebSite, ProfilePage, CreativeWork and service catalog entities consistently reference the canonical domain and actual services.
- Stable service fragment targets. Legacy service URLs redirect permanently to the appropriate section, which opens automatically for a visitor arriving at its anchor.
- One canonical sitemap URL, with an explicit content modification date. Update `contentUpdatedAt` only after substantive content changes. Do not replace it with the clock on each build.
- Production index/follow, noindex for previews and 404s, self-hosted fonts, content-hashed assets, lazy offscreen screenshots and a high-priority hero portrait are preserved.

## Validation

Run `npm test` and `npm run build`. SEO checks cover canonical URLs, one H1, unique IDs, working local anchors, genuine missing-page behavior, preview noindex, parseable JSON-LD, service/schema consistency, server-rendered FAQ content, relevant permanent redirects and the sitemap.

Live verification must distinguish HTTP crawlability, structured-data syntax and browser behavior from Google indexing or ranking. A successful deployment does not establish that Google has recrawled it. No Lighthouse or Core Web Vitals score is claimed without a real measurement.

## Search Console follow-up

1. Inspect `https://www.hanzlaamjad.com/` in URL Inspection. Review the selected canonical and test the live URL; request indexing after this content update.
2. Submit or verify `https://www.hanzlaamjad.com/sitemap.xml`. Old redirected service pages should eventually consolidate into the homepage; redirected pages do not belong in this sitemap.
3. Compare complete, equal periods after recrawling, preferably 28 days. Separate name searches from service searches and compare country/device segments. Sparse impressions and anonymized queries limit conclusions.
4. Keep the portfolio link and professional name consistent on the owner's actual LinkedIn, Upwork and other relevant profiles. Genuine referrals and useful project write-ups can support discovery. No bought links or unsolicited outreach are part of this change.

A one-page portfolio can explain multiple services, but it has limited room to satisfy many distinct search intents. If broader organic acquisition later becomes the goal, agree on genuinely useful service guides or detailed case studies before expanding the site's architecture.

## Official guidance

- https://developers.google.com/search/docs/fundamentals/seo-starter-guide
- https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl
- https://developers.google.com/search/docs/appearance/title-link
- https://developers.google.com/search/docs/appearance/site-names
- https://developers.google.com/search/docs/appearance/structured-data/profile-page
