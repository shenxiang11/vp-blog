---
title: 计数器
description: JavaScript 14 天编程挑战
date: 2023-05-16 14:26:43+8
tags: [Javascript]
layout: post
cover:
  image: /vp-blog/covers/js14challenge.png
---

## 题目

请你编写并返回一个 **计数器** 函数，它接收一个整型参数 n 。这个 **计数器** 函数最初返回 n，每次调用它时返回前一个值加 1 的值 (`n`, `n + 1`, `n + 2` ，等等)。


## 答案

::: code-group

```javascript
/**
 * @param {number} n
 * @return {Function} counter
 */
var createCounter = function(n) {
    return function() {
        return n++
    };
};

/** 
 * const counter = createCounter(10)
 * counter() // 10
 * counter() // 11
 * counter() // 12
 */
```

```typescript
function createCounter(n: number): () => number {
    return () => {
        return n++
    }
}


/** 
 * const counter = createCounter(10)
 * counter() // 10
 * counter() // 11
 * counter() // 12
 */
```

:::


## 解析

今天的两题均考察闭包，我们利用内层函数去返回一个递增的变量即。我们无需重新声明一个变量去保存 n 后，可以直接对外层函数的参数 n 进行操作。


## 什么是闭包？

根据《Javascript 权威指南》，闭包是一种函数对象和作用域结合起来解析变量的一种 **机制**。

所以，我们需要注意，不能说某一段代码是闭包，或者某一段代码产生了闭包，一段代码怎么能是或者怎么能产生一种机制呢？

函数其实一直具有闭包这种机制，只是通常我们需要关注这种机制的情况是闭包产生了 **捕获** 行为，即捕获了外层的变量。

