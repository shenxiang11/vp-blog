<script setup lang="ts">
import { useData, withBase } from "vitepress";
import { data as allPosts } from '@/utils/posts.data.ts'
import { CalendarIcon } from '@heroicons/vue/24/outline'
import { computed, ref, watch } from "vue";

const { site, frontmatter } = useData()

const currentPage = ref(frontmatter.value.current ?? 1)
const pageSize = 10

const posts = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  return allPosts.slice(start, start + pageSize)
})

const lastPage = computed(() => Math.ceil(allPosts.length / pageSize))

watch(() => frontmatter.value.current, function() {
  currentPage.value = frontmatter.value.current ?? 1
})
</script>

<template>
  <div>
    <a
      :href="site.base.slice(0, -1) + post.url"
      v-for="post in posts"
      :key="post.url"
      class="border my-4 flex flex-col gap-4 md:h-36 p-4 rounded-md md:flex-row"
    >
      <div class="md:overflow-hidden">
        <img v-if="post.cover" :src="post.cover.image" class="md:w-48 md:h-full w-full h-auto object-cover" />
      </div>
      <div class="flex-shrink-0 flex-grow flex flex-col">
        <h1 class="text-xl font-semibold mb-3">{{ post.title }}</h1>
        <div class="text-gray-500" v-if="post.description">{{ post.description }}</div>
        <div class="flex-grow"></div>

        <div class="flex gap-2">
          <div class="flex gap-2 items-center text-sm">
            <CalendarIcon class="w-4 h-4" />
            发表于 {{ post.date.string }}
          </div>
          <div class="flex gap-2">
            <span class="tag" v-for="tag in post.frontmatter.tags" :key="tag">{{ tag }}</span>
          </div>
        </div>
      </div>
    </a>
  </div>

  <div class="flex justify-center p-4">
    <a
      :href="withBase(`/articles_${currentPage-1}.html`)"
      v-if="currentPage !== 1"
      class="inline-flex items-center px-4 py-2 mr-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
    >
      <svg
        aria-hidden="true"
        class="w-5 h-5 mr-2"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
          clip-rule="evenodd"
        ></path>
      </svg>
      上一页
    </a>
    <a
      :href="withBase(`/articles_${currentPage+1}.html`)"
      v-if="currentPage !== lastPage"
      class="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
    >
      下一页
      <svg
        aria-hidden="true"
        class="w-5 h-5 ml-2"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
          clip-rule="evenodd"
        ></path>
      </svg>
    </a>
  </div>
</template>

<style scoped>
.tag {
  @apply px-2 rounded-md text-neutral-950;
  background-color: var(--vp-c-green-lighter);
}
</style>
