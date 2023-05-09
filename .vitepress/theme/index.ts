// https://vitepress.dev/guide/custom-theme
import Theme from 'vitepress/theme';
import TheLayput from '@/TheLayout.vue'

export default {
  ...Theme,
  Layout: TheLayput,
}

