---
title: 在 gin 项目中使用 swagger
date: 2023-04-25 09:57:23
tags: [go, gin]
layout: post
cover:
  image: /vp-blog/covers/go.png
---

## 前言

准备开发一个低代码的问卷项目，类似于问卷星，后端采用 gin，前后端沟通的最重要部分是文档，但是我不想手动维护文档，所以采用 swagger 来生成。


## main 代码

`main` 函数上的注释，后续会成为文档的一部分，同样会成为文档一部分的是，下一部分 controller 上的注释。

除了导入 swagger 相关的包，我们还需要导入项目的一个目录，它是由 `swag init` 命令自动生成的，如果不导入会遇到，swagger 网站打开后加载 json 失败的问题。

```go
package main

import (
	swaggerFiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"
	_ "survey-api/docs"
)

// @title 问卷项目
// @description 项目练习
// @version 1.0
// @contact.name golang
// @contact.url https://www.baidu.com
func main() {
	r := gin.Default()
	api.RegisterHandlers(r)

	r.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerFiles.Handler, ginSwagger.PersistAuthorization(true)))

	srv := &http.Server{
		Addr:    ":8000",
		Handler: r,
	}

	err := srv.ListenAndServe()
	if err != nil {
		panic(err)
	}
}
```


## controller 代码

```go
package inquirer

import (
	"net/http"
	"survey-api/domain/inquirer"
)
import "github.com/gin-gonic/gin"

type Controller struct {
	inquirerService *inquirer.Service
}

func NewInquirerController(service *inquirer.Service) *Controller {
	return &Controller{inquirerService: service}
}

// CreateInquirer godoc
// @Summary 创建问卷平台的用户
// @Tags Auth
// @Accept json
// @Product json
// @Param CreateUerRequest body CreateInquirerRequest true "表单"
// @Success 201 {object} CreateInquirerResponse
// @Failure 400 {object} api_helper.ErrorResponse
// @Router /inquirer [post]
func (c *Controller) CreateInquirer(g *gin.Context) {
	var req CreateInquirerRequest
	if err := g.ShouldBind(&req); err != nil {
		// TODO: handleError
		return
	}

	i := inquirer.NewInquirer(req.Email, req.Username, req.Password)
	err := c.inquirerService.Create(i)
	if err != nil {
		// TODO: handleError
		return
	}

	g.JSON(http.StatusCreated, CreateInquirerResponse{})
}
```

我们基本上，只需要按这个模版写上少量注释，就能够生成文档。


## 总结

swagger 网站的默认风格调用 api 还是非常不方便的，我暂时没有发现更换现成主题的方式，但是它只是支持导入到 postman 的，我们可以在 postman 里进行接口的测试。
