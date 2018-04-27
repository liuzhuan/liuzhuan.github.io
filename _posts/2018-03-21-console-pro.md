---
layout: post
title: 10 个 Console 高级用法
date: 2018-03-21
---

前端开发难免遭遇 bug，工程师最顺手的 bug 探测器，非 `console` 系列莫属。

常见的初级用法包括：`console.log`, `console.info`, `console.warn`, `console.error`。

下面来展示一下高级用法。

## 1. `console.trace()`

打印堆栈。

```js
function outer() {
    inner()
}

function inner() {
    console.trace()
}

outer()
```

输出内容：

```
inner @ trace-demo:6
outer @ trace-demo:2
(anonymous) @ trace-demo:9
```

## 2. `console.time()` && `console.timeEnd()`

掐时间，可以为不同时间段设置不同的标签。

```js
function loop(num) {
    var res = num
    for (var i = 0; i < num; i++) {
        res = res * 2 
    }
}

console.time('loop1')
loop(100)
console.timeEnd('loop1')

console.time('loop2')
loop(100000)
console.timeEnd('loop2')
```

输出内容如下：

```js
loop1: 0.06982421875ms
loop2: 1.057861328125ms
```

## 3. `console.memory`

这是一个属性，不是方法，可以返回当前的堆状态。

```js
console.memory
/**
* MemoryInfo { jsHeapSizeLimit: 21900000, totalJSHeapSize: 20500000, usedJSHeapSize: 19300000 }
*/
```

## 4. `console.profile('profileName')` && `console.profileEnd('profileName')`

开启和关停浏览器性能工具，非标准方法。

> 我在 Chrome 上试用了下，不好使。不知道什么原因。

## 5. `console.count('STUFF I COUNT')`

计数，看看程序跑了几次。

## 6. `console.assert(false, 'Log me!')`

断言。注意在 Node.js 中运行时，会抛出 `Assertion` 异常。

## 7. `console.group()` && `console.groupEnd()`

分组，建立树形结构。

## 8. 字符替换

```js
console.log('Hello %s, I am %i years old. I am %f m', 'world', 18, 1.28)
// => Hello world, I am 18 years old. I am 1.28 m
console.log('Hello %o', { name: 'world', age: 18 })
// => Hello {name: "world", age: 18}
```

## 9. `console.clear()`

清空。

## 10. `console.table()`

将数组打印成表格。

## REF

- [10 Tips for Javascript Debugging Like a PRO with Console - medium.com][medium], by *Yotam Kadishay*, 2018/02/11

[medium]: https://medium.com/appsflyer/10-tips-for-javascript-debugging-like-a-pro-with-console-7140027eb5f6
