---
layout: post
title: PixiJS 入门
date: 2019-12-14
---

PixiJS 是一个基于 2D WebGL 的图像引擎。出品人 [Goodboy Digital][2]。它的仓库地址是 [pixijs/pixi.js][3]。

以下内容来自 kittykatattack 编写的 Learning Pixi 教程，该教程基于 Pixi v4.5.5。目前官网最新的版本是 v5.2.0。

从提交记录看，[v4.5.5][5] 的最后一次提交是 2017 年 8 月 25 日。虽然时间过去两年多，但是基本概念和用法应该是一样的。

## 介绍

Pixi API 从 Flash API 而来，因此对于 Flash 程序员会倍感亲切。

安装 Pixi 很简单，如下代码：

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/pixi.js/4.5.5/pixi.min.js"></script>
<script>
let type = 'WebGL';
if (!PIXI.utils.isWebGLSupported()) {
    type = 'canvas';
}
PIXI.utils.sayHello(type);
</script>
```

## 创建 PIXI 应用和舞台

`Application` 对象创建可视区域，自动生成 `<canvas>` 元素。`stage` 是一种特殊的 `Container`，用作所有可视元素的根结点。

```js
let app = new PIXI.Application({ width: 256, height: 256 });
document.body.appendChild(app.view);
```

除了宽高尺寸，`PIXI.Application` 还支持别的属性，比如：

```js
let app = new PIXI.Application({
    width: 256,         // default: 800
    height: 256,        // default: 600
    antialias: true,    // default: false
    transparent: false, // default: false
    resolution: 1,      // default: 1
    forceCanvas: true,  // default: false
});
```

要查看 Application 所有的属性，可以参考[官方文档][6]。

PIXI 的 `renderer` 对象默认使用 WebGL。如果想强行使用 Canvas 绘图 API，可以使用 `forceCanvas` 字段：

```js
forceCanvas: true,
```

如果创建完成后，想改变背景颜色，可以使用：

```js
app.renderer.backgroundColor = 0x061639;
```

如果想获取 `renderer` 的宽高尺寸，可以使用 `app.renderer.view.width` 和 `app.renderer.view.height`。

```js
app.view === app.renderer.view
// true
```

TODO

## REF

1. [PixiJS][1]
1. [Learning Pixi][4], by *kittykatattack*

[1]: https://www.pixijs.com/ "PixiJS"
[2]: https://www.goodboydigital.com "Goodboy Digital"
[3]: https://github.com/pixijs/pixi.js "pixijs/pixi.js"
[4]: https://github.com/kittykatattack/learningPixi "Learning Pixi"
[5]: https://github.com/pixijs/pixi.js/tree/v4.5.5 "v4.5.5"
[6]: https://pixijs.download/release/docs/PIXI.Application.html "PIXI.Application API Documentation"
