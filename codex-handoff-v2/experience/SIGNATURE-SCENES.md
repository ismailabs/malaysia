# Three signature homepage scenes — technical creative contracts

## Scene 1 — MALAYSIA COMES ALIVE (opening/geographic hero)
**From:** accurate recognizable Peninsular Malaysia and Borneo silhouette. **Through:** route lines/coordinates/labels shift in physical composition; narrative pulls toward one place, geography transforms into authentic photo world. **To:** interactive invitation/first destination frame. Not a static map graphic surrounded by standard cards.

- Original procedural SVG/Canvas style compatible with license; geographic source and attribution documented. Show two landmasses without moving Sabah to peninsula.
- Opening is fast, optional, nonblocking; skip/pause accessible; stage can initialize with static image/text and progressively enhance after fonts/images are ready; avoid an all-black blocking overlay.
- Map links/hotspots and CTA keyboard-operable, touch-target sized, semantically labeled, with fallback textual navigation.
- Tie scroll scene to native vertical scroll and preserve history/back/anchor navigation. Labels readable throughout, narrative always accessible in DOM.
- Record screenshot waypoints initial/25%/50%/75%/final desktop; mobile and reduced-motion initial/final.

## Scene 2 — A JOURNEY BETWEEN WORLDS (gallery)
**From:** a distinct destination world. **Through:** transitions that move the visual language—not just a carousel—across KL, George Town, Langkawi, Sabah. **To:** naturally accessible distinct destination links/essay routes.

- Four different visual states tied to authentic destination photographs + decorative procedural regions. Consider spatial masks, depth planes, typographic chapters, morphing UI frames and cinematic match-cuts; choose one coherent mechanism after prototypes.
- Maintain direct, discoverable links and context for all four locations with ARIA labels or meaningful text. Navigate by pointer, keyboard and touch. Native scrolling remains intuitive; no unstoppable auto-motion or wheel capture.
- Pinned/scroll-linked sections only where stable; ensure ScrollTrigger refresh, responsive breakpoints, font loading and cleanup. State and focus must not get trapped on hidden panels; no console errors.
- Art direction must make each location *feel* different, not replace only photo title and accent color.
- Demonstrate progression captures at 0/25/50/75/100%; use video or sequence if static stills miss motion.

## Scene 3 — MADE BY ISMAIL STUDIO (finale/conversion)
**From:** travel narrative's final panorama. **Through:** elements recombine/reveal Ismail Studio as the experience's maker; motion should express craft, not look like a pop-up advertisement. **To:** obvious, functional https://ismailstudio.my/ CTA and secondary destination return option.

- Meaningful creative reveal, clear brand naming, high contrast, focus states, target HTTPS link (do not invent enquiry URL).
- CTA tracked with existing `data-cta-placement` hook if actual privacy conditions allow; verify with/without JS, blocked analytics and keyboard.
- Compare finale against V1's standard studio-photo strip. A footer background swap or fly-in sentence is **not** a signature scene.
- Stop motion before user action; avoid obscuring focus or trapping the browser at the end.

## Engineering invariants across all scenes
- Semantic/crawlable static HTML first. Motion enhancement second.
- Reduced motion: skip nonessential spatial/auto animation immediately, all content and CTAs visible.
- JS disabled: complete editorial narrative, destination links, sources and studio link remain accessible.
- Motion control: user pause/skip is persistent during current page journey; no trap, keyboard control and state reflected accessibly.
- No Three.js/WebGL, no third-party animation CDNs at runtime, no heavy scroll-smoothing hijack.
- Log not only clips and timelines but *specific impossible-in-V1 composition changes* as acceptance evidence.
