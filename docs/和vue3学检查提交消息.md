---
title: 规范项目的 git commit message
description: 和 vue3 源码学检查 git commit message
date: 2023-05-29 16:55:33+8
tags: [git]
layout: post
cover:
  image: /vp-blog/covers/git.png
---

在我的 [vue-start](https://github.com/shenxiang11/vue-starter) 快速启动项目中，我学习 vue 源码的规范 git commit message 的方式，添加了校验的功能。

简单做一下集成的记录。

## Step 1: 安装 simple-git-hooks

```shell
npm install simple-git-hooks --save-dev
```

还有其他类似的 git hooks 工具，如 husky 等。


## Step 2: 配置 package.json

我们添加 simple-git-hooks 所需要的配置。

```json
{
  "scripts": {
    "postinstall": "simple-git-hooks"
  },
  "simple-git-hooks": {
    "commit-msg": "node scripts/verifyCommit.mjs"
  }
}
```


## Step 3: 编写检测脚本

这里我们直接贴出 vue3 源码里的脚本，我们可以按需自己定制。

```javascript
// @ts-check
import chalk from 'chalk'
import { readFileSync } from 'fs'
import path from 'path'

const msgPath = path.resolve('.git/COMMIT_EDITMSG')
const msg = readFileSync(msgPath, 'utf-8').trim()

const commitRE =
  /^(revert: )?(feat|fix|docs|dx|style|refactor|perf|test|workflow|build|ci|chore|types|wip|release)(\(.+\))?: .{1,50}/

if (!commitRE.test(msg)) {
  console.log()
  console.error(
    `  ${chalk.bgRed.white(' ERROR ')} ${chalk.red(
      `invalid commit message format.`
    )}\n\n` +
      chalk.red(
        `  Proper commit message format is required for automated changelog generation. Examples:\n\n`
      ) +
      `    ${chalk.green(`feat(compiler): add 'comments' option`)}\n` +
      `    ${chalk.green(
        `fix(v-model): handle events on blur (close #28)`
      )}\n\n` +
      chalk.red(`  See .github/commit-convention.md for more details.\n`)
  )
  process.exit(1)
}
```

奇怪的是 vue3 此文件名后缀是 js，但是使用了 `import` 语句，这在我的环境下是不行的，我们可以将其改位 `mjs` 后缀。


## Step 4: 设置 hooks

执行脚本，其会为我们在隐藏文件下设置相应的 hooks。

```shell
npx simple-git-hooks
```


## message 规范解读

`?` 代表不是很确定且 commitiizen 规范中似乎没有。

| 名称       | 意义              |
|----------|-----------------|
| feat     | 新功能             |
| fix      | 修复 bug          |
| docs     | 仅包含文档的修改        |
| dx       | 对插件的修改 (?)      |
| style    | 仅格式化的变动         |
| refactor | 重构              |
| perf     | 提高性能的修改         |
| test     | 添加或修改测试代码       |
| workflow | 项目流程上的修改 (?)    |
| build    | 构建工具或外部依赖包的修改   |
| ci       | 持续集成的配置文件或脚本的修改 |
| chore    | 杂项              |
| types    | TS 的类型的修改 （?）   |
| wip      | 未开发完的提交（?）      |
| release  | 发布 （?）          |
| revert   | 撤销某次提交          |












## 缺点

由于其执行需要依赖 node_modules，所以一开始，我在使用 degit 下载项目后，简单做了一点变更，忘记安装依赖了，便发现这时后不能检测到不规范的 message。

所以，第一个永远记得先安装依赖。实际场景中，我们大多数场景是安装完依赖，需要启动项目进行开发的，所以这个不是什么大问题。

但是，这也警示了我们，仍然有可能会有不规范的 message 会被提交到远程，如果要严格规范我们的提交，我们仍然需要创建机制，拒绝不规范的提交。

