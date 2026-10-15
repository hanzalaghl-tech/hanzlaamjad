import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import {readFileSync,existsSync} from 'node:fs';
import {projects,a2pProofs} from '../src/projects.mjs';
class Element {
 constructor(dataset={}){this.dataset=dataset;this.listeners={};this.queries={};this.style={};this.textContent='';this.open=false;this.classes=new Set();this.classList={add:c=>this.classes.add(c),remove:c=>this.classes.delete(c),toggle:(c,v)=>v?this.classes.add(c):this.classes.delete(c)};}
 querySelector(s){return this.queries[s];}querySelectorAll(){return [];}addEventListener(k,fn){(this.listeners[k]||=[]).push(fn);}
 emit(k,event={}){for(const fn of this.listeners[k]||[])fn({preventDefault(){},target:this,...event});}
 showModal(){this.open=true;}close(){this.open=false;this.emit('close');}
}
function boot(){
 const root=new Element(),body=new Element(),dialog=new Element();
 for(const id of ['dialog-image','dialog-title','dialog-category','dialog-label','dialog-description','dialog-count','dialog-original'])dialog.queries['#'+id]=new Element();
 for(const action of ['close-gallery','dialog-previous','dialog-next'])dialog.queries['[data-'+action+']']=new Element();
 const cards=projects.map(project=>{const el=new Element({gallery:project.id});for(const selector of ['.gallery-image','.slide-label','.slide-count','.gallery-progress span','[data-previous]','[data-next]'])el.queries[selector]=new Element();return el;});
 const openers=[...projects.map(p=>new Element({openGallery:p.id})),new Element({openGallery:'a2p',start:'2'})];
 const data=new Element();data.textContent=JSON.stringify({projects,a2pProofs});
 const document={documentElement:root,body,querySelector:s=>s==='#portfolio-data'?data:s==='#gallery-dialog'?dialog:undefined,querySelectorAll:s=>s==='[data-gallery]'?cards:s==='[data-open-gallery]'?openers:[],addEventListener(){}};
 const window={innerHeight:900,innerWidth:1400,scrollY:0,location:{search:''},matchMedia:()=>({matches:false,addEventListener(){}}),addEventListener(){}};
 vm.runInNewContext(readFileSync(new URL('../public/assets/script.js',import.meta.url),'utf8'),{document,window,URLSearchParams,sessionStorage:{getItem(){return null;}},requestAnimationFrame(){},console,Date});
 return {cards,dialog,openers,body};
}

test('galleries wrap in both directions, stay independent and synchronise with the enlarged viewer',()=>{
 const a=boot(),first=a.cards[0],second=a.cards[1];
 first.queries['[data-previous]'].emit('click');
 assert.equal(first.queries['.gallery-image'].src,projects[0].slides.at(-1).src);
 assert.equal(second.queries['.gallery-image'].src,undefined);
 first.queries['[data-next]'].emit('click');
 assert.equal(first.queries['.gallery-image'].src,projects[0].slides[0].src);
 a.openers[0].emit('click');assert.ok(a.dialog.open);assert.ok(a.body.classes.has('modal-open'));
 assert.equal(a.dialog.queries['#dialog-title'].textContent,projects[0].name);
 a.dialog.queries['[data-dialog-next]'].emit('click');
 assert.equal(a.dialog.queries['#dialog-image'].src,projects[0].slides[1].src);
 assert.equal(first.queries['.gallery-image'].src,projects[0].slides[1].src);
 assert.equal(a.dialog.queries['#dialog-original'].href,projects[0].slides[1].src);
 a.dialog.emit('keydown',{key:'ArrowLeft'});assert.equal(a.dialog.queries['#dialog-image'].src,projects[0].slides[0].src);
 a.dialog.queries['[data-close-gallery]'].emit('click');assert.ok(!a.dialog.open);assert.ok(!a.body.classes.has('modal-open'));
});
test('approval thumbnails open at the requested image and horizontal swipes advance a project',()=>{
 const a=boot();a.openers.at(-1).emit('click');assert.equal(a.dialog.queries['#dialog-image'].src,a2pProofs[2].src);
 assert.equal(a.dialog.queries['#dialog-count'].textContent,'03 / 10');
 const card=a.cards[2];card.emit('touchstart',{changedTouches:[{clientX:200,clientY:10}]});card.emit('touchend',{changedTouches:[{clientX:100,clientY:13}]});
 assert.equal(card.queries['.gallery-image'].src,projects[2].slides[1].src);
});
test('all project and approval screenshots exist and no gallery includes complete webhook URLs',()=>{
 for(const p of [...projects,{slides:a2pProofs}])for(const s of p.slides){assert.ok(existsSync(new URL('../public'+s.src,import.meta.url)));assert.ok(s.width>0&&s.height>0);assert.ok(s.description);}
 assert.ok(!/https:\/\/(?:hook\.|hooks\.|services\.leadconnectorhq)/.test(JSON.stringify(projects)));
});

test('screenshot assets contain valid, nonempty WebP containers',()=>{
 for(const p of [...projects,{slides:a2pProofs}])for(const s of p.slides){
  const bytes=readFileSync(new URL('../public'+s.src,import.meta.url));
  assert.ok(bytes.length>1024,s.src);assert.equal(bytes.subarray(0,4).toString(),'RIFF');assert.equal(bytes.subarray(8,12).toString(),'WEBP');assert.equal(bytes.readUInt32LE(4)+8,bytes.length);
 }
});
