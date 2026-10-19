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
