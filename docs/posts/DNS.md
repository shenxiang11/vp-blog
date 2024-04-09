---
title: 了解 DNS 查询过程
description: 浏览器输入域名后的第一步
date: 2023-06-06 09:59:26+8
tags: [计算机]
layout: post
cover:
    image: https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80
---

## 为什么需要域名解析

> 网域名称（英语：Domain Name，简称：Domain），简称域名、网域，是由一串用点分隔的字符组成的互联网上某一台计算机或计算机组的名称，用于在数据传输时标识计算机的电子方位。域名可以说是一个 IP 地址的代称，目的是为了便于记忆后者。

上方来自 wiki 的解释。

域名就像是“小明家”，而 ip 地址则是 “中国 上海市 闵行区 ...... 101 室” 这样具体的地址。

我们实际访问服务需要访问 ip 地址所代表的服务器，域名只是比起一串串数字方便我们记忆。


## 域名的“级别”

也是 get 到一个冷知识，域名后面是可以带一个 `.` 的，如 `www.baidu.com.`，但是百度做了限制会禁止我们访问，一般的站点是可以访问的。只是所有域名都有这么一个点，所以也就可以省略表示。

这个 `.` 就是根级别，可以称为根域名。

`com` 之类的则是顶级域名。

`baidu` 则是一级域名，这也是我们现如今在服务商那购买所得。

有了一级域名，我们可以在它的前面自定义二级域名，如 `image.baidu.com` 提供了图片服务，这是不需要服务商许可的。


## 模拟查询步骤

我们的操作系统上有对 DNS 查询服务器的设置，以我的系统为例。

![](/resources/2023-06/01.png)

我们可以把其改为任意合法的地址，比如 `1.1.1.1` 和 `8.8.8.8` 等。

我试了将其改为一个自己任意输入的值后，浏览器便不能正常访问站点了。

我们可以使用 `dig` 命令，了解这个查询的过程。

```bash
dig @1.1.1.1 www.baidu.com

; <<>> DiG 9.10.6 <<>> @1.1.1.1 www.baidu.com
; (1 server found)
;; global options: +cmd
;; Got answer:
;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 23252
;; flags: qr rd ra; QUERY: 1, ANSWER: 4, AUTHORITY: 0, ADDITIONAL: 1

;; OPT PSEUDOSECTION:
; EDNS: version: 0, flags:; udp: 1232
;; QUESTION SECTION:
;www.baidu.com.			IN	A

;; ANSWER SECTION:
www.baidu.com.		1197	IN	CNAME	www.a.shifen.com.
www.a.shifen.com.	27	IN	CNAME	www.wshifen.com.
www.wshifen.com.	297	IN	A	119.63.197.151
www.wshifen.com.	297	IN	A	119.63.197.139

;; Query time: 186 msec
;; SERVER: 1.1.1.1#53(1.1.1.1)
;; WHEN: Tue Jun 06 10:21:45 CST 2023
;; MSG SIZE  rcvd: 127
```

`119.63.197.151` 和 `119.63.197.139` 这两个查询而来的 ip 是可以直接访问百度的。需要注意时效性，这两个地址可能会被更改，但是域名不会，这也是为什么需要域名的原因。


## 一台服务器就够做查询了吗？

DNS 做的事情似乎很简单，但是全球这么多的上网设备，同时需要应对这么多的请求，再简单的服务也是压力山大。

实际上需要查询缓存和多台服务器来解决这个高并发问题。

缓存很好理解，ip 地址一般而言不会在短时间内有变动，所以比起同一个域名每次都去远程查询，不如让像浏览器这样的应用程序使用缓存机制，比如 60s 内，我们使用之前查询到的缓存，过期后再重新查询。

这样 DNS 的压力会减小不少，使用缓存也能增加网站的访问速度。当然 DNS 服务器自身也可以做自己的缓存，不需要每次都去真的执行查询逻辑。

DNS 服务器实际上不仅数量有多个，而且一般可以分成 4 类。

- 根域名服务器：我们将域名交给它，它并不能直接返回给我们最终的 ip，而是告诉我们可以去哪几台顶级域名服务器上继续查询。
- 顶级域名服务器：我们可以选择其中一个继续查询，它依然返回一级域名服务器的列表让我们继续查询。
- 一级域名服务器： 继续查询，我们就能拿到最后的 ip 地址。（百度这个例子比较特殊，它会查询到另一个域名，我们接着查找这个域名即可）。

由此可见，这个查询有一个递归查询的过程，所以为了方便还会有支持自动递归查询的服务器，就像我们一开始使用的 `1.1.1.1`。我们一般所说的 DNS 服务器也是指的它。


## 前端网页优化

我们可以利用如下的方式，在下面的情况下提前对某些域名做 DNS 的预解析。

> 域查找可能很慢，尤其是在手机网络延迟的情况下。当有大量可能被点击的外部网站链接时，它们最相关，例如搜索引擎结果，DNS 预取提前解析域名，从而通过减少请求时与域查找相关的时间来加快加载时间。

```html
<link rel="dns-prefetch" href="https://example.com/" />
```


## 关于 Hosts 文件

> Hosts文件中包含了本地网络重要的主机名和地址信息，查询Hosts文件得到的结果比通过查询DNS得到的结果优先级更高。

开发过程中，有时修改 Hosts 文件会方便我们开发。

之前没搞明白 Hosts 和 DNS 的关系，可以理解为 DNS 基本取代了 Hosts，但是实际上如果在 Hosts 中的关系存在，便不会走 DNS 查询了。