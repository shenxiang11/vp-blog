---
title: Flutter 与 iOS 通信：MethodChannel
date: 2023-04-23 10:38:44
tags: [Flutter, iOS, Swift]
layout: post
---

## 前言

之前分享了 `BasicMessageChannel`，看了官网了解到，它其实是最基础的一种方式，支持自定义消息的编解码器进行基本的异步消息传输。

一般的，我们使用 `MethodChannel`，也能达到 Flutter 请求调用原生方法，原生返回调用结果给 Flutter 的目的。

不得不说，Flutter 官网文档的例子十分地清楚，我从网站上跟随它的获取电池电量的例子，一次就成功了，下面就贴出代码，简单了解一下它的使用方式。


## 代码

创建 channel 的方式几乎和之前没有任何区别。通过 `channel.invoke(xxx)` 即可调用原生方法。

```flutter
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
  String _batteryLevel = 'Unkown battery level.';
  static const _channel = MethodChannel("dev.battery.MethodChannel");

  Future<void> _getBatteryLevel() async {
    String batteryLevel;
    try {
      final int result = await _channel.invokeMethod("getBatteryLevel");
      batteryLevel = "Battery level at $result %.";
    } on PlatformException catch (e) {
      batteryLevel = "Failed to get battery level: ${e.message}";
    }

    setState(() {
      _batteryLevel = batteryLevel;
    });
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
          children: [
            Text(_batteryLevel)
          ],
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: _getBatteryLevel,
        tooltip: 'Increment',
        child: Text("电量"),
      ),
    );
  }
}
```

相应地，原生端建立同名的 channel，通过 `setMethodCallHandler` 根据调用的方法名调用原生方法即可，通过 `result` 将调用结果返回。

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
      let batteryChannel = FlutterMethodChannel(name: "dev.battery.MethodChannel", binaryMessenger: controller.binaryMessenger)

      batteryChannel.setMethodCallHandler { call, result in
          guard call.method == "getBatteryLevel" else {
              result(FlutterMethodNotImplemented)
              return
          }

          self.receiveBatteryLevel(result: result)
      }

      GeneratedPluginRegistrant.register(with: self)

      return super.application(application, didFinishLaunchingWithOptions: launchOptions)
  }

    private func receiveBatteryLevel(result: FlutterResult) {
        let device = UIDevice.current
        device.isBatteryMonitoringEnabled = true
        if device.batteryState == UIDevice.BatteryState.unknown {
            result(FlutterError(code: "UNAVALIABLE", message: "Battery level not available.", details: nil))
        } else {
            result(Int(device.batteryLevel * 100))
        }
    }
}
```

## 运行

由于获取电量需要真机运行，特意录了屏。

![](/resources/2023-04/08.gif)


## 总结

Flutter 的项目，原生端可以创建 Swift 类型的项目，文档的代码也很详细，这太友好了。iOS 都主推 swift 和 swiftUI 了， RN 却依然只能创建 oc 项目。

掌握了 `MethodChannel` 的通信方式，就能满足日常的开发需求了。

觉得 Flutter 的通信 api 设计的很好，简单易学，之前我自己探索的原生与 webview 的通信还是比较复杂的，传递的信息感觉不是很方便，后续继续去探索学习看看是否有更好的方法。
