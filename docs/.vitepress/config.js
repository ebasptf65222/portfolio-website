import { defineConfig } from 'vitepress'
import { getAutoIncrementPort } from '../../port-utils.js'

// 动态获取可用端口
const getServerConfig = async () => {
  const port = await getAutoIncrementPort(5173);
  console.log(`使用端口: ${port}`);
  return {
    server: {
      host: '0.0.0.0',
      port: port,
    }
  };
};

export default defineConfig({
  title: "个人文档",
  description: "个人技能、项目和经验展示",
  lang: 'zh-CN',
  
  head: [
    ['meta', { name: 'theme-color', content: '#646cff' }],
    ['meta', { name: 'author', content: '您的姓名' }],
    ['meta', { name: 'keywords', content: '个人简历,技能展示,项目作品,开发者,前端,后端' }],
    ['meta', { name: 'og:type', content: 'website' }],
    ['meta', { name: 'og:locale', content: 'zh-CN' }],
    ['meta', { name: 'og:site_name', content: '个人资料' }],
    ['link', { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' }],
    
  ],
  
  themeConfig: {
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
      { icon: 'github', link: 'https://github.com/yourusername' }
    ],

    footer: {
      message: '基于 VitePress 构建',
      copyright: 'Copyright © 2025-present'
    },

    search: {
      provider: 'local'
    },

    editLink: {
      pattern: 'https://github.com/yourusername/your-repo/edit/main/docs/:path',
      text: '在 GitHub 上编辑此页'
    },

    lastUpdated: {
      text: '最后更新于',
      formatOptions: {
        dateStyle: 'short',
        timeStyle: 'medium'
      }
    }
  },
  markdown: {
    theme: 'github-dark',
    lineNumbers: true
  },

  // vite: {
  //   server: {
  //     host: true,  // 允许外部访问
  //     port: true,       // 可选：指定端口
  //     // open: true        // 可选：自动打开浏览器
  //   }
  // }
  vite: await getServerConfig()

})