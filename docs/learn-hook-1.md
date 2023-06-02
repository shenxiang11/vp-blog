---
title: 学习 React Hooks（一） 
description: useId, useSyncExternalStore, useTransition
date: 2023-06-01 12:34:27+8
tags: [React]
layout: post
cover:
  image: /vp-blog/covers/react.jpeg
---


## useId

`useId` 是一个 React Hook，可以生成传递给无障碍属性的唯一 ID。

官网目前只提到了，这个是为了无障碍而使用的，国内感觉不是太注重这一块，可以简单了解一下。

`useId` 不应该被用来生成列表中的 key。key 应该有你的数据生成。

遵循官网，只用于无障碍，不要用别的地方。

** 使用无障碍时，为什么要用它，不能写死字符串吗？**

```jsx
const passwordHintId = useId();
// ...
<>
  <input type="password" aria-describedby={passwordHintId} />
  <p id={passwordHintId}>
</>
```

我们可以看到，无障碍属是如上代码这么使用的，如果当我们这个组件在页面上多次使用时，会出现多个相同 id 的元素，这违反了 id 必须唯一的原则。

** 能不能自己维护一个自增的 id？**

客户端渲染时，是可以的但是没有必要。而且如果你是服务端渲染，使用自增计数器会非常困难。

更多内容可以参考：https://zh-hans.react.dev/reference/react/useId


## useSyncExternalStore

`useSyncExternalStore` 是一个让你订阅外部 store 的 React Hook。

前一段时间，在[手写 React-Redux](/docs/posts/%E5%AE%9E%E7%8E%B0react-redux.html) 中，我用到了这个 hook。官方文档也差不多举了一个 store 的例子。

另外，官网提供的另一个例子是用来订阅浏览器的状态，代码如下：

```jsx
import { useSyncExternalStore } from 'react';

export default function ChatIndicator() {
  const isOnline = useSyncExternalStore(subscribe, getSnapshot);
  return <h1>{isOnline ? '✅ Online' : '❌ Disconnected'}</h1>;
}

function getSnapshot() {
  return navigator.onLine;
}

function subscribe(callback) {
  window.addEventListener('online', callback);
  window.addEventListener('offline', callback);
  return () => {
    window.removeEventListener('online', callback);
    window.removeEventListener('offline', callback);
  };
}
```

没有这个 hook，我们也能完成类似的功能，比如借助 `useState` 和 `useEffect` 也能做到，可以认为是一种比较简单的写法。

可以认为 `useSyncExternalStore` 会返回一个 state，当 state 变换时我们的界面会被更新。

`subscribe` 可以添加订阅，它的返回值需要能够删除订阅。

`getSnapshot` 是获取我们所需 state 的方法，它会在订阅被触发时调用。

更多内容可以参考：https://zh-hans.react.dev/reference/react/useSyncExternalStore


## useTransition

`useTransition` 是一个让你在不阻塞 UI 的情况下来更新状态的 React Hook。

它返回一个 `isPending` 和 `startTransition`，分别返回我们是一个否是挂起的状态与一个将状态更新标记为 transition(暂时不知道这么翻译准确)。

React 里可以直接导入一个 `startTransition`，区别就是我们不能知道 `isPending`，以及它不受 hooks 规则的限制。

我们只应该在 `setXXX` 这样的 的状态时使用 `startTransition`，其他的情况可以尝试使用 `useDeferredValue`。父组件传递过来的更新方法也是可以被调用的。

传递给 `startTransition` 的函数必须时同步的。

不要用于控制文本输入。

官方文档的场景时选项卡切换：有三个选项卡，其中切换第二个选项卡需要一点时间，在不使用 `useTransition` 时，我们点击第二个选项卡后，立刻点击第三个选项卡，此时会有明显的卡顿后才能切换。

使用了 `useTransition` 后，情况会非常不同，不再卡顿了，第二个选项卡的渲染被放弃了，能够快速显示第三个选项卡。

做的好一点，我们可以利用 `isPending`, 在选项卡上做比较“轻”的提示，提示用户渲染正在进行。

官网还提到了它可以避免不必要的加载指示器，这是配合 `Suspense` 时使用的问题。

记得刚到 Shopee 做 Entry Task 的时候，就用这个 `Suspense`，做一个列表滚动加载时，每次会先更新到 `fallback` 状态，然后重新渲染列表。当时就放弃使用 `Suspense` 了，当时其实可以利用 `useTransiton` 解决。

后面，官网推荐使用路由时，推荐使用这个 hook，其实也是使用了 `Suspense` 的情况。

需要注意的是，下方代码输出顺序依然是 `1 2 3`, 只是由此产生的更新任务是非紧急的更新。

```jsx
console.log(1);
startTransition(() => {
  console.log(2);
  setPage('/about');
});
console.log(3);
```

更多内容可以参考：https://zh-hans.react.dev/reference/react/useTransition
