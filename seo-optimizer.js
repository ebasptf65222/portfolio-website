// Advanced SEO and Social Media Optimization Tool
// 高级SEO和社交媒体优化工具

import fs from 'fs';
import path from 'path';

class SEOOptimizer {
    constructor() {
        this.config = {
            siteName: "个人作品集网站",
            siteDescription: "展示我的技能、项目和经验的专业作品集",
            author: "作者姓名",
            siteUrl: "https://your-domain.com",
            twitterHandle: "@your_twitter",
            language: "zh-CN",
            ogImage: "/og-image.jpg"
        };
    }

    // 生成结构化数据 (JSON-LD)
    generateStructuredData() {
        return {
            "@context": "https://schema.org",
            "@type": "Person",
            "name": this.config.author,
            "url": this.config.siteUrl,
            "description": this.config.siteDescription,
            "jobTitle": "软件开发工程师",
            "worksFor": {
                "@type": "Organization",
                "name": "公司名称"
            },
            "knowsAbout": [
                "JavaScript", "TypeScript", "React", "Vue.js", 
                "Node.js", "Python", "Web Development"
            ],
            "sameAs": [
                "https://github.com/your-username",
                "https://linkedin.com/in/your-profile",
                "https://twitter.com/your_twitter"
            ]
        };
    }

    // 生成Open Graph和Twitter Card元标签
    generateMetaTags(pageTitle, pageDescription, pageUrl = "") {
        const fullUrl = this.config.siteUrl + pageUrl;
        
        return `
<!-- Open Graph / Facebook -->
<meta property="og:type" content="website">
<meta property="og:url" content="${fullUrl}">
<meta property="og:title" content="${pageTitle}">
<meta property="og:description" content="${pageDescription}">
<meta property="og:image" content="${this.config.siteUrl}${this.config.ogImage}">
<meta property="og:site_name" content="${this.config.siteName}">
<meta property="og:locale" content="${this.config.language}">

<!-- Twitter -->
<meta property="twitter:card" content="summary_large_image">
<meta property="twitter:url" content="${fullUrl}">
<meta property="twitter:title" content="${pageTitle}">
<meta property="twitter:description" content="${pageDescription}">
<meta property="twitter:image" content="${this.config.siteUrl}${this.config.ogImage}">
<meta property="twitter:creator" content="${this.config.twitterHandle}">

<!-- Additional SEO -->
<meta name="robots" content="index, follow">
<meta name="googlebot" content="index, follow">
<meta name="author" content="${this.config.author}">
<link rel="canonical" href="${fullUrl}">`;
    }

    // 生成站点地图
    generateSitemap() {
        const pages = [
            { url: '', priority: '1.0', changefreq: 'weekly' },
            { url: '/about', priority: '0.8', changefreq: 'monthly' },
            { url: '/skills', priority: '0.7', changefreq: 'monthly' },
            { url: '/projects', priority: '0.9', changefreq: 'weekly' },
            { url: '/experience', priority: '0.7', changefreq: 'monthly' },
            { url: '/blog', priority: '0.8', changefreq: 'weekly' },
            { url: '/opensource', priority: '0.6', changefreq: 'monthly' },
            { url: '/contact', priority: '0.5', changefreq: 'yearly' }
        ];

        const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(page => `    <url>
        <loc>${this.config.siteUrl}${page.url}</loc>
        <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
        <changefreq>${page.changefreq}</changefreq>
        <priority>${page.priority}</priority>
    </url>`).join('\n')}
</urlset>`;

        return sitemap;
    }

    // 生成robots.txt
    generateRobotsTxt() {
        return `User-agent: *
Allow: /

# Sitemap
Sitemap: ${this.config.siteUrl}/sitemap.xml

# Common crawl delays
Crawl-delay: 1

# Disallow admin paths (if any)
Disallow: /admin/
Disallow: /.vitepress/
Disallow: /node_modules/`;
    }

    // 生成网站图标文件清单
    generateIconManifest() {
        return {
            "name": this.config.siteName,
            "short_name": "Portfolio",
            "description": this.config.siteDescription,
            "start_url": "/",
            "display": "standalone",
            "background_color": "#ffffff",
            "theme_color": "#3b82f6",
            "lang": this.config.language,
            "icons": [
                {
                    "src": "/favicon.svg",
                    "sizes": "any",
                    "type": "image/svg+xml"
                }
            ]
        };
    }

    // 分析页面SEO
    analyzePage(filePath) {
        if (!fs.existsSync(filePath)) {
            return { error: `文件不存在: ${filePath}` };
        }

        const content = fs.readFileSync(filePath, 'utf-8');
        const analysis = {
            file: path.basename(filePath),
            wordCount: content.split(/\s+/).length,
            hasTitle: /^#\s+(.+)$/m.test(content),
            hasDescription: /description:\s*(.+)$/m.test(content),
            headings: [],
            images: [],
            links: []
        };

        // 提取标题
        const headingMatches = content.match(/^#{1,6}\s+(.+)$/gm);
        if (headingMatches) {
            analysis.headings = headingMatches.map(h => h.trim());
        }

        // 提取图片
        const imageMatches = content.match(/!\[([^\]]*)\]\(([^)]+)\)/g);
        if (imageMatches) {
            analysis.images = imageMatches;
        }

        // 提取链接
        const linkMatches = content.match(/\[([^\]]+)\]\(([^)]+)\)/g);
        if (linkMatches) {
            analysis.links = linkMatches;
        }

        return analysis;
    }

    // 生成完整的SEO报告
    async generateSEOReport() {
        const docsPath = 'docs';
        const pages = ['index.md', 'about.md', 'skills.md', 'projects.md', 
                      'experience.md', 'blog.md', 'opensource.md', 'contact.md'];
        
        const report = {
            timestamp: new Date().toISOString(),
            config: this.config,
            pages: {},
            recommendations: []
        };

        // 分析每个页面
        for (const page of pages) {
            const filePath = path.join(docsPath, page);
            report.pages[page] = this.analyzePage(filePath);
        }

        // 生成建议
        report.recommendations = this.generateRecommendations(report.pages);

        return report;
    }

    // 生成SEO改进建议
    generateRecommendations(pagesAnalysis) {
        const recommendations = [];

        Object.entries(pagesAnalysis).forEach(([page, analysis]) => {
            if (analysis.error) {
                recommendations.push({
                    page,
                    type: 'error',
                    message: analysis.error
                });
                return;
            }

            if (!analysis.hasTitle) {
                recommendations.push({
                    page,
                    type: 'warning',
                    message: '缺少主标题 (# 标题)'
                });
            }

            if (!analysis.hasDescription) {
                recommendations.push({
                    page,
                    type: 'warning',
                    message: '缺少页面描述 (frontmatter description)'
                });
            }

            if (analysis.wordCount < 100) {
                recommendations.push({
                    page,
                    type: 'info',
                    message: `内容较少 (${analysis.wordCount} 词)，建议增加更多内容`
                });
            }

            if (analysis.images.length === 0 && page !== '404.md') {
                recommendations.push({
                    page,
                    type: 'info',
                    message: '没有图片，建议添加相关图片提升用户体验'
                });
            }
        });

        return recommendations;
    }

    // 保存所有SEO文件
    async saveAllSEOFiles() {
        const publicDir = 'docs/public';
        
        // 确保public目录存在
        if (!fs.existsSync(publicDir)) {
            fs.mkdirSync(publicDir, { recursive: true });
        }

        // 生成并保存站点地图
        const sitemap = this.generateSitemap();
        fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemap);

        // 生成并保存robots.txt
        const robotsTxt = this.generateRobotsTxt();
        fs.writeFileSync(path.join(publicDir, 'robots.txt'), robotsTxt);

        // 生成并保存Web App Manifest
        const manifest = this.generateIconManifest();
        fs.writeFileSync(path.join(publicDir, 'manifest.json'), JSON.stringify(manifest, null, 2));

        // 生成并保存结构化数据
        const structuredData = this.generateStructuredData();
        fs.writeFileSync(path.join(publicDir, 'structured-data.json'), JSON.stringify(structuredData, null, 2));

        console.log('✅ SEO文件生成完成:');
        console.log('  📄 sitemap.xml');
        console.log('  🤖 robots.txt');
        console.log('  📱 manifest.json');
        console.log('  📊 structured-data.json');
    }
}

// 主函数
async function main() {
    const optimizer = new SEOOptimizer();
    
    try {
        console.log('🚀 开始SEO优化...\n');
        
        // 生成SEO报告
        const report = await optimizer.generateSEOReport();
        fs.writeFileSync('seo-analysis-report.json', JSON.stringify(report, null, 2));
        console.log('📊 SEO分析报告已生成: seo-analysis-report.json\n');
        
        // 显示建议
        if (report.recommendations.length > 0) {
            console.log('💡 SEO改进建议:');
            report.recommendations.forEach(rec => {
                const emoji = rec.type === 'error' ? '❌' : rec.type === 'warning' ? '⚠️' : 'ℹ️';
                console.log(`  ${emoji} ${rec.page}: ${rec.message}`);
            });
            console.log('');
        }
        
        // 保存SEO文件
        await optimizer.saveAllSEOFiles();
        
        console.log('\n✨ SEO优化完成！');
        
    } catch (error) {
        console.error('❌ SEO优化失败:', error.message);
        process.exit(1);
    }
}

// 直接运行主函数
main();

export default SEOOptimizer;
