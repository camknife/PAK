/**
 * 企业微信智能表格数据层（开放 API）
 *
 * 提供：
 * - access_token 获取与内存缓存（提前 5 分钟刷新，规避频率限制）
 * - 40014/42001（token 无效/过期）自动刷新并重试一次
 * - getRecords：分页查询记录，过滤空行
 * - addRecords：新增记录
 *
 * 文档：https://developer.work.weixin.qq.com/document/path/101158
 * 注意：本地调试调用会失败（服务器公网 IP 白名单），仅生产服务器（60.205.181.202）可调通。
 */

const API_BASE = "https://qyapi.weixin.qq.com/cgi-bin"

// token 内存缓存
interface CachedToken {
  token: string
  expiresAt: number // 毫秒时间戳
}
let cachedToken: CachedToken | null = null

/**
 * 获取 access_token（带缓存，提前 5 分钟刷新）
 * 文档：GET /cgi-bin/gettoken?corpid=&corpsecret=
 */
export async function getAccessToken(): Promise<string> {
  const now = Date.now()
  if (cachedToken && cachedToken.expiresAt > now) {
    return cachedToken.token
  }

  const corpid = process.env.WECOM_CORP_ID
  const corpsecret = process.env.WECOM_CORP_SECRET
  if (!corpid || !corpsecret) {
    throw new Error("Missing WECOM_CORP_ID / WECOM_CORP_SECRET")
  }

  const url = `${API_BASE}/gettoken?corpid=${encodeURIComponent(corpid)}&corpsecret=${encodeURIComponent(corpsecret)}`
  const res = await fetch(url)
  const data = (await res.json()) as {
    errcode: number
    errmsg?: string
    access_token?: string
    expires_in?: number
  }

  if (data.errcode !== 0 || !data.access_token) {
    throw new Error(
      `Wecom gettoken failed: ${data.errmsg ?? "unknown error"} (errcode=${data.errcode})`
    )
  }

  const expiresIn = data.expires_in ?? 7200
  // 提前 5 分钟刷新，避免临界过期
  cachedToken = {
    token: data.access_token,
    expiresAt: now + (expiresIn - 300) * 1000,
  }
  return cachedToken.token
}

function invalidateToken(): void {
  cachedToken = null
}

/**
 * 调用 wedoc/smartsheet 接口，自动处理 token 过期重试
 * @param pathname 接口名，如 "get_records" / "add_records"
 * @param body 请求体
 */
async function wedocRequest<T = Record<string, unknown>>(
  pathname: string,
  body: unknown
): Promise<T> {
  const makeRequest = async (token: string) => {
    const url = `${API_BASE}/wedoc/smartsheet/${pathname}?access_token=${token}`
    return fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
  }

  let token = await getAccessToken()
  let res = await makeRequest(token)
  let data = (await res.json()) as { errcode: number; errmsg?: string } & T

  // 40014 token 无效 / 42001 token 过期 → 强制刷新重试一次
  if (data.errcode === 40014 || data.errcode === 42001) {
    invalidateToken()
    token = await getAccessToken()
    res = await makeRequest(token)
    data = (await res.json()) as { errcode: number; errmsg?: string } & T
  }

  if (data.errcode !== 0) {
    throw new Error(
      `Wecom ${pathname} failed: ${data.errmsg ?? "unknown error"} (errcode=${data.errcode})`
    )
  }

  return data
}

interface WecomRecord {
  record_id?: string
  values?: Record<string, unknown>
}

interface GetRecordsResponse {
  errcode: number
  errmsg?: string
  total?: number
  has_more?: boolean
  next?: number
  records?: WecomRecord[]
}

/**
 * 查询智能表格记录（分页 + 过滤空行）
 * key_type=FIELD_TITLE 让返回 values 的 key 用中文字段标题
 */
export async function getRecords(
  docid: string,
  sheetId: string
): Promise<Record<string, unknown>[]> {
  const out: Record<string, unknown>[] = []
  const limit = 1000 // 单页最大值
  let offset = 0
  let hasMore = true

  while (hasMore) {
    const data = await wedocRequest<GetRecordsResponse>("get_records", {
      docid,
      sheet_id: sheetId,
      key_type: "CELL_VALUE_KEY_TYPE_FIELD_TITLE",
      offset,
      limit,
    })

    for (const r of data.records ?? []) {
      // 过滤空行（values 为空对象的记录）
      if (r.values && Object.keys(r.values).length > 0) {
        out.push(r.values)
      }
    }

    hasMore = Boolean(data.has_more)
    offset = typeof data.next === "number" ? data.next : offset + limit
  }

  return out
}

/**
 * 新增记录
 * 默认 key_type=FIELD_ID（用 field_id 作 key，ASCII 不受编码影响，更稳）；
 * 如需用中文字段名作 key，传 keyType="CELL_VALUE_KEY_TYPE_FIELD_TITLE"
 */
export async function addRecords(
  docid: string,
  sheetId: string,
  records: { values: Record<string, unknown> }[],
  keyType: string = "CELL_VALUE_KEY_TYPE_FIELD_ID"
): Promise<void> {
  await wedocRequest("add_records", {
    docid,
    sheet_id: sheetId,
    key_type: keyType,
    records,
  })
}

// ===== 写入值格式化辅助（严格按文档要求） =====

/** 文本字段值：[{type:"text",text:v}] */
export function textValue(v: string): Array<{ type: string; text: string }> {
  return [{ type: "text", text: v }]
}

/** 单选字段值：[{text:v}] */
export function selectValue(v: string): Array<{ text: string }> {
  return [{ text: v }]
}
