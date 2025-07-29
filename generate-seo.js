// 网站地图生成器
// 自动生成sitemap.xml用于SEO优化

const fs = require('fs')
const path = require('path')

const baseUrl = 'https://yourdomain.com' // 替换为您的实际域名
const docsDir = path.join(__dirname, 'docs')

// 获取所有Markdown文件
function getAllMarkdownFiles(dir, files = []) {
  const items = fs.readdirSync(dir)
  
  for (const item of items) {
    const fullPath = path.join(dir, item)
    const stat = fs.statSync(fullPath)
    
    if (stat.isDirectory() && !item.startsWith('.') && item !== 'node_modules') {
      getAllMarkdownFiles(fullPath, files)
    } else if (item.endsWith('.md')) {
      // 转换文件路径为URL路径
      const relativePath = path.relative(docsDir, fullPath)
      const urlPath = relativePath
        .replace(/\\/g, '/')
        .replace(/\.md$/, '')
        .replace(/\/index$/, '')
        .replace(/^index$/, '')
      
      files.push({
        path: urlPath,
        fullPath: fullPath,
        lastModified: stat.mtime
      })
    }
  }
  
  return files
}

// 生成sitemap.xml
function generateSitemap() {
  const files = getAllMarkdownFiles(docsDir)
  
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`

  files.forEach(file => {
    const url = file.path ? `${baseUrl}/${file.path}/` : `${baseUrl}/`
    const lastmod = file.lastModified.toISOString().split('T')[0]
    
    sitemap += `
  <url>
    <loc>${url}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`
  })

  sitemap += `
</urlset>`

  // 写入sitemap.xml到public目录
  const sitemapPath = path.join(docsDir, 'public', 'sitemap.xml')
  fs.writeFileSync(sitemapPath, sitemap)
  
  console.log(`✅ sitemap.xml 已生成: ${sitemapPath}`)
  console.log(`📄 包含 ${files.length} 个页面`)
}

// 生成robots.txt
function generateRobots() {
  const robotsTxt = `User-agent: *
Allow: /

Sitemap: ${baseUrl}/sitemap.xml`

  const robotsPath = path.join(docsDir, 'public', 'robots.txt')
  fs.writeFileSync(robotsPath, robotsTxt)
  
  console.log(`✅ robots.txt 已生成: ${robotsPath}`)
}

if (require.main === module) {
  console.log('🚀 开始生成SEO文件...')
  generateSitemap()
  generateRobots()
  console.log('✨ SEO文件生成完成！')
}

module.exports = { generateSitemap, generateRobots }
