import { chromium } from "playwright";
import { mkdir, writeFile } from "node:fs/promises";
import assert from "node:assert/strict";

const out = "output/production-visual";
await mkdir(out, { recursive: true });
const browser = await chromium.launch({ channel: "msedge" });
const results = [];
try {
  for (const mode of ["reduce", "no-js"]) {
    const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: "reduce", javaScriptEnabled: mode !== "no-js" });
    const page = await context.newPage();
    await page.goto("https://malaysia.ismailstudio.my/");
    if (mode !== "no-js") await page.waitForFunction(() => document.documentElement.dataset.ready === "true");
    for (const [label, selector] of [["hero", ".signature-image"], ["coast", ".coast-photo img"], ["places", ".place-preview img"]]) {
      const img = page.locator(selector);
      await img.scrollIntoViewIfNeeded();
      // decode() is allowed on the automation side with scripting disabled, but
      // promises relying on the disabled document's animation clock are not.
      await img.evaluate(image => image.decode());
      const state = await img.evaluate(image => ({ complete: image.complete, width: image.naturalWidth, height: image.naturalHeight, display: getComputedStyle(image).display, visibility: getComputedStyle(image).visibility, opacity: getComputedStyle(image).opacity, clip: getComputedStyle(image).clipPath }));
      assert.ok(state.complete && state.width > 0 && state.height > 0);
      const file = `${out}/${mode}-${label}.png`;
      await page.screenshot({ path: file });
      results.push({ mode, label, state, file });
    }
    await context.close();
  }
} finally {
  await browser.close();
}
await writeFile(`${out}/report.json`, JSON.stringify({ time: new Date().toISOString(), results }, null, 2));
console.log(JSON.stringify(results));
