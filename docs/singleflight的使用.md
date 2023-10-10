---
title: singleflight 的使用
date: 2023-10-10 17:50:10+8
tags: [go]
layout: post
cover:
  image: /vp-blog/covers/go.png
---

## 背景

在后端接口一般做了缓存的情况下，获取数据的步骤是这样的：

1.去缓存查询书否有对应的数据
2.如果命中则返回并结束
3.如果没有命中，则去数据库中查询，将结果返回的同时将缓存设置好


## 问题

我们用如下代码模拟这个过程：

```go
package singleFlight_demo

import (
	"errors"
	"fmt"
	"golang.org/x/sync/singleflight"
	"log"
	"sync"
	"testing"
)

var errorNotExist = errors.New("not exist")
var g singleflight.Group

func TestSingleFlight(t *testing.T) {
	var wg sync.WaitGroup
	wg.Add(10)

	for i := 0; i < 10; i++ {
		go func() {
			defer wg.Done()
			v, err := getData("some key")
			if err != nil {
				return
			}

			fmt.Println(v)
		}()
	}
	wg.Wait()
}

func getData(key string) (string, error) {
	data, err := getDataFromCache(key)
	if errors.Is(err, errorNotExist) {
		data, err = getDateFromDB(key)

		if err != nil {
			return "", err
		}
	} else if err != nil {
		return "", err
	}

	return data, nil
}

func getDataFromCache(key string) (string, error) {
	return "", errorNotExist
}

func getDateFromDB(key string) (string, error) {
	log.Printf("get %s from db", key)
	return "12345678990", nil
}
```

执行它，结果是这样的：

```text
2023/10/10 17:55:17 get some key from db
12345678990
2023/10/10 17:55:17 get some key from db
12345678990
2023/10/10 17:55:17 get some key from db
12345678990
2023/10/10 17:55:17 get some key from db
12345678990
2023/10/10 17:55:17 get some key from db
12345678990
2023/10/10 17:55:17 get some key from db
12345678990
2023/10/10 17:55:17 get some key from db
12345678990
2023/10/10 17:55:17 get some key from db
12345678990
2023/10/10 17:55:17 get some key from db
12345678990
2023/10/10 17:55:17 get some key from db
12345678990
```

我们会发现，在并发场景下，10 个请求都没有命中缓存，它们都去查询了数据库，然而这会给数据库带来不必要的压力，也有多次不必要的设置缓存。


## Singleflight

我们完全可以让其中一个请求去查询数据库，其他请求也使用它的查询结果即可，我们可以使用 `singleflight 来优化`, 代码如下：

```go
2023/10/10 17:58:18 get some key from db
12345678990
12345678990
12345678990
12345678990
12345678990
12345678990
12345678990
12345678990
12345678990
12345678990
```

可以发现，真正请求数据库的只有 1 次，但是 10 次请求都拿到了结果。

  