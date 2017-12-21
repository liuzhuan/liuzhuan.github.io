---
layout: post
title: Node.js 入门
date: 2017-12-19
---

Node.js 是一个基于谷歌 Chrome V8 引擎的 JavaScript 框架，常用于后端开发
和自动化脚本工具。

Node.js 生于 2009 年，父亲 Ryan Dahl。

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

TOREAD: https://www.tutorialspoint.com/nodejs/nodejs_buffers.htm

## 术语表

- 事件循环 Event Loop
- 单线程的 single threaded
- 监听器 listener
- 缓冲区 buffer
- 八位组 octet
- 堆 heap
- 裸内存 raw memory

## REF

- [Node.js Tutorial - tutorialspoint.com][tutorialspoint]

[tutorialspoint]: http://www.tutorialspoint.com/nodejs/
[node-demo]: https://github.com/liuzhuan/node-demo
[ruanyifeng-eventloop]: http://www.ruanyifeng.com/blog/2014/10/event-loop.html