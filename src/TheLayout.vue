<script setup lang="ts">
import { useData, useRouter } from 'vitepress'
import Navbar from '@/components/Navbar.vue'
import Home from '@/views/Home.vue'
import '@/styles.css'
import Post from '@/views/Post.vue'
import Tags from "@/views/Tags.vue";

// https://vitepress.dev/reference/runtime-api#usedata
const { site, frontmatter } = useData()
const router = useRouter()

router.onBeforeRouteChange = function (to) {
  return new Promise(async (resolve) => {
    if (!document.startViewTransition) {
      resolve(to)
      return
    }

    document.startViewTransition(() => {
      resolve(to)
    })
  })
}
</script>

<template>
  <Navbar />
  <div class="container">
    <Home v-if="frontmatter.home || frontmatter.pagination" />
    <Post v-else-if="frontmatter.layout === 'post'" />
    <Tags v-else-if="frontmatter.layout === 'tags'" />
    <div v-else>
      <a href="/">Home</a>
      <Content />
    </div>
  </div>

  <footer class="rounded-lg m-4">
    <div class="w-full max-w-screen-xl mx-auto p-4 md:py-8">
      <span class="block text-sm text-gray-500 sm:text-center dark:text-gray-400"
        >© 2023 前端芯事. All Rights Reserved.</span
      >
    </div>
  </footer>
</template>

<style scoped>
.container {
  @apply md:w-full;
  width: 960px;
  min-height: 100vh;
  margin: 0 auto;
}
</style>
