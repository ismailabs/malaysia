import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import path from "node:path";
const root = path.resolve(process.argv[2] || "dist");
const port = Number(process.argv[3] || 8001);
const mime = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".webp": "image/webp",
  ".woff2": "font/woff2",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml",
};
createServer(async (req, res) => {
  try {
    const u = new URL(req.url, "http://localhost");
    let file = path.resolve(root, "." + decodeURIComponent(u.pathname));
    if (file !== root && !file.startsWith(root + path.sep)) {
      res.writeHead(403).end();
      return;
    }
    let code = 200;
    try {
      if ((await stat(file)).isDirectory()) {
        if (!u.pathname.endsWith("/")) {
          res.writeHead(308, { Location: u.pathname + "/" + u.search }).end();
          return;
        }
        file = path.join(file, "index.html");
      }
      await stat(file);
    } catch {
      file = path.join(root, "404.html");
      code = 404;
    }
    const data = await readFile(file);
    res.writeHead(code, {
      "Content-Type": mime[path.extname(file)] || "application/octet-stream",
      "Content-Length": data.length,
      "Cache-Control": "no-store",
      "Content-Security-Policy":
        "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self'; font-src 'self'; connect-src 'self'; object-src 'none'; base-uri 'self'; frame-ancestors 'none'; form-action 'none'",
      "X-Content-Type-Options": "nosniff",
    });
    res.end(req.method === "HEAD" ? undefined : data);
  } catch {
    res.writeHead(500).end("Preview server error");
  }
}).listen(port, "127.0.0.1", () =>
  console.log(`Static preview ${root} at http://127.0.0.1:${port}`),
);
