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

如果路由没有匹配，会得到响应信息 `"Cannot GET <your-request-route>"`。这个报错信息可以使用 `*` 通配符路由代替：

```js
var express = require('express')
var app = express()

// Other routes here
app.get('*', function(req, res){
   res.send('Sorry, this is an invalid URL.')
})

app.listen(3000)
```

⚠️ 注意，**通配符 `*` 路由需要放置在其他所有路由之后**，因为 Express 匹配路由的顺序是从前往后，如果将其放在前面，会拦截其后的路由。

## 中间件

中间件函数指的是可以访问请求对象（`req`）、响应对象（`res`）和下一个中间件函数（常用 `next` 表示）的一类函数。

中间件函数可以执行任务：

- 运行任意代码
- 修改请求和响应对象
- 结束请求-响应循环
- 调用函数栈的下一个中间件函数

如果当前中间件函数没有终结请求-响应循环，它必须调用 `next()` 将控制权移交下一个中间件函数。否则，请求将被闲置。

Express 应用可以使用如下类型的中间件函数：

- 应用级别中间件
- 路由级别中间件
- 错误处理中间件
- 内置中间件
- 第三方中间件

### 应用级别中间件

可以通过 `app.use()` 或 `app.METHOD()` 函数，将应用级别中间件绑定至某一 app 实例，其中的 `METHOD` 指的是 HTTP 请求方法（比如 GET、PUT 或 POST）的小写形式。

比如，如下中间件函数会在每个请求到来时执行：

```js
var app = express()

app.use(function (req, res, next) {
  console.log('Time:', Date.now())
  next()
})
```

以下的中间件函数绑定在 `/user/:id` 路径上。任意请求方法都可以触发该中间件函数：

```js
app.use('/user/:id', function (req, res, next) {
  console.log('Request Type:', req.method)
  next()
})
```

以下代码显示了路由和相应的处理函数（中间件系统）：

```js
app.get('/user/:id', function (req, res, next) {
  res.send('USER')
})
```

以下代码显示了在某一个路由上加载一系列中间件函数。

```js
app.use('/user/:id', function (req, res, next) {
  console.log('Request URL:', req.originalUrl)
  next()
}, function (req, res, next) {
  console.log('Request Type:', req.method)
  next()
})
```

路由处理器允许我们对同一路由定义多个路由。下面例子为 `/user/:id` 路径定义了两个 GET 请求。第二个路由不会触发任何错误，但永远不会被执行，因为第一个路由中断了请求-响应循环。

```js
app.get('/user/:id', function (req, res, next) {
  console.log('ID:', req.params.id)
  next()
}, function (req, res, next) {
  res.send('User Info')
})

// handler for the /user/:id path, which prints the user ID
app.get('/user/:id', function (req, res, next) {
  res.end(req.params.id)
})
```

为了跳过中间件栈剩余的中间件函数，可以调用 `next('route')` 将控制权转交给下一个路由。⚠️ 注意，`next('route')` 只适用于 `app.METHOD()` 或 `router.METHOD()` 加载的中间件函数。

```js
app.get('/user/:id', function (req, res, next) {
  // if the user ID is 0, skip to the next route
  if (req.params.id === '0') next('route')
  // otherwise pass the control to the next middleware function in this stack
  else next()
}, function (req, res, next) {
  // render a regular page
  res.render('regular')
})

// handler for the /user/:id path, which renders a special page
app.get('/user/:id', function (req, res, next) {
  res.render('special')
})
```

### 路由级别中间件

TODO

### 错误处理中间件

TODO

### 内置中间件

TODO

### 第三方中间件

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
[using-middleware]: http://expressjs.com/en/guide/using-middleware.html