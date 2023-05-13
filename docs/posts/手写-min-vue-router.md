---
title: 手写 min-vue-router
date: 2023-04-21 10:49:23
tags: [Vue, Vue-router]
layout: post
cover:
  image: /vp-blog/covers/vue.jpeg
---

## 前言

Vue-router 是 Vue 的官方路由，是金典的路由插件，本次挑战的是就是将官方路由模板改成使用自己编写一个简易的路由功能。


## 通过 create-vue 创建项目

```shell
pnpm create vue@3
```

这是一个在命令行中交互的方式创建 vue 项目的方式，我们只需要选择 vue-router 即可，其他 typescript、pinia 之类的我们都不需要，项目跑起来以后，我们都会把 vue-router 替换掉。

![](/resources/2023-04/07.png)

初始项目，基本上就是左边两个链接，和右边显示路由相应的页面。


## 将 vue-router 替换为 my-router

下面是模版项目的代码，我只对 `import { createRouter } from 'vue-router'` 改成了 `import { createRouter } from '../my-router'`，以及注释了 history 那一行。

在我的版本中，这次就只实现一下 history 模式的路由，所以不需要接收路由模式。

可以看到，现在和原本应用有关系的地方是 `createRouter` 方法。

```js
import { createRouter } from '../my-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  // history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router
```

而 `createRouter` 创建出来的实例又被 `app.use(router)` 的形式使用。

```js
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import './assets/main.css'

const app = createApp(App)

app.use(router)

app.mount('#app')
```


## 简单了解 app.use

我说再多都不如官网的介绍: [跳转官网](https://cn.vuejs.org/guide/reusability/plugins.html#introduction)。

简单总结就是，我们的 `router` 对象上需要一个 `install` 方法，调用 `use` 的 `app` 会作为第一个参数传给我们。

用过 vue-router 都会比较清楚，它提供了两个内置组件，`RouterLink` 和 `RouterView`，我们就可以在这个时候去注册这两个组件。

```js
import RouterLink from "./RouterLink";
import RouterView from './RouterView';
import {ref} from "vue";

export function createRouter(options) {
    const router = {
        routes: options.routes,
        current: ref(location.path || '/'),
        install(app, a) {
            const router = this;

            app
                .component('RouterLink', RouterLink)
                .component('RouterView', RouterView);

            app.config.globalProperties.$router = router;
        }
    };


    window.addEventListener('popstate', function (event) {
        router.current.value = event.state.to;
    })

    return router;
}
```

因为前面说我们实现的是 history 的模式，所以这里额外有一个对 `popstate` 的监听，这是对浏览器后退的监听，我们将跳转的路径绑定到 `router` 的 `current` 属性上。

额外提一句，如果是实现 hash 模式，在这里监听 `hashChange` 就可以，不需要在 `RouterLink` 中监听点击，会更容易实现。

注意这里使用了 `ref`，我希望它是响应式的，这会在 `router-view` 中用到。

同时，我将业务注册的 `routes`，即 `Home` 和 `About`，直接放到了 `router` 上，后面也会在 `router-view` 中用到。

最后，router 自身也通过 `app.config.globalProperties.$router` 的形式放到了 app 上，我们使用 `current` 的时候需要从这里取出。


## 编写 RouterLink 代码

一开始，我们只需要返回一个显示任意内容的组件即可，随后去页面上查看是否能够显示。

RouterLink 会有一个 `to` 参数，代表需要跳转的目标路径。还有一个 slot，一般是一段文字。

所以我们利用 `h` 函数来渲染这个组件，使用 `slots.default()` 来渲染插槽。具体代码如下：

```js
import { defineComponent, getCurrentInstance, h } from 'vue'

export default defineComponent({
    props: {
        to: {
            type: String,
            required: true
        }
    },
    setup(props, { slots }) {
        const app = getCurrentInstance()
        const { to } = props
        return function () {
            return h(
                'a',
                {
                    href: to,
                    onClick(e) {
                        e.preventDefault()
                        const data = { to }
                        history.pushState(data, '', to)
                        app.proxy.$router.current.value = to
                    }
                },
                slots.default()
            )
        }
    }
})
```

跳转时，我们禁用默认行为，改用 `pushState` 跳转，`pushState` 的第一个参数，会在 `popState` 时获得，所以它也需要记录 `to` 这个参数。

上一节提到的 `current`，我们以 `app.proxy.$router.current` 这个形式获得，在 `setup` 里可以这么获取，但是翻了官网没有看到这部分内容，后续可以再跟进一下。


## 编写 RouterView 代码

```js
import {defineAsyncComponent, defineComponent, getCurrentInstance, h, unref} from 'vue';

export default defineComponent({
    setup(props) {
        return function () {
            const app = getCurrentInstance();
            const routes = app.proxy.$router.routes;

            let component;
            for (let r of routes) {
                if (r.path === unref(app.proxy.$router.current)) {
                    component = r.component;
                    break;
                }
            }
            if (component) {
                if (typeof component === 'function') {
                    let asyncComponent = defineAsyncComponent(component);
                    return h(asyncComponent, props);
                } else {
                    return h(component, props);
                }
            } else {
                console.warn('no match route');
                return h('div');
            }

        }
    }
});
```

`RouterView` 的功能就是选择匹配的组件进行展示，如果我们得到了组件，直接传递给 `h` 函数就能渲染。

特别地，`About` 在这里是一个异步组件，我们需要先调用 `defineAsyncComponent`。

匹配的逻辑，在这里就是一个依据 `current` 简单的在数组中的查找，没有支持嵌套的逻辑。

正因为 `current` 是响应式的，我们路由在切换时，我们也能够切换组件。

一个小技巧是使用 `unref`，如果我们不确定对象是否是一个 `ref`，或者是不想写 `.value` 时可以使用。

到这里，我们的这个应用又能够切换路由显示正确的组件了。


## 总结

通过写一个简单的 vue-router，了解了其基本的原理，也学到了 vue 里不少基础的 api。

vue 和 vue-router 里依旧还有很多优秀代码值得探索，比如嵌套路由，路由钩子，动态参数等，后续可以继续学习。


