import { initNavigation } from "./navigation.js";
import { initPlaces, initPointer } from "./interactions.js";
import { initMotion } from "./motion.js";

const navigation = initNavigation();
const cleanups = [navigation.destroy, initPlaces()];
if (window.gsap && window.ScrollTrigger) {
  cleanups.push(initMotion(window.gsap, window.ScrollTrigger));
  cleanups.push(initPointer(window.gsap));
}
Promise.all([
  document.fonts.ready,
  new Promise((resolve) => {
    if (document.readyState === "complete") resolve();
    else window.addEventListener("load", resolve, { once: true });
  }),
]).then(() => {
  window.ScrollTrigger?.refresh();
  navigation.restore();
});
// Keep bfcache navigation intact; only dispose on a real page teardown.
window.addEventListener("pagehide", (event) => {
  if (!event.persisted) cleanups.forEach((cleanup) => cleanup());
});
