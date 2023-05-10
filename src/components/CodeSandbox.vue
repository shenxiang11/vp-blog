<script setup lang="ts">
const props = defineProps<{
  src: string
}>()
</script>

<template>
  <iframe
    :src="props.src"
    style="width: 100%; height: 500px; border: 0; border-radius: 4px; overflow: hidden"
    title="hopeful-rgb-c1eps8"
    allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
    sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  ></iframe>
</template>

<style scoped></style>
