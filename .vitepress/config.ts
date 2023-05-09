import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "前端芯事",
  description: "A VitePress Site",
  lastUpdated: true,
  base: '/vp-blog',
  themeConfig: {
    search: {
      provider: "local",
    },
    nav: [
      {
        text: "首页",
        link: "/",
      },
    ],
    socialLinks: [
      { icon: "github", link: "https://github.com/shenxiang11" },
    ],
  },
})
