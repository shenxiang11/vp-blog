---
layout: posts
title: Swift 原生应用与 WebView 互相通信
date: 2023-04-20 11:10:33
tags: [Swift, Javascript, iOS]
---

## 显示一个 Webview

原本的 Web view 已经被标记为 deprecated 了，所以如果没有历史包袱，我们的项目应该使用 `WKWebView` 来显示我们的页面。

需要注意的是该控件并不在 `UIKit` 包里，我们需要导入 `Webkit`，具体的加载显示逻辑如下：

```swift
import UIKit
import WebKit

class ViewController: UIViewController {

    @IBOutlet weak var webview: WKWebView!

    override func viewDidLoad() {
        super.viewDidLoad()

        webview.load(URLRequest(url: URL(string: "https://www.baidu.com")!))
    }

}
```

我们可以在 iOS 中，显示我们的网页项目了。

![03.png](/resources/2023-04/03.png)


## Swift 调用 JS 代码

我在原生端添加了一个按钮，点击后会调用 `callJS`：

```swift
import UIKit
import WebKit

class ViewController: UIViewController {

    @IBOutlet weak var webview: WKWebView!

    override func viewDidLoad() {
        super.viewDidLoad()

        webview.load(URLRequest(url: URL(string: "https://www.baidu.com")!))
    }

    @IBAction func callJS(_ sender: Any) {
        webview.evaluateJavaScript("function test() {return 1};test();") { result, err in
            print(type(of: result), result) // Option(Any) Option(1)
            print(type(of: err), err) // Option(Error) nil
        }
    }
}
```

我们可以通过 `evaluateJavaScript`，传入 JS 代码以执行，这样我们就可以方便地调用 JS 的全局方法了，我将执行结果写到了注释中。

调用的返回值或者调用过程中的错误，回通过 Swift 中的回调拿到。由于 JS 类型的灵活和两种语言的类型不是完全匹配的，result 的类型是 Option(Any)，err 的类型是 Optional<Error>。


## JS 端调用 Swift 方法

我的示例选择了一个 webview 调用 iOS 端的相册，然后 iOS 端将图片路径回调给 webview 的功能。

![04.gif](/resources/2023-04/04.gif)

由于两端交互使用了 file 协议，我后续也将网页改成了本地加载工程中的网页的形式，如果这一块不清楚，你可以跳到最后看最终代码。

可以通过 `webview.configuration.userContentController.add(self, name: "showPhotoPicker")` 这个形式，往 webview 中注册原生方法。

我们在 webview 中，就可以通过 `webkit.messageHandlers.showPhotoPicker.postMessage("onGetPhoto");` 这个形式去调用原生方法。

这里的 postMessage 的参数，我设计为通知原生端选择图片后，应该调用的 JS 回调方法名称，这一步其实又是 Swift 调用 JS 了，我们可以通过 `WKScriptMessageHandler` 协议的 `message.body` 拿到它。

最后通过调用 JS，将图片的地址回传给 webview，以显示图片。


## 最终代码

```swift
import UIKit
import WebKit

typealias PhotoSelectedCallback = (_ url: NSURL) -> Void

class ViewController: UIViewController, UINavigationControllerDelegate {

    @IBOutlet weak var webview: WKWebView!

    var onPhotoSelected: PhotoSelectedCallback?

    override func viewDidLoad() {
        super.viewDidLoad()

        webview.configuration.userContentController.add(self, name: "showPhotoPicker")

        let htmlFile = Bundle.main.path(forResource: "index", ofType: "html")!
        webview.loadFileURL(URL(fileURLWithPath: htmlFile), allowingReadAccessTo: URL(fileURLWithPath: htmlFile))
    }

    @IBAction func callJS(_ sender: Any) {
        webview.evaluateJavaScript("function test() {return1 1};test();") { result, err in
            print(type(of: result), result)
            print(type(of: err), err)
        }
    }

    // webkit.messageHandlers.showPhotoPicker.postMessage();
    func showPhotoPicker(onSelected: @escaping PhotoSelectedCallback) {
        let imagePicker = UIImagePickerController()
        imagePicker.sourceType = .photoLibrary
        imagePicker.delegate = self
        onPhotoSelected = onSelected
        present(imagePicker, animated: true)
    }
}

extension ViewController: UIImagePickerControllerDelegate {
    func imagePickerController(_ picker: UIImagePickerController, didFinishPickingMediaWithInfo info: [UIImagePickerController.InfoKey : Any]) {
        let fileUrl = info[.imageURL]
        picker.dismiss(animated: true) {
            self.onPhotoSelected?(fileUrl as! NSURL)
        }
    }
}

extension ViewController: WKScriptMessageHandler {
    func userContentController(_ userContentController: WKUserContentController, didReceive message: WKScriptMessage) {
        switch message.name {
        case "showPhotoPicker":
            showPhotoPicker { url in
                if let method = message.body as? String {
                    let callStr = method + "(\"" + url.absoluteString! + "\")"
                    self.webview.evaluateJavaScript(callStr)
                }
            }
        default: break
            // do nothing or throw an error.
        }
    }
}
```

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    
    <button id="btn">打开相册</button>

    <img id="img" width="200" height="200" src="" />

    <script>
        const btn = document.getElementById('btn');

        btn.addEventListener('click', function() {
            webkit.messageHandlers.showPhotoPicker.postMessage("onGetPhoto");
        });

        function onGetPhoto(data) {
            document.getElementById('img').src = data;
        }
    </script>
</body>
</html>
```


## 总结

至此，一个 swift 调用 webview，webview 调用 swift 的简单功能就实现了。

不同语言之间的交互，由于数据类型不同，有种现实中语言不通的现象，我们只能够简单传递字符串的形式来实现通信。

因此，如果为了易用性，我们需要设计 SDK，才能在企业中使用，但是通过这个示例，简单了解了原生与 webview 是如何通信的。
