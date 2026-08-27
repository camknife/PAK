# 任务：将本项目的飞书多维表格集成迁移到企业微信智能表格

## 背景

本项目（Node.js ESM，入口 server.mjs）当前通过**飞书多维表格（Bitable）API** 实现：
1. 从飞书表读取课程数据，返回给前端渲染课程列表
2. 接收前端表单提交，写入飞书表

现在要整体迁移到**企业微信智能表格**。企业微信侧配置已全部完成并实测验证通过（自建应用、可信域名、企业可信 IP、「协作-文档-API」可调用应用配置）。以下所有接口地址、参数格式、字段结构均为**生产环境实测通过（errcode 0）**，请严格照此实现，不要参考网上其他版本的飞书/企微接口格式。

## 第一步：先定位现有飞书代码

全局搜索以下关键词，找出所有飞书集成点（token 获取、读表、写表、路由）：
`feishu`、`open.feishu.cn`、`tenant_access_token`、`bitable`、`app_token`、`table_id`、`FEISHU`

## 第二步：凭证配置（全部走环境变量，禁止硬编码）

在 `.env` 中新增（飞书相关变量迁移完成后删除）：

```
WECOM_CORP_ID=（企业ID，管理员后台-我的企业-企业信息）
WECOM_CORP_SECRET=（自建应用Secret）
WECOM_COURSE_DOCID=dckdMmt5rBcgwCHtOHa9vv2GIjcH63IjkN8Q3btKFXHnUzHzQ3_z60U88Acxaj3QRZRI6VoaDlx7OQdIjzpNqkag
WECOM_COURSE_SHEET_ID=q979lj
WECOM_FORM_DOCID=dcucwRlsuqdGk3_nUonrig6DWf3udT_9yGRC9pf1QdwJF3WOIDbTHK96P1rGfUTNkY9oPDRGgHRxwxrQ6yVA9dqQ
WECOM_FORM_SHEET_ID=q979lj
```

注意：Secret 绝不能出现在前端代码、前端构建产物或 git 提交里。

## 第三步：实现企业微信数据层（替换飞书 token 与 API 调用）

### 3.1 access_token（替换飞书 tenant_access_token）

```
GET https://qyapi.weixin.qq.com/cgi-bin/gettoken?corpid={WECOM_CORP_ID}&corpsecret={WECOM_CORP_SECRET}
返回：{"errcode":0,"errmsg":"ok","access_token":"...","expires_in":7200}
```

要求：
- 实现内存缓存，提前 5 分钟刷新（expires_in - 300 秒）
- 任何接口返回 `40014`/`42001`（token 无效/过期）时，强制刷新 token 并重试一次

### 3.2 读取记录（替换飞书 records 查询）

```
POST https://qyapi.weixin.qq.com/cgi-bin/wedoc/smartsheet/get_records?access_token={TOKEN}
Content-Type: application/json
{"docid":"DOCID","sheet_id":"SHEET_ID"}
```

实测返回结构（课程表真实数据节选）：

```json
{
  "errcode": 0, "errmsg": "ok", "total": 8, "has_more": false,
  "records": [
    {
      "record_id": "rpS0P9",
      "create_time": "1787729786680",
      "update_time": "1787730975751",
      "values": {
        "课程名称": [{"text": "2027广州班 — AK应用肌动学基础课程（模块1-2）", "type": "text"}],
        "报名状态": [{"id": "o06rmQ", "style": 24, "text": "开放报名"}],
        "模块": [{"text": "模块 1-2", "type": "text"}],
        "讲师": [{"text": "Hans Garten", "type": "text"}],
        "模块1/模块3 时间": [{"text": "2027年2月26 - 28日（3天）", "type": "text"}],
        "模块2/模块4 时间": [{"text": "2027年3月2 - 4日（3天）", "type": "text"}],
        "地点": [{"text": "广州", "type": "text"}],
        "单课程模块价格": 8000,
        "双课程模块价格": 16000,
        "名额": 24,
        "创建时间": "1784476800000",
        "更新时间": "1786982400000"
      },
      "creator_name": "「课程网站--数据接入」",
      "updater_name": "许翼飞"
    }
  ]
}
```

解析要点：
- 文本/单选字段是数组，取 `values[字段名][0].text`
- 数字字段（价格、名额）直接是数字
- 日期字段（创建时间/更新时间）是毫秒时间戳的字符串，需 `Number()` 后转日期
- **存在空行**（`values` 为空对象的记录），必须过滤
- 一次最多返回 1000 行，超过用 `limit`/`offset` 参数分页（当前数据量小，可预留）

### 3.3 新增记录（替换飞书 records 新增）

```
POST https://qyapi.weixin.qq.com/cgi-bin/wedoc/smartsheet/add_records?access_token={TOKEN}
Content-Type: application/json
{
  "docid": "DOCID",
  "sheet_id": "SHEET_ID",
  "key_type": "CELL_VALUE_KEY_TYPE_FIELD_TITLE",
  "records": [{
    "values": {
      "姓名": [{"type": "text", "text": "张三"}],
      "手机": [{"type": "text", "text": "13800138000"}],
      "提交时间": "1787730975751"
    }
  }]
}
```

写入规则（重要）：
- `key_type` 固定传 `CELL_VALUE_KEY_TYPE_FIELD_TITLE`，即可用**中文字段名**做 key
- 文本字段值必须包成 `[{"type":"text","text":"值"}]`
- 数字字段直接传数字；日期字段传毫秒时间戳字符串
- 字段名必须与表中字段**完全一致**（包括空格，例如「模块1/模块3 时间」中"时间"前有空格）

### 3.4 查询子表（备用，用于确认 sheet_id）

```
POST https://qyapi.weixin.qq.com/cgi-bin/wedoc/smartsheet/get_sheet?access_token={TOKEN}
{"docid":"DOCID"}
返回：{"errcode":0,"sheet_list":[{"sheet_id":"q979lj","title":"智能表1",...}]}
```

## 第四步：两张表的字段映射

### 表1：PAK课程信息表（读+写，替代原飞书课程表）

docid/sheet_id 见环境变量 `WECOM_COURSE_DOCID` / `WECOM_COURSE_SHEET_ID`。

| 字段名 | 类型 | 读取解析 | 写入格式 |
|--------|------|---------|---------|
| 课程名称 | 文本 | `[0].text` | `[{"type":"text","text":v}]` |
| 报名状态 | 单选 | `[0].text` | `[{"text":v}]` |
| 模块 | 文本 | `[0].text` | `[{"type":"text","text":v}]` |
| 讲师 | 文本 | `[0].text` | `[{"type":"text","text":v}]` |
| 模块1/模块3 时间 | 文本 | `[0].text` | `[{"type":"text","text":v}]` |
| 模块2/模块4 时间 | 文本 | `[0].text` | `[{"type":"text","text":v}]` |
| 地点 | 文本 | `[0].text` | `[{"type":"text","text":v}]` |
| 单课程模块价格 | 数字 | 直接取值 | 直接传数字 |
| 双课程模块价格 | 数字 | 直接取值 | 直接传数字 |
| 名额 | 数字 | 直接取值 | 直接传数字 |
| 创建时间 | 日期 | 毫秒时间戳字符串 | 毫秒时间戳字符串 |
| 更新时间 | 日期 | 毫秒时间戳字符串 | 毫秒时间戳字符串 |

### 表2：PAK用户咨询信息表（写入，替代原飞书表单数据表）

docid/sheet_id 见环境变量 `WECOM_FORM_DOCID` / `WECOM_FORM_SHEET_ID`。

计划字段：`姓名`、`手机`、`微信号`、`邮箱`、`意向课程`、`咨询内容`、`跟进状态`（默认写「待跟进」）、`提交时间`（毫秒时间戳）。

**编码前先执行下面第五节的 curl 1 和 curl 3 验证表结构**；若表2实际字段与上述不一致，以表内实际字段为准调整 key。

## 第五步：验收标准

1. 对前端的接口（路由路径、响应 JSON 结构）保持不变，只换底层数据源，前端代码一行不改
2. 课程列表接口返回的数据与原飞书版本字段语义一致
3. 表单提交成功写入企微咨询表（可在企业微信客户端打开表格肉眼验证）
4. 代码中不再残留任何飞书相关调用与凭证
5. 编码前后各跑一次以下验证命令（TOKEN 先用 gettoken 获取）：

```bash
# curl 1：读课程表（应返回 errcode 0 和课程记录）
curl -X POST "https://qyapi.weixin.qq.com/cgi-bin/wedoc/smartsheet/get_records?access_token=$TOKEN" -H "Content-Type: application/json" -d '{"docid":"dckdMmt5rBcgwCHtOHa9vv2GIjcH63IjkN8Q3btKFXHnUzHzQ3_z60U88Acxaj3QRZRI6VoaDlx7OQdIjzpNqkag","sheet_id":"q979lj"}'

# curl 2：确认咨询表 sheet_id
curl -X POST "https://qyapi.weixin.qq.com/cgi-bin/wedoc/smartsheet/get_sheet?access_token=$TOKEN" -H "Content-Type: application/json" -d '{"docid":"dcucwRlsuqdGk3_nUonrig6DWf3udT_9yGRC9pf1QdwJF3WOIDbTHK96P1rGfUTNkY9oPDRGgHRxwxrQ6yVA9dqQ"}'

# curl 3：读咨询表（验证结构与字段）
curl -X POST "https://qyapi.weixin.qq.com/cgi-bin/wedoc/smartsheet/get_records?access_token=$TOKEN" -H "Content-Type: application/json" -d '{"docid":"dcucwRlsuqdGk3_nUonrig6DWf3udT_9yGRC9pf1QdwJF3WOIDbTHK96P1rGfUTNkY9oPDRGgHRxwxrQ6yVA9dqQ","sheet_id":"q979lj"}'
```

## 注意事项（踩过的坑，勿重蹈）

1. **客户端手动建的表无法被 API 读取**（报 301085 invalid docid）。上面两张表是通过 `create_doc` API 创建的，docid 有效，直接用即可，不要换用其他表的 URL 里的 ID
2. 报 `48002 api forbidden` → 是管理端「协作-文档-API-可调用接口的应用」配置问题，不是代码问题，提示我去管理后台检查
3. token 有效期 2 小时，必须缓存+自动刷新，不要每次请求都重新获取（有频率限制）
4. 本项目运行在 Node 18+，可直接用原生 `fetch`；模块格式为 ESM（import/export）
5. 服务器公网 IP 60.205.181.202 已加入企微「企业可信 IP」白名单，只有这台服务器能调通 API，本地开发调试时调用会失败属正常现象
