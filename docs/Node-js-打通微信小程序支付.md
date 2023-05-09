---
title: Node.js 打通微信小程序支付
date: 2023-04-23 14:25:08
tags: [微信小程序, Node.js, Javascript]
layout: post
---

## 前言

支付是电商最重要的一个环节，在小程序中前端基本只需要调用 api 即可，一些重要逻辑是放在后端的，且不是每一个开发都会接触这一块内容。

这次借用到了企业支付的资质，就实践一下支付并记录此过程。

完成后，可以在小程序中成功唤起支付，并在以后应用到项目里。

![](/resources/2023-04/09.gif)


## 准备小程序前端

我们只需要在官方示例项目里添加网络请求，然后把请求结果的必要参数传递给 `requestPayment` 即可。

```js
// index.js
// 获取应用实例
const app = getApp()

Page({
  // ...
  handlePay() {
    wx.request({
      url: 'http://192.168.1.3:3000/pay',
      success(res) {
        wx.requestPayment({
          nonceStr: res.data.nonceStr,
          package: res.data.package,
          signType: res.data.signType,
          paySign: res.data.paySign,
          timeStamp: res.data.timeStamp,
        })
      },
    })
  },
  // ...
})
```

## 支付后端

这里我就简单使用了 koa 作为支付后端，并且简单到不需要使用路由功能。

登录我也不打算作，我自己的 openid 在以前我测试这个小程序的时候获取过，我记录了下来直接使用，在下面代码里我隐去了。

同时我把一些敏感信息一并隐去了，如：商户 id，支付密钥等。

```js
const Koa = require('koa')
const axios = require('axios')
const md5 = require('md5')
const {js2xml, xml2js} = require('xml-js')

const app = new Koa()

app.use(async ctx => {
  const dict = {
    xml: {
      body: 'JSAPI支付测试',
      appid: '你的小程序 id',
      mch_id: '商户 id',
      nonce_str: generateNonceStr(), // 随机字符串，长度要求在32位以内。调用随机数函数生成，将得到的值转换为字符串
      notify_url: 'http://127.0.0.1/notify',
      openid: '支付用户的 openid', // 懒得做登录系统了
      out_trade_no: '3783-6c16-4fab-83ff-6f193d70111', // 商户系统内部订单号，要求32个字符内，只能是数字、大小写字母_-|*且在同一个商户号下唯一
      spbill_create_ip: '127.0.0.1',
      total_fee: 10, // 订单总金额，单位为分
      trade_type: 'JSAPI',
    }
  }

  let str = ""
  Object.keys(dict.xml).sort().forEach(key => {
    if (str === '') {
      str += `${key}=${dict.xml[key]}`
    } else {
      str += `&${key}=${dict.xml[key]}`
    }
  })

  str += '&key=' + '你的 key'

  const sign = md5(str)
  dict.xml.sign = sign.toUpperCase()

  const d = js2xml(dict, {compact: true, ignoreComment: true, spaces: 2})

  const res = await axios.post('https://api.mch.weixin.qq.com/pay/unifiedorder', d, {
    headers: {
      "Content-Type": "text/xml",
    },
  })

  const data = xml2js(res.data, {compact: true})

  const clientDict = {
    appId: '你的小程序 id',
    timeStamp: Math.floor(Date.now()/1000).toString(),
    nonceStr: generateNonceStr(),
    package: 'prepay_id=' + data.xml.prepay_id._cdata,
    signType: 'MD5',
  }

  str = ''
  Object.keys(clientDict).sort().forEach(key => {
    if (str === '') {
      str += `${key}=${clientDict[key]}`
    } else {
      str += `&${key}=${clientDict[key]}`
    }
  })

  str += '&key=' + '你的 key'
  clientDict.paySign = md5(str)

  ctx.body = clientDict
})

function generateNonceStr() {
  return Math.random().toString().slice(2)
}

app.listen(3000)
```

代码的大体流程就是准备参数，这里我是将微信文档里标记的必要参数都写了上去了，这应该是最少的参数了。

后端需要把这些参数传递给后端，其中 `sign` 是把这些参数按照其 key 的 ASCII 码排序拼接后进行 md5 后得到，再和原本的字段一起传递给微信服务器。

这里微信的入参和出参都是 xml 格式，我们利用 npm 包来转换成更方便使用的 json。

我们再把微信给我们的结果，做一样的加密工作，然后把所需参数传递给前端，即 `requestPayment`。

到这里，一个极简的支付就完成了。


## 总结

吐槽一下，不知道为什么，微信至今还是用 xml 作为数据交换，哪怕兼容地加一种 json 方式呢？

之前，我其实用 java 写过类似的支付，当时整个流程用的现成的 SDK 来做支付，只需要传递必要参数就行，其实这次做完，发现支付其实也只是一个简单请求而已，代码量并不多，盲目用一些包，万一里面有什么恶意的逻辑就不好了。
