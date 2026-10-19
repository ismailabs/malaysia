# Skills: read, apply, measure; don't cargo-cult invocation

## Discover actual skills
The V1 root `AGENTS.md` says project `.agents/skills`; GitHub main has `skills-lock.json` with eight concrete hashes/paths, while some other suggested design skills may only be installed locally in Codex Desktop. **Don't assume all 15 are present.** Inspect project/local/user skills and read each relevant `SKILL.md`, tool scripts, licensing/runtime prerequisites. Report missing or inaccessible skills, continue using available techniques, don't fake invocations or silently download unreviewed code.

## Assignment map
| Workstream | Preferred relevant skills | Required output |
|---|---|---|
| Concept and art research | `design-taste-frontend`, `ui-ux-pro-max` | 2 distinct concept boards/notes, choice rationale, actual browser prototypes |
| Typographic/system style | `design-system`, `design`, `brand`, `ui-styling` **if installed** | V2 design tokens, type roles, useable coherent component rules |
| Signature hero + transitions | `gsap-core`, `gsap-timeline`, `gsap-scrolltrigger` | Tested scenes, clean lifecycle, precise scroll staging |
| Motion performance | `gsap-performance` | measured frame issues and fixes, mobile adaptations |
| Browser review | `playwright` | paired captures, functional checks, console and responsive evidence |
| UI/accessibility | `web-design-guidelines`, `accessibility-scan` | keyboard and WCAG-guided fixes, serious/critical issues cleared |
| Asset embellishments | `banner-design` if relevant | useful supporting original static/graphic media, not gratuitous banners |
| Presentation | `slides` only if a slide deck specifically becomes a deliverable | otherwise DO NOT invoke |

## Anti-waste workflow
- Choose **one primary and one supporting skill** per well-scoped task; avoid redundant art direction generators drowning decisions.
- Taste Skill: produce directional concepts and implement/refine with screenshots; do not stop at generated palette lists.
- UI UX Pro Max: use for practical type/contrast/hierarchy and usability; do not allow generic default card grids to override chosen experimental concept.
- GSAP official skills: read relevant sections for timelines, pinning, matchMedia, cleanup, performance; don't repeatedly re-read all skill files for each small change.
- Playwright: reuse one browser run to collect meaningful screenshots, console logs, axes, touch, motion and CTAs when possible; evidence-driven test iterations.
- Capture a short skill use log: task, skill read, actual method/asset applied, outcome, benefit. No credit just for mentioning a skill name.

## If skills conflict
Prefer explicit V2 narrative, accurate geography, reduced motion, clear studio CTA and source licensing. Record why a generic style recommendation was rejected. Missing advanced graphic asset APIs are not blockers; original static SVG/Canvas/CSS are within stack.
