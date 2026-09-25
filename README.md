# Hanzla Amjad — Obsidian

A complete portfolio redesign for **GitHub → Vercel → your custom domain**.

An all-dark portfolio with electric lime, violet and cyan accents, a native animated 3D funnel, service pages, work history and a direct project inquiry flow. The funnel is drawn with the Canvas 2D API and projected from a rotating 3D mesh; no external 3D library or model is required. Fonts (Bricolage Grotesque and Fraunces italic, both SIL Open Font License) are served from this project, so the site makes no third-party font requests.

**Roman Urdu:** Pehle `DEPLOY-AND-SEO.md` parhein. Is folder ke andar wali files GitHub repository ke root mein upload karein. `package.json` aur `vercel.json` root par hon.

**SEO aur domain ke liye `SEO-AUDIT.md` aur `DEPLOY-AND-SEO.md` dekhein.**

**Jaldi design dekhna ho:** poora ZIP extract karke `preview/index.html` open karein. Yeh portable review copy hai; `public` folder ko saath rehne dein. Vercel apna production output `dist` se publish karta hai.

## Quick start

Use Node.js 22 or newer. This project has no third-party npm dependencies.

```sh
npm run dev
```

Open the localhost URL printed in your terminal. Restart the command after editing source files. The local server intentionally builds a `noindex` preview.

```sh
npm run build
npm test
```

The production-ready static output is generated in `dist/`. The primary domain is configured as https://hanzlaamjad.com in `site.config.mjs`. On Vercel production, the build uses `SITE_URL` when supplied, then `site.config.mjs`, then `VERCEL_PROJECT_PRODUCTION_URL` to determine the canonical domain. A production Vercel build with no usable origin fails with a setup message rather than publishing invented canonical URLs.

After editing, `npm run preview:export` refreshes the portable `preview/` copy. Its relative links support opening the pages directly from the extracted folder, and it always remains `noindex`. Form delivery still needs an internet connection and must be verified on the published domain.

## Vercel configuration

`vercel.json` already specifies:

| Setting | Value |
| --- | --- |
| Framework preset | Other |
| Build command | `npm run build` |
| Output directory | `dist` |
| Trailing slashes | Enabled consistently |
| Catch-all SPA rewrite | None; missing URLs remain missing |

The repository includes a lockfile, `.gitignore`, environment-variable example and a custom 404 page. Only `dist` is served; editing files, tests and guides remain outside the published directory.

## Domain and environment variables

| Variable | Purpose |
| --- | --- |
| `SITE_URL` | Exact primary HTTPS origin; set after selecting your custom domain. No path, query or custom port. |
| `WEB3FORMS_ACCESS_KEY` | Optional override of the existing public contact-form key. |
| `GOOGLE_SITE_VERIFICATION` | Optional Search Console URL-prefix verification tag value. Domain verification can instead use DNS. |

The optional values can also be edited in `site.config.mjs`. `.env.example` documents the Vercel variables; this project does not automatically load a local `.env` file.

After changing your domain, update `site.config.mjs` (and `SITE_URL` if set) and redeploy. Redirect alternate domains to the selected primary domain through your hosting settings. Canonical URLs, structured-data URLs, social-image URLs and sitemap entries are produced together at build time.

## What is included for SEO

- The homepage plus seven internally linked service pages: `/gohighlevel-expert/`, `/automation-expert/`, `/funnel-expert/`, `/gohighlevel-saas-mode-setup/`, `/gohighlevel-snapshots/`, `/gohighlevel-integrations/` and `/gohighlevel-expert-pakistan/`.
- The homepage H1 carries the main keyword (“GoHighLevel (GHL) expert”) together with the brand line.
- Unique titles, descriptions and a single main heading on each page.
- Content and navigation in the initial HTML, with no client-side rendering requirement.
- Domain-aware canonical links and Open Graph/Twitter metadata.
- Person, WebSite and WebPage structured data; service pages also include Service and BreadcrumbList, with the page's main entity and breadcrumb connected by stable IDs.
- A generated XML sitemap, crawlable robots file and real 404 document.
- Vercel preview/development builds marked `noindex`; production pages indexable when the real origin is available.
- Versioned CSS/JS filenames, local assets, explicit image dimensions, deferred JavaScript and lazy loading for the lower portrait.
- A 1200 × 630 social card, and favicon/app icons made from your portrait (`/favicon.ico`, 192/512 PNG, Apple touch icon and a web manifest).
- `areaServed` (United States, United Kingdom, Pakistan) and an optional `sameAs` list in structured data. Add your real LinkedIn/Upwork/Fiverr/Contra URLs to `sameAs` in `site.config.mjs`.

There are no invented testimonials, ratings, certifications, project screenshots or revenue results. Your supplied profile, five company roles, tools, contact details and 60+/8+/15+ metrics are retained. Workflow graphics are labeled as illustrative.

## Contact and measurement

The original Web3Forms endpoint and access key are preserved. The form validates input, protects against repeated submissions, preserves entries on errors, and only clears them after a successful response. Requests have a confirmation timeout and direct email/WhatsApp recovery options.

UTM fields and supported ad click IDs are retained within the current tab session, including when a visitor enters through a service page. Service-page contact buttons select the corresponding project type. Contact fields are not stored in browser storage.

`lead_form_start`, `generate_lead` and `contact_click` events are queued locally in `window.dataLayer`. Only confirmed provider success emits `generate_lead`; contact clicks are separate. No analytics account, ad pixel or tag manager is installed. If you add them later, update the privacy information and applicable consent behavior.

## Motion and accessibility

Animations run without a pause button. The decorative funnel canvas is capped at 28 fps on desktop and 20 fps on small screens and at a 1.5 pixel ratio; it uses fewer facets on small screens and pauses while the tab is hidden or the funnel is off-screen. For a visitor whose device requests reduced motion, the funnel remains still. A static funnel fallback appears when canvas is unavailable.

The site retains a native cursor, keyboard focus styles, labeled form controls, native expandable sections, a skip link and a mobile navigation disclosure. Content is visible without JavaScript; the form retains a standard POST fallback.

## Where to edit

| File | What it controls |
| --- | --- |
| `site.config.mjs` | Domain, contact identity and provider settings |
| `src/home.mjs` | Homepage layout |
| `src/content.mjs` | Service and specialty page content, FAQs, company roles and process |
| `src/layout.mjs` | Shared navigation, footer, form, metadata and structured data |
| `src/service-page.mjs` | Service-page layout and privacy content |
| `public/assets/styles.css` | Design, responsive styles and CSS motion |
| `public/assets/script.js` | Interaction, canvas animation, form and attribution |
| `scripts/build.mjs` | Static generation, canonical domain, sitemap and indexing mode |

Edit the source, not `dist`; the next build regenerates that directory.

## Verification and remaining checks

`npm test` checks metadata, canonical URLs, structured data, internal links, the sitemap, favicon files, canvas motion logic and the contact-form logic (form requests are mocked). `npm run build` and `npm run preview:export` regenerate the static pages. Open the portable preview at phone, tablet and desktop sizes and inspect it on real devices before publishing; an interactive browser preview was unavailable in this build environment.

Not verified here: how the updated design looks in a real browser or on real phones, live inbox delivery, and the deployed domain. Before launch, open the site on your own devices and submit a controlled inquiry from your published domain. Verify the live domain and contact form after deployment.

Source references: [Vercel project configuration](https://vercel.com/docs/project-configuration/vercel-json), [Vercel production-domain variable](https://vercel.com/docs/environment-variables/system-environment-variables).
