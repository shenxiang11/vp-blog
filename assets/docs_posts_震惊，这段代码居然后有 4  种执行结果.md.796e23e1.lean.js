import{_ as a,o as n,c as l,S as p}from"./chunks/framework.894d7ab7.js";const D=JSON.parse('{"title":"震惊，这段代码居然有 4 种执行结果","description":"","frontmatter":{"title":"震惊，这段代码居然有 4 种执行结果","date":"2023-05-05T04:14:39.000Z","tags":["Javascript"],"layout":"post","cover":{"image":"/vp-blog/covers/js.png"}},"headers":[],"relativePath":"docs/posts/震惊，这段代码居然后有 4  种执行结果.md","filePath":"docs/posts/震惊，这段代码居然后有 4  种执行结果.md","lastUpdated":1735046240000}'),o={name:"docs/posts/震惊，这段代码居然后有 4  种执行结果.md"};function e(r,s,c,t,F,y){return n(),l("div",null,s[0]||(s[0]=[p(`<h2 id="题目" tabindex="-1">题目 <a class="header-anchor" href="#题目" aria-label="Permalink to &quot;题目&quot;">​</a></h2><div class="language-javascript line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#C792EA;">var</span><span style="color:#BABED8;"> a </span><span style="color:#89DDFF;">=</span><span style="color:#BABED8;"> </span><span style="color:#F78C6C;">0</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">if</span><span style="color:#BABED8;"> (</span><span style="color:#FF9CAC;">true</span><span style="color:#BABED8;">) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#BABED8;">a</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">1</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#C792EA;">function</span><span style="color:#F07178;"> </span><span style="color:#82AAFF;">a</span><span style="color:#89DDFF;">()</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">3</span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#BABED8;">a</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">2</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#BABED8;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#F07178;">(</span><span style="color:#BABED8;">a</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#BABED8;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#BABED8;">(a)</span><span style="color:#89DDFF;">;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p>问题是问两个打印机处的 a 会是什么？</p><p>直觉上我们可能会答：2 和 2，可是在我们熟悉的 chrome 中，结果居然是 2 和 1。</p><p>其实还有人说过，在 safari 中，结果是 2 和 2。没想到，最懂我的还是 safari。</p><p>我自己额外还发现了两种不同情况，如果加上严格模式，结果是 2 和 0；在带有编译环境的情况下，执行结果会是 2 和 <code>ƒ () { return 3; }</code>。</p><h2 id="这段代码的问题" tabindex="-1">这段代码的问题 <a class="header-anchor" href="#这段代码的问题" aria-label="Permalink to &quot;这段代码的问题&quot;">​</a></h2><p>这段代码既然我们可能怎么答都不可能答对，不如贬低一下它。</p><ul><li>不应该使用 var</li><li>不应该把函数声明为和原本变量名一样</li><li>不应该在一个条件里，使用 function 去声明函数（应该使用函数表达式）</li></ul><p>关于这里的第三点，我们可以从 <a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/function#%E6%9C%89%E6%9D%A1%E4%BB%B6%E7%9A%84%E5%88%9B%E5%BB%BA%E5%87%BD%E6%95%B0" target="_blank" rel="noreferrer">MDN</a> 上找到说法: “这种声明方式在不同的浏览器里可能有不同的效果”。</p><p>我们也就可以稍稍理解为什么 chrome 和 safari 的不同结果了。</p><h2 id="调试技巧" tabindex="-1">调试技巧 <a class="header-anchor" href="#调试技巧" aria-label="Permalink to &quot;调试技巧&quot;">​</a></h2><p>其实我如果我们真的想弄明白执行结果，可以采用单步执行查看调用时产生的作用域变量就可以。</p><p>针对有编译环境的代码，我们可以直接查看其编译结果，这个相对容易，我们先说这一点。</p><h2 id="编译环境-输出-2-和-function" tabindex="-1">编译环境：输出 2 和 function <a class="header-anchor" href="#编译环境-输出-2-和-function" aria-label="Permalink to &quot;编译环境：输出 2 和 function&quot;">​</a></h2><p>我使用的环境是 vite，只引入了我们题目的代码，编译结果如下：</p><div class="language-javascript line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#C792EA;">var</span><span style="color:#BABED8;"> a </span><span style="color:#89DDFF;">=</span><span style="color:#BABED8;"> </span><span style="color:#F78C6C;">0</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">if</span><span style="color:#BABED8;"> (</span><span style="color:#FF9CAC;">true</span><span style="color:#BABED8;">) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#C792EA;">let</span><span style="color:#F07178;"> </span><span style="color:#BABED8;">a2</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#C792EA;">function</span><span style="color:#89DDFF;">()</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">3</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">};</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#C792EA;">var</span><span style="color:#F07178;"> </span><span style="color:#BABED8;">a</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#BABED8;">a2</span><span style="color:#89DDFF;">;</span><span style="color:#F07178;"> </span><span style="color:#676E95;font-style:italic;">// 这里会导致最终 a 是个 函数</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#BABED8;">a2</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">1</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#BABED8;">a2</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">2</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#BABED8;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#F07178;">(</span><span style="color:#BABED8;">a2</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#BABED8;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#BABED8;">(a)</span><span style="color:#89DDFF;">;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><p>我们发现由于编译的介入，函数已经被转换成了表达式，而且命名也被替换了，这一没有必要单步执行，按照一行一行执行，结果是 2 和 function 的打印。</p><h2 id="safari-下单步调试" tabindex="-1">safari 下单步调试 <a class="header-anchor" href="#safari-下单步调试" aria-label="Permalink to &quot;safari 下单步调试&quot;">​</a></h2><p>我们直接在控制台下输入：</p><div class="language-javascript line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#F78C6C;">debugger</span></span>
<span class="line"><span style="color:#C792EA;">var</span><span style="color:#BABED8;"> a </span><span style="color:#89DDFF;">=</span><span style="color:#BABED8;"> </span><span style="color:#F78C6C;">0</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">if</span><span style="color:#BABED8;"> (</span><span style="color:#FF9CAC;">true</span><span style="color:#BABED8;">) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#BABED8;">a</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">1</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#C792EA;">function</span><span style="color:#F07178;"> </span><span style="color:#82AAFF;">a</span><span style="color:#89DDFF;">()</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">3</span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#BABED8;">a</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">2</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#BABED8;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#F07178;">(</span><span style="color:#BABED8;">a</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#BABED8;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#BABED8;">(a)</span><span style="color:#89DDFF;">;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><p>safari 做了函数的提升，最早 a 是一个 function。</p><p>执行完 <code>var a = 0</code>, a 变成 0。</p><p>后续两次打印是 a 都是 2。</p><h2 id="chrome-非严格模式" tabindex="-1">chrome 非严格模式 <a class="header-anchor" href="#chrome-非严格模式" aria-label="Permalink to &quot;chrome 非严格模式&quot;">​</a></h2><p>我们把同样的代码粘贴到 chrome 控制台运行。</p><p>刚进入 if 时，global 下的 a 是 0，block 下的 a 是 function。</p><p>执行到第一次输出时，global 下的 a 是 1，block 下的 a 是 2。这里不知道什么时候全局下的 a 变成 1 的，深究下去也没有意义，这也正是不符合我们直觉的地方。</p><p>所以最后的输出是 2 和 1。</p><h2 id="chrome-严格模式-safari-同样的执行结果-只看一下-chrome" tabindex="-1">chrome 严格模式 (safari 同样的执行结果，只看一下 chrome) <a class="header-anchor" href="#chrome-严格模式-safari-同样的执行结果-只看一下-chrome" aria-label="Permalink to &quot;chrome 严格模式 (safari 同样的执行结果，只看一下 chrome)&quot;">​</a></h2><p>同样的代码，我们只加上严格模式：</p><div class="language-javascript line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">use strict</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F78C6C;">debugger</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#C792EA;">var</span><span style="color:#BABED8;"> a </span><span style="color:#89DDFF;">=</span><span style="color:#BABED8;"> </span><span style="color:#F78C6C;">0</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">if</span><span style="color:#BABED8;"> (</span><span style="color:#FF9CAC;">true</span><span style="color:#BABED8;">) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#BABED8;">a</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">1</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#C792EA;">function</span><span style="color:#F07178;"> </span><span style="color:#82AAFF;">a</span><span style="color:#89DDFF;">()</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">3</span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#BABED8;">a</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">2</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#BABED8;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#F07178;">(</span><span style="color:#BABED8;">a</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#BABED8;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#BABED8;">(a)</span><span style="color:#89DDFF;">;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><p>同样的方式，查看调用栈，严格模式下，global 下的 a 不会莫名地变成 1，依然保持 0。</p><p>所以输出 2 和 0。</p><h2 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h2><p>纠结输出什么其实没有意义，这道题在我的实验环境下就有 4 中输出。</p><p>给我们的唯一作用就是警示我们写出符合规范的代码。</p>`,37)]))}const b=a(o,[["render",e]]);export{D as __pageData,b as default};
