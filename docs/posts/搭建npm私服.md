---
title: 搭建 npm 私服
description: 解决一个几年前占硬盘的问题
date: 2023-07-12 10:10:51+8
tags: [npm, Docker]
layout: post
cover:
  image: /vp-blog/covers/npm.webp
---


## 使用 Docker 搭建私服

为了演示方便，我们使用 Docker 快速搭建起我们的 npm 私服。

我们使用的镜像是 `verdaccio/verdaccio`，在前私使用的就是 `verdaccio`.

```bash
docker pull verdaccio/verdaccio
```

接着我们以该镜像启动我们的容器，记得暴露我们的端口：`4873`。

我们访问 `http://0.0.0.0:4873/` ，可以得到如下画面。

![](/resources/2023-07/17.png)

我们可以快速初始化一个新的 npm 包，并创建 `.npmrc` 文件，指定其 registry 为 `http://0.0.0.0:4873`.

```txt
registry=http://0.0.0.0:4873
```

执行 `npm publish`，报出 ` Publishing to http://0.0.0.0:4873 with tag latest and default access` 的警告，我们可以发现我们已经在和私服交互了。

我们可以执行 `npm adduser` 来创建用户名和密码，然后使用 `npm login` 完成登录。

再次执行 `npm publish` 时，我们就能把我们的包发到私服上去了。

![](/resources/2023-07/18.png)


## 私服大量占用硬盘的问题

我们前往 `/verdaccio/storage/data` 目录，查询当前的数据状况。我们可以发现当前只有我们发布的这个包。

![](/resources/2023-07/19.png)

我们不妨尝试安装一些依赖。我安装了 `react`、`vue`、`webpack` 等。

![](/resources/2023-07/20.png)

我们发现这些库同样出现在我们的数据目录当中。

如果我们的目的是搭建私服加速我们的下载，那么这种模式没有什么问题；但是如果我们想要的仅仅是使用私服管理我们公司内部的包，公有的包仍然从公网下载，这种模式就有点问题。

因为随着时间的我们安装过的包会越来越多，这个目录的大小会异常庞大，如果超过了硬盘大小，我们还需要在硬盘满发出告警时登上服务器去清理，实际这在我四年前的公司里已经发生了。所以，与其这样倒不如不让它去存储公网的包，节省我们的硬盘，节省我们的运维精力。


## 解决

尝试通过 `verdaccio` 配置解决缓存问题，未果。

只能通过规范使用的方式来达到公有包不走私服的目的。

我们将 `.npmrc` 做如下修改：

```txt
registry=https://registry.npmjs.org/

@yupee:registry=http://0.0.0.0:4873
```

这意味着我们在发布私有包时需要额外指定 `registry`，且我们私有包应该有一个组织名称，比如示例里的 `@yupee`。

这样该组织下的包会从私服下载，公有包不会经过私服也就不会被私服缓存，这样就不用担心硬盘容量小而需要不断清理缓存了。


