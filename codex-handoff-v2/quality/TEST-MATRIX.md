# Browser quality matrix and motion evidence

## Fixed browsers and responsive checks
Desktop: 1440×900, 1920×1080. Tablet: 768×1024/1024×900. Mobile: 390×844 and 320×720. At minimum Chromium/Edge, WebKit if available; Firefox when runnable. Report unavailable separately, never count as pass. Device emulation is not a physical-device test.

## Matrix per 6 content routes
- Load 200; no exceptions/console errors; all fetched assets have proper status; true 404 on invalid route.
- Layout: no horizontal body overflow, overlapping captions, uncontrolled pinned whitespace, invisible links, focus obscured by effects, text truncation, giant headings clipping at 200% zoom equivalent.
- Semantics: meaningful H1/landmarks, direct URL loads, anchor links, back/forward, alt descriptions and credit links.
- Reduced motion: preference honored immediately; no pin/scrub animation in static mode; all content/CTAs visible and correctly linked.
- JS off: full meaningful content and navigation, no invisible core sections (purely decorative render stages may disappear).
- Keyboard/touch: open/close nav, focus return, map/destination selection, gallery progression, CTA activation; escape closes overlays; no focus trap.
- No external runtime JS/CDN surprises, no fabricated analytics traffic, no private files served from `dist`.
- Accessibility scan (`axe`/AccessLint where available) with 0 critical/serious violations, plus manual keyboard, contrast, and reduced-motion checks. A 0-violation report is not accessibility certification.

## Signature scene specific motion tests
| Scene | Desktop actual states | Mobile actual states | Reduced-motion state |
|---|---|---|---|
| Malaysia map | Geographic first frame → intermediate transformation → real location frame; 5 scrub points | Accurate introduction + 2+ real states, no scroll trap | Readable map/summary + links and image |
| Gallery | 4 distinct destination reveal stages and at least 3 original compositional transitions | Touch/scroll shows 4 destinations, native predictable scroll | All destinations accessible without long animation |
| Studio finale | Photographic/editorial world transforms into studio reveal + CTA | Memorable adapted reveal + CTA | Immediate static studio statement + CTA |
| Four destination intros | Bespoke hero + per-route interaction observed | Bespoke mobile counterpart | Direct content access and navigation |

## Performance interpretation
Record V1-like local/live Lighthouse/mobile 390 and desktop 1440, LCP, CLS, TBT, bytes/requests, motion smoothness/frame observations in controlled runs. V1 self-report Lighthouse mobile 85/desktop 99, LCP 3.5s. User approved **moderate measured regression** in exchange for real visual improvement, so do not impose invented hard score 85 minimum. Treat a >15-point mobile score decrease or >1s worsened LCP as a strong investigation/review trigger, not automatic abandonment; justify any accepted regression with concrete creative gain and tested mobile path. Always require basic usability, no broken scrolling/focus and source-true claims.

## Verification proof
Record test command, build SHA, timestamp, browser/version, viewport, exact URL, output file paths, failures and retries. Screenshots and playthrough videos are evidence; don't claim visually reviewed before opening them. Duplicate runs without changes are unnecessary unless diagnosing nondeterministic bugs.
