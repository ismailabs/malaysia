# START HERE — Production handoff for Codex Desktop

This folder contains **instructions and validation tooling, not a completed redesign**. Nothing in it indicates that DNS, production deployment, conversion tracking, SEO or visual testing has already been done.

## Mission
Build an original, cinematic documentary on Malaysia that serves equally as a memorable portfolio case study, driving qualified visits to `https://ismailstudio.my/`. Deliver a flagship and independent destination pages; retain vanilla HTML/CSS/JS/GSAP; publish to `https://malaysia.ismailstudio.my/` on Cloudflare; then, once validated, redirect the old Vercel hostname. Budget for new products/services: zero.

## Begin in Codex Desktop
1. Open folder `C:\Users\moham\OneDrive\Desktop\malaysia` as the workspace.
2. Ensure the ZIP was extracted into **the repository root**, so root `AGENTS.md` and `codex-handoff/START-HERE.md` exist. Do not replace any previously existing project instructions without merging them.
3. Start a fresh Codex session using GPT-6.1 Sol Ultra **if offered**; Max remains a viable alternative. A model setting cannot be commanded by this document.
4. Read `AGENTS.md`, this file, and `MANIFEST.json`. Then read all documents below before making consequential choices.
5. Start the job with this compact invocation (this is an execution command, not a request to write another prompt):

> Execute the approved Malaysia — Between Places production handoff in `AGENTS.md` and `codex-handoff/START-HERE.md`. Inspect all referenced material, current repository and local skills, then autonomously research, implement, verify and ship the site to the specified Cloudflare custom domain, with Vercel legacy redirect after live verification. Maintain checkpoints and a factual progress log. Don't stop after planning. No new paid services. Report true blockers and verify every claimed result.

## Read in order
1. `reference/REPOSITORY-BASELINE.md` — grounded starting facts; local changes may differ.
2. `strategy/PROJECT-CHARTER.md` — 20 binding decisions, priorities and scope.
3. `strategy/RESEARCH-AND-DECISIONS.md` — evidence-based choices and acceptance criteria.
4. `experience/ART-DIRECTION.md` — cinematic documentary concept, content and visual examples.
5. `experience/CONTENT-AND-ROUTES.md` — flagship and place pages, structured content requirements.
6. `engineering/ARCHITECTURE-AND-MOTION.md` — vanilla implementation and GSAP engineering.
7. `engineering/SKILL-ORCHESTRATION.md` — installed skill execution and limitations.
8. `growth/SEO-PLAN.md` — crawlability, query research, localization, structured data, redirects.
9. `growth/CRO-AND-ANALYTICS.md` — attribution, CTA events and privacy.
10. `quality/TEST-PLAN.md` and `quality/DEFINITION-OF-DONE.md` — browser, functional, a11y, measurable gates.
11. `quality/EXECUTION-TRACKER.md` — phased autonomous progress with honest exit evidence.
12. `release/CLOUDFLARE-RUNBOOK.md` and `release/VERCEL-REDIRECT-AND-ROLLBACK.md` — controlled migration.
13. `reference/SOURCES.md` and `templates/` — source links and optional templates.

## Tools shipped in this kit
- `scripts/build_static.py`: produces a clean `dist/` with only public assets and asserts that private agent/handoff material is excluded.
- `scripts/audit_static.py`: verifies built HTML structure, links, expected routes, metadata, and other static invariants (not a replacement for browser testing).
- `scripts/verify_live.py`: read-only HTTP checks for production and legacy redirects; use after deployments.
- `scripts/check_handoff.py`: verifies documentation integrity and required kit files.
- `templates/wrangler.jsonc.example`: initial Workers Static Assets configuration; customize after selecting infrastructure.
- `templates/legacy-vercel-redirect.vercel.json.example`: separate Vercel redirect deployment template, never install prematurely.
- `templates/measurement-plan.json`: event names and measurement mapping; not live analytics credentials.

## Recommended local commands (Windows CMD)
```bat
cd /d "C:\Users\moham\OneDrive\Desktop\malaysia"
py codex-handoff\scripts\check_handoff.py
py codex-handoff\scripts\build_static.py
py codex-handoff\scripts\audit_static.py --root dist
```
For subsequent rebuilds after checking that `dist/` contains only generated files, run `py codex-handoff\scripts\build_static.py --clean`.

After deploying:
```bat
py codex-handoff\scripts\verify_live.py --production https://malaysia.ismailstudio.my/
py codex-handoff\scripts\verify_live.py --production https://malaysia.ismailstudio.my/ --legacy https://malaysia-between-places.vercel.app/
```
Internet is required for live checks; they do not deploy or change DNS. For browser tests use the installed Playwright skill and appropriate working runtime.

## Reporting
Record timestamp, branch/commit, design direction and media credits, commands run, tool results, device viewports, accessibility/performance results, destination page status, Cloudflare deployment ID, actual canonical URL, DNS/TLS status, Vercel redirect evidence, analytics event evidence, remaining exceptions, and rollback method. Do not suppress failures or turn target metrics into achieved scores.
