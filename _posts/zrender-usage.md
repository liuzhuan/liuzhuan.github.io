# 使用 ZRender

## 安装

```sh
$ npm install zrender
```

`dist` 目录下可以看到两个文件：

1. `zrender.js` 开发版
2. `zrender.min.js` 发布版

使用 ZRender 前，需要在 HTML 中加载相应的 JavaScript 文件：

```html
<script src="./dist/zrender.js"></script>
```

## 初始化

```js
var zr = zrender.init(document.getElementById('main'));
```

## 在场景中添加元素

```js
var circle = new zrender.Circle({
  shape: {
    cx: 150,
    cy: 50,
    r: 40
  },
  style: {
    fill: 'none',
    stroke: '#F00'
  }
})

zr.add(circle)
```

## 修改图形元素属性

通过 `a = new zrender.XXX` 创建的图形实例，可以用 `a.shape` 等形式获取创建时输入的属性。如果要修改属性，需要使用 `a.attr(key, value)` ，否则不会触发图形的重绘。

```js
const circle = new zrender.Circle({
  shape: {
    cx: 150,
    cy: 50,
    r: 40
  }
})
zr.add(circle)

console.log(circle.shape.r) // 40

circle.attr('shape', {
  r: 50
})
```

## zrender 的 API 函数

```js
// 销毁 ZRender 实例
zrender.dispose(zr)

// 得到一个 ZRender 实例
zrender.init(dom, opts={ renderer, devicePixelRatio, width, height })

zrender.version
```

支持动画的对象

```js
// 支持动画的对象
zrender.Animatable

// 创建一个动画对象。不会立即开始，如需立即开始，需要调用 zrender.Animator.start
zrender.Animatable.animate(path, loop)

// 为属性设置动画
zrender.Animatable.animateTo(target, time, delay, easing, callback, forceAnimate)

// 为属性设置动画的两个例子如下：
el.animateTo({
  position: [10, 10]
}, function() {
  // done
})

el.animateTo({
  shape: {
    width: 500,
  },
  style: {
    fill: 'red'
  },
  position: [10, 10]
}, 100, 100, 'cubicOut', function() {
  // done
})

// 停止动画
zrender.Animatable.stopAnimation(forwardToLast)
```

动画对象 Animator

```js
// 动画对象
zrender.Animator

zrender.Animator = {
  // 设置动画延迟开始的时间
	delay(time)
  
  // 设置动画结束的回调函数
  done(callback)

  // 为关键帧添加回调函数，在关键帧运行后执行
  during(callback)

  // 判断动画是否暂停
  isPaused()

  // 暂停动画
  pause()

  // 恢复动画
  resume()

  // 开始执行动画
  start(easing)

  // 停止动画
  stop(forwardToLast)

  // 定义关键帧，即动画对象在某个时刻的属性
  when(time, props)
}
```

包围盒 BoundingRect

```js
zrender.BoundingRect(x, y, width, height)

zrender.BoundingRect: {
  // 得到包围盒的副本
  clone()

  // 判断坐标（x, y）是否在图形上
  contain(x, y)

  // 从一个包围盒复制属性
  copy(other)
  
  // 判断两个包围盒是否相交
  intersect(other)
  
  // 与另一个包围盒求并集，得到的也是一个包围盒
  union(other)
}
```

颜色静态类 color

```js
zrender.color

zrender.color: {
  // 提亮颜色
  lift(color, level)
  
  // 快速得到渐变色 colors 在 normalizedValue 位置的颜色，返回混合后的颜色
  lerp(normalizedValue, colors, fullOutput)
  
  // 修改颜色的透明度
  modifyAlpha(color, alpha)
  
  // 修改颜色的 HSL 维度
  modifyHSL(color, h, s, l)
  
  // 将各种形式的颜色字符串，转成 RGBA 形式的数组输出
  parse(colorStr, rgbaArr)
  
  // 将颜色转为十六进制的长度为 6 的字符串，开头没有 #
  toHex(color)
  
  // 将数组形式的颜色转为字符串
  // type 可取的值是 rgb, rgba, hsv, hsva, hsl, hsla,
  stringify(arrColor, type)
}
```

可显示的对象 Displayable

```js
zrender.Displayable(opts)

zrender.Displayable: {
  // 判断坐标（x,y）是否在图形上
  contain(x, y)
  
  // 设为需要更新
  dirty()
  
  // 得到元素的包围盒
  getBoundingRect()
  
  // 判断坐标 (x, y) 是否在图形包围盒内
  rectContain(x, y)
}
```

以下是 zrender.Displayable 的子类

```js
zrender.Arc({
  shape: {
    cx
    cy
    r
    startAngle
    endAngle
    clockwise
  }
})
```

```js
zrender.BezierCurve({
  shape: {
    x1
    y1
    x2
    y2
    cpx1
    cpy1
    percent
  }
})
```

```js
zrender.Circle({
  shape: {
    cx
    cy
    r
  }
})
```

```js
zrender.CompoundPath({
  shape: {
    path: []
  }
})
```

```js
zrender.Droplet({
  shape: {
    cx
    cy
    width
    height
  }
})
```

```js
zrender.Ellipse({
  shape: {
    cx
    cy
    rx
    ry
  }
})
```

```js
zrender.Heart({
  shape: {
    cx
    cy
    width
    height    
  }
})
```

```js
zrender.Image({
  style: {
    image: string|HTMLImageElement|HTMLCanvasElement
    x
    y
    width
    height
  }
})
```

```js
// 正多边形
zrender.Isogon({
  shape: {
    x
    y
    r
    n
  }
})
```

```js
zrender.Line({
  shape: {
    x1
    y1
    x2
    y2
    percent
  }
})
```

```js
zrender.Path({})

zrender.Path: {
  // 扩展一个 Path 元素，用于生成比如星星，圆等
  extend({
    type
    init
    buildPath
  })
}
```

[这里](https://github.com/ecomfe/zrender/blob/master/test/pin.html)是扩展 Path 的例子

```js
// 多边形
zrender.Polygon({
  shape: {
    points: []
    smooth
    smoothConstraint
  }
})
```

```js
// 多边形折线段
zrender.Polyline({
  shape: {
    points: [],
    smooth,
    smoothConstraint
  }
})
```

```js
zrender.Rect({
  shape: {
    r
    x
    y
    width
    height
  }
})
```

```js
zrender.Text({})
```

可以被添加到场景中的元素 Element

```js
zrender.Element

zrender.Element: {
  // 元素更新后的回调函数
  afterUpdate()
  
  // 设置元素属性
  attr(key, value)
  
  // 元素更新前的回调函数
  beforeUpdate()
  
  // 隐藏元素
  hide()
  
  // 取消设置裁剪元素
  removeClipPath()
  
  // 设置裁剪元素
  setClipPath(clipPath)
  
  // 显示元素
  show()
  
  // 深度优先遍历所有子孙节点
  traverse(cb, context)
}
```

支持事件的 Eventful

```js
zrender.Eventful()

zrender.Eventful: {
  // 是否绑定了事件
  isSilent(event)
  
  // 解绑事件
  off(event, handler)
  
  // 绑定事件
  on(event, handler, context)
  
  // 单次触发绑定
  one(event, handler, context)
  
  // 触发事件
  trigger(event)
}
```

渐变类 Gradient

```js
zrender.Gradient(colorStops)

zrender.Gradient: {
  addColorStop(offset, color)
}

zrender.LinearGradient(
  x
  y
  x2
  y2
  colorStops
  globalCoord
)
```

容器 Group

```js
zrender.Group()

zrender.Group: {
  add(child)
  addBefore(child, nextSibling)
  
  // 返回特定序号的子元素
  childAt(idx)
  
  // 返回子元素个数
  childCount()
  
  // 返回特定名字的子元素
  childOfName(name)
  
  // 返回所有子元素
  children()
  
  // 将组设为需要更新
  dirty()
  
  // 遍历所有子节点
  eachChild(cb, context)
  
  // 得到 includeChildren 或组内所有元素的包围盒
  getBoundingRect(includeChildren)
  
  // 移除子节点
  remove(child)
  
  // 移除所有子节点
  removeAll()
  
  // 所有子孙元素是否响应事件
  silent
}
```

矩阵 matrix

```js
zrender.matrix

zrender.matrix: {
  // 将矩阵 m 复制给矩阵 out
  copy(out, m)
  
  // 创建一个单位矩阵
  create()
  
  // 将 out 设为单位矩阵
  identity(out)
  
  // 求到矩阵 m 的逆矩阵
  invert(out, m)
  
  // 将矩阵 m1 与 m2 相乘
  mul(out, m1, m2)
  
  // 将矩阵 m 旋转 rad 弧度
  rotate(out, m, rad)
  
  // 将矩阵 m 沿向量 v 缩放
  scale(out, m, v)
  
  // 将矩阵 m 沿向量 v 平移
  translate(out, m, v)
}
```

路径相关的辅助函数

```js
zrender.path

zrender.path: {
  // 从字符串创建路径，字符串形如 SVG Path
  createFormString(str, opts)
  
  // 从字符串扩展路径
  extendFromString(str, opts)
  
  // 合并多条路径
  mergePath(pathEls, opts)
}
```



类的继承关系

```
parent <== child

zrender.Animatable
	<== zrender.Element
	<== zrender.Displayable
	<== zrender.{Arc, BezierCurve}
	
zrender.Gradient <== zrender.LinearGradient
```





### 缓动函数

所有的缓动函数[在线地址](https://www.echartsjs.com/gallery/editor.html?c=line-easing)

1. linear
2. quadratic{In, Out, InOut} 二次曲线
3. cubic{In, Out, InOut} 立方曲线
4. quartic{In, Out, InOut} 四次曲线
5. quintic{In, Out, InOut} 五次曲线
6. sinusoidal{In, Out, InOut} 正弦曲线
7. exponential{In, Out, InOut} 指数曲线
8. circular{In, Out, InOut} 圆形曲线
9. elastic{In, Out, InOut} 弹簧曲线
10. back{In, Out, InOut} 回弹曲线
11. bounce{In, Out, InOut} 跳动曲线 

## REF

- [开始使用 ZRender](https://ecomfe.github.io/zrender-doc/public/)
- [SVG Path](https://www.w3.org/TR/SVG/paths.html#PathData)