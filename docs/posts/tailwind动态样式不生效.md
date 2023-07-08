---
title: Tailwind 动态样式不生效
description: Tailwind 小技巧
date: 2023-07-08 08:44:03+8
tags: [CSS, Tailwind CSS]
layout: post
cover:
  image: /vp-blog/covers/tailwind.jpeg
---

## 问题

在编写组件库时，遇到了如下方，动态样式不生效的问题。

拼接的样式类名，在 tailwind css 中是存在的。

![](/resources/2023-07/15.png)


## 原因

其根本原因是因为，tailwind css 的优化，tailwind 的功能有很多，如果全打包进来会非常大，所以只会打包生成最后使用的类名。


## 解决方案

第一种自然是，动态的样式需求不使用 tailwind css。

第二种是可以在文件中，提前声明使用到的完整类名，让 tailwind 识别最后放入打包结果，如下图所示。

![](/resources/2023-07/16.png)

