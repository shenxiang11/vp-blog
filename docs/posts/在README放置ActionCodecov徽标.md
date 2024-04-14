---
title: 在 README 放置 Action 和 Codecov 徽标
description: Action 和 Codecov 徽标获取方法
date: 2023-07-19 17:26:41+8
tags: [CI/CD]
layout: post
cover:
  image: https://images.unsplash.com/photo-1689747707552-950ab35460cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2671&q=80
---


## 放置一些徽标的好处

![](/resources/2023-07/21.png)

可以在很多库的 github 仓库中看到，通常会放置一些徽标。如上图的 React Redux，分别放置了 github workflow 的状态、npm 最新的版本、每月的下载量和 discord 的链接。

其实这些小标志的作用并不是花里胡哨，我认为有一下好处：

- **指示状态**：比如 github workflow 的运行是否成功，我们可以直观地从小标志上看出来。
- **项目可信度和可靠性**：比如公开库的下载量和代码覆盖率等，有助于增加项目的可靠性和可信度，吸引更多用户和贡献者。
- **鼓励贡献者参与**：一个高覆盖率、高下载量的库会吸引贡献者，徽标可以向他们传达这一点。
- **持续集成和自动化**：一般徽章会和持续集成系统结合使用。每次提交代码自动计算覆盖率等，能够及时反应当前的项目质量。
- **快速反馈和监控**：通过持续集成和徽章，团队可以快速获得关于代码覆盖率的反馈。如果测试覆盖率下降，团队可以立即采取措施，确保项目保持良好状态。
- **行业标准**： 在某些领域，高代码覆盖率可能是必需的，尤其是在一些开发标准或合规要求下。在这些情况下，展示徽章可以证明项目符合所需的标准。

徽章本身只是一张张小图片，本身并不能给项目带来可靠性和高质量，但是可以让我们直观感受到项目的一些状态，所以集成一些徽章也是一个不错的选择。

最近在写一个 go 泛型库，目前集成了 GitHub actions workflow 的徽章和 Codecov 的徽章，遂记录一下。


## 添加 Workflow 状态徽章

具体可以参考：[资料](https://docs.github.com/en/actions/monitoring-and-troubleshooting-workflows/adding-a-workflow-status-badge)。

关键点是你需要有一个已经运行起来的 workflow，然后在你库的首页 README.md 里添加上徽章图片的展示：

```markdown
![](https://github.com/<OWNER>/<REPOSITORY>/actions/workflows/<WORKFLOW_FILE>/badge.svg)
```

- OWNER 替换为你的 github 用户名
- REPOSITORY 替换为项目仓库的名字
- WORKFLOW_FILE 替换为工作流文件的名称

这样你可以得到一个表示工作流工作正常，一个 `passing` 的徽章。


## 添加 Codecov 代码覆盖率徽章

使用 github 账号登录 https://app.codecov.io/

第一次登录，它会同步你所登录账户的全部项目，我们点开对应的项目，有安装指引，分为简单两步。

首先将与 Codecov 交互的 Token 存储到项目仓库的设置中，这是为了安全性考虑的，不能显示地写到 github actions 的脚本中。

然后就是使用 workflow 的步骤集成，直接使用 codecov/codecov-action@v3，按照 Codecov 的提示添加到 workflow 的最后，当然前提是你需要在这个步骤前生成测试覆盖率报告。

运行 workflow 后，将会得到一个测试覆盖率的徽标，如下图所示：

![](/resources/2023-07/22.png)

使用本地工具去查看覆盖率是 97.7%，图片中向下取整了，覆盖率是准确的
