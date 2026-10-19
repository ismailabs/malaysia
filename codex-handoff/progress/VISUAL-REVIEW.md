# Visual review record

These are qualitative self-review notes, not measured design scores or an award claim. Taste's required rubric numbers below are subjective judgements only. Screenshot directories are excluded from deployment and Git.

## ROUND 1

Seen in one second: a Malaysian photographic journal with a clear invitation to begin.
Idea (one sentence): changes of scale between street, coast and mountain become uneven photographic prints that open into a landscape.
Live thing: place previews with normal essay links; a native, button-controlled street gallery.
Layout words by section: hero=three uneven prints / journey=panorama / streets=scrollable photographic frame / coast=held landscape / Borneo=diptych / places=index and preview / studio=photo strip and statement / footer=large name.
Scores: design 6 · usability 6 · creativity 7 · content 7 → overall 6.3.
Caps applied: unfinished tablet heading and transient asset failures; no claim of passing the visual gate.
Top three problems:
1. The tablet title wraps into three lines (`round-1-fixed-server/tablet-fold.jpg`). Widen the title's grid columns and tighten its display size at the tablet breakpoint.
2. The original local Python server intermittently refuses parallel requests (`round-1/desktop-fold.jpg` has missing prints). Replace it with a quiet Node static preview; recheck network responses.
3. A partially visible gallery caption hits the right edge. Give each native gallery stop a full-width composition with its image and caption contained inside the page frame.

## ROUND 2

All ten images listed by `.taste-skill/round-2/report.json` were opened: desktop/tablet/mobile folds plus every listed scroll contact sheet. Inspector: **0 FAIL, 4 WARN** before final corrections.

Seen in one second: Malaysia through a stall, a skyline and an island edge; topic and action are clear.
Idea (one sentence): the photographic field changes from close observation to landscape.
Live thing: the four-place preview and native gallery.
Layout words by section: as above; neighbouring sections use distinct compositions.
Scores: design 7 · usability 8 · creativity 7 · content 8 → overall 7.4.
Caps applied: the Borneo grid visibly puts the mountain below the copy rather than in its intended row, so visual review remains open.
Top three problems:
1. The mountain figure was auto-placed after the explicitly placed stream and text, leaving a large hole (`desktop-page-02.jpg`, `tablet-page-01.jpg`). Set its grid row explicitly.
2. The credit page's longest source-title headings wrap to three lines at 320px (browser evidence). Shorten the visible headings while retaining full photograph titles in the adjacent credit text.
3. Initial browser heading checks counted CSS grid stretching as extra text lines. Repair the harness to inspect actual text Range rectangles; also align grid headings to their start edge. This corrects measurement rather than suppressing real failures.

Warnings retained with reasons: responsive optical type roles yield more than five computed sizes; the gallery is an intentionally labelled native scroll region with buttons/keys; the inspector's empty-middle warning counts off-screen horizontal gallery content; no appropriate licensed footage was found, and the moving photographs are honest to the selected chapters. Final renders, scene sheets and checks remain required after these corrections.

## ROUND 3 · final built and hosted version

Seen in one second: a Malaysian photographic journey with a clear start action and studio attribution.
Idea (one sentence): differences of scale between street, coast and mountain become uneven photographic prints that open into a landscape.
Live thing: keyboard-operable place previews with real essay links, plus the native photo gallery.
Layout words by section: hero=three uneven prints / journey=panorama / streets=horizontal photographic frame / coast=expanding landscape / Borneo=diptych / places=index and preview / studio=photo strip and statement / footer=large name.
Scores: design 8 · usability 8 · creativity 7 · content 8 → overall 7.8.
Caps applied: creativity stays at 7 because an editorial photographic composition is an established approach. These are self-review judgements, not an external jury score.
Top three problems (most visible first), each with evidence and resolution:
1. Borneo's mountain previously fell below its copy. The explicit grid row resolves the hole; reviewed the final desktop/tablet captures and the Borneo section in `output/page-overview-desktop.jpg` and `output/production-overview-1440.jpg`.
2. Credit headings previously exceeded two lines at 320px. Shortened visible titles; the final six-width browser matrix measures actual text line rectangles and passes. All six mobile pages were reviewed in `output/page-overview-mobile.jpg` and `output/production-overview-390.jpg`.
3. Long automated full-page capture sometimes omits painted image layers after a rapid scroll sweep, including on reduced motion. This is not accepted as proof of a complete photograph layout. Fresh production viewport captures explicitly decode the image and show the hero, coast and place preview correctly in both reduced-motion and JS-disabled modes: all six files in `output/production-visual/` were opened. Their DOM states are complete, nonzero dimensions, visible, opacity 1 and no clipping. No product change was needed for this capture artifact.

The bundled inspector's final CDP screenshot/montage run stalled with `CDP timeout: Page.captureScreenshot`; it did not produce a final passing report. The last completed bundled inspection remains Round 2's 0 FAIL / 4 WARN. The handoff's `engineering/SKILL-ORCHESTRATION.md` explicitly permits an evidence-based manual equivalent when a script fails. Final equivalent review uses the full Playwright width/heading/overflow/axe matrix, actual page screenshots, the hosted viewport captures above, and `scripts/verify-scenes.mjs`.

Scene evidence: 13 exact progress frames each for desktop, touch-phone static fallback and reduced-motion static fallback; all 39 frames and all three contact sheets (`output/scene-audit/*-sheet.jpg`) reviewed. Desktop hold is 1.85 screens in total, with no scroll trap, unreadable caption or blank interval. Reduced motion has zero ScrollTriggers. The bundled desktop timing sample had 83 frames, median about 16.7ms and one frame over 34ms; it is an observation from this host, not a physical-device FPS guarantee.

Final image review includes the full-page local boards, 320/390/768/1024/1440/1920 responsive folds, two production overview boards, production 1440/390 opening folds and a destination opening, and all six targeted static production viewport captures. No remaining essential visual defect was observed. The reused image collection and the measured mobile LCP remain practical limits; no placeholder media or copy needs replacement before launch.
