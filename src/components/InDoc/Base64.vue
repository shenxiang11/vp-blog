<script setup lang="ts">
import { ref } from "vue";

const fileReaderBase64 = ref('')
const t1 = ref('')
const customFileBase64 = ref('')
const t2 = ref('')
async function onFileChange(e) {
  const file = e.target.files[0]

  const t1Start = performance.now();
  fileReaderBase64.value = await fileReaderBase64Fn(file) as string
  const t1End = performance.now();
  t1.value = `${(t1End - t1Start)} ms`

  const t2Start = performance.now();
  customFileBase64.value = await customFileBase64Fn(file)
  const t2End = performance.now();
  t2.value = `${(t2End - t2Start)} ms`
}

async function fileReaderBase64Fn(file: any) {
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.addEventListener('load', function() {
      if (typeof this.result === "string") {
        resolve(this.result)
      }
    })
    reader.readAsDataURL(file)
  })
}

async function customFileBase64Fn(file: any) {
  const encodeStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"
  const buffer = await file.arrayBuffer()
  const src = new Uint8Array(buffer)
  let res = ""
  let si = 0
  let n = Math.floor(src.length / 3) * 3
  while (si < n) {

    let val = src[si] << 16 | src[si + 1] << 8 | src[si+2]

    res += encodeStr[val >> 18]
    res += encodeStr[val >> 12 & 0x3f]
    res += encodeStr[val >> 6 & 0x3f]
    res += encodeStr[val & 0x3f]

    si += 3
  }

  const remain = src.length - si

  if (remain === 0) {
    return 'data:image/png;base64,' + res
  }

  let val = src[si] << 16
  if (remain === 2) {
    val |= src[si+1] << 8
  }

  res += encodeStr[val >> 18]
  res += encodeStr[val >> 12 & 0x3F]

  if (remain === 2) {
    res += encodeStr[val >> 6 & 0x3F]
    res += '='
  } else if (remain === 1) {
    res += '=='
  }

  return  'data:image/png;base64,' + res
}
</script>

<template>
  <input
    type="file"
    accept="image/*"
    @change="onFileChange"
  />
  <p v-if="fileReaderBase64">
    耗时：{{t1}}
    <img :src="fileReaderBase64" width="200" height="200" alt="" />
  </p>
  <p v-if="customFileBase64">
    耗时：{{t2}}
    <img :src="customFileBase64" width="200" height="200" alt="" />
  </p>
</template>

<style>

</style>
