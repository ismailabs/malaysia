import {spawn} from 'node:child_process';
import {mkdir,writeFile,readFile} from 'node:fs/promises';
const url=process.argv[2]||'https://malaysia.ismailstudio.my/';const label=process.argv[3]||'baseline';
const dir=`output/v2/${label}/performance`;await mkdir(dir,{recursive:true});const results=[];
for(const mode of ['mobile','desktop']){
 const args=['node_modules/lighthouse/cli/index.js',url,'--chrome-path=C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe','--chrome-flags=--headless --no-sandbox','--output=json',`--output-path=${dir}/${mode}.json`,'--only-categories=performance,accessibility,best-practices,seo','--quiet'];if(mode==='desktop')args.push('--preset=desktop');
 const code=await new Promise((resolve,reject)=>{const c=spawn(process.execPath,args,{stdio:'inherit',env:{...process.env,CHROME_PATH:'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'}});c.once('exit',resolve);c.once('error',reject)});
 if(code!==0)throw Error(`Lighthouse ${mode} exited ${code}`);
 const j=JSON.parse(await readFile(`${dir}/${mode}.json`,'utf8'));results.push({mode,url,fetchTime:j.fetchTime,scores:Object.fromEntries(Object.entries(j.categories).map(([k,v])=>[k,v.score*100])),lcp:j.audits['largest-contentful-paint'].numericValue,cls:j.audits['cumulative-layout-shift'].numericValue,tbt:j.audits['total-blocking-time'].numericValue,bytes:j.audits['total-byte-weight'].numericValue});
}
await writeFile(`${dir}/summary.json`,JSON.stringify(results,null,2));console.log(JSON.stringify(results));
