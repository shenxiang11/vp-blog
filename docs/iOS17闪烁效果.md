---
title: iOS17 闪烁效果 ｜ Xcode 15
date: 2024-02-03 12:06:09+8
tags: []
layout: post
cover:
  image: /vp-blog/covers/shimmer.png
---


<script setup>
import CodeSandbox from '@/components/InDoc/CodeSandbox.vue'
</script>

<CodeSandbox src="https://player.bilibili.com/player.html?aid=1200002747&bvid=BV13F4m137xQ&cid=1428535371&p=1"></CodeSandbox>

[代码下载](https://github.com/shenxiang11/ShimmerEffect)

使用渐变做的闪烁效果，在 2x1 比例的画布上绘制平行四边形来呈现这个渐变是为了好计算渐变的角度，最后在缩小成 1x1 的比例


## api

### mask 修饰符

当蒙版应用于视图时，所有在蒙版中透明的像素将隐藏在原始视图中。

使用它是为了防止在元素圆角处出现不应该有的闪烁，正好也能裁剪掉视图外的区域。


### GeometryReader视图

将获取提供给它的所有空间，并将尺寸传递给闭包，在一个类型为 `GeometryProxy` 的变量中。

当与 `background()` 或 `overlay()` 修饰符结合使用时，这个视图特别有用。


### keyframeAnimator 修饰符

当你需要定义一个需要独立驱动多个参数的复杂动画时，使用这个修饰符。

content 是一个 ViewBuilder 闭包，返回要显示的视图。它接收动画所在时间点的一组值。

keyframes 返回用于插值每个可动画参数值的关键帧，本例中使用的较为简单。


### FillStyle(eoFill: true)

使用此创建了一个镂空的图形，以演示闪烁的效果。闪烁按照预期没有出现在镂空处。

镂空的原理是奇偶填充模式：[wiki](https://en.wikipedia.org/wiki/Even%E2%80%93odd_rule)。
