---
layout: post
title: Parceljs 入门
date: 2017-12-31
---

parcel，字面含义指“包裹，小包”。在前端领域指一款“极速零配置 Web 应用打包工具”。

它利用多核处理提供极快速度，且无需任何配置。

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

## REF

- [Parcel 官方网站][home]
- [Parcel github 页][github]
- [🚀 快速开始][started]

[home]: https://parceljs.org/
[github]: https://github.com/parcel-bundler/parcel
[devongovett]: https://github.com/devongovett
[started]: https://parceljs.org/getting_started.html