# Content architecture, routes, editorial completion

## Minimum delivered routes
Use real, crawlable static HTML pages with unique intent and complete content. URLs listed below are **proposed**, subject to SEO research; any changes must be documented in a route map and implemented consistently.

| Canonical path | Purpose | Unique subject |
| --- | --- | --- |
| `/` | Cinematic flagship editorial experience | The Malaysian journey; links to each destination and studio |
| `/destinations/kuala-lumpur/` | Kuala Lumpur portrait | City layers, markets, contemporary cityscape |
| `/destinations/george-town/` | George Town portrait | Heritage shophouses, shaded walkways, everyday routines |
| `/destinations/langkawi/` | Langkawi portrait | Coastal landscapes, limestone and island pace |
| `/destinations/sabah/` | Sabah portrait | Kinabalu and forest landscapes; note Sabah is a state, not a single city |

Directory index files (e.g. `destinations/langkawi/index.html`) avoid a JS router. Prefer conventional navigation with real anchors and browser History behavior. If SEO research favors dedicated `kinabalu` or `kuala-lumpur-petaling-street` pages, expansion is permitted only with researched original content.

## Every page must contain
- Unique H1, immediately discernible topic, original meta title/description, canonical absolute URL, social tags and accessible heading hierarchy.
- Distinct purpose; ~one informative documentary narrative organized into scannable sections with geography, scene descriptions, specific facts and accessible image captions. There is no arbitrary word count.
- Distinct primary image with true descriptive alt or decorative empty alt as appropriate; visible credits and license trail.
- Useful native navigation, breadcrumbs where appropriate, nearby/related destinations; no duplicate copy pasted across pages.
- A contextual, transparent link to the main studio website; label describes destination rather than deceptive "learn more". Identify as portfolio site when appropriate.
- No fabricated interviews, on-the-ground visits, dates, pricing, opening hours or historic details. Cite factual material in editorial source notes as appropriate.
- Accessible fallback with JS disabled, no pinned overlay hiding H1 or navigation, and functional internal links.

## Studio conversion placement
Homepage: at least one primary studio link in understandable navigation or credits, one contextual link near an experience showcase, and one distinct closing CTA. Destination pages: contextual attribution and a useful closing "Explore the studio behind this site" CTA. Keep hierarchy and context honest; do not impersonate Malaysia government/tourism bodies.

## Site navigation
Main logo -> homepage; clear journal/destinations index; four destination links; accessible modal if retained; editorial footer and studio credits; skip link, visible focus, close buttons, good anchors. Every route reachable through ordinary `<a href>` links without JS or search. Avoid trapping navigation in ScrollTrigger.

## Copy process
Research -> write a full copy deck -> validate facts/reuse rights -> match compositions -> implement HTML -> proofread en-MY -> screenshot line-wrapping at narrow widths. Document all editorial assumptions and references in `assets/images/sources.json` and a content sources document if creating additional details. Prioritize memorable, clear prose over travel cliché. A truthful small story beats 20 vague "unforgettable adventures" paragraphs.

## Proposed content inventory
- Opening promise and navigation.
- Kuala Lumpur: skyline plus human street scenes; contextualize Petaling Street correctly.
- George Town: built heritage and everyday activity; verify UNESCO reference from UNESCO primary source if used.
- Langkawi: island/karst scenery with accurate place-level photo captions.
- Sabah: Kinabalu and surrounding forest with accurate regional names and facts.
- A unified glossary/index of places/chapters, only if it adds wayfinding value.
- Credits, disclosure of independent editorial status, and Ismail Studio attribution.

## Content readiness gate
A page is not finished because it renders and has metadata. It must have a unique title, sufficient original subject-specific information, useful media, factual review, internal links, working conversion link and canonical URL. No placeholder lorem ipsum or invented proof.
