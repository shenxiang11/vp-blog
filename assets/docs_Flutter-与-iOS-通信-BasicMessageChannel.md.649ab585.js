import{_ as s,c as n,o as a,V as l}from"./chunks/framework.031712c0.js";const F=JSON.parse('{"title":"Flutter 与 iOS 通信: BasicMessageChannel","description":"","frontmatter":{"title":"Flutter 与 iOS 通信: BasicMessageChannel","date":"2023-04-22T12:05:00.000Z","tags":["Flutter","iOS","Swift"],"layout":"post"},"headers":[],"relativePath":"docs/Flutter-与-iOS-通信-BasicMessageChannel.md","filePath":"docs/Flutter-与-iOS-通信-BasicMessageChannel.md","lastUpdated":1683622942000}'),p={name:"docs/Flutter-与-iOS-通信-BasicMessageChannel.md"},e=l(`<h2 id="前言" tabindex="-1">前言 <a class="header-anchor" href="#前言" aria-label="Permalink to &quot;前言&quot;">​</a></h2><p><code>BasicMessageChannel</code> 是适合在 Flutter 和原生端，用于传递字符串和半结构化信息的通信方式。</p><h2 id="flutter-代码" tabindex="-1">Flutter 代码 <a class="header-anchor" href="#flutter-代码" aria-label="Permalink to &quot;Flutter 代码&quot;">​</a></h2><p>为了方便，我们直接使用 Android Studio 创建 Flutter 工程，Swift 部分也使用工程创建出来的 iOS 目录即可。</p><p>为了简单，我们的演示以传递字符串为例。</p><p>下面的代码是基于官方计数器 DEMO 修改而来，删除了注释内容，补充了 <code>BasicMessageChannel</code> 部分代码，主要关注 <code>_MyHomePageState</code> 的 <code>initState</code> 内部的 <code>setMessageHandler</code> 和后面的 <code>_sendMessage</code> 方法。</p><p>前者是处理原生端发送过来的消息，并且还可以回复一条消息给原生端。</p><p>后者是向原生端发送消息，并且可以接收到原生端对于这一条消息的回复。</p><div class="language-flutter"><button title="Copy Code" class="copy"></button><span class="lang">flutter</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">import &#39;package:flutter/material.dart&#39;;</span></span>
<span class="line"><span style="color:#A6ACCD;">import &#39;package:flutter/services.dart&#39;;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">void main() {</span></span>
<span class="line"><span style="color:#A6ACCD;">  runApp(const MyApp());</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">class MyApp extends StatelessWidget {</span></span>
<span class="line"><span style="color:#A6ACCD;">  const MyApp({Key? key}) : super(key: key);</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">  @override</span></span>
<span class="line"><span style="color:#A6ACCD;">  Widget build(BuildContext context) {</span></span>
<span class="line"><span style="color:#A6ACCD;">    return MaterialApp(</span></span>
<span class="line"><span style="color:#A6ACCD;">      title: &#39;Flutter Demo&#39;,</span></span>
<span class="line"><span style="color:#A6ACCD;">      theme: ThemeData(</span></span>
<span class="line"><span style="color:#A6ACCD;">        primarySwatch: Colors.blue,</span></span>
<span class="line"><span style="color:#A6ACCD;">      ),</span></span>
<span class="line"><span style="color:#A6ACCD;">      home: const MyHomePage(title: &#39;Flutter Demo Home Page&#39;),</span></span>
<span class="line"><span style="color:#A6ACCD;">    );</span></span>
<span class="line"><span style="color:#A6ACCD;">  }</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">class MyHomePage extends StatefulWidget {</span></span>
<span class="line"><span style="color:#A6ACCD;">  const MyHomePage({Key? key, required this.title}) : super(key: key);</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span></span>
<span class="line"><span style="color:#A6ACCD;">  final String title;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">  @override</span></span>
<span class="line"><span style="color:#A6ACCD;">  State&lt;MyHomePage&gt; createState() =&gt; _MyHomePageState();</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">class _MyHomePageState extends State&lt;MyHomePage&gt; {</span></span>
<span class="line"><span style="color:#A6ACCD;">  static const _channel = BasicMessageChannel(&quot;dev.basicMessageChannel&quot;, StringCodec());</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">  @override</span></span>
<span class="line"><span style="color:#A6ACCD;">  void initState() {</span></span>
<span class="line"><span style="color:#A6ACCD;">    super.initState();</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">    _channel.setMessageHandler((message) async {</span></span>
<span class="line"><span style="color:#A6ACCD;">      print(&quot;1. flutter receive: $message&quot;);</span></span>
<span class="line"><span style="color:#A6ACCD;">      return &quot;2. flutter reply receive&quot;;</span></span>
<span class="line"><span style="color:#A6ACCD;">    });</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">  }</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">  Future&lt;void&gt; _sendMessage() async {</span></span>
<span class="line"><span style="color:#A6ACCD;">    var message = await _channel.send(&quot;3. flutter send&quot;);</span></span>
<span class="line"><span style="color:#A6ACCD;">    print(&quot;4. flutter receive swift reply ：$message&quot;);</span></span>
<span class="line"><span style="color:#A6ACCD;">  }</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">  @override</span></span>
<span class="line"><span style="color:#A6ACCD;">  Widget build(BuildContext context) {</span></span>
<span class="line"><span style="color:#A6ACCD;">    return Scaffold(</span></span>
<span class="line"><span style="color:#A6ACCD;">      appBar: AppBar(</span></span>
<span class="line"><span style="color:#A6ACCD;">        title: Text(widget.title),</span></span>
<span class="line"><span style="color:#A6ACCD;">      ),</span></span>
<span class="line"><span style="color:#A6ACCD;">      body: Center(</span></span>
<span class="line"><span style="color:#A6ACCD;">        child: Column(</span></span>
<span class="line"><span style="color:#A6ACCD;">          mainAxisAlignment: MainAxisAlignment.center,</span></span>
<span class="line"><span style="color:#A6ACCD;">        ),</span></span>
<span class="line"><span style="color:#A6ACCD;">      ),</span></span>
<span class="line"><span style="color:#A6ACCD;">      floatingActionButton: FloatingActionButton(</span></span>
<span class="line"><span style="color:#A6ACCD;">        onPressed: _sendMessage,</span></span>
<span class="line"><span style="color:#A6ACCD;">        tooltip: &#39;Increment&#39;,</span></span>
<span class="line"><span style="color:#A6ACCD;">        child: Text(&quot;Send&quot;),</span></span>
<span class="line"><span style="color:#A6ACCD;">      ),</span></span>
<span class="line"><span style="color:#A6ACCD;">    );</span></span>
<span class="line"><span style="color:#A6ACCD;">  }</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span></code></pre></div><h2 id="swift-代码" tabindex="-1">Swift 代码 <a class="header-anchor" href="#swift-代码" aria-label="Permalink to &quot;Swift 代码&quot;">​</a></h2><p>这部分，<code>setMessageHandler</code> 同样是接收 flutter 发送过来的消息并回复。</p><p>项目启动 5s 后，主动向 flutter 发送一条消息，并且在回调中接收 flutter 对于这条消息的回复。</p><div class="language-swift"><button title="Copy Code" class="copy"></button><span class="lang">swift</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">UIKit</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Flutter</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">@</span><span style="color:#C792EA;">UIApplicationMain</span></span>
<span class="line"><span style="color:#89DDFF;">@</span><span style="color:#C792EA;">objc</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">class</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">AppDelegate</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> FlutterAppDelegate </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#C792EA;">override</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">func</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">application</span><span style="color:#89DDFF;">(</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#82AAFF;">_</span><span style="color:#A6ACCD;"> </span><span style="color:#A6ACCD;font-style:italic;">application</span><span style="color:#A6ACCD;">: UIApplication,</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#82AAFF;">didFinishLaunchingWithOptions</span><span style="color:#A6ACCD;"> </span><span style="color:#A6ACCD;font-style:italic;">launchOptions</span><span style="color:#A6ACCD;">: </span><span style="color:#89DDFF;">[</span><span style="color:#A6ACCD;">UIApplication.LaunchOptionsKey</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Any</span><span style="color:#89DDFF;">]?</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">-&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Bool</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#F78C6C;">let</span><span style="color:#A6ACCD;"> controller: FlutterViewController </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> window</span><span style="color:#89DDFF;">?</span><span style="color:#A6ACCD;">.rootViewController </span><span style="color:#89DDFF;">as!</span><span style="color:#A6ACCD;"> FlutterViewController</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#F78C6C;">let</span><span style="color:#A6ACCD;"> basicMessageChannel </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">FlutterBasicMessageChannel</span><span style="color:#89DDFF;">(</span><span style="color:#82AAFF;">name</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">dev.basicMessageChannel</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">, </span><span style="color:#82AAFF;">binaryMessenger</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> controller.binaryMessenger, </span><span style="color:#82AAFF;">codec</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> FlutterStringCodec.</span><span style="color:#82AAFF;">sharedInstance</span><span style="color:#89DDFF;">())</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">      basicMessageChannel.setMessageHandler </span><span style="color:#89DDFF;">{</span><span style="color:#A6ACCD;"> message, reply </span><span style="color:#89DDFF;font-style:italic;">in</span></span>
<span class="line"><span style="color:#A6ACCD;">          </span><span style="color:#82AAFF;">print</span><span style="color:#89DDFF;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">5. swift receive：</span><span style="color:#89DDFF;">\\(</span><span style="color:#A6ACCD;">message</span><span style="color:#89DDFF;">)</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">          </span><span style="color:#82AAFF;">reply</span><span style="color:#89DDFF;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">6. swift reply: </span><span style="color:#89DDFF;">\\(</span><span style="color:#A6ACCD;">message</span><span style="color:#89DDFF;">)</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">      DispatchQueue.main.</span><span style="color:#82AAFF;">asyncAfter</span><span style="color:#89DDFF;">(</span><span style="color:#82AAFF;">deadline</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> .</span><span style="color:#82AAFF;">now</span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">+</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">5.0</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">          basicMessageChannel.</span><span style="color:#82AAFF;">sendMessage</span><span style="color:#89DDFF;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">7. swift send</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#A6ACCD;"> message </span><span style="color:#89DDFF;font-style:italic;">in</span></span>
<span class="line"><span style="color:#A6ACCD;">              </span><span style="color:#82AAFF;">print</span><span style="color:#89DDFF;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">8. swift receive flutter reply: </span><span style="color:#89DDFF;">\\(</span><span style="color:#A6ACCD;">message</span><span style="color:#89DDFF;">)</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">          </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">      GeneratedPluginRegistrant.</span><span style="color:#82AAFF;">register</span><span style="color:#89DDFF;">(</span><span style="color:#82AAFF;">with</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> self</span><span style="color:#89DDFF;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#A6ACCD;"> super.</span><span style="color:#82AAFF;">application</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">application, </span><span style="color:#82AAFF;">didFinishLaunchingWithOptions</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> launchOptions</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span></code></pre></div><h2 id="运行起来" tabindex="-1">运行起来 <a class="header-anchor" href="#运行起来" aria-label="Permalink to &quot;运行起来&quot;">​</a></h2><p>由于修改了原生代码，我们需要执行 <code>flutter clean</code>，先用 flutter 把它运行起来，但是这样看不到原生端的日志。</p><p>又一个小技巧是我们后续从 xcode 启动项目，这样两端的日志我们都能看到。</p><p>下面我直接贴出我们项目的日志，前 5s 我们先不要点击按钮，先查看 swift 向 flutter 发送消息的情况，然后我们再点击一次按钮。</p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">flutter: 1. flutter receive: 7. swift send</span></span>
<span class="line"><span style="color:#A6ACCD;">8. swift receive flutter reply: Optional(2. flutter reply receive)</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">5. swift receive：Optional(3. flutter send)</span></span>
<span class="line"><span style="color:#A6ACCD;">4. flutter receive swift reply ：6. swift reply: Optional(3. flutter send)</span></span></code></pre></div><p>前 5s 原生发送了一条消息，所以第一条日志是 flutter 接收到了 swift 发送的消息。</p><p>随后 flutter 对消息做了回复，第二条日志表示 swift 接收到了 flutter 的回复消息。</p><p>点击按钮后，flutter 发送了一个消息，swift 接收到了。</p><p>最后，flutter 接收到了 swift 的回复消息。</p><h2 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h2><p><code>BasicMessageChannel</code> 是 Flutter 与原生最简单的通信方式，但它只能用于传递字符串和半结构化的信息，后面我们继续探索其他通信方式。</p>`,24),o=[e];function t(c,r,i,A,C,y){return a(),n("div",null,o)}const d=s(p,[["render",t]]);export{F as __pageData,d as default};
