import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "前端芯事",
  description: "A VitePress Site",
  lastUpdated: true,
  themeConfig: {
    search: {
      provider: "local",
    },
    nav: [
      {
        text: "首页",
        link: "/",
      },
      {
        text: "文章",
        link: "/article?layout=article",
      },
      { text: "标签", link: "/tags?layout=post", activeMatch: "" },
    ],
    socialLinks: [
      { icon: "github", link: "https://github.com/fzdwx/vitepress-blog-theme" },
    ],
  },
})
