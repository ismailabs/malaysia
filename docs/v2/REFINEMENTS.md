# Evidence-driven refinements

## Round 1 — geographic legibility and image/finale integrity
Observed in round1/map-1440-0.png: map-region labels fell behind the monumental title. In round1/map-390-0.png, the mountain was visibly soft because `sizes=100vw` chose a 640px landscape image which object-fit enlarged to fill an 844px portrait viewport. In round1/studio-1440-100.png, the studio copy covered the O in STUDIO and its heading wrapped to three lines.

Changes: place map-region labels above the silhouette, reduce geographic width, add four clearly named HTML destination links plus true projected SVG anchors, select a 2000px landscape source for the portrait opening, reduce desktop maker wordmark width and copy heading size. Keep decorative shutters partly open in the static path. Compare round2 images against these exact round1 frames. No visual-gate success is claimed before inspecting the resulting images.

## Round 2 — mobile readability, semantic map controls and motion performance
Round2 captures confirmed the first corrections: map-region labels are above the geography, the mobile mountain is sharp and the complete STUDIO wordmark is visible. The new HTML map links still crossed the large desktop title; moved them into the gap below the landmasses. The 320px browser matrix found four long headings; shortened the statements and resized the heritage title to keep two lines. Taste inspection found small mobile narrative/caption text and a scaled George Town credit approaching the edge. Increased actual narrative text to 16px and captions/controls to 13px; animate the photograph rather than its caption container. Removed the decorative kicker and text shadow. Darkened only the hero photographic layer for large-text contrast.

Axe found an interactive child in the map's image role. Replaced that role with an accessible group while retaining geographic anchor names and the four text-link alternatives. No test was disabled. Replaced finale layout-property animation with precomputed transform/scale assembly, preserving its photographic I-to-wordmark reveal. Native scroll, reduced motion and pause lifecycle remain.

Evidence: final/map-1440-0.png, final/map-390-0.png, final/gallery-390-75.png, final/studio-1440-100.png, final/destination-*-390-interaction.png and final/home-motion-*.webm. Final review and release logs record the actual outcome. Initial failures remain in release/local and release/local-final; the artifact server correctly rejects private paths, unlike the intentionally source-serving prototype server.


## Live refinement — fixed pause control clearance
Production screenshot production/george-town-1440-75.png exposed a remaining overlap: the fixed pause button covered a line of the held gallery note. Added desktop note clearance and bottom scroll padding for keyboard focus. The focused regression check compares the actual pause/narrative/essay-link rectangles at 50% and 100% of all four worlds across 320, 390, 768, 1024, 1440 and 1920px (48 states). Preview and final production results are recorded in release/clearance-*.json. This is a correction to an observed live defect, not a change to the artistic scope.


## Aspect-ratio and real navigation refinement
The live in-app browser at a shorter desktop height showed map links behind the country title. The earlier responsive cases checked content and scroll states but had not activated every map link at that aspect ratio. Replaced independent absolute offsets with dedicated geography/label/link/title rows, made the display type respond to available height, matched static/live stage dimensions, and placed the photo credit within the reading surface. The decorative title no longer intercepts pointer input.

Added physical map-link clicks and native Back/Forward journeys for all four destinations in normal motion, reduced motion and no-JS; included the observed 1264x716 and short 1920x720 viewports. These journeys also assert actual map-link/title and hero-credit/control clearance and opening Skip behavior. They are now part of npm run verify. Initial 12 and expanded 28 local journeys passed; the complete final run and hosted receipts are retained with named labels.

The dependency reproducibility check npm ci completed with 152 packages, zero reported vulnerabilities. npm warned that optional esbuild/workerd postinstall hooks were not on its allowlist; no permission expansion was made, and installed Wrangler 4.151.2 remained runnable.

Follow-up accessibility detail: AccessLint disallowed the interim SVG group role. Final markup is a descriptive SVG image without nested interactive children, with four separate keyboard/touch text links. The geographic labels and map navigation keep full text opacity; only decorative coastline artwork fades while the full locator travels out of the scene.
