---
layout: post
title: mpvue 入门
date: 2018-05-21
---

* TOC
{:toc}

[mpvue][github] 是一个使用 Vue.js 开发小程序的前端框架。框架基于 Vue.js 核心，mpvue 修改了 Vue.js 的 runtime 和 compiler 实现，使其可以运行在小程序环境中，从而为小程序开发引入了整套 Vue.js 开发体验。

## 快速上手

### 初始化

```sh
$ node -v
v8.9.0

$ npm -v
5.6.0

$ npm set registry https://registry.npm.taobao.org/
$ npm install --global vue-cli
$ vue init mpvue/mpvue-quickstart my-project
$ cd my-project
$ npm install
$ npm run dev
```

成功后，本地多了一个 `dist` 目录，这个目录里就是生成的小程序相关代码。

⚠️ 注意：新增的页面需要重新 `npm run dev` 来进行编译。

## 框架原理

- `mpvue` 保留了 `vue.runtime` 核心方法，无缝继承了 `Vue.js` 的基础能力
- `mpvue-template-compiler` 提供了将 vue 的模板语法转换到小程序的 wxml 语法的能力
- 修改了 vue 的建构配置，使之构建出符合小程序项目结构的代码格式： json/wxml/wxss/js 文件

## Vue 实例

### 实例生命周期

在小程序 `onReady` 后，再去触发 vue mounted 生命周期。除 Vue 本身生命周期外，mpvue 还兼容小程序生命周期。除特殊情况外，不建议使用小程序的生命周期钩子。

微信小程序页面的 `query` 参数是通过 `onLoad` 获取的，mpvue 对此进行优化，直接通过 `this.$root.$mp.query` 获取相应的参数，其调用需要在 `onLoad` 生命周期触发之后使用。

生命周期图示如下：

![life cycle](http://mpvue.com/assets/lifecycle.jpg)

## 模板语法

几乎支持全部官方文档，除了以下几种情况。
 
**不支持纯 HTML**，即 `v-html` 指令不能使用。

**不支持部分复杂的 JavaScript 渲染表达式**。目前可以使用的有 `+ - * % ?: ! == === > < [] .`：

```html
<!-- 这种就不支持，建议写 computed -->
<p>{{ message.split('').reverse().join('') }}</p>

<!-- 但写在 @event 里面的表达式是都支持的，因为这部分的计算放在了 vdom 里面 -->
<ul>
    <li v-for="item in list">
        <div @click="clickHandle(item, index, $event)">{{ item.value }}</p>
    </li>
</ul>
```

**不支持过滤器**。

不支持在 template 内使用 methods 中的函数。

## Class 与 Style 绑定

class 支持的语法:

```html
<p :class="{ active: isActive }">111</p>
<p class="static" v-bind:class="{ active: isActive, 'text-danger': hasError }">222</p>
<p class="static" :class="[activeClass, errorClass]">333</p>
<p class="static" v-bind:class="[isActive ? activeClass : '', errorClass]">444</p>
<p class="static" v-bind:class="[{ active: isActive }, errorClass]">555</p>
```

将分别被转换成:

```html
<view class="_p {{[isActive ? 'active' : '']}}">111</view>
<view class="_p static {{[isActive ? 'active' : '', hasError ? 'text-danger' : '']}}">222</view>
<view class="_p static {{[activeClass, errorClass]}}">333</view>
<view class="_p static {{[isActive ? activeClass : '', errorClass]}}">444</view>
<view class="_p static {{[[isActive ? 'active' : ''], errorClass]}}">555</view>
```

style 支持的语法:

```html
<p v-bind:style="{ color: activeColor, fontSize: fontSize + 'px' }">666</p>
<p v-bind:style="[{ color: activeColor, fontSize: fontSize + 'px' }]">777</p>
```

将分别被转换成:

```html
<view class="_p" style=" {{'color:' + activeColor + ';' + 'font-size:' + fontSize + 'px' + ';'}}">666</view>
<view class="_p" style=" {{'color:' + activeColor + ';' + 'font-size:' + fontSize + 'px' + ';'}}">777</view>
```

不支持官方文档：Class 与 Style 绑定中的 `classObject` 和 `styleObject` 语法。

最佳实践见上文支持的语法，从性能考虑，建议不要过度依赖此。

此外还可以用 computed 方法生成 class 或者 style 字符串，插入到页面中，举例说明：

```html
<template>
    <!-- 支持 -->
    <div class="container" :class="computedClassStr"></div>
    <div class="container" :class="{active: isActive}"></div>

    <!-- 不支持 -->
    <div class="container" :class="computedClassObject"></div>
</template>
<script>
    export default {
        data () {
            return {
                isActive: true
            }
        },
        computed: {
            computedClassStr () {
                return this.isActive ? 'active' : ''
            },

            computedClassObject () {
                return { active: this.isActive }
            }
        }
    }
</script>
```

## 列表渲染

需要注意一点，**嵌套列表渲染，必须指定不同的索引！**

```html
<!-- 在这种嵌套循环的时候， index 和 itemIndex 这种索引是必须指定，且别名不能相同，正确的写法如下 -->
<template>
    <ul v-for="(card, index) in list">
        <li v-for="(item, itemIndex) in card">
            {{item.value}}
        </li>
    </ul>
</template>
```

## 事件处理器

引入 Vue.js 的虚拟 DOM，在模板中绑定的事件会被挂载到 vnode 上。同时 compiler 在 wxml 上绑定了小程序的事件，并做了相应的映射。所以真实点击时，通过 runtime 中 `handleProxy` 将事件类型分发到 vnode 的事件上。同 Vue 在 WEB 机制一样，可以做到无损支持。同时还顺便支持了自定义事件和 `$emit` 机制。

```js
// 事件映射表，左侧为 WEB 事件，右侧为小程序对应事件
{
    click: 'tap',
    touchstart: 'touchstart',
    touchmove: 'touchmove',
    touchcancel: 'touchcancel',
    touchend: 'touchend',
    tap: 'tap',
    longtap: 'longtap',
    input: 'input',
    change: 'change',
    submit: 'submit',
    blur: 'blur',
    focus: 'focus',
    reset: 'reset',
    confirm: 'confirm',
    columnchange: 'columnchange',
    linechange: 'linechange',
    error: 'error',
    scrolltoupper: 'scrolltoupper',
    scrolltolower: 'scrolltolower',
    scroll: 'scroll'
}
```

在 `input` 和 `textarea` 中 `change` 事件会被转为 `blur` 事件。

踩坑注意：

- 列表中没有的原生事件也可以使用例如 `bindregionchange` 事件直接在 dom 上将 `bind` 改为 `@`  `@regionchange`，同时这个事件也非常特殊，它的 event type 有 `begin` 和 `end` 两个，导致我们无法在`handleProxy` 中区分到底是什么事件，所以你在监听此类事件时，同时监听事件名和事件类型，即 `<map @regionchange="functionName" @end="functionName" @begin="functionName"><map>`
- 小程序能力所致，`bind` 和 `catch` 事件同时绑定时，只会触发 `bind`，`catch` 不会被触发，要避免踩坑。
- 事件修饰符
    - `.stop` 的使用会阻止冒泡，但是同时绑定了一个非冒泡事件，会导致该元素上的 `catchEventName` 失效！
    - `.prevent` 可以直接干掉，因为小程序里没有什么默认事件，比如 `submit` 并不会跳转页面
    - `.capture` 支持 `1.0.9`
    - `.self` 没有可以判断的标识
    - `.once` 也不能做，因为小程序没有 `removeEventListener`，虽然可以直接在 `handleProxy` 中处理，但非常的不优雅，违背了原意，暂不考虑
    - 小程序压根没有键盘，所以键值修饰符也不需要考虑。

## 表单空间绑定

建议开发过程中直接使用微信小程序表单组件。

```html
<template>
  <div>
    <picker @change="bindPickerChange" :value="index" :range="array">
      <view class="picker">
        当前选择：{{array[index]}}
      </view>
    </picker>
  </div>
</template>

<script>
export default {
  data () {
    return {
      index: 0,
      array: ['A', 'B', 'C']
    }
  },
  methods: {
    bindPickerChange (e) {
      console.log(e)
    }
  }
}
</script>
```

```html
<template>
  <div>
    <radio-group class="radio-group" @change="radioChange">
      <label class="radio" v-for="(item, index) in items" :key="item.name">
        <radio :value="item.name" :checked="item.checked"/> {{item.value}}
      </label>
    </radio-group>
  </div>
</template>

<script>
export default {
  data () {
    return {
      items: [
        {name: 'USA', value: '美国'},
        {name: 'CHN', value: '中国', checked: 'true'},
        {name: 'BRA', value: '巴西'},
        {name: 'JPN', value: '日本'},
        {name: 'ENG', value: '英国'},
        {name: 'TUR', value: '法国'}
      ]
    }
  },
  methods: {
    radioChange (e) {
      console.log('radio发生change事件，携带value值为：', e.target.value)
    }
  }
}

</script>
```

## 组件

### Vue 组件

有且只能使用单文件组件（`.vue` 组件）的形式进行支持。其他的诸如：动态组件，自定义 render，和 `<script type="text/x-template">` 字符串模版等都不支持。原因很简单，因为要预编译出 wxml。

### 小程序组件

mpvue 可以支持小程序的原生组件，比如：`picker`、`map` 等，需要注意的是原生组件上的事件绑定，需要以 vue 的事件绑定语法来绑定，如 `bindchange="eventName"` 事件，需要写成 `@change="eventName"`

示例代码：

```html
<picker mode="date" :value="date" start="2015-09-01" end="2017-09-01" @change="bindDateChange">
    <view class="picker">
      当前选择: {{date}}
    </view>
</picker>
```

## 最佳实践

1. 精简 data 数据
2. 优化长列表性能
3. 合理使用双向绑定。`mpvue` 建议使用 `v-model.lazy` 绑定方法以优化性能。
4. 谨慎选择直接使用小程序的 API。

## mpvue-simple

辅助 mpvue 快速开发 Page 级小程序页面的工具，需要有一定的小程序开发经验。

mpvue QuickStart 只支持项目级应用开发，对 Page 级和自定义组件 Component 级小程序页面开发场景缺少支持，而 simple 刚好来填补这部分需求，用以支持 mpvue 和原生小程序（或者其他方式小程序）的混用。

### 工具用法

### CLI

```sh
# install by global
npm i mpvue-simple -g

# create an *.vue SFC
echo -e '<template><h1>Hello {{msg}}!</h1></template>\n<script>\nexport default {\n  data () {\n    return { msg: 233 }\n  }\n}\n</script>\n<style>\n  h1 {\n    color: red;\n  }\n</style>' > App.vue

# build for signel Page
mpvue-simple --build

# or more options
mpvue-simple --build --entry ./src/login.vue --output ./mp-pages/ --pageName login --config ./build/webpack.page.js
```

### Node.js API

```sh
$ npm i mpvue-simple --save-dev
```

```js
const mpvueSimple = require('mpvue-simple')

// build for signel Page
mpvueSimple.build()

// or more options
mpvueSimple.build({
  output: 'mp-pages',
  pageName: 'login'
})
```

API

- `mpvueSimple.build(argvOptions)`
- `mpvueSimple.devServer(argvOptions)`
- `mpvueSimple.getWebpackConfig()`
- `mpvueSimple.getDevWebpackConfig()`

## 项目构建

```
// app.vue & main.js
+---------+                            +----------+   +---------+
| app.vue |  +                         | app.js   |   | app.json|
+---------+  |                         +----------+   +---------+
             +---------------------->
+---------+  |     webpack             +----------+
| main.js |  +                         | app.wxss |
+---------+                            +----------+

// page.vue & main.js
       +------------------------+
       v                        |
+-----------+      +-------+    |
| page.vue  | +--> | .sass |    |
++-+-+------+      +-------+    |
 | | |                          |
 | | |     +------------+       |
 | | +---> | common.css |       v                   +------+  +-------+
 | |       +-----+------+                           |  .js |  | .json |
 | |             |          +---------+             +------+  +-------+
 | |   +-----+   |          | main.js | +--------->
 | +-> | .js |   v          +---------+   webpack   +-------+ +-------+
 |     +-----+  ++------+                           | .wxml | | .wxss |
 |   +------+   | .font |                           +-------+ +-------+
 +-> | .jpg |   +-------+
     +------+
```

## 常见问题

### 如何获取小程序在 app onLaunch/onShow 时传递的 options？

在所有的组件內可以通过 `this.$root.$mp.appOptions` 进行获取。

### vue-router 支持吗？

路由是不能支持的，因为小程序无法动态的插入和控制节点，几乎无法实现。而且小程序对页面的切换性能做了很多优化，页面切换体验也好了很多，所以使用 vue-router 也不那么必要

### 为什么我新增了页面，没有反应？

因为 webpack 编译的文件是由配置的 entry 决定的，新增的页面并没有添加进 entry，所以需要手动 `npm run dev` 一下，考虑不是高频操作，所以还可以忍受

### 如何使用 echarts

[查看 demo](https://github.com/mpvue/examples/tree/master/echarts)

## REF

- [mpvue - github][github]
- [快速上手][quickstart]
- [mpvue 使用手册][doc]
- [mpvue-simple][simple]
- [项目构建][build]
- [常见问题][qa]

[github]: https://github.com/Meituan-Dianping/mpvue
[quickstart]: http://mpvue.com/mpvue/quickstart/
[doc]: http://mpvue.com/mpvue/
[simple]: http://mpvue.com/mpvue/simple/
[build]: http://mpvue.com/build/
[qa]: http://mpvue.com/qa/