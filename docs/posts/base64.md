---
title: 手写 base64 编码
description: 通过手写 base64 编码，了解为什么编码后会增加三分之一大小
date: 2023-05-10 14:04:54+8
tags: [算法, Javascript]
layout: post
cover:
  image: /vp-blog/covers/js.png
---

## Playground

你可以先在下方区域体验一下功能，它会分别以原生和我自己定义的编码函数将选择的图片编码。

<script setup>
import Base64 from '@/components/InDoc/Base64.vue'
</script>

<Base64 />


## 前置知识

做过前端的应该都比较了解，一个图片 base64 编码后，会变成 `data:image/png;base64,xxxx` 的形式，我们可以直接把它用到图片标签上。

其实，只有`xxx` 部分，其实才是真正的编码结果部分，前面的前缀知识为了让图片标签显示时，浏览器方便去识别它是什么类型的文件。

那么 `xxx` 部分会支持那些字符呢？

经过我的查询，用到的字符有 `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/`，这么 64 个字符，这也是 base64 名称的由来。

你可能会说，“不对呀，我经常会看到 `=` 会出现在编码结果中！”

没错，等于号属于填充字符，只会有可能地出现在编码的结尾，至于什么时候需要填充，我们留到后面讲讲。


## 基本原理

我们知道，计算机中，文件是以二进制进行存储的，举个例子我有一个文件的二进制，它的前面一部分是 `[137, 80, 78, 71, ...]`，它转换成 base64 编码的前面一段字符是 `iVBOR...`。

它这里是八进制，我们假设整个文件就是这么 5 个八进制数组成，现在把它转换成二进制是 `10001001, 01010000, 01001110, 01000111`。（可以在控制台里通过 `137..toString(2).padStart(8, '0')` 的形式得到每个对应二进制的形式）

八进制可以无符号表示到 256，但是我们只有 64 个字符，显然不能一一对应，所以 base64 需要按 6 位取，2 的 6 次方是 64。

取出 100010 剩下 01，01会与后面拼上一起用，0b100010 代表的数字是 34，对应字符是 `i`;

取出 01，再结合后面 4 位，0b010101 代表的是 21，对应字符是 `V`;

取出 0000, 再结合后面 2 位，0b000001 代表的是 1，对应字符是 `B`;

再往后是 0b001110，刚好到 78 结束的位置，代表 14，对应字符是 `O`，如果文件的结尾像这样刚好结束，这就属于不需要补位的情况；

我们继续，接着是 0b010001，代表 17，对应字符是 `R`，我们假设文件已经到这个位置结束了，但是还剩下 `11` 没有被使用，这时候就需要填充了；

我们补成 11 ｜ 0000 0000 ｜ 00 000000，这样的形式，其实就是要让整体刚好被 6 除尽，所以补了两个位置，我们最后就会添上两个等号，当然如果我们剩下 1111，这种情况，就只需要补一个位置，对应一个等号。


## 代码

```vue {34-75}
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
    return  'data:image/png;base64,' + res
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
```


## 讲解

我们在 JS 里可以通过 `Uint8Array` 得到我们前面所说的整个文件的八进制表示的数组。

整个算法用到的小技巧是，因为 24 位是可以被 8 和 6 整除的，所以我们每次都可以取出 3 个八进制，通过与运算8把它们合成 24 位。

接下来仍然是位运算，我们每次取 6 位，例如：`val >> 12 & 0x3f`, 取了前 12 位，但又通过并了 63，我们取得了我们需要的 6 位，舍掉了前 6 位。

因为图片可以被快速验证编码是否正确，所以我在最后直接拼接了 `data:image/png;base64,`，然后用于图片的显示。

至于是否需要补位，我们可以通过上方实现中的 `remain` 变量知道，对于不同的情况，我们继续按照我们的理论进行处理即可。


## 总结

![](/resources/2023-05/05.png)

最后，成功出现了两个图片，可以看出自己的实现会比直接调用慢了 10 倍的数量级别，但是我们只是为了了解 base64 编码原理，我已经很满足了。

同时，我们也能明白了，我们常说的 base64 后，尺寸会大约 1/3 的结论了，因为原本 8 位的存储空间，我们只能存储 6 位了，每个浪费了 2 个位置，也就是 `8/6 = 1.333..`。

前面，我们用到的 64 个字符是 `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/`，它是 encodeStd 标准的。

还有一种 `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_`，它是 encodeURL，我认为是 `+` 和 `/` 可能会与 url 里使用的符号有冲突，斜杠不必多说，它是路径的分割符号，加号不能作为域名的一部分，我们也不会太常用，简单知道即可。
