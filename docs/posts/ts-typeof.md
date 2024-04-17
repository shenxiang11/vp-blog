---
title: Typeof 类型操作符
description: 类型体操前需要熟悉的知识点
date: 2024-04-14 20:29:44+8
tags: [Typescript]
layout: post
cover:
  image: /vp-blog/covers/ts.png
---

## `typeof` 类型操作符

JavaScript 已经有了 `typeof` 操作符，可以在表达式上下文中使用：

```typescript
// 输出 "string"
console.log(typeof "Hello world");
```

在 TypeScript 中，`typeof` 也可以用于类型操作符，用于获取变量的类型：

```typescript
let s = "hello";
let n: typeof s;
// let n: string;
```

对于基础类型，这不是非常有效，但是对于复杂类型，这是非常有用的，你可以使用 `typeof` 方便地表达许多情况。比如，以预先定义好的类型 `ReturnType<T>` 开始。它接收一个函数类型得到它的返回值类型：

```typescript
type Predicate = (x: unknown) => boolean;
type K = ReturnType<Predicate>;
// type K = boolean
```

如果在函数名上使用 `ReturnType`, 会得到一个错误：

```typescript
function f() {
  return { x: 10, y: 3 };
}

type P = ReturnType<f>;
// Error: 'f' refers to a value, but is being used as a type here. Did you mean 'typeof f'?
```

要记得类型和值不是同一件事。为了指值代表的类型，需要使用 `typeof`：

```typescript
function f() {
  return { x: 10, y: 3 };
}

type P = ReturnType<typeof f>;
```

### 限制

TypeScript 有意地限制了可以使用 `typeof` 的表达式。

特比的，它只可以合法地在标识符上使用（如：变量名）或它们地属性。这可以避免令人困惑的代码执行情况，而不是：

```typescript
// 想使用 ReturnType<typeof msgbox>

let shouldContinue: typeof msgbox("Are you sure you want to continue?");
// ',' expected.
```
