# Codex Desktop V2 — executable operating contract

## Your assignment
Build and publish a **new experiential website**, not a second refinement of the same photographed editorial. Transform the current Malaysia Between Places V1 into an Awwwards-inspired cinematic, experimental, interactive experience using recognizable Malaysian geography, real photography, procedural art and advanced yet functional GSAP. The user values emotional impact, novelty and coherent motion strongly; mere CSS refactoring or additional pages is not success.

## Priority order
1. Accurate Malaysian identity and real usable storytelling; originality and memorable visual transformation **relative to V1**.
2. Three actual dramatic interactive homepage scenes and distinctive intro/interactions for all four destination pages.
3. Functional SEO, static crawlability, accessible navigation, readable content, reduced motion, no-JS path, real CTA to studio.
4. No paid/new service; correct licensing/attributions, existing Cloudflare production and Vercel redirect; recoverability.
5. Mobile adaptation, measured performance, efficient execution.

The approved V2 specification takes precedence over older V1 art direction when they conflict; **not** over higher-priority instructions, repository ownership permissions, safety, licensing, valid existing content, or release protections. `AGENTS.md` might still reference V1 documents, so use these V2 documents for V2 visual goals. Audit before modifying root instructions.

## Mandatory staged workflow; no ceremonial checkpoints
**0 Inspect and protect:** Git, working tree, current release, scripts/generate_site.py architecture, deployed route state, all relevant SKILL.md. Capture V1 desktop/mobile baseline BEFORE deployment changes. Branch (e.g. `codex/malaysia-cinematic-v2`) and tag current tested release; never delete V1.

**1 Concept and research:** Investigate credible cinematic sites, geographic sources, authentic Malaysia photographs, and existing skill capabilities. Write two **contrasting** concepts with story arcs, scene diagrams and major transition mechanics. Limit research to questions that change decisions; cite links, dates, usage rights.

**2 Prototype contest:** Build both browser-operable prototypes. A = geography-driven (accurate Peninsular/Borneo transitions). B = surreal landscape-led (still opens with accurate geography). Require usable hero + at least a representative signature transition in each, not just animations on a title. Use a controlled same-device screenshot/motion test. Give each a recognizable visual identity; reject similar variations.

**3 Autonomous selection:** Evaluate on originality relative to V1, memorable one-second opening, scene uniqueness, coherent Malaysia story, mobile viability, performance, accessibility, authentic assets, feasible cost, and quality. Log evidence and a decision. Choose strongest and optionally borrow *compatible* elements without rebuilding both whole sites.

**4 Implement:** Build accurate geographic introduction, immersive destination gallery, cinematic studio finale; add distinct custom destination hero and interaction to four existing route essays. Replace V1's spatial logic as needed instead of layering on the old. Maintain native scroll and skip/pause/reduced-motion controls. New art assets must have rights ledger. Modify `scripts/generate_site.py` consistently when it is authoritative for HTML generation; do not blindly hand-edit generated HTML then overwrite your work.

**5 Validate/revise:** Paired before/after 1440×900 and 390×844 plus wider/narrower samples. Capture stills AND inspect transitions at specified scroll waypoints. Compare composition, atmosphere, imagery, scene staging and finale to V1. Fail and revisit if the only change is captions/fonts/color/photograph rearrangement. Run existing checks and add V2 scene assertions; verify no-motion and no-JS. Make at least 2 evidence-backed refinement passes after first full implementation (not meaningless rewrites).

**6 Release:** Build using allowlist, scan `dist/` for private files, stage noindex Cloudflare preview, verify actual hosted site. Inspect domains/current Worker service before changing anything. Deploy Cloudflare production to `malaysia.ismailstudio.my` only after passing release gates, verify version/route/TLS/CTA/assets and response behavior. Preserve existing Vercel 308 redirect; do **not** recreate redirect when already passing. Commit, report exact SHA, deployment ID/URL, proof, remaining limitations.

## Autonomous action scope
User authorized site-scope file edits, installing necessary **free** dependencies, creating commits/tags/branches, merging reviewed site changes, staging and deploying to the existing Cloudflare production hostname, preserving/repairing legacy Vercel redirect, and repeat tests/fixes—without routine user approvals. No new purchases, billing upgrades, unrelated domain/zone updates, secrets disclosure, broad deletion, bypass of authentication, or pretending a blocker is solved. Platform-required approvals remain binding. If credentials unavailable, complete safe preparatory work and specify exact blocker; do not assert DoD success.

## Budget and skills discipline
Do not invoke all skills every step. Use actual available skills *only* when capabilities are needed. Start with capability inventory and shortlist. Work against smaller scene-local prototypes, reuse tested scripts, batch same-browser shots, reuse shared assets, avoid redundant research and multiple unnecessary full-site restarts. In high-reasoning modes avoid endless deliberation; execute a timeboxed prototype comparison and commit to one direction. Never invent model controls; user chooses maximum offered reasoning (prefer Sol Ultra when available).

## Anti-fake-verification
A final report must link to real screenshot/video paths, actual test commands/logs, diff commits, metrics and hosted responses. Template examples are not proof. Subjective review != independent award; passing a generated screenshot path check != human visual excellence. Do not fabricate external GA4, conversions, real device FPS, search rankings, accessibility certification or source attribution.
