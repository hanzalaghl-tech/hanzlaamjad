# SEO audit and plan — Hanzla Amjad portfolio

Prepared 21 September 2026. **Roman Urdu summary:** Site ka technical SEO ab mazboot hai (canonical, sitemap, structured data, favicon, fast fonts, 8 keyword-focused pages). Lekin badi searches jaise "GoHighLevel expert" par top aana naye domain ke liye realistic nahi, kyunke wahan Upwork, Fiverr aur purani agencies chhayi hui hain. Sab se pehle jeetne wali searches: apna naam, "GoHighLevel expert Pakistan", aur SaaS mode / snapshots / integrations jaisi specific phrases. Iske liye Search Console, profile backlinks aur asli case studies sab se zyada kaam ki cheezein hain.

## 24 September design and technical SEO update

- Homepage and seven service pages retain the same visible copy, form options, contact details, project metrics and internal page URLs. The new 3D funnel is decorative; headings and service details remain readable in the initial HTML without JavaScript.
- The site now uses a consistent dark design, self-hosted fonts, a light Canvas 2D animation and a still state for reduced motion. Service structured data is connected to the corresponding WebPage and breadcrumb by stable IDs. Canonical links, unique titles and descriptions, XML sitemap, robots directives and 404 handling remain intact.
- The primary HTTPS domain is configured as https://hanzlaamjad.com in site.config.mjs. After production deployment, verify its canonical URLs and submit the sitemap in Search Console. Development and portable preview pages stay noindex.
- Technical changes alone cannot secure a top search position. Google says no one can guarantee #1. Existing service copy was left untouched by request; after launch, verified case studies, useful guides based on real work and links from your genuine profiles are the next steps if you want to compete for broader GoHighLevel searches.
- Tests checked the rendered static HTML, schema links, internal links, sitemap and form logic. A real browser/device visual review of this revision and deployed Search Console results remain pending.

Google references: [SEO Starter Guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide), [JavaScript SEO basics](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics), [structured data guidelines](https://developers.google.com/search/docs/appearance/structured-data/sd-policies), and [ranking guarantees](https://developers.google.com/search/docs/fundamentals/do-i-need-seo).

## What this audit is based on

- The full site source, built and tested in a browser.
- Search result pages I looked at on 21 September 2026 for: "GoHighLevel expert hire freelancer", "GoHighLevel expert Pakistan", "GoHighLevel SaaS mode setup service white label Stripe" and "Hanzla Amjad GoHighLevel".
- **Not available to me:** keyword search volumes, keyword-difficulty scores, backlink data, Search Console data, and your deployed Search Console data. The competition labels below are my reading of who ranks, not tool measurements. Confirm them in Search Console once the site has data.

## What the search results showed

| Search | Who ranks | What it means for you |
| --- | --- | --- |
| GoHighLevel expert (hire, freelancer) | Freelance marketplaces (Upwork, Freelancer, Arc.dev-style directories) and established GHL agencies | Very hard for a new personal domain. Do not expect page one soon. |
| GoHighLevel expert Pakistan | Mostly Pakistani Fiverr profiles, Contra listings and job posts | Winnable: an independent site with a dedicated, detailed page can compete with marketplace profiles. |
| GoHighLevel SaaS mode setup / white-label / Stripe | Fiverr gigs and agency how-to articles | Winnable for a focused page plus a few useful guides. |
| Hanzla Amjad GoHighLevel | Other people with similar names (for example Hanzla/Hunzala with different surnames) and general profiles | Your full name plus "GoHighLevel" is not owned by anyone strong. Realistic #1 target, but only if your name is spelled the same everywhere. |

## Keyword targets

Competition is my qualitative estimate (High / Medium / Lower), not tool data.

| Keyword | Intent | Competition | Page that targets it | Realistic goal |
| --- | --- | --- | --- | --- |
| Hanzla Amjad, Hanzla Amjad GoHighLevel | Navigational (people checking you out) | Lower | Home | Position 1 within weeks of indexing |
| GoHighLevel expert Pakistan; GHL expert Pakistan | Commercial | Lower to Medium | `/gohighlevel-expert-pakistan/` | Top 10 in 2–6 months with backlinks |
| GoHighLevel SaaS mode setup; GHL white label setup | Commercial | Medium | `/gohighlevel-saas-mode-setup/` | Top 10–20 in 3–6 months |
| GoHighLevel snapshot creation; GHL snapshot service | Commercial | Medium | `/gohighlevel-snapshots/` | Top 10–20 in 3–6 months |
| GoHighLevel Make.com integration; GHL API developer | Commercial | Medium | `/gohighlevel-integrations/` | Top 10–20 in 3–6 months |
| GoHighLevel automation specialist; GHL workflow expert | Commercial | Medium to High | `/automation-expert/` | Page 2 first, then climb |
| GHL funnel builder; GoHighLevel funnel expert | Commercial | Medium to High | `/funnel-expert/` | Page 2 first, then climb |
| GoHighLevel expert; GHL expert; hire GoHighLevel freelancer | Commercial | High | Home and `/gohighlevel-expert/` | Long-term. Do not measure success by this yet. |
| How-to searches (GHL Mailgun setup, snapshot contents, SaaS mode checklist) | Informational | Lower to Medium | Not built yet (see plan) | Biggest untapped area |

## On-page audit: what was wrong and what changed

| Area | Before | Now |
| --- | --- | --- |
| Home H1 | "Less manual. More momentum." with no keyword | H1 reads "GoHighLevel (GHL) expert. Less manual. More momentum." The brand line is kept. |
| Home title | GoHighLevel & Automation Expert (46 chars) | GoHighLevel Expert & Automation Specialist \| Hanzla Amjad (57 chars) |
| Service pages | 3 | 7 (added SaaS mode, snapshots, integrations, Pakistan). Each has its own title, description, H1, FAQ and 540–600 words of content. |
| Internal links | Footer and cards only | Header "Services" menu on every page, footer lists, a specialties block on the home page and related-service links on each page. |
| Structured data | Person, WebSite, WebPage, Service, Breadcrumb | Same, plus `areaServed` (US, UK, Pakistan), alternate name "Hanzala Amjad", `knowsAbout`, and an optional `sameAs` list for your profiles. |
| Favicon | Letter "h" as SVG | Your portrait: `/favicon.ico`, 192/512 PNG, Apple touch icon and manifest. |
| Share image | Generic card | New 1200×630 card with your photo and headline. |
| Fonts | System fonts | Self-hosted, preloaded. Layout shift measured at 0 on the home page. |
| Mobile | Page scrolled sideways by about 30 px; text as small as 7–9 px | No sideways scroll on any page at 320–1920 px; body text 16–17 px, and nearly all other text 13 px or larger. |
| Redirects | One rule per page | One generic `/…/index.html → /…/` rule that covers every page. |

Left as it was on purpose: unique titles and descriptions, canonical URLs, one H1 per page, XML sitemap, robots.txt, noindex on Vercel previews, custom 404. Sitemap has no `lastmod` dates because I cannot give accurate ones; Google ignores wrong dates.

Skipped on purpose: FAQ structured data. Google only shows FAQ rich results for government and health sites now, so it adds markup without a benefit.

## Content gaps (what competitors have and this site lacks)

1. **Proof.** No case studies, no testimonials, no screenshots of your work on the site. This is the largest gap for both ranking and conversion. Your work samples (IUL automation system screenshots, Ghost → GHL digest, the funnel preview links) would fit here, with client permission.
2. **How-to content.** Searchers with a problem ("how to verify a domain in GHL", "what a snapshot does not include") land on agency blogs. Each honest guide is a chance to rank for a long-tail query and to show real experience.
3. **Off-site presence.** Marketplace profiles rank because they are big. Yours need to point to the site and the site to them.

## Prioritised action plan

### Quick wins (this week)

1. Verify https://hanzlaamjad.com is the primary Vercel domain and its generated canonical links and sitemap use the same origin (steps in `DEPLOY-AND-SEO.md`).
2. Verify the domain in Google Search Console, submit `/sitemap.xml`, and request indexing for the home page and the four new pages.
3. Choose one spelling of your name (the site and resume say "Hanzla Amjad"; you also write "Hanzala") and use it on LinkedIn, Upwork, Fiverr, Contra and the site. Put the real profile URLs in `sameAs` in `site.config.mjs`.
4. Put your website URL in every profile you own. These are your first backlinks.
5. Read the four new pages and fix any sentence that is not exactly true for you.

### Strategic (next 1–3 months)

1. **Three case studies** from real work: problem, what you built, what changed. Only verified outcomes and only with the client's permission. Send me the facts and I will write them.
2. **Six to eight guides** from your real experience, one per topic you handled: domain verification, Mailgun and Twilio setup, what a snapshot includes, SaaS mode checklist, Make vs n8n vs Zapier with GHL, booking funnels. I can write the briefs, and you check the facts.
3. **Backlinks:** answer questions in GHL communities with a helpful answer (not a link drop), ask past teams for a mention, and list yourself in relevant directories.
4. **Review Search Console monthly.** Look at which queries show impressions, then improve the matching page.

### Not recommended

- Keyword stuffing, city or country pages for places you do not serve, fake reviews or invented numbers.
- Buying links.
- Google Business Profile, unless you meet Google's rules for a business that serves customers at a physical or service-area location.

## What to expect

- Indexing: days to a few weeks after you submit the sitemap.
- Your own name: usually within weeks of indexing.
- Specific long-tail phrases: months, and only with backlinks and useful content.
- The broad "GoHighLevel expert" terms: a long-term goal that needs proof and links. No page setup can promise it.

## What I need from you

1. Access to your Search Console performance data after launch.
2. Your real profile URLs (LinkedIn, Upwork, Fiverr, Contra, GitHub) for `sameAs`.
3. Which name spelling is your brand.
4. Case-study details, if you want me to write them.
