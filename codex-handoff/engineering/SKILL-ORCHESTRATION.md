# Skill orchestration — use the right skill at the right time

## Observed installed skills (from Windows screenshot, 2026-10-19)
`.agents/skills/` contains:
`accessibility-scan`, `banner-design`, `brand`, `design`, `design-system`, `design-taste-frontend`, `gsap-core`, `gsap-performance`, `gsap-scrolltrigger`, `gsap-timeline`, `playwright`, `slides`, `ui-styling`, `ui-ux-pro-max`, `web-design-guidelines`.

Read the **actual** local `.agents/skills/<name>/SKILL.md` before usage; reconcile install changes and avoid invalid imaginary commands. Some skills may have scripts needing Python, Node>=22, Chrome, CLI or other permissions. Never claim a skill ran without execution evidence. The skill names below refer to observed installation paths, not guaranteed host runtime capability.

## Phase assignment
| Phase | Lead skill | Supporting | Evidence |
| --- | --- | --- | --- |
| Baseline UX and research | `web-design-guidelines` | `ui-ux-pro-max`, `playwright` | annotated issue list, reference comparisons |
| Creative art direction | `design-taste-frontend` | `brand`, `design`, `ui-ux-pro-max` | inventory, 3 directions, 1 chosen thesis + direction sheet |
| Tokens/type/responsive | `design-system` | `ui-styling`, `ui-ux-pro-max` | token map, CSS variables, viewport renders |
| Hero and documentary scenes | `design-taste-frontend` | `banner-design` for assets only when justified | authored narrative layout, credited media |
| Scroll choreography | `gsap-scrolltrigger` | `gsap-timeline`, `gsap-core`, `gsap-performance` | documented GSAP timelines, animation behavior |
| Interactive UI correctness | `playwright` | GSAP skills | browser run output, screenshots, no-console-error reports |
| Final accessibility | `accessibility-scan` | `web-design-guidelines`, `playwright` | scanner results + manual keyboard/reduced-motion checks |
| Release validation | `playwright` | `gsap-performance` | responsive screenshots, production smoke checks |

`slides`: not part of website build unless a requested presentation is added; do not inflate scope. More skills is not equal to better execution; do not mix conflicting art directions without a deliberate choice.

## Taste Skill specific
Default `design-taste-frontend` works with vanilla HTML/CSS and provides `scripts/draw.mjs`, asset and browser inspection workflows where installed. Run from repo root so work files land in `.taste-skill/`; ensure private design working files aren't deployed. Record exact commands and output where feasible. Browser inspector may need Node 22+ and Chrome/Edge. If a script fails, document why and continue with an evidence-based manual equivalent; don't silently claim its stage completed.

## UI UX Pro Max specific
Use style/palette/type guidance to constrain hierarchy, accessibility and consistency. It should not override the chosen site-specific documentary narrative, or generate a generic overused design recipe. Some installations provide design-search CLI/scripts; inspect actual installation structure rather than assuming file names.

## Playwright and accessibility
Validate that browsers are installed, local server is reachable, screenshots are generated, and test process returns meaningful exit codes. On Windows, some bundled script wrappers assume bash; use PowerShell, Git Bash, WSL or appropriate direct Node/Python entrypoints if necessary. Accessibility automation is an aid, not a substitute for real keyboard and reduced-motion checks.

## Conflict handling
When skills disagree: (1) approved scope and accessibility, (2) proven browser behavior, (3) grounded art direction, (4) specialized GSAP API rules, (5) generalized style recommendations. Log choice and measured evidence; don't force every skill on every page.
