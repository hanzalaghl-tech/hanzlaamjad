import config from '../site.config.mjs';
import {posts} from './posts.mjs';
import {escapeHtml as esc,icon,button,contact,isoDateTime} from './layout.mjs';

// Standalone pages share the portfolio's type, colours and spacing. Legal copy is dated so changes are visible.
const policyDate='30 October 2026';
const longDate=iso=>new Date(iso+'T00:00:00Z').toLocaleDateString('en-GB',{day:'numeric',month:'long',year:'numeric',timeZone:'UTC'});
const words=html=>html.replace(/<[^>]+>/g,' ').split(/\s+/).filter(Boolean).length;
export const readingTime=html=>Math.max(1,Math.round(words(html)/220));

const crumbs=(context,items)=>({'@type':'BreadcrumbList','@id':(context.origin||'')+items.at(-1)[1]+'#breadcrumb',itemListElement:items.map(([name,path],i)=>({'@type':'ListItem',position:i+1,name,item:(context.origin||'')+path}))});
const crumbNav=items=>`<nav class="breadcrumbs" aria-label="Breadcrumb">${items.map(([name,path],i)=>i===items.length-1?`<span aria-current="page">${esc(name)}</span>`:`<a href="${path}">${esc(name)}</a><span aria-hidden="true">/</span>`).join('')}</nav>`;
const hero=({items,eyebrow,title,accent,intro})=>`<section class="page-hero wrap">${crumbNav(items)}<p class="eyebrow">${esc(eyebrow)}</p><h1>${esc(title)}${accent?`<br><span>${esc(accent)}</span>`:''}</h1>${intro?`<p class="page-intro">${intro}</p>`:''}</section>`;
const legal=(sections)=>`<div class="legal-copy wrap"><div class="prose">${sections}</div></div>`;

function postCard(p){
 return `<article class="post-card reveal"><a href="/blog/${p.slug}/" class="post-card-link">${p.cover?`<span class="post-card-image"><img src="${p.cover.src}" width="${p.cover.width}" height="${p.cover.height}" alt="" loading="lazy" decoding="async"></span>`:`<span class="post-card-image post-card-blank" aria-hidden="true">${esc(p.category)}</span>`}<span class="post-card-meta">${esc(p.category)} · ${readingTime(p.body)} min read</span><h2>${esc(p.title)}</h2><p>${esc(p.description)}</p><span class="text-link">Read the guide ${icon('arrow')}</span></a></article>`;
}

function authorBox(){
 return `<aside class="author-box" aria-label="About the author"><img src="/assets/hanzla-avatar.jpg" width="72" height="72" alt="Hanzla Amjad" loading="lazy"><div><p class="eyebrow">Written by</p><h2>Hanzla Amjad</h2><p>GoHighLevel and automation specialist based in Mian Channu, Pakistan. I write about the builds I actually work on: GHL accounts, Make.com scenarios, AI booking and A2P registration.</p><div class="author-links"><a class="text-link" href="/about/">More about me ${icon('arrow')}</a><a class="text-link" href="/#work">See the projects ${icon('arrow')}</a></div></div></aside>`;
}

function articlePage(p,context){
 const url=(context.origin||'')+'/blog/'+p.slug+'/';
 const items=[['Home','/'],['Blog','/blog/'],[p.title,'/blog/'+p.slug+'/']];
 const related=(p.related||[]).map(slug=>posts.find(o=>o.slug===slug)).filter(Boolean).slice(0,3);
 const minutes=readingTime(p.body);
 const body=`<article class="article"><header class="article-header wrap">${crumbNav(items)}<p class="eyebrow">${esc(p.category)}</p><h1>${esc(p.title)}</h1><p class="article-lede">${esc(p.description)}</p><div class="article-byline"><img src="/assets/hanzla-avatar.jpg" width="40" height="40" alt="" loading="lazy"><p><a href="/about/">Hanzla Amjad</a><br><span class="article-dates"><time datetime="${p.published}">${longDate(p.published)}</time>${p.modified&&p.modified!==p.published?` · Updated <time datetime="${p.modified}">${longDate(p.modified)}</time>`:''} · ${minutes} min read</span></p></div></header>${p.cover?`<figure class="article-cover wrap"><img src="${p.cover.src}" width="${p.cover.width}" height="${p.cover.height}" alt="${esc(p.cover.alt)}" fetchpriority="high" decoding="async"><figcaption>${esc(p.cover.caption||p.cover.alt)}</figcaption></figure>`:''}<div class="wrap"><div class="prose">${p.body}</div><div class="article-end">${authorBox()}<aside class="article-cta"><p class="eyebrow">Working on something similar?</p><h2>Send me the details.<br><span>I’ll tell you how I’d approach it.</span></h2>${button('Start a conversation','/contact/')}</aside></div></div></article>${related.length?`<section class="related-posts wrap" aria-labelledby="related-title"><h2 id="related-title">Keep reading</h2><div class="post-grid">${related.map(postCard).join('')}</div></section>`:''}`;
 return {
  path:'/blog/'+p.slug+'/',file:'blog/'+p.slug+'/index.html',
  title:p.seoTitle||`${p.title} | Hanzla Amjad`,description:p.description,body,ogType:'article',ads:true,
  published:p.published,modified:p.modified||p.published,
  ...(p.cover?{image:p.cover.src,imageWidth:p.cover.width,imageHeight:p.cover.height,imageAlt:p.cover.alt}:{}),
  schema:[{'@type':'BlogPosting','@id':url+'#article',headline:p.title,description:p.description,url,mainEntityOfPage:{'@id':url+'#webpage'},datePublished:isoDateTime(p.published),dateModified:isoDateTime(p.modified||p.published),author:{'@id':(context.origin||'')+'/#hanzla'},publisher:{'@id':(context.origin||'')+'/#hanzla'},image:p.cover?(context.origin||'')+p.cover.src:(context.origin||'')+'/assets/social-card.png',articleSection:p.category,keywords:p.keywords.join(', '),wordCount:words(p.body),inLanguage:'en'},crumbs(context,items)]
 };
}

function blogIndex(context){
 const items=[['Home','/'],['Blog','/blog/']];
 const sorted=[...posts].sort((a,b)=>b.published.localeCompare(a.published)||0);
 return {
  path:'/blog/',file:'blog/index.html',
  title:'GoHighLevel & Automation Blog | Hanzla Amjad',
  description:'Practical GoHighLevel, Make.com, Retell AI and A2P guides from Hanzla Amjad, written from real client builds with the actual screenshots.',
  body:`${hero({items,eyebrow:'Notes from the build',title:'GoHighLevel, explained',accent:'from real projects.',intro:'Step-by-step write-ups of the workflows, integrations and registrations I build for agencies and businesses. Real screenshots, the decisions behind them and the mistakes worth avoiding.'})}<section class="blog-list wrap section-pad"><div class="post-grid">${sorted.map(postCard).join('')}</div></section>`,
  schema:[{'@type':'Blog','@id':(context.origin||'')+'/blog/#blog',name:'Hanzla Amjad — GoHighLevel & Automation Blog',url:(context.origin||'')+'/blog/',author:{'@id':(context.origin||'')+'/#hanzla'},blogPost:sorted.map(p=>({'@id':(context.origin||'')+'/blog/'+p.slug+'/#article'}))},crumbs(context,items)],
  modified:sorted[0]?.modified||sorted[0]?.published
 };
}

function aboutPage(context){
 const items=[['Home','/'],['About','/about/']];
 return {path:'/about/',file:'about/index.html',title:'About Hanzla Amjad | GoHighLevel & Automation Specialist',description:'Hanzla Amjad is a GoHighLevel and automation specialist from Mian Channu, Pakistan. His background, the teams he has worked with and how he runs a project.',
 schema:[{'@type':'AboutPage','@id':(context.origin||'')+'/about/#about',url:(context.origin||'')+'/about/',mainEntity:{'@id':(context.origin||'')+'/#hanzla'}},crumbs(context,items)],
 body:`${hero({items,eyebrow:'About',title:'Hi, I’m Hanzla.',accent:'I build GoHighLevel systems.',intro:'I’m a GoHighLevel and marketing automation specialist based in Mian Channu, Punjab, Pakistan. I work remotely with agencies and businesses, in English and Urdu.'})}
<section class="about-page wrap section-pad"><div class="about-page-grid"><figure class="about-page-photo"><img src="/assets/hanzla-photo.jpg" width="672" height="830" alt="Hanzla Amjad" loading="lazy"><figcaption>Hanzla Amjad · Mian Channu, Pakistan</figcaption></figure><div class="prose">
<h2>What I actually do</h2>
<p>Most of my work sits between tools. A lead fills in a form, and then something has to happen: a contact gets created in the right GoHighLevel sub-account, a pipeline stage changes, a text goes out, a calendar gets booked, somebody on the team gets told. When those steps are connected properly, nobody has to think about them. When they aren’t, leads slip through and people end up copying data between tabs.</p>
<p>So I set up GHL accounts, build workflows, connect GoHighLevel to Make.com, Zapier, n8n and APIs, and put AI agents like Conversation AI and Retell AI in front of calendars. I also do a lot of A2P 10DLC registration work in the GHL Trust Center, which is less glamorous but decides whether your SMS gets delivered at all.</p>
<h2>Where I’ve worked</h2>
<p>I’ve worked with five teams on GoHighLevel and automation, each with a slightly different focus:</p>
<ul>
<li><strong>Wingman</strong> — tech support: account setup, snapshot creation and deployment, domain verification, Mailgun and Twilio.</li>
<li><strong>Auto Nurture</strong> — GHL expert: websites, funnels, survey integration and system integration.</li>
<li><strong>Top Lion Marketing</strong> — GHL tech support: client onboarding, snapshots, domains, Typeform and Google Sheets connections.</li>
<li><strong>Auto Nurture Speedy.ai</strong> — GHL SaaS developer: SaaS setup, integration development and backend workflows.</li>
<li><strong>Remote Clean Academy</strong> — onboarding specialist: Zapier, Booking Kola, QuickBooks, chat widgets and funnels.</li>
</ul>
<p>Alongside client work I’m studying for a BS in Data Science at Emerson University. The two fit together well: a lot of automation is really about getting clean data from one place to another without losing anything on the way.</p>
<h2>How I run a project</h2>
<p>I don’t start building on day one. First I want to see the account, the tools and the real problem, because the request (“we need a workflow”) is often not the thing that’s broken. Then I map the logic, agree the scope with you in writing, build, and test it with realistic records before anything goes live. You get written updates as I go and a handover that explains how the system works.</p>
<p>You talk to me directly. There’s no account manager in between, and I’m on Pakistan time (UTC+5), so we agree overlap hours at the start.</p>
<h2>Why this blog exists</h2>
<p>Some questions come up on almost every project: why did A2P get rejected, what does a snapshot carry over, should this be in Make or inside a GHL workflow. The <a href="/blog/">blog</a> is where I write up the answers, using screenshots from the real projects.</p>
<div class="about-page-actions">${button('Talk about your project','/contact/')}<a class="cv-link" href="/assets/hanzla-amjad-resume.pdf" download="Hanzla-Amjad-CV.pdf" data-channel="cv">Download CV ${icon('down')}</a></div>
</div></div></section>`};
}

function contactPage(context){
 const items=[['Home','/'],['Contact','/contact/']];
 return {path:'/contact/',file:'contact/index.html',title:'Contact Hanzla Amjad | GoHighLevel Projects & Support',description:'Contact Hanzla Amjad about a GoHighLevel, automation or AI booking project. Email, Business WhatsApp, phone or the project inquiry form.',
 schema:[{'@type':'ContactPage','@id':(context.origin||'')+'/contact/#contact-page',url:(context.origin||'')+'/contact/',about:{'@id':(context.origin||'')+'/#hanzla'}},crumbs(context,items)],
 body:`${hero({items,eyebrow:'Contact',title:'Let’s talk about',accent:'your GHL project.',intro:`Email <a href="mailto:${config.email}">${config.email}</a>, message me on Business WhatsApp, or use the form below. I usually reply within one working day, Pakistan time (UTC+5).`})}${contact(context,'GET IN TOUCH','<a href="/privacy/">Privacy Policy</a>')}`};
}

function privacyPage(context){
 const items=[['Home','/'],['Privacy Policy','/privacy/']];
 return {path:'/privacy/',file:'privacy/index.html',title:'Privacy Policy | Hanzla Amjad',description:'How hanzlaamjad.com collects, uses and protects your information, including the contact form, analytics, cookies and Google AdSense advertising.',modified:'2026-10-30',schema:[crumbs(context,items)],
 body:`${hero({items,eyebrow:`Last updated ${policyDate}`,title:'Privacy Policy'})}${legal(`
<p>This policy explains what information is collected when you visit <strong>hanzlaamjad.com</strong> (“the site”), how it is used and the choices you have. The site is run by Hanzla Amjad, an independent GoHighLevel and automation specialist based in Mian Channu, Punjab, Pakistan. If you have a question about this policy, email <a href="mailto:${config.email}">${config.email}</a>.</p>
<h2>Information you give me</h2>
<p>When you use the contact form, you share your name, email address, the service you’re interested in, your WhatsApp number and a message. The chat assistant on the home page asks for your name, email, a project brief and, optionally, a WhatsApp number, and only sends them when you press <em>Send my brief</em>. I use these details to reply to your enquiry and, if we work together, to manage the project. I don’t sell them and I don’t add you to a mailing list.</p>
<p>Form and chat submissions are delivered to my inbox through <a href="https://web3forms.com/privacy" target="_blank" rel="noopener noreferrer">Web3Forms</a>. If you contact me by email, WhatsApp or phone instead, the privacy terms of that service also apply.</p>
<h2>Information collected automatically</h2>
<p>Like most websites, the site and its providers receive technical information when you visit: your IP address, browser and device type, the pages you view, the referring page and the time of your visit. This is used to keep the site running, understand which pages are useful and prevent abuse.</p>
<ul>
<li><strong>Hosting.</strong> The site is hosted on Vercel, which processes request logs to deliver pages securely.</li>
<li><strong>Analytics.</strong> I use Google Analytics to measure visits and page views. Google Analytics uses cookies and similar technologies. You can read <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Google’s privacy policy</a> or install the <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer">Google Analytics opt-out add-on</a>.</li>
<li><strong>Campaign tags.</strong> If you arrive through a link with UTM or ad-click parameters, those parameters can be kept in your browser’s session storage for that tab and included with an enquiry. Your name, email, phone number and message are never stored in browser storage.</li>
</ul>
<h2>Advertising and cookies</h2>
<p>Blog articles on this site may show advertising served by Google AdSense. Google and its partners use cookies to serve ads based on your previous visits to this site and other websites.</p>
<ul>
<li>Third-party vendors, including Google, use cookies to serve ads based on a user’s prior visits to this website or other websites.</li>
<li>Google’s use of advertising cookies enables it and its partners to serve ads to you based on your visit to this site and/or other sites on the internet.</li>
<li>You can opt out of personalised advertising by visiting Google’s <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer">Ads Settings</a>. You can also opt out of some third-party vendors’ use of cookies for personalised advertising at <a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer">aboutads.info</a>.</li>
</ul>
<p>Read more about <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer">how Google uses information from sites that use its services</a> and <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer">how Google uses cookies in advertising</a>.</p>
<p>If you visit from the European Economic Area, the United Kingdom or Switzerland, you’ll be asked for consent before personalised ads or non-essential advertising cookies are used. That consent message is provided through Google’s certified consent management tools, and you can change your choice at any time from the privacy link it adds to the page.</p>
<p>You can also block or delete cookies in your browser settings. The site still works without them; you may just see less relevant ads.</p>
<h2>How long information is kept</h2>
<p>Enquiry emails are kept for as long as they’re useful for the conversation or project, and for record-keeping after a project ends. If we don’t end up working together, you can ask me to delete your enquiry at any time. Analytics data is kept according to Google Analytics retention settings.</p>
<h2>Your choices and rights</h2>
<p>You can ask to see, correct or delete the personal information you’ve sent me. Depending on where you live, for example in the UK, EU or California, you may have further rights, including the right to object to processing or to complain to your local data protection authority. Email <a href="mailto:${config.email}">${config.email}</a> and I’ll respond within 30 days.</p>
<h2>Children</h2>
<p>This site is aimed at businesses and isn’t directed at children under 13. I don’t knowingly collect information from children.</p>
<h2>Links to other sites</h2>
<p>Articles link to tools and documentation such as GoHighLevel, Make.com and Google. I’m not responsible for the content or privacy practices of those sites.</p>
<h2>Changes to this policy</h2>
<p>If this policy changes, the new version will be posted here with a new “last updated” date.</p>
<h2>Contact</h2>
<p>Hanzla Amjad · Mian Channu, Punjab, Pakistan · <a href="mailto:${config.email}">${config.email}</a> · <a href="tel:${config.phone}">${config.phoneDisplay}</a></p>`)}`};
}

function termsPage(context){
 const items=[['Home','/'],['Terms','/terms/']];
 return {path:'/terms/',file:'terms/index.html',title:'Terms of Use | Hanzla Amjad',description:'The terms for using hanzlaamjad.com, its articles and its contact tools, and how project work with Hanzla Amjad is agreed.',modified:'2026-10-30',schema:[crumbs(context,items)],
 body:`${hero({items,eyebrow:`Last updated ${policyDate}`,title:'Terms of Use'})}${legal(`
<p>These terms apply to your use of <strong>hanzlaamjad.com</strong>. By using the site, you agree to them. If you don’t agree, please don’t use the site.</p>
<h2>About the site</h2>
<p>The site is the portfolio and blog of Hanzla Amjad, an independent GoHighLevel and automation specialist. It describes my services, shows examples of past work and publishes guides about GoHighLevel and related tools.</p>
<h2>Project work</h2>
<p>Nothing on the site is a binding offer. Prices are listed as starting rates in US dollars. The scope, timeline, price and payment terms for any project are agreed in writing before work begins, and that agreement takes priority over anything on the site. Platform subscriptions, messaging usage and third-party charges are separate from my fees.</p>
<h2>Using the articles</h2>
<p>The guides are written to be practical, but every GoHighLevel account, plan and integration is different, and the platforms change their features and pricing. Test changes in a safe sub-account before using them with live contacts. You use the information at your own risk.</p>
<p>You’re welcome to share links to articles and quote short passages with a link back. Please don’t republish whole articles or screenshots without permission.</p>
<h2>Intellectual property</h2>
<p>The text, design, logo and original screenshots on this site belong to Hanzla Amjad unless stated otherwise. Screenshots of third-party software are included to illustrate the work. GoHighLevel, HighLevel, Make, Zapier, n8n, Retell AI, Google and other product names are trademarks of their owners. The site isn’t affiliated with or endorsed by them.</p>
<h2>Contact tools</h2>
<p>Please use the contact form and chat for genuine enquiries only. Don’t submit spam, malicious content or someone else’s personal information without their permission.</p>
<h2>Advertising</h2>
<p>Some pages may show ads from Google AdSense. Ads are chosen by Google, not by me, and showing an ad isn’t an endorsement of the product. See the <a href="/privacy/">Privacy Policy</a> for how advertising cookies work.</p>
<h2>Links</h2>
<p>The site links to other websites. I don’t control them and am not responsible for their content.</p>
<h2>Liability</h2>
<p>The site is provided “as is”. To the extent the law allows, I’m not liable for any loss arising from use of the site or reliance on its content. This doesn’t limit any liability that can’t be limited by law.</p>
<h2>Governing law</h2>
<p>These terms are governed by the laws of Pakistan.</p>
<h2>Changes</h2>
<p>I may update these terms. The current version will always be on this page with its date.</p>
<h2>Contact</h2>
<p>Questions about these terms: <a href="mailto:${config.email}">${config.email}</a>.</p>`)}`};
}

function disclaimerPage(context){
 const items=[['Home','/'],['Disclaimer','/disclaimer/']];
 return {path:'/disclaimer/',file:'disclaimer/index.html',title:'Disclaimer | Hanzla Amjad',description:'Disclaimer for hanzlaamjad.com: independence from HighLevel and other vendors, the limits of the guides, results, advertising and affiliate disclosure.',modified:'2026-10-30',schema:[crumbs(context,items)],
 body:`${hero({items,eyebrow:`Last updated ${policyDate}`,title:'Disclaimer'})}${legal(`
<h2>Independent specialist</h2>
<p>I’m an independent GoHighLevel specialist. I’m not an employee of HighLevel, Inc., and this site isn’t affiliated with, sponsored by or endorsed by HighLevel, Make, Zapier, n8n, Retell AI, Google, Twilio or any other company whose products are mentioned. Product names and logos belong to their owners.</p>
<h2>Guides and tutorials</h2>
<p>The articles describe how I’ve built things in real accounts at the time of writing. Menus, plan features, prices and rules change. A step that works in one account may need adjusting in another. Always check the current official documentation and test with sample contacts before changing a live system.</p>
<h2>A2P and messaging</h2>
<p>A2P 10DLC registration decisions are made by The Campaign Registry, messaging providers and mobile carriers, not by me. The approval screenshots on this site show past results; they don’t guarantee that any particular registration will be approved.</p>
<h2>No guaranteed results</h2>
<p>Funnels, automations and AI agents improve the parts of a customer journey you control. Lead volume, bookings and revenue also depend on your offer, traffic, market and team. I don’t promise specific numbers.</p>
<h2>Advertising and affiliate links</h2>
<p>Blog pages may display ads served by Google AdSense, which are selected automatically. If an article ever includes an affiliate link, it will be clearly marked. I only mention tools I use or have used in client work.</p>
<h2>Professional advice</h2>
<p>Nothing on the site is legal, financial or compliance advice. For messaging consent, privacy law or tax questions, talk to a qualified professional in your country.</p>
<h2>Questions</h2>
<p>Email <a href="mailto:${config.email}">${config.email}</a>.</p>`)}`};
}

export function sitePages(context){
 return [aboutPage(context),contactPage(context),blogIndex(context),...posts.map(p=>articlePage(p,context)),privacyPage(context),termsPage(context),disclaimerPage(context)];
}
