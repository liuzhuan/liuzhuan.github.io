---
layout: post
title: mpvue 入门
date: 2018-05-21
---

* TOC
{:toc}

[mpvue][github] 是一个使用 Vue.js 开发小程序的前端框架。框架基于 Vue.js 核心，mpvue 修改了 Vue.js 的 runtime 和 compiler 实现，使其可以运行在小程序环境中，从而为小程序开发引入了整套 Vue.js 开发体验。

## 快速上手

### 初始化

```sh
$ node -v
v8.9.0

$ npm -v
5.6.0

$ npm set registry https://registry.npm.taobao.org/
$ npm install --global vue-cli
$ vue init mpvue/mpvue-quickstart my-project
$ cd my-project
$ npm install
$ npm run dev
```

成功后，本地多了一个 `dist` 目录，这个目录里就是生成的小程序相关代码。

⚠️ 注意：新增的页面需要重新 `npm run dev` 来进行编译。

## REF

- [mpvue - github][github]
- [快速上手][quickstart]

[github]: https://github.com/Meituan-Dianping/mpvue
[quickstart]: http://mpvue.com/mpvue/quickstart/
