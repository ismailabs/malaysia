# START HERE — Malaysia Between Places V2

## Task status
**Approved handoff specification; NOT an implemented V2 website.** This package is intentionally safe to extract over an existing V1 repository. Use the local repository as authoritative source, not prior generated prose. Preserve the V1 baseline until V2 is deployed and verified.

**Current (19 October 2026) source:** [`ismailabs/malaysia`](https://github.com/ismailabs/malaysia), `main` documentation HEAD `8f1643370ea1bfe532d1c36a390bad6ec56b8c02`; V1 implemented public source `875b293b9638f665d499955f80d44c8d78c060e8`. Inspect Git before relying on either SHA; newer work may exist. Current domain `https://malaysia.ismailstudio.my/`. Studio `https://ismailstudio.my/`. Legacy Vercel `https://malaysia-between-places.vercel.app/` is a V1-to-Cloudflare redirect, **not** the V1 live appearance.

## Read in this order (all required before modifying site)
1. `CODEX-EXECUTE.md`: priority, autonomy and process.
2. `strategy/APPROVED-DECISIONS.md`, `strategy/V2-SUCCESS-CONTRACT.md`, `reference/V1-BASELINE.md`.
3. `experience/CREATIVE-DIRECTION.md`, `experience/PROTOTYPE-CHALLENGE.md`, `experience/SIGNATURE-SCENES.md`, `experience/DESTINATION-IDENTITIES.md`, `experience/ASSET-SOURCING.md`.
4. `engineering/ARCHITECTURE-AND-MOTION.md`, `engineering/SKILL-ORCHESTRATION.md`, `engineering/IMPLEMENTATION-PLAN.md`.
5. `growth/SEO-AND-CONTENT.md`, `growth/CRO-AND-MEASUREMENT.md`.
6. `quality/VISUAL-TRANSFORMATION-GATE.md`, `quality/TEST-MATRIX.md`, `quality/DEFINITION-OF-DONE.md`.
7. `release/CLOUDFLARE-V2.md`, `release/VERCEL-LEGACY-AND-ROLLBACK.md`, `release/FINAL-REPORT.md`.

## First actions in Codex Desktop
- Verify working directory and Git status, active branch, remote and baseline; do not overwrite dirty work.
- Verify `AGENTS.md` contains marked V2 activation. If not, run `py codex-handoff-v2/scripts/activate_v2.py` or explicitly follow this handoff; do not delete V1 guidance.
- Discover actual local skills under `.agents/skills` and/or Codex's configured skills folder; names in this package are intents, **not** proof files or executables are available.
- Preserve current production version, screenshots at equivalent viewports, and a rollback commit/tag before any edit or production action.
- Produce two **working, browser-reviewed prototypes** within the sandboxed output directory; never call a static moodboard a browser prototype.
- Select stronger concept with evidence, then implement all scenes and destination intros in production sources, not just prototype files.
- Run automated and real-browser tests and update evidence; deploy preview, then production, then verify hosted behavior.

## Do not accidentally publish this package
Keep `codex-handoff-v2/`, `.agents/`, `AGENTS.md`, `.env`, project tooling, images from browser tests and backups outside Cloudflare build artifacts. The repository currently stages allowlisted public assets into `dist/` via `codex-handoff/scripts/build_static.py` — retain/enhance that mechanism. Audit `dist/` after changes.

## Local operating artifacts to create (not pre-filled)
- `output/v2/prototypes/a/` and `output/v2/prototypes/b/`: working local prototype sites/screenshots/videos/observations.
- `output/v2/baseline/` and `output/v2/final/`: paired screenshot sets.
- `output/v2/evidence.json`: evidence paths and results; adapt `templates/EVIDENCE-EXAMPLE.json`.
- `output/v2/compare.html`: generated comparison board.
- `output/v2/progress.md`: live progress; branch, commands, blockers and evidence.
- `output/v2/release/`: version IDs, audit logs, tests, final receipts (none preasserted).

## Suggested commands
From repo root, PowerShell:
```powershell
py codex-handoff-v2/scripts/check_package.py
py codex-handoff-v2/scripts/activate_v2.py
npm ci
npm run build
npm run audit
npm run verify
# After screenshots/evidence are actually produced:
py codex-handoff-v2/scripts/check_visual_gate.py output/v2/evidence.json
py codex-handoff-v2/scripts/render_comparison_board.py output/v2/evidence.json output/v2/compare.html
```
`npm run verify` is V1's starting suite; new V2-specific tests must be added as needed. Do not treat the command list as evidence of successful execution.
