# SEO and content preservation — expand depth, not boilerplate

## V1 assets to preserve
- Canonical `https://malaysia.ismailstudio.my/`; SEO-valid static routes `/`, `/destinations/kuala-lumpur/`, `/destinations/george-town/`, `/destinations/langkawi/`, `/destinations/sabah/`, `/credits/`, real 404.
- Individual title, description, H1, OG URL/image, JSON-LD only where truthful, sitemap, robots, semantic navigation and editorial prose accessible without JavaScript.
- V1 researched English `en-MY` stories; update research if necessary but no language switch until quality translations and evidence. Do not invent search volume or guaranteed rank.
- Source citations and factual separation from changing visitor info/opening times.

## V2 requirements
- Immersive SVG/Canvas scenes must be progressive enhancement, not HTML replacements. Screen readers and crawlers must be able to read true destination route content and meaningful links without rendering Canvas.
- Distinct factual essays with introductory copy/FAQ only if genuinely useful; avoid thin, duplicated boilerplate and fabricated attractions.
- Sitemap and canonical reflect exactly the deployed domain/routes; update if adding pages, and only add pages with real user value.
- Verify no `noindex` in production, no unexpected duplicate URL/index canonical, no `robots.txt` blocking and valid structured data (valid schema doesn't mean guaranteed rich result).
- Consider interaction timing / LCP / CLS metrics before preloading all photographs; don't send huge cinematic animations as render-blocking JS.
- Maintain Vercel redirect and canonical Cloudflare to prevent duplicate versions; test Vercel 308 actual target, query and path behavior.
- Research market/keywords from reliable sources where current, but don't overengineer irrelevant SEO pages solely for traffic; studio conversion is primary business goal.

## SEO audit evidence
Test 6+ public routes for HTTP status, unique titles/metas, 1 meaningful H1, correct canonicals, crawlable body text, internal links, images alt/dimensions, JSON-LD parse, robots/sitemap. Test invalid path returns real 404. Verify no private source/config accessible in production. Record command, date, result and exceptions. Use Google Search Console only if connected and authorized; future rankings are not a release claim.
