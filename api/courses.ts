import type { VercelRequest, VercelResponse } from "@vercel/node"
import { getRecords } from "../lib/wecom.ts"

type CourseStatus = "open" | "upcoming" | "closed"

interface Course {
  name: string
  status: CourseStatus
  module: string
  instructor: string
  time: string
  location: string
  seats: number
  price: string
  singlePrice: string
  earlyBird: string
}

// 企业微信智能表格单元格值：文本/单选字段为 [{text:"..."}]，数字字段直接是数字
function getText(value: unknown): string {
  if (value === null || value === undefined) return ""
  if (typeof value === "string") return value
  if (typeof value === "number") return String(value)
  if (Array.isArray(value)) {
    return value
      .map((item) => {
        if (typeof item === "string") return item
        if (item && typeof item === "object") {
          return (item as { text?: string }).text ?? ""
        }
        return ""
      })
      .filter(Boolean)
      .join(", ")
  }
  if (typeof value === "object") {
    return (value as { text?: string }).text ?? String(value)
  }
  return String(value)
}

function getNumber(value: unknown): number {
  if (typeof value === "number") return value
  if (typeof value === "string") {
    const parsed = Number(value.replace(/[^0-9.-]/g, ""))
    return Number.isNaN(parsed) ? 0 : parsed
  }
  return 0
}

function formatPrice(value: unknown): string {
  if (value === null || value === undefined || value === "") return ""
  if (typeof value === "string" && value.startsWith("¥")) return value
  const num = getNumber(value)
  if (num === 0) return getText(value)
  return `¥${num.toLocaleString("zh-CN")}`
}

function mapStatus(statusText: string): CourseStatus | "cancelled" | null {
  switch (statusText.trim()) {
    case "开放报名":
      return "open"
    case "即将开放":
      return "upcoming"
    case "已截止":
      return "closed"
    case "已取消":
      return "cancelled"
    default:
      return null
  }
}

function mapCourse(fields: Record<string, unknown>): Course | null {
  const name = getText(fields["课程名称"])
  const statusText = getText(fields["报名状态"])
  const status = mapStatus(statusText)

  if (!name || !status || status === "cancelled") return null

  const time1 = getText(fields["模块1/模块3 时间"])
  const time2 = getText(fields["模块2/模块4 时间"])
  const time = [time1, time2].filter(Boolean).join(" + ")

  return {
    name,
    status,
    module: getText(fields["模块"]),
    instructor: getText(fields["讲师"]),
    time,
    location: getText(fields["地点"]),
    seats: getNumber(fields["名额"]) || 24,
    price: formatPrice(fields["双课程模块价格"]),
    singlePrice: formatPrice(fields["单课程模块价格"]),
    earlyBird: formatPrice(fields["早鸟价"]),
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET")
    return res.status(405).json({ error: "Method not allowed" })
  }

  const WECOM_COURSE_DOCID = process.env.WECOM_COURSE_DOCID
  const WECOM_COURSE_SHEET_ID = process.env.WECOM_COURSE_SHEET_ID

  if (!WECOM_COURSE_DOCID || !WECOM_COURSE_SHEET_ID) {
    return res.status(500).json({ error: "Missing Wecom course configuration" })
  }

  try {
    const records = await getRecords(WECOM_COURSE_DOCID, WECOM_COURSE_SHEET_ID)
    const courses = records.map(mapCourse).filter((c): c is Course => c !== null)

    res.setHeader("Content-Type", "application/json")
    res.setHeader("Cache-Control", "s-maxage=60, stale-while-revalidate=300")
    return res.status(200).json({ data: courses })
  } catch (err) {
    const message = err instanceof Error ? err.message : "Internal server error"
    console.error("[courses api error]", message)
    return res.status(500).json({ error: message })
  }
}
