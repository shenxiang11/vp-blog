---
title: Element Plus 文档导航效果模仿
date: 2023-04-13 08:25:19
tags: [CSS]
layout: post
---

## 前言

![](/resources/2023-04-13/01.gif)

就像图中你所看到的，该网站导航栏处，给它下方的滚动的元素添加了一个比较炫酷的效果。

CSS 有个很多效果并不需要很多知识，但是开发人员往往很难想到，这次目标就是模仿一下这个效果。

{% iframe https://codesandbox.io/embed/hopeful-rgb-c1eps8?fontsize=14&hidenavigation=1&theme=dark&view=preview %}


## 原理简单介绍

首先介绍一下 `radial-gradient`，创建一个图像，该图像由从原点辐射的两种或多种颜色之间的渐进过渡组成。它的形状可以是圆形或椭圆形。

我们使用它在 4x4 的界面上，绘制一个 1x1 的透明的圆圈，然后将它平铺到整个导航栏，这是我们可以透过导航栏看到下面元素的原因。

最后，是使用 `backdrop-filter`，它可以让你为一个元素后面区域添加图形效果（如模糊或颜色偏移）。

因为它适用于元素背后的所有元素，为了看到效果，必须使元素或其背景至少部分透明，我们前一步刚好有一部分是透明的。

具体应用的图形效果，`blur` 是高斯模糊，`saturate` 是修改图像饱和度，你可以在 [MDN](https://developer.mozilla.org/zh-CN/docs/Web/CSS/filter) 看看设置它们的效果。


