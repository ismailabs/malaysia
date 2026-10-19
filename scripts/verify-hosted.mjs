import { readFile, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import tls from 'node:tls';
const origin=new URL(process.argv[2]);
const label=process.argv[3]||'production';
const preview=label==='preview';
const manifest=JSON.parse(await readFile('output/release-artifact.json','utf8'));
const checks=[];const errors=[];
async function checkAsset(file){
 const r=await fetch(new URL(file.path,origin));const data=Buffer.from(await r.arrayBuffer());
 const hash=createHash('sha256').update(data).digest('hex');
 const entry={path:file.path,status:r.status,bytes:data.length,hashMatches:hash===file.sha256,url:r.url};
 if(r.status!==200||hash!==file.sha256)errors.push(entry);
 checks.push(entry);
}
const files=manifest.files.filter(f=>f.path!=='_headers');
for(let i=0;i<files.length;i+=4)await Promise.all(files.slice(i,i+4).map(checkAsset));
const response=await fetch(origin);
const headers=Object.fromEntries(response.headers);
if(preview&&!headers['x-robots-tag']?.includes('noindex'))errors.push({error:'Preview missing noindex'});
if(!preview&&headers['x-robots-tag']?.includes('noindex'))errors.push({error:'Production noindex present'});
if(!headers['content-security-policy']?.includes("default-src 'self'"))errors.push({error:'CSP missing'});
const privatePaths=['/missing-place-qa/','/.agents/skills/design-taste-frontend/SKILL.md','/codex-handoff/START-HERE.md','/AGENTS.md','/package.json','/wrangler.jsonc','/.env','/scripts/generate_site.py','/_headers'];
const privateChecks=[];
for(const path of privatePaths){const r=await fetch(new URL(path,origin));privateChecks.push({path,status:r.status});if(r.status!==404)errors.push({path,status:r.status});}
const certificate=await new Promise((resolve,reject)=>{
 const socket=tls.connect({host:origin.hostname,port:443,servername:origin.hostname,rejectUnauthorized:true},()=>{
  const c=socket.getPeerCertificate();resolve({authorized:socket.authorized,subject:c.subject,issuer:c.issuer,validFrom:c.valid_from,validTo:c.valid_to,subjectAltName:c.subjectaltname});socket.end();
 });socket.once('error',reject);
});
const report={time:new Date().toISOString(),origin:origin.href,preview,checkedAssets:checks.length,errors,certificate,headers,checks,privateChecks};
await writeFile(`output/${label}-hosted-verification.json`,JSON.stringify(report,null,2));
console.log(JSON.stringify({origin:origin.href,checkedAssets:checks.length,matchingAssets:checks.filter(c=>c.hashMatches).length,private404s:privateChecks.filter(c=>c.status===404).length,tlsAuthorized:certificate.authorized,robots:headers['x-robots-tag']||'indexable',errors}));
process.exitCode=errors.length?1:0;
