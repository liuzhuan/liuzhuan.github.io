+++
date = '2024-10-16T18:37:00+08:00'
title = 'JS 中的服务工作线程'
summary = '服务工作线程的基本用法'
tags = ['javascript']
+++

前情提要

1. [JS 中的专用工作线程](/posts/dedicated-worker/)
2. [JS 中的共享工作线程](/posts/shared-worker/)

**服务工作线程**（_[service workers](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers)_）也是工作线程的一种，它的作用就像代理服务器，可以拦截 web 应用发出的请求，并根据网络情况，要么返回真实的服务器响应，要么返回本地缓存。

service workers 可以为 web 应用带来离线使用的能力。它把脚本、图片等资源提前缓存到本地，后续即使没有网络连接，也能正常运行。

和 service workers 搭档的本地缓存功能由 [Cache](https://developer.mozilla.org/en-US/docs/Web/API/Cache) 缓存接口提供。Cache 专门用来存储请求/响应对（[Request][request] / [Response][response] pair）。

## Cache

Cache 是一种客户端存储方案，它比 `localStorage` 容量大，使用比 IndexedDB 简单。它的任务很专一，只存储请求/响应对，请求是键名，响应是值。

通过主线程的 [`window.caches`](https://developer.mozilla.org/en-US/docs/Web/API/Window/caches) 或工作线程的 [`caches`](https://developer.mozilla.org/en-US/docs/Web/API/WorkerGlobalScope/caches) 属性都可以访问缓存区实例，它的类型是 [`CacheStorage`](https://developer.mozilla.org/en-US/docs/Web/API/CacheStorage)。

`CacheStorage` 下可以定义多个 [`Cache`](https://developer.mozilla.org/en-US/docs/Web/API/Cache) 缓存对象。使用 [`caches.open(cacheName)`](https://developer.mozilla.org/en-US/docs/Web/API/CacheStorage/open) 函数根据名称打开一个 `Cache`。如果这个 `Cache` 不存在，则新建它。`open()` 函数的返回值是一个 Promise。

```js
const myCache = await caches.open('v1');
```

> 如无特殊说明，Cache 相关的 API 都是异步函数，返回值都是 Promise。

使用 `Cache` 的 [`put(request, response)`](https://developer.mozilla.org/en-US/docs/Web/API/Cache/put) 方法添加请求/响应对。其中的 `request` 可以是 URL 字符串，也可以是 [Request][request] 实例。`response` 是 [Response][response] 实例。

```js
const myCache = await caches.open('v1');

const url = './index.html';
const resp = await fetch(url);
if (!resp.ok) throw new TypeError('Bad response status');

// 把请求和响应放入本地缓存
await myCache.put(url, resp);
```

因为添加缓存数据是个高频操作，为了简化代码，还可以使用 `Cache` 的 [`add(request)`](https://developer.mozilla.org/en-US/docs/Web/API/Cache/add) 和 [`addAll(requests)`](https://developer.mozilla.org/en-US/docs/Web/API/Cache/addAll) 两个方法，更方便的添加缓存数据。前者一次只能添加一个，后者使用数组一次可以添加多个。

```js
// 一次添加一条缓存数据
await myCache.add('./index.html');

// 批量添加多条缓存数据
await myCache.addAll(['./index.html', './style.css', './logo.png']);
```

如何提取已缓存的响应对象？使用 `Cache` 的 [`match(request)`](https://developer.mozilla.org/en-US/docs/Web/API/Cache/match) 或 [`matchAll(request)`](https://developer.mozilla.org/en-US/docs/Web/API/Cache/matchAll) 方法。前者返回一个缓存对象，后者生成多个匹配的缓存对象，打包在一个数组中返回。

比如，我们想拿到本地缓存的 `./index.html` 请求对象：

```js
// 获取缓存中的响应对象
await myCache.match('./index.html');
```

如果拥有多个 `Cache` 对象，但是你不确定 url 位于哪个里面，可以使用 `CacheStorage` 的 [`match(request)`](https://developer.mozilla.org/en-US/docs/Web/API/CacheStorage/match) 方法从所有 `Cache` 中查找提取数据。

```js
await caches.match('./index.html');
```

如果想删除某个 `Cache` 对象，可以使用 `CacheStorage` 的 [`delete(cacheName)`](https://developer.mozilla.org/en-US/docs/Web/API/CacheStorage/delete) 方法。

```js
await caches.delete('v1');
```

要查看所有 `Cache` 的名称，可以使用 `CacheStorage` 的 [`keys()`](https://developer.mozilla.org/en-US/docs/Web/API/CacheStorage/keys) 方法：

```js
await caches.keys(); //=> ['v1']
```

现在，我们已经掌握了 Cache API 的基本用法。它又是如何同 service workers 搭配使用的？

## Service workers

使用 service workers 的主要步骤分四步：

1. 注册 service workers
2. 初始化缓存资源
3. 拦截页面发出的请求，自行决定优先返回本地缓存还是服务器的真实响应
4. 更新 service workers

### 注册 {#register}

使用 [`ServiceWorkerContainer.register(scriptURL, options)`](https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerContainer/register) 函数注册 service workers 工作线程。在主线程中，担任 `ServiceWorkerContainer` 角色的是 [`navigator.serviceWorker`](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/serviceWorker) 变量。

```js
// 检测是否支持 Service Workers 特性
if ('serviceWorker' in navigator) {
  const reg = await navigator.serviceWorker.register('./sw.js');
  console.log('register success', reg);
} else {
  console.error('Service workers are not supported');
}
```

默认情况下，service workers 的注册范围是工作线程脚本所在的目录。也就是说，只有这些目录下的页面受 service workers 控制。如果想缩小注册范围（影响范围），可以使用选项的 `scope` 属性。

```js
await navigator.serviceWorker.register(
  './sw.js',
  { scope: './product' } // 减小工作线程的注册范围（影响范围）
);
```

`scope` 属性只能缩小注册范围。如果想扩大 service workers 的注册范围，需要使用 [`Service-Worker-Allowed`](https://w3c.github.io/ServiceWorker/#service-worker-allowed) 响应头。

一个 service worker 可以控制许多页面。只要注册范围内的页面被加载，就会安装并激活 service worker 脚本，然后就能控制该页面。

### 初始化缓存资源 {#download-caches}

当工作线程的脚本安装成功，会触发 `"install"` 事件。在它的回调函数中，可以使用 Cache API 把必需的静态资源缓存到本地。

注意，事件和回调函数的代码都位于工作线程脚本文件 `sw.js` 中。[`self`](https://developer.mozilla.org/en-US/docs/Web/API/WorkerGlobalScope/self) 变量表示 service worker 工作线程所在的作用域本身，它的角色类似主线程的 `window`。

```js
// file: sw.js
self.addEventListener('install', (e) => {
  e.waitUntil(addResourcesToCache(['/', '/index.html', '/style.css']));
});

async function addResourcesToCache(resources) {
  const cache = await caches.open('v1');
  await cache.addAll(resources);
}
```

上文中的 [`waitUntil(promise)`](https://developer.mozilla.org/en-US/docs/Web/API/ExtendableEvent/waitUntil) 方法用于确保所有资源缓存成功后，service workers 再进入激活状态。

### 拦截请求 {#intercept}

当 service workers 开始控制页面，它会拦截页面发出的所有请求。每次请求会触发 service worker 的 `"fetch"` 事件。在该事件处理函数内，可以使用 [`event.respondWith()`][respondWith] 函数返回你自己的内容。这个函数的参数可以是 `Response`，也可以是解析为 `Response` 的 Promise。

这里便是 Cache API 的用武之地。

```js
self.addEventListener('fetch', (e) => {
  // 当页面发出请求，返回本地的缓存版本
  e.respondWith(caches.match(e.request));
});
```

本地缓存有匹配的响应固然好，如果没有命中的匹配项，请求页面只能拿到 `undefined`。

为了提升应用的健壮性，我们可以增加一层判断，如果缓存有数据，就用本地缓存数据。否则，向真实的服务器发起响应。

```js
self.addEventListener('fetch', (e) => {
  e.respondWith(cacheFirst(e.request));
});

async function cacheFirst(request) {
  // 先看看本地缓存有没有匹配的响应
  const responseFromCache = await caches.match(request);
  if (responseFromCache) {
    return responseFromCache;
  }

  // 向服务器发起真正的请求
  return fetch(request);
}
```

这还不算完，如果想进一步优化应用性能，应该将服务器返回的响应重新存入缓存，方便后续的程序使用。

```js
self.addEventListener('fetch', (e) => {
  e.respondWith(cacheFirst(e.request));
});

async function cacheFirst(request) {
  const responseFromCache = await caches.match(request);
  if (responseFromCache) {
    return responseFromCache;
  }

  const responseFromNetwork = await fetch(request);
  // 把服务器响应的克隆副本先存入本地
  putInCache(request, responseFromNetwork.clone());
  // 返回服务器的响应
  return responseFromNetwork;
}

async function putInCache(request, response) {
  const cache = await caches.open('v1');
  await cache.put(request, response);
}
```

注意，存入本地缓存的响应是通过 [`clone()`](https://developer.mozilla.org/en-US/docs/Web/API/Response/clone) 克隆函数产生的副本。这一步很重要，因为响应流（_response streams_）只能被读取一次。通过克隆产生的副本存入本地，原始响应返回请求发起方，双方都能拿到可读取的数据，皆大欢喜。

### 更新 service workers {#update-service-workers}

如果已安装过旧版本的 service workers，当新版本的 service workers 可用时，它会在后台安装，但不会马上激活。它会耐心等待，当使用旧版本的页面全部关闭后，它才进入激活阶段。

通常，会在 `"install"` 事件回调函数中，更新缓存数据。注意，本地缓存区的新版本号 `"v2"`。

```js
self.addEventListener('install', (e) => {
  e.waitUntil(
    addResourcesToCache([
      '/',
      '/index.html',
      '/style.css',
      '/app.js',
      // ...
    ])
  );
});

async function addResourcesToCache(resources) {
  const cache = await caches.open('v2');
  await cache.addAll(resources);
}
```

在新版本的安装阶段，旧版本还在使用，因此将新缓存数据放入新的缓存区 `"v2"`，这样不会打扰旧版本使用 `"v1"` 缓存区数据。

当没有页面使用旧版本，新版本的 service workers 会进入激活阶段。当进入激活阶段时，它会接收到 `"activate"` 事件。在这个事件回调函数中，可以清理旧版本的缓存数据。

```js
self.addEventListener('activate', (e) => {
  e.waitUntil(deleteOldCaches());
});

async function deleteOldCaches() {
  const cacheKeepList = ['v2'];
  const keyList = await caches.keys();
  const cachesToDelete = keyList.filter((key) => !cacheKeepList.includes(key));
  await Promise.all(cachesToDelete.map(deleteCache));
}

async function deleteCache(key) {
  await caches.delete(key);
}
```

上面就是 service worker 的基本用法，通过和 Cache 的配合使用，它为普通 web 应用带来了离线使用的能力。

凭此离线能力，它成为 [PWA](https://web.developers.google.cn/explore/progressive-web-apps) 中的重要一员。

[request]: https://developer.mozilla.org/en-US/docs/Web/API/Request 'Request'
[response]: https://developer.mozilla.org/en-US/docs/Web/API/Response 'Response'
[respondWith]: https://developer.mozilla.org/en-US/docs/Web/API/FetchEvent/respondWith
