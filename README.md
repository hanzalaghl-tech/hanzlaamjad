# Hanzla Amjad — Connected

A single-page GoHighLevel, automation and AI portfolio. White and charcoal styling, responsive layouts, real project screenshots and a direct project inquiry form.

## Run and build

Node.js 22+; no npm dependencies.

```
npm run build
npm test
npm run dev
```

Vercel builds with `npm run build` and publishes `dist`. `main` is the production branch. The canonical domain is `https://www.hanzlaamjad.com`. Development and Vercel preview builds are noindex.

## Content

- Four projects in a responsive 2×2 grid with ordered screenshot carousels, keyboard and swipe navigation, and an enlarged viewer.
- 26 selected project screenshots and ten unique A2P approval examples from the supplied evidence. Duplicate images and screenshots exposing complete webhook endpoints were excluded.
- The exact supplied CV at `public/assets/hanzla-amjad-resume.pdf`, linked by native download buttons.
- Five company roles, concise service descriptions and the supplied contact information.
- Inline privacy details on the form, plus a full Privacy Policy at `/privacy/`. Old service URLs permanently redirect to the services section.

## Edit

- `src/home.mjs`: one-page content, company experience and services.
- `src/projects.mjs`: project descriptions and the ordered screenshot sequences.
- `src/layout.mjs`: navigation, contact form, footer, metadata and structured data.
- `public/assets/styles.css`: responsive design and reduced-motion support.
- `public/assets/script.js`: galleries, navigation, privacy dialog, attribution and form behaviour.
- `site.config.mjs`: identity, canonical domain and the existing public Web3Forms integration key.
- `scripts/build.mjs`: static generation, content-hashed CSS/JS, robots and sitemap.

## Contact and measurement

The existing Web3Forms integration is preserved. The form validates name, email, project type, message and required WhatsApp number, suppresses duplicate submissions and clears fields only after provider-confirmed success. Errors retain the message and offer direct email/WhatsApp recovery. A timeout reports uncertain delivery rather than claiming failure or success.

The existing Google Analytics ID is preserved on production. Only non-contact interaction data is queued for custom events. Supported UTM/ad IDs can be held in tab session storage and sent with an inquiry; form field contents are not stored there.

## SEO and checks

The main content and project summaries are server-generated HTML. The build produces one indexable landing page, a real 404, canonical metadata, Open Graph/Twitter cards, Person/WebSite/WebPage/Service/project structured data, a sitemap and robots.txt. Images have dimensions and below-the-fold assets are lazy-loaded; fonts are self-hosted. No rankings, testimonials or business outcomes are invented.

`npm test` covers metadata, links, assets, gallery navigation, CV location, previews and contact handling with mocked provider responses. A real external form submission and inbox receipt are separate from the mocked checks.

### Portfolio assistant and client feedback

The HA widget provides factual answers about the listed services and projects, proactively asks relevant follow-up questions, and collects a name, reply email, project brief and optional WhatsApp number. Visitors can choose Skip WhatsApp or say they do not use WhatsApp; the contact form still requires WhatsApp. Each response waits three seconds with a typing indicator. Reset cancels delayed replies. Pricing cards can start a conversation with the selected service and package prefilled. It is a guided portfolio assistant, not a generative AI service. The visitor reviews their brief and explicitly chooses **Send my brief** before their details and conversation are submitted through the same Web3Forms key as the contact form. Success requires a positive API acknowledgement; failures retain the entered details and timeouts avoid automatic resends. Chat details stay in page memory and are not placed in analytics or browser storage.

`src/reviews.mjs` contains two client feedback excerpts transcribed from the supplied Upwork screenshot. The source is truncated, so unseen endings are not completed. `src/pricing.mjs` defines the four package rates and scopes Hanzla explicitly adopted on 19 October 2026: AI Builds from $1,500, API & Webhooks from $750, Flexible $25/hour and Dedicated $20/hour. Chat pricing answers use these same rates.

`public/assets/chat.js` contains the answer catalogue, intake state machine and email handoff. It is emitted with a content hash during the static build. `tests/chat.test.mjs` covers validation, source-grounded answers, explicit send, failure handling and repeat-send protection.

## Blog, standalone pages and AdSense

- `src/posts.mjs`: blog articles, each written from a portfolio project and illustrated with its real screenshots. Add a new object to publish an article; set `published` once and change `modified` only for real edits.
- `src/pages.mjs`: `/about/`, `/contact/`, `/blog/`, each `/blog/<slug>/`, `/privacy/`, `/terms/` and `/disclaimer/`. They reuse the portfolio header, footer, tokens and type; new rules are at the end of `styles.css`.
- Every page has its own title, description, canonical, Open Graph image, BreadcrumbList and (for articles) BlogPosting structured data. All indexable pages are in the sitemap with their own `lastmod`.
- AdSense: set `adsenseClient` in `site.config.mjs` (or `ADSENSE_CLIENT` in Vercel) to your `ca-pub-…` ID. Production builds then add the `google-adsense-account` tag to every page, load the AdSense script on blog articles only and publish `/ads.txt`. Nothing AdSense-related is emitted while the ID is empty or on previews.
- EEA/UK consent: turn on Google’s certified consent message in AdSense → Privacy & messaging. The Privacy Policy already describes it.

## Search content

The home page is the main landing page; the blog and standalone pages are also indexable. `src/services.mjs` is the shared source for factual service descriptions and the native FAQ section; `src/layout.mjs` uses the same service copy in JSON-LD. Topic redirects open matching service sections. `site.config.mjs` records an explicit substantive content revision date for sitemap lastmod. Search implementation and indexing follow-up are documented in `SEO-AUDIT.md`.
