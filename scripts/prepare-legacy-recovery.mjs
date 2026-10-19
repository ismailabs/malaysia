// Prepare a zero-cost recovery artifact; never deploy it during normal release.
import { execFileSync } from "node:child_process";
import { mkdir, writeFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import path from "node:path";

const source = "99787eaa56e57d0e1c304ea09bd3b9929eb89ed1";
const out = path.resolve("output/legacy-recovery");
const files = execFileSync("git", ["ls-tree", "-r", "--name-only", source], { encoding: "utf8" }).trim().split("\n").filter(p => /^(assets\/|css\/|js\/)/.test(p) || ["index.html", "robots.txt", "sitemap.xml", "built-by-ismail.png"].includes(p));
const manifest = [];
for (const file of files) {
  const bytes = execFileSync("git", ["show", `${source}:${file}`]);
  const target = path.join(out, ".vercel/output/static", file);
  await mkdir(path.dirname(target), { recursive: true });
  await writeFile(target, bytes);
  manifest.push({ file, bytes: bytes.length, sha256: createHash("sha256").update(bytes).digest("hex") });
}
const original = JSON.parse(execFileSync("git", ["show", `${source}:vercel.json`], { encoding: "utf8" }));
await writeFile(path.join(out, ".vercel/output/config.json"), JSON.stringify({ version: 3, routes: [...original.headers.map(rule => ({ src: rule.source, headers: Object.fromEntries(rule.headers.map(h => [h.key, h.value])), continue: true })), { handle: "filesystem" }] }, null, 2));
await writeFile(path.join(out, ".vercel/project.json"), JSON.stringify({ projectId: "prj_j1mVVCiiVs1jNefaK5BEILm1on0x", orgId: "team_y1FMLs1LWgVb2dOvegEGYVkf", projectName: "malaysia-between-places" }, null, 2));
await writeFile(path.join(out, "vercel.json"), JSON.stringify({ framework: null, buildCommand: null, outputDirectory: "." }, null, 2));
await writeFile("output/legacy-recovery-manifest.json", JSON.stringify({ source, out, count: manifest.length, files: manifest, deployed: false }, null, 2));
console.log(JSON.stringify({ out, source, publicFiles: files.length, deployed: false }));
