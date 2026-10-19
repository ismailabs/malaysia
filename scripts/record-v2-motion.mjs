import {chromium} from 'playwright';
import {writeFile,mkdir} from 'node:fs/promises';
const browser=await chromium.launch({channel:'msedge',headless:true});const base=process.argv[2]||'http://127.0.0.1:8003/';const out='output/v2/final';await mkdir(out,{recursive:true});const results=[];
for(const [name,startId,endId] of [['map','map','map'],['gallery','gallery-kuala-lumpur','gallery-sabah'],['studio','studio','studio']]){
 const context=await browser.newContext({viewport:{width:1440,height:900},recordVideo:{dir:out,size:{width:960,height:600}}});const page=await context.newPage();
 await page.goto(base,{waitUntil:'networkidle'});await page.waitForFunction(()=>document.documentElement.dataset.ready==='true');
 const bounds=await page.evaluate(({startId,endId})=>({start:ScrollTrigger.getById(startId).start,end:ScrollTrigger.getById(endId).end}),{startId,endId});
 await page.evaluate(y=>scrollTo(0,y),bounds.start);
 const frames=[];for(let i=0;i<120;i++){
  await page.mouse.wheel(0,(bounds.end-bounds.start)/119);
  await page.evaluate(()=>new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r))));
  if(i%24===0)await page.screenshot({path:`${out}/${name}-recording-frame-${i}.png`});
  frames.push(await page.evaluate(()=>({scroll:scrollY,time:performance.now()})));
 }
 const video=page.video();await context.close();await video.saveAs(`${out}/${name}-motion.webm`);results.push({name,base,bounds,frames});
}
await browser.close();await writeFile(`${out}/motion-observations.json`,JSON.stringify({time:new Date().toISOString(),browser:'Edge 155, emulated desktop; native wheel; frame times include automation overhead, not physical FPS',results},null,2));console.log('Recorded three native-scroll scene playthroughs');
