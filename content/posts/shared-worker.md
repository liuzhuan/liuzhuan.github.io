+++
date = '2024-10-14T15:10:00+08:00'
title = 'JS 中的共享工作线程'
summary = '共享工作线程的基本用法'
tags = ['javascript']
+++

上一篇：[JS 中的专用工作线程](/posts/dedicated-worker/)

**共享工作线程**（_[Shared workers](https://developer.mozilla.org/en-US/docs/Web/API/SharedWorker)_）是工作线程的一种，它可以被多个同源页面访问。

共享工作线程和**专用工作线程**（_Dedicated workers_）的生命周期有明显的不同。专用工作线程只能被创建它的 JS 代码访问，当创建它的页面关闭时，专用工作线程的生命周期也就结束了。共享工作线程可以被同源下多个页面访问，它的生命周期独立于单个页面，只有所有关联的页面全部关闭后，它的生命才会结束。

共享工作线程多用于页面间的数据共享和状态同步。

使用 [`SharedWorker(url)`](https://developer.mozilla.org/en-US/docs/Web/API/SharedWorker/SharedWorker) 构造函数创建共享工作线程。不同页面（同源页面）创建的实例，指向同一个线程。

```js
const myWorker = new SharedWorker('worker.js');
```

主线程和共享工作线程通信需要使用 `port` 属性。多个页面可以同时和一个共享工作线程通信，线程根据 `port` 区分谁是谁，避免信号错位，张冠李戴。

启动 `port` 连接需要执行 `start()` 函数。当使用 `onmessage` 事件回调时，会暗中执行 `start()` 函数，此时无需手动调用它。如果通过 `addEventListener()` 方法监听 `message` 事件，就需要手动调用 `start()` 函数。

从主线程向工作线程发送消息，代码如下：

```js
const myWorker = new SharedWorker('worker.js');

// 向共享工作线程发送消息
myWorker.port.postMessage(value);

// 接收共享工作线程的消息
myWorker.port.onmessage = (e) => {
  console.log(e.data);
};
```

在共享工作线程中，首先在 `onconnect` 回调函数中拿到 `port` 实例，然后再通过 `port` 实例接收和发送消息。

```js
// file: worker.js

onconnect = (e) => {
  // 获取 port 实例，port 的另一头是包含主线程的页面
  const port = e.ports[0];

  // 接收主线程的消息
  port.onmessage = (e) => {
    const result = someOperation(e.data);
    // 向主线程发送消息
    port.postMessage(result);
  };
};
```

每次有新页面连接共享工作线程，会触发它的 `onconnect` 回调方法。

## 一个例子：简单的数字同步 {#demo-num}

我们编写一个工作线程 `worker.js`，其中包含一个简单数字 `num`。如果主线程传递的消息是 `"update"`，则 `num` 加一，并通知主线程新的数值。

```js
// file: worker.js

let num = 0;

onconnect = (e) => {
  const port = e.ports[0];

  port.onmessage = (e) => {
    if (e.data === 'update') {
      num++;
      port.postMessage(num);
    }
  };
};
```

新建两个页面 `index.html` 和 `index2.html`，两者内容几乎一模一样，都是点击按钮，向工作线程发送消息 `"update`。接收线程消息，更新页面显示内容。

```html
<div>num: <span id="output"></span></div>
<button id="btn">更新</button>

<script>
  const $btn = document.querySelector('#btn');
  const $output = document.querySelector('#output');

  const worker = new SharedWorker('./worker.js');

  $btn.addEventListener('click', () => {
    worker.port.postMessage('update');
  });

  worker.port.onmessage = (e) => {
    $output.textContent = e.data;
  };
</script>
```

我们打开两个页面，会发现每次点击按钮，能得到最新的数字 `num`。而且两个页面的 `num` 是共享的。

尽管我们实现了两个页面的数据同步，但是需要手动点击才能看到最新数据，这不够简单。如何让两个页面自动实时同步？

可以在工作线程中把所有的 `port` 储存在一个数组中，当数值变化时，遍历数组，通知所有关联页面。类似一个简易的观察者模式。

```js
// file: worker.js
let num = 0;

// 一个容纳所有 ports 的数组
let ports = [];

onconnect = (e) => {
  const port = e.ports[0];
  // 把新来的 port 存起来
  ports.push(port);

  port.onmessage = (e) => {
    if (e.data === 'update') {
      num++;
      // 遍历 port 通知所有页面
      ports.forEach((p) => p.postMessage(num));
    }
  };
};
```

上面的实现有一个缺点：当页面关闭时，对应的 `port` 依然残留在数组中，这会造成浪费。最好在页面关闭前，通知工作线程，把配套的 `port` 删了。

监听页面关闭，可以使用 `window` 的 [`beforeunload`](https://developer.mozilla.org/en-US/docs/Web/API/Window/beforeunload_event) 事件。

```js
// 在主线程所在页面关闭前，通知共享工作线程一声
window.addEventListener('beforeunload', () => {
  worker.port.postMessage('bye');
});
```

在工作线程的代码，如果发现 `"bye"` 消息，则移除对应的 `port`：

```js
let num = 0;
let ports = [];

onconnect = (e) => {
  const port = e.ports[0];
  ports.push(port);

  port.onmessage = (e) => {
    if (e.data === 'update') {
      num++;
      ports.forEach((p) => p.postMessage(num));
    } else if (e.data === 'bye') {
      // 移除即将关闭页面的 port
      ports = ports.filter((p) => p !== port);
    }
  };
};
```

## 调试共享工作线程 {#debug}

共享工作线程的调试和主线程是独立的，有自己的开发者工具。这意味着，你在工作线程的报错信息、`console.log()` 控制台命令，在主线程的开发者工具是看不到的。

在 Chrome 浏览器，可以访问 `chrome://inspect/#workers` 标签页，打开共享工作线程的开发者工具。Edge 浏览器的地址是 `edge://inspect/#workers`。

## 兼容性 {#compa}

根据 [caniuse.com](https://caniuse.com/mdn-api_sharedworker) 网站统计，`SharedWorker` API 的全球覆盖率为 44.99%。主要是移动端的覆盖率只有 21.01%，相比之下，桌面端的覆盖率高达 96.38%。

如果你的 web 应用无需考虑移动端，现在就可以使用 SharedWorker。否则，最好再等一等。

下一篇：[JS 中的服务工作线程](/posts/service-worker/)
