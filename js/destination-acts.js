// Every interaction also has a static/no-JS photographic composition.
export function initDestinationActs(){
 const events=new AbortController();const options={signal:events.signal};
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 const tweens=[];
 const animate=(target,vars)=>{
  if(window.gsap){const tween=window.gsap.to(target,{...vars,duration:reduced.matches?0:.85,ease:'power3.inOut',overwrite:'auto'});tweens.push(tween)}
  else Object.assign(target.style,vars);
 };
 const city=document.querySelector('[data-act="city"]');
 if(city){city.hidden=false;city.addEventListener('click',()=>{
  const open=city.getAttribute('aria-pressed')!=='true';city.setAttribute('aria-pressed',open);
  city.textContent=open?'Look back to the skyline ↕':'Come down to street level ↕';
  document.querySelector('.destination-act').dataset.perspective=open?'street':'skyline';
  animate(document.querySelector('.city-street'),{clipPath:open?'inset(0% 0 0)':'inset(100% 0 0)'});
  animate(document.querySelector('.city-grid'),{xPercent:open?12:0});
 },options)}
 const heritage=document.querySelector('[data-act="heritage"]');
 if(heritage){heritage.hidden=false;heritage.addEventListener('click',()=>{
  const open=heritage.getAttribute('aria-pressed')!=='true';heritage.setAttribute('aria-pressed',open);
  heritage.textContent=open?'Close the shutters ↔':'Open the shutters ↔';
  document.querySelector('.destination-act').dataset.shutters=open?'open':'closed';
  document.querySelectorAll('.heritage-shutters i').forEach((shutter,i)=>animate(shutter,{rotationY:open?-105:0,delay:reduced.matches?0:i*.045}));
 },options)}
 const tide=document.querySelector('.tide-control');
 if(tide){tide.hidden=false;const range=tide.querySelector('input');range.addEventListener('input',()=>{
  const value=Number(range.value);document.querySelector('.destination-act').dataset.waterline=String(value);
  animate(document.querySelector('.tide-picture'),{clipPath:`ellipse(${30+value*.55}% ${30+value*.55}% at 54% 50%)`});
  animate(document.querySelector('.tide-orbits'),{rotation:value*.12});
 },options)}
 const elevation=document.querySelector('.elevation-control');
 if(elevation){elevation.hidden=false;elevation.querySelectorAll('button').forEach(button=>button.addEventListener('click',()=>{
  const forest=button.dataset.elevation==='forest';
  elevation.querySelectorAll('button').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
  document.querySelector('.destination-act').dataset.perspective=forest?'forest':'mountain';
  animate(document.querySelector('.forest-picture'),{clipPath:forest?'inset(0% 0 0)':'inset(100% 0 0)'});
  const subtitle=document.querySelector('.sabah-subtitle');subtitle.innerHTML=forest?'Beside a stream.<br>Inside the forest.':'Across the sea.<br>Above the forest.';
 },options))}
 return()=>{events.abort();tweens.forEach(t=>t.kill())};
}
