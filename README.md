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
- Inline privacy details. Old service URLs permanently redirect to the services section; the former privacy URL redirects to the privacy dialog.

## Edit

- `src/home.mjs`: one-page content, company experience and services.
- `src/projects.mjs`: project descriptions and the ordered screenshot sequences.
- `src/layout.mjs`: navigation, contact form, footer, metadata and structured data.
- `public/assets/styles.css`: responsive design and reduced-motion support.
- `public/assets/script.js`: galleries, navigation, privacy dialog, attribution and form behaviour.
- `site.config.mjs`: identity, canonical domain and the existing public Web3Forms integration key.
- `scripts/build.mjs`: static generation, content-hashed CSS/JS, robots and sitemap.

## Contact and measurement

The existing Web3Forms integration is preserved. The form validates name, email, project type, message and optional phone, suppresses duplicate submissions and clears fields only after provider-confirmed success. Errors retain the message and offer direct email/WhatsApp recovery. A timeout reports uncertain delivery rather than claiming failure or success.

The existing Google Analytics ID is preserved on production. Only non-contact interaction data is queued for custom events. Supported UTM/ad IDs can be held in tab session storage and sent with an inquiry; form field contents are not stored there.

## SEO and checks

The main content and project summaries are server-generated HTML. The build produces one indexable landing page, a real 404, canonical metadata, Open Graph/Twitter cards, Person/WebSite/WebPage/Service/project structured data, a sitemap and robots.txt. Images have dimensions and below-the-fold assets are lazy-loaded; fonts are self-hosted. No rankings, testimonials or business outcomes are invented.

`npm test` covers metadata, links, assets, gallery navigation, CV location, previews and contact handling with mocked provider responses. A real external form submission and inbox receipt are separate from the mocked checks.
