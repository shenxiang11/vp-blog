import{_ as e,o as s,c as a,V as p}from"./chunks/framework.76457b72.js";const o="/vp-blog/assets/17.f2f3755f.png",c="/vp-blog/assets/18.f43bb7e2.png",n="/vp-blog/assets/19.79408ee5.png",t="/vp-blog/assets/20.44388875.png",y=JSON.parse('{"title":"搭建 npm 私服","description":"解决一个几年前占硬盘的问题","frontmatter":{"title":"搭建 npm 私服","description":"解决一个几年前占硬盘的问题","date":"2023-07-12T02:10:51.000Z","tags":["npm","Docker"],"layout":"post","cover":{"image":"/vp-blog/covers/npm.webp"}},"headers":[],"relativePath":"docs/搭建npm私服.md","filePath":"docs/搭建npm私服.md","lastUpdated":1689134594000}'),r={name:"docs/搭建npm私服.md"},l=p('<h2 id="使用-docker-搭建私服" tabindex="-1">使用 Docker 搭建私服 <a class="header-anchor" href="#使用-docker-搭建私服" aria-label="Permalink to &quot;使用 Docker 搭建私服&quot;">​</a></h2><p>为了演示方便，我们使用 Docker 快速搭建起我们的 npm 私服。</p><p>我们使用的镜像是 <code>verdaccio/verdaccio</code>，在前私使用的就是 <code>verdaccio</code>.</p><div class="language-bash line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">docker</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">pull</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">verdaccio/verdaccio</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>接着我们以该镜像启动我们的容器，记得暴露我们的端口：<code>4873</code>。</p><p>我们访问 <code>http://0.0.0.0:4873/</code> ，可以得到如下画面。</p><p><img src="'+o+'" alt=""></p><p>我们可以快速初始化一个新的 npm 包，并创建 <code>.npmrc</code> 文件，指定其 registry 为 <code>http://0.0.0.0:4873</code>.</p><div class="language-txt line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">txt</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">registry=http://0.0.0.0:4873</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>执行 <code>npm publish</code>，报出 <code> Publishing to http://0.0.0.0:4873 with tag latest and default access</code> 的警告，我们可以发现我们已经在和私服交互了。</p><p>我们可以执行 <code>npm adduser</code> 来创建用户名和密码，然后使用 <code>npm login</code> 完成登录。</p><p>再次执行 <code>npm publish</code> 时，我们就能把我们的包发到私服上去了。</p><p><img src="'+c+'" alt=""></p><h2 id="私服大量占用硬盘的问题" tabindex="-1">私服大量占用硬盘的问题 <a class="header-anchor" href="#私服大量占用硬盘的问题" aria-label="Permalink to &quot;私服大量占用硬盘的问题&quot;">​</a></h2><p>我们前往 <code>/verdaccio/storage/data</code> 目录，查询当前的数据状况。我们可以发现当前只有我们发布的这个包。</p><p><img src="'+n+'" alt=""></p><p>我们不妨尝试安装一些依赖。我安装了 <code>react</code>、<code>vue</code>、<code>webpack</code> 等。</p><p><img src="'+t+`" alt=""></p><p>我们发现这些库同样出现在我们的数据目录当中。</p><p>如果我们的目的是搭建私服加速我们的下载，那么这种模式没有什么问题；但是如果我们想要的仅仅是使用私服管理我们公司内部的包，公有的包仍然从公网下载，这种模式就有点问题。</p><p>因为随着时间的我们安装过的包会越来越多，这个目录的大小会异常庞大，如果超过了硬盘大小，我们还需要在硬盘满发出告警时登上服务器去清理，实际这在我四年前的公司里已经发生了。所以，与其这样倒不如不让它去存储公网的包，节省我们的硬盘，节省我们的运维精力。</p><h2 id="解决" tabindex="-1">解决 <a class="header-anchor" href="#解决" aria-label="Permalink to &quot;解决&quot;">​</a></h2><p>尝试通过 <code>verdaccio</code> 配置解决缓存问题，未果。</p><p>只能通过规范使用的方式来达到公有包不走私服的目的。</p><p>我们将 <code>.npmrc</code> 做如下修改：</p><div class="language-txt line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">txt</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">registry=https://registry.npmjs.org/</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">@yupee:registry=http://0.0.0.0:4873</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>这意味着我们在发布私有包时需要额外指定 <code>registry</code>，且我们私有包应该有一个组织名称，比如示例里的 <code>@yupee</code>。</p><p>这样该组织下的包会从私服下载，公有包不会经过私服也就不会被私服缓存，这样就不用担心硬盘容量小而需要不断清理缓存了。</p>`,28),d=[l];function i(m,h,u,b,g,_){return s(),a("div",null,d)}const C=e(r,[["render",i]]);export{y as __pageData,C as default};
