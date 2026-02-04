#!/bin/bash

# 环境变量本地初始化脚本
# 用途：帮助开发者快速设置本地开发环境

set -e

PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
ENV_LOCAL="$PROJECT_ROOT/.env.local"
ENV_EXAMPLE="$PROJECT_ROOT/.env.example"

echo "========================================="
echo "🔧 ShowHub 本地环境变量初始化"
echo "========================================="

# 检查 .env.local 是否已存在
if [ -f "$ENV_LOCAL" ]; then
    echo ""
    echo "✓ .env.local 已存在"
    read -p "是否重新生成？(y/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "跳过初始化"
        exit 0
    fi
fi

# 创建 .env.local 副本
echo ""
echo "📋 从模板创建 .env.local..."
cp "$ENV_EXAMPLE" "$ENV_LOCAL"
echo "✓ 已创建 .env.local"

echo ""
echo "========================================="
echo "📝 需要手动填入以下信息："
echo "========================================="
echo ""
echo "1️⃣  VITE_SFMAP_KEY"
echo "   来源：顺丰地图平台"
echo "   在 .env.local 中找到这一行，替换为实际的 API KEY"
echo ""
echo "2️⃣  VITE_SUPABASE_URL"
echo "   来源：Supabase 项目 Settings → API"
echo "   示例格式：https://xxx.supabase.co"
echo ""
echo "3️⃣  VITE_SUPABASE_ANON_KEY"
echo "   来源：Supabase 项目 Settings → API → anon public"
echo "   注意：这个密钥会在浏览器暴露，但受 RLS 保护"
echo ""
echo "4️⃣  SUPABASE_SERVICE_ROLE_KEY"
echo "   来源：Supabase 项目 Settings → API → service_role secret"
echo "   ⚠️  敏感密钥！仅用于本地脚本，绝不上传 Git"
echo ""
echo "========================================="
echo ""
echo "🎯 下一步："
echo "  1. 编辑 .env.local 并填入上述密钥"
echo "  2. 运行：npm run test:data:generate（可选）"
echo "  3. 运行：npm run dev"
echo ""
echo "📚 获取密钥详情，请阅读："
echo "  cat .env.example"
echo ""
