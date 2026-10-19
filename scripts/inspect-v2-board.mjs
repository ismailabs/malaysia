import {chromium} from 'playwright';
import {readFile,writeFile} from 'node:fs/promises';
const browser=await chromium.launch({channel:'msedge',headless:true});const page=await browser.newPage({viewport:{width:1440,height:1000}});
let html=await readFile('output/v2/compare.html','utf8');
const pairs=[['Mobile gallery','baseline/gallery-mobile.png','final/gallery-390-75.png'],['Mobile studio','baseline/studio-mobile.png','final/studio-390-100.png'],['Kuala Lumpur desktop','baseline/kuala-lumpur-1440.png','final/destination-kuala-lumpur-1440.png'],['Kuala Lumpur mobile','baseline/kuala-lumpur-390.png','final/destination-kuala-lumpur-390.png']];
let extra='';for(const [label,before,after] of pairs){extra+=`<h2>${label}</h2><section class="pair">`;for(const path of [before,after]){const data=await readFile('output/v2/'+path);extra+=`<figure><figcaption>${path}</figcaption><img src="data:image/png;base64,${data.toString('base64')}" alt="${label}"></figure>`}extra+='</section>'}
html=html.replace('</main>',extra+'</main>');await writeFile('output/v2/compare.html',html);
await page.setContent(html,{waitUntil:'load'});await page.locator('img').evaluateAll(es=>Promise.all(es.map(i=>i.decode())));
const broken=await page.locator('img').evaluateAll(es=>es.filter(i=>!i.naturalWidth).length);if(broken)throw Error('Broken board images');
await page.screenshot({path:'output/v2/compare-first-fold.png'});
await page.getByRole('heading',{name:'First fold · mobile',exact:true}).scrollIntoViewIfNeeded();await page.screenshot({path:'output/v2/compare-mobile.png'});
await browser.close();console.log('Inspected 18 embedded comparison images; desktop/mobile/gallery/studio/destination pairs render.');
