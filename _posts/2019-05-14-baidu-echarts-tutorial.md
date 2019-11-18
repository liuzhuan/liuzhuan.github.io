---
layout: post
title: 百度 Echarts 使用指南
date: 2019/05/14
---

## 5 分钟上手

引入 ECharts

```html
<script src="echarts.min.js"></script>
```

绘制简单表单

```html
<div id="main"
     style="width: 600px; height: 400px;">
</div>
```

初始化表单

```js
const myChart = echarts.init(document.getElementById('main'))

const option = {
  title: {
    text: 'ECharts simple demo'
  },
  tooltip: {},
  legend: {
    data: ['sales']
  },
  xAxis: {
    data: ['shirt', 'wool', 'snow', 'trouses', 'high-heel', 'socks']
  },
  yAxis: {},
  series: [{
    name: 'sales',
    type: 'bar',
    data: [5, 20, 36, 10, 10, 20]
  }]
}

myChart.setOption(option)
```

## echarts 默认的版本

构建好的 echarts 提供了以下几种定制，均位于 `echarts/dist/` 目录下：

| 版本   | 文件名              | 说明                                   |
| ------ | ------------------- | -------------------------------------- |
| 完全版 | `echarts.js`        | 体积最大，包含**所有的**图表和组件     |
| 常用版 | `echarts.common.js` | 体积适中，包含**常见的**图表和组件     |
| 精简版 | `echarts.simple.js` | 体积较小，仅包含**最常用的**图表和组件 |

## 在 webpack 中使用 ECharts

使用 npm 安装

```sh
$ npm install echarts --save
```

引入

```js
const echarts = require('echarts')

const myChart = echarts.init($el)
myChart.setOption(option)
```

按需引入 ECharts 图表和组件，尽量精简体积：

```js
const echarts = require('echarts/lib/echarts')
require('echarts/lib/chart/bar')
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')

const myChart = echarts.init($el)
myChart.setOption(option)
```

## 个性化图表样式

ECharts 的自定义配置分三个层级：全局、系列、数据。如下所示

```js
const option = {
  backgroundColor: '#2c343c',
  textStyle: {
    color: 'rgba(255, 255, 255, 0.3)'
  },
  series: [
    {
      name: 'visitor source',
      type: 'pie',
      roseType: 'angle',
      radius: '55%',
      data: [
        { value: 235, name: 'video ads' },
        { value: 274, name: 'ally ads' },
        { value: 310, name: 'mail marketing' },
        { value: 335, name: 'direct' },
        { value: 400, name: 'search engine' }
      ],
      itemStyle: {
        color: '#c23531',
        shadowBlur: 200,
        shadowOffsetX: 0,
        shadowOffsetY: 0,
        shadowColor: 'rgba(0,0,0,0.5)'
      },
      labelLine: {
        lineStyle: {
          color: 'rgba(255, 255, 255, 0.3)'
        }
      }
    }
  ],
  visualMap: {
    show: false,
    min: 80,
    max: 600,
    inRange: {
      colorLightness: [0, 1]
    }
  },
}
```

## 异步数据加载和更新

无论何时，获取到数据后，通过 `setOption` 将其填入即可。ECharts 会找到两组数据之间的差异，然后通过合适的动画去表现数据的变化。

ECharts 中在更新数据时，需要通过 `name` 属性对应到相应的系列。因此，更新数据时，最好加上 `name` 属性。

如果加载时间较长，可以使用加载动画。

```js
myChart.showLoading();
myChart.hideLoading();
```

## 使用 dataset 管理数据

EChart 4 开始支持 `dataset` 组件用于单独的数据集声明，它允许在多个组件中复用数据。

> 这是一个不容易理解的特性。

### 入门例子

```js
option = {
  dataset: {
    source: [
      ['product', '2015', '2016', '2017'],
      ['Matcha Latte', 43.3, 85.8, 93.7],
      ['Milk Tea', 83.1, 73.4, 55.1],
      ['Cheese Cocoa', 86.4, 65.2, 82.5],
      ['Walnut Brownie', 72.4, 53.9, 39.1]
    ]
  },
  // 声明一个 X 轴，类目轴（category）。默认情况下，类目轴对应到 dataset 第一列
  xAxis: { type: 'category' },
  // 声明一个 Y 轴，数值轴
  yAxis: {},
  series: [
    { type: 'bar' },
    { type: 'bar' },
    { type: 'bar' },
  ]
}
```

或者也可以使用常见的对象数组的格式：

```js
option = {
  dataset: {
    // 这里指定了维度名的顺序，从而可以利用默认的维度到坐标轴的映射
    // 如果不指定 dimensions，也可以通过 series.encode 完成映射
    dimensions: ['product', '2015', '2016', '2017'],
    source: [
      { product: 'Matcha Latte', '2015':43.3, '2016':85.8, '2017':93.7 },
      { product: 'Milk Tea', '2015':43.3, '2016':85.8, '2017':93.7 },
      { product: 'Cheese Cocoa', '2015':43.3, '2016':85.8, '2017':93.7 },
      { product: 'Walnut Brownie', '2015':43.3, '2016':85.8, '2017':93.7 },
    ]
  },
  xAxis: { type: 'category' },
  yAxis: {},
  series: [
    { type: 'bar' },
    { type: 'bar' },
    { type: 'bar' }
  ]
}
```

数据到图形的映射（encode）

```js
const option = {
  dataset: {
    source: [
      ['score', 'amount', 'product'],
      [89.3, 58212, 'Matcha Latte'],
      [57.1, 78254, 'Milk Tea']
    ]
  },
  xAxis: {},
  yAxis: { type: 'category' },
  series: [
    {
      type: 'bar',
      encode: {
        // 将 "amount" 列映射到 x 轴
        x: 'amount',
        // 将 "product" 列映射到 y 轴
        y: 'product'
      }
    }
  ]
}
```

## 在图表中加入交互组件

```js
const option = {
  xAxis: { type: 'value' },
  yAxis: { type: 'value' },
  dataZoom: [
    {
      type: 'slider',
      start: 10,
      end: 60
    },
    {
      type: 'inside',
      start: 10,
      end: 60
    }
  ],
  series: [
    {
      type: 'scatter',
      itemStyle: {
        opacity: 0.8
      },
      symbolSize: function(val) {
        return val[2] * 40
      },
      data: [
        ["14.616", "7.241", "0.896"],
        ["3.958", "5.701", "0.955"]
      ]
    }
  ]
}
```

## 移动端自适应

Media Query 提供了「随着容器尺寸改变而改变」的能力。

要在 option 中设置 Media Query 须遵循如下格式：

```js
option = {
  // 这里是基本的原子 option
  baseOption: {
    title: {},
    legend: {},
    series: [{}, {}, {}]
  },
  
  // 这里定义了 media query 的逐条规则
  media: [
    {
      query: {
        minWidth: 200,
        maxHeight: 300,
        minAspectRatio: 1.3
      },
      option: {
        legend: {}
      }
    },
    {
      query: {},
      option: {
        legend: {}
      }
    }
  ]
}
```

## 数据的视觉映射

ECharts 提供的 visualMap 组件，可以实现通用的视觉映射。`visualMap` 组件中可以使用的视觉元素有：

- symbol 图形类别
- symbolSize 图形大小
- color 颜色
- opacity 透明度
- colorAlpha 颜色透明度
- colorLightness 颜色明暗度
- colorSaturation 颜色饱和度
- colorHue 色调

visualMap 定义了把「数据的哪个维度」映射到「什么视觉元素」上。它分两种类型，比如：

```js
option = {
  visualMap: [
    {
      type: 'continuous' // 连续型
    },
    {
      type: 'piecewise' // 分段型
    }
  ]
}
```



## REF

- [5 分钟上手 ECharts](https://echarts.baidu.com/tutorial.html)