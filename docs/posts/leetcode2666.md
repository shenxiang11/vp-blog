---
title: 只允许一次函数调用
description: JavaScript 14 天编程挑战
date: 2023-05-19 14:09:13+8
tags: [Javascript]
layout: post
cover:
    image: /vp-blog/covers/js14challenge.png
---

## 题目

给定一个函数 `fn` ，它返回一个新的函数，返回的函数与原始函数完全相同，只不过它确保 `fn` 最多被调用一次。

第一次调用返回的函数时，它应该返回与 `fn` 相同的结果。
第一次后的每次调用，它应该返回 `undefined`。


## 答案

::: code-group

```typescript
function once<T extends (...args: any[]) => any>(fn: T): 
 ((...args: Parameters<T>) => ReturnType<T> | undefined) {
    let called = false
    return function (...args) {
        if (called) {
            return undefined
        } else {
            called = true
            return fn(...args)
        }
    };
}

/**
 * let fn = (a,b,c) => (a + b + c)
 * let onceFn = once(fn)
 *
 * onceFn(1,2,3); // 6
 * onceFn(2,3,6); // returns undefined without calling fn
 */
```

```javascript
var once = function(fn) {
    let flag = false;
    return function(...args){
        if(flag) return undefined;
        flag= true;
        return fn(...args);
    }
};
```

:::


## 解析

依旧时利用闭包，一个变量作为是否调用过的标识。

需要注意的是，调用过时，题目要求我们返回 undefined，而不是缓存执行结果，这一点是和 lodash 里的 `once` 函数有细微的差别。


## 评论区发现两个“秀儿”

第一个是在执行过后，把 fn 重新赋值了一个空函数。

第二个是利用了题目的漏洞，题目里的返回值为了告诉我们函数被调用了几次，将 `called` 的次数每次都会返回，他利用这个 `called` 作的判断，实际上函数执行了多次。

这两种方法只能说有点脑洞在里面吧。

