---
layout: post
title: Node.js 入门
date: 2017-12-19
---

Node.js 是一个基于谷歌 Chrome V8 引擎的 JavaScript 框架，常用于后端开发
和自动化脚本工具。

Node.js 生于 2009 年，生父 [Ryan Dahl](http://tinyclouds.org/)，养父 [Isaac Schlueter](https://github.com/isaacs)。

相关代码可查看[node-demo][node-demo]。

## 事件循环

Node.js 是单线程应用，但通过事件和回调函数可支持并发执行。

```javascript
var events = require('events')

var eventEmitter = new events.EventEmitter()
eventEmitter.on('eventName', eventHandler)
eventEmitter.emit('eventName')
```

Node 的很多对象都可以抛出事件，它们都是 `events.EventEmitter` 的实例。

`EventEmitter` 对象的方法包括：

```javascript
// 实例方法
addListener(event, listener)
on(event, listener)
once(event, listener)
removeListener(event, listener)
removeAllListener([event])
setMaxListeners(n)
// 返回指定事件的监听器数组
listeners(event)
emit(event, [arg1], [arg2], [...])

// 类方法
EventEmitter.listenerCount(emitter, event)
```

`EventEmitter` 自带的事件有 `newListener`, `removeListener`。

[event-emitter code](https://github.com/liuzhuan/node-demo/blob/master/event-emitter/main.js) 可以看出，`on` 不检测监听函数是否已存在，会有重复调用状况。

## 缓冲区 Buffer

纯 JavaScript 对二进制支持有限。但在 TCP 流或文件系统中，经常需要处理八位组。Node.js 因此提供 Buffer 类，专门存储原始数据，就像整型数组一样。Buffer 实例对应 v8 堆之外一块裸内存。

Buffer 是全局类，无需导入，开箱即用。

```javascript
/** 创建缓冲区 */
// 创建 10 个未初始化八位组
var buf = new Buffer(10)
// 从数组创建
var buf = new Buffer([10, 20, 30, 40, 50])
// 从给定字符串创建，可选编码
var buf = new Buffer('Simply Easy Learning', 'utf-8')
// 可选编码有 utf8, ascii, utf8, utf16le, ucs2, base64, hex

/** 向缓冲区写 */
buf.write(string[, offset][, length][, encoding])
// 向缓冲区写入字符串，若字符字数超过缓冲区长度，会被截断

/** 读取缓冲区 */
buf.toString([encoding][, start][, end])

/** 缓冲区转换为 JSON */
buf = new Buffer('hello')
buf.toJSON()
// => { type: 'Buffer', data: [ 104, 101, 108, 108, 111 ] }

/** 连接缓冲区 */
Buffer.concat(list[, totalLength])
var buffer1 = new Buffer('TutorialsPoint')
var buffer2 = new Buffer('Simply Easy Learning')
var buffer3 = Buffer.concat([buffer1, buffer2])
console.log('buffer3 content: ' + buffer3.toString())

/** 比较缓冲区 */
buf.compare(otherBuffer)

/** 拷贝缓冲区 */
buf.copy(targetBuffer[, targetStart][, sourceStart][, sourceEnd])

/** 切片缓冲区 */
buf.slice([start][, end])

/** 类方法 */
Buffer.isEncoding(encoding)
Buffer.isBuffer(obj)
Buffer.byteLength(string[, encoding])
Buffer.concat(list[, totalLength])
Buffer.compare(buf1, buf2)
```

## 流

流可以无间断读取或写入数据，有四种类型：

- 可读的
- 可写的
- 双工的
- 变形的：一种双工流，输出由输入计算得出。

流皆为 EventEmitter 实例，可在不同阶段抛事件。常用事件如下：

- `data` 有可读数据时
- `end` 当无数据可读时
- `error` 读写发生异常时
- `finish` 所有数据已写入底层系统时

常用 API 如下：

```javascript
/** 创建可读流 */
var readStream = fs.createReadStream(file)
readStream.setEncoding('utf8')
readStream.on('data', (chunk) => data += chunk)
readStream.on('end', () => console.log(data))
readStream.on('error', err => console.log(err.stack))

/** 创建可写流 */
var writeStream = fs.createWriteStream('output.txt')
writeStream.write(data, 'utf8')
// 标记文件结束
writeStream.end()

writeStream.on('finish', () => console.log('write complete'))
writeStream.on('error', err => console.log(err.stack))

/** 管道链接流 */
var readStream = fs.createReadStream('input.txt')
var writeStream = fs.createWriteStream('output.txt')
readStream.pipe(writeStream)

/** 串联流 */
fs.createReadStream('input.txt')
    .pipe(zlib.createGzip())
    .pipe(fs.createWriteStream('input.txt.gz'))
```

[流代码示例](https://github.com/liuzhuan/node-demo/tree/master/stream-demo)

## 文件系统

Node 文件处理是标准 POSIX 函数的简单封装，在 `fs` 模块定义。

fs 模块每个方法都有同步和异步版本。

常用 API 如下：

```javascript
var fs = require('fs')

fs.readFile('input.txt', function(err, data){
    if (err) {
        return console.error(err)
    }
    console.log('Asynchronous read: ' + data.toString())
})

/** 打开文件 */
fs.open(path, flags[, mode], callback)

/** 获取文件信息 */
fs.stat(path, function(err, stats){})

// fs.Stats 函数
stats.isFile()
stats.isDirectory()
stats.isBlockDevice()
stats.isCharacterDevice()
stats.isSymbolicLink()
stats.isFIFO()
stats.isSocket()

/** 写文件 */
fs.writeFile(filename, data[, options], callback)

/** 读取文件 */
fs.read(fd, buffer, offset, length, position, callback)
// fd: 文件描述符，fs.open() 返回
// buffer: 储存数据的缓冲区
// offset: 写入数据位于缓冲区的偏移量
// length: 写入字节的数目
// position: 从文件哪个位置开始读取
// callback: 回调函数，形参有三：err, bytesRead, buffer

/** 关闭文件 */
fs.close(fd, callback)

/** 截短文件 */
fs.ftruncate(fd, len, callback)

/** 删除文件 */
fs.unlink(path, callback)

/** 创建目录 */
fs.mkdir(path[, mode], callback)

/** 读取目录 */
fs.readdir(path, function(err, files){})

/** 删除目录 */
fs.rmdir(path, callback)
```

常见的 flags 如下：

- `r` 读
- `r+` 读写 
- `rs` 同步读
- `rs+` 同步读写
- `w` 写
- `wx` 若文件已存在则失败
- `w+` 读写
- `wx+`
- `a` 增加
- `ax`
- `a+`
- `ax+`

## 工具模块

### OS 模块

### Path 模块

### Net 模块

### DNS 模块

### Domain 模块

TOREAD: https://www.tutorialspoint.com/nodejs/nodejs_utitlity_module.htm

## 术语表

- 事件循环 Event Loop
- 单线程的 single threaded
- 监听器 listener
- 缓冲区 buffer
- 八位组 octet
- 堆 heap
- 裸内存 raw memory
- 流 stream
- 双工的 duplex

## REF

- [Node.js Tutorial - tutorialspoint.com][tutorialspoint]

[tutorialspoint]: http://www.tutorialspoint.com/nodejs/
[node-demo]: https://github.com/liuzhuan/node-demo
[ruanyifeng-eventloop]: http://www.ruanyifeng.com/blog/2014/10/event-loop.html