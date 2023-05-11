<script setup lang="ts">
import { computed, ref } from "vue";
import initTags from '@/utils/initTags'
import { data as allPosts } from '@/utils/posts.data.ts'
import { CalendarIcon } from "@heroicons/vue/24/outline";
import { useData } from "vitepress";

const { site } = useData()

const tagsRecord = computed(() => initTags(allPosts))
const activeKey = ref('')
</script>

<template>
  <div class="mt-32 flex gap-4 flex-wrap">
    <a
      href="javascript:void(0);"
      class="px-2 rounded-md text-neutral-950 bg-slate-200"
      :class="{active: activeKey === key}"
      v-for="(item, key) in tagsRecord"
      :key="key"
      @click="activeKey = key"
      >{{ key }} <strong>{{ item.length }}</strong></a
    >
  </div>

  <div class="mt-16">
    <a
      :href="site.base.slice(0, -1) + post.url"
      v-for="post in tagsRecord[activeKey]"
      :key="post.url"
      class="border my-4 flex gap-4 h-36 p-4 rounded-md"
    >
      <div class="overflow-hidden">
        <img v-if="post.cover" :src="post.cover.image" class="w-48 h-full object-cover" />
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
</template>

<style scoped>
.active {
    background-color: var(--vp-c-green-lighter);
}

.tag {
    @apply px-2 rounded-md text-neutral-950;
    background-color: var(--vp-c-green-lighter);
}
</style>
