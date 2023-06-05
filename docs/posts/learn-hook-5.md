---
title: 学习 React Hooks（五）
description: useMemo, useCallback, useContext
date: 2023-06-05 09:42:31+8
tags: [React]
layout: post
cover:
  image: /vp-blog/covers/react.jpeg
---

## useMemo

`useMemo` 是一个 React Hook，它在每次重新渲染的时候能够缓存计算的结果。

官网说了它也是仅在少数情况有价值，比如依赖关系很少改变时。


## useCallback

`useCallback` 是一个 React Hook，用来在多次渲染之间缓存函数。

`useMemo` 已经可以做到缓存函数了，它的出现是为了避免出现嵌套的写法。

如果在缓存的函数里使用 `setState`，使用 `setState` 的函数更新形式可以减少依赖项。


## useContext

`useContext` 是一个 React Hook，可以让你读取和订阅组件中的 context。

这个我在之前手写 Redux 时有应用。

在 `createContext` 时可以指定默认值，防止有时没有匹配的 `provider`。


