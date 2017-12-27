---
layout: post
title: html2canvas 简介
date: 2017-12-26
---

[在线 demo][demo]

## 如何绘制跨域图片？

比如，`m.example.com` 网站的 js 想读取 `static.example.com` 的图片。

首先，在 `static.example.com` 服务器增加跨域请求头：

```
location / {
    add_header 'Access-Control-Allow-Origin' 'https://m2.qschou.com' always;
    ...
}
```

截图时传入 `useCORS: true`: 

```javascript
const html2canvas = require('html2canvas')
const options = {
    useCORS: true
}
html2canvas(target, options)
    .then(canvas => {
        document.body.appendChild(canvas)
    })
```

## REF

- [html2canvas - Screenshots with JavaScript][home]

[home]: https://html2canvas.hertzen.com/
[demo]: /test/html2canvas-demo/index.html