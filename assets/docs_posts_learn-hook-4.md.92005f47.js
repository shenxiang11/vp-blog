import{_ as e,o as a,c as r,V as t}from"./chunks/framework.09b837aa.js";const _=JSON.parse('{"title":"学习 React Hooks（四）","description":"useDebugValue，useDeferredValue","frontmatter":{"title":"学习 React Hooks（四）","description":"useDebugValue，useDeferredValue","date":"2023-06-04T04:08:16.000Z","tags":["React"],"layout":"post","cover":{"image":"/vp-blog/covers/react.jpeg"}},"headers":[],"relativePath":"docs/posts/learn-hook-4.md","filePath":"docs/posts/learn-hook-4.md","lastUpdated":1686389837000}'),o={name:"docs/posts/learn-hook-4.md"},s=t('<h2 id="usedebugvalue" tabindex="-1">useDebugValue <a class="header-anchor" href="#usedebugvalue" aria-label="Permalink to &quot;useDebugValue&quot;">​</a></h2><p><code>useDebugValue</code> 是一个 React Hook，可以让你在 React 开发工具 中为自定义 Hook 添加标签。</p><p>这是一个配合调试工具用的 hook，初此意外，暂时没有发现有什么特别的用处。</p><p><a href="https://zh-hans.react.dev/reference/react/useDebugValue" target="_blank" rel="noreferrer">https://zh-hans.react.dev/reference/react/useDebugValue</a></p><h2 id="usedeferredvalue" tabindex="-1">useDeferredValue <a class="header-anchor" href="#usedeferredvalue" aria-label="Permalink to &quot;useDeferredValue&quot;">​</a></h2><p><code>useDeferredValue</code> 是一个 React Hook，可以让我们延迟更新一部分 UI。</p><p>文档中举的都是输入框变更后，UI 需要重新渲染的例子，用了这个 hook，可以减少不必要的更新，需要配合 <code>memo</code>。</p><p>官网也说了它与防抖与节流的区别，它只是优化掉不必要的渲染，如果有请求发生依然会有多余的请求，这时候传统的手段还是可以使用的。</p><p><a href="https://zh-hans.react.dev/reference/react/useDeferredValue" target="_blank" rel="noreferrer">https://zh-hans.react.dev/reference/react/useDeferredValue</a></p><h2 id="useimperativehandle" tabindex="-1">useImperativeHandle <a class="header-anchor" href="#useimperativehandle" aria-label="Permalink to &quot;useImperativeHandle&quot;">​</a></h2><p><code>useImperativeHandle</code> 是 React 中的一个 Hook，它能让你自定义由 ref 暴露出来的句柄。</p><p>需要配合 <code>forwardRef</code> 使用，为了向父组件暴露自私的一些属性或方法。</p><p>官方的意见是：</p><ul><li>不要滥用 ref。</li><li>如果可以通过 prop 实现，那就不应该使用 ref。</li></ul><p>深有体会，之前项目组里有同事滥用它，刚开始命令式的方法并没有什么问题，但是最后却导致最后数据的流向非常复杂，反而导致了难以维护，而且当时的需求 props 传参完全能够满足，以后会慎用的。</p><p><a href="https://zh-hans.react.dev/reference/react/useImperativeHandle" target="_blank" rel="noreferrer">https://zh-hans.react.dev/reference/react/useImperativeHandle</a></p>',16),c=[s];function d(l,u,p,n,h,i){return a(),r("div",null,c)}const m=e(o,[["render",d]]);export{_ as __pageData,m as default};