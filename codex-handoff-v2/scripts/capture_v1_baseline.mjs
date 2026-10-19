/**
 * Capture actual current Cloudflare V1 before ANY V2 production deployment.
 * Requires existing project's Playwright dependency and available Edge/Chromium.
 * Usage: node codex-handoff-v2/scripts/capture_v1_baseline.mjs
 * No overwrite of existing captures. The operator MUST verify the site is still V1.
 */
import { chromium } from 'playwright';
import fs from 'node:fs/promises';
import path from 'node:path';

const ORIGIN = 'https://malaysia.ismailstudio.my/';
const repo = path.resolve(import.meta.dirname, '../..');
const dir = path.join(repo, 'output/v2/baseline');
const cases = [
  {name: 'desktop', url: '/', viewport:{width:1440,height:900}, target:'top'},
  {name: 'mobile', url:'/', viewport:{width:390,height:844}, target:'top'},
  {name: 'gallery', url:'/', viewport:{width:1440,height:900}, target:'#places'},
  {name: 'studio', url:'/', viewport:{width:1440,height:900}, target:'#studio'},
];
const routes=['kuala-lumpur','george-town','langkawi','sabah'];
for (const slug of routes) cases.push({name:`route-${slug}`,url:`/destinations/${slug}/`,viewport:{width:1440,height:900},target:'top'});
await fs.mkdir(dir,{recursive:true});
const existing=await fs.readdir(dir);
if(existing.some(name => name.endsWith('.png') || name.endsWith('.json'))) {
  throw new Error('V1 baseline exists: refusing to overwrite. Preserve immutable original captures.');
}
let browser;
try {
  try { browser = await chromium.launch({channel:'msedge',headless:true}); }
  catch { browser = await chromium.launch({headless:true}); }
  const observations=[];
  for (const test of cases) {
    const page = await browser.newPage({viewport:test.viewport,reducedMotion:'reduce'});
    const errors=[];
    page.on('pageerror',e=>errors.push(e.message));
    const url=new URL(test.url,ORIGIN).href;
    const response=await page.goto(url,{waitUntil:'networkidle',timeout:60000});
    await page.evaluate(() => document.fonts.ready);
    await page.locator('img').evaluateAll(async images => {
      await Promise.all(images.filter(img => img.getBoundingClientRect().top < innerHeight * 2).map(img => img.decode().catch(()=>{})));
    });
    if(test.target!=='top') {
      const target=page.locator(test.target);
      if(await target.count())await target.scrollIntoViewIfNeeded();
      else errors.push('missing expected V1 section '+test.target);
    }
    await page.screenshot({path:path.join(dir,test.name+'.png'),fullPage:false,animations:'disabled'});
    observations.push({name:test.name,url,status:response?.status(),viewport:test.viewport,source:'CURRENT V1 URL; verify before running',jsErrors:errors,utc:new Date().toISOString()});
    await page.close();
  }
  await fs.writeFile(path.join(dir,'capture.json'),JSON.stringify(observations,null,2));
  console.log('Wrote existing Cloudflare V1 baseline screenshots to '+dir);
} finally { await browser?.close(); }
