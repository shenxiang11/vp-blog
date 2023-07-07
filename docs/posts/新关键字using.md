---
title: 多了种声明变量的方式？
description: Typescript 5.2 的 using
date: 2023-07-06 15:46:25+8
tags: [Typescript]
layout: post
cover:
  image: /vp-blog/covers/ts-using.webp
---

## 多了种声明变量的方式

在 typescript 5.2 中，引入了新的 `using` 关键字，它是声明变量的又一种方式。

它用于声明一个对象，且对象上拥有 `Symbol.dispose` 或者 `Symbol.asyncDispose` 时，当我们这个对象离开当前作用域时，会自动调用 `dispose` 或 `asyncDispose` 方法。

它的作用非常类似于 golang 中的 defer，只不过 defer 要执行的方法书写的位置不太一样。

```ts
const getResource1 = () => {
    return {
      [Symbol.dispose]: () => {
        console.log('Hello world 1!')
      }
    }
}

const getResource2 = () => {
    return {
      [Symbol.dispose]: () => {
        console.log('Hello world 2!')
      }
    }
}

{
    using resource1 = getResource1();
    using resource2 = getResource2();
}
```


## 直接看 using 是如何执行的

我们可以在 ts 的 playground 中，直接看它的编译结果。

```js
"use strict";
var __addDisposableResource = (this && this.__addDisposableResource) || function (env, value, async) {
    if (value !== null && value !== void 0) {
        if (typeof value !== "object") throw new TypeError("Object expected.");
        var dispose;
        if (async) {
            if (!Symbol.asyncDispose) throw new TypeError("Symbol.asyncDispose is not defined.");
            dispose = value[Symbol.asyncDispose];
        }
        if (dispose === void 0) {
            if (!Symbol.dispose) throw new TypeError("Symbol.dispose is not defined.");
            dispose = value[Symbol.dispose];
        }
        if (typeof dispose !== "function") throw new TypeError("Object not disposable.");
        env.stack.push({ value: value, dispose: dispose, async: async });
    }
    else if (async) {
        env.stack.push({ async: true });
    }
    return value;
};
var __disposeResources = (this && this.__disposeResources) || (function (SuppressedError) {
    return function (env) {
        function fail(e) {
            env.error = env.hasError ? new SuppressedError(e, env.error, "An error was suppressed during disposal.") : e;
            env.hasError = true;
        }
        function next() {
            while (env.stack.length) {
                var rec = env.stack.pop();
                try {
                    var result = rec.dispose && rec.dispose.call(rec.value);
                    if (rec.async) return Promise.resolve(result).then(next, function(e) { fail(e); return next(); });
                }
                catch (e) {
                    fail(e);
                }
            }
            if (env.hasError) throw env.error;
        }
        return next();
    };
})(typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
});
const getResource1 = () => {
    return {
        [Symbol.dispose]: () => {
            console.log('Hello world 1!');
        }
    };
};
const getResource2 = () => {
    return {
        [Symbol.dispose]: () => {
            console.log('Hello world 2!');
        }
    };
};
{
    const env_1 = { stack: [], error: void 0, hasError: false };
    try {
        const resource1 = __addDisposableResource(env_1, getResource2(), false);
        const resource2 = __addDisposableResource(env_1, getResource2(), false);
    }
    catch (e_1) {
        env_1.error = e_1;
        env_1.hasError = true;
    }
    finally {
        __disposeResources(env_1);
    }
}
```

在看编译结果前，我们不妨先执行它，看我们的输出。

但是，由于全局 Symbol 上，还没有 `dispose` 和 `asyncDispose`，目前直接执行会报错，我们在执行前声明两个 Symbol 去替代，以达到执行代码的目的。

```js {3-4}
"use strict";

var SymbolAsyncDispose = Symbol()
var SymbolDispose = Symbol()

var __addDisposableResource = (this && this.__addDisposableResource) || function (env, value, async) {
    if (value !== null && value !== void 0) {
        if (typeof value !== "object") throw new TypeError("Object expected.");
        var dispose;
        if (async) {
            if (!SymbolAsyncDispose) throw new TypeError("SymbolAsyncDispose is not defined.");
            dispose = value[SymbolAsyncDispose];
        }
        if (dispose === void 0) {
            if (!SymbolDispose) throw new TypeError("SymbolDispose is not defined.");
            dispose = value[SymbolDispose];
        }
        if (typeof dispose !== "function") throw new TypeError("Object not disposable.");
        env.stack.push({ value: value, dispose: dispose, async: async });
    }
    else if (async) {
        env.stack.push({ async: true });
    }
    return value;
};
var __disposeResources = (this && this.__disposeResources) || (function (SuppressedError) {
    return function (env) {
        function fail(e) {
            env.error = env.hasError ? new SuppressedError(e, env.error, "An error was suppressed during disposal.") : e;
            env.hasError = true;
        }
        function next() {
            while (env.stack.length) {
                var rec = env.stack.pop();
                try {
                    var result = rec.dispose && rec.dispose.call(rec.value);
                    if (rec.async) return Promise.resolve(result).then(next, function(e) { fail(e); return next(); });
                }
                catch (e) {
                    fail(e);
                }
            }
            if (env.hasError) throw env.error;
        }
        return next();
    };
})(typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
});
const getResource1 = () => {
    return {
        [SymbolDispose]: () => {
            console.log('Hello world 1!');
        }
    };
};
const getResource2 = () => {
    return {
        [SymbolDispose]: () => {
            console.log('Hello world 2!');
        }
    };
};
{
    const env_1 = { stack: [], error: void 0, hasError: false };
    try {
        const resource1 = __addDisposableResource(env_1, getResource2(), false);
        const resource2 = __addDisposableResource(env_1, getResource2(), false);
    }
    catch (e_1) {
        env_1.error = e_1;
        env_1.hasError = true;
    }
    finally {
        __disposeResources(env_1);
    }
}
```

可以从下图看到，输出结果是先 2 后 1，这和 defer 非常像。

![](/resources/2023-07/04.png)

这么输出的原因是，我们后声明的一些变量，往往需要先执行销毁的操作，这在 golang 里很常见。

编译后的代码，也是使用了栈的结构来维护的，所以这么输出也就不奇怪了。

销毁的代码在 `try catch` 后的 `finally` 里执行，也告诉了我们当前版本可以这么使用来达到类似的目的。


## 和 const 一样不能重新赋值

当重新赋值时，编译器直接给出了错误。

![](/resources/2023-07/05.png)


## 思考

`Symbol.dispose` 和 `Symbol.asyncDispose` 会和 `using` 一起发布吗，如何保证兼容？

`Symbol.dispose` 和 `Symbol.asyncDispose` 对应的方法是由某个库的官方编写还是用库的用户来编写呢？

这是我的两个疑问，等待其发布后，看看是否有答案。
