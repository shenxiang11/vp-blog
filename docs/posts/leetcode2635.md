---
title: 转换数组中的每个元素
description: JavaScript 14 天编程挑战
date: 2023-05-17 16:26:43+8
tags: [Javascript]
layout: post
cover:
  image: /vp-blog/covers/js14challenge.png
---

## 题目

编写一个函数，这个函数接收一个整数数组 `arr` 和一个映射函数 `fn`，通过该映射函数返回一个新的数组。

返回数组的创建语句应为 `returnedArray[i] = fn(arr[i], i)`。

请你在不使用内置方法 `Array.map` 的前提下解决这个问题。


## 方法一：不讲武德

题目要求不使用数组的 `map` 方法，但是实际上我们使用是能够提交成功的。

由于 `fn` 的参数和 `map` 的前两个参数是能够匹配上的，我们直接把 `fn` 传给 `map` 即可。

如果是实际项目里，我推荐还是写完整，不然可能会遇到 `['1', '2', '3'].map(parseInt)` 这道面试题所展现的诡异问题。

::: code-group

```typescript
function map(arr: number[], fn: (n: number, i: number) => number): number[] {
    return arr.map(fn);
};
```

```javascript
/**
 * @param {number[]} arr
 * @param {Function} fn
 * @return {number[]}
 */
var map = function(arr, fn) {
    return arr.map(fn);
};
```

:::


## 方法二：老实人

既然题目有所限制，那我们不如准备一个数组，老老实实循环后去填充这个数组即可。

::: code-group

```typescript
function map(arr: number[], fn: (n: number, i: number) => number): number[] {
    const result: number[] = [];

    for (let i=0; i<arr.length; i++) {
        result.push(fn(arr[i], i));
    }

    return result;
};
```

```javascript
/**
 * @param {number[]} arr
 * @param {Function} fn
 * @return {number[]}
 */
var map = function(arr, fn) {
    const result = [];

    for (let i=0; i<arr.length; i++) {
        result.push(fn(arr[i], i));
    }

    return result;
};
```

:::

遍历的方式各种各样，我觉得力扣既然不让用 `map` 了，诸如 `forEach`、`reduce` 等的方法就不提供了，使用最朴素的循环。


## 方法三：天才

看到评论区，有同学提供了这种解法，`Array.from` 和 `map` 方法十分相似。

这里引用一下 MDN 的说法：

> Array.from() 有一个可选的参数 mapFn，该参数允许你在创建数组时为每个元素执行一个函数，类似于 map()。更明确地说，Array.from(obj, mapFn, thisArg) 和 Array.from(obj).map(mapFn, thisArg) 具有相同的结果，只是它不会创建中间数组，并且 mapFn 仅接受两个参数（element、index），不接受数组，因为数组仍然在构建中。

::: code-group

```typescript
function map(arr: number[], fn: (n: number, i: number) => number): number[] {
    return Array.from(arr, fn);
};
```

```javascript []
/**
 * @param {number[]} arr
 * @param {Function} fn
 * @return {number[]}
 */
var map = function(arr, fn) {
    return Array.from(arr, fn);
};
```

:::
