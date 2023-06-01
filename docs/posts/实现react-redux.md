---
title: 实现 react-redux (函数组件版)
description: 实现 provider, useDispatch, useSelector
date: 2023-05-24 12:27:54+8
tags: [React, Redux]
layout: post
cover:
  image: /vp-blog/covers/redux.png
---

## 什么是 react-redux ？

前几天，我已经实现了自己的 redux 库，那 react-redux 又是什么呢？

> Official React bindings for Redux

即 Redux 的 React 官方绑定库。实际上，redux 并不和 react 强绑定，它是一个 js 应用的状态容器。

我们可以发现，我们此前的应用中，获取全局状态需要 `store.getStore()`， 执行变更需要执行 `store.dispatch(action)`，最不能接收的一点是，我们需要手动订阅状态的更新，然后强制更新我们的应用。

react-redux 就是为了简化这些操作。


## 体验 react-redux

由于我们的 redux 的实现和官方比较接近，我们的 redux 是可以和官方 react-redux 一起工作的。

::: code-group

```jsx [src/main.jsx]
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import {Provider} from "react-redux";
import {store} from "./store/index.js";

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <Provider store={store}>
    <App />
  </Provider>
  // </React.StrictMode>,
);
```

```jsx [src/App.jsx]
import {memo, useEffect, useState} from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import {add, addAsync, donothing, minus, minusAsync} from "./store/actions.js";
import {useDispatch, useSelector} from "react-redux";

function App() {
  const dispatch = useDispatch();
  const count = useSelector((state) => state.count);

  const handleAdd = () => {
    dispatch(add());
  };

  const handleMinus = () => {
    dispatch(minus());
  };

  const handleAddAsync = () => {
    dispatch(addAsync());
  };

  const handleMinusAsync = () => {
    dispatch(minusAsync());
  };

  const handleDoNothing = () => {
    dispatch(donothing());
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
      <h1>{count}</h1>
      <div className="card">
        <button onClick={handleAdd}>
          Add
        </button>
        <button onClick={handleMinus}>
          Minus
        </button>
        <button onClick={handleAddAsync}>
          Add async
        </button>
        <button onClick={handleMinusAsync}>
          Minus async
        </button>
        <button onClick={handleDoNothing}>
          Do nothing
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

export default memo(App);
```

:::

我们用来 react-redux 后，只在文件入口的 `Provider` 处，传入我们的 `store`，`App.jsx` 中我们不再需要导入 `store`，该用 `useSelector` 和 `useDispatch`。


## 实现 provider

```jsx [src/mini-react-redux/index.jsx]
import React, {useContext, useState, useSyncExternalStore} from 'react';

const Context = React.createContext();

export const Provider = ({ store, children }) => {
  return (
    <Context.Provider value={store}>
      {children}
    </Context.Provider>
  );
};
```

`Provider` 实际是利用 `React.createContext` 达到跨组件传递我们 `store` 的目的，我们可以在其子孙组件中使用 `useContext(Context)` 获取 `store`。


## 实现 useDispatch

```jsx
import React, {useContext, useState, useSyncExternalStore} from 'react';

const Context = React.createContext();

export const Provider = ({ store, children }) => {

  return (
    <Context.Provider value={store}>
      {children}
    </Context.Provider>
  );
};


export function useDispatch() {
  const store = useContext(Context);

  return store.dispatch;
}
```

`useDispatch` 在函数组件中将帮助我们获取 `store.dispatch`，因为其是一个自定义 hook 且内部用到了其他 hook，所以其名称需要以 use 开头。

正如此前提到的，我们利用 `useContext` 获取 store。


## 实现 useSelector

```jsx
import React, {useContext, useState, useSyncExternalStore} from 'react';

const Context = React.createContext();

export const Provider = ({ store, children }) => {

  return (
    <Context.Provider value={store}>
      {children}
    </Context.Provider>
  );
};


export function useSelector(selector) {
  const store = useContext(Context);
  
  useSyncExternalStore(store.subscribe, store.getState);

  return selector(store.getState());
}

export function useDispatch() {
  const store = useContext(Context);

  return store.dispatch;
}
```

参数 `selector` 是一个函数，其接收一个 `state`，它是 `store.getState()` 的执行结果，它本身的执行结果将返回给组件，即它能够帮助我们取出我们需要的状态。

同时，我们在这里利用 `useSyncExternalStore` 实现强制更新的逻辑，这是 React18 才支持的，如果考虑兼容性问题，我们可以使用 `useLayoutEffect` 配合 `forceUpdate`。


## 总结

再完成上面的代码后，记得把 react-redux 的导入部分，改为我们自己实现的部分。我们的应用依然能够正常工作。
 
通过这次的手写实现，我们简单了解了 react-redux 是如何工作的。也简单接触了 `useSyncExternalStore`, `useLayoutEffect` 和 `createContext` 这些 react 的 api，要搞明白它们到底是怎么工作的还需要深入源码。

至此，我们完成在函数式组件中的实现。类组件虽然一般不鼓励使用了，但是为其实现 redux 的绑定也能学到 react 中高阶组件的思想。

下期，我们将为期实现 `connect` 高阶函数。
