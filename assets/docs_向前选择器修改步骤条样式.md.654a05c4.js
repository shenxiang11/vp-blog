import{_ as s,o as a,c as e,V as t}from"./chunks/framework.1200f37d.js";const n="/vp-blog/assets/23.98834b12.png",p="/vp-blog/assets/24.e761d5b8.png",o="/vp-blog/assets/25.2d5fb32e.png",l="/vp-blog/assets/26.64271025.png",y=JSON.parse('{"title":"“向前选择器“修改步骤条样式","description":":has 选择器","frontmatter":{"title":"“向前选择器“修改步骤条样式","description":":has 选择器","date":"2023-07-30T00:51:53.000Z","tags":["CSS"],"layout":"post","cover":{"image":"/vp-blog/covers/css.jpeg"}},"headers":[],"relativePath":"docs/向前选择器修改步骤条样式.md","filePath":"docs/向前选择器修改步骤条样式.md","lastUpdated":1690688711000}'),r={name:"docs/向前选择器修改步骤条样式.md"},c=t('<h2 id="ant-design-步骤条效果" tabindex="-1">Ant Design 步骤条效果 <a class="header-anchor" href="#ant-design-步骤条效果" aria-label="Permalink to &quot;Ant Design 步骤条效果&quot;">​</a></h2><p><img src="'+n+'" alt=""></p><p>上图，是 Ant Design 步骤条组件的显示效果。</p><p>可以发现，从第二步到第三步是从成功流转到失败的状态，第三步以红色显示失败，但是二三步之间的连接线仍然是表示成功的蓝色。</p><p>但是，我们 UI 的设计是这个连接线也是红色的，这就和 AntD 的设计有出入了。</p><h2 id="解决方案一" tabindex="-1">解决方案一 <a class="header-anchor" href="#解决方案一" aria-label="Permalink to &quot;解决方案一&quot;">​</a></h2><p><img src="'+p+'" alt=""></p><p>观察样式，我们可以发现，AntD 为我们在第二个节点添加了 <code>.ant-steps-next-error</code>，我们可以直接选择它，然后进行相应的样式修改。</p><h2 id="解决方案二" tabindex="-1">解决方案二 <a class="header-anchor" href="#解决方案二" aria-label="Permalink to &quot;解决方案二&quot;">​</a></h2><p><img src="'+o+`" alt=""></p><p>方案一的使用条件比较苛刻，只有在 <code>Step</code> 根组件上使用 <code>status</code> 来表示状态时，才会添加上 <code>.ant-steps-next-error</code>。且在 AntD 的移动版本中，也是没有这个样式类的。</p><p>观察上图我们发现，我们需要设置样式的第二个节点上，它的样式类和第一个节点没有区别。</p><p>这样我们就要增加限定的条件：选择后一个元素是 <code>.ant-steps-item-error</code> 的前一个 <code>.ant-steps-item-finish</code> 空间。</p><p>可以 CSS 中貌似没有可以这么向前选择的方式？</p><p>但是我们可以使用 <code>:has</code> 伪类来达成我们的目的。</p><div class="language-css line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">.</span><span style="color:#FFCB6B;">ant-steps-item-finish</span><span style="color:#89DDFF;">:</span><span style="color:#C792EA;">has</span><span style="color:#89DDFF;">(+</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">.</span><span style="color:#FFCB6B;">ant-steps-item-error</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#676E95;font-style:italic;">/*  修改具体的样式  */</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><blockquote><p>这个伪类通过把可容错相对选择器列表作为参数，提供了一种针对引用元素选择父元素或者先前的兄弟元素的方法。</p></blockquote><p>这是用这个思路在 Ant Design Mobile 上实现的效果：</p><p><img src="`+l+'" alt=""></p><h2 id="思考" tabindex="-1">思考 <a class="header-anchor" href="#思考" aria-label="Permalink to &quot;思考&quot;">​</a></h2><p>这本是一个设计问题，两种效果其实都是不错的。</p><p>前一种是只是某一步直接出错了；后一种设计更加显得是处理过程中，是整个流程出错导致最后的错误。</p><p>无论那种设计，我们前端需要用自己所学知识，灵活应对。</p>',23),i=[c];function d(_,h,m,b,g,u){return a(),e("div",null,i)}const F=s(r,[["render",d]]);export{y as __pageData,F as default};
