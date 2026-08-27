import { spawn } from "node:child_process"
import { createServer } from "node:http"
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath, pathToFileURL } from "node:url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, "..")
const API_PORT = Number(process.env.API_PORT || 3000)
const VITE_PORT = Number(process.env.VITE_PORT || 5173)

function loadEnv() {
  const envFile = path.join(root, ".env")
  if (!fs.existsSync(envFile)) return
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
    console.error("[dev-api error]", err instanceof Error ? err.message : err)
    rres.status(500).json({ error: err instanceof Error ? err.message : "Internal server error" })
  }
})

server.listen(API_PORT, () => {
  console.log(`[dev-api] Wecom smartsheet API server ready at http://localhost:${API_PORT}`)
})

const viteBin = path.join(root, "node_modules", "vite", "bin", "vite.js")
const vite = spawn(process.execPath, [viteBin, "--port", String(VITE_PORT), "--strictPort"], {
  cwd: root,
  stdio: "inherit",
})

vite.on("exit", (code) => {
  server.close()
  process.exit(code ?? 0)
})
