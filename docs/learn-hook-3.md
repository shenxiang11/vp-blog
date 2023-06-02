---
title: 学习 React Hooks（三）
description: useEffect, useLayoutEffect, useInsertionEffect
date: 2023-06-02 11:16:33+8
tags: [React]
layout: post
cover:
  image: /vp-blog/covers/react.jpeg
---

## useEffect

`useEffect` 是一个 React Hook，它允许你将组件与外部系统同步。

我们把 `useEffect` 函数的参数分别称为 `setup` 和 `dependencies`。

setup 的返回值可以返回一个函数是清理函数。

初次渲染是，将执行 `setup`, 每次 `dependencies` 变更时，会使用旧值执行清理函数，然后使用新值执行 `setup`，组件卸载时会最后一次执行清理函数。

dependencies 如果被省略，那么组件每次渲染时 `setup` 将被执行。

确保代码不受竞争条件的影响的小技巧：

```js
import { useState, useEffect } from 'react';
import { fetchBio } from './api.js';

export default function Page() {
  const [person, setPerson] = useState('Alice');
  const [bio, setBio] = useState(null);

  useEffect(() => {
    let ignore = false;
    setBio(null);
    fetchBio(person).then(result => {
      if (!ignore) {
        setBio(result);
      }
    });
    return () => {
      ignore = true;
    };
  }, [person]);

  // ...
}
```

https://zh-hans.react.dev/reference/react/useEffect


## useLayoutEffect

`useLayoutEffect` 是 useEffect 的一个版本，在浏览器重新绘制屏幕之前触发。

它们的不同之处就是 `useLayoutEffect` 会阻塞重新渲染，通常是需要多布局进行计算时使用。

https://zh-hans.react.dev/reference/react/useLayoutEffect


## useInsertionEffect

`useInsertionEffect` 是为 CSS-in-JS 库的作者特意打造的。除非你正在使用 CSS-in-JS 库并且需要注入样式，否则你应该使用 useEffect 或者 useLayoutEffect。

`useInsertionEffect` 是 useEffect 的另一种实现，在任何 DOM 变化前触发。

https://zh-hans.react.dev/reference/react/useInsertionEffect
