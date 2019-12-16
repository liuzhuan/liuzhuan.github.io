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

如果要改变画布尺寸，需要设置 `autoResize: true`，然后执行 `resize()` 函数：

```js
app.renderer.autoResize = true;
app.renderer.resize(512, 512);
```

如果想让画布铺满页面，可以使用如下设置：

```js
app.renderer.view.style.position = 'absolute';
app.renderer.view.style.display = 'block';
app.renderer.autoResize = true;
app.renderer.resize(window.innerWidth, window.innerHeight);
```

如果想让画布铺满页面时，等比缩放，可以使用自定义的工具函数 [kittykatattack/scaleToWindow][7]。

## Pixi 精灵

所有需要显示的物体都要放到舞台上，即 `app.stage`。舞台是一种 [Container][8]。

精灵可以放到舞台上，它基本上是一种可以用代码控制的图像。使用代码控制精灵的几何尺寸是学习 PIXI 的重点。

PIXI 的 `Sprite` 类用于创建精灵，创建方式有以下三种：

1. 从单一图像文件创建
1. 来自 **tileset** 的子图像。tileset 表示一个大图，由多张小图拼成
1. 来自 **texture atlas**（这是一种 JSON 文件，定义了 tileset 每个子图像的位置和尺寸）

## 将图像加载到纹理缓存

由于 Pixi 使用 WebGL 在显卡上渲染图像，因此图像的格式必须能够被显卡处理。这种图像称作**纹理**（texture）。使用精灵显示图像前，需要把普通图片文件转换为 WebGL 纹理。为了提升效率，Pixi 使用**纹理缓存**（texture cache）存储引用所有精灵需要的纹理。纹理名称与文件路径匹配。

如果纹理从 `images/cat.png` 路径加载，可以用如下方法在纹理缓存中定位它：

```js
PIXI.utils.TextureCache['images/cat.png'];
```

然后，你就可以使用 Pixi 的 `Sprite` 类，基于该纹理创建精灵：

```js
let texture = PIXI.utils.TextureCache['images/cat.png'];
let sprite = new PIXI.Sprite(texture);
```

如何加载图片文件，并把它转换为纹理呢？使用 Pixi 内置的 `loader` 对象。

```js
PIXI.loader
    .add('images/anyImage.png')
    .load(setup);

function setup() {
    // do awesome thing after image loaded.
}
```

[Pixi 的开发团队推荐][9]，如果使用 loader，最好引用 `loader.resources` 来获取素材：

```js
let sprite = new PIXI.Sprite(
    PIXI.loader.resources['images/anyImage.png'].texture
);
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
[7]: https://github.com/kittykatattack/scaleToWindow "kittykatattack/scaleToWindow"
[8]: http://pixijs.download/release/docs/PIXI.Container.html "PIXI.Container"
[9]: https://www.html5gamedevs.com/topic/16019-preload-all-textures/?tab=comments#comment-90907 "Preload all textures?"
