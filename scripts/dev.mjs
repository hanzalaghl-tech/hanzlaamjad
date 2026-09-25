import http from 'node:http';
import path from 'node:path';
import {readFile,stat} from 'node:fs/promises';
import {build} from './build.mjs';

const {output}=await build({env:{...process.env,VERCEL_ENV:'development'}});
const port=Number(process.env.PORT||3000);
const types={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.svg':'image/svg+xml','.png':'image/png','.jpg':'image/jpeg','.xml':'application/xml; charset=utf-8','.txt':'text/plain; charset=utf-8'};
const server=http.createServer(async(req,res)=>{
  try {
    if(!['GET','HEAD'].includes(req.method)) {res.writeHead(405,{'Allow':'GET, HEAD'});res.end();return;}
    let pathname;
    try {pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);} catch {res.writeHead(400);res.end('Bad request');return;}
    if(pathname.includes('\0')||pathname.includes('\\')){res.writeHead(400);res.end('Bad request');return;}
    let file=path.resolve(output,'.'+pathname);
    if(file!==output&&!file.startsWith(output+path.sep)){res.writeHead(403);res.end('Forbidden');return;}
    let status=200;
    try {
      const info=await stat(file);
      if(info.isDirectory()){
        if(!pathname.endsWith('/')){res.writeHead(308,{Location:pathname+'/'+new URL(req.url,'http://localhost').search});res.end();return;}
        file=path.join(file,'index.html');
      }
      await stat(file);
    } catch {file=path.join(output,'404.html');status=404;}
    const body=await readFile(file);
    res.writeHead(status,{'Content-Type':types[path.extname(file)]||'application/octet-stream','Cache-Control':'no-store','X-Content-Type-Options':'nosniff'});
    res.end(req.method==='HEAD'?undefined:body);
  }catch{res.writeHead(500);res.end('Unable to serve this page');}
});
server.listen(port,'127.0.0.1',()=>console.log(`Local preview: http://localhost:${port} — restart after editing source files.`));
