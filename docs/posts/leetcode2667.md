---
title: 创建 Hello World 函数
description: JavaScript 14 天编程挑战
date: 2023-05-16 14:09:16+8
tags: [Javascript]
layout: post
cover:
  image: /vp-blog/covers/js14challenge.png
---

## 题目

请你编写一个名为 createHelloWorld 的函数。它应该返回一个新的函数，该函数总是返回 "Hello World" 。


## 答案

::: code-group

```typescript
function createHelloWorld() {
  return () => "Hello World";
};

/**
 * const f = createHelloWorld();
 * f(); // "Hello World"
 */
```

```javascript
/**
 * @return {Function}
 */
var createHelloWorld = function() {
    return () => 'Hello World'
};

/**
 * const f = createHelloWorld();
 * f(); // "Hello World"
 */
```

:::

## 解析

JS 中，有函数是一等公民的说法，函数可以像变量一样作为返回值。

由于本题的返回函数固定返回 `Hello World` 字符串，我们可以忽略参数(PS:力扣给的初始默认代码里有 `args` 作为参数)，并简写成箭头函数。
