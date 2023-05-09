---
title: null 和 undefined 的区别：看看祖师爷是怎么说的
date: 2023-05-02 11:06:05
tags: [Javascript]
layout: post
---

## 前言：困惑的产生

平时，我们在使用 Javascript 时，`undefined` 和 `null` **几乎**没有区别。

而在使用 TS 时，我们又明确的可以知道，它们是完全两种不同的类型，不可以互相赋值，在使用时并不完全等价，这就对我们的使用造成了困惑：到底什么时候用哪个，到底有什么区别。

据我所知，目前 JS 是唯一一个拥有两个表示“空”的类型的语言。


## 了解历史

查阅了一些资料，了解到，最早的 js 的版本中，是只有 `null` 的，JS 的一些设计参照了其他语言，而 null 在类型转换时可以转换为 0。

在 C 语言中，函数执行成功或是失败是人为约定的，比如比较常见的约定是执行成功返回 0，失败则返回其他数字。

而如果我们的 JS 也是这样，null 在自动转换为 0 的时候，往往不容易发现错误。

不知道是不是这个原因，Brendan Eich 觉得 `null` 不够好， 又在后续的版本中又设计了一个 `undefined`，而且已经添加了并被广泛使用。

`undefined` 在转换成数字类型时，返回 `NaN`，这是它们直接一个明显的区别。


## 为什么大厂里不允许显示使用 `undefined`

看过一些分享，说大厂里不允许直接使用 `undefined`，而是使用 `void 0` 来代替，它的返回结果是 `undefined`。

因为，`undefined` 不是 JS 里的关键字，它是 `window.undefined`，即 window 上的一个变量，在现代的 JS 中，它被属性描述符号限制了不可修改了，避免我们犯低级错误。

而在非全局作用域下，我们依然可以 `let undefined = xxx` 这还是需要小心的，我们不妨学习大厂的做法，在 code review 时，避免团队里出现显示使用 `undefined` 的代码。

`undefined` 是一个变量，`null` 是一个关键字，这是它们的第二个区别。


## 看看祖师爷怎么说

截图是 2015 年的一则推文，地址是：https://twitter.com/BrendanEich/status/617450289889607681

![](/resources/2023-05/01.png)

大致意思是一个开发者问为什么 `typeof null` 的结果是 `object`，祖师爷首先回复了，`null` 表示 `no object`, `undefined` 表示 `no value`。

随后回答了这个问题，表示 `typeof null` 的结果是 `object` 是一个漏洞。

所以第三个区别是 `typeof null` 的结果是 `object`，而 `typeof undefined` 是 `undefined`。


## 总结：目前前端环境里的表现

我们知道：

- 转换成 bool 时，它们都是 false。
- 如果我们仅声明一个变量，未赋值，它的值是 `undefined`，对象的没有赋值的属性也是一样。
- JS 函数默认的返回值是 `undefined`。
- 原型链的终点是 `null`。
- 调用函数时，没有传入的参数会是 `undefined`。
- 在前端环境里的现成的实现里，如 `document.getElementById('')` 如果没有选择器匹配返回的是 null。这种实现和祖师爷说的是保持一致的，

甚至我们如果把 `null` 的 `typeof` 的设计缺陷，理解为 `null` 是特别的一种对象，表示这个对象不存在，是“空对象”，也是没有问题的。

再总结一下，前文提到的具体几处区别：

- `undefined` 在转换成数字类型时，回返回 `NaN`；`null` 则是 0。
- `undefined` 是一个变量，`null` 是一个关键字
- `typeof null` 的结果是 `object`，而 `typeof undefined` 是 `undefined`。

在 JS 里我们混着用并没有什么区别，但是现在我们知道了一点它们的区别，祖师爷也给出了使用的建议，我们基本上按照他的建议来使用即可。
