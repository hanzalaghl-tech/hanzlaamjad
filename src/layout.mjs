import config from '../site.config.mjs';
import { services, specialties, allPages } from './content.mjs';

export const escapeHtml = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export const icon = (name, cls = '') => `<svg class="icon ${cls}" aria-hidden="true"><use href="#i-${name}"/></svg>`;
export const arrow = () => icon('arrow');
export function button(text, href = '/#contact', variant = '', attributes = '') {
  return `<a class="button ${variant}" href="${escapeHtml(href)}" ${attributes}><span>${escapeHtml(text)}</span>${arrow()}</a>`;
}
export function faq(items, title = 'A few things you might be wondering.') {
  return `<section class="faq-section wrap pad" aria-labelledby="faq-title"><div class="section-intro"><p class="eyebrow">A little clarity</p><h2 id="faq-title">${title}</h2></div><div class="faq-list">${items.map(([q,a]) => `<details class="faq-item"><summary><span>${escapeHtml(q)}</span><span class="plus" aria-hidden="true">+</span></summary><p>${escapeHtml(a)}</p></details>`).join('')}</div></section>`;
}

// Natural link text for each page, used in the navigation and footer.
export const navLabel = {
  'gohighlevel-expert': 'GoHighLevel (GHL) expert',
  'automation-expert': 'Marketing automation expert',
  'funnel-expert': 'Sales funnel expert',
  'gohighlevel-saas-mode-setup': 'GHL SaaS mode setup',
  'gohighlevel-snapshots': 'GHL snapshots',
  'gohighlevel-integrations': 'GHL integrations (Make, n8n, API)',
  'gohighlevel-expert-pakistan': 'GoHighLevel expert in Pakistan'
};

const symbols = `<svg class="symbol-bank" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><symbol id="i-arrow" viewBox="0 0 24 24"><path d="M5 19 19 5M5 5h14v14"/></symbol><symbol id="i-right" viewBox="0 0 24 24"><path d="M4 12h16m-6-6 6 6-6 6"/></symbol><symbol id="i-mail" viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="3"/><path d="m4 7 8 6 8-6"/></symbol><symbol id="i-chat" viewBox="0 0 24 24"><path d="M21 11.5a9 9 0 0 1-9 9 9.5 9.5 0 0 1-4-.9L3 21l1.4-5A9 9 0 1 1 21 11.5Z"/><path d="M8 8c0 4 4 7 7 7l1-2-3-1-1 1-2-2 1-1-1-3-2 1Z"/></symbol><symbol id="i-check" viewBox="0 0 24 24"><path d="m5 12 4 4L19 6"/></symbol><symbol id="i-flow" viewBox="0 0 24 24"><rect x="8" y="2" width="8" height="6" rx="2"/><rect x="2" y="16" width="7" height="6" rx="2"/><rect x="15" y="16" width="7" height="6" rx="2"/><path d="M12 8v4M5.5 16v-4h13v4"/></symbol><symbol id="i-bolt" viewBox="0 0 24 24"><path d="m14 2-10 12h7l-1 8 10-12h-7l1-8Z"/></symbol><symbol id="i-window" viewBox="0 0 24 24"><rect x="2" y="3" width="20" height="18" rx="3"/><path d="M2 8h20M6 5.5h.1M9 5.5h.1M6 12h5M6 16h9"/></symbol><symbol id="i-layers" viewBox="0 0 24 24"><path d="m12 2 9 5-9 5-9-5 9-5ZM3 12l9 5 9-5M3 17l9 5 9-5"/></symbol><symbol id="i-plug" viewBox="0 0 24 24"><path d="M9 2v5M15 2v5M6 7h12v4a6 6 0 0 1-12 0V7ZM12 17v5"/></symbol><symbol id="i-globe" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9.5"/><path d="M2.5 12h19M12 2.5c3 3 3 16 0 19M12 2.5c-3 3-3 16 0 19"/></symbol><symbol id="i-cloud" viewBox="0 0 24 24"><path d="M7 18a4.5 4.5 0 0 1-.6-8.96A6 6 0 0 1 18 9.5 4 4 0 0 1 17.5 18H7Z"/></symbol></svg>`;

function header(current) {
  const onServicePage = allPages.some(s => current === `/${s.slug}/`);
  const link = s => `<a href="/${s.slug}/" ${current === `/${s.slug}/` ? 'aria-current="page"' : ''}>${escapeHtml(navLabel[s.slug])}</a>`;
  return `<a class="skip-link" href="#main">Skip to content</a><div class="scroll-progress" aria-hidden="true"></div>${symbols}
  <header class="site-header"><div class="nav-shell"><a class="wordmark" href="/" aria-label="Hanzla Amjad, home">hanzla<span class="brand-star" aria-hidden="true">✳</span></a><nav class="desktop-nav" aria-label="Main navigation"><div class="nav-dropdown"><a href="/#expertise" ${onServicePage ? 'class="active"' : ''}>Services <svg class="icon caret" aria-hidden="true" viewBox="0 0 24 24"><path d="m6 9 6 6 6-6"/></svg></a><div class="dropdown-panel"><p>Core services</p>${services.map(link).join('')}<p>Specialties</p>${specialties.map(link).join('')}</div></div><a href="/#experience">Experience</a><a href="/#process">Process</a><a href="/#about">About</a></nav><div class="nav-actions"><a class="nav-contact" href="/#contact"><span>Start a conversation</span>${arrow()}</a><button class="menu-toggle" type="button" aria-label="Open navigation" aria-expanded="false" aria-controls="mobile-menu"><span></span><span></span></button></div></div><nav class="mobile-menu" id="mobile-menu" aria-label="Mobile navigation" hidden><div class="mobile-menu-main"><a href="/#expertise">Expertise</a><a href="/#experience">Experience</a><a href="/#process">Process</a><a href="/#about">About Hanzla</a></div><div class="mobile-menu-services"><p>Services</p>${allPages.map(link).join('')}</div><a class="mobile-menu-cta" href="/#contact"><span>Start a conversation</span>${arrow()}</a></nav></header>`;
}

function footer() {
  const link = s => `<a href="/${s.slug}/">${escapeHtml(navLabel[s.slug])}</a>`;
  return `<footer class="site-footer"><div class="wrap footer-top"><div class="footer-lead"><a class="footer-invite" href="/#contact">Good things start<br>with a conversation. ${arrow()}</a><p>Hanzla Amjad is a GoHighLevel (GHL), automation and funnel expert based in Mian Channu, Pakistan, working remotely.</p></div><nav class="footer-services" aria-label="Core services"><p class="footer-heading">Services</p>${services.map(link).join('')}</nav><nav class="footer-services" aria-label="Specialties"><p class="footer-heading">Specialties</p>${specialties.map(link).join('')}</nav><div class="footer-contact"><p class="footer-heading">Contact</p><a href="mailto:${config.email}" data-channel="email">${config.email}</a><a href="tel:${config.phone}" data-channel="phone">${config.phoneDisplay}</a><a href="${config.whatsapp}" target="_blank" rel="noopener noreferrer" data-channel="whatsapp">WhatsApp</a><span>Mian Channu, Pakistan</span></div></div><div class="footer-name wrap" aria-hidden="true">hanzla<span>amjad.</span></div><div class="wrap footer-bottom"><p>© <span id="year">${new Date().getFullYear()}</span> Hanzla Amjad</p><a href="/privacy/">Privacy</a><a class="back-top" href="#main">Back to top ↑</a></div></footer><div class="mobile-contact-bar"><a href="${config.whatsapp}" target="_blank" rel="noopener noreferrer" data-channel="whatsapp">${icon('chat')} WhatsApp</a><a href="/#contact">Start a project ${arrow()}</a></div>`;
}

export function contact(context) {
  const key = context.accessKey || config.web3formsKey;
  return `<section class="contact-section pad" id="contact" aria-labelledby="contact-title"><div class="contact-glow" aria-hidden="true"></div><div class="wrap contact-layout"><div class="contact-copy"><p class="eyebrow">The next good thing</p><h2 id="contact-title">What’s your<br><em>next move?</em></h2><p>A new funnel. A better workflow. A system that finally fits. Tell me what you have in mind.</p><div class="contact-person"><img src="/assets/hanzla-avatar.jpg" width="56" height="56" loading="lazy" decoding="async" alt=""><span><strong>You’ll talk directly with me.</strong><span>Hanzla Amjad · English &amp; Urdu</span></span></div><div class="direct-links"><a href="mailto:${config.email}" data-channel="email">${icon('mail')}<span>${config.email}</span>${arrow()}</a><a href="${config.whatsapp}" target="_blank" rel="noopener noreferrer" data-channel="whatsapp">${icon('chat')}<span>Let’s chat on WhatsApp</span>${arrow()}</a></div></div><div class="contact-form-card"><div class="form-heading"><span class="eyebrow">Your idea starts here</span><h3>Tell me a little about it.</h3><p>Share the goal. We’ll figure out the system.</p></div><form id="contactForm" action="https://api.web3forms.com/submit" method="POST"><input type="hidden" name="access_key" value="${escapeHtml(key)}"><input type="hidden" name="from_name" value="Hanzla Portfolio Contact Form"><input type="checkbox" name="botcheck" class="botcheck" tabindex="-1" aria-hidden="true"><div class="form-row"><div class="field"><label for="cf-name">Your name <span>*</span></label><input id="cf-name" name="name" type="text" placeholder="Your name" autocomplete="name" maxlength="100" required></div><div class="field"><label for="cf-email">Email address <span>*</span></label><input id="cf-email" name="email" type="email" placeholder="you@company.com" autocomplete="email" maxlength="254" required></div></div><div class="field"><label for="cf-subject">What do you need help with? <span>*</span></label><select id="cf-subject" name="subject" required><option value="" disabled selected>Select your project</option><option>GHL account setup</option><option>Automation &amp; workflows</option><option>Funnels &amp; websites</option><option>Snapshots &amp; reusable systems</option><option>SaaS mode &amp; Stripe</option><option>Integrations &amp; API</option><option>Email &amp; SMS marketing</option><option>Memberships &amp; courses</option><option>Reporting &amp; analytics</option><option>Not sure yet — let’s talk</option></select></div><div class="field"><label for="cf-whatsapp">WhatsApp number <span class="optional">(optional)</span></label><input id="cf-whatsapp" name="whatsapp" type="tel" placeholder="Include your country code" autocomplete="tel" inputmode="tel" maxlength="25" aria-describedby="phone-error"><span id="phone-error" class="field-error" hidden>Please enter a phone number with 7–15 digits.</span></div><div class="field"><label for="cf-message">A little about your project <span>*</span></label><textarea id="cf-message" name="message" placeholder="The business, the challenge, the idea…" rows="4" minlength="10" maxlength="5000" required></textarea></div><button id="submitBtn" class="button submit-button" type="submit"><span class="submit-label">Let’s make it happen</span>${arrow()}</button><p class="form-note">Your details are used to respond to this inquiry. <a href="/privacy/">Privacy details</a></p><div id="formStatus" class="form-status" role="status" aria-live="polite" tabindex="-1" hidden></div><noscript><p class="form-note">Submitting opens the contact provider’s response page.</p></noscript></form></div></div></section>`;
}

const areaServed = ['United States', 'United Kingdom', 'Pakistan'].map(name => ({ '@type': 'Country', name }));

export function page({path='/', title, description, body, context, service, noindex=false}) {
  const origin = context.origin;
  const canonical = origin && path !== '/404/' ? `${origin}${path}` : '';
  const indexable = context.indexable && !noindex;
  const personId = origin ? `${origin}/#hanzla` : '#hanzla';
  const serviceId = canonical ? canonical + '#service' : '#service';
  const websiteId = origin ? `${origin}/#website` : '#website';
  const person = {
    '@type':'Person','@id':personId,name:config.name,
    ...(config.alternateNames?.length ? {alternateName:config.alternateNames} : {}),
    jobTitle:'GoHighLevel expert, marketing automation and funnel specialist',
    description:'GoHighLevel (GHL) expert based in Pakistan, working remotely on CRM setup, marketing automation, sales funnels, snapshots, SaaS mode and integrations.',
    ...(origin ? {url:`${origin}/`,image:`${origin}/assets/hanzla-photo.jpg`} : {}),
    email:config.email,telephone:config.phone,
    address:{'@type':'PostalAddress',addressLocality:config.location.city,addressRegion:config.location.region,addressCountry:config.location.country},
    knowsLanguage:['English','Urdu'],
    knowsAbout:['GoHighLevel','HighLevel CRM setup','Sales funnels','Marketing automation','GHL snapshots','GHL SaaS mode','Make','n8n','Zapier','Webhooks and API integrations'],
    ...(config.sameAs?.length ? {sameAs:config.sameAs} : {})
  };
  const website = {'@type':'WebSite','@id':websiteId,name:'Hanzla Amjad',...(origin?{url:origin+'/'}:{}),publisher:{'@id':personId},inLanguage:'en'};
  const webPage = {'@type':'WebPage',...(canonical?{'@id':canonical+'#page',url:canonical}:{}),name:title,description,inLanguage:'en',isPartOf:{'@id':websiteId},about:{'@id':personId},
    ...(service?{mainEntity:{'@id':serviceId}}:path==='/'?{mainEntity:{'@id':personId}}:{}),
    ...(service&&canonical?{breadcrumb:{'@id':canonical+'#breadcrumb'}}:{}),
    ...(origin?{primaryImageOfPage:{'@type':'ImageObject',url:origin+'/assets/social-card.jpg',width:1200,height:630}}:{})};
  const graph = [person, website, webPage];
  if (service) graph.push({'@type':'Service','@id':serviceId,name:service.heading.replace(/\.$/,''),serviceType:service.serviceType,description,provider:{'@id':personId},areaServed,...(canonical?{url:canonical}:{})});
  if (service && origin) graph.push({'@type':'BreadcrumbList','@id':canonical+'#breadcrumb',itemListElement:[{'@type':'ListItem',position:1,name:'Home',item:origin+'/'},{'@type':'ListItem',position:2,name:service.short,item:canonical}]});
  const structured = JSON.stringify({'@context':'https://schema.org','@graph':graph}).replace(/</g,'\\u003c');
  const verification = context.verification ? `<meta name="google-site-verification" content="${escapeHtml(context.verification)}">` : '';
  const googleTag = context.indexable ? `<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-67LRRQBBCC"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-67LRRQBBCC');
</script>
` : '';
  const fontPreload = ['bricolage-grotesque-latin-wght','fraunces-latin-400-italic'].map(f => `<link rel="preload" href="/assets/fonts/${f}.woff2" as="font" type="font/woff2" crossorigin>`).join('');
  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8">${googleTag}<meta name="viewport" content="width=device-width, initial-scale=1"><meta name="theme-color" content="#080b15"><meta name="color-scheme" content="dark"><title>${escapeHtml(title)}</title><meta name="description" content="${escapeHtml(description)}"><meta name="author" content="Hanzla Amjad"><meta name="robots" content="${indexable?'index, follow, max-image-preview:large, max-snippet:-1':'noindex, follow'}">${canonical?`<link rel="canonical" href="${escapeHtml(canonical)}">`:''}${verification}<meta property="og:type" content="website"><meta property="og:locale" content="en_US"><meta property="og:site_name" content="Hanzla Amjad"><meta property="og:title" content="${escapeHtml(title)}"><meta property="og:description" content="${escapeHtml(description)}">${canonical?`<meta property="og:url" content="${escapeHtml(canonical)}"><meta property="og:image" content="${escapeHtml(origin)}/assets/social-card.jpg"><meta property="og:image:type" content="image/jpeg"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630"><meta property="og:image:alt" content="Hanzla Amjad — GoHighLevel, automation and funnel expert">`:''}<meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${escapeHtml(title)}"><meta name="twitter:description" content="${escapeHtml(description)}">${origin?`<meta name="twitter:image" content="${escapeHtml(origin)}/assets/social-card.jpg"><meta name="twitter:image:alt" content="Hanzla Amjad — GoHighLevel, automation and funnel expert">`:''}<link rel="icon" href="/favicon.ico" sizes="48x48"><link rel="icon" href="/assets/icons/icon-192.png" type="image/png" sizes="192x192"><link rel="apple-touch-icon" href="/assets/icons/apple-touch-icon.png"><link rel="manifest" href="/site.webmanifest">${fontPreload}<link rel="stylesheet" href="${context.stylesheet}"><script src="${context.script}" defer></script><script type="application/ld+json">${structured}</script></head><body class="${service?'service-page':''}">${header(path)}<main id="main">${body}</main>${footer()}</body></html>`;
}
