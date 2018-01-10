---
layout: post
title: Parceljs 入门
date: 2017-12-31
---

parcel，字面含义指“包裹，小包”。在前端领域指一款“极速零配置 Web 应用打包工具”。

它利用多核处理提供极快速度，且无需任何配置。

我们已经有 webpack 和 Rollup, 什么场景下使用 Parcel?

[Indrek Lasn][freecodecamp] 认为，Parcel 适合中小型项目（代码行数小于 15k），webpack 适合大型企业级项目，而 Rollup 适合开发 npm package。

## 快速开始

首先使用 Yarn 或 npm 安装：

```sh
yarn global add parcel-bundler
npm install -g parcel-bundler
```

创建 `package.json`:

```sh
yarn init -y
# or
npm init -y
```

Parcel 可使用任何类型文件作为入口，但最好还是使用 HTML 或 JavaScript 。

创建 `index.html` 和 `index.js`:

```html
<html>
    <body>
        <script src="./index.js"></script>
    </body>
</html>
```

```javascript
console.log('hello world!')
```

Parcel 内置热更新机制，只需运行:

```sh
parcel index.html
```

在浏览器中打开 `http://localhost:1234/` 即可浏览。也可使用 `-p <port number>` 覆盖默认端口。

若有自己服务器，可使用 `watch` 模式，文件更换时依然自动热更新，但不启动本地服务器：

```sh
parcel watch index.html
```

## SCSS

只需安装 `node-sass` 即可：

```sh
npm i node-sass && touch styles.scss
```

然后编写样式文件，并在 js 文件中导入：

styles.scss

```scss
body {
    background: steelblue;
    color: white;
}
```

index.js

```javascript
import './styles.scss'

document.write('hmr + hmr + hmr')
```

## 生产构建

只需在 `package.json` 中增加 `build` 选项：

```diff
"scripts": {
    "start": "parcel index.html",    
+   "build": "parcel build index.js"
}
```

> 构建目标分为为 html 和 js，两者有什么不同？

当然，也可以指定一个输出路径：

```
parcel build index.js -d build/output
```

## React

[To Be Continue][freecodecamp]

## REF

- [Parcel 官方网站][home]
- [Parcel github 页][github]
- [🚀 快速开始][started]
- [Everything You Need To Know About Parcel: The Blazing Fast Web App Bundler][freecodecamp], by Indrek Lasn, 2017/12/17

[home]: https://parceljs.org/
[github]: https://github.com/parcel-bundler/parcel
[devongovett]: https://github.com/devongovett
[started]: https://parceljs.org/getting_started.html
[freecodecamp]: https://medium.freecodecamp.org/all-you-need-to-know-about-parcel-dbe151b70082