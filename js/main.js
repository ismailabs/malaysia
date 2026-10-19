import { initNavigation } from "./navigation.js";
import { initMotion } from "./v2-motion.js";
import { initDestinationActs } from "./destination-acts.js";
import { initAnalytics } from "./analytics.js";

const cleanups = [
  initNavigation(),
  initDestinationActs(),
  initAnalytics(),
];
document.documentElement.classList.add("js");
async function motionReady() {
  if (window.gsap && window.ScrollTrigger) {
    cleanups.push(initMotion(window.gsap, window.ScrollTrigger));
  }
  window.ScrollTrigger?.refresh();
  document.documentElement.dataset.ready = "true";
  // Native hash scrolling is restored after pins have their final geometry.
  if (location.hash) {
    const target = document.getElementById(
      decodeURIComponent(location.hash.slice(1)),
    );
    if (target) target.scrollIntoView({ behavior: "instant" });
  }
}
Promise.all([
  document.fonts.ready,
  new Promise((resolve) => {
    if (document.readyState === "complete") resolve();
    else window.addEventListener("load", resolve, { once: true });
  }),
]).then(motionReady);
window.addEventListener("pagehide", (event) => {
  if (!event.persisted) cleanups.forEach((cleanup) => cleanup?.());
});
window.addEventListener("pageshow", (event) => {
  if (event.persisted) window.ScrollTrigger?.refresh();
});
