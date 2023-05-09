<script setup lang="ts">
import VPNavBarTitle from 'vitepress/dist/client/theme-default/components/VPNavBarTitle.vue'
import VPNavBarSearch from 'vitepress/dist/client/theme-default/components/VPNavBarSearch.vue'
import VPNavBarMenu from 'vitepress/dist/client/theme-default/components/VPNavBarMenu.vue'
import VPNavBarSocialLinks from 'vitepress/dist/client/theme-default/components/VPNavBarSocialLinks.vue'
import VPNavBarAppearance from 'vitepress/dist/client/theme-default/components/VPNavBarAppearance.vue'
</script>

<template>
  <header class="header">
    <div class="container">
      <VPNavBarTitle />
      <VPNavBarSearch />
      <VPNavBarMenu />
      <VPNavBarAppearance class="appearance" />
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
    @apply px-4 flex;
    margin: 0 auto;
    width: 960px;
}

.appearance::before, .social-links::before {
    margin-left: 16px;
    width: 1px;
    height: 24px;
    background-color: var(--vp-c-divider);
    content: "";
    margin-right: 16px;
}
</style>
