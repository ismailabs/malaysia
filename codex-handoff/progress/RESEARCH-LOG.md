# Research and design decisions · 19 October 2026

## Inventory and argument

The subject's material is the shaded five-foot way in George Town; Petaling Street's soya stall; nasi lemak on a banana leaf; KL's towers above street level; Langkawi's limestone seen from water; the separation of the peninsula and Borneo; Kinabalu's granite skyline; a stream at Mari Mari; the name Between Places; and the Ismail Studio author credit. Seven pre-existing photographic works, two reusable local type families and original licensed GSAP files are available. No author visit, interview or tourism endorsement is asserted.

Homepage argument: Malaysia changes at human scale (three unequal photographic prints); street life deserves close attention (native gallery); coast changes the rhythm (one expanding image scene); Borneo is across the sea (mountain/stream diptych); every place has its own story (four real essay links and a working preview selector); this is an authored digital experience (studio statement and outbound CTA). Audience: curious readers, potential visitors and people considering a studio commission. The site supplies editorial inspiration, not booking or current operational travel advice.

On this page, **Malaysia's changes of scale between street, coast and mountain become a wall of photographic prints that opens into a landscape**. The live interaction is a four-place photo preview with ordinary independent essay links. Motion carries the transition; the essays and controls work without it.

## Taste directions

Command: `node .agents/skills/design-taste-frontend/scripts/draw.mjs --sector culture --brief "Malaysia Between Places: documentary transitions from Petaling Street and George Town to Langkawi and Sabah, authored by Ismail Studio" --sections intro,gallery,showcase,list,about,cta,footer --tone editorial --keep type --options 3`.

- Selected `uneven-photographs`, seed **2061276754**, hero `three-prints-one-line`: preserves differences of photographic scale rather than collapsing all places into one image. A quiet still layout can support a more ambitious moving landscape.
- Rejected `contact-sheet`: its small thumbnail rows would suppress the landscape and repeat the old site's quiet metadata problem.
- Rejected `sentence-as-layout`: an inline image in a poster sentence gives too little space to the real places on the first screen.
- Existing Barlow and Manrope are retained as the two local, OFL-licensed families; Instrument's italic accent is preserved on disk but unused. Stone palette proportions are retained with an ink/forest field drawn from the photographs. No palette redraw.
- House-rule precedence resolves blueprint conflicts: every section has a heading, the gallery has real controls, footer has no empty viewport, no invented portrait/facts tile, captions stay readable, and the hero landscape ends inside the equal outer margins. The mobile title precedes the prints so topic and action remain immediately available.
- UI UX Pro Max `cinematic editorial travel --design-system` returned a generic Swiss/product pattern, so only its appropriate constraints (contrast, focus, touch targets, reduced motion, image dimensions) are adopted. Its generic feature blocks, pink accent and new fonts are rejected. This is a constraint tool, not the art direction.

## Query-to-route map

Public search queries and official result pages were reviewed on 2026-10-19. This is directional intent research; no Search Console, paid keyword database, search volumes, ranks or difficulty figures are available.

| Route | Query family and reader intent | Evidence / decision |
| --- | --- | --- |
| `/` | Malaysia travel culture, Malaysia interactive experience | Tourism Malaysia's national guide addresses geography and culture. This project offers a concise photographic entry and an honest studio attribution. |
| `/destinations/kuala-lumpur/` | Kuala Lumpur Petaling Street, KL street culture | [Tourism Malaysia](https://www.malaysia.travel/explore/top-places-to-visit-in-kuala-lumpur) and [Petaling Street](https://www.malaysia.travel/explore/5-best-hotspots-in-petaling-street-you-don-t-want-to-miss) establish skyline/street context. |
| `/destinations/george-town/` | George Town heritage, Penang shophouses | [UNESCO](https://whc.unesco.org/en/list/1223/) identifies a living trading-city heritage and 2008 inscription; [GTWHI](https://gtwhi.com.my/street-view/) supplies built streetscape detail. |
| `/destinations/langkawi/` | Langkawi nature, Kilim limestone mangroves | [UNESCO](https://www.unesco.org/en/iggp/langkawi-unesco-global-geopark) identifies Kilim, mangroves and limestone; [Tourism Malaysia](https://ebrochures.malaysia.travel/en/islands-and-beaches/langkawi-kedah/) establishes Kedah/northwest peninsula geography. |
| `/destinations/sabah/` | Sabah landscapes, Kinabalu Park forest | [Sabah Parks](https://www.sabahparks.org.my/kinabalu-park/) and [its heritage site](https://whs.sabahparks.org.my/kinabalu-park-as-world-heritage-site) support park context and the mountain's roughly 4,095 m scale. Sabah is described as a state, not a town. |

English and Malay query variants were searched, including `tempat menarik George Town Langkawi Sabah Kuala Lumpur`. Official English destination results support international inspiration intent; these results do not quantify relative language demand. Launch with `en-MY`, no incomplete language selector or hreflang. Revisit Bahasa Melayu after actual audience evidence and reviewed full-article translation are available.

## Platform and measurement choices

Workers Static Assets is selected: [routing documentation](https://developers.cloudflare.com/workers/static-assets/routing/static-site-generation/) explicitly supports directory indexes and real 404s. [Billing documentation](https://developers.cloudflare.com/workers/static-assets/billing-and-limitations/) says static asset requests/storage have no additional cost. Use no Worker compute/backend, `dist/` only, `auto-trailing-slash`, `404-page`. Cloudflare zone is active/free; hostname conflict checks returned no DNS record and no Worker domain. No subscription or paid feature is enabled.

[GSAP matchMedia](https://gsap.com/docs/v3/GSAP/gsap.matchMedia()/) supplies responsive/reduced-motion cleanup; local 3.15.0 vendor pair retained. [Web Interface Guidelines](https://raw.githubusercontent.com/vercel-labs/web-interface-guidelines/main/command.md) retrieved for review. User-approved cinematic ambition takes precedence over generic visual recipes; accessibility and native scrolling take precedence over blueprint gimmicks.

No GA4 property/Measurement ID or authorized collection endpoint is supplied. Ship a local, privacy-safe click hook with no cookies, PII, raw query strings or outgoing measurement requests. Portfolio anchors work independently. GA4 remains incomplete/unverified. Search Console/indexing and future conversion results are external, conditional tasks.

## Baseline observations

HEAD and advertised remote main: `99787eaa56e57d0e1c304ea09bd3b9929eb89ed1`. Taste inspector produced desktop/tablet/mobile captures in `.taste-skill/before/`: 15 FAIL and 9 WARN under its house rules (not a WCAG verdict). All ten images were opened. Main findings: crowded tiny labels, multiple three-line headings on mobile, large empty transition areas, three typefaces and decorative rules. Initial metadata targets Vercel; only one indexed route exists in source. Existing gallery/place-selection/dialog behavior is being preserved as capabilities in the new composition.

Playwright CLI Chrome launch failed because Chrome is not installed; `--browser=msedge` works. A first baseline run reported two transient local vendor connection failures, while fresh HTTP requests returned 200. Final test matrix must verify every vendor and runtime request afresh. No baseline Lighthouse score or field CWV is assumed.
