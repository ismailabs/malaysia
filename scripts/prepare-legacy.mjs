// Prepare only. Deploy this isolated directory AFTER the Cloudflare production gate.
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
const out=path.resolve('output/legacy-redirect');
await mkdir(path.join(out,'.vercel'),{recursive:true});
const config={
 '$schema':'https://openapi.vercel.sh/vercel.json',
 framework:null,buildCommand:null,installCommand:null,outputDirectory:'.',
 redirects:[{source:'/:path*',destination:'https://malaysia.ismailstudio.my/:path*',permanent:true}],
};
await writeFile(path.join(out,'vercel.json'),JSON.stringify(config,null,2)+'\n');
await writeFile(path.join(out,'index.html'),'<!doctype html><html lang="en"><meta charset="utf-8"><title>Malaysia has moved</title><h1>Malaysia has moved</h1><a href="https://malaysia.ismailstudio.my/">Continue to Between Places</a></html>\n');
await writeFile(path.join(out,'.vercel/project.json'),JSON.stringify({projectId:'prj_j1mVVCiiVs1jNefaK5BEILm1on0x',orgId:'team_y1FMLs1LWgVb2dOvegEGYVkf',projectName:'malaysia-between-places'},null,2)+'\n');
// Explicit Build Output API routing avoids the observed source-deployment path
// that accepted vercel.json but produced routes:null on this project.
await mkdir(path.join(out,'.vercel/output/static'),{recursive:true});
await writeFile(path.join(out,'.vercel/output/config.json'),JSON.stringify({
 version:3,
 routes:[{src:'^/(.*)$',status:308,headers:{Location:'https://malaysia.ismailstudio.my/$1'}}],
},null,2)+'\n');
await writeFile(path.join(out,'.vercel/output/static/index.html'),'<!doctype html><html lang="en"><meta charset="utf-8"><title>Malaysia has moved</title><a href="https://malaysia.ismailstudio.my/">Continue to Between Places</a></html>\n');
console.log(out);
