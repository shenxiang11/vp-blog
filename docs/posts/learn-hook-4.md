---
title: 学习 React Hooks（四）
description: useDebugValue，useDeferredValue
date: 2023-06-04 12:08:16+8
tags: [React]
layout: post
cover:
  image: /vp-blog/covers/react.jpeg
---

## useDebugValue

`useDebugValue` 是一个 React Hook，可以让你在 React 开发工具 中为自定义 Hook 添加标签。

这是一个配合调试工具用的 hook，初此意外，暂时没有发现有什么特别的用处。

https://zh-hans.react.dev/reference/react/useDebugValue


## useDeferredValue

`useDeferredValue` 是一个 React Hook，可以让我们延迟更新一部分 UI。

文档中举的都是输入框变更后，UI 需要重新渲染的例子，用了这个 hook，可以减少不必要的更新，需要配合 `memo`。

官网也说了它与防抖与节流的区别，它只是优化掉不必要的渲染，如果有请求发生依然会有多余的请求，这时候传统的手段还是可以使用的。

https://zh-hans.react.dev/reference/react/useDeferredValue


## useImperativeHandle

`useImperativeHandle` 是 React 中的一个 Hook，它能让你自定义由 ref 暴露出来的句柄。

需要配合 `forwardRef` 使用，为了向父组件暴露自私的一些属性或方法。

官方的意见是：

- 不要滥用 ref。
- 如果可以通过 prop 实现，那就不应该使用 ref。

深有体会，之前项目组里有同事滥用它，刚开始命令式的方法并没有什么问题，但是最后却导致最后数据的流向非常复杂，反而导致了难以维护，而且当时的需求 props 传参完全能够满足，以后会慎用的。

https://zh-hans.react.dev/reference/react/useImperativeHandle

