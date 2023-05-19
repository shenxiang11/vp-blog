---
title: 复合函数
description: JavaScript 14 天编程挑战
date: 2023-05-19 12:26:50+8
tags: [Javascript]
layout: post
cover:
    image: /vp-blog/covers/js14challenge.png
---

## 题目

请你编写一个函数，它接收一个函数数组 `[f1, f2, f3，…]， fn]`，并返回一个新的函数 `fn`，它是函数数组的复合函数 。

`[f(x)， g(x)， h(x)]` 的 **复合函数** 为 `fn(x) = f(g(h(x)))`。

一个空函数列表的 **复合函数** 是 **恒等函数** `f(x) = x`。

你可以假设数组中的每个函数接受一个整型参数作为输入，并返回一个整型作为输出。


## 答案

::: code-group

```typescript
type F = (x: number) => number;

function compose(functions: F[]): F {
  if (functions.length === 0) {
    return (x: number) => x;
  } else if (functions.length === 1) {
    return functions[0];
  }

  return functions.reduce(
    (a, b) => (x: number) => a(b(x))
  );
};

/**
 * const fn = compose([x => x + 1, x => 2 * x])
 * fn(4) // 9
 */
```

```javascript
/**
 * @param {Function[]} functions
 * @return {Function}
 */
var compose = function(functions) {
	if (functions.length === 0) {
        return (x) => x;
    } else if (functions.length === 1) {
        return functions[0];
    }

	return functions.reduce(
        (a, b) => (x) => a(b(x))
    );
};

/**
 * const fn = compose([x => x + 1, x => 2 * x])
 * fn(4) // 9
 */
```

:::


## 解析

题目默认模版提供的这个符合函数名称叫作 `compose`，在前端领域，我所知道的 `compose` 有两处知名的应用，`redux` 和 `koa` 的中间件。

本题的要求和解法，更接近于 `redux` 里的写法，我们可以参考：[redux](https://github.com/reduxjs/redux/blob/master/src/compose.ts)

正如题目里所说，当空函数时，我们直接返回一个函数：`(x) => x`。

当函数只有一个时，也就不需要复合，直接返回该函数。

由于题目要求函数列表的执行顺序实际是从右向左计算的，我们可以利用 `Array.prototype.reduce(callbackFn, initialValue?)`。

当 `initialValue` 缺省时，会从数组中的第一个值作为 `callbackFn` 的一个参数，第二个参数则是数组的第二个值。

所以，如果函数分别是 `[f1, f2, f3]` 时，我们的函数是这么执行的：

第一次循环，`a` 是 `f1`, `b` 是 `f2`, 返回 `(x) => f1(f2(x))`;

下一次循环时，`a` 是 `(x) => f1(f2(x))`， `b` 是 `f3`, 返回 `(x) => f1(f2(f3(x)))`，有点递归的意思。

即，下一次的执行结果作为上一次的参数。由此可见，最早执行的函数反而是函数组数中最右边的函数。

上面的分析，可能读者会不太明白，其实还是 `reduce` 函数不是很好理解造成的，我们完全可以改成 `for` 循环的形式，从后往前执行亦可，每次依然是把执行结果作为下一次循环的入参数。

由于 `redux` 的源码就是使用的 `redece` 去写的，所以还是推荐理解一下 `reduce` 的写法。

同样地，我们可以利用 `Array.prototype.reduceRight(callbackFn, initialValue?)` 实现，此方法和 `reduce` 相似，差别是会从右向左应用函数，虽然代码上几乎没有区别，但是理解起来更加自然。

本文的目的是希望能巩固 `redux` 里 `compose` 函数的写法，但是还是提供一下比较简单的代码：

::: code-group

```typescript
type F = (x: number) => number;

function compose(functions: F[]): F {
	return functions.reduceRight(
        (a, b) => (x: number) => b(a(x)),
        x => x,
    );
};

/**
 * const fn = compose([x => x + 1, x => 2 * x])
 * fn(4) // 9
 */
```

```javascript
/**
 * @param {Function[]} functions
 * @return {Function}
 */
var compose = function(functions) {
	return functions.reduceRight(
        (a, b) => (x) => b(a(x)),
        (x) => x,
    );
};

/**
 * const fn = compose([x => x + 1, x => 2 * x])
 * fn(4) // 9
 */
```

:::
