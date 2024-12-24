import{_ as t,o as a,c as o,S as c}from"./chunks/framework.894d7ab7.js";const u=JSON.parse('{"title":"React Strict Mode 的作用","description":"为什么我的 useEffect 执行了两次","frontmatter":{"title":"React Strict Mode 的作用","description":"为什么我的 useEffect 执行了两次","date":"2023-05-03T00:55:19.000Z","tags":["React","Javascript"],"layout":"post","cover":{"image":"/vp-blog/covers/react.jpeg"}},"headers":[],"relativePath":"docs/posts/React-Strict-Mode-的作用.md","filePath":"docs/posts/React-Strict-Mode-的作用.md","lastUpdated":1735046240000}'),r={name:"docs/posts/React-Strict-Mode-的作用.md"};function d(i,e,p,s,l,n){return a(),o("div",null,e[0]||(e[0]=[c('<h2 id="前言" tabindex="-1">前言 <a class="header-anchor" href="#前言" aria-label="Permalink to &quot;前言&quot;">​</a></h2><p>目前，React 的脚手架创建出来的项目的根组件会被 StrictMode 包裹，官方的说法是它可以让我们在开发期间尽早地发现常见的 bug。</p><p>总体来说，它可以：</p><ul><li>在整个组件树中生效。</li><li>也可以让一部分组件树开启严格模式。</li><li>开发期间会有两次渲染，我们可以发现一些错误。</li><li>开发期间副作用会被重新执行，我们可以发现一些错误。</li><li>严格模式会对被弃用的 API 发出警告，我们可以做一些修改。</li></ul><h2 id="全局严格模式和局部严格模式" tabindex="-1">全局严格模式和局部严格模式 <a class="header-anchor" href="#全局严格模式和局部严格模式" aria-label="Permalink to &quot;全局严格模式和局部严格模式&quot;">​</a></h2><p>我们只需要在需要严格模式的地方，将组件用 <code>&lt;StrictMode&gt;</code> 包裹即可，其实如果我们的项目没有什么历史报复的话，我们使用全局模式即可。</p><p>是否要开启全局模式，取决与你或你的团队是否会犯一些低级错误，需不需要对即将弃用的 API 发出警告。</p><p>官方提到的注意事项是，如果一个 React App 由两个团队维护的话，需要达成共识，因为一旦启用严格模式，从启用严格模式的组件开始，其子组件是无法退出严格模式的。</p><h2 id="开发时-两次渲染" tabindex="-1">开发时，两次渲染 <a class="header-anchor" href="#开发时-两次渲染" aria-label="Permalink to &quot;开发时，两次渲染&quot;">​</a></h2><p>官方有一个犯错误的示例代码，它对 <code>props</code> 上传入的一个 <code>Array</code> 类型的数据做了 <code>push</code> 操作，严格模式的两次渲染就会 <code>push</code> 两次，我们就可以及时从界面上发现我们的错误。</p><p>这里吐槽一下，自己和身边同事还没有发现会这样写 react 代码的，但是这个作用聊胜于无吧。</p><h2 id="开发时-重新执行副作用" tabindex="-1">开发时，重新执行副作用 <a class="header-anchor" href="#开发时-重新执行副作用" aria-label="Permalink to &quot;开发时，重新执行副作用&quot;">​</a></h2><p>这就是本文标题里提到的问题。</p><p>官方的错误代码是一个连接聊天室的应用的例子，它犯的错误是没有在适合的时候断开连接。</p><p>两次执行副作用，如果我们没有在 <code>useEffect</code> 的 <code>return</code> 函数里断开连接，会导致有两次连接，真实场景下应该是会报错的，我们可以提前发现这种漏洞。</p><p>一般我们的应用会在 <code>useEffect</code> 里发送网络请求，这时候如果不知道严格模式的小伙伴可能就会慌了，以为是哪里写了 bug。</p><p>而我们如果知道了严格模式的这一现象，而且 build 后并不会有这个问题，我们就不会慌了。</p><h2 id="对被弃用的-api-发出警告" tabindex="-1">对被弃用的 API 发出警告 <a class="header-anchor" href="#对被弃用的-api-发出警告" aria-label="Permalink to &quot;对被弃用的 API 发出警告&quot;">​</a></h2><p>官方给了一些弃用的 API 作为例子，然而全都是 class 组件里的，真的已经很少用了。</p><p>我们简单了解一下严格模式的这个作用即可，如果碰到旧项目里出现问题，可以适当根据警告对代码做出修改。</p>',20)]))}const f=t(r,[["render",d]]);export{u as __pageData,f as default};
