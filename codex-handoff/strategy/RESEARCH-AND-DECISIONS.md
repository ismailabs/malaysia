# Research protocol, decision log and evidence standard

Do discovery ONCE, proportionally; avoid analysis paralysis. Record decisions and move into implementation. Use live current official documentation for technical behavior, and documentary or government/museum/tourism sources for factual Malaysia claims. Brand integrity matters more than generic keyword volume.

## Evidence-based search/content decisions
1. Audit existing content: wording, regions, page types, internal links, search snippet, image source and original story. Map potential missing answers for visitors to Malaysia and for creative clients.
2. Research major candidate clusters: Malaysia travel inspiration/culture; Kuala Lumpur urban experience; George Town/heritage street life; Langkawi nature and limestone islands; Sabah/Kinabalu landscapes; "Malaysia interactive experience" or design portfolio showcase. Search intent may conflict. Do not force service keywords unrelated to destination pages.
3. Use current publicly accessible primary sources and SERP examples where permitted. If Search Console, keyword tools or analytics are unavailable, record directional reasoning and **do not invent search volumes, rankings or difficulty metrics**. Write a one-page query-to-page map with source/date for every decision.
4. Choose English baseline from `lang="en-MY"`; multilingual editions only if credible demand, accurate translation, content maintenance and proper `hreflang`/URLs are feasible within zero budget. No automatic locale dropdown that swaps only UI labels while article content stays English.
5. Evaluate competitor/reference websites for design patterns without duplicating artwork, code or protected text. Use current `design-taste-frontend` procedures for selecting researched directions. Attach licensing evidence for material assets.
6. Make design choices by visitor comprehension, story relevance, image quality, mobile viewport and brand differentiation, not synthetic scoring. Record at least two credible rejected directions with specific reasons and one chosen direction.

## Mandatory decision log schema
| Decision | Options | Selected | Evidence URL/date or user decision | Tradeoff | Revisit trigger |
| --- | --- | --- | --- | --- | --- |
| Hosting | Workers Static Assets / Pages | pending | Cloudflare docs | Existing Vercel behavior/route handling | Documented blocker |
| Languages | en-MY / en+ms / more | pending | search research | maintenance cost | confirmed demand |
| Story structure | flagship + four pages / expanded | flagship + four baseline | user approved C | research richness | poor evidence |
| Design direction | cinematic options | pending | subject-specific visual inventory | motion + readability | fails live review |
| Analytics | GA4 + Cloudflare analytics | pending | ID/consent availability | privacy + CSP | incomplete integration |
| Motion detail | experimental GSAP | agreed | user approved 5A,17B | CPU, battery | critical defects |
| Legacy redirect | Vercel control / fallback | Vercel-controlled | deployment API docs | routing permissions | actual blocker |

## Source quality
- Verified project sources: local files, actual public website, GitHub revision, user-provided business links. Distinguish these from marketing claims.
- Malaysian factual content: geographically credible government, UNESCO, park authorities, museums, institutional archives. Verify specifics like coordinates, heritage classification, prices, opening hours and seasonal constraints; omit unverifiable claims.
- Performance/accessibility: browser instrumentation, axe/Playwright/Lighthouse/DevTools where installed. Tools may require runtime installation. Report actual run details.
- Current platform: developers.cloudflare.com, vercel.com/docs, developers.google.com/search, gsap.com/docs, playwright.dev. Recheck rather than assume historical behavior.

## Stop researching and start building when
There is an approved information architecture, chosen direction and assets plan, complete route inventory, prioritized conversion placements and no material missing piece that would cause a rewrite. Research gaps can be flagged and resolved in parallel while implementing the static skeleton.
