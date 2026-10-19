import {chromium} from 'playwright';
import {mkdir,writeFile} from 'node:fs/promises';
const base=process.argv[2]||'http://127.0.0.1:8001/';const label=process.argv[3]||'round1';const out=`output/v2/${label}`;await mkdir(out,{recursive:true});
const browser=await chromium.launch({channel:'msedge',headless:true});const observations=[];
const settle=page=>page.evaluate(()=>new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r))));
for(const width of [1440,390]){
 const context=await browser.newContext({viewport:{width,height:width===390?844:900},recordVideo:{dir:out,size:{width:width===390?390:960,height:width===390?844:600}}});
 const page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(String(e)));page.on('console',m=>{if(m.type()==='error')errors.push(m.text())});
 await page.goto(base,{waitUntil:'networkidle'});await page.waitForFunction(()=>document.documentElement.dataset.ready==='true');
 for(const [name,id] of [['map','map'],['gallery','gallery-kuala-lumpur'],['george-town','gallery-george-town'],['langkawi','gallery-langkawi'],['sabah','gallery-sabah'],['studio','studio']]){
  for(const progress of [0,.25,.5,.75,1]){
   await page.evaluate(({id,progress})=>{const s=ScrollTrigger.getById(id);window.scrollTo(0,s.start+(s.end-s.start)*progress)}, {id,progress});await settle(page);
   const file=`${out}/${name}-${width}-${progress*100}.png`;await page.screenshot({path:file});
  }
 }
 // Real wheel progression recorded separately from exact waypoint captures.
 await page.evaluate(()=>window.scrollTo(0,0));
 for(let i=0;i<45;i++){await page.mouse.wheel(0,40);await settle(page)}
 const video=page.video();await context.close();await video.saveAs(`${out}/home-motion-${width}.webm`);
 const still=await browser.newContext({viewport:{width,height:width===390?844:900},reducedMotion:'reduce'});const p=await still.newPage();
 await p.goto(base,{waitUntil:'networkidle'});await p.screenshot({path:`${out}/reduced-${width}.png`,fullPage:true});
 for(const slug of ['kuala-lumpur','george-town','langkawi','sabah']){
  await p.goto(new URL(`destinations/${slug}/`,base).href,{waitUntil:'networkidle'});await p.waitForFunction(()=>document.documentElement.dataset.ready==='true');
  await p.screenshot({path:`${out}/destination-${slug}-${width}.png`});
  if(slug==='kuala-lumpur'||slug==='george-town')await p.locator('.act-control').click();
  if(slug==='langkawi'){await p.getByRole('slider').fill('100');await p.getByRole('slider').dispatchEvent('input')}
  if(slug==='sabah')await p.getByRole('button',{name:'Forest stream',exact:true}).click();
  await settle(p);await p.locator('.destination-act').screenshot({path:`${out}/destination-${slug}-${width}-interaction.png`});
 }
 await still.close();observations.push({width,base,browser:browser.version(),errors});
}
await browser.close();await writeFile(`${out}/capture-log.json`,JSON.stringify({time:new Date().toISOString(),observations},null,2));console.log(JSON.stringify(observations));
