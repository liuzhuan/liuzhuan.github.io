---
layout: post
title: Rollup.js 入门
date: 2017-12-13
---

Rollup 是一个 ES6 模块打包器，开发者 [Rich Harris][rollup-interview]。

Rich Harris 是纽约时报的图形编辑，既做新闻，也做开发。

Rollup 适合构建库文件，目前使用它的库有 [vue.js][vue-rollup]、[react][react-rollup]、D3、Three.js、Redux 等。

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

## 使用配置文件

在项目根目录下新建 `rollup.config.js`，写入内容：

```javascript
// rollup.config.js
export default {
    input: 'src/main.js',
    output: {
        file: 'bundle.js',
        format: 'cjs'
    }
}
```

使用 `--config` 或 `-c` 标志位，就能使用配置文件：

```sh
rollup -c
```

除了默认的 `rollup.config.js`，还能使用不同的配置文件：

```
rollup --config rollup.config.dev.js
rollup --config rollup.config.prod.js
```

## 使用插件

插件可在关键节点改变 Rollup 的默认行为，[Rollup wiki][rollup-wiki] 页面列举许多插件。

比如，`rollup-plugin-json` 允许 Rollup 导入 JSON 文件。

首先，安装它：

```
npm install --save-dev rollup-plugin-json
```

更新 `main.js`：

```javascript
import { version } from './package.json'

export default function() {
    console.log('version ' + version)
}
```

更新 `rollup.config.js`，使用 JSON 插件：

```javascript
import json from 'rollup-plugin-json'

export default {
    input: 'main.js',
    output: {
        file: 'bundle.js',
        format: 'cjs'
    },
    plugins: [json()]
}
```

运行 `npm run build` 就能看到结果。

## 高级配置

Rollup 配置文件是一个标准 ES6 模块，需要导出一个默认值。

除了上面展示的简单配置，还可设定复杂配置参数。

比如，若入口文件不止一个，模块导出值须是一个数组；若想得到一个入口文件的多个版本，须将 `output` 设为数组：

```javascript
export default [
    {
        input: 'main-a.js',
        output: {
            file: 'dist/bundle-a.js',
            format: 'cjs'
        }
    },
    {
        input: 'main-b.js',
        output: [
            {
                file: 'dist/bundle-b1.js',
                format: 'cjs'
            },
            {
                file: 'dist/bundle-b2.js',
                format: 'es'
            }
        ]
    }
]
```

配置参数若要异步生成，亦可：

```javascript
// rollup.config.js
import fetch from 'node-fetch'
export default fetch('/some-remote-url')
```

再看一个 Promise ：

```javascript
export default Promise.all([
    fetch('get-config-1')
    fetch('get-config-2')
])
```

## 与其他武器整合

### npm 包

Rollup 不知道如何读取 npm 包，不懂 `node_modules` 解析规则。

此时，我们需要 `rollup-plugin-node-resolve` 插件：

```
npm install --save-dev rollup-plugin-node-resolve
```

更新 `rollup.config.js` 以便引入它：

```javascript
import resolve from 'rollup-plugin-node-resolve'

export default {
    // ...
    plugins: [resolve()]
}
```

目前大部分 npm 包都是 CommonJS 规范，若要被 Rollup 使用，须转换为 ES2015 模块。此时，可用 `rollup-plugin-commonjs` 插件。

注意，为避免其他插件篡改 CommonJS 模块，`rollup-plugin-commonjs` 须首先被调用。

### Babel

同时使用 Babel 和 Rollup 最简单办法是引入 `rollup-plugin-babel` 插件：

```
npm install --save-dev rollup-plugin-babel
```

然后更新配置文件：

```javascript
// rollup.config.js
import resolve from 'rollup-plugin-node-resolve'
import babel from 'rollup-plugin-babel'

export default {
    // input & output ...
    plugins: [
        resolve(),
        babel({
            exclude: 'node_modules/**'
        })
    ]
}
```

Babel 须做如下配置才可工作，创建 `src/.babelrc`：

```json
{
    "presets": [
        [
            "env",
            { "modules": false }
        ]
    ],
    "plugins": ["external-helpers"]
}
```

此处有些异样须小心谨慎。首先，设定 `"modules": false` 选项，否则，Babel 会抢在 Rollup 之前将模块改为 CommonJS 。

第二，使用 `external-helpers` 插件。它仅在 bundle 头部引入一次 helpers 。否则，将在每个模块引入一次，浪费。

第三，`.babelrc` 置于 `src/` 目录，而非项目根目录。可依不同目的（比如测试、开发、上线）创建不同参数。

最后，还需安装上述 `env` 预设值和 `external-helpers` 插件：

```
npm install --save-dev babel-preset-env babel-plugin-external-helpers
```

万事具备。

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
[rollup-wiki]: https://github.com/rollup/rollup/wiki/Plugins