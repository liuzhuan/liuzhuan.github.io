---
layout: post
title: Hello Gulp
date: 2018-04-30
---

* TOC
{:toc}

Gulp 官网自我介绍如下：

> Automate and enhance your workflow

自动化增强工作流的工具集。

## 使用

首先全局安装 `gulp-cli`。

> 若曾安装旧版 gulp，首先需要将其卸载 `npm rm --global gulp`，确保旧版本不与新版本冲突。

```sh
$ npm install --global gulp-cli
```

然后在项目开发依赖（`devDependencies`）中安装 gulp：

```sh
$ npm install --save-dev gulp
```

在项目根目录中编写 `gulpfile.js`：

```js
var gulp = require('gulp')

gulp.task('default', function() {
    // 将你的默认任务代码放置在此
})
```

此时，执行 `gulp` 即可启动默认任务。

若要启动其他任务，可以使用 `gulp <task> <othertask>`。

## 理解 stream（流）

Gulp 基于 Node.js 的 stream 对数据做各种转换，因此要掌握 Gulp，就一定要了解 [Node.js 的 Stream](https://www.1zh.tech/2018/05/15/node-stream/)。

## 编写 `gulpfile.js`

// TODO:

## 编写插件

// TODO:

## 源码阅读

gulp.js 的依赖图如下：

![gulp dependencies tree](/imgs/gulp-dep.png)

## REF

- [Gulp 基础与原理][jerryc] by *JerryC*, 2017-02-28
- [Stream Handbook][handbook] by *James Halliday*
- [Gulp.js][gulpjs]
    - [Getting Started][started]
    - [Recipes][recipes]
    - [Articles][articles]
    - [Writing a plugin][plugin]
- [Stream - Node.js Documentation][api]

[gulpjs]: https://gulpjs.com
[started]: https://github.com/gulpjs/gulp/blob/v3.9.1/docs/getting-started.md
[recipes]: https://github.com/gulpjs/gulp/tree/v3.9.1/docs/recipes
[articles]: https://github.com/gulpjs/gulp/blob/v3.9.1/docs/README.md#articles
[jerryc]: http://huang-jerryc.com/2017/02/28/gulp-base/
[handbook]: https://github.com/substack/stream-handbook
[api]: https://nodejs.org/dist/latest/docs/api/stream.html
[through]: https://www.npmjs.com/package/through
[plugin]: https://github.com/gulpjs/gulp/blob/v3.9.1/docs/writing-a-plugin/README.md