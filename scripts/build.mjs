import { readFile, writeFile, mkdir, cp, rm, access } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { createHash } from 'node:crypto';
import config from '../site.config.mjs';
import { allPages } from '../src/content.mjs';
import { page, button } from '../src/layout.mjs';
import { home } from '../src/home.mjs';
import { serviceBody, privacyBody } from '../src/service-page.mjs';

export const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

export function normalizeOrigin(input) {
  if (!input || !String(input).trim()) return '';
  let value;
  try { value = new URL(String(input).trim()); } catch { throw new Error('SITE_URL must be a complete HTTPS origin, for example https://your-real-domain.com.'); }
  if (value.protocol !== 'https:' || value.username || value.password || value.search || value.hash || (value.pathname !== '/' && value.pathname !== '') || value.port) {
    throw new Error('SITE_URL must use HTTPS and contain only the domain, with no path, query, credentials or custom port.');
  }
  if (!value.hostname.includes('.') || value.hostname === 'localhost' || value.hostname.endsWith('.localhost')) throw new Error('SITE_URL must be your public website domain.');
  return value.origin;
}

export function resolveContext(env = process.env) {
  const requested = env.SITE_URL?.trim() || config.siteUrl.trim() || (env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${env.VERCEL_PROJECT_PRODUCTION_URL}` : '');
  const origin = normalizeOrigin(requested);
  if (env.VERCEL === '1' && env.VERCEL_ENV === 'production' && !origin) throw new Error('No production domain is available. Set SITE_URL in Vercel or enable Vercel system environment variables, then redeploy.');
  const indexable = Boolean(origin) && (!env.VERCEL_ENV || env.VERCEL_ENV === 'production');
  return {
    origin, indexable,
    accessKey: env.WEB3FORMS_ACCESS_KEY?.trim() || config.web3formsKey,
    verification: env.GOOGLE_SITE_VERIFICATION?.trim() || config.googleSiteVerification,
    stylesheet: '/assets/styles.css', script: '/assets/script.js'
  };
}

export function renderPages(context) {
  const pages = [{
    path: '/', file: 'index.html',
    title: 'GoHighLevel Expert & Automation Specialist | Hanzla Amjad',
    description: 'Hanzla Amjad is a GoHighLevel (GHL) expert and automation specialist. Get connected CRM systems, funnels and follow-ups built around your business.',
    body: home(context)
  }];
  for (const service of allPages) pages.push({
    path: `/${service.slug}/`, file: `${service.slug}/index.html`,
    title: service.title, description: service.description,
    body: serviceBody(service), service
  });
  pages.push({path:'/privacy/', file:'privacy/index.html', title:'Privacy | Hanzla Amjad', description:'How Hanzla Amjad’s portfolio handles project inquiries, contact information, motion preferences and campaign attribution.', body:privacyBody()});
  pages.push({path:'/404/',file:'404.html',title:'Page not found | Hanzla Amjad',description:'This page is not available. Return to Hanzla Amjad’s portfolio or start a conversation.',noindex:true,body:`<section class="not-found wrap"><p class="eyebrow">404 · A small detour</p><h1>Let’s get you<br><em>back in flow.</em></h1><p>That page isn’t here. The portfolio is a good place to start.</p>${button('Back to the portfolio','/')}</section>`});
  return pages.map(item=>({...item,html:page({...item,context})}));
}

export function renderSitemap(pages, context) {
  const escapeXml = s => s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  const urls = context.indexable ? pages.filter(p=>!p.noindex).map(p=>`  <url><loc>${escapeXml(context.origin+p.path)}</loc></url>`).join('\n') : '';
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

export async function build({env=process.env}={}) {
  const context=resolveContext(env);
  const output=path.join(rootDir,'dist');
  const css=await readFile(path.join(rootDir,'public/assets/styles.css'));
  const js=await readFile(path.join(rootDir,'public/assets/script.js'));
  const hash=value=>createHash('sha256').update(value).digest('hex').slice(0,10);
  context.stylesheet=`/assets/styles.${hash(css)}.css`;
  context.script=`/assets/app.${hash(js)}.js`;
  for(const file of ['hanzla-photo.jpg','hanzla-avatar.jpg','social-card.jpg','icons/icon-192.png','icons/icon-512.png','icons/apple-touch-icon.png','fonts/bricolage-grotesque-latin-wght.woff2','fonts/fraunces-latin-400-italic.woff2']) await access(path.join(rootDir,'public/assets',file));
  for(const file of ['favicon.ico','site.webmanifest']) await access(path.join(rootDir,'public',file));
  await rm(output,{recursive:true,force:true});
  await mkdir(output,{recursive:true});
  await cp(path.join(rootDir,'public'),output,{recursive:true});
  await rm(path.join(output,'assets/styles.css'));
  await rm(path.join(output,'assets/script.js'));
  await writeFile(path.join(output,context.stylesheet),css);
  await writeFile(path.join(output,context.script),js);
  const pages=renderPages(context);
  for(const item of pages) {
    const file=path.join(output,item.file);
    await mkdir(path.dirname(file),{recursive:true});
    await writeFile(file,item.html);
  }
  await writeFile(path.join(output,'sitemap.xml'),renderSitemap(pages,context));
  // Crawl access allows search engines to see the preview pages' noindex directive.
  const robots=`User-agent: *\nAllow: /\n${context.indexable?`\nSitemap: ${context.origin}/sitemap.xml\n`:''}`;
  await writeFile(path.join(output,'robots.txt'),robots);
  console.log(`Built ${pages.length} static HTML pages in dist/ with versioned CSS and JavaScript.`);
  console.log(context.indexable?`Production SEO origin: ${context.origin}`:'Preview build: noindex. Production uses SITE_URL or Vercel’s production domain.');
  return {context,pages,output};
}

if(process.argv[1] && pathToFileURL(path.resolve(process.argv[1])).href===import.meta.url) await build();
