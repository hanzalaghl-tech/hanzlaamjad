# GitHub, Vercel aur custom domain setup

**Pehle design dekh lein:** ZIP extract karke `preview/index.html` open karein (npm ki zaroorat nahi). `public` folder apni jagah rehne dein. Preview ki pages intentionally noindex hain; search indexing ke liye production domain ke sath Vercel build zaroori hai.

## 1. GitHub par files upload karein

`hanzla-portfolio` folder ke **andar wali files** repository ke root mein upload karein. Root mein `package.json`, `vercel.json`, `site.config.mjs`, `src` aur `public` nazar aane chahiye. `node_modules` aur `dist` upload nahi karne (Vercel khud build karta hai).

## 2. Vercel mein import karein

GitHub repository import karein. Build command `npm run build`, output `dist` aur framework `Other` `vercel.json` se automatically set ho jate hain.

## 3. Domain aur existing deployment

Is project ka primary domain https://hanzlaamjad.com hai. Yeh site.config.mjs mein configured hai. GitHub repository hanzalaghl-tech/hanzlaamjad aur Vercel project hanzlaamjad isi domain se linked hain.

1. Vercel mein isi project par https://hanzlaamjad.com aur www.hanzlaamjad.com ke Domain settings verify karein; secondary domain ko primary par redirect karein.
2. Agar Vercel Production environment mein SITE_URL pehle se set hai, uski value https://hanzlaamjad.com rakhein. Yeh environment variable site.config.mjs ko override karta hai.
3. Main branch par build ke baad live HTML canonical, robots aur sitemap check karein. Kisi aur Vercel project ko yeh domain use karne ke liye pehle domain association migrate karni hoti hai.

## 4. Site.config.mjs mein yeh bharein

- `sameAs`: apne asli profile links (LinkedIn, Upwork, Fiverr, Contra, GitHub). Yeh structured data mein jaate hain aur search engines ko batate hain ke yeh sab ek hi shakhs hai.
- `googleSiteVerification`: agar Search Console mein "URL prefix" method use karein. Domain method mein DNS TXT record kaafi hai.

## 5. Launch check

- Live homepage ka source dekhein: `rel="canonical"` aapke domain ka ho, robots `index, follow` ho.
- `/sitemap.xml` mein 9 URLs, sab aapke domain par.
- `/favicon.ico` khulne par aapki photo dikhe. Google ka favicon update hone mein kuch din se hafte lag sakte hain.
- Search Console: domain verify karein, `https://hanzlaamjad.com/sitemap.xml` submit karein, homepage par "Request indexing" dein.
- WhatsApp/LinkedIn par link paste karke share card check karein.
- Phone par poori site aur ek controlled form submission test karein.

## Pages aur unka maqsad

| Page | Primary topic |
| --- | --- |
| `/` | Hanzla Amjad, GoHighLevel (GHL) expert and automation specialist |
| `/gohighlevel-expert/` | GoHighLevel expert, CRM setup |
| `/automation-expert/` | Marketing automation expert |
| `/funnel-expert/` | Sales funnel expert, GHL funnel builder |
| `/gohighlevel-saas-mode-setup/` | GHL SaaS mode setup, white-label, Stripe |
| `/gohighlevel-snapshots/` | GHL snapshot creation and deployment |
| `/gohighlevel-integrations/` | GHL API, Make.com, n8n, Zapier, webhooks |
| `/gohighlevel-expert-pakistan/` | GoHighLevel expert in Pakistan |

## Ranking ke bare mein

Technical SEO Google ko site samajhne mein madad karta hai, lekin kisi keyword par #1 ki guarantee nahi de sakta. Realistic plan aur keyword analysis `SEO-AUDIT.md` mein hai. Naye pages ka copy sirf aapki resume wali skills par based hai; unhein khud parh kar confirm karein ke har jumla sach hai. Case studies ya reviews sirf tab add karein jab woh asli hon aur client ki ijazat ho.

## Ads chalane se pehle

Ad-platform conversion tracking abhi connected nahi. Local `generate_lead` event form provider ki confirmed success par banta hai. Ads se pehle apne ad account ke tags aur consent setup add karein aur privacy page update karein.
