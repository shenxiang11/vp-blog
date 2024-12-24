import{_ as a,o as n,c as l,S as p}from"./chunks/framework.894d7ab7.js";const B=JSON.parse('{"title":"在 Rust 中使用 Argon2 进行密码哈希处理","description":"","frontmatter":{"title":"在 Rust 中使用 Argon2 进行密码哈希处理","date":"2024-12-24T13:00:52.000Z","tags":["Rust"],"layout":"post"},"headers":[],"relativePath":"docs/在 Rust 中使用 Argon2 进行密码哈希处理.md","filePath":"docs/在 Rust 中使用 Argon2 进行密码哈希处理.md","lastUpdated":1735046240000}'),o={name:"docs/在 Rust 中使用 Argon2 进行密码哈希处理.md"};function e(r,s,t,c,D,F){return n(),l("div",null,s[0]||(s[0]=[p(`<p>在当今的软件开发中，安全地存储用户密码是至关重要的一环。Argon2 作为一种先进且安全的密码哈希函数，在 Rust 语言中也有着方便的实现，能够帮助我们有效地保护用户的密码信息。本文将详细介绍如何在 Rust 环境下使用 Argon2 来进行密码哈希及验证操作。</p><h2 id="argon2-简介" tabindex="-1">Argon2 简介 <a class="header-anchor" href="#argon2-简介" aria-label="Permalink to &quot;Argon2 简介&quot;">​</a></h2><p>Argon2 是密码学领域中备受认可的密钥派生函数，在 2015 年赢得了密码学竞赛。它通过结合内存难的计算特性、使用随机盐值以及对并行计算的抗性等特点，为密码存储提供了高强度的安全保障，能有效抵御常见的密码攻击手段，如彩虹表攻击、暴力破解攻击以及利用 GPU 加速的破解攻击等。</p><h2 id="基本使用" tabindex="-1">基本使用 <a class="header-anchor" href="#基本使用" aria-label="Permalink to &quot;基本使用&quot;">​</a></h2><h3 id="准备工作" tabindex="-1">准备工作 <a class="header-anchor" href="#准备工作" aria-label="Permalink to &quot;准备工作&quot;">​</a></h3><p>首先需要在项目的 Cargo.toml 文件中添加相应的依赖。</p><div class="language-toml line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">toml</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">[</span><span style="color:#FFCB6B;">dependencies</span><span style="color:#89DDFF;">]</span></span>
<span class="line"><span style="color:#BABED8;">argon2 </span><span style="color:#89DDFF;">=</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{</span><span style="color:#BABED8;"> version </span><span style="color:#89DDFF;">=</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">0.5.3</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#BABED8;"> features </span><span style="color:#89DDFF;">=</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">[</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">std</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">]</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h3 id="密码哈希" tabindex="-1">密码哈希 <a class="header-anchor" href="#密码哈希" aria-label="Permalink to &quot;密码哈希&quot;">​</a></h3><div class="language-rust line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">rust</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#F78C6C;">fn</span><span style="color:#BABED8;"> </span><span style="color:#82AAFF;">hash_password</span><span style="color:#89DDFF;">(</span><span style="color:#BABED8;">password</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">&amp;</span><span style="color:#FFCB6B;">str</span><span style="color:#89DDFF;">)</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">-&gt;</span><span style="color:#BABED8;"> </span><span style="color:#FFCB6B;">Result</span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">String</span><span style="color:#89DDFF;">,</span><span style="color:#BABED8;"> </span><span style="color:#FFCB6B;">AppError</span><span style="color:#89DDFF;">&gt;</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#BABED8;">    </span><span style="color:#C792EA;">let</span><span style="color:#BABED8;"> salt </span><span style="color:#89DDFF;">=</span><span style="color:#BABED8;"> </span><span style="color:#FFCB6B;">SaltString</span><span style="color:#89DDFF;">::</span><span style="color:#82AAFF;">generate</span><span style="color:#89DDFF;">(&amp;</span><span style="color:#C792EA;">mut</span><span style="color:#BABED8;"> </span><span style="color:#FFCB6B;">OsRng</span><span style="color:#89DDFF;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#BABED8;">    </span><span style="color:#C792EA;">let</span><span style="color:#BABED8;"> argon2 </span><span style="color:#89DDFF;">=</span><span style="color:#BABED8;"> </span><span style="color:#FFCB6B;">Argon2</span><span style="color:#89DDFF;">::</span><span style="color:#82AAFF;">default</span><span style="color:#89DDFF;">();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#BABED8;">    </span><span style="color:#C792EA;">let</span><span style="color:#BABED8;"> password_hash </span><span style="color:#89DDFF;">=</span><span style="color:#BABED8;"> argon2</span></span>
<span class="line"><span style="color:#BABED8;">        </span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">hash_password</span><span style="color:#89DDFF;">(</span><span style="color:#BABED8;">password</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">as_bytes</span><span style="color:#89DDFF;">(),</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">&amp;</span><span style="color:#BABED8;">salt</span><span style="color:#89DDFF;">)?</span></span>
<span class="line"><span style="color:#BABED8;">        </span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">to_string</span><span style="color:#89DDFF;">();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#BABED8;">    </span><span style="color:#FFCB6B;">Ok</span><span style="color:#89DDFF;">(</span><span style="color:#BABED8;">password_hash</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><p><code>hash_password</code> 是一个简单的函数，有令一个更复杂的 <code>hash_password_customized</code> 函数，它支持更多参数的自定义配置，它们分别影响着哈希计算的耗时、内存使用量以及多核并行计算的程度，如果你的程序有特别的需要，可以根据实际情况进行调整。</p><h3 id="密码验证" tabindex="-1">密码验证 <a class="header-anchor" href="#密码验证" aria-label="Permalink to &quot;密码验证&quot;">​</a></h3><p>当用户后续登录尝试输入密码时，需要验证输入的密码与之前存储的哈希值是否匹配。</p><p>哈希值还原密码的过程是不可逆的，因此我们无法直接比较两者是否相等，而是需要使用 Argon2 提供的 <code>verify_password</code> 方法来进行验证。</p><div class="language-rust line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">rust</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#F78C6C;">fn</span><span style="color:#BABED8;"> </span><span style="color:#82AAFF;">verify_password</span><span style="color:#89DDFF;">(</span><span style="color:#BABED8;">password</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">&amp;</span><span style="color:#FFCB6B;">str</span><span style="color:#89DDFF;">,</span><span style="color:#BABED8;"> password_hash</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">&amp;</span><span style="color:#FFCB6B;">str</span><span style="color:#89DDFF;">)</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">-&gt;</span><span style="color:#BABED8;"> </span><span style="color:#FFCB6B;">Result</span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">bool</span><span style="color:#89DDFF;">,</span><span style="color:#BABED8;"> </span><span style="color:#FFCB6B;">AppError</span><span style="color:#89DDFF;">&gt;</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#BABED8;">    </span><span style="color:#C792EA;">let</span><span style="color:#BABED8;"> argon2 </span><span style="color:#89DDFF;">=</span><span style="color:#BABED8;"> </span><span style="color:#FFCB6B;">Argon2</span><span style="color:#89DDFF;">::</span><span style="color:#82AAFF;">default</span><span style="color:#89DDFF;">();</span></span>
<span class="line"><span style="color:#BABED8;">    </span><span style="color:#C792EA;">let</span><span style="color:#BABED8;"> password_hash </span><span style="color:#89DDFF;">=</span><span style="color:#BABED8;"> </span><span style="color:#FFCB6B;">PasswordHash</span><span style="color:#89DDFF;">::</span><span style="color:#82AAFF;">new</span><span style="color:#89DDFF;">(</span><span style="color:#BABED8;">password_hash</span><span style="color:#89DDFF;">)?;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#BABED8;">    </span><span style="color:#C792EA;">let</span><span style="color:#BABED8;"> is_valid </span><span style="color:#89DDFF;">=</span><span style="color:#BABED8;"> argon2</span></span>
<span class="line"><span style="color:#BABED8;">        </span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">verify_password</span><span style="color:#89DDFF;">(</span><span style="color:#BABED8;">password</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">as_bytes</span><span style="color:#89DDFF;">(),</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">&amp;</span><span style="color:#BABED8;">password_hash</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#BABED8;">        </span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">is_ok</span><span style="color:#89DDFF;">();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#BABED8;">    </span><span style="color:#FFCB6B;">Ok</span><span style="color:#89DDFF;">(</span><span style="color:#BABED8;">is_valid</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><p>如果 <code>is_valid</code> 的值为 <code>true</code>，则表示输入的密码与存储的哈希值匹配，验证通过；否则，验证失败，说明用户输入的密码不正确。</p>`,15)]))}const i=a(o,[["render",e]]);export{B as __pageData,i as default};
