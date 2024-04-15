---
title: 索引访问类型
date: 2024-04-15 22:09:42+8
tags: [Typescript]
layout: post
cover:
  image: /vp-blog/covers/ts.png
---

可以使用索引访问类型来查询另一个类型的指定属性：

```typescript
type Person = { age: number; name: string; alive: boolean };
type Age = Person["age"];
// type Age = number
```

索引类型是一个类型，所以我们可以使用联合类型：

```typescript
type I1 = Person["age" | "name"];
// type I1 = string | number

type I2 = Person[keyof Person];
// type I2 = string | number | boolean

type AliveOrName = "alive" | "name";
type I3 = Person[AliveOrName];
// type I3 = string | boolean
```

试图使用不存在的索引属性时会报错：

```typescript
type I4 = Person["alve"];
// Error: Property 'alve' does not exist on type 'Person'.
```

使用 `number` 获取数组元素的类型。可以将其与 `typeof` 方便地结合使用：

```typescript
const MyArray = [
  { name: "Alice", age: 15 },
  { name: "Bob", age: 23 },
  { name: "Eve", age: 38 },
];
type Person = typeof MyArray[number];
// type Person = {
//   name: string;
//   age: number;
// }

type Age = typeof MyArray[number]["age"];
// type Age = number

// Or
type Age2 = Person["age"];
// type Age2 = number
```

只能在索引时使用类型，这意味着不能使用变量：

```typescript
const key = "age";
type Age = Person[key];
// Error: Type 'key' cannot be used as an index type.
// 'key' refers to a value, but is being used as a type here. Did you mean 'typeof key'?
```

但是可以使用类型别名:

```typescript
type Key = "age";
type Age = Person[Key];
```
