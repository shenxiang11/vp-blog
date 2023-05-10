---
title: iOS Swift 工程集成 React Native
date: 2023-04-14 19:13:49
tags: [React Native, Swift, iOS]
layout: post
cover:
  image: /vp-blog/covers/react-native.png
---

## 前言

看了很多 React Native 教程，大多都是通过官方脚手架创建出的项目，同时包含 iOS 和 Android 的。

实际目前很多公司的开发模式和这种其实是不一样的，更多是向已有的的工程中集成 React Native。

我也尝试在一个独立的 iOS Swift 项目中，尝试部分页面接入 RN。


## 目标

目标就是如图中所示，可以通过 iOS 端的按钮点击，唤起 React Native 开发的简单页面。

![01.png](/resources/2023-04-14/01.png)


## 操作步骤

首先，创建 RN 工程，这一步和全 RN 开发并无不同，我们依然借助脚手架初始化工程。

App 页面是官方的示例页面，我将它改成了简单的 Hello world。

`index.js` 是入口文件，并没有做任何修改，把代码贴出来是希望注意到 `registerComponent` 方法，它的第一个参数 `appName` 会在原生端用到。

```js
/**
 * @format
 */
// index.js
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
```

接着，我们创建 iOS Swift 工程，这是通过 XCode 创建的，一路下一步，没有什么可以多说的。

然后，我们需要通过 Cocoapods 安装依赖，这里说一下不要按照 React Native 中文网提供的 podfile 来编写，可以参考脚手架里的 iOS 项目去编写依赖。

我们只需要一个 `ViewController`, 通过 `StoryBoard` 创建一个按钮，绑定一个 `tap` 事件即可。

在事件的回调函数中，我们就可以创建我们的 RN 视图，并加载它，代码如下：

```swift
import UIKit
import React

class ViewController: UIViewController {


    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view.
    }

    @IBAction func onClick(_ sender: Any) {
        let bridge = RCTBridge(delegate: MyReactNativeBridge())
        let rootView = RCTRootView(bridge: bridge!, moduleName: "hybridrn", initialProperties:  nil)

        let vc = UIViewController()
        vc.modalPresentationStyle = .fullScreen
        vc.view = rootView
        self.show(vc, sender: nil)
    }

}

class MyReactNativeBridge: NSObject, RCTBridgeDelegate {
    func sourceURL(for bridge: RCTBridge!) -> URL! {
        return URL(string: "http://localhost:8081/index.bundle?platform=ios")
    }
}
```

我们创建了一个 `bridge` 对象，他的 `delegate` 实现了 `RCTBridgeDelegate`, 通过 `sourceURL` 去加载 js bundle 的地址。

随后就是通过 `RCRootView` 创建出视图，然后展示即可，其中 `moduleName` 就需要传之前的 appName。

一般混合开发中，我们就可以注册很多的 module，原生去负责这些页面的跳转。


## 避坑指南

这样配置完成后，在开发阶段，我们就可以在这个项目中预览我们 RN 开发的页面了，它的热更新也是没有问题的。

但是，在我一次测试中，RN 端如果有报错，模拟器上如果我们显示了 LogBox 的话，下次热更新生效前，iOS App 就会崩溃。

经过排查后，发现是 iOS 这边 React Native 的包里，如下这段代码出现了问题：

```c
- (void)dealloc
{
    [RCTSharedApplication().delegate.window makeKeyWindow];
}
```

原因是我们新创建的 iOS 工程里，window 已经不再 AppDelegate 类中有声明了，我们可以在 AppDelegate 里声明一下：```var window: UIWindow?```,

这样，我们就可以在原生 iOS 项目里开发 RN 了。


## 总结

整个集成过程并不难，也遇到了两个比较坑的点，一是 cocoapods 的依赖文件一开始参考的 RN 中文网，估计是很久以前的版本了，怎么都成功不了；二是遇到热更新的问题， 在经过调试后，也顺利解决了。

开发阶段我们就去加载 bundle 的地址是没有问题的；如果是线上版本，混合开发模式应该是要有一套下载 bundle 的策略，让 App 去加载本地 bundle，这又是个值得去学习的点了。

这也让我理解了为什么 RN 能够热更新了，bundle 就是个 js 文件，我们只要替换这个文件地址或者文件就能实现应用的更新。

RN 的出现确实让前端繁荣了一段时间，但是这究竟是好事还是坏事呢，前端已死？客户端已死？
