<script setup lang="ts">
import { useData, useRoute } from 'vitepress'
import { computed } from 'vue'

const route = useRoute()

const { site, page, frontmatter } = useData()
</script>

<template>
  <div class="mt-32">
    <p>
      {{ site }}
    </p>
    <p>
      {{ page }}
    </p>
    <p>
      {{ frontmatter }}
    </p>
  </div>

  <!-- title -->
  <header class="text-center">
    <h1>{{ page.title }}</h1>
    <p class="p-4" v-if="page.description">{{ page.description }}</p>
  </header>

  <!--  time  -->
  <div></div>

  <!--  cover  -->
  <div class="border-solid border-2 p-1">
    <img :src="frontmatter.cover.image" alt="" />
  </div>

  <!--  content  -->
  <Content class="vp-doc prose" />
</template>
