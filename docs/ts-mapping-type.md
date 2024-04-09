---
title: 映射类型
date: 2024-04-09 15:12:23+8
tags: [Typescript]
layout: post
cover:
  image: /vp-blog/covers/ts.png
---

## 映射类型

当你不想重复自己时，有时一种类型需要基于另一种类型。

映射类型简历在索引签名的语法之上，索引签名用于声明尚未提前声明的属性的类型：

```typescript
type OnlyBoolsAndHorses = {
  [key: string]: boolean | Horse;
};

const conforms: OnlyBoolsAndHorses = {
  del: true,
  rodney: false,
};
```

映射类型是一种泛型类型，它使用 `PropertyKeys` 的并集（通常通过 keyof 创建）来迭代键来创建类型:

```typescript
type OptionsFlags<Type> = {
  [Property in keyof Type]: boolean;
};
```

在这个例子中，`OptionsFlags` 将会从 `Type` 类型获取属性，并将它们映射到 `boolean` 类型。

```typescript
type Features = {
  darkMode: () => void;
  newUserProfile: () => void;
};

type FeatureOptions = OptionsFlags<Features>;
// type FeatureOptions = {
//   darkMode: boolean;
//   newUserProfile: boolean;
// }
```


### 映射修改器

在映射时可以应用两个附加修饰符：`readonly` 和 `?`，分别影响可变性和可选性。

可以通过添加 `-` 或 `+` 前缀来添加或移除这些修饰符。如果没有添加前缀，则默认为 `+`。

```typescript
// 把一个类型属性上的 'readonly' 移除
type CreateMutable<Type> = {
  -readonly [Property in keyof Type]: Type[Property];
};

type LockedAccount = {
  readonly id: string;
  readonly name: string;
};

type UnlockedAccount = CreateMutable<LockedAccount>;
// type UnlockedAccount = {
//   id: string;
//   name: string;
// }
```

```typescript
// 把一个类型属性上的 '可选' 移除
type Concrete<Type> = {
  [Property in keyof Type]-?: Type[Property];
};

type MaybeUser = {
  id: string;
  name?: string;
  age?: number;
};

type User = Concrete<MaybeUser>;
// type User = {
//   id: string;
//   name: string;
//   age: number;
// }
```


## 通过 `as` 键名重映射

在 TypeScript 4.1 及更高版本中，可以使用 `as` 重新映射映射类型中的键:

```typescript
type MappedTypeWithNewProperties<Type> = {
  [Properties in keyof Type as NewKeyType]: Type[Properties];
};
```

可以利用模板文字类型从先前的属性名称创建新的属性名称：

```typescript
type Getters<Type> = {
  [Property in keyof Type as `get${Capitalize<string & Property>}`]: () => Type[Property];
};

interface Person {
  name: string;
  age: number;
  location: string;
}

type LazyPerson = Getters<Person>;
// type LazyPerson = {
//   getName: () => string;
//   getAge: () => number;
//   getLocation: () => string;
// }
```

可以通过一个条件类型提供 `never` 来过滤键名：

```typescript
type RemoveKindField<Type> = {
  [Property in keyof Type as Exclude<Property, "kind">]: Type[Property];
};

interface Circle {
  kind: "circle";
  radius: number;
}

type KindlessCircle = RemoveKindField<Circle>;
// type KindlessCircle = {
//   radius: number;
// }
```

以映射任意联合，不仅仅是 `string | number | symbol` 联合类型，而是任何类型的联合：

```typescript
type EventConfig<Events extends { kind: string }> = {
  [E in Events as E["kind"]]: (event: E) => void;
}

type SquareEvent = { kind: "square", x: number, y: number };
type CircleEvent = { kind: "circle", radius: number };

type Config = EventConfig<SquareEvent | CircleEvent>
// type Config = {
//   square: (event: SquareEvent) => void;
//   circle: (event: CircleEvent) => void;
// }
```

### 进一步探索

映射类型与类型操作部分中的其他功能配合良好，例如，这里是使用条件类型的映射类型，更具对象是否具有 `pii` 来设置 `true` 或 `false`:

````typescript
type ExtractPII<Type> = {
  [Property in keyof Type]: Type[Property] extends { pii: true } ? true : false;
};
 
type DBFields = {
  id: { format: "incrementing" };
  name: { type: string; pii: true };
};
 
type ObjectsNeedingGDPRDeletion = ExtractPII<DBFields>;
// type ObjectsNeedingGDPRDeletion = {
//   id: false;
//   name: true;
// }
````
