---
title: 实现 Redux (一)
description: 掌握 Redux 的核心实现
date: 2023-05-19 21:02:46+8
tags: [React, Redux]
layout: post
cover:
  image: /vp-blog/covers/redux.png
---

## 创建项目，将项目集成 Redux

```shell
pnpm create vite my-react-redux --template react

cd my-react-redux

pnpm install

pnpm install redux
```

我们通过此命令创建一个 react 项目，它是一个计数器项目，vite 的 react 模版并没有帮我们集成 redux，所以我们自己安装一下，然后把计数器项目改造成由 redux 驱动的。

只需像下方代码一样，新增一个 store 文件和改动一下 `app.jsx` 的界面。

::: code-group

```javascript [src/store/index.js]
import {createStore} from "redux";

function counterReducer(state = 0, action) {
  switch (action.type) {
    case "ADD":
      return state + 1;
    case "MINUS":
      return state - 1;
    default:
      return state;
  }
}

export const store = createStore(counterReducer);
```

```javascript [src/App.jsx]
import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import {store} from "./store/index.js";

function App() {
  const handleAdd = () => {
    store.dispatch({ type: 'ADD'});
  };

  const handleMinus = () => {
    store.dispatch({ type: 'MINUS'});
  };

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>{store.getState()}</h1>
      <div className="card">
        <button onClick={handleAdd}>
          Add
        </button>
        <button onClick={handleMinus}>
          Minus
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
```

:::

可以从代码中看出，我们需要实现的关键 API 有：`createStore` 函数，它需要接收一个 `Reducer`, 它具备一个 `dispatch` 方法来派发 `action`，它有一个 `getState` 方法获取当前的全局状态。还需要实现一个 `subscribe` 方法，来实现我们的用户界面订阅 store 的变化，因为是函数组件，我们使用 `useState` 来实现强制更新（class 组件里可以使用 `this.forceUpdate()`）。 

诸如 `Reducer` 等的概念可以参考[这里](https://cn.redux.js.org/introduction/core-concepts)。

> Reducer (也称为 reducing function) 是一个函数，接受两个参数：之前累积运算的结果和当前需要被被累积计算的值，返回的是一个新的累积计算结果。该函数把一个集合归并成一个单值。

> 在 Redux 中，累计运算的结果就是 state 对象，将要累计运算的是 action。

> dispatching 函数 (或简言之 dispatch function) 是一个接收 action 或者异步 action作为参数的函数，该函数可以向 store 中 dispatch 若干个 action，即可以不 dispatch、dispatch 一个或多个 action。

> Store 就是存储着应用的 state tree 的对象。 因为它的构建发生于 reducer 层，所以一个 Redux 应用中应当只有一个 Store。

当前，项目执行的效果是这样子的：

![](/resources/2023-05/17.gif)


## 创建自己的 createStore 方法

::: code-group

```javascript [src/mini-redux/index.js]
export { default as createStore } from "./createStore.js";
```

```javascript [src/mini-redux/createStore.js] {27}
export default function createStore(reducer) {
  let state;
  let listeners = [];

  function getState() {
    return state;
  }

  function dispatch(action) {
    state = reducer(state, action);

    for (let effect of listeners) {
      effect();
    }
  }

  function subscribe(effect) {
    listeners.push(effect);
    return function () {
      const idx = listeners.indexOf(effect);
      if (idx >= 0) {
        listeners.splice(idx, 1);
      }
    };
  }

  dispatch({ type: Math.random().toString() });

  return {
    getState,
    dispatch,
    subscribe,
  };
}
```

:::

我们实现了 `createStore`，它接收一个 `reducer` 并返回出我们调用的三个方法。

`getState` 最容易，它是返回当前状态的。代码高亮的第 27 行，是为了获取应用的初始状态，因为我们 `state` 默认是 `undefined`，需要默认执行 `reducer` 的 `default` 分支获取初始状态。它的 `action type` 需要和用户定义的不同即可，官方同样采用的是随机字符串的方式。

`subscribe` 是订阅，我们很容易想到订阅发布模式，使用一个数组收集需要执行的方法即可，它的返回值需要能够支持移除订阅。

`dispatch` 后是根据 `action` 来执行 `reducer` 获取应用的下一个 `state`，每次得到新的状态后，我们需要执行我们上一步的订阅的方法。


## 总结

`Redux` 的核心关键方法就是这么几个，实现起来并不难，关键在于理解它的一些概念。

下一篇，我会分享实现 Redux 的中间件机制，和实现支持异步 action 的中间件和 logger 中间件。
