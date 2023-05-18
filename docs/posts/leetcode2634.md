---
title: 过滤数组中的元素
description: JavaScript 14 天编程挑战
date: 2023-05-18 15:51:36+8
tags: [Javascript]
layout: post
cover:
  image: /vp-blog/covers/js14challenge.png
---

## 题目

请你编写一个函数，该函数接受一个整数数组参数 `arr` 和一个过滤函数 `fn`，并返回一个过滤后元素数量较少或元素数量相等的新数组。

返回的数组应该只包含通过过滤函数 `fn(arr[i]， i)` 计算后为真值的元素。

请你在不使用内置函数 `Array.filter` 的前提下解决该问题。


## 方法一：不讲武德

::: code-group

```typescript
function filter(arr: number[], fn: (n: number, i: number) => any): number[] {
    return arr.filter(fn);
};
```

```javascript
/**
 * @param {number[]} arr
 * @param {Function} fn
 * @return {number[]}
 */
var filter = function(arr, fn) {
    return arr.filter(fn);
};
```

:::

## 方法二：老实人

可以自己遍历，然后依据函数执行情况将符合的结果添加到返回数组中。遍历的方式多种多样，包括 `reduce`，不作展开了。

::: code-group

```typescript
function filter(arr: number[], fn: (n: number, i: number) => any): number[] {
    const result: number[] = [];
    for (let i=0; i<arr.length; i++) {
        if (fn(arr[i], i)) {
            result.push(arr[i]);
        }
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
var filter = function(arr, fn) {
    const result = [];
    for (let i=0; i<arr.length; i++) {
        if (fn(arr[i], i)) {
            result.push(arr[i]);
        }
    }

    return result;
};
```

:::
