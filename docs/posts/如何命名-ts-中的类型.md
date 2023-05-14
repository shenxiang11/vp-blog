---
title: 如何命名 ts 中的类型
date: 2023-04-16 13:12:16+8
tags: [Typescript]
layout: post
cover:
  image: /vp-blog/covers/ts.png
---

## 不要使用复数形式，除非它真的是一个数组

```typescript
// bad
type Routes = "/user" | "/admin/user" | "/admin";

const goToRoute = (route: Routes) => {
    
}
```

```typescript
// good
type Route = "/user" | "/admin/user" | "/admin";

const goToRoute = (route: Route) => {
    
}
```

上方的 `goToRoute` 接收一个 `Routes` 会变得很奇怪，而且 `Route` 如果组成数组，它的类型是 `Route[]`，我们可以使用类型别名 `type Routes = Route[]` 来代替。


## 在变量名和类型之间，注意区分大小写，这样有助于语法高亮

```typescript
// bad
type route = "/user" | "/admin/user" | "/admin";

const route: route = '/user';
```

```typescript
// good
type Route = "/user" | "/admin/user" | "/admin";

const route: Route = '/user';
```

有时候，编辑器可能会混淆类型和变量名，使得编辑器的提示不正确。


## 使用有意义的泛型名称

```typescript
// bad
export type Response<T, U> = {
    data: T;
    error: U;
} 
```

```typescript
// good
export type Response<TData, UError> = {
    data: TData;
    error: UError;
} 
```

这样，类型的定义与作用会更加清晰明确，便于阅读。


## 不需要使用前缀来描述类型是通过 `type` 或者 `interface` 定义的

```typescript
// bad
type TUser = {
    id: string;
    name: string;
}

interface IOriganization {
    id: string;
    name: string;
}
```

```typescript
// good
type User = {
    id: string;
    name: string;
}

interface Origanization {
    id: string;
    name: string;
}
```

想像一下，如果我们像重构 `IOriganization` 到 `TOriganization`，就需要修改程序用到的每一处，如果没有前缀的话，我们只需要修改类型定义的地方。
