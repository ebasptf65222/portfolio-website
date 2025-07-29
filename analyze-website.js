#!/usr/bin/env node

/**
 * VitePress 网站性能监控和SEO检查工具
 * 用于分析构建结果和生成优化建议
 */

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class WebsiteAnalyzer {
    constructor() {
        this.distPath = path.join(__dirname, 'docs/.vitepress/dist');
        this.results = {
            performance: {},
            seo: {},
            accessibility: {},
            suggestions: []
        };
    }

    // 分析文件大小和性能
    analyzePerformance() {
        console.log('🔍 分析网站性能...');
        
        if (!fs.existsSync(this.distPath)) {
            console.log('❌ 构建目录不存在，请先运行构建命令');
            return;
        }

        const files = this.getAllFiles(this.distPath);
        const fileStats = {
            html: { count: 0, size: 0 },
            css: { count: 0, size: 0 },
            js: { count: 0, size: 0 },
            images: { count: 0, size: 0 },
            other: { count: 0, size: 0 }
        };

        files.forEach(file => {
            const stats = fs.statSync(file);
            const ext = path.extname(file).toLowerCase();
            
            if (ext === '.html') {
                fileStats.html.count++;
                fileStats.html.size += stats.size;
            } else if (ext === '.css') {
                fileStats.css.count++;
                fileStats.css.size += stats.size;
            } else if (ext === '.js') {
                fileStats.js.count++;
                fileStats.js.size += stats.size;
            } else if (['.jpg', '.jpeg', '.png', '.gif', '.svg', '.webp'].includes(ext)) {
                fileStats.images.count++;
                fileStats.images.size += stats.size;
            } else {
                fileStats.other.count++;
                fileStats.other.size += stats.size;
            }
        });

        this.results.performance = fileStats;
        this.displayPerformanceResults(fileStats);
    }

    // 分析SEO配置
    analyzeSEO() {
        console.log('\n🔍 分析SEO配置...');
        
        const indexPath = path.join(this.distPath, 'index.html');
        if (!fs.existsSync(indexPath)) {
            console.log('❌ 主页文件不存在');
            return;
        }

        const content = fs.readFileSync(indexPath, 'utf-8');
        const seoChecks = {
            hasTitle: /<title>.*<\/title>/.test(content),
            hasDescription: /<meta name="description"/.test(content),
            hasKeywords: /<meta name="keywords"/.test(content),
            hasOgTags: /<meta property="og:/.test(content),
            hasCanonical: /<link rel="canonical"/.test(content),
            hasViewport: /<meta name="viewport"/.test(content),
            hasLang: /<html[^>]*lang=/.test(content),
            hasH1: /<h1/.test(content),
            hasFavicon: /<link[^>]*rel="icon"/.test(content),
            hasRobots: /<meta name="robots"/.test(content)
        };

        this.results.seo = seoChecks;
        this.displaySEOResults(seoChecks);
    }

    // 生成优化建议
    generateSuggestions() {
        console.log('\n💡 优化建议:');
        
        const { performance, seo } = this.results;
        
        // 性能建议
        if (performance.css && performance.css.size > 100000) { // 100KB
            this.results.suggestions.push('CSS文件较大，建议启用压缩和代码分割');
        }
        
        if (performance.js && performance.js.size > 500000) { // 500KB
            this.results.suggestions.push('JavaScript文件较大，建议使用代码分割和懒加载');
        }
        
        if (performance.images && performance.images.size > 2000000) { // 2MB
            this.results.suggestions.push('图片文件较大，建议优化图片格式和大小');
        }

        // SEO建议
        if (!seo.hasDescription) {
            this.results.suggestions.push('添加页面描述meta标签以改善SEO');
        }
        
        if (!seo.hasOgTags) {
            this.results.suggestions.push('添加Open Graph标签以改善社交媒体分享效果');
        }
        
        if (!seo.hasCanonical) {
            this.results.suggestions.push('添加canonical链接以避免重复内容问题');
        }

        // 显示建议
        this.results.suggestions.forEach((suggestion, index) => {
            console.log(`${index + 1}. ${suggestion}`);
        });
        
        if (this.results.suggestions.length === 0) {
            console.log('✅ 网站配置良好，暂无优化建议');
        }
    }

    // 生成站点地图
    generateSitemap() {
        console.log('\n🗺️  生成站点地图...');
        
        const baseUrl = 'https://your-domain.com'; // 需要替换为实际域名
        const pages = this.getAllHTMLFiles();
        
        const sitemap = this.createSitemap(baseUrl, pages);
        const sitemapPath = path.join(this.distPath, 'sitemap.xml');
        
        fs.writeFileSync(sitemapPath, sitemap);
        console.log(`✅ 站点地图已生成: ${sitemapPath}`);
    }

    // 创建robots.txt
    generateRobots() {
        const robotsContent = `User-agent: *
Allow: /

Sitemap: https://your-domain.com/sitemap.xml

# 禁止访问的目录
Disallow: /.vitepress/
Disallow: /node_modules/
`;
        
        const robotsPath = path.join(this.distPath, 'robots.txt');
        fs.writeFileSync(robotsPath, robotsContent);
        console.log(`✅ robots.txt已生成: ${robotsPath}`);
    }

    // 辅助方法
    getAllFiles(dir) {
        let files = [];
        const items = fs.readdirSync(dir);
        
        items.forEach(item => {
            const fullPath = path.join(dir, item);
            const stats = fs.statSync(fullPath);
            
            if (stats.isDirectory()) {
                files = files.concat(this.getAllFiles(fullPath));
            } else {
                files.push(fullPath);
            }
        });
        
        return files;
    }

    getAllHTMLFiles() {
        const files = this.getAllFiles(this.distPath);
        return files
            .filter(file => path.extname(file) === '.html')
            .map(file => {
                const relativePath = path.relative(this.distPath, file);
                return relativePath.replace(/\\/g, '/').replace(/index\.html$/, '');
            })
            .filter(page => page !== '404.html');
    }

    createSitemap(baseUrl, pages) {
        const now = new Date().toISOString().split('T')[0];
        
        let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

        pages.forEach(page => {
            const url = page === '' ? baseUrl : `${baseUrl}/${page}`;
            sitemap += `
  <url>
    <loc>${url}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${page === '' ? '1.0' : '0.8'}</priority>
  </url>`;
        });

        sitemap += '\n</urlset>';
        return sitemap;
    }

    displayPerformanceResults(fileStats) {
        console.log('\n📊 性能分析结果:');
        
        Object.entries(fileStats).forEach(([type, stats]) => {
            if (stats.count > 0) {
                const sizeKB = (stats.size / 1024).toFixed(2);
                console.log(`  ${type.toUpperCase()}: ${stats.count} 文件, ${sizeKB} KB`);
            }
        });
        
        const totalSize = Object.values(fileStats).reduce((sum, stats) => sum + stats.size, 0);
        const totalSizeMB = (totalSize / 1024 / 1024).toFixed(2);
        console.log(`  总大小: ${totalSizeMB} MB`);
    }

    displaySEOResults(seoChecks) {
        console.log('\n📈 SEO分析结果:');
        
        Object.entries(seoChecks).forEach(([check, passed]) => {
            const icon = passed ? '✅' : '❌';
            const checkName = {
                hasTitle: '页面标题',
                hasDescription: '页面描述',
                hasKeywords: '关键词',
                hasOgTags: 'Open Graph标签',
                hasCanonical: 'Canonical链接',
                hasViewport: 'Viewport设置',
                hasLang: '语言声明',
                hasH1: 'H1标题',
                hasFavicon: '网站图标',
                hasRobots: 'Robots设置'
            }[check] || check;
            
            console.log(`  ${icon} ${checkName}`);
        });
    }

    // 主运行方法
    async run() {
        console.log('🚀 开始网站分析...\n');
        
        this.analyzePerformance();
        this.analyzeSEO();
        this.generateSuggestions();
        this.generateSitemap();
        this.generateRobots();
        
        console.log('\n✨ 分析完成！');
        
        // 保存分析结果
        const reportPath = path.join(__dirname, 'website-analysis-report.json');
        fs.writeFileSync(reportPath, JSON.stringify(this.results, null, 2));
        console.log(`📋 详细报告已保存: ${reportPath}`);
    }
}

// 运行分析
const analyzer = new WebsiteAnalyzer();
analyzer.run().catch(console.error);

export default WebsiteAnalyzer;
