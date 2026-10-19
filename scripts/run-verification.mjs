import { spawn } from "node:child_process";
const port = 8002;
const server = spawn(
  process.execPath,
  ["scripts/serve.mjs", "dist", String(port)],
  { stdio: ["ignore", "pipe", "inherit"] },
);
try {
  await new Promise((resolve, reject) => {
    server.stdout.once("data", resolve);
    server.once("error", reject);
    server.once("exit", (code) => reject(new Error(`Preview exited ${code}`)));
  });
  const code = await new Promise((resolve, reject) => {
    const child = spawn(
      process.execPath,
      [
        "scripts/verify-browser.mjs",
        `http://127.0.0.1:${port}/`,
        "--label",
        "verification",
      ],
      { stdio: "inherit" },
    );
    child.once("exit", resolve);
    child.once("error", reject);
  });
  process.exitCode = code;
} finally {
  server.kill();
}
