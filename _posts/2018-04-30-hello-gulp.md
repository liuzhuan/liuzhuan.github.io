---
layout: post
title: Hello Gulp
date: 2018-04-30
---

Gulp 官网自我介绍如下：

> Automate and enhance your workflow

自动化增强工作流的工具集。

## 使用

首先全局安装 `gulp-cli`。

> 若曾安装旧版 gulp，首先需要将其卸载 `npm rm --global gulp`，确保旧版本不与新版本冲突。

```sh
$ npm install --global gulp-cli
```

然后在项目开发依赖（`devDependencies`）中安装 gulp：

```sh
$ npm install --save-dev gulp
```

在项目根目录中编写 `gulpfile.js`：

```js
var gulp = require('gulp')

gulp.task('default', function() {
    // 将你的默认任务代码放置在此
})
```

此时，执行 `gulp` 即可启动默认任务。

若要启动其他任务，可以使用 `gulp <task> <othertask>`。

## 理解 stream（流）

Gulp 基于 Node.js 的 stream 对数据做各种转换，因此要掌握 Gulp，就一定要了解 Node.js 的 Stream。

[stream-handbook][handbook] 涵盖了 stream 的基本操作，值得一读。

Stream 就像河流一样，数据如同其中的河水。从源头开始，河水会经过很多河道，宽的窄的，高的低的，夹杂泥沙的，甜的咸的，尽管会经过很多变化，但是河流是不断的。

Stream 的概念最早来自 Unix，是一种将小程序组合为大程序的可靠方法。Unix 中的 stream 通过管道符号 `|` 相连。在 Node 中，内建模块 stream 提供了相应的功能。Node stream 通过 `.pipe()` 相连接。

### 为什么要使用 stream？

node 的 I/O 是异步的，所以针对磁盘和网络的交互会涉及传递回调函数。如果要通过服务器请求一个磁盘文件，你可能会这么写：

```js
var http = require('http')
var fs = require('fs')

var server = http.createServer(function(req, res) {
    fs.readFile(__dirname + '/data.txt', function(err, data) {
        res.end(data)
    })
})

server.listen(8000)
```

代码可以工作，但却很笨。对于每次请求，都要把整个 `data.txt` 读取到内存，然后再给客户端返回响应。如果 `data.txt` 体积比较大，同时有很多用户访问，这个应用就会吃掉很多内存。

用户体验也会比较差，因为用户需要等待读取整个文档后，才能接收到响应。

幸运的是，`(req, res)` 参数都是 stream，这样我们就可以使用 `fs.createReadStream()` 代替 `fs.readFile()`，写出更好的代码：

```js
var http = require('http')
var fs = require('fs')

var server = http.createServer(function(req, res) {
    var stream = fs.createReadStream(__dirname + '/data.txt')
    stream.pipe(res)
})

server.listen(8000)
```

这里，`.pipe()` 负责监听 `fs.createReadStream()` 创建的 stream 的 `data` 和 `end` 事件。代码不仅更简洁，`data.txt` 文件也会读取一块，接着马上向客户端发送一块（不像 `fs.readFile()`，读取完整个文件才向客户端发送数据）。

使用 `pipe()` 还有其他好处，比如自动处理反向压力（`backpressure`）。在客户端带宽不足，或高延迟的情况下，node 不会将多余的内容堆积到内存中。客户端取多少用多少，节约环保。

如果你想要压缩，可以使用 oppressor：

```js
var http = require('http')
var fs = require('fs')
var oppressor = require('oppressor')

var server = fs.createServer(function(req, res) {
    var stream = fs.createReadStream(__dirname + '/data.txt')
    stream.pipe(oppressor(req)).pipe(res)
})

server.listen(8000)
```

一旦掌握了 stream 接口，就可以将 stream 模块组合起来，就像搭建乐高积木或连接橡胶水管一样。

Stream 让 node 编程变得简单、优雅和可拆卸。

### stream 基础

stream 分 5 种类型：readable, writable, transform, duplex 和“传统的”。

不同类型的 stream 通过 `.pipe()` 将输出和输入交会对接。

`.pipe()` 函数输入的是一个 readable 流 `src`，并将其输出导流到 writable 流 `dst`：

```js
src.pipe(dst)
```

`.pipe(dst)` 返回 `dst`，因此我们可以将多个 `.pipe()` 串联调用：

```js
a.pipe(b).pipe(c).pipe(d)
```

相当于：

```js
a.pipe(b)
b.pipe(c)
c.pipe(d)
```

**readable stream**

readable stream 产生的数据可以当作 writable, transform 或 duplex stream 的输入数据：

```js
readableStream.pipe(dst)
```

我们先来创建一个 readable stream：

```js
/** read0.js */
var Readable = require('stream').Readable

var rs = new Readable()
rs.push('beep ')
rs.push('boop\n')
rs.push(null)

rs.pipe(process.stdout)
```

```sh
$ node read0.js
beep boop
```

`rs.push(null)` 用来告知消费方（consumer）`rs` 将停止输出数据。

虽然我们通过多次 `push` 操作向 stream 中压入数据，但是还可以一次性输出完整内容。这是因为，在消费方请求数据之前，所有的输入数据被缓存了。

在更多情况下，我们需要的是消费方请求多少，就产生多少数据，尽量避免手工缓存数据。

可以通过定义 `._read` 方法，向 stream 中按需压入数据：

```js
/** read1.js */
var Readable = require('stream').Readable
var rs = new Readable()

var c = 97
rs._read = function() {
    rs.push(String.fromCharCode(c++))
    if (c > 'z'.charCodeAt(0)) rs.push(null)
}

rs.pipe(process.stdout)
```

```sh
$ node read1.js
```

为了演示 `_read` 函数只是在消费方请求的时候才被执行，我们可以稍微修改 readable stream，增加一个延时：

```js
/** read2.js */

var Readable = require('stream').Readable
var rs = new Readable()

var c = 97 - 1
rs._read = function() {
    if (c > 'z'.charCodeAt(0)) return rs.push(null)

    setTimeout(function(){
        rs.push(String.fromCharCode(++c))
    }, 100)
}

rs.pipe(process.stdout)

process.on('exit', function(){
    console.error('\n_read() called ' + (c-97) + ' times')
})

process.stdout.on('error', process.exit)
```

执行程序后，我们能发现，如果只请求 5 比特数据，`_read()` 将只执行 5 次：

```sh
$ node read2.js | head -c5
abcde
_read() called 5 times
```

setTimeout 的延时很重要，因为操作系统需要一些时间来向我们发送相关信号关闭管道。

`process.stdout.on('error', fn)` 的处理函数也是必须的，因为当 `head` 对程序的输出不感兴趣时，操作系统会向进程发送 SIGPIPE 信号，这会导致 `process.stdout` 抛出 EPIPE 异常。

**消费 readable stream**

有时候，直接消费一个 readable stream 也是很有用的：

```js
/** consume0.js */
process.stdin.on('readable', function(){
    var buf = process.stdin.read()
    console.dir(buf)
})
```

```sh
$ (echo abc; sleep 1; echo def; sleep 1; echo ghi) | node consume0.js
Buffer [ 97, 98, 99, 10 ]
Buffer [ 100, 101, 102, 10 ]
Buffer [ 103, 104, 105, 10 ]
null
```

当数据就绪，`readable` 事件抛出，利用 `.read()` 函数从缓存中获取些许数据。

当流关闭，`read()` 返回 `null`，只因无法获取更多字节。

可以通过 `.read(n)` 返回 n 个字节数据。

比如，下面例子使用 `read(n)` 将数据读取进入 3 个字节块：

```js
process.stdin.on('readable', function(){
    var buf = process.stdin.read(3)
    console.dir(buf)
})
```

但是这个程序输出的数据是不完整的！

```sh
$ (echo abc; sleep 1; echo def; sleep 1; echo ghi) | node app.js
Buffer [ 97, 98, 99 ]
Buffer [ 10, 100, 101 ]
Buffer [ 102, 10, 103 ]
```

这是因为，在内部缓存区中有些额外数据，我们需要一些方法告知 node，除了已读的 3 个字节，我们还对更多的数据感兴趣。一个简单的 `read(0)` 可以解决这个问题：

```js
process.stdin.on('readable', function(){
    var buf = process.stdin.read(3)
    console.dir(buf)
    process.stdin.read(0)
})
```

现在的数据输出正常了：

```sh
$ (echo abc; sleep 1; echo def; sleep 1; echo ghi) | node app.js
Buffer [ 97, 98, 99 ]
Buffer [ 10, 100, 101 ]
Buffer [ 102, 10, 103 ]
Buffer [ 104, 105, 10 ]
```

**writable stream**

```js
src.pipe(writableStream)
```

创建 writable stream

只需定义 `._write(chunk, enc, next)` 函数，就可以将 readable stream 导入进来：

```js
var Writable = require('stream').Writable
var ws = Writable()
ws._write = function(chunk, enc, next) {
    console.dir(chunk)
    next()
}

process.stdin.pipe(ws)
```

```sh
$ (echo beep; sleep 1; echo boop) | node write0.js
```

第一个形参 `chunk` 是生产者写入的数据。

第二个形参 `enc` 表示字符编码，只有当 `opts.decodeString` 为 `false` 并且写入的数据为字符串时有效。

第三个形参 `next(err)` 回调函数告知消费方，可以写入更多数据。

如果 readable stream 写入字符，数据将被转换为 `Buffer`。除非你自定义 writable stream 时使用了 `Writable({ decodeString: false })`。

向 writable stream 写入数据

只需调用 `.write(data)` 即可。

```js
process.stdout.write('beep boop\n')
```

调用 `end()` 就会告知目标 writable stream 结束写入。可以通过 `.end(data)` 在结束前写入一些数据：

```js
/** writing1.js */
var fs = require('fs')
var ws = fs.createWriteStream('message.txt')

ws.write('beep ')

setTimeout(function(){
    ws.end('boop\n')
}, 1000)
```

```sh
$ node writing1.js
```

当写入的数据超过 `opts.highWaterMark` 高水位警戒线时，`.write()` 函数会返回 `false`。

如果需要知道缓冲区何时清空，可以监听 `drain` 事件。

**transform**

Transform stream 是一种 duplex 流（可读可写）。区别在于，transform stream 的输出由输入决定。

transform stream 有时也被称作“through stream”。

**duplex**

duplex stream 是一种可读可写流，可以进行双向通信，就像电话一样发送和接收数据。rpc 通信就是一种 duplex stream。其格式如下所示：

```js
a.pipe(b).pipe(a)
```

**classic stream**

classic stream 是出现在 node 0.4 版本的旧版 API。

当 stream 注册 `data` 事件监听函数时，就会按照旧版 API 切换到 classic 模式。

classic readable stream

classic readable stream 当有数据时，抛出 `data` 事件，当结束数据读取时，抛出 `end` 事件。

`.pipe()` 通过检测 `stream.readable` 来判断 classic readable stream 是否可读。

下面是一个简单的 classic readable stream，用于输出 A 到 J 的字符：

```js
/** classic0.js */
var Stream = require('stream')
var stream = new Stream()
stream.readable = true

var c = 64
var iv = setInterval(function(){
    if (++c >= 75) {
        clearInterval(iv)
        stream.emit('end')
    }
    else stream.emit('data', String.fromCharCode(c))
}, 100)

stream.pipe(process.stdout)
```

```sh
$ node classic0.js
ABCDEFGHIJ
```

为了从 classic readable stream 中读取数据，可以注册 `data` 和 `event` 监听器。下面的例子展示了使用旧版 readable stream 风格从 `process.stdin` 中获取数据：

```js
/** classic1.js */
process.stdin.on('data', function(buf) {
    console.log(buf)
})

process.stdin.on('end', function(){
    console.log('__END__')
})
```

```sh
$ (echo beep; sleep 1; echo boop) | node classic1.js
<Buffer 62 65 65 70 0a>
<Buffer 62 6f 6f 70 0a>
__END__
```

注意，当你注册 `data` 事件监听器时，就会将 stream 切换到兼容模式，就会失去新版 stream2 api 的便利。

最好不要自己注册 `data` 和 `end` 事件。如果需要和遗留代码交互，可以考虑使用第三方库，通过 `.pipe()` 代替这些事件。

比如，可以使用 [through][through] 来避免手动设置 `data` 和 `end` 监听器：

```js
var through = require('through')
process.stdin.pipe(through(write, end))

function write(buf) {
    console.log(buf)
}

function end() {
    console.log('__END__')
}
```

或者使用 concat-stream 缓冲使用整个 stream 的内容：

```js
/** concat.js */
var concat = require('concat-stream')
process.stdin.pipe(concat(function(body) {
    console.log(JSON.parse(body))
}))
```

```sh
$ echo '{ "beep": "boop" }' | node concat.js
{ beep: 'boop' }
```

classic redable stream 拥有 `.pause()` 和 `.resume()` 方法，可以临时暂停流。

classic writable stream

classic writable stream 很简单，只需要定义 `.write(buf)`, `.end(buf)` 和 `.destroy()` 即可。

未完待续。。。

## REF

- [Gulp 基础与原理][jerryc] by *JerryC*, 2017-02-28
- [Stream Handbook][handbook] by *James Halliday*
- [Gulp.js][gulpjs]
    - [Getting Started][started]
    - [Recipes][recipes]
    - [Articles][articles]
- [Stream | Node.js Documentation][api]

[gulpjs]: https://gulpjs.com
[started]: https://github.com/gulpjs/gulp/blob/v3.9.1/docs/getting-started.md
[recipes]: https://github.com/gulpjs/gulp/tree/v3.9.1/docs/recipes
[articles]: https://github.com/gulpjs/gulp/blob/v3.9.1/docs/README.md#articles
[jerryc]: http://huang-jerryc.com/2017/02/28/gulp-base/
[handbook]: https://github.com/substack/stream-handbook
[api]: https://nodejs.org/dist/latest/docs/api/stream.html
[through]: https://www.npmjs.com/package/through