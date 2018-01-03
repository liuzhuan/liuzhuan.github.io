---
layout: post
title: GitBook 入门
date: 2018-01-02
---

GitBook 是一种文档格式，也是一条工具链。它利用 Git 和 Markdown，产生各种格式文档。另外，[gitbook.com][gitbook] 还可以托管文档。

GitBook 生成的电子书籍版式美观，比如 [Learn JavaScript][js]。更多的例子参见[列表][examples]。

使用 [GitBook.com][gitbook] 在线发布是最简单的方法，此处不表。本文主要讲述如何在本地搭建 GitBook 开发环境。

## 安装

使用 npm 全局安装，推荐使用 v4.0+ npm 。

```sh
npm install gitbook-cli -g
```

创建一本书

```sh
# 在当前目录创建新书
gitbook init
# 在新目录中创建新书
gitbook init ./directory
```

预览新书

```sh
gitbook serve
```

编译静态站点：

```sh
gitbook build
```

安装 beta 版本

```sh
gitbook fetch beta

# 列举远端可用的版本
gitbook ls-remote
```

调试

```sh
# 可使用 `--log=debug` 和 `--debug` 获得更详细的日志输出
gitbook build ./ --log=debug --debug
```

To Be Continue

## REF

- [GitBook on GitHub][github]
- [GitBook.com][gitbook]
- [Setup and Installation of GitBook][setup]

[github]: https://github.com/GitbookIO/gitbook
[gitbook]: https://www.gitbook.com/
[js]: https://www.gitbook.com/book/gitbookio/javascript/details
[examples]: https://github.com/GitbookIO/gitbook/blob/master/docs/examples.md
[setup]: https://github.com/GitbookIO/gitbook/blob/master/docs/setup.md