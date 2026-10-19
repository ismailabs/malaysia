import {chromium} from 'playwright';
import {writeFile} from 'node:fs/promises';
const browser=await chromium.launch({channel:'msedge',headless:true});const page=await browser.newPage({viewport:{width:960,height:640}});const observations=[];
for(const name of ['map','gallery','studio']){
 await page.setContent(`<body style="margin:0;background:#07191d"><video muted preload="auto" style="width:960px;height:600px" src="http://127.0.0.1:8001/output/v2/final/${name}-motion.webm"></video></body>`);
 await page.locator('video').evaluate(video=>new Promise((resolve,reject)=>{if(video.readyState>=2)resolve();else{video.onloadeddata=resolve;video.onerror=()=>reject(Error('Video decode failed'))}}));
 const duration=await page.locator('video').evaluate(v=>v.duration);
 for(const fraction of [.2,.4,.6,.8,.95]){
  await page.locator('video').evaluate((v,t)=>new Promise(resolve=>{v.onseeked=resolve;v.currentTime=t}),duration*fraction);
  await page.locator('video').screenshot({path:`output/v2/final/${name}-decoded-${Math.round(fraction*100)}.png`});
 }observations.push({name,duration,decoded:true,frames:5});
}
await browser.close();await writeFile('output/v2/final/video-review.json',JSON.stringify({time:new Date().toISOString(),observations},null,2));console.log(JSON.stringify(observations));
