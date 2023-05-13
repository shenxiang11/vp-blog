---
title: 记一次 RN 第三方组件 react-native-htmlview 问题排查
date: 2023-04-11 18:20:00
tags: [React Native]
layout: post
cover:
  image: /vp-blog/covers/react-native.png
---

## 问题复现

在 Shopee Food App 商家端开发时，遇到一个奇怪的问题：RN 开发的 app 页面中的富文本图片，会显示不出来，显示成一个模糊不清的图片。

神奇的是，这不是一个必现的问题，当时排查了很久，终于找到了问题发生的地方。

## 问题排查

首先，我是没有任何头绪的，只能观察家在失败的不同图片，首先发现这些图片虽然模糊不清，但是它们的色彩是和原图相关的。

再仔细观察，会发现这个模糊效果似乎就是 iOS 端使用 ```UIVisualEffectView``` 实现的我们常说的“毛玻璃”效果。

我可以确定的是，我们的代码逻辑没有这种增加模糊效果，随后我便决定去排查呈现这个富文本内容的第三方组件库 ———— react-native-htmlview。

这个组件库中呈现图片使用的是它内部实现的 ```AutoSizedImage``` 组件，它也并没有多少逻辑，更没有看到有加模糊效果的代码。

代码如下，值得注意的是初始化部分，作者将图片初始宽高设置为了 1x1 的大小：

```jsx
import React, {PureComponent} from 'react';
import {
  Image,
  Dimensions,
} from 'react-native';

const {width} = Dimensions.get('window');

const baseStyle = {
  backgroundColor: 'transparent',
};

export default class AutoSizedImage extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      // set width 1 is for preventing the warning
      // You must specify a width and height for the image %s
      width: this.props.style.width || 1,
      height: this.props.style.height || 1,
    };
  }

  componentDidMount() {
    //avoid repaint if width/height is given
    if (this.props.style.width || this.props.style.height) {
      return;
    }
    Image.getSize(this.props.source.uri, (w, h) => {
      this.setState({width: w, height: h});
    });
  }

  render() {
    const finalSize = {};
    if (this.state.width > width) {
      finalSize.width = width;
      const ratio = width / this.state.width;
      finalSize.height = this.state.height * ratio;
    }
    const style = Object.assign(
      baseStyle,
      this.props.style,
      this.state,
      finalSize
    );
    let source = {};
    if (!finalSize.width || !finalSize.height) {
      source = Object.assign(source, this.props.source, this.state);
    } else {
      source = Object.assign(source, this.props.source, finalSize);
    }

    return <Image style={style} source={source} />;
  }
}
```

```AutoSizedImage``` 代码没有问题，那难道是 RN 的 ```Image``` 的问题？

图片设置 1x1 是因为没有经过网络加载，我们不能知道图片的真实尺寸，在加载完图片后，我们重新设置正确的尺寸。

这个照平常来说没有什么问题，但实在没有其他的可排查的点了，所以我只能在 RN ```Image``` 组件上做实验，显示一张图片和一个 slider，通过 slider 不断去修改图片尺寸。

果然，项目中一样的问题发生了，图片会从清楚变模糊，并且有概率不能正确显示。

后来我使用 swift 原生，做了一摸一样的实验，没有这个现象，猜测这是 RN 这边实现的效果。

(在几个月后，我重新试了一下，这个问题在新版本已经不存在了，自己这边的模拟器等环境已经升级到 iOS 16 了，无法还原当时的开发环境了。但是当时在公司的开发机和自己的电脑上都复现出了这个问题。)


## 问题解决

知道了规律，解决也变得容易了，该组件库支持我们自己定义富文本各种标签的渲染方式，我们只需重写一个新的 ```AutoImageView```。

原本版本中，图片尺寸发生骤变的地方就是从初始化的 1x1, 到网络加载图片后重新按图片真实尺寸比例重新渲染。

1x1 的大小其实是没有意义的，用户也看不见，我们在新组件中实现成加载前渲染一个空组件，最后网络加载图片完成后，再让图片按真实尺寸渲染。

最后，经测试，修改后问题得以解决。


## 总结

RN 的发展非常快，其实这个组件库虽然有超过 2000+ 的 star，但是作者已经很久不维护了，提 issue 等作者修复可能等不到了。

还好，作者有提供自定义渲染的方式让我们无需需改他的代码，当时正面临 9.9 大促，不然很有可能耽误开发上线的时间。

这个组件库另外一个问题是，默认样式不是很好看，如文本行间距非常地不自然，这又是另一个问题了，下次有机会再分享。
