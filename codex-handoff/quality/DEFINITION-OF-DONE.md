# Definition of Done — release contract

**A release is not done because the code compiles or the homepage looks impressive.** All hard gates below must be verified with actual results. Report soft objectives and external blockers separately. User authorized autonomy within this scope but not permission evasion or spending.

## Hard gates (all must pass or be explicitly listed as blocking)
- [ ] **Repo & recovery:** baseline captured, Git working branch identified, commit history and rollback instructions exist; local uncommitted user work not overwritten.
- [ ] **Deliverables:** complete redesigned flagship plus at least four distinct crawlable destination pages; no placeholder content, images or broken nav.
- [ ] **Technology:** semantic HTML, vanilla CSS/JS, GSAP/ScrollTrigger; no framework/backend and no new paid dependency.
- [ ] **Visual quality:** chosen art direction applied consistently; desktop/tablet/mobile screenshots inspected and top defects corrected, with evidence.
- [ ] **Functionality:** navigation, gallery, chapter controls, CTAs, history/anchors, link map and images function across documented widths.
- [ ] **Accessibility:** no severe keyboard trap, invisible primary content, broken contrast in essential UI, inaccessible nav; reduced-motion and JS-off content work.
- [ ] **Search readiness:** unique titles/H1/descriptions, canonical URLs, sitemap/robots, crawlable original place content, structured data when appropriate, internal links, 404 behavior.
- [ ] **Asset rights:** all third-party imagery, fonts and video have reviewed permissible reuse and credits; no fabricated factual images.
- [ ] **Release artifact:** `dist/` built from allowlisted public files; contains no `.agents`, `.git`, `codex-handoff`, secret or private report.
- [ ] **Browser validation:** real-browser tests executed and reported with viewport/evidence, console/network errors triaged, motion performance observations recorded.
- [ ] **Cloudflare:** new production deployed to the exact `https://malaysia.ismailstudio.my/` hostname with valid TLS; every primary route and asset verified via real HTTPS requests.
- [ ] **Legacy transition:** existing Vercel hostname configured to permanent redirect to new production **and verified**; if access prevents this, report a hard external blocker, don't claim full done.
- [ ] **Conversion:** functional, visible outbound links to `https://ismailstudio.my/` in agreed locations; measurement plan and privacy behaviors implemented accurately.
- [ ] **Final report:** exact canonical URL, commit SHA, deployed Cloudflare project/version, actual HTTP/test results, screenshots, redirection evidence, analytics status and rollback steps.

## Conditional external tasks (do not fabricate)
- GA4 event collection requires a real free Measurement ID, lawful consent state and accessible property/debug view. If those are unavailable, a working integration hook can ship but GA4 is **unverified/incomplete**. Do not hold users hostage for an irrelevant empty ID; report precisely.
- Cloudflare account/domain/worker permissions, Vercel project control, Git remote push rights and DNS can block deployment. Continue safe work, then provide exact human authorization action if needed. Never bypass a protection or silently use another account/domain.
- Search Console indexing and future ranking require external access/time. Mark separately from technical SEO.
- Perfect scores and measured conversion uplift are not delivery promises. Preserve the ambitious design and disclose actual performance tradeoffs.

## Acceptance artifacts
`codex-handoff/progress/FINAL-REPORT.md` should have:
- Production homepage plus four route URLs and actual HTTP status/certificate checks.
- Cloudflare deployment project/version, original Git base SHA, delivery SHA, Vercel redirect response chain.
- Screenshots and manual browser review annotations.
- Automation results including failed/skipped tests and reasons; current metrics where measured.
- Sources/media license register; SEO research route map and metadata review; analytics event proof or accurate missing prerequisites.
- Rollback commands/instructions and link to prior version.

## Final state terminology
- `COMPLETE`: all hard gates verified (plus optional external gaps disclosed).
- `PARTIAL — EXTERNAL BLOCKER`: code prepared/tested, external platform or privilege requires intervention.
- `PARTIAL — QUALITY BLOCKER`: tests, accessibility, visual design or release condition still failing.
- `NOT STARTED`: the handoff exists but Codex has not modified/deployed the site.

A checker or agent must never turn an unperformed step into a checked item. A separate future code release is required after this ZIP handoff.
