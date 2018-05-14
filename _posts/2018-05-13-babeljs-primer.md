---
layout: post
title: Babeljs 入门
date: 2018-05-13
---

* TOC
{:toc}

## 最简形式

安装命令行工具和 env 预设值。

```sh
$ npm install --save-dev babel-cli babel-preset-env
```

创建 `.babelrc` 文件。

```json
{
    "presets": ["env"]
}
```

[视频页面][videos]有很多高质量视频，可以仔细观摩学习。

## Polyfill

由于 Babel 只转译新语法（比如箭头函数），为了使用新的全局属性（比如 Promise）或原生方法（比如 `String.padStart`），可以使用 babel-polyfill。该 polyfill 用到了 [core-js][core-js] 和 [regenerator][regenerator]。

### 安装

```sh
$ npm install --save-dev babel-polyfill
```

### 使用

只需在程序的入口文件引入即可。

## JSX 和 Flow

Babel 可以转译 JSX 语法，也可以移除类型标注。使用 React 预设值即可。

### 安装

```sh
$ npm install --save-dev babel-preset-react
```

### 使用

将 `"react"` 加入到 `.babelrc` 文件的 presets 数组。

## 插件系统

Babel 本身就是由插件构成。它是一个编译器，从高层结构上看，它对代码的处理可以分为 3 个阶段：解析（parsing）、转换（transforming）和输出（generation）。

Babel 默认情况下没有任何作用，可以用伪代码表示为：`const babel = code => code;`，即解析代码，然后将输入的代码原封不动输出。

需要为 Babel 配备不同的插件，它才可以有效工作（这些插件改变第二阶段的工作内容，即 transforming）。

TODO：解释什么是 presets?

## REF

- [Babel - The compiler for writing next generation JavaScript][home]
- [Polyfill - Babel][polyfill-usage]
- [babel-handbook][babel-handbook] by *James Kyle*
- [Videos - Babel][videos]
- [Plugins - Babel][plugins]

[home]: https://babeljs.io/
[core-js]: https://github.com/zloirock/core-js
[regenerator]: https://facebook.github.io/regenerator/
[polyfill-usage]: https://babeljs.io/docs/usage/polyfill
[babel-handbook]: https://github.com/jamiebuilds/babel-handbook
[videos]: https://babeljs.io/docs/community/videos/
[plugins]: https://babeljs.io/docs/plugins/
[tiny-compiler]: https://github.com/jamiebuilds/the-super-tiny-compiler