# 个人资料文档网站

基于 VitePress 构建的现代化个人资料展示网站，用于展示个人技能、项目经验和专业背景。

## 🌟 特性

- ✨ **现代化设计** - 基于VitePress的美观界面
- 📱 **响应式布局** - 完美适配桌面和移动设备
- 🔍 **全文搜索** - 内置搜索功能，快速查找内容
- 📝 **Markdown** - 使用Markdown编写，易于维护
- 🚀 **快速加载** - 静态网站生成，性能优异
- 🌙 **暗色主题** - 支持明/暗主题切换
- 🎨 **自定义样式** - 精心设计的视觉效果

## 📁 项目结构

```
docs/
├── .vitepress/
│   ├── config.js          # VitePress配置文件
│   └── theme/
│       ├── index.js       # 主题入口文件
│       └── custom.css     # 自定义样式
├── index.md               # 首页
├── about.md               # 关于我
├── skills.md              # 技能专长
├── projects.md            # 项目作品
├── experience.md          # 工作经历
├── opensource.md          # 开源贡献
├── blog.md                # 博客文章
└── contact.md             # 联系我
```

## 🚀 快速开始

### 环境要求

- Node.js 16.0+
- npm 或 yarn

### 安装依赖

```bash
npm install
```

### 本地开发

```bash
npm run docs:dev
```

启动后访问 http://localhost:5173 查看网站

### 构建生产版本

```bash
npm run docs:build
```

构建后的文件在 `docs/.vitepress/dist` 目录

### 预览生产版本

```bash
npm run docs:preview
```

## 📝 内容定制

### 基本信息修改

1. **个人信息**: 修改 `docs/about.md` 中的个人简介
2. **技能列表**: 更新 `docs/skills.md` 中的技术技能
3. **项目展示**: 在 `docs/projects.md` 中添加你的项目
4. **工作经历**: 更新 `docs/experience.md` 中的职业经历
5. **联系方式**: 修改 `docs/contact.md` 中的联系信息

### 网站配置

编辑 `docs/.vitepress/config.js` 文件：

```javascript
export default defineConfig({
  title: "你的名字",                    // 网站标题
  description: "个人资料描述",          // 网站描述
  // ... 其他配置
})
```

### 导航菜单

在 `docs/.vitepress/config.js` 中修改导航栏：

```javascript
nav: [
  { text: '首页', link: '/' },
  { text: '关于我', link: '/about' },
  // 添加更多导航项...
]
```

### 自定义样式

修改 `docs/.vitepress/theme/custom.css` 文件来自定义网站样式。

## 🎨 主题定制

### 颜色主题

在 `custom.css` 中修改CSS变量：

```css
:root {
  --vp-c-brand: #646cff;           /* 主题色 */
  --vp-c-brand-light: #747bff;     /* 浅色主题色 */
  /* ... 其他颜色变量 */
}
```

### 添加新页面

1. 在 `docs/` 目录下创建新的 `.md` 文件
2. 在 `docs/.vitepress/config.js` 中添加到导航或侧边栏
3. 重启开发服务器

## 📦 部署

### GitHub Pages

1. 在 `.github/workflows/` 目录下创建部署工作流
2. 推送代码到GitHub仓库
3. 启用GitHub Pages功能

### Vercel

1. 连接GitHub仓库到Vercel
2. 设置构建命令: `npm run docs:build`
3. 设置输出目录: `docs/.vitepress/dist`

### Netlify

1. 连接GitHub仓库到Netlify
2. 构建命令: `npm run docs:build`
3. 发布目录: `docs/.vitepress/dist`

## 🛠️ 技术栈

- **框架**: [VitePress](https://vitepress.dev/) - Vue.js驱动的静态网站生成器
- **构建工具**: [Vite](https://vitejs.dev/) - 下一代前端构建工具
- **样式**: CSS3 + CSS Variables
- **图标**: 支持emoji和自定义图标
- **搜索**: 内置本地搜索功能

## 📖 VitePress 官方文档

- [快速开始](https://vitepress.dev/zh/guide/getting-started)
- [配置参考](https://vitepress.dev/zh/reference/site-config)
- [主题定制](https://vitepress.dev/zh/guide/extending-default-theme)
- [部署指南](https://vitepress.dev/zh/guide/deploy)

## 🤝 贡献

欢迎提交Issue和Pull Request来改进这个项目！

## 📄 许可证

[MIT License](LICENSE)

---

## 🎯 使用建议

1. **内容为王**: 重点关注内容质量，保持信息的准确性和时效性
2. **定期更新**: 及时更新项目信息和技能描述
3. **SEO优化**: 合理使用关键词，优化搜索引擎排名
4. **移动适配**: 确保在各种设备上都有良好的显示效果
5. **性能优化**: 定期检查网站加载速度和用户体验

## 🔧 常见问题

### Q: 如何添加新的页面？
A: 在 `docs/` 目录下创建 `.md` 文件，然后在配置文件中添加导航链接。

### Q: 如何修改主题颜色？
A: 编辑 `docs/.vitepress/theme/custom.css` 文件中的CSS变量。

### Q: 如何添加自定义组件？
A: 在 `docs/.vitepress/theme/` 目录下创建Vue组件，然后在主题入口文件中注册。

### Q: 部署后样式丢失怎么办？
A: 检查 `base` 配置是否正确设置，确保资源路径正确。

---

*基于 VitePress 构建 | 感谢 Vue.js 团队的优秀工具*
