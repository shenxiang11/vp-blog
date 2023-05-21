---
title: 实现 Redux (四)
description: 实现 combineReducers
date: 2023-05-21 11:36:44+8
tags: [React, Redux]
layout: post
cover:
    image: /vp-blog/covers/redux.png
---

## 前言

[上一篇](/docs/posts/实现redux-3.html)，我已经指出我们的 redux 只能管理单个 `count` 状态，虽然我们把 `count` 改造成一个 `Object`，所有状态都放在这个 `Object` 里，这样子的代码也难以维护和阅读。

所以 `Redux` 为我们提供了 `combineReducers`，让我们能拆分 `Reducer`。

官网中提到过：一个 Redux 应用中应当只有一个 `store`。那么这种方式是否违反这个原则呢？我们去实现一遍便能知道答案了。


## 体验官方库的 combineReducers

我们先把代码从自己的 mini-redux 切换到官方库，并加入 `combineReducers`。

::: code-group

```javascript [src/store/index.js] {19, 20, 21}
// import {applyMiddleware, createStore} from "../mini-redux";
import {applyMiddleware, createStore, combineReducers} from "redux";
// import thunk from "redux-thunk";
// import logger from "redux-logger";
import myLogger from "../mini-redux/my-logger.js";
import myThunk from "../mini-redux/my-thunk.js";

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

export const store = createStore(combineReducers({
  count: counterReducer,
}), applyMiddleware(myThunk, myLogger));

```

:::

我们的应用应当仍然可以运行，我们可以通过我们的日志中间件查看到派发 action 后的日志，我们的状态从单个值 0 变成了 `{count: 0}`, 这就意味着全局 state 上可以挂载更多地状态了。

而且，这个 `count` 的键名是我们调用 `combineReducers` 时指定的。


## 实现自己的 combineReducers

::: code-group

```javascript [src/mini-redux/combineReducers.js]
export default function combineReducers(reducers) {
  return function (state = {}, action) {
    const nextState = {};
    let hasChanged = false;

    for (let key in reducers) {
      nextState[key] = reducers[key](state[key], action);
      hasChanged = hasChanged || nextState[key] !== state[key];
    }

    hasChanged = hasChanged || Object.keys(nextState).length !== Object.keys(state).length;

    return hasChanged ? nextState : state;
  };
}
```

```javascript [src/mini-redux/index.js]
export { default as createStore } from "./createStore.js";
export { default as applyMiddleware } from "./applyMiddleware.js";
export { default as combineReducers } from  "./combineReducers.js";
```

```javascript [src/store/index.js]
import {applyMiddleware, createStore, combineReducers} from "../mini-redux";
// import {applyMiddleware, createStore, combineReducers} from "redux";
// import thunk from "redux-thunk";
// import logger from "redux-logger";
import myLogger from "../mini-redux/my-logger.js";
import myThunk from "../mini-redux/my-thunk.js";

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

export const store = createStore(combineReducers({
  count: counterReducer,
}), applyMiddleware(myThunk, myLogger));
```

:::

可以看出，`combineReducers` 的作用就是合成一个大的 reducer 函数。

这个大的 reducer 需要通过 `key` 找到对子 `reducer` 和其状态并进行变更。

这里有个 `hasChanged` 变量，是一个优化手段，有时候状态不一定会发生变更，但是如果我们这个 nextState 每次执行将是一个新对象，有了这个机制，`react` 端才有可能做优化，我们这里由于订阅后有 `forceUpdate`，还无法做到这个优化。

到这里，我们也就知道了，`combineReducers` 并不违反单一 store 的原则，实际上它们仍然是同一个 store。


## 总结

手写 mini-redux 到这里就告一段落了，后面我们还会实现自己的 React-redux 库。
