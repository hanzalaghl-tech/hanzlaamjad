import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import test from 'node:test';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
import {renderPages,resolveContext} from '../scripts/build.mjs';
const here=path.dirname(fileURLToPath(import.meta.url));
const html=renderPages(resolveContext({}))[0].html;
const decode=value=>value.replace(/&amp;/g,'&').replace(/&quot;/g,'"').replace(/&#39;/g,"'").replace(/&lt;/g,'<').replace(/&gt;/g,'>');
const attrs=source=>Object.fromEntries([...source.matchAll(/([a-zA-Z][\w-]*)(?:="([^"]*)")?/g)].map(m=>[m[1],decode(m[2]||'')]));
const fixture={
 fields:[...html.matchAll(/<(?:input|select|textarea)\b([^>]*)>/g)].map(m=>attrs(m[1])),
 options:[...html.matchAll(/<option(?:\s[^>]*)?>([^<]+)<\/option>/g)].map(m=>decode(m[1])),
 action:html.match(/<form[^>]*action="([^"]+)"/)[1],
 services:[],
 channels:[...html.matchAll(/<a\b([^>]*data-channel[^>]*)>/g)].map(m=>attrs(m[1]))
};
const code=fs.readFileSync(path.join(here,'../public/assets/script.js'),'utf8');
class Element {
  constructor(attrs = {}) {
    this.attrs = {...attrs}; this.id = attrs.id || ''; this.name = attrs.name || '';
    this.type = attrs.type || ''; this.value = attrs.value || ''; this.initial = this.value;
    this.listeners = {}; this.children = []; this.hidden = false; this.checked = false;
    this.style = {}; this.dataset = {}; this.disabled = false; this.validationMessage = '';
    this._text = ''; this.classes = new Set();
    this.classList = { add: c => this.classes.add(c), remove: c => this.classes.delete(c), toggle: (c, v) => v ? this.classes.add(c) : this.classes.delete(c) };
  }
  addEventListener(name, fn) { (this.listeners[name] ||= []).push(fn); }
  async emit(name, event = {}) { for (const fn of this.listeners[name] || []) await fn({preventDefault(){},target:this,...event}); }
  setAttribute(k,v) { this.attrs[k] = v; }
  getAttribute(k) { return this.attrs[k] ?? null; }
  removeAttribute(k) { delete this.attrs[k]; }
  setCustomValidity(value) { this.validationMessage = value; }
  appendChild(child) { if (child.type === 'hidden') child.initial = child.value; this.children.push(child); return child; }
  querySelector(selector) { return (this.queries || {})[selector]; }
  querySelectorAll() { return []; }
  focus() { this.focused = true; }
  scrollIntoView() { this.scrolled = true; }
  set textContent(value) { this._text = value; this.children = []; }
  get textContent() { return this._text + this.children.map(c=>c.textContent).join(''); }
}

function boot({ fetchImpl, query = '', reducedMotion = false, storageBlocked = false, withoutForm = false, withCanvas = false } = {}) {
  const selectors = Object.fromEntries(['.scroll-progress','.menu-toggle','#mobile-menu','#contactForm','#submitBtn','#formStatus','#phone-error','#year'].map(s=>[s,new Element()]));
  const fields = fixture.fields.map(attrs=>new Element(attrs));
  fields.filter(f=>f.id).forEach(f=>selectors['#'+f.id]=f);
  selectors['#cf-subject'].options = fixture.options.map(value => ({value}));
  const form = selectors['#contactForm']; form.action = fixture.action; form.children = [...fields];
  form.elements = Object.fromEntries(fields.map(f=>[f.name,f]));
  form.reportValidity = () => form.children.every(f => !f.validationMessage && (!('required' in f.attrs) || f.value.trim()) && (f.type !== 'email' || /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(f.value)));
  form.reset = () => form.children.forEach(f=> { f.value=f.initial; f.checked=false; });
  const label = new Element(); selectors['#submitBtn'].queries = {'.submit-label':label};
  const services = fixture.services.map(attrs=> {const e = new Element(attrs);e.dataset.service=attrs['data-service'];return e;});
  const channels = fixture.channels.map(attrs=> {const e = new Element(attrs);e.dataset.channel=attrs['data-channel'];return e;});
  const root = new Element(); root.scrollHeight = 2000;
  const canvasCalls = {strokes:0};
  if (withCanvas) {
    const stage = new Element(); stage.getBoundingClientRect=()=>({width:500,height:560,left:0,top:0});
    const canvas = new Element(); canvas.parentElement=stage;
    canvas.getContext=()=>({clearRect(){},fillRect(){},setTransform(){},beginPath(){},closePath(){},moveTo(){},lineTo(){},arc(){},fill(){},stroke(){canvasCalls.strokes++;},createLinearGradient(){return {addColorStop(){}};},createRadialGradient(){return {addColorStop(){}};}});
    selectors['#flow-canvas']=canvas;
  }
  const document = {
    documentElement:root,body:new Element(),hidden:false,
    querySelector:s=>selectors[s],
    querySelectorAll:s=>s==='[data-service]'?services:s==='[data-channel]'?channels:[],
    createElement:()=>new Element(), createTextNode:text=>{const e=new Element();e.textContent=text;return e;},
    addEventListener(){}
  };
  if (withoutForm) delete selectors['#contactForm'];
  const storage = new Map();
  const store = {getItem:key=>{if(storageBlocked)throw Error('blocked');return storage.get(key)||null;},setItem:(key,value)=>{if(storageBlocked)throw Error('blocked');storage.set(key,value);}};
  const window = { document, location:{search:query},innerHeight:900,innerWidth:1440,scrollY:0,
    matchMedia:q=>({matches:q.includes('reduced')?reducedMotion:true,addEventListener(){}}),addEventListener(){} };
  const calls=[];const timers=new Map();let nextTimer=0;const animationFrames=new Map();let nextFrame=0;
  class LocalFormData {
    constructor(form) { this.values = new Map(form.children.filter(f=>f.name && (f.type!=='checkbox'||f.checked)).map(f=>[f.name,f.value])); }
    get(key){return this.values.get(key);} set(key,value){this.values.set(key,value);}
  }
  const sandbox = {document,window,localStorage:store,sessionStorage:store,URLSearchParams,AbortController,FormData:LocalFormData,
    fetch:async(url,options)=>{calls.push({url,options});return fetchImpl?fetchImpl(url,options):{ok:true,json:async()=>({success:true})};},
    setTimeout:fn=>{const id=++nextTimer;timers.set(id,fn);return id;},clearTimeout:id=>timers.delete(id),
    requestAnimationFrame:fn=>{const id=++nextFrame;animationFrames.set(id,fn);return id;},cancelAnimationFrame:id=>animationFrames.delete(id),console,Date
  };
  vm.runInNewContext(code,sandbox,{filename:'script.js'});
  const fill = async (id,value) => {selectors['#cf-'+id].value=value;await selectors['#cf-'+id].emit('input');};
  const valid = async () => {await fill('name',' Test Visitor ');await fill('email','visitor@example.com');await fill('message',' I need a connected funnel and CRM. ');await fill('subject','Funnels & websites');};
  return {selectors,form,root,window,calls,timers,services,channels,fill,valid,storage,canvasCalls,animationFrames,submit:()=>form.emit('submit')};
}

test('success submits to the preserved endpoint and resets only after confirmed success',async()=>{
  const app=boot({query:'?utm_source=google&utm_medium=cpc&utm_campaign=crm&unrelated=discard'});await app.valid();await app.fill('whatsapp','+92 319 6088675');await app.submit();
  assert.equal(app.calls.length,1);assert.equal(app.calls[0].url,fixture.action);
  const payload=app.calls[0].options.body;
  assert.equal(payload.get('name'),'Test Visitor');assert.equal(payload.get('message'),'I need a connected funnel and CRM.');
  assert.equal(payload.get('access_key'),fixture.fields.find(f=>f.name==='access_key').value);
  assert.equal(payload.get('utm_source'),'google');assert.equal(payload.get('unrelated'),undefined);
  assert.equal(app.selectors['#cf-name'].value,'');assert.match(app.selectors['#formStatus'].textContent,/has been sent/);
  assert.equal(app.window.dataLayer.filter(x=>x.event==='generate_lead').length,1);
  assert.equal(JSON.stringify(app.window.dataLayer).includes('visitor@example.com'),false);
  assert.equal(app.selectors['#submitBtn'].disabled,false);
});
test('server rejection preserves entered details and never emits a conversion',async()=>{
  const app=boot({fetchImpl:async()=>({ok:true,json:async()=>({success:false})})});await app.valid();await app.submit();
  assert.equal(app.selectors['#cf-email'].value,'visitor@example.com');assert.match(app.selectors['#formStatus'].textContent,/couldn’t be confirmed/);
  assert.equal(app.window.dataLayer?.some(x=>x.event==='generate_lead')||false,false);
  assert.equal(app.selectors['#submitBtn'].disabled,false);
});
test('HTTP errors and network errors keep an email fallback and allow retry',async()=>{
  for(const mode of ['http','network','json']){
    const app=boot({fetchImpl:async()=>{if(mode==='network')throw Error('offline');return {ok:mode!=='http',json:async()=>{if(mode==='json')throw Error('invalid json');return {success:true};}};}});
    await app.valid();await app.submit();assert.match(app.selectors['#formStatus'].textContent,/Email Hanzla directly/);assert.equal(app.selectors['#submitBtn'].disabled,false);assert.equal(app.selectors['#cf-email'].value,'visitor@example.com');
  }
});
test('empty, whitespace-only and invalid phone details never reach the endpoint',async()=>{
  const app=boot();await app.submit();assert.equal(app.calls.length,0);await app.valid();await app.fill('name','  ');await app.submit();assert.equal(app.calls.length,0);
  await app.fill('name','Visitor');await app.fill('whatsapp','hello 123');await app.submit();assert.equal(app.calls.length,0);assert.equal(app.selectors['#phone-error'].hidden,false);
  await app.fill('whatsapp','');await app.submit();assert.equal(app.calls.length,1);
});
test('duplicate submissions are suppressed while the first request is pending',async()=>{
  let resolve;const app=boot({fetchImpl:()=>new Promise(r=>{resolve=r;})});await app.valid();const pending=app.submit();await app.submit();assert.equal(app.calls.length,1);assert.equal(app.selectors['#submitBtn'].disabled,true);
  resolve({ok:true,json:async()=>({success:true})});await pending;assert.equal(app.selectors['#submitBtn'].disabled,false);
});
test('timeout reports uncertain delivery and keeps the brief for recovery',async()=>{
  const app=boot({fetchImpl:(_url,options)=>new Promise((_resolve,reject)=>options.signal.addEventListener('abort',()=>{const e=Error('timeout');e.name='AbortError';reject(e);}))});
  await app.valid();const pending=app.submit();for(const fn of app.timers.values())fn();await pending;
  assert.match(app.selectors['#formStatus'].textContent,/may have been sent/);assert.equal(app.selectors['#cf-email'].value,'visitor@example.com');assert.equal(app.selectors['#submitBtn'].disabled,false);
});
test('service-page contact links preselect only a valid project type',async()=>{
  const selected=boot({query:'?service=Automation%20%26%20workflows'});
  assert.equal(selected.selectors['#cf-subject'].value,'Automation & workflows');
  const invalid=boot({query:'?service=unlisted'});assert.equal(invalid.selectors['#cf-subject'].value,'');
});
test('service pages without a form still retain campaign attribution without errors',()=>{
  const app=boot({withoutForm:true,query:'?utm_source=google&utm_campaign=workflow'});
  assert.equal(JSON.parse(app.storage.get('ha-campaign-v1')).utm_campaign,'workflow');
  assert.equal(app.calls.length,0);
});
test('honeypot, blocked storage and reduced motion are safe',async()=>{
  const app=boot({storageBlocked:true,reducedMotion:true,query:'?utm_source=instagram'});await app.valid();app.form.elements.botcheck.checked=true;await app.submit();assert.equal(app.calls.length,0);assert.ok(app.root.classes.has('motion-reduced'));
  const moving=boot();assert.ok(!moving.root.classes.has('motion-reduced'));
});
test('the navigation disclosure opens and closes with correct accessibility state',async()=>{
  const app=boot();await app.selectors['.menu-toggle'].emit('click');assert.equal(app.selectors['#mobile-menu'].hidden,false);assert.equal(app.selectors['.menu-toggle'].getAttribute('aria-expanded'),'true');await app.selectors['.menu-toggle'].emit('click');assert.equal(app.selectors['#mobile-menu'].hidden,true);
});

test('decorative canvas keeps animating; only a device reduced-motion setting keeps it still',async()=>{
 const animated=boot({withCanvas:true});assert.ok(animated.canvasCalls.strokes>50);assert.equal(animated.animationFrames.size,1);
 const reduced=boot({withCanvas:true,reducedMotion:true});assert.ok(reduced.canvasCalls.strokes>50);assert.equal(reduced.animationFrames.size,0);
});
