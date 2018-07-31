---
layout: post
title: 开发快应用
date: 2018-07-20
---

## 一、环境搭建

安装 `hap-toolkit`。参见[官方文档](https://doc.quickapp.cn/tutorial/getting-started/build-environment.html)

```sh
# node.js v6.0+
$ npm install -g hap-toolkit
# or
$ yarn global add hap-toolkit

# check version
$ hap -V
0.0.34
```

### 安装手机调试器

调试器是一个 Android 应用程序，下载调试器 APK 详见[资源下载](https://www.quickapp.cn/docCenter/post/69)。

### 安装编辑器插件

在 VS Code 扩展中搜索 `Hap Extension`，即可。

## 二、创建项目

```sh
$ hap init <ProjectName>

# 安装依赖
$ npm install

# 如果报错，运行如下命令
$ hap update --force
```

在开发阶段，可以使用如下命令远程调试，自动刷新：

```sh
$ npm run server --watch
```

## 三、生命周期

页面的[生命周期](https://doc.quickapp.cn/tutorial/framework/lifecycle.html)

| Hook | Intro |
| --- | --- |
| onInit() | ViewModel 的数据已经准备好，可以开始使用页面中的数据 |
| onReady() | ViewModel 的模板已经编译完成，可以开始获取 DOM 节点 |
| onShow() | 页面被重新显示时调用，可以调用 `this.$visible` |
| onHide() | 页面被切换隐藏时调用 |
| onDestroy() | 页面被销毁时调用，根据 `this.$valid` 判断是否被销毁 |
| onBackPress() | 当用户点击「返回实体按键」、「左上角返回菜单」、「调用返回API」时调用 |
| onMenuPress() | 点击右上角菜单 |

App 的生命周期提供了两个回调函数 `onCreate`、`onDestroy`，可以在 `app.ux` 中定义回调函数。

在 `app.ux` 中，通过 `this.$def` 访问 `app.ux` 中定义的数据和方法。

在页面中，通过 `this.$app.$def` 访问 `app.ux` 中定义的数据和方法。

## 四、页面样式与布局

目前仅支持长度单位 `px` 和 `%`。`px` 是相对于 `项目配置基准宽度` 的单位，已经适配移动端屏幕，原理类似与 `rem`。

`项目配置基准宽度` 通过 `<ProjectName>/src/manifest.json` 中的 `config.designWidth` 设定。默认为 750。

## 五、框架指令

for 指令

```html
<!-- TODO: 需要加双花括号吗？ -->
<div for="{{ list }}">
    <text>{{ $idx }}.{{ $item.name }}</text>
</div>

<div for="value in list">
    <text>{{ $idx }}.{{ value.name }}</text>
</div>

<div for="(personIndex, personItem) in list">
    <text>{{ personIndex }}.{{ personItem.name }}</text>
</div>
```

if 指令和 show 指令

```html
<text show="{{ showVar }}">show: 渲染但控制是否显示</text>
```

## 编译项目

[发布程序包](https://doc.quickapp.cn/tools/compiling-tools.html)的步骤如下：

```sh
# 编译打包工程
$ npm run build
# 监听源代码变动自动编译
$ npm run watch

# 增加 release 签名
$ openssl req -newkey rsa:2048 -nodes -keyout private.pem -x509 -days 3650 -out certificate.pem

# 发布程序包
$ npm run release
```

## REF

- [快应用官网][home]
- [快速入门][doc]

[home]: https://www.quickapp.cn/
[doc]: https://doc.quickapp.cn/