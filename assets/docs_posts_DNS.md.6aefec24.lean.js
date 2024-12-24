import{_ as a,o as n,c as p,S as l}from"./chunks/framework.894d7ab7.js";const o="/vp-blog/assets/01.44e8ad09.png",E=JSON.parse('{"title":"了解 DNS 查询过程","description":"浏览器输入域名后的第一步","frontmatter":{"title":"了解 DNS 查询过程","description":"浏览器输入域名后的第一步","date":"2023-06-06T01:59:26.000Z","tags":["计算机"],"layout":"post","cover":{"image":"https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80"}},"headers":[],"relativePath":"docs/posts/DNS.md","filePath":"docs/posts/DNS.md","lastUpdated":1735046240000}'),e={name:"docs/posts/DNS.md"};function t(c,s,r,D,y,B){return n(),p("div",null,s[0]||(s[0]=[l('<h2 id="为什么需要域名解析" tabindex="-1">为什么需要域名解析 <a class="header-anchor" href="#为什么需要域名解析" aria-label="Permalink to &quot;为什么需要域名解析&quot;">​</a></h2><blockquote><p>网域名称（英语：Domain Name，简称：Domain），简称域名、网域，是由一串用点分隔的字符组成的互联网上某一台计算机或计算机组的名称，用于在数据传输时标识计算机的电子方位。域名可以说是一个 IP 地址的代称，目的是为了便于记忆后者。</p></blockquote><p>上方来自 wiki 的解释。</p><p>域名就像是“小明家”，而 ip 地址则是 “中国 上海市 闵行区 ...... 101 室” 这样具体的地址。</p><p>我们实际访问服务需要访问 ip 地址所代表的服务器，域名只是比起一串串数字方便我们记忆。</p><h2 id="域名的-级别" tabindex="-1">域名的“级别” <a class="header-anchor" href="#域名的-级别" aria-label="Permalink to &quot;域名的“级别”&quot;">​</a></h2><p>也是 get 到一个冷知识，域名后面是可以带一个 <code>.</code> 的，如 <code>www.baidu.com.</code>，但是百度做了限制会禁止我们访问，一般的站点是可以访问的。只是所有域名都有这么一个点，所以也就可以省略表示。</p><p>这个 <code>.</code> 就是根级别，可以称为根域名。</p><p><code>com</code> 之类的则是顶级域名。</p><p><code>baidu</code> 则是一级域名，这也是我们现如今在服务商那购买所得。</p><p>有了一级域名，我们可以在它的前面自定义二级域名，如 <code>image.baidu.com</code> 提供了图片服务，这是不需要服务商许可的。</p><h2 id="模拟查询步骤" tabindex="-1">模拟查询步骤 <a class="header-anchor" href="#模拟查询步骤" aria-label="Permalink to &quot;模拟查询步骤&quot;">​</a></h2><p>我们的操作系统上有对 DNS 查询服务器的设置，以我的系统为例。</p><p><img src="'+o+`" alt=""></p><p>我们可以把其改为任意合法的地址，比如 <code>1.1.1.1</code> 和 <code>8.8.8.8</code> 等。</p><p>我试了将其改为一个自己任意输入的值后，浏览器便不能正常访问站点了。</p><p>我们可以使用 <code>dig</code> 命令，了解这个查询的过程。</p><div class="language-bash line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">dig</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">@1.1.1.1</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">www.baidu.com</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">;</span><span style="color:#BABED8;"> &lt;&lt;&gt;&gt; </span><span style="color:#FFCB6B;">DiG</span><span style="color:#BABED8;"> </span><span style="color:#F78C6C;">9.10</span><span style="color:#C3E88D;">.6</span><span style="color:#BABED8;"> &lt;&lt;&gt;&gt; </span><span style="color:#C3E88D;">@1.1.1.1</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">www.baidu.com</span></span>
<span class="line"><span style="color:#89DDFF;">;</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">(</span><span style="color:#FFCB6B;">1</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">server</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">found</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#89DDFF;">;;</span><span style="color:#BABED8;"> </span><span style="color:#FFCB6B;">global</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">options:</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">+cmd</span></span>
<span class="line"><span style="color:#89DDFF;">;;</span><span style="color:#BABED8;"> </span><span style="color:#FFCB6B;">Got</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">answer:</span></span>
<span class="line"><span style="color:#89DDFF;">;;</span><span style="color:#BABED8;"> </span><span style="color:#FFCB6B;">-&gt;&gt;HEADER&lt;&lt;-</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">opcode:</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">QUERY,</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">status:</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">NOERROR,</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">id:</span><span style="color:#BABED8;"> </span><span style="color:#F78C6C;">23252</span></span>
<span class="line"><span style="color:#89DDFF;">;;</span><span style="color:#BABED8;"> </span><span style="color:#FFCB6B;">flags:</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">qr</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">rd</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">ra</span><span style="color:#89DDFF;">;</span><span style="color:#BABED8;"> </span><span style="color:#FFCB6B;">QUERY:</span><span style="color:#BABED8;"> </span><span style="color:#F78C6C;">1</span><span style="color:#C3E88D;">,</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">ANSWER:</span><span style="color:#BABED8;"> </span><span style="color:#F78C6C;">4</span><span style="color:#C3E88D;">,</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">AUTHORITY:</span><span style="color:#BABED8;"> </span><span style="color:#F78C6C;">0</span><span style="color:#C3E88D;">,</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">ADDITIONAL:</span><span style="color:#BABED8;"> </span><span style="color:#F78C6C;">1</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">;;</span><span style="color:#BABED8;"> </span><span style="color:#FFCB6B;">OPT</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">PSEUDOSECTION:</span></span>
<span class="line"><span style="color:#89DDFF;">;</span><span style="color:#BABED8;"> </span><span style="color:#FFCB6B;">EDNS:</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">version:</span><span style="color:#BABED8;"> </span><span style="color:#F78C6C;">0</span><span style="color:#C3E88D;">,</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">flags:</span><span style="color:#89DDFF;">;</span><span style="color:#BABED8;"> </span><span style="color:#FFCB6B;">udp:</span><span style="color:#BABED8;"> </span><span style="color:#F78C6C;">1232</span></span>
<span class="line"><span style="color:#89DDFF;">;;</span><span style="color:#BABED8;"> </span><span style="color:#FFCB6B;">QUESTION</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">SECTION:</span></span>
<span class="line"><span style="color:#89DDFF;">;</span><span style="color:#FFCB6B;">www.baidu.com.</span><span style="color:#BABED8;">			</span><span style="color:#C3E88D;">IN</span><span style="color:#BABED8;">	</span><span style="color:#C3E88D;">A</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">;;</span><span style="color:#BABED8;"> </span><span style="color:#FFCB6B;">ANSWER</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">SECTION:</span></span>
<span class="line"><span style="color:#FFCB6B;">www.baidu.com.</span><span style="color:#BABED8;">		</span><span style="color:#F78C6C;">1197</span><span style="color:#BABED8;">	</span><span style="color:#C3E88D;">IN</span><span style="color:#BABED8;">	</span><span style="color:#C3E88D;">CNAME</span><span style="color:#BABED8;">	</span><span style="color:#C3E88D;">www.a.shifen.com.</span></span>
<span class="line"><span style="color:#FFCB6B;">www.a.shifen.com.</span><span style="color:#BABED8;">	</span><span style="color:#F78C6C;">27</span><span style="color:#BABED8;">	</span><span style="color:#C3E88D;">IN</span><span style="color:#BABED8;">	</span><span style="color:#C3E88D;">CNAME</span><span style="color:#BABED8;">	</span><span style="color:#C3E88D;">www.wshifen.com.</span></span>
<span class="line"><span style="color:#FFCB6B;">www.wshifen.com.</span><span style="color:#BABED8;">	</span><span style="color:#F78C6C;">297</span><span style="color:#BABED8;">	</span><span style="color:#C3E88D;">IN</span><span style="color:#BABED8;">	</span><span style="color:#C3E88D;">A</span><span style="color:#BABED8;">	</span><span style="color:#F78C6C;">119.63</span><span style="color:#C3E88D;">.197.151</span></span>
<span class="line"><span style="color:#FFCB6B;">www.wshifen.com.</span><span style="color:#BABED8;">	</span><span style="color:#F78C6C;">297</span><span style="color:#BABED8;">	</span><span style="color:#C3E88D;">IN</span><span style="color:#BABED8;">	</span><span style="color:#C3E88D;">A</span><span style="color:#BABED8;">	</span><span style="color:#F78C6C;">119.63</span><span style="color:#C3E88D;">.197.139</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">;;</span><span style="color:#BABED8;"> </span><span style="color:#FFCB6B;">Query</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">time:</span><span style="color:#BABED8;"> </span><span style="color:#F78C6C;">186</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">msec</span></span>
<span class="line"><span style="color:#89DDFF;">;;</span><span style="color:#BABED8;"> </span><span style="color:#FFCB6B;">SERVER:</span><span style="color:#BABED8;"> </span><span style="color:#F78C6C;">1.1</span><span style="color:#C3E88D;">.1.1#53</span><span style="color:#89DDFF;">(</span><span style="color:#FFCB6B;">1.1.1.1</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#89DDFF;">;;</span><span style="color:#BABED8;"> </span><span style="color:#FFCB6B;">WHEN:</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">Tue</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">Jun</span><span style="color:#BABED8;"> </span><span style="color:#F78C6C;">06</span><span style="color:#BABED8;"> </span><span style="color:#F78C6C;">10</span><span style="color:#C3E88D;">:21:45</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">CST</span><span style="color:#BABED8;"> </span><span style="color:#F78C6C;">2023</span></span>
<span class="line"><span style="color:#89DDFF;">;;</span><span style="color:#BABED8;"> </span><span style="color:#FFCB6B;">MSG</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">SIZE</span><span style="color:#BABED8;">  </span><span style="color:#C3E88D;">rcvd:</span><span style="color:#BABED8;"> </span><span style="color:#F78C6C;">127</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br></div></div><p><code>119.63.197.151</code> 和 <code>119.63.197.139</code> 这两个查询而来的 ip 是可以直接访问百度的。需要注意时效性，这两个地址可能会被更改，但是域名不会，这也是为什么需要域名的原因。</p><h2 id="一台服务器就够做查询了吗" tabindex="-1">一台服务器就够做查询了吗？ <a class="header-anchor" href="#一台服务器就够做查询了吗" aria-label="Permalink to &quot;一台服务器就够做查询了吗？&quot;">​</a></h2><p>DNS 做的事情似乎很简单，但是全球这么多的上网设备，同时需要应对这么多的请求，再简单的服务也是压力山大。</p><p>实际上需要查询缓存和多台服务器来解决这个高并发问题。</p><p>缓存很好理解，ip 地址一般而言不会在短时间内有变动，所以比起同一个域名每次都去远程查询，不如让像浏览器这样的应用程序使用缓存机制，比如 60s 内，我们使用之前查询到的缓存，过期后再重新查询。</p><p>这样 DNS 的压力会减小不少，使用缓存也能增加网站的访问速度。当然 DNS 服务器自身也可以做自己的缓存，不需要每次都去真的执行查询逻辑。</p><p>DNS 服务器实际上不仅数量有多个，而且一般可以分成 4 类。</p><ul><li>根域名服务器：我们将域名交给它，它并不能直接返回给我们最终的 ip，而是告诉我们可以去哪几台顶级域名服务器上继续查询。</li><li>顶级域名服务器：我们可以选择其中一个继续查询，它依然返回一级域名服务器的列表让我们继续查询。</li><li>一级域名服务器： 继续查询，我们就能拿到最后的 ip 地址。（百度这个例子比较特殊，它会查询到另一个域名，我们接着查找这个域名即可）。</li></ul><p>由此可见，这个查询有一个递归查询的过程，所以为了方便还会有支持自动递归查询的服务器，就像我们一开始使用的 <code>1.1.1.1</code>。我们一般所说的 DNS 服务器也是指的它。</p><h2 id="前端网页优化" tabindex="-1">前端网页优化 <a class="header-anchor" href="#前端网页优化" aria-label="Permalink to &quot;前端网页优化&quot;">​</a></h2><p>我们可以利用如下的方式，在下面的情况下提前对某些域名做 DNS 的预解析。</p><blockquote><p>域查找可能很慢，尤其是在手机网络延迟的情况下。当有大量可能被点击的外部网站链接时，它们最相关，例如搜索引擎结果，DNS 预取提前解析域名，从而通过减少请求时与域查找相关的时间来加快加载时间。</p></blockquote><div class="language-html line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">link</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">rel</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">dns-prefetch</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">href</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">https://example.com/</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;"> /&gt;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><h2 id="关于-hosts-文件" tabindex="-1">关于 Hosts 文件 <a class="header-anchor" href="#关于-hosts-文件" aria-label="Permalink to &quot;关于 Hosts 文件&quot;">​</a></h2><blockquote><p>Hosts文件中包含了本地网络重要的主机名和地址信息，查询Hosts文件得到的结果比通过查询DNS得到的结果优先级更高。</p></blockquote><p>开发过程中，有时修改 Hosts 文件会方便我们开发。</p><p>之前没搞明白 Hosts 和 DNS 的关系，可以理解为 DNS 基本取代了 Hosts，但是实际上如果在 Hosts 中的关系存在，便不会走 DNS 查询了。</p>`,35)]))}const C=a(e,[["render",t]]);export{E as __pageData,C as default};
