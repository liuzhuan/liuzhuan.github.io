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

## REF

- [Canvas Tutorial - MDN][canvas-mdn]

[canvas-mdn]: https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial