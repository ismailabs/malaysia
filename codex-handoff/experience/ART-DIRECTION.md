# Creative art direction — cinematic Malaysia, not a tourism template

## Creative thesis
**"A country seen between the landmarks."** Show Malaysia through lived-in transitions: the shophouse's shaded five-foot way, a market stall's rhythm, a city turning gold, a ferry or island horizon, limestone silhouettes, mist rising through Sabah forest. The visual device must be derived from real subject material. The project should feel like an authored documentary and a demonstration of exemplary frontend craft.

Do NOT copy the current layout; preserve authentic Malaysian identity and meaningful story, not its exact palette or hero. Three credible direction explorations using installed Taste Skill are mandatory; choose an ambitious, grounded direction with documented rationale. Option examples below are references for evaluation, not a demand to blend them:

A. **Moving field journal** — travel contact sheets, editorial notes, scene cuts, typographic atlas, picture-led transitions.
B. **Between city and rain** — shifting light, rich photographic fields, cinema-wide cuts, restrained documentary captions.
C. **Malaysia, in chapters** — monumental typesetting and restrained labels, individual chapter visual language, bold asymmetric compositions.

## Visual principles
- One dominant idea tied to Malaysia: transitions and the spaces between things; each movement reveals a real place, not an arbitrary effect.
- Full-bleed documentary media with accurate captions and photographer credits; vary composition (full-width, horizontal contact sheet, documentary portrait, detail crop, asymmetrical layered typography).
- Deliberate type roles: clear large cinematic headlines, substantial readable body copy, quiet ancillary geography/metadata. Avoid invented editorial jargon, fake stamps and decorative UI clutter.
- Color should come from source material (city at dusk, archival paper, tropical greenery, market color, ocean light) and sustain text contrast. Typography and palette are open to reinvention.
- Art direction should create a recognizable identity: credits, favicon, meaningful logo lockup, restrained pattern system, consistent link affordances.
- Every section earns its presence through a claim, sensory detail, fact, visual material or visitor action; avoid empty visual-only padding and repeated grid templates.
- Respect source photography. No AI-generated images passed off as documentary photographs. Generated abstract assets must be clearly distinguished from factual photos when relevant.

## Scene map (adapt after research)
1. **Opening — Malaysia in one breath**: exceptional hero still/cinematic sequence, visible and immediately understandable title, invitation to explore, featured geography.
2. **Street life — the human scale**: KL market and George Town five-foot way; tactile horizontal progression with accessible native controls.
3. **A change in rhythm**: narrative transition to coast; elegant typography morph and controlled cinematic camera movement.
4. **Island time — Langkawi**: dramatic portal/story reveal; documentary caption, real landform.
5. **Across the sea — Sabah**: layered Kinabalu imagery; geography without pretending travel between places is physically continuous.
6. **Choose a place**: navigable field notes to all destination pages; strongly differentiated overview and real metadata.
7. **Studio authorship**: direct evidence of crafted interface, design thinking and interactive storytelling; no fabricated client results.
8. **Closing & conversion**: compelling CTA to `https://ismailstudio.my/`, with clear intent and attribution.

## Motion choreography
- Start with a strong STILL layout; animations reveal structure, not compensate for missing content.
- Prioritize tasteful but bold: multi-stage hero assembly, image parallax, editorial text transitions, contact-sheet/gallery scroll, reveal masks, cursor/hover physics (pointer fine only), section-to-section atmospheric contrast.
- Implement with GSAP ScrollTrigger; pin only when it adds a narrative reason. Align title, captions, photos and controls to scroll positions; avoid dead time, blank panels and hijacked wheel interaction.
- On touch/narrow widths: alternative choreography, no forced horizontal scroll traps. Honor reduced motion with visible content and no scroll pin/scrub/marquee.
- One accessible interaction per segment beyond scroll (e.g. select scene, play ambient microstory, gallery chapter navigation). Do not force autoplay audio/video or unrequested location permission.
- No scroll-based soft locking of main content that interferes with keyboard focus. Test Back/Forward, anchors and manual scroll at multiple widths.

## Image sourcing and rights
- Inventory original images and `assets/images/sources.json`. Verify original photo URLs/license conditions and keep credits on a dedicated accessible page/section.
- Search reputable open archives where appropriate. Distinguish copyright license from model assumptions. Record exact source URL, author, license version, attribution format, any modifications, date retrieved and local filename.
- Unlicensed stock, scraping without permission, hotlink-only dependencies and unverifiable rights are not acceptable. Zero paid media.
- Optimize variants without degrading hero image quality. Use AVIF/WebP where supported and documented; include functional fallback, proper alt text, dimensions, lazy strategy, mobile art direction when needed.
- Video only when genuinely sourced with reuse rights, optional on mobile, muted/autoplay only when sensible, poster/static fallback. No blocking media dependencies.

## Design review loop
For each hero + destination archetype, take screenshots at >= 390, 768, 1440 and 1920 CSS px, plus representative 320 px constraint test. Ask: Can visitor identify page, place and action within first viewport? Does every picture's crop work? Is typography legible? Do scenes connect? Is it distinct from generic tourism templates? Are pages complete in still state? Track 3 largest failures and fix. Repeat until quality criteria in TEST-PLAN pass. The subjective design goal is evaluated with documented screenshots, not fabricated award claims.
