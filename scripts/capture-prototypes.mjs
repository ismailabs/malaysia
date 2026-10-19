import {chromium} from 'playwright';
import {writeFile} from 'node:fs/promises';
const browser=await chromium.launch({channel:'msedge',headless:true});const report=[];
for(const concept of ['a','b'])for(const width of [1440,390]){
 const dir=`output/v2/prototypes/${concept}`;
 const context=await browser.newContext({viewport:{width,height:width===390?844:900},recordVideo:width===1440?{dir,size:{width:960,height:600}}:undefined});
 const page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(String(e)));page.on('console',m=>{if(m.type()==='error')errors.push(m.text())});
 const url=`http://127.0.0.1:8001/${dir}/`;await page.goto(url,{waitUntil:'networkidle'});await page.waitForFunction(()=>document.documentElement.dataset.ready==='true');
 for(const [name,progress] of [['initial',0],['middle',.5],['final',1]]){
  await page.evaluate(p=>{const t=ScrollTrigger.getAll()[0];window.scrollTo(0,t.start+(t.end-t.start)*p)},progress);
  await page.evaluate(()=>new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r))));
  await page.screenshot({path:`${dir}/${name==='initial'?(width===1440?'desktop':'mobile'):`${name}-${width}`}.png`});
  // Record a real native scroll through the scene, not seeking the timeline.
  if(width===1440&&progress===0)for(let y=0;y<1200;y+=40){await page.mouse.wheel(0,40);await page.evaluate(()=>new Promise(r=>requestAnimationFrame(r)))}
 }
 await page.getByRole('button',{name:'Pause movement',exact:true}).click();
 if(await page.evaluate(()=>ScrollTrigger.getAll().length)!==0)throw Error('Pause failed');
 await page.emulateMedia({reducedMotion:'reduce'});await page.getByRole('button',{name:'Resume movement',exact:true}).click();
 if(await page.evaluate(()=>ScrollTrigger.getAll().length)!==0)throw Error('Reduced motion failed');
 await page.keyboard.press('Tab');
 const destination=concept==='a'?'kuala-lumpur':'sabah';
 await Promise.all([page.waitForURL(u=>u.pathname===`/destinations/${destination}/`),page.locator(`.map nav a[href="/destinations/${destination}/"]`).click()]);
 if(await page.locator('h1').count()!==1)throw Error('Prototype destination did not load');
 const video=page.video();await context.close();if(video)await video.saveAs(`${dir}/motion.webm`);
 report.push({concept,width,url,browser:browser.version(),errors,states:3,pause:true,reduced:true});
}
await browser.close();await writeFile('output/v2/prototypes/browser-results.json',JSON.stringify(report,null,2));console.log(JSON.stringify(report));
