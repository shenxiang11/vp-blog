---
title: 使用 wrk 进行压测
date: 2025-01-06 22:25:07+8
tags: []
layout: post
cover:
  image: /vp-blog/covers/rust.png
---

## wrk 简介

在性能测试领域，wrk 是一款备受青睐的强大工具，它能够帮助我们精准地评估系统在高并发场景下的表现。


## 例子

首先准备一段 lua 脚本，在这个例子中，测试的对象是一个 Graphql 的 Query 查询。

```lua
local body = [[
    {"query":"query Note($id: Int!) {\n    result: publishedNote(id: $id) {\n        id\n        title\n        content\n        type\n        images\n        video\n        updatedAt\n        views\n    }\n}","variables":{"id":19}}
]]

local headers = {
    ["Content-Type"] = "application/json",
}

function request()
    return wrk.format("POST", "/graphql", headers, body)
end
```

然后使用 wrk 进行压测：

```bash
wrk -t12 -c400 -d30s -s query.lua http://localhost:3000
```

通过 `-s` 我们可以指定我们的 lua 脚本，像测试 Graphql 这种复杂的请求，我们可以通过 lua 脚本来测试可以更加灵活，甚至可以指定 Bearer Token 已应对需要鉴权的情况。


## 参数说明

以下是对 wrk 一些常用参数的详细介绍：

- -c 或 --connections：指的是要保持打开的 HTTP 连接总数，每个线程负责处理的连接数 N 等于总连接数除以线程数。这一参数用于设定并发连接的规模，通过调整它可以模拟不同程度的并发压力，例如设置较大的值能测试系统在高并发连接场景下的性能表现。
- -d 或 --duration：代表测试的持续时间，格式诸如 2s（2 秒）、2m（2 分钟）、2h（2 小时）等。它决定了 wrk 向目标发送请求并收集数据的时长，根据测试需求，可灵活指定短时间的快速测试或长时间的稳定性测试。
- -t 或 --threads：用于设置总共要使用的线程数。线程数的多少会影响压测的效率与资源利用情况，合理配置线程数，结合连接数等参数，能够精准模拟出不同负载模式，让测试结果更贴合实际业务场景。
- -s 或 --script：指定 LuaJIT 脚本，详情可查看 SCRIPTING。正如前文提到的利用 Lua 脚本定制化请求，此参数就是用来引入这些脚本，实现复杂业务场景下的精准压测，满足多样化的测试需求。
- -H 或 --header：用于向请求添加 HTTP 头信息，例如 "User-Agent: wrk"。在与不同的服务交互时，可能需要特定的请求头来确保服务端正确识别、处理请求，该参数提供了这种灵活配置的能力。
- --latency：若指定此参数，wrk 将会打印详细的延迟统计信息，这些信息对于深入分析系统响应的及时性、稳定性非常关键，能帮助我们找出系统在处理请求过程中的潜在瓶颈。
- --timeout：如果在设定的这个时间范围内没有收到响应，wrk 就会记录一次超时。这有助于监控系统在规定时间内处理请求的能力，避免出现长时间无响应的情况，确保系统的高效运行。


## 测试输出

wrk 在测试结束后会输出类似如下的信息：

```
Running 20s test @ https://localhost:8000
  4 threads and 1000 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency     1.55s    84.98ms   1.78s    81.12%
    Req/Sec   318.82    303.13     1.10k    66.86%
  12017 requests in 20.10s, 4.25MB read
  Socket errors: connect 834, read 0, write 0, timeout 0
Requests/sec:    597.87
Transfer/sec:    216.61KB
```

- Requests/sec: 每秒实际完成的请求数（RPS）
- Latency: 平均延迟
