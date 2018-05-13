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

TODO

## REF

- [Babel - The compiler for writing next generation JavaScript][home]
- [Polyfill - Babel][polyfill-usage]

[home]: https://babeljs.io/
[core-js]: https://github.com/zloirock/core-js
[regenerator]: https://facebook.github.io/regenerator/
[polyfill-usage]: https://babeljs.io/docs/usage/polyfill