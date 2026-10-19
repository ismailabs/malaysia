// Equivalent scene evidence when the skill's CDP montage capture is unavailable.
import { chromium } from 'playwright';
import assert from 'node:assert/strict';
import { mkdir,writeFile } from 'node:fs/promises';
const url=process.argv[2]||'http://127.0.0.1:8001/';
const out='output/scene-audit';await mkdir(out,{recursive:true});
const browser=await chromium.launch({channel:'msedge'});const results=[];
try {
 for(const [label,viewport,reduced] of [['desktop',{width:1440,height:900},false],['phone',{width:390,height:844},false],['reduced',{width:1440,height:900},true]]){
  const context=await browser.newContext({viewport,hasTouch:label==='phone',isMobile:label==='phone',reducedMotion:reduced?'reduce':'no-preference'});
  const page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(String(e)));
  await page.goto(url);await page.waitForFunction(()=>document.documentElement.dataset.ready==='true');
  const state=await page.locator('#coast').evaluate(e=>({top:e.getBoundingClientRect().top+scrollY,height:e.getBoundingClientRect().height,live:e.classList.contains('is-live'),rest:e.classList.contains('is-rest')}));
  assert.equal(state.live,label==='desktop');assert.equal(state.rest,label!=='desktop');
  if(reduced)assert.equal(await page.evaluate(()=>ScrollTrigger.getAll().length),0);
  const span=Math.max(0,state.height-viewport.height);const points=[{label:'before',y:state.top-viewport.height*.5},...Array.from({length:11},(_,i)=>({label:`${i*10}%`,y:state.top+span*i/10})),{label:'after',y:state.top+span+viewport.height*.6}];
  const frames=[];
  for(let i=0;i<points.length;i++){
   const point=points[i];await page.evaluate(y=>scrollTo(0,y),point.y);
   await page.waitForFunction(()=>{const st=ScrollTrigger.getAll().find(t=>t.trigger===document.querySelector('#coast'));return !st||Math.abs(st.progress-st.animation.progress())<.015;});
   await page.locator('.coast-photo img').evaluate(img=>img.decode());
   const file=`${out}/${label}-${String(i).padStart(2,'0')}.jpg`;await page.screenshot({path:file,type:'jpeg',quality:78});frames.push({file,label:point.label});
  }
  assert.equal(errors.length,0,errors.join('; '));results.push({label,viewport,state,frames,errors});await context.close();console.log(`PASS scene ${label}: ${frames.length} exact progress captures, ${state.live?'live':'static fallback'}`);
 }
}finally{await browser.close();}
await writeFile(`${out}/report.json`,JSON.stringify({time:new Date().toISOString(),url,results},null,2));
