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

TODO

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