# Cloudflare production runbook — static HTML/CSS/JS

## Hosting decision (research-verified 2026-10-19)
Cloudflare's current docs favor **Workers Static Assets** for new static websites; Pages is still supported. Prefer Workers Static Assets, no Worker script/backend, unless a verified platform, repo-integration or permissions issue makes Pages more suitable. `assets.directory` MUST point at `./dist`, never at the repository root. Preserve plain HTML routes and 404s rather than SPA fallbacks.

Primary docs:
- https://developers.cloudflare.com/workers/static-assets/
- https://developers.cloudflare.com/workers/static-assets/routing/static-site-generation/
- https://developers.cloudflare.com/workers/wrangler/configuration/
- https://developers.cloudflare.com/workers/configuration/routing/custom-domains/
- https://developers.cloudflare.com/pages/configuration/build-configuration/

## Before any change
1. Check authenticated Cloudflare identity/account and active `ismailstudio.my` zone. Handoff preparation observed the zone as active; verify again. Inspect conflicts for `malaysia.ismailstudio.my` DNS records, Workers routes and existing Pages project association. Preserve unrelated records/services.
2. Confirm Git remote and clean/recoverable checkout. Confirm existing Vercel production and capture live state.
3. Record free-tier/billing status and ensure no paid product or subscription is activated.
4. Read current Cloudflare docs and local Wrangler `--help` before version-sensitive commands. Node/npm may be installed already.
5. Decide hosting product, explain in decision log, and confirm platform grants appropriate access without requesting new credentials in chat.

## Prepare static artifact
1. Finish content, image rights, canonical URLs and static pages. Add a real `404.html` page (without inventing content) with link home.
2. Copy/adapt `codex-handoff/templates/_headers.sample` to site root `_headers` only after confirming correct CSP for actual analytics; do not use wildcard CSP. `_redirects` only for on-CLOUDFLARE path changes, if needed.
3. Run `py codex-handoff/scripts/build_static.py` (use explicit `--clean` only for a previously reviewed generated `dist/`). Inspect `dist/` and run `py codex-handoff/scripts/audit_static.py --root dist`. Fix failures.
4. Create root `wrangler.jsonc` based on `codex-handoff/templates/wrangler.jsonc.example`, use valid current `compatibility_date`, unique Worker name, `assets.directory: "./dist"`, `not_found_handling: "404-page"`. `assets.html_handling: "auto-trailing-slash"` supports directory index URLs. Verify exact schema and domain route permissions before production.
5. Add `/dist/`, `.taste-skill/` working artifacts, test screenshots and private reports to `.gitignore`, preserving public project-level skills only if intended. Keep source `codex-handoff/` in git only if desired; it MUST NOT reach `dist`.

## Deploy staging/preview (Workers)
At repo root, after confirming current CLI guidance:
```bat
npx wrangler --version
npx wrangler whoami
npx wrangler deploy --help
```
Check Wrangler's preview behavior or use a separate non-production Worker name without custom domain while testing. Avoid changing production DNS during staging. Use current supported Wrangler flags rather than blindly relying on a cached example. Preview may run on `*.workers.dev`; ensure it is not promoted as canonical/indexable content. Test direct preview routes, asset load, nav and CSP.

## Deploy production (authorized)
- Verify Cloudflare project name/account/domain route values refer **only** to the owned `malaysia.ismailstudio.my` hostname.
- Execute the production deployment with the approved Wrangler config (commonly `npx wrangler deploy` from repo root). Depending on configured route, initial deploy may also attach or update custom hostname. Where supported, configure custom domain by Wrangler `routes:[{"pattern":"malaysia.ismailstudio.my","custom_domain":true}]` or in Workers dashboard Settings > Domains & Routes; never duplicate with conflicting records.
- Ensure generated production deployment shows the correct commit/artifact version. Confirm TLS and DNS propagation using browser and HTTP, not just CLI's success text.
- Smoke-test exact origin and minimum five URLs. Verify cache behavior, 404, all content, CTA, metadata, robots, image/source credits. Refresh from external network/browser when possible.
- If production fails, roll back to the previous successful Cloudflare deployment/version or adjust route association as documented. Do NOT change old Vercel origin yet.

## Pages fallback (if selected)
- Pages Git integration for static HTML: leave build command blank when not needed, specify `dist` output directory (if build is performed separately, verify Pages CI actually generates dist). Alternatively use a current direct-upload workflow with deploy artifact. Set correct project and production branch. Verify this product's current repository integration and caching semantics.
- Add custom domain in Pages settings and confirm DNS with active zone. Keep old Vercel until Cloudflare is verified. Pages `_redirects` rules apply only to incoming Pages-served URLs.

## Independent live verification
```bat
py codex-handoff\scripts\verify_live.py --production https://malaysia.ismailstudio.my/
```
Inspect results, HTTP status and cert, then manually navigate interactions with Playwright. Production URLs are not proof of content changes: compare one unique page marker/destination link and public commit/release notes.

## Release record (write real values)
- Account/project/Worker or Pages ID:
- Deployment/version/commit:
- Exact launch time and URL:
- DNS status/certificate:
- Primary page HTTP statuses:
- Tests/screenshots:
- Analytics/privacy status:
- Legacy Vercel redirect status (defer to separate runbook):
- Rollback path:

## Critical security note
Never point Workers Static Assets directly at `./`: that would risk exposing `.agents/`, handoff documents or other source-only files. Default deployment must use a reviewed allowlisted `dist/`. Never upload credentials, `.env` files, browser auth states, private screenshots or service token files.
