import{_ as a,o as n,c as l,S as e}from"./chunks/framework.894d7ab7.js";const b=JSON.parse('{"title":"使用 wrk 进行压测","description":"","frontmatter":{"title":"使用 wrk 进行压测","date":"2025-01-06T14:25:07.000Z","tags":[],"layout":"post","cover":{"image":"/vp-blog/covers/rust.png"}},"headers":[],"relativePath":"docs/wrk.md","filePath":"docs/wrk.md","lastUpdated":1736174585000}'),p={name:"docs/wrk.md"};function o(r,s,t,c,i,u){return n(),l("div",null,s[0]||(s[0]=[e(`<h2 id="wrk-简介" tabindex="-1">wrk 简介 <a class="header-anchor" href="#wrk-简介" aria-label="Permalink to &quot;wrk 简介&quot;">​</a></h2><p>在性能测试领域，wrk 是一款备受青睐的强大工具，它能够帮助我们精准地评估系统在高并发场景下的表现。</p><h2 id="例子" tabindex="-1">例子 <a class="header-anchor" href="#例子" aria-label="Permalink to &quot;例子&quot;">​</a></h2><p>首先准备一段 lua 脚本，在这个例子中，测试的对象是一个 Graphql 的 Query 查询。</p><div class="language-lua line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">lua</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">local</span><span style="color:#BABED8;"> body </span><span style="color:#89DDFF;">=</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">[[</span></span>
<span class="line"><span style="color:#C3E88D;">    {&quot;query&quot;:&quot;query Note($id: Int!) {\\n    result: publishedNote(id: $id) {\\n        id\\n        title\\n        content\\n        type\\n        images\\n        video\\n        updatedAt\\n        views\\n    }\\n}&quot;,&quot;variables&quot;:{&quot;id&quot;:19}}</span></span>
<span class="line"><span style="color:#89DDFF;">]]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">local</span><span style="color:#BABED8;"> headers </span><span style="color:#89DDFF;">=</span><span style="color:#BABED8;"> {</span></span>
<span class="line"><span style="color:#BABED8;">    [</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">Content-Type</span><span style="color:#89DDFF;">&quot;</span><span style="color:#BABED8;">] </span><span style="color:#89DDFF;">=</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">application/json</span><span style="color:#89DDFF;">&quot;</span><span style="color:#BABED8;">,</span></span>
<span class="line"><span style="color:#BABED8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">function</span><span style="color:#BABED8;"> </span><span style="color:#82AAFF;">request</span><span style="color:#89DDFF;">()</span></span>
<span class="line"><span style="color:#BABED8;">    </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#BABED8;"> wrk.</span><span style="color:#82AAFF;">format</span><span style="color:#BABED8;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">POST</span><span style="color:#89DDFF;">&quot;</span><span style="color:#BABED8;">, </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">/graphql</span><span style="color:#89DDFF;">&quot;</span><span style="color:#BABED8;">, headers, body)</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">end</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><p>然后使用 wrk 进行压测：</p><div class="language-bash line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">wrk</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">-t12</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">-c400</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">-d30s</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">-s</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">query.lua</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">http://localhost:3000</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>通过 <code>-s</code> 我们可以指定我们的 lua 脚本，像测试 Graphql 这种复杂的请求，我们可以通过 lua 脚本来测试可以更加灵活，甚至可以指定 Bearer Token 已应对需要鉴权的情况。</p><h2 id="参数说明" tabindex="-1">参数说明 <a class="header-anchor" href="#参数说明" aria-label="Permalink to &quot;参数说明&quot;">​</a></h2><p>以下是对 wrk 一些常用参数的详细介绍：</p><ul><li>-c 或 --connections：指的是要保持打开的 HTTP 连接总数，每个线程负责处理的连接数 N 等于总连接数除以线程数。这一参数用于设定并发连接的规模，通过调整它可以模拟不同程度的并发压力，例如设置较大的值能测试系统在高并发连接场景下的性能表现。</li><li>-d 或 --duration：代表测试的持续时间，格式诸如 2s（2 秒）、2m（2 分钟）、2h（2 小时）等。它决定了 wrk 向目标发送请求并收集数据的时长，根据测试需求，可灵活指定短时间的快速测试或长时间的稳定性测试。</li><li>-t 或 --threads：用于设置总共要使用的线程数。线程数的多少会影响压测的效率与资源利用情况，合理配置线程数，结合连接数等参数，能够精准模拟出不同负载模式，让测试结果更贴合实际业务场景。</li><li>-s 或 --script：指定 LuaJIT 脚本，详情可查看 SCRIPTING。正如前文提到的利用 Lua 脚本定制化请求，此参数就是用来引入这些脚本，实现复杂业务场景下的精准压测，满足多样化的测试需求。</li><li>-H 或 --header：用于向请求添加 HTTP 头信息，例如 &quot;User-Agent: wrk&quot;。在与不同的服务交互时，可能需要特定的请求头来确保服务端正确识别、处理请求，该参数提供了这种灵活配置的能力。</li><li>--latency：若指定此参数，wrk 将会打印详细的延迟统计信息，这些信息对于深入分析系统响应的及时性、稳定性非常关键，能帮助我们找出系统在处理请求过程中的潜在瓶颈。</li><li>--timeout：如果在设定的这个时间范围内没有收到响应，wrk 就会记录一次超时。这有助于监控系统在规定时间内处理请求的能力，避免出现长时间无响应的情况，确保系统的高效运行。</li></ul><h2 id="测试输出" tabindex="-1">测试输出 <a class="header-anchor" href="#测试输出" aria-label="Permalink to &quot;测试输出&quot;">​</a></h2><p>wrk 在测试结束后会输出类似如下的信息：</p><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">Running 20s test @ https://localhost:8000</span></span>
<span class="line"><span style="color:#babed8;">  4 threads and 1000 connections</span></span>
<span class="line"><span style="color:#babed8;">  Thread Stats   Avg      Stdev     Max   +/- Stdev</span></span>
<span class="line"><span style="color:#babed8;">    Latency     1.55s    84.98ms   1.78s    81.12%</span></span>
<span class="line"><span style="color:#babed8;">    Req/Sec   318.82    303.13     1.10k    66.86%</span></span>
<span class="line"><span style="color:#babed8;">  12017 requests in 20.10s, 4.25MB read</span></span>
<span class="line"><span style="color:#babed8;">  Socket errors: connect 834, read 0, write 0, timeout 0</span></span>
<span class="line"><span style="color:#babed8;">Requests/sec:    597.87</span></span>
<span class="line"><span style="color:#babed8;">Transfer/sec:    216.61KB</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><ul><li>Requests/sec: 每秒实际完成的请求数（RPS）</li><li>Latency: 平均延迟</li></ul>`,15)]))}const y=a(p,[["render",o]]);export{b as __pageData,y as default};
