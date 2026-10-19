# Deployment and search setup

The existing GitHub repository is `hanzalaghl-tech/hanzlaamjad`, linked to the Vercel project `hanzlaamjad`. `main` deploys to production. The primary domain is https://www.hanzlaamjad.com; the apex redirects to www.

## Build

Run `npm test` and `npm run build`. Vercel uses the build command and `dist` output configured in `vercel.json`. There are no package dependencies. Publish source changes through the existing repository; do not commit build output or environment secrets.

## Canonical and indexing

`site.config.mjs` holds the canonical production origin, real profile links and the content modification date. `SITE_URL` can override the origin. Vercel preview builds carry noindex. The 404 document is noindex and unrecognized URLs remain genuine missing-page responses.

This is a single-page portfolio: the sitemap contains **one** canonical homepage URL. Existing service URLs redirect permanently to the matching homepage service section. The privacy URL redirects to the inline privacy details. The HA logo is used for the favicon and touch icons.

After a substantive public content update, change `contentUpdatedAt` to the actual content revision date. Do not update it merely for a deployment or claim that it forces Google to crawl.

## Search Console

- Verify the domain using the owner's Search Console account. Preserve existing DNS verification; the optional `GOOGLE_SITE_VERIFICATION` value is only needed for an appropriate HTML-tag verification method.
- Submit or verify https://www.hanzlaamjad.com/sitemap.xml.
- Inspect https://www.hanzlaamjad.com/, test the live URL and request indexing after meaningful changes.
- Monitor indexing, selected canonical, search queries, impressions and clicks. Google controls recrawl timing and ranking; repeated requests do not accelerate crawling.

## Contact checks

The contact form requires WhatsApp. The widget asks only for WhatsApp and lets visitors skip it; name, email and project details remain required. Its three-second reply delay and explicit Send my brief confirmation are preserved. Provider-confirmed submission success is separate from inbox receipt.

Google Analytics uses the existing configuration. Contact field contents and chat transcripts must not be added to analytics or browser storage. Read `SEO-AUDIT.md` for the current search content strategy and validation limits.
