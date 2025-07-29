@echo off
chcp 65001 >nul

echo 🚀 开始构建 VitePress 网站...

REM 安装依赖
echo 📦 安装依赖...
call npm install
if errorlevel 1 (
    echo ❌ 依赖安装失败！
    pause
    exit /b 1
)

REM 构建网站
echo 🔧 构建网站...
call npm run docs:build
if errorlevel 1 (
    echo ❌ 构建失败！
    pause
    exit /b 1
)

echo ✅ 构建成功！
echo 📁 构建文件位于: docs\.vitepress\dist
echo 🌐 可以将 dist 目录部署到任何静态文件服务器

REM 询问是否启动预览
set /p preview="是否启动预览服务器？(y/n): "
if /i "%preview%"=="y" (
    echo 🔍 启动预览服务器...
    call npm run docs:preview
) else (
    echo 👋 构建完成，祝你使用愉快！
    pause
)
