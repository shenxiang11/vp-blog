import{_ as s,c as n,o as a,V as l}from"./chunks/framework.031712c0.js";const p="/vp-blog/assets/08.952803ad.gif",d=JSON.parse('{"title":"Flutter 与 iOS 通信：MethodChannel","description":"","frontmatter":{"title":"Flutter 与 iOS 通信：MethodChannel","date":"2023-04-23T10:38:44.000Z","tags":["Flutter","iOS","Swift"],"layout":"post"},"headers":[],"relativePath":"docs/Flutter-与-iOS-通信：MethodChannel.md","filePath":"docs/Flutter-与-iOS-通信：MethodChannel.md","lastUpdated":1683622942000}'),e={name:"docs/Flutter-与-iOS-通信：MethodChannel.md"},o=l(`<h2 id="前言" tabindex="-1">前言 <a class="header-anchor" href="#前言" aria-label="Permalink to &quot;前言&quot;">​</a></h2><p>之前分享了 <code>BasicMessageChannel</code>，看了官网了解到，它其实是最基础的一种方式，支持自定义消息的编解码器进行基本的异步消息传输。</p><p>一般的，我们使用 <code>MethodChannel</code>，也能达到 Flutter 请求调用原生方法，原生返回调用结果给 Flutter 的目的。</p><p>不得不说，Flutter 官网文档的例子十分地清楚，我从网站上跟随它的获取电池电量的例子，一次就成功了，下面就贴出代码，简单了解一下它的使用方式。</p><h2 id="代码" tabindex="-1">代码 <a class="header-anchor" href="#代码" aria-label="Permalink to &quot;代码&quot;">​</a></h2><p>创建 channel 的方式几乎和之前没有任何区别。通过 <code>channel.invoke(xxx)</code> 即可调用原生方法。</p><div class="language-flutter"><button title="Copy Code" class="copy"></button><span class="lang">flutter</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">import &#39;package:flutter/material.dart&#39;;</span></span>
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
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">  final String title;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">  @override</span></span>
<span class="line"><span style="color:#A6ACCD;">  State&lt;MyHomePage&gt; createState() =&gt; _MyHomePageState();</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">class _MyHomePageState extends State&lt;MyHomePage&gt; {</span></span>
<span class="line"><span style="color:#A6ACCD;">  String _batteryLevel = &#39;Unkown battery level.&#39;;</span></span>
<span class="line"><span style="color:#A6ACCD;">  static const _channel = MethodChannel(&quot;dev.battery.MethodChannel&quot;);</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">  Future&lt;void&gt; _getBatteryLevel() async {</span></span>
<span class="line"><span style="color:#A6ACCD;">    String batteryLevel;</span></span>
<span class="line"><span style="color:#A6ACCD;">    try {</span></span>
<span class="line"><span style="color:#A6ACCD;">      final int result = await _channel.invokeMethod(&quot;getBatteryLevel&quot;);</span></span>
<span class="line"><span style="color:#A6ACCD;">      batteryLevel = &quot;Battery level at $result %.&quot;;</span></span>
<span class="line"><span style="color:#A6ACCD;">    } on PlatformException catch (e) {</span></span>
<span class="line"><span style="color:#A6ACCD;">      batteryLevel = &quot;Failed to get battery level: \${e.message}&quot;;</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">    setState(() {</span></span>
<span class="line"><span style="color:#A6ACCD;">      _batteryLevel = batteryLevel;</span></span>
<span class="line"><span style="color:#A6ACCD;">    });</span></span>
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
<span class="line"><span style="color:#A6ACCD;">          children: [</span></span>
<span class="line"><span style="color:#A6ACCD;">            Text(_batteryLevel)</span></span>
<span class="line"><span style="color:#A6ACCD;">          ],</span></span>
<span class="line"><span style="color:#A6ACCD;">        ),</span></span>
<span class="line"><span style="color:#A6ACCD;">      ),</span></span>
<span class="line"><span style="color:#A6ACCD;">      floatingActionButton: FloatingActionButton(</span></span>
<span class="line"><span style="color:#A6ACCD;">        onPressed: _getBatteryLevel,</span></span>
<span class="line"><span style="color:#A6ACCD;">        tooltip: &#39;Increment&#39;,</span></span>
<span class="line"><span style="color:#A6ACCD;">        child: Text(&quot;电量&quot;),</span></span>
<span class="line"><span style="color:#A6ACCD;">      ),</span></span>
<span class="line"><span style="color:#A6ACCD;">    );</span></span>
<span class="line"><span style="color:#A6ACCD;">  }</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span></code></pre></div><p>相应地，原生端建立同名的 channel，通过 <code>setMethodCallHandler</code> 根据调用的方法名调用原生方法即可，通过 <code>result</code> 将调用结果返回。</p><div class="language-swift"><button title="Copy Code" class="copy"></button><span class="lang">swift</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">UIKit</span></span>
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
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#F78C6C;">let</span><span style="color:#A6ACCD;"> batteryChannel </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">FlutterMethodChannel</span><span style="color:#89DDFF;">(</span><span style="color:#82AAFF;">name</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">dev.battery.MethodChannel</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">, </span><span style="color:#82AAFF;">binaryMessenger</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> controller.binaryMessenger</span><span style="color:#89DDFF;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">      batteryChannel.setMethodCallHandler </span><span style="color:#89DDFF;">{</span><span style="color:#A6ACCD;"> call, result </span><span style="color:#89DDFF;font-style:italic;">in</span></span>
<span class="line"><span style="color:#A6ACCD;">          </span><span style="color:#89DDFF;font-style:italic;">guard</span><span style="color:#A6ACCD;"> call.method </span><span style="color:#89DDFF;">==</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">getBatteryLevel</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">else</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">              </span><span style="color:#82AAFF;">result</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">FlutterMethodNotImplemented</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">              </span><span style="color:#89DDFF;font-style:italic;">return</span></span>
<span class="line"><span style="color:#A6ACCD;">          </span><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">          self.</span><span style="color:#82AAFF;">receiveBatteryLevel</span><span style="color:#89DDFF;">(</span><span style="color:#82AAFF;">result</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> result</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">      GeneratedPluginRegistrant.</span><span style="color:#82AAFF;">register</span><span style="color:#89DDFF;">(</span><span style="color:#82AAFF;">with</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> self</span><span style="color:#89DDFF;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#A6ACCD;"> super.</span><span style="color:#82AAFF;">application</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">application, </span><span style="color:#82AAFF;">didFinishLaunchingWithOptions</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> launchOptions</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F78C6C;">private</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">func</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">receiveBatteryLevel</span><span style="color:#89DDFF;">(</span><span style="color:#82AAFF;font-style:italic;">result</span><span style="color:#A6ACCD;">: FlutterResult</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#F78C6C;">let</span><span style="color:#A6ACCD;"> device </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> UIDevice.current</span></span>
<span class="line"><span style="color:#A6ACCD;">        device.isBatteryMonitoringEnabled </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#FF9CAC;">true</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;font-style:italic;">if</span><span style="color:#A6ACCD;"> device.batteryState </span><span style="color:#89DDFF;">==</span><span style="color:#A6ACCD;"> UIDevice.BatteryState.unknown </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">            </span><span style="color:#82AAFF;">result</span><span style="color:#89DDFF;">(</span><span style="color:#82AAFF;">FlutterError</span><span style="color:#89DDFF;">(</span><span style="color:#82AAFF;">code</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">UNAVALIABLE</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">, </span><span style="color:#82AAFF;">message</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">Battery level not available.</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">, </span><span style="color:#82AAFF;">details</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">nil))</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">else</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">            </span><span style="color:#82AAFF;">result</span><span style="color:#89DDFF;">(</span><span style="color:#FFCB6B;">Int</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">device.batteryLevel </span><span style="color:#89DDFF;">*</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">100</span><span style="color:#89DDFF;">))</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span></code></pre></div><h2 id="运行" tabindex="-1">运行 <a class="header-anchor" href="#运行" aria-label="Permalink to &quot;运行&quot;">​</a></h2><p>由于获取电量需要真机运行，特意录了屏。</p><p><img src="`+p+'" alt=""></p><h2 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h2><p>Flutter 的项目，原生端可以创建 Swift 类型的项目，文档的代码也很详细，这太友好了。iOS 都主推 swift 和 swiftUI 了， RN 却依然只能创建 oc 项目。</p><p>掌握了 <code>MethodChannel</code> 的通信方式，就能满足日常的开发需求了。</p><p>觉得 Flutter 的通信 api 设计的很好，简单易学，之前我自己探索的原生与 webview 的通信还是比较复杂的，传递的信息感觉不是很方便，后续继续去探索学习看看是否有更好的方法。</p>',16),t=[o];function c(r,A,C,y,D,i){return a(),n("div",null,t)}const u=s(e,[["render",c]]);export{d as __pageData,u as default};
