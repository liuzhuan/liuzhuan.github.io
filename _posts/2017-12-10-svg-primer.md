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
    <rect width="100%" height="100%" fill="#beaed7" />
    <circle cx="150" cy="100" r="80" fill="#563d7c" />
    <text x="150" y="125" font-size="60" text-anchor="middle" fill="white">SVG</text>
</svg>
```

上面代码会显示如下效果：

<svg version="1.1"
     baseProfile="full"
     width="300" height="200"
     xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" fill="#beaed7" />
  <circle cx="150" cy="100" r="80" fill="#563d7c" />
  <text x="150" y="125" font-size="60" text-anchor="middle" fill="white">SVG</text>
</svg>

## 文件类型

SVG 文件分两种，一种是包含 SVG 标记的普通文本，以 `.svg` 为后缀；另一种是针对大数据量应用（比如地理信息数据），进行 gzip 压缩处理的 SVG 文件，后缀名是 `.svgz`。

对于普通 SVG 文件，服务器响应头信息包括：

```
Content-Type: image/svg+xml
Vary: Accept-Encoding
```

对于 `gzip` 类型，需要配置服务器，增加 `Content-Encoding: gzip` 响应头信息。

## 坐标系

与大多数计算机绘图环境相似，SVG 坐标系原点在左上角，x 轴向右增加，y 轴向下增加。

svg 坐标系默认情况下 1 个单位长度对应屏幕的 1 个像素，但是可以更改对应比例，即 `scalable`。

比如：`<svg width="200" height="200" viewBox="0 0 100 100">` 中，svg 画布尺寸是 `200*200`，但是显示内容尺寸是 `100*100`，最终效果就是放大一倍。

## 基本形状

常见的基本类型及其属性如下代码所示：

```xml
<rect x="10" y="10" width="100" height="100" rx="10" ry="10" stroke="black" fill="transparent" stroke-width="5" />
<circle cx="25" cy="25" r="20" stroke="red" fill="transparent" stroke-width="1" />
```

## REF

- [SVG Tutorial - MDN](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial)
- [An SVG Primer for Today's Browsers - w3.org](https://www.w3.org/Graphics/SVG/IG/resources/svgprimer.html)
- [Inkscape][inkscape]

[caniuse.svg]: https://caniuse.com/#feat=svg
[inkscape]: https://inkscape.org/en/