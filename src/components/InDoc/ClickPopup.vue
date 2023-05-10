<script setup lang="ts">
import { onUnmounted } from 'vue'

function clickPopup(arr: string[]) {
  if (!arr || !arr.length) {
    return
  }

  let index = 0

  function effect(e) {
    const x = e.pageX
    const y = e.pageY
    const elText = document.createElement('span')
    elText.className = 'text-popup'
    this.append(elText)
    elText.innerText = arr[index]

    elText.addEventListener('animationend', function () {
      elText.parentNode?.removeChild(elText)
    })

    elText.style.left = x - elText.clientWidth / 2 + 'px'
    elText.style.top = y - elText.clientHeight + 'px'

    index = (index + 1) % arr.length
  }

  document.documentElement.addEventListener('click', effect)

  return () => {
    document.documentElement.removeEventListener('click', effect)
  }
}

const clean = clickPopup([
  '富强',
  '民主',
  '文明',
  '和谐',
  '自由',
  '平等',
  '公正',
  '法治',
  '爱国',
  '敬业',
  '诚信',
  '友善'
])

onUnmounted(() => {
  clean?.()
})
</script>

<template>
  <div></div>
</template>

<style>
.text-popup {
  animation: textPopup 1s;
  color: red;
  user-select: none;
  white-space: nowrap;
  position: absolute;
  z-index: 99;
}
@keyframes textPopup {
  0%,
  100% {
    opacity: 0;
  }
  5% {
    opacity: 1;
  }
  100% {
    transform: translateY(-50px);
  }
}
</style>
