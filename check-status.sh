#!/bin/bash
# VitePress 项目状态检查脚本

echo "=== VitePress 个人作品集项目状态检查 ==="
echo ""

# 检查项目结构
echo "1. 检查项目结构..."
echo "📁 项目根目录: $(pwd)"

if [ -f "package.json" ]; then
    echo "✅ package.json 存在"
else
    echo "❌ package.json 不存在"
fi

if [ -f "docs/.vitepress/config.js" ]; then
    echo "✅ VitePress 配置文件存在"
else
    echo "❌ VitePress 配置文件不存在"
fi

if [ -d "docs/.vitepress/theme" ]; then
    echo "✅ 自定义主题目录存在"
else
    echo "❌ 自定义主题目录不存在"
fi

# 检查页面文件
echo ""
echo "2. 检查页面文件..."
pages=("index.md" "about.md" "skills.md" "projects.md" "experience.md" "blog.md" "opensource.md" "contact.md" "404.md")

for page in "${pages[@]}"; do
    if [ -f "docs/$page" ]; then
        echo "✅ $page 存在"
    else
        echo "❌ $page 不存在"
    fi
done

# 检查静态资源
echo ""
echo "3. 检查静态资源..."
if [ -d "docs/public" ]; then
    echo "✅ public 目录存在"
    if [ -f "docs/public/logo.svg" ]; then
        echo "✅ logo.svg 存在"
    else
        echo "❌ logo.svg 不存在"
    fi
    if [ -f "docs/public/favicon.svg" ]; then
        echo "✅ favicon.svg 存在"
    else
        echo "❌ favicon.svg 不存在"
    fi
else
    echo "❌ public 目录不存在"
fi

# 检查部署脚本
echo ""
echo "4. 检查部署脚本..."
if [ -f "build.sh" ]; then
    echo "✅ build.sh (Unix) 存在"
else
    echo "❌ build.sh (Unix) 不存在"
fi

if [ -f "build.bat" ]; then
    echo "✅ build.bat (Windows) 存在"
else
    echo "❌ build.bat (Windows) 不存在"
fi

if [ -f ".github/workflows/deploy.yml" ]; then
    echo "✅ GitHub Actions 工作流存在"
else
    echo "❌ GitHub Actions 工作流不存在"
fi

echo ""
echo "=== 检查完成 ==="
echo ""
echo "📋 使用说明:"
echo "• 运行开发服务器: npm run docs:dev"
echo "• 构建生产版本: npm run docs:build"
echo "• 预览构建结果: npm run docs:preview"
echo ""
echo "🌐 访问地址:"
echo "• 开发环境: http://localhost:5173/"
echo "• 构建预览: http://localhost:4173/"
