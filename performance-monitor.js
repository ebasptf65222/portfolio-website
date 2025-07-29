// Performance Monitor and Optimization Tool
// 性能监控和优化工具

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

class PerformanceMonitor {
    constructor() {
        this.distPath = 'docs/.vitepress/dist';
        this.publicPath = 'docs/public';
        this.results = {
            timestamp: new Date().toISOString(),
            files: {},
            assets: {},
            performance: {},
            recommendations: []
        };
    }

    // 分析文件大小
    analyzeFileSize(filePath) {
        try {
            const stats = fs.statSync(filePath);
            return {
                size: stats.size,
                sizeKB: Math.round(stats.size / 1024 * 100) / 100,
                sizeMB: Math.round(stats.size / (1024 * 1024) * 100) / 100
            };
        } catch (error) {
            return { error: error.message };
        }
    }

    // 扫描目录并分析所有文件
    scanDirectory(dirPath, fileTypes = []) {
        const files = {};
        
        if (!fs.existsSync(dirPath)) {
            return files;
        }

        const scanRecursively = (currentPath, relativePath = '') => {
            const items = fs.readdirSync(currentPath);
            
            items.forEach(item => {
                const fullPath = path.join(currentPath, item);
                const relativeItemPath = path.join(relativePath, item);
                const stats = fs.statSync(fullPath);
                
                if (stats.isDirectory()) {
                    scanRecursively(fullPath, relativeItemPath);
                } else {
                    const ext = path.extname(item).toLowerCase();
                    if (fileTypes.length === 0 || fileTypes.includes(ext)) {
                        files[relativeItemPath] = {
                            ...this.analyzeFileSize(fullPath),
                            type: ext,
                            lastModified: stats.mtime
                        };
                    }
                }
            });
        };

        scanRecursively(dirPath);
        return files;
    }

    // 分析构建输出
    analyzeBuildOutput() {
        console.log('📊 分析构建输出...');
        
        const buildFiles = this.scanDirectory(this.distPath);
        const totalSize = Object.values(buildFiles).reduce((sum, file) => sum + (file.size || 0), 0);
        
        // 按文件类型分组
        const filesByType = {};
        Object.entries(buildFiles).forEach(([filename, fileInfo]) => {
            const type = fileInfo.type || 'unknown';
            if (!filesByType[type]) {
                filesByType[type] = { count: 0, totalSize: 0, files: [] };
            }
            filesByType[type].count++;
            filesByType[type].totalSize += fileInfo.size || 0;
            filesByType[type].files.push({ filename, ...fileInfo });
        });

        // 找出最大的文件
        const largestFiles = Object.entries(buildFiles)
            .map(([filename, fileInfo]) => ({ filename, ...fileInfo }))
            .sort((a, b) => (b.size || 0) - (a.size || 0))
            .slice(0, 10);

        this.results.files = {
            total: Object.keys(buildFiles).length,
            totalSize: totalSize,
            totalSizeKB: Math.round(totalSize / 1024 * 100) / 100,
            totalSizeMB: Math.round(totalSize / (1024 * 1024) * 100) / 100,
            byType: filesByType,
            largest: largestFiles
        };

        return this.results.files;
    }

    // 分析静态资源
    analyzeAssets() {
        console.log('🖼️ 分析静态资源...');
        
        const assetFiles = this.scanDirectory(this.publicPath, ['.jpg', '.jpeg', '.png', '.gif', '.svg', '.webp', '.ico']);
        const totalSize = Object.values(assetFiles).reduce((sum, file) => sum + (file.size || 0), 0);

        // 检查图片优化机会
        const unoptimizedImages = Object.entries(assetFiles)
            .filter(([filename, fileInfo]) => {
                const ext = fileInfo.type;
                const sizeMB = fileInfo.sizeMB || 0;
                return (ext === '.png' || ext === '.jpg' || ext === '.jpeg') && sizeMB > 0.5;
            })
            .map(([filename, fileInfo]) => ({ filename, ...fileInfo }));

        this.results.assets = {
            total: Object.keys(assetFiles).length,
            totalSize: totalSize,
            totalSizeKB: Math.round(totalSize / 1024 * 100) / 100,
            totalSizeMB: Math.round(totalSize / (1024 * 1024) * 100) / 100,
            files: assetFiles,
            unoptimizedImages
        };

        return this.results.assets;
    }

    // 检查网站性能指标
    checkPerformanceMetrics() {
        console.log('⚡ 检查性能指标...');
        
        const metrics = {
            buildTime: this.measureBuildTime(),
            bundleAnalysis: this.analyzeBundleSize(),
            dependencies: this.analyzeDependencies(),
            caching: this.checkCachingStrategy()
        };

        this.results.performance = metrics;
        return metrics;
    }

    // 测量构建时间
    measureBuildTime() {
        try {
            console.log('⏱️ 测量构建时间...');
            const startTime = Date.now();
            execSync('npm run docs:build', { 
                stdio: 'pipe',
                timeout: 60000 // 60秒超时
            });
            const buildTime = Date.now() - startTime;
            
            return {
                duration: buildTime,
                durationSeconds: Math.round(buildTime / 1000 * 100) / 100,
                status: buildTime < 30000 ? 'good' : buildTime < 60000 ? 'warning' : 'slow'
            };
        } catch (error) {
            return {
                error: error.message,
                status: 'error'
            };
        }
    }

    // 分析包大小
    analyzeBundleSize() {
        const distPath = this.distPath;
        if (!fs.existsSync(distPath)) {
            return { error: '构建输出不存在' };
        }

        // 分析JavaScript和CSS文件
        const jsFiles = this.scanDirectory(distPath, ['.js']);
        const cssFiles = this.scanDirectory(distPath, ['.css']);
        
        const totalJSSize = Object.values(jsFiles).reduce((sum, file) => sum + (file.size || 0), 0);
        const totalCSSSize = Object.values(cssFiles).reduce((sum, file) => sum + (file.size || 0), 0);

        return {
            javascript: {
                files: Object.keys(jsFiles).length,
                totalSize: totalJSSize,
                totalSizeKB: Math.round(totalJSSize / 1024 * 100) / 100,
                files: jsFiles
            },
            css: {
                files: Object.keys(cssFiles).length,
                totalSize: totalCSSSize,
                totalSizeKB: Math.round(totalCSSSize / 1024 * 100) / 100,
                files: cssFiles
            }
        };
    }

    // 分析依赖项
    analyzeDependencies() {
        try {
            const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf-8'));
            const deps = packageJson.dependencies || {};
            const devDeps = packageJson.devDependencies || {};
            
            return {
                dependencies: {
                    count: Object.keys(deps).length,
                    list: deps
                },
                devDependencies: {
                    count: Object.keys(devDeps).length,
                    list: devDeps
                },
                total: Object.keys(deps).length + Object.keys(devDeps).length
            };
        } catch (error) {
            return { error: error.message };
        }
    }

    // 检查缓存策略
    checkCachingStrategy() {
        const distPath = this.distPath;
        if (!fs.existsSync(distPath)) {
            return { error: '构建输出不存在' };
        }

        // 检查文件名是否包含哈希（用于缓存）
        const files = fs.readdirSync(distPath, { recursive: true });
        const hashedFiles = files.filter(file => 
            typeof file === 'string' && /\.[a-f0-9]{8,}\.(js|css|png|jpg|jpeg|gif|svg|webp)$/i.test(file)
        );

        return {
            totalFiles: files.length,
            hashedFiles: hashedFiles.length,
            hashedPercentage: Math.round((hashedFiles.length / files.length) * 100),
            strategy: hashedFiles.length > 0 ? 'good' : 'needs-improvement'
        };
    }

    // 生成优化建议
    generateRecommendations() {
        console.log('💡 生成优化建议...');
        
        const recommendations = [];

        // 文件大小建议
        if (this.results.files.totalSizeMB > 10) {
            recommendations.push({
                type: 'warning',
                category: 'bundle-size',
                message: `总构建大小 ${this.results.files.totalSizeMB}MB 较大，建议优化`,
                suggestions: [
                    '启用代码分割',
                    '移除未使用的依赖',
                    '压缩图片资源',
                    '使用树摇优化'
                ]
            });
        }

        // 图片优化建议
        if (this.results.assets.unoptimizedImages.length > 0) {
            recommendations.push({
                type: 'info',
                category: 'image-optimization',
                message: `发现 ${this.results.assets.unoptimizedImages.length} 个大图片文件`,
                suggestions: [
                    '压缩PNG/JPEG图片',
                    '考虑使用WebP格式',
                    '为大图片提供多种尺寸',
                    '使用懒加载'
                ]
            });
        }

        // 构建时间建议
        if (this.results.performance.buildTime && this.results.performance.buildTime.status === 'slow') {
            recommendations.push({
                type: 'warning',
                category: 'build-performance',
                message: `构建时间 ${this.results.performance.buildTime.durationSeconds}s 较慢`,
                suggestions: [
                    '优化依赖项',
                    '使用增量构建',
                    '检查构建配置',
                    '考虑使用缓存'
                ]
            });
        }

        // 缓存策略建议
        if (this.results.performance.caching && this.results.performance.caching.strategy === 'needs-improvement') {
            recommendations.push({
                type: 'info',
                category: 'caching',
                message: '缺少文件哈希，可能影响缓存效果',
                suggestions: [
                    '启用文件名哈希',
                    '配置适当的缓存头',
                    '使用Service Worker',
                    '优化资源缓存策略'
                ]
            });
        }

        // JavaScript包大小建议
        const jsSize = this.results.performance.bundleAnalysis?.javascript?.totalSizeKB || 0;
        if (jsSize > 500) {
            recommendations.push({
                type: 'warning',
                category: 'javascript-size',
                message: `JavaScript包大小 ${jsSize}KB 较大`,
                suggestions: [
                    '启用代码分割',
                    '使用动态导入',
                    '移除未使用的代码',
                    '优化第三方库'
                ]
            });
        }

        this.results.recommendations = recommendations;
        return recommendations;
    }

    // 生成性能报告
    generateReport() {
        console.log('📋 生成性能报告...');
        
        const report = {
            ...this.results,
            summary: {
                totalFiles: this.results.files.total,
                totalSizeMB: this.results.files.totalSizeMB,
                buildTimeSeconds: this.results.performance.buildTime?.durationSeconds,
                recommendationsCount: this.results.recommendations.length,
                overallScore: this.calculateOverallScore()
            }
        };

        return report;
    }

    // 计算总体性能评分
    calculateOverallScore() {
        let score = 100;
        
        // 根据文件大小扣分
        if (this.results.files.totalSizeMB > 10) score -= 20;
        else if (this.results.files.totalSizeMB > 5) score -= 10;
        
        // 根据构建时间扣分
        const buildTime = this.results.performance.buildTime;
        if (buildTime && buildTime.status === 'slow') score -= 15;
        else if (buildTime && buildTime.status === 'warning') score -= 5;
        
        // 根据优化建议数量扣分
        score -= Math.min(this.results.recommendations.length * 5, 30);
        
        return Math.max(score, 0);
    }

    // 完整的性能分析
    async runFullAnalysis() {
        console.log('🚀 开始完整性能分析...\n');
        
        try {
            // 分析构建输出
            this.analyzeBuildOutput();
            
            // 分析静态资源
            this.analyzeAssets();
            
            // 检查性能指标
            this.checkPerformanceMetrics();
            
            // 生成建议
            this.generateRecommendations();
            
            // 生成报告
            const report = this.generateReport();
            
            // 保存报告
            fs.writeFileSync('performance-report.json', JSON.stringify(report, null, 2));
            
            console.log('\n📊 性能分析完成！');
            console.log(`📄 详细报告已保存到: performance-report.json`);
            console.log(`🎯 性能评分: ${report.summary.overallScore}/100`);
            
            // 显示关键指标
            console.log('\n📈 关键指标:');
            console.log(`  📁 总文件数: ${report.summary.totalFiles}`);
            console.log(`  📏 总大小: ${report.summary.totalSizeMB} MB`);
            if (report.summary.buildTimeSeconds) {
                console.log(`  ⏱️ 构建时间: ${report.summary.buildTimeSeconds}s`);
            }
            console.log(`  💡 优化建议: ${report.summary.recommendationsCount} 项`);
            
            // 显示建议
            if (this.results.recommendations.length > 0) {
                console.log('\n💡 优化建议:');
                this.results.recommendations.forEach(rec => {
                    const emoji = rec.type === 'warning' ? '⚠️' : 'ℹ️';
                    console.log(`  ${emoji} ${rec.message}`);
                });
            }
            
            return report;
            
        } catch (error) {
            console.error('❌ 性能分析失败:', error.message);
            throw error;
        }
    }
}

// 主函数
async function main() {
    const monitor = new PerformanceMonitor();
    
    try {
        await monitor.runFullAnalysis();
    } catch (error) {
        console.error('❌ 性能监控失败:', error.message);
        process.exit(1);
    }
}

// 直接运行主函数
main();

export default PerformanceMonitor;
