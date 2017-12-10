---
layout: post
title: SVG 入门
date: 2017-12-10
---

SVG (Scalable Vector Graphics, 可缩放矢量图形)，是一种使用 XML 描述图形的 W3C 标准，类似于一种开放格式的 Flash 。

2009 年之后，随着 Flash 的没落，浏览器们加大了对 SVG 的支持力度，[兼容性喜人][caniuse.svg]。

[Inkscape][inkscape] 使用 svg 作为文件格式，免费开源，可以用来绘制复杂图形。

## 简单例子

```xml
<svg version="1.1" baseProfile="full" width="300" height="300" xmlns="http://www.w3.org/2000/svg">
    <rect width="100%" height="100%" fill="red" />
    <circle cx="150" cy="100" r="80" fill="green" />
    <text x="150" y="125" font-size="60" text-anchor="middle" fill="white">SVG</text>
</svg>
```

## REF

- [SVG Tutorial - MDN](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial)
- [An SVG Primer for Today's Browsers - w3.org](https://www.w3.org/Graphics/SVG/IG/resources/svgprimer.html)
- [Inkscape][inkscape]

[caniuse.svg]: https://caniuse.com/#feat=svg
[inkscape]: https://inkscape.org/en/