---
layout: post
title: IndexedDB 的基本用法
date: 2024-09-30 12:16:00 +0800
---

* TOC
{:toc}

[IndexedDB][indexeddb] 是一种大容量客户端存储方案，它可以存储结构化数据，包括 [`File`][file] 和 [`Blob`][blob] 等二进制数据，比如图片、视频等。

`localStorage` 最多存储 5MiB 的容量，IndexedDB 的容量要大得多。按照 [MDN 的说法][storage]，Chrome 浏览器可用的存储容量是总磁盘的 60%。假如你的硬盘总容量是 1TB，那么可用的 IndexedDB 上限是 600GB。

IndexedDB 是一种键值数据库，它属于非关系型数据库。它通过简单的键值对（key-value）存储数据，存取灵活，性能高。

IndexedDB 的 API 多为异步风格，好处是不会阻塞界面渲染，坏处是可读性差，写起来费劲。

## 打开数据库 {#open}

使用数据库的第一步是打开数据库。

使用 [`window.indexedDB.open(name, version)`][IDBFactory.open] 方法打开数据库。`name` 表示数据库的名称，`version` 表示数据库的版本。返回值是一个 [`IDBOpenDBRequest`][IDBOpenDBRequest] 类型的实例。

```js
const dbName = 'codeman'
const dbVersion = 1
const req = indexedDB.open(dbName, dbVersion)
```

`version` 是数据库的版本号，用于数据库的创建和升级，它是整数类型，默认为 `1`。传入不同的版本号，可能会出现以下三种后果之一：

一、如果数据库不存在，或 `open()` 中的版本号大于数据库当前版本号，会触发 `req` 的 `onupgradeneeded` 回调函数。在回调函数内可以创建或调整数据库存储结构，如果执行顺利，会接着触发 `req` 的 `onsuccess` 回调函数。

二、如果 `open()` 的版本号小于数据库当前版本号，会抛出错误，触发 `req` 的 `onerror` 回调函数。

三、如果 `open()` 中的版本号等于数据库当前版本号，只触发 `req` 的 `onsuccess` 回调函数。

在回调函数中，变量 `e.target` 指向发起请求的 `req` 对象，如果连接成功，它的 `result` 属性就是期望的数据库连接对象，类型是 [`IDBDatabase`][IDBDatabase]。

```js
const dbName = 'codeman'
const dbVersion = 2

// 数据库连接对象
let db;
const req = window.indexedDB.open(dbName, dbVersion)

// 监听错误
req.onerror = (e) => {
  console.error('error', e.target.error?.message)
}

req.onupgradeneeded = (e) => {
  console.log('upgrade needed', e)
  db = e.target.result
  // TODO: 创建或调整数据库的存储结构
}

// 数据库连接成功
req.onsuccess = (e) => {
  console.log('success', e)
  db = e.target.result
}
```

## 创建对象存储 {#object-stores}

在关系型数据库中，一个数据库可以包含多个表格（Table）。在 IndexedDB 中，一个数据库可以包含多个**对象存储**（[object store][IDBObjectStore]）。可以把对象存储想象成一个超大的数组，其中可以存储对象类型的数据。

使用数据库连接对象的 [`createObjectStore(name, options)`][createObjectStore] 方法创建对象存储。

其中的 `name` 是对象存储的名称，`options` 是存储选项。常用的选项属性是 `keyPath`，用于指定使用对象的哪个属性当作键。

```js
// ...

req.onupgradeneeded = (e) => {
  db = e.target.result
  createStore(db)
}

/**
* 创建对象存储
* @param {IDBDatabase} db
*/
function createStore(db) {
  const store = db.createObjectStore('tasks', { keyPath: 'id' })
}
```

## 添加数据 {#add-item}

在 IndexedDB 中添加数据必须使用**事务**（transaction）。

事务是一个数据库术语，它指的是一系列数据库操作，这些操作要么全部执行，要么全部不执行，是一个不可分割的工作单位。事务的主要目的是确保数据库的一致性和完整性。

在 IndexedDB 中，事务的具体类型是 [`IDBTransaction`][IDBTransaction]，来自数据库连接对象的 [`transaction(storeNames, mode)`][transaction] 方法。

其中的参数含义如下：

- `storeNames` 本次事务操作涉及的对象存储名称，数组类型。如果只涉及一个，也可以传入字符串类型
- `mode` 本次事务操作涉及的工作模式，可选值有 `"readonly"`（只读）、 `"readwrite"`（读和写）等

因为我们要添加数据，所以需要选择的模式为 `"readwrite"`。

```js
const transaction = db.transaction(['tasks'], 'readwrite')
// 或者
const transaction = db.transaction('tasks', 'readwrite')
```

拿到事务后，使用它的 [`objectStore(name)`][objectStore] 方法获取即将操作的对象存储实例。其中的 `name` 是存储实例的名称。

```js
const transaction = db.transaction('tasks', 'readwrite')
const objectStore = transaction.objectStore('tasks')
```

存储实例的 [`add(value)`][add] 方法用于向数据库添加数据。添加数据是异步操作，返回值是一个请求对象。需要监听它的 `onsuccess` 和 `onerror` 才能确定成功或失败。

把前面的逻辑组合起来，添加数据的完整代码如下：

```js
req.onsuccess = (e) => {
  db = e.target.result
  addItem(db)
}

/**
* 添加一条数据
* @param {IDBDatabase} db
*/
function addItem(db) {
  // 创建一个事务，划定受影响的对象存储范围和工作模式
  const transaction = db.transaction('tasks', 'readwrite')
  // 选中一个对象存储
  const objectStore = transaction.objectStore('tasks')
  // 添加数据
  const addReq = objectStore.add({
    id: 1,
    title: 'Learn IndexedDB usage',
    completed: false
  })

  addReq.onerror = (e) => {
    console.error('add item error', e.target.error?.message)
  }

  addReq.onsuccess = (e) => {
    console.log('add item success', e)
  }
}
```

## 查询数据 {#query}

查询数据和添加数据的主流程基本一致，但是需要调整工作模式为 `"readonly"`。如果你想查询所有的数据，可以使用对象存储实例的 [`getAll()`][getAll] 方法。

查询结果在 `onsuccess` 回调函数中，通过 `e.target.result` 获取。

```js
req.onsuccess = (e) => {
  db = e.target.result
  getAllItems(db)
}

/**
* 查询所有数据
* @param {IDBDatabase} db
*/
function getAllItems(db) {
  const transaction = db.transaction('tasks', 'readonly')
  const objectStore = transaction.objectStore('tasks')
  const getReq = objectStore.getAll()

  getReq.onerror = (e) => {
    console.error('get item error', e.target.error?.message)
  }

  getReq.onsuccess = (e) => {
    console.log('get all items success', e.target.result)
  }
}
```

如果你想根据键值查询某一个对象，使用 `get(key)` 方法。

```js
const getReq = objectStore.get(1)

// 略
```

## 更新数据 {#update}

更新数据，使用对象存储实例的 [`put(value)`][put] 方法。它和 `add()` 的用法类似，只不过会安装键更新原有数据，而非新增数据。

```js
const putReq = objectStore.put({
    id: 1,
    title: 'Learn IndexedDB usage',
    completed: true
})
```

## 删除数据 {#delete}

如果想根据键删除某个数据，可以使用 [`delete(key)`][delete] 方法。

```js
const deleteReq = objectStore.delete(1)
```

如果想删除对象存储的所有数据，使用 `clear()` 方法。

```js
const clearReq = objectStore.clear(1)
```

[indexeddb]: https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API "IndexedDB API"
[blob]: "https://developer.mozilla.org/en-US/docs/Web/API/Blob" "Blob"
[file]: https://developer.mozilla.org/en-US/docs/Web/API/File "File"
[structrured-clone]: https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm "The structured clone algorithm"
[terminology]: https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API/Basic_Terminology "IndexedDB key characteristics and basic terminology"
[storage]: https://developer.mozilla.org/en-US/docs/Web/API/Storage_API/Storage_quotas_and_eviction_criteria#other_web_technologies "Storage quotas and eviction criteria"
[IDBFactory.open]: https://developer.mozilla.org/en-US/docs/Web/API/IDBFactory/open "IDBFactory: open() method"
[IDBOpenDBRequest]: https://developer.mozilla.org/en-US/docs/Web/API/IDBOpenDBRequest "IDBOpenDBRequest"
[IDBDatabase]: https://developer.mozilla.org/en-US/docs/Web/API/IDBDatabase "IDBDatabase"
[createObjectStore]: https://developer.mozilla.org/en-US/docs/Web/API/IDBDatabase/createObjectStore "IDBDatabase: createObjectStore() method"
[transaction]: https://developer.mozilla.org/en-US/docs/Web/API/IDBDatabase/transaction "IDBDatabase: transaction() method"
[IDBObjectStore]: https://developer.mozilla.org/en-US/docs/Web/API/IDBObjectStore "IDBObjectStore"
[add]: https://developer.mozilla.org/en-US/docs/Web/API/IDBObjectStore/add "IDBObjectStore: add() method"
[getAll]: https://developer.mozilla.org/en-US/docs/Web/API/IDBObjectStore/getAll "IDBObjectStore: getAll() method"
[put]: https://developer.mozilla.org/en-US/docs/Web/API/IDBObjectStore/put "IDBObjectStore: put() method"
[delete]: https://developer.mozilla.org/en-US/docs/Web/API/IDBObjectStore/delete "IDBObjectStore: delete() method"
[IDBTransaction]: https://developer.mozilla.org/en-US/docs/Web/API/IDBTransaction "IDBTransaction"
[objectStore]: https://developer.mozilla.org/en-US/docs/Web/API/IDBTransaction/objectStore "IDBTransaction: objectStore() method"