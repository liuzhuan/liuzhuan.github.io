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

对于 Promise 异常，如果未被 catch，无法被 `window.onerror` 捕获。此时，需要监听 `unhandledrejection` 事件。[比如][5]：

```js
window.addEventListener('unhandledrejection', (event) => {
    event.preventDefault();
    console.log('Reason: ' + event.reason);
});

function foo() {
    Promise.reject('abc');
}

foo();
```

使用时，需要注意 `unhandledrejection` 事件的兼容性。具体数据参见 [caniuse][6] 网站。

## 跨域脚本错误

当加载自不同域的脚本中发生语法错误时，为避免信息泄露，语法错误的细节将不会报告，而代之简单的 "Script error."。在某些浏览器中，通过在 `<script>` 使用 `crossorigin` 属性并要求服务器发送适当的 CORS HTTP 响应头，该行为可被覆盖。

## REF

1. [GlobalEventHandlers.onerror - MDN][1]
1. [JS错误监控总结][2]，*深蓝一人*，2018-04-30
1. [Window:unhandledrejection event - MDN][3]
1. [Fundebug][4]
1. [Tracking unhandled rejected Promises][5], by *Dr. Axel Rauschmayer*, 2016/04/12

[1]: https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onerror "GlobalEventHandlers.onerror - MDN"
[2]: https://segmentfault.com/a/1190000014672384 "JS错误监控总结"
[3]: https://developer.mozilla.org/en-US/docs/Web/API/Window/unhandledrejection_event "Window:unhandledrejection event - MDN"
[4]: https://www.fundebug.com/ "Fundebug"
[5]: https://2ality.com/2016/04/unhandled-rejections.html "Tracking unhandled rejected Promises"
[6]: https://caniuse.com/#feat=unhandledrejection "Can I Use unhandledrejection?"