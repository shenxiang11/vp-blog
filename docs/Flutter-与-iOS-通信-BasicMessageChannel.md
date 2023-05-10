---
title: 'Flutter 与 iOS 通信: BasicMessageChannel'
date: 2023-04-22 12:05:00
tags: [Flutter, iOS, Swift]
layout: post
---

## 前言

`BasicMessageChannel` 是适合在 Flutter 和原生端，用于传递字符串和半结构化信息的通信方式。


## Flutter 代码

为了方便，我们直接使用 Android Studio 创建 Flutter 工程，Swift 部分也使用工程创建出来的 iOS 目录即可。

为了简单，我们的演示以传递字符串为例。

下面的代码是基于官方计数器 DEMO 修改而来，删除了注释内容，补充了 `BasicMessageChannel` 部分代码，主要关注 `_MyHomePageState` 的 `initState` 内部的 `setMessageHandler` 和后面的 `_sendMessage` 方法。

前者是处理原生端发送过来的消息，并且还可以回复一条消息给原生端。

后者是向原生端发送消息，并且可以接收到原生端对于这一条消息的回复。

```dart
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: const MyHomePage(title: 'Flutter Demo Home Page'),
    );
  }
}

class MyHomePage extends StatefulWidget {
  const MyHomePage({Key? key, required this.title}) : super(key: key);
  
  final String title;

  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  static const _channel = BasicMessageChannel("dev.basicMessageChannel", StringCodec());

  @override
  void initState() {
    super.initState();

    _channel.setMessageHandler((message) async {
      print("1. flutter receive: $message");
      return "2. flutter reply receive";
    });

  }

  Future<void> _sendMessage() async {
    var message = await _channel.send("3. flutter send");
    print("4. flutter receive swift reply ：$message");
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(widget.title),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: _sendMessage,
        tooltip: 'Increment',
        child: Text("Send"),
      ),
    );
  }
}
```


## Swift 代码

这部分，`setMessageHandler` 同样是接收 flutter 发送过来的消息并回复。

项目启动 5s 后，主动向 flutter 发送一条消息，并且在回调中接收 flutter 对于这条消息的回复。

```swift
import UIKit
import Flutter

@UIApplicationMain
@objc class AppDelegate: FlutterAppDelegate {
  override func application(
    _ application: UIApplication,
    didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?
  ) -> Bool {

      let controller: FlutterViewController = window?.rootViewController as! FlutterViewController
      let basicMessageChannel = FlutterBasicMessageChannel(name: "dev.basicMessageChannel", binaryMessenger: controller.binaryMessenger, codec: FlutterStringCodec.sharedInstance())

      basicMessageChannel.setMessageHandler { message, reply in
          print("5. swift receive：\(message)")

          reply("6. swift reply: \(message)")
      }

      DispatchQueue.main.asyncAfter(deadline: .now() + 5.0) {
          basicMessageChannel.sendMessage("7. swift send") { message in
              print("8. swift receive flutter reply: \(message)")
          }
      }

      GeneratedPluginRegistrant.register(with: self)

      return super.application(application, didFinishLaunchingWithOptions: launchOptions)
  }
}
```


## 运行起来

由于修改了原生代码，我们需要执行 `flutter clean`，先用 flutter 把它运行起来，但是这样看不到原生端的日志。

又一个小技巧是我们后续从 xcode 启动项目，这样两端的日志我们都能看到。

下面我直接贴出我们项目的日志，前 5s 我们先不要点击按钮，先查看 swift 向 flutter 发送消息的情况，然后我们再点击一次按钮。

```txt
flutter: 1. flutter receive: 7. swift send
8. swift receive flutter reply: Optional(2. flutter reply receive)

5. swift receive：Optional(3. flutter send)
4. flutter receive swift reply ：6. swift reply: Optional(3. flutter send)
```

前 5s 原生发送了一条消息，所以第一条日志是 flutter 接收到了 swift 发送的消息。

随后 flutter 对消息做了回复，第二条日志表示 swift 接收到了 flutter 的回复消息。

点击按钮后，flutter 发送了一个消息，swift 接收到了。

最后，flutter 接收到了 swift 的回复消息。


## 总结

`BasicMessageChannel` 是 Flutter 与原生最简单的通信方式，但它只能用于传递字符串和半结构化的信息，后面我们继续探索其他通信方式。


