import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile,access} from 'node:fs/promises';
import {existsSync} from 'node:fs';
import path from 'node:path';
import {normalizeOrigin,resolveContext,renderPages,renderSitemap,rootDir} from '../scripts/build.mjs';

const domain='https://portfolio.example.test';
const context=resolveContext({SITE_URL:domain,VERCEL_ENV:'production'});
const pages=renderPages(context);
const extract=(text,regex)=>[...text.matchAll(regex)].map(m=>m[1]);
const meta=(html,name)=>html.match(new RegExp(`<meta name="${name}" content="([^"]*)"`))?.[1];

test('production pages have unique metadata, one h1 and the configured canonical domain',()=>{
  const titles=new Set(),descriptions=new Set();
  for(const p of pages){
    const title=extract(p.html,/<title>([^<]+)<\/title>/g)[0];
    assert.ok(title);assert.ok(!titles.has(title));titles.add(title);
    const description=meta(p.html,'description');assert.ok(description);assert.ok(!descriptions.has(description));descriptions.add(description);
    assert.equal((p.html.match(/<h1(?:\s|>)/g)||[]).length,1,p.path);
    if(!p.noindex){assert.ok(p.html.includes(`rel="canonical" href="${domain}${p.path}"`));assert.match(meta(p.html,'robots'),/^index,/);}
    else{assert.match(meta(p.html,'robots'),/^noindex,/);assert.ok(!p.html.includes('rel="canonical"'));}
    const ids=extract(p.html,/\bid="([^"]+)"/g);assert.equal(ids.length,new Set(ids).size,`${p.path}: duplicate id`);
  }
});
test('service pages contain distinct service content and valid structured data',()=>{
  const services=pages.filter(p=>p.service);assert.equal(services.length,7);
  for(const p of pages){
    const blocks=extract(p.html,/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g);
    assert.equal(blocks.length,1);
    const graph=JSON.parse(blocks[0])['@graph'];assert.ok(graph.some(n=>n['@type']==='Person'));
    assert.ok(!graph.some(n=>n['@type']==='AggregateRating'||n.aggregateRating));
    if(p.service){
      const page=graph.find(n=>n['@type']==='WebPage');
      const service=graph.find(n=>n['@type']==='Service');
      const breadcrumb=graph.find(n=>n['@type']==='BreadcrumbList');
      assert.equal(page.mainEntity['@id'],service['@id']);
      assert.equal(page.breadcrumb['@id'],breadcrumb['@id']);
      assert.equal(service.provider['@id'],graph.find(n=>n['@type']==='Person')['@id']);
      assert.ok(p.body.replace(/<[^>]+>/g,' ').split(/\s+/).length>450,`${p.path}: insufficient service detail`);
    }
  }
});
test('every local page link and fragment points to a generated page or element',()=>{
  const map=new Map(pages.map(p=>[p.path,p]));
  for(const p of pages){
    for(const href of extract(p.html,/\bhref="([^"]+)"/g)){
      if(!href.startsWith('/')&&!href.startsWith('#'))continue;
      if(href.startsWith('/assets/'))continue;
      const url=new URL(href,domain+p.path);
      if(/\.[a-z0-9]+$/i.test(url.pathname)){assert.ok(existsSync(path.join(rootDir,'public',url.pathname)),`${p.path} => missing file ${href}`);continue;}
      const target=map.get(url.pathname);assert.ok(target,`${p.path} => ${href}`);
      if(url.hash)assert.ok(target.html.includes(`id="${url.hash.slice(1)}"`),`${p.path}: missing anchor ${href}`);
    }
  }
});
test('sitemap includes only indexable pages and consistently uses the custom domain',()=>{
  const xml=renderSitemap(pages,context);const urls=extract(xml,/<loc>([^<]+)<\/loc>/g);
  assert.equal(urls.length,9);assert.equal(new Set(urls).size,9);assert.ok(urls.every(u=>u.startsWith(domain+'/')));assert.ok(!urls.some(u=>u.includes('/404/')));
});
test('Vercel previews use noindex while canonical URLs still identify production',()=>{
  const preview=resolveContext({SITE_URL:domain,VERCEL_ENV:'preview'});assert.equal(preview.indexable,false);
  for(const p of renderPages(preview))assert.match(meta(p.html,'robots'),/^noindex,/);
  assert.ok(!renderSitemap(pages,preview).includes('<loc>'));
});
test('configured primary domain is stable and an explicit override wins',()=>{
  assert.equal(resolveContext({VERCEL_ENV:'production',VERCEL_PROJECT_PRODUCTION_URL:'my-project.vercel.app'}).origin,'https://hanzlaamjad.com');
  assert.equal(resolveContext({SITE_URL:domain,VERCEL_PROJECT_PRODUCTION_URL:'my-project.vercel.app'}).origin,domain);
  assert.equal(resolveContext({}).origin,'https://hanzlaamjad.com');
  assert.equal(resolveContext({VERCEL_ENV:'preview'}).indexable,false);
});
test('invalid domain configuration cannot introduce paths or markup into SEO URLs',()=>{
  assert.equal(normalizeOrigin('https://portfolio.example.test/'),domain);
  for(const value of ['http://example.test','https://example.test/path','https://user:pass@example.test','https://example.test/?x=1','https://example.test/#x','javascript:alert(1)','https://localhost','https://example.test:444']) assert.throws(()=>normalizeOrigin(value),value);
});
test('Vercel publishes the built directory and preserves true missing-page responses',async()=>{
  const config=JSON.parse(await readFile(path.join(rootDir,'vercel.json'),'utf8'));
  assert.equal(config.framework,null);assert.equal(config.outputDirectory,'dist');assert.equal(config.buildCommand,'npm run build');assert.equal(config.trailingSlash,true);assert.ok(!config.rewrites);
  for(const file of ['social-card.jpg','icons/apple-touch-icon.png','icons/icon-192.png','icons/icon-512.png','hanzla-photo.jpg','hanzla-avatar.jpg','fonts/bricolage-grotesque-latin-wght.woff2','fonts/fraunces-latin-400-italic.woff2'])await access(path.join(rootDir,'public/assets',file));
  for(const file of ['favicon.ico','site.webmanifest'])await access(path.join(rootDir,'public',file));
  const packageInfo=JSON.parse(await readFile(path.join(rootDir,'package.json'),'utf8'));assert.equal(Object.keys(packageInfo.dependencies||{}).length,0);
});

test('the home page has no pause control or scroll cue, and its H1 carries the primary keyword',()=>{
  const home=pages.find(p=>p.path==='/');
  assert.ok(!/motion-toggle|Pause animations|Scroll to explore|scroll-cue/i.test(home.html));
  const h1=home.html.match(/<h1[\s\S]*?<\/h1>/)[0].replace(/<[^>]+>/g,' ').replace(/\s+/g,' ');
  assert.match(h1,/GoHighLevel/);
});
test('the favicon is the portrait and is declared in the head of every page',()=>{
  for(const p of pages){
    assert.ok(p.html.includes('<link rel="icon" href="/favicon.ico"'),p.path);
    assert.ok(p.html.includes('rel="apple-touch-icon" href="/assets/icons/apple-touch-icon.png"'),p.path);
    assert.ok(p.html.includes('rel="manifest" href="/site.webmanifest"'),p.path);
  }
});
test('the stylesheet references only self-hosted fonts',async()=>{
  const css=await readFile(path.join(rootDir,'public/assets/styles.css'),'utf8');
  assert.ok(!/fonts\.googleapis|fonts\.gstatic|https?:\/\//.test(css.replace(/xmlns='http:\/\/www\.w3\.org\/2000\/svg'/g,'')));
});
