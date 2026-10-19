# Search strategy and SEO requirements

## Search intent before design is finalized
SEO targets are **research choices** (discovery 7D, 11D, 12D), not assumed keyword volumes. The existing site is a Malaysia documentary and Ismail Studio is a service portfolio. Build destination topical relevance while transparently linking to the studio; do not make thin location pages designed only to rank for unrelated web design phrases.

## Deliverables
1. Keyword-to-route/intention map containing relevant queries, geography, language, intent, honest evidence and reasons for targeting.
2. Dedicated original static HTML pages at minimum: KL, George Town, Langkawi and Sabah. Unique titles, H1s, descriptions and real utility, not search-engine doorway pages.
3. Full cross-route link structure with `<a href>` actual URLs (not JS-only), breadcrumbs where helpful and a distinct studio outbound conversion action.
4. Sitemap generated from actually shipped production routes, `robots.txt`, canonical HTTPS absolute URLs, indexability audit, 404 behavior. Fix old Vercel canonicals and OpenGraph URLs.
5. Semantically appropriate structured data when evidence supports it: e.g. `WebSite`, `WebPage`, `BreadcrumbList`, `ImageObject` attribution. Don't assert `TouristAttraction` unless page content and facts genuinely support it; do not insert fake organization ratings, reviews or FAQ rich-result bait.
6. Accessibility and page speed basics that affect user experience and crawlability, with accurate page metadata and URL consistency.
7. Search Console setup/verification if account access exists; if not, provide steps and record it as optional external task. Do not fabricate indexing or ranking evidence.

## Per-page audit contract
- Exactly one meaningful H1, distinctive `<title>` and description; `lang` on `<html>`.
- Correct canonical URL `https://malaysia.ismailstudio.my{path}` (canonical strategy reviewed; avoid mixing trailing-slash URL variants).
- Real primary image `og:image` if available and rights allow; Open Graph title/description and Twitter card.
- Meaningful descriptive anchors, real internal navigation and `img` dimension attributes.
- Only visible site content in JSON-LD. Verify JSON syntax/schema with validator where supported.
- Crawlability without JS, no accidental `noindex`, `nofollow` or blocked assets on production. `robots.txt` and sitemap point to target origin.
- Status code of valid pages is 200, invalid pages are actual 404 (not soft-200 index.html for unknown routes). Test headers and deployed behavior.
- Maintain source credits and accurate Malaysia geography. Link credible primary sources when factual claims warrant it.

## Migration SEO hazards
1. Canonicals and OG tags MUST point at Cloudflare production (not Vercel preview).
2. Search engines should have one preferred indexing origin. After Cloudflare passes smoke tests, configure the old Vercel host to perform a permanent host redirect, preserving valid paths and parameters; do NOT set a broad catchall on the new Cloudflare origin.
3. `_redirects` in Cloudflare only applies to Cloudflare-served requests; it will not intercept traffic arriving directly at `*.vercel.app`.
4. If redirect cannot be changed on Vercel due to ownership or configuration, ensure old pages use canonical to new hostname (if controllable) and accurately report remaining duplicate-content risk. Do not falsely claim a 301/308 was deployed.
5. Update sitemap, links, favicon and social share metadata. Verify `robots.txt` after DNS has propagated and TLS works.
6. Do not redirect all legacy routes to the home page when a useful mapped new route exists.
7. Prelaunch Cloudflare preview should avoid premature public indexing; ensure production is indexable. Preserve test evidence.
8. If routing uses Workers Static Assets, verify the actual `not_found_handling` policy; do not rely on SPA fallback for editorial pages.

## SEO outcome definition
Implemented and verified metadata/route/crawl hygiene is an achievable release gate; "rank #1" and measured organic traffic improvements are not. Create a 30/60/90-day post-launch measurement plan without scheduling work the tool cannot actually run.

## Google primary documentation (verify freshness at execution)
- https://developers.google.com/search/docs/fundamentals/seo-starter-guide
- https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls
- https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data
- https://developers.google.com/search/docs/specialty/international/localized-versions
- https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap
