# Autonomous implementation tracker — executable phases

Codex: copy this table into `codex-handoff/progress/PROGRESS.md` at the start, update evidence after each stage, and keep working. Do not mark an unrun test as passed. Changes to live production are authorized only after deployment gates. Do not wait for subjective design approvals; pick and document a grounded concept.

| Phase | Key output | Exit evidence | If blocked |
| --- | --- | --- | --- |
| 0. Reconcile state | Git/status/skills/source baseline | SHA, working branch, current files, working original | Do not overwrite local changes; work around safely |
| 1. Research | Intent map, style study, media plan | dated source URLs, query-route map, chosen concept | Mark missing source, choose factually safe narrower scope |
| 2. Design | design tokens, home/destination storyboards, media register | directional rationale, licensed image list, still layout screenshots | Use own local CSS and accessible photography; no invention |
| 3. Build | headline homepage plus four unique static place pages | all five routes, working navigation, content, CTA | Keep working no-JS shell; avoid unavailable APIs |
| 4. Animate | sophisticated GSAP motion on supported devices | motion capture, reduced-motion and touch fallback | Replace unreliable effects, don't hide content |
| 5. Validate | static audit, browser matrix, SEO/CRO checks | actual test log, screenshots, failures fixed | Document unsupported browser runner, use alternative |
| 6. Stage | allowlisted dist and Cloudflare preview | inspected files, preview route/TLS checks | Resolve auth/permissions without changing unrelated services |
| 7. Launch | Cloudflare production on exact subdomain | HTTPS verification, URLs, screenshot, deployment ID | Roll back failed release, record external blocker |
| 8. Redirect | permanent old Vercel -> Cloudflare | old host first-hop 301/308, deep link checks | Report Vercel permission issue; don't claim complete |
| 9. Close | source commit, report, rollback evidence | final report status/links, real metrics and gaps | Disclose all unresolved items |

## Rules for iteration
- Before work, inspect current code and run available baseline tests; protect existing user work.
- Implement one full visual vertical slice first, then extend to all routes. Avoid a never-ending redesign of the hero while other pages remain empty.
- Timebox research by decisions, not a fixed number of hours. Once requirements are grounded, execute.
- Fix red/gating browser issues before adding ornamental effects. But do not water down chosen ambitious style just to inflate scores.
- On failed test: record reproduction and expected/actual, fix, rerun. On auth failure: continue with safe preview/local stages and report exact permission request needed.
- Never deploy placeholder tracking identifiers, generic photo URLs, fabricated data or synthetic performance scores.
- Finished result is a live release with evidence, NOT a polished markdown document alone.

## Material outputs to persist
`progress/PROGRESS.md`, `progress/RESEARCH-LOG.md`, `progress/ASSET-RIGHTS.md`, `progress/TEST-RESULTS.md`, screenshots (private/excluded), `progress/FINAL-REPORT.md`. Working paths are not necessarily committed; preserve safe non-secret release evidence in version control or an authorized artifact system.
