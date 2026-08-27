import { useEffect } from "react"

/**
 * 站点正式域名（sitemap / canonical 基础 URL）
 */
const SITE_URL = "https://icak.com.cn"

/**
 * 设置当前页面的 document.title 与 meta description + canonical。
 *
 * 用法（在页面组件顶部）：
 *   usePageMeta("关于PAK | 什么是应用肌动学 - 健衡学园", "应用肌动学（PAK）是以徒手肌肉测试为核心诊断工具的整合性临床评估体系。")
 *
 * canonical 基于 window.location.pathname 自动推导，无需传参。
 * 对不支持 JS 渲染的爬虫，index.html 里的静态 meta 兜底。
 */
export function usePageMeta(title: string, description?: string) {
  useEffect(() => {
    document.title = title

    if (description) {
      let el = document.querySelector('meta[name="description"]')
      if (!el) {
        el = document.createElement("meta")
        el.setAttribute("name", "description")
        document.head.appendChild(el)
      }
      el.setAttribute("content", description)
    }

    const canonicalUrl = SITE_URL + window.location.pathname
    let link = document.querySelector('link[rel="canonical"]')
    if (!link) {
      link = document.createElement("link")
      link.setAttribute("rel", "canonical")
      document.head.appendChild(link)
    }
    link.setAttribute("href", canonicalUrl)
  }, [title, description])
}
