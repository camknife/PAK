/**
 * 生成 sitemap.xml（写入 dist/）。
 * 在 `vite build` 之后运行（package.json postbuild）。
 */
import { writeFileSync } from "fs"
import { resolve } from "path"

const SITE_URL = "https://icak.com.cn"

// 公开路由（不含已砍的 /pak-union）。预渲染页面加尾斜杠（Nginx 目录规范化会 301 到 /route/）。
const ROUTES = [
  "/",
  "/course",
  "/faq",
  "/contact",
  "/research",
  "/student-scenes",
  "/course-center",
  "/knowledge",
]

const today = new Date().toISOString().split("T")[0]

// 首页 "/" 保持原样，其余路由统一加尾斜杠，避免 Nginx 301 目录跳转
const urls = ROUTES.map(
  (route) => {
    const loc = route === "/" ? SITE_URL : `${SITE_URL}${route}/`
    return (
      `  <url>\n` +
      `    <loc>${loc}</loc>\n` +
      `    <lastmod>${today}</lastmod>\n` +
      `    <changefreq>monthly</changefreq>\n` +
      `    <priority>${route === "/" ? "1.0" : "0.8"}</priority>\n` +
      `  </url>`
    )
  }
).join("\n")

const xml =
  `<?xml version="1.0" encoding="UTF-8"?>\n` +
  `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  `${urls}\n` +
  `</urlset>\n`

const out = resolve(process.cwd(), "dist", "sitemap.xml")
writeFileSync(out, xml, "utf-8")
console.log(`sitemap.xml 已生成：${out}（${ROUTES.length} 条路由）`)
