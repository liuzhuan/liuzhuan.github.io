---
layout: post
title: JS 中的专用工作线程
date: 2024-10-12 23:19:00 +0800
---

JS 是单线程语言，逻辑运算和页面渲染全部由主线程（UI 线程）完成。如果运算量大，可能造成页面性能下降。

写个计算斐波那契数列的例子感受一下。当输入值超过 40，页面会有明显卡顿，UI 控件被冻结，不再响应用户交互。

```html
<!-- index.html -->

fib(<input id="input" type="number" />) = <span id="output">?</span>

<script>
    const $input = document.querySelector('#input')
    const $output = document.querySelector('#output')

    $input.oninput = e => {
        const n = parseInt(e.target.value, 10)
        if (!isNaN(n)) {
            $output.textContent = '...'

            setTimeout(() => {
                $output.textContent = fib(n)
            }, 10)
        }
    }

    function fib(n) {
        if (n <= 1) return n
        return fib(n - 1) + fib(n - 2)
    }
</script>
```

**工作线程**（Web Worker）是一种在浏览器运行的后台线程，执行它的脚本不会影响页面性能。工作线程和主线程拥有各自的全局上下文，它俩相互隔离，彼此之间通过消息（message）传递信息。

为了线程安全，工作线程有一些使用限制，它不能直接修改 DOM 元素，也不能访问 `window` 上的变量和方法。

工作线程按照用途分为三类：

1. **专用工作线程**（Dedicated workers），只能被一个脚本使用，可以在后台执行计算密集型任务，即使执行长时间运行的同步任务，用户界面也能保持流畅。
2. **共享工作线程**（Shared workers），可以被多个页面的多个脚本调用，它允许多个浏览器上下文（例如不同的标签页、iframe 或其他 workers）共享一个后台线程，方便多页面共享数据。
3. **服务工作线程**（Service workers），它像一个代理服务器，可以拦截浏览器请求，控制页面缓存，实现离线体验等功能，常用于 [PWA](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps "Progressive web apps") 渐进式 web 应用。

本文只介绍专用工作线程，它最简单。

主线程和工作线程通过消息交换数据。发送数据使用 `postMessage(value)` 方法，接收数据需要监听 `message` 事件（数据在事件实例的 `data` 属性中）。

工作线程的代码要写在一个单独的文件中，比如 `worker.js`。

```js
// worker.js

// 监听 message 事件
onmessage = (e) => {
    // 接收主线程发来的数据
    const data = e.data

    // 执行复杂运算
    const result = expensiveCompute()

    // 向主线程返回计算结果
    postMessage(result)
}
```


在主线程中，使用 [`Worker(url)`](https://developer.mozilla.org/en-US/docs/Web/API/Worker/Worker) 构造函数创建专用工作线程的实例。其中 `url` 是工作线程代码所在的脚本地址，比如上面的 `worker.js`。然后通过实例发送和接收消息。

```js
// 创建工作线程实例
const worker = new Worker('worker.js')

worker.onmessage = (e) => {
    // 接收工作线程的数据
    const data = e.data

    // ...
}

// 向工作线程发送消息
worker.postMessage(someData)
```

如果你使用 Vite 等打包器，通常他们会建议使用 `import.meta.url` 作为基础地址，如下：

```js
const worker = new Worker(new URL('worker.js', import.meta.url))
```

当你不再使用工作线程，可以调用 [`terminate()`](https://developer.mozilla.org/en-US/docs/Web/API/Worker/terminate) 方法立即停止它。

```js
worker.terminate()
```

## 使用工作线程

如果使用专用工作线程改造一开始的例子，代码可以这么写：

```html
<!-- index.html -->

fib(<input type="number" id="input" />) = <span id="output">?</span>

<script>
    const $input = document.querySelector('#input')
    const $output = document.querySelector('#output')
    const worker = new Worker('./worker.js')

    worker.onmessage = e => {
        $output.textContent = e.data
    }
    
    $input.oninput = e => {
        const n = parseInt(e.target.value, 10)
        if (!isNaN(n)) {
            $output.textContent = '...'
            worker.postMessage(n)
        }
    }
</script>
```

```js
// worker.js
onmessage = e => {
  postMessage(fib(e.data))
}

function fib(n) {
  if (n <= 1) return n
  return fib(n - 1) + fib(n - 2)
}
```

使用 worker 改造后的例子，尽管计算时间依然很长，但是不会造成页面卡顿。

下一篇：[JS 中的共享工作线程](https://www.1zh.tech/2024/10/14/sharedworker.html)