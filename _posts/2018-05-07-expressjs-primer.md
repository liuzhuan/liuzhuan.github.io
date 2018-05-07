---
layout: post
title: Express.js 基础
date: 2018-05-07
---

* TOC
{:toc}

> Fast, unopinionated, minimalist web framework for node.

最简代码如下：

```js
var express = require('express')
var app = express()

app.get('/', function(req, res) {
    res.send('Hello world!')
})

app.listen(3000)
```

截止到 2018 年 5 月 7 日，最新版本是 v4.16.0。

## 安装

```sh
$ npm install express --save
```

还可以安装 [nodemon][nodemon]，它能自动监听源文件，一旦改动就可以重启服务器，特别适合开发阶段。

```sh
$ node install -g nodemon
```

然后，使用 `nodemon` 代替 `node` 启动应用即可。

## 路由

以下方法用来在 Express 中定义路由。

### app.method()

函数签名如下：

```js
app.method(path, handler)
```

其中的 METHOD 可以是任意一个 HTTP 动词，比如 get, set, put, delete 等。

可以在一个路由上定义多个不同的动词，比如：

```js
var express = require('express')
var app = express()

app.get('/hello', function(req, res){
   res.send("Hello World!")
})

app.post('/hello', function(req, res){
   res.send("You just called the post method at '/hello'!\n")
})

app.listen(3000)
```

可以使用如下命令监测 `POST` 请求的返回值：

```sh
# 注意 POST 必须大写
$ curl -X POST "http://localhost:3000/hello"
```

除此之外，还有特殊方法 `all()`，将所有 HTTP 动作映射到同一个 handler 函数。比如：

```js
app.all('/test', function(req, res){
   res.send("HTTP method doesn't have any effect on this route!")
})
```

该方法通常用于定义中间件。

### Router

上面方法定义的路由难以维护。为了将路由配置从主文件分离，可以使用 `Express.Router`。创建新文件 `things.js`，输入代码：

```js
var express = require('express')
var router = express.Router()

router.get('/', function(req, res){
   res.send('GET route on things.')
})

router.post('/', function(req, res){
   res.send('POST route on things.')
})

// export this router to use in our index.js
module.exports = router
```

然后在主文件 `index.js` 引用，在 `app.listen()` 之前使用路由：

```js
var express = require('Express')
var app = express()

var things = require('./things.js')

// both index.js and things.js should be in same directory
app.use('/things', things)

app.listen(3000)
```

`app.use()` 方法会把 `/things/` 的路由处理逻辑转交给 `things.js`。`things.js` 定义的根路由 `/` 其实相当于 `/things` 的子路由。

可以验证一下输出：

```sh
$ curl http://localhost:3000/things
$ curl -X POST http://localhost:3000/things
```

`Router` 可以有效分离关注点，将相关实体的接口放置到一起。

## 构建 URL

我们可以使用动态路由传递参数。只需要在参数名称之前增加 `:` 即可。

```js
var express = require('express')
var app = express()

app.get('/:id', function(req, res){
   res.send('The id you specified is ' + req.params.id)
})
app.listen(3000)
```

下面是一个更复杂的例子：

```js
var express = require('express')
var app = express()

app.get('/things/:name/:id', function(req, res) {
   res.send('id: ' + req.params.id + ' and name: ' + req.params.name)
})
app.listen(3000)
```

使用 `req.params` 可以从 URL 中获取所有的动态参数。

### 模式匹配的路由

可以使用正则表达式限制 URL 参数范围。比如，id 需要设定为 5 个长度的数字。可以如此定义：

```js
var express = require('express')
var app = express()

app.get('/things/:id([0-9]{5})', function(req, res){
   res.send('id: ' + req.params.id)
})

app.listen(3000)
```

如果路由没有匹配

TODO

## 中间件

TODO

## 模板

TODO

## 静态文件

TODO

## 表单数据

TODO

## 数据库

TODO

## Cookie

TODO

## Session

TODO

## 认证

TODO

## RESTful API

TODO

## 脚手架

TODO

## 错误处理

TODO

## 调试

TODO

## 最佳实践

TODO

## REF

- [Express - Home][home]
- [expressjs/express - github][github]
- [ExpressJS Tutorial - tutorialspoint.com][tutorialspoint]
- [nodemon][nodemon]

[home]: http://expressjs.com/
[github]: https://github.com/expressjs/express
[tutorialspoint]: https://www.tutorialspoint.com/expressjs/index.htm
[tj]: https://github.com/tj
[nodemon]: https://nodemon.io/