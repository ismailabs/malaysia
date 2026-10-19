# Verification matrix — run tests, capture evidence, fix and repeat

## Phase 0: Baseline (before touching UI)
- Git status, baseline SHA, repo-local skill versions; screenshot original live and local homepage where accessible.
- Inspect existing `js/motion.js` pinning, horizontal gallery, reduced-motion handling; `js/interactions.js` place switching; `js/navigation.js` modal/anchors/focus restoration; metadata and CSP.
- Record actual initial scores only if measured and include device, network simulation, browser and tool version.

## Phase 1: Local smoke / static audit
- `py codex-handoff/scripts/build_static.py` (use `--clean` on subsequent builds only after reviewing the existing `dist/` contents)
- `py codex-handoff/scripts/audit_static.py --root dist`
- `py -m http.server 8000 --directory dist` (stop after testing), or a verified compatible local server.
- Verify every route is available at localhost, links work, no missing assets, no crawl-only JS dependency, clean DOM syntax at reasonable sampling. Local plain `http.server` may handle directory index and 404 differently from Cloudflare; verify both.

## Phase 2: Real-browser matrix
| Environment | Viewports / modes | Essential checks |
| --- | --- | --- |
| Desktop | 1440x900, 1920x1080; mouse | hero, scroll pins, gallery controls, modal, CTR CTAs, hover focus |
| Laptop/tablet | 1024x768 and 768x1024 | breakpoints, large type, sticky nav, scroll anchors |
| Mobile | 390x844 and 320x720; touch emulation | readable type, no overflow, native scrolling, taps, navigation |
| Accessible | reduced motion, keyboard-only, 200% zoom | complete content, focus visible, no traps, contrast, skip nav |
| Script disabled | home and destination | content, links, photos, navigation and studio CTA still usable |

Where possible include WebKit/Firefox and an actual lower-end mobile. Name emulation honestly if no physical device. Screenshot every page at >= desktop and mobile, capture representative scrolled scenes. Ensure mobile screenshot includes sections beyond first viewport.

## Functional assertions
- Homepage and >= four destination pages return 200 in production; invalid URL returns appropriate 404.
- Header/menu opens/closes, Escape works, dialog focus is trapped and returned appropriately.
- All nav routes and anchor links work including Back/Forward, deep links to pinned sections and refreshed landing paths.
- Street/gallery previous/next and keyboard arrows work. No horizontal overflow at page level, no inaccessible pinned elements.
- Place selector updates text, labels, alt and active state; keyboard selection works.
- GSAP/tweens and ScrollTriggers clean up; no duplicate triggers or console exceptions.
- `prefers-reduced-motion` disables all major animations and keeps content visible. No flash of invisible content before JS loads.
- CTA links to actual studio site; works with JS off and with tracking blocked.
- All public image requests succeed; image aspect ratio and `srcset` sizes are correct. Source credit is accessible.
- Social sharing/canonical/robots/sitemap reflect production hostname (after launch, not preview).

## Accessibility
Use `accessibility-scan` and/or axe where available; manual checks: keyboard order, `aria-expanded`, `aria-controls`, dialog headings and close buttons, alt text, text contrast, zoom, keyboard-triggered interactions, reduced-motion and landmark labels. WCAG 2.2 AA is a goal for applicable checks, not a claim based on an automated scan alone. Failures that block essential task completion must be fixed before release.

## Performance (user approved 17B)
Maximize cinematic ambition, but collect desktop/mobile Lighthouse or DevTools data and relevant Core Web Vitals under recorded conditions. Specific numeric scores are *targets*, not absolute requirements invented after the fact. Investigate severe LCP, CLS, INP, 5xx, unbounded ScrollTrigger update costs or unresponsive input. Recommend practical floors: no page overflow, no sustained major-main-thread stalls, no inaccessible overlay, target CLS <=0.1, LCP <=2.5s on representative measured mobile, INP <=200ms where measurable. If cinematic tradeoff prevents ideal targets, log actual numbers, reason and accepted difference; **do not claim pass without measurement**.

## SEO / content checks
- Actual HTML route file and network response; one H1; unique title, description and canonical; OG image and route map; valid XML sitemap and robots; non-200 for missing route.
- JSON-LD parses, represents visible facts, and uses genuine organization/author identity only.
- Use original content with attributable factual claims and image credits; check for invented locations or promises.
- Links cross-route and to studio work with no JS.

## Browser visual review loop
At each major milestone produce a contact sheet of homepage + each destination at desktop and mobile (files stored OUTSIDE `dist`). Record the top 3 hierarchy/composition/typography defects per review; fix and rescreenshot. Avoid pseudo-measured "design scores". Use images and annotated failure descriptions as visual evidence.

## Deployment tests
- After Cloudflare preview and production: check HTTP 200, TLS, content differs from original in expected ways, images/fonts JS load, no CSP errors, routes accessible, 404 behavior, robots/sitemap/canonicals valid, analytics state legitimate, SEO noindex removed.
- After Vercel change: legacy origin redirects correctly (301/308), preserves supported paths and relevant query parameters, avoids loops; check from a clean browser or fresh HTTP client; record response chain.

## Evidence format
For each command: environment, date/time, exact command/tool, URL and browser viewport, actual result, failures, corrective action, retest result and path to screenshot/artifact. Store private reports under `codex-handoff/progress/` or another excluded folder; never inside deployed `dist`.
