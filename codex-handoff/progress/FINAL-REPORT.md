# Malaysia — Between Places · production release

**COMPLETE.** The redesigned static editorial is live at [malaysia.ismailstudio.my](https://malaysia.ismailstudio.my/). The [old Vercel address](https://malaysia-between-places.vercel.app/) permanently redirects to it with paths and queries preserved. Verification was performed on 19 October 2026; provider readback at 12:25 UTC / 20:25 MYT confirms the production version and hostname. No paid service, subscription, stock asset or plan upgrade was introduced.

## Release identity

| Item | Verified value |
| --- | --- |
| Repository | `https://github.com/ismailabs/malaysia.git` |
| Original source | `99787eaa56e57d0e1c304ea09bd3b9929eb89ed1` |
| Deployed public source / delivery SHA | `875b293b9638f665d499955f80d44c8d78c060e8` |
| Implementation branch | `codex/malaysia-editorial-launch` |
| Original recovery tag | `malaysia-before-editorial-20261019` |
| Cloudflare account | `44214a829e2337ca50cf40e4cd827cba` |
| Production Worker | `malaysia-between-places` (Static Assets, no backend) |
| Worker version | `30b9eaad-a6d5-441e-b375-a5ad2afa669a` at 100% |
| Worker deployment | `b2055749-f9f4-4836-80d4-6371233872ab`, created 12:05:11 UTC |
| Worker custom domain | `2526c6941b0d5dec94f1cfd53da68646a301b8e8`, enabled, production |
| Preview | [noindex preview](https://malaysia-between-places-preview.mohamad-ismail-mohd-izwan.workers.dev/), version `35870e7f-fbfa-454c-ad00-d24b3f5b27a6` |
| Legacy Vercel project | `prj_j1mVVCiiVs1jNefaK5BEILm1on0x`, team `team_y1FMLs1LWgVb2dOvegEGYVkf` |
| Current redirect deployment | `dpl_ACHLBW3aEmdjuse2k2oXy3dYkNQW`, READY, production aliases verified |

The following receipt/tooling commit changes no public assets. `main` and the implementation branch retain the original history. The deployed source SHA above identifies the exact public release; subsequent documentation commits are identifiable in Git history.

## Live routes and transport

| Page | Observed status |
| --- | --- |
| [Flagship](https://malaysia.ismailstudio.my/) | 200 |
| [Kuala Lumpur](https://malaysia.ismailstudio.my/destinations/kuala-lumpur/) | 200 |
| [George Town](https://malaysia.ismailstudio.my/destinations/george-town/) | 200 |
| [Langkawi](https://malaysia.ismailstudio.my/destinations/langkawi/) | 200 |
| [Sabah](https://malaysia.ismailstudio.my/destinations/sabah/) | 200 |
| [Photography, sources and privacy](https://malaysia.ismailstudio.my/credits/) | 200 |
| robots.txt / sitemap.xml | 200 / 200 |
| `/missing-place-qa/` | 404 |

All **53 served public files** returned 200 and matched the frozen local artifact's SHA-256. `_headers` is configuration rather than a public file. Nine private/invalid probes return actual 404 responses, including `.agents`, handoff, `AGENTS.md`, package/config files, `.env`, source tooling and `_headers`. Artifact: **54 files, 5,188,792 bytes**. Seven HTML documents and 324 local references passed the static audit with zero issues. The custom staged-text scan had zero findings; Gitleaks was not installed, and this is not described as a Gitleaks audit.

TLS was validated with certificate verification enabled. Google Trust Services WE1 certificate covers `malaysia.ismailstudio.my`, valid 19 October 2026–17 January 2027. Production has no `noindex`; preview has `X-Robots-Tag: noindex, nofollow`. Each content page has its own title, description, H1, canonical, social metadata and crawlable original text. Breadcrumb/collection JSON-LD parses; robots and sitemap point to the production host.

## What shipped

Uneven photographic prints open into city, coast and Borneo chapters, with a native street gallery, a short expanding landscape scene, four working place previews and ordinary essay links. Destination pages contain substantive sourced portraits rather than animation-dependent panels. Semantic HTML, CSS, browser modules, original local GSAP/ScrollTrigger and the licensed shared scene stage remain the stack. No framework or backend was added.

Taste direction: `uneven-photographs`, seed **2061276754**, hero `three-prints-one-line`, chosen from three directions without a redraw. The idea is that changes of scale between street, coast and mountain become a wall of photographic prints that opens into a landscape. The live interaction is the place preview selector and native gallery. Final self-review: design 8, usability 8, creativity 7, content 8; weighted **7.8**. This is a subjective review, not an award or external score. Original photography limits the range of scenes; no fabricated documentary images or placeholder copy remain.

[Research and route intent](RESEARCH-LOG.md), [copy record](COPY-DECK.md), [rights register](ASSET-RIGHTS.md) and [all visual review rounds](VISUAL-REVIEW.md) record the decisions. Seven inherited Unsplash works have public creator/source/licence credits on `/credits/` and individual portraits. Original bytes, OFL notices, GSAP notices and the stage's MIT licence are retained. The general Unsplash licence was reviewed; individual source pages returned a bot interstitial, which was not bypassed. No unobserved acquisition date or photographer endorsement is asserted. English `en-MY` launches after directional English/Malay intent research; language-demand quantities are unknown and no automatic translation is published.

## Browser and accessibility evidence

| Run | Actual result |
| --- | --- |
| Full local frozen artifact | 65 passing cases, 632 assertions, 0 failures; 1 unavailable Firefox case |
| Cloudflare preview | 39/40 initially; only remaining result was a navigation-cancelled image classified as a failure. Corrected classification retains cancellation evidence; targeted interaction rerun passes 26 assertions. |
| Final production | **40/40 cases, 390 assertions, 0 failures**, no external runtime requests |
| Production axe | 12 reports: six routes at 390 and 1440; **0 violations** |
| Accesslint 0.21.0 | 94 rules, homepage at 756×488; **0 violations** |
| Scene progress review | 13 frames × desktop / touch phone / reduced motion = 39 frames; no page errors |
| Production image paint check | Hero, coast and preview at 1440 in reduced-motion and JS-off modes; all six viewport captures opened and visibly correct |
| Legacy browser journeys | Eight old fragments retained and target IDs found; five real studio navigations end at `https://www.ismailstudio.my/`, HTTP 200 |

The full local matrix covers 320×720, 390×900, 768×1024, 1024×900, 1440×900 and 1920×1080. Dedicated reduced/JS-off modes use 390×844 and 1440×900. Checks cover title wrapping, page overflow, dialog Tab/Shift-Tab/Escape/return focus, native gallery buttons/keys, preview labels/images/links, Back/Forward, anchors, preference changes and trigger cleanup, local event contents, genuine studio hrefs, assets and private paths. The 200% check is layout emulation at 720×450/DPR2, not a claim of testing a physical device's browser zoom UI. WebKit core journeys passed locally. Firefox could not launch (`spawn UNKNOWN`) even after its official binary check; it is not counted as passed. No physical low-end phone or full screen-reader session was available.

The bundled Taste final CDP montage capture timed out; its last completed report was Round 2's 0 FAIL / 4 WARN. The handoff explicitly permits a documented manual equivalent. Final browser/heading/overflow/axe checks, inspected screenshots and exact scene frames supply that equivalent. The desktop full-page capture occasionally omitted image paint after rapid scrolling; fresh ordinary viewport captures with decoded images confirm visible photographs in both static modes. The incomplete captures are retained as a tool limitation rather than claimed as correct renders.

Raw local evidence is excluded from Git and deployment: `output/playwright/verified/`, `output/playwright/production-verified/`, `output/scene-audit/`, `output/production-visual/`, `output/page-overview-*.jpg`, `output/production-overview-*.jpg` and `.taste-skill/`. [RELEASE-EVIDENCE.json](RELEASE-EVIDENCE.json) preserves the result summaries, public-file hashes, raw-report hashes, certificate details, events and redirect chains in Git. [PROVIDER-READBACK.json](PROVIDER-READBACK.json) and [platform configuration](PLATFORM-CONFIGURATION.json) preserve scoped provider state without credentials.

## Measured performance

Lighthouse **13.5.0**, Edge/Chromium **155**, single sequential headless lab runs. Mobile uses Lighthouse's Moto G Power emulation and simulated throttling; desktop uses its desktop preset. Exact throttling and CPU benchmark values are in the evidence JSON.

| Environment | Performance | Accessibility | Best practices | SEO | LCP | CLS | TBT |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Original public Vercel, mobile baseline | 49 | 100 | 100 | 100 | 4.60s | 0 | 1,111ms |
| Cloudflare preview, mobile | 81 | 100 | 100 | 69 | 3.73s | 0 | 322ms |
| **Production, mobile** | **85** | **100** | **100** | **100** | **3.50s** | **0** | **255ms** |
| **Production, desktop** | **99** | **100** | **100** | **100** | **0.82s** | **0** | **17.5ms** |

Preview SEO is reduced by its deliberate noindex. Mobile Lighthouse warns that this host's CPU is slower than its expected calibration. These are lab snapshots with differing host/network conditions, not causal improvement, field CWV, measured INP or conversion uplift. Mobile LCP remains above the 2.5s target. The image-rich opening and local motion layer retain the user-approved cinematic priority; no inaccessible blank content, unbounded trigger accumulation or sustained scroll trap was observed. Field evidence should guide a later performance pass.

## Legacy transition and privacy

Only after production HTTP, browser, accessibility and performance checks passed was the isolated Vercel artifact deployed. Two source deployments accepted `vercel.json` but returned `routes: null` and served the fallback. The tested correction uses [Vercel Build Output API v3 routing](https://vercel.com/docs/build-output-api/configuration), an explicit local config and `--prebuilt`; it creates no function or paid build product. Provider readback shows the redirect route on the intended existing project. Vercel protection on immutable deployment URLs remains intact; the public production alias was tested without an authentication bypass.

The final check records **14** HTTP cases: homepage, four portraits, credits and invalid route, each plain and with repeated/encoded query values. First response is 308, `Location` preserves path and query exactly, then valid pages are 200 and the invalid page is 404. No loop occurs. Example:

`https://malaysia-between-places.vercel.app/destinations/sabah/?utm_source=legacy&tag=one&tag=two&q=island%20water`

→ **308** `https://malaysia.ismailstudio.my/destinations/sabah/?utm_source=legacy&tag=one&tag=two&q=island%20water` → **200**.

Browser-local fragments `home`, `prologue`, `field-notes`, `streets`, `coast`, `borneo`, `ending` and `about` survive. Cloudflare `_redirects` was not used to claim control of Vercel traffic.

GA4 collection is **incomplete/unverified**: no real Measurement ID/property or DebugView access was supplied. The local `malaysia:portfolio_outbound_click` hook emits placement, source pathname, destination host and `consent_state: no-collection`; it stores/transmits nothing. All five homepage placements were observed once each, without raw query/PII or cookies. Studio anchors work independently of scripts.

Existing zone-wide Cloudflare analytics initially injected a CSP-blocked beacon. A single [hostname-scoped Configuration Rule](https://developers.cloudflare.com/rules/configuration-rules/settings/) now sets `disable_rum: true` only for `malaysia.ismailstudio.my`. The original zone analytics configuration was preserved. Browser retest confirms no beacon injection or CSP error. Optional collection remains off, matching the public privacy statement and strict self-only CSP.

Future measurement requires an accessible free property, appropriate consent, tested narrow CSP and real event/debug proof before collection is enabled or privacy text changes. At 30 days, review actual query/language demand and eligible route sessions if collection exists; at 60 days, compare outbound visits by placement and route; at 90 days, consider a reviewed Bahasa Melayu pilot and measured design iteration. These are recommendations, not scheduled jobs or claims of current data. Search Console indexing, rankings, field CWV and business conversions are not verified.

## Recovery and repeatable checks

For a later Cloudflare regression, restore this verified static version from the repo root:

```powershell
npx wrangler rollback 30b9eaad-a6d5-441e-b375-a5ad2afa669a --env='' --name malaysia-between-places --yes --message 'Restore verified Malaysia release'
```

This is the first Cloudflare release, so it is the recovery point for later changes, not a pre-migration Cloudflare version. Keep the custom domain and the hostname privacy rule; do not remove the DNS zone. [Cloudflare rollback behavior](https://developers.cloudflare.com/workers/versions-and-deployments/rollbacks/) and installed CLI syntax were checked. No rollback was executed.

Original Vercel deployment remains `dpl_H9WTx7ETSnAoG86CqVi1dy2XSH14`, [original deployment URL](https://malaysia-between-places-hjgjuq3ve.vercel.app/). [Hobby Instant Rollback](https://vercel.com/docs/instant-rollback) only reaches the immediately previous deployment, which is now an intermediate fallback rather than the original site. Do not assume the original ID is eligible or upgrade the plan. A free recovery artifact is therefore prepared from all **42 original public files**, directly from the original Git commit, with hashes and original headers:

```powershell
node scripts/prepare-legacy-recovery.mjs
Set-Location output/legacy-recovery
vercel deploy --prebuilt --prod --yes --scope team_y1FMLs1LWgVb2dOvegEGYVkf --project prj_j1mVVCiiVs1jNefaK5BEILm1on0x --local-config vercel.json
```

The recovery artifact is prepared, not deployed or restoration-tested. Reverify the old site's 200 responses, metadata and assets after using it. Restoring legacy Vercel does not restore the new hostname; prefer the validated Cloudflare version when recovering new-host failures. Reconcile canonical/indexing deliberately if abandoning the migration. Git recovery is the retained original commit/tag; no force push or destructive reset is needed.

Reproduce the release checks from the repo root with `npm ci`, `npm run verify`, then `node scripts/verify-hosted.mjs https://malaysia.ismailstudio.my/ production`, `node scripts/verify-transition.mjs`, and `py codex-handoff/scripts/verify_live.py --production https://malaysia.ismailstudio.my/ --legacy https://malaysia-between-places.vercel.app/ --json`. `verify-hosted` uses `output/release-artifact.json`, generated by `py scripts/check-release.py` after the reviewed build. Do not rebuild while a browser is inspecting the artifact. The final receipt contains actual results and limitations; reruns replace local raw evidence.

All hard gates in the approved Definition of Done are met. Conditional analytics/Search Console work and the documented browser/lab limitations remain disclosed. There is no unresolved external blocker to the shipped website or legacy transition.
