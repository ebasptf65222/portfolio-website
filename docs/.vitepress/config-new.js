import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "我的个人资料",
  description: "个人技能、项目和经验展示",
  lang: 'zh-CN',
  
  // 站点元数据
  head: [
    ['meta', { name: 'theme-color', content: '#646cff' }],
    ['meta', { name: 'author', content: '您的姓名' }],
    ['meta', { name: 'keywords', content: '个人简历,技能展示,项目作品,开发者,前端,后端' }],
    ['meta', { name: 'og:type', content: 'website' }],
    ['meta', { name: 'og:locale', content: 'zh-CN' }],
    ['meta', { name: 'og:site_name', content: '我的个人资料' }],
    ['meta', { name: 'og:image', content: '/logo.svg' }],
    ['link', { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }],
    ['link', { href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap', rel: 'stylesheet' }]
  ],
  
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      { text: '关于我', link: '/about' },
      { text: '技能', link: '/skills' },
      { text: '项目', link: '/projects' },
      { text: '经历', link: '/experience' },
      { text: '博客', link: '/blog' },
      { text: '开源', link: '/opensource' },
      { text: '联系我', link: '/contact' }
    ],

    sidebar: [
      {
        text: '个人介绍',
        items: [
          { text: '关于我', link: '/about' },
          { text: '技能专长', link: '/skills' },
          { text: '工作经历', link: '/experience' }
        ]
      },
      {
        text: '项目展示',
        items: [
          { text: '项目列表', link: '/projects' },
          { text: '开源贡献', link: '/opensource' }
        ]
      },
      {
        text: '其他信息',
        items: [
          { text: '博客文章', link: '/blog' },
          { text: '联系方式', link: '/contact' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/yourusername' },
      { icon: 'linkedin', link: 'https://linkedin.com/in/yourusername' },
      { icon: 'twitter', link: 'https://twitter.com/yourusername' }
    ],

    footer: {
      message: '基于 VitePress 构建',
      copyright: 'Copyright © 2025-present'
    },

    // 搜索功能
    search: {
      provider: 'local',
      options: {
        locales: {
          zh: {
            translations: {
              button: {
                buttonText: '搜索文档',
                buttonAriaLabel: '搜索文档'
              },
              modal: {
                noResultsText: '无法找到相关结果',
                resetButtonTitle: '清除查询条件',
                footer: {
                  selectText: '选择',
                  navigateText: '切换'
                }
              }
            }
          }
        }
      }
    },

    // 编辑链接
    editLink: {
      pattern: 'https://github.com/yourusername/your-repo/edit/main/docs/:path',
      text: '在 GitHub 上编辑此页'
    },

    // 最后更新时间
    lastUpdated: {
      text: '最后更新于',
      formatOptions: {
        dateStyle: 'short',
        timeStyle: 'medium'
      }
    },

    // 文档页脚导航
    docFooter: {
      prev: '上一页',
      next: '下一页'
    },

    // 大纲配置
    outline: {
      label: '页面导航'
    },

    // 返回顶部
    returnToTopLabel: '回到顶部',

    // 外部链接图标
    externalLinkIcon: true
  },

  // Markdown 配置
  markdown: {
    theme: 'github-dark',
    lineNumbers: true,
    math: true
  },

  // 构建优化
  vite: {
    build: {
      chunkSizeWarningLimit: 1600
    }
  }
})
