<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core'
import VPNavBarTitle from 'vitepress/dist/client/theme-default/components/VPNavBarTitle.vue'
import VPNavBarSearch from 'vitepress/dist/client/theme-default/components/VPNavBarSearch.vue'
import VPNavBarMenu from 'vitepress/dist/client/theme-default/components/VPNavBarMenu.vue'
import VPNavBarSocialLinks from 'vitepress/dist/client/theme-default/components/VPNavBarSocialLinks.vue'
import { SunIcon, MoonIcon } from '@heroicons/vue/24/outline'
import * as events from "events";

const isDark = useDark()
const toggleDark = useToggle(isDark)

async function handleThemeClick(e) {
  if (!document.startViewTransition) {
    toggleDark()
    return
  }

  const transition = document.startViewTransition(() => {
    toggleDark()
  })

  const x = e?.clientX ?? innerWidth / 2;
  const y = e?.clientY ?? innerHeight / 2;

  const endRadius = Math.hypot(
    Math.max(x, innerWidth - x),
    Math.max(y, innerHeight - y)
  );

  await transition.ready;
  document.documentElement.animate(
    {
      clipPath: [
        `circle(0 at ${x}px ${y}px)`,
        `circle(${endRadius}px at ${x}px ${y}px)`,
      ],
    },
    {
      duration: 500,
      easing: 'ease-in',
      // Specify which pseudo-element to animate
      pseudoElement: '::view-transition-new(root)',
    }
  );
}
</script>

<template>
  <header class="header">
    <div class="container">
      <VPNavBarTitle />
      <VPNavBarSearch />
<!--      <VPNavBarMenu />-->
      <div class="appearance flex items-center">
        <a href="javascript:void(0);" @click="handleThemeClick">
          <SunIcon v-if="!isDark" class="w-6" />
          <MoonIcon v-else class="w-6" />
        </a>
      </div>
      <VPNavBarSocialLinks class="social-links" />
    </div>
  </header>
</template>

<style scoped>
.header {
  @apply sticky top-0 z-50;
  backdrop-filter: saturate(50%) blur(5px);
}

.container {
  @apply px-4 flex w-full;
  margin: 0 auto;
}

/*.appearance::before,*/
.social-links::before {
  margin-left: 16px;
  width: 1px;
  height: 24px;
  background-color: var(--vp-c-divider);
  content: '';
  margin-right: 16px;
}
</style>
