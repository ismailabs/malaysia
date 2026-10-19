# Malaysia — Between Places

A cinematic Malaysian editorial about Kuala Lumpur, George Town, Langkawi and Sabah, made by Ismail Studio. V2 moves from an accurate geographic locator through four photographic worlds to an authored studio finale. Canonical production: https://malaysia.ismailstudio.my/.

Semantic HTML, vanilla CSS, native JavaScript modules, local GSAP 3.15.0 and ScrollTrigger. No framework, backend, paid media, analytics cookie or external runtime CDN. Editorial sources and image credits are visible at `/credits/` and on the portraits.

## Local work

Node 24 and Python 3 are used for source-only tooling. On Windows:

```powershell
npm ci
npm run build
npm run audit
npm run preview
```

Preview serves the reviewed artifact at `http://127.0.0.1:8001/`. `npm run verify` builds, audits, starts a temporary preview and runs the browser matrix. The runner uses installed Edge for Chromium checks and checks WebKit/Firefox when their Playwright binaries can run. An unavailable optional browser is explicitly reported. Browser evidence stays in ignored `output/`.

Shared document authoring is in `scripts/generate_site.py` and `scripts/v2_design.py`. `npm run build` generates the ordinary HTML and stages only reviewed public files using `scripts/build-static.py` and its explicit allowlist. Never deploy this repository root. Keep instructions, skills, tooling, source registers, screenshots and credentials outside `dist/`. Do not rebuild a directory while a browser suite is reading it.

## Release

`wrangler.jsonc` uses Workers Static Assets without a Worker backend, with directory-index URLs and real 404s. `dist/` is the production artifact. `py scripts/prepare-preview.py` creates `dist-preview/` with a noindex response header; deploy it using `npx wrangler deploy --env preview --no-autoconfig`. Production is an explicit top-level deployment after preview checks. Account and hostname are scoped in the config. Static asset requests/storage use Cloudflare's documented free entitlement; no paid product is provisioned.

The old Vercel project is separate. `node scripts/prepare-legacy.mjs` prepares an isolated redirect-only Build Output API v3 artifact under `output/legacy-redirect/`; deploy it with `--prebuilt`, from that directory with its explicit `--local-config`, only after Cloudflare production verification. The normal source deployment path on this project accepted redirects but emitted no routes; use the tested prebuilt path. Root `vercel.json` points at `dist/` to avoid accidental source publication and does not contain migration redirects. `node scripts/prepare-legacy-recovery.mjs` prepares the original 42 public files from Git for recovery without changing the checkout or deploying anything.

Follow [the approved V2 handoff](codex-handoff-v2/START-HERE.md) and [verification/recovery guide](docs/v2/VERIFICATION.md). Actual local comparison artifacts, prototype sources and detailed progress are retained under ignored `output/v2/`; final release receipts are summarized in `docs/v2/FINAL-REPORT.md`. The frozen V1 source remains recoverable through `malaysia-v1-before-v2-20261019`. Keep the existing Vercel redirect if its public path/query/fragment checks pass. No traffic, search ranking or conversion uplift is claimed.
