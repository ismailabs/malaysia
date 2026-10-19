import { chromium, firefox, webkit } from "playwright";
import AxeBuilder from "@axe-core/playwright";
import assert from "node:assert/strict";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const base = new URL(process.argv[2] || "http://127.0.0.1:8001/");
const full = !process.argv.includes("--smoke");
const name = process.argv.includes("--label")
  ? process.argv[process.argv.indexOf("--label") + 1]
  : "local";
const out = path.resolve("output/playwright", name);
await mkdir(out, { recursive: true });
const routes = [
  "/",
  "/destinations/kuala-lumpur/",
  "/destinations/george-town/",
  "/destinations/langkawi/",
  "/destinations/sabah/",
  "/credits/",
];
const widths = full ? [320, 390, 768, 1024, 1440, 1920] : [390, 1440];
const results = [];
const problems = [];
const externalRequests = new Set();
const cancelledImages = [];
const filter = process.argv.includes('--only') ? process.argv[process.argv.indexOf('--only') + 1] : null;
let assertions = 0;
function check(value, message) {
  assertions++;
  assert.ok(value, message);
}
async function record(label, fn) {
  if (filter && !label.includes(filter)) return;
  try {
    const details = await fn();
    results.push({ label, status: "pass", ...details });
    console.log("PASS", label);
  } catch (error) {
    if (error.runnerUnavailable) {
      results.push({ label, status: "unavailable", error: String(error) });
      console.log("UNAVAILABLE", label, String(error));
      return;
    }
    problems.push({ label, error: String(error) });
    results.push({ label, status: "fail", error: String(error) });
    console.error("FAIL", label, String(error));
  }
}
const settle = (page) =>
  page.evaluate(
    () =>
      new Promise((resolve) =>
        requestAnimationFrame(() => requestAnimationFrame(resolve)),
      ),
  );
async function open(context, route, js = true) {
  const page = await context.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push(String(e)));
  page.on("console", (m) => {
    if (m.type() === "error") errors.push(m.text());
  });
  page.on("requestfailed", (r) => {
    // Navigating away or replacing a responsive preview can cancel an image.
    // Keep these observable, separately from failed resources (each asset is
    // also checked by direct HTTP and the hosted SHA-256 manifest).
    if (r.resourceType() === 'image' && r.failure()?.errorText === 'net::ERR_ABORTED') {
      cancelledImages.push({url:r.url(),reason:r.failure().errorText});
    } else errors.push(`${r.method()} ${r.url()} ${r.failure()?.errorText}`);
  });
  page.on("request", (r) => {
    if (new URL(r.url()).origin !== base.origin) externalRequests.add(r.url());
  });
  const response = await page.goto(new URL(route, base).href, {
    waitUntil: "load",
    timeout: 45000,
  });
  check(response.status() === 200, `HTTP ${response.status()} ${route}`);
  if (js)
    await page.waitForFunction(
      () => document.documentElement.dataset.ready === "true",
      null,
      { timeout: 12000 },
    );
  if (js) await page.waitForFunction(() => document.fonts.status === "loaded");
  if (js) {
    // load/complete can precede async image decoding. Capture the painted final
    // hero rather than a transient blank decode frame or an unfinished shutter.
    await page.locator('img[loading="eager"]').evaluateAll(imgs => Promise.all(imgs.map(img => img.decode())));
    await page.waitForFunction(() => !window.gsap || !gsap.isTweening('.signature-image'));
  }
  return { page, errors };
}
async function contentChecks(page) {
  check((await page.locator("h1").count()) === 1, "Exactly one H1");
  check(await page.locator("h1").isVisible(), "H1 visible");
  check(
    (await page.locator('a[href="https://ismailstudio.my/"]').count()) > 0,
    "Genuine studio anchors",
  );
  const overflow = await page.evaluate(() => ({
    w: innerWidth,
    scroll: document.documentElement.scrollWidth,
  }));
  check(
    overflow.scroll <= overflow.w + 1,
    `Page overflow ${JSON.stringify(overflow)}`,
  );
  const lines = await page.locator("h1,h2,h3").evaluateAll((els) =>
    els
      .filter(
        (e) =>
          e.getBoundingClientRect().height &&
          getComputedStyle(e).display !== "none" &&
          !e.closest("dialog:not([open])"),
      )
      .map((e) => {
        const r = document.createRange();
        r.selectNodeContents(e);
        const tops = [];
        for (const box of r.getClientRects()) {
          if (box.height > 1 && !tops.some((y) => Math.abs(y - box.top) < 3))
            tops.push(box.top);
        }
        return { text: e.textContent, lines: tops.length };
      })
      .filter((e) => e.lines > 2),
  );
  check(lines.length === 0, `Long headings ${JSON.stringify(lines)}`);
  const canonical = await page
    .locator("link[rel=canonical]")
    .getAttribute("href");
  check(
    canonical ===
      `https://malaysia.ismailstudio.my${new URL(page.url()).pathname}`,
    "Canonical URL",
  );
}
async function sweep(page) {
  const h = await page.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y < h; y += 650) {
    await page.evaluate((y) => scrollTo(0, y), y);
    await settle(page);
  }
  await page.evaluate(() => scrollTo(0, 0));
  await settle(page);
}
const browser = await chromium.launch({ channel: "msedge", headless: true });
try {
  for (const width of widths) {
    const context = await browser.newContext({
      viewport: {
        width,
        height:
          width >= 1800
            ? 1080
            : width === 768
              ? 1024
              : width === 320
                ? 720
                : 900,
      },
      hasTouch: width <= 390,
    });
    for (const route of routes)
      await record(`normal ${width} ${route}`, async () => {
        const { page, errors } = await open(context, route);
        await contentChecks(page);
        if (route === "/" || route === "/destinations/kuala-lumpur/")
          await page.screenshot({
            path: path.join(
              out,
              `${route === "/" ? "home" : "kuala-lumpur"}-${width}-fold.png`,
            ),
          });
        await sweep(page);
        check(
          errors.length === 0,
          `Runtime/network errors: ${errors.join("; ")}`,
        );
        if ((width === 390 || width === 1440) && route === "/")
          await page.screenshot({
            path: path.join(out, `home-${width}-normal.png`),
            fullPage: true,
          });
        await page.close();
      });
    await context.close();
  }
  for (const mode of ["reduce", "no-js"]) {
    for (const width of [390, 1440]) {
      const context = await browser.newContext({
        viewport: { width, height: width === 390 ? 844 : 900 },
        reducedMotion: "reduce",
        javaScriptEnabled: mode !== "no-js",
      });
      for (const route of routes)
        await record(`${mode} ${width} ${route}`, async () => {
          const { page, errors } = await open(context, route, mode !== "no-js");
          await contentChecks(page);
          if (mode === "reduce")
            check(
              (await page.evaluate(() => ScrollTrigger.getAll().length)) === 0,
              "Reduced motion has no active ScrollTriggers",
            );
          else
            check(
              await page.locator(".places-fallback").isVisible(),
              "Native fallback navigation visible",
            );
          if (mode !== "no-js") await sweep(page);
          if (mode === "reduce") {
            const axe = await new AxeBuilder({ page })
              .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
              .analyze();
            await writeFile(
              path.join(
                out,
                `axe-${width}-${route.replaceAll("/", "_") || "home"}.json`,
              ),
              JSON.stringify(axe, null, 2),
            );
            check(
              axe.violations.length === 0,
              `axe violations ${JSON.stringify(axe.violations.map((v) => ({ id: v.id, impact: v.impact, nodes: v.nodes.map((n) => n.target) })))}`,
            );
            await page.screenshot({
              path: path.join(
                out,
                `${route === "/" ? "home" : route.split("/").filter(Boolean).pop()}-${width}-still.png`,
              ),
              fullPage: true,
            });
          }
          check(
            errors.length === 0,
            `Runtime/network errors ${errors.join("; ")}`,
          );
          await page.close();
        });
      await context.close();
    }
  }
  await record(
    "keyboard menu, gallery, previews, history and private event",
    async () => {
      const context = await browser.newContext({
        viewport: { width: 1440, height: 900 },
        reducedMotion: "reduce",
      });
      const { page, errors } = await open(
        context,
        "/?email=excluded-from-events",
      );
      await page.keyboard.press("Tab");
      check(
        await page
          .locator(".skip-link")
          .evaluate((e) => e === document.activeElement),
        "Skip link first",
      );
      await page.keyboard.press("Enter");
      check(
        await page
          .locator("#main")
          .evaluate((e) => e === document.activeElement),
        "Skip focuses main",
      );
      const menu = page.locator(".menu-button");
      await menu.focus();
      await page.keyboard.press("Enter");
      check(
        await page.locator("#place-menu").evaluate((e) => e.open),
        "Dialog opens by keyboard",
      );
      for (let i = 0; i < 10; i++) {
        await page.keyboard.press("Tab");
        check(
          await page.evaluate(
            () => !!document.activeElement.closest("#place-menu"),
          ),
          "Dialog focus stays inside",
        );
      }
      await page.keyboard.press("Escape");
      check(
        await menu.evaluate((e) => e === document.activeElement),
        "Escape returns focus",
      );
      await page.locator("#frame-next").click();
      await page.waitForFunction(
        () =>
          document.querySelector("#frame-status").textContent ===
          "Petaling Street",
      );
      check(
        (await page.locator("#frame-status").textContent()) ===
          "Petaling Street",
        "Gallery next",
      );
      await page.locator(".street-track").focus();
      await page.keyboard.press("End");
      await page.waitForFunction(
        () =>
          document.querySelector("#frame-status").textContent === "Nasi lemak",
      );
      await page.keyboard.press("Home");
      await page.waitForFunction(
        () =>
          document.querySelector("#frame-status").textContent === "George Town",
      );
      check(
        await page.locator("#frame-prev").isDisabled(),
        "Gallery Home/End and boundary",
      );
      const sabah = page.getByRole("button", {
        name: "Preview Sabah",
        exact: true,
      });
      await sabah.click();
      await page.waitForFunction(
        () =>
          document.querySelector("#preview-title").textContent ===
          "A mountain changes the scale.",
      );
      check(
        (await page.locator("#preview-link").getAttribute("href")) ===
          "/destinations/sabah/",
        "Preview changes real essay link",
      );
      check(
        (await page.locator(".place-preview img").getAttribute("alt")).includes(
          "Kinabalu",
        ),
        "Preview alt changes",
      );
      await sabah.focus();
      await page.keyboard.press("Home");
      await page.waitForFunction(
        () =>
          document.querySelector("#preview-title").textContent ===
          "A city read at two heights.",
      );
      check(
        (await page
          .getByRole("button", { name: "Preview Kuala Lumpur", exact: true })
          .getAttribute("aria-pressed")) === "true",
        "Preview keyboard state",
      );
      await page.locator(".hero-copy .button").click();
    await page.waitForURL(url => url.hash === '#journey');
      await page.goto(new URL("/#coast", base).href);
      await page.waitForFunction(
        () => document.documentElement.dataset.ready === "true",
      );
      await page.goBack();
      check(new URL(page.url()).hash === "#journey", "Native browser Back");
      await page.goForward();
      check(new URL(page.url()).hash === "#coast", "Native browser Forward");
      await page.evaluate(() => {
      history.replaceState(null, '', '/?email=excluded-from-events#coast');
        window.__outbound = [];
        window.addEventListener("malaysia:portfolio_outbound_click", (e) =>
          window.__outbound.push(e.detail),
        );
        document.addEventListener("click", (e) => {
          if (e.target.closest("a[data-cta-placement]")) e.preventDefault();
        });
      });
      const ctas = page.locator("a[data-cta-placement]");
      const count = await ctas.count();
      for (let i = 0; i < count; i++) await ctas.nth(i).click();
      const events = await page.evaluate(() => window.__outbound);
      check(events.length === count, "One hook event per CTA activation");
      check(
        events.every(
          (e) =>
            e.source_path === "/" &&
            e.destination_host === "ismailstudio.my" &&
            e.consent_state === "no-collection" &&
            !JSON.stringify(e).includes("email"),
        ),
        "Event excludes query and PII",
      );
      check(
        (await context.cookies().then((c) => c.length)) === 0,
        "No cookies set",
      );
      check(errors.length === 0, `Interaction errors ${errors.join("; ")}`);
      await writeFile(
        path.join(out, "click-event-evidence.json"),
        JSON.stringify(events, null, 2),
      );
      await context.close();
    },
  );
  await record("live reduced-motion preference changes clean up", async () => {
    const context = await browser.newContext({
      viewport: { width: 1440, height: 900 },
    });
    const { page } = await open(context, "/");
    check(
      (await page.evaluate(() => ScrollTrigger.getAll().length)) > 0,
      "Normal motion active",
    );
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.waitForFunction(() => ScrollTrigger.getAll().length === 0);
    check(
      await page
        .locator("#coast")
        .evaluate((e) => e.classList.contains("is-rest")),
      "Reduced-motion scene in flow",
    );
    await page.emulateMedia({ reducedMotion: "no-preference" });
    await page.waitForFunction(() =>
      document.querySelector("#coast").classList.contains("is-live"),
    );
    const count = await page.evaluate(() => ScrollTrigger.getAll().length);
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.emulateMedia({ reducedMotion: "no-preference" });
    await page.waitForFunction(
      (c) => ScrollTrigger.getAll().length === c,
      count,
    );
    check(
      (await page.evaluate(() => ScrollTrigger.getAll().length)) === count,
      "No duplicate responsive triggers",
    );
    await context.close();
  });
  await record("200 percent zoom layout emulation", async () => {
    // A 1440x900 display at 200% browser zoom has a 720x450 CSS viewport.
    const context = await browser.newContext({
      viewport: { width: 720, height: 450 },
      deviceScaleFactor: 2,
      reducedMotion: "reduce",
    });
    for (const route of ["/", "/destinations/kuala-lumpur/"]) {
      const { page } = await open(context, route);
      await contentChecks(page);
      await page.close();
    }
    await context.close();
  });
  await record("HTTP routes, assets and private paths", async () => {
    const context = await browser.newContext();
    const page = await context.newPage();
    const all = new Set();
    for (const route of routes) {
      await page.goto(new URL(route, base).href);
      for (const url of await page
        .locator("img,script[src],link[rel=stylesheet],link[rel=preload]")
        .evaluateAll((els) => els.map((e) => e.src || e.href)))
        all.add(url);
    }
    for (const asset of all) {
      const r = await context.request.get(asset);
      check(r.status() === 200, `Asset ${r.status()} ${asset}`);
    }
    for (const route of [
      "/missing-place-qa/",
      "/.agents/skills/design-taste-frontend/SKILL.md",
      "/AGENTS.md",
      "/codex-handoff/START-HERE.md",
      "/package.json",
      "/.env",
      "/scripts/generate_site.py",
      "/wrangler.jsonc",
    ]) {
      const r = await context.request.get(new URL(route, base).href);
      check(
        r.status() === 404,
        `Private/404 path ${route} returned ${r.status()}`,
      );
    }
    await context.close();
    return { assets: all.size };
  });
  if (full)
    for (const [engine, label] of [
      [firefox, "Firefox"],
      [webkit, "WebKit"],
    ])
      await record(`${label} core journeys`, async () => {
        let b;
        try {
          b = await engine.launch({ headless: true });
        } catch (error) {
          const unavailable = new Error(
            `${label} runner unavailable: ${error}`,
          );
          unavailable.runnerUnavailable = true;
          throw unavailable;
        }
        const context = await b.newContext({
          viewport: { width: 390, height: 844 },
          reducedMotion: "reduce",
        });
        try {
          for (const route of routes) {
            const { page, errors } = await open(context, route);
            await contentChecks(page);
            check(errors.length === 0, `${label} errors ${errors}`);
            await page.close();
          }
          const { page } = await open(context, "/");
          await page
            .getByRole("button", { name: "All places", exact: true })
            .click();
          check(
            await page.locator("#place-menu").evaluate((e) => e.open),
            "Cross-browser dialog",
          );
          await page.keyboard.press("Escape");
          await page
            .getByRole("button", { name: "Preview Langkawi", exact: true })
            .click();
          await page.waitForFunction(
            () =>
              document.querySelector("#preview-link").getAttribute("href") ===
              "/destinations/langkawi/",
          );
        } finally {
          await b.close();
        }
      });
} finally {
  await browser.close();
}
const report = {
  time: new Date().toISOString(),
  base: base.href,
  full,
  filter,
  assertions,
  cases: results.length,
  passed: results.filter((r) => r.status === "pass").length,
  failures: problems,
  unavailable: results.filter((r) => r.status === "unavailable"),
  externalRequests: [...externalRequests],
  cancelledImages,
  results,
};
await writeFile(
  path.join(out, "verification.json"),
  JSON.stringify(report, null, 2),
);
console.log(
  JSON.stringify({
    assertions,
    cases: results.length,
    failures: problems.length,
    externalRequests: [...externalRequests],
    report: path.join(out, "verification.json"),
  }),
);
process.exitCode = problems.length ? 1 : 0;
