# Portfolio Website Status Checker
# PowerShell script to check the status of VitePress portfolio project

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "     Portfolio Website Status Check    " -ForegroundColor Cyan  
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# 检查项目根目录
Write-Host "1. 检查项目结构..." -ForegroundColor Yellow
Write-Host "📁 项目根目录: $(Get-Location)" -ForegroundColor White

if (Test-Path "package.json") {
    Write-Host "✅ package.json 存在" -ForegroundColor Green
} else {
    Write-Host "❌ package.json 不存在" -ForegroundColor Red
}

if (Test-Path "docs\.vitepress" -PathType Container) {
    Write-Host "✅ VitePress 配置目录存在" -ForegroundColor Green
} else {
    Write-Host "❌ VitePress 配置目录不存在" -ForegroundColor Red
}

if (Test-Path "docs\.vitepress\config.js") {
    Write-Host "✅ VitePress 配置文件存在" -ForegroundColor Green
} else {
    Write-Host "❌ VitePress 配置文件不存在" -ForegroundColor Red
}

if (Test-Path "docs\.vitepress\theme" -PathType Container) {
    Write-Host "✅ 自定义主题目录存在" -ForegroundColor Green
} else {
    Write-Host "❌ 自定义主题目录不存在" -ForegroundColor Red
}

# 检查页面文件
Write-Host ""
Write-Host "2. 检查页面文件..." -ForegroundColor Yellow
$pages = @("index.md", "about.md", "skills.md", "projects.md", "experience.md", "blog.md", "opensource.md", "contact.md", "404.md")

foreach ($page in $pages) {
    if (Test-Path "docs\$page") {
        Write-Host "✅ $page 存在" -ForegroundColor Green
    } else {
        Write-Host "❌ $page 不存在" -ForegroundColor Red
    }
}

# 检查静态资源
Write-Host ""
Write-Host "3. 检查静态资源..." -ForegroundColor Yellow
if (Test-Path "docs\public" -PathType Container) {
    Write-Host "✅ public 目录存在" -ForegroundColor Green
    if (Test-Path "docs\public\logo.svg") {
        Write-Host "✅ logo.svg 存在" -ForegroundColor Green
    } else {
        Write-Host "❌ logo.svg 不存在" -ForegroundColor Red
    }
    if (Test-Path "docs\public\favicon.svg") {
        Write-Host "✅ favicon.svg 存在" -ForegroundColor Green
    } else {
        Write-Host "❌ favicon.svg 不存在" -ForegroundColor Red
    }
} else {
    Write-Host "❌ public 目录不存在" -ForegroundColor Red
}

# 检查部署脚本
Write-Host ""
Write-Host "4. 检查部署脚本..." -ForegroundColor Yellow
if (Test-Path "deploy.ps1") {
    Write-Host "✅ deploy.ps1 (PowerShell) 存在" -ForegroundColor Green
} else {
    Write-Host "❌ deploy.ps1 不存在" -ForegroundColor Red
}

if (Test-Path "build.bat") {
    Write-Host "✅ build.bat (Windows) 存在" -ForegroundColor Green
} else {
    Write-Host "❌ build.bat 不存在" -ForegroundColor Red
}

if (Test-Path "build.sh") {
    Write-Host "✅ build.sh (Unix) 存在" -ForegroundColor Green
} else {
    Write-Host "❌ build.sh 不存在" -ForegroundColor Red
}

# 检查环境
Write-Host ""
Write-Host "5. 检查环境..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version
    Write-Host "✅ Node.js 版本: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Node.js 未安装或不在PATH中" -ForegroundColor Red
}

try {
    $npmVersion = npm --version
    Write-Host "✅ npm 版本: $npmVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ npm 未安装或不在PATH中" -ForegroundColor Red
}

# 检查构建输出
Write-Host ""
Write-Host "6. 检查构建输出..." -ForegroundColor Yellow
if (Test-Path "docs\.vitepress\dist" -PathType Container) {
    Write-Host "✅ 构建输出目录存在" -ForegroundColor Green
    $distFiles = Get-ChildItem -Path "docs\.vitepress\dist" -Recurse -File | Measure-Object
    Write-Host "📈 构建文件数量: $($distFiles.Count)" -ForegroundColor Cyan
} else {
    Write-Host "❌ 构建输出目录不存在，请先运行 npm run docs:build" -ForegroundColor Red
}

Write-Host ""
Write-Host "=== 检查完成 ===" -ForegroundColor Cyan
Write-Host ""
Write-Host "📋 使用说明:" -ForegroundColor White
Write-Host "• 运行开发服务器: npm run docs:dev" -ForegroundColor Gray
Write-Host "• 构建生产版本: npm run docs:build" -ForegroundColor Gray
Write-Host "• 预览构建结果: npm run docs:preview" -ForegroundColor Gray
Write-Host "• 部署到平台: npm run deploy" -ForegroundColor Gray
Write-Host "• 性能分析: npm run analyze" -ForegroundColor Gray
Write-Host ""
Write-Host "🌐 访问地址:" -ForegroundColor White
Write-Host "• 开发环境: http://localhost:5173/" -ForegroundColor Gray
Write-Host "• 构建预览: http://localhost:4173/" -ForegroundColor Gray
Write-Host ""
