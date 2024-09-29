---
layout: post
title: 深入了解 Web Storage API
date: 2024-09-29
---

* TOC
{:toc}

[Web Storage API][storage-api] 是浏览器内置的键值对（key/value）存储机制，包括 [`sessionStorage`][sessionStorage] 和 [`localStorage`][localStorage]。两者同属 [`Storage`][storage] 接口，方法名相同，只是存储数据的有效期不同。

`sessionStorage` 的数据在**页面会话**（page session）期间有效。只要标签页不关闭，刷新页面或页面回退，数据都不消失。如果关闭页面，数据就会消失。

`localStorage` 的数据更持久，即使关闭页面也不会消失。

出于安全考虑，不同源（origin）之间的 Storage 数据相互独立。

## 基本用法 {#basic}

`localStorage` 和 `sessionStorage` 常用的方法包括：

- `setItem(key, value)` 设定键名对应的值
- `getItem(key)` 读取键名对应的值，如果为空，返回 `null`
- `removeItem(key)` 移除某个键值对
- `clear()` 移除所有键值对

它俩还有一个不太常用的方法，`key(index)`，可以返回指定索引的键名。有一个不常用的属性 `length`，可以获取当前的键值对个数。

因此，如果想读取当前 origin 的所有键名，可以这么写：

```js
function getStorageKeys(storage) {
    return Array(storage.length).fill('').map((_, i) => storage.key(i))
}

getStorageKeys(window.localStorage)
getStorageKeys(window.sessionStorage)
```

## storage 事件 {#event}

当某个页面的 `localStorage` 数据发生变化，**其他页面**的 `window` 会接收到 `storage` 事件。这个事件一般用于本地缓存数据的同步。

这里有两点需要注意：

1. `sessionStorage` 的数据变化不会触发 `storage` 事件
2. 引发 `localStorage` 数据变化的页面，监听不到本次改变触发的 `storage` 事件

这个事件的类型是 [StorageEvent][storage-event]，它有如下属性：

- `key`：受影响的键名
- `newValue`：数据新值
- `oldValue`：数据旧值
- `storageArea`：受影响的 `Storage` 实例，即 `localStorage`
- `url`：引起数据变化的页面地址

```js
window.addEventListener('storage', (e) => {
    console.log('键名', e.key)
    console.log('新值', e.newValue)
    console.log('旧值', e.oldValue)
    console.log('localStorage', e.storageArea)
    console.log('哪个引发的变化', e.url)
})
```

## 数据限额

根据 MDN 的[描述][quota]，浏览器对于 Web Storage 的数据限额是 10MiB，其中 `sessionStorage` 占 5MiB，`localStorage` 占据 5MiB。

注意，上述限额针对的是同源下的数据限额，不同源之间数据隔离，互不影响，不会叠加。

如果数据超过上限，继续增加数据，会触发 `QuotaExceededError` 异常。

如果你对 MDN 的说法存疑，可以动手检验一下。

首先，访问任意一个页面，打开开发者工具。

然后，借助字符串的 [`repeat()`][string.repeat] 方法构建一个 1MiB 的字符串。

```js
const mib = 'a'.repeat(1024 * 1024)
```

然后，随便打开一个页面，先清空本地缓存，然后依次手动写入多次缓存数据。观察是否会出现报错。

```js
// 清空本地缓存
localStorage.clear()

localStorage.setItem('1', mib)
localStorage.setItem('2', mib)
localStorage.setItem('3', mib)
localStorage.setItem('4', mib)
localStorage.setItem('5', mib) // <- 通常进行到这一步就报错了
```

为什么还没到 5MiB，刚过 4MiB 就报错了？因为键名也会消耗数据限额，如果想榨干 5MiB 的每一个字节，需要从最后一个 `mib` 字符串中剔除 5 个键名占用的空间。

```js
localStorage.setItem('5', mib.slice(0, -5)) // 这次正常执行
```

此后，再增加一个字节，都会触发配额超限的异常 `QuotaExceededError`。看来，MDN 说的是真的。


[storage-api]: https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API "Web Storage API"
[sessionStorage]: https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage "sessionStorage"
[localStorage]: https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage "localStorage"
[storage]: https://developer.mozilla.org/en-US/docs/Web/API/Storage "Storage 接口"
[storage-event]: https://developer.mozilla.org/en-US/docs/Web/API/StorageEvent "StorageEvent"
[storage-event-limit]: https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API#responding_to_storage_changes_with_the_storageevent "Responding to storage changes with the StorageEvent"
[string.repeat]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/repeat "String.prototype.repeat"
[quota]: https://developer.mozilla.org/en-US/docs/Web/API/Storage_API/Storage_quotas_and_eviction_criteria#web_storage "Web Storage Quota"