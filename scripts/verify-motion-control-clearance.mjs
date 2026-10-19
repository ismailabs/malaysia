import {chromium} from 'playwright';
import assert from 'node:assert/strict';
import {writeFile} from 'node:fs/promises';
const base=process.argv[2]||'http://127.0.0.1:8003/';const label=process.argv[3]||'local';const browser=await chromium.launch({channel:'msedge',headless:true});const results=[];
try{for(const width of [320,390,768,1024,1440,1920]){
 const page=await browser.newPage({viewport:{width,height:width===390?844:width===320?720:width===1920?1080:900}});
 await page.goto(base,{waitUntil:'load'});await page.waitForFunction(()=>document.documentElement.dataset.ready==='true');
 for(const slug of ['kuala-lumpur','george-town','langkawi','sabah'])for(const progress of [.5,1]){
  await page.evaluate(({slug,progress})=>{const t=ScrollTrigger.getById('gallery-'+slug);scrollTo(0,t.start+(t.end-t.start)*progress)},{slug,progress});
  await page.evaluate(()=>new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r))));
  const data=await page.evaluate(slug=>{const control=document.querySelector('.motion-controls').getBoundingClientRect();const p=document.querySelector(`[data-world="${slug}"] .world-note p`).getBoundingClientRect();const link=document.querySelector(`[data-world="${slug}"] .world-note a`).getBoundingClientRect();const overlap=r=>control.left<r.right&&control.right>r.left&&control.top<r.bottom&&control.bottom>r.top;return {textOverlap:overlap(p),linkOverlap:overlap(link),controlBottom:control.bottom,textBottom:p.bottom,linkBottom:link.bottom}},slug);
  assert.equal(data.textOverlap,false,`${width} ${slug} ${progress}: pause overlaps narrative`);assert.equal(data.linkOverlap,false,`${width} ${slug} ${progress}: pause overlaps link`);results.push({width,slug,progress,...data});
 }
 if(width===1440)await page.screenshot({path:`output/v2/release/clearance-${label}.png`});await page.close();
}}finally{await browser.close()}
await writeFile(`output/v2/release/clearance-${label}.json`,JSON.stringify({time:new Date().toISOString(),base,checks:results.length,results},null,2));console.log(JSON.stringify({clearanceChecks:results.length,failures:0,base}));
