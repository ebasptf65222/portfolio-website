#!/bin/bash

# 构建和部署脚本
# 用于快速构建并部署到GitHub Pages

echo "🚀 开始构建 VitePress 网站..."

# 安装依赖
echo "📦 安装依赖..."
npm install

# 构建网站
echo "🔧 构建网站..."
npm run docs:build

# 检查构建是否成功
if [ $? -eq 0 ]; then
    echo "✅ 构建成功！"
    echo "📁 构建文件位于: docs/.vitepress/dist"
    echo "🌐 可以将 dist 目录部署到任何静态文件服务器"
else
    echo "❌ 构建失败！"
    exit 1
fi

# 可选：启动预览服务器
read -p "是否启动预览服务器？(y/n): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "🔍 启动预览服务器..."
    npm run docs:preview
fi
