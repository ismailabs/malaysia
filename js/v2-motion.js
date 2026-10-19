// Native sticky stages: no wheel interception, synthetic scrolling or pin spacers.
export function initMotion(gsap, ScrollTrigger) {
 gsap.registerPlugin(ScrollTrigger);
 const controls=[...document.querySelectorAll('.motion-toggle')];
 let paused=false;
 const media=gsap.matchMedia();
 function build(){
  media.revert();document.body.classList.remove('motion-live');
  if(paused)return;
  media.add({desktop:'(min-width: 701px)',mobile:'(max-width: 700px)',reduce:'(prefers-reduced-motion: reduce)'},context=>{
   if(context.conditions.reduce)return;
   const mobile=context.conditions.mobile;
   document.body.classList.add('motion-live');
   const atlas=document.querySelector('.atlas');
   if(atlas){
    const intro=gsap.timeline({defaults:{ease:'none'},scrollTrigger:{id:'map',trigger:atlas,start:'top top',end:'bottom bottom',scrub:true,invalidateOnRefresh:true}});
    intro.to('.atlas-world',{clipPath:mobile?'ellipse(115% 100% at 50% 50%)':'ellipse(100% 110% at 50% 50%)',duration:1},0)
     .to('.atlas-geography',{yPercent:-90,scale:.76,autoAlpha:0,duration:.6},.06)
     .to('.atlas-title',{yPercent:-80,xPercent:mobile?-8:-5,duration:1},0)
     .to('.atlas-title>p',{autoAlpha:0,duration:.25},.3)
     .to('.atlas-photo-credit',{yPercent:140,duration:1},0);
   }
   document.querySelectorAll('.world').forEach(world=>{
    const picture=world.querySelector('.world-picture img');
    const gates=world.querySelectorAll('.world-architecture i');
    const architecture=world.querySelector('.world-architecture');
    const slug=world.dataset.world;
    const tl=gsap.timeline({defaults:{ease:'none'},scrollTrigger:{id:`gallery-${slug}`,trigger:world,start:'top top',end:'bottom bottom',scrub:true,invalidateOnRefresh:true}});
    if(slug==='kuala-lumpur'){
     tl.fromTo(picture,{clipPath:'inset(5% 20% 18% 20%)'},{clipPath:'inset(0% 0% 0% 0%)',duration:.9},0)
      .to(gates,{scaleX:0,transformOrigin:'left',stagger:.06,duration:.45},0);
    }else if(slug==='george-town'){
     tl.fromTo(picture,{scale:1.2},{scale:1,duration:1},0)
      .to(gates,{rotationY:-100,transformOrigin:'left',stagger:.08,duration:.55},0);
    }else if(slug==='langkawi'){
     tl.fromTo(picture,{clipPath:'ellipse(34% 44% at 65% 50%)'},{clipPath:'ellipse(110% 110% at 50% 50%)',duration:1},0)
      .to(architecture,{scale:1.9,duration:1},0);
    }else{
     tl.fromTo(picture,{yPercent:18,scale:1.3},{yPercent:0,scale:1,duration:1},0)
      .to(architecture,{yPercent:120,duration:1},0);
    }
    tl.to(world.querySelector('.world-heading'),{xPercent:mobile?-6:12,yPercent:mobile?-8:-12,duration:1},0);
   });
   const studio=document.querySelector('.studio-finale');
   if(studio){
    const tl=gsap.timeline({defaults:{ease:'none'},scrollTrigger:{id:'studio',trigger:studio,start:'top top',end:'bottom bottom',scrub:true,invalidateOnRefresh:true}});
    const fragments=studio.querySelectorAll('.craft-fragment');
    // First assemble a narrow column, like the first letter of the maker's name.
    const stage=studio.querySelector('.studio-stage');
    tl.to(fragments,{x:(i,el)=>stage.clientWidth*.44-el.offsetLeft,y:(i,el)=>stage.clientHeight*.12-el.offsetTop,scaleX:(i,el)=>stage.clientWidth*.12/el.offsetWidth,scaleY:(i,el)=>stage.clientHeight*.67/el.offsetHeight,transformOrigin:'top left',rotation:0,stagger:.025,duration:.45},0)
     .to(fragments,{xPercent:(i)=>i%2?280:-280,yPercent:(i)=>i%2?-90:90,rotation:(i)=>i%2?35:-35,autoAlpha:0,stagger:.025,duration:.4},.55)
     .fromTo('.studio-name span:first-child',{xPercent:-15},{xPercent:0,duration:.8},.15)
     .fromTo('.studio-name span:last-child',{xPercent:15},{xPercent:0,duration:.8},.15);
   }
   ScrollTrigger.refresh();
   return()=>document.body.classList.remove('motion-live');
  });
  ScrollTrigger.refresh();
 }
 const controller=new AbortController();
 controls.forEach(button=>{button.hidden=false;button.addEventListener('click',()=>{
  paused=!paused;
  controls.forEach(control=>{control.setAttribute('aria-pressed',String(paused));control.textContent=paused?'Resume movement':'Pause movement'});
  // Reverting restores a complete in-flow editorial document; never freeze a hidden scene.
  build();button.focus({preventScroll:true});
 },{signal:controller.signal})});
 build();
 return()=>{controller.abort();media.revert();document.body.classList.remove('motion-live')};
}
