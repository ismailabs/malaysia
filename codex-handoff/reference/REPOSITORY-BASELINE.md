# Baseline from observed GitHub repository

Observations from GitHub `ismailabs/malaysia` on 2026-10-19, checked in the handoff preparation context. Default branch `main`. Inspected file tree at commit/tree SHA `99787eaa56e57d0e1c304ea09bd3b9929eb89ed1` (not a guarantee of the current local working tree).

## Existing public assets/code
- Root: `index.html`, `robots.txt`, `sitemap.xml`, `vercel.json`, `.vercelignore`, `built-by-ismail.png`.
- `css/main.css` approximately 33 KB.
- `js/main.js`, `js/interactions.js`, `js/motion.js`, `js/navigation.js` — modular vanilla JavaScript.
- `assets/fonts`: Barlow Condensed, Instrument Serif Italic, Manrope local WOFF2 with license files.
- `assets/vendor/gsap.min.js` and `ScrollTrigger.min.js` locally served; no default npm bundler/build requirement.
- `assets/images`: Kuala Lumpur, George Town, Petaling Street, nasi lemak, Langkawi, Kinabalu, rainforest, responsive `640/1200/2000.webp` where available, social sharing JPG.
- `assets/images/sources.json` records photographer, links and stated licenses; revalidate before reuse and preserve attribution.
- `vercel.json` configures headers including CSP that limits scripts and connections to `'self'`; any optional analytics integration must update CSP precisely.
- Existing `index.html` contains semantic sections, a skip link, `<dialog>` index navigation and credits, a horizontal streets gallery, islands portal, Borneo collage and a four-place selection module.
- `js/motion.js` includes pinned horizontal street section, pinned coast transition, ScrollTrigger scrubbing and reduced-motion handling. `js/interactions.js` uses keyboard controls, image preloading and magnetic interactions.
- Existing metadata names canonical and Open Graph URLs on `malaysia-between-places.vercel.app` — must be updated during migration.

## Important observations and verification gaps
- The user showed project-level `.agents/skills/` folders on Windows (15 observed): accessibility-scan, banner-design, brand, design, design-system, design-taste-frontend, gsap-core, gsap-performance, gsap-scrolltrigger, gsap-timeline, playwright, slides, ui-styling, ui-ux-pro-max, web-design-guidelines. These **were not present** in the GitHub tree snapshot; local copy may differ.
- Source files were reviewed, NOT actually launched/tested in a local browser as part of constructing this ZIP. Do not invent a baseline Lighthouse score, responsiveness diagnosis, accessibility result or conversion rate.
- Vercel deployment is identified as existing and READY in linked connector context; historical ready state is not proof of future availability. Verify fresh from the user's runtime.
- Cloudflare `ismailstudio.my` zone was reported active when checked through the connected Cloudflare API; exact subdomain conflict, Workers entitlement and deployment authority still need a fresh check.
- Do NOT assume local uncommitted files match GitHub. Inspect `git status --short`, `git remote -v`, `git log -1`, current skills, and source before modifying anything.
- If existing `AGENTS.md` or task files exist locally, merge/reconcile rather than overwrite them.
