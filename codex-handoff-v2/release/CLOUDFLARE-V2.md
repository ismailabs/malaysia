# V2 Cloudflare release runbook — controlled update of existing Worker

## Scope
Production site `https://malaysia.ismailstudio.my/` already runs as Workers Static Assets (`malaysia-between-places`, existing `wrangler.jsonc`, static `dist/`), with DNS attached. **Do not provision a second paid product, backend or new domain**, and do not edit unrelated Cloudflare zone rules. Prefer updating existing Worker rather than migrating to Pages for no reason.

## 0. Preserve existing state
- Inspect `wrangler.jsonc`, local installed Wrangler version, Cloudflare account/project scope, target route; compare with account/domain readback. Never assume historical IDs still current or accidentally point to another account.
- Record current deployment/version, custom domain binding, DNS, TLS and hostname-specific analytics privacy rules. Validate git branch commit and working tree; record V1 rollback version.
- Inspect actual Cloudflare docs for Workers Static Assets, Wrangler deployment flags, versions/rollbacks, custom domains and asset routing before executing commands. Documentation can change.

## 1. Stage only allowed static files
- Extend `scripts/generate_site.py`/assets as needed; run `npm ci`, `npm run build`, `npm run audit` and browser tests. Existing build's allowlist is security-critical.
- Inspect `dist/` manifest and verify that `.agents/`, `AGENTS.md`, `codex-handoff/`, `codex-handoff-v2/`, project `scripts/`, `.env`, credentials, test screenshots, source manifests and unvetted downloads are NOT public files.
- Check 404, robots, sitemap, CTAs, fonts, licensed images and static index routes.

## 2. Preview noindex
- Existing documented method uses `py scripts/prepare-preview.py` to stage `dist-preview/`, noindex headers, and `npx wrangler deploy --env preview --no-autoconfig` with a separate Workers preview name. **Verify installed Wrangler help/current config** before applying flags.
- Test hosted preview with real browser; check real map/gallery/finale/4 destination intros, reduced-motion, keyboard, touch/mobile, graphics, console, links and error paths. Check response `X-Robots-Tag: noindex, nofollow` and robots/canonical interactions; keep preview out of index.
- Fix and repeat. Preview passes are not enough; production will be checked separately.

## 3. Update PRODUCTION only when gates pass
- Verify project/account/domain scope again and diff changed config; no paid plan changes. Preserve existing domain, redirect, unrelated worker services and zone rules.
- Deploy updated `dist/` via existing production Wrangler static-assets path (typically `npx wrangler deploy --no-autoconfig`, but follow installed CLI docs and already working V1 workflow). Record CLI response, version/deployment ID, commit SHA/time.
- Directly observe HTTPS 200 for homepage + 4 destination routes + credits, 404 unknown, assets, correct canonical, TLS, V2 identity. Re-run real-browser signature motion/mobile/reduced/CTA flows against final hostname; compare artifact integrity where feasible.
- Verify `robots` no accidental `noindex` production. Confirm custom Worker domain remains bound and HTTP policies correct.

## 4. Vercel migration coexistence
V1 legacy Vercel URL currently redirects to Cloudflare (308), so do NOT make it host a second live V2 copy or redeploy legacy project needlessly. Test public alias path+query+fragment browser behavior after production release, preserve redirect route and recovery procedure. Cloudflare cannot configure a redirect for traffic reaching Vercel URL.

## 5. Rollback plan
Use Git commit/tag and Cloudflare's currently documented Worker version rollback or redeploy known V1 `dist/` from its tagged source. Before rolling back ensure no critical SEO URL changes or existing custom domain routing conflicts. Verify restored responses and studio CTA. Never assume changing the repo automatically rolls back deployed assets.

## Anti-claim protocol
Even if CLI reports successful upload, release is NOT complete until actual external URL, TLS, site identity, scene interactions, 404, SEO, privacy and legacy redirect are observed. If permission denied, stop unauthorized actions, finish local artifacts and explain blockers.

Sources:
- https://developers.cloudflare.com/workers/static-assets/
- https://developers.cloudflare.com/workers/best-practices/workers-best-practices/
- https://developers.cloudflare.com/workers/configuration/routing/custom-domains/
- https://developers.cloudflare.com/workers/versions-and-deployments/rollbacks/
