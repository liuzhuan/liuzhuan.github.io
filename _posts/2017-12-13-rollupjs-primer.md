---
layout: post
title: rollup.js 入门
date: 2017-12-13
---

Rollup 是一个 ES6 模块打包器，主力开发是 [Rich Harris][rollup-interview]。

Rich Harris 是纽约时报的图形编辑，既做新闻，也做开发。

Rollup 适合打包库文件，目前使用 rollup 构建的著名库有 [vue.js][vue-rollup]、[react][react-rollup]、D3、Three.js、Redux 等。

## 快速使用

使用 `npm install --global rollup` 全局安装，`rollup --help` 可以查看帮助文档。

以下命令假设你的入口文件是 `main.js`，并且输出文件是单一文件 `bundle.js`

```sh
# 对于浏览器，编译成 IIFE 函数
rollup main.js --o bundle.js --f iife

# 对于 Node.js，编译为 CommonJS 模块
rollup main.js --o bundle.js --f cjs

# 为了兼容浏览器和 Node.js，编译为 umd 格式
rollup main.js --o bundle.js -f umd --name "myBundle"
```

## Tree-shaking

通过摇树算法，可以把无关代码“抖掉”，减小文件体积。

## 兼容性

Rollup 可以通过 [rollup-plugin-commonjs][rollup-plugin-commonjs] 插件引入 CommonJS 模块。

如果希望在 Node.js 或 webpack 中直接使用，可以把 rollup 的目标格式设定为 UMD 或 CommonJS ，然后在 `package.json` 的 `main` 属性指向编译后的版本。如果 `package.json` 中还包含 `module` 字段，rollup 和 webpack 2 等支持 ES6 的工具可以直接使用 ES6 版本的代码。

## 工作原理

首先，Rollup 使用 Acorn 解析器读取入口文件，分析后产生抽象语法树（AST）。通过 AST 就能得到很多信息，比如模块的依赖和导出变量。

如果发现依赖模块，就加载模块、读其内容、拆其 Token、产生AST。递归深入，直到汇集所有模块。

每个步骤都是可插拔的，可向其中增加自定义操作，比如读取 `node_module` 文件夹，将 ES2015 编译至 ES5 等。

## 与其他打包器有什么不同？

首先，Rollup 打的包精炼，没有多余包装。

其次，Rollup 会剔除没用的代码，让包尽可能小。

## REF

- [rollup.js][rollup]
- [Rollup - Next-generation ES6 module bundler - Interview with Rich Harris][rollup-interview], survivejs
- [rollup 视频教程][rollup-video]
- [rollup-plugin-commonjs][rollup-plugin-commonjs]
- [acorn - github](https://github.com/ternjs/acorn)

[rollup]: https://rollupjs.org/
[rollup-video]: https://code.lengstorf.com/learn-rollup-js/
[rollup-plugin-commonjs]: https://github.com/rollup/rollup-plugin-commonjs
[vue-rollup]: https://github.com/vuejs/vue/blob/dev/package.json#L16-L24
[react-rollup]: https://github.com/facebook/react/blob/master/package.json#L103
[angular-bazel]: https://github.com/angular/angular/blob/master/docs/BAZEL.md
[rollup-interview]: https://survivejs.com/blog/rollup-interview/