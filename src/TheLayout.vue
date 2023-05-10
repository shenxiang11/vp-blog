<script setup lang="ts">
import { useData, useRouter } from 'vitepress'
import Navbar from '@/components/Navbar.vue'
import Home from '@/views/Home.vue'
import '@/styles.css'
import Post from '@/views/Post.vue'

// https://vitepress.dev/reference/runtime-api#usedata
const { site, frontmatter } = useData()
const router = useRouter()

router.onBeforeRouteChange = function(to) {
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
    <Home v-if="frontmatter.home" />
    <Post v-else-if="frontmatter.layout === 'post'" />
    <div v-else>
      <a href="/">Home</a>
      <Content />
    </div>
  </div>
</template>

<style scoped>
.container {
  @apply md:w-full;
  width: 960px;
  margin: 0 auto;
}
</style>
