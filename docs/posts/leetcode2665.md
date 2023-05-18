---
title: 计数器 II
description: JavaScript 14 天编程挑战
date: 2023-05-17 17:19:39+8
tags: [Javascript]
layout: post
cover:
  image: /vp-blog/covers/js14challenge.png
---

## 题目

请你写一个函数 `createCounter`. 这个函数接收一个初始的整数值 `init` 并返回一个包含三个函数的对象。

这三个函数是：

`increment()` 将当前值加 1 并返回。
`decrement()` 将当前值减 1 并返回。
`reset()` 将当前值设置为 init 并返回。


## 答案

和昨天的计数器的题目并没有太大区别，我们只需要用对象形式返回三个函数即可。

::: code-group

```typescript
type ReturnObj = {
    increment: () => number,
    decrement: () => number,
    reset: () => number,
}

function createCounter(init: number): ReturnObj {
    let n = init

    return {
        increment() {
            return ++n
        },
        decrement() {
            return --n
        },
        reset() {
            return n = init
        }
    }
};

/**
 * const counter = createCounter(5)
 * counter.increment(); // 6
 * counter.reset(); // 5
 * counter.decrement(); // 4
 */
```

```javascript
/**
 * @param {integer} init
 * @return { increment: Function, decrement: Function, reset: Function }
 */
var createCounter = function(init) {
    let n = init

    return {
        increment() {
            return ++n
        },
        decrement() {
            return --n
        },
        reset() {
            return n = init
        }
    }
};

/**
 * const counter = createCounter(5)
 * counter.increment(); // 6
 * counter.reset(); // 5
 * counter.decrement(); // 4
 */
```

:::
