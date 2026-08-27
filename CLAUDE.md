# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # dev server on http://localhost:5173
npm run build    # production build → dist/
```

No lint, typecheck, or test scripts exist in `package.json`.

## Tech Stack

React 18 + Vite 6 + TypeScript + Tailwind CSS v4. Animation: **GSAP** (`gsap` + `@gsap/react` + `lenis` for smooth scroll). Package manager is **npm** in practice (`package-lock.json` is gitignored; `pnpm-workspace.yaml` also exists but is not used for installs).

## Path Alias

`@` → `./src` (configured in `vite.config.ts` `resolve.alias`).

## Tailwind v4 — Different from v3

- `@tailwindcss/vite` plugin in `vite.config.ts` handles everything. **No `tailwind.config.js` file exists** and **PostCSS is not used for Tailwind** (only for autoprefixer in `postcss.config.mjs`).
- `src/styles/tailwind.css` uses `@import 'tailwindcss' source(none)` to disable automatic scanning, then `@source` to explicitly scan `src/**/*.{js,ts,jsx,tsx}`.
- Theme tokens (colors, spacing, fonts, radii) are CSS variables defined in `src/styles/theme.css`, bridged to Tailwind via `@theme inline`.
- Light/dark mode: CSS variables change under `.dark` class on `<html>`.

## Entry & Routing

- Entry: `index.html` → `/src/main.tsx` → `BrowserRouter` with `Routes`.
- **Code splitting**: `main.tsx` lazy-loads every page via `React.lazy` wrapped in `<Suspense>` (fallback = `PageLoader`). Each route is an independent chunk, loaded on demand.
- `main.tsx` also mounts global singletons: `ScrollToTop` (scroll to top on route change + `history.scrollRestoration = "manual"`), `SmoothScroll` (global Lenis), `CustomCursor`.

Routes:

| Path | Page | Component |
| --- | --- | --- |
| `/` | Home (landing) | `App.tsx` |
| `/course` | Course detail / 关于AK | `CoursePage.tsx` |
| `/pak-union` | Alumni / 治疗师目录 | `AlumniPage.tsx` |
| `/faq` | FAQ page | `FaqPage.tsx` |
| `/contact` | Contact form | `ContactPage.tsx` |
| `/research` | Literature | `LiteraturePage.tsx` |
| `/student-scenes` | 学员课堂 | `StudentScenesPage.tsx` |
| `/course-center` | 课程中心 | `CourseCenterPage.tsx` |
| `/knowledge` | AK知识库 | `KnowledgePage.tsx` |

(`/intro` was removed — navigation "关于AK" maps to `/course`, see `Navbar.tsx` links. `/course/part1` and `/course/part2` were removed (course system migrated to 6 modules / 240 学时) — `Part1Page.tsx` / `Part2Page.tsx` still exist on disk but are no longer routed/imported.)

## Architecture

### Pages (`src/app/`)

Single-file React components at the top of `src/app/`. Most are self-contained SFCs. `App.tsx` and `CoursePage.tsx` are the largest, each with a root-level `useGSAP` block driving scroll/entrance animations.

### Components (`src/app/components/`)

- `ui/` — 40+ shadcn/ui components (Radix UI primitives wrapped with styling). Source-in-repo.
- `alumni/`, `faq/`, `figma/` — as before.
- Animation utilities:
  - `ScrollReveal.tsx` — framer-motion reveal-on-scroll wrapper (used by pages without GSAP).
  - `CustomCursor.tsx` — global trailing cursor ring (mounted in `main.tsx`).
  - `Magnetic.tsx` — magnetic-hover wrapper for CTA buttons (plain `useEffect` pattern — **the reference implementation for hover effects**).
  - `Marquee.tsx` — infinite keyword marquee (uses `useGSAP` for a direct loop tween).
  - `SmoothScroll.tsx` — global Lenis smooth scroll (mounted in `main.tsx`).

The `cn()` utility (from `@/lib/utils` or similar) combines `tailwind-merge`, `clsx`, and `cva` — the standard shadcn/ui pattern.

### Data Layer (`src/data/`)

Static TypeScript modules — no API calls, no database. Includes `alumni.ts`, `faq.ts` (aggregates `faq-*.ts` category files), `faq-types.ts`. Content is also duplicated inline in some page components (e.g. `CoursePage.tsx` has large inline arrays).

### Styles (`src/styles/`)

CSS loading chain: `index.css` → imports `fonts.css`, `tailwind.css`, `theme.css`. `index.css` also has the recommended **Lenis** CSS.

**Fonts** (in `fonts.css`): 思源宋体 `Noto Serif SC` for headings + 思源黑体 `Noto Sans SC` for body, loaded via `fonts.loli.net` (Google Fonts China mirror — do not revert to `fonts.googleapis.com`, it's slow/blocked in mainland China). Applied per-element via Tailwind arbitrary classes `font-['Noto_Serif_SC',serif]` / `font-['Noto_Sans_SC',sans-serif]`.

## GSAP Conventions — READ BEFORE WRITING ANIMATIONS

GSAP + ScrollTrigger + Lenis are installed and used across pages. Two hard rules:

1. **Scroll / entrance animations** → use `useGSAP(() => {...}, { scope: ref })` with direct `gsap.from/to` + `scrollTrigger` config. **This works.** Register plugins at module top: `gsap.registerPlugin(useGSAP, ScrollTrigger)`.

2. **Hover / event-driven effects (mousemove, click, etc.) → use plain `useEffect` with `addEventListener` + `gsap.to`, and remove listeners in cleanup.** ⚠️ **Do NOT use `useGSAP` + `contextSafe()` / `context.add()` for event listeners** — in this environment the useGSAP context is reverted immediately after mount, which silently removes the listeners (no console errors, hover effects just never fire). Reference: `src/app/components/Magnetic.tsx` and the moments-card effect in `StudentScenesPage.tsx`.

Additional conventions:
- All animations respect `prefers-reduced-motion`: guard with `if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return`.
- `data-count` + `data-suffix` attributes drive number count-up animations (see `App.tsx` / `CoursePage.tsx`).
- Debugging GSAP: after dispatching events / scrolling, read `getComputedStyle` **after a tick** (animations start on the next RAF — reading synchronously shows the pre-animation value).

## Figma Asset Resolver

A custom Vite plugin (`figmaAssetResolver()` in `vite.config.ts`) resolves `figma:asset/<filename>` import paths to `src/assets/<filename>`. This is a Figma export artifact — do not remove it unless removing all `figma:asset/` imports.

## Git

Two remotes:
- `github` (https://github.com/CambridgeFoldingKnife/PAK.git) — 个人仓库（预览/开发）
- `camknife` (https://github.com/camknife/PAK.git) — 公司仓库（生产上线）

（`gitee` 远程已移除。）

Branches:
- `dev` → tracks `github/dev` — 个人仓库开发主线
- `feature-online` → tracks `camknife/feature-online` — 公司仓库上线部署分支
- `main` → tracks `camknife/main` — 公司仓库 main

Push: `git push github dev`（个人） / `git push camknife feature-online`（公司）。camknife 推送需公司账号 PAT（带 Contents 权限）。

## Deployment

生产环境：阿里云 ECS + 宝塔，域名 `icak.com.cn`，代码在 `/www/pakfront/front`，站点 root `/www/pakfront/dist`。

**服务器目录布局**（两个 `dist/` 容易混，务必分清）：
- `/www/pakfront/front/` — git 仓库 + build 源目录（`npm run build` 输出到 `front/dist/`）
- `/www/pakfront/dist/` — ⚠️ **Nginx root 指向的线上站点目录**（`icak.com.cn.conf` → `root /www/pakfront/dist;`）
- 手动部署必须把 `front/dist/` 内容同步到 `/www/pakfront/dist/`，否则"build 了但线上没变"：
  ```bash
  cd /www/pakfront/front && git pull && npm run build && cp -r dist/* /www/pakfront/dist/
  ```

- Node API：`server.mjs`（PM2 守护，端口 3000），读 `.env` 飞书配置
- Nginx：SPA 回退 + `/api/` 反代到 3000（见 `deploy/nginx.conf`）
- 首次已手动部署跑通；`deploy.yml` 触发分支已改为 `feature-online`（CICD 实际尚未跑通，日常用手动部署）
- ⚠️ `server.mjs` 的 `root = __dirname`（server.mjs 所在目录，即 front/），`.env` 与 `api/` 都在 front/ 下
- ⚠️ 页脚"健衡学园简介"链接指向老站 `http://www.jianhengkf.com/lists/50.html`（**必须带 www**；无 www 的 `jianhengkf.com` 是另一台老服务器，恒 404，勿改回裸域名）

## Common Gotchas

- **HMR not reliable**: If styles break or the page looks broken, hard-refresh (`Ctrl+Shift+R`) or restart the dev server. Do not assume a style change is wrong until you've ruled out stale HMR.
- **Lazy-loaded routes**: editing a page triggers HMR; a full reload may be needed to pick up `main.tsx` route changes.
- **`guidelines/Guidelines.md`** is a placeholder template from Figma export — not active project instructions.
- **`ATTRIBUTIONS.md`** documents shadcn/ui and Unsplash licensing for Figma-exported assets.
