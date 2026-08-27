import type { VercelRequest, VercelResponse } from "@vercel/node"
import { addRecords, textValue, selectValue } from "../lib/wecom.ts"

interface ConsultPayload {
  name: string
  phone: string
  occupation?: string
  course?: string
  message?: string
}

// 咨询表字段ID（用 field_id 作 key，配合 key_type=FIELD_ID，避开中文字段名匹配问题）
// 来源：咨询表智能表格的字段属性。若表结构调整，改这里即可。
const FORM_FIELD_IDS = {
  name: "f04Gwj", // 姓名
  phone: "ftQMc5", // 手机号
  occupation: "ftk5Tx", // 职业背景（单选）
  course: "ffFwIh", // 意向课程
  message: "fn8TJd", // 咨询内容
  created: "fd5uVm", // 创建时间（日期/时间字段，传毫秒时间戳字符串）
} as const

function parseBody(req: VercelRequest): ConsultPayload {
  if (typeof req.body === "string") {
    return JSON.parse(req.body) as ConsultPayload
  }
  return (req.body ?? {}) as ConsultPayload
}

function isValidPhone(phone: string): boolean {
  return /^1[3-9]\d{9}$/.test(phone)
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS")
    res.setHeader("Access-Control-Allow-Headers", "Content-Type")
    return res.status(204).end()
  }

  if (req.method !== "POST") {
    res.setHeader("Allow", "POST")
    return res.status(405).json({ error: "Method not allowed" })
  }

  const WECOM_FORM_DOCID = process.env.WECOM_FORM_DOCID
  const WECOM_FORM_SHEET_ID = process.env.WECOM_FORM_SHEET_ID

  if (!WECOM_FORM_DOCID || !WECOM_FORM_SHEET_ID) {
    return res.status(500).json({ error: "Missing Wecom form configuration" })
  }

  try {
    const payload = parseBody(req)

    if (!payload.name?.trim() || !payload.phone?.trim()) {
      return res.status(400).json({ error: "姓名和手机号不能为空" })
    }

    if (!isValidPhone(payload.phone.trim())) {
      return res.status(400).json({ error: "手机号格式不正确" })
    }

    // 构造写入 values（field_id 作 key）：
    // - 文本字段包成 [{type:"text",text:v}]
    // - 单选字段包成 [{text:v}]，值必须是该字段选项之一
    // - 日期字段传毫秒时间戳字符串（企微 date_time 字段格式）
    const values: Record<string, unknown> = {
      [FORM_FIELD_IDS.name]: textValue(payload.name.trim()),
      [FORM_FIELD_IDS.phone]: textValue(payload.phone.trim()),
      [FORM_FIELD_IDS.course]: textValue(payload.course?.trim() || ""),
      [FORM_FIELD_IDS.message]: textValue(payload.message?.trim() || ""),
      [FORM_FIELD_IDS.created]: String(Date.now()),
    }

    // 职业背景：单选字段，有值才写（值需匹配表中选项）
    if (payload.occupation?.trim()) {
      values[FORM_FIELD_IDS.occupation] = selectValue(payload.occupation.trim())
    }

    // addRecords 默认 key_type=FIELD_ID
    await addRecords(WECOM_FORM_DOCID, WECOM_FORM_SHEET_ID, [{ values }])

    return res.status(200).json({ success: true, message: "提交成功" })
  } catch (err) {
    const message = err instanceof Error ? err.message : "Internal server error"
    // fetch failed 时打印 cause（ECONNRESET/ETIMEDOUT 等）
    const cause =
      err instanceof Error && err.cause
        ? err.cause instanceof Error
          ? err.cause.message
          : JSON.stringify(err.cause)
        : ""
    const detail = cause ? `${message} | cause: ${cause}` : message
    console.error("[consult api error]", detail)
    return res.status(500).json({ error: detail })
  }
}
