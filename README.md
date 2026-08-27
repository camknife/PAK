# PAK · 健衡学园 官网前端

> PAK 专业应用肌动学（Professional Applied Kinesiology）健衡学园官方网站。基于 **React 18 + Vite 6 + TypeScript + Tailwind CSS v4** 构建。

---

## 快速开始

```bash
# 安装依赖
npm install

# 启动开发服务器（推荐，http://localhost:3000，会执行 api/ 下的 Serverless 函数，含飞书接口）
npm run vercel:dev

# 纯 Vite dev server（http://localhost:5173，不执行 api/ 函数，飞书接口不可用）
npm run dev

# 构建生产版本（输出到 dist/）
npm run build
```

> **⚠️ 本地开发请使用 `vercel:dev`（即 `vercel dev`）**，不要用纯 `npm run dev`。
> 项目在 `api/` 目录下有 Vercel Serverless 函数（`api/courses.ts` 课程中心、`api/consult.ts` 咨询表单，均对接飞书多维表格）。
> 纯 Vite 不会执行这些函数：`vite.config.ts` 的 `/api` 代理指向 `http://localhost:3000`，只有 `vercel dev` 才会启动该端口、真正运行函数并注入 `.env` 环境变量。
> 若直接用 `npm run dev`，课程中心会显示"连不上飞书"。

---

## 技术栈

| 类别 | 技术 | 用途 |
| --- | --- | --- |
| 框架 | React 18 | UI 框架 |
| 构建工具 | Vite 6 | 开发服务器 / 打包 |
| 语言 | TypeScript | 类型安全 |
| 样式 | Tailwind CSS v4 | 原子化样式 |
| 路由 | react-router v7 | 页面路由 |
| UI 组件 | shadcn/ui（Radix UI 底层） | 组件库 |
| 图标 | lucide-react | 图标 |
| 动效 | motion / canvas-confetti | 动画 |
| 轮播 | embla-carousel + autoplay | 首页轮播 |

---

## 项目结构

```
front/
├── index.html
├── package.json
├── vite.config.ts            # Vite 配置（@tailwindcss/vite、figma 资源解析）
├── api/                      # Vercel Serverless 函数（vercel dev 本地也会执行）
│   ├── courses.ts              # 课程中心：读取飞书多维表格课程数据（GET /api/courses）
│   └── consult.ts              # 咨询表单：写入飞书多维表格（POST /api/consult）
├── .env                      # 飞书应用凭证（FEISHU_APP_ID/SECRET、APP_TOKEN、TABLE_ID 等）
└── src/
    ├── main.tsx              # 路由入口
    │
    ├── app/
    │   ├── App.tsx              # 首页
    │   ├── CoursePage.tsx       # 课程介绍总览（/course）
    │   ├── Part1Page.tsx        # Part I 课程详情（/course/part1）
    │   ├── Part2Page.tsx        # Part II 课程详情（/course/part2）
    │   ├── AlumniPage.tsx       # PAK 联盟 / 学员展示（/pak-union）
    │   ├── FaqPage.tsx          # FAQ 问答（/faq）
    │   ├── ContactPage.tsx      # 课程咨询表单（/contact）
    │   ├── LiteraturePage.tsx   # 获取文献 / 知识库（/research）
    │   └── components/
    │       ├── Navbar.tsx       # 全站导航栏（ICAK logo + 健衡学园 logo）
    │       ├── ui/              # shadcn/ui 通用组件（40+）
    │       ├── alumni/          # AlumniCard / AlumniSection
    │       ├── faq/             # FaqSection
    │       └── figma/           # ImageWithFallback
    │
    ├── data/
    │   ├── alumni.ts            # 学员数据 + Alumni 类型
    │   ├── faq.ts               # FAQ 聚合入口
    │   └── faq-*.ts             # FAQ 按主题拆分（about/course/certification/...）
    │
    ├── styles/
    │   ├── index.css            # 入口样式
    │   ├── tailwind.css         # Tailwind 配置
    │   ├── theme.css            # 设计 token（CSS 变量）
    │   └── fonts.css            # 字体引入
    │
    ├── doc/                     # 项目文档
    │   ├── 课程大纲.md
    │   ├── 学员数据.md
    │   ├── PAK课程介绍-对外宣传版.md
    │   └── 肌动学知识库.md
    │
    └── imports/                 # Figma 导出图片资源
```

---

## 路由

| 路径 | 页面 | 组件 |
| --- | --- | --- |
| `/` | 首页 | `App.tsx` |
| `/course` | 课程介绍总览 | `CoursePage.tsx` |
| `/course/part1` | Part I 基础培训 | `Part1Page.tsx` |
| `/course/part2` | Part II 进阶培训 | `Part2Page.tsx` |
| `/pak-union` | PAK 联盟 | `AlumniPage.tsx` |
| `/faq` | FAQ 问答 | `FaqPage.tsx` |
| `/contact` | 课程咨询 | `ContactPage.tsx` |
| `/research` | 获取文献 | `LiteraturePage.tsx` |

---

## 设计系统

### 配色（theme.css）

| Token | 值 | 用途 |
| --- | --- | --- |
| `--background` | `#F5F5F0` | 主背景（米白） |
| `--foreground` | `#1C1C1A` | 主文字（墨黑） |
| `--accent` | `#5A8F8B` | 品牌主色（手术绿） |
| `--muted-foreground` | `#6B6B62` | 次要文字 |
| `--card` | `#EEEEE9` | 卡片底色 |
| `--border` | `rgba(28,28,26,0.12)` | 边框 |

### 字体
- **Playfair Display** — 标题 / Logo
- **Inter** — 正文 / UI

---

## 静态资源

图片统一放在 `public/assets/` 目录，Vite 会自动 serve 为 `/assets/...`。

| 文件 | 用途 |
| --- | --- |
| `LOGO_健衡学园.png` | 健衡学园 Logo |
| `0001_icak_logo.png` | ICAK Logo |
| `汉斯.jpg` | 首页讲师照片 |
| `1.jpg` / `2.jpeg` / `3.jpeg` / `4.png` | 首页轮播图 |
| `微信公众号.png` / `渠道活码-AK官网-推广码.jpg` | 页脚公众号二维码 |
| `ima下载.png` | ima App 下载二维码 |
| `【PAK专业应用肌动学文献】知识码.png` | 知识库加入二维码 |

---

## Tailwind v4 配置

`vite.config.ts` 注册了 `@tailwindcss/vite` 插件，**不再需要** `tailwind.config.js` 和 PostCSS tailwind 配置。

`src/styles/tailwind.css` 通过 `@source` 显式扫描 `src/**/*.{js,ts,jsx,tsx}` 获取类名。

---

## 路径别名

`@` → `./src`（在 `vite.config.ts` 的 `resolve.alias` 中配置）。

---

## 常见问题

### 样式不生效 / 页面全是裸 HTML
通常是 Vite HMR 缓存导致。浏览器硬刷新 `Ctrl + Shift + R`，或重启 dev server。

### 编译报错
检查最近修改的 JSX 结构是否完整，确认标签、引号、`key` / `href` 属性正确闭合。

---

## 原始来源

本项目围绕 **PAK · 健衡学园** 医学培训课程展开，ICAK 亚太地区官方合作伙伴，提供德国 DAK 认证的应用肌动学培训课程。
