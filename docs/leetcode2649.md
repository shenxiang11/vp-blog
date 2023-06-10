---
title: 嵌套数组生成器
description: JavaScript 14 天编程挑战
date: 2023-06-10 17:16:11+8
tags: [Javascript]
layout: post
cover:
image: /vp-blog/covers/js14challenge.png
---

## 题目

https://leetcode.cn/problems/nested-array-generator/


## 方法一：使用 `yield*`

这道题的问题在于这是一个多维数组，我们需要递归地去解决问题。

实际开发中生成器函数已经使用的比较少了，`yield*` 我更是第一次使用。

`yeild*` 是一个表达式语句，它自身有返回值，在这里它的作用是可以递归调用生成器函数（其实只要是可迭代的数据类型都可以）。

更官方一点的说法是：

> `yield*` 表达式用于委托给另一个generator 或可迭代对象。


::: code-group

```typescript
type MultidimensionalArray = (MultidimensionalArray | number)[]

function* inorderTraversal(arr: MultidimensionalArray): Generator<number, void, unknown> {

  for (let tmp of arr) {
    if (Array.isArray(tmp)) {
      yield* inorderTraversal(tmp)
    } else {
      yield tmp
    }
  }
};

/**
 * const gen = inorderTraversal([1, [2, 3]]);
 * gen.next().value; // 1
 * gen.next().value; // 2
 * gen.next().value; // 3
 */
```

```javascript
/**
 * @param {Array} arr
 * @return {Generator}
 */
var inorderTraversal = function*(arr) {
    for (let item of arr) {
      if (Array.isArray(item)) {
        yield* inorderTraversal(item);
      } else {
        yield item;
      }
    }
  };

/**
 * const gen = inorderTraversal([1, [2, 3]]);
 * gen.next().value; // 1
 * gen.next().value; // 2
 * gen.next().value; // 3
 */
```

:::


## 方法二：先拍平，再 `yield`

在力扣的执行环境中，这个方案执行地更快。

::: code-group

```typescript
type MultidimensionalArray = (MultidimensionalArray | number)[]

function* inorderTraversal(arr: MultidimensionalArray): Generator<number, void, unknown> {
    const newArr = arr.flat(Infinity);
    for (let n of newArr) {
      yield n;
    }
};

/**
 * const gen = inorderTraversal([1, [2, 3]]);
 * gen.next().value; // 1
 * gen.next().value; // 2
 * gen.next().value; // 3
 */
```

```javascript
/**
 * @param {Array} arr
 * @return {Generator}
 */
var inorderTraversal = function*(arr) {
  arr = arr.flat(Infinity);

  for (let n of arr) {
    yield n;
  }
};

/**
 * const gen = inorderTraversal([1, [2, 3]]);
 * gen.next().value; // 1
 * gen.next().value; // 2
 * gen.next().value; // 3
 */
```

:::


