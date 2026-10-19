import {chromium,firefox,webkit} from 'playwright';
import AxeBuilder from '@axe-core/playwright';
import assert from 'node:assert/strict';
import {mkdir,writeFile} from 'node:fs/promises';
const base=new URL(process.argv[2]||'http://127.0.0.1:8001/');const label=process.argv[3]||'local';
const out=`output/v2/release/${label}`;await mkdir(out,{recursive:true});
const full=!process.argv.includes('--smoke');const routes=['/','/destinations/kuala-lumpur/','/destinations/george-town/','/destinations/langkawi/','/destinations/sabah/','/credits/'];
const results=[],external=new Set(),runtime=[],cancelled=[];let assertions=0;
const check=(condition,message)=>{assertions++;assert.ok(condition,message)};
async function record(name,fn){try{const detail=await fn();results.push({name,status:'pass',...detail});console.log('PASS',name)}catch(error){results.push({name,status:'fail',error:String(error)});console.error('FAIL',name,String(error))}}
const settle=p=>p.evaluate(()=>new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r))));
async function open(context,route,js=true){const page=await context.newPage();const errors=[];
 page.on('pageerror',e=>errors.push(String(e)));page.on('console',m=>{if(m.type()==='error')errors.push(m.text())});
 page.on('request',r=>{if(new URL(r.url()).origin!==base.origin)external.add(r.url())});
 page.on('requestfailed',r=>{if(r.failure()?.errorText==='net::ERR_ABORTED')cancelled.push(r.url());else errors.push(r.url()+': '+r.failure()?.errorText)});
 const response=await page.goto(new URL(route,base).href,{waitUntil:'load',timeout:45000});check(response.status()===200,`HTTP ${route}`);
 if(js)await page.waitForFunction(()=>document.documentElement.dataset.ready==='true');
 await page.locator('img[loading=eager]').evaluateAll(imgs=>Promise.all(imgs.map(i=>i.decode())));
 return {page,errors};}
async function content(page){check(await page.locator('h1').count()===1,'One H1');check(await page.locator('h1').isVisible(),'Visible H1');
 check(await page.locator('link[rel=canonical]').getAttribute('href')==='https://malaysia.ismailstudio.my'+new URL(page.url()).pathname,'Canonical');
 check(await page.locator('meta[name=description]').getAttribute('content'),'Description');
 check(await page.locator('a[data-cta-placement]').count()>=3,'Studio CTA placements');
 check(await page.locator('a[data-cta-placement]').evaluateAll(as=>as.every(a=>a.href==='https://ismailstudio.my/')),'Studio URL');
 const layout=await page.evaluate(()=>({width:innerWidth,scroll:document.documentElement.scrollWidth}));check(layout.scroll<=layout.width+1,`Overflow ${JSON.stringify(layout)}`);
 const headings=await page.locator('h1,h2,h3').evaluateAll(els=>els.filter(e=>!e.closest('dialog:not([open])')).map(e=>{const r=document.createRange();r.selectNodeContents(e);const tops=[];for(const b of r.getClientRects())if(b.height>1&&!tops.some(t=>Math.abs(t-b.top)<3))tops.push(b.top);return {text:e.textContent,lines:tops.length}}).filter(e=>e.lines>2));check(headings.length===0,`Headings exceed two lines ${JSON.stringify(headings)}`);
 check(await page.locator('script[type="application/ld+json"]').evaluateAll(es=>es.every(e=>{try{JSON.parse(e.textContent);return true}catch{return false}})),'JSON-LD parses');
}
const browser=await chromium.launch({channel:'msedge',headless:true});
try{
 for(const width of full?[320,390,768,1024,1440,1920]:[390,1440]){
  const context=await browser.newContext({viewport:{width,height:width===390?844:width===320?720:width===768?1024:width===1920?1080:900},hasTouch:width<=390});
  for(const route of routes)await record(`normal ${width} ${route}`,async()=>{const {page,errors}=await open(context,route);await content(page);
   if(route==='/'){
    check(await page.locator('[data-signature]').count()===3,'Three signature scenes');
    check(await page.locator('.world').count()===4,'Four photographic worlds');
    for(const id of ['map','gallery-kuala-lumpur','gallery-george-town','gallery-langkawi','gallery-sabah','studio']){
     const states=[];for(const progress of [0,.25,.5,.75,1]){
      await page.evaluate(({id,progress})=>{const t=ScrollTrigger.getById(id);window.scrollTo(0,t.start+(t.end-t.start)*progress)},{id,progress});await settle(page);
      states.push(await page.evaluate(id=>{const t=ScrollTrigger.getById(id);return {progress:t.progress,animation:t.animation.progress()}},id));
      if(id==='map')check(await page.locator('.map-destinations').evaluate(e=>{let opacity=1;for(let n=e;n;n=n.parentElement)opacity*=Number(getComputedStyle(n).opacity);return opacity>.99}),'Map navigation keeps full contrast through the transition');
     }check(states.at(-1).progress>.98&&states[0].progress<.02,`Native scene completes ${id}`);
    }
   }
   const h=await page.evaluate(()=>document.documentElement.scrollHeight);for(let y=0;y<h;y+=750){await page.evaluate(y=>scrollTo(0,y),y);await settle(page)}
   check(errors.length===0,errors.join('; '));await page.close();return {errors};
  });await context.close();
 }
 for(const mode of ['reduce','no-js'])for(const width of [390,1440]){
  const context=await browser.newContext({viewport:{width,height:width===390?844:900},reducedMotion:'reduce',javaScriptEnabled:mode!=='no-js'});
  for(const route of routes)await record(`${mode} ${width} ${route}`,async()=>{const {page,errors}=await open(context,route,mode!=='no-js');await content(page);
   if(mode==='reduce')check(await page.evaluate(()=>ScrollTrigger.getAll().length)===0,'No reduced-motion ScrollTriggers');else check(await page.locator('.places-fallback').isVisible(),'No-JS navigation');
   if(mode==='reduce'){
    const axe=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze();
    await writeFile(`${out}/axe-${width}-${route.replaceAll('/','_')||'home'}.json`,JSON.stringify(axe,null,2));
    check(axe.violations.length===0,`axe ${JSON.stringify(axe.violations.map(v=>({id:v.id,impact:v.impact,nodes:v.nodes.map(n=>n.target)})))}`);
   }
   check(errors.length===0,errors.join('; '));await page.close();return {errors};
  });await context.close();
 }
 await record('keyboard navigation, history, privacy and four destination interactions',async()=>{
  const context=await browser.newContext({viewport:{width:1440,height:900},reducedMotion:'reduce'});let {page}=await open(context,'/?email=not-collected');
  await page.keyboard.press('Tab');check(await page.locator('.skip-link').evaluate(e=>e===document.activeElement),'Skip link first');await page.keyboard.press('Enter');check(await page.locator('#main').evaluate(e=>e===document.activeElement),'Skip focuses main');
  await page.locator('.menu-button').focus();await page.keyboard.press('Enter');check(await page.locator('#place-menu').evaluate(e=>e.open),'Menu opens');for(let i=0;i<12;i++){await page.keyboard.press('Tab');check(await page.evaluate(()=>!!document.activeElement.closest('#place-menu')),'Dialog tab containment')};await page.keyboard.press('Escape');check(await page.locator('.menu-button').evaluate(e=>e===document.activeElement),'Escape focus return');
  check(await page.locator('.map-destinations a').count()===4,'Four accessible map links');
  await page.locator('.atlas-bottom a').click();await page.waitForURL(u=>u.hash==='#journey');await page.goto(new URL('/#places',base).href);await page.goBack();check(new URL(page.url()).hash==='#journey','Back hash');await page.goForward();check(new URL(page.url()).hash==='#places','Forward hash');
  await page.evaluate(()=>{window.__outbound=[];window.addEventListener('malaysia:portfolio_outbound_click',e=>__outbound.push(e.detail));document.addEventListener('click',e=>{if(e.target.closest('a[data-cta-placement]'))e.preventDefault()})});
  const ctas=page.locator('a[data-cta-placement]');const count=await ctas.count();for(let i=0;i<count;i++)await ctas.nth(i).click();const events=await page.evaluate(()=>__outbound);check(events.length===count,'One private hook per CTA');check(events.every(e=>e.source_path==='/'&&e.destination_host==='ismailstudio.my'&&e.consent_state==='no-collection'&&!JSON.stringify(e).includes('email')),'PII/query excluded');check((await context.cookies()).length===0,'No cookies');await writeFile(`${out}/cta-events.json`,JSON.stringify(events,null,2));await page.close();
  for(const slug of ['kuala-lumpur','george-town','langkawi','sabah']){
   ({page}=await open(context,`/destinations/${slug}/`));
   if(slug==='kuala-lumpur'||slug==='george-town'){await page.locator('.act-control').focus();await page.keyboard.press('Enter');check(await page.locator('.act-control').getAttribute('aria-pressed')==='true',`${slug} keyboard state`);const target=slug==='kuala-lumpur'?'.city-street':'.heritage-shutters i';check(await page.locator(target).evaluateAll(es=>es.some(e=>getComputedStyle(e).transform!=='none'||getComputedStyle(e).clipPath==='inset(0% 0px 0px)')),'Actual visual state changes')}
   if(slug==='langkawi'){const range=page.getByRole('slider');await range.focus();await page.keyboard.press('End');check(await range.inputValue()==='100','Waterline keyboard End');check(await page.locator('.destination-act').getAttribute('data-waterline')==='100','Waterline renders')}
   if(slug==='sabah'){await page.getByRole('button',{name:'Forest stream',exact:true}).focus();await page.keyboard.press('Enter');check(await page.locator('.destination-act').getAttribute('data-perspective')==='forest','Forest perspective renders');check((await page.locator('.sabah-subtitle').innerText()).includes('Beside a stream'),'Forest has correct location context')}
   await page.close();
  }await context.close();return {events:events.length,destinationActs:4};
 });
 await record('motion preference changes, pause persists and cleanup has no duplicates',async()=>{
  const context=await browser.newContext({viewport:{width:1440,height:900}});const {page}=await open(context,'/');const initial=await page.evaluate(()=>ScrollTrigger.getAll().length);check(initial===6,'Six controlled scenes');
  await page.emulateMedia({reducedMotion:'reduce'});await page.waitForFunction(()=>ScrollTrigger.getAll().length===0);check(!await page.locator('body').evaluate(e=>e.classList.contains('motion-live')),'Static in-flow mode');
  await page.emulateMedia({reducedMotion:'no-preference'});await page.waitForFunction(()=>ScrollTrigger.getAll().length===6);
  const pause=page.locator('.motion-controls .motion-toggle');await pause.click();check(await page.evaluate(()=>ScrollTrigger.getAll().length)===0,'Pause removes scenes');await page.emulateMedia({reducedMotion:'reduce'});await page.emulateMedia({reducedMotion:'no-preference'});check(await page.evaluate(()=>ScrollTrigger.getAll().length)===0,'Pause persists across preference changes');await pause.click();check(await page.evaluate(()=>ScrollTrigger.getAll().length)===6,'Resume has no duplicates');await context.close();
 });
 await record('200 percent zoom equivalent',async()=>{const context=await browser.newContext({viewport:{width:720,height:450},deviceScaleFactor:2,reducedMotion:'reduce'});for(const route of routes){const {page}=await open(context,route);await content(page);await page.close()}await context.close()});
 await record('HTTP assets, private paths, status and metadata',async()=>{
  const context=await browser.newContext();const titles=new Set();const assets=new Set();for(const route of routes){const {page}=await open(context,route);titles.add(await page.title());for(const url of await page.locator('img,script[src],link[rel=stylesheet],link[rel=preload]').evaluateAll(es=>es.map(e=>e.src||e.href)))assets.add(url);await page.close()}check(titles.size===routes.length,'Unique titles');
  for(const asset of assets){const r=await context.request.get(asset);check(r.status()===200,`Asset ${asset}`)}
  for(const path of ['/missing-place-qa/','/AGENTS.md','/.env','/.agents/skills/design-taste-frontend/SKILL.md','/codex-handoff/START-HERE.md','/codex-handoff-v2/CODEX-EXECUTE.md','/output/v2/evidence.json','/package.json','/scripts/generate_site.py','/wrangler.jsonc']){const r=await context.request.get(new URL(path,base).href);check(r.status()===404,`Private path ${path} ${r.status()}`)}await context.close();return {assets:assets.size,titles:titles.size};
 });
 if(full)for(const [engine,name] of [[firefox,'Firefox'],[webkit,'WebKit']]){
  let other;try{other=await engine.launch({headless:true})}catch(e){results.push({name,status:'unavailable',reason:String(e)});continue}
  await record(`${name} all routes and menu`,async()=>{const context=await other.newContext({viewport:{width:390,height:844},reducedMotion:'reduce'});for(const route of routes){const {page,errors}=await open(context,route);await content(page);check(errors.length===0,errors.join('; '));await page.close()}const {page}=await open(context,'/');await page.locator('.menu-button').click();check(await page.locator('#place-menu').evaluate(e=>e.open),'Other engine menu');await page.keyboard.press('Escape');await context.close()});await other.close();
 }
}finally{await browser.close()}
const report={time:new Date().toISOString(),base:base.href,full,browser:'Edge/Chromium',assertions,cases:results.length,passed:results.filter(r=>r.status==='pass').length,failures:results.filter(r=>r.status==='fail'),unavailable:results.filter(r=>r.status==='unavailable'),externalRequests:[...external],cancelled,results};
await writeFile(`${out}/browser-tests.json`,JSON.stringify(report,null,2));console.log(JSON.stringify({assertions,cases:report.cases,passed:report.passed,failures:report.failures,unavailable:report.unavailable.map(r=>r.name),externalRequests:report.externalRequests}));process.exitCode=report.failures.length?1:0;
