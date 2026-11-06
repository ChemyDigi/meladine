/*
 * Renders the GLB instrument models to transparent PNGs for the phone / tablet
 * views (public/images/3d/*.png), using the same camera, lighting and pose as
 * the WebGL scenes in components/home/GuitarModel.tsx and Disciplines3D.tsx.
 *
 * One-off setup (not a project dependency):
 *   npm i -D puppeteer-core
 *
 * Run from the project root:
 *   node scripts/render-instruments/render.js
 *
 * Needs a Chromium-based browser. Set BROWSER_PATH if the default Edge path
 * below does not exist on your machine (Chrome works too).
 */
const http = require("http");
const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..", "..");
const OUT_DIR = path.join(ROOT, "public", "images", "3d");
const PORT = 3100;
const BROWSER_PATH =
  process.env.BROWSER_PATH ||
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe";

// preset -> output file name and render canvas size
const JOBS = [
  { preset: "hero", file: "electric-guitar.png", w: 1400, h: 1400 },
  { preset: "guitar", file: "acoustic-guitar.png", w: 1600, h: 1200 },
  { preset: "piano", file: "keyboard.png", w: 1600, h: 1200 },
  { preset: "vocals", file: "microphone.png", w: 1600, h: 1200 },
];

const MIME = {
  ".js": "text/javascript",
  ".html": "text/html",
  ".glb": "model/gltf-binary",
};

// Minimal static server rooted at the project so the harness can import
// three.js from node_modules and fetch the models from public/models.
function serve() {
  return new Promise((resolve) => {
    const server = http.createServer((req, res) => {
      const filePath = path.join(ROOT, decodeURIComponent(req.url.split("?")[0]));
      if (!filePath.startsWith(ROOT) || !fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) {
        res.writeHead(404);
        return res.end();
      }
      res.writeHead(200, { "Content-Type": MIME[path.extname(filePath)] || "application/octet-stream" });
      fs.createReadStream(filePath).pipe(res);
    });
    server.listen(PORT, () => resolve(server));
  });
}

(async () => {
  const puppeteer = require("puppeteer-core");
  const sharp = require("sharp");
  const server = await serve();
  const browser = await puppeteer.launch({
    executablePath: BROWSER_PATH,
    headless: true,
    args: ["--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"],
    protocolTimeout: 600000,
  });

  fs.mkdirSync(OUT_DIR, { recursive: true });

  for (const job of JOBS) {
    const page = await browser.newPage();
    await page.setViewport({ width: job.w, height: job.h, deviceScaleFactor: 1 });
    await page.goto(
      `http://localhost:${PORT}/scripts/render-instruments/harness.html?preset=${job.preset}&w=${job.w}&h=${job.h}`,
      { waitUntil: "load", timeout: 120000 }
    );
    await page.waitForFunction("window.__done === true", { timeout: 540000, polling: 500 });
    const error = await page.evaluate(() => window.__error || null);
    if (error) {
      console.error(job.preset, "failed:", error);
      await page.close();
      continue;
    }
    const dataUrl = await page.evaluate(() => window.__png);
    const png = Buffer.from(dataUrl.split(",")[1], "base64");
    const trimmed = await sharp(png).trim({ threshold: 8 }).png({ compressionLevel: 9 }).toBuffer();
    fs.writeFileSync(path.join(OUT_DIR, job.file), trimmed);
    const meta = await sharp(trimmed).metadata();
    console.log(`${job.file}: ${meta.width}x${meta.height}, ${Math.round(trimmed.length / 1024)} KB`);
    await page.close();
  }

  await browser.close();
  server.close();
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
