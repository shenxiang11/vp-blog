---
title: DOM Tree 转 Fiber 挑战
description: 了解 React 的 Fiber 是如何从树状结构转换
date: 2023-05-25 22:04:45+8
tags: [React, 算法]
layout: post
cover:
  image: /vp-blog/covers/fiber.png
---

## 了解 虚拟 DOM 和 Fiber

假设有一颗如下结构的 DOM Tree：

```html
<div id="root">
    <div>
        <h1>
            <p>p1</p>
            <a href="#">a1</a>
        </h1>
        <h2>h2</h2>
    </div>
    <section>1</section>
</div>
```

我们可以用虚拟 DOM，即 JS 对象来描述它：

```js
const vnode = {
  tag: 'div',
  props: {
    id: 'root',
    children: [
      {
        tag: 'div',
        props: {
          children: [
            // ... 省略
          ]
        },
      }
    ],
  }, 
}
```

遍历这样的结构，需要使用深度优先搜索，但是它是不能中断的。

在 React 中，如果这颗组件树足够大，我们的 diff 之类的操作，在遍历这种结构时，是很有可能占据 JS 主线程较长的时间的，如果超过了 16ms，就会掉帧影响用户体验。

所以，在最新的 React 设计中，虚拟 DOM 不再采用这种形式描述，而是使用 Fiber，它是另一种对 DOM 的描述，特点是不再是简单的父节点通过 `children` 引用子节点的关系；
而是该用，父节点通过 `child` 引用第一个子节点，第一个子节点同样通过 `child` 引用它的子节点；同时第一个子节点通过 `sibling` 引用它的下一个兄弟节点，... 以此类推。
另外，所有节点的 `return` 指针指向它的父节点。

它的结构如图所示(ps: 图中的 parent 在代码中是 return)：

![](/resources/2023-05/21.png)


## 代码实现

```html
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Fiber</title>
</head>
<body>
    <div id="root">
        <div>
            <h1>
                <p>p1</p>
                <a href="#">a1</a>
            </h1>
            <h2>h2</h2>
        </div>
        <section>1</section>
    </div>

    <script>
        const domTree = document.getElementById('root');

        const rootFiber = { element: domTree, children: domTree.children };

        function reconcile(fiber, children) {
          let index = 0;
          let previous = null;

          while (index < children.length) {
            let element = children[index];
            let newFiber = { element, children: element.children, return: fiber }

            if (!previous) {
              fiber.child = newFiber;
            } else {
              previous.sibling = newFiber;
            }

            previous = newFiber;
            index++;
          }
        }

        function performUnitWork(fiber) {
          console.log(fiber.element)
          if (fiber.children) {
            reconcile(fiber, fiber.children);
          }

           if (fiber.child) {
             return fiber.child;
           }

           let curr = fiber;
           while (curr) {
             if (curr.sibling) {
               return curr.sibling;
             }

             curr = curr.return;
           }
        }

        let task = rootFiber;
        while (task) {
          task = performUnitWork(task);
        }
    </script>
</body>
</html>
```

我们不是要实现真正的 Fiber，而是为了学习如何将 Tree 转成 Fiber 的结构，所以我们的 Fiber 里为了方便除了存储 `child`、`sibling`、`return`，指针外，我们额外存储一下对应的 DOM，以及 DOM 的 `children` 属性。

由于原生 DOM 的文本节点并不存储在 children 上，我们也不作特别处理，忽略文本节点。因为即使忽略它们，我们的 DOM 仍然是一颗足够复杂的 Tree 结构。

每个节点都会被 `performUnitWork` 函数执行，我们可以在其第一行做打印，方便我们验证我们的输出是否符合深度优先遍历。

我们首先在 `performUnitWork` 中，执行 `reconcile` 函数。

`reconcile` 函数可以，指定当前 fiber 的 child，以及当前 fiber 的 child，指向它的邻居（sibling）。

到这里，其实整个 Fiber 并没有按指针全部链起来，只完成了当前节点和它的 children。

剩余的串联是 child 作为下一个任务执行时，将它的 child 和它的 children 链起来。以此类推。最后虽有的节点都能被这三个指针串联起来。

所以我们可以看到寻找下一个任务的代码逻辑是：有 child 则下一个任务是 child；否则，下一个任务是 sibling。如果还没有则返回上一级，查找上一级的 sibling。

在查找 sibling 前，使用了 `while`，这是因为返回上一级的这个节点一定以及被处理过了，所以需要回到循环开始的位置，同样查找它的 sibling，这是没有被处理过的，这么写可能有点不好理解。

可以改成下面这样：

```js
if (fiber.child) {
  return fiber.child;
}

if (fiber.sibling) {
  return fiber.sibling;
}

return fiber.return.sibling;
```

执行每一次任务，我使用了 `while` 循环让其快速执行完，React 中则是会按照任务优先级，在浏览器空闲期间执行。

可以检查最后的打印，打印是符合深度优先遍历的顺序的。


## 总结

又了解了一些 React 里的小细节，学会了将 Tree 结构转换成 Fiber 结构的技巧，且这个转换不是一次转换完成的，每次转换一层的结构。

正是有了 Fiber 的结构，React 才能有可能中断任务，由于有三个指针，才可以从暂停的任务中继续执行。
