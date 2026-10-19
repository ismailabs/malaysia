# Release checklist — NOT preapproved, fill from actual tooling

## Before site change
- [ ] Current Git SHA/branch/status and original V1 tag recorded.
- [ ] Current production Worker/version and Vercel 308 redirect verified; baseline screenshots retained.

## Before production deploy
- [ ] Both prototypes/browser/evidence reviewed; winner decision documented.
- [ ] All three homepage signature scenes + four local acts verified visually and interactively.
- [ ] Matching before/after screenshot board and at least two corrective rounds reviewed.
- [ ] SEO, valid 404, sources/licensing, schema/meta/canonicals, privacy/CTA, mobile/reduced/noJS/keyboard pass.
- [ ] No unauthorized paid dependencies; no private config/handoff/tools in static `dist/`.
- [ ] Preview noindex, routes/headers/TLS and scenes tested on hosted preview.
- [ ] Current Cloudflare Worker/domain target verified again before irreversible step.

## After production deploy
- [ ] HTTPS production version verified at correct hostname and checked exact deploy/version ID.
- [ ] Hero map, gallery, finale, all destination acts tested in real hosted browser.
- [ ] Links to https://ismailstudio.my/ work; analytics status stated accurately.
- [ ] Vercel redirect still 308 path/query and no loops.
- [ ] Git commits and rollback path recorded; final report filed with actual evidence.
