<script setup lang="ts">
import { useData, useRoute } from 'vitepress'
import { CalendarIcon, CalendarDaysIcon } from '@heroicons/vue/24/outline'
import { computed } from 'vue'
import dayjs from 'dayjs'

const route = useRoute()

const { site, page, frontmatter } = useData()
</script>

<template>
<!--  <div class="mt-32">-->
<!--    <p>-->
<!--      {{ site }}-->
<!--    </p>-->
<!--    <hr />-->
<!--    <p>-->
<!--      {{ page }}-->
<!--    </p>-->
<!--    <hr />-->

<!--    <p>-->
<!--      {{ frontmatter }}-->
<!--    </p>-->
<!--  </div>-->

  <!-- title -->
  <header class="mt-32 text-center">
    <h1>{{ page.title }}</h1>
    <p class="m-4 text-gray-400" v-if="page.description">{{ page.description }}</p>
  </header>

  <!--  time  -->
  <div class="m-4 flex justify-center gap-4 text-gray-400">
    <div class="icon-text">
      <CalendarIcon class="icon" />
      发表于 {{ dayjs(frontmatter.date).format('YYYY-MM-DD') }}
    </div>
    <div class="icon-text" v-if="page.lastUpdated">
      <CalendarDaysIcon class="icon" />
      更新于 {{ dayjs(page.lastUpdated).format('YYYY-MM-DD') }}
    </div>
  </div>

  <!-- tags -->
  <div class="m-4 flex justify-center">
      <span class="tag" v-for="tag in frontmatter.tags" :key="tag">{{tag}}</span>
  </div>

  <!--  cover  -->
  <div class="border-solid border-2 p-1" v-if="frontmatter.cover">
    <img :src="frontmatter.cover.image" alt="" />
  </div>

  <!--  content  -->
  <Content class="vp-doc prose" />
</template>

<style scoped>
.icon-text {
  @apply flex gap-2 items-center text-sm;
}

.icon {
  @apply w-4 h-4;
}

.tag {
    @apply px-2 rounded-md text-neutral-950;
    background-color: var(--vp-c-green-lighter);
}
</style>
