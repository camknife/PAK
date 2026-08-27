/**
 * 生成 GEO 内容文件（一次性脚本，手动运行）
 * 产出：
 *   - public/llms.txt       站点导航摘要（给 LLM/AI 爬虫）
 *   - public/llms-full.txt  全站 FAQ 内容拼接版
 *   - public/ai/faq.json    结构化 FAQ（全量）
 *
 * 用法：node scripts/gen-geo.mjs
 * 说明：所有内容复用网站已有文案，不新增/不编造。
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs"
import { resolve, dirname } from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const PUBLIC = resolve(__dirname, "..", "public")

const SITE_URL = "https://icak.com.cn"

// 从 FAQ 数据文件提取问答（按分类顺序）
const FAQ_FILES = [
  "faq-about",
  "faq-course",
  "faq-certification",
  "faq-clinical",
  "faq-comparison",
  "faq-instructor",
  "faq-registration",
]

const faq = [] // { category, question, answer }
for (const file of FAQ_FILES) {
  const txt = readFileSync(resolve(__dirname, "..", "src", "data", `${file}.ts`), "utf8")
  const questions = [...txt.matchAll(/question: "([^"]+)"/g)].map((m) => m[1])
  const answers = [...txt.matchAll(/answer: "([\s\S]*?)",\s*\n\s*keywords/g)].map((m) => m[1])
  questions.forEach((q, i) => {
    if (answers[i]) faq.push({ category: file.replace("faq-", ""), question: q, answer: answers[i] })
  })
}

// ── 1. llms.txt ──────────────────────────────────────────────
const llmsTxt = `# 健衡学园

> ICAK 国际应用肌动学（Applied Kinesiology）中文培训体系，提供 PAK 线下模块课程、线上预习与国际认证培训。

## 课程
- [关于PAK（课程介绍）](${SITE_URL}/course): AK 是什么、60 余年临床验证、健康金三角与课程体系
- [课程中心](${SITE_URL}/course-center): 线下课程排期、模块 1-2 报名与费用
- [PAK知识库](${SITE_URL}/knowledge): 45 种常见病症的 AK 诊疗方法

## 认证
- [关于PAK - 认证路径](${SITE_URL}/course): DÄGAK / ICAK 国际认证体系说明

## 常见问题
- [FAQ问答](${SITE_URL}/faq): 报名、费用、认证、学习路径、临床技术常见问题

## 更多
- [学习资料](${SITE_URL}/research): AK 经典教材与科普读物
- [学员课堂](${SITE_URL}/student-scenes): 课程实拍与学员风采
- [课程咨询](${SITE_URL}/contact): 预约咨询表单
`

writeFileSync(resolve(PUBLIC, "llms.txt"), llmsTxt, "utf-8")

// ── 2. llms-full.txt（FAQ 全量拼接）──────────────────────────
let full = `# 健衡学园 - 完整内容

> ICAK 国际应用肌动学（Applied Kinesiology）中文培训体系，提供 PAK 线下模块课程、线上预习与国际认证培训。
> 站点：${SITE_URL}

应用肌动学（Professional Applied Kinesiology，简称 PAK）是一套以徒手肌肉测试为核心诊断工具的整合性临床评估体系。它由美国脊医 George Goodheart 博士于 1964 年创立，经过 60 余年的发展，已形成覆盖结构（筋膜/关节/神经肌肉）、化学（营养/毒素/代谢）和心理（情绪/压力模式）三大维度的整体诊疗框架。课程遵循 DÄGAK（德国应用肌动学学会）标准，全系列共 6 大模块，合计 240 学时（含线上预习、线下实操、复训与作业）。

## 常见问题（FAQ）

`
for (const item of faq) {
  const clean = item.answer.replace(/\\n/g, "\n")
  full += `### ${item.question}\n\n${clean}\n\n`
}

writeFileSync(resolve(PUBLIC, "llms-full.txt"), full, "utf-8")

// ── 3. ai/faq.json（结构化 FAQ）──────────────────────────────
const faqJson = {
  name: "健衡学园",
  description: "ICAK 国际应用肌动学（Applied Kinesiology）中文培训体系，提供 PAK 线下模块课程、线上预习与国际认证培训。",
  url: SITE_URL,
  faq: faq.map((item) => ({
    category: item.category,
    question: item.question,
    answer: item.answer.replace(/\\n/g, "\n"),
  })),
}

mkdirSync(resolve(PUBLIC, "ai"), { recursive: true })
writeFileSync(resolve(PUBLIC, "ai", "faq.json"), JSON.stringify(faqJson, null, 2), "utf-8")

console.log(`GEO 文件已生成：`)
console.log(`  - public/llms.txt（${llmsTxt.length} 字符）`)
console.log(`  - public/llms-full.txt（${full.length} 字符）`)
console.log(`  - public/ai/faq.json（${faq.length} 条 FAQ）`)
