# VitePress 项目部署脚本
# 用于构建和优化网站以便部署

param(
    [string]$target = "github-pages",
    [switch]$clean = $false
)

Write-Host "=== VitePress 部署脚本 ===" -ForegroundColor Green

# 检查Node.js环境
Write-Host "检查Node.js环境..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version
    $npmVersion = npm --version
    Write-Host "✓ Node.js: $nodeVersion" -ForegroundColor Green
    Write-Host "✓ npm: $npmVersion" -ForegroundColor Green
} catch {
    Write-Host "✗ Node.js 未安装或未在PATH中" -ForegroundColor Red
    exit 1
}

# 检查依赖
Write-Host "检查项目依赖..." -ForegroundColor Yellow
if (!(Test-Path "node_modules")) {
    Write-Host "安装依赖..." -ForegroundColor Yellow
    npm install
}

# 清理旧构建文件（可选）
if ($clean) {
    Write-Host "清理旧构建文件..." -ForegroundColor Yellow
    if (Test-Path "docs/.vitepress/dist") {
        Remove-Item -Recurse -Force "docs/.vitepress/dist"
        Write-Host "✓ 已清理构建目录" -ForegroundColor Green
    }
}

# 运行构建
Write-Host "开始构建网站..." -ForegroundColor Yellow
try {
    npm run docs:build
    Write-Host "✓ 构建成功完成" -ForegroundColor Green
} catch {
    Write-Host "✗ 构建失败" -ForegroundColor Red
    exit 1
}

# 生成部署信息
$buildTime = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
$buildInfo = @{
    buildTime = $buildTime
    target = $target
    nodeVersion = $nodeVersion
    vitepress = "1.6.3"
}

$buildInfoJson = $buildInfo | ConvertTo-Json -Depth 2
$buildInfoJson | Out-File -FilePath "docs/.vitepress/dist/build-info.json" -Encoding UTF8

Write-Host "✓ 部署信息已生成" -ForegroundColor Green

# 显示构建结果
$distPath = "docs/.vitepress/dist"
if (Test-Path $distPath) {
    $files = Get-ChildItem $distPath -Recurse -File
    $totalSize = ($files | Measure-Object -Property Length -Sum).Sum / 1MB
    
    Write-Host "=== 构建结果 ===" -ForegroundColor Green
    Write-Host "构建目录: $distPath" -ForegroundColor Cyan
    Write-Host "文件数量: $($files.Count)" -ForegroundColor Cyan
    Write-Host "总大小: $([Math]::Round($totalSize, 2)) MB" -ForegroundColor Cyan
    Write-Host "构建时间: $buildTime" -ForegroundColor Cyan
    
    # 列出主要文件
    Write-Host "`n主要文件:" -ForegroundColor Yellow
    $mainFiles = $files | Where-Object { $_.Extension -in @('.html', '.js', '.css') } | 
                 Sort-Object Length -Descending | Select-Object -First 10
    foreach ($file in $mainFiles) {
        $relativePath = $file.FullName.Replace("$PWD\", "")
        $size = [Math]::Round($file.Length / 1KB, 1)
        Write-Host "  $relativePath ($size KB)" -ForegroundColor White
    }
}

# 部署建议
Write-Host "`n=== 部署建议 ===" -ForegroundColor Green
switch ($target) {
    "github-pages" {
        Write-Host "GitHub Pages 部署:" -ForegroundColor Yellow
        Write-Host "1. 将 docs/.vitepress/dist 目录内容推送到 gh-pages 分支" -ForegroundColor White
        Write-Host "2. 或使用 GitHub Actions 自动部署工作流" -ForegroundColor White
        Write-Host "3. 确保仓库设置中启用了 GitHub Pages" -ForegroundColor White
    }
    "netlify" {
        Write-Host "Netlify 部署:" -ForegroundColor Yellow
        Write-Host "1. 将 docs/.vitepress/dist 目录拖拽到 Netlify 部署页面" -ForegroundColor White
        Write-Host "2. 或连接 Git 仓库并设置构建命令: npm run docs:build" -ForegroundColor White
        Write-Host "3. 发布目录: docs/.vitepress/dist" -ForegroundColor White
    }
    "vercel" {
        Write-Host "Vercel 部署:" -ForegroundColor Yellow
        Write-Host "1. 导入 Git 仓库到 Vercel" -ForegroundColor White
        Write-Host "2. 构建命令: npm run docs:build" -ForegroundColor White
        Write-Host "3. 输出目录: docs/.vitepress/dist" -ForegroundColor White
    }
}

Write-Host "`n=== 部署完成 ===" -ForegroundColor Green
Write-Host "网站已准备好部署到 $target" -ForegroundColor Cyan
