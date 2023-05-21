---
title: 实现 Redux (三)
description: 实现自己的 logger 和 thunk 中间件
date: 2023-05-21 09:23:22+8
tags: [React, Redux]
layout: post
cover:
    image: /vp-blog/covers/redux.png
---

## 实现 logger 中间件

::: code-group

```javascript [src/mini-redux/my-logger.js]
export default function myLogger({ getState }) {
  return (next) => (action) => {
    const prevState = getState();

    console.log(`${action.type} 执行了`);

    console.log('prev state', prevState);

    const returnVal = next(action);

    const nextState = getState();

    console.log('next state', nextState);

    return returnVal;
  };
}
```

```javascript [src/store/index.js] {18}
import {applyMiddleware, createStore} from "../mini-redux";
// import {applyMiddleware, createStore} from "redux";
import thunk from "redux-thunk";
// import logger from "redux-logger";
import myLogger from "../mini-redux/my-logger.js";

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

export const store = createStore(counterReducer, applyMiddleware(thunk, myLogger));
```

:::

上方代码，是实现并在我们的示例里使用我们自己的 `myLogger` 替换了原来的 redux-logger 中间件。

上一节，我们在传递给 `compose` 函数的，是中间件带着 `middlewareAPI` 参数执行后的返回值。

所以，我们自定义中间件的最外层的函数是返回另一函数，我们中间件函数中可以结构解构出 `getState` 和 `dispatch`，logger 中间件只需要 `getState`。

参数 `next` 实际上就是 `dispatch` 函数，由于 `myLogger` 是最先被执行的中间件，所以它就是原始的 `dispatch`，它自然是可以接收一个 `action` 并调用。

我们自然可以在 `dispatch` 前后，分别获取到变更前的状态和变更后的状态。

TODO：为什么要返回 returnVal


## 实现 my-thunk 中间件

::: code-group

```javascript [src/mini-redux/my-thunk.js]
export default function myThunk({ getState, dispatch }) {
  return (next) => (action) => {
    if (typeof action === 'function') {
      return action(dispatch, getState);
    }

    return next(action);
  };
}
```

```javascript [src/store/index.js] {19}
import {applyMiddleware, createStore} from "../mini-redux";
// import {applyMiddleware, createStore} from "redux";
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

export const store = createStore(counterReducer, applyMiddleware(myThunk, myLogger));
```

:::

同样地，我们这一次替换 thunk 中间件，我们的应用应该能够正常的工作。

由于我们的 `action` 可能是函数，所以我们需要判断 `action` 的类型，我们知道异步 `action` 内部会用到 `dispatch` 和 `getState`，所以在执行 action 时将它们作为参数。

其他情况下，我们调用 `next` 去处理 `action` 即可，在我们的示例情况下，`next` 是一个增强的 `dispatch`，它能够在原本的 `dispatch` 前后，打印出应用的状态日志，正如我们实现的 `my-logger` 一样。

到这里，我们知道了，每一个中间件可以拿到上一层加强过的中间件，对于第一个中间件，它是初始的 `dispatch`。

函数情况的 `action`，我们传递的 `dispatch`，是[上一篇](/docs/posts/%E5%AE%9E%E7%8E%B0Redux-2.html)中提到的，`dispatch: (action, ...args) => dispatch(action, ...args)`，它在真正调用时将会是最终加强过的 `dispatch`。

它对于异步 `aciton`, 先走函数的情况，最终函数内部一定会是非常原始的对象形式的 `action` 的调用。


## 再次理解 dispatch: (action, ...args) => dispatch(action, ...args)

上一篇，我们简单地理解了为什么如此要传递 `dispatch`，我们的解释是希望每个中间件能够使用的是最终加强过的 `dispatch`。

先在，我们也写了 2 个中间件了，我们可以再次借助实际代码来理解。

我们知道中间件里有两个 `dispatch`，其中一个就是上面这个，还有一个是 `next`，它是上一个中间件处理的 `dispatch`。

想象一下，我们的 thunk 中间件这么处理函数的 `aciton`：`return action(dispatch, getState)`，如果此时的 dispatch 是初始的 `dispatch`，那么它是不能再被 logger 中间件处理了。


## 理解中间件里的 return

一开始，我并不理解为什么中间件里需要返回值，实际上我们的示例里不写，它也是能够正常工作的。

实际上是因为我们的函数 action，它没有返回值，有一些中间件它是可以返回 promise 或者其他返回值的，这么设计是为了能够使得这些中间件能够正常工作的。


## 总结

这一篇，我们完成了两个自己的中间件，而且它还是工作在我们自己的 redux 中的。但是，我们的 state 太简单了，它是一个单一的 `count` 状态。

下一篇，我们会实现 `combineReducers`，方便我们去应用更多的状态。
