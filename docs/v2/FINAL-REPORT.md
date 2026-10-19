# Malaysia — Between Places V2: production release

**COMPLETE.** The approved V2 experience is deployed and directly verified at https://malaysia.ismailstudio.my/. This is an agent visual acceptance and technical release record, not an independent award or accessibility certification.

## Release identity

- Deployed public source: `c7e3e3aed5bdba15946419ee960b700a0aa205ce` on `codex/malaysia-cinematic-v2`; subsequent documentation-only commit records these receipts. Main integration and advertised remote identity are recorded in `output/v2/release/git-final.json` after push.
- Frozen V1 source: `8f1643370ea1bfe532d1c36a390bad6ec56b8c02`, observed before edits on 19 October 2026; recovery tag `malaysia-v1-before-v2-20261019` pushed.
- Existing Cloudflare account `44214a829e2337ca50cf40e4cd827cba`, Worker `malaysia-between-places`; production version `e3cc346b-7025-49f8-ade5-372c438ddf91`, deployment `bc62dd9f-0665-4438-a44d-bb6b980ea8e4`, 100% traffic, created `2026-10-19T19:51:20.801879Z` (20 October 2026, 03:51 MYT).
- Custom hostname remains enabled on that Worker; domain record `2526c6941b0d5dec94f1cfd53da68646a301b8e8`. HTTPS certificate validated with hostname verification. Home and five content routes return 200; real missing/private paths return 404. Production is indexable.
- Final preview: https://malaysia-between-places-preview.mohamad-ismail-mohd-izwan.workers.dev/, version `db34f893-68f2-47d5-9ea6-da8c870617fd`, noindex/nofollow, same 50 served public asset hashes.
- Existing Vercel redirect deployment `dpl_ACHLBW3aEmdjuse2k2oXy3dYkNQW` preserved. Fourteen 308 path/query cases, eight fragment journeys and five actual studio visits passed after production release.

## Creative transformation and proof

Two real locally served prototypes were built and tested at 1440×900 and 390×844. A, **Atlas into Cinema**, uses a monumental country name and rectangular skyline expansion. B, **Surreal Landscape Passage**, uses separated geographic lands above a circular mountain portal. B won for a stronger focal point, mobile continuity and decisive landscape transition. A's clearer country naming was retained. Both have three captured waypoints, real wheel recordings, pause/reduced-motion and actual destination clicks; final console errors: zero. Original favicon and prototype hit-area failures were corrected and retained in the history of observations.

Local prototype URLs while the source server runs: http://127.0.0.1:8001/output/v2/prototypes/a/ and http://127.0.0.1:8001/output/v2/prototypes/b/. Source reconstruction is in `scripts/build-prototypes.py`; runtime files, stills and videos are under `output/v2/prototypes/`. See [selection](PROTOTYPE-DECISION.md).

The homepage replaces V1's photo-print columns and horizontal track with three native-scroll signature scenes:

1. Accurate peninsula/Borneo cartography locates four destinations, then a circular Kinabalu aperture expands into a photographic world. Geography is sourced from Natural Earth; silhouettes and pins share one projection. Named HTML links remain keyboard/touch accessible. Only decorative artwork fades.
2. Four immersive photographic worlds change spatial language: KL's rising gates, George Town's architectural shutters, Langkawi's tidal ellipse/orbits, and Sabah's ridge curtain. Each exposes an ordinary static essay link.
3. Four photographs assemble into a narrow I, then disperse to reveal ISMAIL STUDIO. The real heading and studio CTA stay usable through the reveal.

Four route intros have different compositions and controls: KL skyline/street match-cut; George Town opening shutters; Langkawi keyboard-adjustable waterline; Sabah mountain/forest-stream perspective. The existing sourced essays, real photographs and routes remain.

[Visual review](VISUAL-REVIEW.md) and [refinements](REFINEMENTS.md) describe the observed before/fix/after evidence. Two substantial early rounds corrected geographic labels, image resolution, maker-wordmark integrity, mobile type, map semantics and transform performance. Later live checks corrected pause/narrative overlap and short-height map-link clearance. Final physical clicks/history assertions cover 1264×716 and 1920×720 as well as standard desktop/mobile.

The matched local [comparison board](../../output/v2/compare.html) embeds 18 actual images: 1440×900/390×844 first folds, gallery, finale, prototypes and a sample destination. Final live captures are `output/v2/delivered/`; frozen V1 captures are `output/v2/baseline/`. Waypoints at 0/25/50/75/100% cover all six controlled timelines at both matched widths. The board's desktop/mobile screenshots were opened and visually reviewed.

Native-wheel scene recordings of the final accepted preview are `output/v2/final/map-motion.webm`, `gallery-motion.webm`, `studio-motion.webm`; the preview and production public hashes match. Actual WebM frames were decoded with FFmpeg and reviewed (`actual-video-review.json`), rather than relying on unreliable browser-seek screenshots. These are automation recordings, not physical-device FPS evidence. Final public desktop/mobile captures have zero console errors.

The Visual Transformation Gate is accepted on the observed changes of topology, atmosphere, geographic identity, distinct world mechanics, maker reveal and route interactions. Its file checker found all 30 required evidence entries with zero issues; that checker only verifies files and does not judge artistic quality. Taste lint/inspection had no failing rules after correction, with declared allowances for decorative word/photo overlap and the country-name opening. No numerical creativity score is claimed.

## Technical checks

| Check | Observed result |
|---|---|
| Full local matrix, accepted visual code `4cba74e` | 65 passed, 974 assertions, zero failures; WebKit routes/menu passed; Firefox unavailable |
| Exact final preview `c7e3e3a` | 40 passed, 590 assertions, zero failures |
| Exact final production `c7e3e3a` | 40 passed, 590 assertions, zero failures, no external application requests |
| Map navigation/history | 28 journeys each on final preview and production; normal/reduced/no-JS, short-window layout and Skip focus |
| Gallery control clearance | 48 states across six widths, zero overlaps on hosted candidate/production |
| Axe WCAG 2/2.1/2.2 A/AA tags | 12 final production route/width reports; zero detected violations |
| AccessLint home scan | Zero violations across 94 rules on the implementation; retained dated report, not a screen-reader certification |
| Static audit | Seven HTML files, 320 local references, zero issues; six unique content titles/canonicals, JSON-LD parsed in browser |
| Artifact | 51 allowlisted files including `_headers`, 5,153,236 bytes; all 50 served hashes match preview/production |
| Security/privacy | Private tooling/handoffs/credentials/screenshots excluded; CSP and TLS verified; nine extra hosted private/missing paths return 404 |
| Legacy and CTA | 14 308 redirects preserving nested paths/repeated/encoded query; eight fragments, three semantic destination mappings; five real studio visits to https://www.ismailstudio.my/ return 200 |
| Dependencies | npm ci completed; 153 packages audited, zero reported vulnerabilities; no optional native-hook permission expansion |

The final public change after the full matrix relocated three legacy anchors to their correct scenes. It did not alter CSS/JS choreography; the exact final source then passed preview/production smoke, physical navigation/history, fragment semantics and hosted hash checks. No failed assertion was removed or weakened. Initial failures and build/test races remain in `output/v2/release/`; only stable completed runs support acceptance.

`npm run verify` reproduces build/static audit/full local browser and map/history checks. Individual frozen-origin verification commands and evidence paths are in [verification](VERIFICATION.md) and [release evidence](RELEASE-EVIDENCE.json). Source-only files and this report are excluded from `dist/`. Staged changes were checked with `git diff --cached --check` and a named custom secret-pattern scan with zero findings; this is not a Gitleaks audit.

## Measured performance

Fresh V1 production and final V2 production were measured on this machine with the same Lighthouse mobile/desktop presets and installed Edge, separately from the other browser jobs. Values are individual lab runs, not field Core Web Vitals or an experiment proving conversion uplift.

| Preset | Performance V1 → V2 | LCP | CLS | TBT | Transfer bytes |
|---|---|---|---|---|---|
| mobile | 53 → 84 | 6.56s → 2.87s | 0.000 → 0.000 | 300ms → 381ms | 865,340 → 894,876 |
| desktop | 100 → 99 | 0.73s → 0.71s | 0.000 → 0.000 | 0ms → 48ms | 1,450,967 → 1,422,235 |

Final accessibility, best-practices and SEO scores are 100 in both presets; the underlying Lighthouse reports are under `output/v2/delivered/performance/`. Mobile performance improves from 53 to 84 and LCP improves from 6.56s to 2.87s, but mobile TBT increases from 300ms to 381ms. That is a disclosed cost of the more complex page, not a performance improvement claim. The final corrected static/live layout has zero measured CLS in both runs. Earlier V2 scores of 91 mobile predate this final artifact and are superseded here.

Mobile image selection preserves sharpness in a portrait aperture. Native scroll, local fonts/GSAP, transform-based assembly, responsive sources and static fallbacks contain the richer experience's cost. Mobile LCP remains above the 2.5s target and TBT has room for optimization; no field INP or physical-device smoothness result is claimed. The V2 contract permits moderate measured tradeoffs; the accepted creative gain is the real geographic portal, four spatially distinct worlds and maker assembly, with tested no-motion/mobile navigation. There is no invented hard Lighthouse score threshold.

## Safeguards, limitations and remaining actions

Vanilla semantic HTML/CSS and modular browser JavaScript remain; no React, Next.js or backend. No additional purchases, subscriptions, paid assets, plan upgrades or paid service provisioning were made. Existing Cloudflare static hosting and legacy Vercel redirect were reused. Cloudflare Git build triggers were empty and Vercel's project Git link was null when inspected, so source pushes do not silently recreate deployments.

Seven licensed V1 photographic sources and all optimized photo bytes are preserved. Current Unsplash license and Natural Earth public-domain terms were reviewed; original photo pages could not be reopened, so inherited provenance is explicitly labelled. No acquisition date, documentary scene, endorsement or travel claim was fabricated. See [asset register](ASSET-REGISTER.md), [research](RESEARCH.md) and public [credits](https://malaysia.ismailstudio.my/credits/). English remains en-MY following qualitative official-source intent research; no keyword-volume claim or automated translation was published.

GA4 is pending an approved property, consent behavior and DebugView evidence. Current click hooks transmit/store nothing, create no cookies, and exclude query strings/personal data. Conversions, Search Console ownership, indexing/rankings and business uplift remain unverified. No analytics success is claimed.

Firefox could not launch (`spawn UNKNOWN`); install/repair that browser runtime for its remaining cross-engine check. Physical iOS/Android, assistive technology and real-user field performance require those environments; emulated mobile and WebKit checks passed. They are disclosed limitations, not concealed completed tests. The Visual Transformation Gate is an agent review, not external award recognition.

Automatic approval review blocked deletion of a task-created temporary AccessLint browser profile, stating “blocked by policy.” Its browser process was stopped and the profile was left in place; it is outside the public artifact. This cleanup restriction is not a production blocker. No release-blocking permission, DNS, account, billing or implementation item remains.

Original owner modifications to `AGENTS.md` and deletion of `codex-handoff/` were preserved, recorded in `output/v2/recovery/initial-changes.patch`, and excluded from delivery commits. Recovered V1 tooling lives under `scripts/`; no owner handoff deletion was reversed. The original baseline and image/license sources remain recoverable from Git.

## Rollback

From this repository, using the already authenticated production account/service and reviewed Wrangler 4.151.2 syntax:

```powershell
npx wrangler rollback 30b9eaad-a6d5-441e-b375-a5ad2afa669a --env='' --name malaysia-between-places --message 'Restore verified V1 baseline'
```

This command is documented, not executed. Alternatively create a separate checkout of `malaysia-v1-before-v2-20261019`, build its known V1 allowlisted artifact and deploy it. Do not reset the owner's dirty working tree. After any rollback, rerun hosted route/TLS/private-path/CTA checks and `node scripts/verify-transition.mjs`; keep the functioning Vercel redirect. A Git checkout alone does not roll back the live Worker.
