// Content Management and Auto-Generation Tool
// 内容管理和自动生成工具

import fs from 'fs';
import path from 'path';

class ContentManager {
    constructor() {
        this.docsPath = 'docs';
        this.templatesPath = 'templates';
        this.contentConfig = {
            author: {
                name: "您的姓名",
                title: "全栈开发工程师",
                email: "your.email@example.com",
                github: "https://github.com/yourusername",
                linkedin: "https://linkedin.com/in/yourprofile",
                website: "https://your-website.com"
            },
            skills: {
                frontend: ["React", "Vue.js", "TypeScript", "Tailwind CSS"],
                backend: ["Node.js", "Python", "PostgreSQL", "MongoDB"],
                tools: ["Git", "Docker", "AWS", "Figma"],
                languages: ["JavaScript", "TypeScript", "Python", "Go"]
            },
            projects: []
        };
    }

    // 生成项目模板
    generateProjectTemplate(project) {
        return `---
title: ${project.title}
description: ${project.description}
tech: ${project.technologies.join(', ')}
github: ${project.github || ''}
demo: ${project.demo || ''}
image: ${project.image || '/project-placeholder.jpg'}
featured: ${project.featured || false}
date: ${project.date || new Date().toISOString().split('T')[0]}
---

# ${project.title}

${project.description}

## 🛠️ 技术栈

${project.technologies.map(tech => `- ${tech}`).join('\n')}

## ✨ 特色功能

${project.features ? project.features.map(feature => `- ${feature}`).join('\n') : '- 功能待补充'}

## 🚀 项目亮点

${project.highlights || '项目亮点待补充...'}

## 📸 项目截图

![${project.title}](${project.image || '/project-placeholder.jpg'})

## 🔗 相关链接

${project.github ? `- [GitHub 仓库](${project.github})` : ''}
${project.demo ? `- [在线演示](${project.demo})` : ''}
${project.documentation ? `- [项目文档](${project.documentation})` : ''}

## 💡 学习收获

${project.learnings || '通过这个项目，我学到了...'}

## 🔮 未来计划

${project.futurePlans || '计划在未来版本中添加...'}
`;
    }

    // 生成博客文章模板
    generateBlogTemplate(article) {
        return `---
title: ${article.title}
description: ${article.description}
date: ${article.date || new Date().toISOString().split('T')[0]}
author: ${this.contentConfig.author.name}
tags: ${article.tags ? article.tags.join(', ') : ''}
category: ${article.category || 'Tech'}
featured: ${article.featured || false}
---

# ${article.title}

${article.description}

## 📖 概述

${article.overview || '在这篇文章中，我将分享...'}

## 🎯 核心内容

### 1. 第一部分

内容待补充...

### 2. 第二部分

内容待补充...

### 3. 第三部分

内容待补充...

## 💡 关键要点

- 要点1
- 要点2
- 要点3

## 🔗 相关资源

- [相关链接1](https://example.com)
- [相关链接2](https://example.com)

## 🏁 总结

${article.conclusion || '总结一下...'}

---

*如果这篇文章对您有帮助，请考虑分享给更多人！*
`;
    }

    // 自动生成技能页面内容
    generateSkillsContent() {
        const skills = this.contentConfig.skills;
        
        return `---
title: 我的技能
description: 展示我的技术技能和专业能力
---

# 🛠️ 技能与能力

作为一名全栈开发工程师，我掌握多种技术栈，能够从前端到后端完整地开发现代化的Web应用程序。

## 💻 前端开发

<div class="skill-category">

### 核心技术
${skills.frontend.map(skill => `- **${skill}** - 熟练掌握`).join('\n')}

### 特长领域
- 响应式Web设计
- 单页应用开发 (SPA)
- 组件化开发
- 性能优化
- 用户体验设计

</div>

## ⚙️ 后端开发

<div class="skill-category">

### 核心技术
${skills.backend.map(skill => `- **${skill}** - 熟练掌握`).join('\n')}

### 特长领域
- RESTful API设计
- 数据库设计与优化
- 微服务架构
- 服务器部署与运维
- 数据安全与加密

</div>

## 🔧 开发工具

<div class="skill-category">

${skills.tools.map(tool => `- **${tool}**`).join('\n')}

</div>

## 🗣️ 编程语言

<div class="skill-category">

${skills.languages.map(lang => `- **${lang}**`).join('\n')}

</div>

## 📈 技能评估

<div class="skills-chart">

| 技能领域 | 熟练度 | 经验年限 |
|---------|--------|----------|
| JavaScript/TypeScript | ⭐⭐⭐⭐⭐ | 3+ 年 |
| React/Vue.js | ⭐⭐⭐⭐⭐ | 2+ 年 |
| Node.js | ⭐⭐⭐⭐ | 2+ 年 |
| Python | ⭐⭐⭐⭐ | 2+ 年 |
| 数据库设计 | ⭐⭐⭐⭐ | 2+ 年 |
| DevOps | ⭐⭐⭐ | 1+ 年 |

</div>

## 🎯 持续学习

我始终保持学习的热情，目前正在深入研究：

- 云原生技术
- 人工智能与机器学习
- 区块链技术
- 性能优化最佳实践

## 📜 认证与成就

- 认证1
- 认证2
- 成就1
- 成就2

<style>
.skill-category {
  margin: 1.5rem 0;
  padding: 1rem;
  border-left: 4px solid #3b82f6;
  background: #f8fafc;
  border-radius: 0 8px 8px 0;
}

.skills-chart {
  margin: 2rem 0;
}

.skills-chart table {
  width: 100%;
  border-collapse: collapse;
}

.skills-chart th,
.skills-chart td {
  padding: 0.75rem;
  text-align: left;
  border-bottom: 1px solid #e2e8f0;
}

.skills-chart th {
  background: #f1f5f9;
  font-weight: 600;
}
</style>`;
    }

    // 自动生成关于页面内容
    generateAboutContent() {
        const author = this.contentConfig.author;
        
        return `---
title: 关于我
description: 了解我的背景、经验和职业理念
---

# 👋 你好，我是 ${author.name}

欢迎来到我的个人作品集！我是一名充满热情的${author.title}，专注于创建高质量的数字产品和解决方案。

## 🚀 我的故事

我的编程之旅始于...（在这里分享您的编程故事）

通过不断学习和实践，我已经掌握了现代Web开发的全栈技能，能够从用户界面设计到后端架构的完整开发流程。

## 💡 我的理念

> "代码不仅仅是实现功能的工具，更是表达创意和解决问题的艺术形式。"

我相信：
- **用户体验至上** - 始终从用户角度思考产品设计
- **代码质量** - 编写清晰、可维护的代码
- **持续学习** - 技术日新月异，保持学习是成长的关键
- **团队协作** - 最好的产品来自于优秀的团队合作

## 🎯 专业技能

### 核心能力
- **前端开发**：React, Vue.js, TypeScript, 响应式设计
- **后端开发**：Node.js, Python, 数据库设计, API开发
- **全栈思维**：从产品设计到技术实现的完整视角
- **项目管理**：敏捷开发、版本控制、CI/CD

### 软技能
- 问题分析与解决
- 跨团队沟通协作
- 技术文档撰写
- 代码审查与优化

## 🌟 工作价值观

- **追求卓越**：每个项目都力求做到最好
- **持续改进**：不断优化和迭代产品
- **知识分享**：乐于分享经验和学习心得
- **创新思维**：勇于尝试新技术和解决方案

## 📍 个人信息

- 📧 邮箱：${author.email}
- 🌐 网站：${author.website}
- 💼 LinkedIn：${author.linkedin}
- 🔗 GitHub：${author.github}

## 🎨 业余爱好

当我不在编码时，我喜欢：
- 📚 阅读技术书籍和博客
- 🎮 探索新的技术工具
- 🌱 参与开源项目
- ☕ 和同行交流技术心得

## 📞 联系我

如果您有有趣的项目想要合作，或者只是想聊聊技术，随时欢迎联系我！

我总是乐于：
- 讨论技术解决方案
- 分享开发经验
- 探索合作机会
- 提供技术咨询

---

*"让我们一起用代码改变世界！"*`;
    }

    // 创建项目结构
    createProjectStructure() {
        const directories = [
            'docs/projects',
            'docs/blog/posts',
            'docs/public/images/projects',
            'docs/public/images/blog',
            'templates'
        ];

        directories.forEach(dir => {
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
                console.log(`✅ 创建目录: ${dir}`);
            }
        });
    }

    // 批量生成项目页面
    generateProjectPages(projects) {
        if (!fs.existsSync('docs/projects')) {
            fs.mkdirSync('docs/projects', { recursive: true });
        }

        projects.forEach(project => {
            const filename = project.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
            const content = this.generateProjectTemplate(project);
            const filePath = path.join('docs/projects', `${filename}.md`);
            
            fs.writeFileSync(filePath, content);
            console.log(`✅ 生成项目页面: ${filename}.md`);
        });
    }

    // 批量生成博客文章
    generateBlogPosts(articles) {
        if (!fs.existsSync('docs/blog/posts')) {
            fs.mkdirSync('docs/blog/posts', { recursive: true });
        }

        articles.forEach(article => {
            const filename = article.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
            const content = this.generateBlogTemplate(article);
            const filePath = path.join('docs/blog/posts', `${filename}.md`);
            
            fs.writeFileSync(filePath, content);
            console.log(`✅ 生成博客文章: ${filename}.md`);
        });
    }

    // 更新技能页面
    updateSkillsPage() {
        const content = this.generateSkillsContent();
        fs.writeFileSync('docs/skills.md', content);
        console.log('✅ 更新技能页面');
    }

    // 更新关于页面
    updateAboutPage() {
        const content = this.generateAboutContent();
        fs.writeFileSync('docs/about.md', content);
        console.log('✅ 更新关于页面');
    }

    // 生成示例内容
    generateSampleContent() {
        // 示例项目
        const sampleProjects = [
            {
                title: "个人作品集网站",
                description: "基于VitePress构建的响应式个人作品集网站",
                technologies: ["VitePress", "Vue.js", "TypeScript", "CSS3"],
                github: "https://github.com/username/portfolio",
                demo: "https://your-portfolio.com",
                featured: true,
                features: [
                    "响应式设计",
                    "深色模式支持", 
                    "SEO优化",
                    "快速加载"
                ],
                highlights: "这个项目展示了我的前端开发技能和设计理念。",
                learnings: "通过这个项目，我深入学习了VitePress的使用和静态站点生成。"
            },
            {
                title: "任务管理应用",
                description: "功能完整的任务管理和团队协作应用",
                technologies: ["React", "Node.js", "MongoDB", "Express"],
                featured: true,
                features: [
                    "用户认证",
                    "实时协作",
                    "任务分配",
                    "进度追踪"
                ]
            }
        ];

        // 示例博客文章
        const sampleArticles = [
            {
                title: "VitePress建站完全指南",
                description: "从零开始构建现代化的静态网站",
                category: "教程",
                tags: ["VitePress", "Vue.js", "静态站点"],
                featured: true
            },
            {
                title: "JavaScript最佳实践",
                description: "分享编写高质量JavaScript代码的经验",
                category: "技术",
                tags: ["JavaScript", "最佳实践", "代码质量"]
            }
        ];

        this.generateProjectPages(sampleProjects);
        this.generateBlogPosts(sampleArticles);
    }
}

// 主函数
async function main() {
    const contentManager = new ContentManager();
    
    try {
        console.log('🚀 开始内容管理...\n');
        
        // 创建项目结构
        contentManager.createProjectStructure();
        
        // 更新基础页面
        contentManager.updateSkillsPage();
        contentManager.updateAboutPage();
        
        // 生成示例内容
        contentManager.generateSampleContent();
        
        console.log('\n✨ 内容管理完成！');
        
    } catch (error) {
        console.error('❌ 内容管理失败:', error.message);
        process.exit(1);
    }
}

// 直接运行主函数
main();

export default ContentManager;
