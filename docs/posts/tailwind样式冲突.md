---
title: 解决 Tailwind 样式冲突
description: Tailwind 小技巧
date: 2023-07-07 21:29:51+8
tags: [CSS, Tailwind]
layout: post
cover:
  image: /vp-blog/covers/tailwind.jpeg
---

## 问题

之前在尝试使用 tailwind css 开发组件库时，遇到了如下图一样样式覆盖上的问题。

![](/resources/2023-07/13.png)

如图中所示，有时候组件会有一些额外的样式去覆盖基础样式，照我们往常的理解，出现在后面的样式应该是可以覆盖之前的样式的。理论上我们应该得到一个黑底白字，可是我们现在看到的是仍然是白底黑字。


## 原因

这其实还是因为我们写的是类名，tailwind 会生成最后的样式表，类名的生效的优先级是依据样式表中的先后顺序决定的，这个顺序是不固定的（我试了几次得出的结论）。


## 解决方案

我们可以使用 tailwind-merge 来解决这个问题。

![](/resources/2023-07/14.png)

可以从图中看到，样式是“干净”的，`class` 上只会有最后生效的样式。

