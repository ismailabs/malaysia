import { readFile, writeFile, readdir } from "node:fs/promises";
import { createHash } from "node:crypto";
import assert from "node:assert/strict";

const read = async file => JSON.parse(await readFile(file, "utf8"));
const local = await read("output/playwright/verified/verification.json");
const production = await read("output/playwright/production-verified/verification.json");
const preview = await read("output/playwright/preview/verification.json");
const previewRetest = await read("output/playwright/preview-flow/verification.json");
const hosted = await read("output/production-hosted-verification.json");
const transition = await read("output/transition-verification.json");
const http = await read("output/final-http-smoke.json");
const artifact = await read("output/release-artifact.json");
const scenes = await read("output/scene-audit/report.json");
const visual = await read("output/production-visual/report.json");
assert.equal(local.failures.length, 0);
assert.equal(production.failures.length, 0);
assert.equal(previewRetest.failures.length, 0);
assert.equal(hosted.errors.length, 0);
assert.equal(hosted.certificate.authorized, true);
assert.equal(transition.passed, true);
assert.equal(http.passed, true);
const browserSummary = r => ({ time: r.time, base: r.base, cases: r.cases, passed: r.passed, assertions: r.assertions, failures: r.failures, unavailable: r.unavailable, externalRequests: r.externalRequests, cancelledImages: r.cancelledImages || [] });
const performance = [];
for (const name of ["baseline-lighthouse-mobile", "preview-lighthouse-mobile", "production-lighthouse-mobile", "production-lighthouse-desktop"]) {
  const r = await read(`output/${name}.json`);
  assert.ok(!r.runtimeError, JSON.stringify(r.runtimeError));
  performance.push({ name, time: r.fetchTime, url: r.finalDisplayedUrl, version: r.lighthouseVersion, environment: r.environment, formFactor: r.configSettings.formFactor, throttlingMethod: r.configSettings.throttlingMethod, throttling: r.configSettings.throttling, screenEmulation: r.configSettings.screenEmulation, scores: Object.fromEntries(Object.entries(r.categories).map(([k, v]) => [k, v.score * 100])), metrics: Object.fromEntries(["largest-contentful-paint", "cumulative-layout-shift", "total-blocking-time", "first-contentful-paint", "speed-index"].map(k => [k, r.audits[k].numericValue])), warnings: r.runWarnings });
}
const axe = [];
for (const file of await readdir("output/playwright/production-verified")) {
  if (!file.startsWith("axe-")) continue;
  const r = await read(`output/playwright/production-verified/${file}`);
  assert.equal(r.violations.length, 0);
  axe.push({ file, url: r.url, timestamp: r.timestamp, violations: r.violations.length, passes: r.passes.length, incomplete: r.incomplete.length });
}
const receiptFiles = ["output/release-artifact.json", "output/playwright/verified/verification.json", "output/playwright/production-verified/verification.json", "output/production-hosted-verification.json", "output/transition-verification.json", "output/final-http-smoke.json", "output/scene-audit/report.json", "output/production-visual/report.json", ...performance.map(p => `output/${p.name}.json`)];
const receipts = [];
for (const file of receiptFiles) receipts.push({ file, sha256: createHash("sha256").update(await readFile(file)).digest("hex") });
const record = {
  time: new Date().toISOString(),
  deployedSource: "875b293b9638f665d499955f80d44c8d78c060e8",
  artifact: { count: artifact.count, totalBytes: artifact.totalBytes, files: artifact.files },
  browsers: { local: browserSummary(local), previewInitial: browserSummary(preview), previewRetest: browserSummary(previewRetest), production: browserSummary(production) },
  production: { time: hosted.time, origin: hosted.origin, checkedAssets: hosted.checkedAssets, hashMatches: hosted.checks.filter(c => c.hashMatches).length, certificate: hosted.certificate, privateChecks: hosted.privateChecks, errors: hosted.errors, csp: hosted.headers["content-security-policy"] },
  http,
  transition,
  performance,
  accessibility: { accesslint: await read("output/accesslint-home.json"), axe, limit: "Automated WCAG checks and manual keyboard review; no full screen-reader conformance claim." },
  scenes: { time: scenes.time, url: scenes.url, results: scenes.results.map(r => ({ label: r.label, viewport: r.viewport, state: r.state, frameCount: r.frames.length, errors: r.errors })) },
  visual,
  outboundEventSamples: await read("output/playwright/production-verified/click-event-evidence.json"),
  vercelRouting: await read("output/vercel-legacy-routing.json"),
  legacyRecovery: await read("output/legacy-recovery-manifest.json"),
  receipts,
  limits: ["Firefox could not launch: spawn UNKNOWN.", "No physical mobile or assistive-technology session.", "Mobile Lighthouse LCP exceeds the 2.5s target; lab runs are not field CWV.", "GA4 collection is incomplete without a real property, consent configuration and DebugView proof.", "Search Console indexing, ranking and conversion uplift are unverified.", "Final bundled Taste CDP captures timed out; manual equivalent is documented in VISUAL-REVIEW.md."]
};
await writeFile("codex-handoff/progress/RELEASE-EVIDENCE.json", JSON.stringify(record, null, 2) + "\n");
console.log(JSON.stringify({ artifactFiles: artifact.count, liveHashMatches: record.production.hashMatches, localPassed: local.passed, productionPassed: production.passed, axeReports: axe.length, redirects: transition.checks.length, receipts: receipts.length }));
