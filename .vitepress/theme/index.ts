// https://vitepress.dev/guide/custom-theme
import Theme from 'vitepress/theme'
import TheLayout from '@/TheLayout.vue'

export default {
  ...Theme,
  Layout: TheLayout
}
