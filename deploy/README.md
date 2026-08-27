# 阿里云部署指南（GitHub Actions CI/CD）

> 目标：把代码推送到 GitHub → 自动构建 → 部署到阿里云 → 网站更新。
> 适用：2核2G / 40G / 3M 带宽，纯前端 + Node API（飞书）。
> **仓库**：公司仓库 `camknife/PAK`；**部署分支**：`feature-online`（首次已手动部署跑通，CICD 待配置）。

---

## 架构总览

```
你 push 到 GitHub (feature-online)
        │
        ▼
GitHub Actions（在 GitHub 服务器构建）
   ├─ npm ci + npm run build → dist/
   ├─ rsync 推送 dist/ → 服务器 /www/pakfront/dist
   └─ SSH 执行部署脚本 → pm2 restart pak-api
        │
        ▼
阿里云服务器
   ├─ Nginx：托管 dist/（SPA 路由回退）+ /api/* 反代到 :3000
   ├─ Node API server（server.mjs，PM2 守护，读 .env 飞书配置）
   └─ 图片在 OSS，字体走镜像，服务器只出 HTML/JS/CSS
```

## 服务器目录布局（重要）

```
/www/pakfront/
├── front/                  # git 仓库（代码 + build 源目录）
│   ├── server.mjs          # Node API（PM2 守护，port 3000）
│   ├── .env                # 飞书配置（勿提交 git）
│   ├── api/                # server.mjs 依赖的接口模块
│   ├── dist/               # 本地 build 输出目录（npm run build 的落盘位置）
│   └── scripts/            # 构建脚本（sitemap 等）
└── dist/                   # ⚠️ 线上站点根目录（Nginx root 指向这里）
    ├── index.html
    ├── assets/
    └── sitemap.xml
```

> ⚠️ **两个 `dist/` 的区别**：
> - `front/dist/` 是 `npm run build` 的**输出目录**（构建产物落在这里）
> - `/www/pakfront/dist/` 是 **Nginx root 指向的线上站点目录**
> - **手动部署时必须把 `front/dist/` 的内容同步到 `/www/pakfront/dist/`**，否则线上不会更新。
>   ```bash
>   cd /www/pakfront/front
>   npm run build
>   cp -r dist/* /www/pakfront/dist/
>   ```
> - Nginx 站点配置（宝塔）：`icak.com.cn.conf` → `root /www/pakfront/dist;`

---

## 一、服务器初始化（只做一次）

### 1. 装宝塔面板
在服务器 SSH 执行（以宝塔官网最新命令为准）：
```bash
# 官网 https://www.bt.cn 获取最新安装命令
```
装完后：**软件商店 → 安装 Nginx**、**Node.js 版本管理器**（装 Node 18+）、**PM2 管理器**。

### 2. 建站点
宝塔「网站 → 添加站点」：
- 域名：`icak.com.cn`（+ www）
- PHP 选「纯静态」
- 根目录：`/www/pakfront/dist`

### 3. 拉代码 + 配 .env
```bash
mkdir -p /www/pakfront
cd /www/pakfront
git clone https://github.com/camknife/PAK.git front
cd front
git checkout feature-online       # 上线分支
cp .env.example .env      # 若没有则手动创建
# 编辑 .env，填入飞书配置（FEISHU_APP_ID / SECRET / TOKEN / TABLE_ID / CONSULT_*）
```

### 4. 装依赖 + 起 API（PM2 守护）
```bash
cd /www/pakfront/front
npm ci
pm2 start server.mjs --name pak-api --update-env
pm2 save
pm2 startup            # 开机自启，按提示执行生成的命令
```

### 5. Nginx 配置
把 `deploy/nginx.conf` 内容贴到宝塔站点的配置文件里，改好域名。`nginx -t` 验证后重载。
宝塔里也能一键配 SSL 证书（Let's Encrypt 或阿里云免费证书）。

### 6. 验证
```bash
curl http://127.0.0.1:3000/api/courses   # 应返回 JSON（飞书课程数据）
curl -I http://localhost/                 # 首页 200
```

---

## 二、GitHub 端配置（只做一次）

### 1. 生成 SSH 密钥（在服务器上）
```bash
ssh-keygen -t ed25519 -f ~/.ssh/pakfront -N ""
cat ~/.ssh/pakfront.pub >> ~/.ssh/authorized_keys
# 私钥 ~/.ssh/pakfront 用于后续配置到 GitHub Secrets
```

### 2. 配置 GitHub Secrets
仓库 → **Settings → Secrets and variables → Actions** → New repository secret：

| Secret | 值 |
| --- | --- |
| `ALIYUN_HOST` | 服务器公网 IP |
| `ALIYUN_USER` | SSH 用户名（如 root） |
| `ALIYUN_SSH_KEY` | 服务器私钥 `~/.ssh/pakfront` 的**全部内容** |

### 3. 触发自动部署
push 到 `feature-online` 即自动部署。改部署分支：编辑 `.github/workflows/deploy.yml` 里的 `branches`。
也可在 Actions 页面手动点「Run workflow」。

---

## 三、日常使用

### 方式一：服务器手动部署（当前实际在用）

改完代码 push 到远程后，SSH 登录服务器执行：

```bash
cd /www/pakfront/front
git pull            # 拉最新（需先在 feature-online 分支）
npm run build       # 构建 → front/dist/
cp -r dist/* /www/pakfront/dist/   # ⚠️ 同步到线上 root，否则不生效
```

- 静态内容（页面/文案/样式）：同步 dist 即生效，Nginx 直接读
- API 内容（课程中心/咨询表单）：`pm2 restart pak-api` 生效
- 图片：继续放 OSS，无需服务器

> **忘记 `cp -r dist/* /www/pakfront/dist/` 是最常见的"build 了但线上没变"原因。**

### 方式二：GitHub Actions 自动部署（待配置）

**改完代码 → `git push` → 等 1-3 分钟 → 网站已更新。**（CICD 当前尚未跑通，见文档开头。）

---

## 四、关键文件清单

| 文件 | 作用 |
| --- | --- |
| `server.mjs` | 生产 API server（PM2 跑，读 .env，/api/courses、/api/consult）。⚠️ `root = __dirname`（server.mjs 所在目录，即 front/），`.env` 与 `api/` 必须与 server.mjs 同目录 |
| `.github/workflows/deploy.yml` | GitHub Actions 自动部署工作流 |
| `deploy/nginx.conf` | Nginx 站点配置（SPA + /api 反代 + SSL） |
| `deploy/deploy.sh` | 服务器部署脚本（同步 + 重启，可选） |
| `.env` | 飞书配置（**不要提交到 git**，.env 已在 .gitignore？需确认） |

> ⚠️ **重要**：`.env` 含飞书密钥，**绝不能提交到仓库**。确认它已在 `.gitignore` 中（本地 `git check-ignore .env` 验证）。

---

## 五、常见问题

- **课程中心「加载失败」** → 检查 `pm2 logs pak-api`，多半是 .env 没配或飞书 token 过期
- **域名打不开** → 确认备案 + 域名解析到服务器 IP + 宝塔站点绑定
- **Actions 报 SSH 拒绝** → 检查 `ALIYUN_SSH_KEY` 是否完整、服务器 `authorized_keys` 权限是否为 600
- **3M 带宽不够？** 图片在 OSS、字体走镜像，服务器只出 ~1MB HTML/JS，完全够
