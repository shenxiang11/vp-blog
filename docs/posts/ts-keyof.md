---
title: keyof 类型操作符
description: 类型体操前需要熟悉的知识点
date: 2024-04-08 23:31:14+8
tags: [Typescript]
layout: post
cover:
  image: /vp-blog/covers/ts.png
---

## `keyof` 类型操作符

`keyof` 类型操作符用于获取对象的所有键，返回一个由对象的键组成的联合类型。下方类型 `P` 和 `type P = "x" | "y"` 是相同类型。

```typescript
type Point = { x: number, y: number };
type P = keyof Point; // 'x' | 'y'
```

如果类型有一个 `string` 或 `number` 索引签名，`keyof` 会返回这些类型：

```typescript
type Arrayish = { [n: number]: unknown };
type A = keyof Arrayish; // number

type Mapish = { [k: string]: unknown };
type M = keyof Mapish; // string | number
```

在这个例子中，`M` 是 `string` 和 `number` 的联合类型，因为 JavaScript 对象的键总是字符串，所以 `obj[0]` 总是和 `obj["0""]` 是一样的。

`keyof` 类型和映射类型一起使用时会非常有用。
