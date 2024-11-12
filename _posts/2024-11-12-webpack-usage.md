---
layout: post
title: Webpack 使用指南
date: 2024-11-12
permalink: /webpack/
---

* TOC
{:toc}

[webpack](https://webpack.js.org/) 是一个前端打包器。

## 安装 {#install}

```sh
pnpm add -D webpack webpack-cli
```

编写入口文件 `src/main.js` 和模块 `src/foo.js`：

```js
// src/foo.js
export function foo() {
  console.log('I am foo')
}

export function add(x, y) {
  return x + y
}
```

```js
// src/main.js
import { foo, add } from './foo'

foo()
console.log(add(3, 4))
```

编写配置文件 `webpack.config.cjs`:

```js
const path = require('node:path')

module.exports = {
  entry: './src/main.js',
  mode: 'production',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
  },
}
```

修改 `package.json` 的脚本：

```json
{
    "scripts": {
        "build": "webpack"
    }
}
```

执行 `pnpm build` 构建项目，发现构建产物 `dist/main.bundle.js`，内容如下：

```js
(()=>{"use strict";console.log("I am foo"),console.log(7)})();
```

## 拆解配置文件 {#split-config}

建议把生产环境和开发环境的配置文件分开，把可以复用的参数提取到公共的配置文件。

使用 [webpack-merge](https://github.com/survivejs/webpack-merge) 将多个配置项合并为一个。

```sh
pnpm add -D webpack-merge
```

```js
// webpack.common.config.cjs 公共配置
const path = require('node:path')

module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
  },
}
```

```js
// webpack.dev.config.cjs
const { merge } = require('webpack-merge')
const commonConfig = require('./webpack.common.config.cjs')

module.exports = merge(commonConfig, {
  mode: 'development',
})
```

```js
// webpack.prod.config.cjs
const { merge } = require('webpack-merge')
const commonConfig = require('./webpack.common.config.cjs')

module.exports = merge(commonConfig, {
  mode: 'production',
})
```

修改 `package.json` 的脚本：

```json
{
  "scripts": {
    "dev": "webpack --config webpack.dev.config.cjs",
    "build": "webpack --config webpack.prod.config.cjs",
  }
}
```