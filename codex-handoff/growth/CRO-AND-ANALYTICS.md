# Conversion strategy, instrumentation and privacy

## Single primary conversion
**Visitor clicks a genuine link from the Malaysia experience to `https://ismailstudio.my/`.** This is a qualified outbound portfolio visit proxy, not a completed inquiry; measure inquiries on the portfolio only if that site's own accessible tracking supports it. No fictitious case studies or client conversion claims.

## CTA architecture
- Primary: visible, contextually credible "Explore Ismail Studio" or "See the studio behind this experience". Use `href="https://ismailstudio.my/"` or an exact approved portfolio URL, no JS navigation that hides the target.
- Homepage placements: appropriate top navigation, post-feature/credits explanation, editorial end conversion. Each should have a differentiated `data-cta-placement` attribute and meaningful link text.
- Destination pages: attribution and one meaningful CTA after editorial value, without interrupting place story.
- Contact inquiries are generated on the portfolio site, not via invented forms on this static site.
- Use clear differentiation between independent Malaysia editorial experience and studio authorship; do not imply endorsement by Malaysia tourism authorities.

## Event taxonomy
Define `portfolio_outbound_click` with fields: `cta_placement`, `source_path`, `destination_host`, optional `story_chapter`, analytics consent state. Do not log PII, raw URL query strings with personal data, user IDs, precise geolocation or form entries. Attribute home vs destination and mobile vs desktop through analytics standard dimensions where lawful.

## Measurement options (zero incremental cost)
- **Cloudflare Web Analytics**: privacy-minded baseline if free and enabled in authorized Cloudflare account. Verify exact free entitlement and setup steps from current docs; do not assume it automatically measures custom outbound click events.
- **Google Analytics 4**: use existing or create free property only if allowed/account accessible; require actual measurement ID. Use the official consent setup and regional privacy requirements; load only when permitted. Verify events in browser Network and GA4 DebugView/realtime when accessible; no placeholder ID in deployed pages.
- **Hybrid**: Cloudflare for basic page metrics + GA4 for event attribution, if both permitted. If cannot obtain GA4 Measurement ID, implement privacy-safe event hook that degrades cleanly, document the missing external configuration, and DO NOT claim GA4 events are live.
- Optional `?utm_source=malaysia_between_places&utm_medium=portfolio_referral&utm_campaign=...` only if desired and consistent with the studio's own analytics. Never substitute synthetic UTM values for actual conversion measurement. Preserve user navigation to portfolio even with all analytics disabled.

## Consent/privacy behavior
- Verify privacy/cookie laws applicable to target regions before enabling GA4; avoid unconsented nonessential storage where consent is required.
- Privacy language must be accurate and reflect exactly which scripts actually load. A consent UI must have genuine choice and persistent settings if required, not a deceptive banner.
- If optional scripts fail/block, CTA remains a working anchor and site content remains readable.
- Do not leak email, names, cookies, tokens or sensitive query strings into custom analytics.
- Current `vercel.json` CSP restricts third-party script/connect; for new Cloudflare site, update `_headers` CSP with ONLY tested domains necessary for chosen analytics, or keep analytics disabled until accurate CSP is available. Never add `*` globally merely to make it work.

## Tracking QA
1. Visit homepage and each destination in browser with consent states.
2. Click every studio CTA; assert link target resolves and intended click event is sent only when allowed.
3. Check no duplicate events on back/forward or repeated initialization.
4. Confirm pageview transitions if destinations are conventional full page navigations.
5. Check console, network, CSP violations, blocked third-party cookies, tracking blockers and no-JS behavior.
6. Capture actual analytics/property measurement evidence; if unavailable, mark instrumentation as partial/unverified, not complete.

## Reporting KPIs
Events and sessions by route and placement; outbound CTR = portfolio outbound clicks / eligible route sessions (define deduping); scroll depth only if useful and consent-aware; later inquiries from portfolio (not measurable on this domain without authorized cross-site analytics). Separate baseline unknown from future outcomes. Do not assert conversion uplift without A/B or before/after credible comparison.
