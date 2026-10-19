# Legacy Vercel redirect and rollback — do this LAST

The Vercel deployment at `https://malaysia-between-places.vercel.app/` is a **different host**. Deploying a `_redirects` file or a Worker on Cloudflare does NOT give control of the Vercel hostname. The old origin must be changed via its Vercel project, and the user authorized that scoped change *after* the new Cloudflare production works.

## Release dependency
Proceed only after:
- New Cloudflare custom hostname serves all destination paths with valid TLS and primary content.
- No Cloudflare redirect loop, 404, meta noindex, mixed content, critical browser/accessibility breakage or defective studio link.
- Cloudflare rollback plan and previous Vercel deployment link are recorded.

## Vercel changes
1. Identify exact old Vercel project/team/production alias; read actual Vercel CLI/API docs and current configuration. Do not assume a CLI login is scoped to the correct project.
2. Determine whether project-level redirects or a tiny dedicated redirect-only production deployment are safest without breaking the new Cloudflare code branch. **Do not replace the main repo's Cloudflare config with Vercel redirect rules.**
3. If deploying a minimal redirect-only Vercel artifact, use an isolated working directory and explicitly link to the original Vercel project. `templates/legacy-vercel-redirect.vercel.json.example` is a template, NOT automatically active. Verify Vercel's 308 `permanent` redirect semantics; never deploy it to the Cloudflare host.
4. Map old paths to meaningful new routes. Home root => new home; preserve matching destination paths. Avoid a blanket catchall to homepage when destination equivalents exist; test query forwarding explicitly.
5. Test `https://malaysia-between-places.vercel.app/` and representative deep links with a client that does not automatically follow redirects, record first response 301/308 and `Location` header, then follow and verify new 200. Fragments are browser-local and not sent in HTTP requests; design anchors accordingly.
6. If changing Vercel requires permission/access denied, leave live legacy unchanged, report blocker and use a temporary canonical strategy when controllable. Do not claim a legacy redirect exists.

## Rollback
**Cloudflare breakage BEFORE legacy redirect:** restore last working Cloudflare Worker version/Pages deployment or detach new route if needed; old Vercel remains available. Cloudflare Worker deployment versions support rollback (consult current docs).

**Cloudflare breakage AFTER legacy redirect:** quickly restore previous Cloudflare deployment (prefer) while keeping canonical domain working. If restoration impossible, revert the Vercel redirect/return prior Vercel production and adjust canonical/robots deliberately; note Search Engine consequences. Never delete a domain/DNS zone to roll back a simple site.

**Version control:** keep original repo commit SHA, pre-deploy snapshot, Cloudflare deployment ID and old Vercel project production deployment ID. Do not force push or squash away the only rollback history.

## References
- https://vercel.com/docs/project-configuration/vercel-json (redirects, permanent 308)
- https://vercel.com/docs/cli/redirects (project-level redirects)
- https://developers.cloudflare.com/workers/versions-and-deployments/rollbacks/
