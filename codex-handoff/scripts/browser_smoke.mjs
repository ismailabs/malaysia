// Optional Playwright smoke suite. Uses a separately available `playwright` Node package.
// Does not install dependencies. Run against a local/preview/production URL after site exists:
//   node codex-handoff/scripts/browser_smoke.mjs http://127.0.0.1:8000/
// The installed Codex Playwright skill may support a different runner — use its instructions.
import { createRequire } from 'node:module';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';
const require = createRequire(import.meta.url);
let chromium;
try { ({ chromium } = require('playwright')); }
catch (err) { console.error('Missing `playwright` Node package; consult the installed Playwright skill. Nothing installed automatically.'); process.exit(2); }
const input = process.argv[2] || 'http://127.0.0.1:8000/';
const base = new URL(input);
if (!['http:', 'https:'].includes(base.protocol)) throw new Error('Only http/https allowed');
const routes = ['/', '/destinations/kuala-lumpur/', '/destinations/george-town/', '/destinations/langkawi/', '/destinations/sabah/'];
const views = [{name:'mobile', width:390,height:844},{name:'tablet',width:768,height:1024},{name:'desktop',width:1440,height:900}];
const output = path.resolve('codex-handoff/progress/browser-shots');
await mkdir(output,{recursive:true});
const browser = await chromium.launch({ headless: true });
let failures = 0;
try {
  for (const viewport of views) {
    const context = await browser.newContext({viewport:{width:viewport.width,height:viewport.height},reducedMotion:'reduce'});
    for (const route of routes) {
      const page = await context.newPage();
      const errors = [];
      page.on('pageerror', e => errors.push(String(e)));
      const response = await page.goto(new URL(route,base).toString(),{waitUntil:'domcontentloaded',timeout:25000});
      if (response?.status() !== 200) { console.error('FAIL status',viewport.name,route,response?.status()); failures++; }
      const h1 = await page.locator('h1').count();
      if (h1 !== 1) { console.error('FAIL h1',viewport.name,route,h1); failures++; }
      const hasStudio = await page.locator('a[href^="https://ismailstudio.my/"]').count();
      if (!hasStudio) { console.error('FAIL CTA',viewport.name,route); failures++; }
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 2);
      if (overflow) { console.error('FAIL overflow',viewport.name,route); failures++; }
      await page.screenshot({path:path.join(output, `${viewport.name}-${route==='/'?'home':route.split('/').filter(Boolean).pop()}.png`),fullPage:true});
      if (errors.length) { console.error('FAIL runtime',viewport.name,route,errors); failures += errors.length; }
      await page.close();
    }
    await context.close();
  }
} finally { await browser.close(); }
console.log(`Browser smoke ${failures?'FAILED':'PASSED'}: ${failures} error(s), screenshots in ${output}`);
process.exitCode = failures ? 1 : 0;
