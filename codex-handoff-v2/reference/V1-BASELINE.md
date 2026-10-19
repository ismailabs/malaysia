# V1 baseline to freeze before changing anything

## Verified repository context (connector read 19 Oct 2026)
- `main`: `8f1643370ea1bfe532d1c36a390bad6ec56b8c02` (last receipt-only docs commit). Public V1 source: `875b293b9638f665d499955f80d44c8d78c060e8`. Original pre-V1: `99787eaa56e57d0e1c304ea09bd3b9929eb89ed1`.
- Production: `https://malaysia.ismailstudio.my/` via Cloudflare Worker `malaysia-between-places` using Workers Static Assets, no backend. The legacy Vercel hostname performs a 308 redirect; it is **not** an independent live V1 visual baseline.
- Existing static routes: `/`, `/destinations/kuala-lumpur/`, `/destinations/george-town/`, `/destinations/langkawi/`, `/destinations/sabah/`, `/credits/`; error page/robots/sitemap.
- `scripts/generate_site.py` generates ordinary HTML; `css/main.css`, `js/main.js`, `js/motion.js`, `js/interactions.js`, `js/navigation.js`, `js/analytics.js`, `assets/scenes/stage.js` contain behaviors. `assets/vendor/gsap.min.js` and `ScrollTrigger.min.js` self-hosted.
- Production artifact staged via `npm run build` → `py codex-handoff/scripts/build_static.py --clean` (allowlisted `dist`). `npm run audit`, `npm run verify`; existing browser tooling under `scripts/verify-browser.mjs`. `wrangler.jsonc` points to production/preview names and `dist`/`dist-preview`. Read exact current files, don't replace blindly.
- Existing site uses roughly seven distinct authentic photos in WebP sizes. Reuse is allowed but source fresh images or make NEW procedural media to alter the identity materially.

## V1 recorded (not independently remeasured today)
From `codex-handoff/progress/FINAL-REPORT.md`: mobile Lighthouse 85, desktop 99, both SEO 100; mobile LCP 3.50 s, CLS 0, TBT 255ms; mobile prior original baseline 49 was pre-V1. Accessibility test summaries 0 axe violations across selected routes/widths and production Playwright 40/40. These are **historical lab/self-report values**, not guarantees nor certified accessibility. New V2 should capture fresh consistent baseline using the same or explicitly comparable instrumentation and note deviations.

## Baseline capture instructions
1. Confirm current source, production Worker version, production domain and Vercel redirect.
2. Preserve commit/tag for V1 at checked out HEAD and note dirty changes; backup no-secret configuration references.
3. Capture current production website at 1440×900 and 390×844, and optionally 1920×1080/320×720; first fold, each chapter and footer/studio. Capture representative motion progression as screenshots and brief recorded video; note viewport/device/motion/browser and source URL.
4. Create `output/v2/evidence.json` from the sample with actual file paths, not empty placeholders; store screenshot source URL, timestamp, commit and test mode in a sidecar observation log.
5. Compare V2 final against V1 source and/or captured V1 stills, not the redirect-only Vercel page. Do not replace the baseline after site launch.

## Why a second radical redesign is necessary
V1 hero: uneven photo prints, relatively restrained title. V1 gallery: native horizontal street photographs. V1 coast: one short expanding photo scene. V1 footer/studio: photo strip and standard CTA. V2 must materially transform these patterns rather than decorating them.

## Live source links
- Repo: https://github.com/ismailabs/malaysia
- V1 report: https://github.com/ismailabs/malaysia/blob/main/codex-handoff/progress/FINAL-REPORT.md
- Current target: https://malaysia.ismailstudio.my/
