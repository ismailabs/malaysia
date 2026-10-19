import { chromium } from "playwright";
import assert from "node:assert/strict";
import { writeFile } from "node:fs/promises";

const legacy = "https://malaysia-between-places.vercel.app";
const production = "https://malaysia.ismailstudio.my";
const routes = [
  "/",
  "/destinations/kuala-lumpur/",
  "/destinations/george-town/",
  "/destinations/langkawi/",
  "/destinations/sabah/",
  "/credits/",
];
const checks = [];
for (const route of [...routes, "/missing-place-qa/"]) {
  for (const query of ["", "?utm_source=legacy&tag=one&tag=two&q=island%20water"]) {
    const response = await fetch(legacy + route + query, { redirect: "manual" });
    const location = response.headers.get("location");
    assert.equal(response.status, 308, route);
    assert.equal(location, production + route + query, route);
    const followed = await fetch(location, { redirect: "manual" });
    assert.equal(followed.status, route.includes("missing-place") ? 404 : 200);
    checks.push({ path: route + query, firstStatus: response.status, location, finalStatus: followed.status });
  }
}
const browser = await chromium.launch({ channel: "msedge" });
const fragments = [];
const visits = [];
try {
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: "reduce" });
  const page = await context.newPage();
  for (const fragment of ["home", "prologue", "field-notes", "streets", "coast", "borneo", "ending", "about"]) {
    await page.goto(`${legacy}/?from=legacy#${fragment}`);
    assert.equal(page.url(), `${production}/?from=legacy#${fragment}`);
    assert.equal(await page.locator(`[id="${fragment}"]`).count(), 1);
    const legacyPlace = { streets: 'george-town', coast: 'langkawi', borneo: 'sabah' }[fragment];
    if (legacyPlace) assert.equal(await page.locator(`[id="${fragment}"]`).evaluate(el => el.closest('[data-world]')?.dataset.world), legacyPlace);
    fragments.push({ fragment, url: page.url(), targetExists: true });
  }
  for (const route of routes.slice(0, 5)) {
    await page.goto(production + route);
    const links = page.locator("a[data-cta-placement]");
    const targets = await links.evaluateAll(nodes => nodes.map(a => ({ href: a.href, placement: a.dataset.ctaPlacement })));
    assert.ok(targets.length >= 3);
    assert.ok(targets.every(a => a.href === "https://ismailstudio.my/"));
    const responsePromise = page.waitForResponse(r => r.request().isNavigationRequest() && new URL(r.url()).hostname === "www.ismailstudio.my");
    await page.locator('a[data-cta-placement="header"]').click();
    const response = await responsePromise;
    await page.waitForURL("https://www.ismailstudio.my/");
    assert.equal(response.status(), 200);
    assert.ok((await page.title()).length > 0);
    visits.push({ source: route, targets, finalUrl: page.url(), status: response.status(), title: await page.title() });
  }
  await context.close();
} finally {
  await browser.close();
}
const report = { time: new Date().toISOString(), legacy, production, passed: true, checks, fragments, visits };
await writeFile("output/transition-verification.json", JSON.stringify(report, null, 2));
console.log(JSON.stringify({ passed: true, redirectChecks: checks.length, fragmentJourneys: fragments.length, realStudioVisits: visits.length }));
