# Malaysia — Between Places

A photographic editorial about Kuala Lumpur, George Town, Langkawi and Sabah, made by Ismail Studio. Canonical production: https://malaysia.ismailstudio.my/.

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

Shared document authoring is in `scripts/generate_site.py`. Run `npm run generate` after changing it, then review the generated ordinary HTML. The build copies only allowlisted public files; it never uploads this repository root. Keep supporting instructions, skills, tooling, screenshots and credentials outside `dist/`.

## Release

`wrangler.jsonc` uses Workers Static Assets without a Worker backend, with directory-index URLs and real 404s. `dist/` is the production artifact. `py scripts/prepare-preview.py` creates `dist-preview/` with a noindex response header; deploy it using `npx wrangler deploy --env preview --no-autoconfig`. Production is an explicit top-level deployment after preview checks. Account and hostname are scoped in the config. Static asset requests/storage use Cloudflare's documented free entitlement; no paid product is provisioned.

The old Vercel project is separate. `node scripts/prepare-legacy.mjs` prepares an isolated redirect-only directory under `output/legacy-redirect/`; deploy it only after Cloudflare production verification. Root `vercel.json` points at `dist/` to avoid accidental source publication and does not contain migration redirects. The original Vercel deployment and source commit remain recoverable.

Follow [the approved handoff](codex-handoff/START-HERE.md), [execution log](codex-handoff/PROGRESS.md) and the final release report under `codex-handoff/progress/`. Refer to the report for real version IDs, tests, performance measurements, known limits and rollback commands. No traffic, search ranking or conversion uplift is claimed.
