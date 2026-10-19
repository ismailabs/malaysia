import {chromium} from 'playwright';
import assert from 'node:assert/strict';
import {writeFile} from 'node:fs/promises';
const origin=process.argv[2]||'https://malaysia.ismailstudio.my/';const label=process.argv[3]||'local';const browser=await chromium.launch({channel:'msedge',headless:true});const journeys=[];
try{for(const [width,height,js,motion] of [[1440,900,true,'no-preference'],[1264,716,true,'no-preference'],[1920,720,true,'no-preference'],[390,844,true,'no-preference'],[1440,900,true,'reduce'],[390,844,true,'reduce'],[390,844,false,'reduce']]){
 const context=await browser.newContext({viewport:{width,height},reducedMotion:motion,javaScriptEnabled:js});
 const page=await context.newPage();
 for(const slug of ['kuala-lumpur','george-town','langkawi','sabah']){
  console.log('CHECK',width,height,js,motion,slug);
  await page.goto(origin,{waitUntil:'load'});if(js)await page.waitForFunction(()=>document.documentElement.dataset.ready==='true');
  const geometry=await page.evaluate(()=>{const nav=document.querySelector('.map-destinations').getBoundingClientRect();const title=document.querySelector('.atlas-title').getBoundingClientRect();const credit=document.querySelector('.atlas-credit').getBoundingClientRect();const control=document.querySelector('.motion-controls').getBoundingClientRect();return {navBottom:nav.bottom,titleTop:title.top,creditOverlap:control.left<credit.right&&control.right>credit.left&&control.top<credit.bottom&&control.bottom>credit.top}});
  assert.ok(geometry.navBottom<=geometry.titleTop,`${width}x${height}: map links overlap title`);assert.equal(geometry.creditOverlap,false,'Motion control overlaps hero credit');
  if(slug==='kuala-lumpur')await page.screenshot({path:`output/v2/release/map-layout-${label}-${width}-${height}-${js?motion:'no-js'}.png`});
  await Promise.all([page.waitForURL(u=>u.pathname===`/destinations/${slug}/`,{waitUntil:'load'}),page.locator(`.map-destinations a[href="/destinations/${slug}/"]`).click()]);if(js)await page.waitForFunction(()=>document.documentElement.dataset.ready==='true');
  assert.equal(await page.locator(`[data-act-scene="${slug}"]`).count(),1);const title=await page.title();
  await page.goBack({waitUntil:'load'});assert.equal(new URL(page.url()).pathname,'/');if(js)await page.waitForFunction(()=>document.documentElement.dataset.ready==='true');assert.equal(await page.locator('.map-destinations a').count(),4);
  await page.goForward({waitUntil:'load'});assert.equal(new URL(page.url()).pathname,`/destinations/${slug}/`);assert.equal(await page.title(),title);
  journeys.push({width,height,motion,javaScript:js,destination:slug,back:'/',forward:new URL(page.url()).pathname,title,geometry});
 }
 if(js){await page.goto(origin,{waitUntil:'load'});await page.waitForFunction(()=>document.documentElement.dataset.ready==='true');await page.locator('.skip-opening').click();await page.waitForURL(u=>u.hash==='#places');assert.equal(await page.evaluate(()=>document.activeElement.id),'worlds-title')}
 await context.close();
}}finally{await browser.close()}
await writeFile(`output/v2/release/destination-history-${label}.json`,JSON.stringify({time:new Date().toISOString(),origin,journeys,openingSkipVerified:true},null,2));console.log(JSON.stringify({destinationBackForwardJourneys:journeys.length,openingSkip:true,origin}));
