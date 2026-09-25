import {mkdir,writeFile} from 'node:fs/promises';
import path from 'node:path';
import {resolveContext,renderPages,rootDir} from './build.mjs';

// Portable review copy for the owner. It is outside Vercel's published dist/ directory.
const context=resolveContext({});
context.indexable=false;
const pages=renderPages(context);
const destination=path.join(rootDir,'preview');
await mkdir(destination,{recursive:true});
const filename=route=>route==='/'?'index.html':route.replace(/^\/+|\/+$/g,'')+'.html';
for(const page of pages){
  let html=page.html.replace(/\b(href|src)="(\/[^\"]*)"/g,(_match,attribute,value)=>{
    if(value.startsWith('/assets/')||/^\/[^/?#]+\.(ico|webmanifest)$/.test(value))return `${attribute}="../public${value}"`;
    const match=value.match(/^([^?#]*)([\s\S]*)$/);
    return `${attribute}="${filename(match[1])}${match[2]}"`;
  });
  await writeFile(path.join(destination,filename(page.path)),html);
}
console.log('Portable review copy: preview/index.html. Production output remains dist/.');
