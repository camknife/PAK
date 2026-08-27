/**
 * 生产 API server（阿里云部署用）
 *
 * 在 scripts/dev.mjs 基础上改造：
 * - 从项目根目录 .env 读取企业微信智能表格配置
 *   · /api/courses 走开放 API get_records 读取课程（需 WECOM_COURSE_DOCID/SHEET_ID）
 *   · /api/consult 走开放 API add_records 写入咨询（需 WECOM_FORM_DOCID/SHEET_ID）
 *   · 共用 lib/wecom.ts 的 access_token 缓存与重试
 * - 监听 3000 端口，提供 /api/courses 与 /api/consult
 * - 供 PM2 守护运行：pm2 start server.mjs --name pak-api
 *
 * 前端 Nginx 把 /api/* 反代到这里（见 deploy/nginx.conf）。
 */
import { createServer } from "node:http"
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath, pathToFileURL } from "node:url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
// root 指向项目根目录（server.mjs 所在目录，即 front/）
// 兼容两种部署布局：
//   A) 代码 clone 到 /www/pakfront/front，server.mjs 在 front/ 下 → root = front/
//   B) 代码直接放 /www/pakfront，server.mjs 在根下 → root = /www/pakfront
// 统一用「server.mjs 所在目录」作为项目根，api/ 与 .env 都位于该目录下。
const root = __dirname
const PORT = Number(process.env.PORT || 3000)

// 加载 .env（不覆盖已存在的环境变量，方便 PM2 里用 ecosystem 覆盖）
function loadEnv() {
  const envFile = path.join(root, ".env")
  if (!fs.existsSync(envFile)) {
    console.warn("[warn] 未找到 .env，企业微信智能表格 API 将不可用")
    return
  }
  for (const line of fs.readFileSync(envFile, "utf8").split(/\r?\n/)) {
    const m = line.match(/^([^#=]+)=(.*)$/)
    if (!m) continue
    const key = m[1].trim()
    const val = m[2].trim()
    if (!(key in process.env)) process.env[key] = val
  }
}

loadEnv()

const { default: coursesHandler } = await import(pathToFileURL(path.join(root, "api", "courses.ts")).href)
const { default: consultHandler } = await import(pathToFileURL(path.join(root, "api", "consult.ts")).href)

function adaptResponse(res) {
  return {
    _status: 200,
    setHeader(k, v) {
      res.setHeader(k, v)
      return this
    },
    status(code) {
      this._status = code
      return this
    },
    end(...args) {
      res.end(...args)
      return this
    },
    json(body) {
      const payload = typeof body === "string" ? body : JSON.stringify(body)
      if (!res.hasHeader("Content-Type")) res.setHeader("Content-Type", "application/json")
      res.statusCode = this._status
      res.end(payload)
      return this
    },
  }
}

const server = createServer(async (req, res) => {
  const url = new URL(req.url, "http://localhost")

  let rawBody = ""
  for await (const chunk of req) rawBody += chunk

  let parsedBody = {}
  if (rawBody) {
    try {
      parsedBody = JSON.parse(rawBody)
    } catch {
      parsedBody = rawBody
    }
  }

  const rreq = {
    method: req.method,
    url: req.url,
    query: Object.fromEntries(url.searchParams),
    body: parsedBody,
  }
  const rres = adaptResponse(res)

  try {
    if (url.pathname === "/api/courses") {
      await coursesHandler(rreq, rres)
    } else if (url.pathname === "/api/consult") {
      await consultHandler(rreq, rres)
    } else {
      rres.status(404).json({ error: "Not found" })
    }
  } catch (err) {
    console.error("[api error]", err instanceof Error ? err.message : err)
    rres.status(500).json({ error: err instanceof Error ? err.message : "Internal server error" })
  }
})

server.listen(PORT, () => {
  console.log(`[pak-api] listening on :${PORT}`)
})

// 优雅退出（PM2 reload 用）
for (const signal of ["SIGINT", "SIGTERM"]) {
  process.on(signal, () => {
    console.log(`[pak-api] ${signal} received, closing...`)
    server.close(() => process.exit(0))
  })
}
