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

引入 Vue.js 的虚拟 DOM，在模板中绑定的事件会被挂载到 vnode 上。同时 compiler 在 wxml 上绑定了小程序的事件。

## REF

- [mpvue - github][github]
- [快速上手][quickstart]

[github]: https://github.com/Meituan-Dianping/mpvue
[quickstart]: http://mpvue.com/mpvue/quickstart/
