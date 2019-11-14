---
layout: post
title: 前端错误监控指南
date: 2019/11/13
---

前端错误监控，最简单的方法是 [`window.onerror`][1]。它的签名如下：

```js
window.onerror = function(
    message,    // error message
    source,     // URL of the script
    lineno,     // line number
    colno,      // column number
    error       // Error Object
) { ... };
```

由于历史原因，onerror 和 addEventListener 的函数签名不一样。

```js
window.addEventListener('error', function(event){});
```

举个简单例子：

```js
window.onerror = function(message, source, lineno, colno, error) {
    console.log('message:', message);
    console.log('source:', source);
    console.log('lineno:', lineno);
    console.log('colno:', colno);
    console.log('error:', error);
}

a = a / 2;
```

## REF

1. [GlobalEventHandlers.onerror - MDN][1]
1. [JS错误监控总结][2]，*深蓝一人*，2018-04-30

[1]: https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onerror "GlobalEventHandlers.onerror - MDN"
[2]: https://segmentfault.com/a/1190000014672384 "JS错误监控总结"