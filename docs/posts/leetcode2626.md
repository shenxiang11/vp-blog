---
title: 数组归约运算
description: JavaScript 14 天编程挑战
date: 2023-05-18 16:04:32+8
tags: [Javascript]
layout: post
cover:
    image: /vp-blog/covers/js14challenge.png
---

## 题目

请你编写一个函数，它的参数为一个整数数组 `nums`、一个计算函数 `fn` 和初始值 `init`。返回一个数组归约后的值。

你可以定义一个数组归约后 的值，然后应用以下操作： `val = fn(init, nums[0])`， `val = fn(val, nums[1])`， `val = fn(val, arr[2])`，...直到数组中的每个元素都被处理完毕。返回 val 的最终值。

如果数组的长度为 0，它应该返回 `init` 的值。

请你在不使用内置数组方法的 `Array.reduce` 前提下解决这个问题。


## 方法一：不讲武德

啥是归约，我一下子没反应过来，但是你说不允许使用 `reduce`，我就明白了，但是我偏要用。

::: code-group

```typescript
type Fn = (accum: number, curr: number) => number

function reduce(nums: number[], fn: Fn, init: number): number {
    return nums.reduce(fn, init);
};
```

```javascript []
/**
 * @param {number[]} nums
 * @param {Function} fn
 * @param {number} init
 * @return {number}
 */
var reduce = function(nums, fn, init) {
    return nums.reduce(fn, init);
};
```

:::


## 方法二：老实人

答案就在题目里，题目里已经把每次循环怎么执行告诉我们了。

::: code-group

```typescript
type Fn = (accum: number, curr: number) => number

function reduce(nums: number[], fn: Fn, init: number): number {
    for (let n of nums) {
        init = fn(init, n)
    }
    return init
};
```

```javascript
/**
 * @param {number[]} nums
 * @param {Function} fn
 * @param {number} init
 * @return {number}
 */
var reduce = function(nums, fn, init) {
    for (let n of nums) {
        init = fn(init, n)
    }
    return init
};
```

:::


## 方法三：递归

递归也能解决，递归的结束条件是没有参数了。每次递归，消耗一个数组元素。实际上反而没有方法二好理解，不建议。

::: code-group

```typescript
type Fn = (accum: number, curr: number) => number

function reduce(nums: number[], fn: Fn, init: number): number {
    if (nums.length === 0) {
        return init
    }

    return reduce(nums.slice(1), fn, fn(init, nums[0]))
};
```

```javascript
/**
 * @param {number[]} nums
 * @param {Function} fn
 * @param {number} init
 * @return {number}
 */
var reduce = function(nums, fn, init) {
    if (nums.length === 0) {
        return init
    }

    return reduce(nums.slice(1), fn, fn(init, nums[0]))
};
```

:::
