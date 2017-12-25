---
layout: post
title: Canvas 入门
date: 2017-12-12
---

## `<canvas>` 元素

```html
<canvas id="tutorial" width="150" height="150"></canvas>
```

画布默认尺寸是 `300*150` 。

对于不支持 canvas 的浏览器，可以在 `<canvas>` 标签对中插入内容：

```html
<canvas>
    兼容性内容
</canvas>
```

## 渲染上下文

```javascript
var canvas = document.getElementById('tutorial')
if (canvas.getContext) {
    var ctx = canvas.getContext('2d') // CanvasRenderingContext2D 类型
} else {
    // canvas-unsupported code here
}
```

## 常用绘图命令

```javascript
ctx.fillStyle = 'rgb(200, 0, 0)'
ctx.fillStyle = 'rgba(0,0,200,0.5)'
ctx.strokeStyle = color

// Line styles
ctx.lineWidth = value
ctx.lineCap = type
ctx.lineJoin = type
ctx.miterLimit = value

ctx.fillRect(10, 10, 50, 50); // fillRect(x, y, width, height)
ctx.strokeRect(x, y, width, height);
ctx.clearRect(x, y, width, height);

// drawing paths
ctx.beginPath()
ctx.closePath()
ctx.stroke()
ctx.fill()
ctx.moveTo(x, y)
ctx.lineTo(x, y)
ctx.arc(cx, cy, radius, startAngle, endAngle, anticlockwise)
ctx.arcTo(x1, y1, x2, y2, radius)
```

## 绘制文本

基本绘制命令有二：

```javascript
fillText(text, x, y[, maxWidth])
strokeText(text, x, y[, maxWidth])
```

例如：

```javascript
function draw() {
    const ctx = document.querySelector('#mycanvas').getContext('2d')
    ctx.font = '48px serif'
    ctx.fillText('Hello world', 10, 50)
}
```

### 美化文本

可以设置文本的属性包括：

```javascript
font = value; // value 取值范围同 CSS font 属性
textAlign = value; // value 可取的值包括：start, end, left, right, center
textBaseline = value; // 可取的值包括：top, hanging, middle, alphabetic, ideographic, bottom
direction = value; // 可选值包括：ltr, rtl, inherit
```

举例：

```javascript
ctx.font = '48px serif'
ctx.textBaseline = 'hanging'
ctx.strokeText('Hello world', 0, 100)
```

### 高级文本测量

以下方法可以测量文本参数：

```javascript
// 返回 `TextMetrics` 对象，包含宽度（单位是像素）
measureText()

// demo
function draw() {
    var ctx = document.getElementById('canvas').getContext('2d')
    var text = ctx.measureText('foo')
    text.width // 16
}
```

## 使用图像

canvas API 可以使用如下类型的图像源：

```javascript
HTMLImageElement
SVGImageElement
HTMLVideoElement
HTMLCanvasElement
```

以上四种类型统称为 `CanvasImageSource`。

可以使用以下方式在 canvas 上绘制图像：



## REF

- [Canvas Tutorial - MDN][canvas-mdn]
- [Drawing text - MDN][text]

[canvas-mdn]: https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial
[text]: https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Drawing_text
[tainted]: https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_enabled_image#What_is_a_.22tainted.22_canvas.3F