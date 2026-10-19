# Keep legacy Vercel redirect, never unpublish blindly

Old public URL: `https://malaysia-between-places.vercel.app/` (V1 release reports 308 to Cloudflare, not an independently displayed original V1 page). Current production: `https://malaysia.ismailstudio.my/`.

1. Before V2 changes, test HTTP 308 path-and-query preservation from old hostname to Cloudflare, and record baseline. A Vercel 308 on `/destinations/langkawi/?utm_source=legacy&tag=x%20y` should preserve full route and query, with final Cloudflare 200. Browser fragments are not transmitted in HTTP; test same hash IDs or deliberate acceptable fallback in browser.
2. After Cloudflare V2 passes, re-run redirect checks for homepage, each destination, credits, nonexistent route, and encoded/repeated query parameters. Root legacy reconfiguration is unnecessary if redirect continues correctly.
3. If broken, use the **existing V1 tested isolated Vercel Build Output API v3 redirect artifact** and documented old project scope under `scripts/prepare-legacy.mjs`, NOT a generic `vercel --prod` from the source repository root. Inspect actual scripts and provider readback, verify intended project/team before changes.
4. Do not delete/reassign the original Vercel project, cancel paid plans, change unrelated domains or replace the redirect with duplicative SEO-hosting.
5. Preserve rollback recovery tag and original V1 Vercel release artifacts. For Cloudflare rollback use existing Worker's version history or known tagged build; verify legacy redirect still lands at healthy site.

Document actual statuses and target URL. Example responses in handoff are expected behavior, not test evidence of V2.
