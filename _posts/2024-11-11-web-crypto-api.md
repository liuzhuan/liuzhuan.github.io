---
layout: post
title: Web Crypto API
date: 2024-11-11
---

* TOC
{:toc}

[Web Crypto API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API) 是浏览器提供的密码学相关的基础工具。

Web Crypto API 不仅在 Window 中存在，通常在 Web Worker 中也可以使用，因此为了通用，使用 `self.crypto` 引用它。

## 生成随机数 {#get-random-values}

[Crypto.getRandomValues()](https://developer.mozilla.org/en-US/docs/Web/API/Crypto/getRandomValues) 可以生成具有密码强度的随机数。

`getRandomValues()` 是 `Crypto` 接口中唯一一个可以在**不安全上下文**（*insecure context*）中使用的成员。

`getRandomValues(typedArray)` 的唯一参数 `typedArray` 是基于整数的类型化数组，比如 `Int8Array`、`Uint8Array`、`Uint8ClampedArray` 等，但不包括 `Float32Array` 或 `Float64Array`，因为它俩不是整数，而是浮点数。

```js
const arr = new Uint8Array(10);
self.crypto.getRandomValues(arr);
console.log(arr);
// Uint8Array(10) [9, 33, 2, 232, 65, 49, 48, 208, 5, 237]
```

## 生成 UUID {#random-uuid}

使用 [`crypto.randomUUID()`](https://developer.mozilla.org/en-US/docs/Web/API/Crypto/randomUUID) 生成 UUID。

```js
const uuid = self.crypto.randomUUID();
console.log(uuid);
//=> 'c07b42e1-0904-44c7-9e7e-fd92dabc1fd0'
```

[`crypto.subtle`](https://developer.mozilla.org/en-US/docs/Web/API/Crypto/subtle) 只读属性包含更多“微妙”的密码学操作。