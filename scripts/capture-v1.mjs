import {chromium} from 'playwright';
import {mkdir,writeFile,access} from 'node:fs/promises';
try{await access('output/v2/baseline/observations.json');throw new Error('Frozen V1 baseline already exists; refusing to overwrite')}catch(e){if(e.code!=='ENOENT')throw e}
const out='output/v2/baseline'; await mkdir(out,{recursive:true});
const browser=await chromium.launch({channel:'msedge',headless:true});
const report={time:new Date().toISOString(),source:'https://malaysia.ismailstudio.my/',commit:'8f1643370ea1bfe532d1c36a390bad6ec56b8c02',browser:browser.version(),captures:[],errors:[]};
for(const width of [1440,390]){
 const context=await browser.newContext({viewport:{width,height:width===390?844:900},recordVideo:{dir:out,size:{width:width===390?390:960,height:width===390?844:600}}});
 const page=await context.newPage();page.on('pageerror',e=>report.errors.push(String(e)));
 await page.goto(report.source,{waitUntil:'networkidle'});await page.waitForFunction(()=>document.documentElement.dataset.ready==='true');await page.evaluate(()=>document.fonts.ready);
 await page.screenshot({path:`${out}/${width===1440?'desktop':'mobile'}.png`});
 for(const [name,selector] of [['gallery','#streets'],['studio','#studio']]){
  await page.locator(selector).scrollIntoViewIfNeeded();await page.evaluate(()=>new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r))));
  await page.screenshot({path:`${out}/${name}${width===390?'-mobile':''}.png`});
 }
 await page.goto(new URL('/destinations/kuala-lumpur/',report.source).href,{waitUntil:'networkidle'});
 await page.screenshot({path:`${out}/kuala-lumpur-${width}.png`});
 await context.close();report.captures.push({width,height:width===390?844:900});
}
for(const route of ['/','/destinations/sabah/?from=v2%20baseline&x=a%2Fb']){
 const r=await browser.newPage();const response=await r.request.get('https://malaysia-between-places.vercel.app'+route,{maxRedirects:0});report[route]={status:response.status(),location:response.headers().location};await r.close();
}
await writeFile(`${out}/observations.json`,JSON.stringify(report,null,2));await browser.close();console.log(JSON.stringify(report));
