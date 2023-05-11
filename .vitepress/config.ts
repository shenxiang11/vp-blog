import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "前端芯事",
  description: "A VitePress Site",
  lastUpdated: true,
  base: '/vp-blog',
  outDir: "./dist",
  head: [
    [
      'link',
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: '/vp-blog/favicon.ico'
      }
    ],
  ],
  markdown: {
    lineNumbers: true,
  },
  themeConfig: {
    search: {
      provider: "local",
    },
    nav: [
      {
        text: "文章",
        link: "/",
      },
      {
        text: "标签",
        link: "/tags",
      },
    ],
    socialLinks: [
      { icon: "github", link: "https://github.com/shenxiang11" },
    ],
  },
})
