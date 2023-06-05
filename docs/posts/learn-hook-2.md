---
title: 学习 React Hooks（二）
description: useState, useReducer, useRef
date: 2023-06-02 09:34:13+8
tags: [React]
layout: post
cover:
  image: /vp-blog/covers/react.jpeg
---

## useState

`useState` 是一个 React Hook，它允许你向组件添加一个 state 变量。

`useState` 可以算得上最重要的 hook 之一了，它的基本使用本一位都掌握了，但是看了官网没想到还是有几个重要的知识点可以再总结一下。

`setXXX` 仅更新下一次渲染的状态变量。如果再调用它后读取状态变量，依然是旧值。

新值和旧值是通过 `Object.is` 比较确定的，如果相同，React 将跳过重新渲染。

React 会批量处理状态更新，防止多次重新渲染。如果需要强制更早地更新，可以使用 `flushSync`。

假设 `x = 42` 多个 `setState(x + 1)` 的更新，结果依然是 `43`，为了解决这个问题，应该传递更新函数 `setState(x => x + 1)`。

在更新对象和数组时，原则依旧是需要返回一个新对象，可以使用 Immer 编写简洁的更新逻辑。

我们可能会将一个函数的调用执行结果传递给 `useState`，此时我们传入函数本身即可，React 会在初次渲染是调用它，否则该函数会在更新期间多次调用，影响性能。

非常特别的情况下，我们想要把函数作为状态，但是由于 `useState` 和 `setState` 传入函数是有特殊作用的，需要采用函数返回一个函数的形式来创建函数状态。

https://zh-hans.react.dev/reference/react/useState


## useReducer

`useReducer` 是用来添加 reducer 的 hook。

它的很多概念和 redux 库一样，和 setState 比起来，像是对象一类的复杂数据适合用它来管理。

它的第三个函数的作用也类似与 `useState` 传入函数，它会将第三个参数调用第二个参数的执行结果作为初始值，避免在渲染时重复执行初始化函数。

官方文档中的示例以及注意事项等，均和 `setState` 是类似的，这是因为它们最终底层其实调用的是同一个底层 api，`useState` 其实就是一个不带 `action` 的 `useReducer`。

你可以在源码中看到类似如下代码，`useState` 最后也是调用了 `useReducer`：

```js {11}
function basicStateReducer(state, action) {
    // $FlowFixMe: Flow doesn't like mixed types
    return typeof action === 'function' ? action(state) : action;
}

function useState(initialState) {
    {
      currentHookNameInDev = 'useState';
    }

    return useReducer(basicStateReducer, initialState);
}

function useReducer(reducer, initialArg, init) {
  // ... 省略 useReducer 的代码
}
```

https://zh-hans.react.dev/reference/react/useReducer


## useRef

`useRef` 是一个 React Hook，它能让你引用一个不需要渲染的值。

改变 ref 不会触发重新渲染，这意味着 ref 是存储一些不影响组件视图输出的信息的完美选择。

官方的例子有存储定时器的 id，以便后续清楚定时器。

注意事项是：不要在渲染期间读取或者写入 `ref.current`。

此外，可以通过 `ref` 操作 DOM，配合 `forwardRef` 向组件暴露 ref。

避免重复创建 ref 的内容：

```js
function Video() {
  const playerRef = useRef(new VideoPlayer());
  // ...
}
```

```js
function Video() {
  const playerRef = useRef(null);
  if (playerRef.current === null) {
    playerRef.current = new VideoPlayer();
  }
}
```

这有些违反在渲染期间写入的原则，但是这是可预测的，官方推荐下面这种写法。

避免总是判断 null 的小技巧是封装一个函数：

```js
function Video() {
  const playerRef = useRef(null);

  function getPlayer() {
    if (playerRef.current !== null) {
      return playerRef.current;
    }
    const player = new VideoPlayer();
    playerRef.current = player;
    return player;
  }
}
```

不能直接通过 ref 获取组件的内部的 DOM，需要使用 `forwardRef`。

https://zh-hans.react.dev/reference/react/useRef
