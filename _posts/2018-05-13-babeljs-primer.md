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

由于 Babel 只转译新语法（比如箭头函数），为了使用新引入的全局属性（比如 Promise）或新的原生方法（比如），可以使用 babel-polyfill。

## REF

- [Babel - The compiler for writing next generation JavaScript][home]

[home]: https://babeljs.io/