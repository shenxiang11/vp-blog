import{_ as t}from"./chunks/CodeSandbox.vue_vue_type_script_setup_true_lang.9a06af8c.js";import{o as a,c as o,J as s,C as e,a as r,V as c}from"./chunks/framework.76457b72.js";const l="/vp-blog/assets/01.cda21bf3.gif",d=e("h2",{id:"前言",tabindex:"-1"},[r("前言 "),e("a",{class:"header-anchor",href:"#前言","aria-label":'Permalink to "前言"'},"​")],-1),i=e("p",null,[e("img",{src:l,alt:""})],-1),n=e("p",null,"就像图中你所看到的，该网站导航栏处，给它下方的滚动的元素添加了一个比较炫酷的效果。",-1),_=e("p",null,"CSS 有个很多效果并不需要很多知识，但是开发人员往往很难想到，这次目标就是模仿一下这个效果。",-1),p=c('<h2 id="原理简单介绍" tabindex="-1">原理简单介绍 <a class="header-anchor" href="#原理简单介绍" aria-label="Permalink to &quot;原理简单介绍&quot;">​</a></h2><p>首先介绍一下 <code>radial-gradient</code>，创建一个图像，该图像由从原点辐射的两种或多种颜色之间的渐进过渡组成。它的形状可以是圆形或椭圆形。</p><p>我们使用它在 4x4 的界面上，绘制一个 1x1 的透明的圆圈，然后将它平铺到整个导航栏，这是我们可以透过导航栏看到下面元素的原因。</p><p>最后，是使用 <code>backdrop-filter</code>，它可以让你为一个元素后面区域添加图形效果（如模糊或颜色偏移）。</p><p>因为它适用于元素背后的所有元素，为了看到效果，必须使元素或其背景至少部分透明，我们前一步刚好有一部分是透明的。</p><p>具体应用的图形效果，<code>blur</code> 是高斯模糊，<code>saturate</code> 是修改图像饱和度，你可以在 <a href="https://developer.mozilla.org/zh-CN/docs/Web/CSS/filter" target="_blank" rel="noreferrer">MDN</a> 看看设置它们的效果。</p>',6),P=JSON.parse('{"title":"Element Plus 文档导航效果模仿","description":"","frontmatter":{"title":"Element Plus 文档导航效果模仿","date":"2023-04-13T00:25:19.000Z","tags":["CSS"],"layout":"post","cover":{"image":"/vp-blog/covers/css.jpeg"}},"headers":[],"relativePath":"docs/posts/Element-Plus-文档导航效果模仿.md","filePath":"docs/posts/Element-Plus-文档导航效果模仿.md","lastUpdated":1687928473000}'),h={name:"docs/posts/Element-Plus-文档导航效果模仿.md"},S=Object.assign(h,{setup(m){return(u,f)=>(a(),o("div",null,[d,i,n,_,s(t,{src:"https://codesandbox.io/embed/hopeful-rgb-c1eps8?fontsize=14&hidenavigation=1&theme=dark&view=preview"}),p]))}});export{P as __pageData,S as default};
