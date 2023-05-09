<script setup lang="ts">
import { useData } from 'vitepress'
import Navbar from '@/components/Navbar.vue'
import Home from '@/views/Home.vue'
import '@/styles.css'
import Post from "@/views/Post.vue";

// https://vitepress.dev/reference/runtime-api#usedata
const { site, frontmatter } = useData()
</script>

<template>
  <Navbar />
  <div class="container">
<!--    {{ frontmatter }}-->
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
  width: 960px;
  margin: 0 auto;
}
</style>
