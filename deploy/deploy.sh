#!/bin/bash
# 健衡学园服务器部署脚本
# 作用：把 GitHub Actions 推来的代码/静态文件，同步到站点目录并重启 API。
# 放置：/www/pakfront/deploy.sh（chmod +x）
#
# 首次服务器初始化时执行一次完整流程：
#   bash /www/pakfront/deploy.sh first

set -e

APP_DIR="/www/pakfront"
DIST_DIR="$APP_DIR/dist"
FRONT_DIR="$APP_DIR/front"

echo "==> 部署开始 $(date)"

# 首次：初始化目录结构
if [ "$1" = "first" ]; then
  echo "==> 首次初始化"
  mkdir -p "$DIST_DIR" "$FRONT_DIR"
  echo "目录已创建：$APP_DIR"
  echo "请手动把代码 clone 到 $FRONT_DIR："
  echo "  git clone https://github.com/camknife/PAK.git $FRONT_DIR"
  echo "并在 $FRONT_DIR/.env 中填入企业微信智能表格配置后："
  echo "  pm2 start server.mjs --name pak-api --update-env"
  exit 0
fi

# 常规部署（Actions 已把 dist 推到 $DIST_DIR）：
# 1. 前端静态文件已由 rsync 同步，无需额外操作

# 2. 代码目录存在则拉最新（API 更新用）
if [ -d "$FRONT_DIR/.git" ]; then
  echo "==> 拉取最新代码"
  cd "$FRONT_DIR"
  git pull --ff-only 2>/dev/null || echo "git pull 失败（可能无远端跟踪），跳过"
  npm ci --omit=dev 2>/dev/null || echo "npm ci 跳过"
fi

# 3. 重启 API
echo "==> 重启 pak-api"
pm2 restart pak-api --update-env 2>/dev/null \
  || pm2 start "$FRONT_DIR/server.mjs" --name pak-api --update-env \
  || echo "PM2 操作失败，请手动检查"

echo "==> 部署完成 $(date)"
