---
layout: post
title: DOM 速查表
date: 2024-10-11 09:37:00 +0800
---

* TOC
{:toc}

[DOM][dom] 是连接网页和 JavaScript 的桥梁。

## EventTarget

[EventTarget](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget) 处理事件，它是所有 DOM 类的父类。

- `addEventListener(type, listener, options)` 监听事件
- `removeEventListener(type, listener, options)` 取消监听事件
- `dispatchEvent()` 手动触发事件

## Node

[Node](https://developer.mozilla.org/en-US/docs/Web/API/Node) 是许多 DOM 页面节点的抽象父类，它继承自 [EventTarget](#eventtarget)。

```
EventTarget <-- Node
```

属性

- `baseURI` 获取当前网页的绝对地址，只读属性
- `childNodes` 返回所有子节点组成的列表，类型为动态的 [NodeList](#nodelist)
- `firstChild` 第一个子节点，可能是文本或注释
- `isConnected` 节点是否和某个 [Document](#document) 对象相连

方法

- `appendChild(aChild)` 添加子元素

### NodeList

[NodeList](https://developer.mozilla.org/en-US/docs/Web/API/NodeList) 是 Node 节点的集合，通常通过 `Node.childNodes` 属性访问，或者被 `document.querySelectorAll()` 返回。

`NodeList` 不是数组，但是可以通过 `Array.from()` 转换为数组。

`NodeList` 有两种类型：`live` 和 `static`。 `live`（活的）集合的内容会随着 DOM 变化而自动改变，比如 `Node.childNodes` 返回的值。`static`（静态）集合内容保持不变，比如 `document.querySelectorAll()` 返回的值。

属性

- `length` 节点个数

方法

- `item(index)` 通过索引获取元素
- `iterator()` 返回一个迭代器（iterator）
- `forEach(callback)` 遍历整个集合
- `keys()` 返回键构成的迭代器
- `values()` 返回值构成的迭代器

## Element

[`Element`](https://developer.mozilla.org/en-US/docs/Web/API/Element)

```
Node <-- Element
```

属性

- `children` 所有子元素构成的集合，类型是 [`HTMLCollection`](#htmlcollection)

方法

pass

### HTMLCollection

[HTMLCollection](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCollection) 是元素构成的集合，它是活的（live）。

## HTMLElement

pass

## HTMLMediaElement

[`HTMLMediaElement`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement) 控制媒体元素相关的功能。父类是 [`HTMLElement`](#htmlelement)。

```
HTMLElement <-- HTMLMediaElement
```

属性

- `currentTime` 浮点数，单位是秒，控制当前播放时间点
- `duration` 媒体总是长，单位秒
- `volume` 音量，区间 `[0.0, 1.0]`

方法

pass

## HTMLAudioElement

[`HTMLAudioElement`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLAudioElement) 用于控制 `<audio>` 元素。父类是 [`HTMLMediaElement`](#htmlmediaelement)

```
HTMLMediaElement <-- HTMLAudioElement
```

## Document

[`Document`](https://developer.mozilla.org/en-US/docs/Web/API/Document) 代表网页文档。它的父类是 [`Node`](#node)。

```
Node <-- Document
```

属性

- `body` 指向 `<body>` 或 `<frameset>` 节点

方法

pass

[dom]: https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model "Document Object Model"