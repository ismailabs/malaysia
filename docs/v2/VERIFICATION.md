# Malaysia — Between Places V2 verification

V1 source baseline: `8f1643370ea1bfe532d1c36a390bad6ec56b8c02`. Recovery tag: `malaysia-v1-before-v2-20261019`. Original production Cloudflare version: `30b9eaad-a6d5-441e-b375-a5ad2afa669a`.

V2 uses the existing vanilla generator, semantic static pages, local GSAP/ScrollTrigger and responsive WebP photographs. No framework, backend, new paid plan, paid asset, API generation service or unrelated domain change. The four sourced essays and original photograph bytes remain intact. Original procedural geography, portals, shutters, tidal rings, ridge curtain and photographic maker assembly provide the transformation.

The working tree began with a deleted V1 handoff and modified owner instructions. These changes were preserved in `output/v2/recovery/initial-changes.patch` and `initial-status.txt`; V1 build/audit helpers were recovered into `scripts/`, then narrowed for V2 public staging. The deleted handoff and owner instruction changes are excluded from the implementation commit.

## Reproduction

`npm run verify` regenerates the pages, builds an allowlisted artifact, audits static SEO/links, starts a local artifact server and runs the V2 browser suite. Run it without a concurrent build or deployment that changes its served directory. `node scripts/verify-v2.mjs <origin> <label>` verifies a frozen local or hosted artifact; `--smoke` uses two widths instead of the full responsive/cross-engine matrix.

The suite covers all six content routes at 320, 390, 768, 1024, 1440 and 1920px; six controlled scroll timelines at five progress points; no-JS and reduced-motion at 390/1440; axe WCAG checks; keyboard menu/focus/escape; four destination actions; native hash history; private CTA events; pause/media-query lifecycle; 200% zoom equivalence; HTTP assets, unique metadata and private-path 404s. WebKit is exercised when installed; unavailable engines are separately reported. It does not certify screen-reader conformance, physical-device FPS or field Core Web Vitals.

`py scripts/check-release.py` inventories `dist/` and scans staged text with named secret patterns. This custom scan is not a Gitleaks audit. `node scripts/verify-hosted.mjs <origin> <label>` compares every served asset against the reviewed SHA256 manifest, checks TLS/headers and confirms private paths are 404. Preview `_headers` intentionally adds noindex; the same public bytes otherwise proceed to production.

`output/v2/` holds the actual local evidence: frozen V1 desktop/mobile captures, A/B prototype sources and browser observations, selection decision, two correction rounds, five-point scene stills, native-wheel recordings, asset register, comparison board and release receipts. It is excluded from deployment. `docs/v2/FINAL-REPORT.md` records the final release identity and observed results.

## Known evidence boundaries

GA4 remains disconnected: no approved property/consent/DebugView evidence. The local click hook transmits and stores nothing, excludes query strings and personal data, and does not claim production conversions. Search indexing/ranking, real user uplift, independent design awards, physical mobile and assistive-technology testing remain unverified.

Lighthouse results are lab measurements. Baseline and production should be compared on the same machine/preset; the retained local V2 run has a different origin and is labelled accordingly. Initial test failures and infrastructure races remain in evidence; a final stable run must pass before the release claim.

## Recovery

Prefer the existing Worker's version rollback to `30b9eaad-a6d5-441e-b375-a5ad2afa669a`, using current Wrangler rollback help and the exact production account/service. Recheck all public routes, private paths, TLS, studio link and unchanged Vercel redirects after rollback. Alternatively use a separate checkout of `malaysia-v1-before-v2-20261019` to build its known V1 source and deploy its allowlisted artifact. Do not reset this dirty working tree or assume Git rollback changes deployed assets. Do not redeploy or modify the functioning legacy Vercel redirect merely to roll back Cloudflare.
