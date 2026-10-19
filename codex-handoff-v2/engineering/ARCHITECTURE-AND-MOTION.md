# Architecture and GSAP discipline

## Fixed stack
Semantic static HTML5, vanilla CSS, browser JavaScript modules, licensed local GSAP 3.x and ScrollTrigger, advanced CSS/SVG/Canvas (2D). No React/Next/Vue/Svelte, no Three.js/WebGL, no hosted backend/database, no nonconsensual analytics dependencies. Node/Python development scripts and browser test packages remain okay; release only static allowlisted output.

## Existing source contracts
- `scripts/generate_site.py` currently emits pages: decide whether to extend/refactor it to support V2 design modules or replace it with auditable static authoring while preserving route outputs. Avoid editing generated page copies out of sync with generator.
- `js/motion.js` / `assets/scenes/stage.js` may provide reusable cleanup logic; inspect first. Optimize true dramatic scene state transitions, don't accumulate animations on repeated resize/theme changes.
- Preserve route and navigation semantics, 404, URLs/canonical, fallback visibility, `js/analytics.js` no-collection promise until genuine auth/consent.
- Keep existing build allowlist code and `dist/` protections; if `assets/` changes, update allowlist in a traceable reviewable manner.

## Scene implementation shape (illustrative, not paste blindly)
1. Each scene owns a DOM wrapper, accessible source content, optional SVG/Canvas overlay for decoration, and progression controller.
2. Register ScrollTrigger once; create distinct `gsap.timeline({scrollTrigger:{...}})` for major progression. Use `gsap.matchMedia()` or contexts to create/revert on desktop/mobile/reduced preference changes.
3. Favor transforms and opacity; scale/clip-path/masks only after measuring paint cost, especially mobile. Avoid animating layout-reflow properties for every frame; limit layers and `will-change`.
4. Use `ScrollTrigger.refresh()` only after material layout changes, not continuously. In a pinned section test refresh order, no excessive blank hold, no jumping on resize, reliable anchors/Back/Forward and footer release.
5. `prefers-reduced-motion: reduce` disables long pinned/immersive movement while showing complete final readable content. Pause/skip controls must be keyboard operable and correct ARIA state.
6. Canvas overlays scale with pixel ratio bounded for low-end phones; decorative Canvas must never contain the *only* route labels, description or navigation. SVG map hotspots have semantic link alternatives.
7. Video/capture while scrolling at representative durations to catch pacing/jank; still screenshots alone cannot verify motion.

## Practical mobile adaptation
Create a separate layout choreography at 320/390 instead of shrinking the complex desktop motion. Preserve geographic meaning, the wow moment and destination discoverability; reduce simultaneous layers/decoding and pinning. Test portrait/landscape, touch and reduced-motion states.

## Known source pitfalls
- Existing V1 uses GSAP `matchMedia` and Stage with manual kill/revert; inspect state lifecycle to avoid double ScrollTriggers.
- Existing images have `srcset` but new images must have source metadata and actual intrinsic dimensions.
- Browser launch previously used Edge when Chrome was unavailable; tool availability is environment-dependent.
- No offline asset fetching assumption; if unavailable, stage local authentic reuse while using original procedural art and document the compromise.
