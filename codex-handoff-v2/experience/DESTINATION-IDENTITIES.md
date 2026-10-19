# Four distinct destination acts

Each `/destinations/<slug>/` is a real indexable static essay, not a SPA modal. Each page has its own **cinematic introduction and one signature local interaction** with sensible keyboard/touch/no-motion paths. Shared header/footer/type token language, but no four copies of the same split-screen hero.

| Route | Subject and visual thesis | Potential unique interaction (Codex choose/research) |
|---|---|---|
| `/destinations/kuala-lumpur/` | Vertical density, city lights, Petronas skyline vs ground-level Petaling Street | Skyline→street match-cut, depth-separated planes or luminous grid shift; accessible tap/scroll transition |
| `/destinations/george-town/` | Layers of living urban heritage, walkway/shutter rhythms | Architectural SVG shutter aperture that reveals documentary photos; keyboard-open fallback |
| `/destinations/langkawi/` | Tidal limestone, sea horizon, island scale | Ocean/limestone portal or expanding waterline; no fabricated shoreline data |
| `/destinations/sabah/` | Borneo geographic separation, forest-to-Kinabalu elevation | Mountain elevation layers/mist silhouettes framing genuine photographs; no fake routes |

## Must protect
- Each page has original explanatory prose, own H1/title/description/canonical, accurate geography, sources, internal links and studio CTA.
- Claims about climate, heritage, coordinates, mountain altitude, access and attraction details must have credible citations and correct dates. No false travel guide/opening hours/hotel affiliate content.
- Each local interaction is useful/memorable, not another `gsap.from({opacity:0,y:20})` copied to all four.
- Reuse common JavaScript behaviors, styles, tokens and test infrastructure to avoid four independent brittle codebases.
- Test every route at 390, 1440, reduced-motion and no-JS, including Back/Forward and direct deep linking.
