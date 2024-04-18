---
title: 从 Hook 闭包陷阱到自定义 useInterval
date: 2024-04-18 21:08:24+8
tags: [React]
layout: post
cover:
  image: /vp-blog/covers/react.jpeg
---


## 闭包陷阱

```jsx
import { useEffect, useState } from 'react';

function App() {

    const [count,setCount] = useState(0);

    useEffect(() => {
        setInterval(() => {
            console.log(count);
            setCount(count + 1);
        }, 1000);
    }, []);

    return <div>{count}</div>
}

export default App;
```

在这段定时器代码中，我们期望每秒钟打印一个递增数字并更新视图，但实际上，它每秒钟都会打印 0，视图上永远是 1。这是因为 `setInterval` 的回调函数是在 `useEffect` 的闭包中创建的，而这个闭包只会在组件挂载时执行一次，所以 `count` 的值永远是 0。


## 解决方案一

如果只是想正确地更新视图，我们可以使用 `setCount(count => count + 1)` 的形式。

但是，像是代码中的打印类似的其他状态，我们依然是错误的。


## 解决方案二

可以在 count 变更后重新设置定时器。

```jsx
import { useEffect, useState } from 'react';

function App() {

    const [count,setCount] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            console.log(count);
            setCount(count + 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [count]);

    return <div>{count}</div>
}
```

由于是重新定时，似乎还是不太合适。


## 解决方案三

我们可以使用 `useRef` 来保存需要执行的方法，每次渲染后方法会被更新，而定时器却不需要重新重置。

```jsx
import { useEffect, useRef, useState } from 'react';

function App() {

    const [count,setCount] = useState(0);
    
    const updateCount = () => {
        console.log(count);
        setCount(count + 1);
    }
    
    const countRef = useRef(updateCount);
    countRef.current = updateCount;

    useEffect(() => {
        const timer = setInterval(() => {
            countRef.current();
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return <div>{count}</div>
}
```


## 自定义 useInterval

有了上面的逻辑，我们不妨把这个相对可能高频的操作封装成一个自定义 Hook。

```ts
function useInterval(fn: Function, delay?: number) {
  const ref = useRef(fn);
  ref.current = fn;

  useEffect(() => {
    const interval = setInterval(() => {
      ref.current();
    }, delay);

    return () => {
      clearInterval(interval);
    };
  }, [delay]);
}
```

当然和一些健壮的三方库的实现相比，这个自定义 Hook 还有很多不足。

可以参考：[ahooks useInterval](https://github.com/alibaba/hooks/blob/master/packages/hooks/src/useInterval/index.ts)
