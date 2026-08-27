/**
 * 构建后预渲染脚本（GEO / SEO 优化）
 *
 * 目标：让 AI 搜索引擎 / 爬虫能读到完整 HTML 内容。
 * 原理：业务是 SPA（JS 渲染），构建后 dist/ 里 index.html 的 #root 是空的，
 *       爬虫（尤其 AI）不执行 JS，读不到内容。
 *       本脚本在构建后启动无头浏览器访问各公开路由，等待 React 渲染完成，
 *       把渲染后的完整 HTML 落盘到 dist/<route>/index.html。
 *
 * 已预渲染路由：静态公开页（不含课程中心 /course-center —— 依赖企业微信智能表格 API，快照无意义）
 * Nginx 已配 SPA 回退（try_files $uri $uri/ /index.html），爬虫访问 /course 会命中
 * dist/course/index.html（预渲染版）。
 *
 * 用法：npm run build 后自动执行（package.json postbuild），或手动 node scripts/prerender.mjs
 *
 * 平台适配：
 *   - Windows 本地：优先复用系统 Chrome / Edge（零下载）
 *   - Linux 服务器：优先复用系统 chromium/chrome，没有则用 Playwright 自带 chromium
 *     （服务器需先跑：npx playwright install --with-deps chromium）
 */
import { execSync } from "node:child_process"
import { createServer } from "node:http"
import { existsSync, mkdirSync, readFileSync, statSync, writeFileSync } from "node:fs"
import { resolve, join, dirname, extname, normalize } from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const DIST = resolve(__dirname, "..", "dist")

// 预渲染路由：静态公开页。注意排除动态页（course-center 依赖 API）和已砍模块（pak-union）
const ROUTES = [
  "/",
  "/course",
  "/faq",
  "/contact",
  "/research",
  "/student-scenes",
  "/knowledge",
]

// 内容就绪判定：这些选择器出现说明 React 已渲染完成（每个路由对应的关键内容节点）
const READY_SELECTORS = {
  "/": "main",                        // 首页 main
  "/course": "main",                  // 关于PAK main
  "/faq": "#faq",                     // FAQ 区块
  "/contact": "main",                 // 联系页
  "/research": "main",                // 学习资料
  "/student-scenes": "main",          // 学员课堂
  "/knowledge": "main",               // 知识库
}

// 静态服务端口（用 vite preview 或 node 简单静态服务）
const PORT = 4174
const BASE_URL = `http://localhost:${PORT}`

async function main() {
  console.log("==> 预渲染开始")

  // 1. 确认 dist 存在
  if (!existsSync(join(DIST, "index.html"))) {
    console.error("dist/index.html 不存在，请先 npm run build")
    process.exit(1)
  }

  // 2. 安装 playwright（若未装）
  try {
    await import("playwright")
  } catch {
    console.log("==> 安装 playwright...")
    execSync("npm install --save-dev playwright", { stdio: "inherit" })
  }

  const { chromium } = await import("playwright")

  // 3. 启动内嵌静态服务器（Node http，服务 dist/，跨平台零依赖）
  console.log(`==> 启动静态服务器 :${PORT}`)
  const server = await startStaticServer(DIST, PORT)

  try {
    // 等待服务器就绪
    await waitForServer(BASE_URL)

    // 4. 启动浏览器（平台自适应）
    const browser = await launchBrowser()
    const context = await browser.newContext({
      userAgent:
        "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)",
    })

    let ok = 0
    let fail = 0
    for (const route of ROUTES) {
      const url = route === "/" ? BASE_URL : `${BASE_URL}${route}`
      const outFile = route === "/"
        ? join(DIST, "index.html")
        : join(DIST, route.slice(1), "index.html")

      console.log(`  → ${route}`)
      try {
        const page = await context.newPage()
        // 用 domcontentloaded（不等 networkidle，避免 GSAP/字体等持续请求导致超时）
        await page.goto(url, { waitUntil: "domcontentloaded", timeout: 30000 })

        // 等待该路由的关键内容出现（最长 20s）
        const selector = READY_SELECTORS[route] || "main"
        await page.waitForSelector(selector, { timeout: 20000 })
        // 额外等待一帧，确保 GSAP / 懒加载内容也落定
        await page.waitForTimeout(1000)

        const html = await page.content()

        // 写入 dist/<route>/index.html
        if (route !== "/") mkdirSync(dirname(outFile), { recursive: true })
        writeFileSync(outFile, html, "utf-8")

        // 校验：HTML 应包含非空内容（>200 字符），否则可能是空壳
        const bodyLen = html.length
        if (bodyLen < 200) {
          console.warn(`  ⚠️ ${route} HTML 过短(${bodyLen}字符)，可能未渲染成功`)
        } else {
          console.log(`  ✓ ${route} → ${outFile} (${bodyLen} 字符)`)
          ok++
        }
        await page.close()
      } catch (err) {
        console.error(`  ✗ ${route} 预渲染失败: ${err.message}`)
        fail++
      }
    }

    await browser.close()
    console.log(`==> 预渲染完成：成功 ${ok}，失败 ${fail}`)
    if (fail > 0) process.exitCode = 1
  } finally {
    // 关闭静态服务器
    if (server) {
      try { server.close() } catch {}
    }
  }
}

// 极简静态服务器：服务 dist/ 目录，SPA 回退到 index.html
// （与线上 Nginx 的 try_files $uri $uri/ /index.html 行为一致）
function startStaticServer(root, port) {
  const MIME = {
    ".html": "text/html; charset=utf-8",
    ".js": "text/javascript",
    ".css": "text/css",
    ".json": "application/json",
    ".svg": "image/svg+xml",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".webp": "image/webp",
    ".ico": "image/x-icon",
    ".txt": "text/plain",
    ".xml": "application/xml",
    ".map": "application/json",
  }
  return new Promise((resolve, reject) => {
    const server = createServer((req, res) => {
      const urlPath = decodeURIComponent(new URL(req.url, "http://localhost").pathname)
      // 防止路径穿越
      let filePath = normalize(join(root, urlPath))
      if (!filePath.startsWith(root)) filePath = root

      // 目录 → index.html
      let target = filePath
      try {
        if (statSync(target).isDirectory()) target = join(target, "index.html")
      } catch { /* 不存在则走 SPA 回退 */ }

      if (!existsSync(target)) target = join(root, "index.html") // SPA 回退

      const ext = extname(target)
      res.setHeader("Content-Type", MIME[ext] || "application/octet-stream")
      res.end(readFileSync(target))
    })
    server.on("error", reject)
    server.listen(port, () => resolve(server))
  })
}

// 等待服务器可访问
async function waitForServer(url, timeout = 30000) {
  const start = Date.now()
  while (Date.now() - start < timeout) {
    try {
      const res = await fetch(url)
      if (res.ok) return
    } catch {}
    await new Promise((r) => setTimeout(r, 500))
  }
  throw new Error(`静态服务器 ${url} 启动超时`)
}

// 平台自适应启动浏览器
async function launchBrowser() {
  const { chromium } = await import("playwright")

  // Windows：优先系统 Chrome
  const systemPaths = {
    win32: [
      "C:/Program Files/Google/Chrome/Application/chrome.exe",
      "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
      "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
      "C:/Program Files/Microsoft/Edge/Application/msedge.exe",
    ],
    linux: [
      "/usr/bin/chromium",
      "/usr/bin/chromium-browser",
      "/usr/bin/google-chrome",
      "/usr/bin/chromium-browser-stable",
    ],
  }

  for (const p of systemPaths[process.platform] || []) {
    if (existsSync(p)) {
      console.log(`  复用系统浏览器: ${p}`)
      return chromium.launch({ executablePath: p, headless: true })
    }
  }

  // 没有系统浏览器，用 Playwright 自带 chromium
  console.log("  未找到系统浏览器，用 Playwright chromium（服务器需先 install）")
  return chromium.launch({ headless: true })
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
